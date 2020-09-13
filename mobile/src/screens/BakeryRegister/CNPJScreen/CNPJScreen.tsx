import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import findCnpjService from '../../../services/CNPJServices/FindCnpjService';
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import { validate } from 'cnpj'
import ModalPopupLoading from '../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import {useNetInfo} from '@react-native-community/netinfo';

const FirstScreenRegister = () => {
    const [typedCnpj, setTypedcnpj] = useState('')
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [textToShow, setTextToShow] = useState("");
    const [showLoading, setShowLoading] = useState(false)
    const netInfo = useNetInfo();

    async function pressButton() {
        if(!netInfo.isConnected){
            setShow(true)
            setTextToShow("Você precisa estar conectado à internet para acessar essa funcionalidade!");
            return;
        }
        
        setShowLoading(true)
        await findCnpjService(typedCnpj).then(response => {
            if ((response.error === "" || response.error === undefined || response.error === null) && (response.cnpj !== "" && response.cnpj !== undefined && response.cnpj !== null)) {
                setShowLoading(false)
                navigation.navigate('FirstScreenRegister', { cnpj: typedCnpj });
            }
            else {
                setShowLoading(false)
                setShow(true);
                setTextToShow(response.error as string);
            }
        }).catch(error => {
            setShowLoading(false)
            setShow(true)
            setTextToShow("Ocorreu um erro, por favor, tente novamente mais tarde!");
        })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.secondContainer}>
                    {!show ? <></> : <ModalPopupInfos textToShow={textToShow} showModal={show} setShow={setShow} onPressCloseButton={() => { navigation.navigate("CNPJScreen") }} />}
                    {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
                    <View style={styles.firstContainer}>
                        <Text style={styles.title}>Seja bem vindo ao nosso app!</Text>
                        <Text style={styles.subTitle}>Para começar seu cadastro, informe o CNPJ da sua padaria.</Text>
                        <Text style={styles.text}>CNPJ</Text>
                        <TextInput icon="briefcase" maxLength={14} validator={text => {
                             var textFormated = text.replace(/[^0-9]/g, '');
                             setTypedcnpj(textFormated); 
                             return (textFormated.length === 14 && validate(textFormated))
                        }} value={typedCnpj} placeholder="Digite o CNPJ da sua padaria" keyboardType="number-pad" />
                        <Text style={[styles.subTitle, { marginTop: '5%' }]}>
                            Seu CNPJ será usado apenas para validação de sua padaria e para acesso ao app</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <TouchableOpacity style={styles.nextButton}
                            containerStyle={{
                                opacity: (typedCnpj.length === 14) && (validate(typedCnpj)) ? 1 : .4,
                            }}
                            disabled={typedCnpj.length === 14 && validate(typedCnpj) ? false : true} onPress={() => pressButton()}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default FirstScreenRegister;