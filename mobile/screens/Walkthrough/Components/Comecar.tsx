import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ComecarProps {
    label : string,
    onPress: () => void;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 40,
        width: (width/3),
        backgroundColor: "#F4EEEE",
        justifyContent: "center"
    },
    label:{
        fontSize: 20,
        color: "black",
        textAlign: "center"
    },
});

const Comecar = ({label, onPress}: ComecarProps) => {
    return (
        <RectButton style={styles.container} {...{onPress}}>
            <Text style={styles.label}>{label}</Text>
        </RectButton>
    )
}
 
export default Comecar;