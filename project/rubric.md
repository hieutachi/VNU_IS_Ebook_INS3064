# Capstone Project — Marking Rubric

**Course:** INS3064 — Web Programming with PHP  
**Project:** Campus Club Hub  
**Total Points:** 40 (40% of course grade)

---

## Grading Scale

| Grade | Points (per milestone) | Description |
|---|---|---|
| **Excellent** | 90–100% | Exceeds expectations. Clean code, fully functional, polished UI. |
| **Good** | 70–89% | Meets all requirements with minor issues. |
| **Pass** | 50–69% | Core functionality works but with notable gaps or quality issues. |
| **Fail** | 0–49% | Major features missing, non-functional, or not submitted. |

---

## M1 — Database Design (4 points)

| Criterion | Points | Excellent (4) | Good (3) | Pass (2) | Fail (0–1) |
|---|---|---|---|---|---|
| **Schema completeness** | 2 | All 5 tables created with correct data types, constraints, PKs, FKs, indexes. InnoDB engine. | All 5 tables present; minor data type or constraint issue (e.g., missing an index). | 3–4 tables present; some FKs or constraints missing. | Fewer than 3 tables; major schema errors. |
| **Seed data** | 1 | ≥ 3 admins, 5 students, 5 clubs, 10 events, memberships, RSVPs. Loads without errors. | All required entities present but fewer rows than specified. Loads without errors. | Seed data present but incomplete or contains SQL errors. | No seed data or file doesn't execute. |
| **ERD** | 1 | ERD is clear, accurate, shows all entities/attributes/relationships with cardinality and PK/FK notation. | ERD is accurate but missing some attributes or cardinality markings. | ERD is incomplete or has errors in relationships. | No ERD or ERD is incorrect/incomprehensible. |

---

## M2 — Static Pages + Basic PHP (4 points)

| Criterion | Points | Excellent (4) | Good (3) | Pass (2) | Fail (0–1) |
|---|---|---|---|---|---|
| **Page completeness** | 2 | All 4 pages (index, clubs, club_detail, events) present with rich, realistic content and hardcoded data. | All 4 pages present with adequate content. | 2–3 pages present; content is minimal. | Fewer than 2 pages or pages are blank/broken. |
| **Layout & responsive** | 1 | Clean Bootstrap grid layout; cards reflow correctly on mobile; hamburger nav works. | Layout works on desktop; minor responsive issues on mobile. | Basic layout present but broken on mobile or overlapping elements. | No layout structure; page is unstyled or broken. |
| **PHP includes** | 1 | `header.php` and `footer.php` included on every page with `require`/`include`. Navigation has active-page highlighting. | Header/footer included on all pages. Navigation works. | Header/footer included on some pages only, or include paths are fragile. | No use of includes; HTML duplicated on every page. |

---

## M3 — Database Connection (4 points)

| Criterion | Points | Excellent (4) | Good (3) | Pass (2) | Fail (0–1) |
|---|---|---|---|---|---|
| **PDO connection** | 1 | PDO singleton with `charset=utf8mb4`, `ERRMODE_EXCEPTION`, and proper error handling. Credentials in `config.php`. | PDO connection works; minor config issue (e.g., missing charset). | Connection works but uses `mysqli` or has hardcoded credentials. | No database connection or connection fails. |
| **Prepared statements** | 2 | 100% of queries use prepared statements. No string concatenation of user input into SQL anywhere. | All queries use prepared statements; 1–2 minor instances of concatenation for non-user input (e.g., table names). | Most queries use prepared statements; 1–2 instances of user input concatenated. | Queries use string concatenation with user input (SQL injection risk). |
| **Dynamic pages** | 1 | All pages fetch from DB. Search/filter works. Empty states handled gracefully. "No results" messages shown. | All pages fetch from DB. Search works. Minor issue with empty states. | Some pages still use hardcoded data. Search is partial. | Pages still show hardcoded data; no real DB integration. |

---

## M4 — CRUD Operations (5 points)

