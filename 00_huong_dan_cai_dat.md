# 🛠️ HƯỚNG DẪN CÀI ĐẶT MÔI TRƯỜNG
# **PHP & MySQL Development Environment**

---

# 📋 YÊU CẦU HỆ THỐNG

| Thành phần | Yêu cầu tối thiểu |
|------------|-------------------|
| **OS** | Windows 10/11, macOS, Linux |
| **RAM** | 4GB (khuyến nghị 8GB) |
| **Disk** | 5GB trống |
| **Browser** | Chrome, Firefox (mới nhất) |

---

# 1️⃣ CÀI ĐẶT XAMPP

## 🎯 XAMPP là gì?

XAMPP = **X** (Cross-platform) + **A** (Apache) + **M** (MySQL/MariaDB) + **P** (PHP) + **P** (Perl)

Đây là gói phần mềm tích hợp giúp bạn có môi trường phát triển web hoàn chỉnh.

## 📥 Bước 1: Download XAMPP

1. Truy cập: https://www.apachefriends.org/download.html
2. Chọn phiên bản PHP 8.0+ cho hệ điều hành của bạn
3. Download file installer

## 📦 Bước 2: Cài đặt

### Windows:
```
1. Chạy file xampp-windows-x64-8.x.x-installer.exe
2. Chọn các thành phần:
   ✅ Apache
   ✅ MySQL
   ✅ PHP
   ✅ phpMyAdmin
3. Chọn thư mục cài đặt: C:\xampp (mặc định)
4. Nhấn Install và đợi hoàn tất
```

### macOS:
```
1. Mở file xampp-osx-8.x.x-installer.dmg
2. Kéo XAMPP vào thư mục Applications
3. Mở XAMPP từ Applications
```

## ▶️ Bước 3: Khởi động XAMPP

1. Mở **XAMPP Control Panel**
2. Nhấn **Start** cho **Apache**
3. Nhấn **Start** cho **MySQL**
4. Kiểm tra: Mở browser và truy cập `http://localhost`

### ✅ Kết quả mong đợi:
- Trang XAMPP Dashboard hiển thị
- Apache và MySQL có trạng thái "Running" (màu xanh)

---

# 2️⃣ KIỂM TRA PHP

## 📝 Tạo file test

1. Mở thư mục: `C:\xampp\htdocs` (Windows) hoặc `/Applications/XAMPP/htdocs` (macOS)
2. Tạo file mới: `info.php`
3. Nhập nội dung:

```php
<?php
// File: info.php
// Hiển thị thông tin PHP

phpinfo();
?>
```

4. Mở browser: `http://localhost/info.php`

### ✅ Kết quả mong đợi:
- Trang hiển thị thông tin chi tiết về PHP
- Phiên bản PHP: 8.0+

---

# 3️⃣ KIỂM TRA MySQL

## 🔧 Truy cập phpMyAdmin

1. Mở browser: `http://localhost/phpmyadmin`
2. Đăng nhập:
   - Username: `root`
   - Password: (để trống)

### ✅ Kết quả mong đợi:
- Giao diện phpMyAdmin hiển thị
- Danh sách database bên trái

## 📊 Tạo Database test

1. Trong phpMyAdmin, click **New**
2. Nhập tên database: `test_db`
3. Click **Create**

---

# 4️⃣ CÀI ĐẶT VS CODE

## 📥 Download & Install

1. Truy cập: https://code.visualstudio.com/
2. Download cho hệ điều hành của bạn
3. Cài đặt theo hướng dẫn

## 🔌 Cài Extensions cần thiết

Mở VS Code → Extensions (Ctrl+Shift+X) → Tìm và cài:

| Extension | Mục đích |
|-----------|----------|
| **PHP Intelephense** | Autocomplete, syntax |
| **PHP Debug** | Debug PHP |
| **MySQL** | Kết nối MySQL |
| **Live Server** | Auto reload |
| **Prettier** | Format code |

---

# 5️⃣ CẤU TRÚC THƯ MỤC LÀM VIỆC

