# 🟨 SESSION 10
# **PHP + MySQL**

In this session, we will learn how to connect PHP with MySQL using **PDO**, and how to build real CRUD features backed by a database.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 10 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Connect PHP to MySQL
   - Use PDO for database operations
   - Perform CRUD operations
   - Use prepared statements

🔗 Links to Learning Outcomes: LO5
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- **Connect PHP to MySQL** database
- Use **PDO** (PHP Data Objects) for database operations
- Perform **CRUD operations**: Create, Read, Update, Delete
- Use **prepared statements** for security
- Build a reusable **Database class**

---

# THEORY

## 1. DATABASE CONNECTION

### 1.1 Using PDO (Recommended)

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
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
    echo "Connection successful!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
```

### 1.2 Config File

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

// Usage
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
// Insert a single record
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);

// Get last inserted ID
$lastId = $pdo->lastInsertId();

// Named parameters
$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':name' => $name,
    ':email' => $email,
]);
?>
```

### 2.2 READ (Select)

```php
<?php
// Get all
$sql = "SELECT * FROM users";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll();

// Get one record
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$user = $stmt->fetch();

// Get with conditions
$sql = "SELECT * FROM users WHERE status = ? AND role = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute(['active', 'admin']);
$admins = $stmt->fetchAll();

// Count records
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

// Check affected rows
$rowCount = $stmt->rowCount();
if ($rowCount > 0) {
    echo "Update successful!";
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
    echo "Delete successful!";
}
?>
```

---

## 3. DATABASE CLASS

```php
<?php
// classes/Database.php
class Database {
    private static ?Database $instance = null;
    private PDO $pdo;
    
    private function __construct() {
        $config = require 'config/database.php';
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        
        $this->pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection(): PDO {
        return $this->pdo;
    }
    
    public function query(string $sql, array $params = []): PDOStatement {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetchAll(string $sql, array $params = []): array {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function fetch(string $sql, array $params = []): array|false {
        return $this->query($sql, $params)->fetch();
    }
    
    public function insert(string $table, array $data): string {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $this->query($sql, array_values($data));
        
        return $this->pdo->lastInsertId();
    }
    
    public function update(string $table, array $data, string $where, array $whereParams = []): int {
        $set = implode(' = ?, ', array_keys($data)) . ' = ?';
        $sql = "UPDATE $table SET $set WHERE $where";
        
        return $this->query($sql, array_merge(array_values($data), $whereParams))->rowCount();
    }
    
    public function delete(string $table, string $where, array $params = []): int {
        $sql = "DELETE FROM $table WHERE $where";
        return $this->query($sql, $params)->rowCount();
    }
}

// Usage example
$db = Database::getInstance();

// Insert
$id = $db->insert('users', [
    'name' => 'John',
    'email' => 'john@example.com',
]);

// Select
$users = $db->fetchAll("SELECT * FROM users WHERE status = ?", ['active']);
$user  = $db->fetch("SELECT * FROM users WHERE id = ?", [1]);

// Update
$db->update('users', ['name' => 'Jane'], 'id = ?', [1]);

// Delete
$db->delete('users', 'id = ?', [1]);
?>
```

---

## 4. COMPLETE CRUD EXAMPLE (USERS)

### 4.1 Users List

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
    <title>User Management</title>
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
    <h1>User Management</h1>
    
    <a href="create.php" class="btn btn-add">+ Add User</a>
    
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
                <a href="edit.php?id=<?= $user['id'] ?>" class="btn btn-edit">Edit</a>
                <a href="delete.php?id=<?= $user['id'] ?>" class="btn btn-delete" 
                   onclick="return confirm('Are you sure?')">Delete</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
```

### 4.2 Create User

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
    
    // Validation
    if (empty($name)) $errors['name'] = "Name is required";
    if (empty($email)) $errors['email'] = "Email is required";
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = "Invalid email";
    if (strlen($password) < 6) $errors['password'] = "Password min 6 characters";
    
    if (empty($errors)) {
        $db = Database::getInstance();
        
        // Check if email exists
        $existing = $db->fetch("SELECT id FROM users WHERE email = ?", [$email]);
        if ($existing) {
            $errors['email'] = "Email already exists";
        } else {
            $db->insert('users', [
                'name' => $name,
                'email' => $email,
                'password' => password_hash($password, PASSWORD_DEFAULT),
            ]);
            
            header('Location: index.php?success=1');
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Add User</title></head>
<body>
    <h1>Add New User</h1>
    
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
        
        <button type="submit">Save</button>
        <a href="index.php">Cancel</a>
    </form>
</body>
</html>
```

---

# PRACTICE

## EXERCISE 1: Product CRUD

📝 **Requirements:**
- Create a `products` table
- Build list page with search
- Add, edit, delete products
- Show success message after each action

## EXERCISE 2: Pagination

📝 **Requirements:**
- Show 10 records per page
- Add pagination controls (Previous, Next, page numbers)

---

# ✅ KEY TAKEAWAYS

- [ ] Connect PHP to MySQL using PDO
- [ ] Use prepared statements safely
- [ ] Implement full CRUD operations
- [ ] Build a reusable database layer

---

**Previous: [Session 09 - Error Handling ←](./session_09_error_handling.md)**  
**Next: [Session 11 - Programming Techniques →](./session_11_programming_techniques.md)**
