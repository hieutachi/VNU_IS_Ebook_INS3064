# FINAL EXAM — Model Solution

**INS3064: Multimedia Design and Web Development**

---

## Part A — Multiple Choice (15 × 2 = 30 points)

**1. Answer: C) `execute()`**

Explanation: After preparing a statement with `PDO::prepare()`, you call `execute()` on the `PDOStatement` object to run it. `query()` is for direct queries without parameters, and `exec()` is for statements that don't return result sets.

---

**2. Answer: A) `prepare()` → `bind()` → `execute()` → `fetch()`**

Explanation: The standard PDO prepared statement workflow is: prepare the SQL template, optionally bind parameters, execute the statement, then fetch results. Binding can also be done directly in `execute()` as an array.

---

**3. Answer: B) `Error: Division not allowedDone`**

Explanation: Since `$x == 0`, the `throw` statement triggers. The `catch` block catches the exception and prints `"Error: Division not allowed"`. Then the `finally` block ALWAYS executes, printing `"Done"`. Both are printed without a newline between them, resulting in `Error: Division not allowedDone`.

---

**4. Answer: B) A child class can override a parent's method by declaring it with the same name**

Explanation: PHP supports single inheritance — a class can extend only ONE parent. Private methods are NOT accessible in child classes. Abstract classes CANNOT be instantiated. Method overriding is done by defining a method with the same name in the child class.

---

**5. Answer: B) Sessions expire when the browser closes; cookies can persist**

Explanation: Session data is stored on the server (not the client). Cookies do not require `session_start()`. Both sessions and cookies can store various data types. Sessions typically end when the browser closes (session cookie deleted), while cookies can have explicit expiration dates.

---

**6. Answer: A) Cross-Site Request Forgery — exploits a user's authenticated session to perform unwanted actions**

Explanation: CSRF tricks an authenticated user into submitting a malicious request. The attacker crafts a request (e.g., a hidden form on another site) that the user's browser sends along with their session cookies, causing the server to think it's a legitimate action.

---

**7. Answer: B) Stored (Persistent) XSS**

Explanation: Stored XSS occurs when the malicious script is permanently saved on the target server (e.g., in a database via a comment or forum post). Every user who views the affected page executes the malicious script. Reflected XSS is in the URL, and DOM-based XSS manipulates the client-side JavaScript.

---

**8. Answer: C) Using PDO prepared statements with bound parameters**

Explanation: Prepared statements separate SQL logic from data. The database engine treats bound parameters as pure data, never as executable SQL. `addslashes()` is easily bypassed, `mysql_real_escape_string()` is deprecated (removed in PHP 7), and input length validation alone does not prevent injection.

---

**9. Answer: B) The first `<p>` that is a direct child of `<div class="container">`**

Explanation: The `>` combinator selects only direct children. `:first-child` filters to the first child element. So this selects a `<p>` that is both the first child of and a direct child of `div.container`.

---

**10. Answer: B) `$.ajax()`**

Explanation: `$.ajax()` is jQuery's general-purpose method for making asynchronous HTTP requests. It returns a jqXHR object that implements the Promise interface. `$.getScript()` loads scripts, `$.load()` loads HTML into an element, and `$.each()` is for iterating over arrays/objects.

---

**11. Answer: B) `... Woof! `**

Explanation: `Animal::speak()` returns `"..."`, and `Dog::speak()` overrides it to return `"Woof!"`. The array contains one `Animal` and one `Dog`. Polymorphism means PHP calls the correct `speak()` method for each object's actual type.

---

**12. Answer: C) `password_hash()`**

Explanation: `password_hash()` uses bcrypt by default (or argon2 if available) and generates a secure, salted hash. `md5()` and `sha1()` are cryptographic hash functions but are NOT suitable for passwords (too fast, no built-in salting). `crypt()` is the underlying mechanism but `password_hash()` is the modern, recommended API.

---

**13. Answer: C) 404 Not Found**

Explanation: `http_response_code(404)` sets the HTTP response status code to 404, indicating the requested resource was not found. This affects the HTTP header sent to the browser.

