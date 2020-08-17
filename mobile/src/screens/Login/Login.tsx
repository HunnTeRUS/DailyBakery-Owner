import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, Dimensions, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TextInput from '../../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FirstScreenRegister from '../BakeryRegister/FirstScreenRegister/FirstScreenRegister'
import WalkThrough from '../Walkthrough/Walkthrough'
import verifyLoginCredentialsService from '../../services/Login/LoginService'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'

const { height, width } = Dimensions.get('window');

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
    const [typedcnpj, setCnpj] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const [opacityState, setOpacityState] = useState(1)
    const [showLoading, setShowLoading] = useState(false)

    const WalkthroughOrHome = async () => {
        var variavel = await AsyncStorage.getItem('firstAccess');
        if (variavel === null) {
            return navigation.navigate('Walkthrough');
        }
    }

    async function pressButton() {
        const { cnpj, senha, email } = await verifyLoginCredentialsService(typedcnpj, password);
        console.log(cnpj, senha, email);

        if (cnpj && senha && email) {
            setShowLoading(false)
            navigation.navigate('BottomTabNavigator')
        }
        else {
            setShowLoading(false)
            setShow(!show);
        }
    }

    WalkthroughOrHome();
    
    return (

        <View style={styles.container}>
            {!show ? <></> : <ModalPopupWarns textToShow='CNPJ e/ou senha incorretos' showModal={show} setShow={setShow} />}
            {!showLoading ? <></> : <ModalPopupLoading functionToExecuteWhileIsLoading={pressButton} showModal={showLoading} />}
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <View style={styles.inputs}>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput icon="user" placeholder="Digite seu CNPJ"
                        keyboardType="number-pad" blurOnSubmit={true} value={typedcnpj}
                        validator={text => { setCnpj(text); return text.length === 14; }} />
                    <Text style={styles.text}>Senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua senha"
                        secureTextEntry={true} value={password}
                        validator={text => { setPassword(text); return text.length >= 6; }} />
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => {
                setShowLoading(true);
                pressButton()
            }
            }
                disabled={(typedcnpj.length === 14) && (password.length >= 6) ? false : true}
                containerStyle={{
                    opacity: (typedcnpj.length === 14) && (password.length >= 6) ? 1 : .4,
                }}
                style={
                    [styles.nextButton,
                    {
                        backgroundColor: (typedcnpj.length === 14) && (password.length >= 6) ? '#FEC044' : '#FEC044',
                    }
                    ]}>
                <Text style={
                    [styles.nextText,
                    {
                        color: (typedcnpj.length === 14) && (password.length >= 6) ? 'white' : 'white',
                    }
                    ]
                }>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.divLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('CNPJScreen')}>
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