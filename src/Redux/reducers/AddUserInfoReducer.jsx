import * as TYPES from '../types/notes';

const AddUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ADD_USER_INFO:
      return (action.payload);

    default:
      return state;
  }
};

export default AddUserInfoReducer;
