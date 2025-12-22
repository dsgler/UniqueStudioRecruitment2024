<script lang="ts">
	import clsx from "clsx";
	import type { GROUP } from "../../config/const";
	import { t } from "../../utils/t";
	export let title: string;
	export let group: GROUP | null;
</script>

<div class="text-text-1 sm:text-[24px] select-none">
	{title} |
	<span class={clsx(group || "text-text-3")}>{group ? `${group}` : $t("history.notSelected")}</span>
</div>
