import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const cnpjValidator = (field: string) =>
    field.length === 14;

const emailValidator = (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const passwordValidator = (field: string) =>
    field.length === 6;

const FirstScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
                <View style={styles.secondContainer}>
                    <View style={styles.firstContainer}>
                        <Text style={styles.title}>Seja bem vindo ao nosso app!</Text>
                        <Text style={styles.subTitle}>Para começar seu cadastro, informe o CNPJ da sua padaria.</Text>
                        <Text style={styles.text}>CNPJ</Text>
                        <TextInput icon="briefcase" validator={cnpjValidator} placeholder="Digite o CNPJ da sua padaria" keyboardType="number-pad" />
                        <Text style={[styles.subTitle, {marginTop: '5%'}]}>Seu CNPJ será usado apenas para validação de sua padaria e para acesso ao app</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <TouchableOpacity style={styles.nextButton} disabled={false} onPress={() => { navigation.navigate('FirstScreenRegister') }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    );
}

export default FirstScreenRegister;