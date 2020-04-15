import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/reset.css'
import store from './store'
import {Provider} from 'react-redux'

let Apps = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render( Apps, document.getElementById('root'));
