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
        alignContent: 'center',
        backgroundColor: "#ffe9c1",
      },
      title: {
        fontSize: 17,
        color: '#4A4040',
        textAlign: 'center',
        marginTop: '10%',
        fontFamily: 'Poppins-Bold',
      },

      subTitle: {
        fontSize: 14,
        marginTop: '3%',
        color: '#BAA6A6',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
      },

      textCep: {
        marginTop: '15%',
        alignSelf: 'flex-start',
        fontFamily: 'Poppins-Regular',
      },

      inputCep: {
        height: 45,
        color: '#333',
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        fontFamily: 'Poppins-Regular',
        shadowColor: '#000',
        shadowOffset: {
          width: 4,
          height: 4
        },
        elevation: 2,
        paddingHorizontal: 10
      },

      textNumber: {
        marginTop: '10%',
        alignSelf: 'flex-start',
        fontFamily: 'Poppins-Regular',
      },

      inputNumber: {
        height: 45,
        color: '#333',
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        fontFamily: 'Poppins-Regular',
        shadowColor: '#000',
        shadowOffset: {
          width: 4,
          height: 4
        },
        elevation: 2,
        paddingHorizontal: 10
      },

      nextButton: {
        backgroundColor: '#FEC044',
        borderRadius: 6,
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
      },

      nextText: {
        color: '#FFF',
        fontSize: 15, 
        fontWeight: 'bold'
      }      
})