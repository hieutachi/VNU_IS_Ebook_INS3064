# Session 4 — In-Class Exercise: Introduction to MySQL

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session04_exercise.sql`

## How to Submit
1. Save your `.sql` file as `session04_exercise.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `session04_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Understand relational database concepts (tables, columns, rows, keys)
- Navigate and use phpMyAdmin to create databases and tables
- Use `CREATE DATABASE` and `CREATE TABLE` SQL statements
- Choose appropriate MySQL data types (`INT`, `VARCHAR`, `TEXT`, `DECIMAL`, `DATE`, `ENUM`, `TIMESTAMP`)
- Define primary keys, foreign keys, `NOT NULL`, `DEFAULT`, `AUTO_INCREMENT`, and `UNIQUE` constraints

---

## Exercise A: "Student Database" (Required)

### Task Description
Create a **student management database** with two related tables: `students` and `classes`. This exercise introduces `CREATE DATABASE`, `CREATE TABLE`, data types, primary keys, and a basic foreign key relationship.

### Step-by-Step Instructions
1. Open **phpMyAdmin** at `http://localhost/phpmyadmin`.
2. Go to the **SQL** tab (or create a new `.sql` file in your editor).
3. Write a `CREATE DATABASE` statement for `student_management`.
4. Write `USE student_management` to select the database.
5. Create the **`classes`** table first (it is referenced by students).
6. Create the **`students`** table with a foreign key pointing to `classes`.
7. Run the SQL in phpMyAdmin and verify both tables appear in the sidebar.
8. *(Bonus)*: Add `INSERT` statements to add 2 classes and 5 students.

### Starter Code

```sql
-- =============================================
-- Session 4 — Exercise A: Student Database
-- =============================================

-- Step 1: Create the database (drop if exists for clean re-runs)
DROP DATABASE IF EXISTS student_management;
CREATE DATABASE student_management
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Step 2: Select the database
USE student_management;

-- Step 3: Create the `classes` table
CREATE TABLE classes (
    class_id    INT          AUTO_INCREMENT PRIMARY KEY,
    class_name  VARCHAR(50)  NOT NULL UNIQUE,
    room_number VARCHAR(10),
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create the `students` table
CREATE TABLE students (
    student_id  INT          AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50)  NOT NULL,
    last_name   VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    dob         DATE,
    gender      ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Other',
    class_id    INT,
    gpa         DECIMAL(3,2) DEFAULT 0.00,
    enrolled_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    -- TODO: Add foreign key constraint
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Step 5: Verify the table structures
DESCRIBE classes;
DESCRIBE students;

-- =============================================
-- Bonus: Insert sample data
-- =============================================

-- Insert classes
INSERT INTO classes (class_name, room_number) VALUES
    ('Computer Science 101', 'A-201'),
    ('Web Development 201',  'B-305');

-- Insert students
INSERT INTO students (first_name, last_name, email, dob, gender, class_id, gpa) VALUES
    ('Nguyen', 'Van A',    'nva@example.com',   '2003-05-15', 'Male',   1, 3.50),
    ('Tran',   'Thi B',    'ttb@example.com',   '2002-11-20', 'Female', 1, 3.75),
    ('Le',     'Van C',    'lvc@example.com',   '2003-02-10', 'Male',   2, 3.20),
    ('Pham',   'Thi D',    'ptd@example.com',   '2002-08-30', 'Female', 2, 3.90),
    ('Hoang',  'Van E',    'hve@example.com',   '2003-12-05', 'Male',   NULL, 2.80);

-- Verify data
SELECT * FROM classes;
SELECT * FROM students;
```

### Expected Output

After running the SQL, phpMyAdmin should show:

**`classes` table structure:**
```
+-------------+--------------+------+-----+-------------------+
| Field       | Type         | Null | Key | Default           |
+-------------+--------------+------+-----+-------------------+
| class_id    | int(11)      | NO   | PRI | AUTO_INCREMENT    |
| class_name  | varchar(50)  | NO   | UNI | NULL              |
| room_number | varchar(10)  | YES  |     | NULL              |
| created_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+
```

