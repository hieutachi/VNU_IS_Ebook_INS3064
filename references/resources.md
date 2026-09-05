# Learning Resources — INS3064: Multimedia Design and Web Development

A curated list of verified resources for PHP, MySQL, web security and jQuery. Official
documentation first, community material second.

> **No internet during exams.** These resources are for study, homework and the capstone
> project only. Both exams are offline — see `schedule.md` → *Key Dates*.

---

## 1. PHP — Core Reference

### php.net (the official manual)

| Resource | URL |
|---|---|
| PHP Manual (home) | https://www.php.net/manual/en/ |
| Language reference — basic syntax | https://www.php.net/manual/en/language.basic-syntax.php |
| Variables | https://www.php.net/manual/en/language.variables.php |
| Types | https://www.php.net/manual/en/language.types.php |
| Operators | https://www.php.net/manual/en/language.operators.php |
| Control structures (`if`, `switch`, loops) | https://www.php.net/manual/en/language.control-structures.php |
| Functions (user-defined) | https://www.php.net/manual/en/functions.user-defined.php |
| Arrays | https://www.php.net/manual/en/language.types.array.php |
| Array functions (A–Z) | https://www.php.net/manual/en/ref.array.php |
| String functions (A–Z) | https://www.php.net/manual/en/ref.strings.php |
| `include` / `require` | https://www.php.net/manual/en/function.include.php |
| Classes and objects | https://www.php.net/manual/en/language.oop5.php |
| Function reference (all extensions) | https://www.php.net/manual/en/funcref.php |
| PHP 8.2 release notes | https://www.php.net/releases/8.2/en.php |
| Migrating to PHP 8.0 (breaking changes) | https://www.php.net/manual/en/migration80.php |

### Forms, superglobals and request handling

| Resource | URL |
|---|---|
| Variables from external sources (`$_GET`, `$_POST`) | https://www.php.net/manual/en/language.variables.external.php |
| `$_SERVER` and other superglobals | https://www.php.net/manual/en/reserved.variables.php |
| `filter_var` — validation and sanitising | https://www.php.net/manual/en/function.filter-var.php |
| Validation filter list (`FILTER_VALIDATE_*`) | https://www.php.net/manual/en/filter.filters.validate.php |
| `header` — redirects | https://www.php.net/manual/en/function.header.php |
| Handling file uploads | https://www.php.net/manual/en/features.file-upload.php |
| POST method uploads | https://www.php.net/manual/en/features.file-upload.post-method.php |

### Errors, debugging and logging

| Resource | URL |
|---|---|
| Error handling (overview) | https://www.php.net/manual/en/language.errors.php |
| Exceptions (`try`/`catch`/`finally`) | https://www.php.net/manual/en/language.exceptions.php |
| Predefined exceptions | https://www.php.net/manual/en/reserved.exceptions.php |
| `error_reporting` | https://www.php.net/manual/en/function.error-reporting.php |
| `display_errors` and other runtime settings | https://www.php.net/manual/en/errorfunc.configuration.php |
| `error_log` | https://www.php.net/manual/en/function.error-log.php |
| `var_dump` | https://www.php.net/manual/en/function.var-dump.php |
| Xdebug (step debugger) | https://xdebug.org/docs/ |

### Sessions, cookies and passwords

| Resource | URL |
|---|---|
| Sessions (overview) | https://www.php.net/manual/en/book.session.php |
| `session_start` | https://www.php.net/manual/en/function.session-start.php |
| Session security considerations | https://www.php.net/manual/en/session.security.php |
| `setcookie` | https://www.php.net/manual/en/function.setcookie.php |
| Password hashing | https://www.php.net/manual/en/book.password.php |
| `password_hash` | https://www.php.net/manual/en/function.password-hash.php |
| `password_verify` | https://www.php.net/manual/en/function.password-verify.php |
| `htmlspecialchars` (escaping output) | https://www.php.net/manual/en/function.htmlspecialchars.php |
| `random_bytes` (CSRF tokens) | https://www.php.net/manual/en/function.random-bytes.php |
| `hash_equals` (timing-safe compare) | https://www.php.net/manual/en/function.hash-equals.php |

---

## 2. PDO — Connecting PHP to MySQL

