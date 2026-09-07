# 👨‍🏫 INSTRUCTOR GUIDE
# **Course Delivery Handbook for INS3064**

This guide is for the instructor and teaching assistants. It covers course delivery,
grading workflows, common student issues, and how to use the course materials
effectively. Keep this document accessible throughout the semester.

```
📅 Time: 20 minutes to read fully
🎯 Objectives:
   - Understand the complete course structure and assessment weights
   - Know how to use each type of material (chapters, slides, exercises, homework)
   - Have a grading workflow for each assessment component
   - Be prepared for common student questions and issues
```

---

## 📋 COURSE AT A GLANCE

| Component | Weight | When | Deliverable |
|---|---|---|---|
| Attendance, Participation & Homework | 10% | Ongoing | Weekly homework (15 sets) |
| Midterm Exam | 30% | Week 8 | 90-minute practical exam |
| Final Exam | 20% | Week 15 | 120-minute practical exam |
| Capstone Project | 40% | Weeks 2–15 | 8 milestones (Campus Club Hub) |

**Total: 100%**

---

## 📚 MATERIAL INVENTORY

### Per-Session Material Set (5 pieces each)

| Material | Location | Purpose | When to assign |
|---|---|---|---|
| **Ebook chapter** | `ebook/` or `English/` | Student self-study reading | Before class |
| **Lecture slides** | `slides/` (Marp) | In-class presentation | During class |
| **In-class exercise** | `exercises/session-NN/` | Guided practice | During class (last 45 min) |
| **Homework** | `homework/session-NN/` | Take-home assignment | Due Sunday 23:59 |
| **Canvas diagrams** | `canvases/` | Visual teaching aids | During class (optional) |

### Supplementary Materials

| Material | Location | Purpose |
|---|---|---|
| **Cheat Sheet** | `English/appendix/cheat_sheet.md` | Quick reference for students |
| **References** | `references/resources.md` | Curated external links |
| **Worked Example** | `examples/club-hub/` | Reference implementation for capstone project |
| **Midterm Exam** | `exams/midterm/` | Sample exam + solution + rubric |
| **Final Exam** | `exams/final/` | Sample exam + solution + rubric |
| **Project Spec** | `project/` | Specification + milestones + rubric |

---

## 🗓️ 15-WEEK DELIVERY SCHEDULE

### Week-by-Week Checklist

#### Week 1 — Introduction to PHP
- [ ] Distribute course syllabus and overview
- [ ] Walk students through the [Student Guide](00_student_guide.md)
- [ ] Verify all students have XAMPP installed (use [Installation Guide](00_installation_guide.md))
- [ ] Cover: PHP tags, `echo`/`print`, embedding PHP in HTML, comments
- [ ] In-class: Exercise A (Hello World) + Exercise B (Personal Info Page)
- [ ] Assign: Homework 1 (Portfolio Page), due Sunday
- [ ] Announce: Milestone M1 (Database Design) due Week 2

> ⚠️ **Common issue:** Students open `.php` files with `file:///` instead of
> `http://localhost/`. Show them the difference on screen. This is the #1
> time-waster in Week 1.

#### Week 2 — Programming with PHP
- [ ] Cover: variables, data types, operators, control structures, loops, functions
- [ ] In-class: Exercise A (BMI) + B (Multiplication Table) + C (Prime Numbers)
- [ ] Assign: Homework 2 (Grade Calculator)
- [ ] **Collect: Milestone M1** (ERD + SQL schema)

> 💡 **Teaching tip:** Spend extra time on arrays and `foreach`. These appear in
> every subsequent session. Students who struggle with arrays will struggle
> with the entire course.

#### Week 3 — Dynamic Websites and Forms
- [ ] Cover: `$_GET`, `$_POST`, form processing, validation, `htmlspecialchars()`
- [ ] In-class: Exercise A (Contact Form) + B (Calculator) + C (Login Form)
- [ ] Assign: Homework 3 (Registration & Survey)
- [ ] **Collect: Milestone M2** (Static pages)

