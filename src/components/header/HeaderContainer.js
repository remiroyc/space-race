import { connect } from 'react-redux'
import { BUY_GAS } from '../../constants/actionTypes'

import Header from './Header'

const mapStateToProps = (state, props) => ({
  game: state.game,
  gas: state.user.gas || 0,
  ships: state.game.ships,
  selectedShip: state.user.ship
})

const mapDispatchToProps = dispatch => {
  return {
    buyGas: quantity => {
      dispatch({ type: BUY_GAS, quantity: quantity })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
