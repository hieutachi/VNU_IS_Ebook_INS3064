# MIDTERM EXAM — Marking Rubric
# INS3064: Multimedia Design and Web Development

**Total:** 100 points | **Pass:** 50 points (D: 60+ recommended)

---

## Grade Boundaries

| Grade | Score Range | Description |
|-------|-----------|-------------|
| **A** | 90 – 100 | Excellent — strong command of PHP and database concepts |
| **B** | 80 – 89 | Good — solid understanding with minor gaps |
| **C** | 70 – 79 | Satisfactory — adequate understanding, some errors |
| **D** | 60 – 69 | Pass — basic understanding, notable weaknesses |
| **F** | 0 – 59 | Fail — insufficient understanding of core concepts |

---

## Part A — Multiple Choice (20 points)

**Scoring:** 1 point per correct answer. No partial credit. No penalty for wrong answers.

| Question | Topic | Correct Answer |
|----------|-------|----------------|
| 1 | File extension | B |
| 2 | PHP opening tag | B |
| 3 | Type juggling / concatenation | B |
| 4 | Variable naming rules | B |
| 5 | Boolean casting | B |
| 6 | String concatenation operator | B |
| 7 | Modulus operator | C |
| 8 | Superglobals | B |
| 9 | GET method | C |
| 10 | GET size limit | C |
| 11 | MySQL data types | B |
| 12 | SQL DISTINCT keyword | B |
| 13 | HAVING vs WHERE | C |
| 14 | SQL SELECT syntax | A |
| 15 | AUTO_INCREMENT | B |
| 16 | Normal forms (2NF) | B |
| 17 | 1NF violation | A |
| 18 | Foreign key purpose | B |
| 19 | LEFT JOIN | C |
| 20 | Prepared statements purpose | B |

---

## Part B — Short Answer (20 points)

### B1. `==` vs `===` (4 points)

| Points | Criteria |
|--------|----------|
| 1 | Correctly states `==` is loose comparison (compares values with type coercion) |
| 1 | Correctly states `===` is strict comparison (compares value AND type) |
| 1 | Provides a valid example showing different results |
| 1 | Clear explanation, well-organized answer |

**Common mistakes:**
- Saying `==` "ignores type" — it doesn't ignore it; it **converts** types before comparing.
- Giving an example where both `==` and `===` return the same result (e.g., comparing two integers).

---

### B2. GET vs POST (4 points)

| Points | Criteria |
|--------|----------|
| 1 | Correctly describes GET: data in URL, size limit, visible in history |
| 1 | Correctly describes POST: data in request body, no practical size limit |
| 1 | States appropriate use cases for each (GET for searching/reading, POST for submitting/modifying data) |
| 1 | Provides valid HTML form examples for both methods |

**Common mistakes:**
- Saying POST is "encrypted" — it's not; only HTTPS encrypts. POST is simply hidden from the URL.
- Confusing POST with PUT or other HTTP methods.

---

### B3. 1NF, 2NF, 3NF (4 points)

| Points | Criteria |
|--------|----------|
| 1 | Correctly defines 1NF: atomic values, no repeating groups |
| 1 | Correctly defines 2NF: 1NF + no partial dependency on composite key |
| 1 | Correctly defines 3NF: 2NF + no transitive dependency |
| 1 | Provides clear violation examples for each |

**Common mistakes:**
- Confusing 2NF and 3NF — 2NF is about partial dependencies (composite keys), 3NF is about transitive dependencies.
- Forgetting that 2NF only applies when there is a composite primary key.
- Stating rules without examples (or with incorrect examples).

---

### B4. Primary Key vs Foreign Key (4 points)

| Points | Criteria |
|--------|----------|
| 1 | Correctly defines primary key: unique, not null, identifies each row |
| 1 | Correctly defines foreign key: references primary key in another table, creates relationship |
| 1 | Provides a valid two-table example with correct relationship |
| 1 | Mentions referential integrity or the constraint aspect of foreign keys |

**Common mistakes:**
- Saying a foreign key must be unique — it doesn't; it can have duplicates (many rows in the child table can reference the same parent).
- Saying a primary key is always an integer — it can be any type, though `INT AUTO_INCREMENT` is most common.

---

### B5. Prepared Statements (4 points)

