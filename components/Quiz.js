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
    const deck = this.props.navigation.state.params.deck;

    if (this.state.questionNumber >= this.totalQuestions) {
      this.setState({
        finished: true
      });
      clearLocalNotification();
      setLocalNotification();
      // Show the results
    } else {
      this.setState((prevState, props) => ({
        questionNumber: prevState.questionNumber + 1,
        score: correct ? prevState.score + 1 : prevState.score
      }));
    }
  };

  results = deck => {
    console.log('finished!');
    const scorePercentage = Math.round(this.state.score / deck.questions.length * 100);
    <View style={{ flex: 1 }}>
      <View>
        <Text>{scorePercentage > 50 ? 'Congratulations! 😺' : 'Practice makes perfect 😾'}</Text>
        <Text>
          {this.state.score}/{deck.questions.length} points earned
        </Text>
        <Text>{scorePercentage}%</Text>
        <TouchableOpacity
          style={stylesConstants.btnIOS}
          onPress={() => this.restart()}
          underlayColor="#336677"
          activeOpacity={0.9}
        >
          <Text>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>;
  };
  restart = () => {
    this.setState({
      questionNumber: 1,
      score: 0
    });
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    // console.log('Quiz render props: ', this.state);
    const { questionNumber, finished } = this.state;
    const { deck, totalQuestions, score } = this;
    return (
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.questionNum}>
            {questionNumber} / {totalQuestions}
          </Text>
        </View>

        <View style={styles.secondRow}>
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

        {finished ? (
          <View style={styles.thirdRow}>
            <Text>{scorePercentage > 50 ? 'Congratulations! 😺' : 'Practice makes perfect 😾'}</Text>
            <Text>
              {this.state.score}/{deck.questions.length} points earned
            </Text>
            <Text>{scorePercentage}%</Text>

            <TouchableOpacity onPress={this.restart} style={stylesConstants.btnIOS}>
              <Text style={stylesConstants.submitBtnText}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.goBack} style={stylesConstants.btnIOS}>
              <Text style={stylesConstants.submitBtnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.thirdRow}>
            <TouchableOpacity onPress={() => this.next(true)} style={[styles.answerBtn, { backgroundColor: 'green' }]}>
              <Text style={styles.answerText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.next(false)} style={[styles.answerBtn, { backgroundColor: 'red' }]}>
              <Text style={styles.answerText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
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
