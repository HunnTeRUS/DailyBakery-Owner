import React, { useState } from 'react';
import styles from './styles'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Text, View } from '../../../../components/Themed';
import { useNavigation, useRoute } from '@react-navigation/native'
import TextInput from '../../../../components/TextInput';
import CepInterface from '../../../../services/Utils/CepInterface';
import ModalPopupLoading from '../../../../components/ModalPopup/ModalPopupLoading/ModalPopupLoading';
import ModalPopupInfos from '../../../../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import changeAddressService from '../../../../services/ChangeAddressServices/ChangeAddressService';
import { KeyboardAvoidingView } from 'react-native';
import ModalPopupInterrogs from '../../../../components/ModalPopup/ModalPopupInterrog/ModalPopupInterrogs';
import {textMask, removeMask} from '../../../../components/InputMasks'

const ChangeAdress = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams: CepInterface = route.params as CepInterface;
    const [street, setStreet] = useState(routeParams.logradouro as string)
    const [neighborhood, setNeighborhood] = useState(routeParams.bairro as string)
    const [city, setCity] = useState(routeParams.cidade as string)
    const [state, setState] = useState(routeParams.estado as string)
    const [showLoading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [textToShow, setTextToshow] = useState("");
    const [count1, setCount1] = useState(false);
    const [count2, setCount2] = useState(false);
    const [count3, setCount3] = useState(false);
    const [count4, setCount4] = useState(false);
    const [showAsk, setShowAsk] = useState(false)

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
        setLoading(true)
        await changeAddressService(routeParams.cep as string, street, neighborhood, state, city, routeParams.latitude as string, routeParams.longitude as string, routeParams.numero as string).then(Response => {
            setLoading(false);
            if (Response.error === "" || Response.error === undefined || Response.error === null) {
                navigation.navigate('InfoBakery');
            } else {
                setTextToshow(Response.error as string);
                setShow(true);
            }
        }).catch(Error => {
            setLoading(false);
            setShow(true);
            console.log(Error);

            setTextToshow('Ocorreu um erro inesperado, por favor tente novamente mais tarde!');
        })

    }

    return (
        <View style={styles.container}>
            {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
            {!show ? <></> : <ModalPopupInfos textToShow={textToShow} showModal={show} setShow={setShow} onPressCloseButton={() => { navigation.navigate("ChangeAddress") }} />}
            {!showAsk ? <></> : <ModalPopupInterrogs functionToYesButton={pressButton} textToTitle='Alterar endereço'
             textToShow='Tem certeza de que deseja alterar seu endereço? Obs: Poderá alterar novamente daqui 30 dias.' showModal={showAsk} setShow={setShowAsk}/>}

            <View style={styles.secondContainer}>
                <KeyboardAvoidingView behavior="position">

                    <Text style={styles.subTitle}>Confira seus dados e não deixe nenhum campo em branco!.</Text>
                    <Text style={styles.textStreetName}>Nome da rua</Text>
                    <TextInput
                        icon="map-pin" validator={text => {
                            if (!count1) {
                                text = routeParams.logradouro as string
                                setCount1(true)
                            }
                            setStreet(text);
                            return streetValidator(text)
                        }}
                        style={styles.inputStreet}
                        placeholder="Logradouro"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        textContentType="addressCity"
                        autoCorrect={true}
                        value={street}
                    />

                    <Text style={styles.textBairro}>Bairro</Text>
                    <TextInput
                        icon="map-pin" validator={text => {
                            if (!count2) {
                                text = routeParams.bairro as string
                                setCount2(true)
                            }
                            setNeighborhood(text);
                            return neighborhoodValidator(text)
                        }}
                        style={styles.inputBairro}
                        placeholder="Digite o Bairro"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={true}
                        value={neighborhood}
                    />

                    <Text style={styles.textCity}>Cidade</Text>
                    <TextInput
                        icon="map-pin" validator={text => {
                            if (!count3) {
                                text = routeParams.cidade as string
                                setCount3(true)
                            }
                            setCity(text);
                            return cityValidator(text)
                        }}
                        style={styles.inputCity}
                        placeholder="Digite a cidade"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        textContentType="addressCity"
                        autoCorrect={true}
                        value={city}
                    />

                    <Text style={styles.textState}>Estado (UF)</Text>
                    <TextInput
                        icon="map-pin" maxLength={2} numberOfLines={1}  validator={text => {
                            if (!count4) {
                                text = textMask(routeParams.estado as string)
                                setCount4(true)
                            }
                            setState(textMask(text));
                            return stateValidator(text)
                        }}
                        style={styles.inputState}
                        placeholder="Digite o Estado"
                        placeholderTextColor="#999"
                        autoCapitalize='characters'
                        textContentType="addressCityAndState"
                        autoCorrect={false}
                        value={state}
                    />

                    <View style={{marginTop: "15%", backgroundColor: "#E8EDFF",}}>
                        <TouchableOpacity
                            disabled={submitValidator() ? false : true}
                            style={styles.nextButton}
                            onPress={() => {
                                setShowAsk(true)
                            }}
                            containerStyle={{
                                opacity: submitValidator() ? 1 : .4,
                            }}
                        >
                            <Text style={styles.nextText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

            </View>
        </View>
    )
}

export default ChangeAdress;