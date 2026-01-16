# 🟩 BUỔI 05
# **INTRODUCTION TO SQL**

Hôm nay chúng ta sẽ học SQL - ngôn ngữ để "nói chuyện" với Database!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
📚 Tài liệu: Chapter 5 - PHP & MySQL Web Development
🎯 Mục tiêu:
   - Hiểu SQL là gì
   - Thực hiện CRUD operations
   - Sử dụng WHERE, ORDER BY, LIMIT
   - Các hàm SQL cơ bản

🔗 Learning Outcomes: LO4
```

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi này, bạn sẽ:

- **Viết** câu lệnh SELECT để truy vấn dữ liệu
- **Thực hiện** INSERT, UPDATE, DELETE
- **Sử dụng** WHERE để lọc dữ liệu
- **Sắp xếp** với ORDER BY
- **Giới hạn** với LIMIT

---

# LÝ THUYẾT

## 1. SQL LÀ GÌ?

**SQL** = Structured Query Language (Ngôn ngữ truy vấn có cấu trúc)

### 🎒 Ví dụ đời sống

SQL giống như **ngôn ngữ để nói chuyện với thủ thư**:
- "Cho tôi xem tất cả sách" → `SELECT * FROM books`
- "Tìm sách của tác giả X" → `SELECT * FROM books WHERE author = 'X'`
- "Thêm sách mới" → `INSERT INTO books...`

### Các loại SQL Commands

| Loại | Mô tả | Commands |
|------|-------|----------|
| **DDL** | Data Definition | CREATE, ALTER, DROP |
| **DML** | Data Manipulation | SELECT, INSERT, UPDATE, DELETE |
| **DCL** | Data Control | GRANT, REVOKE |

---

## 2. SELECT - TRUY VẤN DỮ LIỆU

### 2.1 Cú Pháp Cơ Bản

```sql
-- Lấy tất cả columns
SELECT * FROM students;

-- Lấy columns cụ thể
SELECT name, email FROM students;

-- Đặt alias cho column
SELECT name AS 'Họ Tên', email AS 'Email' FROM students;
```

### 2.2 WHERE - Lọc Dữ Liệu

```sql
-- So sánh bằng
SELECT * FROM students WHERE age = 20;

-- So sánh khác
SELECT * FROM students WHERE age != 20;
SELECT * FROM students WHERE age <> 20;

-- So sánh lớn/nhỏ
SELECT * FROM students WHERE age > 18;
SELECT * FROM students WHERE age >= 18;
SELECT * FROM students WHERE age < 25;
SELECT * FROM students WHERE age <= 25;

-- BETWEEN - Trong khoảng
SELECT * FROM students WHERE age BETWEEN 18 AND 25;

-- IN - Trong danh sách
SELECT * FROM students WHERE class IN ('CNTT1', 'CNTT2', 'CNTT3');

-- LIKE - Tìm kiếm pattern
SELECT * FROM students WHERE name LIKE 'Nguyễn%';    -- Bắt đầu bằng
SELECT * FROM students WHERE name LIKE '%Anh';       -- Kết thúc bằng
SELECT * FROM students WHERE name LIKE '%Văn%';      -- Chứa
SELECT * FROM students WHERE email LIKE '%@gmail.com';

-- IS NULL / IS NOT NULL
SELECT * FROM students WHERE phone IS NULL;
SELECT * FROM students WHERE phone IS NOT NULL;
```

### 2.3 AND, OR, NOT

```sql
-- AND - Cả hai điều kiện
SELECT * FROM students WHERE age >= 18 AND gpa >= 3.0;

-- OR - Một trong hai
SELECT * FROM students WHERE class = 'CNTT1' OR class = 'CNTT2';

-- NOT - Phủ định
SELECT * FROM students WHERE NOT class = 'CNTT1';

-- Kết hợp
SELECT * FROM students 
WHERE (class = 'CNTT1' OR class = 'CNTT2') 
AND gpa >= 3.0;
```

### 2.4 ORDER BY - Sắp Xếp

```sql
-- Sắp xếp tăng dần (mặc định)
SELECT * FROM students ORDER BY name;
SELECT * FROM students ORDER BY name ASC;

-- Sắp xếp giảm dần
SELECT * FROM students ORDER BY gpa DESC;

-- Sắp xếp nhiều cột
SELECT * FROM students ORDER BY class ASC, gpa DESC;
```

### 2.5 LIMIT - Giới Hạn

```sql
-- Lấy 10 records đầu tiên
SELECT * FROM students LIMIT 10;

-- Phân trang: LIMIT offset, count
SELECT * FROM students LIMIT 0, 10;   -- Trang 1 (records 1-10)
SELECT * FROM students LIMIT 10, 10;  -- Trang 2 (records 11-20)
SELECT * FROM students LIMIT 20, 10;  -- Trang 3 (records 21-30)

