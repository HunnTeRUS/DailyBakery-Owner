import React, { useState, useEffect } from 'react';
import { Modal, View, Text, AsyncStorage } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import styles from './styles'
import TextInput from '../../../components/TextInput'
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import { useNavigation, useRoute } from '@react-navigation/native'
import UserInterface from '../../../services/Utils/UserInterface'
import changeContactInfoServices from '../../../services/ChangeContactInfoServices/ChangeContactInfoServices'
import RegisterInterface from '../../../services/Utils/RegisterInterface';
import RegisterService from '../../../services/Register/RegisterService';
import ModalPopupWarns from '../../../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from '../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading'

export default function ChangeContactInfo() {
    const [show, setShow] = useState(false);
    const [showLoading, setLoading] = useState(false);
    const [textToShow, setTextToShow] = useState('');

    const phoneValidator = (phone: string) => phone.length === 11;
    const telValidator = (phone: string) => {if(phone)return phone.length === 10; else return true;};
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams: RegisterInterface = route.params as RegisterInterface
    const [phone, setPhone] = useState('')
    const [cellPhone, setCellPhone] = useState('')    
    async function pressButton() {
        await RegisterService(
            routeParams.nome as string,
            routeParams.email as string,
            routeParams.senha as string,
            cellPhone as string,
            phone as string,
            routeParams.cnpj as string,
            routeParams.cep as string,
            routeParams.rua as string,
            routeParams.numero as string,
            routeParams.bairro as string,
            routeParams.cidade as string,
            routeParams.estado as string,
            routeParams.latitude as string,
            routeParams.longitude as string,
        ).then(Response => {
            setLoading(false);
            if (Response.error === "" || Response.error === undefined || Response.error === null) {
                navigation.navigate('FifthScreenRegister')
            } else {
                setLoading(false);
                setShow(true);
                setTextToShow(Response.error as string)
            }
        })
    }


    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupWarns textToShow={textToShow} showModal={show} setShow={setShow} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            <View style={styles.secondContainer}>
                <Text style={styles.title}>Adicione dados para contato</Text>
                <Text style={styles.text}>Número de celular</Text>
                <TextInput icon="smartphone" placeholder="Número do seu celular (com DDD)" value={cellPhone} validator={text => { setCellPhone(text); return phoneValidator(text); }} keyboardType="number-pad" />
                <Text style={styles.textNumber}>Número de Telefone (opcional)</Text>
                <TextInput icon="phone" placeholder="Número do seu telefone (com DDD)" value={phone} validator={text => { setPhone(text); return telValidator(text); }} keyboardType="number-pad" />
                <TouchableOpacity disabled={(phoneValidator(cellPhone) && telValidator(phone)) ? false : true}
                    onPress={() => {
                        setLoading(true);
                        pressButton()
                    }}
                    containerStyle={{
                        opacity: (phoneValidator(cellPhone) && telValidator(phone)) ? 1 : .4,
                    }}
                    style={styles.nextButton}>

                    <Text style={styles.nextText}>Finalizar cadastro</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}