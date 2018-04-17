import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'STORAGE_KEY';

export function addDeckAPI(id, deck) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [id]: deck
    })
  );
}
