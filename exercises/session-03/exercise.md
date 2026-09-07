# Session 3 — In-Class Exercise: Dynamic Websites and Forms

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session03_exercise.php`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session03\`
2. Test each file in browser via `http://localhost/INS3064/session03/`
3. Compress the folder into a `.zip` file named `session03_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Create HTML forms using `GET` and `POST` methods
- Access form data using `$_GET` and `$_POST` superglobals
- Validate user input (empty fields, email format, phone format)
- Display success/error messages based on validation results

---

## Exercise A: "Contact Form" (Required)

### Task Description
Build a fully functional **contact form** that collects the user's full name, email, phone number, and message. The form should validate **all fields** before accepting the submission and display either a success message or a list of errors. This exercise practices `POST` form handling, the `$_POST` superglobal, and input validation.

### Step-by-Step Instructions
1. Create a new file named **`contact.php`**.
2. Build an HTML form with `method="post"` and the same file as `action`.
3. Add the following fields:
   - **Full Name** — required, minimum 2 characters
   - **Email** — required, must be a valid email format
   - **Phone Number** — required, must be 10–11 digits (Vietnamese format)
   - **Message** — required, minimum 10 characters
4. When the form is submitted:
   - Check that no field is empty
   - Validate email using `filter_var()` with `FILTER_VALIDATE_EMAIL`
   - Validate phone using `preg_match()` (digits only, 10–11 chars)
   - Validate message length
5. If **all validations pass**: show a green success box with the submitted data.
6. If **any validation fails**: show red error messages and **retain** the entered values in the form fields.

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input[type="text"], input[type="email"], textarea {
            width: 100%; padding: 10px; border: 2px solid #ddd;
            border-radius: 6px; font-size: 14px; box-sizing: border-box;
        }
        textarea { height: 100px; resize: vertical; }
        button {
            background-color: #3498db; color: white; padding: 12px 30px;
            border: none; border-radius: 6px; font-size: 16px; cursor: pointer;
        }
        button:hover { background-color: #2980b9; }
        .success { background-color: #d4edda; border: 1px solid #28a745; color: #155724; padding: 15px; border-radius: 6px; }
        .error   { background-color: #f8d7da; border: 1px solid #dc3545; color: #721c24; padding: 15px; border-radius: 6px; }
        .error-list { margin: 0; padding-left: 20px; }
    </style>
</head>
<body>
    <h1>📬 Contact Form</h1>

    <?php
    // Initialize variables
    $name    = "";
    $email   = "";
    $phone   = "";
    $message = "";
    $errors  = [];
    $success = false;

    // Check if the form was submitted
    if ($_SERVER["REQUEST_METHOD"] === "POST") {

        // --- Retrieve and trim form data ---
        $name    = trim($_POST["name"]    ?? "");
        $email   = trim($_POST["email"]   ?? "");
        $phone   = trim($_POST["phone"]   ?? "");
        $message = trim($_POST["message"] ?? "");

        // --- Validate Full Name ---
        if (empty($name)) {
            $errors[] = "Full Name is required.";
        } elseif (strlen($name) < 2) {
            $errors[] = "Full Name must be at least 2 characters.";
        }

        // --- Validate Email ---
        if (empty($email)) {
            $errors[] = "Email is required.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Please enter a valid email address.";
        }

        // --- Validate Phone ---
        if (empty($phone)) {
            $errors[] = "Phone number is required.";
        } elseif (!preg_match('/^[0-9]{10,11}$/', $phone)) {
            $errors[] = "Phone number must be 10–11 digits.";
        }

        // --- Validate Message ---
        if (empty($message)) {
            $errors[] = "Message is required.";
        } elseif (strlen($message) < 10) {
            $errors[] = "Message must be at least 10 characters.";
        }

        // --- If no errors, mark success ---
        if (empty($errors)) {
            $success = true;
        }
    }
    ?>

    <?php if ($success): ?>
        <!-- SUCCESS MESSAGE -->
        <div class="success">
            <h3>✅ Message Sent Successfully!</h3>
            <p><strong>Name:</strong>    <?php echo htmlspecialchars($name); ?></p>
            <p><strong>Email:</strong>   <?php echo htmlspecialchars($email); ?></p>
            <p><strong>Phone:</strong>   <?php echo htmlspecialchars($phone); ?></p>
            <p><strong>Message:</strong> <?php echo htmlspecialchars($message); ?></p>
        </div>
        <br>
    <?php endif; ?>

    <?php if (!empty($errors)): ?>
        <!-- ERROR MESSAGES -->
        <div class="error">
            <h3>❌ Please fix the following errors:</h3>
            <ul class="error-list">
                <?php foreach ($errors as $err): ?>
                    <li><?php echo $err; ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <br>
    <?php endif; ?>

    <!-- CONTACT FORM -->
    <form method="post" action="">
        <div class="form-group">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name"
                   value="<?php echo htmlspecialchars($name); ?>"
                   placeholder="Enter your full name">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"
                   value="<?php echo htmlspecialchars($email); ?>"
                   placeholder="example@email.com">
        </div>
        <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone"
                   value="<?php echo htmlspecialchars($phone); ?>"
                   placeholder="0912345678">
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message"
                      placeholder="Write your message here (min 10 characters)..."><?php echo htmlspecialchars($message); ?></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>
```

