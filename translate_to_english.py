#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to translate Vietnamese content to English
Creates complete English version files
"""

import os
import re

# Translation mappings for common terms
TRANSLATIONS = {
    "Buổi": "Session",
    "buổi": "session",
    "Mục tiêu": "Objectives",
    "mục tiêu": "objectives",
    "Lý thuyết": "Theory",
    "lý thuyết": "theory",
    "Thực hành": "Practice",
    "thực hành": "practice",
    "Ví dụ": "Example",
    "ví dụ": "example",
    "Bài tập": "Exercise",
    "bài tập": "exercise",
    "Hướng dẫn": "Instructions",
    "hướng dẫn": "instructions",
    "Kết quả": "Result",
    "kết quả": "result",
    "Giải thích": "Explanation",
    "giải thích": "explanation",
    "Tóm tắt": "Summary",
    "tóm tắt": "summary",
    "Chuẩn bị": "Preparation",
    "chuẩn bị": "preparation",
    "Phiếu học tập": "Worksheet",
    "phiếu học tập": "worksheet",
    "Tài liệu tham khảo": "Reference Materials",
    "tài liệu tham khảo": "reference materials",
}

def translate_content(content):
    """Translate Vietnamese content to English"""
    # This is a simplified version - in production, use proper translation API
    # For now, we'll create files manually with proper translations
    
    # Basic replacements
    for vn, en in TRANSLATIONS.items():
        content = content.replace(vn, en)
    
    return content

def create_session_02_english():
    """Create Session 02 English version with full content"""
    content = """# 🟦 SESSION 02
# **PROGRAMMING PHP - VARIABLES, DATA TYPES, OPERATORS**

Today we will learn how to store and process data in PHP - the most important foundation of programming!

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 2 - PHP & MySQL Web Development
🎯 Objectives:
   - Declare and use variables
   - Understand data types
   - Use operators
   - Write control structures

📖 Preparation: Complete Session 01 exercises
🔗 Learning Outcomes: LO1
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will:

- **Declare variables** correctly in PHP
- **Distinguish** between data types
- **Use** various operators
- **Write** control structures if-else, switch
- **Create** loops for, while, foreach

---

# THEORY

## 1. VARIABLES IN PHP

### 1.1 What is a Variable?

**Variable** = Container for data, can change value during program execution.

### 🎒 Real-life Analogy

Variables are like **labeled containers**:
- Label = Variable name (`$name`)
- Content = Value (`"John Doe"`)
- You can change the content anytime

### 1.2 Variable Naming Rules

```php
<?php
// ✅ Correct
$name = "John";           // Lowercase
$userName = "john123";    // camelCase (recommended)
$user_name = "john123";   // snake_case
$_private = "secret";     // Starts with _
$name2 = "Jane";          // Contains number (not at start)

// ❌ Wrong
$2name = "Error";         // Starts with number
$user-name = "Error";     // Contains hyphen
$user name = "Error";     // Contains space
?>
```

### 📋 Rules:
| Rule | Example |
|------|---------|
| Must start with `$` | `$name` |
| Next: letter or `_` | `$_name`, `$name` |
| Can contain numbers (not at start) | `$name1` |
| Case-sensitive | `$Name` ≠ `$name` |

### 1.3 Variable Declaration

```php
<?php
// Declare and assign value
$name = "John Doe";
$age = 20;
$gpa = 3.5;
$isStudent = true;

// Display variables
echo "Name: $name<br>";
echo "Age: $age<br>";
echo "GPA: $gpa<br>";
echo "Is Student: " . ($isStudent ? "Yes" : "No");
?>
```

---

## 2. DATA TYPES

### 2.1 Basic Data Types

| Type | Description | Example |
|------|-------------|---------|
| **String** | Character string | `"Hello"`, `'World'` |
| **Integer** | Whole number | `42`, `-10`, `0` |
| **Float** | Decimal number | `3.14`, `-2.5` |
| **Boolean** | True/False | `true`, `false` |
| **Array** | Array | `[1, 2, 3]` |
| **NULL** | No value | `null` |

### 2.2 String

