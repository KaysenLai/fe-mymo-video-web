import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { watcherSaga } from './sagas/rootSaga';

let composeEnhancers = compose;
let reduxSagaMonitorOptions = {};
let initialState = {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

if (process.env.NODE_ENV === 'development' && typeof window === 'object') {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(reducers, initialState, composeEnhancers(...enhancers));

sagaMiddleware.run(watcherSaga);

export default store;
