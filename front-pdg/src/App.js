import React from "react";
import './App.css';

import routes from "./routes";
import {BrowserRouter as Router } from 'react-router-dom'
function App() {

  
  return (
    <Router>
    {routes}
  </Router>
    
  );
}

export default App;
