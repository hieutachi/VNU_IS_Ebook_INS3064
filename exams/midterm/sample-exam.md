# MIDTERM EXAM — INS3064: Multimedia Design and Web Development

**Duration:** 90 minutes | **Format:** Closed book | **Total:** 100 points

**Instructor:** ThS. Hieu Ta Chi

**Coverage:** Sessions 1–7 (PHP Basics, Forms, MySQL, SQL, Database Design)

---

> **Instructions:**
> - Read all questions carefully before answering.
> - Part A: Circle or write the letter of the best answer.
> - Part B: Write clear, concise explanations.
> - Part C: Write working code. Include comments where helpful.
> - You may write PHP and SQL by hand or type if using a lab computer.

---

## Part A — Multiple Choice (20 questions × 1 point = 20 points)

**1.** What is the correct file extension for a PHP file?

A) `.html`  
B) `.php`  
C) `.phptml`  
D) `.script`

---

**2.** Which of the following is the correct way to start a PHP code block?

A) `<script>`  
B) `<?php`  
C) `<%`  
D) `<?`

---

**3.** What is the output of the following code?

```php
$x = "5";
$y = 10;
echo $x + $y;
```

A) `510`  
B) `15`  
C) `Error`  
D) `5 10`

---

**4.** Which of the following is a valid PHP variable?

A) `$1name`  
B) `$_name`  
C) `$name-2`  
D) `$full name`

---

**5.** What data type does the following expression return?

```php
$x = (bool) "";
```

A) `true`  
B) `false`  
C) `null`  
D) `0`

---

**6.** Which operator is used for string concatenation in PHP?

A) `+`  
B) `.`  
C) `&`  
D) `::`

---

**7.** What is the output of the following code?

```php
$a = 10;
$b = 3;
echo $a % $b;
```

A) `3.33`  
B) `3`  
C) `1`  
D) `0`

---

**8.** Which superglobal array holds data sent via the HTTP GET method?

A) `$_POST`  
B) `$_GET`  
C) `$_REQUEST`  
D) `$_SERVER`

---

**9.** Which HTTP method appends form data to the URL as query strings?

A) `POST`  
B) `PUT`  
C) `GET`  
D) `DELETE`

---

**10.** What is the maximum recommended length for data sent via GET?

A) 256 characters  
B) 1,024 characters  
C) Around 2,048 characters (browser-dependent)  
D) Unlimited

---

**11.** Which MySQL data type should be used to store a person's age?

A) `VARCHAR(3)`  
B) `INT`  
C) `DATE`  
D) `TEXT`

---

**12.** What does the SQL keyword `DISTINCT` do?

A) Sorts the result set  
B) Removes duplicate rows from the result  
C) Limits the number of rows returned  
D) Groups rows by a column

---

**13.** Which SQL clause is used to filter rows after grouping with `GROUP BY`?

A) `WHERE`  
B) `ORDER BY`  
C) `HAVING`  
D) `LIMIT`

---

**14.** Which of the following is a valid way to select all columns from a table called `students`?

A) `SELECT * FROM students;`  
B) `GET * FROM students;`  
C) `FETCH ALL students;`  
D) `RETRIEVE * students;`

---

**15.** What does `AUTO_INCREMENT` do in MySQL?

A) Automatically deletes old records  
B) Automatically generates a unique integer for each new row  
C) Automatically updates the timestamp  
D) Automatically creates an index

---

**16.** Which normal form requires that every non-key column depends on the entire primary key (no partial dependencies)?

A) First Normal Form (1NF)  
B) Second Normal Form (2NF)  
C) Third Normal Form (3NF)  
D) Boyce-Codd Normal Form (BCNF)

---

**17.** A table has a column `phone_numbers` containing "0912345678, 0987654321". Which normal form does this violate?

A) 1NF (atomic values)  
B) 2NF (no partial dependency)  
C) 3NF (no transitive dependency)  
D) No violation

---

**18.** In a relational database, a **foreign key** is used to:

A) Make a column unique  
B) Link a row in one table to a row in another table  
C) Automatically generate values  
D) Speed up queries

---

**19.** Which JOIN returns all rows from the left table and matching rows from the right table?

A) `INNER JOIN`  
B) `RIGHT JOIN`  
C) `LEFT JOIN`  
D) `CROSS JOIN`

---

**20.** What is the purpose of using **prepared statements** in PHP?

