# 🟩 SESSION 06
# **DATABASE DESIGN**

Today we will learn how to design a **professional database** with Normalization and Relationships.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 6 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand database normalization
   - Design table relationships
   - Create primary and foreign keys
   - Apply database design best practices

🔗 Links to Learning Outcomes: LO3
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Understand **normalization** concepts (1NF, 2NF, 3NF)
- Design **table relationships**: one-to-one, one-to-many, many-to-many
- Create **primary keys** and **foreign keys**
- Apply **database design best practices**
- Design complete and efficient database schemas

---

# THEORY

## 1. NORMALIZATION

### 1.1 Why Do We Need Normalization?

**Problems without normalization:**

```
Table: orders (NOT NORMALIZED)
┌────┬──────────┬───────────────┬──────────────┬───────────┐
│ id │ customer │ customer_addr │ product      │ price     │
├────┼──────────┼───────────────┼──────────────┼───────────┤
│ 1  │ Nguyen A │ 123 ABC St    │ Laptop       │ 1000      │
│ 2  │ Nguyen A │ 123 ABC St    │ Mouse        │ 25        │
│ 3  │ Tran B   │ 456 XYZ St    │ Laptop       │ 1000      │
└────┴──────────┴───────────────┴──────────────┴───────────┘
```

**Issues:**
- ❌ Duplicated data (same customer, same address)
- ❌ Hard to update (change address → must update many rows)
- ❌ Wastes storage

### 1.2 Normal Forms

#### 1NF (First Normal Form)
- Each cell contains only **one value**
- No repeated columns (no column arrays like `phone1`, `phone2`, `phone3`)

```sql
-- ❌ Violates 1NF
CREATE TABLE students (
    id INT,
    name VARCHAR(100),
    phones VARCHAR(200)  -- "0901234567, 0909876543"
);

-- ✅ Correct 1NF
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
- Satisfies 1NF
- No **partial dependency** on a composite primary key

(If primary key is `(student_id, course_id)` → non-key columns must depend on **both**, not only one.)

#### 3NF (Third Normal Form)
- Satisfies 2NF
- No **transitive dependency** (non-key columns should not depend on other non-key columns)

---

## 2. RELATIONSHIPS

### 2.1 One-to-One (1:1)

Each record in Table A is linked to **one** record in Table B.

```sql
-- Example: User and Profile
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

One record in Table A is linked to **many** records in Table B.

```sql
-- Example: Category and Products
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    category_id INT,  -- Not UNIQUE = 1:N
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 2.3 Many-to-Many (N:N)

Many records in Table A are linked to many records in Table B.

We use a **junction table** (bridge table).

```sql
-- Example: Students and Courses
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Junction table (enrollments)
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade DECIMAL(3,2),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY (student_id, course_id)  -- Prevent duplicate enrollment
);
```

---

## 3. FOREIGN KEYS

### 3.1 Syntax

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

| Option | Description |
|--------|-------------|
| `CASCADE` | Delete/Update child rows together |
| `SET NULL` | Set to NULL when parent is deleted |
| `RESTRICT` | Prevent delete/update if children exist |
| `NO ACTION` | Same as RESTRICT in MySQL |

```sql
-- When deleting a category, set product.category_id = NULL
FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
```

---

## 4. DESIGN EXAMPLE: E-COMMERCE DATABASE

```sql
-- Database for online shop
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

-- 5. Order Items (N:N between Orders and Products)
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

# PRACTICE

## EXERCISE 1: Blog Database Design

🎯 **Goal:** Design database for a blog application

📝 **Requirements:**
- Users (authors)
- Categories
- Posts
- Comments
- Tags (N:N with Posts)

---

## EXERCISE 2: Library Database Design

🎯 **Goal:** Design database for a library

📝 **Requirements:**
- Books
- Members
- Borrowings (borrowing records)
- Authors (N:N with Books)

---

# ✅ KEY TAKEAWAYS

- [ ] Understand normalization concepts
- [ ] Can design different types of relationships
- [ ] Can use foreign keys correctly
- [ ] Can design a complete database schema

---

**Previous: [Session 05 - Introduction to SQL ←](./session_05_intro_sql.md)**  
**Next: [Session 07 - Advanced SQL →](./session_07_advanced_sql.md)**
