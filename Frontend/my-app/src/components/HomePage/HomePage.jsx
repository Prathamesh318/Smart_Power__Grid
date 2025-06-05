import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaChartLine, FaBell } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const glowRef = useRef(null);

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  // Mouse-following glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  
  // Parallax effect on hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white overflow-hidden relative">
      {/* Mouse Glow Effect */}
      <div
        ref={glowRef}
        className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300 ease-out"
      />

      {/* Dynamic Lightning Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full">
          <path
            d="M100,50 L150,100 L120,150 L180,200"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            className="animate-lightning-1 animate-lightning-shift"
          />
          <path
            d="M300,80 L350,130 L320,180 L380,230"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2"
            className="animate-lightning-2 animate-lightning-shift"
          />
          <path
            d="M500,60 L550,110 L520,160 L580,210"
            fill="none"
            stroke="#bfdbfe"
            strokeWidth="2"
            className="animate-lightning-3 animate-lightning-shift"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900/90 to-blue-900/90 backdrop-blur-md py-6 text-3xl font-bold shadow-lg fixed w-full top-0 z-20">
        <div className="flex items-center justify-center gap-3 animate-slide-in-down">
          <FaBolt className="text-cyan-300 animate-glow" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
            Smart Grid Analytics
          </span>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center z-10 pt-20"
        style={{ backgroundImage: "url('smart-grid.jpg')", backgroundAttachment: "fixed" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/50 to-gray-900/80 animate-gradient-flow"></div>

        {/* Electric Sparks */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-cyan-300 rounded-full opacity-60 animate-spark"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1.5}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <h1 className="relative z-20 text-5xl md:text-7xl font-extrabold animate-fade-in-down tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 animate-text-glow">
            Powering Tomorrow
          </span>
        </h1>
        <p className="relative z-20 text-xl md:text-2xl mt-4 animate-fade-in-up font-light text-gray-300 max-w-2xl">
          Harness the future with AI-driven smart grid solutions.
        </p>

        {/* Dashboard Button
        <button
          onClick={handleDashboardClick}
          className="relative z-20 mt-12 px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold
            hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-500
            shadow-xl hover:shadow-[0_0_25px_rgba(103,232,249,0.8)] group overflow-hidden"
        >
          <span className="relative flex items-center gap-3 text-lg">
            <span className="relative z-10">Explore Dashboard</span>
            <svg
              className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </span>
        </button> */}
        {/* Login Button */}
<a href="http://localhost:5000/login"
  
  className="relative z-20 mt-12 px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold
    hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-500
    shadow-xl hover:shadow-[0_0_25px_rgba(103,232,249,0.8)] group overflow-hidden"
>
  <span className="relative flex items-center gap-3 text-lg">
    <span className="relative z-10">Login</span>
    <svg
      className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 z-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
  </span>
</a>

      </section>

      {/* Features Section */}
      <div className="container mx-auto py-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 animate-fade-in">
          Why Smart Grid?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          {[
            {
              title: "Real-Time Detection",
              desc: "Instantly spot anomalies with advanced analytics.",
              icon: <FaBolt className="text-cyan-400 text-4xl" />,
            },
            {
              title: "Demand Forecasting",
              desc: "Predict energy needs with precision and ease.",
              icon: <FaChartLine className="text-purple-400 text-4xl" />,
            },
            {
              title: "Smart Alerts",
              desc: "Get proactive insights and notifications.",
              icon: <FaBell className="text-pink-400 text-4xl" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/30 shadow-lg hover:shadow-[0_0_20px_rgba(103,232,249,0.3)]
                transform hover:-translate-y-2 transition-all duration-500 animate-slide-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-5">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-glow">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900/90 to-gray-900/90 backdrop-blur-md py-8 text-sm shadow-inner relative z-10">
        <div className="flex justify-center items-center gap-3">
          <span className="text-gray-300">© 2025 Smart Grid Analytics</span>
          <FaBolt className="text-cyan-300 animate-glow" />
        </div>
      </footer>

      {/* Inline Styles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
          50% { filter: drop-shadow(0 0 15px currentColor); }
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes spark {
          0% { opacity: 0; transform: scale(0); }
          20% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.2) translateY(-20px); }
        }

        @keyframes lightningFlash1 {
          0%, 100% { opacity: 0; }
          10%, 30% { opacity: 0.8; }
          20% { opacity: 1; }
        }

        @keyframes lightningFlash2 {
          0%, 100% { opacity: 0; }
          15%, 35% { opacity: 0.7; }
          25% { opacity: 1; }
        }

        @keyframes lightningFlash3 {
          0%, 100% { opacity: 0; }
          20%, 40% { opacity: 0.6; }
          30% { opacity: 1; }
        }

        @keyframes lightningShift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -4px); }
          50% { transform: translate(-6px, 8px); }
          75% { transform: translate(4px, -6px); }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(103, 232, 249, 0.8), 0 0 30px rgba(147, 197, 253, 0.6); }
        }

        .animate-fade-in-down { animation: fadeInDown 1.2s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1.2s ease-out; }
        .animate-slide-in-down { animation: slideInDown 1s ease-out; }
        .animate-slide-in-up { animation: slideInUp 1s ease-out; }
        .animate-glow { animation: glow 2s infinite ease-in-out; }
        .animate-gradient-flow { animation: gradientFlow 12s ease infinite; background-size: 200% 200%; }
        .animate-spark { animation: spark infinite ease-in-out; }
        .animate-lightning-1 { animation: lightningFlash1 3.5s infinite; }
        .animate-lightning-2 { animation: lightningFlash2 4.5s infinite; }
        .animate-lightning-3 { animation: lightningFlash3 5.5s infinite; }
        .animate-lightning-shift { animation: lightningShift 7s infinite ease-in-out; }
        .animate-text-glow { animation: textGlow 2.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default HomePage;