'use client'
import Link from "next/link";
import React from "react";
import Button from "./button";
import Image from "next/image";
import { motion } from "framer-motion";

const text = "Loving Pet Care in Palm Beach Region by Sebastien";

const Hero = () => {
  return (
    <div
      id="home"
      className="relative bg-black text-white overflow-hidden h-[120vh]"
    >
      <div className="relative z-10 max-w-6xl mx-auto md:flex mt-24 px-6 md:px-0">
        <div className="relative z-10 lg:max-w-2xl lg:w-full md:h-[80vh] flex items-center">
          <div className="mx-auto max-w-7xl h-full flex items-center">
            <div className="sm:text-center lg:text-left flex flex-col h-full justify-center">
              <h1 className="text-2xl md:text-3xl tracking-tight font-extrabold text-white font-heading md:leading-[50px]">
                <motion.span 
                  className="block xl:inline text-golden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {text.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 font-body">
              Serving Boca Raton, West Palm Beach, Delray Beach, and nearby areas — dog walking, pet sitting, feeding visits.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center gap-4 lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/">
                    <Button value="Explore Services" type="filled" navigate="services" />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/client/login">
                    <Button value="Book Now" type="outlined" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:h-[80vh] text-white flex justify-center items-center">
          <Image 
            src={"/images/hero-pets.png"} 
            className="h-[400px] w-[500px]" 
            height={600} 
            width={600} 
            alt="Pet-Hero-Section" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;