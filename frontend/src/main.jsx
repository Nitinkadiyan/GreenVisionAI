import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import Landing from './components/landing/Landing';
import App from "../src/App.jsx";
import UserDashboard from "./components/home/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import VerifyAccount from "./components/home/VerifyAccount.jsx";
import Dashboard from "./components/home/Dashboard.jsx";
import CreateReport from "./components/home/MyReports.jsx";
import GovernmentDashboard from "./components/govtDashboard/govtDashBoard.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
