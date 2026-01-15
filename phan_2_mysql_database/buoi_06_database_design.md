# 🟩 BUỔI 06
# **DATABASE DESIGN - THIẾT KẾ CƠ SỞ DỮ LIỆU**

Hôm nay chúng ta sẽ học cách thiết kế database chuyên nghiệp với Normalization và Relationships!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
🎯 Mục tiêu:
   - Hiểu Normalization (chuẩn hóa)
   - Thiết kế Relationships
   - Sử dụng Foreign Keys
   - Thiết kế database thực tế

🔗 Learning Outcomes: LO3
```

---

# LÝ THUYẾT

## 1. NORMALIZATION (CHUẨN HÓA)

### 1.1 Tại Sao Cần Chuẩn Hóa?

**Vấn đề khi không chuẩn hóa:**

```
Table: orders (CHƯA CHUẨN HÓA)
┌────┬──────────┬───────────────┬──────────────┬───────────┐
│ id │ customer │ customer_addr │ product      │ price     │
├────┼──────────┼───────────────┼──────────────┼───────────┤
│ 1  │ Nguyen A │ 123 ABC St    │ Laptop       │ 1000      │
│ 2  │ Nguyen A │ 123 ABC St    │ Mouse        │ 25        │
│ 3  │ Tran B   │ 456 XYZ St    │ Laptop       │ 1000      │
└────┴──────────┴───────────────┴──────────────┴───────────┘
```

**Vấn đề:**
- ❌ Dữ liệu trùng lặp (Nguyen A, địa chỉ)
- ❌ Khó cập nhật (đổi địa chỉ phải sửa nhiều nơi)
- ❌ Tốn bộ nhớ

### 1.2 Các Dạng Chuẩn

#### 1NF (First Normal Form)
- Mỗi cell chỉ chứa 1 giá trị
- Không có cột lặp lại

```sql
-- ❌ Vi phạm 1NF
CREATE TABLE students (
    id INT,
    name VARCHAR(100),
    phones VARCHAR(200)  -- "0901234567, 0909876543"
);

-- ✅ Đúng 1NF
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE student_phones (
    id INT PRIMARY KEY,
    student_id INT,
    phone VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES students(id)
);
```

#### 2NF (Second Normal Form)
- Đạt 1NF
- Không có phụ thuộc một phần vào khóa chính

#### 3NF (Third Normal Form)
- Đạt 2NF
- Không có phụ thuộc bắc cầu

---

## 2. RELATIONSHIPS (QUAN HỆ)

### 2.1 One-to-One (1:1)

Mỗi record trong Table A liên kết với 1 record trong Table B.

```sql
-- Ví dụ: User và Profile
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,  -- UNIQUE = 1:1
    full_name VARCHAR(100),
    bio TEXT,
    avatar VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2.2 One-to-Many (1:N)

Mỗi record trong Table A liên kết với nhiều records trong Table B.

```sql
-- Ví dụ: Category và Products
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    category_id INT,  -- Không UNIQUE = 1:N
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 2.3 Many-to-Many (N:N)

Nhiều records trong Table A liên kết với nhiều records trong Table B.

```sql
-- Ví dụ: Students và Courses
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Bảng trung gian (Junction/Pivot table)
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade DECIMAL(3,2),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY (student_id, course_id)  -- Không đăng ký trùng
);
```

---

## 3. FOREIGN KEYS

### 3.1 Cú Pháp

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### 3.2 ON DELETE / ON UPDATE Options

| Option | Mô tả |
|--------|-------|
| `CASCADE` | Xóa/Cập nhật theo |
| `SET NULL` | Đặt thành NULL |
| `RESTRICT` | Không cho xóa/cập nhật |
| `NO ACTION` | Giống RESTRICT |

```sql
-- Khi xóa category, set product.category_id = NULL
FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
```

---

## 4. VÍ DỤ THIẾT KẾ: E-COMMERCE DATABASE

```sql
-- Database cho shop online
CREATE DATABASE shop_db;
USE shop_db;

-- 1. Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- 3. Products
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    stock INT DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 4. Orders
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Order Items (N:N giữa Orders và Products)
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 6. Product Images (1:N)
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

---

# THỰC HÀNH

## BÀI 1: Thiết Kế Database Blog

🎯 **Mục tiêu:** Thiết kế database cho blog

📝 **Yêu cầu:**
- Users (tác giả)
- Categories
- Posts
- Comments
- Tags (N:N với Posts)

---

## BÀI 2: Thiết Kế Database Thư Viện

🎯 **Mục tiêu:** Quản lý thư viện

📝 **Yêu cầu:**
- Books
- Members
- Borrowings (mượn sách)
- Authors (N:N với Books)

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu Normalization
- [ ] Thiết kế được các loại relationships
- [ ] Sử dụng được Foreign Keys
- [ ] Thiết kế database hoàn chỉnh

---

**Chương tiếp theo: [Buổi 07 - Advanced SQL →](./buoi_07_advanced_sql.md)**
