# MIDTERM EXAM — Model Solution
# INS3064: Multimedia Design and Web Development

**Coverage:** Sessions 1–7 | **Total:** 100 points

---

## Part A — Multiple Choice (20 × 1 = 20 points)

| # | Answer | Explanation |
|---|--------|-------------|
| 1 | **B) `.php`** | PHP files use the `.php` extension. The server processes them through the PHP interpreter. |
| 2 | **B) `<?php`** | The standard PHP opening tag is `<?php`. While `<?` (short tag) works in some configurations, it is not recommended and may be disabled. |
| 3 | **B) `15`** | PHP performs type juggling: the string `"5"` is converted to the integer `5`, then added to `10` to produce `15`. |
| 4 | **B) `$_name`** | PHP variables must start with `$` followed by a letter or underscore. `$_name` is valid. `$1name` starts with a digit; `$name-2` contains a hyphen; `$full name` contains a space — all invalid. |
| 5 | **B) `false`** | An empty string `""` casts to `false` when converted to boolean. Only non-empty strings cast to `true`. |
| 6 | **B) `.`** | The dot `.` operator concatenates strings in PHP. The `+` operator is for arithmetic. |
| 7 | **C) `1`** | The modulus operator `%` returns the remainder of integer division: 10 ÷ 3 = 3 remainder **1**. |
| 8 | **B) `$_GET`** | `$_GET` is the superglobal array containing data sent via HTTP GET method (query string parameters). |
| 9 | **C) `GET`** | The GET method appends form data to the URL as a query string (e.g., `?name=John&age=20`). |
| 10 | **C) Around 2,048 characters (browser-dependent)** | Most browsers and servers limit URL length to approximately 2,048 characters. This is a practical limitation of GET. |
| 11 | **B) `INT`** | Age is a whole number and should be stored as `INT`. `VARCHAR` would store text; `DATE` stores dates; `TEXT` stores large strings. |
| 12 | **B) Removes duplicate rows from the result** | `SELECT DISTINCT column FROM table` returns only unique values, eliminating duplicates. |
| 13 | **C) `HAVING`** | `HAVING` filters groups after aggregation (`GROUP BY`). `WHERE` filters individual rows before grouping. |
| 14 | **A) `SELECT * FROM students;`** | `SELECT` is the SQL command to retrieve data. `*` means all columns. The other options use invalid SQL syntax. |
| 15 | **B) Automatically generates a unique integer for each new row** | `AUTO_INCREMENT` assigns the next sequential integer to a column when a new row is inserted, commonly used for primary keys. |
| 16 | **B) Second Normal Form (2NF)** | 2NF eliminates partial dependencies — every non-key column must depend on the **entire** primary key, not just part of it. |
| 17 | **A) 1NF (atomic values)** | Storing multiple phone numbers in a single column violates 1NF, which requires each cell to hold a single (atomic) value. |
| 18 | **B) Link a row in one table to a row in another table** | A foreign key creates a referential link between two tables, enforcing referential integrity. |
| 19 | **C) `LEFT JOIN`** | `LEFT JOIN` returns all rows from the left (first) table and the matched rows from the right table. Unmatched right-side rows return `NULL`. |
| 20 | **B) To prevent SQL injection attacks** | Prepared statements separate SQL structure from data. User input is bound as parameters, never concatenated into the SQL string, which prevents SQL injection. |

---

## Part B — Short Answer (5 × 4 = 20 points)

### B1. Difference between `==` and `===` (4 points)

`==` is the **loose comparison** operator. It compares values after performing type coercion (type juggling).

`===` is the **strict comparison** operator. It compares both value **and** type without any type coercion.

**Example where they differ:**

```php
$a = 0;
$b = "hello";

var_dump($a == $b);   // bool(true)  — "hello" is cast to 0 for comparison
var_dump($a === $b);  // bool(false) — integer 0 is not the same type as string "hello"
```

Another common example:

```php
$x = "5";
$y = 5;

var_dump($x == $y);   // bool(true)  — string "5" is coerced to int 5
var_dump($x === $y);  // bool(false) — string is not the same type as integer
```

**Key takeaway:** Use `===` in most situations to avoid unexpected type coercion bugs.

