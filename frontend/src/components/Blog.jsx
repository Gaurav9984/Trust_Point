import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ai from '../assets/ai.jpg';
import green from '../assets/green.png';
import global from '../assets/global.jpeg';
import bitcoin from '../assets/bitcoin.jpg';
import form from '../assets/form.jpg';
import mutual from '../assets/mutual.jpeg';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: "The Rise of Mutual Funds in 2025",
    date: "August 10, 2025",
    image: mutual,
    content: "Mutual funds are becoming more popular as investors seek diversified portfolios with lower risks. Learn how they can benefit your financial journey.",
    link: "#",
  },
  {
    id: 2,
    title: "Global Markets: Key Trends You Should Know",
    date: "August 8, 2025",
    image: global,
    content: "The global market is shifting due to inflation, interest rates, and tech disruption. Here's what investors should watch in the coming months.",
    link: "#",
  },
  {
    id: 3,
    title: "AI & Machine Learning in Finance",
    date: "August 5, 2025",
    image: ai,
    content: "AI and ML are revolutionizing the financial industry, from fraud detection to smart investment advice. Discover how these technologies shape the future.",
    link: "#",
  },
  {
    id: 4,
    title: "Farming Investments: A Growing Opportunity",
    date: "August 2, 2025",
    image: form,
    content: "Agricultural investments are on the rise as sustainable farming practices gain global attention. Explore the potential of farming in financial growth.",
    link: "#",
  },
  {
    id: 5,
    title: "Cryptocurrency: Beyond Bitcoin",
    date: "July 30, 2025",
    image: bitcoin,
    content: "While Bitcoin remains dominant, new cryptocurrencies and blockchain applications are reshaping the digital economy. Here's what's next in crypto.",
    link: "#",
  },
  {
    id: 6,
    title: "Green Energy Investments for the Future",
    date: "July 25, 2025",
    image: green,
    content: "Sustainable energy investments are growing rapidly as the world moves towards renewable power sources. Find out why green energy is the next big thing.",
    link: "#",
  },
];

const Blog = () => {
  const headingRef = useRef(null);
  const postsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      });

      // Animate posts on scroll
      postsRef.current.forEach((post, index) => {
        if (post) {
          gsap.fromTo(post, 
            {
              opacity: 0,
              y: 50,
            },
            {
              scrollTrigger: {
                trigger: post,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
                // Uncomment for debugging
                // markers: true,
              },
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.1, // Stagger effect
            }
          );
        }
      });

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      // Cleanup all ScrollTrigger instances and animations
      ctx.revert();
    };
  }, []); // Keep empty dependency array

  // Optional: Add a method to manually refresh if needed
  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  return (
    <div ref={containerRef} className="bg-[#111C2E] px-6 md:px-16 py-12 ">
      {/* Heading */}
      <div className="mb-12 md:text-center" ref={headingRef}>
        <h4 className="text-lg font-semibold text-[#E5D7C9] tracking-wider">
          BLOG/POST
        </h4>
        <h1 className="text-3xl md:text-5xl text-[#E5D7C9] font-semibold">
          Finance insights, updates{" "}
          <span className="text-green-600">and trends</span>
        </h1>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#111C2E]">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => {
              if (el) postsRef.current[index] = el;
            }}
            className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full sm:w-1/2 h-56 object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl mt-6 ml-3"
            />

            {/* Content */}
            <div className="p-5 flex flex-col justify-between sm:w-1/2">
              <div>
                <p className="text-sm text-gray-500">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-2 group-hover:text-green-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
              </div>
              <a
                href={post.link}
                className="mt-4 inline-block text-green-600 font-medium hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  // Add your navigation logic here
                }}
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Blog;