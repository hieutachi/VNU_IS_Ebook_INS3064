# 🟩 SESSION 04
# **INTRODUCTION TO MySQL**

Welcome to the Database section! Today we will learn about MySQL - the most popular database management system for web.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 4 - PHP & MySQL Web Development
🎯 Objectives:
   - Understand what Database is
   - Install and configure MySQL
   - Use phpMyAdmin
   - Create first Database and Table

📖 Preparation: XAMPP installed
🔗 Learning Outcomes: LO3
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will:

- **Understand** what Database and MySQL are
- **Use** phpMyAdmin to manage database
- **Create** Database and Table
- **Understand** data types in MySQL

---

# THEORY

## 1. WHAT IS DATABASE?

### 1.1 Definition

**Database (Cơ sở dữ liệu)** = Organized storage place for data, can retrieve, manage and update.

### 🎒 Real-life Analogy

Database is like an **office filing cabinet**:
- **Database** = Filing cabinet
- **Table** = Drawer
- **Row** = One file
- **Column** = Information items on the file

### 1.2 Why Do We Need Database?

| Problem | Without DB | With DB |
|---------|-----------|---------|
| Storage | Text files, hard to manage | Structured, easy to manage |
| Search | Slow, must read all | Fast with index |
| Security | Hard to control | Has users, permissions |
| Concurrency | Data conflicts | Transaction handling |

### 1.3 What is MySQL?

**MySQL** = Most popular Relational Database Management System (RDBMS).

**Features:**
- ✅ Free, open source
- ✅ Fast, stable
- ✅ Easy to use
- ✅ Great integration with PHP
- ✅ Large community

**Who uses MySQL?**
- Facebook, Twitter, YouTube, Wikipedia, WordPress

---

## 2. INSTALLATION AND CONFIGURATION

### 2.1 MySQL in XAMPP

MySQL is already installed in XAMPP:
1. Open XAMPP Control Panel
2. Start **MySQL**
3. Status: Running (green)

### 2.2 Access phpMyAdmin

**phpMyAdmin** = Web tool to manage MySQL

1. Open browser
2. Visit: `http://localhost/phpmyadmin`
3. Login:
   - Username: `root`
   - Password: (leave blank)

### 2.3 phpMyAdmin Interface

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

## 3. CREATE DATABASE

### 3.1 Via phpMyAdmin

1. Click **New** (or Databases)
2. Enter database name: `ins3064_db`
3. Select Collation: `utf8mb4_unicode_ci`
4. Click **Create**

### 3.2 Via SQL

```sql
-- Create database
CREATE DATABASE ins3064_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use database
USE ins3064_db;

-- View list of databases
SHOW DATABASES;

-- Delete database
DROP DATABASE ins3064_db;
```

### 📋 Naming Rules:
- Use lowercase
- No spaces
- Use underscore: `my_database`
- Meaningful: `shop_db`, `blog_db`

---

## 4. CREATE TABLE

### 4.1 Table Structure

```
┌─────────────────────────────────────────────────────────┐
│ Table: students                                          │
├─────┬──────────┬─────────┬──────────┬──────────────────┤
│ id  │ name     │ email   │ age      │ created_at       │
├─────┼──────────┼─────────┼──────────┼──────────────────┤
│ 1   │ John Doe │ j@e.com │ 20       │ 2024-01-01 10:00 │
│ 2   │ Jane S.  │ j@e.com │ 21       │ 2024-01-02 11:00 │
│ 3   │ Bob J.   │ b@e.com │ 19       │ 2024-01-03 12:00 │
└─────┴──────────┴─────────┴──────────┴──────────────────┘
```

### 4.2 Create Table with SQL

```sql
-- Create table students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- View table structure
DESCRIBE students;

-- View list of tables
SHOW TABLES;

-- Delete table
DROP TABLE students;
```

### 4.3 Create Table via phpMyAdmin

1. Select database
2. Click **New** (Create table)
3. Enter table name: `students`
4. Number of columns: 7
5. Fill information for each column
6. Click **Save**

---

## 5. MySQL DATA TYPES

### 5.1 Numeric Types

