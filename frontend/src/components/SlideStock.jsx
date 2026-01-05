import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// List of stocks/indices to show with fixed values
const stockList = [
  { name: "Nifty 50", price: 21500, change: "+0.45%" },
  { name: "Nifty Bank", price: 45500, change: "-0.12%" },
  { name: "Finnifty", price: 20500, change: "+0.20%" },
  { name: "Sensex", price: 71500, change: "+0.30%" },
  { name: "BSE Bankex", price: 51000, change: "-0.10%" },
  { name: "Gift Nifty", price: 21600, change: "+0.15%" },
  { name: "Reliance", price: 2650, change: "+1.10%" },
  { name: "Tata Motors", price: 720, change: "-0.50%" },
  { name: "Axis Bank", price: 1100, change: "+0.80%" },
  { name: "IRCTC", price: 900, change: "-0.25%" },
  { name: "Apple", price: 195, change: "+0.90%" },
  { name: "Google", price: 2850, change: "-0.40%" },
  { name: "Amazon", price: 3500, change: "+0.60%" },
  { name: "Tesla", price: 800, change: "-1.20%" },
  { name: "Microsoft", price: 320, change: "+0.70%" },
];


const SlideStock = () => {
  const tickerRef = useRef(null);
  const tweenRef = useRef(null);
  // Use fixed values, no API fetching
  const [stocks] = useState(stockList);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let raf = requestAnimationFrame(() => {
      const tickerWidth = ticker.scrollWidth / 2;
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      tweenRef.current = gsap.to(ticker, {
        x: -tickerWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x)}px`,
        },
      });
      const handleEnter = () => tweenRef.current && tweenRef.current.pause();
      const handleLeave = () => tweenRef.current && tweenRef.current.resume();
      ticker.addEventListener("mouseenter", handleEnter);
      ticker.addEventListener("mouseleave", handleLeave);
      return () => {
        ticker.removeEventListener("mouseenter", handleEnter);
        ticker.removeEventListener("mouseleave", handleLeave);
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }
      };
    });
    return () => cancelAnimationFrame(raf);
  }, [stocks]);

  return (
    <div className="w-full bg-[#111C2E] py-3 overflow-hidden">
      <div className="relative flex w-max" ref={tickerRef}>
        {/* Stocks duplicated for seamless loop */}
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 px-6 py-2 bg-white shadow mx-2 rounded-lg min-w-[200px]"
          >
            <span className="font-semibold text-gray-800">{stock.name}</span>
            <span className="text-gray-600">{stock.price !== undefined ? `₹${stock.price}` : '--'}</span>
            <span
              className={`font-bold ${typeof stock.change === 'string' && stock.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
            >
              {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideStock;
