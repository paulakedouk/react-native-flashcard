import { LOADING_DECKS, UPDATED_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case LOADING_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case UPDATED_DECK:
      return {
        ...state,
        ...action.updatedDeck
      };

    default:
      return state;
  }
};

export default decks;
