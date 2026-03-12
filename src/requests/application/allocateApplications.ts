import { http } from "../http";

interface Params {
	aid: string;
	type: "team" | "group";
	iid: string;
}

export const allocateInterviewTime = ({ aid, type, iid }: Params) =>
	http.put(`/applications/${aid}/interview/${type}/self`, { interview_id: iid });
