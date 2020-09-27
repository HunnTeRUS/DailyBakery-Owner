import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FontAwesome5, Feather } from '@expo/vector-icons'
import TabOneScreen from '../screens/TabOneScreen/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../../types';
import { Image, StyleSheet, View, Text, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  
  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      tabBarOptions={
        {
          activeTintColor: '#FFCF6E',
          inactiveTintColor: 'white',
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: "#A0522D",
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
          header: () => (
            <View style={style.container}>
              <View style={style.containerCenter}>
                <Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} />
                <Text style={style.textHeader}>Meu perfil</Text>
              </View>
            </View>
          )
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const navigation = useNavigation();

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          header: () => (
            <View style={style.containerHome}>
              <View style={style.containerPic}>
                <Image resizeMode="contain" style={style.imagemHome} source={require('../../assets/images/owner1.png')} />
              </View>
              <View style={style.containerIcon}>
                <Feather onPress={() => navigation.navigate('WalkthroughTutorial')} style={style.helpIcon} name="help-circle" size={25} />
              </View>
            </View>
          ),
          animationEnabled: true,
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
          header: () => (
            <View style={style.container}>
              <View style={style.containerCenter}>
                <Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} />
                <Text style={style.textHeader}>Minha padaria</Text>
              </View>
            </View>
          )
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const style = StyleSheet.create({
  imagem: {
    height: 50,
    width: 130,
    alignSelf: "center",
  },
  containerCenter:{
    flexDirection: "row",
    marginRight: "10%",
    paddingVertical: 4
  },
  container: {
    backgroundColor: "#A0522D",
    borderBottomWidth: 2,
    borderBottomColor: "#D3D3D3",
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
  },
  containerPic: {
    width: "90%",
    alignItems: 'center'
  },
  containerIcon:{
    flex: 1,
  },
  imagemHome: {
    height: 50,
    width: 130,
    marginLeft: "10%"
  },
  helpIcon: {
    alignSelf: "center",
    color: "white"
  },
  containerHome: {
    backgroundColor: "#A0522D",
    borderBottomWidth: 2,
    borderBottomColor: "#D3D3D3",
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white'
  },
})
