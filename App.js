import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, setLocalNotification } from './utils/helpers';

// Components
import Home from './components/Home';
import AddDeck from './components/AddDeck';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

function AppStatusBar({ ...props }) {
  return (
    <View style={{ backgroundColor: colors.darkBlue, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={colors.darkBlue} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <FontAwesome name="home" size={30} color={colors.darkBlue} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: () => <FontAwesome name="plus" size={30} color={colors.darkBlue} />
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? colors.darkBlue : colors.white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? colors.white : colors.darkBlue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const Stack = StackNavigator({
  Decks: {
    screen: Home
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    );
  }
}
