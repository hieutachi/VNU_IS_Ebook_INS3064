# 🟦 SESSION 01
# **INTRODUCTION TO PHP**

Welcome to the first session! Today we will get familiar with PHP - the world's most popular web programming language.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 1 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand what PHP is and why we need to learn it
   - Install and configure development environment
   - Write your first PHP program
   - Master basic PHP syntax

📖 Preparation:
   - Read file 00_installation_guide.md
   - Install XAMPP
   - Install VS Code

🔗 Links to Learning Outcomes: LO1
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will:

- Understand **what PHP is** and why it's important for web development
- Know how to **install development environment** for PHP
- Write your **first PHP program**
- Master **basic syntax**: echo, print, comments
- Understand how to **embed PHP in HTML**

---

# THEORY

## 1. WHAT IS PHP?

### 1.1 Definition

**PHP** = **P**HP: **H**ypertext **P**reprocessor (recursive acronym)

PHP is a server-side scripting language, designed specifically for web development.

### 🎒 Real-life Analogy

Imagine a restaurant:
- **HTML/CSS** = Menu and table layout (interface)
- **PHP** = Chef in the kitchen (processes logic, cooks)
- **MySQL** = Storage room (stores data)

The customer (browser) only sees the dish (HTML), not the chef working (PHP).

### 1.2 Why Learn PHP?

| Reason | Explanation |
|--------|-------------|
| **Popular** | 77% of websites use PHP (WordPress, Facebook) |
| **Easy to Learn** | Simple syntax, rich documentation |
| **Free** | Open source, no licensing costs |
| **Great Integration** | Works seamlessly with MySQL, HTML, CSS |
| **Large Community** | Easy to find solutions when encountering problems |

### 1.3 How Does PHP Work?

```
┌─────────────┐     Request      ┌─────────────┐
│   Browser   │ ───────────────► │ Web Server  │
│  (Client)   │                  │  (Apache)   │
└─────────────┘                  └──────┬──────┘
       ▲                                │
       │                                ▼
       │                         ┌─────────────┐
       │                         │    PHP      │
       │                         │  Processor  │
       │                         └──────┬──────┘
       │                                │
       │      HTML Response             ▼
       │ ◄───────────────────── ┌─────────────┐
       │                        │   MySQL     │
       │                        │  Database   │
       └─────────────────────── └─────────────┘
```

**Process:**
1. Browser sends request to Web Server
2. Server receives PHP file and passes to PHP Processor
3. PHP processes code, may query Database
4. PHP returns HTML to Server
5. Server sends HTML to Browser
6. Browser displays the webpage

---

## 2. BASIC PHP SYNTAX

### 2.1 PHP Tags

PHP code is placed between special tags:

```php
<?php
    // PHP code goes here
?>
```

### ⚠️ Important Notes:
- PHP file must have `.php` extension
- Opening tag: `<?php`
- Closing tag: `?>` (can be omitted if file contains only PHP)
- Each statement ends with semicolon `;`

### 2.2 Output: echo and print

#### echo - Most Common

```php
<?php
// echo - output to screen
echo "Hello World!";           // String
echo 123;                      // Number
echo "Hello", " ", "World!";   // Multiple parameters
?>
```

#### print - Similar to echo

```php
<?php
// print - similar to echo but only accepts 1 parameter
print "Hello World!";
print("Hello World!");  // Can use parentheses
?>
```

#### 🔍 Comparison: echo vs print

| Feature | echo | print |
|---------|------|-------|
| Parameters | Multiple | Only 1 |
| Return Value | None | Returns 1 |
| Speed | Faster | Slower |
| Usage | More common | Less used |

**Recommendation:** Use `echo` in most cases.

### 2.3 Comments

```php
<?php
// Single-line comment using //

# Single-line comment using # (less common)

/*
   Multi-line comment
   Use for long explanations
   or temporarily hide code
*/

/**
 * PHPDoc comment
 * Used to document functions, classes
 * @param string $name User name
 * @return string Greeting message
 */
?>
```

### 2.4 Embedding PHP in HTML

```php
<!DOCTYPE html>
<html>
<head>
    <title>PHP in HTML</title>
</head>
<body>
    <h1>Hello!</h1>
    
    <!-- Method 1: Using echo -->
    <p><?php echo "Today is: " . date("Y-m-d"); ?></p>
    
    <!-- Method 2: Shorthand (if enabled) -->
    <p>Current time: <?= date("H:i:s") ?></p>
    
    <!-- Method 3: PHP block -->
    <?php
    $name = "Student";
    $course = "INS3064";
    ?>
    <p>Hello <?php echo $name; ?>, you are learning <?php echo $course; ?></p>
</body>
</html>
```

