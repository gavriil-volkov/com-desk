import * as TYPES from '../types/notes';

const GroupsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_GROUPS:
      return (action.payload);

    default:
      return state;
  }
};

export default GroupsReducer;
