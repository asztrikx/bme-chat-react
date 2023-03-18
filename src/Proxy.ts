import { OutgoingPacket, InboxDto, IncomingPacket } from "./chat";

class Proxy {
	private ws: WebSocket;
	inbox: InboxDto | null = null;

	constructor() {
		this.ws = new WebSocket("ws://ws.ifelse.io/");
		this.ws.addEventListener("open", () => {
		});
		this.ws.addEventListener("message", (e) => {
			let p = <IncomingPacket> JSON.parse(e.data);
			switch (p.type) {
				case "error":
					alert(p.message);
					break;
				case "login":
					this.inbox = p.inbox;
					break;
				case "message":
					let cid = p.channelId;
					this.inbox!.conversations.find(
						(x) => x.channelId === cid
					)?.lastMessages.push(p.message);
					break;
				case "conversationAdded":
					this.inbox!.conversations.push(p.conversation);
					break;
			}
		});
	}

	sendPacket(packet: OutgoingPacket) {
		this.ws.send(JSON.stringify(packet));
	}
}

export var proxy = new Proxy();
