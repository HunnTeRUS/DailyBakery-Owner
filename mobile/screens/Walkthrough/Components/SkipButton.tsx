import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");
const style = StyleSheet.create({
    container:{
        borderRadius: 25,
        height: 40,
        width: (width /3),
        backgroundColor: '#F4EEEE',
        marginTop: 17,
        justifyContent: 'center',
    },
    label:{
        fontSize: 20,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',

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