```php
<?php
// Single quotes - Literal string
$str1 = 'Hello World';
$str1 = 'Hello $name';  // Output: Hello $name (doesn't parse variable)

// Double quotes - Parsed string
$name = "John";
$str2 = "Hello $name";  // Output: Hello John (parses variable)
$str3 = "Hello {$name}!"; // Output: Hello John!

// String concatenation with dot (.)
$greeting = "Hello, " . $name . "!";

// Heredoc - Multi-line string
$html = <<<HTML
<div>
    <h1>Hello $name</h1>
    <p>Welcome!</p>
</div>
HTML;

// Common string functions
echo strlen("Hello");        // 5 - Length
echo strtoupper("hello");    // HELLO - Uppercase
echo strtolower("HELLO");    // hello - Lowercase
echo substr("Hello", 0, 3);  // Hel - Substring
echo str_replace("o", "0", "Hello"); // Hell0 - Replace
?>
```

### 2.3 Integer & Float

```php
<?php
// Integer (Whole numbers)
$int1 = 42;
$int2 = -10;
$int3 = 0;

// Float (Decimal numbers)
$float1 = 3.14;
$float2 = -2.5;
$float3 = 1.5e3;  // 1500 (scientific notation)

// Type checking
var_dump($int1);   // int(42)
var_dump($float1); // float(3.14)

// Type casting
$str = "123";
$num = (int) $str;     // 123
$num = intval($str);   // 123

// Math functions
echo abs(-5);          // 5 - Absolute value
echo round(3.7);       // 4 - Round
echo ceil(3.2);        // 4 - Round up
echo floor(3.8);       // 3 - Round down
echo max(1, 5, 3);     // 5 - Maximum value
echo min(1, 5, 3);     // 1 - Minimum value
echo rand(1, 100);     // Random number 1-100
?>
```

### 2.4 Boolean

```php
<?php
$isActive = true;
$isDeleted = false;

// Values considered FALSE:
// - false
// - 0 (integer)
// - 0.0 (float)
// - "" (empty string)
// - "0" (string "0")
// - [] (empty array)
// - null

// Checking
if ($isActive) {
    echo "Account is active";
}
?>
```

### 2.5 Array

```php
<?php
// Indexed array
$fruits = ["Apple", "Banana", "Orange"];
$fruits = array("Apple", "Banana", "Orange"); // Old way

echo $fruits[0];  // Apple
echo $fruits[1];  // Banana

// Associative array (key-value)
$student = [
    "name" => "John Doe",
    "age" => 20,
    "gpa" => 3.5
];

echo $student["name"];  // John Doe

// Multidimensional array
$students = [
    ["name" => "A", "score" => 85],
    ["name" => "B", "score" => 90],
    ["name" => "C", "score" => 78]
];

echo $students[0]["name"];  // A

// Common array functions
$arr = [3, 1, 4, 1, 5];
echo count($arr);           // 5 - Count elements
sort($arr);                 // Sort ascending
rsort($arr);                // Sort descending
print_r($arr);              // Print array
array_push($arr, 9);        // Add to end
array_pop($arr);            // Remove from end
in_array(4, $arr);          // true - Check existence
?>
```

---

## 3. OPERATORS

### 3.1 Arithmetic Operators

```php
<?php
$a = 10;
$b = 3;

echo $a + $b;   // 13 - Addition
echo $a - $b;   // 7  - Subtraction
echo $a * $b;   // 30 - Multiplication
echo $a / $b;   // 3.333... - Division
echo $a % $b;   // 1  - Modulo (remainder)
echo $a ** $b;  // 1000 - Exponentiation (10^3)
?>
```

### 3.2 Assignment Operators

```php
<?php
$x = 10;

$x += 5;   // $x = $x + 5  → 15
$x -= 3;   // $x = $x - 3  → 12
$x *= 2;   // $x = $x * 2  → 24
$x /= 4;   // $x = $x / 4  → 6
$x %= 4;   // $x = $x % 4  → 2
$x .= "!"; // $x = $x . "!" → "2!"
?>
```

### 3.3 Comparison Operators