---

## 3. RULES & BEST PRACTICES

### ✅ Best Practices:

1. **Always use `<?php`** instead of short tag `<?`
2. **End statements with `;`**
3. **Write comments** for complex code
4. **Use meaningful file names**: `login.php`, `products.php`
5. **Indent code** for readability

### ❌ Common Errors:

```php
<?php
// ❌ Wrong: Missing semicolon
echo "Hello"

// ✅ Correct:
echo "Hello";

// ❌ Wrong: Incorrect quote usage
echo "He said "Hello"";

// ✅ Correct: Escape or use single quotes
echo "He said \"Hello\"";
echo 'He said "Hello"';
?>
```

---

## 4. THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| PHP | Server-side language | `<?php ?>` |
| echo | Output to screen | `echo "Hello";` |
| print | Output to screen | `print "Hello";` |
| Comment | Code notes | `// comment` |
| Shorthand | Short syntax | `<?= $var ?>` |

---

# EXAMPLES & ILLUSTRATIONS

## Example 1: Hello World

**Scenario:** Create a simple webpage displaying "Hello World"

**Code:**
```php
<?php
// File: hello.php
// First PHP program

echo "Hello World!";
echo "<br>";  // Line break in HTML
echo "Welcome to PHP!";
?>
```

**Explanation:**
- Line 1-2: Comment explaining the file
- Line 4: Output "Hello World!"
- Line 5: Output `<br>` tag for line break
- Line 6: Output welcome message

**Output:**
```
Hello World!
Welcome to PHP!
```

---

## Example 2: PHP + HTML

**Scenario:** Create a webpage with both HTML and PHP