**`students` table structure:**
```
+-------------+----------------------------+------+-----+-------------------+
| Field       | Type                       | Null | Key | Default           |
+-------------+----------------------------+------+-----+-------------------+
| student_id  | int(11)                    | NO   | PRI | AUTO_INCREMENT    |
| first_name  | varchar(50)                | NO   |     | NULL              |
| last_name   | varchar(50)                | NO   |     | NULL              |
| email       | varchar(100)               | NO   | UNI | NULL              |
| dob         | date                       | YES  |     | NULL              |
| gender      | enum('Male','Female',...)  | NO   |     | Other             |
| class_id    | int(11)                    | YES  | MUL | NULL              |
| gpa         | decimal(3,2)               | YES  |     | 0.00              |
| enrolled_at | timestamp                  | YES  |     | CURRENT_TIMESTAMP |
+-------------+----------------------------+------+-----+-------------------+
```

### Self-Check
- [ ] Database `student_management` is created successfully
- [ ] `classes` table has `class_id` as primary key with `AUTO_INCREMENT`
- [ ] `students` table has `student_id` as primary key with `AUTO_INCREMENT`
- [ ] `email` column has `UNIQUE` constraint
- [ ] `gender` uses `ENUM` with three options
- [ ] Foreign key `class_id` references `classes(class_id)` with `ON DELETE SET NULL`
- [ ] `DESCRIBE` commands show correct table structures
- [ ] *(Bonus)* Sample data inserts without errors

---

## Exercise B: "Product Database" (Required)

### Task Description
Create an **e-commerce product database** (`shop_db`) with `categories` and `products` tables. The products table includes a **foreign key** referencing categories. This exercise reinforces table creation, data types, and referential integrity.

### Step-by-Step Instructions
1. Write SQL to create database `shop_db`.
2. Create the **`categories`** table with `category_id`, `category_name`, and `description`.
3. Create the **`products`** table with product details and a foreign key to `categories`.
4. Add `NOT NULL`, `DEFAULT`, `CHECK` (where supported), and `AUTO_INCREMENT` constraints.
5. Run the SQL and verify the structure.
6. *(Bonus)*: Insert 4 categories and 8 products with varied data.

### Starter Code

```sql
-- =============================================
-- Session 4 — Exercise B: Product Database
-- =============================================

-- Step 1: Create the database
DROP DATABASE IF EXISTS shop_db;
CREATE DATABASE shop_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE shop_db;

-- Step 2: Create the `categories` table
CREATE TABLE categories (
    category_id   INT          AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description   TEXT,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create the `products` table
CREATE TABLE products (
    product_id    INT            AUTO_INCREMENT PRIMARY KEY,
    product_name  VARCHAR(200)   NOT NULL,
    description   TEXT,
    price         DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
    stock_qty     INT            NOT NULL DEFAULT 0,
    category_id   INT,
    is_active     TINYINT(1)     NOT NULL DEFAULT 1,
    image_url     VARCHAR(500),
    created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- TODO: Add foreign key to categories
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Step 4: Verify table structures
DESCRIBE categories;
DESCRIBE products;

-- =============================================
-- Bonus: Insert sample data
-- =============================================

-- Categories
INSERT INTO categories (category_name, description) VALUES
    ('Laptops',      'Portable computers for work and gaming'),
    ('Smartphones',  'Mobile phones with smart features'),
    ('Accessories',  'Computer and phone accessories'),
    ('Audio',        'Headphones, speakers, and audio equipment');

-- Products
INSERT INTO products (product_name, description, price, stock_qty, category_id) VALUES
    ('MacBook Air M2',      'Apple laptop with M2 chip',           1299.00, 25, 1),
    ('Dell XPS 15',         '15-inch premium laptop',              1499.00, 15, 1),
    ('iPhone 15',           'Apple smartphone A16 chip',            999.00, 50, 2),
    ('Samsung Galaxy S24',  'Samsung flagship phone',               849.00, 40, 2),
    ('Logitech MX Master',  'Wireless ergonomic mouse',             99.00, 100, 3),
    ('USB-C Hub 7-in-1',    'Multi-port adapter',                   49.00, 200, 3),
    ('AirPods Pro',          'Apple wireless earbuds with ANC',     249.00, 60, 4),
    ('Sony WH-1000XM5',     'Noise-cancelling headphones',          349.00, 30, 4);

-- Verify data
SELECT * FROM categories;
SELECT * FROM products;
```

### Expected Output

**`categories` table (after bonus inserts):**
```
+--------------+---------------+------------------------------------------+
| category_id  | category_name | description                              |
+--------------+---------------+------------------------------------------+
| 1            | Laptops       | Portable computers for work and gaming   |
| 2            | Smartphones   | Mobile phones with smart features        |
| 3            | Accessories   | Computer and phone accessories           |
| 4            | Audio         | Headphones, speakers, and audio equip... |
+--------------+---------------+------------------------------------------+
```