```php
<?php
$a = 5;
$b = "5";

// Value comparison
$a == $b;    // true (5 == "5")
$a != $b;    // false

// Value AND type comparison
$a === $b;   // false (int !== string)
$a !== $b;   // true

// Greater/Less than
$a > 3;      // true
$a < 3;      // false
$a >= 5;     // true
$a <= 5;     // true

// Spaceship operator (PHP 7+)
1 <=> 2;     // -1 (1 < 2)
2 <=> 2;     // 0  (2 == 2)
3 <=> 2;     // 1  (3 > 2)
?>
```

### 3.4 Logical Operators

```php
<?php
$a = true;
$b = false;

// AND - Both must be true
$a && $b;    // false
$a and $b;   // false

// OR - At least one true
$a || $b;    // true
$a or $b;    // true

// NOT - Invert
!$a;         // false
!$b;         // true

// XOR - Only one true
$a xor $b;   // true
?>
```

### 3.5 Increment/Decrement Operators

```php
<?php
$x = 5;

// Pre-increment/decrement (increment/decrement first, then use)
echo ++$x;  // 6 (increment x to 6, then print 6)
echo --$x;  // 5 (decrement x to 5, then print 5)

// Post-increment/decrement (use first, then increment/decrement)
echo $x++;  // 5 (print 5, then increment x to 6)
echo $x--;  // 6 (print 6, then decrement x to 5)
?>
```

---

## 4. CONTROL STRUCTURES

### 4.1 If-Else

```php
<?php
$score = 75;

// Simple if
if ($score >= 50) {
    echo "Pass";
}

// If-else
if ($score >= 50) {
    echo "Pass";
} else {
    echo "Fail";
}

// If-elseif-else
if ($score >= 90) {
    echo "Excellent";
} elseif ($score >= 80) {
    echo "Good";
} elseif ($score >= 70) {
    echo "Fair";
} elseif ($score >= 50) {
    echo "Average";
} else {
    echo "Poor";
}

// Ternary operator
$result = ($score >= 50) ? "Pass" : "Fail";
echo $result;

// Null coalescing (PHP 7+)
$name = $_GET['name'] ?? 'Guest';  // If not exists, use 'Guest'
?>
```

### 4.2 Switch

```php
<?php
$day = date("l");  // Get day of week name

switch ($day) {
    case "Monday":
        echo "Monday - Start of new week!";
        break;
    case "Tuesday":
        echo "Tuesday";
        break;
    case "Wednesday":
        echo "Wednesday - Midweek";
        break;
    case "Thursday":
        echo "Thursday";
        break;
    case "Friday":
        echo "Friday - Almost weekend!";
        break;
    case "Saturday":
    case "Sunday":
        echo "Weekend - Rest!";
        break;
    default:
        echo "Invalid day";
}
?>
```

### 4.3 For Loop

```php
<?php
// Basic for loop
for ($i = 1; $i <= 5; $i++) {
    echo "Count: $i<br>";
}

// For with array
$fruits = ["Apple", "Banana", "Orange"];
for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}

// Multiplication table
echo "<table border='1'>";
for ($i = 1; $i <= 10; $i++) {
    echo "<tr>";
    for ($j = 1; $j <= 10; $j++) {
        echo "<td>" . ($i * $j) . "</td>";
    }
    echo "</tr>";
}
echo "</table>";
?>
```

### 4.4 While Loop

```php
<?php
// While
$count = 1;
while ($count <= 5) {
    echo "Count: $count<br>";
    $count++;
}

// Do-while (executes at least once)
$num = 1;
do {
    echo "Number: $num<br>";
    $num++;
} while ($num <= 5);
?>
```

### 4.5 Foreach Loop

```php
<?php
// Foreach with indexed array
$colors = ["Red", "Green", "Blue"];
foreach ($colors as $color) {
    echo "$color<br>";
}

// Foreach with associative array
$student = [
    "name" => "John Doe",
    "age" => 20,
    "gpa" => 3.5
];

foreach ($student as $key => $value) {
    echo "$key: $value<br>";
}

// Foreach with multidimensional array
$students = [
    ["name" => "A", "score" => 85],
    ["name" => "B", "score" => 90]
];

foreach ($students as $index => $s) {
    echo ($index + 1) . ". {$s['name']}: {$s['score']} points<br>";
}
?>
```

---

## 5. FUNCTIONS

### 5.1 Basic Functions