| Criterion | Points | Excellent (5) | Good (4) | Pass (3) | Fail (0–2) |
|---|---|---|---|---|---|
| **Create + Read** | 2 | Club and event creation works with full validation, success feedback, and immediate appearance in listings. | Create works; minor validation gap (e.g., no min-length check on name). | Create works for clubs but not events, or has significant validation issues. | Create doesn't work or crashes. |
| **Update** | 1 | Edit form pre-populates all fields. Update persists correctly. Optimistic approach: detects if record changed since load. | Edit works; all fields pre-populated and saved. | Edit works for most fields; 1–2 fields not pre-populated or not saved. | Edit doesn't work or overwrites with blank data. |
| **Delete** | 1 | Delete requires POST confirmation. Related records (events/RSVPs) handled per documented strategy. Redirect with flash message. | Delete works; related records handled. No confirmation flow. | Delete works but doesn't handle related records (orphan data). | Delete doesn't work or accessible via GET (security issue). |
| **Validation & UX** | 1 | Server-side validation on all fields. Error messages displayed inline next to fields. Form data preserved on error. | Server-side validation present. Errors shown at top of form. Data preserved. | Minimal validation. Errors shown but form data lost. | No validation. Raw errors or blank page on invalid input. |

---

## M5 — User Authentication (6 points)

| Criterion | Points | Excellent (6) | Good (5) | Pass (3–4) | Fail (0–2) |
|---|---|---|---|---|---|
| **Registration** | 1.5 | Full validation (name, email format, password strength, confirm password match). Duplicate email caught. Password hashed with `password_hash()`. | Registration works; password hashed; duplicate email caught. Minor validation gap. | Registration works but missing 1–2 validation checks (e.g., no confirm password). | Registration fails or stores plain-text passwords. |
| **Login / Logout** | 1.5 | Login with `password_verify()`. Generic error message ("Invalid email or password"). Session created with `session_regenerate_id()`. Logout destroys session fully. | Login works; password verified. Session created. Minor issue: no session regeneration or error message reveals which field was wrong. | Login works but has a security issue (e.g., timing attack via separate email/password error messages). | Login doesn't work or session not created. |
| **Role-based access** | 1.5 | `requireAdmin()` enforced on all admin pages. Admin can manage only their own clubs. Students blocked from admin pages with 403/redirect. | Role check on most admin pages. 1–2 pages accessible to students. | Role check on some pages; admin can edit any club (not just their own). | No role enforcement; anyone can access admin pages. |
| **Session security** | 1 | `session_regenerate_id()` on login. Session timeout/expiry handled. Auth state reflected in navbar. `requireLogin()` on protected pages. | Session regeneration on login. Auth check on most pages. Navbar updates. | Basic session handling. Missing regeneration. Navbar may not update. | Sessions not managed; predictable session IDs; no auth checks. |

---

## M6 — Events System (6 points)

| Criterion | Points | Excellent (6) | Good (5) | Pass (3–4) | Fail (0–2) |
|---|---|---|---|---|---|
| **Event detail page** | 1.5 | All fields displayed with correct formatting. Club name links to club detail. RSVP count and button shown. Past events marked. | Event detail complete. Club link works. Minor formatting issue. | Event detail present but missing some fields or links. | Event detail page doesn't exist or shows errors. |
| **RSVP functionality** | 1.5 | RSVP/cancel works via POST. Duplicate prevented by DB constraint + code check. RSVP count updates. Past events cannot be RSVP'd. | RSVP works. Duplicates prevented. Minor issue with count display or past event handling. | RSVP works but duplicates possible or count doesn't update. | RSVP doesn't work or throws errors. |
| **My RSVPs / Admin views** | 1.5 | Students see "My RSVPs" with cancel option. Admins see RSVP counts and attendee lists for their events. | Student and admin views present. Minor issue with one view. | Only student or only admin view works. | No personalised event views. |
| **Integration & filters** | 1.5 | Events CRUD fully integrated with auth. Filters (club, date range) work. Sorting options. All queries use prepared statements. | Events CRUD auth-gated. Basic filter works. | Events CRUD exists but auth is partial or filters don't work. | Events not integrated with auth system. |

---

## M7 — File Upload + Security (5 points)