---

### B2. GET vs POST (4 points)

| Aspect | GET | POST |
|--------|-----|------|
| **URL visibility** | Data appended to URL as query string | Data sent in HTTP request body |
| **Security** | Less secure (visible in URL, browser history, logs) | More secure (not visible in URL) |
| **Data size** | Limited (~2,048 chars browser-dependent) | No practical limit |
| **Bookmarking** | Can be bookmarked with parameters | Cannot be bookmarked |
| **Idempotency** | Idempotent (safe for repeated requests) | Not idempotent |
| **Use case** | Search queries, filters, navigation | Form submissions, file uploads, sensitive data |

**When to use GET:** Searching, filtering, pagination — when the request doesn't change server data.

**When to use POST:** Login, registration, file upload, placing orders — when submitting or modifying data.

**GET example:**
```html
<form method="GET" action="search.php">
    <input type="text" name="q" placeholder="Search...">
    <button type="submit">Search</button>
</form>
<!-- URL becomes: search.php?q=keyword -->
```

**POST example:**
```html
<form method="POST" action="login.php">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit">Login</button>
</form>
<!-- Data sent in request body, not visible in URL -->
```

---

### B3. 1NF, 2NF, and 3NF (4 points)

**First Normal Form (1NF):**
- **Rule:** Each column must contain only atomic (single) values; no repeating groups or arrays.
- **Violation example:** A `phone_numbers` column contains `"0912345, 0987654"` — this should be split into separate rows so each cell holds one phone number.

**Second Normal Form (2NF):**
- **Rule:** Must be in 1NF, and every non-key column must depend on the **entire** primary key (no partial dependencies). Applies only to tables with composite keys.
- **Violation example:** In a table with composite key `(student_id, course_id)`, storing `student_name` is a violation because `student_name` depends only on `student_id`, not the full key. `student_name` should be in a separate `students` table.

**Third Normal Form (3NF):**
- **Rule:** Must be in 2NF, and no non-key column should depend on another non-key column (no transitive dependencies).
- **Violation example:** A `students` table has `student_id`, `department_id`, and `department_name`. Since `department_name` depends on `department_id` (not directly on `student_id`), this is a transitive dependency. `department_name` should be in a separate `departments` table.

---

### B4. Primary Key vs Foreign Key (4 points)

**Primary Key:**
- Uniquely identifies each row in a table.
- Must be **unique** and **NOT NULL**.
- Each table has exactly one primary key.
- Example: `student_id` in the `students` table.

**Foreign Key:**
- A column (or set of columns) in one table that references the primary key of another table.
- Creates a relationship between two tables.
- Can contain duplicate and NULL values (unless restricted).
- Enforces **referential integrity** — you cannot insert a foreign key value that doesn't exist in the referenced table.

**Example:**

```sql
-- Parent table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL
);

-- Child table
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,          -- Foreign key
    course_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
```

Here, `enrollments.student_id` is a foreign key that references `students.student_id`. This ensures every enrollment is linked to a valid student.

---

### B5. Prepared Statements (4 points)

A **prepared statement** is a pre-compiled SQL template where user-supplied data is bound as parameters rather than concatenated directly into the SQL string.

**How it works:**
1. **Prepare:** The SQL template with placeholders (`?` or `:name`) is sent to the database server.
2. **Bind:** User input values are bound to the placeholders.
3. **Execute:** The database executes the query with the bound values.

The key benefit is **SQL injection prevention** — because the SQL structure and the data are sent separately, user input can never alter the SQL logic.

**Code example using mysqli:**

```php
$conn = new mysqli("localhost", "root", "", "school");

// Unsafe way (DO NOT use):
$sql = "SELECT * FROM students WHERE name = '" . $_POST['name'] . "'";
// Vulnerable: if $_POST['name'] = "'; DROP TABLE students; --"

// Safe way — Prepared Statement:
$stmt = $conn->prepare("SELECT * FROM students WHERE name = ?");
$stmt->bind_param("s", $_POST['name']);  // "s" = string type
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo $row['student_name'];
}
```

The `?` placeholder ensures that whatever the user types is treated as **data**, never as part of the SQL command.

---

## Part C — Practical (3 × 20 = 60 points)

