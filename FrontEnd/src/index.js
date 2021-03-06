//SJSU CMPE 138 Spring2020 TEAM7
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import {Provider} from 'react-redux';
import store from './reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
