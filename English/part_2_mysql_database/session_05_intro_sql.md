# 🟩 SESSION 05
# **INTRODUCTION TO SQL**

Today we will learn **SQL** – the language we use to "talk" to the Database.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 5 - PHP & MySQL Web Development
🎯 Objectives:
   - Understand what SQL is
   - Perform CRUD operations
   - Use WHERE, ORDER BY, LIMIT
   - Use basic SQL functions

🔗 Learning Outcomes: LO4
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- **Write** `SELECT` statements to query data
- **Perform** `INSERT`, `UPDATE`, `DELETE`
- **Filter** data using `WHERE`
- **Sort** data using `ORDER BY`
- **Limit** results using `LIMIT`

---

# THEORY

## 1. WHAT IS SQL?

**SQL** = Structured Query Language

SQL is the language used by almost all relational databases (MySQL, PostgreSQL, SQL Server, Oracle, ...).

### 🎒 Real-life analogy

SQL is like the **language you use to talk to a librarian**:

- "Show me all the books" → `SELECT * FROM books`
- "Find books of author X" → `SELECT * FROM books WHERE author = 'X'`
- "Add a new book" → `INSERT INTO books ...`

### Types of SQL Commands

| Type | Description | Commands |
|------|-------------|----------|
| **DDL** | Data Definition | `CREATE`, `ALTER`, `DROP` |
| **DML** | Data Manipulation | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Data Control | `GRANT`, `REVOKE` |

---

## 2. SELECT – QUERYING DATA

### 2.1 Basic Syntax

```sql
-- Get all columns
SELECT * FROM students;

-- Get specific columns
SELECT name, email FROM students;

-- Use aliases for columns
SELECT name AS 'Full Name', email AS 'Email' FROM students;
```

### 2.2 WHERE – Filtering Data

```sql
-- Equal comparison
SELECT * FROM students WHERE age = 20;

-- Not equal
SELECT * FROM students WHERE age != 20;
SELECT * FROM students WHERE age <> 20;

-- Greater / Less than
SELECT * FROM students WHERE age > 18;
SELECT * FROM students WHERE age >= 18;
SELECT * FROM students WHERE age < 25;
SELECT * FROM students WHERE age <= 25;

-- BETWEEN - In a range
SELECT * FROM students WHERE age BETWEEN 18 AND 25;

-- IN - In a list
SELECT * FROM students WHERE class IN ('ICT1', 'ICT2', 'ICT3');

-- LIKE - Pattern matching
SELECT * FROM students WHERE name LIKE 'Nguyen%';   -- Starts with
SELECT * FROM students WHERE name LIKE '%Anh';      -- Ends with
SELECT * FROM students WHERE name LIKE '%Van%';     -- Contains
SELECT * FROM students WHERE email LIKE '%@gmail.com';

-- IS NULL / IS NOT NULL
SELECT * FROM students WHERE phone IS NULL;
SELECT * FROM students WHERE phone IS NOT NULL;
```

### 2.3 AND, OR, NOT

```sql
-- AND - Both conditions must be true
SELECT * FROM students WHERE age >= 18 AND gpa >= 3.0;

-- OR - At least one condition is true
SELECT * FROM students WHERE class = 'ICT1' OR class = 'ICT2';

-- NOT - Negation
SELECT * FROM students WHERE NOT class = 'ICT1';

-- Combine conditions
SELECT * FROM students 
WHERE (class = 'ICT1' OR class = 'ICT2') 
AND gpa >= 3.0;
```

### 2.4 ORDER BY – Sorting

```sql
-- Sort ascending (default)
SELECT * FROM students ORDER BY name;
SELECT * FROM students ORDER BY name ASC;

-- Sort descending
SELECT * FROM students ORDER BY gpa DESC;

-- Sort by multiple columns
SELECT * FROM students ORDER BY class ASC, gpa DESC;
```

### 2.5 LIMIT – Limiting Results

```sql
-- Get first 10 records
SELECT * FROM students LIMIT 10;

-- Pagination: LIMIT offset, count
SELECT * FROM students LIMIT 0, 10;   -- Page 1 (records 1-10)
SELECT * FROM students LIMIT 10, 10;  -- Page 2 (records 11-20)
SELECT * FROM students LIMIT 20, 10;  -- Page 3 (records 21-30)

-- Formula: LIMIT (page-1)*pageSize, pageSize
```

