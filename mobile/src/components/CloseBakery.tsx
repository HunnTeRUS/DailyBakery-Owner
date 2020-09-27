import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity} from "react-native";
import changeOpenedClosedBakery from "../services/CloseBakeryServices/CloseBakeryServices";
import getLoggedUser, { setAndChangeLoggedUser } from "../services/Utils/LoggedUser";

const styles = StyleSheet.create({
  toCloseBakery: {
    backgroundColor: '#FEC044',
    borderRadius: 6,
    height: 40,
    width: '45%',
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
  const [textToShow, setTextToShow] = useState('Ocorreu um erro ao executar essa função!')
  const [showLoading, setShowLoading] = useState(false)
  const [show, setShow] = useState(false);

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
      <TouchableOpacity style={styles.toCloseBakery} onPress={() => closeBakery()}>
        <Text style={styles.toCloseBakeryText}>Fechar Padaria</Text>
      </TouchableOpacity>
  );
};