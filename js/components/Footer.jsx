// Footer Component

const Footer = ({ setActiveTab, openAcademicDoc }) => {
  return (
    <footer className="civic-footer">
      <div className="footer-container">
        <div>
          <div className="footer-brand">Streetlight Fault Reporting System</div>
          <p className="footer-text">
            A digital civic platform designed for citizens of Belagavi, Karnataka to easily report non-working or damaged streetlights with photo evidence and exact GPS locations.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="sdg-chip">🟢 SDG 11: Sustainable Cities</span>
            <span className="sdg-chip">🌐 SDG 9: Infrastructure</span>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '12px' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><a href="#report" onClick={() => setActiveTab('report')} style={{ color: '#94A3B8', textDecoration: 'none' }}>→ Report a Fault</a></li>
            <li><a href="#track" onClick={() => setActiveTab('track')} style={{ color: '#94A3B8', textDecoration: 'none' }}>→ Track Complaint Status</a></li>
            <li><a href="#map" onClick={() => setActiveTab('map')} style={{ color: '#94A3B8', textDecoration: 'none' }}>→ Interactive Map View</a></li>
            <li><a href="#admin" onClick={() => setActiveTab('admin')} style={{ color: '#94A3B8', textDecoration: 'none' }}>→ Municipal Authority Login</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '12px' }}>Academic Project Context</h4>
          <p className="footer-text" style={{ fontSize: '0.84rem' }}>
            Developed as a realistic Academic Engineering Project for college curriculum based in Belagavi, Karnataka.
          </p>
          <button 
            onClick={openAcademicDoc}
            style={{
              marginTop: '12px',
              background: 'linear-gradient(135deg, #FF9D23, #D97706)',
              color: '#0B192C',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}>
            📄 View Problem Statement & System Specs
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 Belagavi City Corporation • Public Lighting Division. All Rights Reserved.</div>
        <div style={{ opacity: 0.7 }}>Designed for Academic Engineering Presentation • VTU Belagavi</div>
      </div>
    </footer>
  );
};
