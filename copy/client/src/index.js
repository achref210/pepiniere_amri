import React from "react";
import ReactDOM from "react-dom";
//initialate redux
import { Provider } from "react-redux";
import { createStore, appliMiddleware, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

import { ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./index.css";
import { green, yellow } from "@mui/material/colors";
import { orange } from "@material-ui/core/colors";
import { Checkbox } from "@mui/material";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const outertheme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: yellow[100],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={outertheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
