# Session 5 — In-Class Exercise: Introduction to SQL

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session05_exercise.sql`

## How to Submit
1. Save your `.sql` file as `session05_exercise.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `session05_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Use `INSERT INTO` to add single and multiple rows of data
- Write `SELECT` queries with `WHERE`, `AND`/`OR`, `LIKE`, `BETWEEN`, and `IN`
- Sort results with `ORDER BY` (ascending/descending)
- Limit output with `LIMIT` and `OFFSET` for pagination
- Update existing data with `UPDATE ... SET ... WHERE`
- Delete data with `DELETE ... WHERE`
- Use aggregate functions: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`

---

## Exercise A: "Basic CRUD" (Required)

### Task Description
Practice the four fundamental SQL operations — **Create** (`INSERT`), **Read** (`SELECT`), **Update** (`UPDATE`), and **Delete** (`DELETE`) — on the `shop_db.products` table from Session 4.

### Step-by-Step Instructions
1. Open phpMyAdmin and select the `shop_db` database.
2. If you did not create `shop_db` in Session 4, run the provided setup script first.
3. **INSERT**: Add 10 products across different categories using `INSERT INTO`.
4. **SELECT with WHERE**: Query products matching specific conditions.
5. **UPDATE**: Modify the price and stock of a product.
6. **DELETE**: Remove a product from the table.
7. Run each query one at a time in the SQL tab and verify the results.

### Starter Code

```sql
-- =============================================
-- Session 5 — Exercise A: Basic CRUD
-- Prerequisites: shop_db from Session 4
-- =============================================

USE shop_db;

-- If shop_db doesn't exist yet, run this setup first:
-- (Uncomment the block below if needed)

/*
DROP DATABASE IF EXISTS shop_db;
CREATE DATABASE shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop_db;

CREATE TABLE categories (
    category_id   INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description   TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id    INT AUTO_INCREMENT PRIMARY KEY,
    product_name  VARCHAR(200) NOT NULL,
    description   TEXT,
    price         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_qty     INT NOT NULL DEFAULT 0,
    category_id   INT,
    is_active     TINYINT(1) NOT NULL DEFAULT 1,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO categories (category_name, description) VALUES
    ('Laptops', 'Portable computers'),
    ('Smartphones', 'Mobile phones'),
    ('Accessories', 'Computer accessories'),
    ('Audio', 'Audio equipment');
*/

-- =============================================
-- 1. INSERT — Add 10 products
-- =============================================

INSERT INTO products (product_name, description, price, stock_qty, category_id) VALUES
    ('MacBook Air M2',        'Apple laptop M2 chip',             1299.00, 25,  1),
    ('Dell XPS 15',           '15-inch premium laptop',           1499.00, 15,  1),
    ('Lenovo ThinkPad X1',    'Business ultrabook',               1399.00, 20,  1),
    ('iPhone 15',             'Apple smartphone',                  999.00, 50,  2),
    ('Samsung Galaxy S24',    'Samsung flagship phone',            849.00, 40,  2),
    ('Xiaomi 14',             'Xiaomi flagship phone',             699.00, 60,  2),
    ('Logitech MX Master 3S', 'Wireless ergonomic mouse',          99.00, 100, 3),
    ('USB-C Hub 7-in-1',      'Multi-port USB-C adapter',          49.00, 200, 3),
    ('AirPods Pro 2',         'Apple earbuds with ANC',           249.00,  60, 4),
    ('Sony WH-1000XM5',      'Noise-cancelling headphones',       349.00,  30, 4);

-- Verify the insert
SELECT * FROM products;

-- =============================================
-- 2. SELECT with WHERE — Read with conditions
-- =============================================

-- Q1: Find all products priced above 1000
SELECT product_name, price, stock_qty
FROM products
WHERE price > 1000;

-- Q2: Find all products in category 2 (Smartphones)
SELECT product_name, price
FROM products
WHERE category_id = 2;

-- Q3: Find products priced between 200 and 1000
SELECT product_name, price
FROM products
WHERE price BETWEEN 200 AND 1000;

-- Q4: Find products whose name contains "Pro"
SELECT product_name, price
FROM products
WHERE product_name LIKE '%Pro%';

-- Q5: Find products in categories 1 or 4 (Laptops or Audio)
SELECT product_name, category_id, price
FROM products
WHERE category_id IN (1, 4);

-- =============================================
-- 3. UPDATE — Modify existing data
-- =============================================

-- Q6: Increase the price of 'iPhone 15' by 10%
UPDATE products
SET price = price * 1.10
WHERE product_name = 'iPhone 15';

-- Verify the update
SELECT product_name, price FROM products WHERE product_name = 'iPhone 15';

-- Q7: Set stock to 0 for products with stock below 20
UPDATE products
SET stock_qty = 0, is_active = 0
WHERE stock_qty < 20;

-- Verify
SELECT product_name, stock_qty, is_active FROM products WHERE stock_qty = 0;

-- =============================================
-- 4. DELETE — Remove data
-- =============================================

-- Q8: Delete products that are no longer active (is_active = 0)
DELETE FROM products
WHERE is_active = 0;

-- Verify remaining products
SELECT product_id, product_name, price, stock_qty, is_active
FROM products
ORDER BY product_id;
```

