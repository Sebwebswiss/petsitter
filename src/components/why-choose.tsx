"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Button from "./button";

const features = [
  {
    title: "CUTTING-EDGE TECHNOLOGY",
    description:
      "Our advanced brokerage platform is built with the latest technology to provide lightning-fast transaction speeds, real-time data, and comprehensive analytics. Stay ahead of the market with our innovative tools.",
    icon: (
      <img
        src={"/icons/why.png"}
        alt={`why choose us icon`}
        className="h-14 w-14"
      />
    ),
  },
  {
    title: "TRANSPARENT TRANSACTIONS",
    description:
      "Transparency is at the core of our operations. We offer clear and straightforward fee structures, detailed transaction histories, and real-time account monitoring, ensuring you have complete control over your investments.",
    icon: (
      <img
        src={"/icons/why.png"}
        alt={`why choose us icon`}
        className="h-14 w-14"
      />
    ),
  },
  {
    title: "CLIENT-CENTRIC APPROACH",
    description:
      "Your satisfaction is our success. Our customer support team is available 24/7 to assist you with any queries or issues. We value your feedback and continuously strive to enhance our services to meet your needs.",
    icon: (
      <img
        src={"/icons/why.png"}
        alt={`why choose us icon`}
        className="h-14 w-14"
      />
    ),
  },
  {
    title: "REGULATORY COMPLIANCE",
    description:
      "We adhere to the highest standards of regulatory compliance to provide a secure trading environment. Our commitment to legal and ethical practices ensures a trustworthy platform for all our clients.",
    icon: (
      <img
        src={"/icons/why.png"}
        alt={`why choose us icon`}
        className="h-14 w-14"
      />
    ),
  },
];

const WhyChoose = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
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
    <div className="bg-white max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto py-24">
      <motion.div
        id="why-us"
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl font-extrabold text-gray-900 mb-20 font-heading">
          WHY CHOOSE CRYPTOSÉCUR?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8 md:msx-0"
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-[#EDEEF4] rounded-2xl shadow p-6 px-8"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center h-14 w-14 mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-3 font-heading">
                {feature.title}
              </h3>
              <p className="text-gray-900 font-body">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-12" variants={itemVariants}>
          <Link href="/">
            <Button value="Get Started" type="filled" navigate="services" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyChoose;
