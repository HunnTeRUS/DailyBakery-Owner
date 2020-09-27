import React from 'react';
import styles from './styles'
import { AsyncStorage, BackHandler, TouchableOpacity} from 'react-native'
import { Text, View } from '../../../components/Themed';
import Baker from '../../../components/ImagesComponents/Baker'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import verifyLoginCredentials from '../../../dao/LoginDAO';
import UserInterface from '../../../services/Utils/RegisterInterface';

const FifthScreenRegister = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams: UserInterface = route.params as UserInterface;

    const setLoggedUserInLocalStorage = async (obj: UserInterface) => {
        const objResponse = await AsyncStorage.getItem('loggedUser');

        if (!objResponse) {
            await AsyncStorage.removeItem('loggedUser')
            await AsyncStorage.setItem('loggedUser', JSON.stringify(obj));
        }
    }
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
    async function pressButton() {
        await verifyLoginCredentials(routeParams.cnpj as string, routeParams.senha as string).then(Response => {
            setLoggedUserInLocalStorage(Response)
            navigation.navigate('WalkthroughTutorial');
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <Baker />
                <Text style={styles.title}>Cadastro criado com sucesso!</Text>
                <Text style={styles.subTitle}>Seu cadastro foi criado com sucesso. Clique no botão abaixo para acessar o app!</Text>
                <TouchableOpacity style={styles.nextButton} onPress={() => pressButton()}>
                    <Text style={styles.nextText}>Iniciar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default FifthScreenRegister;