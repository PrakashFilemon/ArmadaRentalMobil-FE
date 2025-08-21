import logoCar from "@/assest/images/Logo Armad.png";
import { FaCarSide } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, profile } from "@/redux/actions/auth";
import { getUserRentals } from "@/redux/actions/detail";
import { HiMenu, HiX } from "react-icons/hi";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const { userRentals } = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(profile(null, null, null));
  }, [dispatch, token]);

  // Fetch user rentals when component mounts if user is logged in
  useEffect(() => {
    if (user && token) {
      dispatch(getUserRentals());
    }
  }, [dispatch, user, token]);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    closeMenu();
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-lg transition-transform duration-500 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logoCar} className="h-10 w-10" alt="Web-Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            ARMADA
          </span>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Login/Logout Menu */}
        <div className="flex md:order-2 items-center gap-2">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                type="button"
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-4 py-2 text-center transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-4 py-2 text-center transition duration-150"
            >
              Masuk/Daftar
            </Link>
          )}
        </div>

        {/* Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-2 px-3 md:p-0 text-gray-500 rounded tracking-wider hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                onClick={closeMenu}
                className="block py-2 px-3 md:p-0 tracking-wider text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                onClick={closeMenu}
                className="block py-2 px-3 md:p-0 tracking-wider text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black"
              >
                Services
              </Link>
            </li>

            {/* Add Rental Saya as a regular menu item for all viewports */}
            {user && (
              <li>
                <Link
                  to="/daftar-rental"
                  onClick={closeMenu}
                  className="block py-2 px-3 md:py-0 md:px-4 tracking-wider text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:flex md:items-center md:gap-1 md:font-medium"
                >
                  <FaCarSide className="hidden md:inline text-blue-600 mr-1" />
                  Rental Saya
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