| Points | Criteria |
|--------|----------|
| 1 | Defines what a prepared statement is (pre-compiled SQL template with placeholders) |
| 1 | Explains how it works (prepare → bind → execute) |
| 1 | Explains why it's important (prevents SQL injection) |
| 1 | Provides a working code example using `mysqli` or `PDO` |

**Common mistakes:**
- Giving an example that still concatenates user input (defeating the purpose).
- Confusing prepared statements with `htmlspecialchars()` (which prevents XSS, not SQL injection).
- Using `PDO` syntax but calling it `mysqli` (or vice versa).

---

## Part C — Practical (60 points)

### Task 1: PHP Registration Form (20 points)

| Points | Criteria |
|--------|----------|
| **4** | **Form structure (4 pts):** |
| | +1 All 5 fields present (name, email, age, password, confirm password) |
| | +1 Correct HTML input types (text, email, number, password × 2) |
| | +1 Form uses `method="POST"` and submits to itself |
| | +1 Submit button present |
| **8** | **Server-side validation (8 pts):** |
| | +1 All fields checked for empty/required |
| | +1 Email validated with `FILTER_VALIDATE_EMAIL` or regex |
| | +1 Age validated as integer within range 10–100 |
| | +1 Password minimum length checked (≥ 6 chars) |
| | +1 Confirm password checked against password |
| | +1 All errors collected and displayed as a list above the form |
| | +1 Errors displayed only when form is submitted (not on first page load) |
| | +1 Reasonable error messages that help the user |
| **4** | **Success summary (4 pts):** |
| | +1 Name displayed correctly |
| | +1 Email displayed correctly |
| | +1 Age displayed correctly |
| | +1 Password is NOT shown in the summary |
| **4** | **Value preservation (4 pts):** |
| | +1 Name field retains its value after failed validation |
| | +1 Email field retains its value |
| | +1 Age field retains its value |
| | +1 `htmlspecialchars()` used when re-displaying values (XSS protection) |

**Deductions:**
- **-2** if form uses GET instead of POST
- **-4** if no server-side validation at all (client-only validation)
- **-2** if password is displayed in the success summary
- **-2** if `htmlspecialchars()` is missing when outputting user data

**Common mistakes to watch for:**
- Only using JavaScript/client-side validation without PHP server-side validation
- Not handling the case when the page loads for the first time (no POST data yet)
- Displaying the raw password in the output
- Forgetting to handle the confirm password field

---

### Task 2: SQL Queries (20 points)

Each query is worth 4 points with the following sub-breakdown:

#### Q1: Students enrolled in 2024 (4 pts)
| Points | Criteria |
|--------|----------|
| +1 | Correct `SELECT` with `student_name`, `email` |
| +1 | Correct `FROM students` |
| +1 | Correct `WHERE enrollment_year = 2024` |
| +1 | Correct `ORDER BY student_name ASC` |

#### Q2: Courses with ≥ 5 students (4 pts)
| Points | Criteria |
|--------|----------|
| +1 | Correct `JOIN` between `courses` and `registrations` |
| +1 | Correct `GROUP BY` on course |
| +1 | Correct `COUNT()` and `HAVING COUNT >= 5` |
| +1 | Correct `ORDER BY` descending |

**Common mistakes:**
- Using `WHERE` instead of `HAVING` for the count filter (−1)
- Missing `GROUP BY` when using `COUNT` (−2)
- Counting `*` instead of `student_id` (acceptable, but note if they might count duplicates)

#### Q3: Spring 2025 registrations with grade > 3.0 (4 pts)
| Points | Criteria |
|--------|----------|
| +1 | Correct JOINs (registration ↔ student AND registration ↔ course) |
| +1 | Correct `WHERE` clause filtering semester and grade |
| +1 | Correct columns selected (student_name, course_name, grade) |
| +1 | Query runs logically correctly |

#### Q4: Students NOT in Fall 2024 — subquery (4 pts)
| Points | Criteria |
|--------|----------|
| +1 | Correct outer query selecting from `students` |
| +1 | Correct subquery selecting `student_id` from `registrations` WHERE semester = 'Fall 2024' |
| +1 | Correct use of `NOT IN` (or `LEFT JOIN ... WHERE ... IS NULL`) |
| +1 | Complete, logically correct query |

**Common mistakes:**
- Not using a subquery (using a JOIN is acceptable only if explicitly asked otherwise — here a subquery is required)
- Using `!=` instead of `NOT IN` with a subquery
- Using `LEFT JOIN` approach instead of subquery — accept this but note the question asked for a subquery

