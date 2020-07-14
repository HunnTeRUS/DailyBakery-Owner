import React from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import Header from '../components/Header'

export default Profile = () => (
    <>
        <Header/>
        <View styles={styles.principalView}>
            <StatusBar barStyle="light-content"/>
        </View>
    </>
)

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: "#161924"
    }
})
