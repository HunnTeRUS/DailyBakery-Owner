import React, { useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import TextInput from '../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import ModalPopupInput from './ModalPopupInput/ModalPopupInput'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import sendVerificationEmailServices from '../../services/ForgotPasswordServices/ForgotPasswordServices'
import { validate, format } from 'cnpj';
import {useNetInfo} from '@react-native-community/netinfo';
import CNPJMask, {removeMask} from '../../components/InputMasks'
const ForgotPassword = () => {

    const [typedcnpj, setTypedcnpj] = useState("")
    const [codeReceivedFromApi, setCodeReceivedFromApi] = useState('')
    const [cnpjReceivedFromApi, setCnpjReceivedFromApi] = useState('')
    const [emailReceivedFromApi, setEmailReceivedFromApi] = useState('')
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const netInfo = useNetInfo();
    const [textToShowError, setTextToShowError] = useState('CNPJ invalido, tente novamente')
    let functionToWarnButton = () => { };

    async function pressButton() {
            if(!netInfo.isConnected){
                setTextToShowError("Você precisa estar conectado à internet para usar esta funcionalidade!")
                setShowWarn(!showWarn)
                return;
            }

            setShowLoading(true)

            await sendVerificationEmailServices(removeMask(typedcnpj)).then(response => {
                if(response.error !== "" && response.error !== undefined && response.error !== null){
                    setShowLoading(false)
                    setTextToShowError(response.error ? response.error : "")
                    setShowWarn(!showWarn)
                    return;
                }
                else {
                    setCodeReceivedFromApi(response.codigoEnviado ? response.codigoEnviado : "")
                    setCnpjReceivedFromApi(response.cnpj ? response.cnpj : "")
                    setEmailReceivedFromApi(response.email ? response.email : "")
                    setShow(!show)
                    setShowLoading(false)
                    return;
                }
            }).catch(() => {
                setShowLoading(false)
                setTextToShowError('Ocorreu um erro, tente novamente mais tarde.')
                setShowWarn(!showWarn)
                setShowLoading(false)
                return;
            });
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInput cnpjReceivedFromAPI={cnpjReceivedFromApi} emailReceivedFromAPI={emailReceivedFromApi} codeReceivedFromAPI={codeReceivedFromApi} textToShow='Digite o codigo que foi enviado em seu email' showModal={show} setShow={setShow} />}
            {!showWarn ? <></> : <ModalPopupWarns functionToButton={functionToWarnButton} textToShow={textToShowError} showModal={showWarn} setShow={setShowWarn} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}

            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <Text style={styles.title}>Recuperação de Senha</Text>

                <View style={styles.inputs}>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput selectionColor='#FEC044'
                        icon="briefcase" 
                        placeholder="Digite o CNPJ da sua padaria" 
                        keyboardType="number-pad"
                        validator={text => {
                            var textFormated = CNPJMask(text)
                            setTypedcnpj(textFormated); 
                            return (textFormated.length === 18 && validate(textFormated))
                        }}
                        value={typedcnpj} 
                        maxLength={18}
                        autoCapitalize="none" />
                    <Text style={styles.infos}>Você receberá um e-mail com um codigo para prosseguir com a {'\n'}alteração de sua senha</Text>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
                disabled={typedcnpj.length === 18 ? false : true}
                containerStyle={{
                    opacity: ((typedcnpj.length === 18) && (validate(typedcnpj))) ? 1 : .4,
                }}
                onPress={() => {
                    pressButton();
                }}
                style={styles.nextButton}>
                <Text style={styles.nextText}>Enviar</Text>
            </TouchableOpacity>

        </View>
    )
}


export default ForgotPassword;