import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler, AsyncStorage } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Value, cond, eq } from "react-native-reanimated";
import { mix, onGestureEvent, withTransition } from "react-native-redash";
import Button from "./Button";
import {FontAwesome5} from '@expo/vector-icons'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import changeOpenedClosedBakery from '../services/CloseBakeryServices/CloseBakeryServices'
import getLoggedUser, {removeLoggedUser, setAndChangeLoggedUser} from '../services/Utils/LoggedUser'
import ModalPopupWarns from '../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import ModalPopupLoading from "./ModalPopup/ModalPopupLoading/ModalPopupLoading";
import UserInterface from "../services/Utils/UserInterface";

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

  viewOfFornadas: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignSelf: 'center',
    marginTop: 0
  },

  viewOfFornadasAux: {
    backgroundColor: '#c7c5c540',
    marginTop: '15%',
    padding: 20,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  clockIcon: {
    marginRight: '3%',
    color: '#FEC044',
    alignSelf: 'center'
  },

  ultimaFornadaText: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    color: '#BAA6A6'
  },

  toCloseBakery: {
    backgroundColor: '#FEC044',
    borderRadius: 6,
    height: 40,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '15%',
    
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

  async function changeLoggedUserValue(obj : UserInterface){
    const objResponse = await getLoggedUser()

    if (!objResponse) {
        await removeLoggedUser('loggedUser')
        await setAndChangeLoggedUser(obj);
    }
  }

  async function closeBakery(){
    setShowLoading(true)
    const loggedUser = await getLoggedUser();
    await changeOpenedClosedBakery(loggedUser.cnpj ? loggedUser.cnpj : "", loggedUser.token ? loggedUser.token : "", true).then(response => {
        if(response.error === "" || response.error === undefined || response.error === null){
            setShowLoading(false)
            loggedUser.aberto_fechado = true;
            changeLoggedUserValue(loggedUser); 
            navigation.navigate('ClosedBakery')
        }
        else {
          setShowLoading(false)
          setTextToShow(response.error ? response.error : "")
          setShow(true)
        }
    }).catch(() => {
        setShowLoading(false)
        setTextToShow('Ocorreu um erro ao executar essa função!')
        setShow(true)
    });

  }

  return (
    <View style={styles.container}>
      {!show ? <></> : <ModalPopupWarns textToShow={textToShow} showModal={show} setShow={setShow} />}
      {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
      <Text style={styles.novaFornadaText}>
        Notificar clientes sobre nova fornada:
      </Text>
      <View style={styles.buttonHandler}>
        <TapGestureHandler {...gestureHandler}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Button {...{ progress }} />
          </Animated.View>
        </TapGestureHandler>
      </View>
      <Text style={styles.novaFornadaTextDeion}>
        Os clientes que pediram para {"\n"}serem notificados receberão o aviso!
      </Text>
      <View style={styles.viewOfFornadasAux}>
        <View style={styles.viewOfFornadas}>
            <FontAwesome5 style={styles.clockIcon} name="clock" size={35}/>
            <Text style={styles.ultimaFornadaText}>
              <Text style={styles.ultimaFornadaTextLabel}>Ultima fornada:</Text> {"\n"}HOJE{"\n"}13:15:30
            </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.toCloseBakery} onPress={() => closeBakery()}>
        <Text style={styles.toCloseBakeryText}>Fechar Padaria</Text>
      </TouchableOpacity>
    </View>
  );
};