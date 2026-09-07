# FINAL EXAM — INS3064: Multimedia Design and Web Development

**Duration:** 120 minutes | **Format:** Closed book | **Total:** 100 points

**Instructor:** ThS. Hieu Ta Chi

**Coverage:** Sessions 9–15 (Error Handling, PHP+MySQL, OOP, Web Application Development, Cookies & Sessions, Security, jQuery & AJAX) + cumulative knowledge from Sessions 1–8

---

> **Instructions:**
> - Read all questions carefully before answering.
> - Part A: Circle or write the letter of the best answer. Each question has exactly one correct answer.
> - Part B: Write clear, concise explanations. Show code where asked.
> - Part C: Write complete, working code. Include comments where helpful.
> - You may write PHP, SQL, HTML, CSS, and JavaScript by hand or type if using a lab computer.
> - Assume PHP 8.0+ and MySQL 8.0+ unless stated otherwise.

---

## Part A — Multiple Choice (15 questions × 2 points = 30 points)

**1.** Which PDO method should be used to execute a prepared statement with bound parameters?

A) `query()`  
B) `exec()`  
C) `execute()`  
D) `run()`

---

**2.** What is the correct order of steps when using a PDO prepared statement?

A) `prepare()` → `bind()` → `execute()` → `fetch()`  
B) `query()` → `fetch()` → `execute()`  
C) `execute()` → `prepare()` → `fetch()`  
D) `connect()` → `query()` → `fetch()`

---

**3.** What does the following PHP code output when `$x = 0`?

```php
try {
    if ($x == 0) {
        throw new Exception("Division not allowed");
    }
    echo $x;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
} finally {
    echo "Done";
}
```

A) `0Done`  
B) `Error: Division not allowedDone`  
C) `Error: Division not allowed`  
D) `Done`

---

**4.** Which of the following is TRUE about PHP classes and inheritance?

A) A child class can inherit from multiple parent classes  
B) A child class can override a parent's method by declaring it with the same name  
C) Private methods in a parent class are accessible in the child class  
D) Abstract classes can be instantiated directly

---

**5.** What is the key difference between `$_SESSION` and cookies?

A) Sessions are stored on the client; cookies are stored on the server  
B) Sessions expire when the browser closes; cookies can persist  
C) Cookies require `session_start()`; sessions do not  
D) Sessions can only store strings; cookies can store arrays

---

**6.** What does CSRF stand for, and what does it exploit?

A) Cross-Site Request Forgery — exploits a user's authenticated session to perform unwanted actions  
B) Cross-Server Resource Fetching — exploits server-to-server communication  
C) Client-Side Rendering Failure — exploits browser rendering bugs  
D) Cross-Site Redirect Forgery — exploits URL redirect parameters

---

**7.** Which type of XSS occurs when malicious script is permanently stored in the database?

A) Reflected XSS  
B) Stored (Persistent) XSS  
C) DOM-based XSS  
D) Self-XSS

---

**8.** Which of the following is the MOST effective way to prevent SQL injection in PHP?

A) Using `addslashes()` on user input  
B) Using `mysql_real_escape_string()`  
C) Using PDO prepared statements with bound parameters  
D) Validating input length only

---

**9.** What does the following jQuery selector select?

```javascript
$("div.container > p:first-child")
```

A) Any `<p>` inside a `<div class="container">`  
B) The first `<p>` that is a direct child of `<div class="container">`  
C) The first `<p>` element on the page  
D) All `<p>` elements with class `container`

---

**10.** In jQuery, which method performs an asynchronous HTTP request and returns a Promise?

A) `$.getScript()`  
B) `$.ajax()`  
C) `$.load()`  
D) `$.each()`

---

**11.** What is the output of the following code?

```php
class Animal {
    public function speak() {
        return "...";
    }
}

class Dog extends Animal {
    public function speak() {
        return "Woof!";
    }
}

$animals = [new Animal(), new Dog()];
foreach ($animals as $a) {
    echo $a->speak() . " ";
}
```

A) `... ... `  
B) `... Woof! `  
C) `Woof! Woof! `  
D) Error

