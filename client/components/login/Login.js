import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	paperStyle: {
  		margin: window.innerHeight/3,
  		textAlign: 'center'
	},
	buttonStyle: {
		marginTop: 20
	},
	inputStyle: {
		width: "100%"
	}

}
class Login extends Component {
	constructor(props, context) {
		super(props, context);
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
    console.log(JSON.stringify(data, null, 4));
    this.context.router.replace({pathname: 'chat', query: {userId: data.userName}});
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
	render() {
		return(
			<Paper zDepth={2} style={styles.paperStyle}>
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
              		<Col xs={8} sm={8} md={8} lg={8}>
              			<FormsyText
                  			name="userName"
                  			validations="minLength:1"
                  			validationError="Enter your twitter id"
                  			required
                  			hintText="Provide your Twitter ID"
                  			floatingLabelText="User Name"
                  			style={styles.inputStyle}
                  			updateImmediately
                		/>
              		</Col>
              		<Col xs={4} sm={4} md={4} lg={4}>
              			<RaisedButton
                            type="submit"
                            label="JoinChat"
                            primary={ true }
                            style={styles.buttonStyle}
                            disabled={ !this.state.canSubmit } />
              		</Col>
              		</Row>
              		</Col>
              	</Row>
              </Grid>
            </Formsy.Form>
			</Paper>
		)
	}
}

export default Login;

Login.contextTypes = {
  router: React.PropTypes.object
};