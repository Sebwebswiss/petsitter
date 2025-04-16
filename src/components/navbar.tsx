"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [logoSrc, setLogoSrc] = useState("/images/logo.png");

  useEffect(() => {
    if (pathname.startsWith("/articles/") || pathname.startsWith("/plan")) {
      setLogoSrc("/images/logo-dark.png");
    } else {
      setLogoSrc("/images/logo.png");
    }
  }, [pathname]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const yPosition =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      handleScrollToSection(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full text-primary z-50 transition-all duration-300 ${
        pathname.startsWith("/dashboard") || pathname.startsWith("/client")
          ? "hidden"
          : "block"
      } ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center w-full justify-between">
            <div className="flex-shrink-0 py-4">
              <Link href="/">
                <h2 className="text-3xl md:text-4xl font-bold ">Pet Sitter</h2>
              </Link>
            </div>
            <div className="hidden md:block uppercase font-[800]">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </Link>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  About
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "services")}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Services
                </a>
                <a
                  href="#faqs"
                  onClick={(e) => handleNavClick(e, "faqs")}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  FAQ&apos;s
                </a>
                <Link
                  href="/contact-us"
                  // onClick={(e) => handleNavClick(e, "contact")}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden md:block uppercase font-[800]">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/client/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-primary border border-primary"
                >
                  Login
                </Link>
                {/* <Link
                  href="/client/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-golden text-black"
                >
                  Book Now
                </Link> */}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Link
              href="/client/login"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-primary border border-primary"
            >
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-1 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${isOpen ? "hidden" : "block"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
                <path
                  className={`${isOpen ? "block" : "hidden"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-black z-50 md:hidden`}
        style={{ zIndex: 100 }}
      >
        <div className="flex items-center justify-between px-4 py-4 z-50 mt-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h2 className="text-4xl font-bold ">Pet Sitter</h2>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(e, "about");
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            About
          </a>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(e, "services");
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            Services
          </a>
          <a
            href="#faqs"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(e, "faqs");
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            FAQ&apos;s
          </a>
          <Link
            href="/contact-us"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            Contact Us
          </Link>

          <div className="pl-4 flex items-baseline space-x-4 pt-2">
            <Link
              href="/client/login"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-primary border border-primary"
            >
              Login
            </Link>
            {/* <Link
                  href="/client/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-golden text-black"
                >
                  Book Now
                </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
