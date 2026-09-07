# Session 10 — In-Class Exercise: PHP with MySQL

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session10_exercise.php`

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session10\`
2. Test each file in browser via `http://localhost/INS3064/session10/`
3. Compress the folder into a `.zip` named `session10_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives
- Connect to MySQL using PDO with proper error handling
- Use prepared statements to prevent SQL injection
- Implement full CRUD operations (Create, Read, Update, Delete) on a products table
- Add pagination and search functionality to a product listing

---

## Setup

Run this SQL script in MySQL before starting the exercises. It creates the `store_db` database and a `products` table with sample data.

```sql
-- Session 10 — Setup: store_db

DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE store_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, stock, category) VALUES
('Laptop Pro 15',      '15-inch laptop with 16GB RAM',     1299.99, 10, 'Electronics'),
('Wireless Mouse',      'Ergonomic Bluetooth mouse',         29.99, 150, 'Electronics'),
('USB-C Hub',           '7-in-1 USB-C adapter',              45.00,  80, 'Electronics'),
('PHP & MySQL Book',    'Learning PHP, MySQL & JavaScript',  39.99,  50, 'Books'),
('JavaScript Guide',    'Modern JavaScript from the start',  34.99,  45, 'Books'),
('SQL Cookbook',         'Query solutions and techniques',    49.99,  30, 'Books'),
('Standing Desk',       'Electric height-adjustable desk',  399.99,  15, 'Furniture'),
('Office Chair',        'Ergonomic mesh back chair',        249.99,  25, 'Furniture'),
('Monitor 27"',         '4K IPS display',                   349.99,  20, 'Electronics'),
('Keyboard Mechanical', 'Cherry MX Blue switches',           79.99,  60, 'Electronics'),
('Notebook A5',         'Dotted journal notebook',            9.99, 200, 'Stationery'),
('Pen Set',             'Premium ballpoint pens (12-pack)',  14.99, 120, 'Stationery'),
('Desk Lamp',           'LED desk lamp with dimmer',          35.00,  40, 'Furniture'),
('Webcam HD',           '1080p USB webcam',                   59.99,  35, 'Electronics'),
('Backpack',            'Laptop backpack 15.6"',              45.00,  70, 'Accessories');
```

**Database connection settings** (use throughout):

```php
$host = 'localhost';
$dbname = 'store_db';
$username = 'root';
$password = '';  // Update if your MySQL has a password
```

---

## Exercise A: Connect & Read (Required)

### Task Description

Establish a PDO connection to the `store_db` database, fetch all products, and display them in a styled HTML table. This exercise focuses on the fundamentals: PDO connection, `try-catch` for connection errors, `query()` or `prepare()->execute()`, and `fetchAll()`.

### Step-by-Step Instructions

1. Create a PDO connection inside a `try-catch` block.
2. Set `PDO::ATTR_ERRMODE` to `PDO::ERRMODE_EXCEPTION`.
3. Set `PDO::ATTR_DEFAULT_FETCH_MODE` to `PDO::FETCH_ASSOC`.
4. Query all products ordered by `name` ascending.
5. Display results in an HTML table with columns: ID, Name, Price, Stock, Category.
6. Format prices with `number_format($price, 2)`.
7. Show "No products found" if the result set is empty.

### Starter Code

```php
<?php
// Session 10 — Exercise A: Connect & Read

$host     = 'localhost';
$dbname   = 'store_db';
$username = 'root';
$password = '';

$products = [];
$dbError  = '';

