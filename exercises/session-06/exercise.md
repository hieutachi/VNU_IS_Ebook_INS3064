# Session 6 — In-Class Exercise: Database Design

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session06_exercise.sql`

## How to Submit
1. Save your `.sql` file as `session06_exercise.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `session06_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Apply normalization rules (1NF, 2NF, 3NF) to eliminate data redundancy
- Identify and implement one-to-one, one-to-many, and many-to-many relationships
- Define primary keys, foreign keys, and composite keys correctly
- Write `CREATE TABLE` statements with proper constraints

---

## Exercise A: Blog Database Design (Required)

### Task Description

You are designing the database for a blogging platform. The system needs to store users who write posts, organize posts into categories, allow readers to comment, and tag posts with multiple keywords (a post can have many tags, and a tag can apply to many posts).

Design and create **five tables** that satisfy these requirements:

| Table | Purpose |
|-------|---------|
| `blog_users` | Registered authors and commenters |
| `categories` | Post categories (e.g., Tech, Travel) |
| `posts` | Blog articles written by users |
| `comments` | Reader comments on posts |
| `tags` | Keywords (e.g., PHP, MySQL, Design) |

The `posts ↔ tags` relationship is **many-to-many** — you will need a junction table.

### Step-by-Step Instructions

1. Draw (on paper or mentally) the entity-relationship diagram:
   - Each **user** can write **many posts** (1:N)
   - Each **category** can contain **many posts** (1:N)
   - Each **post** can have **many comments** (1:N)
   - Each **user** can write **many comments** (1:N)
   - Each **post** can have **many tags**, and each **tag** can belong to **many posts** (N:N)
2. Create the `blog_users` table with `id` (PK, AUTO_INCREMENT), `username`, `email`, `password_hash`, `created_at`.
3. Create the `categories` table with `id` (PK), `name`, `slug`.
4. Create the `posts` table with `id` (PK), `user_id` (FK → blog_users), `category_id` (FK → categories), `title`, `slug`, `body`, `status` (ENUM: draft/published), `published_at`, `created_at`.
5. Create the `comments` table with `id` (PK), `post_id` (FK → posts), `user_id` (FK → blog_users), `body`, `created_at`.
6. Create the `tags` table with `id` (PK), `name`, `slug`.
7. Create the `post_tags` junction table with a **composite primary key** `(post_id, tag_id)` and foreign keys to `posts` and `tags`.
8. Add appropriate `ON DELETE CASCADE` or `ON DELETE SET NULL` rules.

### Starter Code

```sql
-- Session 06 — Exercise A: Blog Database Design
-- File: session06_exercise.sql

DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog_db;

-- 1. Users table
CREATE TABLE blog_users (
    -- TODO: define columns
    -- id, username, email, password_hash, created_at
);

-- 2. Categories table
CREATE TABLE categories (
    -- TODO: define columns
    -- id, name, slug
);

-- 3. Posts table (FK → blog_users, FK → categories)
CREATE TABLE posts (
    -- TODO: define columns and foreign keys
);

-- 4. Comments table (FK → posts, FK → blog_users)
CREATE TABLE comments (
    -- TODO: define columns and foreign keys
);

-- 5. Tags table
CREATE TABLE tags (
    -- TODO: define columns
);

-- 6. Junction table: post_tags (N:N)
CREATE TABLE post_tags (
    -- TODO: composite PK and foreign keys
);
```

### Expected Output

After running your script, executing `SHOW TABLES;` should return:

```
+-------------------+
| Tables_in_blog_db |
+-------------------+
| blog_users        |
| categories        |
| comments          |
| post_tags         |
| posts             |
| tags              |
+-------------------+
```

Running `DESCRIBE posts;` should show columns with proper types, keys (`PRI`, `MUL`), and foreign key relationships.

### Self-Check

- [ ] `blog_users.id` is PRIMARY KEY with AUTO_INCREMENT
- [ ] `posts.user_id` is a FOREIGN KEY referencing `blog_users(id)`
- [ ] `posts.category_id` is a FOREIGN KEY referencing `categories(id)`
- [ ] `comments` has foreign keys to both `posts` and `blog_users`
- [ ] `post_tags` has a composite primary key `(post_id, tag_id)`
- [ ] All foreign key constraints include `ON DELETE` action
- [ ] All tables use `ENGINE=InnoDB` (required for FK support)

---

## Exercise B: E-commerce Database Design (Required)

### Task Description

Design the database for a small e-commerce store. Customers place orders that contain one or more products. Products belong to categories. Each line item in an order stores the quantity and the price at the time of purchase (snapshot, not current price).

Design and create **five tables**: `customers`, `categories`, `products`, `orders`, `order_items`.

### Step-by-Step Instructions

1. Identify the relationships:
   - A **customer** places **many orders** (1:N)
   - An **order** contains **many order items** (1:N)
   - A **product** can appear in **many order items** (1:N)
   - A **category** contains **many products** (1:N)
2. Create `customers` with `id`, `full_name`, `email` (UNIQUE), `phone`, `address`, `created_at`.
3. Create `categories` with `id`, `name`, `parent_id` (self-referencing FK for sub-categories, NULLABLE).
4. Create `products` with `id`, `category_id` (FK → categories), `name`, `description`, `price` (DECIMAL), `stock_quantity`, `created_at`.
5. Create `orders` with `id`, `customer_id` (FK → customers), `status` (ENUM: pending/processing/shipped/delivered/cancelled), `total_amount` (DECIMAL), `created_at`.
6. Create `order_items` with `id`, `order_id` (FK → orders), `product_id` (FK → products), `quantity`, `unit_price` (DECIMAL) — **this stores the price at time of purchase**.
7. Add indexes on frequently queried columns (`email`, `customer_id`, `status`).

### Starter Code

```sql
-- Session 06 — Exercise B: E-commerce Database Design

DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_db;

-- 1. Customers
CREATE TABLE customers (
    -- TODO
);

-- 2. Categories (with self-referencing parent_id for sub-categories)
CREATE TABLE categories (
    -- TODO
);

-- 3. Products (FK → categories)
CREATE TABLE products (
    -- TODO
);

-- 4. Orders (FK → customers)
CREATE TABLE orders (
    -- TODO
);

-- 5. Order Items (FK → orders, FK → products)
CREATE TABLE order_items (
    -- TODO
);

-- Verify: SHOW TABLES;
-- Verify: DESCRIBE order_items;
-- Verify: SHOW CREATE TABLE order_items;
```

### Expected Output

```
+------------------------+
| Tables_in_ecommerce_db |
+------------------------+
| categories             |
| customers              |
| order_items            |
| orders                 |
| products               |
+------------------------+
```

`SHOW CREATE TABLE order_items` should show foreign keys to both `orders` and `products`.

### Self-Check

- [ ] `customers.email` has a UNIQUE constraint
- [ ] `categories.parent_id` is NULLABLE (top-level categories have NULL)
- [ ] `products.price` uses DECIMAL(10,2), not FLOAT
- [ ] `orders.total_amount` uses DECIMAL(10,2)
- [ ] `order_items.unit_price` stores the historical price (not a FK)
- [ ] `order_items` has a composite index on `(order_id, product_id)` or both are individually indexed
- [ ] All tables use InnoDB engine

---

## Exercise C: Normalize This (Challenge/Bonus)

### Task Description

You are given a **denormalized** table called `raw_student_courses` that stores everything in one flat table. Your task is to identify normalization violations and convert it into **3NF** (Third Normal Form) by splitting it into properly related tables.

**Denormalized table:**

| student_id | student_name | student_email | course_code | course_name       | instructor_name | instructor_email     | grade | semester |
|------------|-------------|---------------|-------------|-------------------|-----------------|----------------------|-------|----------|
| 1          | An Nguyen   | an@vnu.edu.vn | CS101       | Intro to CS       | Dr. Tuan        | tuan@vnu.edu.vn      | A     | Fall2024 |
| 1          | An Nguyen   | an@vnu.edu.vn | MA201       | Linear Algebra    | Dr. Lan          | lan@vnu.edu.vn       | B+    | Fall2024 |
| 2          | Binh Tran   | binh@vnu.edu.vn| CS101      | Intro to CS       | Dr. Tuan        | tuan@vnu.edu.vn      | A-    | Fall2024 |
| 3          | Chi Le      | chi@vnu.edu.vn | CS101       | Intro to CS       | Dr. Tuan        | tuan@vnu.edu.vn      | B     | Fall2024 |
| 3          | Chi Le      | chi@vnu.edu.vn | PH100       | Physics I         | Dr. Hung         | hung@vnu.edu.vn      | A     | Spr2025 |

### Step-by-Step Instructions

1. **Identify 1NF violations**: Are there repeating groups or multi-valued columns? (This table is already in 1NF — each cell holds a single value.)
2. **Identify 2NF violations**: Are there partial dependencies? (If the PK is composite `(student_id, course_code)`, which columns depend on only *part* of the key?)
3. **Identify 3NF violations**: Are there transitive dependencies? (e.g., `instructor_email` depends on `instructor_name`, which depends on `course_code`.)
4. Design normalized tables:
   - `students` — student_id (PK), student_name, student_email
   - `instructors` — instructor_id (PK), instructor_name, instructor_email
   - `courses` — course_code (PK), course_name, instructor_id (FK)
   - `enrollments` — student_id (FK), course_code (FK), grade, semester (composite PK)
5. Write the `CREATE TABLE` statements.
6. Write `INSERT` statements to populate the normalized tables with the data from the denormalized table.

### Starter Code

```sql
-- Session 06 — Exercise C: Normalize This (Challenge)