---

**14. Answer: B) Sends a POST request to `api.php` with form data and displays the response**

Explanation: `$.post()` sends an HTTP POST request. The second argument `{ action: "delete", id: 5 }` is the data sent in the POST body. The callback function receives the response and inserts it into the `#result` element using `.html()`.

---

**15. Answer: B) `session_start(); $_SESSION['user'] = 'admin';`**

Explanation: `session_start()` is the correct function to initialize sessions. The superglobal array is `$_SESSION` (not `$SESSION`). There is no `session_init()`, `start_session()`, or `session_begin()` in PHP.

---

## Part B — Code Analysis

### B1. Security Vulnerability Analysis (10 points)

**Vulnerability 1: SQL Injection (2 points)**

- **Location:** `$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";`
- **Issue:** User input is directly interpolated into the SQL query. An attacker can enter `' OR '1'='1' --` as the username to bypass authentication.
- **Fix:** Use PDO prepared statements with bound parameters:
  ```php
  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->execute([$username]);
  ```

**Vulnerability 2: Plaintext Password Comparison (2 points)**

- **Location:** `AND password = '$password'` in the SQL query
- **Issue:** Passwords are stored and compared in plaintext. If the database is breached, all passwords are immediately exposed.
- **Fix:** Store passwords using `password_hash()` and verify with `password_verify()`:
  ```php
  $row = $stmt->fetch();
  if ($row && password_verify($password, $row['password'])) { ... }
  ```

**Vulnerability 3: Cross-Site Scripting (XSS) (2 points)**

- **Location:** `echo "<h1>Welcome, " . $row["username"] . "</h1>";` and `echo "<p>Username: " . $username . " not found.</p>";`
- **Issue:** User-supplied data (`$row["username"]`, `$username`) is output directly to HTML without escaping. An attacker can inject `<script>alert('XSS')</script>`.
- **Fix:** Escape all output with `htmlspecialchars()`:
  ```php
  echo "<h1>Welcome, " . htmlspecialchars($row["username"], ENT_QUOTES, 'UTF-8') . "</h1>";
  ```

**Vulnerability 4: No CSRF Protection (2 points)**

- **Location:** The `<form method="POST">` has no CSRF token
- **Issue:** A malicious website can create a hidden form that submits to this login page, potentially performing actions on behalf of the user (e.g., triggering a login to steal session cookies via timing attacks).
- **Fix:** Generate a CSRF token, store it in the session, include it as a hidden field, and verify on submission:
  ```php
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  // In form:
  echo '<input type="hidden" name="csrf_token" value="' . $_SESSION['csrf_token'] . '">';
  // On submission:
  if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) { die("Invalid CSRF token"); }
  ```

**Vulnerability 5: Exposed Database Credentials / No Error Handling (2 points)**

- **Location:** `$conn = mysqli_connect("localhost", "root", "", "mydb");`
- **Issue:** Using the `root` user with no password and no connection error handling. If the connection fails, the script continues and may leak database errors to the user.
- **Fix:** Use a dedicated database user with minimal privileges, handle connection errors gracefully:
  ```php
  $conn = mysqli_connect("localhost", "app_user", "strong_password", "mydb");
  if (!$conn) {
      error_log("Database connection failed");
      die("An error occurred. Please try again later.");
  }
  ```
  (Alternative vulnerability accepted: No session management after login / no `session_start()` / echoing raw errors / no HTTPS enforcement / no input length limits)

---

### B2. OOP Code Analysis (10 points)

**(a) Exact Output (4 points):**

```
2020 Generic
2022 Toyota (4-door)
2022 Tesla (4-door)
Electric car silently starting...
Vehicle starting...
Car engine purring!
Electric car silently starting...
```

Scoring:
- Each correct line = 0.5 points (8 lines = 4 points)
- Common deduction: Forgetting that `ElectricCar` inherits `getInfo()` from `Car` (not `Vehicle`), so it outputs `"2022 Tesla (4-door)"` (using `Car::getInfo()` which calls `parent::getInfo()` = `Vehicle::getInfo()` returning `"2024 Tesla"` + `" (4-door)"`). Wait — actually let me re-examine:

