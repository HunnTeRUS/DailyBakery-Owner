import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import FindCEPService from '../../../services/CepService/CepService';
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import RegisterInterface from '../../../services/Utils/RegisterInterface';
import ModalPopupLoading from '../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import {useNetInfo} from '@react-native-community/netinfo';
import {cepMask, removeMask, numberMask} from '../../../components/InputMasks'

const SecondScreenRegister = () => {
    const [showLoading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [typedCep, setTypedCep] = useState('')
    const [number, setNumber] = useState('')
    const [show, setShow] = useState(false);
    const [textToShow, setTextToshow] = useState("");
    const route = useRoute();
    const netInfo = useNetInfo();

    const routeParams: RegisterInterface = route.params as RegisterInterface
    const nameValidator = (name: string) =>
        name.length > 2;

    const cepValidator = (cep: string) =>
        cep.length === 9;

    const numberValidator = (number: string) =>
        number.length >= 1;

    const submitButtonValidator = (): boolean => {
        return nameValidator(name) && cepValidator(typedCep) && numberValidator(number);
    }

    async function pressButton() {
        if(!netInfo.isConnected){
            setShow(true)
            setTextToshow("Você precisa estar conectado na internet para usar essa funcionalidade");
            setShow(true);
            return;
        }
        setLoading(true);

        await FindCEPService(removeMask(typedCep), number).then(response => {
            setLoading(false);
            if (response.error === "" || response.error === undefined || response.error === null) {
                navigation.navigate('ThirdScreenRegister', 
                    {
                        cnpj: routeParams.cnpj,
                        senha: routeParams.senha,
                        email: routeParams.email,
                        cep: removeMask(response.cep),
                        nome: name,
                        numero: number,
                        rua: response.logradouro,
                        bairro: response.bairro,
                        cidade: response.cidade,
                        estado: response.estado,
                        latitude: response.latitude,
                        longitude: response.longitude,
                    });

            } else {
                setShow(true);
                setTextToshow(response.error);
            }
        }).catch(error => {
            setLoading(false);
            setShow(true);
            setTextToshow(error);
        })

    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.secondContainer}>
                        {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
                        {!show ? <></> : <ModalPopupInfos textToShow={textToShow} showModal={show} setShow={setShow} onPressCloseButton={() => { navigation.navigate("SecondScreenRegister") }} />}
                        <Text style={styles.title}>Informações sobre a padaria</Text>
                        <Text style={styles.subTitle}>Nos informe o endereço de sua padaria e como ela é conhecida</Text>
                        <Text style={styles.text}>Por qual nome sua padaria é conhecida?</Text>
                        <TextInput icon="coffee" validator={text => { setName(text); return nameValidator(text) }} placeholder="Digite o nome da sua padaria" />
                        <Text style={styles.text}>CEP da sua padaria</Text>
                        <TextInput icon="hash" maxLength={9} validator={text => {
                            var textFormated = cepMask(text)
                            setTypedCep(textFormated);
                            return cepValidator(textFormated);
                        }} placeholder="Digite o CEP da sua padaria" value={typedCep}  keyboardType="number-pad" />
                        <Text style={styles.text}>Número</Text>
                        <TextInput icon="hash"
                            validator={text => { setNumber(numberMask(text)); return numberValidator(text) }}
                            placeholder="Digite o número onde fica a padaria"
                            keyboardType="number-pad"
                            value={number} />
                        <TouchableOpacity style={styles.nextButton}
                            disabled={submitButtonValidator() ? false : true}
                            onPress={() => {
                                pressButton();
                            }}
                            containerStyle={{
                                opacity: submitButtonValidator() ? 1 : .4,
                            }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default SecondScreenRegister;