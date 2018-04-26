import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { loadingDecks } from '../actions';
import { getDecks, remo } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors, stylesConstants } from '../utils/constants';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

class Home extends Component {
  async componentDidMount() {
    try {
      const decks = await getDecks(); //fetch the decks
      this.props.dispatch(loadingDecks(decks)); //update the redux store, once the decks are fetched
    } catch (error) {
      console.log('error: ', error);
    }
  }

  _keyExtractor = (item, index) => index;

  render() {
    const { decks, deckList } = this.props;
    // console.log('Deck -------------- ', deckList);

    const hasCards = item => {
      // console.log('Item ======== ', item);

      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { deckTitle: item.title })}>
          <View style={stylesConstants.cardContainer}>
            <View style={styles.viewInfo}>
              <Text style={styles.titleCard}>{`${item.title}`.toUpperCase()}</Text>
              {Platform.OS === 'ios' ? (
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={colors.darkBlue}
                  style={{ marginLeft: 20 }}
                />
              ) : (
                <FontAwesome name="chevron-right" size={10} color={colors.darkBlue} style={{ marginLeft: 20 }} />
              )}
            </View>
            <Text>{item.questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView>
        <Text style={styles.headerText}>All Decks</Text>

        <FlatList data={deckList} renderItem={({ item }) => hasCards(item)} keyExtractor={this._keyExtractor} />

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
  deckList: typeof decks == 'object' ? Object.keys(decks).map(deckTitle => decks[deckTitle]) : []
});

export default connect(mapStateToProps)(Home);