### Expected Output

**After INSERT (10 rows):**
```
+------------+-----------------------+---------+-----------+
| product_id | product_name          | price   | stock_qty |
+------------+-----------------------+---------+-----------+
| 1          | MacBook Air M2        | 1299.00 | 25        |
| 2          | Dell XPS 15           | 1499.00 | 15        |
| ...        | ...                   | ...     | ...       |
| 10         | Sony WH-1000XM5      | 349.00  | 30        |
+------------+-----------------------+---------+-----------+
```

**Q1 — Products priced above 1000:**
```
+-------------------+---------+-----------+
| product_name      | price   | stock_qty |
+-------------------+---------+-----------+
| MacBook Air M2    | 1299.00 | 25        |
| Dell XPS 15       | 1499.00 | 15        |
| Lenovo ThinkPad X1| 1399.00 | 20        |
+-------------------+---------+-----------+
```

**Q6 — After iPhone 15 price update:**
```
+---------------+---------+
| product_name  | price   |
+---------------+---------+
| iPhone 15     | 1098.90 |
+---------------+---------+
```

### Self-Check
- [ ] 10 products are inserted successfully
- [ ] `WHERE` with `>` correctly filters expensive products
- [ ] `BETWEEN` returns the correct range of products
- [ ] `LIKE '%Pro%'` matches product names containing "Pro"
- [ ] `IN (1, 4)` returns products from the specified categories
- [ ] `UPDATE` correctly modifies the iPhone 15 price
- [ ] `DELETE` removes inactive products
- [ ] Final `SELECT` shows the correct remaining products

---

## Exercise B: "Advanced Queries" (Required)

### Task Description
Write more advanced `SELECT` queries using `ORDER BY`, `LIMIT`, `OFFSET`, aggregate functions, `GROUP BY`, and `HAVING`. These are the queries you'll use most in real-world PHP applications.

### Step-by-Step Instructions
1. Continue using the `shop_db` database.
2. Make sure you have at least 8–10 products in the table (from Exercise A).
3. Write queries for each task below.
4. Run each query and verify the result set.

### Starter Code

```sql
-- =============================================
-- Session 5 — Exercise B: Advanced Queries
-- =============================================

USE shop_db;

-- =============================================
-- 1. ORDER BY — Sort results
-- =============================================

-- Q1: Products sorted by price (highest to lowest)
SELECT product_name, price, stock_qty
FROM products
ORDER BY price DESC;

-- Q2: Products sorted by category, then by name alphabetically
SELECT product_name, category_id, price
FROM products
ORDER BY category_id ASC, product_name ASC;

-- =============================================
-- 2. LIMIT & OFFSET — Pagination
-- =============================================

-- Q3: Top 5 most expensive products
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- Q4: Pagination — get "page 2" with 3 items per page
-- Page 1: LIMIT 3 OFFSET 0
-- Page 2: LIMIT 3 OFFSET 3
-- Page 3: LIMIT 3 OFFSET 6
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 3 OFFSET 3;

-- =============================================
-- 3. Search by name pattern
-- =============================================

-- Q5: Search products whose name starts with 'S'
SELECT product_name, price
FROM products
WHERE product_name LIKE 'S%';

-- Q6: Search products whose name contains 'Mac' or 'mac' (case-insensitive)
SELECT product_name, price
FROM products
WHERE product_name LIKE '%mac%' OR product_name LIKE '%Mac%';

-- =============================================
-- 4. Aggregate Functions with GROUP BY
-- =============================================

-- Q7: Count products per category
SELECT
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name;

-- Q8: Average price per category
SELECT
    c.category_name,
    ROUND(AVG(p.price), 2) AS avg_price,
    MIN(p.price) AS min_price,
    MAX(p.price) AS max_price
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name;

-- Q9: Total stock value per category (price × stock_qty)
SELECT
    c.category_name,
    SUM(p.price * p.stock_qty) AS total_value
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name
ORDER BY total_value DESC;

-- =============================================
-- 5. HAVING — Filter grouped results
-- =============================================

-- Q10: Categories with more than 2 products
SELECT
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name
HAVING product_count > 2;

-- Q11: Categories where average price exceeds 500
SELECT
    c.category_name,
    ROUND(AVG(p.price), 2) AS avg_price
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name
HAVING avg_price > 500;
```

