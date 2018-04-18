import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { guid } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { colors, clearLocalNotification } from '../utils/helpers';

// Redux
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { submitDeck, deckTitle } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  state = {
    title: ''
  };

  handleTitleInput = title => {
    this.setState({ title });
  };

  submit = () => {
    const { title } = this.state;
    const { decks, navigation } = this.props;
    // const existingDeckTitles = Object.keys(decks).map(title => console.log(title.toLowerCase()));
    // console.log(existingDeckTitles);

    // if (!title || !title.length) {
    //   return alert('Você precisa dar um nome para o Deck.');
    // }

    this.props.dispatch(addDeck(title));
    deckTitle(title).then(() => {
      navigation.navigate('Home', { title });
    });

    this.setState(() => ({ title: '' }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.headerText}>Add a title to your Deck</Text>
          <TextInput
            onChangeText={this.handleTextInput}
            value={this.state.text}
            placeholder="Deck title"
            maxLength={30}
            style={styles.textInput}
          />
        </View>
        <View style={styles.boxSubmitBtn}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: colors.darkBlue,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    textAlign: 'center',
    borderRadius: 3,
    fontSize: 22,
    height: 60,
    margin: 50
  },
  boxSubmitBtn: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  submitBtn: {
    alignItems: 'center',
    backgroundColor: colors.darkBlue,

    width: 200,
    borderRadius: 3
  },
  submitBtnText: {
    color: colors.white,
    textAlign: 'center'
  }
});

const mapStateToProps = decks => {
  return {
    decks
  };
};

export default connect(mapStateToProps)(AddDeck);
