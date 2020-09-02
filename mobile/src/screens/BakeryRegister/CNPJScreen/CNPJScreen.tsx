import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import findCnpjService from '../../../services/CNPJServices/FindCnpjService';
import ModalPopupInfos from '../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import { validate } from 'cnpj'
const FirstScreenRegister = () => {
    const [typedCnpj, setTypedcnpj] = useState('')
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [textToShow, setTextToShow] = useState("");
    async function pressButton() {
        await findCnpjService(typedCnpj).then(response => {

            if ((response.error === "" || response.error === undefined || response.error === null) && (response.cnpj !== "" && response.cnpj !== undefined && response.cnpj !== null)) {
                navigation.navigate('FirstScreenRegister', { cnpj: typedCnpj });
            }
            else {
                setShow(true);
                setTextToShow(response.error as string);
            }
        }).catch(error => {
            setShow(true)
            setTextToShow("Ocorreu um erro, por favor, tente novamente mais tarde!");
        })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.secondContainer}>
                    {!show ? <></> : <ModalPopupInfos textToShow={textToShow} showModal={show} setShow={setShow} onPressCloseButton={() => { navigation.navigate("CNPJScreen") }} />}
                    <View style={styles.firstContainer}>
                        <Text style={styles.title}>Seja bem vindo ao nosso app!</Text>
                        <Text style={styles.subTitle}>Para começar seu cadastro, informe o CNPJ da sua padaria.</Text>
                        <Text style={styles.text}>CNPJ</Text>
                        <TextInput icon="briefcase" validator={text => {
                             var textFormated = text.replace(/[^0-9]/g, '');
                             setTypedcnpj(textFormated); 
                             return (textFormated.length === 14 && validate(textFormated))
                        }} value={typedCnpj} placeholder="Digite o CNPJ da sua padaria" keyboardType="number-pad" />
                        <Text style={[styles.subTitle, { marginTop: '5%' }]}>Seu CNPJ será usado apenas para validação de sua padaria e para acesso ao app</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <TouchableOpacity style={styles.nextButton}
                            containerStyle={{
                                opacity: (typedCnpj.length === 14) ? 1 : .4,
                            }}
                            disabled={typedCnpj.length === 14 ? false : true} onPress={() => pressButton()}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default FirstScreenRegister;