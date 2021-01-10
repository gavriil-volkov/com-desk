import * as TYPES from '../types/notes';

const InforForAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ADD_INFO_FOR_ADMIN:
      return (action.payload);
    case TYPES.DELETE_USER:
      return ({ ...state, users: state.users.filter((element) => element._id !== action.payload) }
      );
    case TYPES.DELETE_GROUP:
      return ({ ...state, groups: state.groups.filter((element) => element._id !== action.payload) }
      );
    default:
      return state;
  }
};

export default InforForAdminReducer;

