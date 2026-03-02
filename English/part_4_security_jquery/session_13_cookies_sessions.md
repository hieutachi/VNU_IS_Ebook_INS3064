# 🟧 SESSION 13
# **COOKIES & SESSIONS**

In this session, we will learn how to manage **user state** with **Cookies** and **Sessions**, and how to build a simple authentication system.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 13 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand cookies and sessions
   - Implement user authentication
   - Manage session data
   - Create login/logout functionality

🔗 Links to Learning Outcomes: LO7
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Understand **cookies and sessions** in PHP
- **Implement user authentication**
- **Manage session data** effectively
- Create **login/logout functionality**
- Build secure user sessions

---

# THEORY

## 1. COOKIES

### 1.1 What is a Cookie?

**Cookie** = Small piece of data stored in the user's browser.

Common use cases:
- Remember user preferences (language, theme)
- "Remember me" login
- Tracking (analytics)

### 1.2 Creating Cookies

```php
<?php
// Create simple cookies
setcookie("username", "john", time() + 3600);          // 1 hour
setcookie("theme", "dark", time() + (86400 * 30));     // 30 days

// Cookie with options (PHP 7.3+)
setcookie("remember", "yes", [
    'expires'  => time() + (86400 * 30),
    'path'     => '/',
    'domain'   => '',
    'secure'   => true,   // only over HTTPS
    'httponly' => true,   // not accessible via JavaScript
    'samesite' => 'Strict'
]);
?>
```

### 1.3 Reading Cookies

```php
<?php
// Read cookie
$username = $_COOKIE['username'] ?? 'Guest';

// Check if exists
if (isset($_COOKIE['theme'])) {
    $theme = $_COOKIE['theme'];
}
?>
```

### 1.4 Deleting Cookies

```php
<?php
// Delete cookie (set expiration in the past)
setcookie("username", "", time() - 3600);
?>
```

---

## 2. SESSIONS

### 2.1 What is a Session?

**Session** = Data stored on the **server**, identified by a **session ID** stored in a cookie.

Used for:
- User authentication
- Shopping cart
- Temporary data between requests

### 2.2 Starting a Session

```php
<?php
// Must be called before any output
session_start();

// Store data
$_SESSION['user_id'] = 1;
$_SESSION['username'] = 'john';
$_SESSION['role'] = 'admin';

// Read data
$userId = $_SESSION['user_id'] ?? null;

// Check if exists
if (isset($_SESSION['user_id'])) {
    echo "Logged in as: " . $_SESSION['username'];
}

// Remove a session variable
unset($_SESSION['temp_data']);

// Destroy all session data
session_destroy();
?>
```

### 2.3 Cookie vs Session

| Feature | Cookie | Session |
|--------|--------|---------|
| Storage | Browser | Server |
| Size | ~4KB | No strict limit |
| Security | Lower (client-side) | Higher (server-side) |
| Lifetime | Configurable | Until browser close (by default) |
| Usage | Remember me, preferences | Authentication, sensitive data |

---

## 3. LOGIN SYSTEM

### 3.1 Database

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample user (password: 123456, hash not shown here)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', '$2y$10$...', 'admin');
```

### 3.2 Register

```php
<?php
// register.php
session_start();
require_once 'classes/Database.php';

$errors = [];
$data = ['username' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'username' => trim($_POST['username'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'password' => $_POST['password'] ?? '',
        'confirm_password' => $_POST['confirm_password'] ?? '',
    ];
    
    // Validation
    if (empty($data['username'])) {
        $errors['username'] = "Username is required";
    } elseif (strlen($data['username']) < 3) {
        $errors['username'] = "Username must be at least 3 characters";
    }
    
    if (empty($data['email'])) {
        $errors['email'] = "Email is required";
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email";
    }
    
    if (strlen($data['password']) < 6) {
        $errors['password'] = "Password must be at least 6 characters";
    }
    
    if ($data['password'] !== $data['confirm_password']) {
        $errors['confirm_password'] = "Passwords do not match";
    }
    
    if (empty($errors)) {
        $db = Database::getInstance();
        
        // Check existing user
        $existing = $db->fetch(
            "SELECT id FROM users WHERE username = ? OR email = ?",
            [$data['username'], $data['email']]
        );
        
        if ($existing) {
            $errors['username'] = "Username or email already exists";
        } else {
            // Insert user
            $db->query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [
                    $data['username'],
                    $data['email'],
                    password_hash($data['password'], PASSWORD_DEFAULT),
                ]
            );
            
            $_SESSION['success'] = "Registration successful! Please login.";
            header('Location: login.php');
            exit;
        }
    }
}
?>
```

### 3.3 Login

```php
<?php
// login.php
session_start();
require_once 'classes/Database.php';

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}

