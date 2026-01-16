# 🟦 SESSION 03
# **DYNAMIC WEBSITES - FORM HANDLING**

Today we will learn how to create interactive websites with users through Forms - the foundation of every web application!

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 3 - PHP & MySQL Web Development
🎯 Objectives:
   - Create HTML Forms
   - Understand GET vs POST
   - Process form data with PHP
   - Validate data

📖 Preparation: Complete Session 02 exercises
🔗 Learning Outcomes: LO1, LO2
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will:

- **Create** HTML Forms with various input types
- **Distinguish** GET and POST
- **Process** form data with `$_GET`, `$_POST`
- **Validate** input data
- **Build** basic registration and login forms

---

# THEORY

## 1. BASIC HTML FORM

### 1.1 Form Structure

```html
<form action="process.php" method="POST">
    <!-- Input elements -->
    <input type="text" name="username">
    <input type="submit" value="Submit">
</form>
```

### 📋 Form Attributes:

| Attribute | Description | Example |
|-----------|-------------|---------|
| `action` | URL to process form | `action="login.php"` |
| `method` | Submission method | `method="POST"` |
| `enctype` | Encoding type | `enctype="multipart/form-data"` |

### 1.2 Input Types

```html
<!-- Text input -->
<input type="text" name="username" placeholder="Enter name">

<!-- Password -->
<input type="password" name="password">

<!-- Email -->
<input type="email" name="email">

<!-- Number -->
<input type="number" name="age" min="1" max="100">

<!-- Textarea -->
<textarea name="message" rows="5" cols="30"></textarea>

<!-- Select dropdown -->
<select name="country">
    <option value="">-- Select --</option>
    <option value="vn">Vietnam</option>
    <option value="us">USA</option>
</select>

<!-- Radio buttons -->
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female

<!-- Checkbox -->
<input type="checkbox" name="agree" value="1"> I agree to terms

<!-- Hidden -->
<input type="hidden" name="token" value="abc123">

<!-- File upload -->
<input type="file" name="avatar">

<!-- Submit -->
<input type="submit" value="Submit">
<button type="submit">Submit</button>
```

---

## 2. GET VS POST

### 2.1 GET Method

```php
<!-- form_get.html -->
<form action="process.php" method="GET">
    <input type="text" name="search">
    <button type="submit">Search</button>
</form>

<!-- URL: process.php?search=php -->
```

```php
<?php
// process.php
$search = $_GET['search'] ?? '';
echo "You searched for: $search";
?>
```

### 2.2 POST Method

```php
<!-- form_post.html -->
<form action="process.php" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit">Login</button>
</form>
```

```php
<?php
// process.php
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
echo "Username: $username";
?>
```

### 🔍 Comparison: GET vs POST

| Feature | GET | POST |
|---------|-----|------|
| Data | Visible in URL | Hidden in body |
| Length | Limited (~2048 chars) | Unlimited |
| Security | Poor (exposed in URL) | Better |
| Bookmark | Can bookmark | Cannot bookmark |
| Cache | Can cache | Cannot cache |
| Usage | Search, filters | Login, registration |

---

## 3. PROCESSING FORMS WITH PHP

### 3.1 Superglobals

```php
<?php
// $_GET - Data from URL
$id = $_GET['id'];

// $_POST - Data from POST form
$name = $_POST['name'];

// $_REQUEST - Both GET and POST
$data = $_REQUEST['data'];

// $_SERVER - Server information
$method = $_SERVER['REQUEST_METHOD'];

// $_FILES - File upload
$file = $_FILES['avatar'];
?>
```

### 3.2 Check Form Submission

```php
<?php
// Method 1: Check REQUEST_METHOD
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form
}

// Method 2: Check isset
if (isset($_POST['submit'])) {
    // Process form
}

// Method 3: Check empty
if (!empty($_POST['username'])) {
    // Has data
}
?>
```

### 3.3 Self-Processing Form

```php
<?php
// contact.php
$message = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    
    // Validate
    if (empty($name)) {
        $errors[] = "Please enter name";
    }
    if (empty($email)) {
        $errors[] = "Please enter email";
    }
    
    // If no errors
    if (empty($errors)) {
        $message = "Thank you $name! We will contact you at $email";
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Contact</title></head>
<body>
    <?php if ($message): ?>
        <div class="success"><?= $message ?></div>
    <?php endif; ?>
    
    <?php if ($errors): ?>
        <div class="error">
            <?php foreach ($errors as $error): ?>
                <p><?= $error ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
    <form method="POST">
        <input type="text" name="name" value="<?= $name ?? '' ?>">
        <input type="email" name="email" value="<?= $email ?? '' ?>">
        <button type="submit">Send</button>
    </form>
</body>
</html>
```

---

## 4. DATA VALIDATION

### 4.1 Validation Functions

```php
<?php
$input = $_POST['input'] ?? '';

// Check empty
if (empty($input)) {
    echo "Cannot be empty";
}

// Check length
if (strlen($input) < 3) {
    echo "Minimum 3 characters";
}

// Check if numeric
if (!is_numeric($input)) {
    echo "Must be a number";
}

// Validate email
if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format";
}

// Validate URL
if (!filter_var($input, FILTER_VALIDATE_URL)) {
    echo "Invalid URL";
}

// Regex validation
if (!preg_match("/^[a-zA-Z]+$/", $input)) {
    echo "Only letters allowed";
}
?>
```