### Task 1: PHP Registration Form (20 points)

```php
<?php
$errors = [];
$values = ['name' => '', 'email' => '', 'age' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // --- Collect and trim input values ---
    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $age      = trim($_POST['age'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm_password'] ?? '';

    // Preserve values for re-display
    $values['name']  = $name;
    $values['email'] = $email;
    $values['age']   = $age;

    // --- Validation ---

    // All fields required
    if ($name === '') {
        $errors[] = "Full name is required.";
    }

    if ($email === '') {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email is not a valid format.";
    }

    if ($age === '') {
        $errors[] = "Age is required.";
    } elseif (!ctype_digit($age) || (int)$age < 10 || (int)$age > 100) {
        $errors[] = "Age must be an integer between 10 and 100.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }

    if ($password !== $confirm) {
        $errors[] = "Confirm password does not match password.";
    }

    // --- If no errors, show success summary ---
    if (empty($errors)) {
        $success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
    <style>
        .error { color: red; }
        .success { color: green; background: #e8f5e9; padding: 10px; border-radius: 5px; }
        .summary { margin: 15px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
        form label { display: block; margin-top: 10px; font-weight: bold; }
        form input { display: block; margin: 4px 0 8px; padding: 6px; width: 300px; }
    </style>
</head>
<body>
    <h1>Student Registration</h1>

    <!-- Display validation errors -->
    <?php if (!empty($errors)): ?>
        <div class="error">
            <strong>Please fix the following errors:</strong>
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= htmlspecialchars($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <!-- Display success summary -->
    <?php if (!empty($success)): ?>
        <div class="success">
            <strong>Registration successful!</strong>
        </div>
        <div class="summary">
            <h3>Registration Summary</h3>
            <p><strong>Name:</strong> <?= htmlspecialchars($values['name']) ?></p>
            <p><strong>Email:</strong> <?= htmlspecialchars($values['email']) ?></p>
            <p><strong>Age:</strong> <?= htmlspecialchars($values['age']) ?></p>
        </div>
    <?php endif; ?>

    <!-- Registration Form -->
    <form method="POST" action="">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name"
               value="<?= htmlspecialchars($values['name']) ?>" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email"
               value="<?= htmlspecialchars($values['email']) ?>" required>

        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="10" max="100"
               value="<?= htmlspecialchars($values['age']) ?>" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required
               minlength="6">

        <label for="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password" required>

        <button type="submit" style="margin-top: 10px; padding: 8px 20px;">Register</button>
    </form>
</body>
</html>
```

**Key marking points:**
- Form uses POST method and submits to itself (✓)
- All 5 fields present with correct input types (✓)
- Server-side validation for all rules (✓)
- Errors displayed in a list above the form (✓)
- Success shows name, email, age — not password (✓)
- Values preserved in fields after failed validation (✓)
- `htmlspecialchars()` used for XSS protection (✓)

---

### Task 2: SQL Queries (20 points)

**Q1 (4 points):** Students enrolled in 2024, sorted alphabetically.

```sql
SELECT student_name, email
FROM students
WHERE enrollment_year = 2024
ORDER BY student_name ASC;
```

---

**Q2 (4 points):** Courses with at least 5 registered students.

```sql
SELECT c.course_name, COUNT(r.student_id) AS student_count
FROM courses c
JOIN registrations r ON c.course_id = r.course_id
GROUP BY c.course_id, c.course_name
HAVING COUNT(r.student_id) >= 5
ORDER BY student_count DESC;
```

---

**Q3 (4 points):** Registrations in Spring 2025 with grade > 3.0.

```sql
SELECT s.student_name, c.course_name, r.grade
FROM registrations r
JOIN students s ON r.student_id = s.student_id
JOIN courses c ON r.course_id = c.course_id
WHERE r.semester = 'Spring 2025'
  AND r.grade > 3.0;
```

---

**Q4 (4 points):** Students NOT registered in Fall 2024 (subquery).

```sql
SELECT student_name, email
FROM students
WHERE student_id NOT IN (
    SELECT student_id
    FROM registrations
    WHERE semester = 'Fall 2024'
);
```

---

**Q5 (4 points):** Average grade per department where avg > 3.0.

