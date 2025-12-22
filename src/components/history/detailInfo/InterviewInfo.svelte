<script lang="ts">
	import { Group, InterviewPlace } from "../../../config/const";
	import type { InterviewType } from "../../../types";
	import { t } from "../../../utils/t";

	export let time = "";
	export let group = "";
	export let type: InterviewType;
</script>

{#if time}
	<p class="max-sm:text-cente max-sm:text-smr">
		{#if type === "group"}
			{$t("history.groupInterview.tips", {
				group: Group[group],
				time: "",
				room: ""
			}).split("{time}")[0]}<span class="text-blue-300">{time}</span>{$t(
				"history.groupInterview.tips",
				{
					group: Group[group],
					time: "",
					room: ""
				}
			)
				.split("{time}")[1]
				.split("{room}")[0]}<span class="text-blue-300">{InterviewPlace[group]}</span>{$t(
				"history.groupInterview.tips",
				{
					group: Group[group],
					time: "",
					room: ""
				}
			).split("{room}")[1]}
		{:else}
			{$t("history.teamInterview.tips", {
				time: "",
				room: ""
			}).split("{time}")[0]}<span class="text-blue-300">{time}</span>{$t(
				"history.teamInterview.tips",
				{
					time: "",
					room: ""
				}
			)
				.split("{time}")[1]
				.split("{room}")[0]}<span class="text-blue-300">{InterviewPlace[group]}</span>{$t(
				"history.teamInterview.tips",
				{
					time: "",
					room: ""
				}
			).split("{room}")[1]}
		{/if}
	</p>
{:else}
	<p class="text-gray-300 max-sm:text-center">{$t("history.groupInterview.noTime")}</p>
{/if}
