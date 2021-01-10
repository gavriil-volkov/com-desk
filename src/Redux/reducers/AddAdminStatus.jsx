import * as TYPES from '../types/notes';

const AddAdminStatus = (state = "", action) => {
  switch (action.type) {
    case TYPES.ADD_STATUS_ADMIN:
      return action.payload;
    default:
      return state;
  }
};

export default AddAdminStatus;
