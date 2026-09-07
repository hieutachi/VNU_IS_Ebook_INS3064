# Session 13 — In-Class Exercise: Cookies and Sessions

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session13_exercise.php` (and related files)

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session13\`
2. Test each file in browser via `http://localhost/INS3064/session13/`
3. Compress the folder into a `.zip` named `session13_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives

- Use `session_start()` and `$_SESSION` to manage user state across pages
- Implement user registration with `password_hash()` and login with `password_verify()`
- Set and read cookies with `setcookie()` including security attributes
- Build a "Remember Me" feature that persists login across browser restarts
- Implement role-based access control (admin vs. regular user)

---

## Exercise A: Login System (Required)

### Task Description

Build a **registration and login system** using PHP sessions. New users register with a username, email, and password (hashed with `password_hash`). Returning users log in with their credentials (verified with `password_verify`). Once logged in, their username is stored in `$_SESSION` and displayed on every page.

Create the following files:

```
auth_app/
├── config.php       ← DB connection + table setup
├── register.php     ← Registration form and handler
├── login.php        ← Login form and handler
├── logout.php       ← Destroy session, redirect to login
├── dashboard.php    ← Protected page (only for logged-in users)
├── includes/
│   ├── header.php   ← Shared HTML header (shows username if logged in)
│   └── footer.php   ← Shared HTML footer
└── style.css        ← Basic styling
```

### Step-by-Step Instructions

1. Create `config.php`:
   - Start the session (`session_start()`).
   - Connect to MySQL with PDO.
   - Create a `users` table with columns: `id`, `username` (UNIQUE), `email` (UNIQUE), `password_hash`, `role` (ENUM: 'user', 'admin', DEFAULT 'user'), `created_at`.
   - Insert a default admin user: username `admin`, password `admin123` (hashed with `password_hash()`).

2. Create `register.php`:
   - On GET: display a registration form with Username, Email, Password, and Confirm Password fields.
   - On POST: validate:
     - Username: not empty, 3–30 characters, alphanumeric + underscore only.
     - Email: valid format (`filter_var` with `FILTER_VALIDATE_EMAIL`).
     - Password: at least 6 characters.
     - Confirm password: must match password.
   - Check that username and email are not already taken (query the database).
   - If valid: hash the password with `password_hash($password, PASSWORD_DEFAULT)`, insert into DB, redirect to `login.php` with a success message.
   - If invalid: redisplay form with errors and sticky values.

3. Create `login.php`:
   - On GET: display a login form with Username and Password fields.
   - On POST: look up the user by username. If found, verify with `password_verify($password, $user['password_hash'])`.
   - On success: store `user_id`, `username`, and `role` in `$_SESSION`, redirect to `dashboard.php`.
   - On failure: show "Invalid username or password" (do not reveal which one was wrong).

4. Create `dashboard.php`:
   - Check if the user is logged in: if `$_SESSION['user_id']` is not set, redirect to `login.php`.
   - Display a welcome message with the username.
   - Include a "Logout" link.

5. Create `logout.php`:
   - Destroy the session (`session_destroy()`).
   - Redirect to `login.php`.

6. Create `includes/header.php` and `includes/footer.php`:
   - `header.php`: HTML boilerplate, nav bar that shows the username and "Logout" link if logged in, or "Login | Register" links if not.
   - `footer.php`: closing HTML tags and copyright.

### Starter Code

```php
<?php
// config.php
session_start();

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=auth_app;charset=utf8mb4',
        'root', '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Create users table
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        username      VARCHAR(30) NOT NULL UNIQUE,
        email         VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role          ENUM('user', 'admin') DEFAULT 'user',
        created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

// Seed admin user (only if not exists)
$adminCheck = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = 'admin'");
$adminCheck->execute();
if ($adminCheck->fetchColumn() == 0) {
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, 'admin')");
    $stmt->execute(['admin', 'admin@example.com', password_hash('admin123', PASSWORD_DEFAULT)]);
}

/**
 * Check if the user is logged in.
 */
function isLoggedIn(): bool
{
    return isset($_SESSION['user_id']);
}

