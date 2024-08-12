import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section
      className="footer w-full px-5 md:px-20 relative bg-[#EDF7DC]"
      id="support"
    >
      <div className="logo pt-16">
        <Link to={INDEX} className="flex" smooth={true}>
          <img src={images.logo_new} alt="logo" />
        </Link>
      </div>
      <div className="pt-[64px]  pb-[64px] relative z-30">
        <div className="md:flex flex-row flex-wrap justify-between pt-4">
          <div className="flex flex-col gap-5">
            <p className="link-head text-[#3D7100]">Company</p>
            <Link to="/" className="footer-link text-black">
              Home
            </Link>
            <Link to={"/pricing"} className="footer-link text-black">
              Pricing
            </Link>
            <Link to={"/support"} className="footer-link text-black">
              Support
            </Link>
            <Link to={"/#faq"} className="footer-link text-black">
              FAQ
            </Link>
            <Link to={"/"} className="footer-link text-black">
              Download Product Brochure
            </Link>

            <form className="flex gap-1">
              <input
                type="text"
                className="rounded"
                placeholder="Enter Your Email"
              />
              <button className="action-button rounded">Download</button>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <p className="link-head text-[#3D7100]">Legal</p>
            <Link to={""} className="footer-link text-black">
              Privacy Policy
            </Link>
            <Link to={""} className="footer-link text-black">
              Terms of service
            </Link>
            <Link to={""} className="footer-link text-black">
              License
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <p className="link-head text-[#3D7100]">Social</p>
            <Link
              to={"https://x.com/kommunita"}
              className="footer-link text-black"
            >
              X
            </Link>
            <Link
              to={"https://instagram.com/kommunitaHQ"}
              className="footer-link text-black"
            >
              Instagram
            </Link>
            {/* <Link to={""} className="footer-link text-black">
              Linkedin
            </Link> */}
            <Link
              to={
                "https://www.facebook.com/profile.php?id=61561857346731&mibextid=ZbWKwL"
              }
              className="footer-link text-black"
            >
              Facebook
            </Link>
            <Link
              to={"https://www.tiktok.com/@kommunita?_t=8oINGoOuikn&_r=1"}
              className="footer-link text-black"
            >
              Tiktok
            </Link>
          </div>

          <div className="flex flex-col gap-3 justify-between">
            <div className="font-[500]">
              <p>
                Download our mobile app{" "}
                <img src={images.arrowdown} alt="" className="inline" />
              </p>
            </div>
            <div className="flex gap-3 justify-between">
              <Link to={""} className="text-black">
                <img src={images.ios} alt="" />
              </Link>
              <Link to={""} className="footer-link text-black">
                <img src={images.google_play} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <hr className="mt-10" color="#838383" />
        <p className="copyright text-[#838383] pt-10">
          © {currentYear}. Oaks Intelligence
        </p>
      </div>
      <img
        src={images.footerimg}
        alt=""
        className="hidden md:block absolute z-10 left-0 bottom-0"
      />
    </section>
  );
}

export default Footer;
