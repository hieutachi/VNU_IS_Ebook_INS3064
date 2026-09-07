# Project Milestones — Campus Club Hub

**Course:** INS3064 — Web Programming with PHP  
**Total Milestone Points:** 40 (40% of course grade)  
**Late Policy:** −10% per calendar day, up to 3 days. After 3 days: 0 marks for that milestone.

> **Important:** Each milestone builds on the previous one. Do not skip ahead — incomplete earlier milestones will make later milestones harder and cost you marks on the "integration" criterion in the final rubric.

---

## M1 — Database Design (Week 2) — 4 points

**Due:** End of Week 2  
**Tag:** `M1`

### Deliverables

- [ ] `sql/schema.sql` — All `CREATE TABLE` statements with correct data types, constraints, primary keys, foreign keys, indexes, and engine set to InnoDB.
- [ ] `sql/seed.sql` — Sample data (≥ 3 admin users, 5 student users, 5 clubs, 10 events, memberships, and RSVPs).
- [ ] `project/erd.png` or `project/erd.pdf` — Entity-Relationship Diagram (hand-drawn, draw.io, dbdiagram.io, or similar).
- [ ] `README.md` updated with your name, student ID, and a brief description of the project.

### Acceptance Criteria

1. All five tables from the spec (`users`, `clubs`, `events`, `club_members`, `event_rsvps`) are created.
2. All foreign keys are defined with appropriate `ON DELETE CASCADE` or `ON DELETE RESTRICT`.
3. Unique constraints exist where specified (email, club name, membership pairs, RSVP pairs).
4. Seed data loads without errors: `mysql -u root -p campus_club_hub < sql/schema.sql && mysql -u root -p campus_club_hub < sql/seed.sql`.
5. ERD clearly shows all entities, attributes, and relationships with cardinality.

### Connection to Next Milestone

M2 will display **hardcoded** data in PHP pages. M3 will replace that hardcoded data with live database queries. Your schema must be correct now — changing it later ripples through every milestone.

---

## M2 — Static Pages + Basic PHP (Week 4) — 4 points

**Due:** End of Week 4  
**Tag:** `M2`

### Deliverables

- [ ] `index.php` — Homepage with hero section, 3 featured clubs (hardcoded), and 3 upcoming events (hardcoded).
- [ ] `clubs.php` — Club listing page showing all clubs in a card grid (hardcoded array of ≥ 5 clubs).
- [ ] `club_detail.php` — Club detail page (hardcoded). Pass `?id=1` etc. via query string; use a PHP array to look up the club.
- [ ] `events.php` — Event listing page (hardcoded).
- [ ] `includes/header.php` — Shared HTML head, Bootstrap CSS/JS links, navigation bar with links to all pages.
- [ ] `includes/footer.php` — Shared footer (copyright, social links).
- [ ] `assets/css/style.css` — Custom styles (minimum: body font, card styles, hero banner).
- [ ] Responsive: pages look correct on both desktop and mobile widths.

### Acceptance Criteria

1. All four pages render valid HTML (passes W3C validator or browser dev-tools check).
2. Navigation bar appears on every page and links work correctly.
3. Club listing displays at least 5 club cards with name, image placeholder, and description.
4. `club_detail.php?id=X` shows different content depending on the ID.
5. Responsive layout: cards stack vertically on small screens.
6. PHP `include`/`require` used for header and footer on every page.

### Connection to Next Milestone

You will replace all hardcoded arrays with live database queries in M3. The page layouts and navigation you build here will carry forward unchanged — invest time in making them look good.

---

## M3 — Database Connection (Week 6) — 4 points

**Due:** End of Week 6  
**Tag:** `M3`

### Deliverables

- [ ] `includes/config.php` — Database credentials, base URL constant, `session_start()`.
- [ ] `includes/db.php` — PDO connection (singleton pattern or simple function). Error mode set to `PDO::ERRMODE_EXCEPTION`.
- [ ] `includes/functions.php` — At least: `sanitize($input)` (wraps `htmlspecialchars`), `formatDate($date)`.
- [ ] `clubs.php` updated — Fetches clubs from the database using PDO; search by name and filter by category (form-based, no AJAX yet).
- [ ] `club_detail.php` updated — Fetches single club + its events from the database.
- [ ] `events.php` updated — Fetches all upcoming events from the database, sorted by date.
- [ ] `index.php` updated — Fetches featured clubs and upcoming events from the database (e.g., LIMIT 3 each).

