import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Animated, { call, cond, eq, useCode } from "react-native-reanimated";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { mix, string } from "react-native-redash";
import CircularProgress from "./CircularProgress/CircularProgress";
import StyleGuide from "./StyleGuide";
import newFornadaServices from "../services/NewFornadaServices/NewFornadaServices";

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
}

async function newFornada(){
    var date = new Date();
    console.log(date.getHours())
    console.log(date.getDate())
    console.log(date.getMonth())
    console.log(date.getFullYear())

    await newFornadaServices(date).then(response => {
      console.log(response)
    });
    return true;
}

function convertDate(date : any){
    if(date<10)
      date = `0${date}`
    return date 
}

export default ({ progress }: ButtonProps) => {
  const [active, setActive] = useState(false);
  const height = mix(progress, 0, ICON_SIZE);
   useCode(
     () =>
       cond(
         eq(progress, 1),
         call([], () => setActive(true))
       ),
     [progress]
   );

   if(active){
      if(newFornada()){
        setActive(false)
      };
   }
    
   return (
    <View>
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