**`products` table (first 3 rows):**
```
+------------+---------------+----------+-----------+-------------+
| product_id | product_name  | price    | stock_qty | category_id |
+------------+---------------+----------+-----------+-------------+
| 1          | MacBook Air M2| 1299.00  | 25        | 1           |
| 2          | Dell XPS 15   | 1499.00  | 15        | 1           |
| 3          | iPhone 15     | 999.00   | 50        | 2           |
+------------+---------------+----------+-----------+-------------+
```

### Self-Check
- [ ] Database `shop_db` is created successfully
- [ ] `categories` table has `category_name` as `UNIQUE`
- [ ] `products` table uses `DECIMAL(10,2)` for `price`
- [ ] `stock_qty` has a `DEFAULT` of `0`
- [ ] `is_active` uses `TINYINT(1)` as a boolean flag
- [ ] Foreign key correctly links `products.category_id` → `categories.category_id`
- [ ] `ON UPDATE CURRENT_TIMESTAMP` is set for `updated_at`
- [ ] *(Bonus)* All sample data inserts without errors

---

## Exercise C: "Library Database" (Challenge / Bonus)

### Task Description
Design a **library management database** with three interconnected tables: `Books`, `Members`, and `Borrowings`. This exercise practices **many-to-many relationships** (through a junction table), composite logic, and advanced constraints.

### Step-by-Step Instructions
1. Create database `library_db`.
2. Design and create the **`books`** table with book details.
3. Design and create the **`members`** table with member information.
4. Design and create the **`borrowings`** table (junction/transaction table) that links books and members with borrow and return dates.
5. Include appropriate constraints: `NOT NULL`, `DEFAULT`, `FOREIGN KEY`, and `CHECK`.
6. *(Bonus)*: Insert sample data: 5 books, 3 members, and 5 borrowings.

### Starter Code

```sql
-- =============================================
-- Session 4 — Exercise C: Library Database
-- =============================================

DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE library_db;

-- Table 1: Books
CREATE TABLE books (
    book_id        INT           AUTO_INCREMENT PRIMARY KEY,
    title          VARCHAR(300)  NOT NULL,
    author         VARCHAR(200)  NOT NULL,
    isbn           VARCHAR(20)   NOT NULL UNIQUE,
    publisher      VARCHAR(200),
    publish_year   YEAR,
    genre          VARCHAR(100),
    total_copies   INT           NOT NULL DEFAULT 1,
    available_copies INT         NOT NULL DEFAULT 1,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Members
CREATE TABLE members (
    member_id      INT           AUTO_INCREMENT PRIMARY KEY,
    first_name     VARCHAR(50)   NOT NULL,
    last_name      VARCHAR(50)   NOT NULL,
    email          VARCHAR(100)  NOT NULL UNIQUE,
    phone          VARCHAR(15),
    address        TEXT,
    membership_date DATE         NOT NULL DEFAULT (CURRENT_DATE),
    is_active      TINYINT(1)    NOT NULL DEFAULT 1
);

-- Table 3: Borrowings (transaction/junction table)
CREATE TABLE borrowings (
    borrowing_id   INT       AUTO_INCREMENT PRIMARY KEY,
    book_id        INT       NOT NULL,
    member_id      INT       NOT NULL,
    borrow_date    DATE      NOT NULL DEFAULT (CURRENT_DATE),
    due_date       DATE      NOT NULL,
    return_date    DATE      DEFAULT NULL,
    status         ENUM('borrowed', 'returned', 'overdue') NOT NULL DEFAULT 'borrowed',
    -- TODO: Add foreign keys
    FOREIGN KEY (book_id)   REFERENCES books(book_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(member_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Verify structures
DESCRIBE books;
DESCRIBE members;
DESCRIBE borrowings;

-- =============================================
-- Bonus: Insert sample data
-- =============================================

INSERT INTO books (title, author, isbn, publisher, publish_year, genre, total_copies, available_copies) VALUES
    ('The Great Gatsby',      'F. Scott Fitzgerald', '978-0743273565', 'Scribner',      1925, 'Fiction',      3, 2),
    ('To Kill a Mockingbird', 'Harper Lee',          '978-0061120084', 'HarperCollins', 1960, 'Fiction',      5, 3),
    ('1984',                  'George Orwell',       '978-0451524935', 'Signet',        1949, 'Dystopian',    4, 4),
    ('Clean Code',            'Robert C. Martin',    '978-0132350884', 'Prentice Hall', 2008, 'Programming',  2, 1),
    ('Design Patterns',       'Gang of Four',        '978-0201633610', 'Addison-Wesley',1994, 'Programming',  2, 2);

INSERT INTO members (first_name, last_name, email, phone) VALUES
    ('Nguyen', 'Van A',    'nva@example.com', '0912345678'),
    ('Tran',   'Thi B',    'ttb@example.com', '0987654321'),
    ('Le',     'Van C',    'lvc@example.com', '0901234567');

INSERT INTO borrowings (book_id, member_id, borrow_date, due_date, return_date, status) VALUES
    (1, 1, '2025-01-05', '2025-01-19', NULL,       'borrowed'),
    (2, 1, '2024-12-20', '2025-01-03', '2025-01-02','returned'),
    (4, 2, '2025-01-10', '2025-01-24', NULL,       'borrowed'),
    (1, 3, '2025-01-08', '2025-01-22', NULL,       'borrowed'),
    (5, 3, '2024-12-15', '2024-12-29', '2025-01-05','overdue');

-- Verify data
SELECT * FROM books;
SELECT * FROM members;
SELECT * FROM borrowings;
```

