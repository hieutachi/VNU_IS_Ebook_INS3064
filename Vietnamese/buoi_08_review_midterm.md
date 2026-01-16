# 📝 BUỔI 08
# **REVIEW & MIDTERM - ÔN TẬP GIỮA KỲ**

Buổi này chúng ta sẽ ôn tập toàn bộ kiến thức từ Buổi 1-7 và chuẩn bị cho kỳ thi giữa kỳ.

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Ôn tập PHP cơ bản
   - Ôn tập MySQL & SQL
   - Làm bài tập tổng hợp
   - Chuẩn bị thi giữa kỳ
```

---

# 📚 TÓM TẮT KIẾN THỨC

## PHẦN 1: PHP CƠ BẢN (Buổi 1-3)

### 1.1 Cú Pháp PHP

```php
<?php
// Biến
$name = "John";
$age = 20;
$gpa = 3.5;
$isStudent = true;

// Mảng
$fruits = ["Apple", "Banana", "Orange"];
$student = ["name" => "John", "age" => 20];

// Điều kiện
if ($age >= 18) {
    echo "Người lớn";
} else {
    echo "Trẻ em";
}

// Vòng lặp
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

foreach ($fruits as $fruit) {
    echo $fruit;
}

// Hàm
function greet($name) {
    return "Hello, $name!";
}
?>
```

### 1.2 Form Handling

```php
<?php
// Xử lý form POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
}
?>

<form method="POST">
    <input type="text" name="name">
    <input type="email" name="email">
    <button type="submit">Submit</button>
</form>
```

---

## PHẦN 2: MySQL & SQL (Buổi 4-7)

### 2.1 CRUD Operations

```sql
-- CREATE
INSERT INTO students (name, email, age) 
VALUES ('John', 'john@email.com', 20);

-- READ
SELECT * FROM students WHERE age > 18 ORDER BY name;

-- UPDATE
UPDATE students SET age = 21 WHERE id = 1;

-- DELETE
DELETE FROM students WHERE id = 1;
```

### 2.2 JOIN

```sql
-- INNER JOIN
SELECT p.name, c.name AS category
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- LEFT JOIN
SELECT p.name, c.name AS category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

### 2.3 GROUP BY

```sql
SELECT category_id, COUNT(*) AS total, AVG(price) AS avg_price
FROM products
GROUP BY category_id
HAVING total > 5;
```

---

# 📋 ĐỀ CƯƠNG ÔN TẬP

## Phần Lý Thuyết (40%)

1. **PHP Basics**
   - Biến, kiểu dữ liệu
   - Toán tử
   - Cấu trúc điều khiển
   - Hàm

2. **Form Handling**
   - GET vs POST
   - Validation
   - Sanitization

3. **MySQL**
   - Kiểu dữ liệu
   - Constraints
   - Relationships

4. **SQL**
   - SELECT, INSERT, UPDATE, DELETE
   - WHERE, ORDER BY, LIMIT
   - JOIN, GROUP BY

## Phần Thực Hành (60%)

1. Viết code PHP xử lý form
2. Viết truy vấn SQL
3. Thiết kế database

---

# 📝 BÀI TẬP ÔN TẬP

## Bài 1: PHP Form

Tạo form đăng ký với:
- Họ tên (bắt buộc, 2-50 ký tự)
- Email (bắt buộc, valid email)
- Tuổi (bắt buộc, 18-100)
- Validate và hiển thị lỗi

## Bài 2: SQL Queries

Cho database với tables: `users`, `orders`, `order_items`, `products`

1. Lấy danh sách users đã đặt hàng
2. Tính tổng doanh thu theo tháng
3. Top 5 sản phẩm bán chạy

## Bài 3: Database Design

Thiết kế database cho hệ thống quản lý khóa học online:
- Users (students, instructors)
- Courses
- Enrollments
- Lessons
- Reviews

---

# 🎯 HÌNH THỨC THI

| Phần | Nội dung | Điểm |
|------|----------|------|
| Trắc nghiệm | 20 câu | 40% |
| Tự luận | 2-3 câu | 30% |
| Thực hành | Code PHP + SQL | 30% |

**Thời gian:** 90 phút

**Được phép:** Không có tài liệu

---

# 💡 MẸO THI

1. Đọc kỹ đề trước khi làm
2. Làm câu dễ trước
3. Kiểm tra cú pháp SQL
4. Chú ý dấu `;` trong PHP
5. Validate input khi xử lý form

---

**Chương tiếp theo: [Buổi 09 - Error Handling →](./phan_3_integration_advanced/buoi_09_error_handling.md)**
