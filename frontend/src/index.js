import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.slim.min.js'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import * as serviceWorker from './serviceWorker';
import App from './App'
import {Provider} from 'react-redux';
import {store} from './redux/store';

ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
        <App />
    </React.StrictMode>,
  </Provider>
 ,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
