# 🟧 BUỔI 14
# **SECURITY METHODS - PHƯƠNG PHÁP BẢO MẬT**

Hôm nay chúng ta sẽ học cách bảo vệ ứng dụng web khỏi các lỗ hổng bảo mật phổ biến!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Hiểu các lỗ hổng bảo mật web
   - Phòng chống SQL Injection
   - Phòng chống XSS
   - Phòng chống CSRF

🔗 Learning Outcomes: LO6
```

---

# LÝ THUYẾT

## 1. SQL INJECTION

### 1.1 SQL Injection Là Gì?

**SQL Injection** = Kỹ thuật tấn công bằng cách chèn mã SQL độc hại vào input.

### 1.2 Ví Dụ Tấn Công

```php
<?php
// ❌ Code dễ bị tấn công
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
// Nếu nhập: username = admin' --
// SQL trở thành: SELECT * FROM users WHERE username = 'admin' --' AND password = ''
// => Đăng nhập được mà không cần password!
?>
```

### 1.3 Phòng Chống

```php
<?php
// ✅ Sử dụng Prepared Statements
$sql = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $password]);

// ✅ Named parameters
$sql = "SELECT * FROM users WHERE username = :username AND password = :password";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':username' => $username,
    ':password' => $password
]);

// ✅ Escape strings (nếu bắt buộc dùng query trực tiếp)
$username = $pdo->quote($username);
?>
```

---

## 2. CROSS-SITE SCRIPTING (XSS)

### 2.1 XSS Là Gì?

**XSS** = Tấn công bằng cách chèn mã JavaScript độc hại vào trang web.

### 2.2 Các Loại XSS

| Loại | Mô tả |
|------|-------|
| **Stored XSS** | Script lưu trong database |
| **Reflected XSS** | Script trong URL, phản hồi ngay |
| **DOM-based XSS** | Script thực thi phía client |

### 2.3 Ví Dụ Tấn Công

```php
<?php
// ❌ Code dễ bị tấn công
$name = $_GET['name'];
echo "Hello, $name!";
// URL: page.php?name=<script>alert('XSS')</script>
// => Script độc hại được thực thi!
?>
```

### 2.4 Phòng Chống

```php
<?php
// ✅ Escape output với htmlspecialchars()
$name = $_GET['name'];
echo "Hello, " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "!";

// ✅ Hàm helper
function e($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

echo "Hello, " . e($name) . "!";

// ✅ Content Security Policy header
header("Content-Security-Policy: default-src 'self'; script-src 'self'");
?>
```

---

## 3. CROSS-SITE REQUEST FORGERY (CSRF)

### 3.1 CSRF Là Gì?

**CSRF** = Tấn công bằng cách lừa user thực hiện hành động không mong muốn.

### 3.2 Ví Dụ Tấn Công

```html
<!-- Trang độc hại -->
<img src="https://bank.com/transfer?to=hacker&amount=1000">
<!-- Nếu user đang đăng nhập bank.com, tiền sẽ bị chuyển! -->
```

### 3.3 Phòng Chống

```php
<?php
// ✅ Tạo CSRF Token
session_start();

function generateCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>

<!-- Trong form -->
<form method="POST">
    <input type="hidden" name="csrf_token" value="<?= generateCsrfToken() ?>">
    <!-- other fields -->
    <button type="submit">Submit</button>
</form>

<?php
// Xử lý form
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

### 4.1 Hash Password

```php
<?php
// ✅ Hash password khi đăng ký
$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Lưu $hashedPassword vào database

// ✅ Verify password khi đăng nhập
$inputPassword = $_POST['password'];
$storedHash = $user['password'];  // Từ database

if (password_verify($inputPassword, $storedHash)) {
    // Đăng nhập thành công
} else {
    // Sai password
}

// ✅ Kiểm tra cần rehash (khi algorithm thay đổi)
if (password_needs_rehash($storedHash, PASSWORD_DEFAULT)) {
    $newHash = password_hash($inputPassword, PASSWORD_DEFAULT);
    // Update database với $newHash
}
?>
```

### 4.2 Password Policy

```php
<?php
function validatePassword($password) {
    $errors = [];
    
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "Password must contain uppercase letter";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "Password must contain lowercase letter";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Password must contain number";
    }
    
    if (!preg_match('/[!@#$%^&*]/', $password)) {
        $errors[] = "Password must contain special character";
    }
    
    return $errors;
}
?>
```

---

## 5. INPUT VALIDATION & SANITIZATION

```php
<?php
// ✅ Validation
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validateUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL);
}

function validateInt($value, $min = null, $max = null) {
    $options = [];
    if ($min !== null) $options['min_range'] = $min;
    if ($max !== null) $options['max_range'] = $max;
    
    return filter_var($value, FILTER_VALIDATE_INT, ['options' => $options]);
}

// ✅ Sanitization
function sanitizeString($string) {
    return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
}

function sanitizeEmail($email) {
    return filter_var($email, FILTER_SANITIZE_EMAIL);
}

function sanitizeUrl($url) {
    return filter_var($url, FILTER_SANITIZE_URL);
}

function sanitizeInt($value) {
    return filter_var($value, FILTER_SANITIZE_NUMBER_INT);
}
?>
```

---

## 6. FILE UPLOAD SECURITY

```php
<?php
function secureFileUpload($file, $uploadDir) {
    $errors = [];
    
    // Kiểm tra lỗi upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['error' => 'Upload failed'];
    }
    
    // Kiểm tra kích thước (5MB max)
    if ($file['size'] > 5 * 1024 * 1024) {
        return ['error' => 'File too large'];
    }
    
    // Kiểm tra MIME type
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes)) {
        return ['error' => 'Invalid file type'];
    }
    
    // Tạo tên file an toàn
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $newName = bin2hex(random_bytes(16)) . '.' . $extension;
    $destination = $uploadDir . '/' . $newName;
    
    // Di chuyển file
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
// Thêm vào đầu mỗi page hoặc trong .htaccess
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
header("Content-Security-Policy: default-src 'self'");
header("Referrer-Policy: strict-origin-when-cross-origin");
?>
```

---

# THỰC HÀNH

## BÀI 1: Secure Login Form

📝 **Yêu cầu:**
- CSRF protection
- SQL Injection prevention
- XSS prevention
- Password hashing

## BÀI 2: Secure File Upload

📝 **Yêu cầu:**
- Validate file type
- Limit file size
- Secure filename
- Store outside webroot

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu SQL Injection và cách phòng chống
- [ ] Hiểu XSS và cách phòng chống
- [ ] Hiểu CSRF và cách phòng chống
- [ ] Bảo mật password và file upload

---

**Chương tiếp theo: [Buổi 15 - jQuery Introduction →](./buoi_15_jquery_intro.md)**
