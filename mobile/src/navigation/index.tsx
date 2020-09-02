import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View, ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChangeAdress from '../screens/TabThreeScreen/components/ChangeAdress/ChangeAdress';
import Walkthrough from '../screens/Walkthrough/Walkthrough'
import { RootStackParamList } from '../../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import InfoBakery from '../screens/TabThreeScreen/components/Infos/InfoBakery';
import Login from '../screens/Login/Login'
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword'
import ClosedBakery from '../screens/ClosedBakery/ClosedBakery'
import ChangePassword from '../screens/ChangePassword/ChangePassword'
import ChangeContactInfo from '../screens/ChangeContactInfo/ChangeContactInfo';
import FirstScreenRegister from "../screens/BakeryRegister/FirstScreenRegister/FirstScreenRegister";
import SecondScreenRegister from "../screens/BakeryRegister/SecondScreenRegister/SecondScreenRegister";
import ThirdScreenRegister from "../screens/BakeryRegister/ThirdScreenRegister/ThirdScreenRegister";
import FifthScreenRegister from "../screens/BakeryRegister/FifthScreenRegister/FifthScreenRegister";
import FourthScreenRegister from '../screens/BakeryRegister/FourthScreenRegister/FourthScreenRegister'
import CNPJScreen from '../screens/BakeryRegister/CNPJScreen/CNPJScreen'
import WalkThroughTutorial from '../screens/WalkthroughTutorial/WalkthroughTutorial'
import ChangePasswordForgot from '../screens/ForgotPassword/ChangePassword/ChangePassword'
import { Feather } from '@expo/vector-icons';

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
      <Stack.Screen name="Root" component={Login} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ChangeAdress" component={ChangeAdress}
        options={
          {
            headerShown: true,
            headerTitle: () => (<><View style={style.container}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
            animationEnabled: true,
            headerTintColor: '#FEC044',
            headerStyle: {
              backgroundColor: '#E8EDFF',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }
        } />
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
      <Stack.Screen name="ClosedBakery" component={ClosedBakery} options={{
        headerShown: true,
        headerTitle: () => (
          <>
            <View style={[style.containerForgot]}>
              <Image resizeMode="contain" style={style.imagemHome} source={require('../../assets/images/owner1.png')} />
            </View>
          </>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#E8EDFF'
        },
        headerLeft: () => (<></>),
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#E8EDFF'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />
      <Stack.Screen name="ChangeContactInfo" component={ChangeContactInfo} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#E8EDFF'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />

      <Stack.Screen name="CNPJScreen" component={CNPJScreen} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />

      <Stack.Screen name="FirstScreenRegister" component={FirstScreenRegister} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />

      <Stack.Screen name="SecondScreenRegister" component={SecondScreenRegister} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />


      <Stack.Screen name="ThirdScreenRegister" component={ThirdScreenRegister} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />

      <Stack.Screen name="FourthScreenRegister" component={FourthScreenRegister} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />

      <Stack.Screen name="FifthScreenRegister" component={FifthScreenRegister} options={{
        headerShown: true,
        headerTitle: () => (<></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#F4EEEE'
        },
        headerLeft: () => (<></>),
        animationEnabled: true,
        headerTintColor: '#FEC044',
      }} />
      <Stack.Screen name="WalkthroughTutorial" component={WalkThroughTutorial} />
      <Stack.Screen name="ChangePasswordForgot" component={ChangePasswordForgot} options={{
        headerShown: true,
        headerTitle: () => (<><View style={[style.container]}><Image resizeMode="contain" style={style.imagem} source={require('../../assets/images/owner1.png')} /></View></>),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: "#F4EEEE",
        },
        headerLeft: () => (<></>),
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
  containerForgot: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  helpIcon:{
    alignSelf: "center",
    color: "red"
  },
  imagemHome: {
    height: 50,
    alignSelf: 'center',
    width: 130,
    marginLeft: '20%'
  },
})

