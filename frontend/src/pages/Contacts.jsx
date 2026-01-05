import { MailCheckIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import p1 from '../assets/img4.jpg';
import p2 from '../assets/pair1.jpg';
import { Link } from 'react-router-dom';
import ContactUs from '../components/ContactUs';


// Contact data object
const contactData = [
  {
    id: 1,
    image: p1,
    email: 'support@trustpoint.in',
    department: 'General Support',
    description: 'For general inquiries and support'
  },
  {
    id: 2,
    image: p2,
    email: 'info@trustpoint.in',
    department: 'Investment Team',
    description: 'Investment planning and portfolio management'
  },
  
];

const Contacts = () => {
  const headerRef = useRef(null);
  const contactRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate contact cards with stagger
      gsap.fromTo(
        contactRefs.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Header Section */}
      <div 
        ref={headerRef}
        className='w-full flex h-[170px] bg-gradient-to-r bg-[#111C2E] items-center justify-center'
      >
        <h1 className='text-[#E5D7C9] text-5xl mt-15 md:text-6xl font-bold tracking-tight'>
          Contact Us
        </h1>
      </div>

      {/* Contact Cards Section */}
      <div className='py-16 px-6 md:px-12 bg-gray-50 min-h-screen'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16'>
            {contactData.map((contact, index) => (
              <div
                key={contact.id}
                ref={(el) => {
                  if (el) contactRefs.current[index] = el;
                }}
                className='relative group cursor-pointer'
              >
                {/* Image Container with Overlay Icon */}
                <div className='relative overflow-hidden rounded-2xl shadow-xl'>
                  <img 
                    src={contact.image} 
                    alt={contact.department}
                    className='w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
                  
                  {/* Mail Icon Overlay - Centered */}
                  <div className='absolute inset-0 top-58 flex items-center justify-center'>
                    <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-125 group-hover:bg-green-400 shadow-lg'>
                      <MailCheckIcon 
                        size={28} 
                        className='text-white' 
                      />
                    </div>
                  </div>
                  
                  {/* Department Label */}
                  <div className='absolute top-4 left-4'>
                    <span className='bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium'>
                      {contact.department}
                    </span>
                  </div>
                </div>

                {/* Contact Info Below Image */}
                <div className='mt-6 text-center'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>
                    {contact.department}
                  </h3>
                  
                  <Link 
                    to={`mailto:${contact.email}`}
                    className='text-2xl font-semibold text-green-600 hover:text-green-700 transition-colors duration-300 block mb-2'
                  >
                    {contact.email}
                  </Link>
                  
                  <p className='text-gray-600 text-sm leading-relaxed max-w-xs mx-auto'>
                    {contact.description}
                  </p>
                  
                  {/* Action Button */}
                  <button 
                    onClick={() => window.location.href = `mailto:${contact.email}`}
                    className='mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer'
                  >
                    Send Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactUs/>

    </div>
  );
};

export default Contacts;