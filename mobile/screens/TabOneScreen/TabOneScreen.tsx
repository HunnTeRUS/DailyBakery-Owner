import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Modal } from 'react-native';
import styles from './styles'

import { Text, View } from '../../components/Themed';
import ModalPopupWarn from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';

export default function TabOneScreen() {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      {!show ? <></> : <ModalPopupWarn textToShow='Yuri gay' showModal={show} setShow={setShow}/>}
      <TouchableOpacity onPress={() => {setShow(!show)}}><Text>SLLSALSLA</Text></TouchableOpacity>
    </View>
  );
}