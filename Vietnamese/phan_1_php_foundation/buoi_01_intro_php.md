# 🟦 BUỔI 01
# **INTRODUCTION TO PHP**

Chào mừng bạn đến với buổi học đầu tiên! Hôm nay chúng ta sẽ làm quen với PHP - ngôn ngữ lập trình web phổ biến nhất thế giới.

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
📚 Tài liệu tham khảo: Chapter 1 - PHP & MySQL Web Development
🎯 Mục tiêu buổi học:
   - Hiểu PHP là gì và tại sao cần học
   - Cài đặt và cấu hình môi trường phát triển
   - Viết chương trình PHP đầu tiên
   - Nắm vững cú pháp cơ bản PHP

📖 Chuẩn bị trước buổi học:
   - Đọc file 00_huong_dan_cai_dat.md
   - Cài đặt XAMPP
   - Cài đặt VS Code

🔗 Liên kết với Learning Outcomes: LO1
```

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi này, bạn sẽ:

- Hiểu **PHP là gì** và vì sao nó quan trọng cho web development
- Biết cách **cài đặt môi trường** phát triển PHP
- Viết được **chương trình PHP đầu tiên**
- Nắm vững **cú pháp cơ bản**: echo, print, comments
- Hiểu cách **nhúng PHP vào HTML**

---

# LÝ THUYẾT

## 1. PHP LÀ GÌ?

### 1.1 Định Nghĩa

**PHP** = **P**HP: **H**ypertext **P**reprocessor (đệ quy)

PHP là ngôn ngữ lập trình kịch bản phía server (server-side scripting language), được thiết kế đặc biệt cho phát triển web.

### 🎒 Ví dụ đời sống

Hãy tưởng tượng một nhà hàng:
- **HTML/CSS** = Menu và cách bày trí bàn (giao diện)
- **PHP** = Đầu bếp trong bếp (xử lý logic, nấu ăn)
- **MySQL** = Kho nguyên liệu (lưu trữ dữ liệu)

Khách hàng (browser) chỉ thấy món ăn (HTML), không thấy đầu bếp làm việc (PHP).

### 1.2 Tại Sao Cần Học PHP?

| Lý do | Giải thích |
|-------|------------|
| **Phổ biến** | 77% website sử dụng PHP (WordPress, Facebook) |
| **Dễ học** | Cú pháp đơn giản, tài liệu phong phú |
| **Miễn phí** | Open source, không tốn chi phí |
| **Tích hợp tốt** | Làm việc mượt với MySQL, HTML, CSS |
| **Cộng đồng lớn** | Dễ tìm giải pháp khi gặp vấn đề |

### 1.3 PHP Hoạt Động Như Thế Nào?

```
┌─────────────┐     Request      ┌─────────────┐
│   Browser   │ ───────────────► │ Web Server  │
│  (Client)   │                  │  (Apache)   │
└─────────────┘                  └──────┬──────┘
       ▲                                │
       │                                ▼
       │                         ┌─────────────┐
       │                         │    PHP      │
       │                         │  Processor  │
       │                         └──────┬──────┘
       │                                │
       │      HTML Response             ▼
       │ ◄───────────────────── ┌─────────────┐
       │                        │   MySQL     │
       │                        │  Database   │
       └─────────────────────── └─────────────┘
```

**Quy trình:**
1. Browser gửi request đến Web Server
2. Server nhận file PHP và chuyển cho PHP Processor
3. PHP xử lý code, có thể truy vấn Database
4. PHP trả về HTML cho Server
5. Server gửi HTML về Browser
6. Browser hiển thị trang web

---

## 2. CÚ PHÁP PHP CƠ BẢN

### 2.1 Thẻ PHP

PHP code được đặt trong cặp thẻ đặc biệt:

```php
<?php
    // Code PHP ở đây
