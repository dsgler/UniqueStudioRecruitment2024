import { http } from "../http";

export const abandonApplication = (aid: string) => http.put(`/applications/${aid}/abandoned`);
