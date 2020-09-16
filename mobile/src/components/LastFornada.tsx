import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler, AsyncStorage } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import UserInterface from "../services/Utils/UserInterface";
import getLoggedUser from "../services/Utils/LoggedUser";

const styles = StyleSheet.create({
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
  
    novaFornadaTextDeion: {
      textAlign: "center",
      fontFamily: 'Poppins-Regular',
      marginTop: '5%',
      color: '#BAA6A6',
      fontSize: 16
    },
  
    novaFornadaTextWarn: {
      textAlign: "center",
      fontFamily: 'Poppins-Regular',
      marginTop: '2%',
      color: 'red',
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
      marginTop: '7%',
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
  
  });

export default () => {
    let loggedUser: UserInterface = {};
    const [lastBatch, setLastBatch] = useState("")
    const [day, setDay] = useState("")

    useEffect(() => {
        bindLoggedUser();


    }, [loggedUser.ultima_fornada])

    async function bindLoggedUser(){
        loggedUser = await getLoggedUser();
        await changeLastBatchValue();
    }

    async function changeLastBatchValue() {
        const data = new Date(loggedUser?.ultima_fornada ? loggedUser.ultima_fornada : "")
  
        if (data.toString() !== "Invalid Date") {
          const hora = formatDate(data.getUTCHours());
          const minutos = formatDate(data.getUTCMinutes());
          const segundos = formatDate(data.getUTCSeconds());
          const day = formatDate(data.getDate());
          const month = formatDate(data.getMonth());
          const year = formatDate(data.getFullYear());
  
          const dataAtual = new Date();
  
          if (dataAtual.getDate() === data.getDate()
            && dataAtual.getFullYear() === data.getFullYear()
            && dataAtual.getMonth() === data.getMonth()) {
            setDay("HOJE")
          }
  
          else if (dataAtual.getDate() - 1 === data.getDate()
            && dataAtual.getFullYear() === data.getFullYear()
            && dataAtual.getMonth() === data.getMonth()) {
            setDay("ONTEM")
          }
  
          else {
            setDay(`${day}/${month}/${year}`)
          }
  
          const dataFinal = `${hora}:${minutos}:${segundos}`
  
          setLastBatch(dataFinal)
        }
        else {
          setDay(`Não há fornadas`)
          setLastBatch("até o momento")
        }
    }
  
    function formatDate(data: any) {
      if (data < 10) {
        return `0${data}`;
      }
      return data;
    }

    return (
        <View style={styles.viewOfFornadasAux}>
            <View style={styles.viewOfFornadas}>
                <FontAwesome5 style={styles.clockIcon} name="clock" size={35} />
                <Text style={styles.ultimaFornadaText}>
                    <Text
                        style={styles.ultimaFornadaTextLabel}>
                        Ultima fornada:
                    </Text>
                    {"\n"}{day}{"\n"}{lastBatch}
                </Text>
            </View>
        </View>
    )
};