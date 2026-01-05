import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from './About'
import { Target, Eye, HeartHandshake } from 'lucide-react' // Icons
import missionImg from '../assets/mission.jpg'
import visionImg from '../assets/vision.webp'
import valuesImg from '../assets/value.avif'

// Example profile images (replace with your actual images)
import directorImg from '../assets/director.jpg'
import managerImg from '../assets/manager.jpg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const AboutUs = () => {
    const leftRef = useRef(null)
    const headingRef = useRef(null)
    const cardsRef = useRef([])
    const profileRef = useRef([])

    useEffect(() => {
        // Animate "OUR APPROACH"
        if (leftRef.current) {
            gsap.fromTo(
                leftRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: 'top 80%',
                    },
                }
            )
        }

        // Animate heading words
        if (headingRef.current) {
            const words = headingRef.current.querySelectorAll('span')
            gsap.fromTo(
                words,
                { y: -40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                    },
                }
            )
        }

        // Animate cards with stagger
        if (cardsRef.current.length > 0) {
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardsRef.current[0],
                        start: 'top 85%',
                    },
                }
            )
        }

        // Animate profiles
        if (profileRef.current.length > 0) {
            gsap.fromTo(
                profileRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: profileRef.current[0],
                        start: 'top 85%',
                    },
                }
            )
        }
    }, [])

    const headingText =
        'Key Features of our finance and consulting'.split(' ')

    const cards = [
        {
            id: 1,
            title: 'Our Mission',
            desc: 'To empower individuals and institutions to achieve their financial goals through professionally managed, transparent, and diversified mutual fund solutions, delivered with integrity and personalized care.',
            img: missionImg,
            icon: <Target className="w-10 h-10 text-green-600 card-icon" />,
        },
        {
            id: 2,
            title: 'Our Vision',
            desc: 'To be the most trusted and innovative mutual fund company, recognized for creating long-term value, fostering financial literacy, and contributing to the financial well-being of every investor.',
            img: visionImg,
            icon: <Eye className="w-10 h-10 text-blue-600 card-icon" />,
        },
        {
            id: 3,
            title: 'Our Core Values',
            desc: 'Integrity, transparency, innovation, and customer-centricity form the foundation of our values, guiding us in building trust and delivering excellence in the management of finance',
            img: valuesImg,
            icon: <HeartHandshake className="w-10 h-10 text-red-600 card-icon" />,
        },
    ]

    const profiles = [
        {
            id: 1,
            name: 'Ad. RK Yadav ',
            role: 'Founder & Director',
            img: directorImg,
            desc: 'Ad. RK Yadav has over 10 years of experience in financial consulting, leading organizations to achieve sustainable growth and client success.',
        },
        
    ]

    return (
        <div className="bg-[#E5D7C9]">
            {/* Hero Section */}
            <div className='w-full flex h-[170px] bg-[#E5D7C9] items-center justify-center'>
                <h1 className='text-5xl mt-13 md:text-6xl font-bold'>
                    About Us
                </h1>
            </div>

            {/* About Component */}
            <About />

            {/* Features Section */}
            <div className='w-full mt-16 px-6  flex flex-col md:flex-row md:items-center md:justify-between'>
                <div className='max-w-2xl space-y-4'>
                    <h4 ref={leftRef} className='text-lg font-semibold text-green-400 tracking-wide'>
                        OUR APPROACH
                    </h4>
                    <h1 ref={headingRef} className='text-4xl md:text-5xl font-bold leading-tight flex flex-wrap gap-2'>
                        {headingText.map((word, index) => (
                            <span key={index} className={`inline-block ${word === 'consulting' ? 'text-green-600' : ''}`}>
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className="mt-6 md:mt-0">
                    <button className="relative bg-green-500 overflow-hidden px-8 py-3 rounded-full font-semibold text-white border border-green-500 group">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-800">
                            Contact Now
                        </span>
                        <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                    </button>
                </div>
            </div>

            {/* Mission, Vision, Values Cards */}
            <div className="mt-20  px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
                    >
                        <div className="mb-4">{card.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">{card.desc}</p>
                        <img src={card.img} alt={card.title} className="md:w-82 h-52 w-52 object-cover rounded-xl shadow-md" />
                    </div>
                ))}
            </div>

            {/* Director Section */}
            <div className='w-full mt-16  px-6 flex flex-col md:flex-row md:items-center md:justify-between'>
                <div className='max-w-2xl space-y-4'>
                    <h4 className='text-lg font-semibold text-gray-600 tracking-wider'>
                        OUR DIRECTOR
                    </h4>
                    <h1 className='text-4xl md:text-5xl font-bold leading-tight flex flex-wrap gap-2'>
                        Meet Our
                        <span className='text-green-500'>Director</span>
                    </h1>
                </div>
                <div className="mt-6 md:mt-0">
                    <button className="relative bg-green-500 overflow-hidden px-8 py-3 rounded-full font-semibold text-white border border-green-500 group">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-800">
                            Contact Now
                        </span>
                        <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                    </button>
                </div>
            </div>

            {/* Director & Manager Profiles */}
            <div className="mt-12 mb-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {profiles.map((profile, index) => (
                    <div
                        key={profile.id}
                        ref={(el) => (profileRef.current[index] = el)}
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={profile.img}
                            alt={profile.name}
                            className="w-52 h-52 rounded-full object-cover mb-4 shadow-md"
                        />
                        <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
                        <p className="text-green-600 font-semibold mb-3">{profile.role}</p>
                        <p className="text-gray-600 text-base max-w-2xs leading-relaxed">{profile.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutUs
