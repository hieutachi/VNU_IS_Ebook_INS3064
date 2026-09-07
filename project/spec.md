# Capstone Project Specification — Campus Club Hub

**Course:** INS3064 — Web Programming with PHP  
**Weight:** 40% of final grade (40 points across 8 milestones)  
**Duration:** 15 weeks  
**Team:** Individual  
**Submission:** Push to designated Git repository; notify instructor via course portal

---

## 1. Overview

**Campus Club Hub** is a PHP + MySQL web application that serves as a central platform for university club life. Students can discover clubs, browse upcoming events, join organisations they care about, and RSVP to events. Club administrators can manage their own clubs and events through a built-in management interface — no external admin panel or framework scaffolding required.

The project must be built from scratch using **raw PHP, PDO, and MySQL**. Laravel, CodeIgniter, WordPress, or any other framework/CMS is **not permitted**.

---

## 2. Technology Stack

| Layer | Requirement |
|---|---|
| **Language** | PHP 8.2 or later |
| **Database** | MySQL 8.0 or later (via XAMPP or standalone) |
| **Server** | Apache (XAMPP) on localhost during development |
| **Front-end** | HTML5, CSS3, jQuery 3.7.x, Bootstrap 5.x (optional but recommended) |
| **AJAX** | jQuery `$.ajax` / `$.post` / `$.get` — no Fetch API required |
| **Version Control** | Git (GitHub or GitLab) |

### 2.1 What You May NOT Use

- Any PHP framework (Laravel, Symfony, CodeIgniter, etc.)
- Any CMS (WordPress, Drupal, etc.)
- Composer packages other than `vlucas/phpdotenv` (optional, for env config)
- Pre-built admin templates that generate CRUD for you
- AI code generators that write entire files for you (use of AI for debugging and learning is fine — you must understand every line you submit)

---

## 3. Feature Requirements

### 3.1 User Authentication & Authorisation

| Feature | Description |
|---|---|
| **Registration** | New users register with: full name, email, password (min 8 chars, mixed case + number), optional profile photo. Email must be unique. Password stored with `password_hash()` (bcrypt). |
| **Login / Logout** | Session-based login with `$_SESSION`. Login form validates email + password with `password_verify()`. Session stores `user_id`, `user_name`, `user_role`. |
| **Roles** | Two roles: `student` (default) and `admin`. Admins can manage only clubs/events they own. |
| **Session Security** | Session regenerated on login (`session_regenerate_id(true)`). Logout destroys session. Auth pages redirect logged-in users. |
| **Access Control** | Admin-only pages check `$_SESSION['user_role'] === 'admin'` and redirect/403 otherwise. |

### 3.2 Club Management

| Feature | Description |
|---|---|
| **Club Listing** | Public page showing all clubs in a card/grid layout. Each card shows: club name, logo thumbnail, category tag, short description, member count. |
| **Search & Filter** | Text search (name/description) and category filter (dropdown). Works with standard form submission **and** AJAX (M8). |
| **Club Detail Page** | Full club profile: name, logo, category, full description, list of upcoming events, member list (names), "Join / Leave" button for students, "Edit" link for the club admin. |
| **Join / Leave Club** | Logged-in students can join or leave a club with a single click. Button state toggles. Membership stored in a junction table. |
| **Admin: Create Club** | Form with fields: name (required, unique), category (dropdown: Academic, Sports, Arts, Technology, Community, Other), description (textarea, rich text not required), logo upload (image). |
| **Admin: Edit Club** | Pre-populated form; same validation as create. Logo can be replaced. |
| **Admin: Delete Club** | Confirmation prompt → soft-delete (set `deleted_at` timestamp) or hard-delete (your choice, document it). Cascade or restrict related events — document your approach. |

### 3.3 Event Management

| Feature | Description |
|---|---|
| **Event Listing (Global)** | Public page listing all upcoming events across all clubs, sorted by date ascending. Shows: event title, club name, date/time, location, thumbnail image. |
| **Event Listing (Per Club)** | On the club detail page, a section listing that club's upcoming events. |
| **Event Detail Page** | Full details: title, description, date/time, location, club name (linked), event image, RSVP count, "RSVP" button for students. |
| **RSVP** | Logged-in students can RSVP / cancel RSVP. RSVP count displayed. A student can RSVP only once per event. |
| **Admin: Create Event** | Form fields: title, description, date/time (`datetime-local` input), location, optional image upload. Events belong to the admin's club. |
| **Admin: Edit Event** | Pre-populated form; same validation. |
| **Admin: Delete Event** | Confirmation prompt → delete event and cascade RSVPs. |

