// DriverDashboard.jsx
import React, { useState } from 'react';
import './DriverDashboard.css';
import { useNavigate } from "react-router-dom";

// Simple icon components
const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
    <circle cx="12" cy="16" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
  </svg>
);

const Bell = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const BarChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Truck = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Simple Pie Chart Component
const PieChart = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const createSlice = (percentage, cumulativePercentage, color) => {
    const x1 = Math.cos(2 * Math.PI * cumulativePercentage);
    const y1 = Math.sin(2 * Math.PI * cumulativePercentage);
    const x2 = Math.cos(2 * Math.PI * (cumulativePercentage + percentage));
    const y2 = Math.sin(2 * Math.PI * (cumulativePercentage + percentage));
    const largeArc = percentage > 0.5 ? 1 : 0;

    return `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="pie-chart-container">
      <svg width={size} height={size} viewBox="-1 -1 2 2" className="pie-chart">
        {data.map((item, index) => {
          const percentage = item.value / total;
          const slice = createSlice(percentage, cumulativePercentage, item.color);
          cumulativePercentage += percentage;
          
          return (
            <path
              key={index}
              d={slice}
              fill={item.color}
              stroke="white"
              strokeWidth="0.02"
            />
          );
        })}
      </svg>
      <div className="pie-chart-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span 
              className="legend-color" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-label">{item.label}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DriverDashboard = () => {
  const navigate = useNavigate();
  
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      pickup: "Karachi",
      destination: "Hyderabad", 
      customer: "Alex",
      status: "in_transit",
      notes: "Fragile",
      priority: "normal"
    },
    {
      id: 2,
      pickup: "Lahore",
      destination: "Multan",
      customer: "Fatima",
      status: "scheduled", 
      notes: "Keep upright",
      priority: "normal"
    },
    {
      id: 3,
      pickup: "Islamabad",
      destination: "Rawalpindi",
      customer: "Ahmed",
      status: "pending",
      notes: "Handle with care",
      priority: "urgent"
    }
  ]);

  const [notifications] = useState([
    { 
      id: 1, 
      message: "Traffic alert: Heavy congestion on GT Road between Lahore and Multan", 
      type: "warning", 
      time: "15 min ago" 
    },
    { 
      id: 2, 
      message: "Customer Alex updated delivery instructions for Karachi-Hyderabad route", 
      type: "info", 
      time: "30 min ago" 
    },
    { 
      id: 3, 
      message: "Weather update: Light rain expected in Islamabad area", 
      type: "info", 
      time: "1 hour ago" 
    }
  ]);

  const [driverInfo, setDriverInfo] = useState({
    name: "Muhammad Hassan",
    vehicleId: "PAK-TRK-001",
    phone: "+92 300 1234567",
    password: "••••••••",
    rating: 4.5,
    totalDeliveries: 156,
    onTimeDeliveries: 142
  });

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "customer", name: "Alex", message: "Hi, when will my package arrive?", time: "10:30 AM" },
    { id: 2, sender: "driver", name: "You", message: "Hello Alex! I'm currently 20 minutes away from your location.", time: "10:32 AM" },
    { id: 3, sender: "customer", name: "Fatima", message: "Please handle with care, it's fragile items.", time: "11:15 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState('deliveries');
  const [editingProfile, setEditingProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Analytics data
  const performanceData = [
    { label: "On Time", value: driverInfo.onTimeDeliveries, color: "#10b981" },
    { label: "Late", value: driverInfo.totalDeliveries - driverInfo.onTimeDeliveries, color: "#ef4444" }
  ];

  const ratingData = [
    { label: "5 Stars", value: 45, color: "#10b981" },
    { label: "4 Stars", value: 30, color: "#84cc16" },
    { label: "3 Stars", value: 15, color: "#eab308" },
    { label: "2 Stars", value: 7, color: "#f97316" },
    { label: "1 Star", value: 3, color: "#ef4444" }
  ];

  // Functions
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: newStatus }
        : delivery
    ));
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: "driver",
        name: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const statusOptions = [
    'pending',
    'scheduled', 
    'in_transit',
    'delivered',
    'cancelled'
  ];

  const handleSaveProfile = () => {
    setEditingProfile(false);
    console.log('Profile saved:', driverInfo);
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle tab change and close sidebar on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="top-header">
        <div className="header-left">
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <div className="logo-container">
            <img src="/assets/GoDeliver.png" alt="GoDeliver" className="logo" />
            <span className="logo-text">GoDeliver</span>
          </div>
        </div>
        <div className="header-right">
          <div className="driver-profile">
            <div className="profile-pic">
              <User className="profile-icon" />
            </div>
            <span className="driver-name">{driverInfo.name}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button 
              onClick={() => handleTabChange('deliveries')}
              className={`nav-button ${activeTab === 'deliveries' ? 'active' : ''}`}
            >
              <Truck className="nav-icon" />
              My Deliveries
            </button>
            
            <button 
              onClick={() => handleTabChange('chat')}
              className={`nav-button ${activeTab === 'chat' ? 'active' : ''}`}
            >
              <MessageCircle className="nav-icon" />
              Customer Chat
            </button>
            
            <button 
              onClick={() => handleTabChange('analytics')}
              className={`nav-button ${activeTab === 'analytics' ? 'active' : ''}`}
            >
              <BarChart className="nav-icon" />
              Analytics
            </button>
            
            <button 
              onClick={() => handleTabChange('notifications')}
              className={`nav-button ${activeTab === 'notifications' ? 'active' : ''}`}
            >
              <Bell className="nav-icon" />
              Notifications
            </button>
            
            <button 
              onClick={() => handleTabChange('profile')}
              className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <User className="nav-icon" />
              Profile 
            </button>

            <button 
              className="nav-button logout" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          
          {/* My Deliveries Tab */}
          {activeTab === 'deliveries' && (
            <div className="content-container">
              <div className="content-header">
                <h2 className="page-title">My Deliveries</h2>
                <p className="page-subtitle">Assigned tasks and status updates</p>
              </div>
              
              <div className="table-container">
                <table className="delivery-table">
                  <thead className="table-header">
                    <tr>
                      <th>Pickup</th>
                      <th>Destination</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id} className="table-row">
                        <td className="table-cell">{delivery.pickup}</td>
                        <td className="table-cell">{delivery.destination}</td>
                        <td className="table-cell">{delivery.customer}</td>
                        <td className="table-cell">
                          <select 
                            value={delivery.status}
                            onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                            className="status-select"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="table-cell">{delivery.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Customer Chat Tab */}
          {activeTab === 'chat' && (
            <div className="content-container">
              <div className="content-header">
                <h2 className="page-title">Customer Chat</h2>
                <p className="page-subtitle">Communicate with your customers</p>
              </div>
              
              <div className="chat-container">
                <div className="chat-messages">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'driver' ? 'message-sent' : 'message-received'}`}
                    >
                      <div className="message-header">
                        <span className="message-sender">{message.name}</span>
                        <span className="message-time">{message.time}</span>
                      </div>
                      <p className="message-content">{message.message}</p>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} className="send-button">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="analytics-container">
              <div className="analytics-header">
                <div className="header-content">
                  <h2 className="analytics-title">Driver Performance Analytics</h2>
                  <p className="analytics-subtitle">Comprehensive overview of your delivery performance</p>
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="metrics-row">
               <div className="stat-card stat-card-green">
                  <div className="stat-header">
                    <div className="stat-icon">💰</div>
                    <span className="stat-change positive">+8.3%</span>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Total Earnings</h3>
                    <div className="stat-value">$15,420</div>
                  </div>
                </div>
                
                <div className="stat-card stat-card-orange">
                  <div className="stat-header">
                    <div className="stat-icon">🚚</div>
                    <span className="stat-change negative">-2.1%</span>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">This Week</h3>
                    <div className="stat-value">89</div>
                  </div>
                </div>
                
                <div className="stat-card stat-card-purple">
                  <div className="stat-header">
                    <div className="stat-icon">⭐</div>
                    <span className="stat-change positive">+5.2%</span>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Avg. Rating</h3>
                    <div className="stat-value">{driverInfo.rating}</div>
                  </div>
                </div>
              </div>

              {/* Main Analytics Grid */}
              <div className="analytics-main-grid">
                
                {/* Overall Rating Card */}
                <div className="rating-card">
                  <div className="card-header">
                    <h3>Overall Performance Rating</h3>
                    <span className="rating-badge">Excellent</span>
                  </div>
                  <div className="rating-content">
                    <div className="rating-circle">
                      <div className="pie-chart-wrapper">
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="8"
                          />
                          <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="#ff7b2c"
                            strokeWidth="8"
                            strokeDasharray={`${(driverInfo.rating * 20 * 3.77)} 377`}
                            strokeDashoffset="0"
                            transform="rotate(-90 70 70)"
                            className="progress-circle"
                          />
                        </svg>
                        <div className="chart-center">
                          <span className="center-text">{driverInfo.rating}</span>
                          <span className="center-subtext">out of 5.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="rating-breakdown">
                      <div className="rating-row">
                        <span>5 Stars</span>
                        <div className="rating-bar">
                          <div className="bar-fill" style={{width: '78%'}}></div>
                        </div>
                        <span>78%</span>
                      </div>
                      <div className="rating-row">
                        <span>4 Stars</span>
                        <div className="rating-bar">
                          <div className="bar-fill" style={{width: '18%'}}></div>
                        </div>
                        <span>18%</span>
                      </div>
                      <div className="rating-row">
                        <span>3 Stars</span>
                        <div className="rating-bar">
                          <div className="bar-fill" style={{width: '3%'}}></div>
                        </div>
                        <span>3%</span>
                      </div>
                      <div className="rating-row">
                        <span>2 Stars</span>
                        <div className="rating-bar">
                          <div className="bar-fill" style={{width: '1%'}}></div>
                        </div>
                        <span>1%</span>
                      </div>
                      <div className="rating-row">
                        <span>1 Star</span>
                        <div className="rating-bar">
                          <div className="bar-fill" style={{width: '0%'}}></div>
                        </div>
                        <span>0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="performance-grid">
                  <div className="performance-card">
                    <div className="performance-header">
                      <h4>On-Time Delivery</h4>
                    </div>
                    <div className="performance-content">
                      <div className="pie-chart-wrapper">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ff7b2c"
                            strokeWidth="8"
                            strokeDasharray={`${(94 * 2.51)} 251.2`}
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                            className="progress-circle"
                          />
                        </svg>
                        <div className="chart-center">
                          <span className="center-text">94%</span>
                        </div>
                      </div>
                      <p className="performance-description">Percentage of deliveries completed on time</p>
                    </div>
                  </div>

                  <div className="performance-card">
                    <div className="performance-header">
                      <h4>Completion Rate</h4>
                    </div>
                    <div className="performance-content">
                      <div className="pie-chart-wrapper">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ff7b2c"
                            strokeWidth="8"
                            strokeDasharray={`${(98 * 2.51)} 251.2`}
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                            className="progress-circle"
                          />
                        </svg>
                        <div className="chart-center">
                          <span className="center-text">98%</span>
                        </div>
                      </div>
                      <p className="performance-description">Successfully completed deliveries</p>
                    </div>
                  </div>
                </div>

                {/* Recent Performance Chart */}
                <div className="performance-chart-card">
                  <div className="card-header">
                    <h3>Weekly Performance Trend</h3>
                  </div>
                  <div className="chart-container">
                    <div className="chart-bars">
                      {[85, 92, 78, 96, 88, 94, 89].map((value, index) => (
                        <div key={index} className="bar-container">
                          <div className="bar" style={{height: `${value}%`}}>
                            <div className="bar-value">{value}</div>
                          </div>
                          <div className="bar-label">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="content-container">
              <div className="content-header">
                <h2 className="page-title">Notifications</h2>
                <p className="page-subtitle">Important updates and alerts</p>
              </div>
              
              <div className="notifications-container">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-card ${
                      notification.type === 'warning' 
                        ? 'notification-warning' 
                        : 'notification-info'
                    }`}
                  >
                    <p className="notification-message">{notification.message}</p>
                    <p className="notification-time">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="content-container">
              <div className="profile-header">
                <div className="content-header">
                  <h2 className="page-title">Profile & Vehicle</h2>
                  <p className="page-subtitle">Driver and vehicle information</p>
                </div>
                <button 
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="edit-button"
                >
                  {editingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="profile-card">
                <div className="form-group">
                  <label className="form-label">Driver Name</label>
                  {editingProfile ? (
                    <input 
                      type="text" 
                      value={driverInfo.name}
                      onChange={(e) => setDriverInfo({...driverInfo, name: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    <div className="form-display">{driverInfo.name}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Vehicle ID</label>
                  <div className="form-display">{driverInfo.vehicleId}</div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  {editingProfile ? (
                    <div className="input-with-icon">
                      <Phone className="input-icon" />
                      <input 
                        type="tel" 
                        value={driverInfo.phone}
                        onChange={(e) => setDriverInfo({...driverInfo, phone: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  ) : (
                    <div className="input-with-icon form-display">
                      <Phone className="input-icon" />
                      <span>{driverInfo.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Password</label>
                  {editingProfile ? (
                    <div className="input-with-icon">
                      <Lock className="input-icon" />
                      <input 
                        type="password" 
                        placeholder="Enter new password"
                        className="form-input"
                      />
                    </div>
                  ) : (
                    <div className="input-with-icon form-display">
                      <Lock className="input-icon" />
                      <span>{driverInfo.password}</span>
                    </div>
                  )}
                </div>
                
                {editingProfile && (
                  <button 
                    onClick={handleSaveProfile}
                    className="save-button"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;



