# Session 7 — In-Class Exercise: Advanced SQL

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session07_exercise.sql`

## How to Submit
1. Save your `.sql` file as `session07_exercise.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `session07_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Write INNER JOIN, LEFT JOIN, and RIGHT JOIN queries across multiple tables
- Use subqueries to filter and compute derived data
- Apply aggregate functions (COUNT, SUM, AVG, MAX, MIN) with GROUP BY and HAVING
- Build real-world report queries combining joins, grouping, and subqueries

---

## Setup

Run this script before starting the exercises. It creates the `shop_db` database with sample data.

```sql
-- Session 07 — Setup: shop_db with sample data

DROP DATABASE IF EXISTS shop_db;
CREATE DATABASE shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop_db;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    status ENUM('pending','shipped','delivered','cancelled') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Seed data
INSERT INTO customers (full_name, email, city) VALUES
('An Nguyen',   'an@gmail.com',    'Hanoi'),
('Binh Tran',   'binh@gmail.com',  'Hanoi'),
('Chi Le',      'chi@gmail.com',   'HCMC'),
('Dung Pham',   'dung@gmail.com',  'Da Nang'),
('Emi Hoang',   'emi@gmail.com',   'HCMC'),
('Giang Vo',    'giang@gmail.com', 'Hue');

INSERT INTO categories (name, slug) VALUES
('Electronics', 'electronics'),
('Clothing',    'clothing'),
('Books',       'books'),
('Sports',      'sports'),
('Toys',        'toys');

INSERT INTO products (category_id, name, price, stock) VALUES
(1, 'Laptop',         1200.00, 15),
(1, 'Smartphone',      800.00, 30),
(1, 'Headphones',       50.00, 100),
(2, 'T-Shirt',          15.00, 200),
(2, 'Jeans',            40.00, 80),
(2, 'Jacket',           85.00, 40),
(3, 'PHP Programming',  35.00, 50),
(3, 'MySQL Cookbook',    45.00, 30),
(4, 'Football',         25.00, 60),
(4, 'Tennis Racket',    95.00, 20);