```php
<?php
// Declare function
function sayHello() {
    echo "Hello World!";
}

// Call function
sayHello();

// Function with parameters
function greet($name) {
    echo "Hello, $name!";
}
greet("John");

// Function with default value
function greetWithDefault($name = "Guest") {
    echo "Hello, $name!";
}
greetWithDefault();      // Hello, Guest!
greetWithDefault("Jane"); // Hello, Jane!

// Function with return value
function add($a, $b) {
    return $a + $b;
}
$sum = add(5, 3);  // 8
?>
```

### 5.2 Functions With Type Hints (PHP 7+)

```php
<?php
// Type hints for parameters and return
function calculateArea(float $width, float $height): float {
    return $width * $height;
}

$area = calculateArea(5.5, 3.2);  // 17.6

// Nullable types
function findUser(?int $id): ?string {
    if ($id === null) {
        return null;
    }
    return "User $id";
}
?>
```

---

# EXAMPLES & ILLUSTRATIONS

## Example 1: Calculate Average Score

```php
<?php
// Calculate average score and grade

$math = 8.5;
$physics = 7.0;
$chemistry = 9.0;

// Calculate average
$average = ($math + $physics + $chemistry) / 3;
$average = round($average, 2);  // Round to 2 decimal places

// Grade classification
if ($average >= 9) {
    $grade = "Excellent";
} elseif ($average >= 8) {
    $grade = "Good";
} elseif ($average >= 7) {
    $grade = "Fair";
} elseif ($average >= 5) {
    $grade = "Average";
} else {
    $grade = "Poor";
}

echo "Average score: $average<br>";
echo "Grade: $grade";
?>
```

## Example 2: Student List

```php
<?php
$students = [
    ["name" => "John Doe", "score" => 85, "class" => "CS1"],
    ["name" => "Jane Smith", "score" => 92, "class" => "CS1"],
    ["name" => "Bob Johnson", "score" => 78, "class" => "CS2"],
    ["name" => "Alice Brown", "score" => 95, "class" => "CS2"],
];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student List</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #4CAF50; color: white; }
        tr:nth-child(even) { background: #f2f2f2; }
        .high { color: green; font-weight: bold; }
        .low { color: red; }
    </style>
</head>
<body>
    <h1>📋 Student List</h1>
    
    <table>
        <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Class</th>
            <th>Score</th>
            <th>Grade</th>
        </tr>
        
        <?php foreach ($students as $index => $student): ?>
        <tr>
            <td><?= $index + 1 ?></td>
            <td><?= $student['name'] ?></td>
            <td><?= $student['class'] ?></td>
            <td class="<?= $student['score'] >= 90 ? 'high' : ($student['score'] < 80 ? 'low' : '') ?>">
                <?= $student['score'] ?>
            </td>
            <td>
                <?php
                if ($student['score'] >= 90) echo "Excellent";
                elseif ($student['score'] >= 80) echo "Good";
                elseif ($student['score'] >= 70) echo "Fair";
                else echo "Average";
                ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <p><strong>Total students:</strong> <?= count($students) ?></p>
</body>
</html>
```

---

# PRACTICE

## EXERCISE 1: BMI Calculator

🎯 **Objective:** Calculate BMI and provide assessment

📝 **Requirements:**
- Declare variables for height (m) and weight (kg)
- Calculate BMI = weight / (height)²
- Assessment: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (>=30)

```php
<?php
// TODO: Complete code
$height = 1.70;  // meters
$weight = 65;    // kg

// Calculate BMI

// Assessment

// Display result
?>
```

---

## EXERCISE 2: Print Multiplication Table

🎯 **Objective:** Use nested loops

📝 **Requirements:**
- Print multiplication table from 2 to 9
- Beautiful HTML table format

---

## EXERCISE 3: Find Prime Numbers (Challenge)

🎯 **Objective:** Write function to check prime number

📝 **Requirements:**
- Write function `isPrime($n)` returns true/false
- Print all prime numbers from 1 to 100

---

# ✅ KNOWLEDGE TO ACHIEVE

### Theory
- [ ] Understand how to declare variables
- [ ] Distinguish between data types
- [ ] Can use operators

