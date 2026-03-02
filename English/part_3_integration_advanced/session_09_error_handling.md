# 🟨 SESSION 09
# **ERROR HANDLING**

In this session, we will learn how to handle errors professionally in PHP: error types, `try-catch`, custom exceptions, and debugging techniques.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 9 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Handle errors and exceptions
   - Use try-catch blocks
   - Debug PHP code
   - Create custom error handlers

🔗 Links to Learning Outcomes: LO6
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Handle **errors and exceptions** in PHP
- Use **try-catch** blocks
- Create **custom exceptions**
- Create **custom error/exception handlers**
- **Debug** PHP code effectively and log errors

---

# THEORY

## 1. TYPES OF ERRORS

### 1.1 Error Types in PHP

| Type | Description | Example |
|------|-------------|---------|
| **Parse Error** | Syntax error | Missing `;`, `}` |
| **Fatal Error** | Serious error, script stops | Calling a non-existing function |
| **Warning** | Warning, script continues | Including a missing file |
| **Notice** | Notice, script continues | Using undefined variable |

### 1.2 Error Reporting

```php
<?php
// Show all errors (development)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Hide errors (production)
error_reporting(0);
ini_set('display_errors', 0);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
?>
```

---

## 2. TRY-CATCH

### 2.1 Basic Syntax

```php
<?php
try {
    // Code that may throw an error/exception
    $result = 10 / 0;
} catch (Exception $e) {
    // Handle error
    echo "Error: " . $e->getMessage();
} finally {
    // Always executed
    echo "Done";
}
?>
```

### 2.2 Throwing Exceptions

```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("Cannot divide by zero");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

### 2.3 Custom Exception

```php
<?php
class ValidationException extends Exception {
    private array $errors = [];
    
    public function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct("Validation failed");
    }
    
    public function getErrors(): array {
        return $this->errors;
    }
}

// Usage
try {
    $errors = [];
    if (empty($name)) {
        $errors['name'] = "Name is required";
    }
    if (!empty($errors)) {
        throw new ValidationException($errors);
    }
} catch (ValidationException $e) {
    $errors = $e->getErrors();
}
?>
```

---

## 3. CUSTOM ERROR & EXCEPTION HANDLERS

```php
<?php
// Custom error handler
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    $log = date('Y-m-d H:i:s') . " - Error [$errno]: $errstr in $errfile on line $errline\n";
    error_log($log, 3, __DIR__ . '/errors.log');
    
    if ($errno === E_USER_ERROR) {
        echo "An error has occurred. Please try again later.";
        exit(1);
    }
    
    return true; // We handled the error
}

set_error_handler("customErrorHandler");

// Custom exception handler
function customExceptionHandler($exception) {
    error_log($exception->getMessage());
    echo "An unexpected error occurred. Please contact the administrator.";
}

set_exception_handler("customExceptionHandler");
?>
```

---

## 4. DEBUGGING TECHNIQUES

### 4.1 Useful Debug Functions

```php
<?php
// Print variable
var_dump($variable);
print_r($array);

// Debug and stop
function dd($var) {
    echo "<pre>";
    var_dump($var);
    echo "</pre>";
    die();
}

// Backtrace
debug_print_backtrace();

// Error log
error_log("Debug: " . print_r($data, true));
?>
```

### 4.2 Xdebug (optional)

```ini
; php.ini
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_port=9003
```

With Xdebug and a modern IDE (VS Code, PHPStorm), you can set breakpoints, step through code, and inspect variables.

---

## 5. REAL-WORLD EXAMPLE: DATABASE CLASS WITH ERROR HANDLING

```php
<?php
class Database {
    private PDO $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host=localhost;dbname=test",
                "root",
                "",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Cannot connect to database");
        }
    }
    
    public function query(string $sql, array $params = []): array {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            throw new Exception("Database query failed");
        }
    }
}

// Usage
try {
    $db = new Database();
    $users = $db->query("SELECT * FROM users WHERE id = ?", [1]);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

---

# PRACTICE

## EXERCISE 1: Form with Error Handling

📝 **Requirements:**
- Create a registration form
- Validate input using `try-catch`
- Show friendly validation messages

## EXERCISE 2: Custom Exceptions

📝 **Requirements:**
- Create `DatabaseException`
- Create `ValidationException`
- Use them inside controller/service code

---

# ✅ KEY TAKEAWAYS

- [ ] Understand different PHP error types
- [ ] Can use `try-catch` correctly
- [ ] Can create and use custom exceptions
- [ ] Can debug PHP applications effectively

---

**Previous: [Session 08 - Review & Midterm ←](../session_08_review_midterm.md)**  
**Next: [Session 10 - PHP + MySQL →](./session_10_php_mysql.md)**
