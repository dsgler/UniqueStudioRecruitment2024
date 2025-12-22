import { http } from "../http";

export const updateApplication = (aid: string, data: FormData) =>
	http.put(`/applications/${aid}`, data);
