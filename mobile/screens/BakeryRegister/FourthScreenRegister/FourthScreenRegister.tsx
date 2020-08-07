import * as React from 'react';
import styles from './styles'
import { TextInput, TouchableOpacity, Image } from 'react-native'
import { Text, View } from '../../../components/Themed';
import Baker from '../../../components/ImagesComponents/Baker'
import {useNavigation} from '@react-navigation/native'

const FouthScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                    <Baker />
                    <Text style={styles.title}>Cadastro criado com sucesso!</Text>
                    <Text style={styles.subTitle}>Seu cadastro foi criado com sucesso. Clique no botão abaixo para acessar o app!</Text>
                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('Walkthrough') }>
                        <Text style={styles.nextText}>Iniciar</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}


export default FouthScreenRegister;