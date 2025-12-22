import { writable } from "svelte/store";

function createLoginStore() {
	const { subscribe, set } = writable(false);
	return {
		subscribe,
		login: () => set(true),
		logout: () => set(false)
	};
}

export const isLogin = createLoginStore();
