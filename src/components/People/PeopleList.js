import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleItem from './PeopleItem';
import PersonDetail from './PersonDetail';
import { loadInitialContacts } from '../../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
});

class PeopleList extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'user'}
        size={45} 
        style={{ color: tintColor }}
      />
    )
  }

  renderInitialView() {
    const ds = new ListView.DataSource ({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);

    if (this.props.detailView === true) {
      return (
        <PersonDetail />
      );
    } else {
      return (
        <ListView 
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) => 
            <PeopleItem people={rowData} />
          }
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { 
    people: state.people,
    detailView: state.detailView,
  };
}

export default connect(mapStateToProps, { loadInitialContacts })(PeopleList);