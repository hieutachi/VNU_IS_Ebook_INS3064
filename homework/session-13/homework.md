# Homework 13: Cookies and Sessions

> **Due:** Sunday 23:59 via LMS | **File:** `homework-13.zip` containing `product_app/`

## How to Submit
1. Save all files in the `product_app/` folder
2. Test each file in browser via `http://localhost/INS3064/product_app/`
3. Compress the folder into `homework-13.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Extend your Product Management System (Homework 12) with a complete **authentication system** using cookies and sessions. Users must register and log in before accessing the application. You will implement secure password hashing, session-based authentication, a "remember me" cookie, protected routes, and user account management features.

## Requirements

### Functional Requirements

1. **User Registration**
   - Registration form with fields: username, email, password, confirm password.
   - Validate: unique username/email, password minimum 8 characters, passwords must match.
   - Hash passwords with `password_hash()` before storing in the database.
   - After successful registration, redirect to the login page with a success message.

2. **User Login**
   - Login form with username/email and password.
   - Verify credentials using `password_verify()`.
   - On success, create a session and redirect to the product dashboard.
   - On failure, display an error message and stay on the login page.

3. **Session-Based Authentication**
   - Start sessions on every page.
   - Store `user_id` and `username` in `$_SESSION` upon login.
   - Regenerate session ID on login (`session_regenerate_id(true)`) to prevent session fixation.

4. **"Remember Me" Cookie**
   - Checkbox on the login form: "Remember me".
   - When checked, set a long-lived cookie (e.g., 30 days) with a secure random token.
   - Store the token (hashed) in the `users` table alongside the user ID.
   - On subsequent visits, if no active session exists but a valid remember-me cookie is found, automatically log the user in.
   - Cookie must be set with `httponly`, `secure` (in production), and `samesite=Lax` (or `Strict`).

5. **Logout**
   - Destroy the session (`session_destroy()`).
   - Delete the remember-me cookie (and clear the token from the database).
   - Redirect to the login page.

6. **Protected Routes**
   - All product and category routes must be **protected** — if the user is not logged in (no session and no valid remember-me cookie), redirect to `/login`.
   - Login and registration pages should be accessible without authentication.

7. **User Profile Page**
   - Display current user's information (username, email, registration date).
   - Allow the user to update their email.

8. **Change Password**
   - Form with current password, new password, and confirm new password.
   - Verify the current password with `password_verify()` before updating.
   - Hash the new password with `password_hash()`.

9. **Flash Messages**
   - Display success/error messages that persist across a redirect (store in `$_SESSION`, display once, then unset).

### Technical Requirements

- Add a `users` table to the database:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Use `password_hash($password, PASSWORD_DEFAULT)` — do **not** use MD5, SHA1, or custom hashing.
- Use `password_verify($password, $hash)` to check passwords.
- Use `session_regenerate_id(true)` on login to prevent session fixation.
- Set cookies with appropriate security flags:

```php
setcookie('remember_me', $token, [
    'expires'  => time() + 86400 * 30,
    'path'     => '/',
    'domain'   => '',
    'secure'   => true,      // set to false for local HTTP testing
    'httponly'  => true,
    'samesite' => 'Lax'
]);
```

### New/Updated Folder Structure

```
product_app/
├── public/
│   ├── index.php
│   ├── css/
│   │   └── style.css
│   └── uploads/
├── app/
│   ├── core/
│   │   ├── Database.php
│   │   ├── Router.php
│   │   └── Auth.php          # NEW — authentication helper
│   ├── controllers/
│   │   ├── AuthController.php # NEW — login, register, logout
│   │   ├── UserController.php # NEW — profile, change password
│   │   ├── CategoryController.php
│   │   └── ProductController.php
│   ├── models/
│   │   ├── UserModel.php      # NEW
│   │   ├── CategoryModel.php
│   │   └── ProductModel.php
│   └── views/
│       ├── layout.php
│       ├── auth/              # NEW
│       │   ├── login.php
│       │   └── register.php
│       ├── user/              # NEW
│       │   ├── profile.php
│       │   └── change-password.php
│       ├── categories/
│       └── products/
├── config/
│   └── database.php
├── sql/
│   └── schema.sql            # Updated with users table
└── README.md
```

## Deliverables

| File | Description |
|------|-------------|
| `app/core/Auth.php` | Helper class: `login()`, `logout()`, `check()`, `user()`, `rememberMe()`, `validateRememberMe()` |
| `app/controllers/AuthController.php` | Login, register, logout actions |
| `app/controllers/UserController.php` | Profile display, email update, change password |
| `app/models/UserModel.php` | User CRUD: create, findByUsername/Email, updatePassword, updateEmail, remember token operations |
| `app/views/auth/login.php` | Login form with remember-me checkbox |
| `app/views/auth/register.php` | Registration form |
| `app/views/user/profile.php` | User profile page |
| `app/views/user/change-password.php` | Change password form |
| `sql/schema.sql` | Updated schema including `users` table |
| All Homework 12 files | Existing product/category functionality, now protected |
| `README.md` | Updated setup instructions |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| Auth Functionality | 30 | Registration works (hashed passwords stored); login verifies credentials; logout destroys session; profile and change-password work correctly |
| Security | 25 | `password_hash()`/`password_verify()` used (not MD5/SHA1); `session_regenerate_id()` on login; session hijacking prevention; prepared statements on all queries |
| Remember Me | 20 | Cookie set with `httponly`, `secure`, `samesite` flags; token stored hashed in DB; auto-login on return; token cleared on logout |
| Protected Routes | 15 | Unauthenticated users redirected to `/login`; authenticated users cannot access login/register pages; all product/category routes require login |
| User Experience | 10 | Flash messages display correctly; form validation errors shown clearly; smooth registration → login → dashboard flow |

## Tips

- **Create an `Auth` helper class** with static methods like `Auth::check()`, `Auth::user()`, `Auth::login($user)`, `Auth::logout()`. Call it from your Router or controller to protect routes.
- **Call `session_start()` early** — in your bootstrap file or at the top of `index.php`, before any output.
- **Remember-me token security**: generate a token with `bin_random(32)`, store its **hash** (`hash('sha256', $token)`) in the database, and send the raw token in the cookie. On validation, hash the cookie value and compare with the stored hash.
- **For the Router**, add a middleware concept or a simple check at the top of each protected controller:

  ```php
  if (!Auth::check()) {
      header('Location: /login');
      exit();
  }
  ```

- **Flash messages pattern**: set `$_SESSION['flash'] = ['type' => 'success', 'message' => '...']` before redirecting, then in the layout, display it and `unset($_SESSION['flash'])`.
- **Test the full flow**: register → login → use app → logout → try accessing a protected page (should redirect) → login with remember me → close browser → reopen (should stay logged in).
- **Cookie `secure` flag**: set to `false` when testing on `http://localhost`; set to `true` in production over HTTPS.
