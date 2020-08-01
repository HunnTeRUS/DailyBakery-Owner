import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import ModalPopupWarn from '../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import ClosedBakeryImage from '../../components/ImagesComponents/ClosedBakery'

export default function ClosedBakery() {
    const [show, setShow] = useState(false);

    return (
        <View style={styles.container}>
            {/* {!show ? <></> : <ModalPopupWarn textToShow='Yuri gay' showModal={show} setShow={setShow}/>}
            <TouchableOpacity onPress={() => {setShow(!show)}}><Text>SLLSALSLA</Text></TouchableOpacity> */}

            <View style={styles.secondContainer}>
                <View style={styles.box}>
                    <Text style={styles.title}>Sua padaria está fechada.</Text>
                    <Text style={styles.subTitle}>Se quiser voltar ao funcionamento normal, basta clicar no botão logo abaixo.</Text>
                    <ClosedBakeryImage heightImage={200} widthImage={250}/>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => {}}>
                        <Text style={styles.nextText}>Abrir padaria novamente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}