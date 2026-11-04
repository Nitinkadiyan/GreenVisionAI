import { createFileRoute } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/landing/Landing.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import VerifyAccount from "./components/UserHomePage/verifyAccount.jsx";
import UserDashboard from "./components/UserHomePage/UserDashBoard/Dashboard.jsx";
import GovernmentDashboard from "./components/govtDashboard/governmentDashboard.jsx";
import ReportIssue from "./components/UserHomePage/ReportIssue.jsx";
import ReportSection from "./components/UserHomePage/MyReports.jsx";
import CreateReport from "./components/UserHomePage/MyReports.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyAccount />} />
      <Route path="/user-home-page" element={<UserDashboard />} />
      <Route path="/government-page" element={<GovernmentDashboard />} />
      <Route path="/report-issue" element={<ReportIssue />} />
      <Route path="/check-reports" element={<ReportSection />} />
      <Route path="/create-report" element={<CreateReport/>}/>
    </Routes>
    // <GovernmentDashboard/>
    
  );
}
