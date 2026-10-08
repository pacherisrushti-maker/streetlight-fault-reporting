-- SQL Database Schema Definition for Streetlight Fault Reporting System
-- Designed for Belagavi City Corporation (BCC) Public Lighting Infrastructure

CREATE DATABASE IF NOT EXISTS belagavi_streetlight_db;
USE belagavi_streetlight_db;

-- 1. Users Table (Citizens, Ward Engineers, Municipal Admins)
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('citizen', 'officer', 'admin') DEFAULT 'citizen',
    department VARCHAR(100) DEFAULT 'Public Citizen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Streetlight Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
    complaint_id VARCHAR(20) PRIMARY KEY,
    citizen_name VARCHAR(100) NOT NULL,
    citizen_contact VARCHAR(120) NOT NULL,
    citizen_mobile VARCHAR(15),
    streetlight_id VARCHAR(50),
    photo_url TEXT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    address TEXT NOT NULL,
    problem_type ENUM(
        'Streetlight not working',
        'Light flickering',
        'Damaged streetlight',
        'Pole damaged',
        'Other'
    ) NOT NULL,
    description TEXT NOT NULL,
    date_reported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM(
        'Submitted',
        'Under Review',
        'Assigned',
        'In Progress',
        'Resolved'
    ) DEFAULT 'Submitted',
    assigned_officer VARCHAR(100) DEFAULT 'Unassigned',
    admin_remarks TEXT,
    resolved_date DATE,
    ward VARCHAR(100) DEFAULT 'Belagavi Municipal Area'
);

-- Index optimization for geospatial and status queries
CREATE INDEX idx_status ON complaints(status);
CREATE INDEX idx_coords ON complaints(latitude, longitude);
CREATE INDEX idx_citizen_contact ON complaints(citizen_contact);