### Acceptance Criteria

1. `includes/db.php` creates a PDO connection with `charset=utf8mb4` and `ERRMODE_EXCEPTION`.
2. All queries use **prepared statements** — `$pdo->prepare()` + `$execute([params])`.
3. No raw user input is concatenated into SQL.
4. Club search works: typing a keyword filters the club list.
5. Club detail page shows real data including related events.
6. All dynamic output is passed through `htmlspecialchars()`.
7. If the database is empty, pages display a friendly "No clubs/events found" message instead of errors.

### Connection to Next Milestone

Pages now display live data. M4 will add the ability to **create, edit, and delete** that data through HTML forms.

---

## M4 — CRUD Operations (Week 8) — 5 points

**Due:** End of Week 8  
**Tag:** `M4`

### Deliverables

- [ ] `admin_club_form.php` — Create and edit club form. Mode determined by `?id=X` (edit) vs. no id (create). Pre-populates fields on edit.
- [ ] `admin_club_delete.php` — Processes club deletion (POST only, requires confirmation on the previous page).
- [ ] `admin_event_form.php` — Create and edit event form. Club is determined by the owning admin.
- [ ] `admin_event_delete.php` — Processes event deletion (POST only).
- [ ] `my_clubs.php` — Admin dashboard: lists the logged-in admin's clubs with Edit/Delete/Manage Events links. (Simple auth check — no full login system yet; use a hardcoded admin flag or simple check.)
- [ ] Form validation: required fields enforced server-side; error messages displayed to user; form re-populated on error.
- [ ] All forms use POST method.

### Acceptance Criteria

1. **Create:** Submitting the club form inserts a new row in `clubs`. Fields: name, category, description. (Logo upload comes in M7.)
2. **Read:** Club listing and detail pages still work correctly and reflect any new/edited/deleted data.
3. **Edit:** Clicking "Edit" pre-populates the form. Submitting updates the row.
4. **Delete:** Deleting a club removes it (or soft-deletes) and handles related events per your documented strategy.
5. **Events CRUD:** Same pattern — create, edit, delete events tied to a club.
6. **Validation:** Empty required fields trigger an error message. Duplicate club names are caught.
7. All database operations use prepared statements.
8. All output is escaped with `htmlspecialchars()`.

### Connection to Next Milestone

Right now, anyone can access admin forms. M5 will add user registration, login, and role-based access so only the club owner can manage their club.

---

## M5 — User Authentication (Week 10) — 6 points

**Due:** End of Week 10  
**Tag:** `M5`

### Deliverables

- [ ] `register.php` — Registration form (name, email, password, confirm password) + server-side processing.
- [ ] `login.php` — Login form + session creation.
- [ ] `logout.php` — Session destruction + redirect to homepage.
- [ ] `profile.php` — View and edit own profile (name, email, optionally photo — photo upload not required yet).
- [ ] `includes/auth.php` — Helper functions: `isLoggedIn()`, `requireLogin()`, `requireAdmin()`, `getCurrentUser()` (returns user row from DB by session user_id).
- [ ] `my_clubs.php` updated — Students see clubs they've joined. Admins see clubs they own.
- [ ] Admin pages protected: `admin_club_form.php`, `admin_event_form.php`, etc. call `requireAdmin()` at the top.
- [ ] Session security: `session_regenerate_id(true)` on login, session check on protected pages.
- [ ] Navbar updates: shows Login/Register when logged out; shows user name + Logout when logged in.
- [ ] `join_club.php` — POST handler: toggle join/leave a club. Requires login.

### Acceptance Criteria

