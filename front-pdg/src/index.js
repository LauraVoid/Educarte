import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {store, persistor} from "./store/store"
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from "./App";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </PersistGate>
  </Provider>
  ,
  document.getElementById("root")
);