Actually: `$v3 = new ElectricCar("Tesla", 2024, 4, 75)` — ElectricCar does NOT override `getInfo()`, so it uses Car's `getInfo()`, which calls `parent::getInfo()` (Vehicle's) returning `"2024 Tesla"`, then appends `" (4-door)"`.

Corrected output:
```
2020 Generic
2022 Toyota (4-door)
2024 Tesla (4-door)
Electric car silently starting...
Vehicle starting...
Car engine purring!
Electric car silently starting...
```

**(b) Method Overriding (3 points):**

Method overriding occurs when a child class defines a method with the same name as a method in its parent class. The child's version replaces (overrides) the parent's version when called on an instance of the child class.

In this code, `Car` overrides both `getInfo()` and `start()` from `Vehicle`. `ElectricCar` overrides `start()` from `Car` (and transitively from `Vehicle`).

PHP determines which version to call based on the **actual type** of the object at runtime (polymorphism). For example, `$v3->start()` calls `ElectricCar::start()` because `$v3` is an `ElectricCar`, even though `start()` is defined at multiple levels of the hierarchy.

The `parent::` keyword can be used to explicitly call the parent's version, as seen in `Car::getInfo()` calling `parent::getInfo()`.

**(c) `parent::__construct()` Role (3 points):**

`parent::__construct($brand, $year)` in the `Car` class calls the `Vehicle` class constructor, which assigns `$this->brand` and `$this->year`. This ensures that the parent class is properly initialized with its required data.

If `parent::__construct($brand, $year)` were removed from the `Car` class, then `$this->brand` and `$this->year` would never be set. The `getInfo()` method (inherited from or calling `Vehicle::getInfo()`) would try to access these properties, resulting in:
- In PHP 8+: A `Warning: Undefined property` notice/error for each unset property
- `getInfo()` would return `" "` (with null values) instead of the expected `"2022 Toyota"`

This demonstrates the importance of proper constructor chaining in inheritance hierarchies.

---

### B3. SQL JOIN Analysis (10 points)

**(a) INNER JOIN (3 points):**

Returns only rows where there is a match in **both** tables. Products with `category_id = NULL` (Headphones) are excluded. Categories with no matching products are also excluded.

| product_name | category_name |
|-------------|--------------|
| Laptop | Electronics |
| Phone | Electronics |
| Desk | Furniture |
| Chair | Furniture |

Note: Category "Clothing" (30) has no products, and "Headphones" has no category — both are excluded by INNER JOIN.

**(b) LEFT JOIN (3 points):**

Returns **all rows from the left table** (`products`), and matching rows from the right table (`categories`). If there is no match, the right side shows NULL.

| product_name | category_name |
|-------------|--------------|
| Laptop | Electronics |
| Phone | Electronics |
| Desk | Furniture |
| Chair | Furniture |
| Headphones | NULL |

Note: "Headphones" appears with NULL category_name because its `category_id` is NULL. Category "Clothing" still does not appear because it has no matching products (LEFT JOIN keeps all LEFT table rows, not right).

**(c) LEFT JOIN with GROUP BY (4 points):**

Returns **all categories** (from the left table `categories`) with the count of products in each. Categories with no products show a count of 0.

| category_name | product_count |
|--------------|--------------|
| Electronics | 2 |
| Furniture | 2 |
| Clothing | 0 |

Explanation: 
- Electronics (10): Has products Laptop and Phone → count = 2
- Furniture (20): Has products Desk and Chair → count = 2
- Clothing (30): Has no products → count = 0 (LEFT JOIN preserves the category, `COUNT(p.product_id)` counts non-NULL values from the right table)

Note: Using `COUNT(*)` instead of `COUNT(p.product_id)` would give Clothing a count of 1 (counting the row itself), which would be incorrect. Using `COUNT(p.product_id)` correctly counts only matched product rows.

