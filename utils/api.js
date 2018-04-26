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

export function createDeck(title) {
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

export function addCardToDeck(title, card, answer) {
  return getDeck(title).then(deck => {
    let questions = deck.questions;
    questions.push({ card, answer });
    let values = { [title]: { title: [title], questions } };
    return AsyncStorage.mergeItem(keys.STORAGE_KEY, JSON.stringify(values));
  });
}
