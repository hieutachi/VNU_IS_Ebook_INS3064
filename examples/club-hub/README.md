# Campus Club Hub — Worked Example

A minimal, complete PHP web application for the **INS3064 — Web Programming with PHP** course.
Students reference this example throughout Sessions 1–12 to see best-practice patterns in action.

---

## What This Example Demonstrates

| Pattern | Where to look |
|---|---|
| PDO with prepared statements | `config.php`, `login.php`, `club_detail.php` |
| `htmlspecialchars()` on every output | All `.php` files in the root |
| `password_hash` / `password_verify` | `register.php`, `login.php` |
| CSRF tokens on every form | `login.php`, `register.php`, `add_club.php` |
| POST → Redirect → GET (PRG) | `login.php`, `register.php`, `add_club.php` |
| Session-based authentication | `includes/auth.php`, `login.php` |
| Role-based access control (admin / student) | `add_club.php`, `includes/auth.php` |
| Simple include-based structure | `includes/header.php`, `includes/footer.php` |
| JSON API endpoint (AJAX) | `api/search.php` |

---

## File Map

```
club-hub/
├── README.md            ← You are here
├── config.php           ← Database connection (PDO), constants
├── database.sql         ← MySQL schema + sample data
├── index.php            ← Homepage — lists all clubs
├── club_detail.php      ← Single club page with events
├── login.php            ← Login form (CSRF, prepared stmt, password_verify)
├── register.php         ← Registration form (CSRF, password_hash, validation)
├── add_club.php         ← Add club (admin only, CSRF, PRG pattern)
├── style.css            ← Basic styling
├── includes/
│   ├── header.php       ← Common <head>, navigation, session check
│   ├── footer.php       ← Common closing HTML
│   ├── auth.php         ← Auth helpers: isLoggedIn(), requireLogin(), requireRole()
│   └── csrf.php         ← CSRF helpers: generateToken(), verifyToken()
├── api/
│   └── search.php       ← JSON endpoint for AJAX club search
├── css/                 ← (reserved for future stylesheets)
├── js/                  ← (reserved for future JavaScript)
├── sql/                 ← (reserved for additional SQL scripts)
└── uploads/             ← (reserved for uploaded files)
```

---

## Setup Instructions

### Prerequisites

- **PHP 8.1+** (with `pdo_mysql` extension enabled)
- **MySQL 8** or **MariaDB 10.5+**
- A local web server (XAMPP, MAMP, Laragon, or `php -S localhost:8000`)

### Step-by-step

1. **Create the database** — Open phpMyAdmin or the MySQL CLI and run:

   ```sql
   source database.sql;
   ```

   Or import `database.sql` via phpMyAdmin's *Import* tab.

2. **Configure the connection** — Open `config.php` and update these constants
   if your MySQL credentials differ from the defaults:

   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'club_hub');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```

3. **Start the PHP built-in server** (for quick testing):

   ```bash
   cd club-hub
   php -S localhost:8000
   ```

4. **Open** `http://localhost:8000` in your browser.

### Default Accounts (pre-loaded by `database.sql`)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@clubhub.edu` | `admin123` |
| Student | `alice@student.edu` | `student123` |

> ⚠️ These passwords are intentionally weak for classroom use.
> In production, always enforce strong passwords.

---

## Key Security Notes for Students

1. **Never concatenate user input into SQL.** Always use prepared statements with
   `?` placeholders (see every database query in this example).
2. **Escape ALL output.** Use `<?php echo htmlspecialchars($var, ENT_QUOTES, 'UTF-8'); ?>`
   whenever a PHP variable appears in HTML.
3. **Hash passwords, never store plaintext.** Use `password_hash()` on registration
   and `password_verify()` on login.
4. **Include a CSRF token in every form** and verify it on submission
   (`includes/csrf.php`).
5. **Use the PRG pattern** after successful form submissions to prevent duplicate
   form resubmission on refresh.

---

## License

This example is provided for educational use in the INS3064 course.
