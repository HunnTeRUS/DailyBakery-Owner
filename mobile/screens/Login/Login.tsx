import React from 'react'
import { View, StyleSheet, Image, Text, Dimensions, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TextInput from './Components/Form/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get('window');
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
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        flexDirection: "row",
    },
    inputs: {
        margin: 4,
        alignItems: "baseline",
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    image: {
        marginTop: height / 8,
        
    },
    divLinks: {
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        textDecorationLine: "none",
        marginTop: 40,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#FEC044',
        borderRadius: 6,
        height: 45,
        width: 150,
        marginTop: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      },
    nextText: {
        color: '#FFF',
        fontSize: 15, 
        fontWeight: 'bold'
    },
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
                    <TextInput icon="user" placeholder="Digite seu CNPJ" validator={cnpjValidator} keyboardType="number-pad"/>
                    <Text style={styles.text}>Senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua senha" validator={passwordValidator} secureTextEntry={true}/>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => {}} style={styles.nextButton}>
                <Text style={styles.nextText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.divLinks}>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={{
                        fontFamily: "Poppins-ExtraLight",
                        fontSize: 17,
                    }}>Desejo criar meu cadastro</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                    <Text style={{
                            fontFamily: "Poppins-ExtraLight",
                            fontSize: 17,
                            marginTop: '20%',
                            
                        }}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;