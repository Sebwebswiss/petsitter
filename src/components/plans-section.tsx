"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Service {
  title: string;
  features: string[];
  imageUrl: string;
  url: string;
}

const services: Service[] = [
  {
    title: "Pet Sitting ($65 per day or night)",
    features: [
      "Feeding & Fresh Water",
      "Playtime & Exercise",
      "Companionship & Supervision",
      "Home Care",
    ],
    imageUrl: "/images/pet-sitting-1.jpg",

    url: "/pet-sitting"
  },
  {
    title: "Dog Walking ($19 per 30-minute walk)",
    features: [
      "Individual or group walks",
      "30, 45, or 60-minute sessions",
      "Playtime and socialization included",
    ],
    imageUrl: "/images/dogwalking.jpeg",

    url: "/dog-walking"
  },
  {
    title: "Drop-In Visit",
    features: [
      "15-30 minute visit",
      "Clean the litter box",
      "Spend some time with your pet",
      "Ensure everything is okay",
    ],
    imageUrl: "/images/pet-drop-in-visit.jpg",
    url: "/drop-in-visit"
  },
  {
    title: "Check-ins & Feeding Visits",
    features: [
      "Feeding your pet",
      "Refreshing water",
      "Potty break for dogs",
      "Playtime for dogs",
    ],
    imageUrl: "/images/pet-walk.jpg",
    url: "/checkins-and-visits"
  },
  {
    title: "Additional Services (Customized Pricing)",
    features: [
      "Medication Administration",
      "Basic Grooming",
      "Pet Taxi Service",
      "Additional Services If Required",
    ],
    imageUrl: "/images/other-services.jpg",
    url: "/additional-services"
  },
  
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};


const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <motion.div
    // variants={itemVariants}
    className=" w-full md:w-[330px] bg-[#343538] text-white shadow-md rounded-md overflow-hidden"
  >
    {/* Image at the top */}
    <div className="relative w-full h-48">
      <Image
        src={service.imageUrl}
        alt={service.title}
        fill
        className="object-cover"
      />
    </div>

    {/* Card Content */}
    <div className="p-6 flex flex-col min-h-[350px]">
      <h3 className="text-2xl font-bold mb-4 font-heading">
        {service.title}
      </h3>
      <div className="flex flex-col justify-between flex-grow">
        <ul className="space-y-2 flex-grow">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 font-body">
              <svg
                className="h-6 w-6 text-primary flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-left">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href={service.url}
          className="bg-golden w-full rounded-full py-3  whitespace-nowrap text-lg text-black hover:text-white font-heading font-semibold mt-4 mx-auto"
        >
          Learn more
        </Link>
      </div>
    </div>

  </motion.div>
);


const ServicesSection: React.FC = () => {
  return (
    <div id="services" className="pt-20">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-extrabold text-primary mb-6 font-heading"
          // initial={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6 }}
        >
          Services & Pricing
        </motion.h2>
        <motion.p
          className="text-white mb-16 text-md font-body md:w-[68%] 2xl:w-[60%] text-center mx-auto"
          // initial={{ opacity: 0, y: -50 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.5 }}
          // transition={{ duration: 0.6, delay: 0.2 }}
        >
          We offer a range of pet care services to meet various needs. Below is an overview of our primary services along with pricing and details:
        </motion.p>

        {/* Parent container with staggered animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          // variants={containerVariants} 
          // initial="hidden"
          // whileInView="show"
          // viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};


export default ServicesSection;
