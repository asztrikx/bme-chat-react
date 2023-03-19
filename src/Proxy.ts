import { OutgoingPacket, InboxDto, IncomingPacket, MessageDto } from "./chat";
import { EventProducer } from "./EventProducer";

class Proxy extends EventProducer<ProxyEventMap> {
	private ws: WebSocket;
	inbox: InboxDto | null = null;

	constructor() {
		super();
		this.ws = new WebSocket("wss://raja.aut.bme.hu/chat");
		this.ws.addEventListener("open", () => {
			proxy.addEventListener("login", () => {
			  console.log("Yey!");
			});	  
		});
		this.ws.addEventListener("message", (e) => {
			let p = <IncomingPacket> JSON.parse(e.data);
			switch (p.type) {
				case "error":
					alert(p.message);
					break;
				case "login":
					this.inbox = p.inbox;
					this.dispatch("login");
					break;
				case "message":
					let cid = p.channelId;
					this.inbox!.conversations.find(
						(x) => x.channelId === cid
					)?.lastMessages.push(p.message);
					this.dispatch("message", cid, p.message);
					break;
				case "conversationAdded":
					this.inbox!.conversations.push(p.conversation);
					this.dispatch("message", p.conversation.channelId);
					break;
			}
		});
	}

	sendPacket(packet: OutgoingPacket) {
		this.ws.send(JSON.stringify(packet));
	}
}

interface ProxyEventMap {
	login: () => void;
	message: (channelId: string, message: MessageDto) => void;
	conversation: (channelId: string) => void;
}

export var proxy = new Proxy();
