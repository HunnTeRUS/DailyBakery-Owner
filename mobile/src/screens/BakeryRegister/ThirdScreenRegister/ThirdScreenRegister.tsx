import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import RegisterInterface from '../../../services/Utils/RegisterInterface';

const ThirdScreenRegister = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams: RegisterInterface = route.params as RegisterInterface
    const [street, setStreet] = useState(routeParams.rua as string)
    const [neighborhood, setNeighborhood] = useState(routeParams.bairro as string)
    const [city, setCity] = useState(routeParams.cidade as string)
    const [state, setState] = useState(routeParams.estado as string)
    const [count1, setCount1] = useState(false);
    const [count2, setCount2] = useState(false);
    const [count3, setCount3] = useState(false);
    const [count4, setCount4] = useState(false);

    const streetValidator = (street: string) =>
        street.length > 3;

    const neighborhoodValidator = (neighborhood: string) =>
        neighborhood.length > 3;

    const cityValidator = (city: string) =>
        city.length >= 2;

    const stateValidator = (state: string) =>
        state.length === 2;

    const submitValidator = () => {
        return neighborhoodValidator(neighborhood) && streetValidator(street) && cityValidator(city) && stateValidator(state)
    }
    async function pressButton() {
        navigation.navigate('FourthScreenRegister',
            {
                cnpj: routeParams.cnpj,
                senha: routeParams.senha,
                email: routeParams.email,
                cep: routeParams.cep,
                nome: routeParams.nome,
                numero: routeParams.numero,
                rua: street,
                bairro: neighborhood,
                cidade: city,
                estado: state,
                latitude: routeParams.latitude,
                longitude: routeParams.longitude,
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Verifique os dados da sua padaria!</Text>
                        <Text style={styles.subTitle}>Não deixe nenhum campo vazio e altere algum campo se necessario</Text>
                        <Text style={styles.text}>Nome da rua</Text>
                        <TextInput icon="map-pin" validator={text => {
                            if (!count1) {
                                text = routeParams.rua as string
                                setCount1(true)
                            }
                            setStreet(text);
                            return streetValidator(text)
                        }} value={street} placeholder="Nome da Rua onde fica a padaria" />
                        <Text style={styles.text}>Bairro</Text>
                        <TextInput icon="map-pin" validator={text => {
                            if (!count2) {
                                text = routeParams.bairro as string
                                setCount2(true)
                            }
                            setNeighborhood(text);
                            return neighborhoodValidator(text)
                        }} value={neighborhood} placeholder="Nome do bairro onde fica a padaria" />
                        <Text style={styles.text}>Cidade</Text>
                        <TextInput icon="map-pin" validator={text => {
                            if (!count3) {
                                text = routeParams.cidade as string
                                setCount3(true)
                            }
                            setCity(text);
                            return cityValidator(text)
                        }} value={city} placeholder="Cidade onde a padaria está localizada" />
                        <Text style={styles.text}>Estado (UF)</Text>
                        <TextInput icon="map-pin" maxLength={2} validator={text => {
                            if (!count4) {
                                text = routeParams.estado as string
                                setCount4(true)
                            }
                            setState(text);
                            return stateValidator(text)
                        }} value={state} placeholder="Estado onde a padaria está localizada" />
                        <TouchableOpacity style={styles.nextButton}
                            disabled={submitValidator() ? false : true}
                            onPress={() => { pressButton() }}
                            containerStyle={{
                                opacity: submitValidator() ? 1 : .4,
                            }}>
                            <Text style={styles.nextText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}


export default ThirdScreenRegister;