### Expected Output

**On initial load** — an empty form is displayed.

**On successful submission:**
```
✅ Message Sent Successfully!

Name:    Nguyen Van A
Email:   nva@example.com
Phone:   0912345678
Message: Hello, I would like to inquire about your services.
```

**On validation failure:**
```
❌ Please fix the following errors:
  • Full Name is required.
  • Please enter a valid email address.
  • Phone number must be 10–11 digits.
```

### Self-Check
- [ ] Form uses `method="post"` and submits to the same file
- [ ] All four fields are present (name, email, phone, message)
- [ ] Empty fields produce error messages
- [ ] Invalid email is caught by `filter_var()`
- [ ] Phone validation uses `preg_match()` for 10–11 digits
- [ ] Successful submission shows a green summary box
- [ ] Form retains values after a failed submission (`htmlspecialchars`)
- [ ] `htmlspecialchars()` is used to prevent XSS

---

## Exercise B: "Calculator Form" (Required)

### Task Description
Create a web-based **calculator** that takes two numbers and an operation (+, −, ×, ÷) from a dropdown, then displays the result. This exercises `POST` handling, arithmetic operations, and dropdown `<select>` elements.

### Step-by-Step Instructions
1. Create a new file named **`calculator.php`**.
2. Build a form with:
   - **Number 1** — text input
   - **Operation** — dropdown (`<select>`) with options: `+`, `−`, `×`, `÷`
   - **Number 2** — text input
3. When submitted, validate that:
   - Both inputs are **numeric** (use `is_numeric()`)
   - Division by **zero** is caught for the ÷ operation
4. Perform the calculation and display the result.
5. Format the output as a clear equation: e.g., `15 + 7 = 22`.

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Form</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
        .form-row { display: flex; gap: 10px; align-items: center; margin-bottom: 15px; flex-wrap: wrap; }
        input[type="text"], select {
            padding: 10px; font-size: 16px; border: 2px solid #ddd;
            border-radius: 6px; text-align: center;
        }
        input[type="text"] { width: 120px; }
        select { width: 60px; }
        button {
            background-color: #27ae60; color: white; padding: 12px 30px;
            border: none; border-radius: 6px; font-size: 16px; cursor: pointer;
        }
        button:hover { background-color: #219a52; }
        .result-box {
            margin-top: 20px; padding: 20px; background: #d5f5e3;
            border: 2px solid #27ae60; border-radius: 8px; text-align: center;
            font-size: 1.5em;
        }
        .error-box {
            margin-top: 20px; padding: 15px; background: #f8d7da;
            border: 2px solid #dc3545; border-radius: 8px; color: #721c24;
        }
    </style>
</head>
<body>
    <h1>🧮 Calculator</h1>

    <?php
    $num1 = "";
    $num2 = "";
    $operation = "+";
    $result = null;
    $error = "";

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $num1      = $_POST["num1"]      ?? "";
        $num2      = $_POST["num2"]      ?? "";
        $operation = $_POST["operation"] ?? "+";

        // --- Validate inputs ---
        if (!is_numeric($num1) || !is_numeric($num2)) {
            $error = "❌ Both inputs must be valid numbers.";
        } elseif ($operation === "/" && (float)$num2 == 0) {
            $error = "❌ Cannot divide by zero!";
        } else {
            $n1 = (float) $num1;
            $n2 = (float) $num2;

            // TODO: Perform calculation based on the selected operation
            switch ($operation) {
                case "+":
                    $result = $n1 + $n2;
                    $opSymbol = "+";
                    break;
                case "-":
                    $result = $n1 - $n2;
                    $opSymbol = "−";
                    break;
                case "*":
                    $result = $n1 * $n2;
                    $opSymbol = "×";
                    break;
                case "/":
                    $result = $n1 / $n2;
                    $opSymbol = "÷";
                    break;
                default:
                    $error = "❌ Invalid operation.";
            }
        }
    }
    ?>

    <?php if ($result !== null): ?>
        <div class="result-box">
            <?php echo $num1 . " " . $opSymbol . " " . $num2 . " = " . round($result, 4); ?>
        </div>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <div class="error-box"><?php echo $error; ?></div>
    <?php endif; ?>

    <form method="post" action="">
        <div class="form-row">
            <input type="text" name="num1"
                   value="<?php echo htmlspecialchars($num1); ?>"
                   placeholder="Number 1">

            <select name="operation">
                <option value="+" <?php echo ($operation === "+") ? "selected" : ""; ?>>+</option>
                <option value="-" <?php echo ($operation === "-") ? "selected" : ""; ?>>−</option>
                <option value="*" <?php echo ($operation === "*") ? "selected" : ""; ?>>×</option>
                <option value="/" <?php echo ($operation === "/") ? "selected" : ""; ?>>÷</option>
            </select>

            <input type="text" name="num2"
                   value="<?php echo htmlspecialchars($num2); ?>"
                   placeholder="Number 2">
        </div>
        <button type="submit">Calculate</button>
    </form>