### 3.4 File Upload

| Requirement | Detail |
|---|---|
| **Club Logos** | Stored in `uploads/clubs/`. Accepted: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`. Max 2 MB. Rename to `{club_id}_logo.{ext}` on save. |
| **Event Images** | Stored in `uploads/events/`. Same accepted types. Max 2 MB. Rename to `{event_id}_image.{ext}` on save. |
| **Validation** | Server-side MIME type check (`finfo_file`), extension check, file size check. Never trust `$_FILES['type']` alone. |
| **Default Images** | If no image uploaded, display a placeholder from `assets/img/default_club.png` or `assets/img/default_event.png`. |

### 3.5 Security Requirements

| Requirement | Detail |
|---|---|
| **SQL Injection Prevention** | All database queries use **PDO prepared statements** with named or positional placeholders. No string concatenation of user input into SQL. |
| **XSS Prevention** | All dynamic output escaped with `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')`. |
| **CSRF Protection** | Every form includes a hidden CSRF token (`$_SESSION['csrf_token']`). Token validated on every POST request. Token regenerated on login. |
| **Password Security** | `password_hash()` with `PASSWORD_BCRYPT` (or default). `password_verify()` for checking. No MD5, SHA1, or plain text. |
| **Input Validation** | Server-side validation for all form inputs: required fields, string lengths, email format, date format, numeric ranges. Client-side validation (HTML5 / jQuery) is supplementary only — server-side is authoritative. |
| **Error Handling** | Database errors caught with try/catch. No raw MySQL errors shown to users. Display friendly error messages; log details to a file or PHP error log. |
| **File Upload Security** | See §3.4. Additionally, store uploads **outside** the web root if possible, or disable script execution in the upload directory via `.htaccess`. |

### 3.6 Responsive Design

- The site must be usable on screens from 360 px (mobile) to 1920 px (desktop).
- Use Bootstrap's grid system or CSS media queries.
- Navigation collapses to a hamburger menu on small screens.
- Cards reflow from multi-column to single-column on mobile.

---

## 4. File Structure

All PHP pages live in the **project root** (flat structure). No nested `pages/`, `admin/`, or `views/` folders — this is a course convention to keep navigation simple and paths predictable.

```
campus-club-hub/
├── index.php                  # Homepage — hero banner, featured clubs, upcoming events
├── clubs.php                   # Club listing (search/filter)
├── club_detail.php             # Single club view (?id=X)
├── events.php                  # Global event listing
├── event_detail.php            # Single event view (?id=X)
├── register.php                # Registration form + processing
├── login.php                   # Login form + processing
├── logout.php                  # Destroy session, redirect
├── profile.php                 # User profile (view/edit own profile)
├── my_clubs.php                # Student: clubs I've joined / Admin: my clubs
├── admin_club_form.php         # Create / Edit club (one file, mode based on ?id)
├── admin_event_form.php        # Create / Edit event (one file, mode based on ?id)
├── admin_club_delete.php       # Handle club deletion (POST only)
├── admin_event_delete.php      # Handle event deletion (POST only)
├── join_club.php               # Handle join/leave club (POST only)
├── rsvp_event.php              # Handle RSVP/cancel (POST only)
├── ajax_search_clubs.php       # AJAX endpoint: return club search results as JSON
├── ajax_search_events.php      # AJAX endpoint: return event search results as JSON
├── api_club.php                # AJAX endpoint: CRUD clubs via JSON (optional M8 extension)
│
├── includes/
│   ├── config.php              # DB credentials, base URL, session_start()
│   ├── db.php                  # PDO connection singleton
│   ├── auth.php                # Helper functions: isLoggedIn(), requireLogin(), requireAdmin(), getCurrentUser()
│   ├── header.php              # HTML <head>, navbar, CSRF token setup
│   ├── footer.php              # Footer HTML, closing tags, JS includes
│   └── functions.php           # Shared helpers: sanitize(), generateCSRF(), validateCSRF(), flash messages, slugify()
│
├── assets/
│   ├── css/
│   │   └── style.css           # Custom styles (beyond Bootstrap)
│   ├── js/
│   │   └── app.js              # jQuery: AJAX calls, form validation, UI interactions
│   └── img/
│       ├── default_club.png    # Placeholder club logo
│       ├── default_event.png   # Placeholder event image
│       └── hero.jpg            # Homepage banner (optional)
│
├── uploads/
│   ├── clubs/                  # Uploaded club logos
│   └── events/                 # Uploaded event images
│
├── sql/
│   ├── schema.sql              # CREATE TABLE statements
│   └── seed.sql                # Sample data (≥ 5 clubs, 10 events, 3 users per role)
│
├── .htaccess                   # Deny script execution in uploads/
├── .env.example                # Template for DB credentials (do not commit real .env)
└── README.md                   # Setup instructions, features list, your name/student ID
```

