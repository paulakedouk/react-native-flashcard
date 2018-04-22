import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Platform } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 1,
      finished: false,
      answer: 'Show Answer',
      score: 0
    };

    // console.log(this.props.navigation.state.params.deck);
    this.deck = this.props.navigation.state.params.deck;
    this.totalQuestions = this.deck.questions.length;
    // console.log(this.totalQuestions);
    this.isQuestion = true;
    this.showAnswer = this.showAnswer.bind(this);
  }

  showAnswer = () => {
    this.setState({ answer: this.deck.questions[this.state.questionNumber - 1].answer });
  };

  next = correct => {
    if (correct === true) {
      this.setState({
        score: this.state.score + 1
      });
    }

    if (this.state.questionNumber >= this.totalQuestions) {
      this.setState({
        finished: true
      });
      // return this.results(deck);
      clearLocalNotification();
      setLocalNotification();
    } else {
      this.setState((prevState, props) => ({
        questionNumber: prevState.questionNumber + 1,
        score: correct ? prevState.score + 1 : prevState.score
      }));
    }
  };

  restart = deck => {
    if (this.finished) {
      this.setState({ questionNumber: 1, finished: false, score: 0 });
    }

    this.props.navigation.navigate('Quiz', { deck });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    // console.log('Quiz render props: ', this.state);
    const { questionNumber, finished, score } = this.state;
    const { deck, totalQuestions } = this;
    const scorePercentage = Math.round(this.state.score / totalQuestions * 100);

    return (
      <View style={styles.container}>
        {finished ? (
          <View style={styles.results}>
            <Text>{scorePercentage > 50 ? 'You rock! 👏🏻' : 'Keep practicing 🤞🏻'}</Text>
            <Text>
              {this.state.score}/{deck.questions.length} points earned
            </Text>
            <Text>{scorePercentage}%</Text>

            <TouchableOpacity onPress={() => this.restart(deck)} style={stylesConstants.btnIOS}>
              <Text style={stylesConstants.submitBtnText}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.goBack} style={stylesConstants.btnIOS}>
              <Text style={stylesConstants.submitBtnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.firstRow}>
            <View style={styles.secondRow}>
              <Text style={styles.questionNum}>
                {questionNumber} / {totalQuestions}
              </Text>
            </View>
            <View style={styles.thirdRow}>
              <Text style={styles.questionTitle}>{deck.questions[questionNumber - 1].question}</Text>
              <Text
                style={styles.showAnsBtn}
                onPress={() => {
                  this.showAnswer();
                }}
              >
                {this.state.answer}
              </Text>
            </View>
            <View style={styles.fourthRow}>
              <TouchableOpacity
                onPress={() => this.next(true)}
                style={[styles.answerBtn, { backgroundColor: 'green' }]}
              >
                <Text style={styles.answerText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.next(false)} style={[styles.answerBtn, { backgroundColor: 'red' }]}>
                <Text style={styles.answerText}>Incorrect</Text>
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
  },
  results: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  }
});
export default Quiz;
