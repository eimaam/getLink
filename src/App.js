import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
// import CreateProfile from "./components/CreateProfile";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CreateProfile from "./components/CreateProfile";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Header />} /> 
        <Route exact path="/create" element={<CreateProfile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
