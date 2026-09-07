# 🎓 STUDENT GUIDE
# **Your Complete Learning Roadmap for INS3064**

This guide is your compass for the entire semester. It tells you exactly what to do
each week, how to study effectively, how to prepare for exams, and how to build your
capstone project step by step. Bookmark this page — you will come back to it often.

```
📅 Time: 15 minutes to read fully
🎯 Objectives:
   - Understand the complete learning path from Session 1 to Session 15
   - Know exactly what to do before, during, and after each class
   - Learn how to use exercises, homework, and the capstone project effectively
   - Prepare strategically for midterm and final exams
📖 Preparation:
   - Read the Start Here page first
   - Have XAMPP installed and running
```

---

## 🗺️ THE BIG PICTURE

Your semester has **four phases**. Each phase builds on the one before it.

| Phase | Sessions | What you learn | What you build |
|---|---|---|---|
| **Phase 1: Foundation** | 1–3 | PHP basics, forms, validation | Static pages → dynamic forms |
| **Phase 2: Database** | 4–7 | MySQL, SQL, database design | Database schemas, complex queries |
| **Phase 3: Integration** | 9–12 | PHP + MySQL, OOP, full CRUD | Complete web applications |
| **Phase 4: Professional** | 13–15 | Security, sessions, AJAX | Secure, interactive apps |

**Session 8** is midterm review and exam. There is no new content that week.

```
⚠️ CRITICAL: Each phase depends on the previous one.
   If you fall behind in Phase 1, Phase 2 will be confusing.
   If you fall behind in Phase 2, Phase 3 will be overwhelming.
   Stay current. Ask questions early. Do not skip chapters.
```

---

## 📅 WEEK-BY-WEEK ROADMAP

### Phase 1 — PHP Foundation (Weeks 1–3)

#### Week 1: Introduction to PHP
- [ ] Install XAMPP following the [Installation Guide](00_installation_guide.md)
- [ ] Read Chapter 1 — focus on `echo`, `<?php ?>` tags, embedding PHP in HTML
- [ ] Complete Exercise A (Hello World) and Exercise B (Personal Info Page)
- [ ] **Homework 1:** Build your personal portfolio page
- [ ] **Milestone M1:** Start thinking about your database design for Campus Club Hub

> 💡 **Study tip:** Type every code example by hand. Do not copy-paste. Your fingers
> need to learn where the semicolon and dollar sign are.

#### Week 2: Programming with PHP
- [ ] Read Chapter 2 — variables, data types, operators, loops, functions
- [ ] Complete Exercise A (BMI Calculator), B (Multiplication Table), try C (Prime Numbers)
- [ ] **Homework 2:** Student Grade Calculator
- [ ] **Milestone M1 due:** Submit your ERD + SQL schema for Campus Club Hub

> 💡 **Study tip:** The `foreach` loop and arrays are used in every single session
> after this. If arrays feel shaky, spend an extra hour practicing them.

#### Week 3: Dynamic Websites and Forms
- [ ] Read Chapter 3 — `$_GET`, `$_POST`, validation, `htmlspecialchars()`
- [ ] Complete Exercise A (Contact Form), B (Calculator), try C (Login Form)
- [ ] **Homework 3:** Registration & Survey multi-page form
- [ ] **Milestone M2 due:** Static pages for Campus Club Hub

> 💡 **Study tip:** `htmlspecialchars()` is your best friend. Every time you `echo`
> user input, wrap it. This habit will save you in Session 14 (Security).

---

### Phase 2 — Database (Weeks 4–7)

#### Week 4: Introduction to MySQL
- [ ] Read Chapter 4 — phpMyAdmin, data types, CREATE TABLE, keys
- [ ] Open phpMyAdmin at `http://localhost/phpmyadmin`
- [ ] Complete Exercise A (Student DB), B (Product DB), try C (Library DB)
- [ ] **Homework 4:** Design University Course Registration database

