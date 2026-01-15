# 🟨 BUỔI 09
# **ERROR HANDLING - XỬ LÝ LỖI**

Hôm nay chúng ta sẽ học cách xử lý lỗi chuyên nghiệp trong PHP!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Hiểu các loại lỗi trong PHP
   - Sử dụng try-catch
   - Custom error handling
   - Debug techniques

🔗 Learning Outcomes: LO6
```

---

# LÝ THUYẾT

## 1. CÁC LOẠI LỖI

### 1.1 Error Types

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Parse Error** | Lỗi cú pháp | Thiếu `;`, `}` |
| **Fatal Error** | Lỗi nghiêm trọng | Gọi hàm không tồn tại |
| **Warning** | Cảnh báo | Include file không tồn tại |
| **Notice** | Thông báo | Dùng biến chưa khai báo |

### 1.2 Error Reporting

```php
<?php
// Hiển thị tất cả lỗi (development)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ẩn lỗi (production)
error_reporting(0);
ini_set('display_errors', 0);

// Ghi log lỗi
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/error.log');
?>
```

---

## 2. TRY-CATCH

### 2.1 Cú Pháp Cơ Bản

```php
<?php
try {
    // Code có thể gây lỗi
    $result = 10 / 0;
} catch (Exception $e) {
    // Xử lý lỗi
    echo "Lỗi: " . $e->getMessage();
} finally {
    // Luôn chạy
    echo "Hoàn thành";
}
?>
```

### 2.2 Throw Exception

```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("Không thể chia cho 0");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo "Lỗi: " . $e->getMessage();
}
?>
```

### 2.3 Custom Exception

```php
<?php
class ValidationException extends Exception {
    private $errors = [];
    
    public function __construct($errors) {
        $this->errors = $errors;
        parent::__construct("Validation failed");
    }
    
    public function getErrors() {
        return $this->errors;
    }
}

// Sử dụng
try {
    $errors = [];
    if (empty($name)) {
        $errors['name'] = "Name is required";
    }
    if (!empty($errors)) {
        throw new ValidationException($errors);
    }
} catch (ValidationException $e) {
    $errors = $e->getErrors();
}
?>
```

---

## 3. CUSTOM ERROR HANDLER

```php
<?php
// Custom error handler
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    $log = date('Y-m-d H:i:s') . " - Error [$errno]: $errstr in $errfile on line $errline\n";
    error_log($log, 3, 'errors.log');
    
    if ($errno == E_USER_ERROR) {
        echo "Đã xảy ra lỗi. Vui lòng thử lại sau.";
        exit(1);
    }
    
    return true;
}

set_error_handler("customErrorHandler");

// Custom exception handler
function customExceptionHandler($exception) {
    error_log($exception->getMessage());
    echo "Đã xảy ra lỗi. Vui lòng liên hệ admin.";
}

set_exception_handler("customExceptionHandler");
?>
```

---

## 4. DEBUG TECHNIQUES

### 4.1 Các Hàm Debug

```php
<?php
// In biến
var_dump($variable);
print_r($array);

// Debug và dừng
dd($variable);  // Laravel style

function dd($var) {
    echo "<pre>";
    var_dump($var);
    echo "</pre>";
    die();
}

// Backtrace
debug_print_backtrace();

// Error log
error_log("Debug: " . print_r($data, true));
?>
```

### 4.2 Xdebug

```php
// php.ini
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_port=9003
```

---

# VÍ DỤ THỰC TẾ

```php
<?php
class Database {
    private $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host=localhost;dbname=test",
                "root",
                "",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Không thể kết nối database");
        }
    }
    
    public function query($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            throw new Exception("Truy vấn thất bại");
        }
    }
}

// Sử dụng
try {
    $db = new Database();
    $users = $db->query("SELECT * FROM users WHERE id = ?", [1]);
} catch (Exception $e) {
    echo "Lỗi: " . $e->getMessage();
}
?>
```

---

# THỰC HÀNH

## BÀI 1: Form với Error Handling

📝 **Yêu cầu:**
- Tạo form đăng ký
- Validate với try-catch
- Hiển thị lỗi thân thiện

## BÀI 2: Custom Exception

📝 **Yêu cầu:**
- Tạo DatabaseException
- Tạo ValidationException
- Xử lý trong controller

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu các loại lỗi PHP
- [ ] Sử dụng được try-catch
- [ ] Tạo được custom exception
- [ ] Debug hiệu quả

---

**Chương tiếp theo: [Buổi 10 - PHP + MySQL →](./buoi_10_php_mysql.md)**
