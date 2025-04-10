"use client";
import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "SAFE & SECURE",
    description:
      "Your pet’s safety is our top priority. We maintain a clean, secure, and nurturing environment, ensuring your furry friends receive the best care and attention at all times.",
    icon: (
      <img src={"/icons/safe.png"} alt={`safe icon`} className="h-16 w-16" />
    ),
  },
  {
    title: "TRUST & RELIABILITY",
    description:
      "We understand that pets are family. Our dedicated team of professionals is committed to providing trustworthy and compassionate care, ensuring your pet feels loved and comfortable.",
    icon: (
      <img
        src={"/icons/reliable.png"}
        alt={`reliable icon`}
        className="h-16 w-16"
      />
    ),
  },
  {
    title: "EXPERT CARE",
    description:
      "With a team of certified pet specialists, we offer personalized care, training, and health services tailored to your pet’s unique needs. Your pet’s well-being is in expert hands!",
    icon: (
      <img
        src={"/icons/efficient.png"}
        alt={`efficient icon`}
        className="h-16 w-16"
      />
    ),
  },
];

const Values = () => {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-black text-white py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/values.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <motion.div
        className="relative max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-extrabold text-white mb-12 whitespace-nowrap pr-24 font-heading md:mt-4"
          variants={itemVariants}
        >
          OUR VALUES
        </motion.h2>
        <div className="space-y-12">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="flex items-start space-x-4"
              variants={itemVariants}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16">
                  {value.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold font-heading">
                  {value.title}
                </h3>
                <p className="mt-4 text-md font-body">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Values;
