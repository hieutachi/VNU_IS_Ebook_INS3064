# Homework 10: PHP with MySQL — Contact Manager

> **Due:** Sunday 23:59 via LMS | **Folder:** `contact_manager/`

## How to Submit
1. Save all files in the `contact_manager/` folder
2. Test each file in browser via `http://localhost/INS3064/contact_manager/`
3. Compress the folder into a `.zip` named `homework10.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Build a **Contact Manager** web application using PHP and MySQL with full CRUD (Create, Read, Update, Delete) functionality. This assignment brings together database design, SQL queries, PHP database connectivity (PDO), form handling, session management, and basic web UI into a single cohesive project.

## Requirements

### Functional Requirements

1. **Database Setup**
   - Create a MySQL database named `contact_manager`.
   - Create a `contacts` table with the following columns:

     | Column | Type | Constraints |
     |--------|------|-------------|
     | `id` | INT | PRIMARY KEY, AUTO_INCREMENT |
     | `name` | VARCHAR(100) | NOT NULL |
     | `email` | VARCHAR(150) | UNIQUE |
     | `phone` | VARCHAR(20) | |
     | `group_name` | VARCHAR(50) | DEFAULT 'General' (e.g., Family, Friends, Work, General) |
     | `notes` | TEXT | |
     | `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP |
     | `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

   - Include a `setup.sql` file with `CREATE DATABASE`, `CREATE TABLE`, and at least 5 sample `INSERT` statements.

2. **List Page** (`index.php`)
   - Display all contacts in a sortable HTML table with columns: Name, Email, Phone, Group, Created At, Actions (Edit | Delete).
   - Show the total number of contacts at the top.
   - Include a **search bar** that filters contacts by name or email (search-as-you-type is optional; a form submit is sufficient).
   - Include an "Add New Contact" button/link.
   - Highlight rows alternately (zebra striping) using CSS.

3. **Add Contact** (`add.php`)
   - Display a form to create a new contact with fields: Name (required), Email (must be valid and unique), Phone, Group (dropdown: Family, Friends, Work, Other, General), Notes (textarea).
   - Validate all inputs server-side:
     - Name cannot be empty.
     - Email must be a valid format (`filter_var` with `FILTER_VALIDATE_EMAIL`).
     - Email must be unique (check database before inserting).
   - On success: redirect to `index.php` with a **success flash message** (e.g., "Contact added successfully!").
   - On failure: redisplay the form with error messages and previously entered values (sticky form).

4. **Edit Contact** (`edit.php`)
   - Load the existing contact data by `id` from the query string.
   - Pre-fill the form with current values.
   - Same validation rules as Add.
   - On success: redirect to `index.php` with a success flash message.
   - On failure: redisplay the form with error messages.
   - If the `id` does not exist, show a "Contact not found" message and a link back.

5. **Delete Contact** (`delete.php`)
   - Accept the contact `id` via GET request.
   - Display a **confirmation page** showing the contact details and asking "Are you sure you want to delete this contact?"
   - Only perform the deletion on POST confirmation (to prevent accidental deletions via link crawling).
   - On success: redirect to `index.php` with a success flash message.

6. **Flash Messages**
   - Use `$_SESSION` to store one-time messages (success, error, warning).
   - Display flash messages at the top of the page with appropriate CSS styling (green for success, red for error).
   - Clear the flash message after displaying it once.

### Technical Requirements

7. **Database Connection** (`config.php`)
   - Use **PDO** (not `mysqli`) for all database operations.
   - Set PDO error mode to `ERRMODE_EXCEPTION`.
   - Set `ATTR_DEFAULT_FETCH_MODE` to `FETCH_ASSOC`.
   - Store connection parameters (host, dbname, user, pass) as constants.
   - Use a singleton pattern or a simple `$pdo` variable shared across files.

8. **Security**
   - Use **prepared statements** with named placeholders (`:name`) or positional placeholders (`?`) for ALL database queries. No string concatenation of user input into SQL.
   - Use `htmlspecialchars()` when outputting user data to HTML (prevent XSS).
   - Validate and sanitize all inputs before using them.
   - Use `filter_input()` where appropriate.

9. **Code Organization**
   - Separate concerns: `config.php` (connection), `index.php` (list), `add.php` (create), `edit.php` (update), `delete.php` (destroy), `style.css` (presentation).
   - Use a consistent page layout: include a common header and footer in each page (you can use `include` or inline them).
   - Meaningful variable names, consistent indentation, and file header comments.

10. **CSS Styling** (`style.css`)
    - Clean, readable design — no need for a CSS framework, but the app should look polished.
    - Style the table, forms, buttons, navigation, flash messages, and confirmation dialog.
    - Use a consistent color scheme and readable font.
    - The layout should work on both desktop and basic mobile (simple responsive design).

## Deliverables

| File | Description |
|------|-------------|
| `contact_manager/setup.sql` | SQL file to create the database, table, and sample data |
| `contact_manager/config.php` | PDO database connection configuration |
| `contact_manager/index.php` | List page with search and table display |
| `contact_manager/add.php` | Add new contact form and processing |
| `contact_manager/edit.php` | Edit existing contact form and processing |
| `contact_manager/delete.php` | Delete confirmation and processing |
| `contact_manager/style.css` | CSS stylesheet for all pages |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| CRUD Functionality | 35 | All four operations (Create, Read, Update, Delete) work correctly; list displays all contacts; forms validate properly; redirects after actions |
| Security (Prepared Statements) | 25 | ALL database queries use PDO prepared statements; no raw user input in SQL; htmlspecialchars used on output; proper input validation |
| User Experience (UX) | 20 | Flash messages for all actions; sticky forms on validation errors; confirmation before delete; clean layout; responsive design; helpful error messages |
| Search | 10 | Search by name or email works correctly; search term is preserved in the input after submission; uses prepared statements |
| Code Organization | 10 | Logical file structure; config.php separation; consistent coding style; comments; reusable header/footer; no code duplication |

## Tips

- **Start with `setup.sql` and `config.php`.** Get the database running and connected before building any pages.
- **PDO connection pattern:**
  ```php
  try {
      $pdo = new PDO("mysql:host=localhost;dbname=contact_manager;charset=utf8mb4", "root", "");
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  } catch (PDOException $e) {
      die("Database connection failed: " . $e->getMessage());
  }
  ```
- **Prepared statement pattern:**
  ```php
  $stmt = $pdo->prepare("SELECT * FROM contacts WHERE name LIKE :search OR email LIKE :search");
  $stmt->execute(['search' => '%' . $search . '%']);
  $contacts = $stmt->fetchAll();
  ```
- **Flash messages:** Set `$_SESSION['message']` and `$_SESSION['message_type']` after each action. In your header, display the message and then `unset()` both session keys.
- **Delete pattern:** `delete.php` should check `$_SERVER['REQUEST_METHOD']`. On GET, show confirmation. On POST, perform deletion.
- **Testing:** Test every edge case: empty form submission, duplicate email, editing a non-existent ID, deleting while someone else is viewing the list.
- Review Session 10 lecture slides on PDO and prepared statements before starting.
