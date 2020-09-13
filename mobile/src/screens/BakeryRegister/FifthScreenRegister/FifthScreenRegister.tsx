import React from 'react';
import styles from './styles'
import { TouchableOpacity} from 'react-native'
import { Text, View } from '../../../components/Themed';
import Baker from '../../../components/ImagesComponents/Baker'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';

const FifthScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.secondContainer}>
                    <Baker />
                    <Text style={styles.title}>Cadastro criado com sucesso!</Text>
                    <Text style={styles.subTitle}>Seu cadastro foi criado com sucesso. Clique no botão abaixo para acessar o app!</Text>
                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('WalkthroughTutorial')}>
                        <Text style={styles.nextText}>Iniciar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


export default FifthScreenRegister;