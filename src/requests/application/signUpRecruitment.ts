import { http } from "../http";

export const signUpRecruitment = (formData: FormData) =>
	http.postFormData("/applications/", formData);
