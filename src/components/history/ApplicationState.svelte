<script lang="ts">
	// import { ProcessState } from "../../config/const";
	import cx from "clsx";
	import { t } from "../../utils/t";
	export let state: string;
</script>

<div
	class={cx([
		state === $t("history.processState.OUT") && "bg-gray-red text-red-warning border-red-warning",
		state === $t("history.processState.PROCESSING") && "bg-gray-blue text-blue-400 border-blue-400",
		state === $t("history.processState.PASS") && "bg-gray-green text-green-300 border-green-300",
		state === $t("history.processState.OVER") && "bg-gray-orange text-orange border-orange",
		"max-sm:p-[3px_8px] max-sm:text-[10px] w-fit flex-shrink-0 rounded-full border-[1px] px-[1rem] select-none"
	])}
>
	{state}
</div>