| Type | Description | Range | Example |
|------|-------------|-------|---------|
| `TINYINT` | Small integer | -128 to 127 | Age |
| `INT` | Integer | ±2 billion | ID |
| `BIGINT` | Large integer | Very large | Views |
| `DECIMAL(M,D)` | Precise decimal | - | Money (10,2) |
| `FLOAT` | Floating point | - | Score |

### 5.2 String Types

| Type | Description | Length | Example |
|------|-------------|--------|---------|
| `CHAR(N)` | Fixed string | 0-255 | Code (10) |
| `VARCHAR(N)` | Variable string | 0-65535 | Name (100) |
| `TEXT` | Long text | 65535 | Content |
| `LONGTEXT` | Very long text | 4GB | Article |

### 5.3 Date/Time Types

| Type | Description | Format | Example |
|------|-------------|--------|---------|
| `DATE` | Date | YYYY-MM-DD | 2024-01-15 |
| `TIME` | Time | HH:MM:SS | 14:30:00 |
| `DATETIME` | Date + Time | YYYY-MM-DD HH:MM:SS | 2024-01-15 14:30:00 |
| `TIMESTAMP` | Timestamp | Auto update | created_at |

### 5.4 Other Types

| Type | Description | Example |
|------|-------------|---------|
| `BOOLEAN` | True/False | is_active |
| `ENUM` | List of values | status ENUM('active','inactive') |
| `JSON` | JSON data | settings |

---

## 6. CONSTRAINTS

### 6.1 Types of Constraints

```sql
CREATE TABLE products (
    -- PRIMARY KEY: Primary key, unique, not null
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- NOT NULL: Must have value
    name VARCHAR(100) NOT NULL,
    
    -- UNIQUE: Unique value
    sku VARCHAR(50) UNIQUE,
    
    -- DEFAULT: Default value
    status VARCHAR(20) DEFAULT 'active',
    
    -- CHECK: Check condition (MySQL 8.0+)
    price DECIMAL(10,2) CHECK (price > 0),
    
    -- FOREIGN KEY: Foreign key
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 6.2 AUTO_INCREMENT

```sql
-- Auto increment ID
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert without ID
INSERT INTO users (name) VALUES ('John');
-- id = 1 (automatic)

INSERT INTO users (name) VALUES ('Jane');
-- id = 2 (automatic)
```

---

# EXAMPLES & ILLUSTRATIONS

## Example: Create Database for Blog Application

```sql
-- Create database
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

# PRACTICE

## EXERCISE 1: Create Student Database

🎯 **Objective:** Create database to manage students

📝 **Requirements:**
- Create database: `student_management`
- Create table `students`: id, student_id, name, email, phone, class, gpa, created_at
- Create table `classes`: id, name, department

---

## EXERCISE 2: Create Product Database

🎯 **Objective:** Create database for online shop

📝 **Requirements:**
- Create database: `shop_db`
- Create table `categories`: id, name, description
- Create table `products`: id, name, price, stock, category_id, created_at

---

## EXERCISE 3: Design Database (Challenge)

🎯 **Objective:** Design database for library management application

📝 **Requirements:**
- Manage: Books, Readers, Borrowing records
- Determine tables and relationships

---

# ✅ KNOWLEDGE TO ACHIEVE

- [ ] Understand what Database and MySQL are
- [ ] Can use phpMyAdmin
- [ ] Can create Database and Table
- [ ] Understand data types
- [ ] Understand constraints

---

# 📋 SESSION 04 WORKSHEET

**Name:** ___________________    **Student ID:** ___________

## Questions

1. What's the difference between CHAR and VARCHAR?
2. What is PRIMARY KEY used for?
3. How does AUTO_INCREMENT work?

## Exercises

- [ ] Student Database
- [ ] Product Database
- [ ] Library Design (Bonus)

---

# 🔗 PREPARATION FOR SESSION 05

**Next Session:** Introduction to SQL

### Will Learn:
- SELECT, INSERT, UPDATE, DELETE
- WHERE, ORDER BY, LIMIT
- Basic SQL functions

---

**Next Chapter: [Session 05 - Introduction to SQL →](./session_05_intro_sql.md)**
