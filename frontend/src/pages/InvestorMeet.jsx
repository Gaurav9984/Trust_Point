import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.avif";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img1.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.avif";
import img9 from "../assets/img9.jpg";

const InvestorMeet = () => {
  const gallery = [
    {
      id: 1,
      title: "MFD Meeting",
      date: "05/12/2025",
      location: "Jaipur",
      images: [img1, img2, img3],
    },
    {
      id: 2,
      title: "MFD Meeting",
      date: "15/01/2026",
      location: "Delhi",
      images: [img4, img5, img6],
    },
    {
      id: 3,
      title: "MFD Meeting",
      date: "20/02/2026",
      location: "Mumbai",
      images: [img7, img8, img9],
    },
  ];

  const [filterCity, setFilterCity] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const headerRef = useRef(null);
  const filterRefs = useRef([]);
  const galleryRefs = useRef([]);

  const cities = ["All", ...new Set(gallery.map((event) => event.location))];
  const years = ["All", ...new Set(gallery.map((event) => event.date.split("/")[2]))];

  const filteredEvents = gallery.filter((event) => {
    const eventYear = event.date.split("/")[2];

    const matchesCity = filterCity === "All" || event.location === filterCity;
    const matchesYear = filterYear === "All" || eventYear === filterYear;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.date.includes(searchTerm);

    return matchesCity && matchesYear && matchesSearch;
  });

  // 🔥 Animate header + filters on mount
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      filterRefs.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  // 🔥 Animate gallery items when filteredEvents changes
  useEffect(() => {
    if (galleryRefs.current.length) {
      gsap.fromTo(
        galleryRefs.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
      );
    }
  }, [filteredEvents]);

  return (
    <div className="w-full">
      {/* Header */}
      <div
        ref={headerRef}
        className="w-full flex h-[200px] bg-[] items-center justify-center"
      >
        <h1 className="text-green-600 text-5xl md:text-6xl mt-15 font-bold">
          Investor Meet Gallery
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row  justify-center items-center gap-4 my-6 px-4">
        {/* City Filter */}
        <select
          ref={(el) => (filterRefs.current[0] = el)}
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="px-4 py-2 border bg-white rounded-lg shadow-sm"
        >
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          ref={(el) => (filterRefs.current[1] = el)}
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-4 py-2 bg-white border rounded-lg shadow-sm"
        >
          {years.map((year, idx) => (
            <option key={idx} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          ref={(el) => (filterRefs.current[2] = el)}
          type="text"
          placeholder="Search by title, city, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border bg-white rounded-lg shadow-sm w-full md:w-64"
        />
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="mb-12">
              {/* Event Info */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {event.date} • {event.location}
                </p>
              </div>

              {/* Event Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.images.map((img, index) => (
                  <img
                    ref={(el) => (galleryRefs.current[index] = el)}
                    key={index}
                    src={img}
                    alt={`${event.location}-${index}`}
                    className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorMeet;
