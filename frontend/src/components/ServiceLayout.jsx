import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceLayout = ({ 
  title, 
  subtitle, 
  description, 
  types = [], 
  benefits = [], 
  ctaText
}) => {
  const navigate = useNavigate();
  const handleContactScroll = () => {
    navigate("/contacts#contact-us");
  };
  return (
    <div className="px-6 md:px-16 py-12 mt-15 text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* Intro Section */}
      {description && (
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-gray-700">{description}</p>
        </div>
      )}

      {/* Types Section */}
      {types.length > 0 && (
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
            Types of {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((item, index) => (
              <div
                key={index}
                className="p-6  rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <div className="bg-zinc-50 py-12 px-6 md:px-12 rounded-2xl shadow-inner max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
            Why Choose {title} with Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <h3 className="font-semibold">{benefit.name}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      {ctaText && (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">
            {ctaText}
          </h2>
          <button
            onClick={handleContactScroll}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 transition"
          >
            Explore Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceLayout;
