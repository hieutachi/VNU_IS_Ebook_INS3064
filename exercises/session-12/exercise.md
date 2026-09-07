# Session 12 — In-Class Exercise: Web Application Development

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session12_exercise.php` (and related files)

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session12\`
2. Test each file in browser via `http://localhost/INS3064/session12/`
3. Compress the folder into a `.zip` named `session12_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives

- Build a complete CRUD (Create, Read, Update, Delete) web application with PHP and MySQL
- Implement form handling with server-side validation and sticky forms
- Use the POST-redirect-GET pattern to prevent duplicate submissions
- Handle file uploads with MIME type validation and safe filename generation
- Create a data-driven dashboard with aggregate SQL queries

---

## Exercise A: Complete CRUD — Product Manager (Required)

### Task Description

Build a **product management application** with full CRUD functionality. Users can list products, add new products, edit existing products, and delete products. The app uses a category dropdown populated from a separate table and displays success/error flash messages.

Create the following files:

```
product_manager/
├── index.php        ← Product list (Read)
├── create.php       ← Add product form (Create)
├── edit.php         ← Edit product form (Update)
├── delete.php       ← Delete handler (Delete)
├── config.php       ← DB connection + table setup
└── style.css        ← Basic styling
```

### Step-by-Step Instructions

1. Create `config.php`:
   - Connect to MySQL with PDO (error mode: exception, fetch mode: assoc).
   - Create `categories` and `products` tables if they don't exist.
   - Seed 4 categories and 5 sample products.

2. Create `index.php`:
   - Query all products with their category name using a `JOIN`.
   - Display products in an HTML table with columns: ID, Name, Category, Price, Stock, Actions (Edit | Delete).
   - Show a total product count at the top.
   - Show a flash message if one exists in the session.
   - Include an "Add New Product" button linking to `create.php`.

3. Create `create.php`:
   - Display a form with fields: Name, Category (dropdown from DB), Price, Stock, Description (textarea).
   - On GET: show the empty form.
   - On POST: validate inputs — Name not empty, Price > 0, Stock >= 0, Category must exist.
   - On success: insert into DB, set a session flash message, redirect to `index.php` (POST-redirect-GET).
   - On failure: redisplay the form with errors and sticky values.

4. Create `edit.php`:
   - Accept `id` from `$_GET`. If missing or invalid, redirect to `index.php`.
   - Load the product from the DB. If not found, show an error and a link back.
   - On GET: pre-fill the form with current values.
   - On POST: validate and update. Redirect to `index.php` on success.

5. Create `delete.php`:
   - Accept `id` from `$_GET`.
   - On GET: show a confirmation page with the product name and a "Confirm Delete" button inside a form.
   - On POST: delete the product, set a flash message, redirect to `index.php`.

6. Create `style.css`: style the table, forms, buttons, and flash messages (green for success, red for error).

### Starter Code

```php
<?php
// config.php — Database connection and table setup

session_start();

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=product_manager;charset=utf8mb4',
        'root', '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Create tables
