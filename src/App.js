import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import CreateProfile from "./components/CreateProfile";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CreateProfile from "./components/CreateProfile";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { app } from './firebaseConfig'
import ProfileDetails from "./components/ProfileDetails";
import ResetPass from "./components/ResetPass";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <Router>
      <AuthProvider>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Header />} /> 
        <Route path="/create" element={<CreateProfile />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/test" element={<ProfileDetails />} /> 
        <Route exact path="/reset" element={<ResetPass />} /> 
      </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;
