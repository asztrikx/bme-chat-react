import { Component } from "react";
import { ConversationDto } from "./chat";
import { LeftPane } from "./LeftPane";
import { proxy } from "./Proxy";

export class Main extends Component {
	state = { selectedConversation: undefined as ConversationDto | undefined };
	render() {
		return (
			<div className="main row">
				<LeftPane
					inbox={proxy.inbox!}
					selectedConversation={this.state.selectedConversation}
					onSelect={(c) => this.setState({ selectedConversation: c })}
				/>
				<RightPane conversation={this.state.selectedConversation} />
			</div>
		);
	}
}
