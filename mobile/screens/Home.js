import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header'

export default Home = () => (
    <>
        <View style={styles.principalView}>
            <Header />
        </View>
    </>
)

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: "#161924"
    },
});
