import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Comecar from './Components/Comecar'
import { SLIDE_HEIGHT } from './Slide';
import SkipButton from './Components/SkipButton';
const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 25,
    },
    text:{
        fontFamily: "Poppins-Regular",
        flexDirection: 'row',
        display: 'flex',
        textAlign: "center",
        alignItems: "center",
        marginTop: SLIDE_HEIGHT/6,
        flex: 1,
        color: "grey",
        fontSize: 18,
        lineHeight: 20,
        paddingTop: 4,
        marginBottom: 7,
        },
    button:{
        flex:1,
        flexDirection: "row",
    }
})

interface SubslideProps{
    text: string,
    last?: boolean
    onPress: () => void;
    onPressSkip: () => void;
}


const Subslide = ({text, last, onPress, onPressSkip}: SubslideProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Comecar label={last ? "Começar": "Próximo"} {...{onPress}}></Comecar>
            <SkipButton enabled={last ? false : true} label={"Pular"} {...{onPressSkip}}></SkipButton>
        </View>

    );
};

export default Subslide;