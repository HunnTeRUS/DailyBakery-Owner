import * as React from 'react';
import styles from './styles'
import { TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Text, View } from '../../../../components/Themed';
import { useNavigation } from '@react-navigation/native'

const ChangeAdress = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
                <View style={styles.secondContainer}>
                    <Text style={styles.subTitle}>Confira seus dados e não deixe nenhum campo em branco!.</Text>

                    <Text style={styles.textStreetName}>Nome da rua</Text>
                    <TextInput
                        style={styles.inputStreet}
                        placeholder="Logradouro"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        textContentType="addressCity"
                        autoCorrect={false}
                        />

                    <Text style={styles.textBairro}>Bairro</Text>
                    <TextInput
                        style={styles.inputBairro}
                        placeholder="Digite o Bairro"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false} />

                    <Text style={styles.textCity}>Cidade</Text>
                    <TextInput
                        style={styles.inputCity}
                        placeholder="Digite a cidade"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        textContentType="addressCity"
                        autoCorrect={false} />

                    <Text style={styles.textState}>Estado</Text>
                    <TextInput
                        style={styles.inputState}
                        placeholder="Digite o Estado"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        textContentType="addressCityAndState"
                        autoCorrect={false} />

                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('InfoBakery')}>
                        <Text style={styles.nextText}>Salvar</Text>
                    </TouchableOpacity>

                </View>
        </View>
    )
}

export default ChangeAdress;