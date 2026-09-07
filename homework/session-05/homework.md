# Homework 5: Introduction to SQL

> **Due:** Sunday 23:59 via LMS | **File:** `university_queries.sql`

## How to Submit
1. Save your `.sql` file as `university_queries.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `homework05.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

In this assignment you will write **10 SQL queries** against the University Course Registration database you created in Homework 4. This exercise reinforces your understanding of core SQL operations: `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `LIKE`, `JOIN`, aggregate functions, and grouping. Each query must include a comment explaining what it does, along with the expected output.

## Requirements

### Functional Requirements

Your `university_queries.sql` file must contain **10 queries** that cover the following topics. Each query must be preceded by a **multi-line comment** explaining its purpose.

| # | Topic | Description |
|---|-------|-------------|
| 1 | **Basic SELECT** | Retrieve all columns from one table (e.g., list all students). |
| 2 | **WHERE with comparison** | Filter records using a comparison operator (e.g., students with GPA > 3.0). |
| 3 | **WHERE with AND/OR** | Combine multiple conditions (e.g., courses in a specific department with credits >= 3). |
| 4 | **ORDER BY** | Sort results by one or more columns (e.g., students ordered by last name ascending). |
| 5 | **LIMIT** | Return only a fixed number of rows (e.g., top 3 highest-graded enrollments). |
| 6 | **LIKE** | Search for a pattern in text (e.g., courses whose title contains "Introduction", or instructors whose name starts with "Ng"). |
| 7 | **Aggregate — COUNT / SUM** | Use an aggregate function (e.g., count the number of students per department, or total credits for all courses). |
| 8 | **Aggregate with GROUP BY + HAVING** | Group results and filter groups (e.g., departments that have more than 2 courses, or students enrolled in more than 3 courses). |
| 9 | **JOIN — two tables** | Join two tables using a foreign key (e.g., list all courses with their instructor names). |
| 10 | **JOIN — three or more tables** | A multi-table join (e.g., list all enrollments with student name, course title, semester name, and grade). |

### Technical Requirements

- Deliver a **single file** named `university_queries.sql`.
- Begin the file with a **comment header** (name, student ID, assignment, date).
- Each query must have a **comment block** directly above it in the following format:
  ```sql
  /*
   * Query N: <Short Title>
   * Description: <What this query does and why>
   * Expected Output: <Brief description of what the result set looks like>
   */
  ```
- After each query, include a **comment block showing the expected output** as a text table (use your best guess based on your sample data from Homework 4):
  ```sql
  /*
   * +----+-------------------+------+
   * | id | name              | gpa  |
   * +----+-------------------+------+
   * |  1 | Nguyen Van An     | 3.50 |
   * |  2 | Tran Thi Bich     | 3.80 |
   * ...
   * +----+-------------------+------+
   * (5 rows)
   */
  ```
- Use **uppercase SQL keywords** (`SELECT`, `FROM`, `WHERE`, `ORDER BY`, etc.) — this is the standard SQL formatting convention.
- End each statement with a semicolon (`;`).
- Use **column aliases** (`AS`) meaningfully in at least 2 queries to make output columns more readable.
- Include a `USE university_db;` statement at the top (after the header) so the script targets the correct database.

## Deliverables

| File | Description |
|------|-------------|
| `university_queries.sql` | SQL script containing 10 commented queries with expected outputs. |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Correctness** | 40% | All 10 queries execute without errors on the database from Homework 4; results are logically correct and match the stated purpose of each query. |
| **Query Complexity** | 25% | Queries demonstrate a solid range of SQL features — not just simple `SELECT *`; proper use of joins, aggregates, grouping, filtering, and sorting as specified. |
| **Comments & Documentation** | 20% | Every query has a clear comment block with title, description, and expected output; the file header is present; comments are accurate and helpful. |
| **Output Matching** | 15% | Expected output blocks are included after each query and are consistent with the sample data from Homework 4; output formatting is clear and readable. |

## Tips

- Run your Homework 4 script first to ensure the database and data exist before testing queries.
- Test each query individually in MySQL and copy the actual output to format your expected results.
- Use `FORMAT()` or `ROUND()` for numeric output if needed for readability.
- For the `LIKE` query, try patterns like `'%Introduction%'` or `'Ng%'` — remember `%` matches any sequence of characters.
- Example of a well-commented query:
  ```sql
  /*
   * Query 9: Courses with Instructor Names
   * Description: Joins the courses and instructors tables to show
   *              each course title alongside the instructor who teaches it.
   * Expected Output: A list of course titles with instructor full names.
   */
  SELECT
      c.course_code,
      c.title        AS course_title,
      CONCAT(i.first_name, ' ', i.last_name) AS instructor_name
  FROM courses c
  JOIN instructors i ON c.instructor_id = i.id
  ORDER BY c.course_code;
  ```
- Double-check that your expected output counts (row numbers) are accurate — an easy mistake to make.
- If your Homework 4 data changes, remember to update the expected outputs here too.

## Resources

- [MySQL Manual — SELECT Statement](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL Manual — JOIN Clause](https://dev.mysql.com/doc/refman/8.0/en/join.html)
- [MySQL Manual — Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
- [W3Schools — SQL Tutorial](https://www.w3schools.com/sql/)
- [SQLBolt — Interactive SQL Exercises](https://sqlbolt.com/)
