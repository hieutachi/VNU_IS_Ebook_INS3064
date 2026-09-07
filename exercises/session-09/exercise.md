# Session 9 — In-Class Exercise: Error Handling and Debugging

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session09_exercise.php`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session09\`
2. Test each file in browser via `http://localhost/INS3064/session09/`
3. Compress the folder into a `.zip` named `session09_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Use `try-catch-finally` blocks to handle runtime errors gracefully
- Create and throw custom exception classes for domain-specific errors
- Implement a simple file-based error logger with log levels
- Display user-friendly error messages while logging technical details

---

## Exercise A: Safe Form Processing with Try-Catch (Required)

### Task Description

Wrap a registration form processor in a `try-catch` block so that any unexpected error during processing is caught and a friendly message is displayed to the user. This exercise simulates a real-world scenario where form data is processed, and errors can occur at multiple steps (validation, duplicate checking, saving).

### Step-by-Step Instructions

1. Create a registration form with fields: `username`, `email`, `password`, `confirm_password`.
2. On submission, wrap the entire processing logic in a `try` block.
3. Perform validation and throw an `Exception` with a descriptive message for each failure:
   - Empty fields → `"All fields are required."`
   - Password < 8 characters → `"Password must be at least 8 characters."`
   - Passwords don't match → `"Passwords do not match."`
   - Invalid email → `"Please enter a valid email address."`
4. Simulate a "duplicate username" check: if username is `"admin"`, throw an `Exception` with `"Username 'admin' is already taken."`.
5. Simulate a "database save" step: if username starts with `"error_"`, throw an `Exception` with `"Failed to save user to database."`.
6. On success, display a green success panel.
7. Use `catch (Exception $e)` to display the error message to the user.
8. Use `finally` to always log "Processing attempt completed" to the page.

### Starter Code

```php
<?php
// Session 09 — Exercise A: Safe Form Processing

$errors = [];
$success = false;
$successMessage = '';
$errorMessage = '';
$processingLog = '';

