import type { InterviewTime, SingleTime } from "../types";

//ly: type 'SingleTime' is the return-type of backend, type 'InterviewTime' is the useful type when rendering UI
//ly: this function aims to switch SingleTime to InterviewTime, maybe it is dumb cuz my algorithm is a piece of shit :(
export const parseInterviewTime = (times: SingleTime[]) => {
	const res: InterviewTime[] = [];

	const toInterviewTime = (time: SingleTime) => ({
		startTime: time.start,
		endTime: time.end,
		uuid: time.uid,
		name: time.name,
		applications: time.applications,
		select_number: time.select_number,
		slot_number: time.slot_number
	});

	times.forEach((time) => {
		const tree = res.find((el) => el.date === time.date);
		if (tree) {
			const detail = tree.detail.find((el) => el.period === time.period);
			if (detail) {
				detail.time.push(toInterviewTime(time));
			} else {
				tree.detail.push({
					period: time.period,
					time: [toInterviewTime(time)]
				});
			}
		} else {
			res.push({
				date: time.date,
				detail: [
					{
						period: time.period,
						time: [toInterviewTime(time)]
					}
				]
			});
		}
	});
	return res;
};
