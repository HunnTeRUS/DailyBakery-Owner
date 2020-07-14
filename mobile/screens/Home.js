import React from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import Header from '../components/Header'

export default Home = () => (
    <>
        <Header/>

        <View>
            <Text> Essa é a home</Text>
        </View>
    </>
)

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: "#161924"
    }
})
