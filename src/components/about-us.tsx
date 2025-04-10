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
          Welcome to Boca Raton Pet Care Services, your trusted partner for pet sitting, dog walking, feeding visits, and check-ins in Boca Raton, Florida and within a 30-mile radius. <br />
           We know how important your pet is to you - they&apos;re family. With our 24/7 availability and years of experience in professional pet care, you can rest easy knowing your furry friend is in reliable, loving hands. We serve Boca Raton and surrounding communities, ensuring pets across the area get the care they deserve when you&apos;re busy or away. <br />Our team (led by Sebastien, an expert pet caregiver) is committed to keeping your pets happy, healthy, and safe at all times. Whether you need an overnight pet sitter or a quick daytime walk, we tailor our services to fit your schedule and your pet&apos;s routine. Book a service now through our easy online system and get peace of mind with confirmed, dependable pet care. <br /> We even offer convenient Google login for quick sign-in and email confirmations for every booking - making the process seamless from start to finish.Ready to get started? Contact us or log in now to schedule your first service. We can&apos;t wait to meet you and your pet! (New clients are welcome, and we&apos;re happy to answer any questions - just reach out.) Let us give your pets the attentive care and companionship they deserve, whenever you need it.
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
