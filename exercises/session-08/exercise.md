# Session 8 — In-Class Exercise: Review & Midterm Prep

> **Time:** 45 minutes | **Submission:** LMS | **Files:** `session08_exercise.php`, `session08_exercise.sql`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session08\`
2. Test each PHP file in browser, test SQL in phpMyAdmin
3. Compress all files into a `.zip` named `session08_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Build a validated HTML form using PHP (Sessions 1–4 concepts)
- Write SQL queries covering JOINs, aggregates, and filtering (Sessions 5–7 concepts)
- Design a normalized database schema from a requirements description
- Demonstrate readiness for the midterm exam

---

## Exercise A: PHP Form Review — Registration Form (Required)

### Task Description

Create a **self-processing** registration form (`session08_exercise.php`) that validates user input and displays either a success message or specific error messages. This reviews: HTML forms, `$_POST`, `isset()`, string functions, and basic validation.

**Validation Rules:**

| Field  | Rule                                                       |
|--------|------------------------------------------------------------|
| Name   | Required; 2–50 characters; letters and spaces only         |
| Email  | Required; must match a valid email format                  |
| Age    | Required; must be an integer between 18 and 100            |
| Gender | Required; must be one of: male, female, other              |

### Step-by-Step Instructions

1. Create the HTML form with `method="POST"` and no `action` (self-submitting).
2. On form submission (`isset($_POST['register'])`), validate each field.
3. Collect all errors into an `$errors` array.
4. If no errors, display a success panel with the submitted values.
5. If errors exist, display them in a styled error list and re-populate the form fields.
6. Use `trim()`, `htmlspecialchars()` for output sanitization.

### Starter Code

```php
<?php
// Session 08 — Exercise A: Registration Form Review

$errors = [];
$success = false;
$name = '';
$email = '';
$age = '';
$gender = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {

    // --- Name validation ---
    // TODO: trim, check not empty, check length 2-50, check letters/spaces only (preg_match)
    // $name = trim($_POST['name'] ?? '');
    // if (empty($name)) { $errors['name'] = 'Name is required.'; }
    // elseif (strlen($name) < 2 || strlen($name) > 50) { $errors['name'] = '...'; }
    // elseif (!preg_match('/^[a-zA-ZÀ-ỹ\s]+$/u', $name)) { $errors['name'] = '...'; }

    // --- Email validation ---
    // TODO: trim, check not empty, check filter_var with FILTER_VALIDATE_EMAIL

    // --- Age validation ---
    // TODO: trim, check not empty, check is_numeric, check integer between 18 and 100

    // --- Gender validation ---
    // TODO: check in_array(['male', 'female', 'other'])

    // If no errors, set $success = true
    if (empty($errors)) {
        $success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 08 — Registration Form</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input, select { width: 100%; padding: 8px; box-sizing: border-box; }
        .error { color: red; font-size: 0.9em; }
        .success { background: #d4edda; padding: 15px; border: 1px solid #28a745; border-radius: 4px; }
        .error-list { background: #f8d7da; padding: 15px; border: 1px solid #dc3545; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>📝 Registration Form</h1>

    <?php if ($success): ?>
        <!-- TODO: Display success message with submitted values -->
        <div class="success">
            <strong>Registration successful!</strong><br>
            Name:   <?= htmlspecialchars($name) ?><br>
            Email:  <?= htmlspecialchars($email) ?><br>
            Age:    <?= htmlspecialchars($age) ?><br>
            Gender: <?= htmlspecialchars($gender) ?>
        </div>
    <?php endif; ?>

    <?php if (!empty($errors)): ?>
        <div class="error-list">
            <strong>Please fix the following errors:</strong>
            <ul>
                <?php foreach ($errors as $field => $msg): ?>
                    <li><?= htmlspecialchars($msg) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="POST" action="">
        <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name"
                   value="<?= htmlspecialchars($name) ?>">
            <?php if (isset($errors['name'])): ?>
                <span class="error"><?= htmlspecialchars($errors['name']) ?></span>
            <?php endif; ?>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" name="email"
                   value="<?= htmlspecialchars($email) ?>">
            <?php if (isset($errors['email'])): ?>
                <span class="error"><?= htmlspecialchars($errors['email']) ?></span>
            <?php endif; ?>
        </div>

        <div class="form-group">
            <label for="age">Age</label>
            <input type="number" id="age" name="age"
                   value="<?= htmlspecialchars($age) ?>">
            <?php if (isset($errors['age'])): ?>
                <span class="error"><?= htmlspecialchars($errors['age']) ?></span>
            <?php endif; ?>
        </div>

        <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" name="gender">
                <option value="">-- Select --</option>
                <option value="male"   <?= $gender === 'male'   ? 'selected' : '' ?>>Male</option>
                <option value="female" <?= $gender === 'female' ? 'selected' : '' ?>>Female</option>
                <option value="other"  <?= $gender === 'other'  ? 'selected' : '' ?>>Other</option>
            </select>
            <?php if (isset($errors['gender'])): ?>
                <span class="error"><?= htmlspecialchars($errors['gender']) ?></span>
            <?php endif; ?>
        </div>

        <button type="submit" name="register">Register</button>
    </form>
</body>
</html>
```

