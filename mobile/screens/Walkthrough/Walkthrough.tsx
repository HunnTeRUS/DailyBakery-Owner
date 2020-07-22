import React, { useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import Slide, {SLIDE_HEIGHT} from "./Slide";
import Animated, { multiply } from "react-native-reanimated";
import { onScrollEvent, useValue, interpolateColor, translate } from "react-native-redash";
import Subslide from "./Subslide";
import NotFoundScreen from '../NotFoundScreen';
import { RootStackParamList } from '../../types';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';



const {width } = Dimensions.get("window");

const Apresentacao = [
    {label: "Daily bakery", title: "O Aplicativo", text: "Este app tem o intuito de tornar a vida dos amantes de pão ainda melhor, informando quando tem pão quentinho em sua padaria.", color:"#FFCF6E"},
    {label: "Notificações em tempo real", title: "Como funciona?", text: "O clinte pode selecionar a sua padaria para ser informado no momento em que sair o pão!", color:"#FFCF6E"},
    {label: "Pagamentos", title: "Otávio Gay", text: "DailyBakery é um app pago, mas para que você possa comprovar a qualidade nós disponibilizamos X meses grátis para aproveitar!!!", color:"#FFCF6E"},
    {label: "Informações", title: "Quais dados preciso informar", text: "Para se cadastrar é super simples, basta informar alguns dados como o cnpj, email e endereço da sua padria, esses dados são para sua segurança e a nossa também!!!", color:"#FFCF6E"},
    {label: "Comece agora", title: "Quando eu começo?", text: "Para começar basta clicar no botão abaixo! E bem-vindo a nova forma de fazer panificação!", color:"#FFCF6E"},
]

const tutorial = [
    {label: "Minha Padaria", title: "Onde aviso o cliente que saiu o pão quentinho?", text: " Você pode informá-lo na tela \"minha padaria\" (ícone da casinha) e pressionar o botão em formato de pão por 3 segundos, depois é só esperar a satisfação do seu cliente!", color:"#FFCF6E"},
    {label: "Meu Perfil", title: "Onde Posso alterar meus dados?", text: "Você pode alterar alguns dados como por exemplo, endereço, senha... na tela \"Meu perfil\" (ícone do bonequinho), basta digitar os novos dados e envia-los.", color:"#FFCF6E"},
    {label: "A tela que não sei o que é", title: "Onde posso fazer algo que eu não sei?", text: "Você pode comer o cú de quem está lendo na tela \"Fábrica\" (ícone da padaria) e lá vc pode chupar minha enorme rola", color: "#FFCF6E"},
    {label: "Ainda tenho dúvidas", title: "Sem problemas", text: "Você pode acessar esse tutorial quantas vezes quiser, basta clicar no ícone de interrogação no canto superior direito em qualquer tela.", color: "#FFCF6E"},
]
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
    },
    slider: {
        backgroundColor: "#FFCF6E",
        borderBottomRightRadius: 75,
        height: SLIDE_HEIGHT,
        alignContent: "center"
    },
    footer: {
        flex: 1,
    },
    footerContent:{
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 75,
        flexDirection: "row"
    }
});
interface WalkThroughProps {
    inicial?: boolean,
}
const WalkThrough = ({inicial}: WalkThroughProps) => {
    const scroll = useRef<Animated.ScrollView>(null);
    const x = useValue(0);
    inicial = true;
    const slides = inicial? Apresentacao: tutorial;
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_,i)=> i * width),
        outputRange: slides.map(Slide => Slide.color),
    })
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
                {...{onScroll }}>

                    {slides.map(({label},index) => (
                        <Slide key={index} 
                       
                        last = {(index === slides.length ? true : false)} 
                        {...{label}}/>
                    ))}
                </Animated.ScrollView>
            </Animated.View>
        <View style={styles.footer}>
<Animated.View style={{...StyleSheet.absoluteFillObject, borderTopLeftRadius: 75, backgroundColor}}>

<Animated.View style={[styles.footerContent, {width: width * slides.length, flex: 1, transform: [{translateX: multiply(x, -1)}]}]}>
                    {slides.map(({text, title},index) => (
                        <Subslide key={index}  onPress={() => {
                            if(scroll.current){
                                scroll.current.getNode().scrollTo({x: width * (index + 1), animated: true});
                            }
                            const Stack = createStackNavigator<RootStackParamList>();
                            return (
                                <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="Root" component={BottomTabNavigator} />
                                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
                                </Stack.Navigator>
                            );
                            
                        }}last = {(index === slides.length-1 ? true : false)} {...{title, text}}
                        onPressSkip={() => {
                            if(scroll.current){
                                scroll.current.getNode().scrollTo({x: width * slides.length, animated: true});
                            }
                        }}/>
                    ))}
                </Animated.View>
            </Animated.View>
        </View>
    </View>    
    );
};
  
export default WalkThrough;