#### Q5: Average grade per department > 3.0 (4 pts)
| Points | Criteria |
|--------|----------|
| +1 | Correct `JOIN` between `courses` and `registrations` |
| +1 | Correct `GROUP BY department` with `AVG(grade)` |
| +1 | Correct `HAVING AVG(grade) > 3.0` |
| +1 | Correct use of `ROUND(..., 2)` |

---

### Task 3: Database Design (20 points)

#### 3.1 CREATE TABLE Statements (8 points)

| Points | Criteria |
|--------|----------|
| +1 | Categories table with appropriate columns and PK |
| +1 | Products table with PK, FK to categories |
| +1 | Customers table with appropriate columns (name, email, etc.) |
| +1 | Orders table with PK, FK to customers, date |
| +1 | Order items junction table with FK to orders AND FK to products |
| +1 | Reviews table with FK to customers and FK to products |
| +1 | Correct data types used throughout (VARCHAR, INT, DECIMAL, DATE, etc.) |
| +1 | Appropriate constraints: NOT NULL, UNIQUE, AUTO_INCREMENT, DEFAULT |

**Critical:**
- The many-to-many between orders and products MUST be resolved with an `order_items` (or `order_details`) junction table. Without it, maximum 8 points drops to 6.
- Foreign keys must reference the correct parent table.

**Common mistakes to watch for:**
- Storing product information directly in the orders table (denormalized / no junction table)
- Missing `FOREIGN KEY` declarations
- Using `VARCHAR` for prices instead of `DECIMAL`
- Not having `AUTO_INCREMENT` on primary keys
- Missing the reviews table entirely

#### 3.2 INSERT Statements (6 points)

| Points | Criteria |
|--------|----------|
| +1 | 2 categories inserted correctly |
| +1 | 3 products inserted with correct category references |
| +1 | 2 customers inserted correctly |
| +1 | 1 order inserted with correct customer reference |
| +1 | 2+ order items with correct product references and quantities |
| +1 | 1 review with correct customer and product references |

**Deductions:**
- **-1** if foreign key values don't match existing parent records (would fail in real DB)
- **-1** if column count doesn't match value count

#### 3.3 Queries on Designed Schema (6 points)

**Query A: Products in a category, ordered by price (3 pts)**

| Points | Criteria |
|--------|----------|
| +1 | Correct JOIN between products and categories |
| +1 | Correct WHERE clause filtering by category name |
| +1 | Correct ORDER BY price |

**Query B: Total spent per customer (3 pts)**

| Points | Criteria |
|--------|----------|
| +1 | Correct JOINs: customers → orders → order_items |
| +1 | Correct `SUM(quantity * unit_price)` calculation |
| +1 | Correct `GROUP BY customer` with `ORDER BY` |

**Common mistakes:**
- Joining products instead of order_items (price × quantity is in order_items)
- Forgetting to GROUP BY when using aggregate functions
- Not using the junction table (order_items) in the total calculation

---

## Summary: Point Distribution

| Section | Questions | Points | % of Grade |
|---------|-----------|--------|------------|
| Part A — Multiple Choice | 20 | 20 | 20% |
| Part B — Short Answer | 5 | 20 | 20% |
| Part C — Task 1 (PHP Form) | 1 | 20 | 20% |
| Part C — Task 2 (SQL Queries) | 5 | 20 | 20% |
| Part C — Task 3 (DB Design) | 3 | 20 | 20% |
| **Total** | | **100** | **100%** |

---

## General Marking Notes

1. **Partial credit** should be awarded generously in Parts B and C. A student who shows understanding but makes a minor syntax error should not lose full marks.
2. **SQL queries:** If a query has a minor syntax error but the logic is clearly correct, deduct only 1 point.
3. **PHP code:** If the approach is correct but there's a missing semicolon or a typo, deduct 1 point, not full marks.
4. **Database design:** Accept alternative valid designs (e.g., different table/column names) as long as the relationships and constraints are correct.
5. **Code quality:** Clean, well-commented code may earn up to 2 bonus points across Part C (at marker's discretion), but total cannot exceed 100.

---

> **Prepared for INS3064 — Multimedia Design and Web Development**  
> **Instructor:** ThS. Hieu Ta Chi  
> **Coverage:** Sessions 1–7
