import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
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
            <KeyboardAvoidingView behavior="position">
                <View style={styles.field}>
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput icon="mail" validator={emailValidator} placeholder="Digite um email que você tenha acesso"/>
                    <Text style={styles.text}>Senha</Text>
                    <TextInput icon="key" validator={passwordValidator} secureTextEntry={true}  placeholder="Digite sua senha" />
                    <Text style={styles.text}>Confirmar Senha</Text>
                    <TextInput icon="key" validator={passwordValidator} secureTextEntry={true} placeholder="Digite novamente sua senha"/>
                    <Text style={styles.text}>CNPJ</Text>
                    <TextInput icon="briefcase" validator={cnpjValidator} placeholder="Digite o CNPJ da sua padaria"/>
                </View>
                <TouchableOpacity style={styles.button} disabled={false} onPress={() => { navigation.navigate('SecondScreenRegister') }}>
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default FirstScreenRegister;