</body>
</html>
```

### Expected Output

**Calculation `15 + 7`:**
```
🧮 Calculator

    [ 15 ]  [ + ▼ ]  [ 7 ]

         [ Calculate ]

┌─────────────────────┐
│    15 + 7 = 22      │
└─────────────────────┘
```

**Division by zero:**
```
❌ Cannot divide by zero!
```

### Self-Check
- [ ] Form has two numeric inputs and one `<select>` dropdown
- [ ] All four operations (+, −, ×, ÷) work correctly
- [ ] Non-numeric input triggers an error message
- [ ] Division by zero is caught and reported
- [ ] The operation dropdown retains its selection after submit
- [ ] Result is displayed as a readable equation

---

## Exercise C: "Login Form" (Challenge / Bonus)

### Task Description
Create a **login form** with hardcoded credentials (`admin` / `123456`). Track the number of **failed login attempts** using PHP sessions. Lock the user out after **3 failed attempts**. This exercise practices `POST` handling, `session_start()`, and basic security concepts.

### Step-by-Step Instructions
1. Create a new file named **`login.php`**.
2. Start a PHP session at the top with `session_start()`.
3. Store the correct credentials in variables: `$validUser = "admin"` and `$validPass = "123456"`.
4. Initialize `$_SESSION["attempts"]` to `0` if it doesn't exist.
5. On form submission:
   - If `$_SESSION["attempts"] >= 3`: show "Account locked" message.
   - If credentials match: show success, reset attempts to 0.
   - If credentials don't match: increment attempts, show remaining tries.
6. Add a **"Reset Attempts"** button/link to restart.

### Starter Code

```php
<?php
session_start();

$validUser = "admin";
$validPass = "123456";
$maxAttempts = 3;

// Initialize session attempts counter
if (!isset($_SESSION["attempts"])) {
    $_SESSION["attempts"] = 0;
}

$message = "";
$msgType = "";
$loggedIn = false;

// --- Handle Reset ---
if (isset($_GET["reset"])) {
    $_SESSION["attempts"] = 0;
    $message = "🔄 Attempts counter has been reset.";
    $msgType = "info";
}

