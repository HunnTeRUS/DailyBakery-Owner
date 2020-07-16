import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {FontAwesome5} from '@expo/vector-icons'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      tabBarOptions={{ activeTintColor: '#FFCF6E', inactiveTintColor: '#CDCCCE', showLabel: false }}
      >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="industry" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Seu perfil' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Inicio' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'Sua padaria' }}
      />
    </TabThreeStack.Navigator>
  );
}
