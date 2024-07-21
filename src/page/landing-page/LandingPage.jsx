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
  KommunitaIntegration
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
      <Footer />
    </>
  );
}

export default LandingPage;
