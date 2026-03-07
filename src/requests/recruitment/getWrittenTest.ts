import { http } from "../http";

export const getWrittenTest = (rid: string, group: string) =>
	http.getRaw(`/recruitments/${rid}/file/${group.toLocaleLowerCase()}/WrittenTest`);

export const getWrittenTestUrl = (rid: string, group: string) =>
	http.getRaw(`/recruitments/${rid}/written-test-url/${group.toLocaleLowerCase()}`);

export const getWrittenTestType = (rid: string, group: string) =>
	http.getRaw(`/recruitments/${rid}/written-test-type/${group.toLocaleLowerCase()}`);
