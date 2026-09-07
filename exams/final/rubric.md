# FINAL EXAM — Marking Rubric

**INS3064: Multimedia Design and Web Development**

**Total: 100 points** | **Duration: 120 minutes**

---

## Grade Boundaries

| Grade | Points  | Percentage | Description |
|-------|---------|------------|-------------|
| **A** | 90–100  | 90–100%    | Excellent — comprehensive understanding, clean code, strong security awareness |
| **B** | 80–89   | 80–89%     | Good — solid understanding with minor gaps |
| **C** | 70–79   | 70–79%     | Satisfactory — core concepts understood, some weaknesses |
| **D** | 60–69   | 60–69%     | Passing — basic understanding, notable gaps |
| **F** | 0–59    | 0–59%      | Failing — insufficient understanding |

---

## Part A — Multiple Choice (15 × 2 = 30 points)

Each question is worth **2 points**. No partial credit. Only the single best answer is accepted.

| Question | Answer | Topic |
|----------|--------|-------|
| 1 | C | PDO prepared statements |
| 2 | A | PDO workflow |
| 3 | B | try-catch-finally |
| 4 | B | OOP inheritance |
| 5 | B | Sessions vs cookies |
| 6 | A | CSRF definition |
| 7 | B | XSS types |
| 8 | C | SQL injection prevention |
| 9 | B | jQuery selectors |
| 10 | B | jQuery AJAX |
| 11 | B | OOP polymorphism |
| 12 | C | Password hashing |
| 13 | C | HTTP response codes |
| 14 | B | jQuery $.post() |
| 15 | B | PHP sessions |

**Grading notes:**
- If a student circles two answers and one is correct, award 0 points (no ambiguity allowed).
- Accept no alternative answers unless a clear typo in the exam paper is confirmed by the instructor.

---

## Part B — Code Analysis (3 × 10 = 30 points)

### B1. Security Vulnerability Analysis (10 points)

**Award 2 points per vulnerability** (up to 5 vulnerabilities, max 10 points).

Each vulnerability must include:
1. **Identification** (1 point): Correctly identifies the vulnerable code section and names the issue
2. **Explanation + Fix** (1 point): Explains the attack vector and provides a correct fix/countermeasure

| # | Vulnerability | Key markers for full marks |
|---|--------------|---------------------------|
| 1 | **SQL Injection** | Must mention direct variable interpolation in SQL query; fix must use prepared statements (PDO or mysqli) |
| 2 | **Plaintext Password** | Must note passwords stored/compared in plain text; fix must use `password_hash()` / `password_verify()` |
| 3 | **XSS (Cross-Site Scripting)** | Must identify unescaped output of user data (`$username`, `$row["username"]`); fix must use `htmlspecialchars()` |
| 4 | **No CSRF Protection** | Must note absence of CSRF token in the form; fix must show token generation, hidden field, and verification |
| 5 | **Exposed DB Credentials / No Error Handling** | Must note root user with no password, or lack of error handling; fix must mention least-privilege user and graceful error handling |

