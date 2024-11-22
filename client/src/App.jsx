import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// imported components
import Header from "./components/Header";


function App () {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" />
      </Routes>
    </Router>
  );
}

export default App;
