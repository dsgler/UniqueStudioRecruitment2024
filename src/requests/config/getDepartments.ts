import { http } from "../http";

// ly: whiteboard nodes type: https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list?appId=cli_a74bda9b7218500d
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDepartments = () => http.get<any>("/config/whiteboard", {
  whiteboard_id: "OiAWws7ZKhXIAkbT7Qvc1btJnwc",
});