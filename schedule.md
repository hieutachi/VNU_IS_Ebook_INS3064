# INS3064 — Course Schedule

**Course:** Multimedia Design and Web Development (INS3064) — 3 credits  
**Hours:** 45 periods (30 theory + 15 practice)  
**Prerequisite:** basic HTML and CSS  
**Language:** English (international students)  
**Session duration:** 3 periods (150 minutes) per week  
**Stack:** PHP 8.2+, MySQL 8.0+, XAMPP, VS Code, jQuery 3.7

---

## Assessment Overview

| Component | Weight | When |
|---|---|---|
| Attendance, Participation & Homework | 10% | Ongoing |
| Midterm Exam (practical) | 30% | Week 8 |
| Final Exam (practical) | 20% | Week 15 |
| Capstone Project (Campus Club Hub) | 40% | Week 16 |

**Total: 10 + 30 + 20 + 40 = 100%.**

> **How the 60% "final" component splits.** The course outline lists a single 60% final
> component ("Cuối kỳ — bảo vệ dự án"). This package divides it into the **final practical
> exam (20%)** and the **capstone project (40%)**, because a defence alone cannot show
> whether a student can write a prepared statement under time pressure. Both are marked on
> their own rubrics — `exams/final/rubric.md` (out of 10) and `project/rubric.md` (out of
> 40) — and then scaled to those weights. The project defence is part of the project mark,
> not a separate component; see `project/rubric.md`.

**Homework:** every session has one homework, due Sunday at 23:59, graded out of 10 by the
rubric printed on each sheet. Homework marks feed the **Attendance, Participation &
Homework 10%** component together with class attendance — there is no separate homework
percentage.

**Late work.** Homework is marked until **Monday 23:59** of the following week; anything
handed in during that Monday grace day loses **20% of the earned mark**, and nothing is
marked after it (0 for that sheet). Project milestones M1–M6 follow the same rule — one
grace day at −20%, then the milestone's points are lost, though the work still counts
toward the final submission. The final ZIP (M7 + M8) is governed by `project/spec.md` §8:
**−10% per day late, up to three days, then 0**. If illness or another documented reason
stops you submitting, contact the lecturer **before** the deadline, not after.

---

## Course Learning Outcomes (CLO)

| CLO | You can... | Taught in sessions |
|---|---|---|
| CLO1 | Write correct PHP syntax: variables, types, operators, control flow, functions, arrays | 1, 2, 3 |
| CLO2 | Build a dynamic website that responds to user input | 3, 10, 12 |
| CLO3 | Design a normalised MySQL database and create it with DDL | 4, 6 |
| CLO4 | Write SQL queries from a single `SELECT` to multi-table joins and aggregates | 5, 7 |
| CLO5 | Connect PHP to MySQL with PDO and prepared statements | 10, 11 |
| CLO6 | Handle errors deliberately and defend a web application against common attacks | 9, 14 |
| CLO7 | Manage user state with cookies and sessions, including authentication | 13 |
| CLO8 | Add client-side interactivity with jQuery and AJAX | 15 |

These are the eight learning outcomes from the course syllabus (LO1–LO8), renamed CLO1–CLO8
and rewritten as measurable statements. Every ebook chapter names the CLOs it serves in its
`🔗 Outcomes:` line.

---

## Weekly Schedule

| Week | Session | Topic | Deliverable that week | CLO |
|---|---|---|---|---|
| 1 | 01 | Introduction to PHP — *server vs browser, XAMPP, `<?php ?>`, `echo`, variables* | `info.php` runs, plus a page that prints server-side data | CLO1 |
| 2 | 02 | Programming with PHP — *operators, `if`/`switch`, loops, functions, arrays* | A script that loops over an array through a function you wrote | CLO1 |
| 3 | 03 | Dynamic Websites and Forms — *`GET`/`POST`, validation, `include`, redirects* | A form page that validates input and echoes it back safely | CLO1, CLO2 |
| 4 | 04 | Introduction to MySQL — *phpMyAdmin, data types, `CREATE TABLE`, keys* | `club_hub` database with its first three tables | CLO3 |
| 5 | 05 | Introduction to SQL — *`INSERT`, `SELECT`, `WHERE`, `UPDATE`, `DELETE`, `ORDER BY`* | Seed data inserted and eight working queries saved to `.sql` | CLO4 |
| 6 | 06 | Database Design — *ERD, primary and foreign keys, normalisation to 3NF* | An ERD plus `sql/schema.sql` that recreates the whole database | CLO3 |
| 7 | 07 | Advanced SQL — *`JOIN`, `GROUP BY`, aggregates, subqueries, views* | A join-based report query and one aggregate query | CLO4 |
| **8** | **08** | **Review & Midterm Exam** — *practical exam on sessions 1–7* | **Midterm practical exam (90 min)** | CLO1–CLO4 |
| 9 | 09 | Error Handling and Debugging — *error levels, `try`/`catch`, logging, `var_dump`* | A page with a `try`/`catch` block and a written error log | CLO6 |
| 10 | 10 | PHP with MySQL — *PDO connection, prepared statements, fetching rows* | `events.php` lists real rows from MySQL | CLO2, CLO5 |
| 11 | 11 | Programming Techniques — *reusable functions, `require`, layout partials, classes* | Shared `includes/header.php` and `includes/footer.php` on every page | CLO5 |
| 12 | 12 | Web Application Development — *full CRUD, POST-redirect-GET, file upload* | Working create, edit and delete pages for events | CLO2, CLO5 |
| 13 | 13 | Cookies and Sessions — *`setcookie`, `$_SESSION`, login, logout, guards* | Register, login and logout working with a protected page | CLO7 |
| 14 | 14 | Security Methods — *SQL injection, XSS, CSRF, `password_hash`, uploads* | Hashed passwords, escaped output, CSRF token on every form | CLO6 |
| 15 | 15 | jQuery and AJAX / Review — *selectors, events, `$.ajax`, JSON endpoints* | Live search on `events.php` with no page reload; **final exam (120 min)** | CLO8 |

