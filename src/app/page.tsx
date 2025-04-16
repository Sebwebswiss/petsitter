import AboutUs from "@/components/about-us";
import ContactForm from "@/components/contact-form";
import FAQSection from "@/components/faqs-section";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import LearnSection from "@/components/learn-section";
import VisionMission from "@/components/mission";
import ServicesSection from "@/components/plans-section";
import Testimonials from "@/components/testimonials";
import Values from "@/components/values";
import WhyUs from "@/components/why-us";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Sitter | Palm Beach County Dog Walking & Pet Sitting",
  description:
    "Book loving and professional pet care in Palm Beach County. Serving Boca Raton, Delray Beach, West Palm Beach, and surrounding areas.",
  openGraph: {
    title: "Pet Sitter | Palm Beach County Dog Walking & Pet Sitting",
    description:
      "We offer trusted dog walking and pet sitting across Boca Raton, Delray Beach, and West Palm Beach. Book now with Sebastien!",
    url: "https://www.petsittersebastien.com/",
    siteName: "Pet Sitter Sebastien",
    images: [
      {
        url: "https://www.petsittersebastien.com/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Pet Sitter - Your trusted pet care service in Palm Beach",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Beach Pet Sitting by Sebastien",
    description:
      "Loving care for your pets in Boca Raton, Delray Beach, and beyond.",
    images: ["https://www.petsittersebastien.com/images/logo.png"],
  },
  alternates: {
    canonical: "https://www.petsittersebastien.com/",
  },
};


const Page = () => {
  return (
    <>
      <Hero />
      <Features />
      <AboutUs />
      <VisionMission />
      <Values />
      <ServicesSection />
      <WhyUs />
      <Testimonials />
      {/* <LearnSection/> */}
      <FAQSection />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Page;
