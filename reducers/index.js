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
    case EMPTY_DECK:
      return {};

    case DELETE_DECK:
      let newstate = state;
      delete newstate[action.title];
      return newstate;

    default:
      return state;
  }
};

export default decks;
