# 📝 SESSION 08
# **REVIEW & MIDTERM - MIDTERM REVIEW**

This session we will review all knowledge from Sessions 1-7 and prepare for the midterm exam.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours
🎯 Objectives:
   - Review basic PHP
   - Review MySQL & SQL
   - Complete comprehensive exercises
   - Prepare for midterm exam
```

---

# 📚 KNOWLEDGE SUMMARY

## PART 1: BASIC PHP (Sessions 1-3)

### 1.1 PHP Syntax

```php
<?php
// Variables
$name = "John";
$age = 20;
$gpa = 3.5;
$isStudent = true;

// Arrays
$fruits = ["Apple", "Banana", "Orange"];
$student = ["name" => "John", "age" => 20];

// Conditionals
if ($age >= 18) {
    echo "Adult";
} else {
    echo "Minor";
}

// Loops
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

foreach ($fruits as $fruit) {
    echo $fruit;
}

// Functions
function greet($name) {
    return "Hello, $name!";
}
?>
```

### 1.2 Form Handling

```php
<?php
// Process POST form
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

## PART 2: MySQL & SQL (Sessions 4-7)

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

# 📋 REVIEW OUTLINE

## Theory Section (40%)

1. **PHP Basics**
   - Variables, data types
   - Operators
   - Control structures
   - Functions

2. **Form Handling**
   - GET vs POST
   - Validation
   - Sanitization

3. **MySQL**
   - Data types
   - Constraints
   - Relationships

4. **SQL**
   - SELECT, INSERT, UPDATE, DELETE
   - WHERE, ORDER BY, LIMIT
   - JOIN, GROUP BY

## Practice Section (60%)

1. Write PHP code to process forms
2. Write SQL queries
3. Design database

---

# 📝 REVIEW EXERCISES

## Exercise 1: PHP Form

Create registration form with:
- Full name (required, 2-50 characters)
- Email (required, valid email)
- Age (required, 18-100)
- Validate and display errors

## Exercise 2: SQL Queries

Given database with tables: `users`, `orders`, `order_items`, `products`

1. Get list of users who have placed orders
2. Calculate total revenue by month
3. Top 5 best-selling products

## Exercise 3: Database Design

Design database for online course management system:
- Users (students, instructors)
- Courses
- Enrollments
- Lessons
- Reviews

---

# 🎯 EXAM FORMAT

| Section | Content | Points |
|---------|---------|--------|
| Multiple Choice | 20 questions | 40% |
| Essay | 2-3 questions | 30% |
| Practical | PHP Code + SQL | 30% |

**Time:** 90 minutes

**Allowed:** No materials

---

# 💡 EXAM TIPS

1. Read questions carefully before answering
2. Do easy questions first
3. Check SQL syntax
4. Pay attention to semicolon `;` in PHP
5. Validate input when processing forms

---

**Next Chapter: [Session 09 - Error Handling →](./part_3_integration_advanced/session_09_error_handling.md)**