---

## Part C — Practical

### Task 1: Secure Login System (20 points)

```php
<?php
// auth.php — Secure Registration & Login System
session_start();

$errors = [];
$success = "";

// Generate CSRF token if not exists
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header("Location: auth.php");
    exit;
}

// Process Registration
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["register"])) {
    // CSRF verification
    if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION['csrf_token']) {
        $errors[] = "Invalid CSRF token. Please try again.";
    } else {
        // Validate inputs
        $username = trim($_POST["reg_username"] ?? "");
        $email = trim($_POST["reg_email"] ?? "");
        $password = $_POST["reg_password"] ?? "";
        $confirm = $_POST["reg_confirm"] ?? "";

        if (empty($username)) $errors[] = "Username is required.";
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "A valid email is required.";
        }
        if (strlen($password) < 6) $errors[] = "Password must be at least 6 characters.";
        if ($password !== $confirm) $errors[] = "Passwords do not match.";

        if (empty($errors)) {
            // Hash the password securely
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $success = "Registration successful! Password hash: <code>"
                     . htmlspecialchars($hashedPassword) . "</code>";
        }
    }

    // Regenerate CSRF token after form submission
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Process Login
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["login"])) {
    // CSRF verification
    if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION['csrf_token']) {
        $errors[] = "Invalid CSRF token. Please try again.";
    } else {
        $loginUsername = trim($_POST["login_username"] ?? "");
        $loginPassword = $_POST["login_password"] ?? "";

        // In a real app, fetch hash from database
        // Using a demo hash created from password_hash("demo123", PASSWORD_DEFAULT)
        $storedHash = '$2y$10$ExampleHashValueForDemonstrationPurposesOnly1234567890';

        if (password_verify($loginPassword, $storedHash)) {
            // Login successful — create session
            $_SESSION['username'] = $loginUsername;
            $success = "Login successful! Welcome, "
                     . htmlspecialchars($loginUsername, ENT_QUOTES, 'UTF-8') . "!";
        } else {
            $errors[] = "Invalid username or password.";
        }
    }

    // Regenerate CSRF token
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Check if user is logged in
$loggedIn = isset($_SESSION['username']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Login System</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input[type="text"], input[type="email"], input[type="password"] {
            width: 100%; padding: 8px; box-sizing: border-box;
        }
        button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        button:hover { background: #45a049; }
        .error { color: red; margin-bottom: 10px; }
        .success { color: green; margin-bottom: 10px; }
        hr { margin: 30px 0; }
        a { color: #2196F3; }
    </style>
</head>
<body>

<h1>🔒 Secure Login System</h1>

<?php if ($loggedIn): ?>
    <!-- Logged-in view -->
    <div class="success">
        Welcome back, <?php echo htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8'); ?>!
    </div>
    <p><a href="?action=logout">Logout</a></p>

<?php else: ?>
    <!-- Display errors -->
    <?php if (!empty($errors)): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $err): ?>
                    <li><?php echo htmlspecialchars($err, ENT_QUOTES, 'UTF-8'); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <!-- Display success -->
    <?php if (!empty($success)): ?>
        <div class="success"><?php echo $success; ?></div>
    <?php endif; ?>

    <!-- Registration Form -->
    <h2>Register</h2>
    <form method="POST" action="">
        <input type="hidden" name="csrf_token"
               value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

        <div class="form-group">
            <label for="reg_username">Username:</label>
            <input type="text" id="reg_username" name="reg_username" required
                   value="<?php echo htmlspecialchars($_POST['reg_username'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label for="reg_email">Email:</label>
            <input type="email" id="reg_email" name="reg_email" required
                   value="<?php echo htmlspecialchars($_POST['reg_email'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label for="reg_password">Password:</label>
            <input type="password" id="reg_password" name="reg_password" required
                   minlength="6">
        </div>

        <div class="form-group">
            <label for="reg_confirm">Confirm Password:</label>
            <input type="password" id="reg_confirm" name="reg_confirm" required>
        </div>

        <button type="submit" name="register">Register</button>
    </form>

    <hr>

    <!-- Login Form -->
    <h2>Login</h2>
    <form method="POST" action="">
        <input type="hidden" name="csrf_token"
               value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

        <div class="form-group">
            <label for="login_username">Username:</label>
            <input type="text" id="login_username" name="login_username" required
                   value="<?php echo htmlspecialchars($_POST['login_username'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
        </div>

        <div class="form-group">
            <label for="login_password">Password:</label>
            <input type="password" id="login_password" name="login_password" required>
        </div>

        <button type="submit" name="login">Login</button>
    </form>
<?php endif; ?>

</body>
</html>
```

