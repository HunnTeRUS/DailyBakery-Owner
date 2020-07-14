import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

export default Screen = () => (
    <View styles={styles.principalView}>
        <StatusBar barStyle="light-content"/>
    </View>
)

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: "#161924"
    }
})