**Acceptable alternative vulnerabilities** (if student identifies one not in the top 5):
- No session management after login (no `session_start()`, no session variable storage)
- Error messages leak information (e.g., "Username not found" tells attacker the username doesn't exist)
- No HTTPS enforcement
- No rate limiting / brute force protection
- Using deprecated `mysqli_*` with no error handling

**Partial credit (1 point):** If the student identifies the vulnerability correctly but provides no fix, or provides an incorrect/incomplete fix.

---

### B2. OOP Code Analysis (10 points)

**(a) Exact Output (4 points)**

Award **0.5 points per correct output line** (8 lines total = 4 points).

Expected output:
```
2020 Generic
2022 Toyota (4-door)
2024 Tesla (4-door)
Electric car silently starting...
Vehicle starting...
Car engine purring!
Electric car silently starting...
```

Common mistakes to watch for:
- Writing `"2024 Tesla"` instead of `"2024 Tesla (4-door)"` — student doesn't realize `ElectricCar` inherits `getInfo()` from `Car` (−0.5)
- Writing `"Woof!"` or some other animal sound — student didn't read the code carefully (0 points for that line)
- Confusing the order of the foreach loop (−0.5 per misplaced line)

**(b) Method Overriding Explanation (3 points)**

| Points | Criteria |
|--------|----------|
| 3 | Correctly defines method overriding; identifies which methods are overridden (`getInfo()` and `start()` in Car; `start()` in ElectricCar); explains polymorphism/dispatch based on object type |
| 2 | Correct definition and identifies overridden methods, but weak on how PHP decides which to call |
| 1 | Basic understanding — mentions that child methods "replace" parent methods, but misses specifics |
| 0 | Incorrect or no explanation |

Key phrases to look for: "same method name in child class", "parent method replaced", "PHP calls the method of the actual object type at runtime", "polymorphism"

**(c) `parent::__construct()` Role (3 points)**

| Points | Criteria |
|--------|----------|
| 3 | Explains that `parent::__construct()` calls the parent class constructor to initialize inherited properties; correctly states that removing it causes `$brand` and `$year` to be undefined, leading to warnings/errors in PHP 8+ or null values in output |
| 2 | Explains the role correctly but incomplete on consequences of removal |
| 1 | Vague understanding — mentions "calls parent constructor" but no details on what breaks |
| 0 | Incorrect or no explanation |

---

### B3. SQL JOIN Analysis (10 points)

**(a) INNER JOIN Result (3 points)**

| Points | Criteria |
|--------|----------|
| 3 | Correct 4-row result set with correct data; explains that INNER JOIN only returns matched rows; notes Headphones (NULL category) and Clothing (no products) are excluded |
| 2 | Correct result set but missing explanation, OR 1 row incorrect |
| 1 | Partially correct — understands JOIN concept but makes errors in result |
| 0 | Incorrect result with no understanding shown |

**(b) LEFT JOIN Result (3 points)**

| Points | Criteria |
|--------|----------|
| 3 | Correct 5-row result set including Headphones with NULL category; explains LEFT JOIN keeps all left-table rows; notes Clothing still doesn't appear (it's in the right table) |
| 2 | Correct result set but weak explanation |
| 1 | Partially correct — includes Headphones but also incorrectly includes Clothing |
| 0 | Incorrect |

**(c) LEFT JOIN with GROUP BY (4 points)**

| Points | Criteria |
|--------|----------|
| 4 | Correct 3-row result (Electronics=2, Furniture=2, Clothing=0); explains LEFT JOIN preserves all categories; explains `COUNT(p.product_id)` counts non-NULL matches (not `COUNT(*)`) |
| 3 | Correct result with adequate explanation |
| 2 | Correct result but no explanation, OR Clothing count wrong (e.g., 1 instead of 0) |
| 1 | Partially correct — understands grouping but makes errors |
| 0 | Incorrect |

**Common mistake:** Using `COUNT(*)` would give Clothing=1. If a student notes this difference and explains why `COUNT(column)` is correct, award full marks.

---

## Part C — Practical (2 × 20 = 40 points)

### Task 1: Secure Login System (20 points)

#### Breakdown

| Component | Points | Criteria |
|-----------|--------|----------|
| **Registration Form** | 4 | HTML form with all 4 fields, POST method, self-submitting; 1pt per field correctly implemented |
| **Registration Processing** | 5 | Validates inputs (1pt); uses `password_hash()` (2pt); displays hash output (1pt); handles errors (1pt) |
| **Login Form** | *(included in Registration Form)* | — |
| **Login Processing** | *(included in Session Management)* | — |
| **Session Management** | 4 | `session_start()` at top (1pt); stores username in `$_SESSION` on login (1pt); displays welcome message (1pt); logout destroys session (1pt) |
| **CSRF Protection** | 4 | Generates random token (1pt); stores in session (1pt); includes hidden field in forms (1pt); verifies on POST (1pt) |
| **Output Escaping** | 3 | Uses `htmlspecialchars()` on all user output (2pt); proper HTML5 document structure with charset (1pt) |

