import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

class Card extends Component {
  constructor(props) {
    super(props);
    // this.deck = this.props.navigation.state.params.deck;
    this.score = 0; //set the intial score
    // this.totalQuestions = this.deck.questions.length;
    this.isQuestion = true;
  }
  render() {
    console.log('Quiz render props: ', this.props);
    return (
      <View style={styles.input}>
        <Text style={styles.headerText}>Add a title to your deck</Text>
        <TextInput
          placeholder="Deck title"
          value={this.state.deckTitle}
          maxLength={30}
          onChangeText={this.handleTitleInput}
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        <View style={stylesConstants.boxSubmitBtn}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </View>
    );
  }
}

export default Card;
