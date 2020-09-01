import React, { useState, useEffect } from 'react';
import {  Modal, View, Text, AsyncStorage } from 'react-native';
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import ModalPopupInfos from '../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos'
import {useNavigation} from '@react-navigation/native'
import UserInterface from '../../services/Utils/UserInterface'
import changeContactInfoServices from '../../services/ChangeContactInfoServices/ChangeContactInfoServices'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import changeLoggedUserInfo from '../../services/Utils/ChangeLoggedUserInfos'
import getLoggedUser, {setAndChangeLoggedUser} from '../../services/Utils/LoggedUser';

export default function ChangeContactInfo() {
    const [show, setShow] = useState(false);
    const phoneValidator = (phone: string) => {return phone.length === 11 ? true : false};
    const telValidator = (phone: string) => {if(phone) return phone.length === 10; else return true;}
    const navigation = useNavigation();
    const [phone, setPhone] = useState('')
    const [celPhone, setCelPhone] = useState('')
    const [valorParaGambiarra, setValorParaGambiarra] = useState(false)
    const [valorParaGambiarra2, setValorParaGambiarra2] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [textToShow, setTextToShow] = useState('Suas informações de contato foram alteradas com sucesso!')
    const [response, setResponse] = useState({});

    useEffect(() => {
        const num = async () => {
            const obj = await getLoggedUser();
            setPhone(obj?.numero_telefone ? obj?.numero_telefone : "");
            setCelPhone(obj?.numero_celular ? obj?.numero_celular : "");
        }
        num();
    }, []);

    function redirectIfUpdateHasFinished(){
        if(response) {
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
        await changeContactInfoServices(celPhone, phone).then(response => {
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
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={redirectIfUpdateHasFinished} textToShow={textToShow} showModal={show} setShow={setShow}/>}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}

                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Alterar dados para contato</Text>
                    <Text style={styles.subTitle}>Altere se necessário os seus dados de contato</Text>

                    <Text style={styles.textCep}>Número de celular</Text>
                    <TextInput icon="smartphone" placeholder="Número do seu celular (com DDD)" value={celPhone} 
                        validator={ text => {
                            if(!valorParaGambiarra) {
                                text = celPhone;
                                setValorParaGambiarra(true)
                            }
                            setCelPhone(text); 
                            return phoneValidator(text);
                            }
                        } keyboardType="number-pad"/>

                    <Text style={styles.textNumber}>Número de Telefone (opcional)</Text>
                    <TextInput icon="phone" placeholder="Número do seu telefone (com DDD)" value={phone} 
                        validator={ text => { 
                                if(!valorParaGambiarra2) {
                                    text = phone;
                                    setValorParaGambiarra2(true)
                                }
                                setPhone(text); 
                                return telValidator(text);
                            }
                        } keyboardType="number-pad"/>

                    <TouchableOpacity 
                        disabled={(telValidator(phone) && (phoneValidator(celPhone))) ? false : true}
                        containerStyle={{
                            opacity: (telValidator(phone) && (phoneValidator(celPhone))) ? 1 : .4,
                        }}
                        style={styles.nextButton}
                        onPress={() => {
                            setShowLoading(true);
                            pressButtonAndChangeContactInfo()
                            }
                        }>
                        <Text style={styles.nextText}>Alterar</Text>
                    </TouchableOpacity>

                </View>
            </View>
    );
}