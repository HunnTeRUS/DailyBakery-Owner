import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import styles from './styles'
import TextInput from '../../components/TextInput'
import ModalPopupInfos from '../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import {useNavigation} from '@react-navigation/native'

export default function ChangePassword() {
    const [show, setShow] = useState(false);
    const passwordValidator = (password: string) => password.length >= 6;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => {navigation.navigate('Root')}} textToShow='Sua senha foi alterada com sucesso!' showModal={show} setShow={setShow}/>}

                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Alterar senha da conta</Text>
                    <Text style={styles.subTitle}>Informe sua senha anterior e troque para uma nova senha de sua confiança</Text>

                    <Text style={styles.textCep}>Senha Antiga</Text>
                    <TextInput icon="lock" placeholder="Digite sua senha" validator={passwordValidator} secureTextEntry={true}/>

                    <Text style={styles.textNumber}>Nova Senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua nova senha" validator={passwordValidator} secureTextEntry={true}/>

                    <Text style={styles.textNumber}>Confirme sua nova senha</Text>
                    <TextInput icon="lock" placeholder="Digite sua nova senha novamente" validator={passwordValidator} secureTextEntry={true}/>

                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => {setShow(!show)}}>
                        <Text style={styles.nextText}>Trocar senha</Text>
                    </TouchableOpacity>

                </View>
            </View>
    );
}