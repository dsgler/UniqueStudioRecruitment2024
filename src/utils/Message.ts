import MessageComponent from "../components/public/Message.svelte";

export class Message {
	public static success(content: string) {
		const container = document.createElement("div");
		document.body.appendChild(container);
		const message = new MessageComponent({
			target: container,
			props: {
				type: "success",
				content,
				onClose: () => {
					message.$destroy();
					container.remove();
				}
			}
		});
	}
	public static warning(content: string) {
		const container = document.createElement("div");
		document.body.appendChild(container);
		const message = new MessageComponent({
			target: container,
			props: {
				type: "warning",
				content,
				onClose: () => {
					message.$destroy();
					container.remove();
				}
			}
		});
	}
	public static error(content: string) {
		const container = document.createElement("div");
		document.body.appendChild(container);
		const message = new MessageComponent({
			target: container,
			props: {
				type: "error",
				content,
				onClose: () => {
					message.$destroy();
					container.remove();
				}
			}
		});
	}
}
