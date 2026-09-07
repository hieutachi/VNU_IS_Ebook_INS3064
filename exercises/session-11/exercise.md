# Session 11 — In-Class Exercise: Programming Techniques

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session11_exercise.php` (and related files)

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session11\`
2. Test each file in browser via `http://localhost/INS3064/session11/`
3. Compress the folder into a `.zip` named `session11_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives

- Create and use PHP classes with properties, methods, and constructors
- Implement inheritance by extending a base class
- Define and implement interfaces and abstract classes
- Apply the MVC (Model–View–Controller) pattern to organise PHP code
- Use `require` / `include` to compose an application from separate files

---

## Exercise A: Product Model Class (Required)

### Task Description

You are building the data layer for the Campus Club Hub project. Instead of writing raw PDO queries on every page, you will create a **reusable Model class** that handles database operations, then extend it into a **ProductModel** that adds validation.

Build two classes:

| Class | File | Purpose |
|-------|------|---------|
| `Model` | `model.php` | Base class — holds the PDO connection and generic CRUD methods |
| `ProductModel` | `product_model.php` | Extends `Model` — adds product-specific validation |

### Step-by-Step Instructions

1. Create a file called `model.php` and define the `Model` class:
   - Add a `protected` property `$pdo` (the database connection).
   - Add a `protected` property `$table` (the table name, set by child classes).
   - The constructor accepts a PDO instance and stores it in `$pdo`.
   - Implement these methods:
     - `findAll()` — returns all rows from `$table` (`SELECT *`).
     - `findById(int $id)` — returns one row by primary key, or `false` if not found.
     - `create(array $data)` — inserts a new row; `$data` is an associative array `[column => value]`. Use prepared statements. Return the last insert ID.
     - `update(int $id, array $data)` — updates an existing row by ID. Return `true` on success.
     - `delete(int $id)` — deletes a row by ID. Return `true` on success.

2. Create a file called `product_model.php` and define `ProductModel extends Model`:
   - Set `$table = 'products'` in the constructor (call `parent::__construct`).
   - Add a method `validate(array $data)` that checks:
     - `name` must not be empty (trim whitespace first).
     - `price` must be a positive number.
     - `stock` must be a non-negative integer.
   - Return an array of error strings (empty array = valid).
   - Override `create()` — call `validate()` first; if there are errors, throw an `InvalidArgumentException`. Otherwise call `parent::create()`.
   - Override `update()` — same validation logic before calling `parent::update()`.

3. Create a file called `session11_exercise.php` that tests your classes:
   - Create a PDO connection to a database of your choice (you may use `test_db`).
   - Instantiate `ProductModel` and test `findAll()`, `create()`, `findById()`, `update()`, and `delete()`.
   - Catch any `InvalidArgumentException` from validation and display the errors.

### Starter Code

```php
<?php
// model.php — Base Model class

class Model
{
    protected PDO $pdo;
    protected string $table;

    public function __construct(PDO $pdo)
    {
        // TODO: Store the PDO connection
    }

    public function findAll(): array
    {
        // TODO: SELECT * FROM $this->table
        // Use PDO prepared statements even for simple queries
    }

    public function findById(int $id): array|false
    {
        // TODO: SELECT * FROM $this->table WHERE id = :id
    }

    public function create(array $data): int
    {
        // TODO: Build an INSERT query dynamically from $data keys/values
        // Use prepared statements with named placeholders
        // Return $this->pdo->lastInsertId()
    }

    public function update(int $id, array $data): bool
    {
        // TODO: Build an UPDATE query dynamically
        // Include $id as :id in the WHERE clause
    }

    public function delete(int $id): bool
    {
        // TODO: DELETE FROM $this->table WHERE id = :id
    }
}
```

```php
<?php
// product_model.php — ProductModel extends Model

require_once 'model.php';

class ProductModel extends Model
{
    public function __construct(PDO $pdo)
    {
        // TODO: Call parent constructor and set $this->table
    }

    public function validate(array $data): array
    {
        $errors = [];

        // TODO: Validate 'name' — not empty after trim
        // TODO: Validate 'price' — must be numeric and > 0
        // TODO: Validate 'stock' — must be a non-negative integer

        return $errors;
    }

    public function create(array $data): int
    {
        // TODO: Validate first, throw InvalidArgumentException if errors
        // Then call parent::create($data)
    }

    public function update(int $id, array $data): bool
    {
        // TODO: Validate first, throw InvalidArgumentException if errors
        // Then call parent::update($id, $data)
    }
}
```

### Expected Output

When you run `session11_exercise.php` in the browser, you should see output similar to:

```
=== Product Model Test ===

All products: 3 items found

Created product #4: Wireless Mouse
  Name: Wireless Mouse, Price: 25.99, Stock: 50

Updated product #4: Price changed to 22.50
  Updated data: {"name":"Wireless Mouse","price":"22.50","stock":"45"}

Deleted product #4: true

Validation test — errors:
  - Product name cannot be empty
  - Price must be a positive number
