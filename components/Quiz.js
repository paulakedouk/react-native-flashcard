import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 1,
      finished: false
    };

    // console.log(this.props.navigation.state.params.deck);
    this.deck = this.props.navigation.state.params.deck;
    this.score = 0;
    this.totalQuestions = this.deck.questions.length;
    console.log(this.totalQuestions);
    this.isQuestion = true;
  }

  render() {
    console.log('Quiz render props: ', this.props);

    const { questionNumber, finished } = this.state;
    const { deck, totalQuestions, score } = this;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.questionNum}>
            {questionNumber} / {totalQuestions}
          </Text>
        </View>

        <View style={styles.secondRow}>
          <Text style={styles.questionTitle}>{deck.questions[questionNumber - 1].question}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  row: {
    flex: 1,
    alignItems: 'center'
  },
  secondRow: {
    flex: 2,
    alignItems: 'center'
  },
  questionNum: {
    fontSize: 22,
    marginTop: 100
  },
  questionTitle: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default Quiz;
