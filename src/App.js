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
import UserDetails from "./components/UserDetails";
import { DataProvider } from "./context/DataContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Header />} /> 
          <Route path="/register" element={<UserDetails />} /> 
          <Route path="/create" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/test" element={<ProfileDetails />} /> 
        <Route exact path="/reset" element={<ResetPass />} /> 
      </Routes>
        </DataProvider> 
    </AuthProvider>
    <ToastContainer 
    autoClose={3000}
    />
    </Router>
  );
}

export default App;