$errors = [];
$username = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);
    
    if (empty($username) || empty($password)) {
        $errors['login'] = "Please enter username and password";
    } else {
        $db = Database::getInstance();
        $user = $db->fetch(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [$username, $username]
        );
        
        if ($user && password_verify($password, $user['password'])) {
            // Login success
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            
            // Remember me via cookie (simple version)
            if ($remember) {
                $token = bin2hex(random_bytes(32));
                setcookie('remember_token', $token, time() + (86400 * 30), '/', '', false, true);
                // Save token to database for this user (not shown)
            }
            
            header('Location: dashboard.php');
            exit;
        } else {
            $errors['login'] = "Invalid username or password";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>🔐 Login</h4>
                    </div>
                    <div class="card-body">
                        <?php if (isset($_SESSION['success'])): ?>
                            <div class="alert alert-success"><?= $_SESSION['success'] ?></div>
                            <?php unset($_SESSION['success']); ?>
                        <?php endif; ?>
                        
                        <?php if (isset($errors['login'])): ?>
                            <div class="alert alert-danger"><?= $errors['login'] ?></div>
                        <?php endif; ?>
                        
                        <form method="POST">
                            <div class="mb-3">
                                <label>Username or Email</label>
                                <input type="text" name="username" class="form-control" 
                                       value="<?= htmlspecialchars($username) ?>">
                            </div>
                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" name="remember" class="form-check-input" id="remember">
                                <label class="form-check-label" for="remember">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                        <p class="mt-3 text-center">
                            Don't have an account? <a href="register.php">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

### 3.4 Auth Middleware

```php
<?php
// includes/auth.php
session_start();

function isLoggedIn(): bool {
    return isset($_SESSION['user_id']);
}

function requireLogin(): void {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

function requireAdmin(): void {
    requireLogin();
    if (($_SESSION['role'] ?? 'user') !== 'admin') {
        header('Location: unauthorized.php');
        exit;
    }
}

function getCurrentUser(): ?array {
    if (!isLoggedIn()) return null;
    return [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role'],
    ];
}
?>
```

### 3.5 Logout

```php
<?php
// logout.php
session_start();

// Clear session array
$_SESSION = [];

// Delete session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params["path"]);
}

// Delete remember cookie
setcookie('remember_token', '', time() - 3600, '/');

// Destroy session
session_destroy();

header('Location: login.php');
exit;
?>
```

### 3.6 Protected Page

```php
<?php
// dashboard.php
require_once 'includes/auth.php';
requireLogin();

$user = getCurrentUser();
?>

<!DOCTYPE html>
<html>
<head><title>Dashboard</title></head>
<body>
    <h1>Welcome, <?= htmlspecialchars($user['username']) ?>!</h1>
    <p>Role: <?= $user['role'] ?></p>
    <a href="logout.php">Logout</a>
</body>
</html>
```

---

# PRACTICE

## EXERCISE 1: Complete Auth System

📝 **Requirements:**
- Registration with validation
- Login with "remember me"
- Profile page
- Change password feature

## EXERCISE 2: Role-based Access

📝 **Requirements:**
- Admin dashboard (admin only)
- User dashboard
- Show an "Unauthorized" page for restricted access

---

# ✅ KEY TAKEAWAYS

- [ ] Understand Cookies and Sessions
- [ ] Build a basic authentication system
- [ ] Manage and protect session data

---

**Previous: [Session 12 - Web App Development ←](../part_3_integration_advanced/session_12_web_app_development.md)**  
**Next: [Session 14 - Security Methods →](./session_14_security_methods.md)**
