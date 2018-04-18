import { AsyncStorage } from 'react-native';
import { keys } from './helpers';

export function getDecks() {
  return AsyncStorage.getItem(keys.STORAGE_KEY).then(db => {
    if (!db) {
      return {};
    }
    return JSON.parse(db);
  });
}

export function getDeck(id) {
  return getDecks().then(decks => decks[id]);
}

export function deckTitle(title) {
  return AsyncStorage.mergeItem(
    keys.STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, question) {
  return getDecks().then(decks => {
    decks[title].questions.push(question);
    return AsyncStorage.setItem(keys.STORAGE_KEY, JSON.stringify(decks));
  });
}
