"use client";
import React from "react";
import { motion } from "framer-motion";

const imageVariants = {
  offscreen: {
    opacity: 0,
    x: -100,
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

const textVariants = {
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


const VisionMission = () => {

  return (
    <div className="bg-black md:py-16 md:mt-10 max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
      <motion.div
        className="flex gap-10 md:gap-6 2xl:gap-8 flex-col-reverse md:flex-row items-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex-shrink-0 md:w-[420px] 2xl:w-[450px] 2xl:h-[450px]"
          variants={imageVariants}
        >
          <img
            src="/images/mission.jpg"
            alt="Pet Care"
            className="w-full shadow-lg"
          />
        </motion.div>
        <motion.div
          className="flex flex-col md:flex-row gap-10 2xl:gap-14 md:ml-12"
          variants={textVariants}
        >
          <div className="flex flex-col items-start flex-1">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16">
                <img src={"/icons/vission.png"} alt={`vision icon`} className="h-16 w-16" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-extrabold text-golden font-heading">
                OUR VISION
              </h3>
              <p className="mt-4 text-[15px] text-white font-body">
                Our vision is to create a world where every pet receives the love,
                care, and attention they deserve. We strive to be the most trusted 
                pet care provider, ensuring pets live healthier and happier lives 
                through expert care and innovative solutions.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start flex-1">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16">
                <img src={"/icons/mission.png"} alt={`mission icon`} className="h-16 w-16" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-extrabold text-golden font-heading">
                OUR MISSION
              </h3>
              <p className="mt-4 text-[15px] text-white font-body">
                Our mission is to provide compassionate, high-quality pet care services 
                that enhance the well-being of pets and their owners. From grooming and 
                veterinary care to pet training and boarding, we are dedicated to making 
                pet care convenient, safe, and stress-free.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VisionMission;
