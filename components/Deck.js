import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, deleteDeck } from '../actions/index';
import { colors, stylesConstants } from '../utils/constants';

class Deck extends Component {
  handleAddCard = () => {};
  handleQuiz = () => {};

  render() {
    console.log('DECK: ', this.props);
    const { deckTitle, decks } = this.props;
    const deck = decks[deckTitle];

    // if (deck.length > 0) {
    //   return (
    //     <TouchableOpacity style={styles.btns} onPress={this.actions}>
    //       <Text style={{ color: colors.white, fontSize: 16 }}>START QUIZ</Text>
    //     </TouchableOpacity>
    //   );
    // } else {
    //   return (
    //     <TouchableOpacity style={[styles.btns, { opacity: 0.6 }]} disabled={true}>
    //       <Text style={{ color: colors.white, fontSize: 16 }}>START QUIZ</Text>
    //     </TouchableOpacity>
    //   );
    // }

    return (
      <View style={styles.container}>
        <View style={styles.viewInfo}>
          <Text style={styles.title}>{`${deck.title}`.toUpperCase()}</Text>
          <Text style={styles.infoTxt}>{deck.questions.length} CARDS</Text>
        </View>

        <View style={stylesConstants.boxSubmitBtn}>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.AndroidSubmitBtn}
            onPress={this.handleAddCard}
          >
            <Text style={stylesConstants.submitBtnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.AndroidSubmitBtn}
            onPress={this.handleQuiz}
          >
            <Text style={stylesConstants.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
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
