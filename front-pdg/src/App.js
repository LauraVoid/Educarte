import React from "react";
import "./App.css";
import routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>{routes}</Router>
    </ThemeProvider>
  );
}

export default App;
