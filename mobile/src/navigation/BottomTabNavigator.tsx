import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FontAwesome5, Feather } from '@expo/vector-icons'
import TabOneScreen from '../screens/TabOneScreen/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../../types';
import { Image, StyleSheet, View, Text} from 'react-native'
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
          headerTitle: () => (
              <>
                <View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} />
                <Text style={style.textHeader}>Meu Perfil</Text></View>
              </>
            ),
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
  const navigation = useNavigation();

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: () => (
            <View style={style.containerHome}>
              <Image resizeMode="contain" style={style.imagemHome} source={require('../../assets/images/owner1.png')} />
              <Feather onPress={() => navigation.navigate('WalkthroughTutorial')} style={style.helpIcon} name="help-circle" size={25} />
            </View>
          ),
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
          headerTitle: () => (<><View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /><Text style={style.textHeader}>Minha padaria</Text></View></>),
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
    width: 130,
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
  },
  imagemHome: {
    height: 50,
    width: 130,
    marginLeft: "18%"
  },
  containerHome: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#8A8986'
  },
  helpIcon: {
  }
})
