import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEEE",
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'auto'
  },
  secondContainer: {
    height: '90%',
    width: '80%',
    alignSelf: 'auto',
    paddingLeft: '5%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: "#F4EEEE",
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