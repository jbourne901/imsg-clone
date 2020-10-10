import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/app";
import {StateProvider} from "./components/state-provider";
import {initialState} from "./state/types";
import {reducer} from './state/reducer';

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
      <App />
  </StateProvider>,
  document.getElementById('root')
);

