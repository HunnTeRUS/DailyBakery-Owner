import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import ModalPopupWarn from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import ClosedBakeryImage from '../../components/ImagesComponents/ClosedBakery'
import { useNavigation } from '@react-navigation/native';
import getLoggedUser, {setAndChangeLoggedUser, removeLoggedUser} from '../../services/Utils/LoggedUser'
import changeOpenedClosedBakery from '../../services/CloseBakeryServices/CloseBakeryServices'
import ModalPopupLoading from '../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import UserInterface from '../../services/Utils/UserInterface';

export default function ClosedBakery() {
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const [textToShow, setTextToShow] = useState('Ocorreu um erro ao executar essa função!')
    const [showLoading, setShowLoading] = useState(false)

    async function changeLoggedUserValue(obj : UserInterface){
        const objResponse = await getLoggedUser()
    
        if (!objResponse) {
            await removeLoggedUser('loggedUser')
            await setAndChangeLoggedUser(obj);
        }
    }

    async function logout(){
        setShowLoading(true)
        await removeLoggedUser('loggedUser')
        setShowLoading(false)
        navigation.navigate('Login')
    }

    async function openBakery(){
        const loggedUser = await getLoggedUser();

        await changeOpenedClosedBakery(loggedUser.cnpj ? loggedUser.cnpj : "", loggedUser.token ? loggedUser.token : "", false)
            .then(response => {
                if(response.error === "" || response.error === undefined || response.error === null){
                    loggedUser.aberto_fechado = false;
                    changeLoggedUserValue(loggedUser);
                    setShowLoading(false)
                    navigation.navigate('BottomTabNavigator')
                }
                else {
                  setShowLoading(false)
                  setTextToShow(response.error ? response.error : "")
                  setShow(true)
                }
            }).catch(() => {
                setShowLoading(false)
                setTextToShow('Ocorreu um erro ao executar essa função!')
                setShow(true)
            });
    }

    return (
        <View style={[styles.container, {}]}>
            {!show ? <></> : <ModalPopupWarn textToShow={textToShow} showModal={show} setShow={setShow} />}
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            <View style={styles.secondContainer}>
                <View style={styles.box}>
                    <Text style={styles.title}>Sua padaria está fechada.</Text>
                    <Text style={styles.subTitle}>Se quiser voltar ao funcionamento normal, basta clicar no botão logo abaixo.</Text>
                    <ClosedBakeryImage heightImage={200} widthImage={250}/>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => {openBakery()}}>
                        <Text style={styles.nextText}>Abrir padaria novamente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={false} style={styles.logoutButton} onPress={() => logout()}>
                        <Feather size={16} name="log-out" style={styles.iconUser}/>
                        <Text style={styles.nextTextLogout}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}