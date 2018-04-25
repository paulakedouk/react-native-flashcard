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

export function saveDeckTitle(title) {
  // console.log('title is: ', title);
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

// export function addCardToDeck(title, card) {
//   return getDecks().then(results => {
//     const data = JSON.parse(results);
//     data[title].questions.push(card);
//     AsyncStorage.setItem(keys.STORAGE_KEY, JSON.stringify(data));
//   });
// }

export function addCardToDeck(title, card) {
  // console.log('addCardToDeck ', title, card);
  return AsyncStorage.getItem(keys.STORAGE_KEY).then(data => {
    const decks = JSON.parse(data);
    decks[title].questions.push(card);
    return AsyncStorage.setItem(keys.STORAGE_KEY, JSON.stringify(decks));
  });
}
