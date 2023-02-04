import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthContextProvider } from "./context/auth/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