### Practice
- [ ] Can write if-else, switch
- [ ] Can write loops for, while, foreach
- [ ] Can write basic functions

---

# 📋 SESSION 02 WORKSHEET

**Name:** ___________________    **Student ID:** ___________

## A. Multiple Choice

1. Which variable name is correct?
   - A) `$2name`
   - B) `$_name`
   - C) `$user-name`
   - D) `name`

2. `5 == "5"` returns?
   - A) true
   - B) false
   - C) Error
   - D) null

3. `5 === "5"` returns?
   - A) true
   - B) false
   - C) Error
   - D) null

## B. Essay Questions

1. Write code to check if a number is even?

2. Write a loop to print numbers from 10 to 1 (countdown)?

## C. Practical Exercises

- [ ] Complete Exercise 1: BMI Calculator
- [ ] Complete Exercise 2: Multiplication table
- [ ] Complete Exercise 3: Prime numbers (Bonus)

---

# 🔗 PREPARATION FOR SESSION 03

**Next Session:** Dynamic Websites - Form Handling

### Will Learn:
- HTML Form
- GET vs POST
- Process form data
- Validation

---

**Next Chapter: [Session 03 - Dynamic Websites →](./session_03_dynamic_websites.md)**
"""
    
    os.makedirs('English/part_1_php_foundation', exist_ok=True)
    with open('English/part_1_php_foundation/session_02_programming_php.md', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Created Session 02 English version")

def create_session_03_english():
    """Create Session 03 English version with full content"""
    content = """# 🟦 SESSION 03
# **DYNAMIC WEBSITES - FORM HANDLING**

Today we will learn how to create interactive websites with users through Forms - the foundation of every web application!

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 3 - PHP & MySQL Web Development
🎯 Objectives:
   - Create HTML Forms
   - Understand GET vs POST
   - Process form data with PHP
   - Validate data

📖 Preparation: Complete Session 02 exercises
🔗 Learning Outcomes: LO1, LO2
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will:

- **Create** HTML Forms with various input types
- **Distinguish** GET and POST
- **Process** form data with `$_GET`, `$_POST`
- **Validate** input data
- **Build** basic registration and login forms

---

# THEORY

## 1. BASIC HTML FORM

### 1.1 Form Structure

```html
<form action="process.php" method="POST">
    <!-- Input elements -->
    <input type="text" name="username">
    <input type="submit" value="Submit">
</form>
```

### 📋 Form Attributes:

| Attribute | Description | Example |
|-----------|-------------|---------|
| `action` | URL to process form | `action="login.php"` |
| `method` | Submission method | `method="POST"` |
| `enctype` | Encoding type | `enctype="multipart/form-data"` |

### 1.2 Input Types

```html
<!-- Text input -->
<input type="text" name="username" placeholder="Enter name">

<!-- Password -->
<input type="password" name="password">

<!-- Email -->
<input type="email" name="email">

<!-- Number -->
<input type="number" name="age" min="1" max="100">

<!-- Textarea -->
<textarea name="message" rows="5" cols="30"></textarea>

<!-- Select dropdown -->
<select name="country">
    <option value="">-- Select --</option>
    <option value="vn">Vietnam</option>
    <option value="us">USA</option>
</select>

<!-- Radio buttons -->
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female

<!-- Checkbox -->
<input type="checkbox" name="agree" value="1"> I agree to terms

<!-- Hidden -->
<input type="hidden" name="token" value="abc123">

<!-- File upload -->
<input type="file" name="avatar">

<!-- Submit -->
<input type="submit" value="Submit">
<button type="submit">Submit</button>
```

---

## 2. GET VS POST

### 2.1 GET Method

```php
<!-- form_get.html -->
<form action="process.php" method="GET">
    <input type="text" name="search">
    <button type="submit">Search</button>
</form>

<!-- URL: process.php?search=php -->
```

```php
<?php
// process.php
$search = $_GET['search'] ?? '';
echo "You searched for: $search";
?>
```

### 2.2 POST Method

```php
<!-- form_post.html -->
<form action="process.php" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit">Login</button>
</form>
```

```php
<?php
// process.php
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
echo "Username: $username";
?>
```

### 🔍 Comparison: GET vs POST

