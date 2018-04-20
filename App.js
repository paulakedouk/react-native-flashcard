import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';
import { colors } from './utils/constants';

// Components
import Home from './components/Home';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';

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
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Decks',
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

const RootTabs = StackNavigator({
  Home: {
    screen: Tabs
  },
  AddDeck: {
    screen: AddDeck
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckTitle}`.toUpperCase() + ' DECK',
      headerTintColor: colors.white,
      headerStyle:
        Platform.OS === 'ios'
          ? {
              maxHeight: 40,
              paddingBottom: 20,
              backgroundColor: colors.darkBlue
            }
          : {
              backgroundColor: colors.darkBlue
            },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: colors.white,
      title: 'Add a Card',
      headerStyle: {
        backgroundColor: colors.darkBlue
      }
    }
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
          <RootTabs />
        </View>
      </Provider>
    );
  }
}
