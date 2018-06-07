import { fork, takeEvery, takeLatest, take } from "redux-saga/effects"

import { INIT_GAME } from "../constants/actionTypes"
import { getGameInformations } from "../services/nebulas"

function* initializeGame(action) {
  debugger
  const result = yield* getGameInformations()
}

export default function* rootSaga() {
  yield [takeEvery(INIT_GAME, initializeGame)]
}
