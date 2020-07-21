import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { call, cond, eq, useCode } from "react-native-reanimated";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { mix } from "react-native-redash";
import CircularProgress from "./CircularProgress/CircularProgress";
import StyleGuide from "./StyleGuide";

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
