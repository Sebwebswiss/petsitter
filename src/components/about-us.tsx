"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Button from "./button";

const AboutUs = () => {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1,
      },
    },
  };

  const imageVariants = {
    offscreen: {
      opacity: 0,
      x: 100,
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1,
      },
    },
  };

  return (
    <div id="about" className="bg-black py-20 max-w-[100vw] overflow-x-hidden ">
      <motion.div
        className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col lg:flex-row items-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="lg:w-1/2 "
          variants={cardVariants}
        >
          <h2 className="text-3xl font-extrabold text-golden mb-4 font-heading">
            ABOUT US
          </h2>
          <p className="text-md text-white mb-6 font-body  md:pr-16">
          Trusted Pet Care in Boca Raton by Sebastien Services LLC

At Pet Sitter Boca Raton by Sebastien Services LLC, your pets receive family-level treatment. Pet sitting, dog walking, feeding visits, and check-ins are options you can count on — 24/7 — anywhere in and around Boca Raton and within 30 miles to reach you.

With years of experience and love for animals, our local staff makes sure your furry companions remain secure, well-looked-after and happy — EVEN when you are not there with them. Every service is fully adapted to your pet’s routine and comfort level with options like same-day bookings and overnight stays available.

Making pet care simple: set up your account in seconds (Google sign-in option), book instantly online, and get instant email confirmations. Simple. Secure. Stress-free.

New customers are more than welcome. Got questions? Just call on us — we'll glad to assist you!
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center gap-4 lg:justify-start">
            <div className="">
              <Link href="/client/signup">
                <Button value="Get Started" type="filled" navigate="services" />
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/learn-more">
                <Button
                  value="Learn more"
                  type="outlined"
                  style="!text-black !border-black"
                />
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 md:mt-10 lg:mt-0 flex justify-center items-center"
          variants={imageVariants}
        >
          <div className="relative">
            <img
              src="/images/about.jpg"
              alt="Happy pets with our caretakers"
              className="w-full shadow-lg h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
