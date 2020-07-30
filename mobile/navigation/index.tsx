import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View, Text,ColorSchemeName, AsyncStorage } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import ChangeAdress from '../screens/TabThreeScreen/components/ChangeAdress/ChangeAdress';
import Walkthrough from '../screens/Walkthrough/Walkthrough'
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import InfoBakery from '../screens/TabThreeScreen/components/Infos/InfoBakery';
import Login from '../screens/Login/Login'
import ForgotPassword from '../screens/Login/ForgotPassword/ForgotPassword'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ChangeAdress" component={ChangeAdress} 
        options={
          {
            headerShown: true,
            headerTitle: () => (<><View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../assets/images/owner1.png')} /></View></>),
            animationEnabled: true,
            headerTintColor: '#FEC044',
            headerStyle: {
              backgroundColor: '#E8EDFF',
            }
          }
        }/>
      <Stack.Screen name="InfoBakery" component={InfoBakery} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        headerShown: true,
        headerTitle: () => (<><View style={{}}></View></>),
        headerStyle: {
          backgroundColor: '#F4EEEE',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  imagem: {
    height: 50,
    marginRight: '20%',
    width: 130,
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

