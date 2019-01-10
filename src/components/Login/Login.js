import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import firebase from 'firebase';

import Loader from '../Loader/Loader';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const LoginButton = MKButton.coloredButton()
  .withText('LOGIN')
  .build();

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
  },
});

export default class App extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({
      error: '', loading: true 
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess.bind(this))
          .catch(this.onAuthFailed.bind(this))
      })
  }

  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  onAuthFailed() {
    this.setState({
      error: 'Authentication Failed',
      loading: false,
    });
  }

  renderLoader() {
    if (this.state.loading) {
      return <Loader size="large" />
    } else {
      return <LoginButton onPress={this.onButtonPress.bind(this)} />
    }
  }

  render() {
    const { form, fieldStyles, loginButtonArea, errorMessage, container, welcome } = styles;
    return (
      <View style={container}>
        <View style={form}>
          <Text style={welcome}>Login or create an account</Text>
          <MKTextField 
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
            textInputStyle={fieldStyles}
            placeholder={'Email'}
            tintColor={MKColor.Teal}
          />
          <MKTextField 
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            textInputStyle={fieldStyles}
            placeholder={'Password'}
            tintColor={MKColor.Teal}
            password={true}
          />
          <Text style={errorMessage}>
            {this.state.error}
          </Text>
          <View style={loginButtonArea}>
            {this.renderLoader()}
          </View>
        </View>
      </View>
    );
  }
}
