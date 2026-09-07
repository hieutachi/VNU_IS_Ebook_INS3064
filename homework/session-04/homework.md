# Homework 4: Introduction to MySQL

> **Due:** Sunday 23:59 via LMS | **File:** `university_db.sql`

## How to Submit
1. Save your `.sql` file as `university_db.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `homework04.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

In this assignment you will **design and create** a relational database schema for a **University Course Registration System** using MySQL. You will practice database design concepts including tables, primary keys, foreign keys, data types, constraints, and inserting sample data. The deliverable is a single `.sql` file that, when executed, creates the entire database from scratch.

## Requirements

### Functional Requirements

- Create a database named `university_db`.
- Design and create the following **5 tables**:

  1. **`departments`** — stores academic departments.
  2. **`instructors`** — stores instructor information, linked to a department.
  3. **`students`** — stores student information, linked to a department (major).
  4. **`courses`** — stores course information, linked to a department and an instructor.
  5. **`semesters`** — stores semester information (e.g., Fall 2024, Spring 2025).

- Create a **registration/enrollment** table (e.g., `enrollments`) that links students to courses in a given semester, with an optional grade field.

- **Insert sample data** into every table:
  - At least **5 records** per table (departments, instructors, students, courses, semesters).
  - At least **10 records** in the enrollment table (showing various student-course combinations).
  - Use realistic and meaningful data (real department names, plausible course titles, Vietnamese names for students and instructors).

### Technical Requirements

- Deliver a **single file** named `university_db.sql`.
- The file must be **idempotent** — include `DROP DATABASE IF EXISTS` and `DROP TABLE IF EXISTS` statements so it can be re-run without errors.
- Use **appropriate data types**:
  - `INT` / `BIGINT` for IDs and numeric fields.
  - `VARCHAR` with reasonable lengths for names, emails, codes.
  - `TEXT` for descriptions.
  - `DECIMAL(3,2)` or `DECIMAL(4,2)` for GPA / grades.
  - `DATE` or `DATETIME` for dates.
  - `ENUM` for fields with a fixed set of values (e.g., gender, grade letter).
- Apply **constraints**:
  - `PRIMARY KEY` on every table.
  - `FOREIGN KEY` with `ON DELETE` / `ON UPDATE` actions on all referencing columns.
  - `NOT NULL` on required fields.
  - `UNIQUE` on fields that must be unique (e.g., email, student_code, course_code).
  - `DEFAULT` values where appropriate.
  - `CHECK` constraints where useful (e.g., grade between 0.00 and 4.00).
- Use **`AUTO_INCREMENT`** for primary key IDs.
- Include a **comment header** at the top of the file with: your name, student ID, assignment name, and date.
- Add **inline comments** explaining the purpose of each table and each constraint.

## Deliverables

| File | Description |
|------|-------------|
| `university_db.sql` | Complete SQL script that creates the database, all tables with constraints, and inserts all sample data. |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Schema Design** | 40% | Tables are well-structured; relationships (1:N, M:N) are correctly modeled with foreign keys; the enrollment table properly references students, courses, and semesters; no redundant columns. |
| **Data Types & Constraints** | 25% | Appropriate data types chosen for every column; all primary keys, foreign keys, NOT NULL, UNIQUE, and DEFAULT constraints are correctly applied; foreign key actions are specified. |
| **Sample Data** | 20% | At least 5 records per main table and 10 enrollments; data is realistic and internally consistent (foreign key values match existing records); enough variety to be useful for query testing in Homework 5. |
| **Naming Conventions** | 15% | Table and column names are lowercase with underscores (snake_case), consistent, and descriptive; no reserved words used as identifiers; clear and helpful comments throughout. |

## Tips

- Start with an **Entity-Relationship diagram** on paper (or with a tool like dbdiagram.io) before writing SQL.
- Create tables in **dependency order**: tables with no foreign keys first (departments, semesters), then tables that reference them (instructors, students, courses), then the junction table (enrollments).
- Example structure:
  ```sql
  CREATE TABLE departments (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100) NOT NULL UNIQUE,
      code        VARCHAR(10)  NOT NULL UNIQUE,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;
  ```
- Use `ENGINE=InnoDB` to ensure foreign key support.
- For the enrollment table, consider a **composite unique constraint** to prevent duplicate enrollments:
  ```sql
  UNIQUE KEY `unique_enrollment` (`student_id`, `course_id`, `semester_id`)
  ```
- Test your script by running it in MySQL: `mysql -u root -p < university_db.sql`

## Resources

- [MySQL Manual — CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [MySQL Manual — Foreign Keys](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)
- [MySQL Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
- [dbdiagram.io — Free ER Diagram Tool](https://dbdiagram.io/)
