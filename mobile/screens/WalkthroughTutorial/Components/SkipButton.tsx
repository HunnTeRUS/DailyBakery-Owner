import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const font = {
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf")};

const { width } = Dimensions.get("window");
const style = StyleSheet.create({
    container:{
        borderRadius: 10,
        height: 40,
        width: (width /3),
        backgroundColor: 'grey',
        justifyContent: 'center',
    },
    label:{
        fontSize: 20,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontFamily: "Poppins-Regular",
    },
});


interface SkipButtonProps{
    label: string,
    enabled: boolean,
    onPressSkip: () => void;
};


const SkipButton = ({enabled, label, onPressSkip}: SkipButtonProps) => {
    return(
        <RectButton style={enabled ? style.container : {display: "none"}}  onPress={onPressSkip}>
            <Text style={style.label}>{label}</Text>
        </RectButton>
        
    )
};

export default SkipButton;