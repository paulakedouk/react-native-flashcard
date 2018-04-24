import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, stylesConstants } from '../utils/constants';
import { NavigationActions } from 'react-navigation';

class Score extends Component {
  restart = deck => {
    this.setState({
      questionNumber: 1,
      finished: false,
      score: 0
    });

    this.props.navigation.navigate('Quiz', { deck });
  };

  goBack = deck => {
    this.props.navigation.navigate('Deck', { deckTitle: deck.title });
  };

  render() {
    const { deck, score } = this.props.navigation.state.params;
    console.log(this.props.navigation);
    const totalQuestions = this.props.navigation.state.params.deck.questions.length;
    const scorePercentage = Math.round((score * 100).toFixed());
    1 / this.totalQuestions;

    return (
      <View style={styles.container}>
        <View style={styles.results}>
          <Text style={styles.resultsText}>{scorePercentage > 50 ? 'You rock! 👏🏻' : 'Keep practicing 🤞🏻'} </Text>
          <Text style={styles.resultsPercentage}>
            Score: {score} of {totalQuestions}{' '}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => this.restart(deck)} style={stylesConstants.btnIOS}>
            <Text style={stylesConstants.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.goBack(deck)} style={stylesConstants.btnIOS}>
            <Text style={stylesConstants.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  results: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultsText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  resultsPercentage: {
    fontSize: 25
  },
  buttons: {
    flex: 2,
    alignItems: 'center'
  }
});
export default Score;
