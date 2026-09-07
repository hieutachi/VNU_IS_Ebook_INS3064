# Homework 3: Dynamic Websites and Forms

> **Due:** Sunday 23:59 via LMS | **Files:** `register.php`, `survey.php`, `summary.php`

## How to Submit
1. Save all files (`register.php`, `survey.php`, `summary.php`) in one folder
2. Test each file in browser via `http://localhost/INS3064/session03/`
3. Compress the folder into a `.zip` named `homework03.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

In this assignment you will build a **multi-page Registration & Survey Form** application. This exercise covers HTML forms, the PHP superglobals `$_GET` and `$_POST`, server-side form validation, and session management. The application spans three pages that guide the user through registration, a short survey, and a final summary of all collected data.

## Requirements

### Functional Requirements

#### Page 1 — `register.php` (Registration Form)

- A form with the following fields:
  - **Full Name** — text input, required.
  - **Email** — email input, required, must be a valid email format.
  - **Password** — password input, minimum 6 characters.
  - **Confirm Password** — must match the Password field.
  - **Age** — number input, must be between 10 and 100.
  - **Gender** — radio buttons (Male / Female / Other), required.
- On submission (POST to itself), **validate all fields server-side**:
  - If validation fails, display **inline error messages** next to each invalid field and **preserve** the previously entered values (except passwords) so the user doesn't have to re-type everything.
  - If validation passes, store the data in a **PHP session** and redirect (via `header('Location: ...')`) to `survey.php`.

#### Page 2 — `survey.php` (Survey Form)

- Only accessible if the registration session data exists; otherwise redirect back to `register.php`.
- A form with the following fields:
  - **Favorite Programming Language** — dropdown select (PHP, JavaScript, Python, Java, C++, Other).
  - **Experience Level** — radio buttons (Beginner, Intermediate, Advanced).
  - **Interests** — checkboxes (at least 5 options, e.g., Web Development, Mobile Apps, Data Science, Cybersecurity, AI/ML).
- On submission, validate that at least one interest is selected, then **merge** the survey data into the existing session and redirect to `summary.php`.

#### Page 3 — `summary.php` (Summary Page)

- Only accessible if the full session data exists; otherwise redirect back to `register.php`.
- Display **all collected data** from both the registration and survey in a clean, organized layout.
- Show a **"Thank you"** message with the user's name.
- Include a **"Start Over"** button/link that destroys the session and returns to `register.php`.

### Technical Requirements

- Use **`session_start()`** at the top of every page to maintain state across pages.
- Use the **`$_POST`** superglobal to receive form data (not `$_GET`).
- Validation must happen **server-side** (PHP); client-side validation with HTML5 attributes (`required`, `minlength`, etc.) is encouraged as a bonus but does **not** replace server-side checks.
- Use `header('Location: ...')` for redirects (remember: no output before `header()`).
- Sanitize user input using `htmlspecialchars()` before displaying it on the summary page to prevent XSS.
- Each file must be valid HTML5 with a consistent visual style (shared CSS or inline styles).

## Deliverables

| File | Description |
|------|-------------|
| `register.php` | Registration form with server-side validation and error display. |
| `survey.php` | Survey form that collects additional user preferences. |
| `summary.php` | Summary page displaying all collected data from registration and survey. |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Functionality** | 40% | All three pages work correctly end-to-end; session carries data between pages; redirects function properly; the "Start Over" flow resets everything. |
| **Validation** | 25% | All fields are validated server-side; error messages are clear and specific; previously entered values are preserved on validation failure; email format and password match are enforced. |
| **User Experience (UX)** | 20% | Clean form layout; inline errors appear next to the relevant field; consistent styling across all three pages; the summary page is well-organized and readable. |
| **Code Quality** | 15% | Proper use of sessions; clean code structure with meaningful variable names; `htmlspecialchars()` used on output; appropriate comments. |

## Tips

- Start each file with:
  ```php
  <?php
  session_start();
  // validation / logic here
  ?>
  <!DOCTYPE html>
  <html>
  <!-- HTML here -->
  </html>
  ```
- To preserve form values after a failed validation, use the `value` attribute:
  ```html
  <input type="text" name="name" value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
  ```
- To destroy a session on "Start Over":
  ```php
  session_unset();
  session_destroy();
  header('Location: register.php');
  exit;
  ```
- Remember that `header('Location: ...')` will fail if any HTML or whitespace has been output before it — keep all PHP logic at the very top of the file.
- Test the full flow: register → survey → summary → start over → register again.

## Resources

- [PHP Manual — Sessions](https://www.php.net/manual/en/book.session.php)
- [PHP Manual — $_POST](https://www.php.net/manual/en/reserved.variables.post.php)
- [PHP Manual — header()](https://www.php.net/manual/en/function.header.php)
- [PHP Manual — htmlspecialchars()](https://www.php.net/manual/en/function.htmlspecialchars.php)
- [W3Schools — PHP Form Handling](https://www.w3schools.com/php/php_forms.asp)