DROP DATABASE IF EXISTS normalize_db;
CREATE DATABASE normalize_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE normalize_db;

-- Original denormalized table (for reference)
CREATE TABLE raw_student_courses (
    student_id    INT,
    student_name  VARCHAR(100),
    student_email VARCHAR(100),
    course_code   VARCHAR(10),
    course_name   VARCHAR(100),
    instructor_name  VARCHAR(100),
    instructor_email VARCHAR(100),
    grade         VARCHAR(5),
    semester      VARCHAR(10)
);

INSERT INTO raw_student_courses VALUES
(1, 'An Nguyen',  'an@vnu.edu.vn',  'CS101', 'Intro to CS',    'Dr. Tuan', 'tuan@vnu.edu.vn', 'A',  'Fall2024'),
(1, 'An Nguyen',  'an@vnu.edu.vn',  'MA201', 'Linear Algebra', 'Dr. Lan',  'lan@vnu.edu.vn',  'B+', 'Fall2024'),
(2, 'Binh Tran',  'binh@vnu.edu.vn','CS101', 'Intro to CS',    'Dr. Tuan', 'tuan@vnu.edu.vn', 'A-', 'Fall2024'),
(3, 'Chi Le',     'chi@vnu.edu.vn', 'CS101', 'Intro to CS',    'Dr. Tuan', 'tuan@vnu.edu.vn', 'B',  'Fall2024'),
(3, 'Chi Le',     'chi@vnu.edu.vn', 'PH100', 'Physics I',      'Dr. Hung', 'hung@vnu.edu.vn', 'A',  'Spr2025');

-- TODO: Write your normalized tables below

-- 1. students table
CREATE TABLE students (
    -- TODO
);

-- 2. instructors table
CREATE TABLE instructors (
    -- TODO
);

-- 3. courses table (FK → instructors)
CREATE TABLE courses (
    -- TODO
);

-- 4. enrollments junction table (FK → students, FK → courses)
CREATE TABLE enrollments (
    -- TODO
);

-- TODO: Write INSERT statements to populate normalized tables from raw_student_courses
-- HINT: Use INSERT INTO ... SELECT DISTINCT ... FROM raw_student_courses;
```

### Expected Output

After normalization, running these verification queries should return correct results:

```sql
-- Should return 3 students
SELECT COUNT(*) AS student_count FROM students;

-- Should return 3 instructors
SELECT COUNT(*) AS instructor_count FROM instructors;

-- Should return 3 courses
SELECT COUNT(*) AS course_count FROM courses;

-- Should return 5 enrollments
SELECT COUNT(*) AS enrollment_count FROM enrollments;

-- Join to reconstruct the original view:
SELECT s.student_name, c.course_name, i.instructor_name, e.grade, e.semester
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_code = c.course_code
JOIN instructors i ON c.instructor_id = i.instructor_id
ORDER BY s.student_id, c.course_code;
```

### Self-Check

- [ ] No student name or email is stored more than once (2NF)
- [ ] No instructor email is stored next to each course row (3NF — no transitive dependency)
- [ ] `students` table has `student_id` as PK
- [ ] `instructors` table has its own `instructor_id` as PK (surrogate key)
- [ ] `courses.instructor_id` is a FK referencing `instructors`
- [ ] `enrollments` has a composite PK `(student_id, course_code)`
- [ ] The JOIN query reconstructs all 5 original rows exactly

---

## Submission Checklist

- [ ] Exercise A: All 6 tables created (`blog_users`, `categories`, `posts`, `comments`, `tags`, `post_tags`) with correct FK constraints
- [ ] Exercise B: All 5 tables created (`customers`, `categories`, `products`, `orders`, `order_items`) with correct FK and data types
- [ ] Exercise C: 4 normalized tables created, INSERT statements populated from denormalized data
- [ ] All SQL scripts run without errors in MySQL
- [ ] File saved as `session06_exercise.sql` and uploaded to LMS

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and tables created correctly | 4 | ☐ |
| **Exercise B** submitted and tables created correctly | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if SQL runs without errors, tables have correct columns/types/keys/FK
- Deduct 2 pts if SQL does not run or missing foreign keys
- Deduct 1 pt if normalization is incomplete or missing constraints
