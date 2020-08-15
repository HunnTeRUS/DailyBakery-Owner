import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const cnpjValidator = (field: string) =>
    field.length === 14;

const emailValidator = (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const passwordValidator = (field: string) =>
    field.length >= 6;

const FirstScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">

                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Dados para acesso ao app</Text>
                        <Text style={styles.subTitle}>Informe seu melhor email e crie uma senha segura para você</Text>
                        <Text style={styles.text}>E-mail</Text>
                        <TextInput icon="mail" validator={emailValidator} placeholder="Digite seu melhor email" />
                        <Text style={styles.text}>Senha</Text>
                        <TextInput icon="key" validator={passwordValidator} secureTextEntry={true} placeholder="Digite sua senha" />
                        <Text style={styles.text}>Confirmar Senha</Text>
                        <TextInput icon="key" validator={passwordValidator} secureTextEntry={true} placeholder="Digite novamente sua senha" />

                        <TouchableOpacity style={styles.nextButton} disabled={false} onPress={() => { navigation.navigate('SecondScreenRegister') }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    );
}

export default FirstScreenRegister;