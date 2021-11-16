import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./containers/App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./state/Store";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <App store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
