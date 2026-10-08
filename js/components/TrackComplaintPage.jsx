// TrackComplaintPage Component

const TrackComplaintPage = ({ initialId }) => {
  const [searchId, setSearchId] = React.useState(initialId || "SL-2026-0001");
  const [complaint, setComplaint] = React.useState(null);
  const [searched, setSearched] = React.useState(false);

  const STAGES = [
    { key: "Submitted", label: "Submitted", icon: "📝" },
    { key: "Under Review", label: "Under Review", icon: "🧐" },
    { key: "Assigned", label: "Assigned", icon: "👷" },
    { key: "In Progress", label: "In Progress", icon: "⚙️" },
    { key: "Resolved", label: "Resolved", icon: "✅" }
  ];

  React.useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    } else {
      handleSearch("SL-2026-0001");
    }
  }, [initialId]);

  const handleSearch = (idToSearch) => {
    const query = idToSearch || searchId;
    if (!query) return;

    const record = window.ApiService.getComplaintById(query);
    setComplaint(record);
    setSearched(true);
  };

  const getStageIndex = (status) => {
    if (!status) return 0;
    const index = STAGES.findIndex(s => s.key.toLowerCase() === status.toLowerCase());
    return index !== -1 ? index : 0;
  };

  const currentStageIndex = complaint ? getStageIndex(complaint.status) : 0;
  const progressPercent = (currentStageIndex / (STAGES.length - 1)) * 100;

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      {/* Search Bar Container */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-title" style={{ marginBottom: '16px' }}>
          <span>🔍</span> Track Streetlight Complaint Status
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Complaint ID (e.g. SL-2026-0001)"
            value={searchId}
            onChange={e => setSearchId(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && handleSearch(searchId)}
            style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.04em' }}
          />
          <button className="btn-primary" onClick={() => handleSearch(searchId)}>
            Search Status
          </button>
        </div>

        {/* Quick Demo ID Click Buttons */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Try Sample Complaint IDs:</span>
          {["SL-2026-0001", "SL-2026-0002", "SL-2026-0003", "SL-2026-0004"].map(demoId => (
            <button 
              key={demoId}
              onClick={() => {
                setSearchId(demoId);
                handleSearch(demoId);
              }}
              style={{
                background: 'var(--bg-card-alt)',
                border: '1px solid var(--border-medium)',
                padding: '4px 10px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-civic-navy)'
              }}>
              {demoId}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint Status Results */}
      {searched && complaint ? (
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPLAINT TRACKING DOSSIER</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-civic-dark)', fontWeight: 800 }}>
                Ticket ID: {complaint.complaint_id}
              </h3>
            </div>

            <span className={`badge-status badge-${complaint.status.toLowerCase().replace(/\s+/g, '')}`} style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
              ● {complaint.status.toUpperCase()}
            </span>
          </div>

          {/* Visual 5-Stage Status Timeline */}
          <div style={{ margin: '30px 0' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-civic-dark)', marginBottom: '8px' }}>
              Resolution Lifecycle Progress:
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>
              <div className="timeline-progress" style={{ width: `${progressPercent}%` }}></div>

              {STAGES.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isActive = idx === currentStageIndex;

                let stateClass = "";
                if (isCompleted) stateClass = "completed";
                if (isActive) stateClass = "active";

                return (
                  <div key={stage.key} className={`timeline-step ${stateClass}`}>
                    <div className="timeline-node">
                      {isCompleted ? "✓" : stage.icon}
                    </div>
                    <div className="timeline-label">{stage.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', background: 'var(--bg-card-alt)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--color-civic-dark)', marginBottom: '14px' }}>
                📋 Ticket Parameters & Location
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROBLEM TYPE</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-civic-navy)' }}>{complaint.problem_type}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>DATE & TIME REPORTED</div>
                  <div style={{ fontWeight: 600 }}>{complaint.date_reported}</div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION / WARD ADDRESS</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{complaint.address}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-civic-blue)', fontFamily: 'monospace', marginTop: '2px' }}>
                  GPS: {complaint.latitude.toFixed(4)}° N, {complaint.longitude.toFixed(4)}° E
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CITIZEN DESCRIPTION</div>
                <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}>
                  "{complaint.description}"
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ASSIGNED OFFICER</div>
                  <div style={{ fontWeight: 700, color: '#D97706' }}>
                    {complaint.assigned_officer || "Pending Assignment"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>RESOLVED DATE</div>
                  <div style={{ fontWeight: 700, color: '#10B981' }}>
                    {complaint.resolved_date || "N/A (In Progress)"}
                  </div>
                </div>
              </div>

              {complaint.admin_remarks && (
                <div style={{ marginTop: '16px', background: '#FFFBEB', padding: '12px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>🏛️ MUNICIPAL AUTHORITY REMARKS:</div>
                  <div style={{ fontSize: '0.88rem', color: '#78350F', marginTop: '2px' }}>
                    {complaint.admin_remarks}
                  </div>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                SUBMITTED PHOTOGRAPH
              </div>
              <img 
                src={complaint.photo_url} 
                alt="Complaint photo" 
                style={{ width: '100%', borderRadius: '10px', border: '2px solid white', boxShadow: 'var(--shadow-md)', maxHeight: '240px', objectFit: 'cover' }} 
              />

              <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Belagavi City Corporation • Public Lighting Wing
              </div>
            </div>
          </div>
        </div>
      ) : searched && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔍❌</div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-civic-dark)' }}>No Complaint Found with ID: "{searchId}"</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Please verify the Complaint ID format (e.g. SL-2026-0001) or report a new fault.
          </p>
        </div>
      )}
    </div>
  );
};
