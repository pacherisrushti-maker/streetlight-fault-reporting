// Seed Data for Belagavi Streetlight Fault Reporting System
// Clearly labeled as initial demonstration sample data for Belagavi City Corporation area

window.SEED_COMPLAINTS = [
  {
    complaint_id: "SL-2026-0001",
    citizen_name: "Rahul Sharma",
    citizen_contact: "rahul.sharma@example.com",
    citizen_mobile: "9845123456",
    photo_url: "assets/faulty_night.png",
    latitude: 15.8365,
    longitude: 74.5098,
    address: "RP Road, Near Deshmukh High School, Tilakwadi, Belagavi, Karnataka 590006",
    problem_type: "Streetlight not working",
    description: "Main streetlight opposite Deshmukh High School is completely out since 2 days. The street is extremely dark at night creating safety hazard.",
    date_reported: "2026-10-06 19:30",
    status: "Submitted",
    assigned_officer: "Unassigned",
    admin_remarks: "Complaint logged via mobile web app. Awaiting ward supervisor inspection.",
    resolved_date: null,
    ward: "Ward 14 - Tilakwadi"
  },
  {
    complaint_id: "SL-2026-0002",
    citizen_name: "Priya Kulkarni",
    citizen_contact: "priya.kulkarni@example.com",
    citizen_mobile: "9480112233",
    photo_url: "assets/faulty_night.png",
    latitude: 15.8521,
    longitude: 74.5123,
    address: "Khanapur Road, Opposite Cantonment Board, Camp, Belagavi, Karnataka 590001",
    problem_type: "Light flickering",
    description: "Sodium vapor lamp flickers rapidly continuous throughout the night. Causes severe glare for passing traffic.",
    date_reported: "2026-10-05 20:15",
    status: "In Progress",
    assigned_officer: "Er. Suresh Patil (Electrical Wing)",
    admin_remarks: "Technician team dispatched with hydraulic ladder truck to inspect choke and igniter.",
    resolved_date: null,
    ward: "Ward 08 - Cantonment / Camp"
  },
  {
    complaint_id: "SL-2026-0003",
    citizen_name: "Anand Hegde",
    citizen_contact: "anand.hegde@example.com",
    citizen_mobile: "9731223344",
    photo_url: "assets/damaged_pole.png",
    latitude: 15.8389,
    longitude: 74.5190,
    address: "Shahapur Main Market Road, Near Vegetable Yard, Belagavi, Karnataka 590003",
    problem_type: "Damaged streetlight",
    description: "Metal pole arm bent down due to heavy rain branch fall. Casing fixture hanging dangerously above sidewalk.",
    date_reported: "2026-10-04 11:45",
    status: "Resolved",
    assigned_officer: "Er. Rajesh Shinde (Shahapur Division)",
    admin_remarks: "Damaged pole arm safely removed and replaced with new heavy-duty bracket & 45W energy-efficient LED lamp.",
    resolved_date: "2026-10-06 16:00",
    ward: "Ward 22 - Shahapur"
  },
  {
    complaint_id: "SL-2026-0004",
    citizen_name: "Mahesh Patil",
    citizen_contact: "mahesh.p@example.com",
    citizen_mobile: "9611556677",
    photo_url: "assets/damaged_pole.png",
    latitude: 15.8712,
    longitude: 74.5345,
    address: "APMC Main Gate Road, Auto Nagar Industrial Area, Belagavi, Karnataka 590016",
    problem_type: "Pole damaged",
    description: "Base junction cover stolen and wires exposed. Potential shock risk during monsoon.",
    date_reported: "2026-10-07 09:10",
    status: "Under Review",
    assigned_officer: "Er. Ankit Kulkarni",
    admin_remarks: "Priority ticket raised for safety insulation box replacement.",
    resolved_date: null,
    ward: "Ward 04 - APMC / Auto Nagar"
  },
  {
    complaint_id: "SL-2026-0005",
    citizen_name: "Savita Kamat",
    citizen_contact: "savita.k@example.com",
    citizen_mobile: "9880998877",
    photo_url: "assets/resolved_light.png",
    latitude: 15.8601,
    longitude: 74.4850,
    address: "Hindalga Road, Near Central Jail Circle, Belagavi, Karnataka 590008",
    problem_type: "Streetlight not working",
    description: "3 consecutive street poles dark on the stretch leading to Hindalga bypass.",
    date_reported: "2026-10-06 21:00",
    status: "Assigned",
    assigned_officer: "Er. Ankit Kulkarni",
    admin_remarks: "Assigned to Ward 02 maintenance team.",
    resolved_date: null,
    ward: "Ward 02 - Hindalga"
  },
  {
    complaint_id: "SL-2026-0006",
    citizen_name: "Vijay Naik",
    citizen_contact: "v.naik@example.com",
    citizen_mobile: "9448332211",
    photo_url: "assets/resolved_light.png",
    latitude: 15.8150,
    longitude: 74.4920,
    address: "VTU Campus Main Gate Road, Machhe, Belagavi, Karnataka 590018",
    problem_type: "Streetlight not working",
    description: "Campus approach road pole light fixture non-functional.",
    date_reported: "2026-10-03 18:20",
    status: "Resolved",
    assigned_officer: "Er. Suresh Patil",
    admin_remarks: "Replaced burnt capacitor and restored power feed.",
    resolved_date: "2026-10-04 14:30",
    ward: "Ward 30 - Machhe / VTU"
  }
];

window.SEED_USERS = [
  {
    user_id: "USR-101",
    name: "Rahul Sharma",
    email: "citizen@belagavi.gov.in",
    mobile: "9845123456",
    role: "citizen"
  },
  {
    user_id: "USR-ADM-01",
    name: "Belagavi Municipal Admin",
    email: "admin@belagavi.gov.in",
    mobile: "0831-2405000",
    role: "admin",
    department: "Electrical & Public Lighting Division, Belagavi City Corporation"
  }
];

window.OFFICERS_LIST = [
  "Er. Suresh Patil (Tilakwadi/Camp Ward)",
  "Er. Rajesh Shinde (Shahapur Division)",
  "Er. Ankit Kulkarni (APMC/Hindalga Division)",
  "Er. Vinayak Bhat (Vadgaon Ward)",
  "Er. Santosh Joshi (Khade Bazar Division)"
];