$pdo->exec("
    CREATE TABLE IF NOT EXISTS categories (
        id   INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

$pdo->exec("
    CREATE TABLE IF NOT EXISTS products (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        name        VARCHAR(100) NOT NULL,
        price       DECIMAL(10,2) NOT NULL,
        stock       INT DEFAULT 0,
        description TEXT,
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

// Seed categories (ignore duplicates)
$pdo->exec("
    INSERT IGNORE INTO categories (id, name) VALUES
    (1, 'Books'), (2, 'Electronics'), (3, 'Clothing'), (4, 'Accessories')
");

// Seed products (only if table is empty)
if ($pdo->query("SELECT COUNT(*) FROM products")->fetchColumn() == 0) {
    $pdo->exec("
        INSERT INTO products (category_id, name, price, stock, description) VALUES
        (1, 'PHP Handbook',        29.99, 100, 'A comprehensive guide to PHP 8'),
        (1, 'MySQL Guide',         34.50,  75, 'Learn MySQL from scratch'),
        (2, 'Wireless Mouse',      22.00, 200, 'Ergonomic wireless mouse'),
        (2, 'USB-C Hub',           45.99,  50, '7-in-1 USB-C hub'),
        (3, 'Developer T-Shirt',   19.99, 150, '100% cotton, says &quot;It works on my machine&quot;')
    ");
}

/**
 * Set a flash message to display on the next page load.
 */
function setFlash(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

/**
 * Get and clear the flash message.
 */
function getFlash(): ?array
{
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
```

```php
<?php
// index.php — Product list page
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Manager</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>📦 Product Manager</h1>

    <?php
    // TODO: Display flash message if it exists (use getFlash())

    // TODO: Query all products with category name (JOIN products with categories)
    // $products = ...

    // TODO: Show total product count
    echo '<p>Total products: ???</p>';
    ?>

    <a href="create.php" class="btn btn-primary">+ Add New Product</a>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php // TODO: Loop through $products and display each row ?>
            <tr>
                <td colspan="6">No products yet. Add one!</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

```php
<?php
// create.php — Add new product form
require_once 'config.php';

$errors = [];
$old = ['name' => '', 'category_id' => '', 'price' => '', 'stock' => '', 'description' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: Read form values into $old
    // TODO: Validate — name not empty, price > 0, stock >= 0, category_id exists
    // TODO: If valid, INSERT into products, setFlash('success', ...), redirect to index.php
    // TODO: If invalid, populate $errors array
}

// TODO: Fetch categories for the dropdown
// $categories = $pdo->query("SELECT * FROM categories ORDER BY name")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Product</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>➕ Add New Product</h1>
    <a href="index.php">← Back to list</a>

    <?php // TODO: Display errors if any ?>

    <form method="POST" action="create.php">
        <!-- TODO: Name, Category dropdown, Price, Stock, Description fields -->
        <!-- Use $old values to make the form sticky -->
        <button type="submit">Save Product</button>
    </form>
</body>
</html>
```

```php
<?php
// edit.php — Edit product form
require_once 'config.php';

// TODO: Get product id from $_GET['id'] — redirect to index.php if missing
// TODO: Load product from DB — redirect if not found

$errors = [];
// TODO: On GET, set $old from the loaded product
// TODO: On POST, validate and update; redirect on success
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Product</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>✏️ Edit Product</h1>
    <a href="index.php">← Back to list</a>

    <!-- TODO: Same form as create.php, but pre-filled with current values -->
</body>
</html>
```

```php
<?php
// delete.php — Delete product
require_once 'config.php';

// TODO: Get product id from $_GET['id'] — redirect if missing
// TODO: Load product — redirect if not found

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: Delete the product, setFlash, redirect to index.php
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Delete Product</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>🗑️ Delete Product</h1>
    <!-- TODO: Show product name and a confirmation form -->
    <!-- Form method="POST", hidden input with product id -->
</body>
</html>
```

### Expected Output

**index.php** shows a styled table of products with Edit/Delete actions and a flash message after adding a product:

```
📦 Product Manager
+------------------------------------------+
| Total products: 5                        |
|                                          |
| [✅ Product "USB Keyboard" added!]       |
|                                          |
| +------+------------------+------------+-------+-------+----------+
| | ID   | Name             | Category   | Price | Stock | Actions  |
| +------+------------------+------------+-------+-------+----------+
| | 1    | PHP Handbook     | Books      | 29.99 | 100  | Edit Del |
| | 2    | MySQL Guide      | Books      | 34.50 |  75  | Edit Del |
| | 3    | Wireless Mouse   | Electronics| 22.00 | 200  | Edit Del |
| +------+------------------+------------+-------+-------+----------+
|                                          |
| [+ Add New Product]                      |
+------------------------------------------+
```

### Self-Check

- [ ] `index.php` displays all products with their category name (JOIN query)
- [ ] `create.php` validates all fields and shows errors on failure (sticky form)
- [ ] Successful create redirects to `index.php` with a flash message (POST-redirect-GET)
- [ ] `edit.php` pre-fills the form with current product data
- [ ] `delete.php` shows a confirmation page on GET and deletes on POST
- [ ] Category dropdown in the form is populated from the `categories` table
- [ ] All queries use prepared statements (no raw user input in SQL)

---

## Exercise B: Image Upload (Required)

### Task Description

Extend the Product Manager from Exercise A by adding **image upload** functionality. Each product can have an image that is validated for MIME type, limited in file size, and stored with a safe filename.

### Step-by-Step Instructions

1. Alter the `products` table to add an `image` column:
   ```sql
   ALTER TABLE products ADD COLUMN image VARCHAR(255) DEFAULT NULL;
   ```

2. Create an `uploads/` directory in the `product_manager/` folder. Make sure it is writable.

3. Modify `create.php`:
   - Add `enctype="multipart/form-data"` to the `<form>` tag.
   - Add a file input: `<input type="file" name="image" accept="image/*">`.
   - On form submission, validate the uploaded file:
     - Check that the file was actually uploaded (`UPLOAD_ERR_OK`).
     - Limit file size to **2 MB** (`2 * 1024 * 1024` bytes).
     - Validate MIME type using `finfo_file()` — allow only `image/jpeg`, `image/png`, `image/gif`, `image/webp`.
     - Generate a **safe filename** using `bin2hex(random_bytes(16))` plus the correct extension.
   - Move the file to `uploads/` using `move_uploaded_file()`.
   - Store the filename in the `products.image` column.

4. Modify `edit.php`:
   - Show the current image (if any) with a small preview.
   - Allow the user to upload a new image (replace the old one).
   - If no new file is uploaded, keep the existing image.

5. Modify `index.php`:
   - Show a small thumbnail next to each product name (or a placeholder if no image).

### Starter Code

```php
<?php
// Add to create.php — inside the POST handling block

function validateUpload(array $file): array
{
    $errors = [];
    $maxSize = 2 * 1024 * 1024; // 2 MB
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // TODO: Check $file['error'] === UPLOAD_ERR_OK
    // TODO: Check file size <= $maxSize
    // TODO: Use finfo_file() to check MIME type is in $allowedTypes

    return $errors;
}

function generateSafeFilename(array $file): string
{
    // TODO: Generate random hex string
    // $name = bin2hex(random_bytes(16));

    // TODO: Get the correct extension from MIME type
    // Use the mime2ext mapping: image/jpeg → .jpg, image/png → .png, etc.

    // TODO: Return the full filename, e.g., 'a1b2c3d4...f0.jpg'
}

// Inside POST handler:
if (!empty($_FILES['image']['name'])) {
    $uploadErrors = validateUpload($_FILES['image']);
    if (!empty($uploadErrors)) {
        $errors = array_merge($errors, $uploadErrors);
    } else {
        $filename = generateSafeFilename($_FILES['image']);
        $destination = __DIR__ . '/uploads/' . $filename;
        // TODO: move_uploaded_file($_FILES['image']['tmp_name'], $destination)
    }
}
```

### Expected Output

The add/edit form now shows a file input. When a product is created with an image, the list page shows a small thumbnail:

```
📦 Product Manager
+-------------------------------------------------------+
| +------+---+------------------+---------+-------+-----+
| | ID   |   | Name             | Category| Price | ... |
| +------+---+------------------+---------+-------+-----+
| | 1    |🖼️| PHP Handbook     | Books   | 29.99 | ... |
| | 2    |  | MySQL Guide      | Books   | 34.50 | ... |
| | 3    |🖼️| Wireless Mouse   | Electron| 22.00 | ... |
| +------+---+------------------+---------+-------+-----+
```

Validation messages when uploading an invalid file:
```
❌ File size exceeds 2 MB limit
❌ Only JPEG, PNG, GIF, and WebP images are allowed
```

### Self-Check

- [ ] Form has `enctype="multipart/form-data"`
- [ ] `finfo_file()` is used to check the real MIME type (not `$_FILES['type']`)
- [ ] File size is limited to 2 MB
- [ ] Filenames are random hex strings (not the original user filename)
- [ ] `move_uploaded_file()` is used (not `copy()`)
- [ ] Old images are deleted from `uploads/` when replaced (edit.php)
- [ ] Product list shows thumbnails for products that have images

---

## Exercise C: Dashboard Stats (Challenge/Bonus)

### Task Description

Create a **dashboard page** that displays aggregate statistics about the product inventory using SQL aggregate functions.

### Step-by-Step Instructions

1. Create `dashboard.php` in the `product_manager/` folder.

2. Write SQL queries to calculate:
   - **Total products**: `COUNT(*)` from products.
   - **Total inventory value**: `SUM(price * stock)` from products.
   - **Average product price**: `AVG(price)` from products.
   - **Products per category**: `GROUP BY category` with counts.
   - **Low stock items**: Products where `stock < 10`.
   - **Most expensive product**: `MAX(price)` with the product name.

3. Display the stats on the dashboard page:
   - A summary row at the top with 4 stat cards (total products, total value, avg price, low stock count).
   - A "Products per Category" table or bar.
   - A "Low Stock Alert" table listing products with stock < 10.
   - A "Most Expensive Product" highlight card.

4. Add a link to the dashboard from the `index.php` navigation.

### Starter Code

```php
<?php
// dashboard.php
require_once 'config.php';

// TODO: Total products
// $totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();

// TODO: Total inventory value
// $totalValue = $pdo->query("SELECT COALESCE(SUM(price * stock), 0) FROM products")->fetchColumn();

// TODO: Average price
// $avgPrice = $pdo->query("SELECT COALESCE(AVG(price), 0) FROM products")->fetchColumn();

// TODO: Products per category
// $categoryStats = $pdo->query("
//     SELECT c.name, COUNT(p.id) AS product_count, COALESCE(SUM(p.price * p.stock), 0) AS category_value
//     FROM categories c
//     LEFT JOIN products p ON c.id = p.category_id
//     GROUP BY c.id, c.name
//     ORDER BY product_count DESC
// ")->fetchAll();

// TODO: Low stock items (stock < 10)
// $lowStock = $pdo->query("...")->fetchAll();

// TODO: Most expensive product
// $mostExpensive = $pdo->query("...")->fetch();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        .stat-card .number { font-size: 2em; font-weight: bold; color: #0d6efd; }
        .stat-card .label  { color: #6c757d; margin-top: 5px; }
        .low-stock { background-color: #fff3cd; border-color: #ffc107; }
        .low-stock .number { color: #dc3545; }
    </style>
</head>
<body>
    <h1>📊 Inventory Dashboard</h1>
    <a href="index.php">← Back to Products</a>

    <div class="stats-grid">
        <!-- TODO: 4 stat cards — Total Products, Total Value, Avg Price, Low Stock Count -->
    </div>

    <h2>Products per Category</h2>
    <!-- TODO: Table with Category, Count, Total Value columns -->

    <h2>⚠️ Low Stock Alert</h2>
    <!-- TODO: Table listing products with stock < 10 -->

    <h2>💰 Most Expensive Product</h2>
    <!-- TODO: Display the product name and price -->
</body>
</html>
```

### Expected Output

```
📊 Inventory Dashboard
[← Back to Products]

+------------+------------+------------+-------------+
| 📦 Total   | 💰 Total   | 📈 Average | ⚠️ Low Stock|
| Products   | Value      | Price      | Items       |
|     5      | $15,447.00 |   $29.40   |      0      |
+------------+------------+------------+-------------+

Products per Category
+----------------+---------+-------------+
| Category       | Count   | Total Value  |
+----------------+---------+-------------+
| Electronics    |    2    |  $6,699.00   |
| Books          |    2    |  $5,598.00   |
| Clothing       |    1    |  $2,998.50   |
| Accessories    |    0    |      $0.00   |
+----------------+---------+-------------+

⚠️ Low Stock Alert
+------------------+--------+-------+
| Product          | Stock  | Price |
+------------------+--------+-------+
| (none — all OK)  |        |       |
+------------------+--------+-------+

💰 Most Expensive Product
  USB-C Hub — $45.99
```

### Self-Check

- [ ] Dashboard displays total product count using `COUNT(*)`
- [ ] Total inventory value uses `SUM(price * stock)`
- [ ] Average price uses `AVG(price)` formatted to 2 decimal places
- [ ] Products per category uses `GROUP BY` with `LEFT JOIN`
- [ ] Low stock query filters with `WHERE stock < 10`
- [ ] Most expensive product query uses `ORDER BY price DESC LIMIT 1` or `MAX()`
- [ ] All values are formatted with `number_format()` for display

---

## Submission Checklist

- [ ] Exercise A: All CRUD operations working (create, list, edit, delete)
- [ ] Exercise A: Flash messages display on successful actions
- [ ] Exercise A: POST-redirect-GET pattern used after successful create/edit/delete
- [ ] Exercise A: Category dropdown populated from database
- [ ] Exercise B: Image upload with `finfo_file()` MIME validation
- [ ] Exercise B: 2 MB size limit enforced
- [ ] Exercise B: Random hex filename generated for uploaded images
- [ ] Exercise B: Thumbnails display in product list
- [ ] Exercise C (Bonus): Dashboard page with all aggregate statistics
- [ ] Exercise C (Bonus): Low stock and most expensive product displayed
- [ ] All queries use prepared statements
- [ ] Files uploaded to LMS as a ZIP folder

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and CRUD works | 4 | ☐ |
| **Exercise B** submitted and file upload works | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if CRUD operations work, file upload validates correctly, PRG pattern used
- Deduct 2 pts if file does not run or CRUD is broken
- Deduct 1 pt if upload validation is missing or flash messages don't work
