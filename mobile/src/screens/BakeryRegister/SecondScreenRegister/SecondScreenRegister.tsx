import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const nameValidator = (name: string) =>
    name.length > 2;

const cepValidator = (cep: string) =>
    cep.length === 8;

const numberValidator = (number: string) =>
    number.length > 1;

const SecondScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Informações sobre a padaria</Text>
                        <Text style={styles.subTitle}>Nos informe o endereço de sua padaria e como ela é conhecida</Text>
                        <Text style={styles.text}>Por qual nome sua padaria é conhecida?</Text>
                        <TextInput icon="coffee" validator={nameValidator} placeholder="Digite o nome da sua padaria" />
                        <Text style={styles.text}>CEP da sua padaria</Text>
                        <TextInput icon="hash" validator={cepValidator} placeholder="Digite o CEP da sua padaria" keyboardType="number-pad" />
                        <Text style={styles.text}>Número</Text>
                        <TextInput icon="hash" validator={numberValidator} placeholder="Digite o número onde fica a padaria" keyboardType="number-pad" />
                        <TouchableOpacity style={styles.nextButton} disabled={false} onPress={() => { navigation.navigate('ThirdScreenRegister') }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default SecondScreenRegister;