> 💡 **Study tip:** Practice writing CREATE TABLE by hand on paper first. Understand
> why `INT` vs `VARCHAR` vs `DATETIME` matters before typing SQL.

#### Week 5: Introduction to SQL
- [ ] Read Chapter 5 — SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT
- [ ] Complete all three exercises — SQL requires repetition
- [ ] **Homework 5:** Write 10 queries for the University database
- [ ] **Milestone M3 due:** Connect Campus Club Hub to MySQL

> 💡 **Study tip:** SQL is a language you learn by doing, not reading. Write at
> least 20 queries this week. The more you write, the more natural it becomes.

#### Week 6: Database Design
- [ ] Read Chapter 6 — Normalization (1NF, 2NF, 3NF), relationships, foreign keys
- [ ] Complete Exercise A (Blog DB), B (E-commerce DB), try C (Normalize This)
- [ ] **Homework 6:** Design Online Bookstore database with ERD
- [ ] **Milestone M4 due:** CRUD operations for Campus Club Hub

> 💡 **Study tip:** Draw your ERD on paper before writing SQL. If you cannot explain
> your relationships in plain English, your SQL will not work either.

#### Week 7: Advanced SQL
- [ ] Read Chapter 7 — JOINs, GROUP BY, HAVING, subqueries, views
- [ ] Complete Exercise A (JOIN Queries), B (Reporting), try C (Complex Queries)
- [ ] **Homework 7:** Write 10 complex queries for the Bookstore database

> 💡 **Study tip:** JOINs are the most important topic for the midterm. Practice
> INNER JOIN, LEFT JOIN until you can predict the result before running the query.

---

### ⚡ Week 8: Midterm Exam

- [ ] Review the [Midterm Study Guide](homework/session-08/homework.md) (non-graded)
- [ ] Re-read chapters 1–7, focusing on areas where you scored lowest on exercises
- [ ] Practice the sample exam at `exams/midterm/sample-exam.md`
- [ ] Check your answers against `exams/midterm/sample-solution.md`
- [ ] **Milestone M5 due:** User authentication for Campus Club Hub

> ⚠️ **Exam format:** 90 minutes, closed book. 20 MC (20 pts) + 5 short answer
> (20 pts) + 3 practical tasks (60 pts). The practical part is worth the most —
> practice writing PHP forms and SQL queries under time pressure.

---

### Phase 3 — Integration & Advanced (Weeks 9–12)

#### Week 9: Error Handling and Debugging
- [ ] Read Chapter 9 — try-catch, custom exceptions, error logging
- [ ] Complete Exercise A (Safe Form), B (Custom Exceptions), try C (Error Logger)
- [ ] **Homework 9:** Build a Robust Calculator with comprehensive error handling

> 💡 **Study tip:** From this point on, every PHP file you write should have
> `try-catch` around database operations. Make it a habit.

#### Week 10: PHP with MySQL
- [ ] Read Chapter 10 — PDO, prepared statements, CRUD operations
- [ ] Complete Exercise A (Connect & Read), B (Full CRUD), try C (Pagination)
- [ ] **Homework 10:** Build a Contact Manager CRUD application

> 💡 **Study tip:** Prepared statements are non-negotiable. If you write raw SQL
> with user input concatenated into the string, you will lose marks from now on.

#### Week 11: Programming Techniques
- [ ] Read Chapter 11 — OOP (classes, inheritance), MVC pattern
- [ ] Complete Exercise A (Product Model), B (MVC Mini Project), try C (Interface)
- [ ] **Homework 11:** Refactor Contact Manager to MVC structure
- [ ] **Milestone M6 due:** Events system for Campus Club Hub

> 💡 **Study tip:** OOP feels abstract until you use it. The exercise where you
> refactor procedural code into classes is where it clicks. Do not skip it.

#### Week 12: Web Application Development
- [ ] Read Chapter 12 — Full CRUD web app, file upload, POST-redirect-GET
- [ ] Complete Exercise A (Complete CRUD), B (Image Upload), try C (Dashboard)
- [ ] **Homework 12:** Build a Product Management System

