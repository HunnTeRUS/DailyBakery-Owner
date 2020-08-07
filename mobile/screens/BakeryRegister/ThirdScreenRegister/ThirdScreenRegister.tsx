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
                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Verifique os dados da sua padaria!</Text>
                    <Text style={styles.subTitle}>Não deixe nenhum campo vazio e altere algum campo se necessario</Text>
                    <Text style={styles.text}>Nome da rua</Text>
                    <TextInput icon="map-pin" validator={streetValidator} placeholder="Nome da Rua onde fica a padaria" />
                    <Text style={styles.text}>Bairro</Text>
                    <TextInput icon="map-pin" validator={neighborhoodValidator} placeholder="Nome do bairro onde fica a padaria" />
                    <Text style={styles.text}>Cidade</Text>
                    <TextInput icon="map-pin" validator={cityValidator} placeholder="Cidade onde a padaria está localizada" />
                    <Text style={styles.text}>Estado</Text>
                    <TextInput icon="map-pin" validator={stateValidator} placeholder="Estado onde a padaria está localizada" />
                    <TouchableOpacity style={styles.nextButton} disabled={false} onPress={() => { navigation.navigate('FourthScreenRegister') }}>
                        <Text style={styles.nextText}>Próximo</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>

        </View>
    );
}


export default ThirdScreenRegister;