---

**12.** Which function is used to securely hash a password in PHP?

A) `md5()`  
B) `sha1()`  
C) `password_hash()`  
D) `crypt()`

---

**13.** What HTTP status code does PHP's `http_response_code(404)` set?

A) 200 OK  
B) 301 Moved Permanently  
C) 404 Not Found  
D) 500 Internal Server Error

---

**14.** In AJAX, what does the following jQuery code do?

```javascript
$.post("api.php", { action: "delete", id: 5 }, function(response) {
    $("#result").html(response);
});
```

A) Sends a GET request with parameters in the URL  
B) Sends a POST request to `api.php` with form data and displays the response  
C) Loads the content of `api.php` into `#result`  
D) Sends a DELETE request to `api.php`

---

**15.** Which of the following is the correct way to start a session and set a session variable in PHP?

A) `session_init(); $_SESSION['user'] = 'admin';`  
B) `session_start(); $_SESSION['user'] = 'admin';`  
C) `start_session(); $SESSION['user'] = 'admin';`  
D) `session_begin(); $_SESSION['user'] = 'admin';`

---

## Part B — Code Analysis (3 questions × 10 points = 30 points)

### B1. Security Vulnerability Analysis (10 points)

The following PHP code is a login form handler. Identify **5 security vulnerabilities** in the code and explain how to fix each one.

```php
<?php
// login.php
$conn = mysqli_connect("localhost", "root", "", "mydb");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username = '$username' 
            AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo "<h1>Welcome, " . $row["username"] . "!</h1>";
        echo "<p>Your role is: " . $row["role"] . "</p>";
    } else {
        echo "<h1>Login failed!</h1>";
        echo "<p>Username: " . $username . " not found.</p>";
    }
}
?>
<form method="POST">
    <input name="username" placeholder="Username">
    <input name="password" type="password" placeholder="Password">
    <button type="submit">Login</button>
</form>
```

For each vulnerability, provide:
- The line or section of code that is vulnerable
- The type of attack or security issue
- A brief description of how to fix it

---

### B2. OOP Code Analysis (10 points)

Study the following PHP code and answer the questions that follow.

```php
<?php
class Vehicle {
    protected $brand;
    protected $year;

    public function __construct($brand, $year) {
        $this->brand = $brand;
        $this->year = $year;
    }

    public function getInfo() {
        return $this->year . " " . $this->brand;
    }

    public function start() {
        return "Vehicle starting...";
    }
}

class Car extends Vehicle {
    private $doors;

    public function __construct($brand, $year, $doors) {
        parent::__construct($brand, $year);
        $this->doors = $doors;
    }

    public function getInfo() {
        return parent::getInfo() . " (" . $this->doors . "-door)";
    }

    public function start() {
        return "Car engine purring!";
    }
}

class ElectricCar extends Car {
    private $batteryCapacity;

    public function __construct($brand, $year, $doors, $batteryCapacity) {
        parent::__construct($brand, $year, $doors);
        $this->batteryCapacity = $batteryCapacity;
    }

    public function start() {
        return "Electric car silently starting...";
    }
}

$v1 = new Vehicle("Generic", 2020);
$v2 = new Car("Toyota", 2022, 4);
$v3 = new ElectricCar("Tesla", 2024, 4, 75);

echo $v1->getInfo() . "\n";
echo $v2->getInfo() . "\n";
echo $v3->getInfo() . "\n";
echo $v3->start() . "\n";

$vehicles = [$v1, $v2, $v3];
foreach ($vehicles as $v) {
    echo $v->start() . "\n";
}
```

**Questions:**

**(a)** What is the exact output of this script? (4 points)

**(b)** Explain the concept of **method overriding** as demonstrated in this code. Which methods are overridden and how does PHP decide which version to call? (3 points)

**(c)** What is the role of `parent::__construct()` in the `Car` and `ElectricCar` classes? What would happen if `parent::__construct($brand, $year)` were removed from the `Car` class? (3 points)

---

### B3. SQL JOIN Analysis (10 points)

Consider the following tables:

**`products`** table:

