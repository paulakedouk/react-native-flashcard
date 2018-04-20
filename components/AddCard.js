import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';

// Redux
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { createDeck } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
      onPress={onPress}
    >
      <Text style={stylesConstants.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  handleTitleInput = deckTitle => {
    this.setState({ deckTitle });
  };

  submit = () => {
    const { deck } = this.props.navigation.state.params;
    const { decks, navigation } = this.props;
    const { question, answer } = this.state;
    const card = {
      question,
      answer
    };

    if (question === '' || answer === '') {
      alert('Fill all the fields');
    } else {
      console.log('DECK ________', deck);
      deck.questions = deck.questions.concat(card);

      this.props.newDeck(deck);

      createDeck(deck).then(() => {
        navigation.navigate('Deck', { deck });
      });
    }
  };

  render() {
    console.log('Quiz render props: ', this.props.navigation);
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            placeholder="Insert a question"
            value={this.state.question}
            maxLength={30}
            onChangeText={question => this.setState({ question })}
            placeholderTextColor={colors.darkBlue}
            style={styles.textInput}
            autoCapitalize="sentences"
            underlineColorAndroid="transparent"
          />

          <TextInput
            placeholder="Inser a answer"
            value={this.state.answer}
            maxLength={30}
            onChangeText={answer => this.setState({ answer })}
            placeholderTextColor={colors.darkBlue}
            style={styles.textInput}
            autoCapitalize="sentences"
            underlineColorAndroid="transparent"
          />
          <View style={stylesConstants.boxSubmitBtn}>
            <SubmitBtn onPress={this.submit} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    marginTop: 100
  },
  headerText: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    textAlign: 'center',
    borderRadius: 2,
    fontSize: 22,
    width: 300,
    height: 60,
    marginTop: 10,
    marginBottom: 10
  }
});

const mapStateToProps = decks => {
  return {
    decks
  };
};

export default connect(mapStateToProps, { newDeck })(AddCard);
