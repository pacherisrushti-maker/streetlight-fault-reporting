// AnalyticsPage Component - Municipal Administrative Analytics Dashboard

const AnalyticsPage = () => {
  const [complaints, setComplaints] = React.useState([]);

  React.useEffect(() => {
    const list = window.ApiService.getComplaints();
    setComplaints(list);
  }, []);

  // Compute Aggregations
  const statusCounts = {
    Submitted: complaints.filter(c => c.status === "Submitted").length,
    "Under Review": complaints.filter(c => c.status === "Under Review").length,
    Assigned: complaints.filter(c => c.status === "Assigned").length,
    "In Progress": complaints.filter(c => c.status === "In Progress").length,
    Resolved: complaints.filter(c => c.status === "Resolved").length,
  };

  const problemCounts = {
    "Streetlight not working": complaints.filter(c => c.problem_type === "Streetlight not working").length,
    "Light flickering": complaints.filter(c => c.problem_type === "Light flickering").length,
    "Damaged streetlight": complaints.filter(c => c.problem_type === "Damaged streetlight").length,
    "Pole damaged": complaints.filter(c => c.problem_type === "Pole damaged").length,
  };

  const wardCounts = {
    "Tilakwadi (Ward 14)": 3,
    "Camp / Cantonment (Ward 08)": 2,
    "Shahapur (Ward 22)": 2,
    "APMC / Auto Nagar (Ward 04)": 1,
    "Hindalga (Ward 02)": 1,
    "Machhe / VTU (Ward 30)": 1,
  };

  const total = complaints.length;
  const resolutionRate = total > 0 ? ((statusCounts.Resolved / total) * 100).toFixed(1) : 0;

  return (
    <div>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <span>📊</span> Executive Analytics & Infrastructure Metrics
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Belagavi City Corporation • Public Lighting Operational Insights
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#ECFDF5', color: '#047857', padding: '4px 12px', borderRadius: '12px', fontWeight: 700 }}>
            LIVE AGGREGATIONS
          </span>
        </div>

        {/* Top Key Performance Indicators */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-bg" style={{ background: '#EFF6FF', color: '#2563EB' }}>📈</div>
            <div>
              <div className="stat-value">{total}</div>
              <div className="stat-label">Total Logged Complaints</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg" style={{ background: '#ECFDF5', color: '#10B981' }}>🎯</div>
            <div>
              <div className="stat-value">{resolutionRate}%</div>
              <div className="stat-label">Resolution Rate</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg" style={{ background: '#FFF7ED', color: '#F97316' }}>⏱️</div>
            <div>
              <div className="stat-value">28.4 hrs</div>
              <div className="stat-label">Avg. Resolution SLA</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg" style={{ background: '#FEF3C7', color: '#D97706' }}>💡</div>
            <div>
              <div className="stat-value">94.2%</div>
              <div className="stat-label">Belagavi Grid Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Chart 1: Complaints by Status */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-civic-dark)', marginBottom: '16px' }}>
            📌 Complaints by Status Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = total > 0 ? (count / total) * 100 : 0;
              let barColor = "#3B82F6";
              if (status === "Under Review") barColor = "#8B5CF6";
              if (status === "Assigned") barColor = "#EAB308";
              if (status === "In Progress") barColor = "#F97316";
              if (status === "Resolved") barColor = "#10B981";

              return (
                <div key={status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>{status}</span>
                    <span>{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: '10px', background: 'var(--bg-card-alt)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '5px', transition: 'width 0.4s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Complaints by Problem Type */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-civic-dark)', marginBottom: '16px' }}>
            ⚠️ Fault Category Classification
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(problemCounts).map(([type, count]) => {
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>{type}</span>
                    <span style={{ color: 'var(--color-amber-main)', fontWeight: 800 }}>{count} cases</span>
                  </div>
                  <div style={{ height: '10px', background: 'var(--bg-card-alt)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #FF9D23, #D97706)', borderRadius: '5px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ward Distribution & Monthly Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Ward Wise Complaints */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-civic-dark)', marginBottom: '16px' }}>
            🏙️ Belagavi Ward Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(wardCounts).map(([ward, count]) => (
              <div key={ward} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-card-alt)', borderRadius: '6px', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: 600 }}>{ward}</span>
                <span className="gps-coords-badge">{count} complaints</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Complaint Trend */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-civic-dark)', marginBottom: '16px' }}>
            📅 Monthly Incident Timeline (2026)
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '160px', padding: '20px 0 0 0', borderBottom: '2px solid var(--border-medium)' }}>
            {[
              { month: "Jun", count: 18 },
              { month: "Jul", count: 24 },
              { month: "Aug", count: 32 },
              { month: "Sep", count: 21 },
              { month: "Oct", count: total }
            ].map(m => (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>{m.count}</div>
                <div style={{ width: '80%', height: `${(m.count / 35) * 100}%`, background: 'var(--color-civic-navy)', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 600 }}>{m.month}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