?>
```

### ⚠️ Lưu ý quan trọng:
- File PHP phải có đuôi `.php`
- Thẻ mở: `<?php`
- Thẻ đóng: `?>` (có thể bỏ qua nếu file chỉ chứa PHP)
- Mỗi câu lệnh kết thúc bằng dấu `;`

### 2.2 In Ra Màn Hình: echo và print

#### echo - Cách phổ biến nhất

```php
<?php
// echo - in ra màn hình
echo "Hello World!";           // Chuỗi
echo 123;                      // Số
echo "Hello", " ", "World!";   // Nhiều tham số
?>
```

#### print - Tương tự echo

```php
<?php
// print - tương tự echo nhưng chỉ nhận 1 tham số
print "Hello World!";
print("Hello World!");  // Có thể dùng ngoặc
?>
```

#### 🔍 So sánh echo vs print

| Đặc điểm | echo | print |
|----------|------|-------|
| Tham số | Nhiều | Chỉ 1 |
| Trả về giá trị | Không | 1 |
| Tốc độ | Nhanh hơn | Chậm hơn |
| Sử dụng | Phổ biến hơn | Ít dùng |

**Khuyến nghị:** Sử dụng `echo` trong hầu hết trường hợp.

### 2.3 Comments (Ghi chú)

```php
<?php
// Comment một dòng - dùng //

# Comment một dòng - dùng # (ít dùng)

/*
   Comment nhiều dòng
   Dùng cho giải thích dài
   hoặc tạm ẩn code
*/

/**
 * PHPDoc comment
 * Dùng để document hàm, class
 * @param string $name Tên người dùng
 * @return string Lời chào
 */
?>
```

### 2.4 Nhúng PHP vào HTML

```php
<!DOCTYPE html>
<html>
<head>
    <title>PHP trong HTML</title>
</head>
<body>
    <h1>Xin chào!</h1>
    
    <!-- Cách 1: Dùng echo -->
    <p><?php echo "Hôm nay là: " . date("d/m/Y"); ?></p>
    
    <!-- Cách 2: Shorthand (nếu được bật) -->
    <p>Giờ hiện tại: <?= date("H:i:s") ?></p>
    
    <!-- Cách 3: PHP block -->
    <?php
    $name = "Sinh viên";
    $course = "INS3064";
    ?>
    <p>Chào <?php echo $name; ?>, bạn đang học <?php echo $course; ?></p>
</body>
</html>
```

---

## 3. QUY TẮC & BEST PRACTICES

### ✅ Best Practices:

1. **Luôn dùng `<?php`** thay vì short tag `<?`
2. **Kết thúc câu lệnh bằng `;`**
3. **Viết comment** cho code phức tạp
4. **Đặt tên file có ý nghĩa**: `login.php`, `products.php`
5. **Indent code** để dễ đọc

### ❌ Lỗi thường gặp:

```php
<?php
// ❌ Sai: Thiếu dấu ;
echo "Hello"

// ✅ Đúng:
echo "Hello";

// ❌ Sai: Dùng ngoặc kép không đúng
echo "He said "Hello"";

// ✅ Đúng: Escape hoặc dùng ngoặc đơn
echo "He said \"Hello\"";
echo 'He said "Hello"';
?>
```

---

## 4. TÓM TẮT LÝ THUYẾT

| Khái Niệm | Định Nghĩa | Ví Dụ |
|-----------|-----------|-------|
| PHP | Ngôn ngữ server-side | `<?php ?>` |
| echo | In ra màn hình | `echo "Hello";` |
| print | In ra màn hình | `print "Hello";` |
| Comment | Ghi chú code | `// comment` |
| Shorthand | Cú pháp ngắn | `<?= $var ?>` |

---

# VÍ DỤ & HÌNH MINH HỌA

## 3.1 Ví Dụ 1: Hello World

**Tình Huống:** Tạo trang web đơn giản hiển thị "Hello World"

**Code:**
```php
<?php
// File: hello.php
// Chương trình PHP đầu tiên

echo "Hello World!";
echo "<br>";  // Xuống dòng trong HTML
echo "Chào mừng đến với PHP!";
?>
```

**Giải Thích:**
- Dòng 1-2: Comment giải thích file
- Dòng 4: In "Hello World!"
- Dòng 5: In thẻ `<br>` để xuống dòng
- Dòng 6: In câu chào tiếng Việt

**Output:**
```
Hello World!
Chào mừng đến với PHP!
```

---

## 3.2 Ví Dụ 2: PHP + HTML

**Tình Huống:** Tạo trang web có cả HTML và PHP

**Code:**
```php
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang PHP đầu tiên</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .info { background: #f0f0f0; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎉 Chào mừng đến với PHP!</h1>
    
    <div class="info">
        <?php
        // Hiển thị thông tin server
        echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
        echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
        echo "<p><strong>Ngày:</strong> " . date("d/m/Y") . "</p>";
        echo "<p><strong>Giờ:</strong> " . date("H:i:s") . "</p>";
        ?>
    </div>
</body>
</html>
```

