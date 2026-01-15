# 🟩 BUỔI 07
# **ADVANCED SQL - SQL NÂNG CAO**

Hôm nay chúng ta sẽ học các kỹ thuật SQL nâng cao: JOINs, Subqueries, và GROUP BY!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
🎯 Mục tiêu:
   - Sử dụng các loại JOIN
   - Viết Subqueries
   - GROUP BY và HAVING
   - Views và Indexes

🔗 Learning Outcomes: LO4
```

---

# LÝ THUYẾT

## 1. JOIN - KẾT NỐI BẢNG

### 1.1 INNER JOIN

Lấy records có trong CẢ HAI bảng.

```sql
-- Lấy products với tên category
SELECT 
    p.id,
    p.name AS product_name,
    p.price,
    c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id;
```

### 1.2 LEFT JOIN

Lấy TẤT CẢ records từ bảng trái, kể cả không có match.

```sql
-- Lấy tất cả products, kể cả không có category
SELECT 
    p.name AS product_name,
    c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

### 1.3 RIGHT JOIN

Lấy TẤT CẢ records từ bảng phải.

```sql
-- Lấy tất cả categories, kể cả không có products
SELECT 
    c.name AS category_name,
    p.name AS product_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id;
```

### 1.4 Multiple JOINs

```sql
-- Orders với customer và products
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

### 2.1 Subquery trong WHERE

```sql
-- Sản phẩm có giá cao hơn trung bình
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Khách hàng đã mua hàng
SELECT * FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);
```

### 2.2 Subquery trong FROM

```sql
-- Top categories theo doanh thu
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

## 3. GROUP BY VÀ HAVING

### 3.1 GROUP BY

```sql
-- Đếm products theo category
SELECT 
    category_id,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category_id;
```

### 3.2 HAVING (Lọc sau GROUP BY)

```sql
-- Categories có nhiều hơn 5 products
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
-- Tạo View
CREATE VIEW product_summary AS
SELECT 
    p.id,
    p.name,
    p.price,
    c.name AS category_name,
    p.stock
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Sử dụng View
SELECT * FROM product_summary WHERE price > 100;

-- Xóa View
DROP VIEW product_summary;
```

---

## 5. INDEX

```sql
-- Tạo Index
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category_id);

-- Index nhiều cột
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Xem Indexes
SHOW INDEX FROM products;

-- Xóa Index
DROP INDEX idx_products_name ON products;
```

---

# VÍ DỤ THỰC TẾ

```sql
-- Báo cáo doanh thu theo tháng
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

-- Top 10 sản phẩm bán chạy
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

# THỰC HÀNH

## BÀI 1: JOIN Queries

📝 **Yêu cầu:**
1. Lấy danh sách orders với thông tin customer
2. Lấy products với category name
3. Lấy categories không có products

---

## BÀI 2: Báo Cáo Thống Kê

📝 **Yêu cầu:**
1. Doanh thu theo category
2. Top 5 khách hàng mua nhiều nhất
3. Sản phẩm chưa bán được

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Sử dụng được các loại JOIN
- [ ] Viết được Subqueries
- [ ] Sử dụng GROUP BY và HAVING
- [ ] Tạo Views và Indexes

---

**Chương tiếp theo: [Buổi 08 - Review & Midterm →](../buoi_08_review_midterm.md)**
