// SuccessPage Component

const SuccessPage = ({ complaint, setActiveTab, setSelectedComplaintId }) => {
  if (!complaint) return null;

  return (
    <div style={{ maxWidth: '750px', margin: '20px auto' }}>
      <div className="card" style={{ textAlign: 'center', borderTop: '6px solid #10B981' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#ECFDF5',
          color: '#10B981',
          display: 'flex',
          alignItems: 'center',
          justify-content: 'center',
          fontSize: '2.5rem',
          margin: '0 auto 16px auto',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
        }}>
          ✓
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-civic-dark)', marginBottom: '6px' }}>
          Complaint Submitted Successfully!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Your streetlight fault report has been logged into the Belagavi City Corporation Municipal Portal.
        </p>

        {/* Complaint Reference Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-civic-dark), var(--color-civic-navy))',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#FBBF24', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
            ASSIGNED COMPLAINT ID
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '0.05em', margin: '4px 0' }}>
            {complaint.complaint_id}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
            Save this Complaint ID to track status updates in real-time.
          </div>
        </div>

        {/* Summary Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', marginBottom: '28px', background: 'var(--bg-card-alt)', padding: '20px', borderRadius: '10px' }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROBLEM TYPE</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-civic-dark)', marginBottom: '12px' }}>{complaint.problem_type}</div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION / WARD</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px' }}>{complaint.address}</div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>DATE & TIME RECORDED</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{complaint.date_reported}</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>PHOTO EVIDENCE</div>
            <img src={complaint.photo_url} alt="Fault" style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-medium)' }} />
            <div style={{ marginTop: '10px' }}>
              <span className="badge-status badge-submitted">CURRENT STATUS: {complaint.status}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <button 
            className="btn-primary" 
            onClick={() => {
              setSelectedComplaintId(complaint.complaint_id);
              setActiveTab('track');
            }}>
            🔍 Track This Complaint
          </button>
          
          <button 
            className="btn-secondary"
            style={{ color: 'var(--color-civic-dark)', background: 'var(--bg-card-alt)', border: '1px solid var(--border-medium)' }}
            onClick={() => setActiveTab('dashboard')}>
            📋 View My Dashboard
          </button>

          <button 
            className="btn-secondary"
            style={{ color: 'var(--color-civic-dark)', background: 'white', border: '1px solid var(--border-medium)' }}
            onClick={() => setActiveTab('report')}>
            ➕ Report Another Fault
          </button>
        </div>
      </div>
    </div>
  );
};
