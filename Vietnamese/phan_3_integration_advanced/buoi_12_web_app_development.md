# 🟨 BUỔI 12
# **WEB APPLICATION DEVELOPMENT - PHÁT TRIỂN ỨNG DỤNG WEB**

Hôm nay chúng ta sẽ xây dựng một Mini Project hoàn chỉnh!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Xây dựng ứng dụng CRUD hoàn chỉnh
   - Tích hợp các kiến thức đã học
   - Best practices

🔗 Learning Outcomes: LO2, LO5
```

---

# MINI PROJECT: PRODUCT MANAGEMENT

## 1. CẤU TRÚC DỰ ÁN

```
product_management/
├── config/
│   └── database.php
├── classes/
│   └── Database.php
├── includes/
│   ├── header.php
│   └── footer.php
├── products/
│   ├── index.php
│   ├── create.php
│   ├── edit.php
│   └── delete.php
├── assets/
│   └── css/
│       └── style.css
└── index.php
```

## 2. DATABASE

```sql
CREATE DATABASE product_management;
USE product_management;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    category_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Sample data
INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books');
INSERT INTO products (name, price, stock, category_id) VALUES
('Laptop', 999.99, 10, 1),
('T-Shirt', 19.99, 50, 2),
('PHP Book', 39.99, 20, 3);
```

## 3. CODE CHÍNH

### 3.1 Config

```php
<?php
// config/database.php
return [
    'host' => 'localhost',
    'dbname' => 'product_management',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4'
];
```

### 3.2 Database Class

```php
<?php
// classes/Database.php
class Database {
    private static $instance = null;
    private $pdo;
    
