import React from 'react'
import { View, StyleSheet, Image, Text, Dimensions, KeyboardAvoidingView } from 'react-native'
import Navigation from '../../navigation'
import { useNavigation } from '@react-navigation/native'
import Button from './Components/Button'
import TextInput from './Components/Form/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get('window');
const font = {
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")
};

const cnpjValidator = (cnpj: string) => cnpj.length === 14;



const passwordValidator = (password: string) => password.length >= 6;


const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: "#F4EEEE",
        alignItems: "center"
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
        marginBottom: 20
    },
    image: {
        marginTop: height / 6,
    },
    links: {
        flexDirection: "row",
        textAlign: "center",
        alignContent: "center",
        textDecorationLine: "underline",
        marginTop: 20,
    }

})



const Login = () => {
    const cnpj = true;
    const senha = true;
    const navigation = useNavigation();
    //const Onbording = navigation.navigate('Onbording');
    //const ForgotPassword = navigation.navigate('ForgotPassword');
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
            <Image source={require('../../assets/images/owner1.png')} style={styles.image} />
            <View style={styles.inputs}>
                <Text style={styles.text}>CNPJ</Text>
                <TextInput icon="user" validator={cnpjValidator} />
                <Text style={styles.text}>Senha</Text>
                <TextInput icon="lock" validator={passwordValidator} secureTextEntry={true}/>
            </View>
            </KeyboardAvoidingView>
            <Button label={"Entrar"} onPress={() => { }} />
            <TouchableOpacity onPress={() => navigation.navigate("")} style={styles.links}>
                <Text style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 17,
                }}>Desejo criar meu cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style= {styles.links}>
                <Text style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 17,
                    }}>Esqueci minha senha</Text>
            </TouchableOpacity>
        </View>
    )
}


export default Login;