| Criterion | Points | Excellent (5) | Good (4) | Pass (3) | Fail (0–2) |
|---|---|---|---|---|---|
| **File upload** | 1.5 | Club logos and event images upload, rename, and display correctly. Default placeholders shown. Upload helper function reusable. Profile photo optional. | Upload works for clubs and events. Defaults shown. Minor renaming issue. | Upload works for one type (club or event) but not both. | Upload doesn't work or saves files without validation. |
| **Upload validation** | 1 | MIME check with `finfo_file()`. Extension whitelist. Size limit (2 MB). Clear error messages for each failure type. | Validation present; uses `finfo_file()` or extension check (not both). Size limit enforced. | Basic validation (extension check only). No size limit. | No server-side validation; accepts any file. |
| **CSRF protection** | 1.5 | Token generated in `generateCSRF()` and validated in `validateCSRF()`. Present on **every** form. Missing/wrong token = rejected with error message. | CSRF on all major forms. 1–2 minor forms (e.g., profile edit) missing token. | CSRF on some forms (login, registration) but missing on CRUD forms. | No CSRF protection at all. |
| **XSS & `.htaccess`** | 1 | Every `echo` uses `htmlspecialchars()`. Tested with `<script>alert(1)</script>` inputs. `.htaccess` in uploads prevents PHP execution. | XSS protection on most outputs. `.htaccess` present. 1 minor output not escaped. | Some outputs escaped; inconsistency. `.htaccess` may be missing. | Unescaped user input rendered. No `.htaccess`. |

---

## M8 — AJAX + Polish (6 points)

| Criterion | Points | Excellent (6) | Good (5) | Pass (3–4) | Fail (0–2) |
|---|---|---|---|---|---|
| **AJAX search** | 1.5 | Live search on clubs and events pages. Results update as user types (debounced). JSON endpoint returns proper content type and status codes. | Live search works on one page. JSON returned correctly. Minor debounce issue. | Search submits via AJAX but doesn't update dynamically or returns HTML instead of JSON. | No AJAX search. |
| **AJAX CRUD/RSVP** | 1.5 | Join/leave club and RSVP update button state + count without page reload. Error handling with user-friendly messages. | AJAX join and RSVP work. Minor issue: count doesn't update or no error handling. | AJAX works for one action (join OR RSVP) but not both. | No AJAX for join/RSVP. |
| **Visual polish** | 1.5 | Professional, consistent design. Custom colour scheme. Smooth transitions/animations. Loading indicators on AJAX calls. Favicon. | Clean design. Consistent styles. Minor polish gaps (e.g., no loading indicator). | Basic Bootstrap look with minimal customisation. Some inconsistent styling. | Unstyled or broken layout. Missing CSS. |
| **Responsive + README** | 1.5 | Fully responsive at 360px/768px/1920px. README has screenshots, setup steps, features list, known issues, credits. Git has ≥ 20 meaningful commits. | Responsive at all breakpoints. README complete but missing screenshots or 1 section. Git has 15+ commits. | Responsive on desktop only. README is minimal (name + "run it"). Git has < 10 commits. | Not responsive. README is empty or missing. Git has 1–2 commits. |

---

## Overall Project Criteria

These criteria are evaluated holistically at the end of the project, **in addition to** per-milestone scores. They are assessed as qualitative feedback (not separate points) but directly influence whether borderline milestones receive the higher or lower grade within their range.

### Code Quality

| Level | Description |
|---|---|
| **Excellent** | Consistent naming conventions (camelCase for functions, snake_case for DB columns). Files are well-organised. Repeated code extracted into helper functions. Meaningful variable names. PHPDoc comments on all functions. |
| **Good** | Mostly consistent naming. Some repeated code. Variable names are clear. Functions have basic comments. |
| **Pass** | Mixed naming conventions. Significant code duplication. Some cryptic variable names. Minimal comments. |
| **Fail** | No consistency. Massive functions. Copy-pasted code blocks. No comments. |

### Security Posture

| Level | Description |
|---|---|
| **Excellent** | PDO prepared statements everywhere. `htmlspecialchars()` on all output. CSRF on all forms. Password hashed with bcrypt. File upload fully validated. No information leakage in error messages. |
| **Good** | Most security measures in place. 1 minor gap (e.g., one output not escaped). |
| **Pass** | Core security measures (PDO, password hash) but missing CSRF or inconsistent escaping. |
| **Fail** | SQL injection possible. Plain-text passwords. No CSRF. User input rendered raw. |

