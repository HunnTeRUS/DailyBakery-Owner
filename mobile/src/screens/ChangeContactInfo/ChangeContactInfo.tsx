import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import styles from './styles'
import TextInput from '../../components/TextInput'
import ModalPopupInfos from '../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import {useNavigation} from '@react-navigation/native'

export default function ChangeContactInfo() {
    const [show, setShow] = useState(false);
    const phoneValidator = (cnpj: string) => cnpj.length === 11;
    const telValidator = (cnpj: string) => cnpj.length === 10;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => {navigation.navigate('Root')}} textToShow='Suas informações de contato foram alteradas com sucesso!' showModal={show} setShow={setShow}/>}

                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Alterar dados para contato</Text>
                    <Text style={styles.subTitle}>Altere se necessário os seus dados de contato</Text>

                    <Text style={styles.textCep}>Número de celular</Text>
                    <TextInput icon="smartphone" placeholder="Número do seu celular (com DDD)" validator={phoneValidator} keyboardType="number-pad"/>

                    <Text style={styles.textNumber}>Número de Telefone</Text>
                    <TextInput icon="phone" placeholder="Número do seu telefone (com DDD)" validator={telValidator} keyboardType="number-pad"/>

                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => {setShow(!show)}}>
                        <Text style={styles.nextText}>Alterar</Text>
                    </TouchableOpacity>

                </View>
            </View>
    );
}