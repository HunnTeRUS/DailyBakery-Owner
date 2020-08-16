import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ThirdScreenRegister = () => {
    const navigation = useNavigation();

    const [street, setStreet] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const streetValidator = (street: string) =>
    street.length > 3;

    const neighborhoodValidator = (neighborhood: string) =>
        neighborhood.length > 3;

    const cityValidator = (city: string) =>
        city.length >= 2;

    const stateValidator = (state: string) =>
        state.length >2;

    const submitValidator = () => {
        return neighborhoodValidator(neighborhood) && streetValidator(street) && cityValidator(city) && stateValidator(state)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Verifique os dados da sua padaria!</Text>
                        <Text style={styles.subTitle}>Não deixe nenhum campo vazio e altere algum campo se necessario</Text>
                        <Text style={styles.text}>Nome da rua</Text>
                        <TextInput icon="map-pin" validator={text => {setStreet(text); return streetValidator(text)}} value={street} placeholder="Nome da Rua onde fica a padaria" />
                        <Text style={styles.text}>Bairro</Text>
                        <TextInput icon="map-pin" validator={text => {setNeighborhood(text); return neighborhoodValidator(text)}} value={neighborhood} placeholder="Nome do bairro onde fica a padaria" />
                        <Text style={styles.text}>Cidade</Text>
                        <TextInput icon="map-pin" validator={text => {setCity(text); return cityValidator(text)}} value={city} placeholder="Cidade onde a padaria está localizada" />
                        <Text style={styles.text}>Estado</Text>
                        <TextInput icon="map-pin" validator={text => {setState(text); return stateValidator(text)}} value={state} placeholder="Estado onde a padaria está localizada" />
                        <TouchableOpacity style={[styles.nextButton, {backgroundColor: submitValidator() ? '#FEC044' : '#D3D3D3'}]} disabled={submitValidator() ? false : true} onPress={() => { navigation.navigate('FourthScreenRegister') }}>
                            <Text style={[styles.nextText, {color: submitValidator() ? 'white' : '#C8C8C8'}]}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}


export default ThirdScreenRegister;