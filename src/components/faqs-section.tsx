'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQItem from './faq-item';

const faqs = [
  {
    question: "What Is PetCare Plus?",
    answer: "PetCare Plus is a comprehensive pet care platform offering grooming, veterinary, training, and pet-sitting services. We prioritize the health, well-being, and happiness of your pets through professional care and personalized attention.",
  },
  {
    question: "How Do I Get Started With PetCare Plus?",
    answer: "Getting started is easy. Simply sign up on our platform, create a profile for your pet, and choose the services you need. You can book appointments, , and even schedule pet-sitting or training sessions. Our team will take care of the rest.",
  },
  {
    question: "What Are The Service Packages Available?",
    answer: "We offer a variety of service packages tailored to your pet's needs, including basic grooming, advanced medical check-ups, training, and all-inclusive care plans. You can choose the package that best fits your pet's lifestyle and requirements.",
  },
];


const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Define animation variants
  const sectionVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
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

  const faqVariants = {
    offscreen: {
      opacity: 0,
      y: 20,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-[#0a0a0a] py-20">
      <div id='faqs' className="w-[90%] md:max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold font-heading text-golden mb-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={sectionVariants}
        >
          <span className='hidden md:inline text-white'>GET ANSWERS TO</span> FREQUENTLY <br className='hidden md:block' /> ASKED QUESTIONS
        </motion.h2>
        <motion.div
          className="text-left mt-12"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={sectionVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={faqVariants}
              initial="offscreen"
              whileInView="onscreen"
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 text-left"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={sectionVariants}
        >
          <Link href="" className="text-primary font-heading font-semibold text-left">See All &rarr;</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;
