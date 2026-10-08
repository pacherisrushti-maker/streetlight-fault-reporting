// MapViewPage Component - Interactive OpenStreetMap Leaflet View for Belagavi

const MapViewPage = ({ setSelectedComplaintId, setActiveTab }) => {
  const [complaints, setComplaints] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.status ? React.useState("ALL") : React.useState("ALL");
  const [filterProblem, setFilterProblem] = React.useState("ALL");

  const mapRef = React.useRef(null);
  const markersLayerRef = React.useRef(null);

  React.useEffect(() => {
    const list = window.ApiService.getComplaints();
    setComplaints(list);
  }, []);

  React.useEffect(() => {
    if (!window.L) return;

    const container = document.getElementById("public-main-map");
    if (!container) return;

    if (!mapRef.current) {
      // Center map on Belagavi City, Karnataka (15.8497° N, 74.4977° E)
      const map = L.map("public-main-map").setView([15.8497, 74.4977], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; Belagavi City Corporation Public Lighting Portal | OpenStreetMap'
      }).addTo(map);

      mapRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    renderMarkers();
  }, [complaints, filterStatus, filterProblem]);

  const renderMarkers = () => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    const filtered = complaints.filter(c => {
      if (filterStatus !== "ALL" && c.status.toUpperCase().replace(/\s+/g, '') !== filterStatus) return false;
      if (filterProblem !== "ALL" && c.problem_type !== filterProblem) return false;
      return true;
    });

    filtered.forEach(c => {
      let pinColor = "#EF4444"; // Red for Submitted / New
      if (c.status === "In Progress" || c.status === "Under Review" || c.status === "Assigned") {
        pinColor = "#F59E0B"; // Amber
      } else if (c.status === "Resolved") {
        pinColor = "#10B981"; // Green
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="
          background:${pinColor};
          width:28px;
          height:28px;
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 0 10px rgba(0,0,0,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-weight:bold;
          font-size:11px;
        ">💡</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([c.latitude, c.longitude], { icon: customIcon });

      const popupHtml = `
        <div style="font-family:sans-serif; width:220px;">
          <div style="font-weight:800; color:#0B192C; font-size:14px;">${c.complaint_id}</div>
          <div style="font-size:12px; color:#475569; font-weight:600; margin-top:2px;">${c.problem_type}</div>
          <div style="margin:6px 0;">
            <img src="${c.photo_url}" style="width:100%; height:110px; object-fit:cover; border-radius:6px; border:1px solid #CBD5E1;" />
          </div>
          <div style="font-size:11px; color:#334155; margin-bottom:4px;">📍 ${c.address.split(',')[0]}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
            <span style="font-size:10px; font-weight:bold; padding:2px 6px; border-radius:10px; background:${pinColor}; color:white;">
              ${c.status.toUpperCase()}
            </span>
            <span style="font-size:10px; color:#64748B;">${c.date_reported.split(' ')[0]}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      markersLayerRef.current.addLayer(marker);
    });
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-header" style={{ marginBottom: 0, paddingBottom: 0, border: 'none' }}>
          <div>
            <div className="card-title">
              <span>🗺️</span> Interactive Streetlight Fault Map (Belagavi City)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Real-time map visualization of reported non-functional and damaged streetlight poles across Belagavi wards.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></span> New
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></span> In Progress
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></span> Resolved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: 'white', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border-medium)', marginBottom: '16px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Filter by Status:</label>
          <select className="form-control" style={{ padding: '4px 10px', fontSize: '0.85rem', width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted / New</option>
            <option value="INPROGRESS">In Progress / Assigned</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Filter by Problem Type:</label>
          <select className="form-control" style={{ padding: '4px 10px', fontSize: '0.85rem', width: 'auto' }} value={filterProblem} onChange={e => setFilterProblem(e.target.value)}>
            <option value="ALL">All Problem Types</option>
            <option value="Streetlight not working">Streetlight not working</option>
            <option value="Light flickering">Light flickering</option>
            <option value="Damaged streetlight">Damaged streetlight</option>
            <option value="Pole damaged">Pole damaged</option>
          </select>
        </div>
      </div>

      {/* Map Element */}
      <div className="map-container-box" id="public-main-map"></div>
    </div>
  );
};