### Expected Output

**On successful submission:**
```
✅ Registration successful!
Name:   Nguyen Van An
Email:  an@vnu.edu.vn
Age:    22
Gender: male
```

**On validation failure (example):**
```
⚠ Please fix the following errors:
  • Name is required.
  • Please enter a valid email address.
  • Age must be between 18 and 100.
```

### Self-Check

- [ ] Form submits to itself (no `action` attribute or `action=""`)
- [ ] Empty name triggers "Name is required"
- [ ] Name with 1 character triggers length error
- [ ] Name with numbers triggers "letters and spaces only"
- [ ] Invalid email (e.g., `abc@`) triggers email error
- [ ] Age of 15 triggers range error
- [ ] Age of `abc` triggers "must be a number" error
- [ ] Invalid gender value triggers error
- [ ] Valid submission shows success panel with sanitized output
- [ ] Form fields are re-populated after failed submission

---

## Exercise B: SQL Review (Required)

### Task Description

Use the `shop_db` database from Session 7 (run the Session 7 setup script first if needed). Write **three** queries that demonstrate your understanding of JOINs, aggregates, and subqueries.

### Step-by-Step Instructions

**Query 1 — Users with Orders**

List all customers who have placed at least one order. Show customer name, email, and total number of orders. Sort by order count descending.

```sql
-- Query 1: Customers with orders
-- Expected columns: full_name, email, order_count
-- TODO: Use INNER JOIN or GROUP BY with HAVING
```

**Expected Output:**

| full_name  | email           | order_count |
|------------|-----------------|-------------|
| Emi Hoang  | emi@gmail.com   | 3           |
| An Nguyen  | an@gmail.com    | 2           |
| Binh Tran  | binh@gmail.com  | 2           |
| Chi Le     | chi@gmail.com   | 2           |
| Dung Pham  | dung@gmail.com  | 1           |

**Query 2 — Monthly Revenue**

Show revenue (sum of quantity × unit_price) for each month. Include only delivered or shipped orders.

```sql
-- Query 2: Monthly revenue (delivered + shipped only)
-- Expected columns: month, revenue
-- HINT: JOIN orders → order_items, filter on status, GROUP BY DATE_FORMAT(...)
-- TODO
```

**Query 3 — Top 5 Products by Units Sold**

Find the 5 best-selling products by total quantity sold (across all orders).

```sql
-- Query 3: Top 5 products by quantity sold
-- Expected columns: product_name, total_units_sold
-- HINT: JOIN order_items → products, GROUP BY product, SUM(quantity), ORDER BY ... DESC, LIMIT 5
-- TODO
```

### Starter Code

```sql
-- Session 08 — Exercise B: SQL Review
-- Run Session 07 setup first to create shop_db with sample data!

USE shop_db;

-- Query 1: Customers with orders
-- TODO

-- Query 2: Monthly revenue (delivered + shipped orders only)
-- TODO

-- Query 3: Top 5 products by total units sold
-- TODO
```

### Self-Check

- [ ] Query 1 does NOT include Giang Vo (0 orders)
- [ ] Query 2 filters by order status (delivered + shipped only)
- [ ] Query 3 returns exactly 5 rows
- [ ] All queries run without syntax errors