### Expected Output

**Q1 — Products sorted by price DESC (first 3):**
```
+-------------------+---------+
| product_name      | price   |
+-------------------+---------+
| Dell XPS 15       | 1499.00 |
| Lenovo ThinkPad X1| 1399.00 |
| MacBook Air M2    | 1299.00 |
+-------------------+---------+
```

**Q3 — Top 5 most expensive:**
```
+-------------------+---------+
| product_name      | price   |
+-------------------+---------+
| Dell XPS 15       | 1499.00 |
| Lenovo ThinkPad X1| 1399.00 |
| MacBook Air M2    | 1299.00 |
| iPhone 15         | 1098.90 |
| Samsung Galaxy S24|  849.00 |
+-------------------+---------+
```

**Q7 — Products per category:**
```
+---------------+----------------+
| category_name | product_count  |
+---------------+----------------+
| Laptops       | 3              |
| Smartphones   | 3              |
| Accessories   | 2              |
| Audio         | 2              |
+---------------+----------------+
```

**Q10 — Categories with more than 2 products:**
```
+---------------+----------------+
| category_name | product_count  |
+---------------+----------------+
| Laptops       | 3              |
| Smartphones   | 3              |
+---------------+----------------+
```

### Self-Check
- [ ] `ORDER BY ... DESC` correctly sorts from highest to lowest
- [ ] `LIMIT 5` returns exactly 5 rows
- [ ] `LIMIT 3 OFFSET 3` correctly returns "page 2" of results
- [ ] `LIKE` pattern matching works for partial name searches
- [ ] `COUNT()` with `GROUP BY` counts products per category
- [ ] `AVG()`, `MIN()`, `MAX()` aggregate functions work correctly
- [ ] `SUM(price * stock_qty)` calculates total inventory value
- [ ] `HAVING` filters groups after aggregation (unlike `WHERE`)

---

## Exercise C: "Reporting" (Challenge / Bonus)

### Task Description
Write analytical SQL queries to generate **business reports** from the `shop_db` database. This exercise combines aggregate functions, subqueries, `CASE` expressions, and complex conditions to produce real-world insights.

### Step-by-Step Instructions
1. Continue using the `shop_db` database.
2. Write queries for each report below.
3. Think about how these queries would be used in a PHP admin dashboard.

### Starter Code

