export const LOADING_DECKS = 'LOADING_DECKS';
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

import * as API from '../utils/api';

export const loadingDecks = decks => {
  return {
    type: LOADING_DECKS,
    decks
  };
};

export const newDeck = title => {
  const deck = {
    [title]: {
      title: title,
      questions: []
    }
  };

  return {
    type: ADD_DECK,
    deck
  };
};

export const addCard = (title, card) => {
  return {
    type: ADD_CARD,
    title,
    card
  }
}