| product_id | product_name | category_id | price |
|------------|-------------|-------------|-------|
| 1 | Laptop | 10 | 999 |
| 2 | Phone | 10 | 699 |
| 3 | Desk | 20 | 250 |
| 4 | Chair | 20 | 150 |
| 5 | Headphones | NULL | 79 |

**`categories`** table:

| category_id | category_name |
|-------------|--------------|
| 10 | Electronics |
| 20 | Furniture |
| 30 | Clothing |

For each query below, explain what it returns and show the result set.

**(a)**
```sql
SELECT p.product_name, c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id;
```
(3 points)

**(b)**
```sql
SELECT p.product_name, c.category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.category_id;
```
(3 points)

**(c)**
```sql
SELECT c.category_name, COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_name;
```
(4 points)

---

## Part C — Practical (2 tasks × 20 points = 40 points)

### Task 1: Secure Login System (20 points)

Build a secure user registration and login system in a single PHP file (`auth.php`).

**Requirements:**

1. **(4 points) Registration Form:**
   - Display an HTML form with fields: Username (text), Email (email), Password (password), Confirm Password (password), and a Submit button.
   - The form submits to itself using POST.
   - On successful registration, hash the password with `password_hash()` and display a success message (do NOT actually connect to a database — just demonstrate the hashing). Show the resulting hash.

2. **(5 points) Login Form:**
   - Display a separate HTML form with fields: Username (text), Password (password), and a Submit button.
   - Assume the stored hash is: `$2y$10$ExampleHashValueForDemonstrationPurposesOnly1234567890`
   - Use `password_verify()` to check the submitted password against the stored hash.
   - Display whether login succeeded or failed.

3. **(4 points) Session Management:**
   - On successful login simulation, start a session and store the username in `$_SESSION`.
   - Display a "Welcome back, [username]!" message when the session exists.
   - Include a "Logout" link/button that destroys the session (`session_destroy()`).

4. **(4 points) CSRF Protection:**
   - Generate a CSRF token and store it in the session.
   - Include the token as a hidden field in BOTH forms.
   - Verify the token on form submission before processing.

5. **(3 points) Output Escaping:**
   - All user-supplied data displayed on the page must be escaped using `htmlspecialchars()`.
   - Show proper HTML structure with `<!DOCTYPE html>`, charset UTF-8, etc.

---

### Task 2: Product CRUD with AJAX (20 points)

Build a product management system using PHP backend and jQuery/AJAX frontend.

**Requirements:**

1. **(6 points) PHP Backend — JSON API (`api.php`):**
   - Accept an `action` parameter via POST.
   - Implement three actions:
     - **`list`**: Return all products as a JSON array. Use a hardcoded PHP array of associative arrays (no database needed). Each product has: `id`, `name`, `price`.
     - **`add`**: Accept `name` and `price` via POST. Validate that both are present and price is numeric. Add to the array and return the new product as JSON. Return an error JSON if validation fails.
     - **`delete`**: Accept `id` via POST. Remove the product with that ID. Return success/error as JSON.
   - All responses must set `Content-Type: application/json`.
   - Use proper input validation and return appropriate JSON status.

2. **(8 points) jQuery Frontend (`products.html`):**
   - On page load, call the API to list all products and display them in an HTML table with columns: ID, Name, Price, Actions (Delete button).
   - Include a form above the table with fields: Product Name (text), Price (number), and an "Add Product" button.
   - When the form is submitted, use `$.ajax()` or `$.post()` to send data to the API without page reload. On success, add the new row to the table.
   - When the Delete button is clicked, use AJAX to call the delete action. On success, remove the row from the table.
   - Display success/error messages in a `<div id="message">` area.

3. **(3 points) Error Handling:**
   - Handle AJAX errors gracefully (show error message if the request fails).
   - Validate input on the client side before sending (non-empty name, valid price).
   - The API should return proper HTTP status codes for errors.

4. **(3 points) Code Quality:**
   - Clean, well-organized code with comments.
   - Proper separation of HTML, CSS (basic styling), and JavaScript.
   - Consistent naming conventions.

---

> **END OF EXAM — Good luck!**
