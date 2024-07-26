import * as images from "../../../../assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  INDEX,
  CONTACT_US,
  FAQ,
  ABOUT,
  REGISTER,
  LOGIN,
  FEATURES,
  SUPPORT,
  PRICING,
  SIGN_UP_AS,
  LOGIN_AS,
} from "../../../../routes/CONSTANT";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "react-use";
import { Squash as Hamburger } from "hamburger-react";

function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();


  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: "Features", path: location.pathname === '/' ? FEATURES : '/#features' },
    { name: "Pricing", path: PRICING },
    { name: "Support", path: SUPPORT },
    { name: "FAQ", path: location.pathname === '/' ?  FAQ : '/#faq' },
  ];
  const pricing = location.pathname === '/pricing'
  const support = location.pathname === '/support/get-started'
  const ref = useRef(null);

  useClickAway(ref, () => setMenuOpen(false));

  return (
    <section className={`sticky top-0 w-full ${pricing || support ? "bg-white" : "bg-[#112420]"}   z-50`}>
      <div className="w-full mx-auto px-5 md:px-20 lg:px-10 xl:px-20 py-4 flex justify-between items-center gap-5">
        <div className="logo">
          <Link to={INDEX} className="flex" smooth={true}>
            <img src={pricing || support ? images.logo_new : images.logo} alt="logo" />
          </Link>
        </div>

        <div className="flex gap-x-10">
          <div className="nav-links hidden md:flex lg:flex">
            <ul className="flex justify-end gap-x-12 active-ul">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    exact="true"
                    activeclassname="active"
                    className={`block py-2 hover:text-neutral-400 text-[1rem] ${pricing || support ? "text-black" : "text-white"}   transition-all menu-links`}
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-auto hidden lg:flex  sm:mr-1 gap-2">
            <Link to={SIGN_UP_AS} className="action-button sm:mr-1 ">
              Sign up for free
            </Link>
            <Link
              to={LOGIN_AS}
              className="flex action-button bg-[#FFFFFF] text-[#3D7100] sm:mr-1 w-auto text-base"
            >
              Log in
            </Link>
          </div>
        </div>

        <div ref={ref} className="block md:hidden lg:hidden">
          <Hamburger toggled={isMenuOpen} size={22} toggle={setMenuOpen} color={pricing || support ? "#000" : "#FFFFFF"} />
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20 mt-4"
              >
                <ul className="grid gap-2">
                  {links.map((link, idx) => {
                    return (
                      <motion.li
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1 + idx / 10,
                        }}
                        key={link.name}
                        className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 mt-5"
                      >
                        <NavLink
                          onClick={() => setMenuOpen((prev) => !prev)}
                          to={link.path}
                          exact="true"
                          activeClassName="active"
                          className="flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                        >
                          <span className="flex gap-1 text-lg text-white">
                            {link.name}
                          </span>
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </ul>
                <motion.li
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + 6 / 10,
                  }}
                  className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 mt-5"
                >
                  <Link
                    to={LOGIN_AS}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    exact="true"
                    activeClassName="active"
                    className="flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                  >
                    <span className="flex gap-1 text-lg text-white">
                      Log in
                    </span>
                  </Link>
                </motion.li>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Nav;
