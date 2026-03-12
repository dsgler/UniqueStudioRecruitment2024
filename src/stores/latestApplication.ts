import { writable } from "svelte/store";
import type { ApplicationMutipleGroups, EditableInfo } from "../types/application";
import type { User } from "../types/user";
import { produce } from "immer";

const isString = (value: unknown): value is string => typeof value === "string";
const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
const isOptionalString = (value: unknown): value is string | undefined =>
	typeof value === "undefined" || typeof value === "string";
const isOptionalBoolean = (value: unknown): value is boolean | undefined =>
	typeof value === "undefined" || typeof value === "boolean";

const isApplicationMutipleGroups = (value: unknown): value is ApplicationMutipleGroups => {
	if (!value || typeof value !== "object") return false;

	const data = value as Record<string, unknown>;
	return (
		Array.isArray(data.groups) &&
		data.groups.every(isString) &&
		isString(data.uid) &&
		isString(data.created_at) &&
		isString(data.updated_at) &&
		isString(data.grade) &&
		isString(data.institute) &&
		isString(data.major) &&
		isString(data.rank) &&
		isString(data.intro) &&
		isBoolean(data.is_quick) &&
		isOptionalBoolean(data.is_project_c) &&
		isString(data.referrer) &&
		isOptionalString(data.qq_account) &&
		isString(data.resume) &&
		isString(data.candidate_id) &&
		isString(data.recruitment_id) &&
		isOptionalString(data.answer) &&
		isOptionalString(data.title)
	);
};

const getValidatedInitValue = (): ApplicationMutipleGroups | undefined => {
	const raw = localStorage.getItem("latest");
	if (!raw) return undefined;

	try {
		const parsed = JSON.parse(raw) as unknown;
		if (isApplicationMutipleGroups(parsed)) return parsed;
	} catch {
		// Ignore malformed JSON and clear stale cache below.
	}

	localStorage.removeItem("latest");
	return undefined;
};

//ly: if we just use UserInfoStore, if we change data in  User Page, data in History Page will also change, so this store is just for User Page
const createLatestApplicationStore = () => {
	const initValue = getValidatedInitValue();
	const { set, subscribe, update } = writable<ApplicationMutipleGroups>(initValue);
	const setApplication = (userInfo: User) => {
		const groups = userInfo.applications
			.filter(
				(app) =>
					app.recruitment_id === userInfo.applications[0]?.recruitment_id &&
					!app.rejected &&
					!app.abandoned
			)
			.map((app) => app.group)
			.filter((g) => g);
		const info: ApplicationMutipleGroups = {
			...userInfo.applications[0],
			groups,
			qq_account: userInfo.qq_account
		};
		set(info);
		localStorage.setItem("latest", JSON.stringify(info));
	};
	const updateInfo = (info: EditableInfo) =>
		update((oldInfo) => {
			oldInfo = oldInfo ?? ({} as ApplicationMutipleGroups);
			const newInfo = produce(oldInfo, (draft) => {
				Object.keys(info).forEach((key) => {
					if (key === "groups") {
						draft[key] = info[key].map((item: string) => item.toLowerCase());
					} else {
						draft[key] = info[key];
					}
				});
			});
			localStorage.setItem("latest", JSON.stringify(newInfo));
			return newInfo;
		});
	return { subscribe, setApplication, updateInfo };
};

export const latestInfo = createLatestApplicationStore();