```sql
-- =============================================
-- Session 5 — Exercise C: Reporting Queries
-- =============================================

USE shop_db;

-- =============================================
-- Report 1: Total Inventory Value
-- =============================================
-- Calculate the total value of all products in stock
-- Formula: SUM(price × stock_qty) for all active products

SELECT
    'Total Inventory' AS report_name,
    COUNT(*)          AS total_products,
    SUM(stock_qty)    AS total_units,
    CONCAT('$', FORMAT(SUM(price * stock_qty), 2)) AS total_value
FROM products
WHERE is_active = 1;

-- =============================================
-- Report 2: Almost Out-of-Stock (≤ 20 units)
-- =============================================
-- Find products that need restocking

SELECT
    p.product_name,
    p.stock_qty,
    c.category_name,
    CASE
        WHEN p.stock_qty = 0  THEN '🔴 OUT OF STOCK'
        WHEN p.stock_qty <= 10 THEN '🟡 LOW STOCK'
        WHEN p.stock_qty <= 20 THEN '🟠 NEEDS RESTOCK'
        ELSE '🟢 IN STOCK'
    END AS stock_status
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.stock_qty <= 20
ORDER BY p.stock_qty ASC;

-- =============================================
-- Report 3: Products Ranked by Price within Category
-- =============================================
-- Rank products by price within each category using a variable

SELECT
    c.category_name,
    p.product_name,
    p.price,
    @rank := IF(@current_cat = p.category_id, @rank + 1, 1) AS price_rank,
    @current_cat := p.category_id AS cat
FROM products p
JOIN categories c ON p.category_id = c.category_id,
     (SELECT @rank := 0, @current_cat := 0) AS vars
ORDER BY c.category_name, p.price DESC;

-- =============================================
-- Report 4: Price Distribution Summary
-- =============================================
-- Group products into price ranges

SELECT
    CASE
        WHEN price < 100   THEN 'Under $100'
        WHEN price < 500   THEN '$100 – $499'
        WHEN price < 1000  THEN '$500 – $999'
        WHEN price < 1500  THEN '$1000 – $1499'
        ELSE '$1500+'
    END AS price_range,
    COUNT(*)  AS product_count,
    CONCAT('$', FORMAT(MIN(price), 2)) AS min_price,
    CONCAT('$', FORMAT(MAX(price), 2)) AS max_price
FROM products
WHERE is_active = 1
GROUP BY price_range
ORDER BY MIN(price);

-- =============================================
-- Report 5: Category Performance Dashboard
-- =============================================
-- A single comprehensive report per category

SELECT
    c.category_name,
    COUNT(p.product_id)                                  AS num_products,
    CONCAT('$', FORMAT(AVG(p.price), 2))                AS avg_price,
    CONCAT('$', FORMAT(MIN(p.price), 2))                AS cheapest,
    CONCAT('$', FORMAT(MAX(p.price), 2))                AS most_expensive,
    SUM(p.stock_qty)                                     AS total_stock,
    CONCAT('$', FORMAT(SUM(p.price * p.stock_qty), 2))  AS inventory_value
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id AND p.is_active = 1
GROUP BY c.category_id, c.category_name
ORDER BY inventory_value DESC;

-- =============================================
-- Report 6: Top 3 Products by Inventory Value
-- =============================================

SELECT
    p.product_name,
    p.price,
    p.stock_qty,
    CONCAT('$', FORMAT(p.price * p.stock_qty, 2)) AS inventory_value
FROM products p
WHERE p.is_active = 1
ORDER BY (p.price * p.stock_qty) DESC
LIMIT 3;
```

### Expected Output

**Report 1 — Total Inventory:**
```
+------------------+----------------+-------------+-------------+
| report_name      | total_products | total_units | total_value |
+------------------+----------------+-------------+-------------+
| Total Inventory  | 8              | 500         | $523,270.00 |
+------------------+----------------+-------------+-------------+
```

**Report 2 — Almost Out-of-Stock:**
```
+--------------------+-----------+---------------+------------------+
| product_name       | stock_qty | category_name | stock_status     |
+--------------------+-----------+---------------+------------------+
| Dell XPS 15        | 15        | Laptops       | 🟠 NEEDS RESTOCK |
+--------------------+-----------+---------------+------------------+
```

**Report 4 — Price Distribution:**
```
+-----------------+---------------+-----------+-------------+
| price_range     | product_count | min_price | max_price   |
+-----------------+---------------+-----------+-------------+
| Under $100      | 2             | $49.00    | $99.00      |
| $100 – $499     | 2             | $249.00   | $349.00     |
| $500 – $999     | 2             | $699.00   | $849.00     |
| $1000 – $1499   | 3             | $1,098.90 | $1,499.00   |
+-----------------+---------------+-----------+-------------+
```

### Self-Check
- [ ] Report 1 calculates total inventory value using `SUM(price * stock_qty)`
- [ ] Report 2 uses `CASE` to create stock status labels
- [ ] Report 3 ranks products within each category (uses session variables)
- [ ] Report 4 groups products into price ranges using `CASE`
- [ ] Report 5 combines multiple aggregates into a dashboard view
- [ ] Report 6 correctly uses `ORDER BY` with a calculated column and `LIMIT 3`
- [ ] All queries run without errors in phpMyAdmin

---

## Submission Checklist
- [ ] **Exercise A:** `session05_exercise.sql` contains all CRUD operations (INSERT, SELECT, UPDATE, DELETE)
- [ ] **Exercise B:** Advanced queries with ORDER BY, LIMIT/OFFSET, LIKE, GROUP BY, HAVING
- [ ] **Exercise C:** Reporting queries with aggregate functions, CASE, subqueries *(bonus)*
- [ ] SQL file is saved as `session05_exercise.sql`
- [ ] All queries have been tested in phpMyAdmin and produce correct results
- [ ] SQL file is uploaded to LMS before the deadline

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and queries run correctly | 4 | ☐ |
| **Exercise B** submitted and queries run correctly | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if SQL runs without errors, queries return correct results
- Deduct 2 pts if SQL does not run (syntax errors)
- Deduct 1 pt if queries return incomplete or incorrect results
