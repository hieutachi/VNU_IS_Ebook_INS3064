# 🟦 BUỔI 03
# **DYNAMIC WEBSITES - FORM HANDLING**

Hôm nay chúng ta sẽ học cách tạo website tương tác với người dùng thông qua Form - nền tảng của mọi ứng dụng web!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
📚 Tài liệu: Chapter 3 - PHP & MySQL Web Development
🎯 Mục tiêu:
   - Tạo HTML Form
   - Hiểu GET vs POST
   - Xử lý dữ liệu form với PHP
   - Validation dữ liệu

📖 Chuẩn bị: Hoàn thành bài tập Buổi 02
🔗 Learning Outcomes: LO1, LO2
```

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi này, bạn sẽ:

- **Tạo** HTML Form với các loại input
- **Phân biệt** GET và POST
- **Xử lý** dữ liệu form với `$_GET`, `$_POST`
- **Validate** dữ liệu đầu vào
- **Xây dựng** form đăng ký, đăng nhập cơ bản

---

# LÝ THUYẾT

## 1. HTML FORM CƠ BẢN

### 1.1 Cấu Trúc Form

```html
<form action="process.php" method="POST">
    <!-- Các input elements -->
    <input type="text" name="username">
    <input type="submit" value="Gửi">
</form>
```

### 📋 Thuộc tính Form:

| Thuộc tính | Mô tả | Ví dụ |
|------------|-------|-------|
| `action` | URL xử lý form | `action="login.php"` |
| `method` | Phương thức gửi | `method="POST"` |
| `enctype` | Kiểu mã hóa | `enctype="multipart/form-data"` |

### 1.2 Các Loại Input

```html
<!-- Text input -->
<input type="text" name="username" placeholder="Nhập tên">

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
    <option value="">-- Chọn --</option>
    <option value="vn">Việt Nam</option>
    <option value="us">USA</option>
</select>

<!-- Radio buttons -->
<input type="radio" name="gender" value="male"> Nam
<input type="radio" name="gender" value="female"> Nữ

<!-- Checkbox -->
<input type="checkbox" name="agree" value="1"> Đồng ý điều khoản

<!-- Hidden -->
<input type="hidden" name="token" value="abc123">

<!-- File upload -->
<input type="file" name="avatar">

<!-- Submit -->
<input type="submit" value="Gửi">
<button type="submit">Gửi</button>
```

---

## 2. GET VS POST

### 2.1 Phương Thức GET

```php
<!-- form_get.html -->
<form action="process.php" method="GET">
    <input type="text" name="search">
    <button type="submit">Tìm kiếm</button>
</form>

<!-- URL: process.php?search=php -->
```

```php
<?php
// process.php
$search = $_GET['search'] ?? '';
echo "Bạn tìm: $search";
?>
```

### 2.2 Phương Thức POST

```php
<!-- form_post.html -->
<form action="process.php" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit">Đăng nhập</button>
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

### 🔍 So Sánh GET vs POST

| Đặc điểm | GET | POST |
|----------|-----|------|
| Dữ liệu | Hiển thị trên URL | Ẩn trong body |
| Độ dài | Giới hạn (~2048 ký tự) | Không giới hạn |
| Bảo mật | Kém (lộ trên URL) | Tốt hơn |
| Bookmark | Có thể | Không thể |
| Cache | Có | Không |
| Sử dụng | Tìm kiếm, filter | Đăng nhập, đăng ký |

---

## 3. XỬ LÝ FORM VỚI PHP

### 3.1 Superglobals

```php
<?php
// $_GET - Dữ liệu từ URL
$id = $_GET['id'];

// $_POST - Dữ liệu từ form POST
$name = $_POST['name'];

// $_REQUEST - Cả GET và POST
$data = $_REQUEST['data'];

// $_SERVER - Thông tin server
$method = $_SERVER['REQUEST_METHOD'];

// $_FILES - File upload
$file = $_FILES['avatar'];
?>
```

### 3.2 Kiểm Tra Form Submit

```php
<?php
// Cách 1: Kiểm tra REQUEST_METHOD
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Xử lý form
}

// Cách 2: Kiểm tra isset
if (isset($_POST['submit'])) {
    // Xử lý form
}

// Cách 3: Kiểm tra empty
if (!empty($_POST['username'])) {
    // Có dữ liệu
}
?>
```

### 3.3 Form Xử Lý Cùng File (Self-processing)

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
        $errors[] = "Vui lòng nhập tên";
    }
    if (empty($email)) {
        $errors[] = "Vui lòng nhập email";
    }
    
    // Nếu không có lỗi
    if (empty($errors)) {
        $message = "Cảm ơn $name! Chúng tôi sẽ liên hệ qua $email";
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Liên hệ</title></head>
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
        <button type="submit">Gửi</button>
    </form>
</body>
</html>
```

---

## 4. VALIDATION DỮ LIỆU

### 4.1 Các Hàm Kiểm Tra

```php
<?php
$input = $_POST['input'] ?? '';

// Kiểm tra rỗng
if (empty($input)) {
    echo "Không được để trống";
}

// Kiểm tra độ dài
if (strlen($input) < 3) {
    echo "Tối thiểu 3 ký tự";
}

// Kiểm tra số
if (!is_numeric($input)) {
    echo "Phải là số";
}

// Kiểm tra email
if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
    echo "Email không hợp lệ";
}

// Kiểm tra URL
if (!filter_var($input, FILTER_VALIDATE_URL)) {
    echo "URL không hợp lệ";
}

