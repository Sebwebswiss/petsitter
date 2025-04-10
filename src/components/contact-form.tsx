"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Message sent successfully!");
      setFormData({ service: "", date: "", email: "", message: "" });
    } else {
      toast.error(data.error || "Failed to send the message.");
    }
  };

  return (
    <section id="contact" className="bg-dark-800 py-16">
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h4 className="text-golden font-semibold uppercase tracking-widest">
              Consultation
            </h4>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
              Schedule Your Elite Consultation
            </h2>
            <p className="text-gray-400 mb-8">
              Begin your journey with our exclusive pet care services. Our concierge team will
              guide you through our premium offerings.
            </p>

            <form className="space-y-6" onSubmit={sendEmail}>
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
                >
                  <option value="">Select Service</option>
                  <option value="Dog Walking">Dog Walking</option>
                  <option value="Pet Sitting & Home Visits">Pet Sitting & Home Visits</option>
                  <option value="Overnight Pet Sitting">Overnight Pet Sitting</option>
                  <option value="Specialized Services">Specialized Services</option>
                  <option value="Exotic Pet Care">Exotic Pet Care</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
                  required
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
                  rows={3}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-golden text-dark-900 font-bold rounded-lg hover:bg-gold-600 transition-all transform hover:scale-[1.02]"
              >
                Request Consultation
              </button>
            </form>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 -golden/10 rounded-2xl"></div>
            <img
              src="/images/getintouch.png"
              alt="Elite Pet Care"
              className="relative z-10 rounded-2xl -2 -golden/30 -2xl transform hover:scale-[1.02] transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