> 💡 **Study tip:** This is the "everything comes together" session. Your Product
> Management System should use PDO, prepared statements, OOP, and proper file
> structure. If it does not, revisit Sessions 10–11.

---

### Phase 4 — Professional Skills (Weeks 13–15)

#### Week 13: Cookies and Sessions
- [ ] Read Chapter 13 — `$_SESSION`, `setcookie()`, login/logout, role-based access
- [ ] Complete Exercise A (Login System), B (Remember Me), try C (Role-Based Access)
- [ ] **Homework 13:** Add authentication to your Product Management System
- [ ] **Milestone M7 due:** File upload + security for Campus Club Hub

> 💡 **Study tip:** Sessions are how real web apps work. Understand the difference
> between `session_start()` at the top of every file vs. only on login.

#### Week 14: Security Methods
- [ ] Read Chapter 14 — SQL injection, XSS, CSRF, password hashing, file upload security
- [ ] Complete Exercise A (Secure Login), B (Secure File Upload), try C (Security Audit)
- [ ] **Homework 14:** Security audit and hardening of your Product Management System

> 💡 **Study tip:** This session is tested heavily on the final exam. Know the
> difference between the three types of XSS. Know how CSRF tokens work. Know why
> `password_hash()` is better than MD5.

#### Week 15: jQuery and AJAX + Final Exam

- [ ] Read Chapter 15 — jQuery selectors, events, DOM manipulation, AJAX
- [ ] Complete Exercise A (Interactive UI), B (AJAX Product List), try C (Live Search)
- [ ] **Homework 15:** Add AJAX features to your Product Management System
- [ ] **Milestone M8 due:** Final Campus Club Hub submission
- [ ] Review the [Final Study Guide](homework/session-15/homework.md)
- [ ] Practice the sample exam at `exams/final/sample-exam.md`

> ⚠️ **Final exam format:** 120 minutes, closed book. 15 MC (30 pts) + 3 code
> analysis (30 pts) + 2 practical tasks (40 pts). The practical tasks require
> building a secure login and an AJAX CRUD system from scratch.

---

## 🏗️ CAPSTONE PROJECT: CAMPUS CLUB HUB

The capstone project is worth **40% of your grade**. You build it incrementally
across all 15 weeks through 8 milestones.

### What you are building
A web application where students browse campus clubs, view events, and club admins
manage their clubs. Think of it as a mini Facebook for campus clubs.

### Milestone timeline

| Milestone | Due | Points | What to deliver |
|---|---|---|---|
| M1 | Week 2 | 4 | ERD + SQL schema + sample data |
| M2 | Week 4 | 4 | Static pages with header/footer |
| M3 | Week 6 | 4 | Dynamic pages reading from database |
| M4 | Week 8 | 5 | Full CRUD for clubs and events |
| M5 | Week 10 | 6 | User registration, login, roles |
| M6 | Week 11 | 6 | RSVP system, event management |
| M7 | Week 13 | 5 | File upload, CSRF tokens, XSS audit |
| M8 | Week 15 | 6 | AJAX, polish, responsive design |

### How to succeed
1. **Start early.** M1 is due in Week 2 — do not wait until the night before.
2. **Build incrementally.** Each milestone adds to the previous one. Do not start
   from scratch each week.
3. **Use the worked example.** The `examples/club-hub/` folder shows you exactly
   how to structure your code. Follow it.
4. **Test as you go.** After each milestone, verify everything still works before
   adding the next feature.
5. **Keep a backup.** Copy your project folder before each milestone submission.

```
💡 The project rubric is at project/rubric.md — read it before you start.
   It tells you exactly how each milestone is graded.
```

---

## 📝 HOW TO STUDY EFFECTIVELY

### The 3-Pass Method
1. **First pass (before class):** Read the chapter. Do not try to understand
   everything. Get the big picture. Note what confuses you.
