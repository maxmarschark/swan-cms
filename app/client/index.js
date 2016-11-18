import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import rootReducer from './reducers'

let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
if (__DEV__) middleware = compose(middleware, window.devToolsExtension())

const initialState = window.__INITIAL_STATE__ || {}
const store = createStore(rootReducer, initialState, middleware)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
