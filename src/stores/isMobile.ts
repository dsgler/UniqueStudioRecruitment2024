import { writable } from "svelte/store";

function createIsMobileStore() {
	const { subscribe, set } = writable(window.innerWidth < 640);
	function handleResize() {
		set(window.innerWidth < 640);
	}
	window.addEventListener("resize", handleResize);
	return {
		subscribe,
		unsubscribe() {
			window.removeEventListener("resize", handleResize);
		}
	};
}

export const isMobile = createIsMobileStore();
