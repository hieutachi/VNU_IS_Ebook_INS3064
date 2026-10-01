# Homework 2: Programming with PHP

> **Due:** Sunday 23:59 via LMS | **File:** `grade_calculator.php`

## How to Submit

Submit **two things** on LMS before the deadline (Sunday 23:59):

**Part 1 — Code ZIP**
1. Save your file as `grade_calculator.php`
2. Test it in browser via `http://localhost/INS3064/session02/grade_calculator.php`
3. Compress the file into a `.zip` named `homework02.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

**Part 2 — Video presentation link (OBS → YouTube)**

Record a short screen+voice video, upload it to **your own YouTube channel as Unlisted**, add it to your semester playlist, and paste the link on LMS. Do **not** upload the video file to LMS.

1. **Record with OBS (1–2 minutes).** Open OBS Studio → add a **Display Capture** (or Window Capture) source → start recording. Walk through your finished homework **live on screen** and **speak out loud** — no camera needed, screen + microphone is enough. Follow the **Video Checklist — What to Show** section at the bottom of this sheet so the lecturer can confirm the work is done and is yours.
2. **Upload to YouTube as Unlisted.** In YouTube Studio, upload the recording and set visibility to **Unlisted** (not Public, not Private). Unlisted means only people with the link can watch — it does not appear in search or on your channel page, but the lecturer can open it. (Private links will not work for grading.)
3. **Add it to your homework playlist.** Create one playlist for the whole semester named `INS3064 — Homework — <Your Full Name>` and add this week's video to it (in YouTube Studio: SAVE → + Create new playlist, visibility Unlisted). The playlist collects every week's demo in one place; you create and own it — there is no shared class playlist.
4. **Paste the link on LMS.** Copy the **video URL** (or the playlist URL) and paste it into the **"Video Link" field** on LMS (next to the ZIP upload).

> ✅ **Checklist before submitting:** video is 1–2 minutes · your voice explains the logic (not just silent screen capture) · the table sorts and color-codes correctly on screen · visibility is **Unlisted** · video is in your `INS3064 — Homework — <Your Name>` playlist · the YouTube link opens and plays in an incognito/private browser window (test this yourself!).

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

## Video Checklist — What to Show

In your 1–2 minute OBS recording, demonstrate **all** of the following on screen while narrating out loud:

- The grade calculator table rendered in the browser with all students and columns.
- How the average is computed — show the array and the loop (or function) that calculates it.
- How the letter grade is assigned from the average — show the `if/else` chain.
- One edge case live (a student with all 0s or all 100s) producing the correct result.
- A quick scroll through the main code file(s) in your editor so the grader sees the code is yours.