// Kiểm tra regex
if (!preg_match("/^[a-zA-Z]+$/", $input)) {
    echo "Chỉ được chứa chữ cái";
}
?>
```

### 4.2 Làm Sạch Dữ Liệu (Sanitization)

```php
<?php
$input = $_POST['input'] ?? '';

// Xóa khoảng trắng đầu cuối
$input = trim($input);

// Xóa backslashes
$input = stripslashes($input);

// Chuyển ký tự đặc biệt HTML
$input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

// Filter sanitize
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$url = filter_var($_POST['url'], FILTER_SANITIZE_URL);
$int = filter_var($_POST['number'], FILTER_SANITIZE_NUMBER_INT);
?>
```

### 4.3 Hàm Validate Tổng Hợp

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
    // Ít nhất 8 ký tự, có chữ hoa, chữ thường, số
    return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $password);
}
?>
```

---

# VÍ DỤ MINH HỌA

## Ví Dụ 1: Form Đăng Ký Hoàn Chỉnh

```php
<?php
// register.php
$errors = [];
$success = false;

// Giữ lại giá trị đã nhập
$name = $email = $password = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy và làm sạch dữ liệu
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $agree = isset($_POST['agree']);
    
    // Validate
    if (empty($name)) {
        $errors['name'] = "Vui lòng nhập họ tên";
    } elseif (strlen($name) < 2) {
        $errors['name'] = "Họ tên tối thiểu 2 ký tự";
    }
    
    if (empty($email)) {
        $errors['email'] = "Vui lòng nhập email";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Email không hợp lệ";
    }
    
    if (empty($password)) {
        $errors['password'] = "Vui lòng nhập mật khẩu";
    } elseif (strlen($password) < 6) {
        $errors['password'] = "Mật khẩu tối thiểu 6 ký tự";
    }
    
    if ($password !== $confirmPassword) {
        $errors['confirm_password'] = "Mật khẩu xác nhận không khớp";
    }
    
    if (!$agree) {
        $errors['agree'] = "Bạn phải đồng ý điều khoản";
    }
    
    // Nếu không có lỗi
    if (empty($errors)) {
        $success = true;
        // TODO: Lưu vào database
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đăng Ký Tài Khoản</title>
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
        <h1>📝 Đăng Ký Tài Khoản</h1>
        
        <?php if ($success): ?>
            <div class="success-message">
                🎉 Đăng ký thành công! Chào mừng <?= htmlspecialchars($name) ?>
            </div>
        <?php else: ?>
        
        <form method="POST">
            <div class="form-group">
                <label>Họ Tên *</label>
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
                <label>Mật Khẩu *</label>
                <input type="password" name="password"
                       class="<?= isset($errors['password']) ? 'error' : '' ?>">
                <?php if (isset($errors['password'])): ?>
                    <div class="error-message"><?= $errors['password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Xác Nhận Mật Khẩu *</label>
                <input type="password" name="confirm_password"
                       class="<?= isset($errors['confirm_password']) ? 'error' : '' ?>">
                <?php if (isset($errors['confirm_password'])): ?>
                    <div class="error-message"><?= $errors['confirm_password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" name="agree" id="agree">
                <label for="agree" style="font-weight: normal;">
                    Tôi đồng ý với điều khoản sử dụng
                </label>
            </div>
            <?php if (isset($errors['agree'])): ?>
                <div class="error-message"><?= $errors['agree'] ?></div>
            <?php endif; ?>
            
            <button type="submit">Đăng Ký</button>
        </form>
        
        <?php endif; ?>
    </div>
</body>
</html>
```

---

# THỰC HÀNH

## BÀI 1: Form Liên Hệ

🎯 **Mục tiêu:** Tạo form liên hệ với validation

📝 **Yêu cầu:**
- Các trường: Họ tên, Email, Số điện thoại, Nội dung
- Validate tất cả các trường
- Hiển thị thông báo thành công/lỗi

---

## BÀI 2: Form Tính Toán

🎯 **Mục tiêu:** Tạo máy tính đơn giản với form

📝 **Yêu cầu:**
- Nhập 2 số
- Chọn phép tính (dropdown)
- Hiển thị kết quả

---

## BÀI 3: Form Đăng Nhập (Challenge)

🎯 **Mục tiêu:** Tạo form đăng nhập với kiểm tra hardcode

📝 **Yêu cầu:**
- Username: admin, Password: 123456
- Hiển thị thông báo đăng nhập thành công/thất bại
- Đếm số lần đăng nhập sai

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Tạo được HTML Form
- [ ] Phân biệt GET vs POST
- [ ] Xử lý form với $_GET, $_POST
- [ ] Validate và sanitize dữ liệu
- [ ] Tạo form self-processing

---

# 📋 PHIẾU HỌC TẬP BUỔI 03

**Họ Tên:** ___________________    **MSSV:** ___________

## Câu Hỏi

1. Khi nào dùng GET, khi nào dùng POST?
2. `htmlspecialchars()` dùng để làm gì?
3. Làm sao để giữ lại giá trị đã nhập khi form có lỗi?

## Bài Tập

- [ ] Form Liên Hệ
- [ ] Form Tính Toán
- [ ] Form Đăng Nhập (Bonus)

---

# 🔗 CHUẨN BỊ BUỔI 04

**Buổi tiếp theo:** Introduction to MySQL

### Sẽ học:
- Cài đặt MySQL
- phpMyAdmin
- Tạo Database, Table
- Kiểu dữ liệu MySQL

---

**Chương tiếp theo: [Buổi 04 - Introduction to MySQL →](../phan_2_mysql_database/buoi_04_intro_mysql.md)**
