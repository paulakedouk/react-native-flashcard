import { LOADING_DECKS, ADD_DECK, ADD_CARD } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case LOADING_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.newDeck
      };
      case ADD_CARD:
      const {title, card} = action
      return {
        ...state,
        [title]: {
          title,
          'questions': [
            ...state[title].questions,
            card
          ]
        }
      }

    default:
      return state;
  }
};

export default decks;
