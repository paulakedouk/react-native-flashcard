import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { guid } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { timeToString, clearLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

// Redux
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
      onPress={onPress}
    >
      <Text style={stylesConstants.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  state = {
    deckTitle: ''
  };

  handleTitleInput = deckTitle => {
    this.setState({ deckTitle });
  };

  submit = () => {
    const { deckTitle } = this.state;
    const { decks, navigation } = this.props;
    const existingDeckNames = Object.keys(decks).map(title => title.toLowerCase());

    if (!deckTitle || !deckTitle.length) {
      return alert('Please fill the field');
    }

    if (existingDeckNames.indexOf(deckTitle.toLowerCase()) !== -1) {
      this.setState(() => ({ deckTitle: '' }));
      return alert('Você já tem um baralho com este nome!');
    }

    this.props.dispatch(newDeck(deckTitle));

    saveDeckTitle(deckTitle).then(() => {
      navigation.navigate('Deck', { deckTitle: deckTitle });
    });

    this.setState(() => ({ deckTitle: '' }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.headerText}>Add a title to your deck</Text>
          <TextInput
            placeholder="Deck title"
            value={this.state.deckTitle}
            maxLength={30}
            onChangeText={this.handleTitleInput}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <View style={stylesConstants.boxSubmitBtn}>
            <SubmitBtn onPress={this.submit} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 100
  },
  headerText: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    textAlign: 'center',
    borderRadius: 2,
    fontSize: 22,
    width: 300,
    height: 60,
    marginTop: 50,
    marginBottom: 10
  }
});

const mapStateToProps = decks => {
  return {
    decks
  };
};

export default connect(mapStateToProps)(AddDeck);
