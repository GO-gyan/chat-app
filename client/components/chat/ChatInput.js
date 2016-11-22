import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const styles = {
	inputArea: {
		width: "100%"
	}
}
class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false
		}
	}
	enableButton() {
    	this.setState({
      		canSubmit: true
    	});
  	}

  	disableButton() {
    	this.setState({
      	canSubmit: false
    	});
  	}

  	submitForm(data) {
    	var newMessage = {
    		  author: this.props.userName,
      		chatTime: "19:00:06 am",
      		chatText: data.messages,
      		authorAvtar: "https://twitter.com/@"+this.props.userName+"/profile_image?size=original"
    	}
    	this.props.addChat(newMessage);
		this.refs.chat.setState({value: ''});
  	}

  	notifyFormError(data) {
    	console.error('Form error:', data);
  	}

	render() {
		return(
			<Formsy.Form
                    onValid={this.enableButton.bind(this)}
                    onInvalid={this.disableButton.bind(this)}
                    onValidSubmit={this.submitForm.bind(this)}
                    onInvalidSubmit={this.notifyFormError.bind(this)}
                  >
            <Grid>
              <Row>
                <Col xs={12}>
                <Row center="xs">
                <Col xs={11} sm={11} md={11} lg={11}>
                <FormsyText
                  name="messages"
                  validations="minLength:1"
                  validationError="Type your message"
                  required
                  hintText="Type your message"
                  ref="chat"
                  updateImmediately
                  style = {styles.inputArea}
                />
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <IconButton
                    type="submit"
                    disabled={!this.state.canSubmit}
                  ><ContentSend/></IconButton>
                </Col>
                </Row>
                </Col>
              </Row>
            </Grid>
            </Formsy.Form>
			)
	}

}

export default ChatInput;