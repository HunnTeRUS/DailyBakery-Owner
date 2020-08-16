import React, { useState } from 'react';
import styles from './styles'
import { Text, Modal, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Baker from '../../ImagesComponents/Baker'

interface ModalPopupLoadingInterface {
    showModal: boolean;
    functionToExecuteWhileIsLoading(): void
}

const ModalPopupLoading = (props: ModalPopupLoadingInterface) => {
    const [show, setShow] = useState(props.showModal);

    if (props.functionToExecuteWhileIsLoading) {
        props.functionToExecuteWhileIsLoading();
        setShow(false)
    }

    return (
        <Modal
            animated={true}
            animationType="fade"
            visible={show}
            transparent={true}
            statusBarTranslucent={true}>

            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.bakerPic} resizeMode="contain" source={require('../../../../assets/images/owner1.png')} />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.bakerPic} resizeMode="contain" source={require('../../../../assets/images/loading.gif')} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Aguarde...</Text>
                    </View>
                </View>
            </View>
        </Modal>)
}

export default ModalPopupLoading;