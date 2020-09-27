import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import { Text, View } from '../../components/Themed';
import ModalPopupInterrogs from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import {useNavigation} from '@react-navigation/native'

export default function TabOneScreen() {
  const [showWarn, setShowWarn] = useState(false);
  const navigation = useNavigation();
  
  async function logout() {
    await AsyncStorage.removeItem('loggedUser');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      {!showWarn ? <></> : <ModalPopupInterrogs functionToYesButton={logout} textToTitle='Logout' textToShow='Deseja sair do app?' showModal={showWarn} setShow={setShowWarn}/>}

      <View style={styles.secondContainer}>
          <Text style={styles.title}>Dados de sua conta</Text>
          <Text style={styles.subTitle}>Você pode alterar os dados de sua conta, como senha e numeros de telefone.</Text>

          <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() =>  navigation.navigate('ChangeContactInfo')}>
            <Feather size={16} name="phone" style={styles.iconUser}/>
            <Text style={styles.nextText}>Alterar dados de contato</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('ChangePassword')}>
            <Feather size={16} name="key" style={styles.iconUser}/>
            <Text style={styles.nextText}>Alterar minha senha</Text>
          </TouchableOpacity>

          <View style={{justifyContent: 'flex-end', width: '100%', alignItems: 'center', flex: 1, backgroundColor: "#ffe9c1", marginBottom: '15%'}}>
            <TouchableOpacity disabled={false} style={[styles.nextButton, styles.logoutButton]} onPress={() => {setShowWarn(true)}}>
              <Feather size={16} name="log-out" style={styles.iconUser}/>
              <Text style={styles.nextText}>Sair</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}