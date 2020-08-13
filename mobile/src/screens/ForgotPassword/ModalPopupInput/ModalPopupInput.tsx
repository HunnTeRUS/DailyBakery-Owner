import React, { useState } from 'react';
import styles from './styles'
import { Text, Modal, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Baker from '../../../components/ImagesComponents/Baker'
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'

interface ModalPopupInterface {
    showModal: boolean;
    setShow(trueFalse: boolean): void;
    textToShow: string;
    codeReceivedFromAPI: string;
    emailReceivedFromAPI: string;
    cnpjReceivedFromAPI:string;
}

const ModalPopup = (props: ModalPopupInterface) => {
    const [show, setShow] = useState(props.showModal);

    const navigation = useNavigation();
    const [code, setCode] = useState('');

    function verifyCode(codeTypedByUser: string){
        return props.codeReceivedFromAPI === codeTypedByUser 
            ?  navigation.navigate('ChangePasswordForgot', {email: props.emailReceivedFromAPI, cnpj: props.cnpjReceivedFromAPI}) 
            :  navigation.navigate('ForgotPassword') 
    }

    return (
        <Modal
            animated={true}
            animationType="fade"
            visible={show}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position">

                    <View style={styles.subcontainer}>
                        <View style={styles.imageContainer}>
                            <View style={styles.image}>
                                <Baker heightImage={200} widthImage={200} />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Digite o codigo recebido em seu email</Text>
                            <TextInput onChangeText={text => setCode(text)} style={styles.inputNumber} autoCapitalize="none" placeholder='Digite seu codigo' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.nextButton} onPress={() => { 
                                verifyCode(code)
                                props.setShow(false) 
                                }}>
                                <Text style={styles.nextText}>Validar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

export default ModalPopup;