import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Modal } from 'react-native';
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import { Text, View } from '../../components/Themed';
import ModalPopupWarn from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import {useNavigation} from '@react-navigation/native'

export default function TabOneScreen() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* {!show ? <></> : <ModalPopupWarn textToShow='Yuri gay' showModal={show} setShow={setShow}/>}
      <TouchableOpacity onPress={() => {setShow(!show)}}><Text>SLLSALSLA</Text></TouchableOpacity> */}

      <View style={styles.secondContainer}>
          <Text style={styles.title}>Dados de sua conta</Text>
          <Text style={styles.subTitle}>Você pode alterar os dados de sua conta, como senha e numeros de telefone.</Text>

          <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() =>   navigation.navigate('ClosedBakery')}>
            <Feather size={16} name="phone" style={styles.iconUser}/>
            <Text style={styles.nextText}>Alterar dados de contato</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => {}}>
            <Feather size={16} name="key" style={styles.iconUser}/>
            <Text style={styles.nextText}>Alterar minha senha</Text>
          </TouchableOpacity>

          <View style={{justifyContent: 'flex-end', width: '100%', alignItems: 'center', flex: 1, backgroundColor: '#E8EDFF', marginBottom: '15%'}}>
            <TouchableOpacity disabled={false} style={[styles.nextButton, styles.logoutButton]} onPress={() => {}}>
              <Feather size={16} name="log-out" style={styles.iconUser}/>
              <Text style={styles.nextText}>Sair</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}