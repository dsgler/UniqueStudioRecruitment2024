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

// 该 store 只保存“用户资料页编辑草稿”，不是后端真值。
// 后端真值统一放在 userInfo store。
const createLatestDraftStore = () => {
	const initValue = getValidatedInitValue();
	const { set, subscribe, update } = writable<ApplicationMutipleGroups | undefined>(initValue);

	const persist = (data: ApplicationMutipleGroups | undefined) => {
		if (!data) {
			localStorage.removeItem("latest");
			return;
		}
		localStorage.setItem("latest", JSON.stringify(data));
	};

	const hydrateFromUser = (user: User) => {
		const latestApplication = user.applications[0];
		if (!latestApplication) {
			set(undefined);
			persist(undefined);
			return;
		}

		const groups = user.applications
			.filter(
				(app) =>
					app.recruitment_id === latestApplication.recruitment_id && !app.rejected && !app.abandoned
			)
			.map((app) => app.group)
			.filter((g) => g);
		const info: ApplicationMutipleGroups = {
			...latestApplication,
			groups,
			qq_account: user.qq_account
		};
		set(info);
		persist(info);
	};

	const patchDraft = (info: EditableInfo) =>
		update((oldInfo) => {
			if (!oldInfo) return oldInfo;
			const newInfo = produce(oldInfo, (draft) => {
				Object.keys(info).forEach((key) => {
					if (key === "groups") {
						draft[key] = info[key].map((item: string) => item.toLowerCase());
					} else {
						draft[key] = info[key];
					}
				});
			});
			persist(newInfo);
			return newInfo;
		});

	return { subscribe, hydrateFromUser, patchDraft };
};

export const latestDraft = createLatestDraftStore();
