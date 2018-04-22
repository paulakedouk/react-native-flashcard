import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, deleteDeck } from '../actions/index';
import { colors, stylesConstants } from '../utils/constants';

class Deck extends Component {
  handleAddCard = () => {
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];
    this.props.navigation.navigate('AddCard', { deck });
  };

  handleQuiz = () => {
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];
    console.log(deck);
    this.props.navigation.navigate('Quiz', { deck });
  };

  showBtns = () => {
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];

    if (deck.questions.length > 0) {
      return (
        <View style={stylesConstants.boxSubmitBtn}>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
            onPress={this.handleQuiz}
          >
            <Text style={stylesConstants.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
            onPress={this.handleAddCard}
          >
            <Text style={stylesConstants.submitBtnText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
          onPress={this.handleAddCard}
        >
          <Text style={stylesConstants.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];
    // console.log('Deck -------------- ', deck);

    return (
      <View style={styles.container}>
        <View style={styles.viewInfo}>
          <Text style={styles.title}>{`${deck.title}`.toUpperCase()}</Text>
          <Text style={styles.infoTxt}>{deck.questions.length} CARDS</Text>
        </View>

        <View style={stylesConstants.boxSubmitBtn}>{this.showBtns()}</View>
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
