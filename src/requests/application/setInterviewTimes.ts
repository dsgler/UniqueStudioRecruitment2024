import { http } from "../http";

interface Params {
	iids: string[];
	aid: string;
	type: "team" | "group";
}

export const setInterviewTimes = ({ iids, aid, type }: Params) =>
	http.put(`/applications/${aid}/slots/${type}`, { iids });
