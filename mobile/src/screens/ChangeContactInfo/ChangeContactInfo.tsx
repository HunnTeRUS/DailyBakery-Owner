import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import ModalPopupInfos from '../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import { useNavigation } from '@react-navigation/native'
import changeContactInfoServices from '../../services/ChangeContactInfoServices/ChangeContactInfoServices'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import getLoggedUser, { setAndChangeLoggedUser } from '../../services/Utils/LoggedUser';
import ModalPopupInterrogs from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import {celPhoneMask,telphoneMask, removeMask} from '../../components/InputMasks'

export default function ChangeContactInfo() {
    const [show, setShow] = useState(false);
    const phoneValidator = (phone: string) => { return phone.length === 15 ? true : false };
    const telValidator = (phone: string) => { if (phone) return phone.length === 14; else return true; }
    const navigation = useNavigation();
    const [phone, setPhone] = useState('')
    const [celPhone, setCelPhone] = useState('')
    const [valorParaGambiarra, setValorParaGambiarra] = useState(false)
    const [valorParaGambiarra2, setValorParaGambiarra2] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [textToShow, setTextToShow] = useState('Suas informações de contato foram alteradas com sucesso!')
    const [response, setResponse] = useState({});
    const [showWarn, setShowWarn] = useState(false);

    useEffect(() => {
        const num = async () => {
            const obj = await getLoggedUser();
            setPhone(telphoneMask(obj?.numero_telefone ? obj?.numero_telefone : ""));
            setCelPhone(celPhoneMask(obj?.numero_celular ? obj?.numero_celular : ""));
        }
        num();
    }, []);

    function redirectIfUpdateHasFinished() {
        if (response) {
            navigation.navigate('BottomTabNavigator');
            setResponse({});
        }
    }


    async function updateNumberLoggedUser(){
        var user = await getLoggedUser();
        if(user) {
            user.numero_celular = celPhone;
            user.numero_telefone = phone;
            await setAndChangeLoggedUser(user);
        }
    }

    async function pressButtonAndChangeContactInfo(){
        setShowLoading(true);
        await changeContactInfoServices(removeMask(celPhone), removeMask(phone)).then(response => {
            if(response.error === "" || response.error === undefined || response.error === null){
                updateNumberLoggedUser();
                setShowLoading(false);
                setShow(!show);
            }
            else {
                setTextToShow(response.error);
                setShowLoading(false);
                setShow(!show);
            }
            
        }).catch(() =>{
            setTextToShow("Ocorreu um erro ao alterar seus dados de contato, tente novamente mais tarde");
            setShowLoading(false);
            setShow(!show);
        })
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={redirectIfUpdateHasFinished} textToShow={textToShow} showModal={show} setShow={setShow} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            {!showWarn ? <></> : <ModalPopupInterrogs functionToYesButton={pressButtonAndChangeContactInfo} textToTitle='Alterar contato'
             textToShow='Tem certeza de que deseja alterar seus dados de contato?' showModal={showWarn} setShow={setShowWarn}/>}

            <View style={styles.secondContainer}>
                <Text style={styles.title}>Alterar dados para contato</Text>
                <Text style={styles.subTitle}>Altere se necessário os seus dados de contato</Text>

                <Text style={styles.textCep}>Número de celular</Text>
                <TextInput icon="smartphone" maxLength={15} placeholder="Número do seu celular (com DDD)" value={celPhone}
                    validator={text => {
                        if (!valorParaGambiarra) {
                            text = celPhoneMask(celPhone);
                            setValorParaGambiarra(true)
                        }
                        setCelPhone(celPhoneMask(text));
                        return phoneValidator(text);
                    }
                    } keyboardType="number-pad" />

                <Text style={styles.textNumber}>Número de Telefone (opcional)</Text>
                <TextInput icon="phone" placeholder="Número do seu telefone (com DDD)" 
                    maxLength={14}
                    value={phone}
                    validator={text => {
                        if (!valorParaGambiarra2) {
                            text = telphoneMask(phone);
                            setValorParaGambiarra2(true)
                        }
                        setPhone(telphoneMask(text));
                        return telValidator(text);
                    }
                    } keyboardType="number-pad" />

                <View style={{marginTop: '35%'}}>
                    <TouchableOpacity
                        disabled={(telValidator(phone) && (phoneValidator(celPhone))) ? false : true}
                        containerStyle={{
                            opacity: (telValidator(phone) && (phoneValidator(celPhone))) ? 1 : .4,
                        }}
                        style={styles.nextButton}
                        onPress={() => {
                            setShowWarn(true)
                        }
                        }>
                        <Text style={styles.nextText}>Alterar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}