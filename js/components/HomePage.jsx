// HomePage Component - Streetlight Fault Reporting System

const HomePage = ({ setActiveTab, openAcademicDoc }) => {
  const [complaints, setComplaints] = React.useState([]);

  React.useEffect(() => {
    const list = window.ApiService.getComplaints();
    setComplaints(list.slice(0, 3)); // show top 3 sample complaints
  }, []);

  return (
    <div>
      {/* Academic Project Highlight Banner */}
      <div className="academic-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.4rem' }}>🎓</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>College Academic Engineering Project • Belagavi, Karnataka</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Digital Civic Infrastructure Solution for Belagavi City Corporation</div>
          </div>
        </div>
        <button 
          onClick={openAcademicDoc}
          style={{
            background: 'white',
            color: '#065F46',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}>
          Read Docs & SDG Mapping →
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero-card">
        <div className="hero-glow-bg"></div>
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <span>💡</span>
              <span>BELAGAVI CIVIC TECH PORTAL</span>
            </div>
            <h1 className="hero-title">Streetlight Fault Reporting System</h1>
            <div className="hero-tagline">“Report. Locate. Resolve.”</div>
            <p className="hero-description">
              A digital civic platform enabling citizens of Belagavi to quickly report non-functional or damaged streetlights using photo proof and exact GPS coordinates, empowering municipal authorities to respond faster.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setActiveTab('report')}>
                <span>📷</span> Report a Fault Now
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('track')}>
                <span>🔍</span> Track Complaint Status
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('auth')}>
                <span>🛡️</span> Admin Login
              </button>
            </div>
          </div>

          <div className="hero-illustration-box">
            <div style={{ textAlign: 'center', color: '#FBBF24', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
              REAL-TIME INFRASTRUCTURE MONITORING
            </div>
            
            {/* SVG Illustration of City Streetlight Pole */}
            <div className="lamp-graphic-container">
              <svg width="220" height="180" viewBox="0 0 200 160" fill="none">
                {/* Ground Line */}
                <line x1="10" y1="140" x2="190" y2="140" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                {/* Street Pole */}
                <path d="M60 140 L60 40 Q60 20 85 20 L130 20" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
                {/* Lamp Fixture */}
                <rect x="125" y="18" width="22" height="10" rx="3" fill="#334155" stroke="#CBD5E1" strokeWidth="2" />
                {/* Glowing Light Beam */}
                <polygon points="125,28 80,140 180,140 147,28" fill="url(#lightGlow)" opacity="0.85" />
                {/* Light Bulb Spot */}
                <circle cx="136" cy="25" r="7" fill="#FF9D23" />
                <circle cx="136" cy="25" r="14" fill="#FBBF24" opacity="0.35" />
                
                {/* City Buildings Silhouette */}
                <rect x="20" y="90" width="25" height="50" fill="#1E293B" />
                <rect x="150" y="80" width="30" height="60" fill="#1E293B" />
                <rect x="165" y="65" width="15" height="75" fill="#0F172A" />
                
                {/* Location Marker Pin */}
                <g transform="translate(130, 95)">
                  <path d="M10 0 C4.477 0 0 4.477 0 10 C0 17.5 10 26 10 26 C10 26 20 17.5 20 10 C20 4.477 15.523 0 10 0 Z" fill="#EF4444" />
                  <circle cx="10" cy="9" r="4" fill="white" />
                </g>

                <defs>
                  <linearGradient id="lightGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF9D23" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FF9D23" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '8px' }}>
              📍 Belagavi City Corporation Area Coverage
            </div>
          </div>
        </div>
      </div>

      {/* The Problem & Solution Overview */}
      <div className="card" style={{ marginBottom: '36px' }}>
        <div style={{ display: 'grid', grid-template-columns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 style={{ color: '#EF4444', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> The Problem in Urban Maintenance
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Dark or flickering streetlights lead to increased road accidents, poor night security, and difficulty for pedestrians. Traditionally, citizens had no structured platform to report exact pole locations or photo evidence, causing long resolution delays.
            </p>
          </div>
          <div>
            <h3 style={{ color: '#10B981', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> The Proposed Engineering Solution
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              A mobile-responsive web portal where citizens click a photo, auto-capture browser GPS coordinates, and submit complaints directly to ward electrical officers. Ward teams receive exact location pins and track complaints until resolved.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Step How It Works Workflow */}
      <div className="workflow-section">
        <div className="section-header">
          <h2 className="section-title">How The System Works</h2>
          <p className="section-subtitle">Simple 5-step process for fast streetlight fault reporting & resolution</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h4 className="step-card-title">Identify Fault</h4>
            <p className="step-card-desc">Spot any broken, dim, flickering, or non-functional streetlight in your locality.</p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h4 className="step-card-title">Upload Photograph</h4>
            <p className="step-card-desc">Take a photo using your mobile camera or pick an image file showing the pole.</p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="step-card-title">Capture GPS Location</h4>
            <p className="step-card-desc">Click "Fetch GPS" to auto-record exact latitude/longitude coordinates.</p>
          </div>

          <div className="step-card">
            <span className="step-number">04</span>
            <div className="step-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <h4 className="step-card-title">Submit Complaint</h4>
            <p className="step-card-desc">Receive a unique tracking ID (e.g. SL-2026-0001) for real-time updates.</p>
          </div>

          <div className="step-card">
            <span className="step-number">05</span>
            <div className="step-icon-wrapper" style={{ background: '#ECFDF5', color: '#10B981', borderColor: '#A7F3D0' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h4 className="step-card-title">Authority Resolves</h4>
            <p className="step-card-desc">Ward electrical engineers inspect site, repair fixture, and close ticket.</p>
          </div>
        </div>
      </div>

      {/* Recent Sample Complaints List */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📋</span> Recent Sample Public Complaints (Belagavi Area)
          </div>
          <button 
            className="btn-outline-dark" 
            style={{ fontSize: '0.85rem', padding: '6px 14px' }}
            onClick={() => setActiveTab('map')}>
            View All on Map →
          </button>
        </div>

        <div className="table-responsive">
          <table className="civic-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Photo</th>
                <th>Location / Ward</th>
                <th>Problem Type</th>
                <th>Reported On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(item => (
                <tr key={item.complaint_id}>
                  <td style={{ fontWeight: 700, color: 'var(--color-civic-navy)' }}>{item.complaint_id}</td>
                  <td>
                    <img src={item.photo_url} alt="fault" className="table-thumb" />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.address.split(',')[0]}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.ward}</div>
                  </td>
                  <td>{item.problem_type}</td>
                  <td style={{ fontSize: '0.85rem' }}>{item.date_reported}</td>
                  <td>
                    <span className={`badge-status badge-${item.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setActiveTab('track')}
                      style={{
                        background: 'var(--bg-card-alt)',
                        border: '1px solid var(--border-medium)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                      Track →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
          🔒 Privacy Notice: Citizen phone numbers and personal email addresses are protected and not displayed in public listings.
        </div>
      </div>
    </div>
  );
};
