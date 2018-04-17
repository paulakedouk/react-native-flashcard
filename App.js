import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

// Components
import Home from './components/Home';

// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const Tabs = TabNavigator({
  Decks: {
    screen: Home
  }
  // AddDeck: {
  //   screen: AddDeck
  // }
});

const RootTabs = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  }
  // ,
  // AddDeck: {
  //   screen: AddDeck,
  //   navigationOptions: {
  //     headerTitle: null
  //   }
  // },
  // Deck: {
  //   screen: Deck
  // },
  // AddCard: {
  //   screen: AddCard,
  //   navigationOptions: {
  //     headerTitle: 'Add Card'
  //   }
  // },
  // Question: {
  //   screen: Question,
  //   navigationOptions: {
  //     headerTitle: 'Quiz'
  //   }
  // }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootTabs />
        </View>
      </Provider>
    );
  }
}