try {
    // TODO: Create PDO connection
    // $pdo = new PDO(
    //     "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    //     $username,
    //     $password,
    //     [
    //         PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    //         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    //     ]
    // );

    // TODO: Prepare and execute query to fetch all products ordered by name
    // $stmt = $pdo->prepare("SELECT * FROM products ORDER BY name ASC");
    // $stmt->execute();
    // $products = $stmt->fetchAll();

} catch (PDOException $e) {
    // TODO: Store a user-friendly error message
    // In production, log $e->getMessage() but don't show it to users
    $dbError = "Database connection failed. Please try again later.";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 10 — Product List</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #4a90d9; color: white; }
        tr:nth-child(even) { background-color: #f8f9fa; }
        tr:hover { background-color: #e8f0fe; }
        .price { text-align: right; }
        .stock { text-align: center; }
        .error { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 4px; }
        .count { color: #666; font-size: 0.9em; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>📦 Product Catalog</h1>

    <?php if ($dbError): ?>
        <div class="error">❌ <?= htmlspecialchars($dbError) ?></div>
    <?php else: ?>
        <p class="count"><?= count($products) ?> product(s) found</p>
        <?php if (empty($products)): ?>
            <p>No products found.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $product): ?>
                        <tr>
                            <td><?= $product['id'] ?></td>
                            <td><?= htmlspecialchars($product['name']) ?></td>
                            <td class="price">$<?= number_format($product['price'], 2) ?></td>
                            <td class="stock"><?= $product['stock'] ?></td>
                            <td><?= htmlspecialchars($product['category']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    <?php endif; ?>
</body>
</html>
```

### Expected Output

A styled HTML table showing all 15 products sorted by name:

```
📦 Product Catalog
15 product(s) found

| ID | Name                 |   Price | Stock | Category    |
|----|----------------------|---------|-------|-------------|
|  4 | PHP & MySQL Book     | $ 39.99 |    50 | Books       |
|  3 | USB-C Hub            | $ 45.00 |    80 | Electronics |
| ...| ...                  |   ...   |   ... | ...         |
```

### Self-Check

- [ ] PDO connection is inside `try-catch`
- [ ] `ERRMODE_EXCEPTION` is set
- [ ] `FETCH_ASSOC` is used
- [ ] Products are sorted by name
- [ ] Prices are formatted with 2 decimal places
- [ ] HTML output is escaped with `htmlspecialchars()`
- [ ] Database error shows a friendly message (not the raw PDO error)

---

## Exercise B: Full CRUD (Required)

### Task Description

Build a complete CRUD application for the `products` table in a **single file** (`session10_exercise.php`). The page routes between different actions using a `$_GET['action']` parameter. **All database queries must use prepared statements.**

### Step-by-Step Instructions

**Routing logic (at the top of the file):**

```
?action=list     → Show all products (default)
?action=add      → Show add form (GET) / Process add (POST)
?action=edit     → Show edit form (GET) / Process update (POST)
?action=delete   → Process delete (POST only)
```

**Step 1 — List (Read)**
- Fetch all products from the database.
- Display in an HTML table.
- Add "Edit" and "Delete" links/buttons per row.

**Step 2 — Add (Create)**
- Show a form with fields: `name`, `description`, `price`, `stock`, `category`.
- On POST, validate inputs, then insert using a **prepared statement** with named placeholders.
- Redirect back to the list after successful insert.

**Step 3 — Edit (Update)**
- Pre-fill the form with the existing product data (fetch by `id` using a prepared statement).
- On POST, validate inputs, then update using a **prepared statement**.
- Redirect back to the list after successful update.

**Step 4 — Delete**
- Accept only POST requests (not GET — this prevents accidental deletes from link crawlers).
- Delete by `id` using a **prepared statement**.
- Redirect back to the list after successful delete.

### Starter Code

```php
<?php
// Session 10 — Exercise B: Full CRUD

$host     = 'localhost';
$dbname   = 'store_db';
$username = 'root';
$password = '';

// Database connection
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die("Database connection failed.");
}

$action  = $_GET['action']  ?? 'list';
$message = $_SESSION['message'] ?? '';
unset($_SESSION['message']);

// ============================================
// ROUTING: Process POST actions first
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // --- ADD Product ---
    if ($action === 'add') {
        // TODO: Validate inputs
        // $name = trim($_POST['name'] ?? '');
        // $description = trim($_POST['description'] ?? '');
        // $price = floatval($_POST['price'] ?? 0);
        // $stock = intval($_POST['stock'] ?? 0);
        // $category = trim($_POST['category'] ?? '');

        // TODO: Validate: name not empty, price > 0

        // TODO: INSERT using prepared statement
        // $stmt = $pdo->prepare(
        //     "INSERT INTO products (name, description, price, stock, category)
        //      VALUES (:name, :desc, :price, :stock, :cat)"
        // );
        // $stmt->execute([
        //     ':name'  => $name,
        //     ':desc'  => $description,
        //     ':price' => $price,
        //     ':stock' => $stock,
        //     ':cat'   => $category,
        // ]);

        // TODO: Redirect to list
        // header('Location: session10_exercise.php?action=list');
        // exit;
    }

    // --- EDIT Product ---
    if ($action === 'edit') {
        // TODO: Get product ID from $_POST['id']
        // TODO: Validate inputs (same as add)
        // TODO: UPDATE using prepared statement
        // TODO: Redirect to list
    }

    // --- DELETE Product ---
    if ($action === 'delete') {
        // TODO: Get product ID from $_POST['id']
        // TODO: DELETE using prepared statement
        // TODO: Redirect to list
    }
}

// ============================================
// ROUTING: Render page based on action
// ============================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 10 — Product CRUD</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #4a90d9; color: white; }
        tr:nth-child(even) { background: #f8f9fa; }
        .btn { padding: 5px 12px; border: none; border-radius: 3px; cursor: pointer; text-decoration: none; font-size: 0.9em; }
        .btn-primary { background: #4a90d9; color: white; }
        .btn-danger  { background: #dc3545; color: white; }
        .btn-success { background: #28a745; color: white; }
        .btn-secondary { background: #6c757d; color: white; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input, textarea, select { width: 100%; padding: 8px; box-sizing: border-box; }
        textarea { height: 80px; }
        .alert-success { background: #d4edda; border: 1px solid #28a745; padding: 10px; border-radius: 4px; }
        .alert-error   { background: #f8d7da; border: 1px solid #dc3545; padding: 10px; border-radius: 4px; }
        .actions form { display: inline; }
        .price { text-align: right; }
    </style>
</head>
<body>

<?php if ($action === 'list'): ?>
    <!-- ============ LIST VIEW ============ -->
    <h1>📦 Product Management</h1>
    <a href="?action=add" class="btn btn-success">+ Add New Product</a>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // TODO: Fetch all products
            // $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
            // $products = $stmt->fetchAll();
            // foreach ($products as $p):
            ?>
            <!-- TODO: Output each product row with Edit link and Delete form -->
            <tr>
                <!-- <td><?= $p['id'] ?></td> -->
                <!-- <td><?= htmlspecialchars($p['name']) ?></td> -->
                <!-- <td class="price">$<?= number_format($p['price'], 2) ?></td> -->
                <!-- <td><?= $p['stock'] ?></td> -->
                <!-- <td><?= htmlspecialchars($p['category']) ?></td> -->
                <!-- <td class="actions"> -->
                    <!-- Edit link: <a href="?action=edit&id=<?= $p['id'] ?>" class="btn btn-primary">Edit</a> -->
                    <!-- Delete form (POST): -->
                    <!-- <form method="POST" action="?action=delete" onsubmit="return confirm('Delete this product?')"> -->
                    <!--     <input type="hidden" name="id" value="<?= $p['id'] ?>"> -->
                    <!--     <button type="submit" class="btn btn-danger">Delete</button> -->
                    <!-- </form> -->
                <!-- </td> -->
            </tr>
            <?php // endforeach; ?>
        </tbody>
    </table>

<?php elseif ($action === 'add' || $action === 'edit'): ?>
    <!-- ============ ADD / EDIT FORM ============ -->
    <?php
    $product = null;
    $isEdit = ($action === 'edit');

    if ($isEdit) {
        // TODO: Fetch product by ID using prepared statement
        // $id = intval($_GET['id'] ?? 0);
        // $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        // $stmt->execute([':id' => $id]);
        // $product = $stmt->fetch();
        // if (!$product) { /* handle not found */ }
    }
    ?>

    <h1><?= $isEdit ? '✏️ Edit Product' : '➕ Add New Product' ?></h1>

    <form method="POST" action="?action=<?= $isEdit ? 'edit' : 'add' ?>">
        <?php if ($isEdit): ?>
            <!-- <input type="hidden" name="id" value="<?= $product['id'] ?>"> -->
        <?php endif; ?>

        <div class="form-group">
            <label>Product Name *</label>
            <input type="text" name="name" required
                   value="<?= htmlspecialchars($product['name'] ?? '') ?>">
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea name="description"><?= htmlspecialchars($product['description'] ?? '') ?></textarea>
        </div>

        <div class="form-group">
            <label>Price *</label>
            <input type="number" step="0.01" min="0.01" name="price" required
                   value="<?= $product['price'] ?? '' ?>">
        </div>

        <div class="form-group">
            <label>Stock</label>
            <input type="number" min="0" name="stock"
                   value="<?= $product['stock'] ?? '0' ?>">
        </div>

        <div class="form-group">
            <label>Category</label>
            <select name="category">
                <option value="">-- Select --</option>
                <?php
                $categories = ['Electronics', 'Books', 'Furniture', 'Stationery', 'Accessories'];
                foreach ($categories as $cat):
                ?>
                    <option value="<?= $cat ?>"
                        <?= ($product['category'] ?? '') === $cat ? 'selected' : '' ?>>
                        <?= $cat ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <button type="submit" class="btn btn-success">
            <?= $isEdit ? 'Update Product' : 'Add Product' ?>
        </button>
        <a href="?action=list" class="btn btn-secondary">Cancel</a>
    </form>

<?php endif; ?>

</body>
</html>
```

### Expected Output

**List view:**
```
📦 Product Management  [+ Add New Product]

| ID | Name                 |   Price | Stock | Category    | Actions        |
|----|----------------------|---------|-------|-------------|----------------|
| 15 | Backpack             | $ 45.00 |    70 | Accessories | [Edit] [Delete]|
| 14 | Webcam HD            | $ 59.99 |    35 | Electronics | [Edit] [Delete]|
| ...| ...                  |   ...   |   ... | ...         | ...            |
```

**Add/Edit form:**
```
➕ Add New Product

Product Name *  [________________]
Description     [________________]
Price *         [___]
Stock           [___]
Category        [Electronics ▼]

[Add Product]  [Cancel]
```

### Self-Check

- [ ] List page shows all products with Edit and Delete buttons
- [ ] Add form submits via POST, inserts with prepared statement, redirects to list
- [ ] Edit form pre-fills with existing data, updates with prepared statement
- [ ] Delete uses POST (not GET) and confirms before deleting
- [ ] All queries use **prepared statements** with named placeholders (`:name`, `:id`, etc.)
- [ ] No raw user input is concatenated into SQL strings
- [ ] HTML output is escaped with `htmlspecialchars()`
- [ ] Price validation ensures value > 0
- [ ] Name validation ensures not empty

---

## Exercise C: Pagination & Search (Challenge/Bonus)

### Task Description

Enhance the product list from Exercise B by adding **pagination** (10 products per page) and a **search by name** feature. Both features must use prepared statements to prevent SQL injection.

### Step-by-Step Instructions

**Step 1 — Search Form**

Add a search input above the product table. The search term filters products by name using `LIKE '%term%'`. The search term must be passed as a prepared statement parameter — **never** concatenated into the SQL string.

**Step 2 — Pagination**

- Determine the current page from `$_GET['page']` (default: 1).
- Count total matching products (use a separate COUNT query with the same WHERE clause).
- Calculate total pages: `ceil($total / $perPage)` where `$perPage = 10`.
- Use `LIMIT :offset, :perPage` in the fetch query.
- Display Previous / page numbers / Next links below the table.
- Preserve the search term in pagination links.

**Step 3 — Display**

Show: "Showing X–Y of Z products" above the table.

### Starter Code

```php
<?php
// Session 10 — Exercise C: Pagination & Search
// (This extends Exercise B's list view)

// ... (same PDO connection as Exercise B) ...

$perPage = 10;
$currentPage = max(1, intval($_GET['page'] ?? 1));
$search = trim($_GET['search'] ?? '');
$offset = ($currentPage - 1) * $perPage;

// --- Build WHERE clause for search ---
$where = '';
$params = [];

if ($search !== '') {
    $where = "WHERE name LIKE :search";
    $params[':search'] = "%$search%";
}

// --- Count total matching products ---
// TODO: $countSql = "SELECT COUNT(*) FROM products $where";
// $countStmt = $pdo->prepare($countSql);
// $countStmt->execute($params);
// $totalProducts = $countStmt->fetchColumn();
// $totalPages = max(1, ceil($totalProducts / $perPage));

// --- Fetch products for current page ---
// TODO: $sql = "SELECT * FROM products $where ORDER BY name ASC LIMIT :offset, :perPage";
// $stmt = $pdo->prepare($sql);
// foreach ($params as $key => $value) {
//     $stmt->bindValue($key, $value);
// }
// $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
// $stmt->bindValue(':perPage', $perPage, PDO::PARAM_INT);
// $stmt->execute();
// $products = $stmt->fetchAll();

// --- Build pagination URL helper ---
// function buildUrl($page, $search) {
//     return '?action=list&page=' . $page . ($search ? '&search=' . urlencode($search) : '');
// }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session 10 — Pagination & Search</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #4a90d9; color: white; }
        tr:nth-child(even) { background: #f8f9fa; }
        .search-bar { margin: 20px 0; display: flex; gap: 10px; }
        .search-bar input { padding: 8px; flex: 1; }
        .search-bar button { padding: 8px 16px; }
        .pagination { margin-top: 20px; display: flex; gap: 5px; align-items: center; }
        .pagination a, .pagination span { padding: 6px 12px; border: 1px solid #ddd; text-decoration: none; border-radius: 3px; }
        .pagination .active { background: #4a90d9; color: white; border-color: #4a90d9; }
        .info { color: #666; margin-top: 10px; }
        .price { text-align: right; }
    </style>
</head>
<body>
    <h1>📦 Product Catalog</h1>

    <!-- Search Bar -->
    <form method="GET" class="search-bar">
        <input type="hidden" name="action" value="list">
        <input type="text" name="search" placeholder="Search by name..."
               value="<?= htmlspecialchars($search) ?>">
        <button type="submit">🔍 Search</button>
        <?php if ($search): ?>
            <a href="?action=list" class="btn">Clear</a>
        <?php endif; ?>
    </form>

    <!-- Product Info -->
    <p class="info">
        <!-- TODO: "Showing X–Y of Z products" -->
        <!-- Example: "Showing 1–10 of 15 products" -->
        <?php
        // $showFrom = $offset + 1;
        // $showTo = min($offset + $perPage, $totalProducts);
        // echo "Showing $showFrom–$showTo of $totalProducts products";
        ?>
    </p>

    <!-- Product Table -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // TODO: Loop through $products and display rows
            // foreach ($products as $p):
            ?>
            <tr>
                <!-- <td><?= $p['id'] ?></td>
                <td><?= htmlspecialchars($p['name']) ?></td>
                <td><?= htmlspecialchars($p['description']) ?></td>
                <td class="price">$<?= number_format($p['price'], 2) ?></td>
                <td><?= $p['stock'] ?></td>
                <td><?= htmlspecialchars($p['category']) ?></td> -->
            </tr>
            <?php // endforeach; ?>
        </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
        <?php
        // TODO: Previous link
        // if ($currentPage > 1):
        //     echo '<a href="' . buildUrl($currentPage - 1, $search) . '">← Previous</a>';
        // endif;

        // TODO: Page numbers
        // for ($i = 1; $i <= $totalPages; $i++):
        //     if ($i === $currentPage):
        //         echo '<span class="active">' . $i . '</span>';
        //     else:
        //         echo '<a href="' . buildUrl($i, $search) . '">' . $i . '</a>';
        //     endif;
        // endfor;

        // TODO: Next link
        // if ($currentPage < $totalPages):
        //     echo '<a href="' . buildUrl($currentPage + 1, $search) . '">Next →</a>';
        // endif;
        ?>
    </div>
</body>
</html>
```

### Expected Output

**Default view (page 1, no search):**
```
📦 Product Catalog

[Search by name...]  [🔍 Search]

Showing 1–10 of 15 products

| ID | Name                 | Description                   |   Price | Stock | Category    |
|----|----------------------|-------------------------------|---------|-------|-------------|
| 15 | Backpack             | Laptop backpack 15.6"         | $ 45.00 |    70 | Accessories |
|  5 | JavaScript Guide     | Modern JavaScript from the... | $ 34.99 |    45 | Books       |
| ...| ...                  | ...                           |   ...   |   ... | ...         |

[← Previous]  [1] [2]  [Next →]
```

**Search for "book":**
```
Showing 1–3 of 3 products

| ID | Name             | Description                          |   Price | Stock | Category |
|----|------------------|--------------------------------------|---------|-------|----------|
|  4 | PHP & MySQL Book | Learning PHP, MySQL & JavaScript     | $ 39.99 |    50 | Books    |
|  6 | SQL Cookbook      | Query solutions and techniques       | $ 49.99 |    30 | Books    |
|  5 | JavaScript Guide | Modern JavaScript from the start     | $ 34.99 |    45 | Books    |
```

### Self-Check

- [ ] 10 products shown per page (adjust `$perPage` to test with 3–5)
- [ ] Page 2 shows products 11–15
- [ ] Searching "book" returns 3 results (products with "Book" or "Cookbook" in name)
- [ ] Search term is preserved when clicking pagination links
- [ ] "Clear" link removes the search filter
- [ ] "Showing X–Y of Z" text updates correctly
- [ ] Previous/Next links only appear when applicable
- [ ] Current page number is highlighted
- [ ] Search uses prepared statement (search term bound as parameter)
- [ ] LIMIT and OFFSET use prepared statement parameters with `PDO::PARAM_INT`
- [ ] No SQL injection possible through the search field

---

## Submission Checklist

- [ ] Exercise A: PDO connection with error handling, product table displays all 15 products
- [ ] Exercise B: Full CRUD — List, Add, Edit, Delete all working
- [ ] Exercise B: All queries use prepared statements (no string concatenation in SQL)
- [ ] Exercise B: Delete uses POST, not GET
- [ ] Exercise C: Pagination shows 10 products per page with working page links
- [ ] Exercise C: Search filters by product name using prepared statement
- [ ] Exercise C: Search term persists across pagination
- [ ] File saved as `session10_exercise.php` and uploaded to LMS

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and runs without errors | 4 | ☐ |
| **Exercise B** submitted and CRUD works | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if PDO connection works, CRUD operations function, prepared statements used
- Deduct 2 pts if file does not run or uses string concatenation in SQL
- Deduct 1 pt if CRUD is incomplete or missing pagination/search