This course uses **PDO** with prepared statements everywhere. `mysqli` is mentioned in the
ebook only so you recognise it in other people's code.

| Resource | URL |
|---|---|
| PDO (overview) | https://www.php.net/manual/en/book.pdo.php |
| Connections and connection management | https://www.php.net/manual/en/pdo.connections.php |
| MySQL DSN (the connection string) | https://www.php.net/manual/en/ref.pdo-mysql.connection.php |
| `PDO::__construct` | https://www.php.net/manual/en/pdo.construct.php |
| Prepared statements and stored procedures | https://www.php.net/manual/en/pdo.prepared-statements.php |
| `PDO::prepare` | https://www.php.net/manual/en/pdo.prepare.php |
| `PDOStatement::execute` | https://www.php.net/manual/en/pdostatement.execute.php |
| `PDOStatement::fetch` | https://www.php.net/manual/en/pdostatement.fetch.php |
| `PDOStatement::fetchAll` | https://www.php.net/manual/en/pdostatement.fetchall.php |
| `PDO::lastInsertId` | https://www.php.net/manual/en/pdo.lastinsertid.php |
| Errors and error handling (`PDO::ERRMODE_EXCEPTION`) | https://www.php.net/manual/en/pdo.error-handling.php |
| `PDOException` | https://www.php.net/manual/en/class.pdoexception.php |
| Transactions | https://www.php.net/manual/en/pdo.transactions.php |
| `mysqli` (for recognition only) | https://www.php.net/manual/en/book.mysqli.php |

---

## 3. MySQL — Core Reference

### dev.mysql.com (the official manual, version 8.0)

| Resource | URL |
|---|---|
| MySQL 8.0 Reference Manual (home) | https://dev.mysql.com/doc/refman/8.0/en/ |
| Tutorial — using MySQL | https://dev.mysql.com/doc/refman/8.0/en/tutorial.html |
| Data types | https://dev.mysql.com/doc/refman/8.0/en/data-types.html |
| Numeric types | https://dev.mysql.com/doc/refman/8.0/en/numeric-types.html |
| String types | https://dev.mysql.com/doc/refman/8.0/en/string-types.html |
| Date and time types | https://dev.mysql.com/doc/refman/8.0/en/date-and-time-types.html |
| `CREATE TABLE` | https://dev.mysql.com/doc/refman/8.0/en/create-table.html |
| `ALTER TABLE` | https://dev.mysql.com/doc/refman/8.0/en/alter-table.html |
| `INSERT` | https://dev.mysql.com/doc/refman/8.0/en/insert.html |
| `SELECT` | https://dev.mysql.com/doc/refman/8.0/en/select.html |
| `UPDATE` | https://dev.mysql.com/doc/refman/8.0/en/update.html |
| `DELETE` | https://dev.mysql.com/doc/refman/8.0/en/delete.html |
| `WHERE` — comparison operators | https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html |
| `JOIN` clauses | https://dev.mysql.com/doc/refman/8.0/en/join.html |
| `GROUP BY` and aggregate functions | https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html |
| `GROUP BY` handling | https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html |
| Subqueries | https://dev.mysql.com/doc/refman/8.0/en/subqueries.html |
| `CREATE VIEW` | https://dev.mysql.com/doc/refman/8.0/en/create-view.html |
| `CREATE INDEX` | https://dev.mysql.com/doc/refman/8.0/en/create-index.html |
| FOREIGN KEY constraints | https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html |
| String functions | https://dev.mysql.com/doc/refman/8.0/en/string-functions.html |
| Date and time functions | https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html |
| Server error message reference | https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html |

### Database design

| Resource | URL |
|---|---|
| MySQL Workbench — visual database design | https://dev.mysql.com/doc/workbench/en/ |
| Workbench — designing (EER diagrams) | https://dev.mysql.com/doc/workbench/en/wb-data-modeling.html |
| phpMyAdmin documentation | https://docs.phpmyadmin.net/en/latest/ |
| phpMyAdmin — Designer (ERD view) | https://docs.phpmyadmin.net/en/latest/designer.html |
| dbdiagram.io (draw an ERD from text) | https://dbdiagram.io/ |

---

