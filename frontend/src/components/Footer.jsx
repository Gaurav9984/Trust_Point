import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/Trust Point.png'
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111C2E] text-[#E5D7C9] px-6 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div >
          <div className="p-6">
            <img src={logo} alt="Company Logo" className="h-30" />
          </div>
          <p className="text-sm text-justify leading-relaxed">
            Our journey began with a simple promise: to empower every individual
            in India to achieve their financial goals and protect what matters
            most. We know that life's uncertainties can be overwhelming, but
            with the right guidance and support, you can navigate them
            successfully.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-4">Services</h3>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/services/sip" className="hover:text-green-500">SIP</NavLink></li>
            <li><NavLink to="/services/fixed-deposit" className="hover:text-green-500">Fixed Deposit</NavLink></li>
            <li><NavLink to="/services/fund-management" className="hover:text-green-500">Fund Management</NavLink></li>
            <li><NavLink to="/services/retirement-planning" className="hover:text-green-500">Retirement Planning</NavLink></li>
           
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/about-us" className="hover:text-green-500">About Us</NavLink></li>
            <li><NavLink to="/contacts" className="hover:text-green-500">Contact Us</NavLink></li>
            <li><NavLink to="/tools/financial-calculators" className="hover:text-green-500">Financial Calculator</NavLink></li>
            <li><NavLink to="/tools/financial-health" className="hover:text-green-500">Financial Health</NavLink></li>
            <li><NavLink to="/privacy-policy" className="hover:text-green-500">Privacy Policy</NavLink></li>
            <li><NavLink to="/commission-disclosures" className="hover:text-green-500">Commission Disclosures</NavLink></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-4">Useful Links</h3>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/tools/useful-links" className="hover:text-green-500">Useful Links</NavLink></li>
            <li><a href="https://www.cvlkra.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">Check Your KYC</a></li>
            <li><a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">NSE</a></li>
            <li><a href="https://www.bseindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">BSE</a></li>
            <li><a href="https://www.camsonline.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">CAMS</a></li>
            <li><a href="https://www.amfiindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">AMFI</a></li>
            <li><a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">SEBI</a></li>
            <li><a href="https://www.kfintech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">KARVY</a></li>
            <li><a href="https://uidai.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">Download Aadhaar</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        {/* Social Icons Centered */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
            <Facebook size={18} className="fill-white" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-[#FE2992] transition">
            <Instagram size={18} className="fill-white"/>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-gray-800 hover:bg-zinc-900 transition">
          <p className="text-sm px-1.5">𝕏{"  "}</p>
            
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition">
            <Linkedin size={18} className="fill-white" />
          </a>
        </div>

        <p className="text-sm  text-[#E5D7C9]">
          © {new Date().getFullYear()} Trust Point Wealth Partners All rights reserved. Powered by Deltaware Solution Pvt.Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
