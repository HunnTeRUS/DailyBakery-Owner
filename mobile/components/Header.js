import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';

export default Header = () => (
    <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/images/owner1.png')}/>
                <Text />
            </View>
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        paddingLeft: -5,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    image: {
        width: 140,
        height: 100,
        resizeMode:"contain",
    }
})