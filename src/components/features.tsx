import React from 'react';

const features = [
  {
    title: "Personalized Pet Care For Everyone",
    description: "We provide tailored care for your pets, ensuring their comfort and happiness while you're away.",
  },
  {
    title: "Trusted & Experienced Sitters",
    description: "Our professional pet sitters are trained, vetted, and passionate about animal care.",
  },
  {
    title: "Safe & Secure Environment",
    description: "Your pets are in safe hands with a secure, loving, and pet-friendly environment.",
  },
  {
    title: "Real-Time Updates of Pets",
    description: "Stay connected with your pet through photos, videos, and real-time updates.",
  },
];

const Features = () => {
  return (
    <div className="bg-black relative w-full flex justify-center">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto bg-[#343538] px-4 sm:px-6 lg:p-8 z-0 md:-mt-20 rounded-2xl shadow-2xl">
        <div className="m-10">
          <div className="grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative">
                <div className="flex items-center justify-center h-16 w-16 text-5xl">
                  🐾
                </div>
                <h3 className="mt-8 text-lg leading-6 font-extrabold text-golden font-heading uppercase">
                  {feature.title}
                </h3>
                <p className="mt-2 text-white text-sm font-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
