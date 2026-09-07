# Homework 2: Programming with PHP

> **Due:** Sunday 23:59 via LMS | **File:** `grade_calculator.php`

## How to Submit
1. Save your file as `grade_calculator.php`
2. Test it in browser via `http://localhost/INS3064/session02/grade_calculator.php`
3. Compress the file into a `.zip` named `homework02.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

In this assignment you will build a **Student Grade Calculator** that demonstrates your understanding of PHP programming fundamentals: variables, arrays, control structures (`if/else`, `foreach`, `for`), functions, and string formatting. Your program will process student score data, compute statistics, assign letter grades, and display the results in a formatted HTML table.

## Requirements

### Functional Requirements

- Define a PHP **array** containing at least **5 students**. Each student is an associative array with:
  - `name` (string) — the student's full name.
  - `scores` (indexed array) — at least **4 test scores** per student (numeric, 0–100 scale).
- For each student, **calculate**:
  - **Average score** (rounded to 1 decimal place).
  - **Highest score**.
  - **Lowest score**.
  - **Letter grade** assigned according to this scale:
    - A: 90–100
    - B: 80–89
    - C: 70–79
    - D: 60–69
    - F: below 60
- **Sort** the student results by average score in **descending order** (highest average first).
- Display the final results in an **HTML table** with columns: `Rank`, `Name`, `Scores`, `Average`, `Highest`, `Lowest`, `Grade`.
- Color-code the letter grade in the table (e.g., green for A, red for F).

### Technical Requirements

- Deliver a **single file** named `grade_calculator.php`.
- Write at least **2 custom functions** (e.g., `calculateAverage($scores)`, `assignGrade($average)`).
- Use **control structures**: `if/elseif/else`, `foreach`, and at least one `for` loop.
- Use both **indexed arrays** and **associative arrays**.
- Handle **edge cases**: a student with all identical scores, a student with a score of 0, a student with a perfect 100 on all tests.
- The page must be valid HTML5 and render without errors.

## Deliverables

| File | Description |
|------|-------------|
| `grade_calculator.php` | Single PHP file containing all logic, data, and HTML output. |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Correctness** | 40% | Average, highest, lowest, and letter grade are calculated correctly for every student; sorting is correct; all edge cases produce valid results. |
| **Code Structure** | 30% | Clean use of functions, meaningful variable names, proper indentation, comments explaining logic, well-organized code flow. |
| **Edge Case Handling** | 15% | Program handles scores of 0, scores of 100, identical scores, and boundary values (e.g., average of exactly 90 → A) without errors. |
| **Output Formatting** | 15% | HTML table is well-styled, grade colors are applied, table is readable with proper headers and alignment. |

## Tips

- Define your student data as a PHP array at the top of the file:
  ```php
  $students = [
      ['name' => 'Alice Nguyen',   'scores' => [85, 92, 78, 90]],
      ['name' => 'Bob Tran',       'scores' => [70, 65, 80, 72]],
      // ... more students
  ];
  ```
- Use `round($average, 1)` to round averages to one decimal place.
- After calculating all results into a new array, use `usort()` with a custom comparison function to sort by average descending.
- Assign a CSS class to the grade cell based on the letter to apply color coding:
  ```php
  $gradeClass = match($grade) {
      'A' => 'grade-a',
      'B' => 'grade-b',
      // ...
  };
  ```
- Add some simple CSS in a `<style>` block to make the table readable (borders, padding, alternating row colors).

## Resources

- [PHP Manual — Arrays](https://www.php.net/manual/en/language.types.array.php)
- [PHP Manual — Control Structures](https://www.php.net/manual/en/language.control-structures.php)
- [PHP Manual — usort()](https://www.php.net/manual/en/function.usort.php)
- [PHP Manual — round()](https://www.php.net/manual/en/function.round.php)
