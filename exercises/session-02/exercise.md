# Session 2 — In-Class Exercise: Programming with PHP

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session02_exercise.php`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session02\`
2. Test each file in browser via `http://localhost/INS3064/session02/`
3. Compress the folder into a `.zip` file named `session02_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Declare variables and use PHP's data types (string, integer, float, array)
- Apply arithmetic, comparison, and logical operators
- Use control structures (`if`/`elseif`/`else`, `switch`)
- Write `for`, `while`, and `foreach` loops
- Define and call custom functions

---

## Exercise A: "BMI Calculator" (Required)

### Task Description
Write a PHP script that calculates the **Body Mass Index (BMI)** from given height and weight values, then classifies the result using `if`/`elseif`/`else`. This exercise practices variables, arithmetic operators, and conditional logic.

**BMI Formula:** `BMI = weight (kg) / (height (m))²`

**Classification:**
| BMI Range         | Category       |
|-------------------|----------------|
| < 18.5            | Underweight    |
| 18.5 – 24.9      | Normal weight  |
| 25.0 – 29.9      | Overweight     |
| ≥ 30.0            | Obese          |

### Step-by-Step Instructions
1. Create a new file named **`bmi.php`**.
2. Declare two variables: `$height` (in meters) and `$weight` (in kilograms).
3. Calculate BMI using the formula and store it in `$bmi`.
4. Use `round($bmi, 2)` to round the result to 2 decimal places.
5. Use `if`/`elseif`/`else` to determine the BMI category.
6. Display the height, weight, calculated BMI, and the category.
7. *(Bonus)*: Test with at least 3 different height/weight combinations.

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BMI Calculator</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #3498db; color: white; }
        .result { font-size: 1.3em; padding: 15px; border-radius: 8px; margin-top: 15px; }
        .underweight { background-color: #ffeaa7; }
        .normal      { background-color: #55efc4; }
        .overweight  { background-color: #fab1a0; }
        .obese       { background-color: #ff7675; color: white; }
    </style>
</head>
<body>
    <h1>🏋️ BMI Calculator</h1>

    <?php
    // --- Input values (change these to test) ---
    $height = 1.70;  // in meters
    $weight = 65;    // in kilograms

    // TODO: Calculate BMI
    // $bmi = ...
    $bmi = $weight / ($height * $height);
    $bmi = round($bmi, 2);

    // TODO: Classify BMI using if / elseif / else
    if ($bmi < 18.5) {
        $category = "Underweight";
        $cssClass = "underweight";
    } elseif ($bmi <= 24.9) {
        $category = "Normal weight";
        $cssClass = "normal";
    } elseif ($bmi <= 29.9) {
        $category = "Overweight";
        $cssClass = "overweight";
    } else {
        $category = "Obese";
        $cssClass = "obese";
    }
    ?>

    <table>
        <tr><th>Input</th><th>Value</th></tr>
        <tr><td>Height</td><td><?php echo $height; ?> m</td></tr>
        <tr><td>Weight</td><td><?php echo $weight; ?> kg</td></tr>
    </table>

    <div class="result <?php echo $cssClass; ?>">
        <strong>BMI:</strong> <?php echo $bmi; ?> — <strong><?php echo $category; ?></strong>
    </div>

    <hr>

    <h2>Test Cases</h2>
    <table>
        <tr><th>Height (m)</th><th>Weight (kg)</th><th>BMI</th><th>Category</th></tr>
        <?php
        // Test data array
        $testCases = [
            ["height" => 1.60, "weight" => 45],
            ["height" => 1.75, "weight" => 70],
            ["height" => 1.80, "weight" => 95],
            ["height" => 1.55, "weight" => 80],
        ];

        foreach ($testCases as $test) {
            $testBmi = round($test["weight"] / ($test["height"] ** 2), 2);

            // TODO: Classify each test case
            if ($testBmi < 18.5) {
                $testCat = "Underweight";
            } elseif ($testBmi <= 24.9) {
                $testCat = "Normal weight";
            } elseif ($testBmi <= 29.9) {
                $testCat = "Overweight";
            } else {
                $testCat = "Obese";
            }

            echo "<tr>";
            echo "<td>{$test['height']}</td>";
            echo "<td>{$test['weight']}</td>";
            echo "<td>{$testBmi}</td>";
            echo "<td>{$testCat}</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
```

