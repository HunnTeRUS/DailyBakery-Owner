import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EDFF",
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
    backgroundColor: "#E8EDFF",
  },
  title: {
    fontSize: 18,
    color: '#4A4040',
    textAlign: 'center',
    marginTop: '10%',
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 15,
    marginTop: '3%',
    color: '#BAA6A6',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  nextButton: {
    backgroundColor: '#FEC044',
    borderRadius: 6,
    height:50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
    flexDirection: 'row'
  },
  nextText: {
    color: '#FFF',
    fontSize: 15, 
    fontWeight: 'bold'
  },
  iconUser: {
    paddingRight: '4%',
    color:'white'
  },
  logoutButton:{
    backgroundColor: 'red',
  }
});