### 2.6 DISTINCT – Remove Duplicates

```sql
-- Get list of unique classes
SELECT DISTINCT class FROM students;

-- Count number of classes
SELECT COUNT(DISTINCT class) FROM students;
```

---

## 3. INSERT – ADDING DATA

### 3.1 Insert a Single Record

```sql
-- Insert with all columns
INSERT INTO students (name, email, age, class, gpa)
VALUES ('John Nguyen', 'john@example.com', 20, 'ICT1', 3.5);

-- Insert with NULL values
INSERT INTO students (name, email, age, class, gpa)
VALUES ('Anna Tran', 'anna@example.com', NULL, 'ICT1', NULL);
```

### 3.2 Insert Multiple Records

```sql
INSERT INTO students (name, email, age, class, gpa)
VALUES 
    ('John Nguyen', 'john@example.com', 20, 'ICT1', 3.5),
    ('Anna Tran', 'anna@example.com', 21, 'ICT2', 3.8),
    ('Michael Le', 'michael@example.com', 19, 'ICT1', 3.2);
```

---

## 4. UPDATE – MODIFYING DATA

### 4.1 Syntax

```sql
-- Update one column
UPDATE students SET gpa = 3.6 WHERE id = 1;

-- Update multiple columns
UPDATE students 
SET gpa = 3.6, class = 'ICT2' 
WHERE id = 1;

-- Update with complex condition
UPDATE students 
SET is_active = FALSE 
WHERE gpa < 2.0 AND age > 25;
```

### ⚠️ WARNING

```sql
-- ❌ DANGEROUS: Update ALL records!
UPDATE students SET gpa = 0;

-- ✅ SAFE: Always use WHERE
UPDATE students SET gpa = 0 WHERE id = 1;
```

---

## 5. DELETE – DELETING DATA

### 5.1 Syntax

```sql
-- Delete one record
DELETE FROM students WHERE id = 1;

-- Delete multiple records
DELETE FROM students WHERE class = 'ICT1' AND gpa < 2.0;
```

### ⚠️ WARNING

```sql
-- ❌ DANGEROUS: Delete ALL records!
DELETE FROM students;

-- ✅ SAFE: Always use WHERE
DELETE FROM students WHERE id = 1;

-- Delete all and reset AUTO_INCREMENT
TRUNCATE TABLE students;
```

---

## 6. BASIC SQL FUNCTIONS

### 6.1 Aggregate Functions

```sql
-- COUNT - Count records
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM students WHERE class = 'ICT1';

-- SUM - Sum
SELECT SUM(gpa) FROM students;

-- AVG - Average
SELECT AVG(gpa) FROM students;
SELECT AVG(gpa) FROM students WHERE class = 'ICT1';

-- MAX / MIN
SELECT MAX(gpa) FROM students;
SELECT MIN(gpa) FROM students;

-- Combine statistics
SELECT 
    COUNT(*) AS total_students,
    AVG(gpa) AS average_gpa,
    MAX(gpa) AS highest_gpa,
    MIN(gpa) AS lowest_gpa
FROM students;
```

### 6.2 String Functions

```sql
-- CONCAT - Concatenate strings
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
-- NOW() - Current date & time
SELECT NOW();

-- CURDATE() - Current date
SELECT CURDATE();

-- DATE_FORMAT
SELECT DATE_FORMAT(created_at, '%d/%m/%Y') FROM students;
SELECT DATE_FORMAT(created_at, '%H:%i:%s') FROM students;

-- DATE_ADD / DATE_SUB
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- DATEDIFF - Number of days between 2 dates
SELECT DATEDIFF(NOW(), created_at) AS days_ago FROM students;

-- YEAR, MONTH, DAY
SELECT YEAR(created_at), MONTH(created_at), DAY(created_at) FROM students;
```

### 6.4 Conditional Functions

