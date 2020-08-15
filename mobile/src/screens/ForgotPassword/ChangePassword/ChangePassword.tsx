import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import styles from './styles'
import TextInput from '../../../components/TextInput'
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import ModalPopupWarns from '../../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import {useNavigation, useRoute} from '@react-navigation/native'
import sendVerificationEmailServices from '../../../services/ChangePassword/ChangePasswordServices'

interface ChangePassword{
    email: string,
    cnpj: string
}
const passwordValidator = (password: string) => password.length >= 6;

export default function ChangePassword() {
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);

    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const routes = useRoute();
    const yurigay = routes.params as ChangePassword;
    //83340511000180
    async function changePassword(){
        if(password !== confirmationPassword) {
            setShowWarn(!showWarn)
            return;
        }
        else {
            sendVerificationEmailServices(yurigay.email, yurigay.cnpj, confirmationPassword);
            setShow(!show);
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => {navigation.navigate('Login')}} textToShow='Sua senha foi alterada com sucesso!' showModal={show} setShow={setShow}/>}
            {!showWarn ? <></> : <ModalPopupWarns textToShow='O campo senha não pode ser diferente do campo de Confirmar Senha' showModal={showWarn} setShow={setShowWarn}/>}

                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Alterar senha da conta</Text>
                    <Text style={styles.subTitle}>Informe uma senha segura e de sua segurança para ser a nova senha de acesso a sua conta</Text>

                    <Text style={styles.textNumber}>Nova Senha</Text>
                    <TextInput icon="lock" selectionColor='#FEC044' value={password} onChangeText={text => setPassword(text)} placeholder="Digite sua nova senha" validator={passwordValidator} secureTextEntry={true}/>

                    <Text style={styles.textNumber}>Confirme sua nova senha</Text>
                    <TextInput icon="lock" selectionColor='#FEC044' value={confirmationPassword} onChangeText={text => setConfirmationPassword(text)} placeholder="Digite sua nova senha novamente" validator={passwordValidator} secureTextEntry={true}/>

                    <TouchableOpacity disabled={false} style={styles.nextButton} 
                        onPress={() => {
                            changePassword()}}>
                        <Text style={styles.nextText}>Trocar senha</Text>
                    </TouchableOpacity>

                </View>
        </View>
    );
}