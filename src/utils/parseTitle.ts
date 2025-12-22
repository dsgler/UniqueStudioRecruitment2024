import { derived } from "svelte/store";
import { t } from "./t";

export const parseTitle = derived(t, ($t) => {
	return (title: string) => {
		try {
			return title.slice(0, 4) + $t(`history.recruitmentName.${title[title.length - 1]}`);
		} catch {
			return title.slice(0, 4) + "unknown recruitment";
		}
	};
});