| Feature | GET | POST |
|---------|-----|------|
| Data | Visible in URL | Hidden in body |
| Length | Limited (~2048 chars) | Unlimited |
| Security | Poor (exposed in URL) | Better |
| Bookmark | Can bookmark | Cannot bookmark |
| Cache | Can cache | Cannot cache |
| Usage | Search, filters | Login, registration |

---

## 3. PROCESSING FORMS WITH PHP

### 3.1 Superglobals

```php
<?php
// $_GET - Data from URL
$id = $_GET['id'];

// $_POST - Data from POST form
$name = $_POST['name'];

// $_REQUEST - Both GET and POST
$data = $_REQUEST['data'];

// $_SERVER - Server information
$method = $_SERVER['REQUEST_METHOD'];

// $_FILES - File upload
$file = $_FILES['avatar'];
?>
```

### 3.2 Check Form Submission

```php
<?php
// Method 1: Check REQUEST_METHOD
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form
}

// Method 2: Check isset
if (isset($_POST['submit'])) {
    // Process form
}

// Method 3: Check empty
if (!empty($_POST['username'])) {
    // Has data
}
?>
```

### 3.3 Self-Processing Form

```php
<?php
// contact.php
$message = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    
    // Validate
    if (empty($name)) {
        $errors[] = "Please enter name";
    }
    if (empty($email)) {
        $errors[] = "Please enter email";
    }
    
    // If no errors
    if (empty($errors)) {
        $message = "Thank you $name! We will contact you at $email";
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Contact</title></head>
<body>
    <?php if ($message): ?>
        <div class="success"><?= $message ?></div>
    <?php endif; ?>
    
    <?php if ($errors): ?>
        <div class="error">
            <?php foreach ($errors as $error): ?>
                <p><?= $error ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
    <form method="POST">
        <input type="text" name="name" value="<?= $name ?? '' ?>">
        <input type="email" name="email" value="<?= $email ?? '' ?>">
        <button type="submit">Send</button>
    </form>
</body>
</html>
```

---

## 4. DATA VALIDATION

### 4.1 Validation Functions

```php
<?php
$input = $_POST['input'] ?? '';

// Check empty
if (empty($input)) {
    echo "Cannot be empty";
}

// Check length
if (strlen($input) < 3) {
    echo "Minimum 3 characters";
}

// Check if numeric
if (!is_numeric($input)) {
    echo "Must be a number";
}

// Validate email
if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format";
}

// Validate URL
if (!filter_var($input, FILTER_VALIDATE_URL)) {
    echo "Invalid URL";
}

// Regex validation
if (!preg_match("/^[a-zA-Z]+$/", $input)) {
    echo "Only letters allowed";
}
?>
```

### 4.2 Data Sanitization

```php
<?php
$input = $_POST['input'] ?? '';

// Remove whitespace from start/end
$input = trim($input);

// Remove backslashes
$input = stripslashes($input);

// Convert special characters to HTML entities
$input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

// Filter sanitize
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$url = filter_var($_POST['url'], FILTER_SANITIZE_URL);
$int = filter_var($_POST['number'], FILTER_SANITIZE_NUMBER_INT);
?>
```

### 4.3 Comprehensive Validation Functions

```php
<?php
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validateLength($str, $min, $max) {
    $len = strlen($str);
    return $len >= $min && $len <= $max;
}

function validatePassword($password) {
    // At least 8 characters, uppercase, lowercase, number
    return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/', $password);
}
?>
```

---

# EXAMPLES & ILLUSTRATIONS

## Example 1: Complete Registration Form

