# 📋 CHEAT SHEET
# **PHP & MySQL Quick Reference**

---

## PHP BASICS

### Variables & Data Types
```php
$string = "Hello";
$int = 42;
$float = 3.14;
$bool = true;
$array = [1, 2, 3];
$null = null;
```

### Operators
```php
// Arithmetic: + - * / % **
// Assignment: = += -= *= /= .= 
// Comparison: == === != !== < > <= >=
// Logical: && || ! and or
// String: . (concatenation)
```

### Control Structures
```php
// If-else
if ($condition) { } elseif ($other) { } else { }

// Switch
switch ($var) { case 'a': break; default: }

// Ternary
$result = $condition ? 'yes' : 'no';

// Null coalescing
$value = $var ?? 'default';
```

### Loops
```php
for ($i = 0; $i < 10; $i++) { }
while ($condition) { }
do { } while ($condition);
foreach ($array as $item) { }
foreach ($array as $key => $value) { }
```

### Functions
```php
function name($param = 'default') {
    return $value;
}
```

---

## STRINGS

```php
strlen($str)           // Length
strtoupper($str)       // UPPERCASE
strtolower($str)       // lowercase
ucfirst($str)          // First letter uppercase
trim($str)             // Remove whitespace
substr($str, 0, 5)     // Substring
str_replace('a', 'b', $str)  // Replace
explode(',', $str)     // String to array
implode(',', $arr)     // Array to string
strpos($str, 'find')   // Find position
sprintf("Hello %s", $name)  // Format string
```

---

## ARRAYS

```php
count($arr)            // Count elements
array_push($arr, $val) // Add to end
array_pop($arr)        // Remove from end
array_merge($a, $b)    // Merge arrays
in_array($val, $arr)   // Check exists
array_key_exists($key, $arr)
array_keys($arr)       // Get keys
array_values($arr)     // Get values
sort($arr)             // Sort ascending
rsort($arr)            // Sort descending
array_filter($arr, $callback)
array_map($callback, $arr)
```

---

## SUPERGLOBALS

```php
$_GET['param']         // URL parameters
$_POST['field']        // Form POST data
$_REQUEST['data']      // GET + POST
$_SESSION['key']       // Session data
$_COOKIE['name']       // Cookie data
$_FILES['upload']      // File uploads
$_SERVER['REQUEST_METHOD']
$_SERVER['HTTP_HOST']
```

---

## FORM HANDLING

```php
// Sanitize
$input = trim($_POST['input']);
$input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

// Validate
filter_var($email, FILTER_VALIDATE_EMAIL);
filter_var($url, FILTER_VALIDATE_URL);
is_numeric($value);
empty($value);
isset($value);
```

---

## PDO DATABASE

```php
// Connect
$pdo = new PDO("mysql:host=localhost;dbname=db", "user", "pass");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Query
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Insert
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$stmt->execute([$name, $email]);
$lastId = $pdo->lastInsertId();

// Update
$stmt = $pdo->prepare("UPDATE users SET name = ? WHERE id = ?");
$stmt->execute([$name, $id]);

// Delete
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$id]);
```

---

## SQL QUICK REFERENCE

```sql
-- SELECT
SELECT * FROM table WHERE condition ORDER BY col DESC LIMIT 10;
SELECT col1, col2 FROM table WHERE col LIKE '%search%';
SELECT COUNT(*), AVG(price) FROM products GROUP BY category HAVING COUNT(*) > 5;

-- INSERT
INSERT INTO table (col1, col2) VALUES ('val1', 'val2');

-- UPDATE
UPDATE table SET col1 = 'val1' WHERE id = 1;

-- DELETE
DELETE FROM table WHERE id = 1;

-- JOIN
SELECT * FROM a INNER JOIN b ON a.id = b.a_id;
SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;

-- CREATE TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## SESSION & COOKIES

```php
// Session
session_start();
$_SESSION['user_id'] = 1;
unset($_SESSION['key']);
session_destroy();

// Cookie
setcookie('name', 'value', time() + 3600);
$_COOKIE['name'];
setcookie('name', '', time() - 3600);  // Delete
```

---

## PASSWORD

```php
// Hash
$hash = password_hash($password, PASSWORD_DEFAULT);

// Verify
if (password_verify($input, $hash)) {
    // Valid
}
```

---

## FILE UPLOAD

```php
$_FILES['file']['name']      // Original name
$_FILES['file']['tmp_name']  // Temp path
$_FILES['file']['size']      // Size in bytes
$_FILES['file']['type']      // MIME type
$_FILES['file']['error']     // Error code

move_uploaded_file($tmp, $destination);
```

---

## DATE/TIME

```php
date('Y-m-d')           // 2024-01-15
date('H:i:s')           // 14:30:00
date('d/m/Y H:i')       // 15/01/2024 14:30
time()                  // Unix timestamp
strtotime('+1 week')    // Parse date string
```

---

## ERROR HANDLING

```php
try {
    // Code that may throw exception
    throw new Exception('Error message');
} catch (Exception $e) {
    echo $e->getMessage();
} finally {
    // Always runs
}
```

---

## JQUERY

```javascript
// Selectors
$('#id')  $('.class')  $('element')

// DOM
$('#el').text()  .html()  .val()
$('#el').attr('href')  .addClass()  .removeClass()
$('#el').append()  .prepend()  .remove()

// Events
$('#el').click(function() {})
$('#el').on('click', function() {})

// AJAX
$.ajax({ url: '', method: 'GET', success: function(data) {} });
$.get(url, data, callback);
$.post(url, data, callback);

// Effects
$('#el').hide()  .show()  .toggle()
$('#el').fadeIn()  .fadeOut()
$('#el').slideUp()  .slideDown()
```

---

**Happy coding! 🚀**
