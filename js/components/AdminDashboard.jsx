// AdminDashboard Component - Municipal Authority Management Portal

const AdminDashboard = ({ setActiveTab, setSelectedComplaintId }) => {
  const [complaints, setComplaints] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState("ALL");
  const [selectedComplaint, setSelectedComplaint] = React.useState(null);

  // Edit Modal State
  const [editStatus, setEditStatus] = React.useState("Submitted");
  const [editOfficer, setEditOfficer] = React.useState("Er. Suresh Patil (Tilakwadi/Camp Ward)");
  const [editRemarks, setEditRemarks] = React.useState("");
  const [showEditModal, setShowEditModal] = React.useState(false);

  const loadComplaints = () => {
    const list = window.ApiService.getComplaints();
    setComplaints(list);
  };

  React.useEffect(() => {
    loadComplaints();
  }, []);

  // Calculate Metrics
  const total = complaints.length;
  const newCount = complaints.filter(c => c.status === "Submitted").length;
  const pendingCount = complaints.filter(c => c.status === "Under Review" || c.status === "Assigned").length;
  const progressCount = complaints.filter(c => c.status === "In Progress").length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;

  const filteredList = complaints.filter(c => {
    if (filterStatus === "ALL") return true;
    if (filterStatus === "NEW") return c.status === "Submitted";
    if (filterStatus === "PENDING") return c.status === "Under Review" || c.status === "Assigned";
    if (filterStatus === "PROGRESS") return c.status === "In Progress";
    if (filterStatus === "RESOLVED") return c.status === "Resolved";
    return true;
  });

  const openActionModal = (item) => {
    setSelectedComplaint(item);
    setEditStatus(item.status);
    setEditOfficer(item.assigned_officer !== "Unassigned" ? item.assigned_officer : window.OFFICERS_LIST[0]);
    setEditRemarks(item.admin_remarks || "");
    setShowEditModal(true);
  };

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    window.ApiService.updateComplaint(selectedComplaint.complaint_id, {
      status: editStatus,
      assigned_officer: editOfficer,
      admin_remarks: editRemarks
    });

    setShowEditModal(false);
    loadComplaints();
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0B192C, #1E3E62)', color: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#FBBF24', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            BELAGAVI CITY CORPORATION • ELECTRICAL DIVISION
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Municipal Authority Admin Control Panel</h2>
          <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
            Manage complaints, assign field engineers, inspect locations & update resolution statuses.
          </div>
        </div>

        <button 
          className="btn-primary" 
          onClick={() => setActiveTab('analytics')}
          style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white' }}>
          📊 View Performance Analytics
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setFilterStatus("ALL")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#EFF6FF', color: '#2563EB' }}>📊</div>
          <div>
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Complaints</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("NEW")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#FEF3C7', color: '#D97706' }}>🆕</div>
          <div>
            <div className="stat-value">{newCount}</div>
            <div className="stat-label">New Submissions</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("PENDING")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>⏳</div>
          <div>
            <div className="stat-value">{pendingCount}</div>
            <div className="stat-label">Under Review</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("PROGRESS")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#FFF7ED', color: '#F97316' }}>🛠️</div>
          <div>
            <div className="stat-value">{progressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => setFilterStatus("RESOLVED")} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-bg" style={{ background: '#ECFDF5', color: '#10B981' }}>✅</div>
          <div>
            <div className="stat-value">{resolvedCount}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Complaint Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📋</span> Complaint Dispatch Table ({filteredList.length})
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {["ALL", "NEW", "PENDING", "PROGRESS", "RESOLVED"].map(st => (
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
                <th>Location / Ward</th>
                <th>Problem Type</th>
                <th>Date Reported</th>
                <th>Status</th>
                <th>Assigned Officer</th>
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
                  <td style={{ fontSize: '0.85rem', fontWeight: 600, color: '#D97706' }}>
                    {item.assigned_officer || "Unassigned"}
                  </td>
                  <td>
                    <button 
                      onClick={() => openActionModal(item)}
                      style={{
                        background: 'var(--color-civic-dark)',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}>
                      ⚙️ Manage Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Action & Status Update Modal */}
      {showEditModal && selectedComplaint && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Municipal Authority Action: {selectedComplaint.complaint_id}</h3>
              <button onClick={() => setShowEditModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleSaveUpdate}>
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px', background: 'var(--bg-card-alt)', padding: '14px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>REPORTER</div>
                    <div style={{ fontWeight: 600 }}>{selectedComplaint.citizen_name} ({selectedComplaint.citizen_mobile})</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROBLEM TYPE</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-civic-navy)' }}>{selectedComplaint.problem_type}</div>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION ADDRESS</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedComplaint.address}</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Update Complaint Status *</label>
                  <select 
                    className="form-control"
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}>
                    <option value="Submitted">Submitted (New)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress (Field Work)</option>
                    <option value="Resolved">Resolved (Completed)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Assign Electrical Officer *</label>
                  <select 
                    className="form-control"
                    value={editOfficer}
                    onChange={e => setEditOfficer(e.target.value)}>
                    {window.OFFICERS_LIST.map(off => (
                      <option key={off} value={off}>{off}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Admin / Officer Inspection Remarks</label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    placeholder="Enter technician inspection details, replaced fixture specifications, or resolution notes..."
                    value={editRemarks}
                    onChange={e => setEditRemarks(e.target.value)}>
                  </textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Ticket Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
