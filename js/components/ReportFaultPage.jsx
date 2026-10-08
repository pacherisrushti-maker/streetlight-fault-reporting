// ReportFaultPage Component - Streetlight Fault Reporting System

const ReportFaultPage = ({ currentUser, onSubmissionSuccess }) => {
  const [formData, setFormData] = React.useState({
    citizen_name: currentUser ? currentUser.name : "Rahul Sharma",
    citizen_contact: currentUser ? currentUser.email : "citizen@belagavi.gov.in",
    citizen_mobile: currentUser ? currentUser.mobile : "9845123456",
    streetlight_id: "",
    photo_url: "assets/faulty_night.png",
    latitude: 15.8497,
    longitude: 74.4977,
    address: "RP Road, Tilakwadi, Belagavi, Karnataka 590006",
    problem_type: "Streetlight not working",
    description: "",
    ward: "Ward 14 - Tilakwadi"
  });

  const [gpsLoading, setGpsLoading] = React.useState(false);
  const [gpsCaptured, setGpsCaptured] = React.useState(false);
  const [showCameraModal, setShowCameraModal] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState("assets/faulty_night.png");

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  // Initialize mini Leaflet map for pin placement
  React.useEffect(() => {
    if (!window.L) return;

    const mapElement = document.getElementById("report-mini-map");
    if (!mapElement) return;

    if (!mapRef.current) {
      const initialLat = formData.latitude;
      const initialLng = formData.longitude;
      const map = L.map("report-mini-map").setView([initialLat, initialLng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const customMarkerIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:#EF4444; width:24px; height:24px; border-radius:50%; border:3px solid white; box-shadow:0 0 8px rgba(0,0,0,0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([initialLat, initialLng], { icon: customMarkerIcon, draggable: true }).addTo(map);

      marker.on('dragend', function (e) {
        const latlng = e.target.getLatLng();
        updateLocationFromCoords(latlng.lat, latlng.lng);
      });

      map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        updateLocationFromCoords(e.latlng.lat, e.latlng.lng);
      });

      mapRef.current = map;
      markerRef.current = marker;
    }
  }, []);

  const updateLocationFromCoords = (lat, lng) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
    window.ApiService.reverseGeocode(lat, lng, (result) => {
      setFormData(prev => ({ ...prev, address: result.address }));
    });
  };

  // Browser Geolocation API
  const handleGetLocation = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGpsLoading(false);
          setGpsCaptured(true);
          updateLocationFromCoords(lat, lng);

          if (mapRef.current && markerRef.current) {
            mapRef.current.setView([lat, lng], 15);
            markerRef.current.setLatLng([lat, lng]);
          }
        },
        (error) => {
          setGpsLoading(false);
          alert("Could not access GPS. Simulated Belagavi coordinates will be used. " + error.message);
          // Fallback to Belagavi central coordinates
          updateLocationFromCoords(15.8497, 74.4977);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setGpsLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  // File photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please upload a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photo_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Live Camera Web Cam
  const startCamera = async () => {
    setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera stream unavailable, fallback simulation provided", err);
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth || 640;
      canvasRef.current.height = videoRef.current.videoHeight || 480;
      context.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      setPhotoPreview(dataUrl);
      setFormData(prev => ({ ...prev, photo_url: dataUrl }));
      stopCamera();
    } else {
      // Mock snapshot if hardware camera unavailable
      setPhotoPreview("assets/faulty_night.png");
      setFormData(prev => ({ ...prev, photo_url: "assets/faulty_night.png" }));
      setShowCameraModal(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCameraModal(false);
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.citizen_name || !formData.citizen_contact) {
      alert("Please fill in your name and contact email/mobile.");
      return;
    }

    if (!formData.description) {
      alert("Please provide a short description of the fault.");
      return;
    }

    // Call API service to save complaint
    const newRecord = window.ApiService.createComplaint(formData);
    onSubmissionSuccess(newRecord);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📷</span> Report a Streetlight Fault
          </div>
          <span style={{ fontSize: '0.8rem', background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
            Belagavi City Corporation Area
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Citizen Details */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-civic-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              1. Reporter Details
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Citizen Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={formData.citizen_name} 
                  onChange={e => setFormData({ ...formData, citizen_name: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile / Email *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={formData.citizen_contact} 
                  onChange={e => setFormData({ ...formData, citizen_contact: e.target.value, citizen_mobile: e.target.value })} 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Fault Details */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-civic-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              2. Streetlight Fault Information
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Problem Type *</label>
                <select 
                  className="form-control"
                  value={formData.problem_type}
                  onChange={e => setFormData({ ...formData, problem_type: e.target.value })}>
                  <option value="Streetlight not working">Streetlight not working (Dark)</option>
                  <option value="Light flickering">Light flickering continuously</option>
                  <option value="Damaged streetlight">Damaged streetlight fixture/glass</option>
                  <option value="Pole damaged">Pole damaged / bent / dangerous</option>
                  <option value="Other">Other electrical issue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Streetlight Pole ID (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. BGM-SL-8042 (if printed on pole)"
                  value={formData.streetlight_id} 
                  onChange={e => setFormData({ ...formData, streetlight_id: e.target.value })} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description of Problem *</label>
              <textarea 
                className="form-control" 
                rows="3"
                required
                placeholder="Describe the issue (e.g. lamp dark for 3 days, causing safety risk near circle...)"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}>
              </textarea>
            </div>
          </div>

          {/* Section 3: Photo Upload */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-civic-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              3. Upload Photograph Evidence *
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
              <div>
                <div className="upload-box" onClick={() => document.getElementById('photo-input').click()}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Click to Upload Photograph</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports JPG, PNG (Max 10MB)</div>
                  <input 
                    type="file" 
                    id="photo-input" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                  />
                </div>

                <div style={{ textAlign: 'center', margin: '10px 0' }}>OR</div>

                <button 
                  type="button" 
                  className="btn-outline-dark" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={startCamera}>
                  🎥 Use Mobile Camera
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Photo Preview</div>
                <img src={photoPreview} alt="Preview" className="preview-image" />
              </div>
            </div>
          </div>

          {/* Section 4: GPS & Address Location */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-civic-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              4. GPS Location & Address (Belagavi Area) *
            </h4>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={handleGetLocation} 
                disabled={gpsLoading}>
                {gpsLoading ? '📡 Capturing GPS...' : '📍 Capture Current GPS Location'}
              </button>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                🔒 Privacy Guarantee: Location is recorded only upon clicking submit.
              </div>
            </div>

            <div className="gps-info-box">
              <span style={{ fontSize: '1.4rem' }}>🛰️</span>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="gps-coords-badge">LAT: {formData.latitude.toFixed(4)}° N</span>
                  <span className="gps-coords-badge">LONG: {formData.longitude.toFixed(4)}° E</span>
                  {gpsCaptured && <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 700 }}>✓ GPS Verified</span>}
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Location / Ward Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            {/* Interactive Mini Pin Selector Map */}
            <div style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>Interactive Location Picker (Click or drag pin on Belagavi map):</div>
              <div id="report-mini-map" style={{ height: '220px', borderRadius: '8px', border: '1px solid var(--border-medium)' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⏰ Date & Time recorded automatically: {new Date().toLocaleString()}
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
              🚀 Submit Fault Complaint
            </button>
          </div>
        </form>
      </div>

      {/* Camera Capture Modal */}
      {showCameraModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>📷 Mobile Camera Capture</h3>
              <button onClick={stopCamera} style={{ border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px', background: '#000' }}></video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={stopCamera}>Cancel</button>
              <button className="btn-primary" onClick={captureCameraPhoto}>Snap Photo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