## 4. Web Security — OWASP and friends

Session 14 is built on this material. Read at least the top-ten entries for injection and
authentication before the session.

| Resource | URL |
|---|---|
| OWASP Top 10 (2021) | https://owasp.org/Top10/ |
| A01 — Broken Access Control | https://owasp.org/Top10/A01_2021-Broken_Access_Control/ |
| A03 — Injection (includes SQL injection and XSS) | https://owasp.org/Top10/A03_2021-Injection/ |
| A07 — Identification and Authentication Failures | https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ |
| SQL Injection (attack description) | https://owasp.org/www-community/attacks/SQL_Injection |
| Cross Site Scripting (XSS) | https://owasp.org/www-community/attacks/xss/ |
| Cross Site Request Forgery (CSRF) | https://owasp.org/www-community/attacks/csrf |
| Cheat Sheet Series (index) | https://cheatsheetseries.owasp.org/ |
| SQL Injection Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html |
| Cross-Site Scripting Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html |
| CSRF Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html |
| Password Storage Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html |
| Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html |
| File Upload Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html |
| Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html |
| MDN — HTTP cookies and `Secure`/`HttpOnly`/`SameSite` | https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies |
| MDN — Website security | https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security |
| Have I Been Pwned (why plain-text passwords matter) | https://haveibeenpwned.com/ |

---

## 5. jQuery and AJAX

| Resource | URL |
|---|---|
| jQuery API documentation | https://api.jquery.com/ |
| Selectors | https://api.jquery.com/category/selectors/ |
| Events | https://api.jquery.com/category/events/ |
| `.on()` — event binding | https://api.jquery.com/on/ |
| Manipulation (`.html()`, `.text()`, `.append()`) | https://api.jquery.com/category/manipulation/ |
| `$.ajax()` | https://api.jquery.com/jquery.ajax/ |
| `$.get()` | https://api.jquery.com/jquery.get/ |
| `$.post()` | https://api.jquery.com/jquery.post/ |
| `.serialize()` — turn a form into a query string | https://api.jquery.com/serialize/ |
| jQuery Learning Center | https://learn.jquery.com/ |
| jQuery CDN (the exact tags to copy) | https://releases.jquery.com/ |
| PHP `json_encode` | https://www.php.net/manual/en/function.json-encode.php |
| PHP `json_decode` | https://www.php.net/manual/en/function.json-decode.php |
| MDN — Working with JSON | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON |
| MDN — `fetch()` (the modern alternative, for context) | https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch |

---

## 6. HTML, CSS and the browser

The prerequisite material. Use these when your page is broken before PHP is even involved.

| Resource | URL |
|---|---|
| MDN Web Docs (home) | https://developer.mozilla.org/en-US/ |
| HTML elements reference | https://developer.mozilla.org/en-US/docs/Web/HTML/Element |
| HTML forms (learning path) | https://developer.mozilla.org/en-US/docs/Learn/Forms |
| Sending form data | https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data |
| Form validation | https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation |
| CSS reference (A–Z) | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference |
| Flexbox | https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox |
| CSS Grid | https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids |
| Responsive design | https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design |
| HTTP request methods (`GET` vs `POST`) | https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods |
| HTTP status codes | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status |
| Chrome DevTools — Network panel | https://developer.chrome.com/docs/devtools/network |
| W3C Nu HTML Checker (validator) | https://validator.w3.org/nu/ |
| WCAG accessibility guidelines | https://www.w3.org/WAI/standards-guidelines/wcag/ |
| WebAIM contrast checker | https://webaim.org/resources/contrastchecker/ |

---

## 7. Tools and Environment

| Tool | URL | What it is for |
|---|---|---|
| XAMPP download | https://www.apachefriends.org/download.html | Apache + MySQL + PHP in one installer |
| XAMPP FAQ (Windows) | https://www.apachefriends.org/faq_windows.html | Port conflicts, service errors |
| VS Code | https://code.visualstudio.com/ | The editor used in class |
| PHP Intelephense (VS Code extension) | https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client | Autocomplete and error hints for PHP |
| PHP Debug (VS Code extension) | https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug | Step debugging with Xdebug |
| Git downloads | https://git-scm.com/downloads | Version control for your homework repo |
| GitHub Docs — create a repo | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository | Homework submission |
| Composer | https://getcomposer.org/ | PHP dependency manager (not required in this course) |
| PHP built-in web server | https://www.php.net/manual/en/features.commandline.webserver.php | `php -S localhost:8000` when XAMPP will not start |