**Code:**
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First PHP Page</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .info { background: #f0f0f0; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎉 Welcome to PHP!</h1>
    
    <div class="info">
        <?php
        // Display server information
        echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
        echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
        echo "<p><strong>Date:</strong> " . date("Y-m-d") . "</p>";
        echo "<p><strong>Time:</strong> " . date("H:i:s") . "</p>";
        ?>
    </div>
</body>
</html>
```

**Explanation:**
- HTML creates structure and style
- PHP is embedded in `<?php ?>` for dynamic processing
- `phpversion()`: Function returns PHP version
- `$_SERVER`: Superglobal variable containing server information
- `date()`: Function formats date and time

---

## Example 3: Simple Calculator

**Scenario:** Display calculation results

**Code:**
```php
<?php
// File: calculator.php
// Basic calculation example

$a = 10;
$b = 5;

echo "<h2>Simple Calculator</h2>";
echo "<p>a = $a, b = $b</p>";
echo "<hr>";

echo "<p>Add: $a + $b = " . ($a + $b) . "</p>";
echo "<p>Subtract: $a - $b = " . ($a - $b) . "</p>";
echo "<p>Multiply: $a × $b = " . ($a * $b) . "</p>";
echo "<p>Divide: $a ÷ $b = " . ($a / $b) . "</p>";
echo "<p>Modulo: $a % $b = " . ($a % $b) . "</p>";
?>
```

**Output:**
```
Simple Calculator
a = 10, b = 5
─────────────────
Add: 10 + 5 = 15
Subtract: 10 - 5 = 5
Multiply: 10 × 5 = 50
Divide: 10 ÷ 5 = 2
Modulo: 10 % 5 = 0
```

---

# HANDS-ON PRACTICE

## 4.1 Environment Setup

**Required Tools:**
- XAMPP installed and running
- VS Code
- Browser (Chrome/Firefox)

**Setup Steps:**
1. Open XAMPP Control Panel
2. Start Apache
3. Create folder: `C:\xampp\htdocs\ins3064\session_01\`
4. Open folder in VS Code

---

## 4.2 Main Practice Exercises

### **EXERCISE 1: Hello World**

🎯 **Objective:** Write your first PHP program

📝 **Requirements:**
- Create file `hello.php`
- Output "Hello, I am [Your Name]!"
- Output "Welcome to INS3064!"

🔧 **Instructions:**

**Step 1:** Create file `hello.php`
```php
<?php
// Exercise 1: Hello World
// Author: [Your Name]

echo "Hello, I am [Your Name]!";
echo "<br>";
echo "Welcome to INS3064!";
?>
```

**Step 2:** Open browser, visit: `http://localhost/ins3064/session_01/hello.php`

✅ **Expected Result:**
```
Hello, I am [Your Name]!
Welcome to INS3064!
```

💾 **File to Save:** `hello.php`

---

### **EXERCISE 2: Personal Profile Page**

🎯 **Objective:** Combine PHP with HTML to create a profile page

📝 **Requirements:**
- Create file `profile.php`
- Display: Full name, Student ID, Class, Email
- Beautiful CSS styling
- Display current date and time

🔧 **Instructions:**

Build this in three steps. Each step is a page that already runs, so you always
know whether you broke something in the step you just did.

**Step 1:** Create `profile.php` with the data and the text only. No styling yet.

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
</head>
<body>
    <?php
    // Declare personal information
    $fullName  = "John Doe";
    $studentId = "123456789";
    $class     = "INS3064-01";
    $email     = "johndoe@email.com";
    ?>

    <h1><?php echo $fullName; ?></h1>
    <p>Student <?php echo $class; ?></p>
    <p>Student ID: <?php echo $studentId; ?></p>
    <p>Email: <?php echo $email; ?></p>
</body>
</html>
```

✅ **Expected Result:** Visit `http://localhost/ins3064/session_01/profile.php`
and you see your name as a heading and three lines of information. Unstyled, but
working. If you see the PHP code itself instead of your name, you opened the file
directly rather than through `localhost`.

**Step 2:** Add the date and time, and group the information into rows. Replace
the `<body>` with this:

```php
<body>
    <div class="card">
        <div class="avatar">👤</div>

        <?php
        $fullName  = "John Doe";
        $studentId = "123456789";
        $class     = "INS3064-01";
        $email     = "johndoe@email.com";
        ?>

        <h1><?php echo $fullName; ?></h1>
        <p class="subtitle">Student <?php echo $class; ?></p>

        <div class="info">
            <div class="info-item">
                <span class="label">📋 Student ID:</span>
                <span class="value"><?php echo $studentId; ?></span>
            </div>
            <div class="info-item">
                <span class="label">📚 Class:</span>
                <span class="value"><?php echo $class; ?></span>
            </div>
            <div class="info-item">
                <span class="label">📧 Email:</span>
                <span class="value"><?php echo $email; ?></span>
            </div>
        </div>

        <div class="datetime">
            <?php
            echo "🗓️ " . date("Y-m-d") . " | ";
            echo "⏰ " . date("H:i:s");
            ?>
        </div>
    </div>
</body>
```

✅ **Expected Result:** The same information, plus today's date and the current
time. The `class` attributes do nothing yet — that is Step 3.

**Step 3:** Now style it. Add this `<style>` block inside `<head>`, and change the
title to `<title>Profile - <?php echo "Your Name"; ?></title>`.

```php
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
    .card {
        background: white;
        border-radius: 15px;
        padding: 40px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        max-width: 400px;
        width: 100%;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
    }
    h1 { color: #333; margin-bottom: 5px; }
    .subtitle { color: #666; margin-bottom: 20px; }
    .info { text-align: left; }
    .info-item {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
    }
    .info-item:last-child { border-bottom: none; }
    .label { color: #888; }
    .value { color: #333; font-weight: 500; }
    .datetime {
        margin-top: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        font-size: 14px;
        color: #666;
    }
</style>
```

✅ **Expected Result:** A card centred on a purple gradient, with your name, three
rows of information, and the date and time at the bottom. Refresh the page and the
seconds change — that is the PHP running again on every request.

💾 **File to Save:** `profile.php`

---

### **EXERCISE 3: Simple Calculator (Challenge)**

🎯 **Objective:** Create a page displaying calculations

📝 **Requirements:**
- Create file `calculator.php`
- Declare 2 number variables
- Display results: add, subtract, multiply, divide
- Beautiful interface

🔧 **Code Hint:**
```php
<?php
$num1 = 25;
$num2 = 7;

// TODO: Display calculations
?>
```

---

## 4.3 Common Error Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Parse error: syntax error | Missing `;` or `}` | Check syntax |
| Blank page | PHP errors not displayed | Enable `display_errors` in php.ini |
| 404 Not Found | Wrong file path | Check file name and folder |
| Vietnamese not displayed | Missing charset | Add `<meta charset="UTF-8">` |

---

# ✅ KNOWLEDGE TO ACHIEVE AFTER SESSION

After this session, you must **fully master** the following:

### Theoretical Knowledge
- [ ] Understand what PHP is and how it works
- [ ] Explain the request-response process
- [ ] Distinguish between client-side and server-side

### Practical Skills
- [ ] Can write basic PHP files
- [ ] Can embed PHP in HTML
- [ ] Can use echo, print, comments

### Additional Knowledge (Bonus)
- 💡 PHP can create PDFs, process images, send emails
- 💡 Facebook, Wikipedia, WordPress use PHP
- 💡 Next session: Variables, data types, operators

---

## 🧪 Self-Check Learning Objectives

**Self-Assessment Questions:**

1. **[Basic]** Where does PHP run? Client or Server?
2. **[Intermediate]** What's the difference between `echo` and `print`?
3. **[Advanced]** Why is PHP popular in web development?

**If you can answer all 3 questions, you're ready for the next session! ✅**

---

# 📋 SESSION 01 WORKSHEET

**Student Name:** ___________________    **Student ID:** ___________

**Date:** ___________________    **Class:** ___________

---

## PART A: KNOWLEDGE SUMMARY

### A1. Key Concepts

| Concept | Definition (In your own words) | Example |
|---------|-------------------------------|---------|
| PHP | _________________________________ | __________ |
| echo | _________________________________ | __________ |
| Server-side | _________________________________ | __________ |

### A2. Multiple Choice Questions

1. What does PHP stand for?
   - A) Personal Home Page
   - B) PHP: Hypertext Preprocessor
   - C) Pre Hypertext Processor
   - D) Page Hypertext Programming
   
   Answer: _______

