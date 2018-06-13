import { all, takeEvery, put, call, select } from 'redux-saga/effects'

import {
  INIT_GAME,
  BUY_GAS,
  USE_GAS,
  SET_GAME,
  SET_USER_ACCOUNT,
  COMPLETE_USER_INFORMATIONS,
  FETCH_ALL
} from '../constants/actionTypes'
import * as contract from '../services/nebulas'

function* initializeGame() {
  const { result } = yield call(() => {
    return contract.getGameInformations()
  })
  const game = JSON.parse(result.result)
  yield put({ type: SET_GAME, game })
}

function* fetchAll() {
  const account = yield select(state => {
    return state.user.account
  })

  yield call(initializeGame)

  if (account) {
    yield call(initializeUserInformations, { account })
  }
}

function* buyGas(action) {
  yield call(() => {
    contract.buyGas(action.quantity)
  })
}

function* useGas(action) {
  yield call(() => {
    contract.useGas(action.gas, action.ship)
  })
}

function* initializeUserInformations(action) {
  const { result } = yield call(() => {
    return contract.getUserInformations(action.account)
  })
  const userInformations = JSON.parse(result.result)
  yield put({ type: COMPLETE_USER_INFORMATIONS, userInformations })
}

function* watchInitializeGame() {
  yield takeEvery(INIT_GAME, initializeGame)
}

function* rootSaga() {
  yield all([
    watchInitializeGame(),
    takeEvery(BUY_GAS, buyGas),
    takeEvery(SET_USER_ACCOUNT, initializeUserInformations),
    takeEvery(USE_GAS, useGas),
    takeEvery(FETCH_ALL, fetchAll)
  ])
}

export default rootSaga
