# 🟦 SESSION 02
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
