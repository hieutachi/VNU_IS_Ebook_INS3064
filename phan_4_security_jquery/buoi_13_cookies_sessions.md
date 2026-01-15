# 🟧 BUỔI 13
# **COOKIES & SESSIONS - QUẢN LÝ PHIÊN LÀM VIỆC**

Hôm nay chúng ta sẽ học cách quản lý trạng thái người dùng với Cookies và Sessions!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Hiểu Cookies và Sessions
   - Xây dựng hệ thống đăng nhập
   - Quản lý trạng thái người dùng

🔗 Learning Outcomes: LO7
```

---

# LÝ THUYẾT

## 1. COOKIES

### 1.1 Cookie Là Gì?

**Cookie** = Dữ liệu nhỏ lưu trên browser của người dùng.

### 1.2 Tạo Cookie

```php
<?php
// Tạo cookie
setcookie("username", "john", time() + 3600);  // 1 giờ
setcookie("theme", "dark", time() + (86400 * 30));  // 30 ngày

// Cookie với options (PHP 7.3+)
setcookie("remember", "yes", [
    'expires' => time() + (86400 * 30),
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict'
]);
?>
```

### 1.3 Đọc Cookie

```php
<?php
// Đọc cookie
$username = $_COOKIE['username'] ?? 'Guest';

// Kiểm tra tồn tại
if (isset($_COOKIE['theme'])) {
    $theme = $_COOKIE['theme'];
}
?>
```

### 1.4 Xóa Cookie

```php
<?php
// Xóa cookie (set thời gian quá khứ)
setcookie("username", "", time() - 3600);
?>
```

---

## 2. SESSIONS

### 2.1 Session Là Gì?

**Session** = Dữ liệu lưu trên server, định danh bằng session ID.

### 2.2 Khởi Tạo Session

```php
<?php
// Phải gọi đầu tiên, trước bất kỳ output nào
session_start();

// Lưu dữ liệu
$_SESSION['user_id'] = 1;
$_SESSION['username'] = 'john';
$_SESSION['role'] = 'admin';

// Đọc dữ liệu
$userId = $_SESSION['user_id'] ?? null;

// Kiểm tra tồn tại
if (isset($_SESSION['user_id'])) {
    echo "Logged in as: " . $_SESSION['username'];
}

// Xóa một session variable
unset($_SESSION['temp_data']);

// Xóa tất cả session
session_destroy();
?>
```

### 2.3 So Sánh Cookie vs Session

| Đặc điểm | Cookie | Session |
|----------|--------|---------|
| Lưu trữ | Browser | Server |
| Dung lượng | 4KB | Không giới hạn |
| Bảo mật | Kém (client-side) | Tốt (server-side) |
| Thời gian | Tùy chỉnh | Đến khi đóng browser |
| Sử dụng | Remember me, preferences | User authentication |

---

## 3. HỆ THỐNG ĐĂNG NHẬP

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

-- Insert user mẫu (password: 123456)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@email.com', '$2y$10$...', 'admin');
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
        'confirm_password' => $_POST['confirm_password'] ?? ''
    ];
    
    // Validation
    if (empty($data['username'])) {
        $errors['username'] = "Username is required";
    } elseif (strlen($data['username']) < 3) {
        $errors['username'] = "Username min 3 characters";
    }
    
    if (empty($data['email'])) {
        $errors['email'] = "Email is required";
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email";
    }
    
    if (strlen($data['password']) < 6) {
        $errors['password'] = "Password min 6 characters";
    }
    
    if ($data['password'] !== $data['confirm_password']) {
        $errors['confirm_password'] = "Passwords do not match";
    }
    
    if (empty($errors)) {
        $db = Database::getInstance();
        
        // Check existing
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
                    password_hash($data['password'], PASSWORD_DEFAULT)
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
            
            // Remember me
            if ($remember) {
                $token = bin2hex(random_bytes(32));
                setcookie('remember_token', $token, time() + (86400 * 30), '/', '', false, true);
                // Save token to database...
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
                            Don't have account? <a href="register.php">Register</a>
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

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

function requireAdmin() {
    requireLogin();
    if ($_SESSION['role'] !== 'admin') {
        header('Location: unauthorized.php');
        exit;
    }
}

function getCurrentUser() {
    if (!isLoggedIn()) return null;
    return [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role']
    ];
}
?>
```

### 3.5 Logout

```php
<?php
// logout.php
session_start();

// Clear session
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

# THỰC HÀNH

## BÀI 1: Hoàn Thiện Auth System

📝 **Yêu cầu:**
- Register với validation
- Login với remember me
- Profile page
- Change password

## BÀI 2: Role-based Access

📝 **Yêu cầu:**
- Admin dashboard (chỉ admin)
- User dashboard
- Unauthorized page

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu Cookies và Sessions
- [ ] Xây dựng được hệ thống đăng nhập
- [ ] Quản lý trạng thái người dùng
- [ ] Bảo mật session

---

**Chương tiếp theo: [Buổi 14 - Security Methods →](./buoi_14_security_methods.md)**
