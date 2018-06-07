import { all, takeEvery, put } from "redux-saga/effects"

import { INIT_GAME } from "../constants/actionTypes"
import { getGameInformations } from "../services/nebulas"

function* initializeGame(action) {
  debugger
  yield put({ type: "test" })
}

function* watchInitializeGame() {
  yield takeEvery("INIT_GAME", initializeGame)
}

function* rootSaga() {
  yield all([watchInitializeGame()])
}

export default rootSaga