-- Công thức: LIMIT (page-1)*pageSize, pageSize
```

### 2.6 DISTINCT - Loại Bỏ Trùng Lặp

```sql
-- Lấy danh sách class không trùng
SELECT DISTINCT class FROM students;

-- Đếm số class
SELECT COUNT(DISTINCT class) FROM students;
```

---

## 3. INSERT - THÊM DỮ LIỆU

### 3.1 Insert Một Record

```sql
-- Insert đầy đủ columns
INSERT INTO students (name, email, age, class, gpa)
VALUES ('Nguyễn Văn A', 'a@email.com', 20, 'CNTT1', 3.5);

-- Insert với giá trị NULL
INSERT INTO students (name, email, age, class, gpa)
VALUES ('Trần Thị B', 'b@email.com', NULL, 'CNTT1', NULL);
```

### 3.2 Insert Nhiều Records

```sql
INSERT INTO students (name, email, age, class, gpa)
VALUES 
    ('Nguyễn Văn A', 'a@email.com', 20, 'CNTT1', 3.5),
    ('Trần Thị B', 'b@email.com', 21, 'CNTT2', 3.8),
    ('Lê Văn C', 'c@email.com', 19, 'CNTT1', 3.2);
```

---

## 4. UPDATE - CẬP NHẬT DỮ LIỆU

### 4.1 Cú Pháp

```sql
-- Update một column
UPDATE students SET gpa = 3.6 WHERE id = 1;

-- Update nhiều columns
UPDATE students 
SET gpa = 3.6, class = 'CNTT2' 
WHERE id = 1;

-- Update với điều kiện phức tạp
UPDATE students 
SET is_active = FALSE 
WHERE gpa < 2.0 AND age > 25;
```

### ⚠️ CẢNH BÁO

```sql
-- ❌ NGUY HIỂM: Update tất cả records!
UPDATE students SET gpa = 0;

-- ✅ AN TOÀN: Luôn có WHERE
UPDATE students SET gpa = 0 WHERE id = 1;
```

---

## 5. DELETE - XÓA DỮ LIỆU

### 5.1 Cú Pháp

```sql
-- Xóa một record
DELETE FROM students WHERE id = 1;

-- Xóa nhiều records
DELETE FROM students WHERE class = 'CNTT1' AND gpa < 2.0;
```

### ⚠️ CẢNH BÁO

```sql
-- ❌ NGUY HIỂM: Xóa tất cả records!
DELETE FROM students;

-- ✅ AN TOÀN: Luôn có WHERE
DELETE FROM students WHERE id = 1;

-- Xóa tất cả và reset AUTO_INCREMENT
TRUNCATE TABLE students;
```

---

## 6. HÀM SQL CƠ BẢN

### 6.1 Aggregate Functions

```sql
-- COUNT - Đếm
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM students WHERE class = 'CNTT1';

-- SUM - Tổng
SELECT SUM(gpa) FROM students;

-- AVG - Trung bình
SELECT AVG(gpa) FROM students;
SELECT AVG(gpa) FROM students WHERE class = 'CNTT1';

-- MAX / MIN
SELECT MAX(gpa) FROM students;
SELECT MIN(gpa) FROM students;

-- Kết hợp
SELECT 
    COUNT(*) AS total_students,
    AVG(gpa) AS average_gpa,
    MAX(gpa) AS highest_gpa,
    MIN(gpa) AS lowest_gpa
FROM students;
```

### 6.2 String Functions

```sql
-- CONCAT - Nối chuỗi
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

-- UPPER / LOWER
SELECT UPPER(name) FROM students;
SELECT LOWER(email) FROM students;

-- LENGTH
SELECT name, LENGTH(name) AS name_length FROM students;

-- SUBSTRING
SELECT SUBSTRING(name, 1, 5) FROM students;

-- TRIM
SELECT TRIM(name) FROM students;

-- REPLACE
SELECT REPLACE(email, '@gmail.com', '@yahoo.com') FROM students;
```

### 6.3 Date Functions

```sql
-- NOW() - Thời gian hiện tại
SELECT NOW();

-- CURDATE() - Ngày hiện tại
SELECT CURDATE();

-- DATE_FORMAT
SELECT DATE_FORMAT(created_at, '%d/%m/%Y') FROM students;
SELECT DATE_FORMAT(created_at, '%H:%i:%s') FROM students;

-- DATE_ADD / DATE_SUB
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- DATEDIFF - Số ngày giữa 2 ngày
SELECT DATEDIFF(NOW(), created_at) AS days_ago FROM students;

-- YEAR, MONTH, DAY
SELECT YEAR(created_at), MONTH(created_at), DAY(created_at) FROM students;
```

### 6.4 Conditional Functions

```sql
-- IF
SELECT name, IF(gpa >= 3.0, 'Giỏi', 'Trung bình') AS level FROM students;