> 💡 **Teaching tip:** Emphasize `htmlspecialchars()` from this session. Tell
> students: "Every time you echo user input, wrap it. This is not optional."
> They will need this habit for Session 14.

#### Week 4 — Introduction to MySQL
- [ ] Cover: phpMyAdmin, data types, CREATE TABLE, primary/foreign keys
- [ ] Live demo: Create a database in phpMyAdmin, then write the same SQL
- [ ] In-class: Exercise A (Student DB) + B (Product DB) + C (Library DB)
- [ ] Assign: Homework 4 (University Database)

> ⚠️ **Common issue:** Some students forget to start MySQL in XAMPP. Remind
> them to check the XAMPP control panel before class.

#### Week 5 — Introduction to SQL
- [ ] Cover: SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT
- [ ] In-class: All three exercises (SQL requires heavy practice)
- [ ] Assign: Homework 5 (University Queries)
- [ ] **Collect: Milestone M3** (Database connection)

> 💡 **Teaching tip:** Use phpMyAdmin's SQL tab for live demos. Write a query,
> run it, show the result, modify it, run again. Students learn SQL by watching
> the feedback loop.

#### Week 6 — Database Design
- [ ] Cover: Normalization (1NF, 2NF, 3NF), relationships (1:1, 1:N, N:N)
- [ ] In-class: Exercise A (Blog DB) + B (E-commerce DB) + C (Normalize This)
- [ ] Assign: Homework 6 (Online Bookstore)
- [ ] **Collect: Milestone M4** (CRUD operations)

#### Week 7 — Advanced SQL
- [ ] Cover: JOINs (INNER, LEFT, RIGHT), GROUP BY, HAVING, subqueries
- [ ] In-class: Exercise A (JOIN Queries) + B (Reporting) + C (Complex Queries)
- [ ] Assign: Homework 7 (Bookstore Queries)
- [ ] **Announce:** Midterm exam format and study guide for Week 8

> 💡 **Teaching tip:** JOINs are the hardest SQL concept for beginners. Draw
> Venn diagrams on the board. Use two small tables (3–4 rows each) so students
> can trace the join manually before running the query.

#### Week 8 — Midterm Review & Exam
- [ ] Review sessions: Quick recap of Sessions 1–7
- [ ] Distribute study guide (Homework 8 is non-graded)
- [ ] **Administer midterm exam** (90 minutes)
- [ ] **Collect: Milestone M5** (User authentication)

> ⚠️ **Exam logistics:**
> - Duration: 90 minutes, closed book
> - Part A: 20 MC questions (20 pts) — scan quickly, do not spend >30 sec each
> - Part B: 5 short answer (20 pts) — 2–3 sentences each
> - Part C: 3 practical tasks (60 pts) — this is where students spend most time
> - Remind students: no internet, no notes, no IDE autocomplete

#### Week 9 — Error Handling and Debugging
- [ ] Cover: error types, try-catch, custom exceptions, error logging
- [ ] In-class: Exercise A (Safe Form) + B (Custom Exceptions) + C (Error Logger)
- [ ] Assign: Homework 9 (Robust Calculator)

#### Week 10 — PHP with MySQL
- [ ] Cover: PDO connection, prepared statements, CRUD operations
- [ ] In-class: Exercise A (Connect & Read) + B (Full CRUD) + C (Pagination)
- [ ] Assign: Homework 10 (Contact Manager)
- [ ] **Collect: Milestone M5** (if not collected Week 8)

> ⚠️ **Critical teaching point:** This is where students must stop using raw SQL
> with string concatenation. Prepared statements are mandatory from this point
> forward. Deduct marks for concatenated SQL in homework and project.

#### Week 11 — Programming Techniques
- [ ] Cover: OOP (classes, inheritance, interfaces), MVC pattern
- [ ] In-class: Exercise A (Product Model) + B (MVC Mini Project) + C (Interface)
- [ ] Assign: Homework 11 (Refactor Contact Manager to MVC)
- [ ] **Collect: Milestone M6** (Events system)

