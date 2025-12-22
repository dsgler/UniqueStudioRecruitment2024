import { writable } from "svelte/store";

type Departments = Array<Record<string, Array<string>>>;

function createDepartmentsStore() {
	const { set, subscribe } = writable<Departments>([]);
	const setDepartments = (data: Departments) => {
		set(data);
	};
	return {
		subscribe,
		setDepartments
	};
}

export const departments = createDepartmentsStore();
