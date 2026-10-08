// AuthPage Component - Citizen & Admin Authentication

const AuthPage = ({ setCurrentUser, setActiveTab }) => {
  const [isRegister, setIsRegister] = React.useState(false);
  const [roleMode, setRoleMode] = React.useState("citizen"); // citizen or admin

  const [formData, setFormData] = React.useState({
    name: "Rahul Sharma",
    email: "citizen@belagavi.gov.in",
    mobile: "9845123456",
    password: "password123"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roleMode === "admin") {
      const adminUser = {
        name: "Belagavi Municipal Admin",
        email: formData.email || "admin@belagavi.gov.in",
        mobile: "0831-2405000",
        role: "admin",
        department: "Public Lighting Division, Belagavi City Corporation"
      };
      window.ApiService.setCurrentUser(adminUser);
      setCurrentUser(adminUser);
      setActiveTab("admin");
    } else {
      const citizenUser = {
        name: formData.name || "Rahul Sharma",
        email: formData.email || "citizen@belagavi.gov.in",
        mobile: formData.mobile || "9845123456",
        role: "citizen"
      };
      window.ApiService.setCurrentUser(citizenUser);
      setCurrentUser(citizenUser);
      setActiveTab("dashboard");
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto' }}>
      <div className="card">
        {/* Role Toggle Header */}
        <div style={{ display: 'flex', background: 'var(--bg-card-alt)', borderRadius: '8px', padding: '4px', marginBottom: '24px' }}>
          <button 
            type="button"
            onClick={() => setRoleMode("citizen")}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: roleMode === "citizen" ? "white" : "transparent",
              color: roleMode === "citizen" ? "var(--color-civic-dark)" : "var(--text-muted)",
              boxShadow: roleMode === "citizen" ? "var(--shadow-sm)" : "none"
            }}>
            👤 Citizen Portal
          </button>
          <button 
            type="button"
            onClick={() => setRoleMode("admin")}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: roleMode === "admin" ? "var(--color-civic-dark)" : "transparent",
              color: roleMode === "admin" ? "white" : "var(--text-muted)",
              boxShadow: roleMode === "admin" ? "var(--shadow-sm)" : "none"
            }}>
            🛡️ Municipal Admin
          </button>
        </div>

        <div style={{ textCenter: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-civic-dark)' }}>
            {roleMode === "admin" ? "Municipal Admin Login" : (isRegister ? "Citizen Registration" : "Citizen Account Login")}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {roleMode === "admin" 
              ? "Access Belagavi City Corporation dispatch dashboard" 
              : "Report and track streetlight faults in Belagavi"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && roleMode === "citizen" && (
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="form-control" 
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">{roleMode === "admin" ? "Admin Email Address *" : "Email Address *"}</label>
            <input 
              type="email" 
              className="form-control" 
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {roleMode === "citizen" && (
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input 
                type="tel" 
                className="form-control" 
                required
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input 
              type="password" 
              className="form-control" 
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            {roleMode === "admin" ? "🔑 Log In as Administrator" : (isRegister ? "Register Account" : "Log In to Portal")}
          </button>
        </form>

        {roleMode === "citizen" && (
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
            {isRegister ? (
              <span>Already have an account? <a href="#login" onClick={() => setIsRegister(false)} style={{ color: 'var(--color-civic-blue)', fontWeight: 700 }}>Log In</a></span>
            ) : (
              <span>New user? <a href="#register" onClick={() => setIsRegister(true)} style={{ color: 'var(--color-civic-blue)', fontWeight: 700 }}>Create Account</a></span>
            )}
          </div>
        )}

        <div style={{ marginTop: '20px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', fontSize: '0.78rem', color: '#B45309', textAlign: 'center' }}>
          💡 <strong>Demo Quick Access:</strong> Click submit with pre-filled credentials for instant demo access.
        </div>
      </div>
    </div>
  );
};
