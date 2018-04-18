import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { loadingDecks } from '../actions';
import { getDecks } from '../utils/api';
import { colors } from '../utils/helpers';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

class Home extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    getDecks()
      .then(decks => {
        this.props.dispatch(loadingDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }
  render() {
    const { decks, deckList } = this.props;
    const { ready } = this.state;
    // console.log(this.props);

    return (
      <View>
        <Text style={styles.headerText}>All Decks</Text>
        {deckList.length ? (
          deckList.map(deck => console.log(deck))
        ) : (
          <View style={[styles.container, { margin: 20, alignSelf: 'center' }]}>
            <Text style={styles.titleCard}>No cards added yet.</Text>
          </View>
        )}
      </View>
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
  deckList: typeof decks == 'object' ? Object.keys(decks).map(title => decks[title]) : []
});

export default connect(mapStateToProps)(Home);