$username  = '';
$email     = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Store submitted values for re-population
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm_password'] ?? '';

    try {
        // Step 1: Validate all fields are filled
        if (empty($username) || empty($email) || empty($password) || empty($confirm)) {
            throw new Exception("All fields are required.");
        }

        // Step 2: Validate email format
        // TODO: Use filter_var() with FILTER_VALIDATE_EMAIL
        //       Throw Exception if invalid

        // Step 3: Validate password length
        // TODO: Check strlen($password) >= 8

        // Step 4: Validate password match
        // TODO: Compare $password and $confirm

        // Step 5: Simulate duplicate username check
        // TODO: If $username === 'admin', throw Exception "Username 'admin' is already taken."

        // Step 6: Simulate database save failure
        // TODO: If username starts with 'error_', throw Exception "Failed to save user to database."

        // Step 7: If we reach here, registration was successful
        $success = true;
        $successMessage = "User '$username' registered successfully!";

    } catch (Exception $e) {
        $errorMessage = $e->getMessage();
    } finally {
        $processingLog = "Processing attempt completed at " . date('H:i:s');
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 09 — Safe Form Processing</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input { width: 100%; padding: 8px; box-sizing: border-box; }
        .success-panel { background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 4px; margin-bottom: 15px; }
        .error-panel  { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 4px; margin-bottom: 15px; }
        .log-panel    { background: #e2e3e5; border: 1px solid #6c757d; padding: 10px; border-radius: 4px; margin-top: 15px; font-size: 0.85em; color: #555; }
    </style>
</head>
<body>
    <h1>🔐 Safe Registration</h1>

    <?php if ($success): ?>
        <div class="success-panel">
            ✅ <?= htmlspecialchars($successMessage) ?>
        </div>
    <?php endif; ?>

    <?php if ($errorMessage): ?>
        <div class="error-panel">
            ❌ <?= htmlspecialchars($errorMessage) ?>
        </div>
    <?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username"
                   value="<?= htmlspecialchars($username) ?>">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" name="email"
                   value="<?= htmlspecialchars($email) ?>">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password">
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password">
        </div>
        <button type="submit">Register</button>
    </form>

    <?php if ($processingLog): ?>
        <div class="log-panel">
            📋 <?= htmlspecialchars($processingLog) ?>
        </div>
    <?php endif; ?>
</body>
</html>
```

### Expected Output

**Successful registration:**
```
✅ User 'nguyen_an' registered successfully!
📋 Processing attempt completed at 14:30:22
```

**Validation error (e.g., short password):**
```
❌ Password must be at least 8 characters.
📋 Processing attempt completed at 14:30:22
```

**Simulated duplicate:**
```
❌ Username 'admin' is already taken.
📋 Processing attempt completed at 14:30:22
```

### Self-Check

- [ ] Empty submission shows "All fields are required."
- [ ] Invalid email shows email error
- [ ] Password "123" shows length error
- [ ] Mismatched passwords show match error
- [ ] Username "admin" shows "already taken"
- [ ] Username "error_test" shows database save error
- [ ] Valid input shows green success panel
- [ ] Log panel always appears (the `finally` block runs)
- [ ] Form fields re-populate after failed submission

---

## Exercise B: Custom Exceptions (Required)

### Task Description

Create **two custom exception classes** — `ValidationException` and `DatabaseException` — then use them in a simulated user registration controller. This demonstrates how real applications use different exception types to handle different categories of errors differently.

### Step-by-Step Instructions

1. Create `ValidationException` that extends `Exception`:
   - Add a property `$errors` (array of field-level errors)
   - Override the constructor to accept the errors array
   - Add a method `getErrors(): array`
2. Create `DatabaseException` that extends `Exception`:
   - Add a property `$query` (the SQL that failed)
   - Override the constructor to accept message and query string
   - Add a method `getQuery(): string`
3. Create a `UserRegistrationController` class with methods:
   - `validate(array $data): void` — validates input, throws `ValidationException` with an errors array
   - `saveToDatabase(array $data): void` — simulates saving, throws `DatabaseException` if username starts with `"db_error_"`
   - `register(array $data): string` — calls validate then save, returns success message
4. In the main script, call `$controller->register($_POST)` inside a `try-catch` that catches each exception type separately.

### Starter Code

```php
<?php
// Session 09 — Exercise B: Custom Exceptions

// ============================================
// Custom Exception Classes
// ============================================

class ValidationException extends Exception {
    private array $errors;

    public function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct("Validation failed with " . count($errors) . " error(s).");
    }

    // TODO: Add getErrors() method
    // public function getErrors(): array { ... }
}

class DatabaseException extends Exception {
    private string $query;

    public function __construct(string $message, string $query) {
        $this->query = $query;
        parent::__construct($message);
    }

    // TODO: Add getQuery() method
    // public function getQuery(): string { ... }
}

// ============================================
// Controller Class
// ============================================

class UserRegistrationController {

    /**
     * Validate input data. Throw ValidationException if any checks fail.
     */
    public function validate(array $data): void {
        $errors = [];

        // TODO: Check 'username' is not empty and >= 3 chars
        //       If invalid: $errors['username'] = 'Username must be at least 3 characters.';

        // TODO: Check 'email' with filter_var

        // TODO: Check 'password' length >= 8

        // TODO: If $errors is not empty, throw new ValidationException($errors)
    }

    /**
     * Simulate saving to database. Throw DatabaseException on simulated failure.
     */
    public function saveToDatabase(array $data): void {
        // TODO: If username starts with 'db_error_', throw new DatabaseException(
        //     "Connection refused: Could not connect to MySQL server.",
        //     "INSERT INTO users (username, email) VALUES (?, ?)"
        // );
    }

    /**
     * Registration workflow: validate → save → success
     */
    public function register(array $data): string {
        // TODO: Call $this->validate($data)
        // TODO: Call $this->saveToDatabase($data)
        // TODO: Return "User '{$data['username']}' registered successfully!"
    }
}

// ============================================
// Main Script
// ============================================

$controller = new UserRegistrationController();
$result = '';
$resultType = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $result = $controller->register($_POST);
        $resultType = 'success';

    } catch (ValidationException $e) {
        // TODO: Set $errors = $e->getErrors()
        //       Set $resultType = 'validation'
        //       Display field-level errors

    } catch (DatabaseException $e) {
        // TODO: Set $resultType = 'database'
        //       Display: $e->getMessage() and $e->getQuery()
        //       In production, you would log this, not show the query to users!

    } catch (Exception $e) {
        // Catch-all for unexpected errors
        $result = "An unexpected error occurred: " . $e->getMessage();
        $resultType = 'error';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 09 — Custom Exceptions</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input { width: 100%; padding: 8px; box-sizing: border-box; }
        .success  { background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 4px; }
        .validation-errors { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; }
        .db-error { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 4px; }
        .field-error { color: red; font-size: 0.85em; margin-top: 3px; }
        code { background: #f4f4f4; padding: 2px 6px; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>🛡️ Custom Exception Handling</h1>

    <?php if ($resultType === 'success'): ?>
        <div class="success">✅ <?= htmlspecialchars($result) ?></div>
    <?php elseif ($resultType === 'validation'): ?>
        <div class="validation-errors">
            <strong>⚠ Validation Errors:</strong>
            <ul>
                <?php foreach ($errors as $field => $msg): ?>
                    <li><strong><?= htmlspecialchars($field) ?>:</strong> <?= htmlspecialchars($msg) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php elseif ($resultType === 'database'): ?>
        <div class="db-error">
            ❌ <strong>Database Error:</strong> <?= htmlspecialchars($result) ?><br>
            <small>Failed Query: <code><?= htmlspecialchars($failedQuery ?? '') ?></code></small>
        </div>
    <?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" name="email" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password">
        </div>
        <button type="submit">Register</button>
    </form>

    <hr>
    <p><strong>Test cases:</strong></p>
    <ul>
        <li>Leave fields empty → ValidationException</li>
        <li>Username <code>ab</code> → ValidationException (too short)</li>
        <li>Username <code>db_error_user</code> → DatabaseException</li>
        <li>Valid data → Success</li>
    </ul>
</body>
</html>
```

### Expected Output

**ValidationException triggered (empty fields):**
```
⚠ Validation Errors:
  • username: Username must be at least 3 characters.
  • email: Please enter a valid email address.
  • password: Password must be at least 8 characters.
```

**DatabaseException triggered (username = db_error_test):**
```
❌ Database Error: Connection refused: Could not connect to MySQL server.
Failed Query: INSERT INTO users (username, email) VALUES (?, ?)
```

**Success:**
```
✅ User 'nguyen_an' registered successfully!
```

### Self-Check

- [ ] `ValidationException` stores an array of field-level errors
- [ ] `getErrors()` returns the errors array
- [ ] `DatabaseException` stores the failed SQL query
- [ ] `getQuery()` returns the query string
- [ ] `catch (ValidationException $e)` is caught separately from `catch (DatabaseException $e)`
- [ ] Empty submission triggers ValidationException with multiple field errors
- [ ] Username "db_error_test" triggers DatabaseException
- [ ] Valid data returns the success message
- [ ] The catch-all `Exception` block handles any other unexpected errors

---

## Exercise C: Error Logger (Challenge/Bonus)

### Task Description

Build a reusable `ErrorLogger` class that writes log entries to a file with **log levels** (INFO, WARNING, ERROR) and timestamps. Integrate it with the registration form from Exercise A to log all processing events.

### Step-by-Step Instructions

1. Create an `ErrorLogger` class with:
   - Constructor that accepts a log file path (default: `app.log`)
   - Methods: `info(string $message)`, `warning(string $message)`, `error(string $message)`
   - Private method `write(string $level, string $message)` that:
     - Formats the entry: `[2024-11-15 14:30:22] [INFO] User registered: nguyen_an`
     - Appends to the log file using `file_put_contents()` with `FILE_APPEND`
     - Creates the log directory if it doesn't exist
2. Integrate the logger with Exercise A's form processing:
   - Log INFO when processing starts
   - Log WARNING for validation failures
   - Log ERROR for simulated database failures
   - Log INFO on successful registration
3. Display the last 5 log entries at the bottom of the page.

### Starter Code

```php
<?php
// Session 09 — Exercise C: Error Logger

class ErrorLogger {
    private string $logFile;

    public function __construct(string $logFile = 'logs/app.log') {
        $this->logFile = $logFile;
        // TODO: Create log directory if it doesn't exist
        // $dir = dirname($this->logFile);
        // if (!is_dir($dir)) { mkdir($dir, 0755, true); }
    }

    public function info(string $message): void {
        // TODO: Call $this->write('INFO', $message)
    }

    public function warning(string $message): void {
        // TODO: Call $this->write('WARNING', $message)
    }

    public function error(string $message): void {
        // TODO: Call $this->write('ERROR', $message)
    }

    private function write(string $level, string $message): void {
        // TODO: Format log entry
        // $timestamp = date('Y-m-d H:i:s');
        // $entry = "[$timestamp] [$level] $message" . PHP_EOL;
        // file_put_contents($this->logFile, $entry, FILE_APPEND | LOCK_EX);
    }

    /**
     * Read the last N lines from the log file.
     */
    public function getRecentLogs(int $count = 5): array {
        // TODO: Read the log file
        // If file doesn't exist, return []
        // $lines = file($this->logFile, FILE_IGNORE_NEW_LINES);
        // return array_slice($lines, -$count);
    }
}

// ============================================
// Usage with form processing
// ============================================

$logger = new ErrorLogger('logs/app.log');
$success = false;
$errorMessage = '';
$successMessage = '';
$username = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm_password'] ?? '';

    // TODO: Log INFO: "Registration attempt for username: $username"
    // $logger->info("Registration attempt for username: $username");

    try {
        if (empty($username) || empty($email) || empty($password) || empty($confirm)) {
            // TODO: Log WARNING: "Validation failed: empty fields"
            throw new Exception("All fields are required.");
        }

        if (strlen($password) < 8) {
            // TODO: Log WARNING: "Validation failed: password too short"
            throw new Exception("Password must be at least 8 characters.");
        }

        if ($password !== $confirm) {
            // TODO: Log WARNING: "Validation failed: passwords don't match"
            throw new Exception("Passwords do not match.");
        }

        if ($username === 'admin') {
            // TODO: Log WARNING: "Duplicate username attempt: admin"
            throw new Exception("Username 'admin' is already taken.");
        }

        if (str_starts_with($username, 'error_')) {
            // TODO: Log ERROR: "Database save failed for username: $username"
            throw new Exception("Failed to save user to database.");
        }

        // Success
        // TODO: Log INFO: "User registered successfully: $username"
        $success = true;
        $successMessage = "User '$username' registered successfully!";

    } catch (Exception $e) {
        $errorMessage = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 09 — Error Logger</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input { width: 100%; padding: 8px; box-sizing: border-box; }
        .success { background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 4px; }
        .error   { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 4px; }
        .log-box { background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 0.85em; margin-top: 20px; }
        .log-box .info    { color: #4fc1ff; }
        .log-box .warning { color: #cca700; }
        .log-box .error   { color: #f44747; }
    </style>
</head>
<body>
    <h1>📋 Error Logger Demo</h1>

    <?php if ($success): ?>
        <div class="success">✅ <?= htmlspecialchars($successMessage) ?></div>
    <?php elseif ($errorMessage): ?>
        <div class="error">❌ <?= htmlspecialchars($errorMessage) ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" value="<?= htmlspecialchars($username) ?>">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" name="email" value="<?= htmlspecialchars($email) ?>">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password">
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password">
        </div>
        <button type="submit">Register</button>
    </form>

    <h2>📜 Recent Log Entries</h2>
    <div class="log-box">
        <?php
        // TODO: Get recent logs and display them
        // $recentLogs = $logger->getRecentLogs(5);
        // if (empty($recentLogs)) {
        //     echo "<em>No log entries yet.</em>";
        // } else {
        //     foreach ($recentLogs as $line) {
        //         // Color-code based on log level
        //         $line = htmlspecialchars($line);
        //         $line = preg_replace('/\[INFO\]/', '<span class="info">[INFO]</span>', $line);
        //         $line = preg_replace('/\[WARNING\]/', '<span class="warning">[WARNING]</span>', $line);
        //         $line = preg_replace('/\[ERROR\]/', '<span class="error">[ERROR]</span>', $line);
        //         echo $line . "<br>";
        //     }
        // }
        ?>
    </div>
</body>
</html>
```

### Expected Output

After several form submissions, the log box at the bottom shows:

```
[2024-11-15 14:30:15] [INFO] Registration attempt for username: admin
[2024-11-15 14:30:15] [WARNING] Duplicate username attempt: admin
[2024-11-15 14:30:22] [INFO] Registration attempt for username: nguyen_an
[2024-11-15 14:30:22] [INFO] User registered successfully: nguyen_an
[2024-11-15 14:30:30] [INFO] Registration attempt for username: error_test
[2024-11-15 14:30:30] [ERROR] Database save failed for username: error_test
```

The log file `logs/app.log` contains all entries (not just the last 5).

### Self-Check

- [ ] `ErrorLogger` constructor creates the `logs/` directory if missing
- [ ] `write()` formats entries with timestamp and level
- [ ] `write()` appends to the file (does not overwrite)
- [ ] `info()`, `warning()`, `error()` are public convenience methods
- [ ] `getRecentLogs()` returns the last N lines
- [ ] Validation failures are logged as WARNING
- [ ] Database failures are logged as ERROR
- [ ] Successful registration is logged as INFO
- [ ] Log entries are color-coded in the HTML display
- [ ] Log file grows with each submission (check `logs/app.log`)

---

## Submission Checklist

- [ ] Exercise A: All validation cases handled with try-catch, `finally` block always runs
- [ ] Exercise B: `ValidationException` and `DatabaseException` classes created and used
- [ ] Exercise B: Separate catch blocks for each exception type
- [ ] Exercise C: `ErrorLogger` class writes to file with proper formatting
- [ ] Exercise C: Log levels (INFO, WARNING, ERROR) used correctly
- [ ] Exercise C: Recent log entries displayed on page
- [ ] File saved as `session09_exercise.php` and uploaded to LMS

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and runs without errors | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if file loads, displays expected output, and uses try-catch correctly
- Deduct 2 pts if file does not run (syntax errors)
- Deduct 1 pt if error handling is incomplete or missing key requirements
