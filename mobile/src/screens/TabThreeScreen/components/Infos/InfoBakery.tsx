import * as React from 'react';
import styles from './styles'
import { TextInput, TouchableOpacity, Image, BackHandler } from 'react-native'
import { Text, View } from '../../../../components/Themed';
import Baker from '../../../../components/ImagesComponents/Baker'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const InfoBakery = () => {
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

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <Baker />
                <Text style={styles.title}>Endereço alterado com sucesso!</Text>
                <Text style={styles.subTitle}>Seus dados de endereço foram atualizados corretamente e lembrando, só poderá ser alterado novamente daqui 30 dias!</Text>
                <TouchableOpacity disabled={false} style={styles.nextButton} onPress={() => navigation.navigate('Root')}>
                    <Text style={styles.nextText}>Voltar para o inicio</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default InfoBakery;