> 💡 **Teaching tip:** OOP is abstract for many students. The "aha moment" comes
> when they refactor procedural code into classes. Walk through the Exercise B
> refactor step by step on screen.

#### Week 12 — Web Application Development
- [ ] Cover: Full CRUD web app, file upload, POST-redirect-GET
- [ ] In-class: Exercise A (Complete CRUD) + B (Image Upload) + C (Dashboard)
- [ ] Assign: Homework 12 (Product Management System)

#### Week 13 — Cookies and Sessions
- [ ] Cover: `$_SESSION`, `setcookie()`, login/logout, role-based access
- [ ] In-class: Exercise A (Login System) + B (Remember Me) + C (Role-Based)
- [ ] Assign: Homework 13 (Add auth to Product App)
- [ ] **Collect: Milestone M7** (File upload + security)

#### Week 14 — Security Methods
- [ ] Cover: SQL injection, XSS (3 types), CSRF, password hashing
- [ ] In-class: Exercise A (Secure Login) + B (Secure File Upload) + C (Security Audit)
- [ ] Assign: Homework 14 (Security hardening + SECURITY_CHECKLIST.md)
- [ ] **Announce:** Final exam format and study guide

> 💡 **Teaching tip:** The Security Audit exercise (C) is the most impactful.
> Give students a vulnerable PHP file and have them find all the issues. This
> directly prepares them for the final exam's code analysis section.

#### Week 15 — jQuery and AJAX + Final Exam
- [ ] Cover: jQuery selectors, events, DOM manipulation, AJAX
- [ ] In-class: Exercise A (Interactive UI) + B (AJAX Product List) + C (Live Search)
- [ ] Assign: Homework 15 (Add AJAX to Product App)
- [ ] **Collect: Milestone M8** (Final project submission)
- [ ] **Administer final exam** (120 minutes)

> ⚠️ **Final exam logistics:**
> - Duration: 120 minutes, closed book
> - Part A: 15 MC questions (30 pts)
> - Part B: 3 code analysis questions (30 pts)
> - Part C: 2 practical tasks (40 pts) — secure login + AJAX CRUD
> - The final is harder than the midterm. Students who practiced the exercises
>   will do well; those who only read the chapters will struggle.

---

## 📊 GRADING WORKFLOW

### Homework Grading (10% of final grade)

| Criteria | Weight | What to look for |
|---|---|---|
| Functionality | 40% | Does it work? All requirements met? |
| Code quality | 25% | Clean code, proper naming, comments where needed |
| Security | 20% | Prepared statements, htmlspecialchars, password_hash |
| UX/Design | 15% | Usable interface, error messages, success feedback |

**Grading scale:**
- A (90–100): All requirements met, clean code, proper security
- B (80–89): Most requirements met, minor issues
- C (70–79): Core requirements met, some security or quality gaps
- D (60–69): Partial implementation, significant gaps
- F (<60): Incomplete or non-functional

### Midterm Exam Grading (30% of final grade)

See `exams/midterm/rubric.md` for the complete marking guide.

Key points:
- Part A (MC): No partial credit — each question is right or wrong
- Part B (Short answer): Award partial credit for partial explanations
- Part C (Practical): Use the rubric's per-task breakdown. Deduct heavily for
  missing security (no `htmlspecialchars` = −5 per instance)

### Final Exam Grading (20% of final grade)

See `exams/final/rubric.md` for the complete marking guide.

Key security grading rules:
- No `password_hash()` in Task 1 → max 10/20
- No prepared statements → −50% on relevant task
- No CSRF token in forms → −3 per form
- Raw SQL with user input → −5 per instance

### Capstone Project Grading (40% of final grade)

See `project/rubric.md` for the complete per-milestone rubric.

