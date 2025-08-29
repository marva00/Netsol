import React, { useState } from "react";
import "./CustomerDashboard.css";
import { useNavigate } from "react-router-dom";

import { Input } from "antd";  // import Ant Design Input

function CustomerDashboard() {
  const [active, setActive] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [booking, setBooking] = useState({
    pickup: "",
    destination: "",
    transportMode: "Truck",
    productType: "Fragile",
    weight: "",
    dimensionType: "Small",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    dispatcherEmail: "",
    distanceKm: "",
    distanceCost: 0,
    totalCost: 0,
  });

  // Approx coordinates for major cities
  const cityCoords = {
    Karachi: { lat: 24.8607, lon: 67.0011 },
    Lahore: { lat: 31.5204, lon: 74.3587 },
    Islamabad: { lat: 33.6844, lon: 73.0479 },
    Multan: { lat: 30.1575, lon: 71.5249 },
    Hyderabad: { lat: 25.396, lon: 68.3578 },
  };

  const toRad = (d) => (d * Math.PI) / 180;
  const computeDistanceBetween = (from, to) => {
    const a = cityCoords[from];
    const b = cityCoords[to];
    if (!a || !b) return 0;
    const R = 6371; // km
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const hav =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return Math.round(R * c);
  };

  const getRatePerKm = (mode) => (mode === "Train" ? 80 : 120);
  const getPerKgSurcharge = (mode) => (mode === "Train" ? 4 : 6);
  const minimumFare = 500; // PKR

  // ✅ Unified fare recalculation
  const recalcFare = (partial = {}) => {
    const next = { ...booking, ...partial };

    // 1. Compute distance if both cities selected
    let distance = next.distanceKm;
    if (next.pickup && next.destination) {
      distance = computeDistanceBetween(next.pickup, next.destination);
    }

    // 2. Other values
    const weight = parseFloat(next.weight) || 0;
    const rate = getRatePerKm(next.transportMode);
    const perKg = getPerKgSurcharge(next.transportMode);

    // 3. Costs
    const distanceCost = distance ? Math.round(distance * rate) : 0;
    const weightCost = weight ? Math.round(weight * perKg) : 0;
    const totalCost =
      distance > 0 ? Math.max(distanceCost + weightCost, minimumFare) : 0;

    // 4. Update state
    setBooking({
      ...next,
      distanceKm: distance,
      distanceCost,
      totalCost,
    });
  };

  const customerName = "Alex Johnson";
  const kpis = [
    { label: "Total Bookings", value: 42 },
    { label: "Delivered", value: 37 },
    { label: "Pending", value: 2 },
  ];

  const ongoing = [
    { id: 1, from: "Karachi", to: "Lahore", mode: "Truck", status: "In Transit" },
    { id: 2, from: "Islamabad", to: "Multan", mode: "Train", status: "Pending" },
  ];

  const history = [
    { id: 11, date: "2025-01-10", from: "Karachi", to: "Hyderabad", mode: "Truck", status: "Delivered", cost: 5400 },
    { id: 12, date: "2025-01-05", from: "Lahore", to: "Islamabad", mode: "Train", status: "Delivered", cost: 3200 },
  ];

  const notifications = [
    "Your parcel #GD-1021 has been dispatched.",
    "Delivery #GD-0987 is out for delivery.",
  ];

  // User Icon SVG
  const UserIcon = () => (
    <svg className="profile-icon" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );

  // Hamburger Menu Component
  const HamburgerMenu = () => (
    <button 
      className="hamburger-btn"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );

  const DashboardView = () => (
    <div className="content-container">
      <div className="content-header">
        <div className="page-title">Dashboard</div>
        <div className="page-subtitle">Welcome back, {customerName}</div>
      </div>

      <div className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Ongoing Deliveries</h3>
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ongoing.map((o) => (
                <tr key={o.id} className="table-row">
                  <td className="table-cell">{o.from}</td>
                  <td className="table-cell">{o.to}</td>
                  <td className="table-cell">{o.mode}</td>
                  <td className="table-cell">
                    <span className={`status ${o.status === 'Pending' ? 's-pending' : o.status === 'In Transit' ? 's-transit' : 's-delivered'}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BookingView = () => (
    <div className="content-container">
      <div className="content-header">
        <div className="page-title">New Booking</div>
        <div className="page-subtitle">Create a new delivery request</div>
      </div>

      <div className="card">
        <div className="form-section-title">Route</div>
        <div className="form-grid-2">
          <select className="form-select" value={booking.pickup} onChange={(e) => recalcFare({ pickup: e.target.value })}>
            <option value="">Pickup City</option>
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Multan</option>
            <option>Hyderabad</option>
          </select>
          <select className="form-select" value={booking.destination} onChange={(e) => recalcFare({ destination: e.target.value })}>
            <option value="">Destination City</option>
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Multan</option>
            <option>Hyderabad</option>
          </select>
        </div>

        <div className="form-section-title">Shipment Details</div>
        <div className="form-grid-3">
          <select className="form-select" value={booking.transportMode} onChange={(e) => recalcFare({ transportMode: e.target.value })}>
            <option>Truck</option>
            <option>Train</option>
          </select>
          <select className="form-select" value={booking.productType} onChange={(e) => setBooking({ ...booking, productType: e.target.value })}>
            <option>Fragile</option>
            <option>Bulk</option>
            <option>Standard</option>
          </select>
          <input className="form-field" placeholder="Weight (kg)" value={booking.weight} onChange={(e) => recalcFare({ weight: e.target.value })} />
        </div>
        <div className="form-grid-2" style={{ marginTop: 12 }}>
          <select className="form-select" value={booking.dimensionType} onChange={(e) => setBooking({ ...booking, dimensionType: e.target.value })}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Custom</option>
          </select>
        </div>
        {booking.dimensionType === 'Custom' && (
          <div className="form-grid-3" style={{ marginTop: 12 }}>
            <input className="form-field" placeholder="Length (cm)" value={booking.lengthCm} onChange={(e) => setBooking({ ...booking, lengthCm: e.target.value })} />
            <input className="form-field" placeholder="Width (cm)" value={booking.widthCm} onChange={(e) => setBooking({ ...booking, widthCm: e.target.value })} />
            <input className="form-field" placeholder="Height (cm)" value={booking.heightCm} onChange={(e) => setBooking({ ...booking, heightCm: e.target.value })} />
          </div>
        )}
        
        <div className="form-section-title">Contact Info</div>
        <div className="form-grid-3">
          <input className="form-field" placeholder="Contact Name" value={booking.contactName} onChange={(e) => setBooking({ ...booking, contactName: e.target.value })} />
          <input className="form-field" placeholder="Phone Number" value={booking.contactPhone} onChange={(e) => setBooking({ ...booking, contactPhone: e.target.value })} />
          <input className="form-field" placeholder="Email" value={booking.contactEmail} onChange={(e) => setBooking({ ...booking, contactEmail: e.target.value })} />
        </div>

        <div className="form-section-title">Assign Dispatcher</div>
        <input
          className="form-field"
          placeholder="Select Dispatcher Email"
          value={booking.dispatcherEmail || ""}
          onChange={(e) =>
            setBooking({ ...booking, dispatcherEmail: e.target.value })
          }
        />

        <div className="form-section-title">Fare Calculator</div>
        {booking.distanceKm > 0 ? (
          <div className="fare-display">
            <div className="fare-item">
              <span>Distance:</span>
              <span>{booking.distanceKm} km</span>
            </div>
            <div className="fare-item">
              <span>Rate per km:</span>
              <span>PKR {getRatePerKm(booking.transportMode)}</span>
            </div>
            <div className="fare-item total">
              <span>Total Cost:</span>
              <span>PKR {booking.totalCost.toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div className="form-grid-3">
            <input className="form-field" placeholder="Distance (km)" value={booking.distanceKm} disabled />
            <input className="form-field" placeholder="Distance Cost (PKR)" value={booking.distanceCost} disabled />
            <input className="form-field" placeholder="Total (PKR)" value={booking.totalCost} disabled />
          </div>
        )}

        <div className="form-section-title">Schedule Booking</div>
        <div className="form-grid-2">
          <input type="date" className="form-field" placeholder="Start Date" value={booking.startDate || ""} onChange={(e) => setBooking({ ...booking, startDate: e.target.value })} />
          <input type="date" className="form-field" placeholder="End Date" value={booking.endDate || ""} onChange={(e) => setBooking({ ...booking, endDate: e.target.value })} />
        </div>

        <div className="actions-row" style={{ marginTop: 24 }}>
          <button 
            className="primary" 
            onClick={() => alert("Your booking is placed")}
          >
            Place Booking
          </button>
        </div>
      </div>
    </div>
  );

  const TrackView = () => {
    const [trackingId, setTrackingId] = useState("");
    const [trackingResult, setTrackingResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
      if (!trackingId.trim()) return;
      
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        setTrackingResult({
          id: trackingId,
          status: "In Transit",
          from: "Karachi",
          to: "Lahore",
          estimatedDelivery: "2025-01-28",
          currentLocation: "Multan Hub",
          timeline: [
            { date: "2025-01-25", time: "09:00", status: "Order Placed", location: "Karachi" },
            { date: "2025-01-25", time: "14:30", status: "Picked Up", location: "Karachi Warehouse" },
            { date: "2025-01-26", time: "08:15", status: "In Transit", location: "Multan Hub", current: true },
            { date: "2025-01-28", time: "Expected", status: "Out for Delivery", location: "Lahore", pending: true }
          ]
        });
        setIsSearching(false);
      }, 1500);
    };

    return (
      <div className="content">
        <div className="dash-header">
          <div>
            <div className="dash-title">Track Orders</div>
            <div className="dash-subtitle">Search and monitor your shipments</div>
          </div>
        </div>
        
        <div className="card">
          <div className="form-grid-2">
            <input 
              className="form-field" 
              placeholder="Enter Tracking ID (e.g., GD-1201)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="primary" 
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Track Order"}
            </button>
          </div>
        </div>

        {trackingResult && (
          <div className="card">
            <h3>Tracking Results</h3>
            <div className="tracking-info">
              <div className="tracking-header">
                <div className="tracking-id">#{trackingResult.id}</div>
                <div className={`status s-${trackingResult.status.toLowerCase().replace(' ', '-')}`}>
                  {trackingResult.status}
                </div>
              </div>
              <div className="route-info">
                <span>{trackingResult.from} → {trackingResult.to}</span>
                <span className="estimated">Est. Delivery: {trackingResult.estimatedDelivery}</span>
              </div>
            </div>

            <div className="tracking-timeline">
              <h4>Shipment Timeline</h4>
              <div className="timeline">
                {trackingResult.timeline.map((item, index) => (
                  <div key={index} className={`timeline-item ${item.current ? 'current' : ''} ${item.pending ? 'pending' : ''}`}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-status">{item.status}</div>
                      <div className="timeline-location">{item.location}</div>
                      <div className="timeline-time">{item.date} {item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  navigate("/login");   // send user back to login
};


  const HistoryView = () => (
    <div className="content-container">
      <div className="content-header">
        <div className="page-title">Booking History</div>
        <div className="page-subtitle">View all your past deliveries</div>
      </div>
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="table-row">
                  <td className="table-cell">{h.date}</td>
                  <td className="table-cell">{h.from}</td>
                  <td className="table-cell">{h.to}</td>
                  <td className="table-cell">{h.mode}</td>
                  <td className="table-cell"><span className={`status ${h.status === 'Delivered' ? 's-delivered' : 's-pending'}`}>{h.status}</span></td>
                  <td className="table-cell">PKR {h.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <HamburgerMenu />
         <div className="logo-container">
            <img src="/assets/GoDeliver.png" alt="GoDeliver" className="logo" />
            <span className="logo-text">GoDeliver</span>
          </div>
        </div>
        <div className="header-right">
          <div className="notification-container">
            <button
              className="notification-bell"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            {showNotifications && (
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                <ul className="notif-list">
                  {notifications.map((n, i) => (
                    <li key={i} className="notif">{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="driver-profile">
            <div className="profile-pic">
              <UserIcon />
            </div>
            <span className="driver-name">{customerName}</span>
          </div>
        </div>
      </header>


      {/* Dashboard Body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button 
              className={`nav-button ${active === 'dashboard' ? 'active' : ''}`} 
              onClick={() => {setActive('dashboard'); setSidebarOpen(false);}}
            >Dashboard
            </button>
            <button 
              className={`nav-button ${active === 'booking' ? 'active' : ''}`} 
              onClick={() => {setActive('booking'); setSidebarOpen(false);}}
            >New Booking
            </button>
            <button 
              className={`nav-button ${active === 'track' ? 'active' : ''}`} 
              onClick={() => {setActive('track'); setSidebarOpen(false);}}
            >Track Orders
            </button>
            <button 
              className={`nav-button ${active === 'history' ? 'active' : ''}`} 
              onClick={() => {setActive('history'); setSidebarOpen(false);}}
            >History
            </button>
            <button 
           className="nav-button logout" 
            onClick={handleLogout}
           >
            Logout
          </button>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {active === 'dashboard' && <DashboardView />}
          {active === 'booking' && <BookingView />}
          {active === 'track' && <TrackView />}
          {active === 'history' && <HistoryView />}
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;