import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'
import TabOneScreen from '../screens/TabOneScreen/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';
import { Image, StyleSheet, View, Text, } from 'react-native'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  
  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      tabBarOptions={
        {
          activeTintColor: '#FFCF6E',
          inactiveTintColor: 'white',
          style: {
            borderTopColor: '#CDCCCE',
            backgroundColor: '#D6DCF3'
          }
        }
      }
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <FontAwesome5 size={size} name="user" color={color} />,  
        }}
        
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <FontAwesome5 size={size} name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          title: 'Padaria',
          tabBarIcon: ({ color, size }) => <FontAwesome5 size={size} name="industry" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: () => (<><View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../assets/images/owner1.png')} /><Text style={style.textHeader}>Meu Perfil</Text></View></>),
          headerStyle: {
            backgroundColor: '#E8EDFF',
          },
          headerLeft: () => (<></>),
        }}
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
        options={{
          headerTitle: () => (<View style={style.containerHome}><Image resizeMode="contain" style={style.imagemHome} source={require('../assets/images/owner1.png')} /></View>),
          headerStyle: {
            backgroundColor: '#E8EDFF',
          },
          headerLeft: () => (<></>),
        }}
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
        options={{
          headerTitle: () => (<><View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../assets/images/owner1.png')} /><Text style={style.textHeader}>Minha padaria</Text></View></>),
          headerStyle: {
            backgroundColor: '#E8EDFF'
          },
          headerLeft: () => (<></>),
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const style = StyleSheet.create({
  imagem: {
    height: 50,
    display: 'flex',
    alignSelf: 'center',
    width: 130,
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    flex: 1,
    position: 'relative',
    right: '60%',
  },
  imagemHome: {
    height: 50,
    display: 'flex',
    alignSelf: 'center',
    width: 130,
  },
  containerHome: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    right: '60%',
  },
  textHeader: {
    alignSelf: 'center',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#8A8986'
  }
})
