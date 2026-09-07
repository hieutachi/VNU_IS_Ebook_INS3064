# Homework 14: Security Methods

> **Due:** Sunday 23:59 via LMS | **File:** `homework-14.zip` containing `product_app/` and `SECURITY_CHECKLIST.md`

## How to Submit
1. Save all files in the `product_app/` folder
2. Test each file in browser via `http://localhost/INS3064/product_app/`
3. Compress the folder into `homework-14.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Perform a **comprehensive security audit and hardening** of your Product Management System. This assignment focuses on identifying and mitigating the most common web application vulnerabilities — CSRF, XSS, SQL injection, insecure file uploads, and brute-force attacks. You will also document every security measure in a checklist. Treat this as a real-world security review of your own codebase.

## Requirements

### Functional Requirements

1. **CSRF Protection on ALL Forms**
   - Generate a unique CSRF token per session and embed it as a hidden field in **every** form (login, register, create/edit product, create/edit category, change password, profile update).
   - Validate the token on every POST request before processing.
   - If the token is missing or invalid, reject the request with a `403 Forbidden` response.

2. **Output Escaping**
   - Audit every view file: **all** user-generated or database-sourced output must be wrapped in `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')`.
   - Check for any place where raw output might occur (table cells, form values, page titles, error messages, image `alt` attributes, etc.).

3. **SQL Injection Prevention**
   - Verify that **every** database query uses **prepared statements** with bound parameters.
   - Search for and eliminate any string concatenation or variable interpolation inside SQL queries.
   - If using PDO, confirm `PDO::ATTR_EMULATE_PREPARES` is set to `false`.

4. **Security Headers**
   - Add the following HTTP headers to every response (in your bootstrap or layout):

   ```php
   header('X-Content-Type-Options: nosniff');
   header('X-Frame-Options: DENY');
   header('X-XSS-Protection: 1; mode=block');
   header('Referrer-Policy: strict-origin-when-cross-origin');
   header('Content-Security-Policy: default-src \'self\'; style-src \'self\' \'unsafe-inline\' https://cdn.jsdelivr.net; script-src \'self\' https://cdn.jsdelivr.net');
   ```

5. **Rate Limiting on Login**
   - Implement rate limiting on the login endpoint: **maximum 5 failed attempts per IP address within a 15-minute window**.
   - Store failed attempts in the database or in a file (`storage/ratelimit/`).
   - After 5 failures, display a message like "Too many login attempts. Please try again in X minutes." and block the login.
   - Reset the counter after a successful login.

6. **Secure File Upload Validation**
   - Validate uploaded files using **multiple methods**:
     - Check file extension against an allowlist (`.jpg`, `.jpeg`, `.png`, `.gif`).
     - Check MIME type with `finfo_file()` (not just `$_FILES['type']`).
     - Check file size (max 2 MB).
     - Verify the file is actually an image using `getimagesize()`.
   - Rename uploaded files to prevent path traversal (e.g., use `uniqid()` or `bin2hex(random_bytes(16))`).
   - Store uploads **outside** the web root if possible, or protect the uploads directory with `.htaccess` to prevent script execution.

7. **Security Checklist Document**
   - Create a `SECURITY_CHECKLIST.md` file documenting every security measure implemented, organized by category.

### Security Checklist Template (`SECURITY_CHECKLIST.md`)

```markdown
# Security Checklist — Product Management System

## 1. CSRF Protection
- [ ] Token generated per session
- [ ] Token embedded in all forms
- [ ] Token validated on all POST requests

## 2. XSS Prevention
- [ ] All output escaped with htmlspecialchars()
- [ ] List of files audited: ...

## 3. SQL Injection Prevention
- [ ] All queries use prepared statements
- [ ] PDO emulate prepares disabled
- [ ] List of models/queries verified: ...

## 4. Security Headers
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection
- [ ] Referrer-Policy
- [ ] Content-Security-Policy

## 5. Rate Limiting
- [ ] Max 5 login attempts per 15 minutes
- [ ] Lockout message displayed
- [ ] Counter resets on success

## 6. File Upload Security
- [ ] Extension allowlist
- [ ] MIME type validation with finfo
- [ ] Image verification with getimagesize()
- [ ] Randomized file names
- [ ] Upload directory protected

## 7. Authentication Security
- [ ] password_hash() with PASSWORD_DEFAULT
- [ ] session_regenerate_id() on login
- [ ] Session timeout / expiry
- [ ] Remember-me tokens hashed in DB

## 8. Additional Measures
- [ ] Error messages don't leak sensitive info
- [ ] Database credentials in config (not in code)
- [ ] display_errors = Off in production
```

## Deliverables

| File | Description |
|------|-------------|
| `app/core/Csrf.php` | CSRF token generation and validation helper class |
| `app/core/Security.php` | Security headers middleware/helper |
| `app/core/RateLimiter.php` | Login rate limiting class |
| Updated `app/core/Auth.php` | Integrated CSRF validation, rate limit check |
| Updated `app/controllers/AuthController.php` | CSRF and rate limiting on login/register |
| Updated all `app/views/**/*.php` | CSRF tokens in all forms; `htmlspecialchars()` on all output |
| Updated `app/models/**/*.php` | Verified prepared statements; PDO emulate prepares = false |
| Updated `public/index.php` or `app/core/Router.php` | Security headers sent on every response |
| Updated file upload logic | Multi-method validation, randomized names, upload protection |
| `SECURITY_CHECKLIST.md` | Complete security documentation with all measures listed |
| `README.md` | Updated setup instructions noting security features |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| CSRF Protection | 30 | CSRF tokens generated and validated on every form/POST; missing/invalid tokens rejected; covers all CRUD operations and auth forms |
| Output Escaping | 25 | `htmlspecialchars()` applied consistently to all dynamic output in all views; no raw output of user data anywhere in the application |
| Security Headers | 20 | All required headers set on every response; CSP configured to allow only necessary sources; headers verified via browser DevTools |
| Rate Limiting | 15 | Login limited to 5 attempts per 15 min per IP; lockout message with remaining time; counter resets on success; works correctly under testing |
| Documentation | 10 | `SECURITY_CHECKLIST.md` is complete, accurate, and matches the actual implementation; each item checked off corresponds to real code |

## Tips

- **Start by auditing your existing code**: open every view file and search for any `echo`, `<?=`, or `<td>` that outputs data from the database or user input without `htmlspecialchars()`.
- **CSRF implementation is straightforward**: create a token with `bin2hex(random_bytes(32))`, store it in `$_SESSION['csrf_token']`, and include `<input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">` in every form. Validate with `hash_equals()`.
- **For rate limiting**, a simple file-based approach works:

  ```php
  // storage/ratelimit/{ip_address}.json
  // Store: { "attempts": [...timestamps...], "locked_until": timestamp }
  ```

  Clean up old entries on each check to prevent disk bloat.

- **`finfo_file()`** is the correct way to check MIME types — do not trust `$_FILES['file']['type']` as it is client-supplied and easily spoofed.
- **Test your security measures**: try submitting a form without a CSRF token (should fail), try outputting `<script>alert('xss')</script>` in a product name (should display as text, not execute), try logging in 6 times rapidly (should lock out).
- **Use `hash_equals()`** for comparing CSRF tokens and remember-me tokens to prevent timing attacks.
- **`display_errors = Off`** in `php.ini` for production — errors should be logged, not shown to users.