INSERT INTO orders (customer_id, order_date, status) VALUES
(1, '2024-09-15', 'delivered'),
(1, '2024-10-01', 'delivered'),
(2, '2024-09-20', 'shipped'),
(2, '2024-11-05', 'delivered'),
(3, '2024-10-10', 'delivered'),
(3, '2024-10-25', 'pending'),
(4, '2024-11-01', 'cancelled'),
(5, '2024-11-10', 'delivered'),
(5, '2024-11-15', 'shipped'),
(5, '2024-12-01', 'pending');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1,  1, 1, 1200.00),  -- An buys Laptop
(1,  3, 2,   50.00),  -- An buys 2 Headphones
(2,  2, 1,  800.00),  -- An buys Smartphone
(2,  7, 1,   35.00),  -- An buys PHP Programming
(3,  4, 3,   15.00),  -- Binh buys 3 T-Shirts
(3,  8, 1,   45.00),  -- Binh buys MySQL Cookbook
(4,  9, 2,   25.00),  -- Binh buys 2 Footballs
(5,  1, 1, 1200.00),  -- Chi buys Laptop
(5,  5, 2,   40.00),  -- Chi buys 2 Jeans
(6,  6, 1,   85.00),  -- Chi buys Jacket (pending)
(7,  9, 1,   25.00),  -- Dung buys Football (cancelled)
(8,  2, 1,  800.00),  -- Emi buys Smartphone
(8, 10, 1,   95.00),  -- Emi buys Tennis Racket
(9,  7, 2,   35.00),  -- Emi buys 2 PHP Programming
(10, 3, 1,   50.00),  -- Emi buys Headphones
(10, 4, 5,   15.00);  -- Emi buys 5 T-Shirts
```

---

## Exercise A: JOIN Queries (Required)

### Task Description

Write **six** SELECT queries using different types of JOINs. Each query must produce the exact output shown below.

### Step-by-Step Instructions

**Query 1 — Orders with Customer Info (INNER JOIN)**

Write a query that shows each order's ID, order date, status, and the customer's full name and city. Only include orders that have a matching customer.

```sql
-- Query 1: Orders with customer info
-- Expected columns: order_id, order_date, status, full_name, city
-- TODO: Write your INNER JOIN query here
```

**Expected Output (partial):**

| order_id | order_date | status    | full_name  | city     |
|----------|------------|-----------|------------|----------|
| 1        | 2024-09-15 | delivered | An Nguyen  | Hanoi    |
| 2        | 2024-10-01 | delivered | An Nguyen  | Hanoi    |
| ...      | ...        | ...       | ...        | ...      |

**Query 2 — Products with Category Name (LEFT JOIN)**

Show all products with their category name. Include products even if they have no category assigned.

```sql
-- Query 2: Products with category name (include products with no category)
-- Expected columns: product_name, price, category_name
-- TODO: Write your LEFT JOIN query here
```

**Query 3 — Categories with No Products (LEFT JOIN + IS NULL)**

List categories that have zero products assigned to them.

```sql
-- Query 3: Categories with no products
-- Expected columns: category_id, category_name
-- TODO: Write your query using LEFT JOIN and IS NULL
```

**Expected Output:**

| category_id | category_name |
|-------------|---------------|
| 5           | Toys          |

**Query 4 — Order Line Items with Product and Category**

Show each order item with the product name, category name, quantity, and line total (quantity × unit_price).

```sql
-- Query 4: Detailed order line items
-- Expected columns: order_id, product_name, category_name, quantity, unit_price, line_total
-- TODO: Write your multi-table JOIN query here
```

**Query 5 — Customers and Their Order Count (LEFT JOIN)**

List all customers and how many orders they have placed, including customers with zero orders.

```sql
-- Query 5: Customer order count
-- Expected columns: full_name, order_count
-- TODO: Use LEFT JOIN + GROUP BY
```

**Expected Output:**

| full_name   | order_count |
|-------------|-------------|
| An Nguyen   | 2           |
| Binh Tran   | 2           |
| Chi Le      | 2           |
| Dung Pham   | 1           |
| Emi Hoang   | 3           |
| Giang Vo    | 0           |

**Query 6 — Products Never Ordered (Subquery or LEFT JOIN)**

Find products that have never appeared in any order item.

```sql
-- Query 6: Products never ordered
-- Expected columns: product_id, product_name, price
-- TODO: Use a subquery with NOT IN, or LEFT JOIN + IS NULL
```

**Expected Output:**

| product_id | product_name   | price  |
|------------|----------------|--------|
| (check)    | (verify yours) |        |

### Self-Check

- [ ] Query 1 uses `INNER JOIN` and returns exactly 10 rows
- [ ] Query 2 uses `LEFT JOIN` so all products appear even if `category_id IS NULL`
- [ ] Query 3 returns "Toys" category (no products with category_id = 5)
- [ ] Query 4 computes `line_total` as `quantity * unit_price`
- [ ] Query 5 shows Giang Vo with 0 orders
- [ ] Query 6 identifies products not found in `order_items`

---

## Exercise B: Reporting with Aggregate Functions (Required)

### Task Description

Write **five** report queries using `GROUP BY`, `HAVING`, and aggregate functions to generate business insights.

### Step-by-Step Instructions

**Query 1 — Revenue by Category**

Calculate total revenue (sum of quantity × unit_price) for each category. Sort by revenue descending.

```sql
-- Query 1: Revenue by category
-- Expected columns: category_name, total_revenue
-- Expected output (approximate):
-- | Electronics | 4500.00 |
-- | Clothing    |  360.00 |
-- | Books       |  210.00 |
-- | Sports      |  145.00 |
-- TODO: JOIN products, categories, order_items → GROUP BY category
```

**Query 2 — Top 5 Customers by Total Spending**

Rank customers by their total spending (sum of quantity × unit_price across all their orders). Show the top 5.

```sql
-- Query 2: Top 5 customers by spending
-- Expected columns: full_name, total_spent, order_count
-- TODO: JOIN customers, orders, order_items → GROUP BY customer → ORDER BY total_spent DESC → LIMIT 5
```

**Query 3 — Average Order Value per Customer**

Calculate the average order value for each customer. An order's value is the sum of its line items.

```sql
-- Query 3: Average order value per customer
-- Expected columns: full_name, num_orders, avg_order_value
-- HINT: Use a subquery or derived table to first compute each order's total,
--        then average those totals per customer.
-- TODO
```

**Query 4 — Monthly Revenue Report**

Show total revenue grouped by year-month (e.g., `2024-09`, `2024-10`, etc.).

```sql
-- Query 4: Monthly revenue
-- Expected columns: month, monthly_revenue
-- HINT: Use DATE_FORMAT(order_date, '%Y-%m') to extract year-month
-- TODO
```

**Expected Output:**

| month   | monthly_revenue |
|---------|-----------------|
| 2024-09 | 1425.00         |
| 2024-10 | 1520.00         |
| 2024-11 | 1240.00         |
| 2024-12 | 125.00          |

**Query 5 — Categories with High Average Price (HAVING)**

Find categories where the average product price is greater than $50.

```sql
-- Query 5: Categories with avg price > 50
-- Expected columns: category_name, avg_price, product_count
-- HINT: GROUP BY category, then HAVING AVG(price) > 50
-- TODO
```

### Self-Check

- [ ] Query 1 includes all categories (even Toys if it has revenue from cancelled orders — think about whether to filter by status)
- [ ] Query 2 LIMITs to 5 results
- [ ] Query 3 uses a subquery or derived table for per-order totals
- [ ] Query 4 uses `DATE_FORMAT` or `YEAR()`/`MONTH()` for grouping
- [ ] Query 5 uses `HAVING`, not `WHERE`, for the aggregate condition

---

## Exercise C: Complex Queries (Challenge/Bonus)

### Task Description

Write two advanced queries that combine multiple SQL concepts.

### Step-by-Step Instructions

**Query 1 — Month-over-Month Revenue Growth**

Calculate the revenue for each month and the **percentage growth** compared to the previous month.

```sql
-- Query 1: Month-over-month revenue growth
-- Expected columns: month, monthly_revenue, prev_month_revenue, growth_pct
-- HINT: Use a self-join or window function (if MySQL 8.0+):
--
-- Approach with self-join (works on all MySQL versions):
--   1. Create a CTE or subquery with monthly totals
--   2. Self-join on month = prev_month + 1 month
--   3. Calculate: (current - previous) / previous * 100
--
-- Approach with LAG() (MySQL 8.0+):
--   SELECT month, revenue,
--          LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
--          ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) /
--                LAG(revenue) OVER (ORDER BY month) * 100, 1) AS growth_pct
--   FROM monthly_revenue_cte;

