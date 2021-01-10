import * as TYPES from '../types/notes';

const UsersListReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_USERS_LIST:
      return action.payload;

    default:
      return state;
  }
};

export default UsersListReducer;
