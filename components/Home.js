import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { loadingDecks } from '../actions';
import { getDecks, remo } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

function DeckTitle({ deck, onPress }) {
  const total_questions = 'questions' in deck && deck.questions !== undefined ? deck.questions.length : 0;

  return (
    <TouchableOpacity onPress={() => onPress(deck)}>
      <View style={stylesConstants.cardContainer}>
        <View style={styles.viewInfo}>
          <Text style={styles.titleCard}>{`${deck.title}`.toUpperCase()}</Text>
          {Platform.OS === 'ios' ? (
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.darkBlue} style={{ marginLeft: 20 }} />
          ) : (
            <FontAwesome name="chevron-right" size={10} color={colors.darkBlue} style={{ marginLeft: 20 }} />
          )}
        </View>
        <Text>
          {deck.questions.length} {deck.questions.length == 1 ? 'card' : 'cards'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

class Home extends Component {
  componentDidMount() {
    getDecks().then(decks => {
      this.props.dispatch(loadingDecks(decks));
    });
  }

  _keyExtractor = (deck, index) => index;

  render() {
    const { decks, deckList } = this.props;
    // console.log('Deck -------------- ', deckList);

    return (
      <ScrollView>
        <Text style={styles.headerText}>All Decks</Text>

        <ScrollView contentContainerStyle={styles.container}>
          {decks &&
            Object.keys(decks).map((title, i) => {
              const deck = decks[title];
              return (
                <DeckTitle
                  key={i}
                  deck={{ title, questions: decks[title].questions }}
                  onPress={() => this.props.navigation.navigate('Deck', { deck })}
                />
              );
            })}
        </ScrollView>

        {(decks === undefined || decks === null) && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add a deck to start a quiz</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30
  },
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleCard: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoCard: {
    color: colors.darkBlue,
    fontSize: 12,
    marginTop: 10
  }
});

const mapStateToProps = decks => ({
  decks,
  deckList: typeof decks == 'object' ? Object.keys(decks).map(title => decks[title]) : []
});

export default connect(mapStateToProps)(Home);
