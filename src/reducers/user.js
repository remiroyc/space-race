import { SET_USER_ACCOUNT, COMPLETE_USER_INFORMATIONS } from '../constants/actionTypes'

const initialState = {
  gas: 0,
  ship: 1
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ACCOUNT: 
      return {
        ...state,
        account: action.account
      }

    case COMPLETE_USER_INFORMATIONS:
      return {
        ...state,
        ...action.userInformations
      }

    default:
      return state
  }
}

export default userReducer