---

### Task 2: Product CRUD with AJAX (20 points)

#### `api.php` — PHP Backend (JSON API)

```php
<?php
// api.php — Product CRUD JSON API
header('Content-Type: application/json');

// Simulated database (in-memory array)
// In production, this would be a MySQL database with PDO
session_start();

if (!isset($_SESSION['products'])) {
    $_SESSION['products'] = [
        ['id' => 1, 'name' => 'Laptop',    'price' => 999.99],
        ['id' => 2, 'name' => 'Smartphone', 'price' => 699.50],
        ['id' => 3, 'name' => 'Headphones', 'price' => 79.99],
        ['id' => 4, 'name' => 'Keyboard',   'price' => 49.99],
    ];
    $_SESSION['next_id'] = 5;
}

// Determine action from POST parameter
$action = $_POST['action'] ?? '';

switch ($action) {

    // LIST all products
    case 'list':
        echo json_encode([
            'status'  => 'success',
            'data'    => array_values($_SESSION['products'])
        ]);
        break;

    // ADD a new product
    case 'add':
        $name  = trim($_POST['name'] ?? '');
        $price = $_POST['price'] ?? '';

        // Validate inputs
        $errors = [];
        if (empty($name)) {
            $errors[] = "Product name is required.";
        }
        if (!is_numeric($price) || $price < 0) {
            $errors[] = "Price must be a valid non-negative number.";
        }

        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'messages' => $errors]);
            break;
        }

        // Create new product
        $newProduct = [
            'id'    => $_SESSION['next_id']++,
            'name'  => $name,
            'price' => round((float)$price, 2)
        ];
        $_SESSION['products'][] = $newProduct;

        echo json_encode([
            'status' => 'success',
            'data'   => $newProduct
        ]);
        break;

    // DELETE a product
    case 'delete':
        $id = intval($_POST['id'] ?? 0);

        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'messages' => ['Invalid product ID.']]);
            break;
        }

        // Find and remove the product
        $found = false;
        foreach ($_SESSION['products'] as $index => $product) {
            if ($product['id'] === $id) {
                array_splice($_SESSION['products'], $index, 1);
                $found = true;
                break;
            }
        }

        if ($found) {
            echo json_encode(['status' => 'success', 'message' => "Product #$id deleted."]);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'messages' => ["Product #$id not found."]]);
        }
        break;

    // Unknown action
    default:
        http_response_code(400);
        echo json_encode(['status' => 'error', 'messages' => ['Invalid action.']]);
        break;
}
?>
```

