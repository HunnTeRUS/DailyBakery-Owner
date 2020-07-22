import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import BottomTabNavigator from '../../navigation/BottomTabNavigator'
import NotFoundScreen from '../../screens/NotFoundScreen';


const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = height * 0.61

const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")};
const Stack = createStackNavigator<RootStackParamList>();
const style = StyleSheet.create({
    container: {
        width,
    },
    titleContainer:{
        height: 200,
        justifyContent: "center",
        transform: [{translateY:(SLIDE_HEIGHT - 100)/2}],
    },
    title: {
        lineHeight: 90,
        fontSize: 45,
        fontFamily: "Poppins-Regular",
        color: "white",
        textAlign: "center",
        justifyContent: "center",
    },
})
interface SlideProps {
    label: string,
    last?: boolean,
}

const Slide = ({ label, last}: SlideProps) => {
    if(last){
        return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>
                    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />                
            </Stack.Navigator>
        );
    }
    return(
        <View style={style.container}>
            <View style={style.titleContainer}>
            <Text style={style.title}>{label}</Text>
            </View>
        </View>
    );
};


export default Slide;