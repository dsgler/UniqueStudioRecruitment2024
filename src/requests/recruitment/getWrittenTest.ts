import { http } from "../http";

export const getWrittenTest = (rid: string, group: string) =>
	http.getRaw(`/recruitments/${rid}/file/${group.toLocaleLowerCase()}/WrittenTest`);
