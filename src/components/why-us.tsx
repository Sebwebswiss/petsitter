"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Button from "./button";

const checkPoints = [
  "Experienced and reliable pet care provider",
  "Flexible scheduling to fit your needs",
  "Personalized attention for every pet",
  "Daily photo and video updates for peace of mind",
  "Emergency pet care available",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const WhyUs: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="whyus" className="py-10 md:mt-20 md:mb-10 font-[family-name:var(--font-epilogue)]">
      <div className="relative w-full md:max-w-[1250px] px-5 md:px-20 mx-auto flex flex-col md:flex-row items-center md:space-x-16 space-y-8 md:space-y-0">
        <div className="w-full md:w-[50%] flex justify-center items-center">
          <div className="overflow-hidden relative z-20 rounded-[2.7rem]">
            <div
              ref={imageRef}
              className={`absolute top-0 left-0 w-full md:w-[90%] h-full bg-primary transition-all rounded-[2.7rem] duration-[1s] ease-in-out ${
                isInView ? "-translate-x-full" : "translate-x-0"
              }`}
            ></div>
            <Image
              src="/images/why-us.jpg"
              width={800}
              height={450}
              alt="image"
              className="z-10 w-full md:w-[95%] rounded-[2.7rem]"
            />
          </div>
          <div className="hidden md:block absolute left-10 bottom-10 rounded-[2.7rem] w-[30%] h-[70%] bg-golden"></div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold text-golden font-heading uppercase">
            Why Choose Us?
          </h2>
          <motion.ul
            className="mt-6 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {checkPoints.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-center text-white text-[16px]"
                variants={itemVariants}
              >
                <span className="mr-2 text-xl">
                  <BadgeCheck className="text-primary" />{" "}
                </span>

                {point}
              </motion.li>
            ))}
          </motion.ul>
          <div className="flex gap-8 mt-6">
            <Link
              href="/client/login"
              className="px-3 py-2 rounded-md text-md font-medium cursor-pointer bg-golden text-black"
            >
              Book a Walk or Pet Sitting Today!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
