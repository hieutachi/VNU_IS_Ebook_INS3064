# Session 14 — In-Class Exercise: Security Methods

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session14_exercise.php` (and related files)

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session14\`
2. Test each file in browser via `http://localhost/INS3064/session14/`
3. Compress the folder into a `.zip` named `session14_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives

- Prevent SQL injection by using prepared statements for all database queries
- Prevent Cross-Site Scripting (XSS) by escaping all user-supplied output
- Prevent Cross-Site Request Forgery (CSRF) by adding tokens to forms
- Secure file uploads by validating MIME types, limiting sizes, and storing files safely
- Audit existing code for security vulnerabilities and apply fixes

---

## Exercise A: Secure Login (Required)

### Task Description

Build a **secure login form** that defends against the three most common web attacks: SQL injection, XSS, and CSRF. Every form includes a CSRF token, every database query uses a prepared statement, and every piece of output is escaped with `htmlspecialchars()`.

Create the following files:

```
secure_app/
├── config.php       ← DB connection, session setup, security helpers
├── login.php        ← Secure login form with CSRF token
├── register.php     ← Secure registration with CSRF token
├── dashboard.php    ← Protected page displaying user data
├── logout.php       ← Session destroy + redirect
└── style.css        ← Basic styling
```

### Step-by-Step Instructions

1. Create `config.php`:
   - Start session with secure settings (see Starter Code).
   - Connect to MySQL with PDO (exception mode, assoc fetch).
   - Create a `users` table with `id`, `username`, `email`, `password_hash`, `created_at`.
   - Add helper functions:
     - `generateCSRFToken()` — generates a random token, stores it in `$_SESSION['csrf_token']`, and returns it.
     - `getCSRFToken()` — returns the existing token or generates a new one.
     - `validateCSRFToken(string $token)` — compares the submitted token with the session token using `hash_equals()`. Returns `true`/`false`.
     - `e(string $value)` — shortcut for `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')`.

2. Create `login.php`:
   - On GET: display the login form with a hidden CSRF token field.
   - On POST:
     - Validate the CSRF token FIRST. If invalid, reject the request.
     - Look up the user by username using a **prepared statement**.
     - Verify the password with `password_verify()`.
     - On success: regenerate the session ID (`session_regenerate_id(true)`), set session variables, redirect.
     - On failure: show an error message.
   - All output is escaped with the `e()` function.

3. Create `register.php`:
   - Same CSRF token pattern.
   - Validate inputs (username, email, password, confirm password).
   - Check uniqueness with a prepared statement.
   - Hash password with `password_hash(PASSWORD_DEFAULT)`.
   - Insert with a prepared statement.

4. Create `dashboard.php`:
   - Check authentication (redirect to login if not logged in).
   - Display user information escaped with `e()`.
   - Include a logout link.

5. Create `logout.php`:
   - Destroy session, redirect to `login.php`.

### Starter Code

```php
<?php
// config.php — Security-focused configuration

// Secure session settings (call before session_start)
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.use_strict_mode', 1);

session_start();

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=secure_app;charset=utf8mb4',
        'root', '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,  // Use real prepared statements
        ]
    );
} catch (PDOException $e) {
    // Don't expose connection details to the user in production
    error_log('DB Error: ' . $e->getMessage());
    die('A database error occurred. Please try again later.');
}

// Create users table
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        username      VARCHAR(30) NOT NULL UNIQUE,
        email         VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

// Seed a test user
$check = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
$check->execute(['testuser']);
if ($check->fetchColumn() == 0) {
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute(['testuser', 'test@example.com', password_hash('password123', PASSWORD_DEFAULT)]);
}

/**
 * Generate or return the CSRF token.
 */
function csrfToken(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Generate a hidden input field with the CSRF token.
 */
function csrfField(): string
{
    return '<input type="hidden" name="csrf_token" value="' . e(csrfToken()) . '">';
}

/**
 * Validate the CSRF token from the POST request.
 */
function verifyCSRF(): bool
{
    if (empty($_POST['csrf_token']) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $_POST['csrf_token']);
}

/**
 * Escape output for HTML.
 */
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

/**
 * Check if user is logged in.
 */
function isLoggedIn(): bool
{
    return isset($_SESSION['user_id']);
}

/**
 * Require authentication.
 */
function requireLogin(): void
{
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}
```

