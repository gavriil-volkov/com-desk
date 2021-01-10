import * as TYPES from '../types/notes';

const TechNewsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_NEWS:
      return (action.payload);

    default:
      return state;
  }
};

export default TechNewsReducer;
