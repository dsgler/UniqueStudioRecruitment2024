import type { SingleTime } from "../../types";
import { http } from "../http";

export const getInterviewTimes = (rid: string, name: string = "unique") =>
	http.get<SingleTime[]>(`/recruitments/${rid}/interviews/${name}`);
