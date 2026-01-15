# 🟨 BUỔI 10
# **PHP + MySQL - KẾT NỐI DATABASE**

Hôm nay chúng ta sẽ học cách kết nối PHP với MySQL để xây dựng ứng dụng web động!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Kết nối PHP với MySQL
   - Sử dụng PDO
   - Thực hiện CRUD operations
   - Prepared Statements

🔗 Learning Outcomes: LO5
```

---

# LÝ THUYẾT

## 1. KẾT NỐI DATABASE

### 1.1 Sử Dụng PDO (Khuyến nghị)

```php
<?php
$host = 'localhost';
$dbname = 'test_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
    echo "Kết nối thành công!";
} catch (PDOException $e) {
    die("Lỗi kết nối: " . $e->getMessage());
}
?>
```

### 1.2 File Config

```php
<?php
// config/database.php
return [
    'host' => 'localhost',
    'dbname' => 'test_db',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4'
];

// Sử dụng
$config = require 'config/database.php';
$dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
$pdo = new PDO($dsn, $config['username'], $config['password']);
?>
```

---

## 2. CRUD OPERATIONS

### 2.1 CREATE (Insert)

```php
<?php
// Insert một record
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);

// Lấy ID vừa insert
$lastId = $pdo->lastInsertId();

// Named parameters
$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':name' => $name,
    ':email' => $email
]);
?>
```

### 2.2 READ (Select)

```php
<?php
// Lấy tất cả
$sql = "SELECT * FROM users";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll();

// Lấy một record
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$user = $stmt->fetch();

// Lấy với điều kiện
$sql = "SELECT * FROM users WHERE status = ? AND role = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute(['active', 'admin']);
$users = $stmt->fetchAll();

// Đếm records
$sql = "SELECT COUNT(*) FROM users";
$count = $pdo->query($sql)->fetchColumn();
?>
```

### 2.3 UPDATE

```php
<?php
$sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, $id]);

// Kiểm tra số rows affected
$rowCount = $stmt->rowCount();
if ($rowCount > 0) {
    echo "Cập nhật thành công!";
}
?>
```

### 2.4 DELETE

```php
<?php
$sql = "DELETE FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

if ($stmt->rowCount() > 0) {
    echo "Xóa thành công!";
}
?>
```

---

## 3. DATABASE CLASS

```php
<?php
// classes/Database.php
class Database {
    private static $instance = null;
    private $pdo;
    
    private function __construct() {
        $config = require 'config/database.php';
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
    
    public function getConnection() {
        return $this->pdo;
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
    
    public function insert($table, $data) {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $this->query($sql, array_values($data));
        
        return $this->pdo->lastInsertId();
    }
    
    public function update($table, $data, $where, $whereParams = []) {
        $set = implode(' = ?, ', array_keys($data)) . ' = ?';
        $sql = "UPDATE $table SET $set WHERE $where";
        
        return $this->query($sql, array_merge(array_values($data), $whereParams))->rowCount();
    }
    
    public function delete($table, $where, $params = []) {
        $sql = "DELETE FROM $table WHERE $where";
        return $this->query($sql, $params)->rowCount();
    }
}

// Sử dụng
$db = Database::getInstance();

// Insert
$id = $db->insert('users', [
    'name' => 'John',
    'email' => 'john@email.com'
]);

// Select
$users = $db->fetchAll("SELECT * FROM users WHERE status = ?", ['active']);
$user = $db->fetch("SELECT * FROM users WHERE id = ?", [1]);

// Update
$db->update('users', ['name' => 'Jane'], 'id = ?', [1]);

// Delete
$db->delete('users', 'id = ?', [1]);
?>
```

---

## 4. VÍ DỤ CRUD HOÀN CHỈNH

### 4.1 Danh Sách Users

```php
<?php
// users/index.php
require_once 'classes/Database.php';

$db = Database::getInstance();
$users = $db->fetchAll("SELECT * FROM users ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Quản Lý Users</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; border: 1px solid #ddd; }
        th { background: #4CAF50; color: white; }
        .btn { padding: 5px 10px; text-decoration: none; border-radius: 3px; }
        .btn-edit { background: #2196F3; color: white; }
        .btn-delete { background: #f44336; color: white; }
        .btn-add { background: #4CAF50; color: white; margin-bottom: 20px; display: inline-block; }
    </style>
</head>
<body>
    <h1>Quản Lý Users</h1>
    
    <a href="create.php" class="btn btn-add">+ Thêm User</a>
    
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
        </tr>
        <?php foreach ($users as $user): ?>
        <tr>
            <td><?= $user['id'] ?></td>
            <td><?= htmlspecialchars($user['name']) ?></td>
            <td><?= htmlspecialchars($user['email']) ?></td>
            <td><?= $user['created_at'] ?></td>
            <td>
                <a href="edit.php?id=<?= $user['id'] ?>" class="btn btn-edit">Sửa</a>
                <a href="delete.php?id=<?= $user['id'] ?>" class="btn btn-delete" 
                   onclick="return confirm('Bạn chắc chắn muốn xóa?')">Xóa</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
```

### 4.2 Thêm User

```php
<?php
// users/create.php
require_once 'classes/Database.php';

$errors = [];
$name = $email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    // Validate
    if (empty($name)) $errors['name'] = "Name is required";
    if (empty($email)) $errors['email'] = "Email is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = "Invalid email";
    if (strlen($password) < 6) $errors['password'] = "Password min 6 chars";
    
    if (empty($errors)) {
        $db = Database::getInstance();
        
        // Check email exists
        $existing = $db->fetch("SELECT id FROM users WHERE email = ?", [$email]);
        if ($existing) {
            $errors['email'] = "Email already exists";
        } else {
            $db->insert('users', [
                'name' => $name,
                'email' => $email,
                'password' => password_hash($password, PASSWORD_DEFAULT)
            ]);
            
            header('Location: index.php?success=1');
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Thêm User</title></head>
<body>
    <h1>Thêm User Mới</h1>
    
    <form method="POST">
        <div>
            <label>Name:</label>
            <input type="text" name="name" value="<?= htmlspecialchars($name) ?>">
            <?php if (isset($errors['name'])): ?>
                <span style="color:red"><?= $errors['name'] ?></span>
            <?php endif; ?>
        </div>
        
        <div>
            <label>Email:</label>
            <input type="email" name="email" value="<?= htmlspecialchars($email) ?>">
            <?php if (isset($errors['email'])): ?>
                <span style="color:red"><?= $errors['email'] ?></span>
            <?php endif; ?>
        </div>
        
        <div>
            <label>Password:</label>
            <input type="password" name="password">
            <?php if (isset($errors['password'])): ?>
                <span style="color:red"><?= $errors['password'] ?></span>
            <?php endif; ?>
        </div>
        
        <button type="submit">Thêm</button>
        <a href="index.php">Hủy</a>
    </form>
</body>
</html>
```

---

# THỰC HÀNH

## BÀI 1: CRUD Products

📝 **Yêu cầu:**
- Danh sách products
- Thêm, sửa, xóa product
- Tìm kiếm theo tên

## BÀI 2: Phân Trang

📝 **Yêu cầu:**
- Hiển thị 10 records/trang
- Navigation (Previous, Next, Page numbers)

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Kết nối PHP với MySQL
- [ ] Sử dụng PDO và Prepared Statements
- [ ] Thực hiện CRUD operations
- [ ] Xây dựng Database class

---

**Chương tiếp theo: [Buổi 11 - Programming Techniques →](./buoi_11_programming_techniques.md)**