**Giải Thích:**
- HTML tạo cấu trúc và style
- PHP được nhúng trong `<?php ?>` để xử lý động
- `phpversion()`: Hàm trả về version PHP
- `$_SERVER`: Biến superglobal chứa thông tin server
- `date()`: Hàm format ngày giờ

---

## 3.3 Ví Dụ 3: Tính Toán Đơn Giản

**Tình Huống:** Hiển thị kết quả tính toán

**Code:**
```php
<?php
// File: calculator.php
// Ví dụ tính toán cơ bản

$a = 10;
$b = 5;

echo "<h2>Máy tính đơn giản</h2>";
echo "<p>a = $a, b = $b</p>";
echo "<hr>";

echo "<p>Cộng: $a + $b = " . ($a + $b) . "</p>";
echo "<p>Trừ: $a - $b = " . ($a - $b) . "</p>";
echo "<p>Nhân: $a × $b = " . ($a * $b) . "</p>";
echo "<p>Chia: $a ÷ $b = " . ($a / $b) . "</p>";
echo "<p>Chia lấy dư: $a % $b = " . ($a % $b) . "</p>";
?>
```

**Output:**
```
Máy tính đơn giản
a = 10, b = 5
─────────────────
Cộng: 10 + 5 = 15
Trừ: 10 - 5 = 5
Nhân: 10 × 5 = 50
Chia: 10 ÷ 5 = 2
Chia lấy dư: 10 % 5 = 0
```

---

# THỰC HÀNH (HANDS-ON)

## 4.1 Chuẩn Bị Môi Trường

**Công Cụ Cần Thiết:**
- XAMPP đã cài đặt và chạy
- VS Code
- Browser (Chrome/Firefox)

**Bước Chuẩn Bị:**
1. Mở XAMPP Control Panel
2. Start Apache
3. Tạo folder: `C:\xampp\htdocs\ins3064\buoi_01\`
4. Mở folder trong VS Code

---

## 4.2 Bài Thực Hành Chính

### **BÀI 1: Hello World**

🎯 **Mục tiêu:** Viết chương trình PHP đầu tiên

📝 **Yêu cầu:**
- Tạo file `hello.php`
- In ra "Hello, I am [Tên bạn]!"
- In ra "Welcome to INS3064!"

🔧 **Hướng dẫn:**

**Bước 1:** Tạo file `hello.php`
```php
<?php
// Bài 1: Hello World
// Tác giả: [Tên bạn]

echo "Hello, I am [Tên bạn]!";
echo "<br>";
echo "Welcome to INS3064!";
?>
```

**Bước 2:** Mở browser, truy cập: `http://localhost/ins3064/buoi_01/hello.php`

✅ **Kết Quả Mong Đợi:**
```
Hello, I am [Tên bạn]!
Welcome to INS3064!
```

💾 **Tệp Để Lưu:** `hello.php`

---

### **BÀI 2: Trang Giới Thiệu Cá Nhân**

🎯 **Mục tiêu:** Kết hợp PHP với HTML tạo trang profile

📝 **Yêu cầu:**
- Tạo file `profile.php`
- Hiển thị: Họ tên, MSSV, Lớp, Email
- Có style CSS đẹp
- Hiển thị ngày giờ hiện tại

🔧 **Hướng dẫn:**

**Bước 1:** Tạo file `profile.php`
```php
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Profile - <?php echo "Tên bạn"; ?></title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
        }
        h1 { color: #333; margin-bottom: 5px; }
        .subtitle { color: #666; margin-bottom: 20px; }
        .info { text-align: left; }
        .info-item {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
        }
        .info-item:last-child { border-bottom: none; }
        .label { color: #888; }
        .value { color: #333; font-weight: 500; }
        .datetime {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="avatar">👤</div>
        
        <?php
        // Khai báo thông tin cá nhân
        $hoTen = "Nguyễn Văn A";
        $mssv = "123456789";
        $lop = "INS3064-01";
        $email = "nguyenvana@email.com";
        ?>
        
        <h1><?php echo $hoTen; ?></h1>
        <p class="subtitle">Sinh viên <?php echo $lop; ?></p>
        
        <div class="info">
            <div class="info-item">
                <span class="label">📋 MSSV:</span>
                <span class="value"><?php echo $mssv; ?></span>
            </div>
            <div class="info-item">
                <span class="label">📚 Lớp:</span>
                <span class="value"><?php echo $lop; ?></span>
            </div>
            <div class="info-item">
                <span class="label">📧 Email:</span>
                <span class="value"><?php echo $email; ?></span>
            </div>
        </div>
        
        <div class="datetime">
            <?php
            echo "🗓️ " . date("d/m/Y") . " | ";
            echo "⏰ " . date("H:i:s");
            ?>
        </div>
    </div>
</body>
</html>
```