2. What is the correct PHP opening tag?
   - A) `<php>`
   - B) `<?php`
   - C) `<script php>`
   - D) `<?PHP`
   
   Answer: _______

3. PHP statements end with?
   - A) Period (.)
   - B) Comma (,)
   - C) Semicolon (;)
   - D) No ending needed
   
   Answer: _______

### A3. Essay Questions

1. Explain the process from when user enters URL until webpage displays?

   Answer: ___________________________________________________________
   
   _________________________________________________________________

2. Why should we use `echo` instead of `print`?

   Answer: ___________________________________________________________
   
   _________________________________________________________________

---

## PART B: THEORY EXERCISES

### EXERCISE 1: Fix code errors

Find and fix errors in the following code:

```php
<?php
// ❌ Wrong on purpose: this file has two errors to find
echo "Hello World"
echo "Welcome to PHP!";
print "This is", "PHP";
?>
```

**Answer:**
___________________________________________________________________________

___________________________________________________________________________

---

## PART C: PRACTICAL EXERCISES

### PRACTICAL EXERCISE 1: Personal Information Page

🎯 **Objective:** Create a page displaying personal information

📝 **Requirements:**
1. Create file `myinfo.php`
2. Display: Full name, Date of birth, Hometown, Hobbies
3. Beautiful CSS
4. Display access date and time

📤 **Expected Result:**
- Webpage displays complete information
- Beautiful, readable interface

💾 **File to Submit:** `myinfo.php`

---

### PRACTICAL EXERCISE 2: Welcome Page (Challenge)

🏆 **Challenge:** Create a welcome page with dynamic information

📝 **Requirements:**
1. Display greeting based on time (Morning/Afternoon/Evening)
2. Display day of week in English
3. Count days remaining in month

💾 **File to Submit:** `welcome.php`

---

## PART D: SELF-ASSESSMENT

### D1. Understanding Level (Rate 1-5)

| Topic | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Understand what PHP is | ☐ | ☐ | ☐ | ☐ | ☐ |
| Use echo/print | ☐ | ☐ | ☐ | ☐ | ☐ |
| Embed PHP in HTML | ☐ | ☐ | ☐ | ☐ | ☐ |

### D2. Questions Needing Answers

Parts still unclear:
___________________________________________________________________________

### D3. Time Spent

- Theory time: _________ minutes
- Practice time: _________ minutes

---

## 📎 SUBMISSION GUIDELINES

**Deadline:** [Submission date and time]

**How to Submit:**
1. Save all files in folder: `Session01_[Name]_StudentID`
2. Compress into ZIP file
3. Submit via LMS system

**Evaluation Criteria:**
- Complete requirements correctly: 40%
- Code runs correctly: 30%
- Clean code with comments: 15%
- Complete worksheet: 15%

---

# 🔗 PREPARATION FOR SESSION 02

**Next Session:** Programming PHP - Variables, Data Types, Operators

### Knowledge to Learn:
- Variables and declaration
- Data types in PHP
- Arithmetic, comparison, logical operators
- Conditional structures if-else

### Preparation:
- [ ] Complete Session 01 exercises
- [ ] Read ahead about variables in PHP
- [ ] Review basic logic knowledge

---

# 📚 REFERENCE MATERIALS

**Books & Ebooks:**
- PHP & MySQL Web Development - Luke Welling
- Learning PHP, MySQL & JavaScript - Robin Nixon

**Websites & Tutorials:**
- [PHP Manual](https://www.php.net/manual/)
- [W3Schools PHP](https://www.w3schools.com/php/)
- [PHP The Right Way](https://phptherightway.com/)

**Videos:**
- [PHP Tutorial for Beginners - YouTube](https://youtube.com)

---

**Next Chapter: [Session 02 - Programming PHP →](./session_02_programming_php.md)**
