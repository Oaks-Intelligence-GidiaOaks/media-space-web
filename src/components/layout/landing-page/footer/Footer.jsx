import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import * as images from "../../../../assets";
import { INDEX } from "../../../../routes/CONSTANT";


function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <section className="footer w-full relative" id="support">
         <div className="logo mx-20 pt-16">
          <Link to={INDEX} className="flex" smooth={true}>
            <img src={images.logo_new2} alt="logo" />
          </Link>
        </div>
      <div className="pt-[64px] pb-[64px]">
        <h1 className="footer-head text-center">
          Get started for free, <br /> and create a new account
        </h1>
        <p className="footer-trial mt-5">
          Start your 7-day free trial. Cancel anytime.
        </p>
        <div className="flex justify-center gap-4 mt-10 mb-12">
          <Link to={""} className="footer-signin">
            Sign In
          </Link>
          <Link to={""} className="footer-signup">
            Create Account
          </Link>
        </div>

        <div className="flex text-center">
          <div className="footer-divider w-full"></div>
        </div>

        <div className="flex flex-row justify-evenly gap-10 pt-10">
          <div className="flex flex-col gap-5">
            <p className="link-head">Actions</p>
            <Link to={""} className="footer-link">
              Home
            </Link>
            <Link to={""} className="footer-link">
              About
            </Link>
            <Link to={""} className="footer-link">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <p className="link-head">About</p>
            <Link to={""} className="footer-link">
              Privacy
            </Link>
            <Link to={""} className="footer-link">
              License
            </Link>
            <Link to={""} className="footer-link">
              Contacts
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <p className="link-head">Social</p>
            <Link to={""} className="footer-link">
              X
            </Link>
            <Link to={""} className="footer-link">
              Instagram
            </Link>
            <Link to={""} className="footer-link">
              Linkedin
            </Link>
          </div>
        </div>
        <p className="copyright pt-10">© {currentYear}. Oaks Intelligence</p>
      </div>
      <img src={images.footerimg} alt="" className="hidden md:block absolute left-0 bottom-0"/>
    </section>
  );
}

export default Footer;
