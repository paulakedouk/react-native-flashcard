export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';

export const loadingDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  };
};

export const updateDeck = deck => ({ type: UPDATE_DECK, updatedDeck: { [deck.title]: deck } });

export const addDeck = title => {
  const deck = {
    title,
    questions: []
  };

  return updateDeck(deck);
};