**Bước 2:** Truy cập: `http://localhost/ins3064/buoi_01/profile.php`

✅ **Kết Quả Mong Đợi:** Trang profile đẹp với thông tin cá nhân

💾 **Tệp Để Lưu:** `profile.php`

---

### **BÀI 3: Máy Tính Đơn Giản (Challenge)**

🎯 **Mục tiêu:** Tạo trang hiển thị các phép tính

📝 **Yêu cầu:**
- Tạo file `calculator.php`
- Khai báo 2 biến số
- Hiển thị kết quả: cộng, trừ, nhân, chia
- Có giao diện đẹp

🔧 **Gợi ý Code:**
```php
<?php
$num1 = 25;
$num2 = 7;

// TODO: Hiển thị các phép tính
?>
```

---

## 4.3 Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Cách Sửa |
|-----|-------------|----------|
| Parse error: syntax error | Thiếu `;` hoặc `}` | Kiểm tra cú pháp |
| Trang trắng | Lỗi PHP không hiển thị | Bật `display_errors` trong php.ini |
| 404 Not Found | Sai đường dẫn file | Kiểm tra tên file và folder |
| Không hiển thị tiếng Việt | Thiếu charset | Thêm `<meta charset="UTF-8">` |

---

# ✅ KIẾN THỨC CẦN ĐẠT SAU BUỔI HỌC

Sau buổi học này, bạn phải **hoàn toàn nắm vững** những điểm sau:

### Kiến Thức Lý Thuyết (Theory)
- [ ] Hiểu được PHP là gì và cách hoạt động
- [ ] Giải thích được quy trình request-response
- [ ] Phân biệt được client-side và server-side

### Kỹ Năng Thực Hành (Skills)
- [ ] Có thể viết file PHP cơ bản
- [ ] Có thể nhúng PHP vào HTML
- [ ] Có thể sử dụng echo, print, comment

### Kiến Thức Bổ Sung (Bonus)
- 💡 PHP có thể tạo PDF, xử lý ảnh, gửi email
- 💡 Facebook, Wikipedia, WordPress dùng PHP
- 💡 Buổi tiếp theo: Biến, kiểu dữ liệu, toán tử

---

## 🧪 Tự Kiểm Tra Mục Tiêu Học Tập

**Câu hỏi Tự Đánh Giá:**

1. **[Basic]** PHP là ngôn ngữ chạy ở đâu? Client hay Server?
2. **[Intermediate]** Sự khác nhau giữa `echo` và `print` là gì?
3. **[Advanced]** Tại sao PHP phổ biến trong phát triển web?

**Nếu trả lời được tất cả 3 câu, bạn đã sẵn sàng cho buổi tiếp theo! ✅**

---

# 📋 PHIẾU HỌC TẬP BUỔI 01

**Họ Tên Sinh Viên:** ___________________    **MSSV:** ___________

**Ngày Làm Bài:** ___________________    **Lớp:** ___________

---

## PHẦN A: TỔNG HỢP KIẾN THỨC

### A1. Các Khái Niệm Chính

| Khái Niệm | Định Nghĩa (Viết bằng lời riêng của bạn) | Ví Dụ |
|-----------|------------------------------------------|-------|
| PHP | _________________________________ | __________ |
| echo | _________________________________ | __________ |
| Server-side | _________________________________ | __________ |

### A2. Câu Hỏi Trắc Nghiệm

1. PHP là viết tắt của?
   - A) Personal Home Page
   - B) PHP: Hypertext Preprocessor
   - C) Pre Hypertext Processor
   - D) Page Hypertext Programming
   
   Đáp án: _______

2. Thẻ mở PHP đúng là?
   - A) `<php>`
   - B) `<?php`
   - C) `<script php>`
   - D) `<?PHP`
   
   Đáp án: _______

3. Câu lệnh PHP kết thúc bằng?
   - A) Dấu chấm (.)
   - B) Dấu phẩy (,)
   - C) Dấu chấm phẩy (;)
   - D) Không cần kết thúc
   
   Đáp án: _______

### A3. Câu Hỏi Tự Luận

