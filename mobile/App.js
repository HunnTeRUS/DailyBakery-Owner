import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ProfileScreen, HomeScreen, BakeryScreen} from './screens'
import { FontAwesome5 } from '@expo/vector-icons'
  
const TabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <FontAwesome5 focused={focused} name="user" size={24} color={tintColor}/>
      }
    },
    Home:{
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <FontAwesome5 focused={focused} name="home" size={24} color={tintColor}/>
      },
    },
    Bakery: {
      screen: BakeryScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => <FontAwesome5 focused={focused} name="industry" size={24} color={tintColor}/>
      }
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#FFCF6E',
      inactiveTintColor: '#CDCCCE',
      keyboardHidesTabBar: true,
      style: {
        borderTopColor: '#FFCF6E'
      }
      
    },
    initialRouteName: 'Home'
  }
);

export default createAppContainer(TabNavigator);