### Expected Output

```
🏋️ BMI Calculator

┌──────────┬──────────┐
│ Input    │ Value    │
├──────────┼──────────┤
│ Height   │ 1.70 m   │
│ Weight   │ 65 kg    │
└──────────┴──────────┘

BMI: 22.49 — Normal weight  (green background)

Test Cases
┌──────────┬──────────┬────────┬──────────────┐
│ Height   │ Weight   │ BMI    │ Category     │
├──────────┼──────────┼────────┼──────────────┤
│ 1.60     │ 45       │ 17.58  │ Underweight  │
│ 1.75     │ 70       │ 22.86  │ Normal weight│
│ 1.80     │ 95       │ 29.32  │ Overweight   │
│ 1.55     │ 80       │ 33.30  │ Obese        │
└──────────┴──────────┴────────┴──────────────┘
```

### Self-Check
- [ ] `$height` and `$weight` variables are declared
- [ ] BMI is calculated correctly using the formula
- [ ] `if`/`elseif`/`else` classifies all four categories
- [ ] Output includes height, weight, BMI value, and category
- [ ] *(Bonus)* Test cases table displays multiple results
- [ ] Page loads without errors

---

## Exercise B: "Multiplication Table" (Required)

### Task Description
Generate a **multiplication table from 2 to 9** using nested `for` loops and display it as an HTML `<table>`. This exercise practices loops, string concatenation, and HTML generation with PHP.

