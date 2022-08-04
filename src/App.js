import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
// import CreateProfile from "./components/CreateProfile";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CreateProfile from "./components/CreateProfile";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Header />} /> 
        <Route path="/create" element={<CreateProfile />} /> 
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
