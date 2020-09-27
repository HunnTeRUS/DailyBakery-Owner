import React, { useState } from 'react';
import { Modal, View, Text, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'
import TextInput from '../../components/TextInput'
import ModalPopupInfos from '../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import { useNavigation } from '@react-navigation/native'
import getLoggedUser, { setAndChangeLoggedUser } from '../../services/Utils/LoggedUser'
import sendVerificationEmailServices from '../../services/ChangePassword/ChangePasswordServices'
import ModalPopupWarns from '../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'
import changeLoggedUserInfo from '../../services/Utils/ChangeLoggedUserInfos';
import UserInterface from '../../services/Utils/UserInterface';
import {useNetInfo} from '@react-native-community/netinfo';
import ModalPopupInterrogs from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';

export default function ChangePassword() {
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const [showAsk, setShowAsk] = useState(false)

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewpass] = useState('');
    const [newPassConfirmation, setNewPassConfirmation] = useState('');

    const netInfo = useNetInfo();

    const passwordValidator = (password: string) => password.length >= 6;
    const newpasswordValidator = (password: string) => password.length >= 6;
    const confirmationpasswordValidator = (password: string) => password.length >= 6 && password === newPass;

    const [errorMessageForModal, setErrorMessageForModal] = useState("");

    const navigation = useNavigation();

    async function changeLoggedUserInfo(obj: UserInterface) {
        await setAndChangeLoggedUser(obj);
    }

    async function changePass() {
        if(!netInfo.isConnected){
            setErrorMessageForModal('Você precisa estar conectado à internet para usar esta funcionalidade.')
            setShowWarn(true)
            return;
        }

        setShowLoading(true)
        const loggedUser = await getLoggedUser();
        if (loggedUser?.senha === oldPass) {
            await sendVerificationEmailServices(loggedUser.email ? loggedUser.email : "", loggedUser.cnpj ? loggedUser.cnpj : "", newPassConfirmation)
                .then(response => {
                    if(response.error === "" || response.error === undefined || response.error === null){
                        loggedUser.senha = newPassConfirmation;
                        changeLoggedUserInfo(loggedUser)
                        setShowLoading(false)
                        setShow(true)
                    }
                    else {
                        setShowLoading(false)
                        setErrorMessageForModal(response.error)
                        setShowWarn(true)
                    }
                    
                }).catch(() => {
                    setShowLoading(false)
                    setErrorMessageForModal('Ocorreu um erro ao alterar sua senha, tente novamente mais tarde!')
                    setShowWarn(true)
                });
        }
        else {
            setShowLoading(false)
            setErrorMessageForModal('Sua senha atual precisa ser igual à senha digitada no campo "Senha Antiga"!')
            setShowWarn(true)
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => { navigation.navigate('BottomTabNavigator') }} textToShow='Sua senha foi alterada com sucesso!' showModal={show} setShow={setShow} />}
            {!showWarn ? <></> : <ModalPopupWarns functionToButton={() => { }} textToShow={errorMessageForModal} showModal={showWarn} setShow={setShowWarn} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            {!showAsk ? <></> : <ModalPopupInterrogs functionToYesButton={changePass} textToTitle='Alterar senha'
             textToShow='Tem certeza de que deseja alterar sua senha?' showModal={showAsk} setShow={setShowAsk}/>}

            <View style={styles.secondContainer}>
                <KeyboardAvoidingView behavior="position">
                    <Text style={styles.title}>Alterar senha da conta</Text>
                    <Text style={styles.subTitle}>Informe sua senha anterior e troque para uma nova senha de sua confiança</Text>

                    <Text style={styles.textCep}>Senha Antiga</Text>
                    <TextInput icon="lock" placeholder="Digite sua senha" value={oldPass} validator={text => { setOldPass(text); return passwordValidator(text) }} secureTextEntry={true} />

                    <Text style={styles.textNumber}>Nova Senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua nova senha" value={newPass} validator={text => { setNewpass(text); return newpasswordValidator(text) }} secureTextEntry={true} />

                    <Text style={styles.textNumber}>Confirme sua nova senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua nova senha novamente" value={newPassConfirmation} validator={text => { setNewPassConfirmation(text); return confirmationpasswordValidator(text) }} secureTextEntry={true} />

                    <TouchableOpacity
                        disabled={(passwordValidator(oldPass) && (newpasswordValidator(newPass) && (confirmationpasswordValidator(newPassConfirmation)))) ? false : true}
                        containerStyle={{
                            opacity: (passwordValidator(oldPass) && (newpasswordValidator(newPass) && (confirmationpasswordValidator(newPassConfirmation)))) ? 1 : .4,
                        }}
                        style={styles.nextButton}
                        onPress={() => { setShowAsk(true) }}>
                        <Text style={styles.nextText}>Trocar senha</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}