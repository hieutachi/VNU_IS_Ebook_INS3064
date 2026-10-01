# Homework 13: Cookies and Sessions

> **Due:** Sunday 23:59 via LMS | **File:** `homework-13.zip` containing `product_app/`

## How to Submit

Submit **two things** on LMS before the deadline (Sunday 23:59):

**Part 1 — Code ZIP**
1. Save all files in the `product_app/` folder
2. Test each file in browser via `http://localhost/INS3064/product_app/`
3. Compress the folder into `homework-13.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

**Part 2 — Video presentation link (OBS → YouTube)**

Record a short screen+voice video, upload it to **your own YouTube channel as Unlisted**, add it to your semester playlist, and paste the link on LMS. Do **not** upload the video file to LMS.

1. **Record with OBS (1–2 minutes).** Open OBS Studio → add a **Display Capture** (or Window Capture) source → start recording. Walk through your finished homework **live on screen** and **speak out loud** — no camera needed, screen + microphone is enough. Follow the **Video Checklist — What to Show** section at the bottom of this sheet so the lecturer can confirm the work is done and is yours.
2. **Upload to YouTube as Unlisted.** In YouTube Studio, upload the recording and set visibility to **Unlisted** (not Public, not Private). Unlisted means only people with the link can watch — it does not appear in search or on your channel page, but the lecturer can open it. (Private links will not work for grading.)
3. **Add it to your homework playlist.** Create one playlist for the whole semester named `INS3064 — Homework — <Your Full Name>` and add this week's video to it (in YouTube Studio: SAVE → + Create new playlist, visibility Unlisted). The playlist collects every week's demo in one place; you create and own it — there is no shared class playlist.
4. **Paste the link on LMS.** Copy the **video URL** (or the playlist URL) and paste it into the **"Video Link" field** on LMS (next to the ZIP upload).

> ✅ **Checklist before submitting:** video is 1–2 minutes · your voice narrates the auth flow (not just silent screen capture) · the redirect-to-login is shown live on screen · visibility is **Unlisted** · video is in your `INS3064 — Homework — <Your Name>` playlist · the YouTube link opens and plays in an incognito/private browser window (test this yourself!).

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

## Video Checklist — What to Show

In your 1–2 minute OBS recording, demonstrate **all** of the following on screen while narrating out loud:

- Registering a new account live, with the success feedback on screen.
- Logging out, then logging back in with the new account.
- While logged out, opening a protected URL directly and showing the redirect to the login page.
- Where `session_regenerate_id()` runs in your code and how the remember-me cookie is set and checked.
- A quick scroll through the main code file(s) in your editor so the grader sees the code is yours.
