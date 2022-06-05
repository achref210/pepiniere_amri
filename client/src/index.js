import React from "react";
import ReactDOM from "react-dom";
//initialate redux
import { Provider } from "react-redux";
import { createStore, appliMiddleware, compose, applyMiddleware } from "redux";
import { createMigrate, persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import "./index.css";

import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'

import reducers from "./reducers/index.js";
import App from "./App";

const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
      products: undefined   
    }
  },
  1: (state) => {
    // migration to keep only device state
    return {
      products: state.products
    }
  }
}

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  whitelist: ['cart'],
  migrate: createMigrate(migrations, { debug: true }),
}


const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store)
ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>,
  document.getElementById("root")
);
