import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Animated, { call, cond, eq, useCode } from "react-native-reanimated";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { mix, string } from "react-native-redash";
import CircularProgress from "./CircularProgress/CircularProgress";
import StyleGuide from "./StyleGuide";
import newFornadaServices from "../services/NewFornadaServices/NewFornadaServices";
import getLoggedUser, { setAndChangeLoggedUser } from "../services/Utils/LoggedUser";
import UserInterface from "../services/Utils/UserInterface";
import ModalPopupLoading from "./ModalPopup/ModalPopupLoading/ModalPopupLoading";

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
});

interface ButtonProps {
  progress: Animated.Node<number>;
  functionToButton(): void;
  setShowLoading(trueFalse: boolean): void;
  changeTextInfo(text: string): void;
  changeLocalDateFunc(): void;
}

export default ({ changeLocalDateFunc, changeTextInfo, setShowLoading, progress, functionToButton }: ButtonProps) => {
  const [active, setActive] = useState(false);
  const height = mix(progress, 0, ICON_SIZE);
  const alertMessage = useState("")

  useCode(
    () =>
      cond(
        eq(progress, 1),
        call([], () => setActive(true))
      ),
    [progress]
  );

  if (active) {
    setShowLoading(true);
    functionToButton();
    setShowLoading(false);
    changeTextInfo("Daqui 3 minutos você poderá avisar seus clientes novamente!")
    changeLocalDateFunc();
    setTimeout(() => {
      changeLocalDateFunc(); 
      setActive(false)
      changeTextInfo("Os clientes que pediram para serem \n notificados receberão o aviso!")
    }, 5000);
  }

  return (
    <View >
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
  );
};
