import * as TYPES from '../types/loader'

function loaderReducer (state = false, action) {
  switch (action.type) {
    case TYPES.SHOW:
      return true
  
    case TYPES.HIDE:
      return false

    default:
      return state
  }
}

export default loaderReducer
