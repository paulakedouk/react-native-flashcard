import { StyleSheet } from 'react-native';

export const colors = {
  white: '#fff',
  darkBlue: '#333241',
  lightBlue: '#5d5d71',
  blue: '#a0b0be',
  green: '#56be71',
  red: '#be382d'
};

export const stylesConstants = StyleSheet.create({
  cardContainer: {
    margin: 20,
    height: 100,
    padding: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxSubmitBtn: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  submitBtnText: {
    color: colors.white,
    textAlign: 'center'
  },
  btnIOS: {
    backgroundColor: colors.darkBlue,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  btnAndroid: {
    backgroundColor: colors.darkBlue,
    width: 300,
    padding: 10,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    marginTop: 10
  }
});