```

### Self-Check

- [ ] `Model::__construct` stores the PDO instance and child classes set `$table`
- [ ] `findAll()` and `findById()` use prepared statements
- [ ] `create()` builds the INSERT query from array keys dynamically
- [ ] `update()` builds the UPDATE query from array keys dynamically
- [ ] `ProductModel::validate()` returns an array of error strings
- [ ] `ProductModel::create()` throws `InvalidArgumentException` on validation failure
- [ ] All database queries use prepared statements (no string concatenation of values)

---

## Exercise B: MVC Mini Project (Required)

### Task Description

Reorganise the product listing into a proper **MVC structure** with separate folders for Models, Views, and Controllers, plus a simple Router that maps URLs to controller actions.

Create the following folder structure:

```
mvc_app/
├── index.php              ← Entry point (front controller + router)
├── controllers/
│   └── ProductController.php
├── models/
│   └── Product.php
├── views/
│   ├── layout.php         ← Shared HTML header/footer
│   ├── product_list.php   ← Product listing page
│   └── product_detail.php ← Single product page
└── config.php             ← Database connection
```

### Step-by-Step Instructions

1. Create the folder structure above.

2. Create `config.php`:
   - Establish a PDO connection to a database (e.g., `mvc_store`).
   - Create a `products` table if it doesn't exist and insert 3–5 sample products.

3. Create `models/Product.php`:
   - Define a `Product` class with a PDO property.
   - Methods: `getAll()` returns all products, `getById(int $id)` returns one product or `null`.

4. Create `views/layout.php`:
   - Outputs the HTML `<!DOCTYPE>`, `<head>` with a `<title>` and basic CSS, a `<nav>` bar, and opens `<body>`.
   - Accept a `$pageTitle` variable for the `<title>`.
   - Include a closing footer at the bottom.

5. Create `views/product_list.php`:
   - Receives a `$products` array.
   - Displays each product in a card layout (name, price, "View Details" link).
   - The link points to `index.php?action=detail&id=X`.

6. Create `views/product_detail.php`:
   - Receives a `$product` array (or `null`).
   - Displays the product name, price, stock, and a "Back to list" link.
   - If `$product` is `null`, show a "Product not found" message.

7. Create `controllers/ProductController.php`:
   - Define a `ProductController` class.
   - Constructor receives the PDO connection and creates a `Product` model.
   - Method `list()` — fetches all products, includes the layout and list view.
   - Method `detail(int $id)` — fetches one product, includes the layout and detail view.

8. Create `index.php` (the Router):
   - Read `$_GET['action']` (default `'list'`).
   - Based on the action, call the appropriate controller method:
     - `'list'` → `$controller->list()`
     - `'detail'` → `$controller->detail((int)$_GET['id'])`
   - If the action is unknown, show a 404 message.

### Starter Code

```php
<?php
// config.php — Database connection and setup

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=mvc_store;charset=utf8mb4',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Create table and seed data (run once)
$pdo->exec("
    CREATE TABLE IF NOT EXISTS products (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        price      DECIMAL(10,2) NOT NULL,
        stock      INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

// Seed only if table is empty
$count = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
if ($count == 0) {
    $pdo->exec("
        INSERT INTO products (name, price, stock) VALUES
        ('PHP Handbook',        29.99, 100),
        ('MySQL Guide',         34.50,  75),
        ('jQuery Quick Ref',    19.99, 200),
        ('Web Security Basics', 42.00,  30)
    ");
}
```

```php
<?php
// index.php — Front controller and router

require_once 'config.php';

// TODO: Autoload or require model and controller files
// require_once 'models/Product.php';
// require_once 'controllers/ProductController.php';

// TODO: Read the 'action' query parameter (default to 'list')
// TODO: Create a ProductController instance
// TODO: Route to the correct controller method based on $action
// TODO: Handle unknown actions with a 404 message
```

```php
<?php
// controllers/ProductController.php

class ProductController
{
    // TODO: Constructor — store PDO, create Product model
    // TODO: list() — fetch all products, include views
    // TODO: detail(int $id) — fetch one product, include views
}
```

```php
<?php
// models/Product.php

class Product
{
    // TODO: Constructor — store PDO connection
    // TODO: getAll() — return all products
    // TODO: getById(int $id) — return one product or null
}
```

### Expected Output

Visiting `index.php` in the browser should show a product listing page with cards. Clicking "View Details" on a product navigates to `index.php?action=detail&id=1` and shows that product's information.

```
[Browser: index.php]

+----------------------------+
| 🏠 MVC Store    Products  |
+----------------------------+
| +------------------------+ |
| | PHP Handbook           | |
| | $29.99 | Stock: 100   | |
| | [View Details]         | |
| +------------------------+ |
| +------------------------+ |
| | MySQL Guide            | |
| | $34.50 | Stock: 75    | |
| | [View Details]         | |
| +------------------------+ |
|         ... more ...       |
+----------------------------+
| © 2025 MVC Store           |
+----------------------------+
```

### Self-Check

- [ ] Files are organised into `controllers/`, `models/`, `views/` folders
- [ ] `index.php` reads `$_GET['action']` and routes to the correct controller method
- [ ] `ProductController::list()` includes the layout and list view
- [ ] `ProductController::detail(int $id)` includes the layout and detail view
- [ ] Clicking "View Details" navigates to `?action=detail&id=X` and shows one product
- [ ] Unknown actions display a "404 — Page not found" message
- [ ] No HTML is echoed directly from the controller or model (all HTML is in `views/`)

---

## Exercise C: Interface & Abstract Class (Challenge/Bonus)

### Task Description

Refine your MVC app from Exercise B by introducing an **interface** and an **abstract class** to enforce a contract that all views must follow.

### Step-by-Step Instructions

1. Create an interface called `Renderable` in `interfaces/Renderable.php`:
   - Define one method: `public function render(array $data): string;`
   - This method must return the HTML content as a string (not echo it directly).

2. Create an **abstract class** `BaseView` in `views/BaseView.php` that implements `Renderable`:
   - Add a `protected` method `escape(string $value): string` that wraps `htmlspecialchars()` with `ENT_QUOTES` and `UTF-8`.
   - Add a `protected` method `renderLayout(string $title, string $content): string` that returns the full HTML page (header, nav, `$content`, footer).

3. Create `ProductListView extends BaseView` in `views/ProductListView.php`:
   - Implement `render(array $data): string` — receives `$data['products']` and returns an HTML string of product cards.
   - Use `$this->escape()` on all product data.

4. Create `ProductDetailView extends BaseView` in `views/ProductDetailView.php`:
   - Implement `render(array $data): string` — receives `$data['product']` and returns the detail HTML.
   - If the product is `null`, return a "not found" message.

5. Create `ErrorView extends BaseView` in `views/ErrorView.php`:
   - Implement `render(array $data): string` — receives `$data['message']` and `$data['code']` (HTTP status code).
   - Returns an error page displaying the code and message.

6. Update your `ProductController` to use the view classes instead of `include`:
   - `$view = new ProductListView();`
   - `echo $view->render(['products' => $products]);`

### Starter Code

```php
<?php
// interfaces/Renderable.php

interface Renderable
{
    /**
     * Render the view and return HTML as a string.
     *
     * @param array $data  Data to display
     * @return string      The rendered HTML
     */
    public function render(array $data): string;
}
```

```php
<?php
// views/BaseView.php

// TODO: Create an abstract class BaseView that implements Renderable
// TODO: Add escape() method
// TODO: Add renderLayout() method
```

```php
<?php
// views/ProductListView.php

// TODO: ProductListView extends BaseView
// TODO: Implement render(array $data): string
// TODO: Use $this->escape() on all product output
```

```php
<?php
// views/ProductDetailView.php

// TODO: ProductDetailView extends BaseView
// TODO: Implement render(array $data): string
// TODO: Handle null product case
```

```php
<?php
// views/ErrorView.php

// TODO: ErrorView extends BaseView
// TODO: Implement render(array $data): string
// TODO: Display error code and message
```

### Expected Output

The application should work exactly as in Exercise B, but now:

1. The `ProductController` creates view objects and calls `render()` instead of using `include`.
2. All output is escaped through `BaseView::escape()`.
3. Typing `index.php?action=unknown` uses `ErrorView` to display a styled 404 page.

```
[Controller code now looks like:]
=================================
public function list(): void
{
    $products = $this->model->getAll();
    $view = new ProductListView();
    echo $view->render(['products' => $products]);
}

public function detail(int $id): void
{
    $product = $this->model->getById($id);
    $view = new ProductDetailView();
    echo $view->render(['product' => $product]);
}
```

### Self-Check

- [ ] `Renderable` interface defines `render(array $data): string`
- [ ] `BaseView` is abstract and implements `Renderable`
- [ ] `BaseView::escape()` correctly wraps `htmlspecialchars()`
- [ ] `ProductListView`, `ProductDetailView`, and `ErrorView` all extend `BaseView`
- [ ] All views return HTML strings (not echo directly)
- [ ] Controller uses view objects: `$view->render([...])` instead of `include`
- [ ] Visiting an invalid action displays the `ErrorView` 404 page

---

## Submission Checklist

- [ ] Exercise A: `model.php` and `product_model.php` with working CRUD methods and validation
- [ ] Exercise A: `session11_exercise.php` runs and tests all Model methods
- [ ] Exercise B: MVC folder structure with `config.php`, `Product.php`, `ProductController.php`, and 3 view files
- [ ] Exercise B: Router in `index.php` handles `list` and `detail` actions
- [ ] Exercise C (Bonus): `Renderable` interface and `BaseView` abstract class implemented
- [ ] Exercise C (Bonus): All view classes extend `BaseView` and implement `render()`
- [ ] All PHP files have no syntax errors
- [ ] Files uploaded to LMS as a ZIP folder

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and MVC works | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if OOP classes work, MVC structure is correct, CRUD methods function
- Deduct 2 pts if file does not run (syntax errors, class not found)
- Deduct 1 pt if MVC is incomplete or missing key methods
