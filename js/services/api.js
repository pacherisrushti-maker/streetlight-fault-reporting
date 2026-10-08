// API & Database Service Layer (Local Database with REST Sync Capabilities)

(function () {
  const STORAGE_KEY_COMPLAINTS = "BGM_STREETLIGHT_COMPLAINTS_V1";
  const STORAGE_KEY_USER = "BGM_CURRENT_USER_V1";

  // Initialize Local Database with Seed Data if empty
  function initDatabase() {
    const existing = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(window.SEED_COMPLAINTS || []));
    }
  }

  initDatabase();

  window.ApiService = {
    // Get all complaints
    getComplaints: function () {
      initDatabase();
      try {
        const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
        return JSON.parse(raw) || [];
      } catch (e) {
        console.error("Error reading database", e);
        return window.SEED_COMPLAINTS;
      }
    },

    // Save complaints array
    saveComplaints: function (list) {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(list));
    },

    // Get single complaint by ID
    getComplaintById: function (id) {
      if (!id) return null;
      const list = this.getComplaints();
      const cleanId = id.trim().toUpperCase();
      return list.find(c => c.complaint_id.toUpperCase() === cleanId) || null;
    },

    // Get complaints for logged in user
    getComplaintsByUser: function (userContact) {
      const list = this.getComplaints();
      if (!userContact) return list;
      return list.filter(c => 
        (c.citizen_contact && c.citizen_contact.toLowerCase() === userContact.toLowerCase()) ||
        (c.citizen_mobile && c.citizen_mobile === userContact)
      );
    },

    // Create new complaint
    createComplaint: function (data) {
      const list = this.getComplaints();
      
      // Auto-generate Complaint ID format SL-2026-XXXX
      const currentYear = new Date().getFullYear();
      const seqNumber = String(list.length + 1).padStart(4, "0");
      const newId = `SL-${currentYear}-${seqNumber}`;

      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      const newRecord = {
        complaint_id: newId,
        citizen_name: data.citizen_name || "Anonymous Citizen",
        citizen_contact: data.citizen_contact || "citizen@belagavi.gov.in",
        citizen_mobile: data.citizen_mobile || "9845123456",
        streetlight_id: data.streetlight_id || null,
        photo_url: data.photo_url || "assets/faulty_night.png",
        latitude: parseFloat(data.latitude) || 15.8497,
        longitude: parseFloat(data.longitude) || 74.4977,
        address: data.address || "Belagavi, Karnataka",
        problem_type: data.problem_type || "Streetlight not working",
        description: data.description || "Reported via civic fault app.",
        date_reported: formattedDate,
        status: "Submitted",
        assigned_officer: "Unassigned",
        admin_remarks: "Complaint logged successfully into Belagavi City Corporation database.",
        resolved_date: null,
        ward: data.ward || "Belagavi Municipal Area"
      };

      list.unshift(newRecord); // Add to top
      this.saveComplaints(list);
      return newRecord;
    },

    // Update complaint status & officer assignment
    updateComplaint: function (id, updateData) {
      const list = this.getComplaints();
      const index = list.findIndex(c => c.complaint_id.toUpperCase() === id.toUpperCase());
      if (index === -1) return null;

      const record = list[index];
      
      if (updateData.status) record.status = updateData.status;
      if (updateData.assigned_officer) record.assigned_officer = updateData.assigned_officer;
      if (updateData.admin_remarks !== undefined) record.admin_remarks = updateData.admin_remarks;

      if (updateData.status === "Resolved" && !record.resolved_date) {
        const now = new Date();
        record.resolved_date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      }

      list[index] = record;
      this.saveComplaints(list);
      return record;
    },

    // Auth Session Management
    getCurrentUser: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_USER);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      // Default guest citizen
      return { name: "Rahul Sharma", email: "citizen@belagavi.gov.in", mobile: "9845123456", role: "citizen" };
    },

    setCurrentUser: function (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    },

    logout: function () {
      localStorage.removeItem(STORAGE_KEY_USER);
    },

    // Mock reverse geocode for Belagavi area coordinates
    reverseGeocode: function (lat, lng, callback) {
      // Simulate reverse geocoding lookup
      setTimeout(() => {
        let area = "Belagavi City Central";
        if (lat < 15.84) area = "Tilakwadi / Shahapur Area, Belagavi, Karnataka 590006";
        else if (lat > 15.86) area = "APMC / Auto Nagar Sector, Belagavi, Karnataka 590016";
        else if (lng > 74.51) area = "Khanapur Road, Camp Area, Belagavi, Karnataka 590001";
        else if (lng < 74.50) area = "Hindalga / Mandoli Bypass Road, Belagavi, Karnataka 590008";
        
        callback({
          address: `${area} (GPS: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`
        });
      }, 300);
    }
  };
})();