-- CASE WHEN
SELECT name, gpa,
    CASE 
        WHEN gpa >= 3.6 THEN 'Xuất sắc'
        WHEN gpa >= 3.2 THEN 'Giỏi'
        WHEN gpa >= 2.5 THEN 'Khá'
        WHEN gpa >= 2.0 THEN 'Trung bình'
        ELSE 'Yếu'
    END AS level
FROM students;

-- COALESCE - Giá trị đầu tiên không NULL
SELECT COALESCE(phone, email, 'N/A') AS contact FROM students;

-- NULLIF
SELECT NULLIF(gpa, 0) FROM students;  -- Trả về NULL nếu gpa = 0
```

---

# VÍ DỤ MINH HỌA

## Ví Dụ: Quản Lý Sinh Viên

```sql
-- Tạo database và table
CREATE DATABASE IF NOT EXISTS university;
USE university;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mssv VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    class VARCHAR(20),
    gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dữ liệu mẫu
INSERT INTO students (mssv, name, email, phone, class, gpa) VALUES
('SV001', 'Nguyễn Văn A', 'a@email.com', '0901234567', 'CNTT1', 3.5),
('SV002', 'Trần Thị B', 'b@email.com', '0901234568', 'CNTT1', 3.8),
('SV003', 'Lê Văn C', 'c@email.com', NULL, 'CNTT2', 3.2),
('SV004', 'Phạm Thị D', 'd@email.com', '0901234570', 'CNTT2', 2.8),
('SV005', 'Hoàng Văn E', 'e@email.com', '0901234571', 'CNTT3', 3.9);

-- 1. Lấy tất cả sinh viên
SELECT * FROM students;

-- 2. Lấy sinh viên lớp CNTT1
SELECT * FROM students WHERE class = 'CNTT1';

-- 3. Lấy sinh viên có GPA >= 3.5
SELECT name, gpa FROM students WHERE gpa >= 3.5;

-- 4. Sắp xếp theo GPA giảm dần
SELECT * FROM students ORDER BY gpa DESC;

-- 5. Top 3 sinh viên GPA cao nhất
SELECT * FROM students ORDER BY gpa DESC LIMIT 3;

-- 6. Thống kê theo lớp
SELECT 
    class,
    COUNT(*) AS total,
    AVG(gpa) AS avg_gpa,
    MAX(gpa) AS max_gpa
FROM students 
GROUP BY class;

-- 7. Sinh viên chưa có số điện thoại
SELECT * FROM students WHERE phone IS NULL;

-- 8. Tìm kiếm theo tên
SELECT * FROM students WHERE name LIKE '%Văn%';

-- 9. Cập nhật GPA
UPDATE students SET gpa = 3.6 WHERE mssv = 'SV001';

-- 10. Xóa sinh viên
DELETE FROM students WHERE mssv = 'SV005';
```

---

# THỰC HÀNH

## BÀI 1: CRUD Cơ Bản

🎯 **Mục tiêu:** Thực hành các lệnh CRUD

📝 **Yêu cầu:**
1. Tạo table `products` (id, name, price, stock, category)
2. Insert 10 sản phẩm
3. Select sản phẩm giá > 100
4. Update giá sản phẩm
5. Delete sản phẩm hết hàng

---

## BÀI 2: Truy Vấn Nâng Cao

🎯 **Mục tiêu:** Sử dụng WHERE, ORDER BY, LIMIT

📝 **Yêu cầu:**
1. Lấy 5 sản phẩm đắt nhất
2. Tìm sản phẩm theo tên
3. Thống kê số sản phẩm theo category
4. Phân trang 10 sản phẩm/trang

---

## BÀI 3: Báo Cáo (Challenge)

🎯 **Mục tiêu:** Tạo báo cáo thống kê

📝 **Yêu cầu:**
- Tổng số sản phẩm
- Tổng giá trị kho (price * stock)
- Sản phẩm sắp hết (stock < 10)
- Xếp hạng sản phẩm theo giá

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Viết được SELECT với WHERE
- [ ] Thực hiện được INSERT, UPDATE, DELETE
- [ ] Sử dụng được ORDER BY, LIMIT
- [ ] Sử dụng được các hàm SQL cơ bản

---

# 📋 PHIẾU HỌC TẬP BUỔI 05

**Họ Tên:** ___________________    **MSSV:** ___________

## Câu Hỏi

1. Sự khác nhau giữa DELETE và TRUNCATE?
2. LIKE '%abc%' tìm kiếm gì?
3. Làm sao để phân trang với LIMIT?

## Bài Tập

- [ ] CRUD Cơ Bản
- [ ] Truy Vấn Nâng Cao
- [ ] Báo Cáo (Bonus)

---

# 🔗 CHUẨN BỊ BUỔI 06

**Buổi tiếp theo:** Database Design

### Sẽ học:
- Normalization
- Relationships (1-1, 1-N, N-N)
- Foreign Keys

---

**Chương tiếp theo: [Buổi 06 - Database Design →](./buoi_06_database_design.md)**
