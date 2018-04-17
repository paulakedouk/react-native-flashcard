import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

class Home extends Component {
  render() {
    // console.log('PROPS: ', this.props);
    const { decks } = this.props;
    return (
      <View>
        <TouchableOpacity>
          <FlatList data={decks} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckCard: {
    paddingTop: 10,
    paddingBottom: 10
  },
  deckHeader: {
    textAlign: 'center',
    fontSize: 35
  },
  deckSubHeader: {
    textAlign: 'center',
    fontSize: 20
  }
});

function mapStateToProps(decks) {
  //   console.log('mapStateToProps: ', decks);

  if (!decks) return { decks: [] }; //if no decks, set this.props.decks as an empty array.
  return { decks: Object.values(decks) };
}

export default connect(mapStateToProps)(Home);