Each milestone is graded independently:
- M1 (4 pts), M2 (4 pts), M3 (4 pts), M4 (5 pts)
- M5 (6 pts), M6 (6 pts), M7 (5 pts), M8 (6 pts)
- **Total: 40 points**

**Bonus points** (max +5): Deployment (+2), Git (+1), Tests (+1), Accessibility (+1)

**Penalties:**
- Security vulnerability: −5 per issue
- Plagiarism: 0 for entire project
- Late submission: −10% per day

---

## ❓ FREQUENTLY ASKED QUESTIONS (FROM STUDENTS)

### Technical Issues

**Q: My PHP file shows the source code in the browser.**
A: You opened it with `file:///` instead of `http://localhost/`. Always access
PHP through Apache.

**Q: XAMPP says port 80 is already in use.**
A: Another program (Skype, IIS, another web server) is using port 80. Change
Apache's port to 8080 in XAMPP config, then use `http://localhost:8080/`.

**Q: My form data disappears when I refresh the page.**
A: This is normal for POST forms. Use the POST-redirect-GET pattern or
re-populate fields with `value="<?= htmlspecialchars($old_value ?? '') ?>"`.

**Q: I get "Connection refused" when connecting to MySQL.**
A: MySQL is not running. Start it in the XAMPP control panel. Also check that
your config uses `localhost` (not `127.0.0.1`) and port `3306`.

### Course Content

**Q: Do I need to memorize SQL syntax?**
A: No. You will have the cheat sheet for reference. But you need to understand
the concepts well enough to write queries without copying from examples.

**Q: Can I use AI tools for homework?**
A: AI assistants are allowed for homework only if you can explain every line
you submit. They are banned in both exams. If you cannot explain your code
when asked, it will be treated as plagiarism.

**Q: What if I miss a milestone deadline?**
A: Late submissions lose 10% per day. After 7 days, the milestone is worth 0.
Contact your instructor immediately if you have extenuating circumstances.

**Q: Can I use Laravel/Symfony/other framework?**
A: No. The project must use plain PHP + MySQL as taught in the course.
Frameworks are listed as a future learning path in Appendix A.

---

## 🔧 BUILD SYSTEM

The student portal is generated from Markdown sources using the build tool.

### Rebuilding the site
```bash
node _tools/build-site.mjs
```

This reads from `English/` and outputs to `site/`. It generates:
- 15 ebook chapter pages
- 15 slide deck pages
- 16 session hub pages
- Guide pages (Start Here, Course Overview, Installation, Cheat Sheet, Student Guide, Instructor Guide)
- Static assets (CSS, JS)

### Adding a new guide
1. Create the Markdown file in `English/` (e.g., `English/00_new_guide.md`)
2. Add an entry to the `GUIDES` array in `_tools/build-site.mjs`
3. Run `node _tools/build-site.mjs`

### Quality assurance
```bash
node _tools/qa-render.mjs    # Unit tests for the renderer
node _tools/qa-site.mjs      # Output validation (broken links, content policy)
```

---

## 📎 QUICK REFERENCE

| Document | Path |
|---|---|
| Syllabus | `English/SYLLABUS.md` |
| Schedule | `schedule.md` |
| Student Guide | `English/00_student_guide.md` |
| Installation Guide | `English/00_installation_guide.md` |
| Course Overview | `English/00_course_overview.md` |
| Cheat Sheet | `English/appendix/cheat_sheet.md` |
| Midterm Exam | `exams/midterm/sample-exam.md` |
| Midterm Solution | `exams/midterm/sample-solution.md` |
| Midterm Rubric | `exams/midterm/rubric.md` |
| Final Exam | `exams/final/sample-exam.md` |
| Final Solution | `exams/final/sample-solution.md` |
| Final Rubric | `exams/final/rubric.md` |
| Project Spec | `project/spec.md` |
| Project Milestones | `project/milestones.md` |
| Project Rubric | `project/rubric.md` |
| References | `references/resources.md` |