1. **Registration:** Creates a new user with hashed password. Duplicate email is rejected with a friendly error.
2. **Login:** Correct credentials create a session and redirect to homepage. Wrong credentials show an error without revealing whether the email or password was wrong ("Invalid email or password").
3. **Logout:** Session is fully destroyed; accessing protected pages redirects to login.
4. **Role enforcement:** A student visiting `admin_club_form.php` gets redirected or sees a 403 page. An admin can access only their own clubs' edit pages.
5. **Password hashing:** `password_hash()` used on register; `password_verify()` used on login. Verify by checking the database — the `password` column contains a `$2y$` bcrypt hash.
6. **Session fixation prevention:** `session_regenerate_id(true)` called immediately after successful login.
7. **Join/Leave:** Clicking "Join Club" inserts into `club_members`; clicking "Leave" removes the row. Button text reflects current state.
8. All forms include proper validation and error display.

### Connection to Next Milestone

Authentication and roles are in place. M6 will extend the join/leave pattern to events (RSVP) and ensure events CRUD is fully integrated with the auth system.

---

## M6 — Events System (Week 11) — 6 points

**Due:** End of Week 11  
**Tag:** `M6`

### Deliverables

- [ ] `event_detail.php` — Full event detail page: title, description, date/time, location, club name (linked), RSVP count, RSVP button.
- [ ] `rsvp_event.php` — POST handler: toggle RSVP for logged-in students.
- [ ] `my_clubs.php` updated — For students: show a section "My RSVPs" listing events they've RSVP'd to. For admins: show RSVP counts for their events.
- [ ] `events.php` updated — Filter by club, filter by date range (upcoming / all), sort options.
- [ ] All admin event CRUD integrated with auth: only the club admin can create/edit/delete events for their club.
- [ ] RSVP count displayed on event cards and detail pages.
- [ ] Past events (date < now) are visually distinguished or shown separately.

### Acceptance Criteria

1. **Event Detail:** Displays all event fields correctly. Club name links back to `club_detail.php`.
2. **RSVP:** Logged-in students can RSVP and cancel. Duplicate RSVPs are prevented (unique constraint enforced).
3. **RSVP Count:** Displayed as `COUNT(*)` from `event_rsvps` — updated in real time (page refresh) or via AJAX (M8).
4. **Auth Integration:** Only the admin who owns the club can manage that club's events. Students can only RSVP.
5. **My RSVPs:** Students see a list of events they've RSVP'd to, with cancel option.
6. **Filters:** Filtering by club and by date works correctly with prepared statements.
7. **Past Events:** Clearly marked as "Past" or sorted to the bottom. Students cannot RSVP to past events.

### Connection to Next Milestone

Core functionality is now complete. M7 adds file uploads (club logos, event images) and comprehensive security (CSRF tokens on all forms).

---

## M7 — File Upload + Security (Week 13) — 5 points

**Due:** End of Week 13  
**Tag:** `M7`

### Deliverables

- [ ] `admin_club_form.php` updated — Logo upload field added. Image saved to `uploads/clubs/` with proper renaming.
- [ ] `admin_event_form.php` updated — Image upload field added. Image saved to `uploads/events/`.
- [ ] `profile.php` updated — Profile photo upload (optional feature, but demonstrates the same pattern).
- [ ] `includes/functions.php` updated — Add: `uploadImage($file, $directory, $prefix)` helper with full validation (MIME type via `finfo`, extension, size, rename).
- [ ] CSRF tokens on **every** form: login, register, club CRUD, event CRUD, join club, RSVP, profile edit.
- [ ] `includes/functions.php` updated — Add: `generateCSRF()` (creates token + hidden input HTML), `validateCSRF()` (checks POST token vs. session).
- [ ] `.htaccess` in `uploads/` directories — prevents PHP execution.
- [ ] Default placeholder images displayed when no file is uploaded.
- [ ] XSS audit: ensure every `echo` statement uses `htmlspecialchars()`.

### Acceptance Criteria

