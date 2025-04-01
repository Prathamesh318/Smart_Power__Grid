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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 text-center overflow-hidden relative">
      {/* Mouse Glow Effect */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none z-0 animate-pulse-slow"
      />

      {/* Dynamic Lightning Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
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
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-6 text-3xl font-extrabold shadow-xl relative z-10">
        <div className="flex items-center justify-center gap-3 animate-slide-in-left">
          <FaBolt className="text-yellow-300 animate-spin-slow" />
          Smart Power Grid Analytics
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative bg-cover bg-center h-[600px] flex flex-col items-center justify-center text-white shadow-2xl z-10"
        style={{ backgroundImage: "url('smart-grid.jpg')", backgroundAttachment: "fixed" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent animate-gradient-flow"></div>

        {/* Electric Sparks */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-300 rounded-full opacity-50 animate-spark"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>

        <h1 className="relative z-20 text-5xl md:text-7xl font-extrabold animate-fade-in-down drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-blue-300 to-indigo-300 animate-text-glow">
            Empowering the Future
          </span>
        </h1>
        <p className="relative z-20 text-xl md:text-3xl mt-4 animate-fade-in-up text-gray-100 drop-shadow-md font-medium">
          with AI-Driven Smart Grid Technology
        </p>

        {/* Dashboard Button */}
        <button
          onClick={handleDashboardClick}
          className="relative z-20 mt-10 px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold
            hover:from-blue-700 hover:to-indigo-700 transform hover:scale-110 transition-all duration-500
            shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.9)] animate-bounce-glow group"
        >
          <span className="flex items-center gap-4 text-xl">
            Explore Dashboard
            <svg 
              className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-300 animate-pulse"
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
          </span>
        </button>
      </section>

      {/* Features Section */}
      <div className="container mx-auto py-20 relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-indigo-900 animate-fade-in tracking-tight drop-shadow-md">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {[
            {
              title: "Real-Time Anomaly Detection",
              desc: "Identify faults and cyber threats instantly with cutting-edge AI.",
              icon: <FaBolt className="text-yellow-400 text-5xl" />,
            },
            {
              title: "Energy Demand Forecasting",
              desc: "Predict power consumption trends with unparalleled accuracy.",
              icon: <FaChartLine className="text-teal-500 text-5xl" />,
            },
            {
              title: "Smart Alerts & Insights",
              desc: "Stay ahead with real-time notifications and efficiency tips.",
              icon: <FaBell className="text-orange-500 text-5xl" />,
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] 
                border border-indigo-200/50 transform hover:-translate-y-4 transition-all duration-500
                animate-zoom-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex justify-center mb-6 animate-bounce-slow">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-indigo-900 drop-shadow-sm">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-10 mt-16 text-sm shadow-inner relative z-10">
        <div className="flex justify-center items-center gap-3">
          © 2025 Smart Power Grid Analytics. All rights reserved.
          <FaBolt className="text-yellow-300 animate-pulse" />
        </div>
      </footer>
    </div>
  );
};

// Enhanced styles with dynamic effects
const styles = `
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounceGlow {
    0%, 100% { transform: translateY(0); box-shadow: 0 0 20px rgba(59,130,246,0.6); }
    50% { transform: translateY(-15px); box-shadow: 0 0 35px rgba(59,130,246,0.9); }
  }

  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes spark {
    0% { opacity: 0; transform: scale(0); }
    20% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5) translateY(-30px); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bounceSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes lightningFlash1 {
    0%, 100% { opacity: 0; }
    10%, 30% { opacity: 0.9; }
    20% { opacity: 1; }
    40% { opacity: 0.6; }
  }

  @keyframes lightningFlash2 {
    0%, 100% { opacity: 0; }
    15%, 35% { opacity: 0.8; }
    25% { opacity: 1; }
    45% { opacity: 0.5; }
  }

  @keyframes lightningFlash3 {
    0%, 100% { opacity: 0; }
    20%, 40% { opacity: 0.7; }
    30% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @keyframes lightningShift {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(10px, -5px); }
    50% { transform: translate(-8px, 10px); }
    75% { transform: translate(5px, -8px); }
  }

  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
    50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
  }

  @keyframes pulseSlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.4; }
  }

  .animate-fade-in-down { animation: fadeInDown 1.4s ease-out; }
  .animate-fade-in-up { animation: fadeInUp 1.4s ease-out; }
  .animate-bounce-glow { animation: bounceGlow 3s infinite ease-in-out; }
  .animate-zoom-in { animation: zoomIn 0.9s ease-out; }
  .animate-gradient-flow { animation: gradientFlow 10s ease infinite; background-size: 200% 200%; }
  .animate-spark { animation: spark infinite ease-in-out; }
  .animate-slide-in-left { animation: slideInLeft 1.2s ease-out; }
  .animate-spin-slow { animation: spinSlow 15s linear infinite; }
  .animate-bounce-slow { animation: bounceSlow 2.5s infinite; }
  .animate-lightning-1 { animation: lightningFlash1 4s infinite; }
  .animate-lightning-2 { animation: lightningFlash2 5s infinite; }
  .animate-lightning-3 { animation: lightningFlash3 6s infinite; }
  .animate-lightning-shift { animation: lightningShift 8s infinite ease-in-out; }
  .animate-text-glow { animation: textGlow 3s infinite ease-in-out; }
  .animate-pulse-slow { animation: pulseSlow 5s infinite; }
`;

// Add to your CSS file or <style> tag in index.html
// <style>{styles}</style>

export default HomePage;