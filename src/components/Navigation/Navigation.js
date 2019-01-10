import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import PeopleList from '../People/PeopleList';
import CompanyList from '../Company/CompanyList';
import AddPerson from '../People/AddPerson';

// const navigation = TabNavigator({
//   PeopleList: { screen: PeopleList },
//   AddPerson: { screen: AddPerson },
//   CompanyList: { screen: CompanyList },
// }, {
//   tabBarOptions: {
//       activeTintColor: 'white',
//       inactiveTintColor: '#80cbc4',
//       swipeEnabled: true,
//       showLabel: false,
//       style: {
//           backgroundColor: '#26a69a',
//       },
//   },
// });

const navigation = createBottomTabNavigator({
  PeopleList: PeopleList,
  AddPerson: AddPerson,
  CompanyList: CompanyList
});

export default createAppContainer(navigation);