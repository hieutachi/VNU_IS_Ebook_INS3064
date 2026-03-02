# 🟧 SESSION 14
# **SECURITY METHODS**

In this session, we will learn about **common web security vulnerabilities** and how to protect your PHP applications from **SQL Injection**, **XSS**, and **CSRF**.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 14 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand web security threats
   - Prevent SQL Injection
   - Prevent XSS attacks
   - Implement CSRF protection

🔗 Links to Learning Outcomes: LO6
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Understand **web security threats**
- **Prevent SQL Injection** attacks
- **Prevent XSS** (Cross-Site Scripting) attacks
- **Implement CSRF** protection
- Apply security best practices

---

# THEORY

## 1. SQL INJECTION

### 1.1 What is SQL Injection?

**SQL Injection** = Attack technique where the attacker injects malicious SQL code through user input.

### 1.2 Vulnerable Code Example

```php
<?php
// ❌ Vulnerable code
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
// If user enters: username = admin' --
// SQL becomes: SELECT * FROM users WHERE username = 'admin' --' AND password = ''
// => Login without password!
?>
```

### 1.3 Prevention

```php
<?php
// ✅ Use Prepared Statements
$sql = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $password]);

// ✅ Named parameters
$sql = "SELECT * FROM users WHERE username = :username AND password = :password";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':username' => $username,
    ':password' => $password,
]);

// ✅ Escape strings (only if you must build the query)
$username = $pdo->quote($username);
?>
```

---

## 2. CROSS-SITE SCRIPTING (XSS)

### 2.1 What is XSS?

**XSS** = Attack where the attacker injects malicious JavaScript into a web page viewed by other users.

### 2.2 Types of XSS

| Type | Description |
|------|-------------|
| **Stored XSS** | Script stored in DB and shown to many users |
| **Reflected XSS** | Script sent via URL / request, reflected in response |
| **DOM-based XSS** | Script executed on client side (JS only) |

### 2.3 Vulnerable Example

```php
<?php
// ❌ Vulnerable code
$name = $_GET['name'];
echo "Hello, $name!";
// URL: page.php?name=<script>alert('XSS')</script>
// => Malicious script is executed!
?>
```

### 2.4 Prevention

```php
<?php
// ✅ Escape output with htmlspecialchars()
$name = $_GET['name'] ?? '';
echo "Hello, " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "!";

// ✅ Helper function
function e(string $string): string {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

echo "Hello, " . e($name) . "!";

// ✅ Content Security Policy header
header("Content-Security-Policy: default-src 'self'; script-src 'self'");
?>
```

---

## 3. CROSS-SITE REQUEST FORGERY (CSRF)

### 3.1 What is CSRF?

**CSRF** = Attack where the attacker tricks a logged-in user into performing unwanted actions.

### 3.2 Attack Example

```html
<!-- Malicious page -->
<img src="https://bank.com/transfer?to=hacker&amount=1000">
<!-- If the user is logged in to bank.com, money may be transferred! -->
```

### 3.3 Prevention with CSRF Token

```php
<?php
// csrf.php
session_start();

function generateCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>

<!-- In form -->
<form method="POST">
    <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
    <!-- other fields -->
    <button type="submit">Submit</button>
</form>

<?php
// Handling form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        die('CSRF token validation failed');
    }
    // Process form...
}
?>
```

---

## 4. PASSWORD SECURITY

### 4.1 Hashing Passwords

```php
<?php
// ✅ Hash password on registration
$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Save $hashedPassword to database

// ✅ Verify password on login
$inputPassword = $_POST['password'];
$storedHash = $user['password'];  // From DB

if (password_verify($inputPassword, $storedHash)) {
    // Login success
} else {
    // Wrong password
}

// ✅ Check if hash needs rehashing (when algorithm changes)
if (password_needs_rehash($storedHash, PASSWORD_DEFAULT)) {
    $newHash = password_hash($inputPassword, PASSWORD_DEFAULT);
    // Update DB with $newHash
}
?>
```

### 4.2 Password Policy

```php
<?php
function validatePassword(string $password): array {
    $errors = [];
    
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "Password must contain at least one uppercase letter";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "Password must contain at least one lowercase letter";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Password must contain at least one number";
    }
    
    if (!preg_match('/[!@#$%^&*]/', $password)) {
        $errors[] = "Password must contain at least one special character";
    }
    
    return $errors;
}
?>
```

---

## 5. INPUT VALIDATION & SANITIZATION

```php
<?php
// ✅ Validation helpers
function validateEmail(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validateUrl(string $url): bool {
    return (bool) filter_var($url, FILTER_VALIDATE_URL);
}

function validateInt(string $value, ?int $min = null, ?int $max = null): int|false {
    $options = [];
    if ($min !== null) $options['min_range'] = $min;
    if ($max !== null) $options['max_range'] = $max;
    
    return filter_var($value, FILTER_VALIDATE_INT, ['options' => $options]);
}

// ✅ Sanitization helpers
function sanitizeString(string $string): string {
    return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
}

function sanitizeEmail(string $email): string {
    return filter_var($email, FILTER_SANITIZE_EMAIL);
}

function sanitizeUrl(string $url): string {
    return filter_var($url, FILTER_SANITIZE_URL);
}

function sanitizeInt(string $value): int {
    return (int) filter_var($value, FILTER_SANITIZE_NUMBER_INT);
}
?>
```

---

## 6. FILE UPLOAD SECURITY

```php
<?php
function secureFileUpload(array $file, string $uploadDir): array {
    // Check upload error
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['error' => 'Upload failed'];
    }
    
    // Check size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        return ['error' => 'File too large'];
    }
    
    // Check MIME type
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes, true)) {
        return ['error' => 'Invalid file type'];
    }
    
    // Generate safe file name
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $newName = bin2hex(random_bytes(16)) . '.' . $extension;
    $destination = $uploadDir . '/' . $newName;
    
    // Move file
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        return ['error' => 'Failed to save file'];
    }
    
    return ['success' => true, 'filename' => $newName];
}
?>
```

---

## 7. SECURITY HEADERS

```php
<?php
// Add at the top of each page or in a central place
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
header("Content-Security-Policy: default-src 'self'");
header("Referrer-Policy: strict-origin-when-cross-origin");
?>
```

---

# PRACTICE

## EXERCISE 1: Secure Login Form

📝 **Requirements:**
- Add CSRF protection
- Prevent SQL Injection (PDO + prepared statements)
- Escape output to prevent XSS
- Hash passwords securely

## EXERCISE 2: Secure File Upload

📝 **Requirements:**
- Validate file type
- Limit file size
- Generate safe file name
- Store files outside public web root if possible

---

# ✅ KEY TAKEAWAYS

- [ ] Understand SQL Injection and how to prevent it
- [ ] Understand XSS and how to prevent it
- [ ] Understand CSRF and how to protect against it
- [ ] Apply password, input, and file upload security best practices

---

**Previous: [Session 13 - Cookies & Sessions ←](./session_13_cookies_sessions.md)**  
**Next: [Session 15 - jQuery Introduction →](./session_15_jquery_intro.md)**