```php
<?php
// login.php — Secure login with CSRF protection
require_once 'config.php';

if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$errors = [];
$old = ['username' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: Step 1 — Verify CSRF token FIRST
    // if (!verifyCSRF()) {
    //     $errors[] = 'Invalid form submission. Please try again.';
    // } else {
    //     TODO: Step 2 — Read and validate inputs
    //     $old['username'] = trim($_POST['username'] ?? '');
    //     $password = $_POST['password'] ?? '';

    //     TODO: Step 3 — Look up user with a prepared statement
    //     $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    //     $stmt->execute([$old['username']]);
    //     $user = $stmt->fetch();

    //     TODO: Step 4 — Verify password
    //     if ($user && password_verify($password, $user['password_hash'])) {
    //         // Regenerate session ID to prevent session fixation
    //         session_regenerate_id(true);

    //         $_SESSION['user_id']  = $user['id'];
    //         $_SESSION['username'] = $user['username'];

    //         header('Location: dashboard.php');
    //         exit;
    //     } else {
    //         $errors[] = 'Invalid username or password.';
    //     }
    // }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Secure Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>🔐 Secure Login</h1>

    <?php if (!empty($errors)): ?>
        <div class="errors">
            <?php foreach ($errors as $err): ?>
                <p>❌ <?= e($err) ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <?= csrfField() ?>
        <label>Username:
            <input type="text" name="username" value="<?= e($old['username']) ?>" required>
        </label>
        <label>Password:
            <input type="password" name="password" required>
        </label>
        <button type="submit">Login</button>
    </form>
    <p><a href="register.php">Create an account</a></p>
</body>
</html>
```

```php
<?php
// register.php — Secure registration with CSRF protection
require_once 'config.php';

if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$errors = [];
$old = ['username' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: Verify CSRF token
    // TODO: Read and validate all inputs
    // TODO: Check username and email uniqueness with prepared statements
    // TODO: Hash password and INSERT with prepared statement
    // TODO: Redirect to login.php on success
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>📝 Register</h1>

    <?php // TODO: Display errors ?>

    <form method="POST" action="register.php">
        <?= csrfField() ?>
        <!-- TODO: Username, Email, Password, Confirm Password fields -->
        <button type="submit">Register</button>
    </form>
    <p><a href="login.php">Already have an account? Login</a></p>
</body>
</html>
```

### Expected Output

The login form includes a hidden CSRF token (visible in page source):

```html
<input type="hidden" name="csrf_token" value="a1b2c3d4e5f6...64 hex chars...">
```

After successful login, redirected to the dashboard:

```
🏠 Secure Dashboard

Welcome, testuser!
Logged in since: 2025-01-15 14:30:00

[Logout]
```

CSRF attack simulation: submitting the form without the correct token shows:
```
❌ Invalid form submission. Please try again.
```

### Self-Check

- [ ] Every `<form>` includes a CSRF token field via `csrfField()`
- [ ] `verifyCSRF()` is called at the START of every POST handler, before any other logic
- [ ] `hash_equals()` is used for CSRF token comparison (not `===`)
- [ ] `session_regenerate_id(true)` is called after successful login
- [ ] All SQL queries use prepared statements (no string concatenation of user input)
- [ ] All HTML output is escaped with `e()` / `htmlspecialchars()`
- [ ] `PDO::ATTR_EMULATE_PREPARES` is set to `false` for real prepared statements
- [ ] Login error is generic (does not reveal whether username exists)

---

## Exercise B: Secure File Upload (Required)

### Task Description

Build a **secure file upload** system for product images. The upload must validate the real MIME type (not just the file extension), limit the file size to 2 MB, generate a random filename, and store uploaded files **outside the web root** so they cannot be accessed directly via URL.

### Step-by-Step Instructions

1. Create the directory structure:
   ```
   secure_app/
   ├── uploads_form.php    ← Upload form with CSRF token
   ├── uploads_handler.php ← Processes the upload
   ├── view_file.php       ← Serves uploaded files (authenticated)
   └── secure_uploads/     ← Outside web root (or protected with .htaccess)
   ```

2. Create `uploads_form.php`:
   - A form with `enctype="multipart/form-data"`.
   - A file input accepting images only: `<input type="file" name="product_image" accept="image/jpeg,image/png,image/gif,image/webp">`.
   - A hidden CSRF token field.
   - Display any upload errors.

