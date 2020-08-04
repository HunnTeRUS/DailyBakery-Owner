import React from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const streetValidator = (street: string) =>
    street.length > 3;

const neighborhoodValidator = (neighborhood: string) =>
    neighborhood.length > 3;

const cityValidator = (city: string) =>
    city.length > 3;

const stateValidator = (state: string) =>
    state.length > 3;

const ThirdScreenRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <View style={styles.field}>
                    <Text style={styles.secondaryText}>Verifique os dados da sua padaria e altere os campos, se necessário!</Text>
                    <Text style={styles.secondaryText}>Não deixe nenhum campo vazio</Text>
                    <Text style={styles.text}>Nome da rua</Text>
                    <TextInput icon="map-pin" validator={streetValidator} placeholder="Digite o nome da Rua onde fica a padaria"/>
                    <Text style={styles.text}>Bairro</Text>
                    <TextInput icon="map-pin" validator={neighborhoodValidator} placeholder="Digite o nome do bairro onde fica a padaria"/>
                    <Text style={styles.text}>Cidade</Text>
                    <TextInput icon="map-pin" validator={cityValidator} placeholder="Digite a cidade onde a padaria está localizada"/>
                    <Text style={styles.text}>Estado</Text>
                    <TextInput icon="map-pin" validator={stateValidator} placeholder="Digite o estado onde a padaria está localizada"/>
                </View>
                <TouchableOpacity style={styles.button} disabled={false} onPress={() => { navigation.navigate('FourthScreenRegister') }}>
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}


export default ThirdScreenRegister;