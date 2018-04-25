import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, stylesConstants } from '../utils/constants';
import { NavigationActions } from 'react-navigation';

const Score = props => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.results}>
          <Text style={styles.resultsText}>{props.scorePer > 50 ? 'You rock! 👏🏻' : 'Keep practicing 🤞🏻'} </Text>
          <Text style={styles.resultsPercentage}>
            Score: {props.score} of {props.totalQuestions}{' '}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => props.reset()} style={stylesConstants.btnIOS}>
            <Text style={stylesConstants.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={stylesConstants.btnIOS}>
            <Text style={stylesConstants.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
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
