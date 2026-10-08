// Express Router - Complaints REST API Endpoints

const express = require('express');
const router = express.Router();

// Mock in-memory database helper (can be swapped for pg/mysql)
let complaints = [];

// GET /api/complaints - Get all complaints (with optional status & user filter)
router.get('/', (req, res) => {
  const { status, citizen_contact } = req.query;
  let results = [...complaints];

  if (status) {
    results = results.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }

  if (citizen_contact) {
    results = results.filter(c => c.citizen_contact.toLowerCase() === citizen_contact.toLowerCase());
  }

  // Anonymize personal info if public view
  const publicView = results.map(c => {
    const copy = { ...c };
    delete copy.citizen_mobile;
    delete copy.citizen_contact;
    return copy;
  });

  res.json({ success: true, count: publicView.length, data: publicView });
});

// GET /api/complaints/:id - Get single complaint by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const record = complaints.find(c => c.complaint_id.toUpperCase() === id.toUpperCase());
  
  if (!record) {
    return res.status(404).json({ success: false, message: 'Complaint ID not found' });
  }

  res.json({ success: true, data: record });
});

// POST /api/complaints - Create new fault report
router.post('/', (req, res) => {
  const { citizen_name, citizen_contact, photo_url, latitude, longitude, address, problem_type, description } = req.body;

  if (!citizen_name || !citizen_contact || !problem_type) {
    return res.status(400).json({ success: false, message: 'Missing required complaint fields' });
  }

  const currentYear = new Date().getFullYear();
  const complaint_id = `SL-${currentYear}-${String(complaints.length + 1).padStart(4, '0')}`;

  const newComplaint = {
    complaint_id,
    citizen_name,
    citizen_contact,
    photo_url: photo_url || 'assets/faulty_night.png',
    latitude: parseFloat(latitude) || 15.8497,
    longitude: parseFloat(longitude) || 74.4977,
    address: address || 'Belagavi, Karnataka',
    problem_type,
    description,
    date_reported: new Date().toISOString(),
    status: 'Submitted',
    assigned_officer: 'Unassigned',
    admin_remarks: 'Ticket created in Belagavi Municipal System.',
    resolved_date: null
  };

  complaints.unshift(newComplaint);
  res.status(201).json({ success: true, data: newComplaint });
});

// PUT /api/complaints/:id/status - Update status & officer assignment
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, assigned_officer, admin_remarks } = req.body;

  const index = complaints.findIndex(c => c.complaint_id.toUpperCase() === id.toUpperCase());
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  if (status) complaints[index].status = status;
  if (assigned_officer) complaints[index].assigned_officer = assigned_officer;
  if (admin_remarks) complaints[index].admin_remarks = admin_remarks;

  if (status === 'Resolved') {
    complaints[index].resolved_date = new Date().toISOString().split('T')[0];
  }

  res.json({ success: true, data: complaints[index] });
});

module.exports = router;
