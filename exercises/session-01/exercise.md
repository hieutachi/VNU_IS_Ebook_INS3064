# Session 1 — In-Class Exercise: Introduction to PHP

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session01_exercise.php`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session01\`
2. Test each file in browser via `http://localhost/INS3064/session01/`
3. Compress the folder into a `.zip` file named `session01_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Understand what PHP is and how it runs on a web server
- Install and verify XAMPP (Apache + PHP) on your machine
- Write basic PHP scripts using `echo`, `print`, and comments
- Embed PHP code inside an HTML page

---

## Exercise A: "Hello, PHP!" (Required)

### Task Description
Create your very first PHP file and practice the two output statements (`echo` and `print`), as well as single-line and multi-line comments.

### Step-by-Step Instructions
1. Open your text editor (VS Code, Notepad++, etc.).
2. Create a new file named **`hello.php`**.
3. Start with the PHP opening tag `<?php` and end with `?>`.
4. Use `echo` to output: **"Hello, World! This is my first PHP program."**
5. On a new line, use `print` to output: **"PHP is fun!"**
6. Add a **single-line comment** above each output statement explaining what it does.
7. Add a **multi-line comment** at the top of the file with your name, student ID, and the date.
8. Save the file inside `C:\xampp\htdocs\INS3064\session01\`.
9. Open your browser and navigate to `http://localhost/INS3064/session01/hello.php`.
10. Verify that you see the expected output.

### Starter Code

```php
<?php
/*
 * Name:       Your Name
 * Student ID: Your Student ID
 * Date:       YYYY-MM-DD
 * Exercise:   Session 1 - Exercise A
 */

// TODO: Use echo to print "Hello, World! This is my first PHP program."
echo "Hello, World! This is my first PHP program.";
echo "<br>";

// TODO: Use print to print "PHP is fun!"
print "PHP is fun!";
?>
```

### Expected Output

```
Hello, World! This is my first PHP program.
PHP is fun!
```

*(The two lines should appear on separate lines in the browser thanks to the `<br>` tag.)*

### Self-Check
- [ ] File is saved as `hello.php` inside the correct folder
- [ ] `echo` outputs text successfully
- [ ] `print` outputs text successfully
- [ ] At least one single-line comment (`//`) exists
- [ ] A multi-line comment (`/* */`) with your info exists at the top
- [ ] Page loads without errors at `http://localhost/INS3064/session01/hello.php`

---

## Exercise B: "Personal Info Page" (Required)

### Task Description
Create an HTML page that embeds PHP to display your personal information — name, age, hobbies, and the current date/time — demonstrating how PHP and HTML work together.

### Step-by-Step Instructions
1. Create a new file named **`personal.php`**.
2. Write a complete HTML5 document with `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.
3. Inside `<head>`, set the page title to **"My Personal Info"** and add basic CSS styling.
4. Inside `<body>`, create an HTML heading and a section for personal info.
5. Use PHP variables to store your **name**, **age**, and an **array of hobbies**.
6. Embed PHP blocks inside the HTML to display each variable.
7. Use PHP's `date()` function to display the **current date** and **current time**.
8. Loop through the hobbies array using `foreach` to display them as an unordered list (`<ul>/<li>`).
9. Save the file and test it in the browser.

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Personal Info</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .info-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #2c3e50; }
        .label { font-weight: bold; color: #34495e; }
    </style>
</head>
<body>
    <div class="info-card">
        <h1>👤 Personal Information</h1>

        <?php
        // TODO: Declare your variables here
        $name = "Your Name";
        $age = 0;
        $hobbies = ["Hobby 1", "Hobby 2", "Hobby 3"];
        ?>

        <p><span class="label">Name:</span> <?php echo $name; ?></p>
        <p><span class="label">Age:</span> <?php echo $age; ?> years old</p>

        <p><span class="label">Hobbies:</span></p>
        <ul>
            <?php
            // TODO: Use a foreach loop to display each hobby as a list item
            foreach ($hobbies as $hobby) {
                echo "<li>" . $hobby . "</li>";
            }
            ?>
        </ul>

        <hr>
        <p><span class="label">Current Date:</span> <?php echo date("Y-m-d"); ?></p>
        <p><span class="label">Current Time:</span> <?php echo date("h:i:s A"); ?></p>
    </div>
</body>
</html>
```

### Expected Output

