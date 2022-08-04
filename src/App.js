import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
// import CreateProfile from "./components/CreateProfile";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CreateProfile from "./components/CreateProfile";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Header />} /> 
        <Route path="/create" element={<CreateProfile />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
