<script lang="ts">
	import { slide } from "svelte/transition";
	import arrow from "/src/assets/arrow.svg";
	// import checkBox from "/src/assets/checkBox.svg";
	// import checkedBox from "/src/assets/checkedBox.svg";
	import cx from "clsx";
	import BottomBar from "../public/BottomBar.svelte";
	import { isMobile } from "../../stores/isMobile";

	export let necessary: boolean = false;
	export let name: string;
	export let selectedItems: [string | null, string | null] = ["", ""]; // 改为两元素数组，对应两列选择
	export let selectItems: [string[], string[]]; // 改为两个数组，分别对应两列的选项
	export let editMode: boolean = false;
	export let placeholder: string = "";
	export let className: string = "";
	export let separator: string = "、";
	export let columnTitles: [string, string] = ["1", "0"]; // 两列的标题

	// 当selectedItems改变时的回调
	export let onChange: (items: [string | null, string | null]) => void = () => {};

	let showItems = false;

	// 切换选项的选中状态
	const toggleItem = (item: string, columnIndex: 0 | 1) => {
		const newSelectedItems: [string | null, string | null] = [...selectedItems];

		if (newSelectedItems[columnIndex] === item) {
			// 如果已选中该项，则取消选择
			newSelectedItems[columnIndex] = "";
		} else {
			// 选择新项（会替换之前的选择）
			newSelectedItems[columnIndex] = item;
		}

		// console.log('old selectedItems', selectedItems);
		selectedItems = newSelectedItems;
		onChange(selectedItems);
	};

	// 获取展示文本
	$: displayText =
		selectedItems.filter(Boolean).length > 0
			? selectedItems.filter(Boolean).join(separator)
			: placeholder || "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={(e) => e.stopPropagation()}
	class={cx(["max-lg:my-[1.5rem] flex items-center gap-[1rem]", className])}
>
	<p class="max-sm:text-sm shrink-0">
		{#if necessary}
			<span class="text-blue-300">*</span>
		{/if}{name}
	</p>
	<div class="relative w-full">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				if (!editMode) return;
				showItems = !showItems;
			}}
			class={cx([
				"text-text-1 max-sm:h-[42px] max-sm:text-sm bg-gray-50 relative flex h-[48px] w-full items-center rounded-[8px] border-[1px] p-[4px_12px] transition-all outline-none focus:border-[#165DFF]",
				editMode
					? "border-gray-200 cursor-pointer border-[1px] bg-transparent"
					: "border-transparent"
			])}
		>
			<input
				disabled
				value={displayText}
				placeholder={selectedItems.filter(Boolean).length === 0 ? placeholder : ""}
				class={cx([
					"pointer-events-none w-full bg-transparent",
					selectedItems.filter(Boolean).length === 0 && "opacity-50"
				])}
			/>
			<img
				src={arrow}
				alt="arrow"
				class={cx([
					"max-sm:hidden h-[16px] flex-shrink-0 transition-all",
					showItems || "rotate-180",
					editMode || "hidden"
				])}
			/>
		</div>

		{#if showItems}
			<div
				class="max-sm:hidden shadow-card bg-white border-gray-150 shadow-lg shadow-gray-150 left-0 absolute top-[110%] z-10 max-h-[400px] w-full overflow-y-auto rounded-[4px] border-[1px] p-[0.75rem_1rem]"
				transition:slide
			>
				<!-- 两列布局 -->
				<div class="gap-4 grid grid-cols-2">
					<!-- 第一列 -->
					<div>
						<h4 class="text-sm font-medium text-gray-600 mb-2 pb-1 border-gray-200 border-b">
							{columnTitles[0]}
						</h4>
						{#each selectItems[0] as item (item)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={() => toggleItem(item, 0)}
								class={cx([
									"hover:bg-gray-150 flex cursor-pointer items-center gap-[0.5rem] rounded-[0.5rem] p-[0.5rem_0.75rem] transition-all",
									selectedItems[0] === item ? "text-blue-300 bg-blue-100" : ""
								])}
							>
								<span class="text-sm">{item}</span>
							</div>
						{/each}
					</div>

					<!-- 第二列 -->
					<div>
						<h4 class="text-sm font-medium text-gray-600 mb-2 pb-1 border-gray-200 border-b">
							{columnTitles[1]}
						</h4>
						{#each selectItems[1] as item (item)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={() => toggleItem(item, 1)}
								class={cx([
									"hover:bg-gray-150 flex cursor-pointer items-center gap-[0.5rem] rounded-[0.5rem] p-[0.5rem_0.75rem] transition-all",
									selectedItems[1] === item ? "text-blue-300 bg-blue-100" : ""
								])}
							>
								<span class="text-sm">{item}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- 移动端底部弹窗 -->
<BottomBar
	on:close={() => (showItems = false)}
	on:confirm={() => (showItems = false)}
	show={$isMobile && showItems}
	className="h-[400px] overflow-y-auto"
	confirm={true}
>
	<!-- 移动端也使用两列布局 -->
	<div class="px-4 py-6 gap-4 grid grid-cols-2">
		<!-- 第一列 -->
		<div class="mb-6">
			<h4 class="text-lg font-medium text-gray-700 mb-3 border-gray-200 pb-2 border-b text-center">
				{columnTitles[0]}
			</h4>
			{#each selectItems[0] as item (item)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => toggleItem(item, 0)}
					class={cx([
						selectedItems[0] === item ? "text-blue-300 bg-blue-100" : "",
						"hover:bg-gray-150 border-b-gray-150 mx-[1rem] flex   cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] border-b-[1px] p-[1rem_0.75rem] text-center transition-all"
					])}
				>
					<span>{item}</span>
				</div>
			{/each}
		</div>

		<!-- 第二列 -->
		<div>
			<h4 class="text-lg font-medium text-gray-700 mb-3 border-gray-200 pb-2 border-b text-center">
				{columnTitles[1]}
			</h4>
			{#each selectItems[1] as item (item)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => toggleItem(item, 1)}
					class={cx([
						selectedItems[1] === item ? "text-blue-300 bg-blue-100" : "",
						"hover:bg-gray-150 border-b-gray-150 mx-[1rem] flex   cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] border-b-[1px] p-[1rem_0.75rem] text-center transition-all"
					])}
				>
					<span>{item}</span>
				</div>
			{/each}
		</div>
	</div>
</BottomBar>