## 📁 Tạo thư mục dự án

```
C:\xampp\htdocs\
└── ins3064/                    ← Thư mục môn học
    ├── buoi_01/                ← Bài tập buổi 1
    │   ├── index.php
    │   └── style.css
    ├── buoi_02/                ← Bài tập buổi 2
    ├── ...
    └── final_project/          ← Dự án cuối kỳ
```

## 🌐 Truy cập dự án

- URL: `http://localhost/ins3064/buoi_01/`

---

# 6️⃣ HELLO WORLD ĐẦU TIÊN

## 📝 Tạo file

1. Tạo thư mục: `C:\xampp\htdocs\ins3064\buoi_01\`
2. Tạo file: `index.php`

```php
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello PHP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px 60px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #666;
        }
        .php-info {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Hello PHP!</h1>
        <p>Chào mừng bạn đến với môn INS3064</p>
        
        <div class="php-info">
            <?php
            // Hiển thị thông tin PHP
            echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
            echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
            echo "<p><strong>Thời gian:</strong> " . date("d/m/Y H:i:s") . "</p>";
            ?>
        </div>
    </div>
</body>
</html>
```

3. Mở browser: `http://localhost/ins3064/buoi_01/`

### ✅ Kết quả mong đợi:
- Trang web hiển thị "Hello PHP!"
- Thông tin PHP version và thời gian

---

# 7️⃣ XỬ LÝ LỖI THƯỜNG GẶP

## ❌ Lỗi 1: Apache không start được

**Nguyên nhân:** Port 80 bị chiếm bởi ứng dụng khác (Skype, IIS)

**Giải pháp:**
1. Mở XAMPP Control Panel
2. Click **Config** → **Apache (httpd.conf)**
3. Tìm `Listen 80` và đổi thành `Listen 8080`
4. Tìm `ServerName localhost:80` đổi thành `ServerName localhost:8080`
5. Restart Apache
6. Truy cập: `http://localhost:8080`

---

## ❌ Lỗi 2: MySQL không start được

**Nguyên nhân:** Port 3306 bị chiếm hoặc MySQL service khác đang chạy

**Giải pháp:**
1. Mở Task Manager
2. Tìm và End process `mysqld.exe`
3. Restart MySQL trong XAMPP

---

## ❌ Lỗi 3: Trang trắng / Không hiển thị PHP

**Nguyên nhân:** File không có extension `.php` hoặc cú pháp lỗi

**Giải pháp:**
1. Kiểm tra file có đuôi `.php`
2. Kiểm tra `<?php` và `?>` đúng cú pháp
3. Bật hiển thị lỗi trong `php.ini`:
   ```
   display_errors = On
   error_reporting = E_ALL
   ```

---

## ❌ Lỗi 4: Cannot connect to MySQL

**Nguyên nhân:** MySQL chưa start hoặc sai thông tin kết nối

**Giải pháp:**
1. Kiểm tra MySQL đang chạy trong XAMPP
2. Kiểm tra thông tin kết nối:
   - Host: `localhost`
   - User: `root`
   - Password: (trống)

---

# 8️⃣ CHECKLIST CÀI ĐẶT

Đánh dấu ✅ khi hoàn thành:

- [ ] Cài đặt XAMPP
- [ ] Apache start thành công
- [ ] MySQL start thành công
- [ ] Truy cập `http://localhost` OK
- [ ] Truy cập phpMyAdmin OK
- [ ] Tạo file PHP test OK
- [ ] Cài VS Code
- [ ] Cài Extensions PHP
- [ ] Tạo thư mục dự án
- [ ] Hello World chạy thành công

---

# 📞 HỖ TRỢ

Nếu gặp vấn đề không giải quyết được:

1. Google lỗi cụ thể
2. Hỏi trên Stack Overflow
3. Liên hệ giảng viên

---

**Tiếp theo: [Buổi 01 - Introduction to PHP →](./phan_1_php_foundation/buoi_01_intro_php.md)**
