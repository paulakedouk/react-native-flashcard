import { RECEIVE_DECKS, ADD_DECK } from '../actions';

const decks = (state = {}, action) => {
  const { id, deck, type, decks } = action;
  switch (type) {
    case RECEIVE_DECKS:
      return {
        decks
      };
    case ADD_DECK:
      return {
        ...state,
        [id]: deck
      };
    default:
      return state;
  }
};

export default decks;
