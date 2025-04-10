"use client";
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "SIGN UP",
    description: "Create an account and complete the KYC (Know Your Customer) questionnaire to verify your identity.",
  },
  {
    number: "02",
    title: "CHOOSE A PLAN",
    description: "Select from our managed portfolio pricing plans that best suit your investment goals.",
  },
  {
    number: "03",
    title: "DECIDE ON INVESTMENT",
    description: "Determine the amount you want to invest in your chosen portfolio plan.",
  },
  {
    number: "04",
    title: "UPLOAD FUNDS",
    description: "Deposit the investment amount into your CryptoSÉCUR account using our secure payment methods.",
  },
  {
    number: "05",
    title: "REVIEW AND APPROVAL",
    description: "Our team conducts due diligence and reviews your KYC and AML (Anti-Money Laundering) compliance. You will be notified of approval or disapproval.",
  },
  {
    number: "06",
    title: "START TRADING",
    description: "Once approved, our expert traders begin managing and executing trades on your behalf to optimize your investment returns. Experience the ease and security of managed cryptocurrency trading with CryptoSECUR. Start your journey towards financial freedom today!",
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative py-10">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-heading whitespace-nowrap" variants={itemVariants}>
            HOW IT WORKS
          </motion.h2>
          <motion.p className="text-md text-gray-900 mb-16 font-body" variants={itemVariants}>
            Experience the ease and security of managed cryptocurrency trading with CryptoSÉCUR.<br className="hidden md:block" /> Start your journey towards financial freedom today!
          </motion.p>
        </motion.div>
        <motion.div
          className="flex justify-between gap-10 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start z-10"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
                  <span className="text-2xl font-bold ">{step.number}</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 font-heading">{step.title}</h3>
                <p className="text-gray-900 font-body">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="relative flex-shrink-0 hidden md:block z-10" variants={itemVariants}>
            <img src="/images/how.png" alt="Stacked Coins" className="shadow-lg w-[300px] h-full" />
          </motion.div>
        </motion.div>
      </div>
      <div className='absolute h-1/2 bg-tertiary bottom-0 w-full z-0'></div>
    </div>
  );
};

export default HowItWorks;
