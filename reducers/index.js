import { LOADING_DECKS, UPDATE_DECK, EMPTY_DECK, DELETE_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case LOADING_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case UPDATE_DECK:
      return {
        ...state,
        ...action.updateDeck
      };

    default:
      return state;
  }
};

export default decks;
