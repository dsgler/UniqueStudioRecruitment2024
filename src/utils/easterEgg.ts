import font from "figlet/importable-fonts/3D-ASCII";
import figlet from "figlet";
import chalk from "chalk";
import { drawFireWork } from "./firework";

/**
 * 初始化彩蛋：控制台 ASCII art + Ctrl+Shift+U 烟花特效
 * @returns 清理函数，在组件销毁时调用
 */
export function initEasterEgg(): () => void {
	const canvas = document.createElement("canvas");
	let deleted = false;

	const handler = (e: KeyboardEvent) => {
		if (e.shiftKey && e.ctrlKey && e.code === "KeyU") {
			drawFireWork(canvas, deleted);
			deleted = !deleted;
		}
	};

	figlet.parseFont("3d", font);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(figlet as any)
		.text("Unique Studio", { font: "3d" }, () => {})
		.then((text: string) => {
			console.log(
				chalk.cyan(text) +
					"\n" +
					chalk.blue("听说按下 ctrl + shift + u 会有神奇的事发生~") +
					"\n" +
					chalk.yellow("developed by Unique Web ") +
					chalk.green("@HUST-SE-LY @willburwwb @yqaty @Yuukirn")
			);
		});

	window.addEventListener("keydown", handler);
	return () => window.removeEventListener("keydown", handler);
}
