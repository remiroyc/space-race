import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers/index'
import rootSaga from './saga/index'
import registerServiceWorker from './registerServiceWorker'
import { INIT_GAME } from './constants/actionTypes'
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

ReactDOM.render(<App store={store} />, document.getElementById('root'))
registerServiceWorker()
