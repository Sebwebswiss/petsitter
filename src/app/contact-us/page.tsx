"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ContactUs = () => {
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
        <>
            <div className="bg-black text-white">
                {/* Hero Section */}
                <div
                    className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto w-full "
                >   
                    <header className="pb-[80px] pt-[150px]">
                        <h1 className="text-5xl font-bold text-primary">Contact Us</h1>
                    </header>
                </div>

                {/* Contact Section */}
                <section className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto py-6 rounded-lg shadow-lg">
                    <p className="text-lg text-gray-300 mb-6">
                        Need help or have questions before booking? We’re here to assist. You can always
                        contact us by phone or email if you
                        want to discuss your pet’s needs in detail or if you’d like to meet the caregiver
                        (Sebastien) beforehand. We want you to feel completely comfortable, so don’t
                        hesitate to reach out at any stage of the booking process.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-primary">Contact & Support</h3>
                            <p className="mt-2 text-gray-300">
                                <strong>Email:</strong> pet.sitters.boca@gmail.com
                            </p>
                            <p className="mt-2 text-gray-300">
                                <strong>Phone:</strong> (561) 552-3529
                            </p>
                            <p className="mt-2 text-gray-300">
                                <strong>Location:</strong> Plaza Real S 33430 Boca Raton
                            </p>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-primary mb-4">Send Us a Message</h3>
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
                                    className="w-full py-3 bg-golden text-black font-bold rounded-lg hover:bg-gold-600 transition-all transform hover:scale-[1.02]"
                                >
                                    Request Consultation
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="mt-10">
  <h3 className="text-2xl font-semibold text-primary text-center">Find Us Here</h3>
  <div className="mt-4 w-full h-64 rounded-lg overflow-hidden">
    <iframe
      className="w-full h-full"
      src="https://www.google.com/maps?q=11+Plaza+Real+S,+Boca+Raton,+FL+33432&output=embed"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>

                </section>
            </div>
        </>
    );
};

export default ContactUs;
