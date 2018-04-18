import { RECEIVE_DECKS, UPDATE_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
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