```sql
-- IF
SELECT name, IF(gpa >= 3.0, 'Good', 'Average') AS level FROM students;

-- CASE WHEN
SELECT name, gpa,
    CASE 
        WHEN gpa >= 3.6 THEN 'Excellent'
        WHEN gpa >= 3.2 THEN 'Very Good'
        WHEN gpa >= 2.5 THEN 'Fair'
        WHEN gpa >= 2.0 THEN 'Average'
        ELSE 'Weak'
    END AS level
FROM students;

-- COALESCE - First non-NULL value
SELECT COALESCE(phone, email, 'N/A') AS contact FROM students;

-- NULLIF
SELECT NULLIF(gpa, 0) FROM students;  -- Returns NULL if gpa = 0
```

---

# EXAMPLE

## Example: Student Management

```sql
-- Create database and table
CREATE DATABASE IF NOT EXISTS university;
USE university;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    class VARCHAR(20),
    gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO students (student_code, name, email, phone, class, gpa) VALUES
('ST001', 'John Nguyen', 'john@example.com', '0901234567', 'ICT1', 3.5),
('ST002', 'Anna Tran', 'anna@example.com', '0901234568', 'ICT1', 3.8),
('ST003', 'Michael Le', 'michael@example.com', NULL, 'ICT2', 3.2),
('ST004', 'Linh Pham', 'linh@example.com', '0901234570', 'ICT2', 2.8),
('ST005', 'David Hoang', 'david@example.com', '0901234571', 'ICT3', 3.9);

-- 1. Get all students
SELECT * FROM students;

-- 2. Get students in class ICT1
SELECT * FROM students WHERE class = 'ICT1';

-- 3. Get students with GPA >= 3.5
SELECT name, gpa FROM students WHERE gpa >= 3.5;

-- 4. Sort by GPA descending
SELECT * FROM students ORDER BY gpa DESC;

-- 5. Top 3 students with highest GPA
SELECT * FROM students ORDER BY gpa DESC LIMIT 3;

-- 6. Statistics by class
SELECT 
    class,
    COUNT(*) AS total,
    AVG(gpa) AS avg_gpa,
    MAX(gpa) AS max_gpa
FROM students 
GROUP BY class;

-- 7. Students without phone number
SELECT * FROM students WHERE phone IS NULL;

-- 8. Search by name
SELECT * FROM students WHERE name LIKE '%Van%';

-- 9. Update GPA
UPDATE students SET gpa = 3.6 WHERE student_code = 'ST001';

-- 10. Delete student
DELETE FROM students WHERE student_code = 'ST005';
```

---

# PRACTICE

## EXERCISE 1: Basic CRUD

🎯 **Goal:** Practice basic CRUD operations

📝 **Requirements:**
1. Create table `products` (id, name, price, stock, category)
2. Insert 10 products
3. Select products with price > 100
4. Update product price
5. Delete out-of-stock products

---

## EXERCISE 2: Advanced Queries

🎯 **Goal:** Practice `WHERE`, `ORDER BY`, `LIMIT`

📝 **Requirements:**
1. Get the 5 most expensive products
2. Search products by name
3. Count products by category
4. Implement pagination with 10 products per page

---

## EXERCISE 3: Reporting (Challenge)

🎯 **Goal:** Create a simple report

📝 **Requirements:**
- Total number of products
- Total inventory value (`price * stock`)
- Products that are almost out of stock (`stock < 10`)
- Rank products by price

---

# ✅ KEY TAKEAWAYS

- [ ] Can write `SELECT` with `WHERE`
- [ ] Can perform `INSERT`, `UPDATE`, `DELETE`
- [ ] Can use `ORDER BY`, `LIMIT`
- [ ] Can use basic SQL functions

---

# 📋 SESSION 05 WORKSHEET

**Full Name:** ___________________    **Student ID:** ___________

## Questions

1. What is the difference between `DELETE` and `TRUNCATE`?
2. What does `LIKE '%abc%'` search for?
3. How do you implement pagination with `LIMIT`?

## Exercises

- [ ] Basic CRUD
- [ ] Advanced Queries
- [ ] Reporting (Bonus)

---

# 🔗 PREPARATION FOR SESSION 06

**Next Session:** Database Design

### We will learn:
- Normalization
- Relationships (1-1, 1-N, N-N)
- Foreign Keys

---

**Previous: [Session 04 - Introduction to MySQL ←](./session_04_intro_mysql.md)**  
**Next: [Session 06 - Database Design →](./session_06_database_design.md)**
