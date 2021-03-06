import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducers from './reducer';
import { fetchGroup } from './action';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
store.dispatch(fetchGroup(store.dispatch));

store.subscribe(() => {
  console.log('getState >> ',store.getState())
})

render(
  <Provider store = {store}>
     <App />
  </Provider>, document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
