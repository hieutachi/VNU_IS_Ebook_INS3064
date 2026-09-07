# Homework 8: Review and Midterm Preparation

> **Due:** No submission required | **Midterm Exam: Session 9 (in-class)**

## Overview

There is **no graded homework** this week. Session 8 is dedicated to **midterm review and exam preparation**. This document serves as your **study guide** to help you review all material from Sessions 1–7. Use it as a checklist to ensure you are fully prepared.

## Study Guide Checklist

### Session 1 — Introduction to Web Development & PHP Basics
- [ ] Understand the client-server model and HTTP request/response cycle
- [ ] Explain the difference between HTML, CSS, JavaScript, and PHP (front-end vs. back-end)
- [ ] Set up a local development environment (XAMPP/WAMP, browser, text editor)
- [ ] Write a basic PHP script embedded in HTML (`<?php ... ?>`)
- [ ] Use `echo` and `print` for output
- [ ] Understand PHP file extensions (`.php`) and how the server processes them

### Session 2 — PHP Variables, Data Types, and Operators
- [ ] Declare and use variables (`$variable`) — PHP is loosely typed
- [ ] Know all PHP data types: `string`, `int`, `float`, `bool`, `array`, `object`, `NULL`
- [ ] Use type casting and type juggling
- [ ] Use arithmetic, assignment, comparison, logical, and string concatenation (`.`) operators
- [ ] Understand operator precedence
- [ ] Use `var_dump()` and `print_r()` for debugging

### Session 3 — Control Structures
- [ ] Write `if`, `elseif`, `else` statements
- [ ] Write `switch` statements with `break` and `default`
- [ ] Write `for`, `while`, `do-while`, and `foreach` loops
- [ ] Use `break` and `continue` to control loop execution
- [ ] Use nested control structures
- [ ] Understand truthy and falsy values in PHP

### Session 4 — Functions and Arrays
- [ ] Define and call user-defined functions with parameters and return values
- [ ] Understand variable scope (`local`, `global`, `static`)
- [ ] Use `global` keyword and `$GLOBALS` superglobal
- [ ] Create indexed arrays, associative arrays, and multidimensional arrays
- [ ] Use array functions: `count()`, `sort()`, `array_push()`, `array_merge()`, `in_array()`, `array_key_exists()`, `array_search()`, `explode()`, `implode()`
- [ ] Iterate over arrays with `foreach` (both indexed and associative)
- [ ] Know built-in PHP functions for strings, math, and dates

### Session 5 — Form Handling and Superglobals
- [ ] Create HTML forms with various input types (text, select, checkbox, radio, textarea)
- [ ] Use `$_GET` and `$_POST` to retrieve form data
- [ ] Understand the difference between GET and POST methods
- [ ] Use `$_SERVER` to access server/environment information
- [ ] Use `$_SESSION` to maintain state across pages (`session_start()`, `$_SESSION[...]`)
- [ ] Use `$_COOKIE` for client-side storage (`setcookie()`)
- [ ] Validate and sanitize user input (e.g., `htmlspecialchars()`, `trim()`, `empty()`)
- [ ] Understand basic form security concerns (XSS, input validation)

### Session 6 — Database Design
- [ ] Explain relational database concepts (tables, rows, columns, keys)
- [ ] Identify and implement relationships: 1:1, 1:N, M:N
- [ ] Draw Entity-Relationship Diagrams (ERDs)
- [ ] Apply normalization (1NF, 2NF, 3NF) — identify violations and fix them
- [ ] Write `CREATE TABLE` with `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`
- [ ] Understand `ON DELETE` and `ON UPDATE` actions (`CASCADE`, `SET NULL`, `RESTRICT`)
- [ ] Choose appropriate data types (`INT`, `VARCHAR`, `TEXT`, `DECIMAL`, `DATE`, `ENUM`)

### Session 7 — Advanced SQL
- [ ] Write `SELECT` queries with `WHERE`, `ORDER BY`, `LIMIT`
- [ ] Use all JOIN types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `CROSS JOIN`
- [ ] Write multi-table JOINs (3+ tables)
- [ ] Use aggregate functions: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`
- [ ] Group results with `GROUP BY` and filter groups with `HAVING`
- [ ] Write subqueries in `WHERE`, `FROM`, and `SELECT` clauses
- [ ] Create and use `VIEW`s
- [ ] Use date functions: `NOW()`, `CURDATE()`, `DATE_FORMAT()`, `YEAR()`, `MONTH()`
- [ ] Use string functions: `CONCAT()`, `SUBSTRING()`, `UPPER()`, `LOWER()`, `TRIM()`

## Recommended Practice Exercises

1. **PHP Coding Challenges** — Go to [phpexercises.com](https://phpexercises.com/) or similar sites and solve at least 10 exercises covering variables, arrays, functions, and control structures.

2. **SQL Practice** — Write queries for these scenarios using the Homework 6 bookstore database:
   - Find the top 3 best-selling books by revenue.
   - List all customers who have never placed an order.
   - Find authors who have written books in more than 2 categories.
   - Calculate the average order total per customer.
   - List all books that have never been reviewed.

3. **Database Design Practice** — Design an ERD for a **University Course Registration System** with tables for students, courses, professors, departments, enrollments, and grades. Normalize to 3NF.

4. **Mini Project** — Build a simple PHP page that:
   - Displays an HTML form to collect a user's name, age, and favorite programming language.
   - Validates that all fields are filled and age is a positive number.
   - Stores the data in `$_SESSION` and displays a personalized greeting.
   - Uses a `switch` statement to show a fun fact based on the chosen language.

5. **Flashcard Review** — Create flashcards for key terms: 3NF, foreign key, aggregate function, superglobal, `$_POST` vs `$_GET`, `INNER JOIN` vs `LEFT JOIN`, `GROUP BY` vs `WHERE`.

## Exam Format Reminder

| Detail | Information |
|--------|-------------|
| **When** | Session 9, first 60 minutes of class |
| **Format** | Written exam — short answer, code writing, and problem-solving |
| **Coverage** | Sessions 1–7 (all lecture slides, homework, and in-class exercises) |
| **Allowed** | No notes, no internet access — this is a closed-book exam |
| **Topics** | PHP fundamentals (≈40%), Database design & SQL (≈40%), Web concepts (≈20%) |
| **Question Types** | Multiple choice, fill-in-the-blank, write/fix PHP code, write SQL queries, short explanation |

## Tips

- **Don't memorize — understand.** The exam tests whether you can *apply* concepts, not just recall definitions.
- **Practice writing code by hand.** On the exam you will write code on paper without syntax highlighting or auto-complete.
- **Focus on common mistakes:** Forgetting `;` or `}` in PHP, mixing up `=` (assignment) and `==` (comparison), forgetting `session_start()`, using `WHERE` instead of `HAVING` for aggregate filters.
- **Time management:** Read all questions first, answer the ones you're confident about, then return to harder ones.
- Revisit your Homework 1–7 submissions and make sure you understand any corrections.
