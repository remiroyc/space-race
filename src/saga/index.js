import { all, takeEvery, put, call } from 'redux-saga/effects'

import { INIT_GAME, BUY_GAS, USE_GAS, SET_GAME, SET_USER_ACCOUNT, COMPLETE_USER_INFORMATIONS } from '../constants/actionTypes'
import * as contract from '../services/nebulas'

function* initializeGame(action) {
  const { result } = yield call(() => {
    return contract.getGameInformations()
  })
  
  const game = JSON.parse(result.result)
  yield put({ type: SET_GAME, game })
}

function* buyGas(action) {
  yield call(() => { contract.buyGas(10) })
}

function* useGas(action) {
  yield call(() => { contract.useGas(action.gas, action.ship) })
}

function* initializeUserInformations(action) {
  const { result } = yield call(() => { return contract.getUserInformations(action.account) })
  const userInformations = JSON.parse(result.result)
  yield put({ type: COMPLETE_USER_INFORMATIONS, userInformations })
}

function* watchInitializeGame() {
  yield takeEvery(INIT_GAME, initializeGame)
}

function* rootSaga() {
  yield all(
    [
      watchInitializeGame(),
      takeEvery(BUY_GAS, buyGas),
      takeEvery(SET_USER_ACCOUNT, initializeUserInformations),
      takeEvery(USE_GAS, useGas)
    ]
  )
}

export default rootSaga
