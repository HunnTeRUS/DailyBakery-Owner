import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const FouthScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <View style={styles.field}>
                    <Text style={styles.secondaryText}>Cadastro Realizado com sucesso!!!</Text>
                </View>
                <TouchableOpacity style={styles.button} disabled={false} onPress={() => { navigation.navigate('Walkthrough') }}>
                    <Text style={styles.buttonText}>Começar Agora</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}


export default FouthScreenRegister;