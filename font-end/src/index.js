import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//store
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
import watchSaga from "./sagas/saga"; 

const sagaMiddleware = createSagaMiddleware();
const store = createStore(myReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchSaga.watchRegister);
sagaMiddleware.run(watchSaga.watchLogin);
sagaMiddleware.run(watchSaga.watchLoginFB);

ReactDOM.render(
    <Provider store={store}> <App /> </Provider>,
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
