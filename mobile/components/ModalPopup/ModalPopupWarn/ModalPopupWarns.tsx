import * as React from 'react';
import styles from './styles'
import { Text,  Modal, View, Image, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Baker from '../../ImagesComponents/BakerCaution' 

interface ModalPopupInterface{
    show: boolean;
    text: string;
}

const ModalPopup = ({show, text} : ModalPopupInterface) => {
    const navigation = useNavigation();
    return (
        <Modal
            animated={true}
            animationType="fade"
            visible={show}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.image}>
                            <Baker heightImage={200} widthImage={200}/>
                        </View>    
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Atenção</Text>
                        <Text style={styles.subtitle}>{text}</Text>
                    </View>
                    <View style={styles.buttonContainer}>  
                        <TouchableOpacity style={styles.nextButton}>
                            <Text style={styles.nextText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalPopup;