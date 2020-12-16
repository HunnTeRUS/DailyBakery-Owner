import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Comecar from './Components/Comecar'
import { SLIDE_HEIGHT } from './Slide';
import SkipButton from './Components/SkipButton';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 25,
        paddingHorizontal: 20
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
    dualButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: "auto"
    },
    dualButtonAux: {
        width: '20%'
    }
})

interface SubslideProps{
    text: string,
    icon?: any,
    last?: boolean
    onPress: () => void;
    onPressSkip: () => void;
}


const Subslide = ({icon, text, last, onPress, onPressSkip}: SubslideProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}{icon}</Text>
            
            <View style={styles.dualButton}>
                <Comecar label={last ? "Começar": "Próximo"} {...{onPress}}></Comecar>
            </View>
        </View>

    );
};

export default Subslide;