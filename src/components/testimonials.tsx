"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Jessica L.",
    location: "Boca Raton",
    text: "Absolutely fantastic service! Sebastien took such great care of our two cats while we were on vacation. We got daily updates and photos, and came home to relaxed, happy kitties. We will definitely use his pet sitting again!",
  },
  {
    name: "David G.",
    location: "Delray Beach",
    text: "My dog Max adores Sebastien! He gets so excited for his daily walks. I appreciate the reliable, on-time walks every weekday. I can tell Max is getting plenty of exercise and attention because he’s calmer and content when I get home. Highly recommend this service.",
    image: "/images/testimonials/david.jpg",
  },
  {
    name: "Maria S.",
    location: "Deerfield Beach",
    text: "I was nervous about leaving our new rescue pup for the first time, but this service was a game-changer. Sebastien is patient and so good with animals - he even managed our pup's medication and anxiety with ease. We got updates every visit. Truly a five-star experience from start to finish.",
  },
];

const Testimonials = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div id="testimonials" className="relative">
      <div className="py-16 overflow-x-hidden relative max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className=" mx-auto flex flex-col items-center  gap-8  items-start p">
          <div className="lg:flex lg:items-center lg:justify-between z-10">
            <div>
              <img
                src={"/icons/testimonial.png"}
                alt={`efficient icon`}
                className="h-16 w-16 mb-6"
              />
              <h2 className="text-3xl font-extrabold text-center text-golden font-heading uppercase">
                Testimonials & Reviews
              </h2>
              <p className="text-white mt-4 text-center">
                Don&apos;t just take our word for it - here&apos;s what some of
                our happy clients have to say about our pet care services
              </p>
            </div>
          </div>
          <div className="mt-12 w-full z-10 h-full">
            <Slider {...settings} className="">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-2 md:py-2 md:px-0">
                  <div className="bg-black rounded-lg shadow-md p-6 md:max-w-[350px]  md:mx-auto h-full border border-primary">
                    <div className="flex items-center justify-center h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden bg-[#343538]">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <h3 className="text-lg font-bold text-center text-white font-heading">
                      {testimonial.name}
                    </h3>
                    <p className="text-primary font-heading mb-4 text-center font-extrabold">
                      {testimonial.location}
                    </p>
                    <p className="text-white text-center text-sm  md:min-h-40">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <p className="text-white mt-2 text-center">
            (More testimonials coming soon - we&apos;re proud to have a growing
            list of satisfied pet parents!) These reviews are collected from our
            clients via email and other platforms, and we&apos;re happy to share
            references upon request. Your feedback means the world to us, and it
            helps us continually improve our services. We strive to ensure every
            experience is as positive as those mentioned above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
