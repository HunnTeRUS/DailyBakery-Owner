import React, { useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, AsyncStorage, Text, BackHandler } from "react-native";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Animated, { multiply, divide, Value } from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";
import Subslide from "./Subslide";
import Dots from './Components/Dots';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const tutorial = [
    { picture: require("../../../assets/images/9.png"), label: "Minha Padaria", title: "Posso alterar informações da minha padaria?", text: "Você consegue alterar informações de endereço de sua padaria, basta clicar em (minha padaria)", color: "#FFCF6E", icon: <FontAwesome5 name="industry" size={20}/> },
    { picture: require("../../../assets/images/7.png"), label: "Meu Perfil", title: "Onde Posso alterar meus dados?", text: "Você pode alterar dados de contato e senha na tela \"Meu perfil\" basta digitar os novos dados e enviá-los, clique em (meu perfil)", color: "#FFCF6E", icon: <FontAwesome5 name="user" size={20}/> },
    { picture: require("../../../assets/images/6.png"), label: "Home", title: "Como notifico meus clientes?", text: "A tela principal de nosso aplicativo tem um botão em formato de um pão, no qual ao você segurar por 1 segundo você irá notificar todos os seus clientes sobre nova fornada.", color: "#FFCF6E", },
    { picture: require("../../../assets/images/8.png"), label: "Ainda tenho dúvidas", title: "Sem problemas", text: "Você pode acessar esse tutorial quantas vezes quiser, no canto superior direito na tela inicial clique em (tutorial)", color: "#FFCF6E", icon: <Feather name="help-circle" size={20} /> },
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DCDCDC",
        width: width
    },
    slider: {
        borderBottomRightRadius: 75,
        height: SLIDE_HEIGHT,
        alignContent: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "white",
    },
    footerContent: {
        flex: 1,
        backgroundColor: "#DCDCDC",
        borderTopLeftRadius: 75,
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height: 75,
        borderRadius: 75,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});

const WalkThroughTutorial = () => {

    const valid = true
    const invalid = false
    const [state, setState] = useState(valid);

    const scroll = useRef<Animated.ScrollView>(null);
    const x = useValue(0);

    const slides = tutorial;
    const onScroll = onScrollEvent({ x });
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
    return (
        <View style={styles.container}>
            <Animated.View style={styles.slider}>
                <Animated.ScrollView
                    horizontal
                    ref={scroll}
                    snapToInterval={width}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{ onScroll }}>

                    {slides.map(({ picture }, index) => (
                        <Slide key={index}
                            last={(index === slides.length ? true : false)}
                            {...{ picture }} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 75, backgroundColor: "#DCDCDC" }} />

                <View style={[styles.footerContent]}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (<Dots key={index} currentIndex={divide(x, width)} {...{ index }} />))}
                    </View>
                    <Animated.View style={
                        { flexDirection: "row", width: width * slides.length, flex: 1, transform: [{ translateX: multiply(x, -1) }] }
                    }>
                        {slides.map(({ text, icon }, index) => (
                            <Subslide key={index} onPress={() => {
                                if (scroll.current) {
                                    scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true });
                                }
                            }} last={(index === slides.length - 1 ? true : false)} {...{ text }}
                                onPressSkip={() => {
                                    if (scroll.current) {
                                        scroll.current.getNode().scrollTo({ x: width * slides.length, animated: true });
                                    }
                                }} icon={icon} />
                        ))}
                    </Animated.View>
                </View>
            </View>
        </View>
    )
};

export default WalkThroughTutorial;