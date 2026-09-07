# Homework 11: Programming Techniques

> **Due:** Sunday 23:59 via LMS | **File:** `homework-11.zip` containing `contact_manager/`

## How to Submit
1. Save all files in the `contact_manager/` folder
2. Test each file in browser via `http://localhost/INS3064/contact_manager/`
3. Compress the folder into `homework-11.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Refactor your Contact Manager from Homework 10 to use **Object-Oriented Programming** and the **MVC (Model-View-Controller)** architectural pattern. This assignment reinforces OOP principles — classes, inheritance, encapsulation, and design patterns — applied to a real PHP web application. You will also implement a simple front-controller with a Router class and use `spl_autoload_register` for automatic class loading.

## Requirements

### Functional Requirements

- **All CRUD operations from Homework 10 must still work** (Create, Read, Update, Delete contacts).
- The application must be accessible through a single entry point (`index.php`) that dispatches requests via a Router.
- Views must render the same HTML output as Homework 10 (forms, tables, validation messages).

### Technical Requirements

1. **Database Class (Singleton Pattern)**
   - Create a `Database` class in `app/core/Database.php`.
   - Implement the Singleton pattern so only one PDO connection exists per request.
   - Provide a static `getInstance()` method and a `getConnection()` method.

2. **Base Model Class**
   - Create an abstract `Model` class in `app/models/Model.php`.
   - It should receive the PDO connection from `Database::getInstance()` in its constructor.
   - Provide a protected `$db` property for child models.

3. **ContactModel**
   - Create `app/models/ContactModel.php` extending `Model`.
   - Move all database queries (INSERT, SELECT, UPDATE, DELETE) into this class as methods.
   - All queries must use **prepared statements**.

4. **ContactController**
   - Create `app/controllers/ContactController.php`.
   - Implement methods: `index()`, `create()`, `store()`, `edit()`, `update()`, `delete()`.
   - Each method handles request processing, calls the model, and loads the appropriate view.

5. **Views**
   - Organize view files under `app/views/contacts/`:
     - `index.php` — list all contacts
     - `create.php` — create form
     - `edit.php` — edit form
     - `layout.php` or `header.php` / `footer.php` — shared HTML structure
   - Use `include` or `require` to compose views.

6. **Router Class**
   - Create `app/core/Router.php`.
   - Parse the URL (using `$_GET['route']` or `$_SERVER['REQUEST_URI']`) and map it to the correct controller method.
   - Support at minimum: `/`, `/create`, `/store`, `/edit?id=`, `/update`, `/delete?id=`.

7. **Autoloading**
   - Use `spl_autoload_register()` in `public/index.php` (or a `bootstrap.php`) to automatically load classes based on namespace or directory convention.
   - Map namespaces to directories (e.g., `App\Controllers\*` → `app/controllers/`).

8. **Folder Structure**

   ```
   contact_manager/
   ├── public/
   │   ├── index.php          # Single entry point (front controller)
   │   └── css/
   │       └── style.css
   ├── app/
   │   ├── core/
   │   │   ├── Database.php
   │   │   └── Router.php
   │   ├── controllers/
   │   │   └── ContactController.php
   │   ├── models/
   │   │   ├── Model.php
   │   │   └── ContactModel.php
   │   └── views/
   │       ├── layout.php
   │       └── contacts/
   │           ├── index.php
   │           ├── create.php
   │           └── edit.php
   ├── config/
   │   └── database.php
   └── README.md
   ```

## Deliverables

| File | Description |
|------|-------------|
| `public/index.php` | Front controller — entry point, autoloading, routing |
| `app/core/Database.php` | Singleton database connection class |
| `app/core/Router.php` | Simple URL-to-controller-method router |
| `app/models/Model.php` | Abstract base model with DB connection |
| `app/models/ContactModel.php` | Contact-specific database operations |
| `app/controllers/ContactController.php` | Controller handling all contact actions |
| `app/views/contacts/*.php` | View templates for each action |
| `app/views/layout.php` | Shared HTML layout (header/footer) |
| `config/database.php` | Database configuration (host, dbname, user, pass) |
| `README.md` | Setup instructions and brief architecture explanation |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| OOP Implementation | 30 | Correct use of classes, inheritance (Model hierarchy), Singleton pattern, encapsulation, visibility modifiers (public/protected/private) |
| MVC Structure | 25 | Clean separation: models handle data, controllers handle logic, views handle presentation; correct folder organization |
| Functionality Preserved | 20 | All CRUD operations work identically to Homework 10; no broken features |
| Autoloading | 15 | `spl_autoload_register()` correctly loads all classes without manual `require`/`include` for class files |
| Code Quality | 10 | Consistent naming conventions, meaningful method names, clean formatting, helpful comments, a clear README |

## Tips

- **Start with the Database singleton** — everything else depends on the connection. Test it before moving on.
- **Refactor incrementally**: first get the Model and ContactModel working with the old procedural code, then add the Controller and Router.
- **Use namespaces** (e.g., `namespace App\Core;`, `namespace App\Models;`) to make autoloading clean and avoid class name conflicts.
- **Pass data to views** by setting properties on the controller or by passing an associative array: `$this->view('contacts/index', ['contacts' => $contacts])`.
- **The Router does not need to be complex** — a simple `switch` or `match` on the route parameter is sufficient for this assignment.
- **Test each piece in isolation** before wiring everything together through the front controller.
- Refer to the session 11 lecture slides for examples of the Singleton pattern and MVC structure in PHP.
