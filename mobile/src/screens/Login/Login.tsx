import React, { useState, useEffect } from 'react'
import { View, Image, Text, KeyboardAvoidingView, AsyncStorage, BackHandler } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import TextInput from '../../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import verifyLoginCredentialsService from '../../services/Login/LoginService'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'
import UserInterface from '../../services/Utils/UserInterface'
import styles from './styles'
import verifyToken from '../../services/AuthServices/AuthServices'
import { validate } from 'cnpj'
import getLoggedUser, { removeLoggedUser } from '../../services/Utils/LoggedUser'
import {useNetInfo} from '@react-native-community/netinfo';

const Login = () => {
    const [typedcnpj, setCnpj] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const [showLoading, setShowLoading] = useState(false)
    const [textToShow, setTextToShow] = useState('CNPJ ou senha inválidos!')

    const netInfo = useNetInfo();

    const WalkthroughOrHome = async () => {
        var variavel = await AsyncStorage.getItem('firstAccess');
        if (variavel === null) {
            return navigation.navigate('Walkthrough');
        }
    }

    useFocusEffect(() => {
        const isValid = async () => {
            await verifyToken().then(response => {
                console.log(response.cnpj + ' LOOOOOGIN')
                if (response.error === "" || response.error === undefined || response.error === null){
                    if(response.cnpj !== "" && response.cnpj !== undefined && response.cnpj !== null) {
                        setLoggedUserInLocalStorage(response);
                        if (response.aberto_fechado === true)
                            navigation.navigate('ClosedBakery')
                        else
                            navigation.navigate('BottomTabNavigator')
                    }
                    else {
                        return;
                    }
                }
                else {
                    return;
                }
            }).catch(error => {
                console.log(error)
                removeLoggedUser('loggedUser')
                return;
            });
        }

        isValid();
    })

    const setLoggedUserInLocalStorage = async (obj: UserInterface) => {
        const objResponse = await AsyncStorage.getItem('loggedUser');

        if (!objResponse) {
            await AsyncStorage.removeItem('loggedUser')
            await AsyncStorage.setItem('loggedUser', JSON.stringify(obj));
        }
    }

    async function getUser() {
        return await getLoggedUser();
    }

    async function pressButton() {
        if(!netInfo.isConnected){
            setShowLoading(false);
            setTextToShow("Você precisa estar conectado à internet para usar o aplicativo!");
            setShow(true)
            return;
        }

        let loggedUser: UserInterface = {}
        await verifyLoginCredentialsService(typedcnpj, password).then(response => {
            if (response.error === "" || response.error === undefined || response.error === null) {
                setLoggedUserInLocalStorage(response);

                while (loggedUser === {}) {
                    getUser();
                }

                if (response.aberto_fechado) {
                    setShowLoading(false)
                    navigation.navigate('ClosedBakery')
                    return;
                }

                setShowLoading(false)
                navigation.navigate('BottomTabNavigator')
            }
            else {
                setTextToShow(response.error);
                setShowLoading(false);
                setShow(true)
            }
        }).catch(() => {
            setTextToShow("Ocorreu um erro, tente novamente mais tarde!");
            setShowLoading(false);
            setShow(true)
        }
        );
    }

    WalkthroughOrHome();

    return (

        <View style={styles.container}>
            {!show ? <></> : <ModalPopupWarns textToShow={textToShow} showModal={show} setShow={setShow} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <View style={styles.inputs}>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput icon="user" maxLength={14} placeholder="Digite seu CNPJ"
                        keyboardType="number-pad" blurOnSubmit={true} value={typedcnpj}
                        validator={
                            text => {
                                var textFormated = text.replace(/[^0-9]/g, '');
                                setCnpj(textFormated);
                                return (textFormated.length === 14 && validate(textFormated))
                            }
                        } />
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
                disabled={(typedcnpj.length === 14) && (password.length >= 6) && validate(typedcnpj) ? false : true}
                containerStyle={{
                    opacity: (typedcnpj.length === 14) && (password.length >= 6) && validate(typedcnpj) ? 1 : .4,
                }}
                style={[styles.nextButton, { backgroundColor: (typedcnpj.length === 14) && (password.length >= 6) && validate(typedcnpj) ? '#FEC044' : '#FEC044', }]}>
                <Text style={[styles.nextText, { color: (typedcnpj.length === 14) && (password.length >= 6) && validate(typedcnpj) ? 'white' : 'white', }]}>Entrar</Text>
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