#### Detailed Marking

**Registration Form (4 points):**
- [1pt] Username text input, required
- [1pt] Email email input, required
- [1pt] Password input
- [1pt] Confirm password input + Submit button

**Registration Processing (5 points):**
- [1pt] Server-side validation (empty checks, email format, password length, match check)
- [2pt] `password_hash($password, PASSWORD_DEFAULT)` — must use PASSWORD_DEFAULT or PASSWORD_BCRYPT
- [1pt] Displays the resulting hash to the user
- [1pt] Errors displayed in a list above the form

**Session Management (4 points):**
- [1pt] `session_start()` appears at the very top of the file (before any HTML/output)
- [1pt] Sets `$_SESSION['username']` on successful login
- [1pt] Displays "Welcome, [username]!" when session exists
- [1pt] Logout: calls `session_destroy()` and redirects or clears session

**CSRF Protection (4 points):**
- [1pt] Token generation: `bin2hex(random_bytes(32))` or equivalent secure random
- [1pt] Token stored in `$_SESSION['csrf_token']`
- [1pt] Token included as hidden input in BOTH forms
- [1pt] Token verified on POST: `$_POST['csrf_token'] === $_SESSION['csrf_token']`

**Output Escaping (3 points):**
- [2pt] ALL user-supplied data wrapped in `htmlspecialchars($var, ENT_QUOTES, 'UTF-8')` — partial credit (1pt) if `htmlspecialchars()` used without ENT_QUOTES/UTF-8
- [1pt] Proper HTML5 structure: `<!DOCTYPE html>`, `<meta charset="UTF-8">`, etc.

---

### Task 2: Product CRUD with AJAX (20 points)

#### Breakdown

| Component | Points | Criteria |
|-----------|--------|----------|
| **PHP Backend (API)** | 6 | Routing (1pt); list action (1pt); add with validation (2pt); delete action (1pt); JSON responses (1pt) |
| **jQuery Frontend** | 8 | Load on page ready (2pt); add product via AJAX (3pt); delete via AJAX (3pt) |
| **Error Handling** | 3 | AJAX error callbacks (1pt); client-side validation (1pt); proper HTTP status codes (1pt) |
| **Code Quality** | 3 | Comments (1pt); clean organization (1pt); consistent naming (1pt) |

#### Detailed Marking

**PHP Backend — api.php (6 points):**
- [1pt] Accepts `action` parameter via POST, routes to correct handler (switch/if-else)
- [1pt] `list` action: returns JSON array of all products
- [2pt] `add` action: accepts `name` and `price`, validates both present and price numeric, returns new product JSON or error JSON
- [1pt] `delete` action: accepts `id`, removes product, returns success/error JSON
- [1pt] Sets `Content-Type: application/json` header; all responses are valid JSON

**jQuery Frontend — products.html (8 points):**
- [2pt] On `$(document).ready()`, calls API with `action: list`; populates table rows dynamically
- [3pt] Add form: prevents default submit, sends `$.ajax()`/`$.post()` with name and price, appends new row to table on success, clears form fields
- [3pt] Delete button: uses event delegation (`.on("click", ".btn-delete", ...)`), sends AJAX delete request, removes table row on success

**Error Handling (3 points):**
- [1pt] AJAX `error` callback that displays error message to user (not silent failure)
- [1pt] Client-side validation: checks non-empty name and valid price before sending
- [1pt] API returns appropriate HTTP status codes: 400 for validation errors, 404 for not found

**Code Quality (3 points):**
- [1pt] Meaningful comments explaining key sections
- [1pt] Clean HTML/CSS/JS separation; consistent indentation
- [1pt] Consistent naming conventions (camelCase for JS, snake_case or consistent for PHP)

---

## Critical Security Grading Rules

These rules override the per-question breakdown above:

