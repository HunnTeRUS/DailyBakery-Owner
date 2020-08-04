import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            <KeyboardAvoidingView behavior="position">
                <View style={styles.field}>
                    <Text style={styles.secondaryText}>Precisamos saber alguns dados da sua padaria!</Text>
                    <Text style={styles.text}>Por qual nome sua padaria é conhecida?</Text>
                    <TextInput icon="coffee" validator={nameValidator} />
                    <Text style={styles.text}>CEP da sua padaria</Text>
                    <TextInput icon="hash" validator={cepValidator} />
                    <Text style={styles.text}>Número</Text>
                    <TextInput icon="hash" validator={numberValidator} />
                </View>
                <TouchableOpacity style={styles.button} disabled={false} onPress={() => { navigation.navigate('ThirdScreenRegister') }}>
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default SecondScreenRegister;