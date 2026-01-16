# 🟨 BUỔI 11
# **PROGRAMMING TECHNIQUES - KỸ THUẬT LẬP TRÌNH**

Hôm nay chúng ta sẽ học OOP và MVC Pattern để code chuyên nghiệp hơn!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - OOP trong PHP
   - MVC Pattern
   - Autoloading
   - Code organization

🔗 Learning Outcomes: LO5
```

---

# LÝ THUYẾT

## 1. OOP TRONG PHP

### 1.1 Class và Object

```php
<?php
class User {
    // Properties
    private $id;
    private $name;
    private $email;
    
    // Constructor
    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }
    
    // Getters
    public function getName() {
        return $this->name;
    }
    
    public function getEmail() {
        return $this->email;
    }
    
    // Setters
    public function setName($name) {
        $this->name = $name;
    }
    
    // Methods
    public function getInfo() {
        return "Name: {$this->name}, Email: {$this->email}";
    }
}

// Sử dụng
$user = new User("John", "john@email.com");
echo $user->getName();
echo $user->getInfo();
?>
```

### 1.2 Inheritance (Kế thừa)

```php
<?php
class Person {
    protected $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function greet() {
        return "Hello, I'm {$this->name}";
    }
}

class Student extends Person {
    private $studentId;
    
    public function __construct($name, $studentId) {
        parent::__construct($name);
        $this->studentId = $studentId;
    }
    
    public function greet() {
        return parent::greet() . ", Student ID: {$this->studentId}";
    }
}

$student = new Student("John", "SV001");
echo $student->greet();
?>
```

### 1.3 Interface

```php
<?php
interface Authenticatable {
    public function login($email, $password);
    public function logout();
    public function isAuthenticated();
}

class User implements Authenticatable {
    public function login($email, $password) {
        // Implementation
    }
    
    public function logout() {
        // Implementation
    }
    
    public function isAuthenticated() {
        // Implementation
    }
}
?>
```

### 1.4 Abstract Class

```php
<?php
abstract class Model {
    protected $table;
    protected $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    abstract public function validate($data);
    
    public function all() {
        return $this->db->fetchAll("SELECT * FROM {$this->table}");
    }
    
    public function find($id) {
        return $this->db->fetch("SELECT * FROM {$this->table} WHERE id = ?", [$id]);
    }
}

class UserModel extends Model {
    protected $table = 'users';
    
    public function validate($data) {
        $errors = [];
        if (empty($data['name'])) $errors['name'] = "Name required";
        if (empty($data['email'])) $errors['email'] = "Email required";
        return $errors;
    }
}
?>
```

---

## 2. MVC PATTERN

### 2.1 Cấu Trúc MVC

```
project/
├── app/
│   ├── Controllers/
│   │   ├── HomeController.php
│   │   └── UserController.php
│   ├── Models/
│   │   └── User.php
│   └── Views/
│       ├── layouts/
│       │   └── main.php
│       └── users/
│           ├── index.php
│           └── create.php
├── config/
│   └── database.php
├── public/
│   └── index.php
└── core/
    ├── Controller.php
    ├── Model.php
    └── Router.php
```

### 2.2 Base Controller

```php
<?php
// core/Controller.php
class Controller {
    protected function view($view, $data = []) {
        extract($data);
        $content = "app/Views/$view.php";
        require "app/Views/layouts/main.php";
    }
    
    protected function redirect($url) {
        header("Location: $url");
        exit;
    }
    
    protected function json($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
?>
```

### 2.3 User Controller

```php
<?php
// app/Controllers/UserController.php
class UserController extends Controller {
    private $userModel;
    
    public function __construct() {
        $this->userModel = new UserModel();
    }
    
    public function index() {
        $users = $this->userModel->all();
        $this->view('users/index', ['users' => $users]);
    }
    
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'name' => $_POST['name'] ?? '',
                'email' => $_POST['email'] ?? ''
            ];
            
            $errors = $this->userModel->validate($data);
            
            if (empty($errors)) {
                $this->userModel->create($data);
                $this->redirect('/users');
            }
            
            $this->view('users/create', ['errors' => $errors, 'data' => $data]);
        } else {
            $this->view('users/create');
        }
    }
    
    public function show($id) {
        $user = $this->userModel->find($id);
        if (!$user) {
            $this->redirect('/users');
        }
        $this->view('users/show', ['user' => $user]);
    }
}
?>
```

### 2.4 Simple Router

```php
<?php
// core/Router.php
class Router {
    private $routes = [];
    
    public function get($path, $callback) {
        $this->routes['GET'][$path] = $callback;
    }
    
    public function post($path, $callback) {
        $this->routes['POST'][$path] = $callback;
    }
    
    public function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        if (isset($this->routes[$method][$path])) {
            $callback = $this->routes[$method][$path];
            
            if (is_callable($callback)) {
                call_user_func($callback);
            } elseif (is_string($callback)) {
                list($controller, $action) = explode('@', $callback);
                $controller = new $controller();
                $controller->$action();
            }
        } else {
            http_response_code(404);
            echo "404 Not Found";
        }
    }
}

// public/index.php
require_once '../core/Router.php';
require_once '../app/Controllers/UserController.php';

$router = new Router();

$router->get('/', 'HomeController@index');
$router->get('/users', 'UserController@index');
$router->get('/users/create', 'UserController@create');
$router->post('/users/create', 'UserController@create');

$router->dispatch();
?>
```

---

## 3. AUTOLOADING

```php
<?php
// autoload.php
spl_autoload_register(function ($class) {
    $paths = [
        'app/Controllers/',
        'app/Models/',
        'core/'
    ];
    
    foreach ($paths as $path) {
        $file = $path . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});
?>
```

---

# THỰC HÀNH

## BÀI 1: Tạo Model Class

📝 **Yêu cầu:**
- Base Model với CRUD methods
- ProductModel extends Model
- Validation methods

## BÀI 2: MVC Mini Project

📝 **Yêu cầu:**
- Cấu trúc MVC
- CRUD Products
- Simple routing

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Hiểu OOP trong PHP
- [ ] Áp dụng MVC Pattern
- [ ] Tổ chức code chuyên nghiệp

---

**Chương tiếp theo: [Buổi 12 - Web App Development →](./buoi_12_web_app_development.md)**