| Rule | Penalty | Rationale |
|------|---------|-----------|
| **Task 1: No `password_hash()`/`password_verify()`** | Max 10/20 for Task 1 | Password hashing is the core security requirement |
| **Task 1: No CSRF protection at all** | −4 points from Task 1 | CSRF was explicitly required |
| **Task 1: No `htmlspecialchars()` anywhere** | −3 points from Task 1 | XSS prevention is a fundamental requirement |
| **Task 2: No input validation in API** | −2 points from Task 2 | Server-side validation is mandatory |
| **Task 2: Hardcoded HTML table (not dynamic)** | Max 8/20 for Task 2 | AJAX/dynamic loading is the core requirement |
| **Part B1: Only 1–2 vulnerabilities identified** | Max 4/10 for B1 | Minimum 3 expected for passing |
| **Global: No `session_start()` in Task 1** | −4 points from Task 1 | Session management is a core requirement |

---

## Common Mistakes to Watch For

### Part A
- Confusing `$_SESSION` with `$SESSION` (Q15)
- Thinking sessions are stored on the client (Q5)
- Confusing reflected vs stored XSS (Q7)
- Selecting `query()` instead of `execute()` for prepared statements (Q1)

### Part B
- **B1**: Missing XSS as a vulnerability (very common)
- **B1**: Suggesting `addslashes()` as a fix for SQL injection (award 0 for that vulnerability)
- **B1**: Suggesting `md5()` as a fix for passwords (award 0 for that vulnerability)
- **B2a**: Writing `"2024 Tesla"` without `"(4-door)"` for the ElectricCar — forgetting that `getInfo()` is inherited from `Car`
- **B2b**: Saying PHP supports multiple inheritance
- **B2c**: Saying "nothing would happen" if `parent::__construct()` is removed
- **B3c**: Writing `COUNT(*)` instead of `COUNT(p.product_id)` and giving Clothing a count of 1

### Part C
- **Task 1**: Forgetting `session_start()` at the top of the file
- **Task 1**: Using `password_hash()` but then comparing with `==` instead of `password_verify()`
- **Task 1**: CSRF token in only one form, not both
- **Task 1**: `htmlspecialchars()` without `ENT_QUOTES` flag (allows single-quote injection)
- **Task 2**: Using `$.get()` for the list action but not setting up the POST actions correctly
- **Task 2**: Hardcoding table rows in HTML instead of generating them with JavaScript
- **Task 2**: Not using event delegation for delete buttons on dynamically created rows
- **Task 2**: Forgetting `Content-Type: application/json` header in the PHP API
- **Task 2**: Using `echo "text"` instead of `echo json_encode(...)` for API responses

---

## Partial Credit Guidelines

| Situation | Guidance |
|-----------|----------|
| Code is conceptually correct but has a syntax error | Deduct 1 point per error, max 3 per task |
| Code would work but misses one requirement | Deduct the points allocated to that specific requirement |
| Student shows understanding in comments but code is incomplete | Award up to 50% of remaining points for that section |
| Code uses a different but valid approach | Award full marks if requirements are met (e.g., using `mysqli` instead of PDO if not specifically required) |
| Student overwrites answer with incorrect correction | Grade the final visible answer only |

---

## Marking Summary Sheet

| Section | Max Points | Student Score |
|---------|-----------|---------------|
| Part A — Multiple Choice | 30 | ____ / 30 |
| Part B1 — Security Analysis | 10 | ____ / 10 |
| Part B2 — OOP Analysis | 10 | ____ / 10 |
| Part B3 — SQL JOINs | 10 | ____ / 10 |
| Part C Task 1 — Secure Login | 20 | ____ / 20 |
| Part C Task 2 — AJAX CRUD | 20 | ____ / 20 |
| **TOTAL** | **100** | **____ / 100** |

| **Grade:** | ____ |
|-----------|-------|

---

**Prepared for:** INS3064 — Multimedia Design and Web Development  
**Instructor:** ThS. Hieu Ta Chi  
**Coverage:** Sessions 1–15 (Cumulative)
