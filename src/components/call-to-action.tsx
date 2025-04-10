'use client'
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Button from './button';

const CallToAction: React.FC = () => {
  // Define animation variants
  const sectionVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1 } },
  };

  const imageVariants = {
    offscreen: { opacity: 0, x: -50 },
    onscreen: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.3, duration: 1 } },
  };

  const textVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1 } },
  };

  return (
    <div className="pb-8">
      <motion.div
        className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto bg-primary flex flex-col lg:flex-row items-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={sectionVariants}
      >
        <motion.div
          className=""
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={imageVariants}
        >
          <img
            src="/images/action.png"
            alt="Bitcoin"
            className="w-[380px] h-auto shadow-lg"
          />
        </motion.div>
        <motion.div
          className="flex-1 p-4 lg:px-24 mt-8 lg:mt-0 text-center lg:text-left"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={textVariants}
        >
          <h2 className="text-xl md:text-3xl font-extrabold text-black font-heading tracking-wide">
            START YOUR JOURNEY TOWARDS FINANCIAL FREEDOM WITH CRYPTOSÉCUR TODAY!
          </h2>
          <p className="mt-4 md:text-xl text-black font-body mb-6 font-semibold tracking-wide">
            Sign up now to get started.
          </p>
          <Link href={"/"}>
            <Button
              value="GET STARTED &rarr;"
              type="custom"
              style="!bg-black !text-white !border-black"
              navigate="services"
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
