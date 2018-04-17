import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { guid } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { colors } from '../utils/helpers';

// Redux
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { addDeckAPI } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  headerText: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    textAlign: 'center',
    borderRadius: 3,
    fontSize: 22,
    height: 60,
    margin: 50
  },
  boxSubmitBtn: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  submitBtn: {
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    paddingTop: 10,
    paddingBottom: 10,
    width: 200,
    borderRadius: 3
  }
});

class AddDeck extends Component {
  state = {
    title: ''
  };

  newDeck = () => {
    const { title } = this.state;
    const id = 'id' + guid();
    let deck = {
      cards: []
    };

    addDeckAPI(id, deck);
    this.props.dispatch(addDeck(id, deck));

    const reset = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Deck',
          params: { id, deck }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.headerText}>Add a Deck</Text>
          <TextInput
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Insert the deck title"
            maxLength={30}
            style={styles.textInput}
          />
        </View>
        <View style={styles.boxSubmitBtn}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.createDeck}>
            <Text style={{ color: colors.white }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(AddDeck);
