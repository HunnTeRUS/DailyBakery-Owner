import React from 'react';
import {View, StatusBar, StyleSheet, Button} from 'react-native';
import Header from '../components/Header'

export default Profile = () => (
    <>
        <View styles={styles.principalView}>
            <Header/>
        </View>
    </>
)

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: "#161924"
    }
})
