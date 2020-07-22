import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Comecar from './Components/Comecar'
import { SLIDE_HEIGHT } from './Slide';
import SkipButton from './Components/SkipButton';
const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 25,
    },
    title:{
        fontFamily: "Poppins-Bold",
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'center',
        flex: 1,
        color: "black",
        lineHeight: 20,
        fontSize: 20,
        paddingTop: 10,
        marginTop: 7,
        transform: [{translateY: (SLIDE_HEIGHT - 100)/10}]
    },
    text:{
        fontFamily: "Poppins-Regular",
        flexDirection: 'row',
        display: 'flex',
        textAlign: "center",
        flex: 1,
        color: "grey",
        fontSize: 18,
        lineHeight: 20,
        paddingTop: 4,
        marginBottom: 7,
        alignContent:"stretch",
        scaleY: 1
    },
    
})

interface SubslideProps{
    title: string,
    text: string,
    last?: boolean
    onPress: () => void;
    onPressSkip: () => void;
}


const Subslide = ({title, text, last, onPress, onPressSkip}: SubslideProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
            <Comecar label={last ? "Começar": "Próximo"} {...{onPress}}></Comecar>
            <SkipButton enabled={last ? false : true} label={"Pular"} {...{onPressSkip}}></SkipButton>
        </View>

    );
};

export default Subslide;