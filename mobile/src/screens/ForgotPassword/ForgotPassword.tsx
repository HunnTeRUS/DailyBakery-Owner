import React, {useState} from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import TextInput from '../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import ModalPopupInput from './ModalPopupInput/ModalPopupInput'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import sendVerificationEmailServices from '../../services/ForgotPasswordServices/ForgotPasswordServices'
import { validate, format } from 'cnpj';

const ForgotPassword = () => {

    const [typedcnpj, setTypedcnpj] = useState("")
    const [codeReceivedFromApi, setCodeReceivedFromApi] = useState('')
    const [cnpjReceivedFromApi, setCnpjReceivedFromApi] = useState('')
    const [emailReceivedFromApi, setEmailReceivedFromApi] = useState('')
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [textToShowError, setTextToShowError] = useState('CNPJ invalido, tente novamente')
    let functionToWarnButton = () => {};

    const cnpjValidator = (text:string) => text.length === 14;

    async function pressButton(){

        if(validate(format(typedcnpj))) {
            try {

                const {codigoEnviado, cnpj, email} = await sendVerificationEmailServices(typedcnpj);                

                if(codigoEnviado && cnpj && email) {
                    setCodeReceivedFromApi(codigoEnviado)
                    setCnpjReceivedFromApi(cnpj)
                    setEmailReceivedFromApi(email)
                    setShow(!show)
                }

                else {
                    setTextToShowError('Não existe nenhum registro com este CNPJ.')
                    setShowWarn(!showWarn)
                }

            } catch(e){
                setTextToShowError('Ocorreu um erro, tente novamente mais tarde.')
                setShowWarn(!showWarn)
                console.log(e)
                return;
            }
        }
        else {
            setTextToShowError('CNPJ incorreto.')
            setShowWarn(!showWarn)
            return;
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInput cnpjReceivedFromAPI={cnpjReceivedFromApi} emailReceivedFromAPI={emailReceivedFromApi} codeReceivedFromAPI={codeReceivedFromApi} textToShow='Digite o codigo que foi enviado em seu email' showModal={show} setShow={setShow}/>}
            {!showWarn ? <></> : <ModalPopupWarns functionToButton={functionToWarnButton} textToShow={textToShowError} showModal={showWarn} setShow={setShowWarn}/>}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} setShow={setShowLoading}/>}

            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <Text style={styles.title}>Recuperação de Senha</Text>

                <View style={styles.inputs}>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput selectionColor='#FEC044' 
                        icon="briefcase" placeholder="Digite o CNPJ da sua padaria" keyboardType="number-pad" 
                        validator={text => {setTypedcnpj(text); return text.length === 14;}} value={typedcnpj} autoCapitalize="none"/>
                    <Text style={styles.infos}>Você receberá um e-mail com um codigo para pross4eguir com a {'\n'}alteração de sua senha</Text>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                disabled={typedcnpj.length === 14 ? false : true}
                onPress={() => {         
                    pressButton()
                }}
                style={[styles.nextButton, {backgroundColor: typedcnpj.length === 14 ? '#FEC044' : '#D3D3D3'}]}>
                    <Text style={[styles.nextText, {color: typedcnpj.length === 14 ? 'white' : '#C8C8C8'}]}>Enviar</Text>
            </TouchableOpacity>

        </View>
    )
}


export default ForgotPassword;