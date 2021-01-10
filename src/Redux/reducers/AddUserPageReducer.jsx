import * as TYPES from '../types/notes';

const AddUserPageReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_USER_PAGE:
      return (action.payload);

    default:
      return state;
  }
};

export default AddUserPageReducer;
