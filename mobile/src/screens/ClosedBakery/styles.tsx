import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe9c1",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    secondContainer: {
        height: '90%',
        width: '80%',
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        color: '#4A4040',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    subTitle: {
        fontSize: 14,
        marginTop: '3%',
        color: '#BAA6A6',
        marginBottom: '10%',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    box: {
        height: '80%',
        width: '100%',
        paddingTop: '5%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: '#FEC044',
        borderRadius: 6,
        height: 45,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '5%'
    },
    nextText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nextTextLogout: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 10
    },
    iconUser: {
        paddingRight: '4%',
        color: 'red'
    },
    logoutButton: {
        borderRadius: 6,
        height: 45,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    }
})