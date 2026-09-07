# Homework 9: Error Handling and Debugging

> **Due:** Sunday 23:59 via LMS | **File:** `calculator.php`

## How to Submit
1. Save your file as `calculator.php`
2. Test it in browser via `http://localhost/INS3064/session09/calculator.php`
3. Compress the file into a `.zip` named `homework09.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Build a **Robust Calculator** web application in PHP that demonstrates comprehensive error handling and debugging practices. The calculator accepts two numbers and an arithmetic operator from a user, performs the calculation, and handles every possible error gracefully — including division by zero, invalid operators, and non-numeric input. All errors are logged to a file, and the user sees friendly messages. The app also maintains a session-based calculation history.

## Requirements

### Functional Requirements

1. **Input Form**
   - An HTML form with fields for: first number, operator (dropdown: `+`, `-`, `*`, `/`, `%`, `**`), and second number.
   - The form submits to itself (same file, `calculator.php`) using the POST method.
   - Preserve entered values in the form after submission (sticky form).

2. **Calculation & Output**
   - Display the full expression and result (e.g., `10 / 3 = 3.3333`).
   - Format the result to 4 decimal places for division; show integers for other operations.
   - Display a "Calculate" button and a "Clear History" button.

3. **Error Handling** — Handle the following errors gracefully using `try-catch` with **custom exception classes**:

   | Error Condition | Exception Class | Example Input |
   |-----------------|-----------------|---------------|
   | Non-numeric input for either number | `InvalidInputException` | `"abc" + 5` |
   | Invalid or unsupported operator | `InvalidOperatorException` | `5 & 3` |
   | Division by zero | `DivisionByZeroException` | `10 / 0` |
   | Modulo by zero | `DivisionByZeroException` | `10 % 0` |
   | Result exceeds PHP's integer/float limits (overflow) | `OverflowException` | `99999 ** 99999` |
   | Any unexpected error | Generic catch block | — |

4. **Custom Exception Classes**
   - Define three custom exception classes in the same file:
     - `DivisionByZeroException extends Exception`
     - `InvalidOperatorException extends Exception`
     - `InvalidInputException extends Exception`
   - Each custom exception should accept a user-friendly message.

5. **Error Logging**
   - Every caught error must be logged to a file called `calculator_errors.log` (in the same directory).
   - Log format: `[YYYY-MM-DD HH:MM:SS] ExceptionType: message | Input: "a op b" | IP: user_ip`
   - Use `error_log()` or manual file writing (`file_put_contents` with `FILE_APPEND`).
   - The log file must NOT be directly accessible from the web (add a `.htaccess` or place it outside web root, OR use a `.log` extension which is usually not served).

6. **User-Friendly Error Display**
   - Do NOT show raw PHP errors or stack traces to the user.
   - Display a styled error box (CSS) with a clear message explaining what went wrong and how to fix it.
   - Use different colors: green for success, red for errors, yellow for warnings.

7. **Session-Based Calculation History**
   - Store every successful calculation in `$_SESSION` as an array of records: `{ expression, result, timestamp }`.
   - Display the history below the calculator as an HTML table (most recent first).
   - The "Clear History" button should reset the session history.
   - Use `session_start()` at the top of the file.

### Technical Requirements

- Everything must be in a **single file**: `calculator.php` (PHP, HTML, and inline CSS are acceptable).
- Use `$_SERVER['REQUEST_METHOD']` to check if the form was submitted.
- Use `filter_input()` or manual validation for input sanitization.
- No external libraries or frameworks.
- The file must run without warnings or notices (`error_reporting(E_ALL)` at the top for development; handle all cases so nothing triggers).
- Include a file header comment with your name, student ID, and date.

## Deliverables

| File | Description |
|------|-------------|
| `calculator.php` | Complete single-file application with form, calculation logic, custom exceptions, error logging, session history, and inline CSS |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| Error Handling | 35 | All 5 error conditions caught and handled correctly; no unhandled exceptions reach the user; form gracefully handles every edge case |
| Custom Exceptions | 25 | Three custom exception classes defined and thrown appropriately; clear separation between error types; proper use of try-catch-catch-catch structure |
| Logging | 20 | All errors logged to file with correct format (timestamp, type, message, input, IP); log file is append-only and not publicly accessible |
| Session History | 10 | History correctly stored in session, displayed in reverse chronological order, and clearable; persists across page reloads |
| UI & Usability | 10 | Clean, readable form layout; color-coded success/error messages; sticky form preserves input; responsive styling |

## Tips

- **Start with the custom exceptions.** Define them at the top of the file, then build the calculation logic around them.
- **Validate early, fail fast.** Check input types first, then operator validity, then math-specific errors (division by zero, overflow). Throw the first error you encounter.
- **Overflow detection:** After calculating, check if the result is `INF` or `NAN` using `is_infinite()` and `is_nan()`.
- **Sticky form:** After the form is submitted, echo the submitted values back into the `value` attribute of each input and the `selected` attribute of the correct `<option>`.
- **Log file path:** Use `__DIR__ . '/calculator_errors.log'` to write next to the script regardless of the working directory.
- **Session note:** `session_start()` must be called before any output. Place it at the very top of the file, even before `<!DOCTYPE>`.
- Review Session 9 lecture slides on exception handling and error logging before starting.
