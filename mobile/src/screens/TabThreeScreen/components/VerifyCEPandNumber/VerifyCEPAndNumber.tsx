import React, { useState } from 'react';
import styles from './styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from '../../../../components/Themed';
import TextInput from '../../../../components/TextInput'
import { useNavigation } from '@react-navigation/native'
import ModalPopupLoading from '../../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import ModalPopupInfos from '../../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import { KeyboardAvoidingView } from 'react-native';
import findCEP from '../../../../dao/FindCEP';
import FindCEPService from '../../../../services/CepService/CepService';

const cepValidator = (cep: string) =>
    cep.length === 8;

const numberValidator = (number: string) =>
    number.length >= 1;

const VerifyCEPAndNumber = () => {
    const navigation = useNavigation();
    const [typedCep, setTypedCep] = useState('')
    const [number, setNumber] = useState('')
    const [showLoading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [textToShow, setTextToshow] = useState("");
    const submitButtonValidator = (): boolean => {
        return cepValidator(typedCep) && numberValidator(number);
    }

    async function pressButton() {
        await FindCEPService(typedCep, number).then(Response => {
            setLoading(false);

            if (Response.error === "" || Response.error === undefined || Response.error === null) {
                navigation.navigate('ChangeAddress',
                    {
                        cep: Response.cep,
                        logradouro: Response.logradouro,
                        bairro: Response.bairro,
                        longitude: Response.longitude,
                        latitude: Response.latitude,
                        cidade: Response.cidade,
                        estado: Response.estado,
                        numero: number,
                    })
            } else {
                setTextToshow(Response.error as string)
                setShow(true);
            }
        }).catch(error => {
            setTextToshow("Ocorreu um erro, tente novamente mais tarde!");
            setShow(true);
            setLoading(false);
        })
    }
    return (
        <View style={styles.container}>
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            {!show ? <></> : <ModalPopupInfos textToShow={textToShow} showModal={show} setShow={setShow} onPressCloseButton={() => { navigation.navigate("TabTwoScreen") }} />}
            <ScrollView>
                <KeyboardAvoidingView behavior="position">

                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Alterar dados do estabelecimento</Text>
                        <Text style={styles.subTitle}>Lembre-se de que você deverá esperar 30 dias para alterar o endereço novamente</Text>

                        <Text style={styles.textCep}>CEP da padaria</Text>
                        <TextInput
                            icon='hash'
                            validator={
                                text => {
                                    var textFormated = text.replace(/[^0-9]/g, '');
                                    setTypedCep(textFormated);
                                    return cepValidator(textFormated);
                                }}
                            style={styles.inputCep}
                            placeholder="Somente números"
                            placeholderTextColor="#999"
                            autoCapitalize="characters"
                            maxLength={8}
                            textContentType="postalCode"
                            keyboardType="number-pad"
                            selectionColor="#FEC044"
                            autoCorrect={false} />

                        <Text style={styles.textNumber}>Número</Text>
                        <TextInput
                            icon='hash'
                            validator={text => { setNumber(text); return numberValidator(text) }}
                            style={styles.inputNumber}
                            placeholder="Numero do estabelecimento"
                            placeholderTextColor="#999"
                            autoCapitalize="characters"
                            maxLength={6}
                            textContentType="postalCode"
                            selectionColor="#FEC044"
                            keyboardType="number-pad"
                            autoCorrect={false}
                        />

                        <TouchableOpacity style={styles.nextButton}
                            disabled={submitButtonValidator() ? false : true}
                            onPress={() => {
                                setLoading(true);
                                pressButton();
                            }}
                            containerStyle={{
                                opacity: submitButtonValidator() ? 1 : .4,
                            }}>
                            <Text style={styles.nextText}>Proximo</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default VerifyCEPAndNumber