### Expected Output

**`books` table:**
```
+---------+-----------------------+------------------+----------------+
| book_id | title                 | author           | available_copies|
+---------+-----------------------+------------------+----------------+
| 1       | The Great Gatsby      | F. Scott Fitzgerald| 2             |
| 2       | To Kill a Mockingbird | Harper Lee        | 3             |
| 3       | 1984                  | George Orwell     | 4             |
| 4       | Clean Code            | Robert C. Martin  | 1             |
| 5       | Design Patterns       | Gang of Four      | 2             |
+---------+-----------------------+------------------+----------------+
```

**`borrowings` table:**
```
+--------------+---------+-----------+-------------+------------+-------------+
| borrowing_id | book_id | member_id | borrow_date | due_date   | status      |
+--------------+---------+-----------+-------------+------------+-------------+
| 1            | 1       | 1         | 2025-01-05  | 2025-01-19 | borrowed    |
| 2            | 2       | 1         | 2024-12-20  | 2025-01-03 | returned    |
| 3            | 4       | 2         | 2025-01-10  | 2025-01-24 | borrowed    |
| 4            | 1       | 3         | 2025-01-08  | 2025-01-22 | borrowed    |
| 5            | 5       | 3         | 2024-12-15  | 2024-12-29 | overdue     |
+--------------+---------+-----------+-------------+------------+-------------+
```

### Self-Check
- [ ] Database `library_db` is created successfully
- [ ] `books` table has `isbn` as `UNIQUE`
- [ ] `books` tracks both `total_copies` and `available_copies`
- [ ] `members` table has `email` as `UNIQUE` and `is_active` flag
- [ ] `borrowings` table links `book_id` → `books` and `member_id` → `members`
- [ ] Both foreign keys use `ON DELETE RESTRICT` (prevent deleting referenced data)
- [ ] `status` ENUM has `'borrowed'`, `'returned'`, `'overdue'`
- [ ] `return_date` allows `NULL` (for books not yet returned)
- [ ] *(Bonus)* All sample data inserts without errors

---

## Submission Checklist
- [ ] **Exercise A:** `student_management` database with `classes` and `students` tables
- [ ] **Exercise B:** `shop_db` database with `categories` and `products` tables
- [ ] **Exercise C:** `library_db` database with `books`, `members`, and `borrowings` tables *(bonus)*
- [ ] All SQL is saved in `session04_exercise.sql`
- [ ] All databases and tables are created successfully in phpMyAdmin
- [ ] `DESCRIBE` output is verified for each table
- [ ] *(Bonus)* Sample data is inserted and verified
- [ ] SQL file is uploaded to LMS before the deadline

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and tables created correctly | 4 | ☐ |
| **Exercise B** submitted and tables created correctly | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if SQL runs without errors, tables have correct columns/types/keys
- Deduct 2 pts if SQL does not run (syntax errors, missing constraints)
- Deduct 1 pt if tables are incomplete or missing key relationships
