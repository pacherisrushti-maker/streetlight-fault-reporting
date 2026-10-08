// CitizenDashboard Component

const CitizenDashboard = ({ currentUser, setActiveTab, setSelectedComplaintId }) => {
  const [complaints, setComplaints] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState("ALL");
  const [selectedComplaintModal, setSelectedComplaintModal] = React.useState(null);

  React.useEffect(() => {
    const userContact = currentUser ? currentUser.email : "citizen@belagavi.gov.in";
    const userList = window.ApiService.getComplaintsByUser(userContact);
    setComplaints(userList);
  }, [currentUser]);

  // Compute Metrics
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Submitted" || c.status === "Under Review").length;
  const inProgress = complaints.filter(c => c.status === "In Progress" || c.status === "Assigned").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const filteredList = complaints.filter(c => {
    if (filterStatus === "ALL") return true;
    if (filterStatus === "PENDING") return c.status === "Submitted" || c.status === "Under Review";
    if (filterStatus === "PROGRESS") return c.status === "In Progress" || c.status === "Assigned";
    if (filterStatus === "RESOLVED") return c.status === "Resolved";
    return true;
  });

  return (
    <div>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-civic-dark)' }}>
            Welcome, {currentUser ? currentUser.name : "Rahul Sharma"} 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Citizen Dashboard • Belagavi Streetlight Fault History
          </p>
        </div>

        <button className="btn-primary" onClick={() => setActiveTab('report')}>
          ➕ Report New Fault
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setFilterStatus("ALL")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#EFF6FF', color: '#2563EB' }}>📋</div>
          <div>
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Submitted</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("PENDING")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>⏳</div>
          <div>
            <div className="stat-value">{pending}</div>
            <div className="stat-label">Pending Review</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("PROGRESS")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#FFF7ED', color: '#F97316' }}>⚙️</div>
          <div>
            <div className="stat-value">{inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("RESOLVED")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#ECFDF5', color: '#10B981' }}>✅</div>
          <div>
            <div className="stat-value">{resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Complaints List Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📝</span> My Reported Complaints ({filteredList.length})
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {["ALL", "PENDING", "PROGRESS", "RESOLVED"].map(st => (
              <button 
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  background: filterStatus === st ? 'var(--color-civic-dark)' : 'var(--bg-card-alt)',
                  color: filterStatus === st ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="civic-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Photo</th>
                <th>Location / Area</th>
                <th>Problem Type</th>
                <th>Date Reported</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map(item => (
                <tr key={item.complaint_id}>
                  <td style={{ fontWeight: 700, color: 'var(--color-civic-navy)' }}>{item.complaint_id}</td>
                  <td>
                    <img src={item.photo_url} alt="Fault" className="table-thumb" />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.address.split(',')[0]}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.ward}</div>
                  </td>
                  <td>{item.problem_type}</td>
                  <td style={{ fontSize: '0.85rem' }}>{item.date_reported}</td>
                  <td>
                    <span className={`badge-status badge-${item.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => setSelectedComplaintModal(item)}
                        style={{
                          background: 'var(--color-civic-blue)',
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}>
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedComplaintId(item.complaint_id);
                          setActiveTab('track');
                        }}
                        style={{
                          background: 'var(--bg-card-alt)',
                          border: '1px solid var(--border-medium)',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}>
                        Track Timeline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No complaints found matching selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedComplaintModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Complaint Dossier: {selectedComplaintModal.complaint_id}</h3>
              <button onClick={() => setSelectedComplaintModal(null)} style={{ border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <img src={selectedComplaintModal.photo_url} alt="Photo" style={{ maxHeight: '200px', borderRadius: '8px', border: '1px solid var(--border-medium)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div><strong>Status:</strong> <span className={`badge-status badge-${selectedComplaintModal.status.toLowerCase().replace(/\s+/g, '')}`}>{selectedComplaintModal.status}</span></div>
                <div><strong>Problem:</strong> {selectedComplaintModal.problem_type}</div>
                <div><strong>Date:</strong> {selectedComplaintModal.date_reported}</div>
                <div><strong>Assigned Officer:</strong> {selectedComplaintModal.assigned_officer || "Unassigned"}</div>
              </div>
              <div style={{ marginBottom: '12px' }}><strong>Location Address:</strong> {selectedComplaintModal.address}</div>
              <div style={{ marginBottom: '12px' }}><strong>GPS:</strong> Lat {selectedComplaintModal.latitude}, Lng {selectedComplaintModal.longitude}</div>
              <div style={{ marginBottom: '12px' }}><strong>Description:</strong> "{selectedComplaintModal.description}"</div>
              {selectedComplaintModal.admin_remarks && (
                <div style={{ background: '#FFFBEB', padding: '10px', borderRadius: '6px', border: '1px solid #FDE68A', fontSize: '0.85rem' }}>
                  <strong>Admin Remarks:</strong> {selectedComplaintModal.admin_remarks}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedComplaintModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
