import * as images from "../../../../assets";
import { NavLink, Link } from "react-router-dom";
import { INDEX, CONTACT_US, FAQ, ABOUT } from "../../../../routes/CONSTANT";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "react-use";
import { Squash as Hamburger } from "hamburger-react";

function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: "Home", path: INDEX },
    { name: "About", path: ABOUT },
    { name: "Contact us", path: CONTACT_US },
    { name: "FAQ", path: FAQ },
  ];

  const ref = useRef(null);

  useClickAway(ref, () => setMenuOpen(false));

  return (
    <section className="landing-nav-section bg-white">
      <div className="w-full container mx-auto max-w-screen-xl py-4 flex items-center gap-5">
        <div className="logo">
          <Link to={INDEX} className="flex">
            <img src={images.logo} alt="logo" />
            <p className="logo-text">Kommunita</p>
          </Link>
        </div>

        <div className="nav-links ml-auto hidden md:flex lg:flex">
          <ul className="flex gap-x-12">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  exact="true"
                  activeClassName="active"
                  className="block py-2 hover:text-neutral-400 transition-all"
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto sm:mr-1">
          <Link to={INDEX} className="flex action-button sm:mr-1">
            Sign up
          </Link>
        </div>

        <div ref={ref} className="block md:hidden lg:hidden">
          <Hamburger toggled={isMenuOpen} size={22} toggle={setMenuOpen} />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Nav;
