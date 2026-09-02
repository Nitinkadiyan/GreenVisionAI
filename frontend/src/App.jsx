// import { createFileRoute } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";

import { BrowserRouter,Routes,Route } from "react-router-dom";

export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path = "/"element={<Home/>}/>
      <Route path = "/login"element ={<Login/>}/>
      <Route path="/signup"element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}