> **Reading the homework rhythm.** Homework `NN` is set at the end of session `NN` and is due
> Sunday of week `NN+1`. So in week 5 you hand in HW 04 and receive HW 05. HW 15 is due in the
> exam week; it exists so the AJAX work gets feedback before the project deadline.

### Material for each session

Every session `NN` has five matching pieces of material. The naming is mechanical — replace
`NN` with the session number (`01`...`15`):

| Role | Path | Audience |
|---|---|---|
| Textbook chapter | `ebook/NN-*.md` | Students, read before class |
| Lecture slides (Marp) | `slides/NN-*.md` | Lecturer, project in class |
| Lecture diagrams | `canvases/buoi-NN.canvas.tsx` | Lecturer — 3 hand-drawn SVG teaching diagrams per session |
| In-class exercise | `exercises/session-NN/exercise.md` | Students, during class |
| Homework | `homework/session-NN/homework.md` | Students, due Sunday 23:59 |

For session 4, for example, that is `ebook/04-introduction-to-mysql.md`,
`slides/04-introduction-to-mysql.md`, `canvases/buoi-04.canvas.tsx`,
`exercises/session-04/exercise.md`, and `homework/session-04/homework.md`.

One appendix sits outside the weekly rhythm:
`ebook/appendix-a-deployment-and-technology-choices.md` covers putting the project on a real
host and choosing between PHP and other server languages.

---

## Key Dates

| Date | Event |
|---|---|
| Week 8 | Midterm Exam (90 minutes, practical, no internet) |
| Week 15 | Final Exam (120 minutes, practical, no internet) |
| Week 16, Sunday 23:59 | Capstone project ZIP (M7 + M8) and defence slides due |
| Every Sunday 23:59 | Homework submission deadline (Monday grace day at −20%) |

**Allowed in both exams:** your own notes, the `ebook/` chapters offline, your project files,
and the PHP and MySQL documentation that ships offline with XAMPP.
**Not allowed:** the internet, AI assistants, or any messaging between students.

---

## Capstone Project: Campus Club Hub

One project runs through all 15 weeks: a PHP + MySQL web application where students browse
club events, register an account, and where a club officer manages events through an admin
area. Students add features each week as they learn the technique. Every milestone falls at
least one week **after** the session that teaches its skills, so no milestone asks for
something not yet covered.

| Milestone | Due | Content | Points |
|---|---|---|---|
| M1 | Week 3 | Project folder, first PHP pages, shared header and footer via `include` | 4 |
| M2 | Week 5 | `club_hub` database created, tables populated with seed data | 4 |
| M3 | Week 7 | ERD, normalised `sql/schema.sql`, one join query and one aggregate query | 4 |
| M4 | Week 10 | `events.php` and `event-detail.php` read live data through PDO | 5 |
| M5 | Week 12 | Admin CRUD for events, with validation and POST-redirect-GET | 6 |
| M6 | Week 14 | Register, login, logout, guarded admin pages, hashed passwords, CSRF tokens | 6 |
| M7 | Week 16 | jQuery live search plus responsive polish | 5 |
| M8 | Week 16 | Final validation pass, `README.md`, ZIP submission, defence | 6 |

**Milestone points total: 4 + 4 + 4 + 5 + 6 + 6 + 5 + 6 = 40**, which is the whole project
mark. The authoritative per-milestone checklists are in `project/milestones.md`; if that file
and this table ever disagree, `project/milestones.md` wins.

---

## Project File Structure

Every page sits **flat at the project root**. There is no `pages/` folder and no `admin/`
folder, so `css/style.css` and `includes/db.php` are written the same way on every single
page — never `../css/style.css`. Admin pages are identified by their file name and protected
by a session guard, not by their location.

```
club-hub/
├── index.php
├── events.php
├── event-detail.php
├── register.php
├── login.php
├── logout.php
├── profile.php
├── admin-dashboard.php
├── admin-event-form.php
├── admin-event-delete.php
├── admin-members.php
├── search-events.php          # JSON endpoint for the jQuery live search
├── README.md
├── includes/
│   ├── db.php                 # PDO connection, included by every page that queries
│   ├── auth.php               # login-state helpers and the admin guard
│   ├── functions.php          # validation and escaping helpers
│   ├── header.php
│   └── footer.php
├── css/
│   └── style.css
├── js/
│   └── main.js
├── sql/
│   ├── schema.sql
│   └── seed.sql
└── uploads/                   # event images uploaded through the admin form
```

`project/spec.md` §4 is the authoritative version of this tree, and `examples/club-hub/` is a
working site built to exactly this shape. Homework and exercise sheets quote paths from this
tree and nothing else.

