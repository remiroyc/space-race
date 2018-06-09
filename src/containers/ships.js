import { connect } from 'react-redux'
import { USE_GAS, BUY_GAS } from '../constants/actionTypes'

import Ships from '../Ships'

const mapStateToProps = (state, props) => ({
    game: state.game,
    gas: state.user.gas || 0,
    ships: state.game.ships
})

const mapDispatchToProps = (dispatch) => {
    return {
        useGas: (quantity, ship) => {
            dispatch({ type: USE_GAS, gas: quantity, ship })
        },
        buyGas: () => {
            dispatch({ type: BUY_GAS })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ships)
