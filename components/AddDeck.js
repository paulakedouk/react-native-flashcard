import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { guid } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { timeToString, clearLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

// Redux
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { createDeck } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.AndroidSubmitBtn}
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

    this.props.newDeck(deckTitle);

    createDeck(deckTitle).then(() => {
      navigation.navigate('Home', { deckTitle, length: 1 });
    });

    this.setState(() => ({ deckTitle: '' }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.headerText}>Add a title to your Deck</Text>
          <TextInput
            placeholder="Deck title"
            value={this.state.deckTitle}
            maxLength={30}
            onChangeText={this.handleTitleInput}
            style={styles.textInput}
          />
        </View>
        <View style={stylesConstants.boxSubmitBtn}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  row: {
    flexDirection: 'row',
    flex: 1,
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
  }
});

const mapStateToProps = decks => {
  return {
    decks
  };
};

export default connect(mapStateToProps, { newDeck })(AddDeck);
