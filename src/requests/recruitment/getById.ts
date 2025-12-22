import type { Recruitment } from "../../types/recruitment";
import { http } from "../http";

//ly: get recruitment by recruitment-id (recruitment-id could be found in application)
export const getRecruitmentById = (rid: string) => http.get<Recruitment>(`/recruitments/${rid}`);
