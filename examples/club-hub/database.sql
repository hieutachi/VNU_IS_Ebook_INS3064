-- ============================================================
-- database.sql — Campus Club Hub schema and sample data
--
-- Run this file once to create the database, tables, and
-- seed data.  In phpMyAdmin use the Import tab; from the CLI:
--     mysql -u root < database.sql
-- ============================================================

-- Drop and recreate the database (safe for classroom resets)
DROP DATABASE IF EXISTS club_hub;
CREATE DATABASE club_hub
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE club_hub;

-- ─────────────────────────────────────────────────────────────
-- TABLE: users
-- Stores student and admin accounts.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(255)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,          -- bcrypt hash (60 chars)
    role       ENUM('student', 'admin') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- TABLE: clubs
-- Each club is created by an admin.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE clubs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(150)  NOT NULL,
    description TEXT          NOT NULL,
    category    VARCHAR(100)  NOT NULL DEFAULT 'General',
    meeting_day VARCHAR(20)   DEFAULT NULL,      -- e.g. 'Wednesday'
    meeting_time VARCHAR(20)  DEFAULT NULL,      -- e.g. '18:00'
    created_by  INT           DEFAULT NULL,      -- FK → users.id (admin)
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_clubs_creator
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- TABLE: events
-- Events belong to a club.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE events (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    club_id     INT           NOT NULL,
    title       VARCHAR(200)  NOT NULL,
    description TEXT          NOT NULL,
    event_date  DATE          NOT NULL,
    location    VARCHAR(200)  DEFAULT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_events_club
        FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- INDEXES
-- Speed up common look-ups.
-- ─────────────────────────────────────────────────────────────
CREATE INDEX idx_events_club    ON events (club_id);
CREATE INDEX idx_events_date    ON events (event_date);
CREATE INDEX idx_clubs_category ON clubs  (category);

-- ─────────────────────────────────────────────────────────────
-- SEED DATA
-- ─────────────────────────────────────────────────────────────

-- Users
-- Passwords are generated with PHP's password_hash('...', PASSWORD_DEFAULT).
--   admin123   → $2y$10$...  (bcrypt hash below)
--   student123 → $2y$10$...  (bcrypt hash below)
--
-- In a real app you would never hard-code password hashes;
-- these are pre-computed hashes of the simple classroom passwords.

INSERT INTO users (name, email, password, role) VALUES
-- bcrypt hashes generated with: password_hash('admin123', PASSWORD_DEFAULT)
('Admin User',      'admin@clubhub.edu',    '$2y$10$SYgSYXFtX4VW6QwApUZKu.tvX9JSrxE0D9p2Td6VoGS3bmAvFWl9K', 'admin'),
-- bcrypt hash of: student123
('Alice Nguyen',    'alice@student.edu',    '$2y$10$x1uxHpd/Xh2Vg8I5rWyuzex.9Nv2d1zXP7frLCw/7KwXjj7LuVOqe', 'student'),
('Bob Tran',        'bob@student.edu',      '$2y$10$x1uxHpd/Xh2Vg8I5rWyuzex.9Nv2d1zXP7frLCw/7KwXjj7LuVOqe', 'student');

-- Clubs
INSERT INTO clubs (name, description, category, meeting_day, meeting_time, created_by) VALUES
('Coding Club',           'Learn programming, solve problems, and build projects together.',       'Technology',  'Wednesday', '18:00', 1),
('Photography Society',   'Capture campus life and improve your photography skills.',             'Arts',        'Friday',    '17:00', 1),
('Debate Club',           'Sharpen your critical thinking and public speaking abilities.',        'Academic',    'Tuesday',   '19:00', 1),
('Green Campus',          'Environmental awareness campaigns and sustainability projects.',       'Social',      'Thursday',  '16:00', 1),
('Music Ensemble',        'Open to all instruments and skill levels — jam sessions and recitals.','Arts',        'Monday',    '18:30', 1);

-- Events
INSERT INTO events (club_id, title, description, event_date, location) VALUES
(1, 'Intro to PHP Workshop',   'Hands-on session covering PHP basics and form processing.', '2025-09-15', 'Lab B-204'),
(1, 'Hackathon Night',         '24-hour coding challenge — prizes for top three teams.',    '2025-10-20', 'Innovation Hub'),
(2, 'Campus Photo Walk',       'Explore the campus with your camera — all skill levels.',   '2025-09-22', 'Main Gate'),
(2, 'Portrait Photography',    'Studio lighting and portrait composition techniques.',      '2025-10-05', 'Art Studio A'),
(3, 'Public Speaking Workshop','Overcome stage fright and deliver compelling arguments.',   '2025-09-18', 'Auditorium C'),
(3, 'Inter-University Debate', 'Represent our university in the regional debate tournament.','2025-11-10', 'Conference Hall'),
(4, 'Tree Planting Day',       'Help us plant 50 trees along the campus greenway.',         '2025-09-28', 'South Lawn'),
(5, 'Open Mic Night',          'Bring your instrument or your voice — everyone is welcome.', '2025-10-01', 'Student Center');
