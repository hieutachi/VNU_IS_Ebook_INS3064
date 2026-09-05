# 🟩 SESSION 07
# **ADVANCED SQL**

In this session, we will learn **advanced SQL techniques**: JOINs, Subqueries, GROUP BY, Views, and Indexes.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 7 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Use JOINs to combine data from multiple tables
   - Write subqueries
   - Use aggregate functions
   - Create stored procedures

🔗 Links to Learning Outcomes: LO4
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Use **JOINs**: INNER JOIN, LEFT JOIN, RIGHT JOIN
- Write **subqueries**
- Use **aggregate functions**: COUNT, SUM, AVG, MAX, MIN
- Group and filter data with **GROUP BY** and **HAVING**
- Create **views** and **indexes**

---

# THEORY

## 📋 BEFORE YOU START: THE SHOP DATABASE

Every query in this chapter uses the `shop_db` tables from Session 06: `users`,
`categories`, `products`, `orders`, and `order_items`. Run this block first, in
this order — the foreign keys mean a table cannot be created before the table it
points at.

```sql
-- Setup for Session 07. Safe to run more than once.
CREATE DATABASE IF NOT EXISTS shop_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop_db;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT IGNORE INTO users (id, email, password) VALUES
(1, 'anna@example.com', 'hash1'), (2, 'ben@example.com', 'hash2');

INSERT IGNORE INTO categories (id, name, slug) VALUES
(1, 'Laptops', 'laptops'), (2, 'Phones', 'phones'), (3, 'Empty category', 'empty');

INSERT IGNORE INTO products (id, name, slug, price, stock, category_id) VALUES
(1, 'Notebook 14', 'notebook-14', 750.00, 5, 1),
(2, 'Notebook 16', 'notebook-16', 1250.00, 2, 1),
(3, 'Phone A', 'phone-a', 320.00, 10, 2),
(4, 'Unsorted gadget', 'unsorted-gadget', 90.00, 7, NULL);

INSERT IGNORE INTO orders (id, user_id, total, status) VALUES
(1, 1, 1070.00, 'delivered'), (2, 2, 320.00, 'pending');

INSERT IGNORE INTO order_items (id, order_id, product_id, quantity, price) VALUES
(1, 1, 1, 1, 750.00), (2, 1, 3, 1, 320.00), (3, 2, 3, 1, 320.00);
```

**Expected result:** `SHOW TABLES;` lists five tables. The sample rows are chosen
so the JOINs below actually show a difference: product 4 has no category, and
category 3 has no products.

---

## 1. JOIN – COMBINING TABLES

### 1.1 INNER JOIN

Returns only records that exist in **both** tables.

```sql
-- Get products with category name
SELECT 
    p.id,
    p.name AS product_name,
    p.price,
    c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id;
```

### 1.2 LEFT JOIN

Returns **all records from the left table**, even if there is no match in the right table.

```sql
-- Get all products, including those without category
SELECT 
    p.name AS product_name,
    c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

### 1.3 RIGHT JOIN

Returns **all records from the right table**, even if there is no match in the left table.

```sql
-- Get all categories, including those without products
SELECT 
    c.name AS category_name,
    p.name AS product_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id;
```

### 1.4 Multiple JOINs

```sql
-- Orders with customer and product details
SELECT 
    o.id AS order_id,
    u.email AS customer_email,
    p.name AS product_name,
    oi.quantity,
    oi.price
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.status = 'delivered';
```

---

## 2. SUBQUERIES

### 2.1 Subquery in WHERE

```sql
-- Products with price higher than average
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Customers who have placed orders
SELECT * FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);
```

### 2.2 Subquery in FROM

```sql
-- Top categories by revenue
SELECT 
    category_name,
    total_revenue
FROM (
    SELECT 
        c.name AS category_name,
        SUM(oi.price * oi.quantity) AS total_revenue
    FROM categories c
    JOIN products p ON c.id = p.category_id
    JOIN order_items oi ON p.id = oi.product_id
    GROUP BY c.id
) AS category_revenue
ORDER BY total_revenue DESC
LIMIT 5;
```

---

## 3. GROUP BY AND HAVING

### 3.1 GROUP BY

```sql
-- Count products per category
SELECT 
    category_id,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category_id;
```

### 3.2 HAVING (Filter after GROUP BY)

```sql
-- Categories with more than 5 products
SELECT 
    c.name,
    COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id
HAVING product_count > 5;
```

---

## 4. VIEWS

```sql
-- Create a View
CREATE VIEW product_summary AS
SELECT 
    p.id,
    p.name,
    p.price,
    c.name AS category_name,
    p.stock
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Use the View
SELECT * FROM product_summary WHERE price > 100;

-- Drop the View
DROP VIEW product_summary;
```

---

## 5. INDEXES

Indexes help **speed up search and filtering**, but use more storage and slow down INSERT/UPDATE/DELETE.

```sql
-- Create Indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category_id);

-- Multi-column Index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Show Indexes
SHOW INDEX FROM products;

-- Drop Index
DROP INDEX idx_products_name ON products;
```

---

# REAL-WORLD EXAMPLES

```sql
-- Revenue report by month
SELECT 
    DATE_FORMAT(o.created_at, '%Y-%m') AS month,
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT o.user_id) AS total_customers,
    SUM(oi.quantity) AS items_sold,
    SUM(oi.price * oi.quantity) AS revenue
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'delivered'
GROUP BY DATE_FORMAT(o.created_at, '%Y-%m')
ORDER BY month DESC;

-- Top 10 best-selling products
SELECT 
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.price * oi.quantity) AS revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 10;
```

---

# PRACTICE

## EXERCISE 1: JOIN Queries

📝 **Requirements:**
1. Get the list of orders with customer information
2. Get products with category name
3. Get categories that have no products

---

## EXERCISE 2: Reporting & Statistics

📝 **Requirements:**
1. Revenue by category
2. Top 5 customers by total spending
3. Products that have never been sold

---

# ✅ KEY TAKEAWAYS

- [ ] Can use different types of JOIN
- [ ] Can write subqueries
- [ ] Can use GROUP BY and HAVING
- [ ] Can create and use Views and Indexes

---

**Previous: [Session 06 - Database Design ←](./session_06_database_design.md)**  
**Next: [Session 08 - Review & Midterm →](../session_08_review_midterm.md)**
