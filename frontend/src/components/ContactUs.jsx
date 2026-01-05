import React, { useState, useEffect, useRef, useContext } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import contact from '../assets/contact.jpg';
import { AuthContext } from '../authContext/AuthProvider';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate content
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2
        },
        "-=0.5"
      );

      // Animate form
      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

    const { submitContact } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitContact(formData);
      toast.success("submitted successfully");

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
     toast.error("Failed to submit. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      info: "+91 6393525012",
      color: "bg-blue-500"
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      info: "info@trustpoint.in",
      color: "bg-green-500"
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      info: "Kalu Kuwan, Banda (UP) - 210001",
      color: "bg-purple-500"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      info: "Mon - Fri: 9:00 AM - 6:00 PM",
      color: "bg-orange-500"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-12 max-w-7xl mx-auto gap-12">
        
        {/* Left - Image */}
        <div ref={imageRef} className="flex-1 max-w-lg">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src={contact} 
              alt="Contact Us" 
              className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* Right - Content */}
        <div ref={contentRef} className="flex-1 max-w-2xl">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg font-semibold tracking-wider uppercase">
              Contact Us
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Get in Touch{' '}
              <span className=" bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                with Us
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Ready to take the next step in your financial journey? We're here to help you 
              achieve your goals with personalized strategies and expert guidance.
            </p>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Your phone"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none"
                >
                  <option value="">Select subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="investment">Investment Planning</option>
                  <option value="consultation">Financial Consultation</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map and Additional Contact Info Section */}
      <div className="bg-[#111C2E] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-[#E5D7C9] text-lg">
              Find us at our main location in the heart UP's financial district
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.864277798684!2d72.82106931472615!3d18.932847287085944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0d5cad%3A0xc70a25a7209c733c!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.info}</p>
                  </div>
                </div>
              ))}
              
              {/* Additional Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Why Choose Us?</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• 10+ Years of Experience</li>
                  <li>• Personalized Financial Solutions</li>
                  <li>• 24/7 Customer Support</li>
                  <li>• Trusted by 1000+ Clients</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;