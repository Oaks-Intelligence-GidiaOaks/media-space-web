import "./LandingPage.css";
import {
  Nav,
  Hero,
  Footer,
  Features,
  Faq,
  HowItWorks,
  Testimonial,
  FeatureCard,
} from "../../components";


function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <FeatureCard />
      <HowItWorks />
      <Testimonial />
      <Faq />
      <Footer />
    </>
  );
}

export default LandingPage;
