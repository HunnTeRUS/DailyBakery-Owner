import React, { useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, AsyncStorage, Text } from "react-native";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Animated, { multiply, divide } from "react-native-reanimated";
import { onScrollEvent, useValue, interpolateColor, translate } from "react-native-redash";
import Subslide from "./Subslide";
import Dots from './Components/Dots';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const Apresentacao = [
    { picture: require("../../assets/images/4.png"), label: "Daily bakery", text: "Este app tem o intuito de tornar a vida dos amantes de pão ainda melhor, informando quando tem pão quentinho em sua padaria.", color: "#FFCF6E" },
    { picture: require("../../assets/images/1.png"), label: "Notificações em tempo real", text: "O cliente pode selecionar a sua padaria para ser informado no momento em que sair o pão!", color: "#FFCF6E" },
    { picture: require("../../assets/images/3.png"), label: "Pagamentos", text: "DailyBakery é um app pago, mas para que você possa comprovar a qualidade nós disponibilizamos 1 mês grátis para você experimentar!", color: "#FFCF6E" },
    { picture: require("../../assets/images/2.png"), label: "Informações", text: "Para se cadastrar é super simples, basta informar alguns dados como o cnpj, email e endereço da sua padaria, esses dados são para sua segurança e a nossa também!", color: "#FFCF6E" },
    { picture: require("../../assets/images/5.png"), label: "Comece agora", text: "Para começar basta clicar no botão abaixo! E bem-vindo a nova forma de fazer panificação!", color: "#FFCF6E" },
]

const tutorial = [
    { picture: require("../../assets/images/1.png"), label: "Minha Padaria", title: "Onde aviso o cliente que saiu o pão quentinho?", text: " Você pode informá-lo na tela \"minha padaria\" (ícone da casinha) e pressionar o botão em formato de pão por 3 segundos, depois é só esperar a satisfação do seu cliente!", color: "#FFCF6E" },
    { picture: require("../../assets/images/1.png"), label: "Meu Perfil", title: "Onde Posso alterar meus dados?", text: "Você pode alterar alguns dados como por exemplo, endereço, senha... na tela \"Meu perfil\" (ícone do bonequinho), basta digitar os novos dados e envia-los.", color: "#FFCF6E" },
    { picture: require("../../assets/images/1.png"), label: "A tela que não sei o que é", title: "Onde posso fazer algo que eu não sei?", text: "Você pode comer o cú de quem está lendo na tela \"Fábrica\" (ícone da padaria) e lá vc pode chupar minha enorme rola", color: "#FFCF6E" },
    { picture: require("../../assets/images/1.png"), label: "Ainda tenho dúvidas", title: "Sem problemas", text: "Você pode acessar esse tutorial quantas vezes quiser, basta clicar no ícone de interrogação no canto superior direito em qualquer tela.", color: "#FFCF6E" },
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DCDCDC",
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

const WalkThrough = () => {
    const scroll = useRef<Animated.ScrollView>(null);
    const x = useValue(0);
    let inicial;
    const WalkthroughOrHome = async () => {
        var variavel = await AsyncStorage.getItem('firstAccess');

        if (variavel === null || variavel === 'true') {
            try {
                await AsyncStorage.setItem('firstAccess', 'false');
            } catch (err) {
                console.log(err);
            }
            inicial = true;
        }
        inicial = false;
    }
    WalkthroughOrHome();
    const slides = inicial ? Apresentacao : tutorial;
    const onScroll = onScrollEvent({ x });
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
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 75, backgroundColor: "#DCDCDC" }}/>

                <View style={[styles.footerContent]}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (<Dots key={index} currentIndex={divide(x, width)} {...{ index }} />))}
                    </View>
                    <Animated.View style={
                        { flexDirection: "row", width: width * slides.length, flex: 1, transform: [{ translateX: multiply(x, -1) }] }
                    }>
                        {slides.map(({ text }, index) => (
                            <Subslide key={index} onPress={() => {
                                if (scroll.current) {
                                    scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true });
                                }
                            }} last={(index === slides.length - 1 ? true : false)} {...{ text }}
                                onPressSkip={() => {
                                    if (scroll.current) {
                                        scroll.current.getNode().scrollTo({ x: width * slides.length, animated: true });
                                    }
                                }} />
                        ))}
                    </Animated.View>
                </View>
            </View>
        </View>
    )
};

export default WalkThrough;