import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants'

export default Header = () => (

    <>
        <View style={styles.container} >
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/images/owner1.png')}/>
                <Text />
            </View>
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        marginLeft: -10,
        zIndex: 1000
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.0)',
        alignItems: 'center'
    },

    image: {
        width: 130,
        height: 70,
        marginTop: Constants.statusBarHeight - 15,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
    }
})