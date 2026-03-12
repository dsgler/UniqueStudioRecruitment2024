import { writable } from "svelte/store";
import type { User } from "../types/user";

const createUserStore = () => {
	const { set, subscribe } = writable<User>();
	const setInfo = (info: User) => {
		set(info);
	};

	return {
		subscribe,
		setInfo
	};
};

export const userInfo = createUserStore();