/**
 * Require login — redirect to login page if not authenticated.
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
// register.php
require_once 'config.php';

$errors = [];
$old = ['username' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: Read form values
    $old['username'] = trim($_POST['username'] ?? '');
    $old['email']    = trim($_POST['email'] ?? '');
    $password        = $_POST['password'] ?? '';
    $confirm         = $_POST['confirm_password'] ?? '';

    // TODO: Validate username (not empty, 3-30 chars, alphanumeric+underscore)
    // TODO: Validate email (filter_var with FILTER_VALIDATE_EMAIL)
    // TODO: Validate password (min 6 chars)
    // TODO: Validate confirm password matches
    // TODO: Check username and email uniqueness in DB
    // TODO: If no errors, hash password and INSERT
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

    <?php // TODO: Display validation errors ?>

    <form method="POST" action="register.php">
        <label>Username:
            <input type="text" name="username" value="<?= htmlspecialchars($old['username']) ?>" required>
        </label>
        <label>Email:
            <input type="email" name="email" value="<?= htmlspecialchars($old['email']) ?>" required>
        </label>
        <label>Password:
            <input type="password" name="password" required minlength="6">
        </label>
        <label>Confirm Password:
            <input type="password" name="confirm_password" required>
        </label>
        <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="login.php">Login here</a></p>
</body>
</html>
```

```php
<?php
// login.php
require_once 'config.php';

// TODO: If already logged in, redirect to dashboard.php

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    // TODO: Look up user by username
    // TODO: Verify password with password_verify()
    // TODO: On success, set $_SESSION['user_id'], $_SESSION['username'], $_SESSION['role']
    // TODO: Redirect to dashboard.php
    // TODO: On failure, set $error = 'Invalid username or password'
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>🔐 Login</h1>

    <?php if ($error): ?>
        <p class="error"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <label>Username:
            <input type="text" name="username" required>
        </label>
        <label>Password:
            <input type="password" name="password" required>
        </label>
        <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="register.php">Register here</a></p>
</body>
</html>
```

```php
<?php
// dashboard.php
require_once 'config.php';
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>🏠 Dashboard</h1>
    <p>Welcome, <strong><?= htmlspecialchars($_SESSION['username']) ?></strong>!</p>
    <p>Your role: <em><?= htmlspecialchars($_SESSION['role']) ?></em></p>
    <a href="logout.php">Logout</a>
</body>
</html>
```

```php
<?php
// logout.php
require_once 'config.php';

// TODO: Destroy the session
// TODO: Redirect to login.php
```

### Expected Output

**Registration** — filling out the form and submitting creates the account:

```
📝 Register
+-------------------------------------+
| Username:  [johndoe          ]      |
| Email:     [john@example.com ]      |
| Password:  [••••••           ]      |
| Confirm:   [••••••           ]      |
| [Register]                          |
+-------------------------------------+
Already have an account? Login here
```

**Login** — after successful login, redirected to dashboard:

```
🏠 Dashboard

Welcome, johndoe!
Your role: user

[Logout]
```

### Self-Check

- [ ] `password_hash()` is used when storing passwords (registration)
- [ ] `password_verify()` is used when checking passwords (login)
- [ ] `$_SESSION` stores `user_id`, `username`, and `role` on login
- [ ] `dashboard.php` redirects to `login.php` if user is not logged in
- [ ] `logout.php` calls `session_destroy()` and redirects to `login.php`
- [ ] Login error message is generic ("Invalid username or password")
- [ ] Username and email uniqueness is checked before registration
- [ ] All output is escaped with `htmlspecialchars()`

---

## Exercise B: Remember Me (Required)

### Task Description

Add a **"Remember Me"** checkbox to the login form. When checked, a secure cookie is set that automatically logs the user back in when they return — even after closing the browser.

### Step-by-Step Instructions

1. Generate a **remember token** when a user logs in with "Remember Me" checked:
   - Create a random token: `bin2hex(random_bytes(32))`.
   - Store the token hash in a new `remember_tokens` table (columns: `id`, `user_id` FK, `token_hash` VARCHAR(64), `expires_at` DATETIME).
   - Set a cookie named `remember_me` with the raw token value.

2. Add auto-login logic to `config.php` (at the top, after `session_start`):
   - If the user is NOT logged in (no `$_SESSION['user_id']`) but the `remember_me` cookie exists:
     - Hash the cookie value and look it up in `remember_tokens`.
     - If found and not expired, log the user in by setting `$_SESSION` values.
     - Delete the used token and issue a new one (token rotation).

3. Update `login.php`:
   - Add a "Remember Me" checkbox to the form.
   - On successful login, if checked, generate and store the token.

4. Update `logout.php`:
   - Delete the remember token from the database.
   - Delete the `remember_me` cookie.

5. Set proper cookie security attributes:
   - `httponly` → true (JavaScript cannot read the cookie)
   - `secure` → true if on HTTPS, false for localhost development
   - `samesite` → `'Lax'`
   - `expires` → time() + 30 days
   - `path` → `'/'`

### Starter Code

```sql
-- Add to config.php — create the remember_tokens table

CREATE TABLE IF NOT EXISTS remember_tokens (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```php
<?php
// Add to login.php — inside the POST handler, after successful login

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... existing login validation ...

    if ($user && password_verify($password, $user['password_hash'])) {
        // Set session
        $_SESSION['user_id']  = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role']     = $user['role'];

        // TODO: Handle "Remember Me"
        if (!empty($_POST['remember_me'])) {
            // TODO: Generate a random token
            // $token = bin2hex(random_bytes(32));

            // TODO: Store the HASH of the token in remember_tokens
            // $tokenHash = hash('sha256', $token);
            // INSERT INTO remember_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)

            // TODO: Set the cookie with the RAW token (not the hash)
            // setcookie('remember_me', $token, [
            //     'expires'  => time() + 86400 * 30,  // 30 days
            //     'path'     => '/',
            //     'httponly'  => true,
            //     'samesite' => 'Lax',
            //     'secure'   => false,  // Set to true on HTTPS
            // ]);
        }

        header('Location: dashboard.php');
        exit;
    }
}
```

```php
<?php
// Add to config.php — auto-login from cookie (after session_start and DB connection)

// TODO: Auto-login from remember_me cookie
if (!isset($_SESSION['user_id']) && isset($_COOKIE['remember_me'])) {
    $tokenHash = hash('sha256', $_COOKIE['remember_me']);

    // TODO: Look up the token in remember_tokens table
    // JOIN with users to get user data
    // Check that expires_at > NOW()

    // TODO: If valid, set $_SESSION values, delete old token, issue new token+cookie
    // TODO: If invalid/expired, delete the cookie
}
```

```php
<?php
// Add to logout.php — clear remember token and cookie

require_once 'config.php';

if (isset($_SESSION['user_id'])) {
    // TODO: Delete remember tokens for this user from DB
    // DELETE FROM remember_tokens WHERE user_id = ?

    // TODO: Delete the remember_me cookie (set expiry to past)
    // setcookie('remember_me', '', time() - 3600, '/');
}

session_destroy();
header('Location: login.php');
exit;
```

### Expected Output

The login form now has a "Remember Me" checkbox:

```
🔐 Login
+-------------------------------------+
| Username:     [johndoe          ]   |
| Password:     [••••••           ]   |
| ☑ Remember Me                       |
| [Login]                             |
+-------------------------------------+
Don't have an account? Register here
```

After checking "Remember Me" and logging in:
1. Closing and reopening the browser should automatically log the user in.
2. The `remember_me` cookie is `httponly` (not accessible via JavaScript).
3. Logging out clears the cookie and deletes the token from the database.

### Self-Check

- [ ] Login form has a "Remember Me" checkbox
- [ ] A random token is generated with `bin2random_bytes(32)` (not `rand()`)
- [ ] The token HASH (SHA-256) is stored in the database (not the raw token)
- [ ] The RAW token is set in the cookie (not the hash)
- [ ] Cookie has `httponly => true` attribute
- [ ] Cookie has `samesite => 'Lax'` attribute
- [ ] Auto-login checks the token hash in the DB and verifies expiry
- [ ] Logout deletes the token from the DB and clears the cookie
- [ ] Token rotation: old token is deleted and a new one is issued on auto-login

---

## Exercise C: Role-Based Access Control (Challenge/Bonus)

### Task Description

Extend the login system with **role-based access control**. There are two roles: `admin` and `user`. Admins can access an admin dashboard with user management; regular users can only access the standard dashboard. Attempting to access a restricted page shows an "Unauthorized" error.

### Step-by-Step Instructions

1. Update `config.php` — add a helper function:
   ```php
   function requireRole(string $role): void
   {
       requireLogin();
       if ($_SESSION['role'] !== $role) {
           header('Location: unauthorized.php');
           exit;
       }
   }
   ```

2. Create `admin_dashboard.php`:
   - Call `requireRole('admin')` at the top.
   - Display a list of all users (username, email, role, created_at) from the `users` table.
   - Show a count of total users and total admins.
   - Include a form to change any user's role (dropdown: user ↔ admin). On POST, update the role.

3. Create `unauthorized.php`:
   - Display a "403 Forbidden" message explaining the user doesn't have permission.
   - Include a link back to `dashboard.php`.

4. Update `dashboard.php`:
   - If the user is an admin, show a link to `admin_dashboard.php`.
   - If the user is a regular user, show only their own account info.

5. Add a second seed user in `config.php`:
   - Username: `student`, password: `student123`, role: `user`.

### Starter Code

```php
<?php
// admin_dashboard.php
require_once 'config.php';

// TODO: Only admins can access this page
// requireRole('admin');

// TODO: Fetch all users
// $users = $pdo->query("SELECT id, username, email, role, created_at FROM users ORDER BY created_at")->fetchAll();

// TODO: Handle role change form submission (POST)
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id'], $_POST['new_role'])) {
//     Update the user's role
// }

// TODO: Re-fetch users after update
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>⚙️ Admin Dashboard</h1>
    <a href="dashboard.php">← Back to Dashboard</a>

    <div class="stats">
        <!-- TODO: Total users count, Total admins count -->
    </div>

    <h2>User Management</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php // TODO: Loop through $users ?>
            <!-- Each row has a mini form to change role -->
            <!-- <form method="POST">
                <input type="hidden" name="user_id" value="...">
                <select name="new_role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Update</button>
            </form> -->
        </tbody>
    </table>
</body>
</html>
```

```php
<?php
// unauthorized.php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>403 Forbidden</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="error-page">
        <h1>🚫 403 — Forbidden</h1>
        <p>You do not have permission to access this page.</p>
        <p>
            <a href="dashboard.php">← Go to Dashboard</a> |
            <a href="logout.php">Logout</a>
        </p>
    </div>
</body>
</html>
```

### Expected Output

**Admin Dashboard** (logged in as `admin`):

```
⚙️ Admin Dashboard
[← Back to Dashboard]

+-------------------+-------------------+
| 👥 Total Users: 3 | 🔑 Total Admins: 1 |
+-------------------+-------------------+

User Management
+----+----------+-------------------+-------+---------------------+----------+
| ID | Username | Email             | Role  | Joined              | Action   |
+----+----------+-------------------+-------+---------------------+----------+
| 1  | admin    | admin@example.com | admin | 2025-01-15 10:00:00 | [Update] |
| 2  | student  | student@test.com  | user  | 2025-01-15 10:01:00 | [Update] |
| 3  | johndoe  | john@example.com  | user  | 2025-01-15 11:30:00 | [Update] |
+----+----------+-------------------+-------+---------------------+----------+
```

**Unauthorized page** (regular user tries to access `admin_dashboard.php`):

```
🚫 403 — Forbidden

You do not have permission to access this page.

[← Go to Dashboard] | [Logout]
```

### Self-Check

- [ ] `requireRole('admin')` redirects non-admin users to `unauthorized.php`
- [ ] Admin dashboard displays all users in a table
- [ ] Admin can change a user's role via a dropdown and form submit
- [ ] Regular users see `unauthorized.php` when accessing `admin_dashboard.php`
- [ ] `dashboard.php` shows an "Admin Panel" link only for admin users
- [ ] `unauthorized.php` displays a clear 403 message with navigation links
- [ ] Role changes are persisted in the database and reflected on next page load

---

## Submission Checklist

- [ ] Exercise A: Registration with `password_hash()` and validation
- [ ] Exercise A: Login with `password_verify()` and session creation
- [ ] Exercise A: Dashboard is protected (redirects to login if not authenticated)
- [ ] Exercise A: Logout destroys session and redirects
- [ ] Exercise B: "Remember Me" checkbox on login form
- [ ] Exercise B: Secure cookie set with `httponly`, `samesite`, and proper expiry
- [ ] Exercise B: Token hash stored in DB, raw token in cookie
- [ ] Exercise B: Auto-login works after closing browser
- [ ] Exercise C (Bonus): Role-based access control with `requireRole()`
- [ ] Exercise C (Bonus): Admin dashboard with user management
- [ ] Exercise C (Bonus): 403 unauthorized page for restricted access
- [ ] All queries use prepared statements
- [ ] All output escaped with `htmlspecialchars()`
- [ ] Files uploaded to LMS as a ZIP folder

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and login/logout works | 4 | ☐ |
| **Exercise B** submitted and Remember Me works | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if session management works, login/logout functions, password hashing used
- Deduct 2 pts if file does not run or sessions don't work
- Deduct 1 pt if Remember Me cookie is missing or password not hashed
