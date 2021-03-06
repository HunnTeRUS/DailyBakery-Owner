import React, { useState } from 'react';
import {  View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import TextInput from '../../../components/TextInput'
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import ModalPopupWarns from '../../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import { useNavigation, useRoute } from '@react-navigation/native'
import sendVerificationEmailServices from '../../../services/ChangePassword/ChangePasswordServices'
import ModalPopupLoading from '../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import {useNetInfo} from '@react-native-community/netinfo';

interface ChangePassword {
    email: string,
    _id: string
}

export default function ChangePassword() {
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);

    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const routes = useRoute();
    const params = routes.params as ChangePassword;
    const [showLoading, setShowLoading] = useState(false);

    const netInfo = useNetInfo();

    const [messageToWarn, setMessageToWarn] = useState("O campo senha não pode ser diferente do campo de Confirmar Senha");

    //83340511000180
    async function changePassword() {
        if(!netInfo.isConnected){
            setMessageToWarn("Você precisa estar conectado à internet para usar esta funcionalidade.")
            setShowWarn(!showWarn)
            return;
        }

        setShowLoading(true);

        if (password !== confirmationPassword) {
            setShowLoading(false);
            setShowWarn(!showWarn)
            return;
        }
        else {
            setShowLoading(true)
            await sendVerificationEmailServices(params.email, params._id, confirmationPassword).then(response => {
                if(response.error !== "" && response.error !== undefined && response.error !== null) {
                    setMessageToWarn(response.error ? response.error : "")
                    setShowLoading(false);
                    setShowWarn(!showWarn)
                    return;
                }
                else {
                    setShowLoading(false);
                    setShow(!show);
                }
            }).catch(()=>{
                setMessageToWarn("Ocorreu um erro ao atualizar sua senha, tente novamente mais tarde.")
                setShowLoading(false);
                setShowWarn(!showWarn)
                return;
            });
            
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => { navigation.navigate('Login') }} textToShow='Sua senha foi alterada com sucesso!' showModal={show} setShow={setShow} />}
            {!showWarn ? <></> : <ModalPopupWarns textToShow={messageToWarn} showModal={showWarn} setShow={setShowWarn} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}

            <View style={styles.secondContainer}>
                <Text style={styles.title}>Alterar senha da conta</Text>
                <Text style={styles.subTitle}>Informe uma senha segura e de sua segurança para ser a nova senha de acesso a sua conta</Text>

                <Text style={styles.textNumber}>Nova Senha</Text>
                <TextInput icon="lock" selectionColor='#FEC044' value={password}
                    validator={text => {setPassword(text); return text.length >= 6}} placeholder="Digite sua nova senha"
                    secureTextEntry={true} />

                <Text style={styles.textNumber}>Confirme sua nova senha</Text>
                <TextInput icon="lock" selectionColor='#FEC044'
                    value={confirmationPassword} 
                    validator={text => { setConfirmationPassword(text); return (text.length >= 6 && text === password); }}
                    placeholder="Digite sua nova senha novamente" secureTextEntry={true} />

                <TouchableOpacity disabled={(password.length >= 6) && (confirmationPassword.length >= 6) ? false : true}
                    onPress={() => {
                        changePassword()
                    }}
                    containerStyle={{
                        opacity: (password.length >= 6) && (confirmationPassword.length >= 6) && (confirmationPassword === password) ? 1 : .4,
                    }}
                    style={styles.nextButton}>

                    <Text style={styles.nextText}>Trocar senha</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}