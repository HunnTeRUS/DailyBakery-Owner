import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Value, cond, eq } from "react-native-reanimated";
import { mix, onGestureEvent, withTransition } from "react-native-redash";
import Button from "./Button";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import changeOpenedClosedBakery from '../services/CloseBakeryServices/CloseBakeryServices'
import getLoggedUser, { setAndChangeLoggedUser } from '../services/Utils/LoggedUser'
import ModalPopupWarns from '../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from "./ModalPopup/ModalPopupLoading/ModalPopupLoading";
import newFornadaServices from "../services/NewFornadaServices/NewFornadaServices";
import LastFornada from './LastFornada'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EDFF",
    display: 'flex',
  },

  novaFornadaText: {
    textAlign: "center",
    fontFamily: 'Poppins-Bold',
    marginTop: '10%',
    fontSize: 17,
  },

  ultimaFornadaTextLabel: {
    fontWeight: 'bold',
    color: '#FEC044',

  },

  buttonHandler: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '5%'
  },

  novaFornadaTextDeion: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    marginTop: '5%',
    color: '#BAA6A6',
    fontSize: 16
  },

  toCloseBakery: {
    backgroundColor: '#FEC044',
    borderRadius: 6,
    height: 40,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',

  },

  toCloseBakeryText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  }

});

export default () => {
  const navigation = useNavigation();
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state: state });
  const isActive = eq(state, State.BEGAN);
  const duration = cond(isActive, 250, 500);
  const progress = withTransition(isActive, { duration });
  const scale = mix(progress, 1, 1.2);
  const [textToShow, setTextToShow] = useState('Ocorreu um erro ao executar essa função!')
  const [showLoading, setShowLoading] = useState(false)
  const [textInfo, setTextInfo] = useState("Os clientes que pediram para serem \n notificados receberão o aviso!")
  const [show, setShow] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  async function closeBakery() {
    setShowLoading(true)
    const loggedUser = await getLoggedUser();
    if (loggedUser)
      await changeOpenedClosedBakery(loggedUser.cnpj ? loggedUser.cnpj : "", loggedUser.token ? loggedUser.token : "", true).then(response => {
        if (response.error === "" || response.error === undefined || response.error === null) {
          setShowLoading(false)
          loggedUser.aberto_fechado = true;
          setAndChangeLoggedUser(loggedUser);
          navigation.navigate('ClosedBakery')
        }
        else {
          setShowLoading(false)
          setTextToShow(response.error ? response.error : "")
          setShow(true)
        }
      }).catch(error => {
        console.log(error)
        setShowLoading(false)
        setTextToShow('Ocorreu um erro ao executar essa função!')
        setShow(true)
      });

  }

  return (
    <View style={styles.container}>
      {!show ? <></> : <ModalPopupWarns textToShow={textToShow} showModal={show} setShow={setShow} />}
      {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
      <View style={styles.buttonHandler}>
        <TapGestureHandler {...gestureHandler} >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Button {...{ progress }} changeTextInfo={setTextInfo} />
          </Animated.View>
        </TapGestureHandler>
      </View>
      <TouchableOpacity style={styles.toCloseBakery} onPress={() => closeBakery()}>
        <Text style={styles.toCloseBakeryText}>Fechar Padaria</Text>
      </TouchableOpacity>
    </View>
  );
};