### 4.2 Data Sanitization

```php
<?php
$input = $_POST['input'] ?? '';

// Remove whitespace from start/end
$input = trim($input);

// Remove backslashes
$input = stripslashes($input);

// Convert special characters to HTML entities
$input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

// Filter sanitize
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$url = filter_var($_POST['url'], FILTER_SANITIZE_URL);
$int = filter_var($_POST['number'], FILTER_SANITIZE_NUMBER_INT);
?>
```

### 4.3 Comprehensive Validation Functions

```php
<?php
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validateLength($str, $min, $max) {
    $len = strlen($str);
    return $len >= $min && $len <= $max;
}

function validatePassword($password) {
    // At least 8 characters, uppercase, lowercase, number
    return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $password);
}
?>
```

---

# EXAMPLES & ILLUSTRATIONS

## Example 1: Complete Registration Form

```php
<?php
// register.php
$errors = [];
$success = false;

// Keep entered values
$name = $email = $password = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $agree = isset($_POST['agree']);
    
    // Validate
    if (empty($name)) {
        $errors['name'] = "Please enter full name";
    } elseif (strlen($name) < 2) {
        $errors['name'] = "Name must be at least 2 characters";
    }
    
    if (empty($email)) {
        $errors['email'] = "Please enter email";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }
    
    if (empty($password)) {
        $errors['password'] = "Please enter password";
    } elseif (strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters";
    }
    
    if ($password !== $confirmPassword) {
        $errors['confirm_password'] = "Passwords do not match";
    }
    
    if (!$agree) {
        $errors['agree'] = "You must agree to terms";
    }
    
    // If no errors
    if (empty($errors)) {
        $success = true;
        // TODO: Save to database
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register Account</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { text-align: center; color: #333; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        input:focus { border-color: #4CAF50; outline: none; }
        input.error { border-color: #f44336; }
        .error-message { color: #f44336; font-size: 14px; margin-top: 5px; }
        .success-message {
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        button {
            width: 100%;
            padding: 15px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover { background: #45a049; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Register Account</h1>
        
        <?php if ($success): ?>
            <div class="success-message">
                🎉 Registration successful! Welcome <?= htmlspecialchars($name) ?>
            </div>
        <?php else: ?>
        
        <form method="POST">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" 
                       value="<?= htmlspecialchars($name) ?>"
                       class="<?= isset($errors['name']) ? 'error' : '' ?>">
                <?php if (isset($errors['name'])): ?>
                    <div class="error-message"><?= $errors['name'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" 
                       value="<?= htmlspecialchars($email) ?>"
                       class="<?= isset($errors['email']) ? 'error' : '' ?>">
                <?php if (isset($errors['email'])): ?>
                    <div class="error-message"><?= $errors['email'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Password *</label>
                <input type="password" name="password"
                       class="<?= isset($errors['password']) ? 'error' : '' ?>">
                <?php if (isset($errors['password'])): ?>
                    <div class="error-message"><?= $errors['password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Confirm Password *</label>
                <input type="password" name="confirm_password"
                       class="<?= isset($errors['confirm_password']) ? 'error' : '' ?>">
                <?php if (isset($errors['confirm_password'])): ?>
                    <div class="error-message"><?= $errors['confirm_password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" name="agree" id="agree">
                <label for="agree" style="font-weight: normal;">
                    I agree to terms of service
                </label>
            </div>
            <?php if (isset($errors['agree'])): ?>
                <div class="error-message"><?= $errors['agree'] ?></div>
            <?php endif; ?>
            
            <button type="submit">Register</button>
        </form>
        
        <?php endif; ?>
    </div>
</body>
</html>
```

---

# PRACTICE

## EXERCISE 1: Contact Form

🎯 **Objective:** Create contact form with validation

📝 **Requirements:**
- Fields: Full name, Email, Phone number, Message
- Validate all fields
- Display success/error messages

---

## EXERCISE 2: Calculator Form

🎯 **Objective:** Create simple calculator with form

📝 **Requirements:**
- Enter 2 numbers
- Select operation (dropdown)
- Display result

---

## EXERCISE 3: Login Form (Challenge)

🎯 **Objective:** Create login form with hardcoded check

📝 **Requirements:**
- Username: admin, Password: 123456
- Display login success/failure message
- Count failed login attempts

---

# ✅ KNOWLEDGE TO ACHIEVE

- [ ] Can create HTML Forms
- [ ] Distinguish GET vs POST
- [ ] Process forms with $_GET, $_POST
- [ ] Validate and sanitize data
- [ ] Create self-processing forms

---

# 📋 SESSION 03 WORKSHEET

**Name:** ___________________    **Student ID:** ___________

## Questions

1. When to use GET, when to use POST?
2. What is `htmlspecialchars()` used for?
3. How to keep entered values when form has errors?

## Exercises

- [ ] Contact Form
- [ ] Calculator Form
- [ ] Login Form (Bonus)

---

# 🔗 PREPARATION FOR SESSION 04

**Next Session:** Introduction to MySQL

### Will Learn:
- MySQL Installation
- phpMyAdmin
- Create Database, Table
- MySQL Data Types

---

**Next Chapter: [Session 04 - Introduction to MySQL →](../part_2_mysql_database/session_04_intro_mysql.md)**
