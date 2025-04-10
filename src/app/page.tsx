import AboutUs from '@/components/about-us'
import ContactForm from '@/components/contact-form'
import FAQSection from '@/components/faqs-section'
import Features from '@/components/features'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import LearnSection from '@/components/learn-section'
import VisionMission from '@/components/mission'
import ServicesSection from '@/components/plans-section'
import Testimonials from '@/components/testimonials'
import Values from '@/components/values'
import WhyUs from '@/components/why-us'
import React from 'react'

const Page = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <AboutUs/>
      <VisionMission/>
      <Values/>
      <ServicesSection/>
      <WhyUs/>
      <Testimonials/>
      {/* <LearnSection/> */}
      <FAQSection/>
      <ContactForm/>
      <Footer />
    </>
  )
}

export default Page