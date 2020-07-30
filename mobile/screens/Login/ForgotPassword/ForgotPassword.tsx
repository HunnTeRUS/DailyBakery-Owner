import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import Navigation from '../../../navigation';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';
import TextInput from '../Components/Form/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import styles from './styles'

const emailValidator = (email: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const ForgotPassword = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../../../assets/images/owner1.png')} style={styles.image} />
                <Text style={styles.title}>Recuperação de Senha</Text>

                <View style={styles.inputs}>
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput icon="mail" autoCapitalize="none" placeholder='Digite seu e-mail' validator={emailValidator} />
                    <Text style={styles.infos}>Você receberá um e-mail com um codigo para prosseguir com a {'\n'}alteração de sua senha</Text>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => {}} style={styles.nextButton}>
                <Text style={styles.nextText}>Enviar</Text>
            </TouchableOpacity>

        </View>
    )
}


export default ForgotPassword;