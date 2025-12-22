import { writable } from "svelte/store";

const createSelectedTimesStore = () => {
	const { subscribe, set } = writable<string[]>([]);
	const setTimes = (info: string[]) => {
		set(info);
	};

	return {
		subscribe,
		setTimes
	};
};

export const selectedTimes = createSelectedTimesStore();