1. **Upload works:** Uploading a club logo saves the file and stores the path in the database. The image displays on the club listing and detail pages.
2. **Validation:** Uploading a non-image file or file > 2 MB is rejected with a clear error message.
3. **MIME check:** Server uses `finfo_file()` to verify the actual file type — not just the extension.
4. **CSRF:** Every form on the site includes a CSRF token. Submitting a form without the token (or with a wrong token) is rejected.
5. **`.htaccess`:** Visiting `uploads/clubs/test.php` does not execute PHP (returns 403 or shows source).
6. **XSS:** No unescaped user input is rendered anywhere. Instructor will test by entering `<script>alert(1)</script>` in form fields.
7. Default images display correctly when no custom image exists.

### Connection to Next Milestone

Security and uploads are complete. M8 brings the project to its final state with AJAX enhancements and polish.

---

## M8 — AJAX + Polish + Final Submission (Week 15) — 6 points

**Due:** End of Week 15  
**Tag:** `M8`

### Deliverables

- [ ] `ajax_search_clubs.php` — Returns JSON array of clubs matching a search query. Used by `clubs.php` for live search.
- [ ] `ajax_search_events.php` — Returns JSON array of events matching a query. Used by `events.php` for live search/filter.
- [ ] AJAX-powered join/leave club — No page reload. Button text and member count update dynamically.
- [ ] AJAX-powered RSVP — No page reload. Button text and RSVP count update dynamically.
- [ ] `assets/js/app.js` — All jQuery AJAX calls, form validation helpers, UI interactions (tooltips, confirmations, animations).
- [ ] `assets/css/style.css` finalised — Polished, consistent design. Custom colours, spacing, typography beyond bare Bootstrap.
- [ ] Responsive design final pass — Test on 360px, 768px, and 1920px viewports.
- [ ] Error handling — Graceful error messages for all edge cases (DB connection failure, missing records, permission denied, file upload errors).
- [ ] `README.md` — Complete documentation: project description, setup instructions (XAMPP, import SQL, configure `config.php`), features list, screenshots, known issues, your name/student ID.
- [ ] Git history — Meaningful commit messages throughout the project (not one giant commit at the end).

### Acceptance Criteria

1. **Live Search:** Typing in the search box on `clubs.php` or `events.php` filters results without a page reload. Results appear within 500ms.
2. **AJAX Join/Leave:** Clicking the join/leave button updates the UI instantly (button text, member count) without a full page reload. Uses `$.ajax` or `$.post`.
3. **AJAX RSVP:** Same pattern for event RSVP. RSVP count updates immediately.
4. **JSON Responses:** AJAX endpoints return proper JSON (`Content-Type: application/json`) with appropriate HTTP status codes.
5. **Error States:** If AJAX fails, a user-friendly error message appears (not a blank screen or browser console error).
6. **Visual Polish:** The site looks professional and consistent. No broken layouts, overlapping elements, or missing images.
7. **Responsive:** All pages are usable at 360px, 768px, and 1920px widths.
8. **README:** A new developer can clone the repo, follow the README, and have the app running within 10 minutes.
9. **Git:** At least 20 meaningful commits across the project lifetime. Commit messages describe what changed and why.

### Final Notes

- This is the final milestone. Ensure all features from M1–M7 still work correctly.
- Test edge cases: empty database, invalid IDs in URLs, expired sessions, large file uploads.
- Prepare for a brief (5-minute) in-class demo if required by your instructor.

---

## Milestone Summary

| # | Milestone | Week | Points | Key Skills |
|---|---|---|---|---|
| M1 | Database Design | 2 | 4 | SQL, ERD, Normalisation |
| M2 | Static Pages + Basic PHP | 4 | 4 | HTML, CSS, PHP basics, includes |
| M3 | Database Connection | 6 | 4 | PDO, prepared statements, dynamic pages |
| M4 | CRUD Operations | 8 | 5 | Forms, INSERT/UPDATE/DELETE, validation |
| M5 | User Authentication | 10 | 6 | Sessions, password hashing, role-based access |
| M6 | Events System | 11 | 6 | Relationships, RSVP, filtering, integration |
| M7 | File Upload + Security | 13 | 5 | File handling, CSRF, XSS, MIME validation |
| M8 | AJAX + Polish | 15 | 6 | jQuery AJAX, JSON, responsive design, docs |
| | **Total** | | **40** | |

---

*Document version: 1.0 — Last updated: Week 1*
