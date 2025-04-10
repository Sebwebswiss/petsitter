// src/WhatWeDo.js
import React from "react";

const WhatWeDo = () => {
  return (
    <section className="py-20 bg-tertiary">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 font-heading">
            What We Do
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="p-6 lg:w-[30%] md:w-[47%] w-full bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
              <span className="text-2xl font-bold ">01</span>
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Expert Guidance
            </h3>
            <p>
              We offer expert guidance to help you understand the intricacies of
              the cryptocurrency market, from the basics of blockchain
              technology to advanced investment strategies.
            </p>
          </div>
          <div className="p-6 lg:w-[30%] md:w-[47%] w-full bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
              <span className="text-2xl font-bold ">02</span>
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Investment Management
            </h3>
            <p>
              Our team of experienced professionals manages your cryptocurrency
              investments, ensuring that your portfolio is optimized for growth
              and security.
            </p>
          </div>
          <div className="p-6 lg:w-[30%] md:w-[47%] w-full bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
              <span className="text-2xl font-bold ">03</span>
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Personalized Advice
            </h3>
            <p>
              We tailor our advice and strategies to meet your individual
              financial goals, whether you&apos;re a seasoned investor or just
              starting out.
            </p>
          </div>
          <div className="p-6 lg:w-[30%] md:w-[47%] w-full bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
              <span className="text-2xl font-bold ">04</span>
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Educational Resources
            </h3>
            <p>
              Stay informed with our comprehensive educational resources,
              including articles, webinars, and market analysis, designed to
              keep you up-to-date on the latest trends and developments.
            </p>
          </div>
          <div className="p-6 lg:w-[30%] md:w-[47%] w-full bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 mb-4 bg-primary text-white rounded-md">
              <span className="text-2xl font-bold ">05</span>
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Security and Trust
            </h3>
            <p>
              We prioritize the security of your investments, implementing the
              highest standards of protection to safeguard your assets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
