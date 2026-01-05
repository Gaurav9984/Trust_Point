import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";

const Banks = () => {
    const images = [
        { id: 1, src: img1, alt: "Finance 1" },
        { id: 2, src: img2, alt: "Finance 2" },
        { id: 3, src: img3, alt: "Finance 3" },
        { id: 4, src: img4, alt: "Finance 4" },
        { id: 5, src: img5, alt: "Finance 5" },
        { id: 6, src: img6, alt: "Finance 6" },
        { id: 7, src: img7, alt: "Finance 7" },
        { id: 8, src: img8, alt: "Finance 8" },
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const slides = containerRef.current.children;

        // Create GSAP timeline
        const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1, ease: "power2.inOut" } });

        // Each set of 3 slides moves left
        for (let i = 0; i < slides.length - 3; i++) {
            tl.to(containerRef.current, { x: -(i + 1) * 100 + "%", delay: 2 }); // shift container left
        }
    }, []);

    return (
        <div className="overflow-hidden w-full mt-10">
            <div
                ref={containerRef}
                className="flex w-[800%]" // 8 images = 800%
            >
                {images.map((image) => (
                    <div key={image.id} className="w-full flex-shrink-0 p-2">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-42 h-32 object-cover rounded-xl shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banks;
