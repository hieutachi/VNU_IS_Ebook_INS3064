# 🟨 SESSION 11
# **PROGRAMMING TECHNIQUES**

In this session, we will learn advanced programming techniques in PHP: **Object-Oriented Programming (OOP)** and the **MVC pattern** to write cleaner, more maintainable code.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 11 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand OOP concepts in PHP
   - Create classes and objects
   - Understand MVC pattern
   - Organize code structure

🔗 Links to Learning Outcomes: LO5
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Understand **OOP concepts**: classes, objects, inheritance
- Create **classes and objects** in PHP
- Understand **MVC pattern** (Model-View-Controller)
- **Organize code** structure effectively
- Apply best practices in PHP programming

---

# THEORY

## 1. OOP IN PHP

### 1.1 Class and Object

```php
<?php
class User {
    // Properties
    private int $id;
    private string $name;
    private string $email;
    
    // Constructor
    public function __construct(string $name, string $email) {
        $this->name = $name;
        $this->email = $email;
    }
    
    // Getters
    public function getName(): string {
        return $this->name;
    }
    
    public function getEmail(): string {
        return $this->email;
    }
    
    // Setters
    public function setName(string $name): void {
        $this->name = $name;
    }
    
    // Methods
    public function getInfo(): string {
        return "Name: {$this->name}, Email: {$this->email}";
    }
}

// Usage
$user = new User("John", "john@example.com");
echo $user->getName();
echo $user->getInfo();
?>
```

### 1.2 Inheritance

```php
<?php
class Person {
    protected string $name;
    
    public function __construct(string $name) {
        $this->name = $name;
    }
    
    public function greet(): string {
        return "Hello, I'm {$this->name}";
    }
}

class Student extends Person {
    private string $studentId;
    
    public function __construct(string $name, string $studentId) {
        parent::__construct($name);
        $this->studentId = $studentId;
    }
    
    public function greet(): string {
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
    public function login(string $email, string $password): bool;
    public function logout(): void;
    public function isAuthenticated(): bool;
}

class UserAuth implements Authenticatable {
    public function login(string $email, string $password): bool {
        // Implementation
        return true;
    }
    
    public function logout(): void {
        // Implementation
    }
    
    public function isAuthenticated(): bool {
        // Implementation
        return isset($_SESSION['user_id']);
    }
}
?>
```

### 1.4 Abstract Class

```php
<?php
abstract class Model {
    protected string $table;
    protected Database $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    abstract public function validate(array $data): array;
    
    public function all(): array {
        return $this->db->fetchAll("SELECT * FROM {$this->table}");
    }
    
    public function find(int $id): array|false {
        return $this->db->fetch("SELECT * FROM {$this->table} WHERE id = ?", [$id]);
    }
}

class UserModel extends Model {
    protected string $table = 'users';
    
    public function validate(array $data): array {
        $errors = [];
        if (empty($data['name'])) $errors['name'] = "Name is required";
        if (empty($data['email'])) $errors['email'] = "Email is required";
        return $errors;
    }
}
?>
```

---

## 2. MVC PATTERN

### 2.1 MVC Structure

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
    protected function view(string $view, array $data = []): void {
        extract($data);
        $content = "app/Views/$view.php";
        require "app/Views/layouts/main.php";
    }
    
    protected function redirect(string $url): void {
        header("Location: $url");
        exit;
    }
    
    protected function json(array $data, int $status = 200): void {
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
    private UserModel $userModel;
    
    public function __construct() {
        $this->userModel = new UserModel();
    }
    
    public function index(): void {
        $users = $this->userModel->all();
        $this->view('users/index', ['users' => $users]);
    }
    
    public function create(): void {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'name' => $_POST['name'] ?? '',
                'email' => $_POST['email'] ?? '',
            ];
            
            $errors = $this->userModel->validate($data);
            
            if (empty($errors)) {
                // $this->userModel->create($data); // Implement create
                $this->redirect('/users');
            }
            
            $this->view('users/create', ['errors' => $errors, 'data' => $data]);
        } else {
            $this->view('users/create');
        }
    }
    
    public function show(int $id): void {
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
    private array $routes = [];
    
    public function get(string $path, $callback): void {
        $this->routes['GET'][$path] = $callback;
    }
    
    public function post(string $path, $callback): void {
        $this->routes['POST'][$path] = $callback;
    }
    
    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        if (isset($this->routes[$method][$path])) {
            $callback = $this->routes[$method][$path];
            
            if (is_callable($callback)) {
                call_user_func($callback);
            } elseif (is_string($callback)) {
                [$controller, $action] = explode('@', $callback);
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
        'core/',
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

# PRACTICE

## EXERCISE 1: Create Model Class

📝 **Requirements:**
- Base `Model` class with CRUD methods
- `ProductModel` extends `Model`
- Add simple validation methods

## EXERCISE 2: MVC Mini Project

📝 **Requirements:**
- Implement MVC structure
- CRUD for `products`
- Simple router with at least 4 routes

---

# ✅ KEY TAKEAWAYS

- [ ] Understand OOP in PHP (class, object, inheritance, interfaces, abstract classes)
- [ ] Apply MVC pattern in a small project
- [ ] Organize code into controllers, models, and views

---

**Previous: [Session 10 - PHP + MySQL ←](./session_10_php_mysql.md)**  
**Next: [Session 12 - Web App Development →](./session_12_web_app_development.md)**
