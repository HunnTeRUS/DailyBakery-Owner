import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = height * 0.61

const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")};
const Stack = createStackNavigator<RootStackParamList>();
const style = StyleSheet.create({
    container: {
        width,
        overflow: "hidden",
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
    underlay:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:"flex-end",
    },
    picture:{
        ...StyleSheet.absoluteFillObject,
        
        width: undefined,
        height: undefined,
        justifyContent: "flex-end",
        borderBottomRightRadius: 75,
        resizeMode: "stretch"

    }
})
interface SlideProps {
    last?: boolean,
    picture: number
}

const Slide = ({ last, picture}: SlideProps) => {
    if(last){
        return(
            <View/>
        );
    }
    return(
        <View style={style.container}>
            <View style={style.underlay}>
                <Image source={picture} style={style.picture}/>
            </View>
        </View>
    );
};


export default Slide;