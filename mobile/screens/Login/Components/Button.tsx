import React from "react";
import { Text, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'
import { color } from "react-native-reanimated";

const font = {
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf")
};

interface ComecarProps {
    label : string,
    onPress: () => void;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 40,
        width: (width/3),
        backgroundColor: "#ffbd59",
        justifyContent: 'center',
    },
    label:{
        fontSize: 20,
        textAlign: "center",
        color: 'white',
        fontFamily: "Poppins-Regular",
    },
});

const Comecar = ({label, onPress}: ComecarProps) => {
    
    return (
        <RectButton style={styles.container} {...{onPress} }>
            <Text style={styles.label}>{label}</Text>
        </RectButton>
    )
}
 
export default Comecar;