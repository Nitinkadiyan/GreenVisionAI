import Hero from "./Hero.jsx";
import CallToAction from "./CallToAction.jsx";
import Features from "./Features.jsx";
import Footer from "./Footer.jsx";
import Stats from "./Stats.jsx";
import Reveal from "./Reveal.jsx";
import Impact from "./Impact.jsx";
import HowItWorks from "./HowItWorks.jsx";
import community from "./community.jsx";
import Navbar from "../Navbar.jsx";
import Testimonials from "./Testimonials.jsx";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Impact />
      <Features />
      <HowItWorks />
      <CallToAction />
      <Reveal />
      <Testimonials />
      <community />
      <Footer />
    </>
  );
}