---

## Exercise C: Database Design Review — Online Course Management (Challenge/Bonus)

### Task Description

Design a database for an **online course management system** with the following requirements:

- **Users** can be students or instructors (store role).
- **Courses** are created by instructors. Each course has a title, description, price, and creation date.
- **Enrollments** link students to courses with an enrollment date and status (active/completed/dropped).
- **Lessons** belong to a course. Each lesson has a title, content, and position (ordering).
- **Reviews**: Students can leave one review per course (rating 1–5 and a comment).

### Step-by-Step Instructions

1. Identify the entities and relationships (draw an ER diagram on paper).
2. Write `CREATE TABLE` statements with:
   - Proper primary keys (AUTO_INCREMENT where appropriate)
   - Foreign keys with ON DELETE rules
   - Appropriate data types (DECIMAL for price, ENUM for status/role, TEXT for content)
   - UNIQUE constraint on (student_id, course_id) in reviews (one review per student per course)
3. Write INSERT statements to add sample data (2 instructors, 3 students, 2 courses, 4 enrollments, 4 lessons, 3 reviews).
4. Write these verification queries:
   - List all students enrolled in a specific course
   - Show average rating for each course
   - List courses with their lesson count

### Starter Code

```sql
-- Session 08 — Exercise C: Online Course Management System

DROP DATABASE IF EXISTS course_mgmt;
CREATE DATABASE course_mgmt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE course_mgmt;

-- 1. Users table (students and instructors)
CREATE TABLE users (
    -- TODO: id, full_name, email, password_hash, role (ENUM: student/instructor), created_at
);

-- 2. Courses table
CREATE TABLE courses (
    -- TODO: id, instructor_id (FK → users), title, description, price, created_at
);

-- 3. Enrollments table
CREATE TABLE enrollments (
    -- TODO: id, student_id (FK → users), course_id (FK → courses),
    --       enrolled_at, status (ENUM: active/completed/dropped)
);

-- 4. Lessons table
CREATE TABLE lessons (
    -- TODO: id, course_id (FK → courses), title, content, position_order, created_at
);

-- 5. Reviews table
CREATE TABLE reviews (
    -- TODO: id, student_id (FK → users), course_id (FK → courses),
    --       rating (1-5), comment, created_at
    -- UNIQUE constraint on (student_id, course_id)
);

-- TODO: INSERT sample data
-- 2 instructors, 3 students, 2 courses, 4 enrollments, 4 lessons, 3 reviews

-- TODO: Verification queries
-- V1: List students enrolled in "Web Development with PHP"
-- V2: Average rating per course
-- V3: Courses with lesson count
```

### Expected Output

**Verification Query V2 (Average ratings):**

| course_title           | avg_rating | review_count |
|------------------------|------------|--------------|
| Web Development with PHP | 4.33     | 3            |
| Database Fundamentals    | NULL       | 0            |

*(Results depend on your sample data)*

### Self-Check

- [ ] `users.role` is ENUM with 'student' and 'instructor'
- [ ] `courses.instructor_id` FK references `users(id)`
- [ ] `enrollments` has FK to both `users` and `courses`
- [ ] `reviews` has a UNIQUE constraint on `(student_id, course_id)`
- [ ] `lessons.position_order` allows proper lesson ordering
- [ ] Sample data is sufficient to test all three verification queries
- [ ] All tables use InnoDB engine

---

## Submission Checklist

- [ ] Exercise A: `session08_exercise.php` — form validates all 4 fields correctly
- [ ] Exercise A: Form re-populates values after failed submission
- [ ] Exercise B: `session08_exercise.sql` — all 3 queries return correct results
- [ ] Exercise B: Queries use shop_db (Session 7 setup data)
- [ ] Exercise C: 5 tables created with proper PK, FK, and constraints
- [ ] Exercise C: Sample data and verification queries included
- [ ] Both files uploaded to LMS

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and queries run correctly | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if files load, display expected output, and use required features
- Deduct 2 pts if file does not run (syntax errors, wrong file name)
- Deduct 1 pt if output is incomplete or missing key requirements
