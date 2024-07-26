import { useEffect } from "react";
import { Footer, Nav, ReadyToJourney } from "../../components"
import PricingCard from "./PricingCard"
import { useLocation } from 'react-router-dom'


const PricingPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Nav />
      <PricingCard />
      <ReadyToJourney />
      <Footer />
    </div>
  )
}

export default PricingPage
