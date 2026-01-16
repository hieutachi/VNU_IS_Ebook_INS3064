# 🟩 BUỔI 04
# **INTRODUCTION TO MySQL**

Chào mừng bạn đến với phần Database! Hôm nay chúng ta sẽ học về MySQL - hệ quản trị cơ sở dữ liệu phổ biến nhất cho web.

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
📚 Tài liệu: Chapter 4 - PHP & MySQL Web Development
🎯 Mục tiêu:
   - Hiểu Database là gì
   - Cài đặt và cấu hình MySQL
   - Sử dụng phpMyAdmin
   - Tạo Database và Table đầu tiên

📖 Chuẩn bị: XAMPP đã cài đặt
🔗 Learning Outcomes: LO3
```

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi này, bạn sẽ:

- **Hiểu** Database và MySQL là gì
- **Sử dụng** phpMyAdmin để quản lý database
- **Tạo** Database và Table
- **Hiểu** các kiểu dữ liệu trong MySQL

---

# LÝ THUYẾT

## 1. DATABASE LÀ GÌ?

### 1.1 Định Nghĩa

**Database (Cơ sở dữ liệu)** = Nơi lưu trữ dữ liệu có tổ chức, có thể truy xuất, quản lý và cập nhật.

### 🎒 Ví dụ đời sống

Database giống như **tủ hồ sơ văn phòng**:
- **Database** = Tủ hồ sơ
- **Table** = Ngăn kéo
- **Row** = Một tờ hồ sơ
- **Column** = Các mục thông tin trên hồ sơ

### 1.2 Tại Sao Cần Database?

| Vấn đề | Không có DB | Có DB |
|--------|-------------|-------|
| Lưu trữ | File text, khó quản lý | Có cấu trúc, dễ quản lý |
| Tìm kiếm | Chậm, phải đọc toàn bộ | Nhanh với index |
| Bảo mật | Khó kiểm soát | Có user, permission |
| Đồng thời | Xung đột dữ liệu | Xử lý transaction |

### 1.3 MySQL là gì?

**MySQL** = Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) phổ biến nhất.

**Đặc điểm:**
- ✅ Miễn phí, open source
- ✅ Nhanh, ổn định
- ✅ Dễ sử dụng
- ✅ Tích hợp tốt với PHP
- ✅ Cộng đồng lớn

**Ai dùng MySQL?**
- Facebook, Twitter, YouTube, Wikipedia, WordPress

---

## 2. CÀI ĐẶT VÀ CẤU HÌNH

### 2.1 MySQL trong XAMPP

MySQL đã được cài sẵn trong XAMPP:
1. Mở XAMPP Control Panel
2. Start **MySQL**
3. Trạng thái: Running (màu xanh)

### 2.2 Truy Cập phpMyAdmin

**phpMyAdmin** = Công cụ web để quản lý MySQL

1. Mở browser
2. Truy cập: `http://localhost/phpmyadmin`
3. Đăng nhập:
   - Username: `root`
   - Password: (để trống)

### 2.3 Giao Diện phpMyAdmin

```
┌─────────────────────────────────────────────────────────────┐
│ phpMyAdmin                                                   │
├─────────────┬───────────────────────────────────────────────┤
│             │                                               │
│ [Databases] │  Server: localhost                            │
│ ├── mysql   │  Server version: 8.0.x                        │
│ ├── test    │                                               │
│ └── ...     │  [SQL] [Status] [Users] [Export] [Import]     │
│             │                                               │
│             │  ┌─────────────────────────────────────────┐  │
│             │  │ Create database                         │  │
│             │  │ [____________] [Create]                 │  │
│             │  └─────────────────────────────────────────┘  │
│             │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

---

## 3. TẠO DATABASE

### 3.1 Qua phpMyAdmin

1. Click **New** (hoặc Databases)
2. Nhập tên database: `ins3064_db`
3. Chọn Collation: `utf8mb4_unicode_ci`
4. Click **Create**

### 3.2 Qua SQL

```sql
-- Tạo database
CREATE DATABASE ins3064_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE ins3064_db;

-- Xem danh sách database
SHOW DATABASES;

-- Xóa database
DROP DATABASE ins3064_db;
```

### 📋 Quy tắc đặt tên:
- Dùng chữ thường
- Không có khoảng trắng
- Dùng underscore: `my_database`
- Có ý nghĩa: `shop_db`, `blog_db`

---

## 4. TẠO TABLE

### 4.1 Cấu Trúc Table

```
┌─────────────────────────────────────────────────────────┐
│ Table: students                                          │
├─────┬──────────┬─────────┬──────────┬──────────────────┤
│ id  │ name     │ email   │ age      │ created_at       │
├─────┼──────────┼─────────┼──────────┼──────────────────┤
│ 1   │ Nguyen A │ a@e.com │ 20       │ 2024-01-01 10:00 │
│ 2   │ Tran B   │ b@e.com │ 21       │ 2024-01-02 11:00 │
│ 3   │ Le C     │ c@e.com │ 19       │ 2024-01-03 12:00 │
└─────┴──────────┴─────────┴──────────┴──────────────────┘
```

### 4.2 Tạo Table với SQL

```sql
-- Tạo table students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Xem cấu trúc table
DESCRIBE students;

-- Xem danh sách table
SHOW TABLES;

