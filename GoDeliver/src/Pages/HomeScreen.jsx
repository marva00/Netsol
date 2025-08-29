import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

function HomeScreen() {
  const [quickQuote, setQuickQuote] = useState({
    pickup: "",
    destination: "",
    mode: "truck",
    weight: ""
  });
  const [quickEstimate, setQuickEstimate] = useState(null);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [cities, setCities] = useState([]);
  const [activeNav, setActiveNav] = useState("");

  const features = [
    {
      icon: "💻",
      title: "Easy Online Booking",
      description: "Customers can book deliveries quickly with just a few clicks."
    },
    {
      icon: "📍",
      title: "Real-Time Tracking",
      description: "Track your truck and packages live on the map."
    },
    {
      icon: "👥",
      title: "Multiple User Dashboards",
      description: "Separate panels for Customers, Admin, and Drivers."
    },
    {
      icon: "🔒",
      title: "Secure Online Payments",
      description: "Safe and fast digital transactions."
    },
    {
      icon: "⚡",
      title: "Fast & Reliable Delivery",
      description: "Guaranteed on-time pickup and drop-off."
    },
    {
      icon: "🧮",
      title: "Automated Fare Calculation",
      description: "Get instant price estimates based on distance & weight."
    }
  ];

  useEffect(() => {
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.dataset.index);
              if (!isNaN(index)) {
                setTimeout(() => {
                  setVisibleFeatures(prev => [...new Set([...prev, index])]);
                }, index * 150); // Staggered animation
              }
            }
          });
        },
        { threshold: 0.2, rootMargin: '50px' }
      );

      const featureElements = document.querySelectorAll('.feature-card');
      if (featureElements.length > 0) {
        featureElements.forEach((el) => observer.observe(el));
      }

      return observer;
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = setupObserver();
      
      return () => {
        if (observer) observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Set active nav based on current hash and keep in sync on hash change
  useEffect(() => {
    const deriveActiveFromHash = () => {
      const hash = window.location.hash || "";
      const clean = hash.startsWith("#") ? hash.slice(1) : hash;
      if (["ship-parcel", "track", "get-quote", "login", "signup"].includes(clean)) {
        setActiveNav(clean);
      }
    };
    deriveActiveFromHash();
    window.addEventListener("hashchange", deriveActiveFromHash);
    return () => window.removeEventListener("hashchange", deriveActiveFromHash);
  }, []);

  // Fetch Pakistan cities for dropdowns
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/data/pk-cities.json');
        if (!response.ok) throw new Error('Failed to load cities');
        const data = await response.json();
        setCities(Array.isArray(data) ? data.sort() : []);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      }
    };
    fetchCities();
  }, []);

  const handleQuickQuoteChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...quickQuote, [name]: value };
    setQuickQuote(updatedForm);

    // Auto-calc if all filled
    if (
      updatedForm.pickup &&
      updatedForm.destination &&
      updatedForm.weight &&
      parseFloat(updatedForm.weight) > 0
    ) {
      const weight = parseFloat(updatedForm.weight);
      const baseRate = updatedForm.mode === "truck" ? 15 : 8;
      const estimate = Math.round(baseRate * weight * 1.5);
      setQuickEstimate(estimate);
    } else {
      setQuickEstimate(null);
    }
  };

  return (
    <div className="homescreen">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src="/assets/GoDeliver.png" alt="GoDeliver" className="logo" />
          <span className="logo-text">GoDeliver</span>
        </div>

        <nav className="navbar">
        
          <a
            href="#get-quote"
            className={`nav-link ${activeNav === 'get-quote' ? 'active' : ''}`}
            onClick={() => setActiveNav('get-quote')}
          >
            Fare Calculator
          </a>
          <Link
            to="/login"
            className={`nav-link ${activeNav === 'login' ? 'active' : ''}`}
            onClick={() => setActiveNav('login')}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`nav-link ${activeNav === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveNav('signup')}
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">
              Your Journey Starts <br /> with GoDeliver.
            </h1>
              <button className="get-started-btn" type="button" onClick={() => window.location.href = "http://localhost:5176/login"}>
  <span aria-hidden></span>
  <span>Get Started</span>
</button>
          </div>
          <div className="truck-container">
            <img
              src="/assets/Truck_animation.gif"
              alt="Delivery Truck"
              className="truck-image"
            />
          </div>
        </div>
      </section>

      {/* Quick Quote */}
      <section className="quick-quote-section" id="get-quote">
        <div className="quick-quote-container">
          <h2 className="quick-quote-title">Get Instant Quote</h2>
          <div className="quick-quote-form">
            <div className="quote-inputs">
              <select
                name="pickup"
                value={quickQuote.pickup}
                onChange={handleQuickQuoteChange}
                className="quote-select"
              >
                <option value="">Pickup City</option>
                {cities.map((city) => (
                  <option key={`pickup-${city}`} value={city}>{city}</option>
                ))}
              </select>
              <select
                name="destination"
                value={quickQuote.destination}
                onChange={handleQuickQuoteChange}
                className="quote-select"
              >
                <option value="">Destination City</option>
                {cities.map((city) => (
                  <option key={`dest-${city}`} value={city}>{city}</option>
                ))}
              </select>
              <select
                name="mode"
                value={quickQuote.mode}
                onChange={handleQuickQuoteChange}
                className="quote-select"
              >
                <option value="truck">🚛 Truck</option>
                <option value="train">🚂 Train</option>
              </select>
              <input
                type="number"
                name="weight"
                value={quickQuote.weight}
                onChange={handleQuickQuoteChange}
                placeholder="Weight (kg)"
                className="quote-input"
                min="0.1"
                step="0.1"
              />
            </div>

            {quickEstimate ? (
              <div className="quick-result">
                <span className="estimate-label">Estimated Cost:</span>
                <span className="estimate-amount">
                  PKR {quickEstimate.toLocaleString()}
                </span>
              
              </div>
            ) : (
              <div className="quote-placeholder">
                <span>Fill all fields for instant quote</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Key Features for Your Delivery Website</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${visibleFeatures.includes(index) ? 'visible' : ''}`}
                data-index={index}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;

// HashLink : react-router-hash-link