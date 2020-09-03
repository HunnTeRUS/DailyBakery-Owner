import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import RegisterInterface from '../../../services/Utils/RegisterInterface';
import ModalPopupLoading from '../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';

const FirstScreenRegister = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const route = useRoute();
    const routeParams:RegisterInterface = route.params as RegisterInterface

    const emailValidator = (email: string) : boolean =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

    const passwordValidator = (field: string) : boolean => field.length >= 6;

    const passwordConfirmationValidator = (field: string) : boolean => {
        return field.length >= 6 && password === field}
    
    const submitButtonValidator = () : boolean => {
        return (password.length >= 6 && confirmationPassword.length >= 6 && password === confirmationPassword && emailValidator(email)) ? true : false}
    
    async function pressButton() {
        navigation.navigate('SecondScreenRegister', { cnpj: routeParams.cnpj, senha: password, email: email });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">

                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Dados para acesso ao app</Text>
                        <Text style={styles.subTitle}>Informe seu melhor email e crie uma senha segura para você</Text>
                        <Text style={styles.text}>E-mail</Text>
                        <TextInput icon="mail" validator={text => {setEmail(text); return emailValidator(text);}} value={email} placeholder="Digite seu melhor email" />
                        <Text style={styles.text}>Senha</Text>
                        <TextInput icon="key" validator={text => {setPassword(text); return passwordValidator(text);}} value={password} secureTextEntry={true} placeholder="Digite sua senha" />
                        <Text style={styles.text}>Confirmar Senha</Text>
                        <TextInput icon="key" validator={text => {setConfirmationPassword(text); return passwordConfirmationValidator(text);}} value={confirmationPassword} secureTextEntry={true} 
                            placeholder="Digite novamente sua senha" />
                        <TouchableOpacity style={styles.nextButton} disabled={submitButtonValidator() ? false : true}
                            onPress={() => { pressButton() }}
                            containerStyle={{
                                opacity: submitButtonValidator() ? 1 : .4,
                            }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    );
}

export default FirstScreenRegister;