-- Xóa table
DROP TABLE students;
```

### 4.3 Tạo Table qua phpMyAdmin

1. Chọn database
2. Click **New** (Create table)
3. Nhập tên table: `students`
4. Số columns: 7
5. Điền thông tin từng column
6. Click **Save**

---

## 5. KIỂU DỮ LIỆU MySQL

### 5.1 Kiểu Số

| Kiểu | Mô tả | Phạm vi | Ví dụ |
|------|-------|---------|-------|
| `TINYINT` | Số nguyên nhỏ | -128 đến 127 | Tuổi |
| `INT` | Số nguyên | ±2 tỷ | ID |
| `BIGINT` | Số nguyên lớn | Rất lớn | Views |
| `DECIMAL(M,D)` | Số thập phân chính xác | - | Tiền (10,2) |
| `FLOAT` | Số thực | - | Điểm |

### 5.2 Kiểu Chuỗi

| Kiểu | Mô tả | Độ dài | Ví dụ |
|------|-------|--------|-------|
| `CHAR(N)` | Chuỗi cố định | 0-255 | Mã (10) |
| `VARCHAR(N)` | Chuỗi thay đổi | 0-65535 | Tên (100) |
| `TEXT` | Văn bản dài | 65535 | Nội dung |
| `LONGTEXT` | Văn bản rất dài | 4GB | Bài viết |

### 5.3 Kiểu Ngày/Giờ

| Kiểu | Mô tả | Format | Ví dụ |
|------|-------|--------|-------|
| `DATE` | Ngày | YYYY-MM-DD | 2024-01-15 |
| `TIME` | Giờ | HH:MM:SS | 14:30:00 |
| `DATETIME` | Ngày + Giờ | YYYY-MM-DD HH:MM:SS | 2024-01-15 14:30:00 |
| `TIMESTAMP` | Timestamp | Auto update | created_at |

### 5.4 Kiểu Khác

| Kiểu | Mô tả | Ví dụ |
|------|-------|-------|
| `BOOLEAN` | True/False | is_active |
| `ENUM` | Danh sách giá trị | status ENUM('active','inactive') |
| `JSON` | Dữ liệu JSON | settings |

---

## 6. CONSTRAINTS (RÀNG BUỘC)

### 6.1 Các Loại Constraints

```sql
CREATE TABLE products (
    -- PRIMARY KEY: Khóa chính, duy nhất, không null
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- NOT NULL: Bắt buộc có giá trị
    name VARCHAR(100) NOT NULL,
    
    -- UNIQUE: Giá trị duy nhất
    sku VARCHAR(50) UNIQUE,
    
    -- DEFAULT: Giá trị mặc định
    status VARCHAR(20) DEFAULT 'active',
    
    -- CHECK: Kiểm tra điều kiện (MySQL 8.0+)
    price DECIMAL(10,2) CHECK (price > 0),
    
    -- FOREIGN KEY: Khóa ngoại
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 6.2 AUTO_INCREMENT

```sql
-- Tự động tăng ID
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert không cần ID
INSERT INTO users (name) VALUES ('John');
-- id = 1 (tự động)

INSERT INTO users (name) VALUES ('Jane');
-- id = 2 (tự động)
```

---

# VÍ DỤ MINH HỌA

## Ví Dụ: Tạo Database Cho Ứng Dụng Blog

```sql
-- Tạo database
CREATE DATABASE blog_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE blog_db;

-- Table users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar VARCHAR(255),
    role ENUM('admin', 'author', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table posts
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    views INT DEFAULT 0,
    author_id INT NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at DATETIME,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Table comments
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_id INT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES comments(id)
);
```

---

# THỰC HÀNH

## BÀI 1: Tạo Database Sinh Viên

🎯 **Mục tiêu:** Tạo database quản lý sinh viên

📝 **Yêu cầu:**
- Tạo database: `student_management`
- Tạo table `students`: id, mssv, name, email, phone, class, gpa, created_at
- Tạo table `classes`: id, name, department

---

## BÀI 2: Tạo Database Sản Phẩm

🎯 **Mục tiêu:** Tạo database cho shop online

📝 **Yêu cầu:**
- Tạo database: `shop_db`
- Tạo table `categories`: id, name, description
- Tạo table `products`: id, name, price, stock, category_id, created_at

---

## BÀI 3: Thiết Kế Database (Challenge)

🎯 **Mục tiêu:** Thiết kế database cho ứng dụng quản lý thư viện

📝 **Yêu cầu:**
- Quản lý: Sách, Độc giả, Phiếu mượn
- Xác định các table và relationships

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu Database và MySQL là gì
- [ ] Sử dụng được phpMyAdmin
- [ ] Tạo được Database và Table
- [ ] Hiểu các kiểu dữ liệu
- [ ] Hiểu các constraints

---

# 📋 PHIẾU HỌC TẬP BUỔI 04

**Họ Tên:** ___________________    **MSSV:** ___________

## Câu Hỏi

1. Sự khác nhau giữa CHAR và VARCHAR?
2. PRIMARY KEY dùng để làm gì?
3. AUTO_INCREMENT hoạt động như thế nào?

## Bài Tập

- [ ] Database Sinh Viên
- [ ] Database Sản Phẩm
- [ ] Thiết Kế Thư Viện (Bonus)

---

# 🔗 CHUẨN BỊ BUỔI 05

**Buổi tiếp theo:** Introduction to SQL

### Sẽ học:
- SELECT, INSERT, UPDATE, DELETE
- WHERE, ORDER BY, LIMIT
- Các hàm SQL cơ bản

---

**Chương tiếp theo: [Buổi 05 - Introduction to SQL →](./buoi_05_intro_sql.md)**
