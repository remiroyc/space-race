import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers/index'
import rootSaga from './saga/index'
import registerServiceWorker from './registerServiceWorker'
import { INIT_GAME, SET_USER_ACCOUNT } from './constants/actionTypes'
import App from './App'

import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)

// create redux store
const store = createStore(reducers, composeEnhancers(middlewares))
window.store = store

sagaMiddleware.run(rootSaga)
store.dispatch({ type: INIT_GAME })

global.window.addEventListener("message", e => {
  if (e.data.data && e.data.data.account) {
    store.dispatch({ type: SET_USER_ACCOUNT, account: e.data.data.account })
  }
})

global.window.postMessage(
  {
    target: "contentscript",
    data: {},
    method: "getAccount"
  },
  "*"
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
)

registerServiceWorker()