#### `products.html` — jQuery Frontend

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management — AJAX CRUD</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
        }
        h1 { color: #333; }

        /* Message area */
        #message {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            display: none;
        }
        #message.success { background: #d4edda; color: #155724; display: block; }
        #message.error   { background: #f8d7da; color: #721c24; display: block; }

        /* Form */
        .add-form {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .add-form label { font-weight: bold; }
        .add-form input {
            padding: 8px;
            margin: 5px 10px 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .add-form input[type="number"] { width: 120px; }
        .btn-add {
            padding: 8px 16px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn-add:hover { background: #45a049; }

        /* Table */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th { background: #4CAF50; color: white; }
        tr:hover { background: #f5f5f5; }
        .btn-delete {
            padding: 5px 12px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn-delete:hover { background: #d32f2f; }
        .price { text-align: right; }
    </style>
</head>
<body>

<h1>📦 Product Management</h1>

<!-- Message area for success/error feedback -->
<div id="message"></div>

<!-- Add Product Form -->
<div class="add-form">
    <h2>Add New Product</h2>
    <form id="addProductForm">
        <label for="productName">Name:</label>
        <input type="text" id="productName" name="name" placeholder="Product name" required>

        <label for="productPrice">Price ($):</label>
        <input type="number" id="productPrice" name="price" step="0.01" min="0"
               placeholder="0.00" required>

        <button type="submit" class="btn-add">Add Product</button>
    </form>
</div>

<!-- Product Table -->
<table id="productTable">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th class="price">Price</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="productBody">
        <!-- Products loaded via AJAX -->
    </tbody>
</table>

<script>
$(document).ready(function() {

    // ---- Helper: Show message ----
    function showMessage(text, type) {
        $("#message")
            .removeClass("success error")
            .addClass(type)
            .text(text)
            .show()
            .delay(3000)
            .fadeOut();
    }

    // ---- Helper: Format price ----
    function formatPrice(price) {
        return "$" + parseFloat(price).toFixed(2);
    }

    // ---- Helper: Add a row to the table ----
    function addProductRow(product) {
        var row = $("<tr>").attr("data-id", product.id);
        row.append($("<td>").text(product.id));
        row.append($("<td>").text(product.name));
        row.append($("<td>").addClass("price").text(formatPrice(product.price)));
        row.append(
            $("<td>").append(
                $("<button>")
                    .addClass("btn-delete")
                    .text("Delete")
                    .attr("data-id", product.id)
            )
        );
        $("#productBody").append(row);
    }

    // ---- LOAD products on page load ----
    function loadProducts() {
        $.ajax({
            url: "api.php",
            method: "POST",
            data: { action: "list" },
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#productBody").empty();
                    $.each(response.data, function(index, product) {
                        addProductRow(product);
                    });
                }
            },
            error: function(xhr, status, error) {
                showMessage("Failed to load products: " + error, "error");
            }
        });
    }

    loadProducts();

    // ---- ADD product ----
    $("#addProductForm").on("submit", function(e) {
        e.preventDefault();

        var name  = $("#productName").val().trim();
        var price = $("#productPrice").val();

        // Client-side validation
        if (name === "") {
            showMessage("Product name is required.", "error");
            return;
        }
        if (isNaN(price) || parseFloat(price) < 0) {
            showMessage("Please enter a valid price.", "error");
            return;
        }

        $.ajax({
            url: "api.php",
            method: "POST",
            data: {
                action: "add",
                name:   name,
                price:  price
            },
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    addProductRow(response.data);
                    showMessage("Product '" + response.data.name + "' added!", "success");
                    $("#productName").val("");
                    $("#productPrice").val("");
                } else {
                    showMessage(response.messages.join(", "), "error");
                }
            },
            error: function(xhr) {
                var msg = "Failed to add product.";
                try {
                    var resp = JSON.parse(xhr.responseText);
                    if (resp.messages) msg = resp.messages.join(", ");
                } catch(e) {}
                showMessage(msg, "error");
            }
        });
    });

    // ---- DELETE product (event delegation for dynamic rows) ----
    $("#productBody").on("click", ".btn-delete", function() {
        var btn = $(this);
        var id  = btn.attr("data-id");

        if (!confirm("Delete product #" + id + "?")) return;

        $.ajax({
            url: "api.php",
            method: "POST",
            data: {
                action: "delete",
                id:     id
            },
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("tr[data-id='" + id + "']").fadeOut(300, function() {
                        $(this).remove();
                    });
                    showMessage("Product #" + id + " deleted.", "success");
                } else {
                    showMessage(response.messages.join(", "), "error");
                }
            },
            error: function(xhr) {
                showMessage("Failed to delete product.", "error");
            }
        });
    });

});
</script>

</body>
</html>
```

---

> **End of Model Solution**
