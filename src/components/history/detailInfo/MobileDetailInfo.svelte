<script lang="ts">
	import { push } from "svelte-spa-router";
	import { Group } from "../../../config/const";
	import type { Application } from "../../../types/application";
	import Button from "../../public/Button.svelte";
	import Popover from "../../public/Popover.svelte";
	import type { UserStep } from "../../../types";
	import { recruitment } from "../../../stores/recruitment";
	import { userInfo } from "../../../stores/userInfo";
	import { parseTitle } from "../../../utils/parseTitle";
	import { formatDate, formatTime } from "../../../utils/formmatDate";
	import { t } from "../../../utils/t";
	import InterviewInfo from "./InterviewInfo.svelte";
	import BottomBar from "../../public/BottomBar.svelte";
	import TimeSelector from "./TimeSelector.svelte";
	import { getInterviewTimes } from "../../../requests/application/getInterviewTimes";
	import NightTestInfo from "./NightTestInfo.svelte";
	import greet from "../../../assets/greet.svg";
	import { onMount } from "svelte";
	import { getWrittenTest } from "../../../requests/recruitment/getWrittenTest";
	import { Message } from "../../../utils/Message";
	import { uploadWrittenTest } from "../../../requests/application/uploadWrittenTest";
	import {
		getWrittenTestType,
		getWrittenTestUrl
	} from "../../../requests/recruitment/getWrittenTest";
	import { globalLoading } from "../../../stores/globalLoading";
	import { writable } from "svelte/store";
	import { getInfo } from "../../../requests/user/getInfo";
	import { latestDraft } from "../../../stores/latestDraft";

	$: myWrittenTestAnswer = $userInfo?.applications[0]?.answer.split("/").at(-1);
	enum WrittenTestType {
		None = 0,
		File = 1,
		Url = 2
	}
	let openGroupInterviewTimeSelector = false;
	let openTeamInterviewTimeSelector = false;
	let writtenTestLink = "";
	let writtenTestType = WrittenTestType.None;
	let file: File;
	let fileInput: HTMLInputElement;
	let isGettingWrittenTestFile = false;
	let isUploading = false;
	const handleClick = (e) => {
		if (e.target.className.includes("go-user")) {
			push("/user");
		}
	};

	export let applicationInfo: Application;
	export let step: UserStep;

	// 创建两个 writable stores
	const selectedTimeList = writable(
		applicationInfo.interview_selections?.map((el) => el.uid) || []
	);
	const allocatedTimeValue = writable(
		[
			step === $t("history.step.GroupTimeSelection")
				? applicationInfo.interview_allocations_group?.uid
				: applicationInfo.interview_allocations_team?.uid
		].filter(Boolean)
	);

	// 监听 applicationInfo 变化并更新 selectedTimeList
	$: {
		selectedTimeList.set(applicationInfo.interview_selections?.map((el) => el.uid) || []);
	}

	let groupInterviewTimesPromise;
	let teamInterviewTimesPromise;

	function reloadGroupInterviewTimes() {
		groupInterviewTimesPromise = getInterviewTimes(
			applicationInfo.recruitment_id,
			applicationInfo.group
		);
	}

	function reloadTeamInterviewTimes() {
		teamInterviewTimesPromise = getInterviewTimes(applicationInfo.recruitment_id);
	}

	if (step === $t("history.step.GroupTimeSelection")) {
		groupInterviewTimesPromise = getInterviewTimes(
			applicationInfo.recruitment_id,
			applicationInfo.group
		);
	}

	if (step === $t("history.step.TeamTimeSelection")) {
		teamInterviewTimesPromise = getInterviewTimes(applicationInfo.recruitment_id);
	}

	const uploadAnswer = () => {
		if (!file) {
			fileInput.click();
		} else {
			if (isUploading) return;
			isUploading = true;
			globalLoading.set(true);
			const formData = new FormData();
			formData.append("file", file);
			uploadWrittenTest(applicationInfo.uid, formData)
				.then(() => {
					Message.success($t("history.writeTest.uploadSuccess"));
					file = undefined;
					return getInfo();
				})
				.then((res) => {
					userInfo.setInfo(res.data);
					latestDraft.hydrateFromUser(res.data);
				})
				.catch(() => {
					Message.error($t("history.writeTest.uploadError"));
				})
				.finally(() => {
					isUploading = false;
					globalLoading.set(false);
				});
		}
	};

	export let onCancel: () => void;
	const onSaveAndCancel = async () => {
		await getInfo().then((res) => {
			// 注意这里必须要reset userinfo，不然下一次点进来显示不对
			userInfo.setInfo(res.data);
			latestDraft.hydrateFromUser(res.data);
			onCancel();
		});
	};
	onMount(async () => {
		if (step === $t("history.step.WrittenTest")) {
			isGettingWrittenTestFile = true;
			const typeResp = await getWrittenTestType(
				applicationInfo.recruitment_id,
				applicationInfo.group
			);
			if (!typeResp.ok) {
				Message.warning($t("history.writeTest.downloadError"));
				isGettingWrittenTestFile = false;
				return;
			}
			const typeData = await typeResp.json();
			if (typeData.data === 2) {
				// 在线问卷链接
				getWrittenTestUrl(applicationInfo.recruitment_id, applicationInfo.group)
					.then((res) => {
						if (!res.ok) {
							Message.warning($t("history.writeTest.downloadError"));
							return;
						}
						return res.json();
					})
					.then((data) => {
						writtenTestLink = data.data;
						writtenTestType = WrittenTestType.Url;
					})
					.finally(() => {
						isGettingWrittenTestFile = false;
					});
			} else if ((await typeData.data) === 1) {
				// 文件下载
				getWrittenTest(applicationInfo.recruitment_id, applicationInfo.group)
					.then((res) => {
						if (!res.ok) {
							Message.warning($t("history.writeTest.downloadError"));
							return;
						}
						return res.blob();
					})
					.then((blob) => {
						const url = URL.createObjectURL(blob);
						writtenTestLink = url;
						writtenTestType = WrittenTestType.File;
					})
					.finally(() => {
						isGettingWrittenTestFile = false;
					});
			} else {
				isGettingWrittenTestFile = false;
				writtenTestType = WrittenTestType.None;
			}
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="w-[270px] p-[20px_16px]">
	<p class="mb-[12px] text-center text-[17px] font-[500]">{step}</p>
	{#if step === $t("history.step.SignUp")}
		<p class="text-center text-sm" on:click={handleClick}>
			{$userInfo.applications[0]?.recruitment_id === $recruitment.uid
				? $t("history.mobile.signUpTips", {
						group: Group[$userInfo.applications[0]?.group],
						recruitment: $parseTitle($recruitment.name)
					})
				: $t("history.mobile.notSignUpTips", {
						recruitment: $parseTitle($recruitment.name)
					})}
		</p>
		<Button
			highlight
			className="mx-auto w-full rounded-full my-[8px] text-[15px] leading-[36px]"
			onClick={() => push("/user")}
			>{applicationInfo ? $t("history.mobile.change") : $t("history.mobile.input")}{$t(
				"header.info"
			)}</Button
		>
	{:else if step === $t("history.step.WrittenTest")}
		<p class="my-[8px] text-center text-sm text-text-4">
			{$t("history.writeTest.tips")}
		</p>
		<input
			on:change={() => {
				file = fileInput.files[0];
			}}
			bind:this={fileInput}
			type="file"
			class="hidden"
		/>
		{#if isGettingWrittenTestFile}
			<p class="my-[8px] text-center text-sm">
				{$t("history.writeTest.loading")}
			</p>
		{/if}
		{#if writtenTestLink}
			{#if writtenTestType === WrittenTestType.File}
				{#if myWrittenTestAnswer}
					<div class="border-blue-200 shadow-sm mt-2 rounded-lg border bg-white p-3">
						<p class="text-gray-500 mb-1 text-sm">
							{$t("history.writeTest.myAnswer")}
						</p>
						<p class="break-all font-medium">{myWrittenTestAnswer}</p>
					</div>
				{/if}
				<Button
					highlight
					className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
					><a href={writtenTestLink} download="${$t('history.step.WrittenTest')}"
						>{$t("history.mobile.viewLink")}</a
					></Button
				>
				<Button
					highlight
					className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
					onClick={uploadAnswer}
					>{file
						? $t("history.mobile.uploadWrittenTest") +
							(file.name.length > 10
								? file.name.slice(0, 5) + "..." + file.name.slice(-5)
								: file.name)
						: $t("history.mobile.selectWrittenTest")}
				</Button>
			{:else if writtenTestType === WrittenTestType.Url}
				<Button
					highlight
					className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
					><a href={writtenTestLink} target="_blank">{$t("history.mobile.viewLink")}</a></Button
				>
			{/if}
		{/if}
	{:else if step === $t("history.step.GroupTimeSelection")}
		<p class="my-[8px] text-center text-sm text-text-4">
			{$t("history.mobile.groupInterviewTips")}
		</p>
		<Button
			onClick={() => (openGroupInterviewTimeSelector = true)}
			highlight
			className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
			>{$t("history.mobile.selectTime")}</Button
		>
	{:else if step === $t("history.step.GroupInterview")}
		<InterviewInfo
			group={applicationInfo.group}
			time={applicationInfo.interview_allocations_group.uid
				? `${$formatDate(
						applicationInfo.interview_allocations_group.date
					)} ${$formatTime(applicationInfo.interview_allocations_group.start)}`
				: ""}
			type="group"
		/>
	{:else if step === $t("history.step.StressTest")}
		<NightTestInfo
			group={applicationInfo.group}
			time={$formatDate($recruitment.stress_test_start) +
				$formatTime($recruitment.stress_test_start)}
		/>
	{:else if step === $t("history.step.TeamTimeSelection")}
		<p class="my-[8px] text-center text-sm text-text-4">
			{$t("history.mobile.teamInterviewTips")}
		</p>
		<Button
			onClick={() => (openTeamInterviewTimeSelector = true)}
			highlight
			className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
			>{$t("history.mobile.selectTime")}</Button
		>
	{:else if step === $t("history.step.TeamInterview")}
		<InterviewInfo
			time={applicationInfo.interview_allocations_team.uid
				? `${$formatDate(
						applicationInfo.interview_allocations_team.date
					)} ${$formatTime(applicationInfo.interview_allocations_team.start)}`
				: ""}
			type="team"
			group={applicationInfo.group}
		/>
	{:else if step === $t("history.step.Pass")}
		<div class="flex items-center justify-center gap-[4px] text-sm">
			<p class="tetx-sm">{$t("history.passTips")}</p>
			<img class="inline" src={greet} alt="欢迎" />
		</div>
		<p class="mt-[8px] text-center text-sm text-gray-300">
			{$t("history.passSubTips")}
		</p>
	{/if}
	<Button
		onClick={onSaveAndCancel}
		className="mx-auto w-full text-[15px] bg-transparent leading-[36px] text-text-3"
		>{$t("history.mobile.known")}</Button
	>
</div>

<BottomBar
	className="min-h-[300px] px-[16px]"
	show={openGroupInterviewTimeSelector}
	on:close={() => (openGroupInterviewTimeSelector = false)}
>
	{#await groupInterviewTimesPromise}
		<p>{$t("history.groupInterviewTimeSelector.loading")}</p>
	{:then res}
		<div class="space-y-2">
			<TimeSelector
				type="group"
				aid={applicationInfo.uid}
				times={res.data}
				maxSelected={1}
				bind:selectedTimes={$allocatedTimeValue}
				on:reloadTimes={reloadGroupInterviewTimes}
				enableSlot={true}
			>
				<div slot="timeSlot" let:time class="flex items-center gap-1">
					<span class="bg-green-400 h-2 w-2 rounded-full"></span>
					<span class="text-xs">剩余 {time.slot_number - time.select_number} 个位置</span>
				</div>
			</TimeSelector>
			<div class="text-gray-500 flex items-center gap-1 text-sm">
				<span>选择候选时间</span>
				<Popover>
					<span slot="children" class="cursor-pointer">?</span>
					<span slot="content"
						>请勾选所有您方便参加面试的时段，作为您的备选时段。若原定排期需调整，面试官将优先从您的候选名单中进行匹配并及时通知您。</span
					>
				</Popover>
			</div>
			<TimeSelector
				type="group"
				aid={applicationInfo.uid}
				times={res.data}
				maxSelected={0}
				bind:selectedTimes={$selectedTimeList}
			/>
		</div>
	{/await}
</BottomBar>

<BottomBar
	className="min-h-[300px] px-[16px]"
	show={openTeamInterviewTimeSelector}
	on:close={() => (openTeamInterviewTimeSelector = false)}
>
	{#await teamInterviewTimesPromise}
		<p>{$t("history.teamInterviewTimeSelector.loading")}</p>
	{:then res}
		<div class="space-y-2">
			<TimeSelector
				type="team"
				aid={applicationInfo.uid}
				times={res.data}
				maxSelected={1}
				bind:selectedTimes={$allocatedTimeValue}
				on:reloadTimes={reloadTeamInterviewTimes}
				enableSlot={true}
			>
				<div slot="timeSlot" let:time class="flex items-center gap-1">
					<span class="bg-green-400 h-2 w-2 rounded-full"></span>
					<span class="text-xs">剩余 {time.slot_number - time.select_number} 个位置</span>
				</div>
			</TimeSelector>
			<div class="text-gray-500 flex items-center gap-1 text-sm">
				<span>选择候选时间</span>

				<Popover>
					<span slot="children" class="cursor-pointer">?</span>
					<span slot="content">请选择所有可以参与面试的时间，以供面试官调整</span>
				</Popover>
			</div>
			<TimeSelector
				type="team"
				aid={applicationInfo.uid}
				times={res.data}
				maxSelected={0}
				bind:selectedTimes={$selectedTimeList}
			/>
		</div>
	{/await}
</BottomBar>
