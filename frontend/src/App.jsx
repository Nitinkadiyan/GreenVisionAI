// import { createFileRoute } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/landing/Landing.jsx";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import VerifyAccount from "./components/home/VerifyAccount.jsx";
import UserDashboard from "./components/home/Dashboard.jsx";

import GovernmentDashboard from "./components/govtDashboard/govtMainPage.jsx";
export default function App(){
  return(
    
    
    <Routes>
   
      <Route path = "/"element={<Home/>}/>
      <Route path = "/login"element ={<Login/>}/>
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/verify-email"element ={<VerifyAccount/>}/>
      <Route path="/user-home-page"element ={<UserDashboard/>}/>
      <Route path="/government-page"element={<GovernmentDashboard/>}/>
    </Routes>
    
  )
}