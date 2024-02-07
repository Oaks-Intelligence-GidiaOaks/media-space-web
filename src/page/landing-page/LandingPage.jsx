import "./LandingPage.css";
import {
  Nav,
  Hero,
  Footer,
  Features,
  Faq,
  HowItWorks,
  Testimonial,
} from "../../components";

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Faq />
      <Footer />
    </>
  );
}

export default LandingPage;
