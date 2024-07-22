import "./LandingPage.css";
import {
  Nav,
  Hero,
  Footer,
  Features,
  Faq,
  // HowItWorks,
  HowItWorks2,
  // Testimonial,
  FeatureCard,
  WhoisKommunitaFor,
  KommunitaIntegration,
  ReadyToJourney
} from "../../components";


function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <FeatureCard />
      {/* <HowItWorks /> */}
      <HowItWorks2 />
      <WhoisKommunitaFor />
      {/* <Testimonial /> */}
      <KommunitaIntegration />
      <Faq />
      <ReadyToJourney />
      <Footer />
    </>
  );
}

export default LandingPage;
