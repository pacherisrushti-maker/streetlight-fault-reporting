// Node.js Express Server for Belagavi Streetlight Fault Reporting System

const express = require('express');
const cors = require('cors');
const path = require('path');

const complaintsRouter = require('./routes/complaints');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/complaints', complaintsRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'Belagavi Streetlight Reporting API', timestamp: new Date() });
});

// Serve frontend for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ Streetlight Fault Reporting System Server running on http://localhost:${PORT}`);
});