```sql
SELECT c.department, ROUND(AVG(r.grade), 2) AS avg_grade
FROM courses c
JOIN registrations r ON c.course_id = r.course_id
GROUP BY c.department
HAVING AVG(r.grade) > 3.0;
```

---

### Task 3: Database Design (20 points)

#### 3.1 CREATE TABLE Statements (8 points)

```sql
-- Categories table
CREATE TABLE categories (
    category_id   INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description   TEXT
);

-- Products table
CREATE TABLE products (
    product_id    INT AUTO_INCREMENT PRIMARY KEY,
    product_name  VARCHAR(100) NOT NULL,
    description   TEXT,
    price         DECIMAL(10,2) NOT NULL,
    stock_qty     INT NOT NULL DEFAULT 0,
    category_id   INT NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Customers table
CREATE TABLE customers (
    customer_id   INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    phone         VARCHAR(20),
    address       TEXT,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    order_id      INT AUTO_INCREMENT PRIMARY KEY,
    customer_id   INT NOT NULL,
    order_date    DATE NOT NULL,
    total_amount  DECIMAL(12,2),
    status        VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order items table (junction table for many-to-many: order ↔ product)
CREATE TABLE order_items (
    item_id       INT AUTO_INCREMENT PRIMARY KEY,
    order_id      INT NOT NULL,
    product_id    INT NOT NULL,
    quantity      INT NOT NULL DEFAULT 1,
    unit_price    DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Reviews table
CREATE TABLE reviews (
    review_id     INT AUTO_INCREMENT PRIMARY KEY,
    customer_id   INT NOT NULL,
    product_id    INT NOT NULL,
    rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment       TEXT,
    review_date   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    UNIQUE (customer_id, product_id)  -- one review per customer per product
);
```

**Key design decisions:**
- `order_items` is the junction table resolving the many-to-many between orders and products.
- `unit_price` is stored in `order_items` to preserve the price at the time of purchase (product prices may change).
- `UNIQUE (customer_id, product_id)` in `reviews` enforces "one review per product per customer."

---

#### 3.2 INSERT Statements (6 points)

```sql
-- 2 Categories
INSERT INTO categories (category_name, description) VALUES
    ('Dogs',       'Products and supplies for dogs'),
    ('Cats',       'Products and supplies for cats');

-- 3 Products (at least one per category)
INSERT INTO products (product_name, description, price, stock_qty, category_id) VALUES
    ('Premium Dog Food 5kg',    'High-quality dry dog food',     45.99, 100, 1),
    ('Cat Scratching Post',     'Durable sisal scratching post', 29.50,  50, 2),
    ('Dog Chew Toy',            'Rubber chew toy for dogs',       12.00, 200, 1);

-- 2 Customers
INSERT INTO customers (full_name, email, phone, address) VALUES
    ('Nguyen Van An',    'an.nv@email.com',    '0912345678', '123 Cau Giay, Hanoi'),
    ('Tran Thi Binh',    'binh.tt@email.com',  '0987654321', '456 Ba Dinh, Hanoi');

-- 1 Order with at least 2 items
INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
    (1, '2025-03-15', 87.49, 'Completed');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 1, 45.99),   -- 1x Premium Dog Food
    (1, 3, 2, 12.00);   -- 2x Dog Chew Toy (subtotal = 24.00, but total was set for demo)

-- Update order total based on actual items
-- total = 45.99 + (2 × 12.00) = 69.99
UPDATE orders SET total_amount = 69.99 WHERE order_id = 1;

-- 1 Review
INSERT INTO reviews (customer_id, product_id, rating, comment) VALUES
    (1, 1, 5, 'My dog loves this food! Great quality.');
```

---

#### 3.3 Queries (6 points)

**Query A: Find all products in a specific category, ordered by price.**

```sql
SELECT p.product_name, p.price, p.stock_qty
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE c.category_name = 'Dogs'
ORDER BY p.price ASC;
```

**Query B: Total amount spent by each customer.**

```sql
SELECT
    c.full_name,
    SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
JOIN orders o      ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
GROUP BY c.customer_id, c.full_name
ORDER BY total_spent DESC;
```

---

> **END OF MODEL SOLUTION**
