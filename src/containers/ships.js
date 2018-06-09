import { connect } from 'react-redux'

import Ships from '../Ships'

const mapStateToProps = (state, props) => ({
    game: state.game
})

const mapDispatchToProps = (dispatch) => {
    return {
        buyGas: () => {
            dispatch({ type: "BUY_GAS" })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ships)