### Step-by-Step Instructions
1. Create a new file named **`multiplication.php`**.
2. Set a variable `$max` to `9` (the table goes from 2 to `$max`).
3. Use **nested `for` loops**: the outer loop iterates over rows (multipliers 1–10), the inner loop iterates over columns (factors 2–9).
4. Generate an HTML `<table>` where each cell shows `row × col = result`.
5. Add a header row showing the column factors (2, 3, 4, …, 9).
6. Style the table with alternating row colors for readability.
7. *(Bonus)*: Highlight cells where the result is a **multiple of 10** or equals **perfect squares**.

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Multiplication Table</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { border-collapse: collapse; margin: 20px auto; }
        th, td { border: 1px solid #999; padding: 8px 12px; text-align: center; font-size: 14px; }
        th { background-color: #2c3e50; color: white; }
        tr:nth-child(even) { background-color: #ecf0f1; }
        tr:nth-child(odd)  { background-color: #ffffff; }
        .highlight { background-color: #f39c12 !important; font-weight: bold; }
    </style>
</head>
<body>
    <h1 style="text-align:center;">📊 Multiplication Table (2–9)</h1>

    <table>
        <tr>
            <th>×</th>
            <?php
            // TODO: Print header row with column numbers (2 to 9)
            for ($col = 2; $col <= 9; $col++) {
                echo "<th>{$col}</th>";
            }
            ?>
        </tr>

        <?php
        // TODO: Outer loop — rows from 1 to 10
        for ($row = 1; $row <= 10; $row++) {
            echo "<tr>";
            echo "<th>{$row}</th>";

            // TODO: Inner loop — columns from 2 to 9
            for ($col = 2; $col <= 9; $col++) {
                $result = $row * $col;
                echo "<td>{$result}</td>";
            }

            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
```

### Expected Output

```
📊 Multiplication Table (2–9)

  ×  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9
─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────
  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9
  2  │  4  │  6  │  8  │ 10  │ 12  │ 14  │ 16  │ 18
  3  │  6  │  9  │ 12  │ 15  │ 18  │ 21  │ 24  │ 27
  4  │  8  │ 12  │ 16  │ 20  │ 24  │ 28  │ 32  │ 36
  5  │ 10  │ 15  │ 20  │ 25  │ 30  │ 35  │ 40  │ 45
  ...
 10  │ 20  │ 30  │ 40  │ 50  │ 60  │ 70  │ 80  │ 90
```

### Self-Check
- [ ] Nested `for` loops generate the full table
- [ ] Header row shows factors 2 through 9
- [ ] Each cell displays the correct multiplication result
- [ ] Table has proper borders and alternating row colors
- [ ] *(Bonus)* Special cells are highlighted

---

## Exercise C: "Prime Numbers" (Challenge / Bonus)

### Task Description
Write a reusable **`isPrime()` function** that checks whether a given number is prime, then use it to print all **prime numbers from 1 to 100**. This exercise practices functions, nested loops, and the modulo operator.

### Step-by-Step Instructions
1. Create a new file named **`primes.php`**.
2. Define a function `isPrime($n)` that:
   - Returns `false` if `$n < 2`
   - Returns `false` if `$n` is divisible by any number from 2 to `sqrt($n)`
   - Returns `true` otherwise
3. Use a `for` loop from 1 to 100 to call `isPrime()` for each number.
4. Display prime numbers in a grid layout (5 columns).
5. Also display the **total count** of primes found.
6. *(Bonus)*: Highlight **twin primes** (pairs of primes that differ by 2, e.g., 3 & 5, 11 & 13).

### Starter Code

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Prime Numbers (1–100)</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 20px 0; }
        .prime {
            background-color: #3498db; color: white;
            padding: 12px; text-align: center; border-radius: 6px;
            font-weight: bold; font-size: 1.1em;
        }
        .twin { background-color: #e74c3c; }
        .count { font-size: 1.3em; margin-top: 20px; padding: 15px; background: #ecf0f1; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>🔢 Prime Numbers (1–100)</h1>

    <?php
    /**
     * Check if a number is prime.
     * @param  int $n  The number to check
     * @return bool    True if prime, false otherwise
     */
    function isPrime($n) {
        // TODO: Implement prime checking logic
        if ($n < 2) {
            return false;
        }
        for ($i = 2; $i <= sqrt($n); $i++) {
            if ($n % $i === 0) {
                return false;
            }
        }
        return true;
    }

    // Collect all primes into an array
    $primes = [];
    for ($num = 1; $num <= 100; $num++) {
        if (isPrime($num)) {
            $primes[] = $num;
        }
    }
    ?>

    <p>Found <strong><?php echo count($primes); ?></strong> prime numbers between 1 and 100.</p>

    <div class="grid">
        <?php
        // TODO: Display each prime number in the grid
        $prev = 0;
        foreach ($primes as $prime) {
            $class = "prime";
            // Bonus: highlight twin primes
            if ($prime - $prev === 2) {
                $class .= " twin";
            }
            echo "<div class=\"{$class}\">{$prime}</div>";
            $prev = $prime;
        }
        ?>
    </div>

    <div class="count">
        📊 Primes: <?php echo implode(", ", $primes); ?>
    </div>
</body>
</html>
```

### Expected Output

```
🔢 Prime Numbers (1–100)

Found 25 prime numbers between 1 and 100.

┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  2  │ │  3  │ │  5  │ │  7  │ │ 11  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 13  │ │ 17  │ │ 19  │ │ 23  │ │ 29  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘
  ...        (continues in a 5-column grid)

📊 Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
```

### Self-Check
- [ ] `isPrime()` function is defined and returns correct results
- [ ] Numbers less than 2 return `false`
- [ ] Loop correctly iterates from 1 to 100
- [ ] 25 prime numbers are found and displayed
- [ ] Grid layout shows 5 primes per row
- [ ] *(Bonus)* Twin primes are highlighted in red

---

## Submission Checklist
- [ ] **Exercise A:** `bmi.php` — variables, arithmetic, if/elseif/else
- [ ] **Exercise B:** `multiplication.php` — nested for loops, HTML table generation
- [ ] **Exercise C:** `primes.php` — custom function, loops, modulo operator *(bonus)*
- [ ] All files are saved inside `C:\xampp\htdocs\INS3064\session02\`
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
