import type { User } from "../../types/user";
import { http } from "../http";

export const getInfo = () => http.get<User>("/user/me");
