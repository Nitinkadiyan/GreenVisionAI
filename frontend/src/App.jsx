// import { createFileRoute } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/landing/Hero.jsx";
import Stats from "./components/landing/Stats.jsx";
import Features from "./components/landing/Features.jsx";
import HowItWorks from "./components/landing/HowItWorks.jsx";
import Community from "./components/landing/Community.jsx";
import Impact from "./components/landing/Impact.jsx";
import Testimonials from "./components/landing/Testimonials.jsx";
import CallToAction from "./components/landing/CallToAction.jsx";
import Footer from "./components/landing/Footer.jsx";

export default function App(){
  return(
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Community />
        <Impact />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}