### UI/UX

| Level | Description |
|---|---|
| **Excellent** | Intuitive navigation. Clear visual hierarchy. Helpful feedback (success/error messages, loading states). Accessibility considered (alt text, labels, contrast). |
| **Good** | Easy to navigate. Feedback present. Minor accessibility gaps. |
| **Pass** | Functional but confusing navigation. Inconsistent feedback. No accessibility consideration. |
| **Fail** | Difficult to use. No feedback. Broken navigation. |

### Documentation

| Level | Description |
|---|---|
| **Excellent** | README is comprehensive and accurate. SQL files have comments. Code has inline comments explaining "why" not just "what". |
| **Good** | README is complete. SQL files are readable. Some code comments. |
| **Pass** | README exists but is minimal. No code comments. |
| **Fail** | No README. No comments. Undocumented decisions. |

---

## Bonus Points (up to +5 points total)

| Bonus | Points | Requirement |
|---|---|---|
| **Deployment to live hosting** | +2 | Deploy to a real web server (e.g., 000webhost, InfinityFree, university server, VPS). Provide a live URL. The site must be fully functional (not just the homepage). |
| **Git best practices** | +1 | ≥ 30 meaningful commits throughout the project. Branching used for features (not just `main`). Meaningful commit messages (not "fix" or "update"). `.gitignore` excludes `uploads/`, `.env`, OS files. |
| **Unit tests** | +1 | At least 5 unit tests using PHPUnit for helper functions (`sanitize()`, `generateCSRF()`, `validateCSRF()`, email validation, password hashing). Tests pass on the final submission. |
| **Accessibility** | +1 | WCAG 2.1 AA compliance: proper heading hierarchy, alt text on all images, form labels, keyboard navigable, colour contrast ≥ 4.5:1, screen reader tested. |

> **Note:** Bonus points are added **after** milestone scoring. Total grade is capped at 40/40 for milestone points, but bonus can push the component grade above 100% (useful if other course components need the buffer). The cap is 45/40.

---

## Penalties

| Violation | Penalty | Details |
|---|---|---|
| **Security vulnerability** | −5 per issue | SQL injection, XSS, plain-text passwords, missing CSRF on critical forms (login, CRUD), file upload without validation. Instructor's discretion on severity. |
| **Plagiarism / AI-generated code** | 0 on project | If code is clearly generated by AI and the student cannot explain it during the demo, the entire project receives 0. Collaboration must be documented. |
| **Missing milestone** | 0 for that milestone | Not submitting a milestone at all. Partial submission is always better. |
| **Late submission** | −10% per day | Applied to the individual milestone score. After 3 calendar days: 0. |
| **Framework/CMS usage** | 0 on project | Using Laravel, CodeIgniter, WordPress, or any unapproved framework results in 0 for the entire project. |
| **Hardcoded credentials in Git** | −2 | Database passwords or API keys committed to the repository. Use `.env` or `config.php` (excluded via `.gitignore`). |

---

## Grading Example

A student scores the following on each milestone:

| Milestone | Score | Max |
|---|---|---|
| M1 | 4 | 4 |
| M2 | 3 | 4 |
| M3 | 4 | 4 |
| M4 | 4 | 5 |
| M5 | 5 | 6 |
| M6 | 4 | 6 |
| M7 | 4 | 5 |
| M8 | 5 | 6 |
| **Subtotal** | **33** | **40** |
| Bonuses: Deployment (+2), Git (+1) | +3 | |
| Penalty: XSS vulnerability | −5 | |
| **Final** | **31** | **40 (77.5%)** |

---

## Instructor Notes

- During grading, the instructor will attempt to break the application by entering unexpected inputs (special characters, extremely long strings, SQL injection attempts, script tags).
- The instructor will test on both Chrome (desktop) and a mobile device or emulator.
- The instructor will check the Git log for commit frequency and message quality.
- A brief oral demo (5 minutes) may be required in Week 15 to verify the student's understanding of their own code.

---

*Document version: 1.0 — Last updated: Week 1*