3. Create `uploads_handler.php`:
   - Verify the CSRF token.
   - Validate the uploaded file:
     - Check `$_FILES['product_image']['error'] === UPLOAD_ERR_OK`.
     - Check file size ≤ 2 MB (`2 * 1024 * 1024`).
     - Validate MIME type using `finfo_file()` (NOT `$_FILES['type']`). Allow only: `image/jpeg`, `image/png`, `image/gif`, `image/webp`.
     - Validate file extension matches the MIME type.
   - Generate a safe filename: `bin2hex(random_bytes(16))` + correct extension.
   - Move the file to the `secure_uploads/` directory using `move_uploaded_file()`.
   - Store the file metadata in a `uploaded_files` table: `id`, `original_name`, `stored_name`, `mime_type`, `file_size`, `uploaded_at`.
   - Redirect to the form with a success message.

4. Create `view_file.php`:
   - Accept an `id` parameter from `$_GET`.
   - Look up the file metadata in the database.
   - If found, set the `Content-Type` header to the stored MIME type, and read the file with `readfile()`.
   - If not found, return a 404.
   - This page requires authentication (check session).

5. Protect the `secure_uploads/` directory:
   - Add a `.htaccess` file that denies all direct access:
     ```apache
     Deny from all
     ```

### Starter Code

```php
<?php
// uploads_form.php
require_once 'config.php';
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload Image</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>📤 Upload Product Image</h1>
    <a href="dashboard.php">← Back to Dashboard</a>

    <?php
    // TODO: Display success or error flash messages
    ?>

    <form method="POST" action="uploads_handler.php" enctype="multipart/form-data">
        <?= csrfField() ?>
        <label>Choose an image:
            <input type="file" name="product_image"
                   accept="image/jpeg,image/png,image/gif,image/webp" required>
        </label>
        <p class="help">Max 2 MB. Accepted: JPEG, PNG, GIF, WebP</p>
        <button type="submit">Upload</button>
    </form>
</body>
</html>
```

```php
<?php
// uploads_handler.php
require_once 'config.php';
requireLogin();

// TODO: Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: uploads_form.php');
    exit;
}

// TODO: Step 1 — Verify CSRF token
// if (!verifyCSRF()) { ... redirect with error ... }

// TODO: Step 2 — Check file upload errors
// if ($_FILES['product_image']['error'] !== UPLOAD_ERR_OK) { ... }

// TODO: Step 3 — Validate file size (max 2 MB)
// $maxSize = 2 * 1024 * 1024;
// if ($_FILES['product_image']['size'] > $maxSize) { ... }

// TODO: Step 4 — Validate MIME type with finfo_file (NOT $_FILES['type'])
// $finfo = new finfo(FILEINFO_MIME_TYPE);
// $mime = $finfo->file($_FILES['product_image']['tmp_name']);
// $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// if (!in_array($mime, $allowed)) { ... }

// TODO: Step 5 — Map MIME type to extension
// $extMap = ['image/jpeg' => '.jpg', 'image/png' => '.png',
//            'image/gif' => '.gif', 'image/webp' => '.webp'];
// $ext = $extMap[$mime];

// TODO: Step 6 — Generate safe filename
// $safeName = bin2hex(random_bytes(16)) . $ext;
// $destination = __DIR__ . '/secure_uploads/' . $safeName;

// TODO: Step 7 — Move uploaded file
// if (move_uploaded_file($_FILES['product_image']['tmp_name'], $destination)) {
//     TODO: Save metadata to database
//     TODO: Redirect with success message
// } else {
//     TODO: Redirect with error message
// }
```

```php
<?php
// view_file.php — Serve uploaded files securely
require_once 'config.php';
requireLogin();

// TODO: Get file id from $_GET
// TODO: Look up file metadata in database
// TODO: If found, set Content-Type header and readfile()
// TODO: If not found, return 404

// Example:
// $id = (int)($_GET['id'] ?? 0);
// $stmt = $pdo->prepare("SELECT * FROM uploaded_files WHERE id = ?");
// $stmt->execute([$id]);
// $file = $stmt->fetch();
//
// if (!$file) {
//     http_response_code(404);
//     echo 'File not found';
//     exit;
// }
//
// $path = __DIR__ . '/secure_uploads/' . $file['stored_name'];
// if (!file_exists($path)) {
//     http_response_code(404);
//     echo 'File not found on disk';
//     exit;
// }
//
// header('Content-Type: ' . $file['mime_type']);
// header('Content-Length: ' . $file['file_size']);
// readfile($path);
```

```apache
# secure_uploads/.htaccess — Deny all direct access
Deny from all
```

