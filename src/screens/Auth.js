import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Registration } from '../components';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: false,
      notice: ''
    };
    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
    this.makeNotice = this.makeNotice.bind(this);
    this.message = '';
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  makeNotice(mess){
    this.message = mess;
  }

  whichForm() {
    if(!this.state.showLogin){
      return(
        <Registration newJWT={this.props.newJWT} makeNotice={this.makeNotice}  authSwitch={this.authSwitch}/>
      );
    } else {
      return(
        <Login newJWT={this.props.newJWT} notice={this.message} authSwitch={this.authSwitch}/>
      );
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this.whichForm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
};
