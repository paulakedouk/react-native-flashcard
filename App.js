import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

// Components
import Home from './components/Home';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

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
      tabBarLabel: 'DECKS'
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

function AppStatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar barStyle="light-content" />
          <RootTabs />
        </View>
      </Provider>
    );
  }
}
