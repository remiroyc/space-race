import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import rootSaga from './saga'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)
const store = createStore(reducers, composeEnhancers(middlewares))
window.store = store

sagaMiddleware.run(rootSaga)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
