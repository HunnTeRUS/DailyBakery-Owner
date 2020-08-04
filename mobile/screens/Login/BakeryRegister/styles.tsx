import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: "#F4EEEE",
        alignItems: "center",
    },
    image: {

    },
    text: {
        alignItems: "baseline",
        fontFamily: "Poppins-Bold",
        marginBottom: '2%',
        marginTop: '2%',
        marginLeft: '1%',
    },
    field: {
        padding: '3%',
        width: width,
    },
    buttonText: {
        fontFamily: "Poppins-ExtraLight",
        color: "black",
        fontSize: 17,

    },
    button: {
        backgroundColor: '#FEC044',
        borderRadius: 6,
        height: 50,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '10%',
        alignSelf: "center"
    },
    secondaryText: {
        alignItems: "center",
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        marginBottom: '2%',
        marginTop: '2%',
        marginLeft: '1%',
        textAlign: "center"
    }
});