*(A styled card showing your personal info, similar to:)*

```
👤 Personal Information

Name:       Nguyen Van A
Age:        20 years old

Hobbies:
  • Reading
  • Coding
  • Gaming

─────────────────────────
Current Date: 2025-01-15
Current Time: 02:30:45 PM
```

### Self-Check
- [ ] Page is a valid HTML5 document
- [ ] PHP variables (`$name`, `$age`, `$hobbies`) are used to store data
- [ ] Each variable is displayed using `<?php echo ...; ?>`
- [ ] `foreach` loop correctly renders hobbies as `<li>` items
- [ ] `date()` function displays the current date and time
- [ ] Page renders without errors in the browser

---

## Exercise C: "Time-based Greeting" (Challenge / Bonus)

### Task Description
Build a page that greets the visitor with a different message depending on the **current hour** of the day. This exercise practices `if`/`elseif`/`else` control structures and the `date()` function.

### Step-by-Step Instructions
1. Create a new file named **`greeting.php`**.
2. Use `date("G")` to get the current hour in **24-hour format** (0–23).
3. Implement the following logic:
   - **5:00 – 11:59** → "Good Morning! ☀️"
   - **12:00 – 17:59** → "Good Afternoon! 🌤️"
   - **18:00 – 21:59** → "Good Evening! 🌅"
   - **22:00 – 4:59** → "Good Night! 🌙"
4. Display the greeting inside a styled HTML page.
5. Also display the **current hour** so the student can verify the logic is correct.
6. *(Bonus)*: Change the **background color** of the page based on the time of day (yellow for morning, orange for afternoon, purple for evening, dark blue for night).

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time-based Greeting</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            transition: background-color 0.5s;
        }
        .greeting-box {
            text-align: center;
            background: white;
            padding: 40px 60px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        h1 { font-size: 2.5em; margin-bottom: 10px; }
        p  { font-size: 1.2em; color: #555; }
    </style>
</head>
<body>
    <div class="greeting-box">
        <?php
        $hour = (int) date("G");

        // TODO: Implement the time-based greeting logic
        // Morning:   5:00 – 11:59
        // Afternoon: 12:00 – 17:59
        // Evening:   18:00 – 21:59
        // Night:     22:00 – 4:59

        if ($hour >= 5 && $hour < 12) {
            $greeting = "Good Morning! ☀️";
            // Bonus: set $bgColor
        } elseif ($hour >= 12 && $hour < 18) {
            $greeting = "Good Afternoon! 🌤️";
        } elseif ($hour >= 18 && $hour < 22) {
            $greeting = "Good Evening! 🌅";
        } else {
            $greeting = "Good Night! 🌙";
        }
        ?>

        <h1><?php echo $greeting; ?></h1>
        <p>Current hour (24h format): <?php echo $hour; ?>:00</p>
        <p>Page generated at: <?php echo date("h:i:s A, F j, Y"); ?></p>
    </div>
</body>
</html>
```

### Expected Output

*(Depends on the time of day. Example for 10:30 AM:)*

```
Good Morning! ☀️

Current hour (24h format): 10:00
Page generated at: 10:30:00 AM, January 15, 2025
```

### Self-Check
- [ ] `date("G")` is used to get the current hour
- [ ] `if`/`elseif`/`else` correctly handles all four time periods
- [ ] The greeting changes depending on the time of day
- [ ] The current hour is displayed for verification
- [ ] *(Bonus)* Background color changes based on time of day
- [ ] Page loads without errors in the browser

---

## Submission Checklist
- [ ] **Exercise A:** `hello.php` — uses `echo`, `print`, and comments
- [ ] **Exercise B:** `personal.php` — embeds PHP in HTML with variables, arrays, and loops
- [ ] **Exercise C:** `greeting.php` — time-based greeting with if/elseif/else *(bonus)*
- [ ] All files are saved inside `C:\xampp\htdocs\INS3064\session01\`
- [ ] All pages load correctly in the browser via `http://localhost/INS3064/session01/`
- [ ] Files are uploaded to LMS before the deadline

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and runs without errors | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Exercise A & B: Full marks if file loads, displays expected output, and uses required PHP features
- Exercise C: Bonus points for attempting the challenge
- Deduct 2 pts if file does not run (syntax errors, wrong file name)
- Deduct 1 pt if output is incomplete or missing key requirements