A) To make code shorter  
B) To prevent SQL injection attacks  
C) To increase query speed  
D) To format output as HTML

---

## Part B — Short Answer (5 questions × 4 points = 20 points)

**B1.** Explain the difference between `==` and `===` in PHP. Give one example where they produce different results.

---

**B2.** Explain the difference between the HTTP GET and POST methods for submitting forms. When should you use each? Give a brief HTML form example for each.

---

**B3.** Explain First Normal Form (1NF), Second Normal Form (2NF), and Third Normal Form (3NF). For each, state the rule and give a one-sentence example of a violation.

---

**B4.** Explain the difference between a **primary key** and a **foreign key** in a relational database. Use an example with two related tables (e.g., `students` and `enrollments`).

---

**B5.** What is a **prepared statement** in PHP/MySQL? Explain how it works and why it is important. Include a brief code example using `mysqli`.

---

## Part C — Practical (3 tasks × 20 points = 60 points)

### Task 1: PHP Registration Form (20 points)

Build a PHP page that displays an HTML registration form and processes the submitted data.

**Requirements:**

1. **(4 points)** Create an HTML form with the following fields:
   - Full Name (text input, required)
   - Email (email input, required, must be valid format)
   - Age (number input, must be between 10 and 100)
   - Password (password input, minimum 6 characters)
   - Confirm Password (must match Password)
   - Submit button

2. **(8 points)** Implement server-side validation using PHP:
   - All fields are required
   - Email must be a valid format (`filter_var` with `FILTER_VALIDATE_EMAIL`)
   - Age must be an integer between 10 and 100
   - Password must be at least 6 characters
   - Confirm Password must match Password
   - Display all validation errors in a list above the form

3. **(4 points)** On successful validation, display a clean summary of the submitted data (name, email, age) below the form. The password should NOT be displayed.

4. **(4 points)** Preserve form values: when validation fails, the previously entered values should remain in the form fields (except passwords).

**Notes:**
- Use `$_POST` for form submission.
- The form should submit to itself (same file).
- You do NOT need to save data to a database.

---

### Task 2: SQL Queries (20 points)

Consider the following database schema for a **University Course Registration System**:

```sql
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    enrollment_year YEAR NOT NULL,
    major VARCHAR(50)
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    credits INT NOT NULL CHECK (credits BETWEEN 1 AND 5)
);

CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester VARCHAR(20) NOT NULL,
    grade DECIMAL(3,1),
    registration_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

Write SQL queries for the following tasks:

**Q1 (4 points):** Find the names and email addresses of all students who enrolled in the year 2024, sorted alphabetically by name.

**Q2 (4 points):** For each course, display the course name and the number of students registered. Only include courses that have at least 5 registered students. Order by the number of students (descending).

**Q3 (4 points):** List the student name, course name, and grade for all registrations in the "Spring 2025" semester where the grade is above 3.0. Use appropriate JOINs.

**Q4 (4 points):** Find all students who are NOT registered for any course in the "Fall 2024" semester. Use a subquery.

**Q5 (4 points):** For each department, calculate the average grade of all registrations. Only include departments where the average grade is above 3.0. Display the department name and the average grade (rounded to 2 decimal places).

---

### Task 3: Database Design (20 points)

You are designing a database for an **Online Pet Store** that sells pets and pet supplies to customers.

**Business Rules:**
- Each customer can place many orders.
- Each order belongs to exactly one customer.
- Each order can contain many products (and a product can appear in many orders).
- Each product belongs to one category (e.g., "Dogs", "Cats", "Fish", "Accessories").
- Customers can write one review per product they have purchased.

**Requirements:**

1. **(8 points)** Design the database. Write `CREATE TABLE` statements for all necessary tables with:
   - Appropriate data types for each column
   - Primary keys and auto-increment where appropriate
   - Foreign key constraints
   - `NOT NULL` and `UNIQUE` constraints where appropriate
   - Proper relationship handling for many-to-many (order ↔ product)

2. **(6 points)** Write `INSERT` statements to add:
   - 2 categories
   - 3 products (at least one in each category)
   - 2 customers
   - 1 order with at least 2 order items
   - 1 review

3. **(6 points)** Write the following queries for your designed schema:
   - Find all products in a specific category, ordered by price.
   - Find the total amount spent by each customer (sum of product prices × quantities across all their orders). Display customer name and total.

---

> **END OF EXAM — Good luck!**
