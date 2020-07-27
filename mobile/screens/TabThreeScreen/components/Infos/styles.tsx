import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EDFF",
        display: 'flex',
        alignItems: 'center'
      },
      secondContainer: {
        height: '90%',
        width: '80%',
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: "#E8EDFF",
      },
      title: {
        fontSize: 20,
        color: '#4A4040',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        marginTop: '-15%'
      },
      subTitle: {
        fontSize: 14,
        marginTop: '3%',
        color: '#BAA6A6',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
      },

      nextButton: {
        backgroundColor: '#FEC044',
        borderRadius: 6,
        height: 40,
        width: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%'
      },

      nextText: {
        color: '#FFF',
        fontSize: 15, 
        fontWeight: 'bold'
      }      
});