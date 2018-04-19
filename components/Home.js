import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { loadingDecks } from '../actions';
import { getDecks, remo } from '../utils/api';
import { colors, clearLocalNotification, setLocalNotification } from '../utils/helpers';
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

  render() {
    const { decks, deckList } = this.props;
    // console.log(this.props.deckList);

    return (
      <ScrollView>
        {deckList.length ? (
          deckList.map((deck, key) => (
            <View key={key} style={styles.container}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', { deckTitle: deck.title })}>
                <View style={styles.viewInfo}>
                  <View>
                    <Text style={styles.titleCard}>{`${deck.title}`.toUpperCase()}</Text>
                    {/* <Text style={styles.infoCard}>{decks.questions.length} cards</Text> */}
                  </View>
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
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={[styles.container, { margin: 20, alignSelf: 'center' }]}>
            <Text style={styles.titleCard}>None!</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: 100,
    padding: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    color: colors.white,
    fontSize: 10
  }
});

const mapStateToProps = decks => ({
  decks,
  deckList: typeof decks == 'object' ? Object.keys(decks).map(deckTitle => decks[deckTitle]) : []
});

export default connect(mapStateToProps)(Home);