// --- Handle Login ---
if ($_SERVER["REQUEST_METHOD"] === "POST" && !isset($_GET["reset"])) {
    $username = trim($_POST["username"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if ($_SESSION["attempts"] >= $maxAttempts) {
        $message = "🔒 Account locked due to too many failed attempts. Please reset.";
        $msgType = "error";
    } elseif (empty($username) || empty($password)) {
        $message = "❌ Please fill in both fields.";
        $msgType = "error";
    } elseif ($username === $validUser && $password === $validPass) {
        $message = "✅ Welcome, " . htmlspecialchars($username) . "! Login successful.";
        $msgType = "success";
        $_SESSION["attempts"] = 0;
        $loggedIn = true;
    } else {
        $_SESSION["attempts"]++;
        $remaining = $maxAttempts - $_SESSION["attempts"];
        $message = "❌ Invalid credentials. " . $remaining . " attempt(s) remaining.";
        $msgType = "error";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <style>
        body {
            font-family: Arial, sans-serif; background-color: #ecf0f1;
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh; margin: 0;
        }
        .login-box {
            background: white; padding: 40px; border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 350px;
        }
        h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input[type="text"], input[type="password"] {
            width: 100%; padding: 10px; border: 2px solid #ddd;
            border-radius: 6px; font-size: 14px; box-sizing: border-box;
        }
        button {
            width: 100%; padding: 12px; background-color: #3498db;
            color: white; border: none; border-radius: 6px;
            font-size: 16px; cursor: pointer; margin-top: 10px;
        }
        button:hover { background-color: #2980b9; }
        .msg { padding: 12px; border-radius: 6px; margin-bottom: 15px; text-align: center; }
        .msg.success { background: #d4edda; color: #155724; border: 1px solid #28a745; }
        .msg.error   { background: #f8d7da; color: #721c24; border: 1px solid #dc3545; }
        .msg.info    { background: #d1ecf1; color: #0c5460; border: 1px solid #17a2b8; }
        .reset-link { text-align: center; margin-top: 15px; }
        .reset-link a { color: #3498db; text-decoration: none; }
        .reset-link a:hover { text-decoration: underline; }
        .attempts-info { text-align: center; color: #777; font-size: 0.9em; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>🔐 Login</h2>

        <?php if (!empty($message)): ?>
            <div class="msg <?php echo $msgType; ?>"><?php echo $message; ?></div>
        <?php endif; ?>

        <?php if (!$loggedIn): ?>
            <form method="post" action="">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"
                           placeholder="Enter username"
                           <?php echo ($_SESSION["attempts"] >= $maxAttempts) ? "disabled" : ""; ?>>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"
                           placeholder="Enter password"
                           <?php echo ($_SESSION["attempts"] >= $maxAttempts) ? "disabled" : ""; ?>>
                </div>
                <button type="submit"
                    <?php echo ($_SESSION["attempts"] >= $maxAttempts) ? "disabled" : ""; ?>>
                    Login
                </button>
            </form>
        <?php endif; ?>

        <div class="reset-link">
            <a href="?reset">🔄 Reset Attempts</a>
        </div>

        <div class="attempts-info">
            Attempts used: <?php echo $_SESSION["attempts"]; ?> / <?php echo $maxAttempts; ?>
        </div>
    </div>
</body>
</html>
```

### Expected Output

**Successful login:**
```
✅ Welcome, admin! Login successful.
```

**Failed login (1st attempt):**
```
❌ Invalid credentials. 2 attempt(s) remaining.
   Attempts used: 1 / 3
```

**After 3 failed attempts:**
```
🔒 Account locked due to too many failed attempts. Please reset.
   [ Username field: disabled ]  [ Password field: disabled ]
   [ Login button: disabled ]
   🔄 Reset Attempts
   Attempts used: 3 / 3
```

### Self-Check
- [ ] `session_start()` is called at the very top of the file
- [ ] Correct credentials are `admin` / `123456`
- [ ] Failed login increments the attempt counter
- [ ] Account locks after 3 failed attempts (inputs disabled)
- [ ] Successful login resets the counter to 0
- [ ] "Reset Attempts" link clears the session counter
- [ ] Form fields and button are disabled when locked

---

## Submission Checklist
- [ ] **Exercise A:** `contact.php` — form with validation, success/error display
- [ ] **Exercise B:** `calculator.php` — two numbers, dropdown, arithmetic operations
- [ ] **Exercise C:** `login.php` — hardcoded credentials, session-based attempt tracking *(bonus)*
- [ ] All files are saved inside `C:\xampp\htdocs\INS3064\session03\`
- [ ] All pages load correctly in the browser
- [ ] Files are uploaded to LMS before the deadline

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and runs without errors | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if file loads, displays expected output, and uses required PHP features
- Deduct 2 pts if file does not run (syntax errors, wrong file name)
- Deduct 1 pt if output is incomplete or missing key requirements
