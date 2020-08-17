import React, { useState } from 'react'
import { View, Image, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TextInput from '../../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import verifyLoginCredentialsService from '../../services/Login/LoginService'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'
import UserInterface from '../../services/UserInterface'
import styles from './styles'

const Login = () => {
    const [typedcnpj, setCnpj] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const [showLoading, setShowLoading] = useState(false)

    const WalkthroughOrHome = async () => {
        var variavel = await AsyncStorage.getItem('firstAccess');
        if (variavel === null) {
            return navigation.navigate('Walkthrough');
        }
    }

    const setLoggedUserInLocalStorage = async (obj: UserInterface) => {
        await AsyncStorage.setItem('loggedUser', JSON.stringify(obj));
    }

    async function pressButton() {

        const { nome, cnpj, senha, email, numero_celular, 
        numero_telefone, aberto_fechado, ultima_fornada, 
        cep, rua, numero, bairro, cidade, estado, tempo_espera } = await verifyLoginCredentialsService(typedcnpj, password);

        const objUser = {
            nome: nome,
            email: email,
            senha: senha,
            numero_celular: numero_celular,
            numero_telefone: numero_telefone,
            cnpj: cnpj,
            aberto_fechado: aberto_fechado,
            ultima_fornada: ultima_fornada,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            tempo_espera: tempo_espera,
        }

        if (cnpj && senha && email) {
            setShowLoading(false)
            setLoggedUserInLocalStorage(objUser);
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
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
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
                pressButton()}
                }
                disabled={(typedcnpj.length === 14) && (password.length >= 6) ? false : true}
                containerStyle={{
                    opacity: (typedcnpj.length === 14) && (password.length >= 6) ? 1 : .4,
                }}
                style={[styles.nextButton,{backgroundColor: (typedcnpj.length === 14) && (password.length >= 6) ? '#FEC044' : '#FEC044',}]}>
                <Text style={[styles.nextText, {color: (typedcnpj.length === 14) && (password.length >= 6) ? 'white' : 'white', }]}>Entrar</Text>
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