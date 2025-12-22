import { Message } from "../../utils/Message";
import { download } from "../../utils/download";
import { http } from "../http";

export const getResume = async (aid: string, fileName: string) => {
	const res = await http.getRaw(`/applications/${aid}/resume`);
	if (!res.ok) {
		Message.error("下载简历失败");
		return;
	}
	const blob = await res.blob();
	download(fileName, blob);
};
