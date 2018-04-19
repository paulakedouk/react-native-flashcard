import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, deleteDeck } from '../actions/index';
import { colors, stylesConstants } from '../utils/constants';

class Deck extends Component {
  handleAddCard = () => {
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];
    this.props.navigation.navigate('Card', { deck });
  };
  handleQuiz = () => {};

  render() {
    console.log('DECK: ', this.props);
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];

    return (
      <View style={styles.container}>
        <View style={styles.viewInfo}>
          <Text style={styles.title}>{`${deck.title}`.toUpperCase()}</Text>
          {/* <Text style={styles.infoTxt}>{deck.card.length} CARDS</Text> */}
        </View>

        <View style={stylesConstants.boxSubmitBtn}>
          {deck.questions.length > 0 ? (
            <TouchableOpacity
              style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
              onPress={this.handleQuiz}
            >
              <Text style={stylesConstants.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
              onPress={this.handleAddCard}
            >
              <Text style={stylesConstants.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  viewInfo: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100
  },
  title: {
    color: colors.darkBlue,
    fontSize: 30,
    fontWeight: 'bold'
  },
  infoTxt: {
    color: colors.darkBlue,
    fontSize: 14,
    marginTop: 30,
    marginBottom: 30
  }
});

const mapStateToProps = (decks, { navigation }) => {
  const { deckTitle } = navigation.state.params;

  return {
    decks,
    deckTitle
  };
};

export default connect(mapStateToProps, { getDecks })(Deck);
