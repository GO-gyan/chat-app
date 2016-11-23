import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import ChatInput from './ChatInput';
import ChatText from './ChatText';
import IO from 'socket.io-client';

const socket = IO.connect();
const styles = {
	textStyle: {
		color: "white",
		textAlign: "center"
	},
	chatBoxStyle: {
		position: "relative",
    	height: "100%",
		margin: "0 auto"
	},
	actionBar: {
    	position: "relative",
    	width: "100%",
    	borderTop: "1px solid #dae2e3"
  },
   messageList: {
    height: 600,
    listStyle: "none",
    overflowY: "scroll"
  },
  listMargin: {
  	marginTop: 20
  }
}
const chatMessages = [];
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: this.props.location.query.userId,
			chatMessages: chatMessages
		}
	}
	componentDidMount() {
		socket.on('send:message', this._recieveMessage.bind(this));
		// Scroll to the bottom on initialization
		if(this.state.chatMessages.length > 1) {
    		var len = this.state.chatMessages.length - 1;
    		const node = ReactDOM.findDOMNode(this['_div' + len]);
    		if (node) {
      			node.scrollIntoView();
    		}
    	}
	}
	componentDidUpdate() {
    	// Scroll as new elements come along
    	if(this.state.chatMessages.length > 1){
    		var len = this.state.chatMessages.length - 1;
    		const node = ReactDOM.findDOMNode(this['_div' + len]);
    		if (node) {
      			node.scrollIntoView();
    		}
    	}
  }
	_recieveMessage(message) {
		chatMessages.push(message);
		this.setState({chatMessages});
	}
	addChatMessages(message) {
		chatMessages.push(message);
		this.setState({chatMessages});
		socket.emit('send:message', message);
	}

	render() {
		const userName = this.state.userName;
		const chats = this.state.chatMessages;
		let listView = []
    	for(let i=0; i < chatMessages.length; i ++) {
           listView.push(<li key={i} style={styles.listMargin} ref={(ref) => this['_div'+i] = ref}>
              <ChatText chatTextMessages = {chats[i]}/>
            </li>);
          }
		return(
			<div>
				<h2 style={styles.textStyle}>Hi {userName}! Welcome</h2>
				<Paper zDepth={5} style={styles.chatBoxStyle}>
				<ul style= {styles.messageList}>
            		{listView}
          		</ul>
				<div style={styles.actionBar}>
					<ChatInput addChat={this.addChatMessages.bind(this)} userName={userName}/>
				</div>
				</Paper>
			</div>
			)
	}
}

export default Chat;