// AcademicDocModal Component - College Engineering Project Presentation Dossier

const AcademicDocModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" style={{ zIndex: 3000 }}>
      <div className="modal-card" style={{ maxWidth: '850px' }}>
        <div className="modal-header" style={{ background: 'var(--color-civic-dark)', color: 'white' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#FBBF24', fontWeight: 700, letterSpacing: '0.05em' }}>
              VTU BELAGAVI ACADEMIC ENGINEERING SPECIFICATION
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Project Dossier & SDG Mapping Documentation</h3>
          </div>
          <button onClick={onClose} style={{ color: 'white', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          
          {/* Project Title Header */}
          <div style={{ background: 'var(--bg-card-alt)', padding: '16px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid var(--color-amber-main)' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-civic-dark)' }}>Project Title: Streetlight Fault Reporting System</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Target Municipality: Belagavi City Corporation (BCC), Karnataka</p>
          </div>

          {/* 1. Problem Statement */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#EF4444', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
              1. Primary Problem Statement
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              Citizens face severe difficulty reporting faulty or non-working streetlights due to the absence of a direct, location-aware civic feedback mechanism. Simultaneously, municipal electrical authorities struggle to pinpoint exact pole locations, track complaint resolution lifecycles, and assign field maintenance engineers efficiently.
            </p>
          </div>

          {/* 2. Proposed Solution */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#2563EB', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
              2. Proposed Engineering Solution
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              A centralized digital civic platform enabling citizens to capture photographic evidence and high-precision GPS coordinates using browser Geolocation API. Municipal administrators get an interactive OpenStreetMap Leaflet dashboard to view spatial fault heatmaps, assign officers, and update complaint statuses in real time.
            </p>
          </div>

          {/* 3. Expected Outcome */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#10B981', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
              3. Expected Outcome
            </h4>
            <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>Substantially reduces citizen reporting effort through mobile camera and GPS automation.</li>
              <li>Eliminates location ambiguity for field repair crews in Belagavi wards.</li>
              <li>Improves accountability with a 5-stage complaint resolution tracking timeline.</li>
            </ul>
          </div>

          {/* 4. SDG Mapping */}
          <div style={{ marginBottom: '20px', background: '#ECFDF5', padding: '16px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
            <h4 style={{ color: '#047857', fontSize: '1rem', marginBottom: '8px' }}>
              4. UN Sustainable Development Goals (SDG) Alignment
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
              <div>
                <strong>🟢 Primary SDG 11: Sustainable Cities & Communities</strong>
                <p style={{ color: '#064E3B', marginTop: '2px' }}>Ensures safe, illuminated public spaces and resilient urban civic infrastructure.</p>
              </div>
              <div>
                <strong>🌐 Secondary SDG 9: Industry, Innovation & Infrastructure</strong>
                <p style={{ color: '#064E3B', marginTop: '2px' }}>Upgrades municipal asset tracking through modern web GIS and REST API technologies.</p>
              </div>
            </div>
          </div>

          {/* 5. Database Schema */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--color-civic-dark)', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
              5. Database Relational Schema Design
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
              <div style={{ background: '#0F172A', color: '#93C5FD', padding: '14px', borderRadius: '8px' }}>
                <div style={{ color: '#FBBF24', fontWeight: 'bold', marginBottom: '6px' }}>TABLE: complaints</div>
                <div>• complaint_id (VARCHAR PK)</div>
                <div>• citizen_name (VARCHAR)</div>
                <div>• citizen_contact (VARCHAR)</div>
                <div>• photo_url (TEXT / Base64)</div>
                <div>• latitude (FLOAT8)</div>
                <div>• longitude (FLOAT8)</div>
                <div>• address (TEXT)</div>
                <div>• problem_type (VARCHAR)</div>
                <div>• description (TEXT)</div>
                <div>• date_reported (TIMESTAMP)</div>
                <div>• status (ENUM)</div>
                <div>• assigned_officer (VARCHAR)</div>
                <div>• admin_remarks (TEXT)</div>
                <div>• resolved_date (DATE)</div>
              </div>

              <div style={{ background: '#0F172A', color: '#93C5FD', padding: '14px', borderRadius: '8px' }}>
                <div style={{ color: '#FBBF24', fontWeight: 'bold', marginBottom: '6px' }}>TABLE: users</div>
                <div>• user_id (VARCHAR PK)</div>
                <div>• name (VARCHAR)</div>
                <div>• email (VARCHAR UNIQUE)</div>
                <div>• mobile (VARCHAR)</div>
                <div>• password_hash (VARCHAR)</div>
                <div>• role (ENUM: citizen, admin)</div>
                <div>• department (VARCHAR)</div>
              </div>
            </div>
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Close Project Dossier</button>
        </div>
      </div>
    </div>
  );
};
