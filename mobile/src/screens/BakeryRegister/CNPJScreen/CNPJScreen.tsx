import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const FirstScreenRegister = () => {
    const [typedCnpj, setTypedcnpj] = useState('')
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.secondContainer}>
                    <View style={styles.firstContainer}>
                        <Text style={styles.title}>Seja bem vindo ao nosso app!</Text>
                        <Text style={styles.subTitle}>Para começar seu cadastro, informe o CNPJ da sua padaria.</Text>
                        <Text style={styles.text}>CNPJ</Text>
                        <TextInput icon="briefcase" validator={text => {setTypedcnpj(text); return text.length === 14;}} value={typedCnpj} placeholder="Digite o CNPJ da sua padaria" keyboardType="number-pad" />
                        <Text style={[styles.subTitle, { marginTop: '5%' }]}>Seu CNPJ será usado apenas para validação de sua padaria e para acesso ao app</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <TouchableOpacity style={[styles.nextButton, {backgroundColor: typedCnpj.length === 14 ? '#FEC044' : '#D3D3D3'}]}
                            disabled={typedCnpj.length === 14 ? false : true} onPress={() => { navigation.navigate('FirstScreenRegister') }}>
                            <Text style={[styles.nextText, {color: typedCnpj.length === 14 ? 'white' : '#C8C8C8'}]}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default FirstScreenRegister;