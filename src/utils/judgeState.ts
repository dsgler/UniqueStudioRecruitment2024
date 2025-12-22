import { ProcessState } from "../config/const";

//ly: this function aims to judge if recruitment is pending or not;
export const judgeState = (end: string) => {
	const endTime = new Date(end).getTime();
	const curTime = new Date().getTime();
	return curTime < endTime ? ProcessState.PROCESSING : ProcessState.OVER;
};
