import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: false
    };
    this.registerUser = this.registerUser.bind(this);
  }

  confirm_password(){
    const { password, password_confirmation } = this.state;
    if(password == password_confirmation){
      return true;
    }else{
      return false;
    }
  }

  registerUser() {
    const { username, email, password } = this.state;

    if(this.confirm_password()){
    this.setState({ error: '', loading: true });
    // NOTE HTTP is insecure, only post to HTTPS in production apps
    
    axios.post("http://192.168.1.4:8080/users/signup",{
      
        username: username,
        email: email,
        password: password,
        roles: [
          "ROLE_USER"
      ]
      
    },)
    .then((response) => {
       // Handle the JWT response here
    })
    .catch((error) => {
       // Handle returned errors here
       this.setState({
        //error: 'Registration Failed',          --- Uncomment here
        loading: false
      });

      ///////////////////////////////// ----This should go to http response success--put here for testing only
      this.props.makeNotice('Registration successful, plz login');
      this.props.authSwitch();   // This will direc to login view
      ////////////////////////////////
    });
  }else{
    this.setState({
      error: 'Confirm password incorrect',
      loading: false
    });
  }
  }

  render() {
    const { username, email, password, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>
        <View style={form}>
        <View style={section}>
            <Input
              placeholder="username"
              label="Username"
              value={username}
              onChangeText={username => this.setState({ username })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.registerUser}>
              Register
            </Button>
            :
            <Loading size={'large'} />
          }
        </View>
        <TextLink onPress={this.props.authSwitch}>
          Already have an account? Log in!
        </TextLink>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export { Registration };
