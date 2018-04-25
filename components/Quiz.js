import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Platform } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';
import Score from './Score';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.navigation.state.params.deck,
      questionNumber: 0,
      finished: false,
      answer: 'Show Answer',
      score: 0,
      isShowingAnswer: false
    };

    this.totalQuestions = this.props.navigation.state.params.deck.questions.length;
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params;
  }

  showAnswer = () => {
    this.setState({
      answer: this.state.deck.questions[this.state.questionNumber].answer,
      isShowingAnswer: true
    });
  };

  upScore = () => {
    const { score } = this.state;

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

  reset = () => {
    this.setState({
      questionNumber: 0,
      finished: false,
      score: 0
    });
  };

  render() {
    const { questionNumber, finished, score, deck, isShowingAnswer } = this.state;
    const { questions } = this.props.navigation.state.params.deck;
    const scorePercentage = Math.round((score * 100).toFixed());

    if (questionNumber === this.totalQuestions) {
      return (
        <Score
          score={score}
          totalQuestions={this.totalQuestions}
          navigation={this.props.navigation}
          scorePer={scorePercentage}
          reset={this.reset}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.firstRow}>
            <View style={styles.secondRow}>
              <Text style={styles.questionNum}>
                {questionNumber + 1} / {this.totalQuestions}
              </Text>
            </View>
            <View style={styles.thirdRow}>
              <Text style={styles.questionTitle}>{questions[questionNumber].question}</Text>
              {!isShowingAnswer && (
                <Text style={styles.showAnsBtn} onPress={this.showAnswer}>
                  See answer
                </Text>
              )}
              {isShowingAnswer && <Text style={styles.answer}>{this.state.answer}</Text>}
            </View>
            <View style={styles.fourthRow}>
              <TouchableOpacity onPress={this.upScore} style={[styles.answerBtn, { backgroundColor: 'green' }]}>
                <Text style={styles.answerText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.downScore} style={[styles.answerBtn, { backgroundColor: 'red' }]}>
                <Text style={styles.answerText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstRow: {
    flex: 1,
    alignItems: 'center'
  },
  secondRow: {
    flex: 2,
    alignItems: 'center'
  },
  thirdRow: {
    flex: 3,
    alignItems: 'center'
  },
  fourthRow: {
    flex: 4,
    alignItems: 'center'
  },
  questionNum: {
    fontSize: 22,
    marginTop: 100
  },
  questionTitle: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  showAnsBtn: {
    textAlign: 'center',
    color: colors.darkBlue
  },
  answerBtn: {
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  answerText: {
    color: colors.white,
    textAlign: 'center'
  }
});

export default Quiz;
