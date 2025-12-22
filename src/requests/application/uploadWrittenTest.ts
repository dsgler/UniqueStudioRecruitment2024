import { http } from "../http";

export const uploadWrittenTest = (aid: string, data: FormData) =>
	http.put(`/applications/${aid}/file/WrittenTest`, data);