> **Note:** The `includes/` directory is the one exception to the "flat" rule. It exists solely for reusable PHP fragments that are `include`d or `require`d — not navigable pages. The instructor must be able to type any top-level `.php` file name in the browser and see a working page.

---

## 5. Database Schema

### 5.1 Required Tables

#### `users`

| Column | Type | Constraints |
|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT |
| `full_name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE |
| `password` | VARCHAR(255) | NOT NULL (bcrypt hash) |
| `role` | ENUM('student','admin') | DEFAULT 'student' |
| `profile_photo` | VARCHAR(255) | NULLABLE (file path) |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

#### `clubs`

| Column | Type | Constraints |
|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT |
| `name` | VARCHAR(150) | NOT NULL, UNIQUE |
| `category` | ENUM('Academic','Sports','Arts','Technology','Community','Other') | NOT NULL |
| `description` | TEXT | NOT NULL |
| `logo` | VARCHAR(255) | NULLABLE (file path) |
| `admin_id` | INT | FK → `users.id`, NOT NULL |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE |
| `deleted_at` | DATETIME | NULLABLE (soft-delete) |

#### `events`

| Column | Type | Constraints |
|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT |
| `club_id` | INT | FK → `clubs.id`, NOT NULL, ON DELETE CASCADE |
| `title` | VARCHAR(200) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `event_date` | DATETIME | NOT NULL |
| `location` | VARCHAR(255) | NOT NULL |
| `image` | VARCHAR(255) | NULLABLE (file path) |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

#### `club_members` (junction table)

| Column | Type | Constraints |
|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT |
| `club_id` | INT | FK → `clubs.id`, ON DELETE CASCADE |
| `user_id` | INT | FK → `users.id`, ON DELETE CASCADE |
| `joined_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| | | UNIQUE(`club_id`, `user_id`) — no duplicate memberships |

#### `event_rsvps` (junction table)

| Column | Type | Constraints |
|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT |
| `event_id` | INT | FK → `events.id`, ON DELETE CASCADE |
| `user_id` | INT | FK → `users.id`, ON DELETE CASCADE |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| | | UNIQUE(`event_id`, `user_id`) — one RSVP per student per event |

### 5.2 Indexes

- `clubs.admin_id` — index (foreign key lookup)
- `clubs.category` — index (filter queries)
- `events.club_id` — index (foreign key lookup)
- `events.event_date` — index (sorting upcoming events)
- `club_members.user_id` — index (find all clubs a user belongs to)
- `event_rsvps.user_id` — index (find all events a user RSVP'd to)

### 5.3 Seed Data

Your `seed.sql` must include **at minimum**:

| Entity | Count |
|---|---|
| Admin users | 3 (each owning one or more clubs) |
| Student users | 5 |
| Clubs | 5 (across at least 4 different categories) |
| Events | 10 (spread across clubs, some past, some future) |
| Club memberships | 15 (students joining various clubs) |
| Event RSVPs | 10 (students RSVPing to various events) |

Use `password_hash('password123', PASSWORD_BCRYPT)` for seed passwords so you can log in during testing.

---

## 6. Submission & Grading

- Each milestone has its own due date and deliverables (see `milestones.md`).
- Push your code to the Git repository **before** the due date/time.
- Tag each milestone release: `M1`, `M2`, ... `M8`.
- The instructor will pull your latest tagged commit for grading.
- See `rubric.md` for detailed marking criteria.

---

## 7. Frequently Asked Questions

**Q: Can I use Bootstrap?**  
A: Yes, Bootstrap 5.x is recommended but not required. You may use Tailwind or write custom CSS if you prefer.

**Q: Can I use a CSS framework template (e.g., Start Bootstrap)?**  
A: You may use a Bootstrap template as a starting point for layout, but you must customise it significantly and credit the source in your README.

**Q: Do I need to deploy to a live server?**  
A: Not required. Development on XAMPP localhost is acceptable. Deployment to live hosting earns bonus marks (see `rubric.md`).

**Q: Can I add features beyond what's listed?**  
A: Absolutely — extra features may earn bonus marks as long as all required features work correctly first.

**Q: What if I get stuck on a milestone?**  
A: Attend office hours or post on the course forum. Partial submissions earn partial marks. It is always better to submit what you have than to submit nothing.

---

*Document version: 1.0 — Last updated: Week 1*
