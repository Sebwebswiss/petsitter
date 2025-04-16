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
  title: "Pet Sitter | Trusted Pet Care Services in Your Town",
  description:
    "Book trusted and loving pet sitters for your furry companions. We offer professional care, flexible plans, and 24/7 support. Your pet deserves the best!",
  keywords: [
    "pet sitter",
    "dog walking",
    "cat sitting",
    "pet care",
    "animal boarding",
    "Boca Raton pet care",
    "trusted pet sitter",
  ],
  alternates: {
    canonical: "https://www.petsittersebastien.com/",
  },
  openGraph: {
    title: "Pet Sitter | Trusted Pet Care Services in Your Town",
    description:
      "Book trusted and loving pet sitters for your furry companions. We offer professional care, flexible plans, and 24/7 support.",
    url: "https://petsitter-olive.vercel.app/",
    siteName: "Pet Sitter",
    images: [
      {
        url: "https://www.petsittersebastien.com/images/logo.png", // ✅ tvoja OG slika
        width: 1200,
        height: 630,
        alt: "Pet Sitter - Your trusted pet care service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Sitter | Trusted Pet Care Services in Your Town",
    description:
      "Reliable pet care from experienced sitters. Book your appointment today!",
    images: ["https://www.petsittersebastien.com/images/logo.png"], // ✅ i za Twitter
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
