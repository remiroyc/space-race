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
    default:
      return state
  }
}

export default gameReducer