    private function __construct() {
        $config = require __DIR__ . '/../config/database.php';
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        
        $this->pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function lastInsertId() {
        return $this->pdo->lastInsertId();
    }
}
```

### 3.3 Header

```php
<?php
// includes/header.php
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?? 'Product Management' ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .navbar { margin-bottom: 20px; }
        .card { margin-bottom: 20px; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="/product_management/">🛒 Product Management</a>
            <div class="navbar-nav">
                <a class="nav-link" href="/product_management/products/">Products</a>
                <a class="nav-link" href="/product_management/products/create.php">Add Product</a>
            </div>
        </div>
    </nav>
    <div class="container">
```

### 3.4 Footer

```php
<?php
// includes/footer.php
?>
    </div>
    <footer class="text-center mt-5 py-3 bg-light">
        <p>&copy; <?= date('Y') ?> Product Management - INS3064</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 3.5 Products List

```php
<?php
// products/index.php
require_once '../classes/Database.php';

$db = Database::getInstance();

// Search
$search = $_GET['search'] ?? '';
$category = $_GET['category'] ?? '';

$sql = "SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE 1=1";
$params = [];

if ($search) {
    $sql .= " AND p.name LIKE ?";
    $params[] = "%$search%";
}

if ($category) {
    $sql .= " AND p.category_id = ?";
    $params[] = $category;
}

$sql .= " ORDER BY p.created_at DESC";
$products = $db->fetchAll($sql, $params);
$categories = $db->fetchAll("SELECT * FROM categories");

$pageTitle = "Products";
include '../includes/header.php';
?>

<h1>📦 Products</h1>

<?php if (isset($_GET['success'])): ?>
    <div class="alert alert-success">Operation successful!</div>
<?php endif; ?>

<!-- Search Form -->
<div class="card">
    <div class="card-body">
        <form method="GET" class="row g-3">
            <div class="col-md-4">
                <input type="text" name="search" class="form-control" 
                       placeholder="Search..." value="<?= htmlspecialchars($search) ?>">
            </div>
            <div class="col-md-3">
                <select name="category" class="form-select">
                    <option value="">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= $cat['id'] ?>" <?= $category == $cat['id'] ? 'selected' : '' ?>>
                            <?= htmlspecialchars($cat['name']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Search</button>
                <a href="index.php" class="btn btn-secondary">Reset</a>
            </div>
        </form>
    </div>
</div>

<!-- Products Table -->
<div class="card">
    <div class="card-header d-flex justify-content-between">
        <span>Products (<?= count($products) ?>)</span>
        <a href="create.php" class="btn btn-success btn-sm">+ Add Product</a>
    </div>
    <div class="card-body">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($products as $product): ?>
                <tr>
                    <td><?= $product['id'] ?></td>
                    <td><?= htmlspecialchars($product['name']) ?></td>
                    <td><?= htmlspecialchars($product['category_name'] ?? 'N/A') ?></td>
                    <td>$<?= number_format($product['price'], 2) ?></td>
                    <td>
                        <span class="badge <?= $product['stock'] > 0 ? 'bg-success' : 'bg-danger' ?>">
                            <?= $product['stock'] ?>
                        </span>
                    </td>
                    <td>
                        <a href="edit.php?id=<?= $product['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                        <a href="delete.php?id=<?= $product['id'] ?>" class="btn btn-sm btn-danger"
                           onclick="return confirm('Delete this product?')">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
```

### 3.6 Create Product

```php
<?php
// products/create.php
require_once '../classes/Database.php';

$db = Database::getInstance();
$categories = $db->fetchAll("SELECT * FROM categories");

$errors = [];
$data = ['name' => '', 'description' => '', 'price' => '', 'stock' => '', 'category_id' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'name' => trim($_POST['name'] ?? ''),
        'description' => trim($_POST['description'] ?? ''),
        'price' => $_POST['price'] ?? '',
        'stock' => $_POST['stock'] ?? 0,
        'category_id' => $_POST['category_id'] ?? null
    ];
    
    // Validation
    if (empty($data['name'])) $errors['name'] = "Name is required";
    if (!is_numeric($data['price']) || $data['price'] <= 0) $errors['price'] = "Valid price required";
    
    if (empty($errors)) {
        $sql = "INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)";
        $db->query($sql, [
            $data['name'],
            $data['description'],
            $data['price'],
            $data['stock'],
            $data['category_id'] ?: null
        ]);
        
        header('Location: index.php?success=1');
        exit;
    }
}

$pageTitle = "Add Product";
include '../includes/header.php';
?>

<h1>➕ Add Product</h1>

<div class="card">
    <div class="card-body">
        <form method="POST">
            <div class="mb-3">
                <label class="form-label">Name *</label>
                <input type="text" name="name" class="form-control <?= isset($errors['name']) ? 'is-invalid' : '' ?>"
                       value="<?= htmlspecialchars($data['name']) ?>">
                <?php if (isset($errors['name'])): ?>
                    <div class="invalid-feedback"><?= $errors['name'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3"><?= htmlspecialchars($data['description']) ?></textarea>
            </div>
            
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Price *</label>
                    <input type="number" name="price" step="0.01" class="form-control <?= isset($errors['price']) ? 'is-invalid' : '' ?>"
                           value="<?= htmlspecialchars($data['price']) ?>">
                    <?php if (isset($errors['price'])): ?>
                        <div class="invalid-feedback"><?= $errors['price'] ?></div>
                    <?php endif; ?>
                </div>
                
                <div class="col-md-4 mb-3">
                    <label class="form-label">Stock</label>
                    <input type="number" name="stock" class="form-control" value="<?= htmlspecialchars($data['stock']) ?>">
                </div>
                
                <div class="col-md-4 mb-3">
                    <label class="form-label">Category</label>
                    <select name="category_id" class="form-select">
                        <option value="">-- Select --</option>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat['id'] ?>" <?= $data['category_id'] == $cat['id'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($cat['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
```

---

# THỰC HÀNH

## BÀI: Hoàn Thiện Mini Project

📝 **Yêu cầu:**
1. Hoàn thiện Edit và Delete
2. Thêm phân trang
3. Thêm upload ảnh sản phẩm
4. Thêm thống kê dashboard

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Xây dựng được ứng dụng CRUD hoàn chỉnh
- [ ] Tích hợp PHP + MySQL
- [ ] Tổ chức code theo cấu trúc tốt

---

**Chương tiếp theo: [Buổi 13 - Cookies & Sessions →](../phan_4_security_jquery/buoi_13_cookies_sessions.md)**
