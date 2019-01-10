import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
  },
  icon: {
    paddingBottom: 2,
  }
});

export default class CompanyList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Companies',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'business'}
        size={45} 
        style={{ color: tintColor }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Companies</Text>
        <Text>This page is under construction !!!</Text>
      </View>
    );
  }
}