2. **Second pass (in class):** Follow the slides. The instructor will explain
   the confusing parts. Type the code examples as they are shown.
3. **Third pass (after class):** Rebuild the exercises from memory. If you get
   stuck, check the chapter. This is where real learning happens.

### Time management
| Activity | Time per week | When |
|---|---|---|
| Pre-class reading | 30–45 min | Before the lecture |
| In-class participation | 2.5 hours | During the lecture |
| Exercise completion | 45–60 min | After the lecture |
| Homework | 2–3 hours | Before Sunday 23:59 |
| **Total** | **~5 hours/week** | |

### When you get stuck
1. **Re-read the relevant chapter section.** The answer is usually there.
2. **Check the [Cheat Sheet](appendix/cheat_sheet.md).** Quick syntax reference.
3. **Use `var_dump()` and `print_r()`.** See what your variables actually contain.
4. **Read the error message.** PHP errors tell you the file, line number, and
   what went wrong. Do not ignore them.
5. **Ask your instructor or classmates.** But come with a specific question, not
   "it does not work."

### Common mistakes to avoid
- ❌ Copy-pasting code without understanding it
- ❌ Skipping exercises because "I understand the chapter"
- ❌ Starting homework on Sunday night
- ❌ Not testing your code after each change
- ❌ Ignoring error messages instead of reading them
- ❌ Using `echo` to debug instead of `var_dump()`
- ❌ Forgetting `<?php` opening tag or `;` semicolon
- ❌ Opening PHP files with `file:///` instead of `http://localhost/`

---

## 🔗 QUICK LINKS

| Resource | What it is |
|---|---|
| [Start Here](00_start_here.md) | How to use this portal |
| [Installation Guide](00_installation_guide.md) | XAMPP + VS Code setup |
| [Course Overview](00_course_overview.md) | Full course structure and outcomes |
| [Cheat Sheet](appendix/cheat_sheet.md) | PHP & MySQL quick reference |
| [Midterm Sample Exam](../exams/midterm/sample-exam.md) | Practice for midterm |
| [Final Sample Exam](../exams/final/sample-exam.md) | Practice for final |
| [Project Specification](../project/spec.md) | Campus Club Hub requirements |
| [Project Milestones](../project/milestones.md) | 8-milestone schedule |
| [Project Rubric](../project/rubric.md) | How the project is graded |
| [References](../references/resources.md) | Curated learning resources |

---

## 🧪 SELF-ASSESSMENT CHECKLIST

Rate yourself honestly after each phase. If you score below 3 on any item,
go back and review before moving to the next phase.

### After Phase 1 (Week 3)
- [ ] I can write a PHP file that outputs HTML with dynamic data
- [ ] I can create a form and process it with `$_POST`
- [ ] I can validate user input and display error messages
- [ ] I use `htmlspecialchars()` every time I echo user input

### After Phase 2 (Week 7)
- [ ] I can design a database with proper relationships (1:N, N:N)
- [ ] I can write SELECT queries with JOIN, GROUP BY, and subqueries
- [ ] I can normalize a table to 3NF
- [ ] I can explain the difference between PRIMARY KEY and FOREIGN KEY

### After Phase 3 (Week 12)
- [ ] I can connect PHP to MySQL using PDO with prepared statements
- [ ] I can build a complete CRUD application (list, add, edit, delete)
- [ ] I can organize code using MVC pattern with classes
- [ ] I can handle errors with try-catch and display friendly messages

### After Phase 4 (Week 15)
- [ ] I can implement user authentication with `password_hash`/`password_verify`
- [ ] I can protect forms with CSRF tokens
- [ ] I can prevent SQL injection, XSS, and CSRF attacks
- [ ] I can make AJAX requests with jQuery and handle JSON responses

---

📝 **Remember:** You do not need to be an expert after 15 weeks. You need to be
competent — able to build a working PHP+MySQL application with proper security.
That is exactly what the course teaches. Trust the process, do the work, and
ask questions when you are stuck.
