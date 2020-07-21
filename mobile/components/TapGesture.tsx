import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Value, cond, eq } from "react-native-reanimated";
import { mix, onGestureEvent, withTransition } from "react-native-redash";
import Button from "./Button";
import {FontAwesome5} from '@expo/vector-icons'

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
    fontSize: 15,
  },

  buttonHandler: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '5%'
  },

  novaFornadaTextDescription: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    marginTop: '5%',
    color: '#BAA6A6'
  },

  fornada: {
    display: 'flex',
    flexDirection: 'row'
  },

  iconClock: {
    height: 80
  },

  ultimaFornadaText: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    marginTop: '25%',
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
    marginTop: '15%'
  },

  toCloseBakeryText: {
    color: '#FFF',
    fontSize: 15, 
    fontWeight: 'bold'
  }

});

export default () => {
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state: state });
  const isActive = eq(state, State.BEGAN);
  const duration = cond(isActive, 250, 500);
  const progress = withTransition(isActive, { duration });
  const scale = mix(progress, 1, 1.2);
  return (
    <View style={styles.container}>
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
      <Text style={styles.novaFornadaTextDescription}>
        Os clientes que pediram para {"\n"}serem notificados receberão o aviso!
      </Text>
      
        <Text style={styles.ultimaFornadaText}>
          Ultima fornada: {"\n"}00:00:00
        </Text>
      <TouchableOpacity style={styles.toCloseBakery} onPress={() => {}}>
        <Text style={styles.toCloseBakeryText}>Fechar Padaria</Text>
      </TouchableOpacity>
    </View>
  );
};