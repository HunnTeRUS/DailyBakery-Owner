import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import Animated, { call, cond, eq, useCode, Value, } from "react-native-reanimated";
import { FontAwesome5 as Icon, FontAwesome5 } from "@expo/vector-icons";
import CircularProgress from "./CircularProgress/CircularProgress";
import StyleGuide from "./StyleGuide";
import ModalPopupLoading from "./ModalPopup/ModalPopupLoading/ModalPopupLoading";
import getLoggedUser, { setAndChangeLoggedUser } from "../services/Utils/LoggedUser";
import newFornadaServices from "../services/NewFornadaServices/NewFornadaServices";
import ModalPopupWarns from '../components/ModalPopup/ModalPopupWarn/ModalPopupWarns'
import UserInterface from "../services/Utils/UserInterface";
import { useFocusEffect } from "@react-navigation/native";

const SIZE = 150;
const STROKE_WIDTH = 10;
const ICON_SIZE = 70;
const CONTENT_SIZE = SIZE - STROKE_WIDTH * 2;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: STROKE_WIDTH,
    left: STROKE_WIDTH,
    right: STROKE_WIDTH,
    bottom: STROKE_WIDTH,
    backgroundColor: "white",
    borderRadius: CONTENT_SIZE / 2,
    zIndex: 100,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
  },
  activeIcon: {
  },
  novaFornadaText: {
    textAlign: "center",
    fontFamily: 'Poppins-Bold',
    marginTop: '5%',
    marginBottom: "3%",
    fontSize: 17,
  },

  novaFornadaTextDeion: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    marginTop: '5%',
    color: '#BAA6A6',
    fontSize: 16
  },

  ultimaFornadaTextLabel: {
    fontWeight: 'bold',
    color: '#FEC044',

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

interface ButtonProps {
  progress: Animated.Node<number>;
  changeTextInfo(text: string): void;
}

export default ({ changeTextInfo, progress }: ButtonProps) => {
  const [active, setActive] = useState(false); //TA FALSEEEEE
  const [text, setText] = useState("Notificar clientes sobre nova fornada:")
  const [textInfo, setTextInfo] = useState("Os clientes que pediram para serem \n notificados receberão o aviso!")
  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false)
  const [textError, setTextError] = useState("")
  const [lastBatch, setLastBatch] = useState("")
  const [day, setDay] = useState("")

  useFocusEffect(() => {
    changeLastBatchValue()
  })

  useEffect(() => {
    if(active) {
      console.log("ACTIVE")
      changeAndDo()
    }
  }, [active])

  async function changeLastBatchValue() {
    let loggedUser: UserInterface = {};
    loggedUser = await getLoggedUser();

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

  async function newFornada() {
    var currentDate = new Date();
    var loggedUser = await getLoggedUser();
    var date = new Date(`${currentDate.getFullYear()}-${convertDate(currentDate.getMonth() + 1)}-${convertDate(currentDate.getDate())}T${convertDate(currentDate.getHours())}:${convertDate(currentDate.getMinutes())}:${convertDate(currentDate.getSeconds())}`);

    await newFornadaServices(date).then(response => {
      if (response.error === "" || response.error === undefined || response.error === null) {
        loggedUser.ultima_fornada = date;
        setAndChangeLoggedUser(loggedUser);
      }
      else {
        setTextError(response.error)
        setShow(true)
        return;
      }
    }).catch(error => {
      setTextError("Ocorreu um erro ao acessar esta funcionalidade, tente novamente mais tarde.")
      setShow(true)
      console.log(error)
      return;
    });
  }

  function convertDate(date: any) {
    if (date < 10)
      date = `0${date}`
    return date
  }

  async function changeAndDo() {
    await newFornada();
    await changeLastBatchValue();
    setTextInfo("Você poderá notificar seus clientes novamente dentro de 4 minutos!")
    setText("Seus clientes foram notificados!")
    setTimeout(() => {
      setText("Notificar clientes sobre nova fornada:")
      setActive(false)
      setTextInfo("Os clientes que pediram para serem \n notificados receberão o aviso!")
    }, 240000);
  }

  useCode(
    () =>
      cond(eq(progress, 1),
        call([progress], () => {
          setActive(true)
        })),
    [progress]
  );

  return (
    <>
      {!showLoading ? <></> : <ModalPopupLoading showModal={showLoading} />}
      {!show ? <></> : <ModalPopupWarns textToShow={textError} showModal={show} setShow={setShow} />}
      <View style={{ width: 400 }}>
        <Text style={styles.novaFornadaText}>{text}</Text>
        <View style={{ alignSelf: "center" }}>
          <CircularProgress
            radius={SIZE / 2}
            bg="white"
            fg={StyleGuide.palette.primary}
            {...{ progress }}
          />
          <View style={styles.container}>
            <Icon
              name={active ? "check-circle" : "bread-slice"}
              size={ICON_SIZE}
              color={
                active ? StyleGuide.palette.primary : StyleGuide.palette.primary
              }
              style={styles.icon}
            />
          </View>
        </View>
        <Text style={styles.novaFornadaTextDeion}>
          {textInfo}
        </Text>
      </View>
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
    </>
  );
};
