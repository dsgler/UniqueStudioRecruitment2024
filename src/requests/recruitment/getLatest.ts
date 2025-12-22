import type { Recruitment } from "../../types/recruitment";
import { http } from "../http";

//ly: it will get the latest recruitment by beginning time;
export const getLatestRecruitment = () => http.get<Recruitment>("/recruitments/pending");
