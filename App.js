/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FireBase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import Login from './src/components/Login/Login';
import Loader from './src/components/Loader/Loader';
import Navigation from './src/components/Navigation/Navigation';
import PeopleReducer from './src/reducers/PeopleReducer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const store = createStore(PeopleReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    FireBase.initializeApp({
      apiKey: "<APIKEY>",
      authDomain: "<AUTHDOMAIN>",
      databaseURL: "<DB>",
      projectId: "<PROJECTID>",
      storageBucket: "<BUCKET>",
      messagingSenderId: "<SENDERID>"
    });

    FireBase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    })
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true: 
        return <Navigation />
      case false: 
        return <Login />
      default:
        return <Loader size="large" />
    }
  }
  render() {
    return (
      <Provider store={store}>
        {this.renderInitialView()}
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
