import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, deleteDeck } from '../actions/index';
import { colors, stylesConstants } from '../utils/constants';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: {}
    };
  }

  componentWillMount() {
    this.setState({ deck: this.props.navigation.state.params.decks });
  }

  handleQuiz = deck => {
    this.props.navigation.navigate('Quiz', { deck });
  };

  showBtns = () => {
    // console.log(this.props.deck);
    const { deck } = this.props;
    const deckTitle = this.props.navigation.state.params.deck.title;

    return (
      <View style={stylesConstants.boxSubmitBtn}>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
          onPress={() => this.handleQuiz(deck)}
        >
          <Text style={stylesConstants.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? stylesConstants.btnIOS : stylesConstants.btnAndroid}
          onPress={() => this.props.navigation.navigate('AddCard', { deckTitle })}
        >
          <Text style={stylesConstants.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { title, questions } = this.props.navigation.state.params.deck;
    const { navigation } = this.props;

    // console.log(navigation.state.params.deck.title);

    // const deck = this.props.decks[title];

    // console.log('Title -------------- ', this.props.navigation.state.params.decks[title]);

    return (
      <View style={styles.container}>
        <View style={styles.viewInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.infoTxt}>
            {questions.length} {questions.length == 1 ? 'card' : 'cards'}
          </Text>
        </View>

        <View style={stylesConstants.boxSubmitBtn}>{this.showBtns()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 100,
    justifyContent: 'space-between'
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

function mapStateToProps(decks, ownProps) {
  // console.log('Deck mapStateToProps decks: ', decks);

  return {
    deck: Object.values(decks).find(item => item.title === ownProps.navigation.state.params.deck.title)
  };
}

export default connect(mapStateToProps)(Deck);
