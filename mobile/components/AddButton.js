import React from 'react'
import {View, StyleSheet, TouchableHighlight, Animated} from 'react-native'
import {FontAwesome5 } from '@expo/vector-icons'

export default class AddButton extends React.Component{
    
    buttonSize = new Animated.Value(1);
    mode =  new Animated.Value(0);

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.90,
                duration: 100,
                useNativeDriver: false,
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1,
                useNativeDriver: false,
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                useNativeDriver: false, 
            })
        ]).start();
    }

    render() {
        const sizeStyle = {
            transform: [{scale: this.buttonSize}]
        } 
        return (
            <View style={{position: "absolute", alignItems: "center"}}>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#FFCF6E">
                        <Animated.View >
                            <FontAwesome5 name="home" size={24} color="#FFF"/> 
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    button: {
        backgroundColor: "#FFCF6E",
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        position: "absolute",
        top: -60,
        shadowColor: "#FFCF6E",
        shadowRadius: 5,
        shadowOffset: {height: 19},
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFF"
    },

    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FFCF6E"
    }
})