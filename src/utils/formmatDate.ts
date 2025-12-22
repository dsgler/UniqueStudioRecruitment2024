import { derived } from "svelte/store";
import { localeLanguage } from "../stores/localeLanguage";

// ly: shit functions aiming to switch ISO 8601 to daily expression
export const formatDate = derived(localeLanguage, ($localeLanguage) => (dateStr: string) => {
	const date = new Date(dateStr);
	const options = {
		weekday: "short" as const,
		month: "short" as const,
		day: "numeric" as const,
		timeZone: "Asia/Shanghai"
	};
	const locale = $localeLanguage;
	const formattedDate = date.toLocaleDateString(locale, options);
	return formattedDate;
});

export const formatTime = derived(localeLanguage, ($localeLanguage) => (dateStr: string) => {
	const date = new Date(dateStr);
	const options = {
		hour: "numeric" as const,
		minute: "numeric" as const,
		timeZone: "Asia/Shanghai"
	};
	const locale = $localeLanguage;

	const formattedTime = date.toLocaleTimeString(locale, options);
	return formattedTime;
});
