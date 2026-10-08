// Navbar Component - Belagavi City Corporation Streetlight Fault Reporting System

const Navbar = ({ activeTab, setActiveTab, currentUser, setCurrentUser, openAcademicDoc }) => {
  return (
    <header className="civic-navbar">
      <div className="top-civic-bar">
        <div>
          <span>🏛️ Belagavi City Corporation • Public Lighting Division</span>
          <span style={{ marginLeft: '12px', opacity: 0.75 }}>| VTU Academic Engineering Project</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: '#FBBF24', fontSize: '0.75rem', fontWeight: 600 }}>
            ⚡ Live Emergency Helpline: 0831-2405000
          </span>
          <button 
            onClick={openAcademicDoc} 
            style={{ 
              background: 'rgba(255,255,255,0.15)', 
              border: 'none', 
              color: '#fff', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontSize: '0.72rem' 
            }}>
            📄 Project Specs & SDG Mapping
          </button>
        </div>
      </div>

      <div className="nav-container">
        <a href="#home" onClick={() => setActiveTab('home')} className="brand-logo">
          <div className="logo-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v8M12 18v4M4.93 10.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 10.93l-1.41 1.41" />
              <circle cx="12" cy="14" r="4" fill="#FF9D23" stroke="none" />
            </svg>
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-title">Streetlight Fault Reporting</span>
            <span className="brand-subtitle">Report. Locate. Resolve. • Belagavi</span>
          </div>
        </a>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}>
                🏠 Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-btn ${activeTab === 'report' ? 'active' : ''}`}
                onClick={() => setActiveTab('report')}>
                ⚠️ Report Fault
              </button>
            </li>
            <li>
              <button 
                className={`nav-btn ${activeTab === 'track' ? 'active' : ''}`}
                onClick={() => setActiveTab('track')}>
                🔍 Track Complaint
              </button>
            </li>
            <li>
              <button 
                className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}>
                🗺️ Live Map
              </button>
            </li>

            {currentUser && currentUser.role === 'admin' ? (
              <>
                <li>
                  <button 
                    className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
                    onClick={() => setActiveTab('admin')}>
                    🛡️ Admin Portal
                  </button>
                </li>
                <li>
                  <button 
                    className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}>
                    📊 Analytics
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}>
                  📋 My Complaints
                </button>
              </li>
            )}

            <li>
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#FDE68A', fontWeight: 600 }}>
                    {currentUser.role === 'admin' ? '👮 Admin' : `👤 ${currentUser.name.split(' ')[0]}`}
                  </span>
                  <button 
                    onClick={() => {
                      window.ApiService.logout();
                      setCurrentUser(null);
                      setActiveTab('auth');
                    }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#FCA5A5',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '0.78rem'
                    }}>
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="nav-btn admin-pill-btn"
                  onClick={() => setActiveTab('auth')}>
                  🔒 Login / Register
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