-- TODO: Write your query here
```

**Expected Output (approximate):**

| month   | monthly_revenue | prev_month_revenue | growth_pct |
|---------|-----------------|--------------------|-----------|
| 2024-09 | 1425.00         | NULL               | NULL      |
| 2024-10 | 1520.00         | 1425.00            | 6.7       |
| 2024-11 | 1240.00         | 1520.00            | -18.4     |
| 2024-12 | 125.00          | 1240.00            | -89.9     |

**Query 2 — Customers Who Bought from Every Category**

Find customers who have purchased at least one product from **every** category in the database.

```sql
-- Query 2: Customers who bought from ALL categories
-- Expected columns: customer_id, full_name
-- HINT: This is a "division" problem. Two approaches:
--
-- Approach 1: Double NOT EXISTS
--   SELECT c.id, c.full_name
--   FROM customers c
--   WHERE NOT EXISTS (
--       SELECT cat.id FROM categories cat
--       WHERE NOT EXISTS (
--           SELECT 1 FROM orders o
--           JOIN order_items oi ON o.id = oi.order_id
--           JOIN products p ON oi.product_id = p.id
--           WHERE o.customer_id = c.id AND p.category_id = cat.id
--       )
--   );
--
-- Approach 2: GROUP BY + HAVING COUNT(DISTINCT ...) = (SELECT COUNT(*) FROM categories)

-- TODO: Write your query here (use either approach)
```

### Self-Check

- [ ] Query 1 shows `NULL` for the first month's previous revenue and growth
- [ ] Query 1 correctly calculates the percentage (not just difference)
- [ ] Query 2 returns only customers who bought from ALL categories (including cancelled orders? — decide and document your choice)
- [ ] Both queries run without errors

---

## Submission Checklist

- [ ] Exercise A: All 6 JOIN queries written and return correct results
- [ ] Exercise B: All 5 aggregate/report queries written and return correct results
- [ ] Exercise C: Both advanced queries attempted (bonus if working)
- [ ] Setup script runs without errors before the exercises
- [ ] Each query has a comment explaining what it does
- [ ] File saved as `session07_exercise.sql` and uploaded to LMS

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and queries return correct results | 4 | ☐ |
| **Exercise B** submitted and queries return correct results | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if SQL runs without errors, JOIN/aggregate queries return correct results
- Deduct 2 pts if SQL does not run (syntax errors)
- Deduct 1 pt if queries return incomplete or incorrect results
