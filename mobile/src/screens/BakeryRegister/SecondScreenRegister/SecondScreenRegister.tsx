import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



const SecondScreenRegister = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [cep, setCep] = useState('')
    const [number, setNumber] = useState('')

    const nameValidator = (name: string) =>
    name.length > 2;

    const cepValidator = (cep: string) =>
        cep.length === 8;

    const numberValidator = (number: string) =>
        number.length >= 1;

    const submitButtonValidator = () : boolean => {
        return nameValidator(name) && cepValidator(cep) && numberValidator(number);}
    
    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Informações sobre a padaria</Text>
                        <Text style={styles.subTitle}>Nos informe o endereço de sua padaria e como ela é conhecida</Text>
                        <Text style={styles.text}>Por qual nome sua padaria é conhecida?</Text>
                        <TextInput icon="coffee" validator={text => {setName(text); return nameValidator(text)}} placeholder="Digite o nome da sua padaria" />
                        <Text style={styles.text}>CEP da sua padaria</Text>
                        <TextInput icon="hash" validator={text => {setCep(text); return cepValidator(text)}} placeholder="Digite o CEP da sua padaria" keyboardType="number-pad" />
                        <Text style={styles.text}>Número</Text>
                        <TextInput icon="hash" validator={text => {setNumber(text); return numberValidator(text)}} placeholder="Digite o número onde fica a padaria" keyboardType="number-pad" />
                        <TouchableOpacity style={[styles.nextButton, {backgroundColor: submitButtonValidator() ? '#FEC044' : '#D3D3D3'}]} disabled={submitButtonValidator() ? false : true} onPress={() => { navigation.navigate('ThirdScreenRegister') }}>
                            <Text style={[styles.nextText, {color: submitButtonValidator() ? 'white' : '#C8C8C8'}]}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default SecondScreenRegister;