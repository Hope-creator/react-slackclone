import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'


import ReactDOM from "react-dom";

import "./index.css";
import { theme } from "./theme";

import App from "./App";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
