import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas';



const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)
// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App store={store}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