```sql
-- Add to config.php — create the uploaded_files table
CREATE TABLE IF NOT EXISTS uploaded_files (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    stored_name   VARCHAR(255) NOT NULL,
    mime_type     VARCHAR(50) NOT NULL,
    file_size     INT NOT NULL,
    uploaded_at   DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Expected Output

**Upload form:**

```
📤 Upload Product Image
[← Back to Dashboard]

+------------------------------------------+
| Choose an image: [Choose File] photo.jpg |
| Max 2 MB. Accepted: JPEG, PNG, GIF, WebP|
| [Upload]                                 |
+------------------------------------------+
```

**After successful upload:**

```
✅ Image "photo.jpg" uploaded successfully!
   Stored as: a1b2c3d4e5f6789012345678abcdef00.jpg
   Size: 1.2 MB | Type: image/jpeg
   [View File]
```

**Validation errors (various scenarios):**

```
❌ File size (3.5 MB) exceeds the 2 MB limit.
❌ Only JPEG, PNG, GIF, and WebP images are allowed.
   Detected type: application/pdf
```

### Self-Check

- [ ] Form has `enctype="multipart/form-data"`
- [ ] CSRF token is verified before processing the upload
- [ ] `finfo_file()` is used to detect MIME type (not `$_FILES['type']`)
- [ ] File size is checked against 2 MB limit
- [ ] Filename is random hex (`bin2hex(random_bytes(16))`), not user-supplied
- [ ] Files are stored in `secure_uploads/` with `.htaccess` denying direct access
- [ ] `view_file.php` checks authentication before serving files
- [ ] File metadata (original name, stored name, MIME, size) is saved to the database
- [ ] `move_uploaded_file()` is used (not `copy()`)

---

## Exercise C: Security Audit (Challenge/Bonus)

### Task Description

You are given a **vulnerable PHP file** (`vulnerable.php`) containing multiple security issues. Your task is to **find all the vulnerabilities**, document them, and **rewrite the file** with all fixes applied.

### Step-by-Step Instructions

1. Read the `vulnerable.php` code below carefully.
2. Identify every security vulnerability.
3. Create a file called `security_audit.md` listing each vulnerability with:
   - The line number(s) affected.
   - The type of vulnerability (SQL injection, XSS, CSRF, etc.).
   - A brief explanation of how an attacker could exploit it.
   - How you fixed it.
4. Create `secure_version.php` — the same functionality, but with all vulnerabilities fixed.

### Starter Code — The Vulnerable File

```php
<?php
// vulnerable.php — FIND AND FIX ALL SECURITY ISSUES

// ISSUE 1: No session_start(), no CSRF protection

$db = new mysqli('localhost', 'root', '', 'secure_app');

// ISSUE 2: Error messages expose sensitive information
if ($db->connect_error) {
    die('Connection failed: ' . $db->connect_error);
}

// ===== SEARCH FEATURE =====
if (isset($_GET['q'])) {
    $query = $_GET['q'];

    // ISSUE 3: SQL Injection
    $result = $db->query("SELECT * FROM users WHERE username LIKE '%" . $query . "%'");

    echo '<h2>Search Results for: ' . $query . '</h2>';

    while ($row = $result->fetch_assoc()) {
        // ISSUE 4: XSS — output not escaped
        echo '<div class="user">';
        echo '  <strong>' . $row['username'] . '</strong>';
        echo '  <p>' . $row['email'] . '</p>';
        echo '</div>';
    }
}

// ===== LOGIN FEATURE =====
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // ISSUE 5: SQL Injection in login
    $result = $db->query("SELECT * FROM users WHERE username = '" . $username . "' AND password = '" . $password . "'");

    // ISSUE 6: Passwords stored/compared in plaintext
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];
        // ISSUE 7: Session fixation — no session_regenerate_id()
        echo 'Welcome, ' . $user['username'] . '!';
    } else {
        // ISSUE 8: Reveals that the username exists (information disclosure)
        echo 'Wrong password for user: ' . $username;
    }
}

// ===== PROFILE UPDATE =====
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_bio'])) {
    $bio = $_POST['bio'];
    $userId = $_SESSION['user_id'];

    // ISSUE 9: SQL Injection in UPDATE
    $db->query("UPDATE users SET bio = '" . $bio . "' WHERE id = " . $userId);

    // ISSUE 10: No CSRF protection on the update form
    echo 'Bio updated! You wrote: ' . $bio;
    // ISSUE 11: XSS in confirmation message
}

