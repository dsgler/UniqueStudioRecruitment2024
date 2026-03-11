import { http } from "../http";

// 设置候补面试时间

interface Params {
	iids: string[];
	aid: string;
	type: "team" | "group";
}

export const setFallbackInterviewTimes = ({ iids, aid, type }: Params) =>
	http.put(`/applications/${aid}/slots/${type}`, { iids });
