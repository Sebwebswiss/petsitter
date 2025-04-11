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
    <div id="about" className="bg-black py-20 max-w-[100vw] overflow-x-hidden">
      <motion.div
        className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col lg:flex-row items-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="lg:w-1/2" variants={cardVariants}>
          <h2 className="text-3xl font-extrabold text-golden mb-4 font-heading">
            ABOUT US
          </h2>
          <p className="text-md text-white mb-6 font-body md:pr-16">
            <strong>Pet Sitter Sebastien Services LLC</strong> is your trusted local provider of professional pet care in Boca Raton, Florida, and surrounding areas within a 30-mile radius. We specialize in pet sitting, dog walking, daily check-ins, and feeding visits — all tailored to fit your schedule and your pet’s routine.
            <br /><br />
            As a registered and insured LLC, we are committed to providing safe, reliable, and loving care backed by years of experience and 24/7 availability. Whether you're at work, on vacation, or simply need a helping hand, you can count on us to treat your pets like family.
            <br /><br />
            We make booking simple with online reservations, instant confirmations, and even Google sign-in for fast access. Your peace of mind is our priority — and your pet’s happiness is our mission.
            <br /><br />
            Ready to meet your pet’s new best friend? Schedule your service today.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center gap-4 lg:justify-start">
            <div>
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