// ===== FILE UPLOAD =====
if (isset($_FILES['avatar'])) {
    $filename = $_FILES['avatar']['name'];

    // ISSUE 12: No MIME type validation — uses original filename
    // ISSUE 13: No file size limit
    // ISSUE 14: Stores in web root — directly accessible
    move_uploaded_file($_FILES['avatar']['tmp_name'], 'uploads/' . $filename);

    echo 'Avatar uploaded: ' . $filename;
    // ISSUE 15: XSS — filename not escaped
}

// ISSUE 16: Using mysqli without prepared statements throughout
// ISSUE 17: No Content-Security-Policy or security headers
?>
```

### Vulnerability Checklist

Use this checklist to ensure you found all issues:

| # | Vulnerability Type | Description |
|---|-------------------|-------------|
| 1 | CSRF | No session management, no CSRF tokens |
| 2 | Information Disclosure | Database error message exposed to user |
| 3 | SQL Injection | User input directly in SELECT query |
| 4 | XSS | Username and email output without escaping |
| 5 | SQL Injection | User input directly in login query |
| 6 | Insecure Auth | Passwords compared as plaintext |
| 7 | Session Fixation | No `session_regenerate_id()` after login |
| 8 | Information Disclosure | "Wrong password for user: X" reveals username exists |
| 9 | SQL Injection | User input directly in UPDATE query |
| 10 | CSRF | No CSRF token on profile update form |
| 11 | XSS | Bio output not escaped |
| 12 | File Upload | No MIME type validation with `finfo` |
| 13 | File Upload | No file size limit |
| 14 | File Upload | Files stored in publicly accessible directory |
| 15 | XSS | Uploaded filename echoed without escaping |
| 16 | SQL Injection | Using `mysqli` queries without prepared statements |
| 17 | Security Headers | No security-related HTTP headers |

### Expected Output — `security_audit.md`

```markdown
# Security Audit Report — vulnerable.php

## Vulnerability #1: CSRF — Missing Session Management
- **Lines:** 1-2
- **Type:** CSRF / Authentication Bypass
- **Impact:** Without session management, there is no authentication. Any
  form submission could be forged by an attacker.
- **Fix:** Add `session_start()` at the top. Add CSRF tokens to all forms
  and validate them on POST.

## Vulnerability #2: Information Disclosure — Database Error
- **Lines:** 6-8
- **Type:** Information Disclosure
- **Impact:** Reveals database connection details (host, username, database name)
  to attackers, helping them plan further attacks.
- **Fix:** Log errors to a file; show a generic message to users.

(continue for all 17 vulnerabilities...)
```

### Self-Check

- [ ] All 17 vulnerabilities identified and documented in `security_audit.md`
- [ ] `secure_version.php` uses PDO with prepared statements for ALL queries
- [ ] All output is escaped with `htmlspecialchars()`
- [ ] CSRF tokens are present on all forms and validated on POST
- [ ] `password_hash()` / `password_verify()` used instead of plaintext
- [ ] `session_regenerate_id(true)` called after login
- [ ] Login error message is generic (no username disclosure)
- [ ] File upload validates MIME with `finfo_file()`, limits size, randomizes filename
- [ ] Security headers set (Content-Type-Options, X-Frame-Options, etc.)

---

## Submission Checklist

- [ ] Exercise A: Login form with CSRF token
- [ ] Exercise A: `verifyCSRF()` called before processing any POST form
- [ ] Exercise A: `hash_equals()` used for CSRF comparison
- [ ] Exercise A: `session_regenerate_id(true)` after login
- [ ] Exercise A: All queries use prepared statements
- [ ] Exercise A: All output escaped with `e()` / `htmlspecialchars()`
- [ ] Exercise B: File upload with `finfo_file()` MIME validation
- [ ] Exercise B: 2 MB size limit enforced
- [ ] Exercise B: Random hex filename, stored in `secure_uploads/`
- [ ] Exercise B: `.htaccess` denies direct access to uploads
- [ ] Exercise C (Bonus): All 17 vulnerabilities documented
- [ ] Exercise C (Bonus): `secure_version.php` fixes all issues
- [ ] Files uploaded to LMS as a ZIP folder

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and security features work | 4 | ☐ |
| **Exercise B** submitted and file upload is secure | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if CSRF, prepared statements, htmlspecialchars all used correctly
- Deduct 2 pts if file does not run or security features missing
- Deduct 1 pt if upload validation incomplete or .htaccess missing
