// App.jsx - Main Application Router & State Manager

const App = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [lastSubmittedComplaint, setLastSubmittedComplaint] = React.useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = React.useState("SL-2026-0001");
  const [showAcademicDoc, setShowAcademicDoc] = React.useState(false);

  React.useEffect(() => {
    const user = window.ApiService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSubmissionSuccess = (newComplaint) => {
    setLastSubmittedComplaint(newComplaint);
    setSelectedComplaintId(newComplaint.complaint_id);
    setActiveTab("success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        openAcademicDoc={() => setShowAcademicDoc(true)}
      />

      <main className="main-wrapper">
        {activeTab === "home" && (
          <HomePage 
            setActiveTab={setActiveTab} 
            openAcademicDoc={() => setShowAcademicDoc(true)} 
          />
        )}

        {activeTab === "report" && (
          <ReportFaultPage 
            currentUser={currentUser} 
            onSubmissionSuccess={handleSubmissionSuccess} 
          />
        )}

        {activeTab === "success" && (
          <SuccessPage 
            complaint={lastSubmittedComplaint} 
            setActiveTab={setActiveTab}
            setSelectedComplaintId={setSelectedComplaintId}
          />
        )}

        {activeTab === "track" && (
          <TrackComplaintPage 
            initialId={selectedComplaintId} 
          />
        )}

        {activeTab === "dashboard" && (
          <CitizenDashboard 
            currentUser={currentUser}
            setActiveTab={setActiveTab}
            setSelectedComplaintId={setSelectedComplaintId}
          />
        )}

        {activeTab === "admin" && (
          <AdminDashboard 
            setActiveTab={setActiveTab}
            setSelectedComplaintId={setSelectedComplaintId}
          />
        )}

        {activeTab === "map" && (
          <MapViewPage 
            setSelectedComplaintId={setSelectedComplaintId}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsPage />
        )}

        {activeTab === "auth" && (
          <AuthPage 
            setCurrentUser={setCurrentUser}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      <Footer 
        setActiveTab={setActiveTab} 
        openAcademicDoc={() => setShowAcademicDoc(true)} 
      />

      {showAcademicDoc && (
        <AcademicDocModal onClose={() => setShowAcademicDoc(false)} />
      )}
    </div>
  );
};

// Render React Root
ReactDOM.render(<App />, document.getElementById("root"));
