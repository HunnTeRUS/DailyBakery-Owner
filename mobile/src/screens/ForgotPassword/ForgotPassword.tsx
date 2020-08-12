import React, {useState} from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import ModalPopupInput from '../../components/ModalPopup/ModalPopupInput/ModalPopupInput'
import sendVerificationEmailServices from '../../services/ForgotPasswordServices/ForgotPasswordServices'

const emailValidator = (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const ForgotPassword = () => {
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [codeReceivedFromApi, setCodeReceivedFromApi] = useState('')

    function verifyCodeAndNavigate(codeReceivedFromAPI: string, codeTypedByUser?: string ){
        if(codeReceivedFromAPI === codeTypedByUser) {
            navigation.navigate('ChangePasswordForgot')
        }
        else {
            navigation.navigate('ForgotPassword')
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInput functionForButton={() => navigation.navigate('ChangePasswordForgot')} textToShow='Yuri gay' showModal={show} setShow={setShow}/>}	
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <Text style={styles.title}>Recuperação de Senha</Text>

                <View style={styles.inputs}>
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput value={email} onChangeText={text => setEmail(text)} icon="mail" autoCapitalize="none" placeholder='Digite seu e-mail' validator={emailValidator} />
                    <Text style={styles.infos}>Você receberá um e-mail com um codigo para prosseguir com a {'\n'}alteração de sua senha</Text>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                onPress={() => {
                    setShow(!show)
                    setCodeReceivedFromApi(sendVerificationEmailServices(email));
                }}
                style={styles.nextButton}>

                    <Text style={styles.nextText}>Enviar</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ForgotPassword;