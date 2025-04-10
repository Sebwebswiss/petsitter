'use client'
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        
        const yOffset = -100;
        const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });

      
    }
  };

  return (
    <div className="bg-black pt-20">
      <div className="px-8 max-w-screen-xl mx-auto text-white bg-black pt-10 pb-6">
        <div className="flex justify-center items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">
              Let us take care of your pets
            </h2>
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-8">
              <span
                onClick={() => handleScroll("about")}
                className="cursor-pointer hover:underline"
              >
                About Us
              </span>
              <span
                onClick={() => handleScroll("services")}
                className="cursor-pointer hover:underline"
              >
                Services
              </span>
              <span
                onClick={() => handleScroll("whyus")}
                className="cursor-pointer hover:underline"
              >
                Why Us
              </span>
              <span
                onClick={() => handleScroll("testimonials")}
                className="cursor-pointer hover:underline"
              >
                Testimonials
              </span>
              <span
                onClick={() => handleScroll("faqs")}
                className="cursor-pointer hover:underline"
              >
                FAQ&apos;s
              </span>
              <span
                onClick={() => handleScroll("contact")}
                className="cursor-pointer hover:underline"
              >
                Contact Us
              </span>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="bg-mainColor cursor-pointer mt-1 p-2 rounded-full text-white text-2xl">
                <Facebook />
              </div>
              <div className="bg-mainColor cursor-pointer mt-1 p-2 rounded-full text-white text-2xl">
                <Instagram />
              </div>
              <div className="bg-mainColor cursor-pointer mt-1 p-2 rounded-full text-white text-2xl">
                <Twitter />
              </div>
            </div>
            <div className="mt-8 mb-4 text-center text-sm">
              © 2025 petsitterboca. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
