import { SET_GAME } from '../constants/actionTypes'

const initialState = {
  finished: false,
  price: 0,
  ships: {
    1: {
      country: 'US',
      players: 0,
      distance: 0
    },
    2: {
      country: 'CH',
      players: 0,
      distance: 0
    },
    3: {
      country: 'RU',
      players: 0,
      distance: 0
    },
    4: {
      country: 'EU',
      players: 0,
      distance: 0
    }
  }
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    
    case SET_GAME:
    return {
      ...state,
      ...action.game
    }

    default:
      return state
  }
}

export default gameReducer
