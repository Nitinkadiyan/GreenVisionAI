import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Landing from './components/landing/Landing';
import UserDashboard from "./components/home/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/home/Dashboard.jsx";
import CreateReport from "./components/home/MyReports.jsx";
import GovernmentDashboard from "./components/govtDashboard/govtDashBoard.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar/>
    {/* <Landing/> */}
    {/* <Signup /> */}
    <Login/>
    {/* <UserDashboard/> */}
    {/* <GovernmentDashboard/> */}
    {/* <Dashboard/> */}
    {/* <CreateReport/> */}
  </StrictMode>,
);
