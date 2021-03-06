import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { apiurl } from 'react-native-dotenv';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false
    };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    const { username, password } = this.state;

    this.setState({ error: '', loading: true });

    // NOTE Post to HTTPS only in production
    axios.post(`${apiurl}users/signin`, null, {params: { 
      username: username,
        password: password
    }})
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.token);
      this.props.newJWT(response.data.token);
    })
    .catch((error) => {
      console.log(error);
      this.onLoginFail();
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }

  render() {
    const { username, password, error, loading } = this.state;
    const { form, section, errorTextStyle, noticeTextStyle } = styles;

    return (
      <Fragment>
        <Text style={noticeTextStyle}>
            {this.props.notice}
          </Text>

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
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.loginUser}>
              Login
            </Button>
            :
            <Loading size={'large'} />
          }

        </View>
        <TextLink onPress={this.props.authSwitch}>
          Don't have an account? Register!
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
  },
  noticeTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'green'
  }
};

export { Login };
