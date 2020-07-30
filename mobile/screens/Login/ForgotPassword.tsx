import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import Button from './Components/Button';
import TextInput from './Components/Form/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")
};

const emailValidator = (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);



const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: "#F4EEEE",
        alignItems: "center",
    },
    text: {
        marginTop: 25,
        marginBottom: 5,
        marginLeft: 10,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        flexDirection: "row",
    },
    inputs: {
        margin: 4,
        padding: 6,
        alignItems: "baseline",
        width: width,
        marginBottom: 35
    },
    image: {
        marginTop: height / 10,
    },
    infos: {
        flexDirection: "row",
        textAlign: "center",
        alignContent: "center",
        marginTop: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 17,
    },
    arrow: {
        flexDirection: "row",
        alignContent: "center",
        alignSelf: "baseline",
        paddingTop: 35
    }

})



const ForgotPassword = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Icon style={styles.arrow} name="arrow-left" size={25} color="black" onPress={() => navigation.navigate('Login')} />
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../assets/images/owner1.png')} style={styles.image} />
                <View style={styles.inputs}>
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput icon="mail" validator={emailValidator} />
                </View>
            </KeyboardAvoidingView>
            <Button label={"Enviar"} onPress={() => { }} />
            <Text style={styles.infos}>Você receberá um e-mail com a sua nova senha</Text>

        </View>
    )
}


export default ForgotPassword;