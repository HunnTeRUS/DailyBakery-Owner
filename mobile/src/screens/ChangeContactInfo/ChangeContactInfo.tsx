import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, View, Text, AsyncStorage } from 'react-native';
import styles from './styles'
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
    const phoneValidator = (phone: string) => phone.length === 11;
    const telValidator = (phone: string) => phone.length === 10;
    const navigation = useNavigation();
    const [phone, setPhone] = useState('')
    const [celPhone, setCelPhone] = useState('')
    const [valorParaGambiarra, setValorParaGambiarra] = useState(false)
    const [valorParaGambiarra2, setValorParaGambiarra2] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [textToShow, setTextToShow] = useState('Suas informações de contato foram alteradas com sucesso!')

    useEffect(() => {
        const num = async () => {
            const {numero_celular, numero_telefone} = await getLoggedUser();
            setPhone(numero_telefone ? numero_telefone : "");
            setCelPhone(numero_celular ? numero_celular : "");
        }
        num();
    }, [])

    async function pressButtonAndChangeContactInfo(){
        const response = await changeContactInfoServices(celPhone, phone);
        if(response){
            var user = await getLoggedUser();
            user.numero_celular = celPhone ? celPhone : user.numero_celular;
            user.numero_telefone = phone ? phone : user.numero_telefone;
            await setAndChangeLoggedUser(user);
            setShowLoading(false)
            setShow(!show)
        }
        else {
            setShowLoading(false)
            setTextToShow('Ocorreu um erro ao alterar seus dados, tente novamente mais tarde.')
            setShow(!show)
        }
    }

    return (
        <View style={styles.container}>
            {!show ? <></> : <ModalPopupInfos onPressCloseButton={() => {navigation.navigate('BottomTabNavigator')}} textToShow={textToShow} showModal={show} setShow={setShow}/>}
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

                    <Text style={styles.textNumber}>Número de Telefone</Text>
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
                        disabled={false} 
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