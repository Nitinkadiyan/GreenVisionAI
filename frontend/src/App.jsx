import { createFileRoute } from "@tanstack/react-router";
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
  );
}
// import Hero from "./components/landing/Hero.jsx";
// import Stats from "./components/landing/Stats.jsx";
// import Features from "./components/landing/Features.jsx";
// import HowItWorks from "./components/landing/HowItWorks.jsx";
// import Community from "./components/landing/Community.jsx";
// import Impact from "./components/landing/Impact.jsx";
// import Testimonials from "./components/landing/Testimonials.jsx";
// import CallToAction from "./components/landing/CallToAction.jsx";
// import Footer from "./components/landing/Footer.jsx";
// import Login from "./components/Login.jsx";
// import GovernmentDashboard from "./components/govtDashboard/govtDashBoard.jsx";
// import GovernmentMainPage from "./components/govtDashboard/govtMainPage.jsx"
// import UserDashboard from "./components/home/Dashboard.jsx";
import CreateReport from "./components/home/MyReports.jsx"
// import ReportIssue from "./components/home/ReportIssue.jsx"
// export default function App(){
//   return(
    <>
    {/* // <div className="min-h-screen bg-background">
    //   <Navbar />
    //   <main>
    //     <Hero />
    //     <Stats />
    //     <Features />
    //     <HowItWorks />
    //     <Community />
    //     <Impact />
    //     <Testimonials />
    //     <CallToAction />
    //   </main>
    //   <Footer />
    // </div>
    // <Login/> */}
 {/* <GovernmentDashboard/> */}
{/* <GovernmentDashboard/> */}
{/* <CreateReport/> */}
{/* <ReportIssue/> */}
{/* <GovernmentMainPage/> */}
</>

    
//   )
// }