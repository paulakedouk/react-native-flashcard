import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Platform } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.navigation.state.params.deck,
      questionNumber: 1,
      finished: false,
      answer: 'Show Answer',
      score: 0,
      isShowingAnswer: false
    };

    this.totalQuestions = this.props.navigation.state.params.deck.questions.length;
  }

  restart = () => {
    this.setState({
      questionNumber: 1,
      finished: false,
      score: 0
    });
  };

  goBack = () => {
    this.props.navigation.navigate('Deck', { deckTitle: this.state.deck.title });
  };

  showAnswer = () => {
    this.setState({
      answer: this.state.deck.questions[this.state.questionNumber - 1].answer,
      isShowingAnswer: true
    });
  };

  upScore = () => {
    const { score } = this.state;
    const scoreQuestion = 1 / this.totalQuestions;
    this.setState({
      score: score + 1
    });
    this.next();
  };

  downScore = () => {
    this.next();
  };

  next = () => {
    const { questionNumber } = this.state;

    this.setState({
      questionNumber: questionNumber + 1,
      isShowingAnswer: false
    });
  };

  render() {
    const { questionNumber, finished, score, deck, isShowingAnswer } = this.state;
    const totalQuestions = this.state.deck.questions.length;
    const question = deck.questions[questionNumber - 1];
    const scorePercentage = Math.round((this.state.score * 100).toFixed());

    return (
      <View style={styles.container}>
        {question ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text style={{ fontSize: 22, marginTop: 100 }}>
                {questionNumber} / {totalQuestions}
              </Text>
            </View>
            <View style={{ flex: 3, alignItems: 'center' }}>
              <Text style={styles.questionTitle}>{deck.questions[questionNumber - 1].question}</Text>
              {!isShowingAnswer && (
                <Text style={{ textAlign: 'center', color: colors.darkBlue }} onPress={this.showAnswer}>
                  See answer
                </Text>
              )}
              {isShowingAnswer && <Text style={styles.answer}>{this.state.answer}</Text>}
            </View>
            <View style={{ flex: 4, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.upScore} style={[styles.answerBtn, { backgroundColor: 'green' }]}>
                <Text style={{ color: colors.white, textAlign: 'center' }}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.downScore} style={[styles.answerBtn, { backgroundColor: 'red' }]}>
                <Text style={{ color: colors.white, textAlign: 'center' }}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                {scorePercentage > 50 ? 'You rock! 👏🏻' : 'Keep practicing 🤞🏻'}{' '}
              </Text>
              <Text style={{ fontSize: 25 }}>
                Score: {this.state.score} of {totalQuestions}{' '}
              </Text>
            </View>

            <View style={{ flex: 2, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.restart} style={stylesConstants.btnIOS}>
                <Text style={stylesConstants.submitBtnText}>Restart Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.goBack} style={stylesConstants.btnIOS}>
                <Text style={stylesConstants.submitBtnText}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  questionTitle: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  answerBtn: {
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  }
});
export default Quiz;
