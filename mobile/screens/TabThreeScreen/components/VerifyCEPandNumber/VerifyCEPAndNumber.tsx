import * as React from 'react';
import styles from './styles'
import { TextInput, TouchableOpacity } from 'react-native'
import { Text, View } from '../../../../components/Themed';
import ChangeAdress from '../ChangeAdress/ChangeAdress'
import { useNavigation } from '@react-navigation/native'

const VerifyCEPAndNumber = () => {
    const navigation = useNavigation();

    return (
            <View style={styles.container}>
                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Alterar dados do estabelecimento</Text>
                    <Text style={styles.subTitle}>Lembre-se de que você deverá esperar 30 dias para alterar o endereço novamente</Text>

                    <Text style={styles.textCep}>CEP da padaria</Text>
                    <TextInput
                        style={styles.inputCep}
                        placeholder="Somente números"
                        placeholderTextColor="#999"
                        autoCapitalize="characters"
                        maxLength={8}
                        textContentType="postalCode"
                        keyboardType="number-pad"
                        selectionColor="#FEC044"
                        autoCorrect={false} />

                    <Text style={styles.textNumber}>Número</Text>
                    <TextInput
                        style={styles.inputNumber}
                        placeholder="Numero do estabelecimento"
                        placeholderTextColor="#999"
                        autoCapitalize="characters"
                        maxLength={6}
                        textContentType="postalCode"
                        selectionColor="#FEC044"
                        keyboardType="number-pad"
                        autoCorrect={false}
                    />

                    <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('ChangeAdress')}>
                        <Text style={styles.nextText}>Proximo</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

export default VerifyCEPAndNumber