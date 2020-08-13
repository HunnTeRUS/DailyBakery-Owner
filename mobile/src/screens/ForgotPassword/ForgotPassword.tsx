import React, {useState} from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import ModalPopupInput from './ModalPopupInput/ModalPopupInput'
import sendVerificationEmailServices from '../../services/ForgotPasswordServices/ForgotPasswordServices'
import sendVerificationEmail from '../../dao/ForgotPasswordDAO'

const emailValidator = (email: string) =>
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


const ForgotPassword = () => {

    const [typedcnpj, setTypedcnpj] = useState("")
    const [codeReceivedFromApi, setCodeReceivedFromApi] = useState('')
    const [cnpjReceivedFromApi, setCnpjReceivedFromApi] = useState('')
    const [emailReceivedFromApi, setEmailReceivedFromApi] = useState('')
    const [show, setShow] = useState(false);
    const navigation = useNavigation();

    async function pressButton(){
        setShow(!show)
        const {codigoEnviado, cnpj, email} = await sendVerificationEmailServices(typedcnpj);
        setCodeReceivedFromApi(codigoEnviado)
        setCnpjReceivedFromApi(cnpj)
        setEmailReceivedFromApi(email)
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInput cnpjReceivedFromAPI={cnpjReceivedFromApi} 
                                              emailReceivedFromAPI={emailReceivedFromApi}
                                              codeReceivedFromAPI={codeReceivedFromApi}
                                              textToShow='Digite o codigo que foi enviado em seu email'
                                              showModal={show}
                                              setShow={setShow}/>}

            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <Text style={styles.title}>Recuperação de Senha</Text>

                <View style={styles.inputs}>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput keyboardType="number-pad" value={typedcnpj} onChangeText={text => setTypedcnpj(text)} icon="hash" autoCapitalize="none" placeholder='Digite seu CNPJ' validator={emailValidator} />
                    <Text style={styles.infos}>Você receberá um e-mail com um codigo para prosseguir com a {'\n'}alteração de sua senha</Text>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                onPress={() => pressButton()}
                style={styles.nextButton}>
                    <Text style={styles.nextText}>Enviar</Text>
            </TouchableOpacity>

        </View>
    )
}


export default ForgotPassword;