```php
<?php
// register.php
$errors = [];
$success = false;

// Keep entered values
$name = $email = $password = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $agree = isset($_POST['agree']);
    
    // Validate
    if (empty($name)) {
        $errors['name'] = "Please enter full name";
    } elseif (strlen($name) < 2) {
        $errors['name'] = "Name must be at least 2 characters";
    }
    
    if (empty($email)) {
        $errors['email'] = "Please enter email";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }
    
    if (empty($password)) {
        $errors['password'] = "Please enter password";
    } elseif (strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters";
    }
    
    if ($password !== $confirmPassword) {
        $errors['confirm_password'] = "Passwords do not match";
    }
    
    if (!$agree) {
        $errors['agree'] = "You must agree to terms";
    }
    
    // If no errors
    if (empty($errors)) {
        $success = true;
        // TODO: Save to database
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register Account</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { text-align: center; color: #333; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        input:focus { border-color: #4CAF50; outline: none; }
        input.error { border-color: #f44336; }
        .error-message { color: #f44336; font-size: 14px; margin-top: 5px; }
        .success-message {
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        button {
            width: 100%;
            padding: 15px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover { background: #45a049; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Register Account</h1>
        
        <?php if ($success): ?>
            <div class="success-message">
                🎉 Registration successful! Welcome <?= htmlspecialchars($name) ?>
            </div>
        <?php else: ?>
        
        <form method="POST">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" 
                       value="<?= htmlspecialchars($name) ?>"
                       class="<?= isset($errors['name']) ? 'error' : '' ?>">
                <?php if (isset($errors['name'])): ?>
                    <div class="error-message"><?= $errors['name'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" 
                       value="<?= htmlspecialchars($email) ?>"
                       class="<?= isset($errors['email']) ? 'error' : '' ?>">
                <?php if (isset($errors['email'])): ?>
                    <div class="error-message"><?= $errors['email'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Password *</label>
                <input type="password" name="password"
                       class="<?= isset($errors['password']) ? 'error' : '' ?>">
                <?php if (isset($errors['password'])): ?>
                    <div class="error-message"><?= $errors['password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group">
                <label>Confirm Password *</label>
                <input type="password" name="confirm_password"
                       class="<?= isset($errors['confirm_password']) ? 'error' : '' ?>">
                <?php if (isset($errors['confirm_password'])): ?>
                    <div class="error-message"><?= $errors['confirm_password'] ?></div>
                <?php endif; ?>
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" name="agree" id="agree">
                <label for="agree" style="font-weight: normal;">
                    I agree to terms of service
                </label>
            </div>
            <?php if (isset($errors['agree'])): ?>
                <div class="error-message"><?= $errors['agree'] ?></div>
            <?php endif; ?>
            
            <button type="submit">Register</button>
        </form>
        
        <?php endif; ?>
    </div>
</body>
</html>
```

---

# PRACTICE

## EXERCISE 1: Contact Form

🎯 **Objective:** Create contact form with validation

📝 **Requirements:**
- Fields: Full name, Email, Phone number, Message
- Validate all fields
- Display success/error messages

---

## EXERCISE 2: Calculator Form

🎯 **Objective:** Create simple calculator with form

📝 **Requirements:**
- Enter 2 numbers
- Select operation (dropdown)
- Display result

---

## EXERCISE 3: Login Form (Challenge)

🎯 **Objective:** Create login form with hardcoded check

📝 **Requirements:**
- Username: admin, Password: 123456
- Display login success/failure message
- Count failed login attempts

---

# ✅ KNOWLEDGE TO ACHIEVE

- [ ] Can create HTML Forms
- [ ] Distinguish GET vs POST
- [ ] Process forms with $_GET, $_POST
- [ ] Validate and sanitize data
- [ ] Create self-processing forms

---

# 📋 SESSION 03 WORKSHEET

**Name:** ___________________    **Student ID:** ___________

## Questions

1. When to use GET, when to use POST?
2. What is `htmlspecialchars()` used for?
3. How to keep entered values when form has errors?

## Exercises

- [ ] Contact Form
- [ ] Calculator Form
- [ ] Login Form (Bonus)

---

# 🔗 PREPARATION FOR SESSION 04

**Next Session:** Introduction to MySQL

### Will Learn:
- MySQL Installation
- phpMyAdmin
- Create Database, Table
- MySQL Data Types

---

**Next Chapter: [Session 04 - Introduction to MySQL →](../part_2_mysql_database/session_04_intro_mysql.md)**
"""
    
    os.makedirs('English/part_1_php_foundation', exist_ok=True)
    with open('English/part_1_php_foundation/session_03_dynamic_websites.md', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Created Session 03 English version")

if __name__ == "__main__":
    print("Creating English versions for Sessions 02 and 03...")
    create_session_02_english()
    create_session_03_english()
    print("Done! Now need to create remaining sessions...")