### Deployment (Appendix A)

| Resource | URL |
|---|---|
| InfinityFree (free PHP + MySQL hosting) | https://www.infinityfree.com/ |
| 000webhost (free PHP + MySQL hosting) | https://www.000webhost.com/ |
| Railway (PHP deployment) | https://docs.railway.com/guides/php |
| DigitalOcean — LAMP stack on Ubuntu | https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu |
| FileZilla (FTP client) | https://filezilla-project.org/ |
| Let's Encrypt (free HTTPS certificates) | https://letsencrypt.org/getting-started/ |

---

## 8. Tutorials and Practice

Community material. Useful, but when it disagrees with php.net or dev.mysql.com, the official
manual is right.

| Resource | URL | Notes |
|---|---|---|
| PHP The Right Way | https://phptherightway.com/ | Modern PHP practice, short and opinionated |
| MDN — Server-side first steps | https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps | What a server-side language actually does |
| W3Schools PHP Tutorial | https://www.w3schools.com/php/ | Beginner-friendly, some outdated `mysqli` examples |
| W3Schools SQL Tutorial | https://www.w3schools.com/sql/ | Includes an in-browser SQL playground |
| SQLBolt | https://sqlbolt.com/ | Interactive SQL lessons, no signup |
| SQL Murder Mystery | https://mystery.knightlab.com/ | Practise `JOIN` and `WHERE` by solving a case |
| PHP Standards Recommendations (PSR) | https://www.php-fig.org/psr/ | Coding style used in this package (PSR-12) |
| Stack Overflow — `php` tag | https://stackoverflow.com/questions/tagged/php | Read the accepted answer *and* the comments |

---

## 9. Recommended Reading Order

Follow the course week by week. Each entry is what to read **before** that session.

| Week | Read this first |
|---|---|
| 1 | MDN Server-side first steps → php.net Basic syntax |
| 2 | php.net Control structures → php.net Arrays |
| 3 | MDN Sending form data → php.net Variables from external sources → `filter_var` |
| 4 | MySQL Tutorial → MySQL Data types → `CREATE TABLE` |
| 5 | MySQL `INSERT` → `SELECT` → `UPDATE` → `DELETE` |
| 6 | phpMyAdmin Designer → MySQL FOREIGN KEY constraints |
| 7 | MySQL `JOIN` → Aggregate functions → Subqueries |
| 8 | Re-read your own notes from weeks 1–7; no new material |
| 9 | php.net Exceptions → `error_reporting` → Xdebug docs |
| 10 | php.net PDO overview → Connections → Prepared statements |
| 11 | php.net `include`/`require` → Classes and objects |
| 12 | php.net Handling file uploads → OWASP File Upload Cheat Sheet |
| 13 | php.net Sessions → `setcookie` → MDN HTTP cookies |
| 14 | OWASP Top 10 A03 → SQL Injection Prevention → XSS Prevention → CSRF Prevention → Password Storage |
| 15 | jQuery Learning Center → `$.ajax()` → PHP `json_encode` |
| Project | Appendix A, then the deployment links in section 7 |

---

## Notes

- **Prefer official docs.** php.net and dev.mysql.com are versioned and correct. Tutorial sites
  age badly — a 2013 blog post will hand you `mysql_query()`, which was removed in PHP 7.
- **Watch the version in the URL.** These links pin **MySQL 8.0** and the English PHP manual.
  If you land on a different version, the syntax may not match what XAMPP installed.
- **`mysqli` vs PDO.** Plenty of tutorials use `mysqli`. This course marks PDO with prepared
  statements; see `ebook/10-php-with-mysql.md` for why.
- **AI assistants** are allowed for homework only if you can explain every line you submit,
  and are banned in both exams. Unexplainable code scores zero for that section.
- All URLs were verified when this package was written. If one has moved, search the resource
  title on the same site rather than trusting a search-engine result.



