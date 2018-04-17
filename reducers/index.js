import { GET_DECKS } from './actions';

const decks = (state = {}, action) => {
  const { decks } = action;
  switch (type) {
    case GET_DECKS:
      return {
        decks
      };
    default:
      return state;
  }
};

export default decks;