1. Giải thích quy trình từ khi user nhập URL đến khi trang web hiển thị?

   Trả lời: ___________________________________________________________
   
   _________________________________________________________________

2. Tại sao nên sử dụng `echo` thay vì `print`?

   Trả lời: ___________________________________________________________
   
   _________________________________________________________________

---

## PHẦN B: BÀI TẬP LÝ THUYẾT

### BÀI TẬP 1: Sửa lỗi code

Tìm và sửa lỗi trong đoạn code sau:

```php
<?php
echo "Hello World"
echo "Welcome to PHP!";
print "This is", "PHP";
?>
```

**Trả lời:**
___________________________________________________________________________

___________________________________________________________________________

---

## PHẦN C: BÀI TẬP THỰC HÀNH

### BÀI THỰC HÀNH 1: Trang Thông Tin Cá Nhân

🎯 **Mục tiêu:** Tạo trang hiển thị thông tin cá nhân

📝 **Yêu cầu:**
1. Tạo file `myinfo.php`
2. Hiển thị: Họ tên, Ngày sinh, Quê quán, Sở thích
3. Có CSS đẹp
4. Hiển thị ngày giờ truy cập

📤 **Kết Quả Mong Đợi:**
- Trang web hiển thị đầy đủ thông tin
- Giao diện đẹp, dễ đọc

💾 **Tệp Cần Nộp:** `myinfo.php`

---

### BÀI THỰC HÀNH 2: Trang Chào Mừng (Challenge)

🏆 **Thử Thách:** Tạo trang chào mừng với các thông tin động

📝 **Yêu cầu:**
1. Hiển thị lời chào theo thời gian (Sáng/Chiều/Tối)
2. Hiển thị ngày trong tuần bằng tiếng Việt
3. Đếm số ngày còn lại trong tháng

💾 **Tệp Cần Nộp:** `welcome.php`

---

## PHẦN D: TỰ ĐÁNH GIÁ

### D1. Mức Độ Hiểu Biết (Rate từ 1-5)

| Chủ Đề | 1 | 2 | 3 | 4 | 5 |
|--------|---|---|---|---|---|
| Hiểu PHP là gì | ☐ | ☐ | ☐ | ☐ | ☐ |
| Sử dụng echo/print | ☐ | ☐ | ☐ | ☐ | ☐ |
| Nhúng PHP vào HTML | ☐ | ☐ | ☐ | ☐ | ☐ |

### D2. Câu Hỏi Cần Giải Đáp

Những phần còn chưa hiểu rõ:
___________________________________________________________________________

### D3. Thời Gian Làm Bài

- Thời gian lý thuyết: _________ phút
- Thời gian thực hành: _________ phút

---

## 📎 HƯỚNG DẪN NỘP BÀI

**Deadline:** [Ngày giờ nộp]

**Cách Nộp:**
1. Lưu tất cả file vào folder: `Buoi01_[HoTen]_MSSV`
2. Nén thành file ZIP
3. Nộp qua hệ thống LMS

**Tiêu Chí Đánh Giá:**
- Hoàn thành đúng yêu cầu: 40%
- Code chạy đúng kết quả: 30%
- Mã code sạch, có comment: 15%
- Phiếu học tập hoàn chỉnh: 15%

---

# 🔗 CHUẨN BỊ CHO BUỔI 02

**Buổi tiếp theo:** Programming PHP - Biến, Kiểu Dữ Liệu, Toán Tử

### Kiến Thức Sẽ Học:
- Biến và cách khai báo
- Các kiểu dữ liệu trong PHP
- Toán tử số học, so sánh, logic
- Cấu trúc điều kiện if-else

### Chuẩn Bị:
- [ ] Hoàn thành bài tập Buổi 01
- [ ] Đọc trước về biến trong PHP
- [ ] Ôn lại kiến thức cơ bản về logic

---

# 📚 TÀI LIỆU THAM KHẢO

**Sách & Ebook:**
- PHP & MySQL Web Development - Luke Welling
- Learning PHP, MySQL & JavaScript - Robin Nixon

**Website & Tutorial:**
- [PHP Manual](https://www.php.net/manual/)
- [W3Schools PHP](https://www.w3schools.com/php/)
- [PHP The Right Way](https://phptherightway.com/)

**Video:**
- [PHP Tutorial for Beginners - YouTube](https://youtube.com)

---

**Chương tiếp theo: [Buổi 02 - Programming PHP →](./buoi_02_programming_php.md)**
