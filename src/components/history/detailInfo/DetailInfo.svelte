<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { push } from "svelte-spa-router";
	import { Group } from "../../../config/const";
	import Button from "../../public/Button.svelte";
	import Popover from "../../public/Popover.svelte";
	import type { UserStep } from "../../../types";
	import TimeSelector from "./TimeSelector.svelte";
	import InterviewInfo from "./InterviewInfo.svelte";
	import greet from "../../../assets/greet.svg";
	import NightTestInfo from "./NightTestInfo.svelte";
	import { userInfo } from "../../../stores/userInfo";
	import { recruitment } from "../../../stores/recruitment";
	import type { Application } from "../../../types/application";
	import { getInterviewTimes } from "../../../requests/application/getInterviewTimes";
	import { formatDate, formatTime } from "../../../utils/formmatDate";
	import { parseTitle } from "../../../utils/parseTitle";
	import { t } from "../../../utils/t";
	import { uploadWrittenTest } from "../../../requests/application/uploadWrittenTest";
	import { Message } from "../../../utils/Message";
	import { onMount } from "svelte";
	import {
		getWrittenTest,
		getWrittenTestUrl,
		getWrittenTestType
	} from "../../../requests/recruitment/getWrittenTest";
	import { globalLoading } from "../../../stores/globalLoading";

	export let step: UserStep;
	export let applicationInfo: Application;
	$: myWrittenTestAnswer = applicationInfo?.answer?.split("/").at(-1);
	let selectedTimes = applicationInfo?.interview_selections?.map((el) => el.uid); // 候选时间
	let selectedAllocateTime = [
		step === $t("history.step.TeamTimeSelection") || step === $t("history.step.TeamInterview")
			? applicationInfo?.interview_allocations_team?.uid
			: applicationInfo?.interview_allocations_group?.uid
	];
	const handleClick = (e) => {
		if (e.target.className.includes("go-user")) {
			push("/user");
		}
	};
	enum WrittenTestType {
		None = 0,
		File = 1,
		Url = 2
	}
	let file: File;
	let fileInput: HTMLInputElement;
	let writtenTestLink = "";
	let writtenTestType = WrittenTestType.None;
	let isGettingWrittenTestFile = true;
	let isUploading = false;
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
					return userInfo.refresh();
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

	let interviewTimesPromise;
	if (
		step === $t("history.step.GroupTimeSelection") ||
		step === $t("history.step.TeamTimeSelection")
	) {
		interviewTimesPromise = getInterviewTimes(
			applicationInfo.recruitment_id,
			step === $t("history.step.TeamTimeSelection") ? "unique" : applicationInfo.group
		);
	}

	function reloadInterviewTimes() {
		interviewTimesPromise = getInterviewTimes(
			applicationInfo.recruitment_id,
			step === $t("history.step.TeamTimeSelection") ? "unique" : applicationInfo.group
		);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mt-[3rem] w-full rounded-lg bg-blue-100 p-[20px_28px] max-sm:hidden">
	{#if step !== $t("history.step.Pass")}
		<p class="mb-[1rem] text-lg font-bold">
			{$t("history.currentProcess")}：{step}
		</p>
	{/if}
	{#if step === $t("history.step.SignUp")}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<p on:click={handleClick}>
			{@html $userInfo.applications[0]?.recruitment_id === $recruitment.uid
				? $t("history.signUpTips.SignInTips", {
						changeInfo: `<span
         class="text-blue-300 underline cursor-pointer go-user">${$t("history.signUpTips.changeInfo")}</span
      >`,
						group: Group[$userInfo.applications[0]?.group],
						recruitment: $parseTitle($recruitment.name)
					})
				: $t("history.signUpTips.notSignInTips", {
						changeInfo: `<span
        
        class="text-blue-300 underline cursor-pointer go-user">${$t("history.signUpTips.changeInfo")}</span
      >`
					})}
		</p>
	{:else if step === $t("history.step.WrittenTest")}
		<p>{$t("history.writeTest.tips")}</p>
		<input
			on:change={() => {
				file = fileInput.files[0];
			}}
			bind:this={fileInput}
			type="file"
			class="hidden"
		/>
		{#if isGettingWrittenTestFile && !writtenTestLink}
			<p class="mt-[0.5rem]">{$t("history.writeTest.loading")}</p>
			<Button
				highlight
				className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px] opacity-50"
				>{$t("history.writeTest.loading")}
			</Button>
		{/if}
		{#if writtenTestLink}
			<p class="mt-[0.5rem]">
				{@html $t("history.writeTest.viewLink", {
					writtenTest: `<a
        class=" text-blue-300 underline"
        href=${writtenTestLink}
        download=${$t("history.step.WrittenTest")}>${$t("history.writeTest.writtenTest")}</a
      >`
				})}
			</p>
			{#if writtenTestType === WrittenTestType.Url}
				<p class="text-gray-500 mt-[0.5rem]">{$t("history.writeTest.urlTips")}</p>
			{:else if writtenTestType === WrittenTestType.File}
				{#if myWrittenTestAnswer}
					<div class="border-blue-200 shadow-sm mb-5 mt-5 rounded-[10px] border bg-white p-3">
						<p class="text-gray-500 mb-1 text-[1.1rem] font-bold">
							{$t("history.writeTest.myAnswer")}
						</p>
						<p class="break-all font-medium">{myWrittenTestAnswer}</p>
					</div>
				{/if}
				<Button
					highlight
					className="mx-auto rounded-full my-[8px] w-full text-[15px] leading-[36px]"
					isLoading={isUploading}
					onClick={uploadAnswer}
				>
					{file
						? $t("history.mobile.uploadWrittenTest") +
							(file.name.length > 16
								? file.name.slice(0, 8) + "..." + file.name.slice(-8)
								: file.name)
						: $t("history.mobile.selectWrittenTest")}
				</Button>
			{/if}
		{/if}
	{:else if step === $t("history.step.GroupTimeSelection")}
		{#await interviewTimesPromise}
			<p>{$t("history.groupInterviewTimeSelector.loading")}</p>
		{:then res}
			<div class="space-y-2">
				<!-- todo/: res.data.filter过期时间and已满时间 -->
				<TimeSelector
					type="group"
					aid={applicationInfo.uid}
					times={res.data}
					maxSelected={1}
					bind:selectedTimes={selectedAllocateTime}
					on:reloadTimes={reloadInterviewTimes}
					enableSlot={true}
				>
					<div slot="timeSlot" let:time class="flex items-center gap-1">
						<span class="bg-green-400 h-2 w-2 rounded-full"></span>
						<span class="text-xs">剩余 {time.slot_number - time.select_number} 个位置</span>
					</div>
				</TimeSelector>
				<div class="text-gray-500 flex items-center gap-1 text-sm">
					<Popover>
						<span slot="children"
							>选择候选时间<span
								class="ml-1 inline h-5 w-5 cursor-pointer items-center justify-center text-blue-400"
								>?</span
							></span
						>
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
					bind:selectedTimes
				/>
			</div>
		{/await}
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
		{#await interviewTimesPromise}
			<p>{$t("history.teamInterviewTimeSelector.loading")}</p>
		{:then res}
			<div class="space-y-2">
				<TimeSelector
					type="team"
					aid={applicationInfo.uid}
					times={res.data}
					maxSelected={1}
					bind:selectedTimes={selectedAllocateTime}
					on:reloadTimes={reloadInterviewTimes}
					enableSlot={true}
				>
					<div slot="timeSlot" let:time class="flex items-center gap-1">
						<span class="bg-green-400 h-2 w-2 rounded-full"></span>
						<span class="text-xs">剩余 {time.slot_number - time.select_number} 个位置</span>
					</div>
				</TimeSelector>
				<div class="text-gray-500 flex items-center gap-1 text-sm">
					<Popover>
						<span slot="children">选择候选时间</span>
						<span slot="content"> 请选择所有可以参与面试的时间，以供面试官调整 </span>
					</Popover>
				</div>
				<TimeSelector
					type="team"
					aid={applicationInfo.uid}
					times={res.data}
					maxSelected={0}
					bind:selectedTimes
				/>
			</div>
		{/await}
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
		<div class="flex items-center gap-[4px]">
			<p class="text-lg">{$t("history.passTips")}</p>
			<img class="inline" src={greet} alt="欢迎" />
		</div>
		<p class="mt-[8px] text-gray-300">{$t("history.passSubTips")}</p>
	{/if}
</div>
