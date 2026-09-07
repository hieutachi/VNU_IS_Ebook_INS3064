# Session 15 — In-Class Exercise: jQuery and AJAX

> **Time:** 45 minutes | **Submission:** LMS | **File:** `session15_exercise.html` (and related `.php` files)

## How to Submit
1. Save all required files in `C:\xampp\htdocs\INS3064\session15\`
2. Test each file in browser via `http://localhost/INS3064/session15/`
3. Compress the folder into a `.zip` named `session15_exercise.zip`
4. Upload the `.zip` to LMS before the deadline

## Learning Objectives

- Select DOM elements with jQuery selectors and modify them with DOM manipulation methods
- Attach event handlers with `.on()` and use event delegation for dynamic content
- Build interactive UI components (accordion, tabs, modal) with jQuery
- Send asynchronous HTTP requests with `$.ajax()`, `$.get()`, and `$.post()`
- Implement real-time search that queries a PHP backend without page reload

---

## Exercise A: Interactive UI with jQuery (Required)

### Task Description

Build three interactive UI components — an **accordion menu**, a **tab navigation**, and a **modal popup** — using jQuery for DOM manipulation and event handling. No page reloads; everything happens with JavaScript.

Create two files:

```
jquery_ui/
├── index.html    ← All three UI components on one page
└── style.css     ← Styling for all components
```

### Step-by-Step Instructions

**Part 1: Accordion Menu**

1. Create an accordion with 4 sections (e.g., "PHP Basics", "MySQL", "Sessions", "jQuery").
2. Each section has a clickable header and a hidden content panel.
3. When a header is clicked:
   - Toggle its content panel (slide down if closed, slide up if open).
   - Close all other panels (only one open at a time).
4. Add a CSS class `active` to the currently open header.

**Part 2: Tab Navigation**

1. Create a tab bar with 3 tabs (e.g., "Overview", "Features", "Contact").
2. Each tab has a corresponding content panel.
3. When a tab is clicked:
   - Show the matching panel, hide all others.
   - Add a CSS class `active` to the selected tab.
4. On page load, show the first tab by default.

**Part 3: Modal Popup**

1. Create a button "Open Modal" that opens a centered popup overlay.
2. The modal contains a title, some text, and a "Close" button.
3. The modal can be closed by:
   - Clicking the "Close" button.
   - Clicking the dark overlay outside the modal.
   - Pressing the Escape key.
4. Add a fade-in / fade-out animation.

### Starter Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery Interactive UI</title>
    <link rel="stylesheet" href="style.css">
    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>

<h1>🎯 jQuery Interactive UI</h1>

<!-- ==================== ACCORDION ==================== -->
<section>
    <h2>Accordion Menu</h2>
    <div class="accordion">
        <div class="accordion-item">
            <div class="accordion-header">📘 PHP Basics</div>
            <div class="accordion-content">
                <p>PHP is a server-side scripting language designed for web development.
                   Variables start with $, and code is enclosed in &lt;?php ?&gt; tags.</p>
            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header">🗄️ MySQL</div>
            <div class="accordion-content">
                <p>MySQL is a relational database management system. Use PDO with
                   prepared statements to connect PHP to MySQL safely.</p>
            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header">🍪 Sessions</div>
            <div class="accordion-content">
                <p>Sessions store user data on the server. Call session_start() at the
                   top of every page that uses $_SESSION.</p>
            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header">⚡ jQuery</div>
            <div class="accordion-content">
                <p>jQuery simplifies DOM manipulation, event handling, and AJAX requests.
                   Use $(selector) to select elements and .on() for events.</p>
            </div>
        </div>
    </div>
</section>

<!-- ==================== TABS ==================== -->
<section>
    <h2>Tab Navigation</h2>
    <div class="tabs">
        <div class="tab-bar">
            <!-- TODO: Add 3 tab buttons -->
            <!-- <button class="tab-btn active" data-tab="overview">Overview</button> -->
            <!-- <button class="tab-btn" data-tab="features">Features</button> -->
            <!-- <button class="tab-btn" data-tab="contact">Contact</button> -->
        </div>
        <div class="tab-panels">
            <!-- TODO: Add 3 tab panels -->
            <!-- <div class="tab-panel active" id="overview">...</div> -->
            <!-- <div class="tab-panel" id="features">...</div> -->
            <!-- <div class="tab-panel" id="contact">...</div> -->
        </div>
    </div>
</section>

<!-- ==================== MODAL ==================== -->
<section>
    <h2>Modal Popup</h2>
    <button id="open-modal" class="btn btn-primary">Open Modal</button>

    <div class="modal-overlay" id="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <h3>🎉 Modal Title</h3>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>This is a modal popup built with jQuery. It can be closed by
                   clicking the X button, the overlay, or pressing Escape.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="modal-ok">OK, Got it!</button>
            </div>
        </div>
    </div>
</section>

<script>
$(document).ready(function () {

    // ==================== ACCORDION ====================
    // TODO: When .accordion-header is clicked:
    //   1. Toggle the .accordion-content inside the same .accordion-item (slideToggle)
    //   2. Close all OTHER .accordion-content panels (slideUp)
    //   3. Toggle the 'active' class on the clicked header


    // ==================== TABS ====================
    // TODO: When a .tab-btn is clicked:
    //   1. Get the data-tab attribute value
    //   2. Remove 'active' class from all .tab-btn elements
    //   3. Add 'active' class to the clicked button
    //   4. Hide all .tab-panel elements
    //   5. Show the matching panel (by id)


    // ==================== MODAL ====================
    // TODO: #open-modal click → show #modal-overlay (fadeIn)
    // TODO: #modal-close click → hide #modal-overlay (fadeOut)
    // TODO: #modal-ok click → hide #modal-overlay (fadeOut)
    // TODO: Click on #modal-overlay (outside .modal) → hide it
    // TODO: Escape key press → hide the modal


});
</script>

</body>
</html>
```

### Expected Output

**Accordion** — clicking "MySQL" opens its panel and closes the others:

```
┌─────────────────────────────────────────┐
│ ▼ PHP Basics                            │
│ ┌─────────────────────────────────────┐ │
│ │ PHP is a server-side scripting...   │ │
│ └─────────────────────────────────────┘ │
│ ▶ MySQL                  (active)       │   ← click opens this
│ ▶ Sessions                             │
│ ▶ jQuery                               │
└─────────────────────────────────────────┘

After clicking "MySQL":

┌─────────────────────────────────────────┐
│ ▶ PHP Basics                           │   ← now closed
│ ▶ MySQL                  (active)       │   ← now open
│ ┌─────────────────────────────────────┐ │
│ │ MySQL is a relational database...   │ │
│ └─────────────────────────────────────┘ │
│ ▶ Sessions                             │
│ ▶ jQuery                               │
└─────────────────────────────────────────┘
```

**Tabs** — clicking "Features" switches the panel:

```
[Overview] [Features*] [Contact]
┌─────────────────────────────────────────┐
│ 🚀 Features                            │
│ • jQuery DOM manipulation              │
│ • AJAX requests                        │
│ • Event handling                       │
└─────────────────────────────────────────┘
```

**Modal** — clicking "Open Modal" shows a centered popup with a dark overlay:

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░┌─────────────────────┐░░░░░░░░░░
░░░░░░░░│ 🎉 Modal Title    ✕ │░░░░░░░░░░
░░░░░░░░├─────────────────────┤░░░░░░░░░░
░░░░░░░░│ This is a modal     │░░░░░░░░░░
░░░░░░░░│ popup built with    │░░░░░░░░░░
░░░░░░░░│ jQuery...           │░░░░░░░░░░
░░░░░░░░├─────────────────────┤░░░░░░░░░░
░░░░░░░░│      [OK, Got it!]  │░░░░░░░░░░
░░░░░░░░└─────────────────────┘░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Self-Check

- [ ] Accordion: clicking a header toggles its panel and closes others
- [ ] Accordion: only one panel is open at a time
- [ ] Accordion: `active` class is toggled on the clicked header
- [ ] Tabs: clicking a tab shows the matching panel and hides others
- [ ] Tabs: first tab is active on page load
- [ ] Tabs: `data-tab` attribute links buttons to panels
- [ ] Modal: opens on button click with fade-in
- [ ] Modal: closes on X button, overlay click, and Escape key
- [ ] All interactions use jQuery (`$()`, `.on()`, `.slideToggle()`, `.fadeIn()`)

---

## Exercise B: AJAX Product List (Required)

### Task Description

Build a product list that loads data from a PHP API using AJAX — **no page reloads**. Users can view products, add new products via a form, and delete products with a confirmation dialog. All data exchange uses JSON.

Create the following files:

```
ajax_app/
├── index.html        ← Frontend (jQuery + AJAX)
├── api.php           ← JSON API endpoint
├── config.php        ← Database connection
└── style.css         ← Styling
```

### Step-by-Step Instructions

1. Create `config.php`:
   - PDO connection to a database.
   - Create a `products` table: `id`, `name`, `price`, `stock`, `created_at`.
   - Seed 4 sample products.

2. Create `api.php`:
   - This is a JSON API that handles three actions based on `$_GET['action']` or `$_POST['action']`:
     - `list` (GET): returns all products as JSON.
     - `add` (POST): accepts `name`, `price`, `stock` via POST. Validates inputs. Inserts into DB. Returns `{"success": true, "id": newId}` or `{"success": false, "errors": [...]}`.
     - `delete` (POST): accepts `id` via POST. Deletes the product. Returns `{"success": true}` or `{"success": false, "error": "..."}`.
   - Always set `Content-Type: application/json` header.
   - Use prepared statements for all queries.

3. Create `index.html`:
   - On page load, call the API to fetch products and render them as cards or table rows.
   - Show a loading indicator while the AJAX request is in progress.
   - Display product name, price (formatted), stock, and a "Delete" button for each.
   - Include a form at the top to add a new product (name, price, stock).
   - On form submit, prevent the default submit, send data via AJAX POST to `api.php?action=add`.
   - On success: clear the form, re-fetch the product list.
   - On delete click: show a `confirm()` dialog ("Delete [product name]?"), then send AJAX POST to `api.php?action=delete`.
   - On success: remove the product from the DOM or re-fetch the list.

### Starter Code

```php
<?php
// config.php — Database connection
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=ajax_store;charset=utf8mb4',
        'root', '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed']));
}

$pdo->exec("
    CREATE TABLE IF NOT EXISTS products (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        price      DECIMAL(10,2) NOT NULL,
        stock      INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

if ($pdo->query("SELECT COUNT(*) FROM products")->fetchColumn() == 0) {
    $pdo->exec("
        INSERT INTO products (name, price, stock) VALUES
        ('PHP Handbook',      29.99, 100),
        ('MySQL Guide',       34.50,  75),
        ('Wireless Mouse',    22.00, 200),
        ('USB-C Hub',         45.99,  50)
    ");
}
```

```php
<?php
// api.php — JSON API endpoint
require_once 'config.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'list':
        // TODO: Fetch all products, return as JSON
        // $products = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
        // echo json_encode(['success' => true, 'products' => $products]);
        break;

    case 'add':
        // TODO: Validate POST data (name, price, stock)
        // TODO: Insert with prepared statement
        // TODO: Return {"success": true, "id": $newId} or {"success": false, "errors": [...]}
        break;

    case 'delete':
        // TODO: Get id from POST, check if product exists
        // TODO: Delete with prepared statement
        // TODO: Return {"success": true} or {"success": false, "error": "..."}
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Unknown action']);
        break;
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX Product List</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>

<h1>🛒 AJAX Product Manager</h1>

<!-- Add Product Form -->
<div class="add-form">
    <h2>Add Product</h2>
    <form id="add-product-form">
        <input type="text" id="product-name" placeholder="Product name" required>
        <input type="number" id="product-price" placeholder="Price" step="0.01" min="0.01" required>
        <input type="number" id="product-stock" placeholder="Stock" min="0" required>
        <button type="submit">Add Product</button>
    </form>
    <div id="form-message"></div>
</div>

<!-- Product List -->
<div class="product-list">
    <h2>Products <span id="product-count"></span></h2>
    <div id="loading">⏳ Loading products...</div>
    <div id="products-container"></div>
</div>

<script>
$(document).ready(function () {

    // Load products on page load
    loadProducts();

    // TODO: loadProducts() function
    // function loadProducts() {
    //     $('#loading').show();
    //     $.ajax({
    //         url: 'api.php?action=list',
    //         method: 'GET',
    //         dataType: 'json',
    //         success: function (response) {
    //             $('#loading').hide();
    //             if (response.success) {
    //                 renderProducts(response.products);
    //             }
    //         },
    //         error: function () {
    //             $('#loading').hide();
    //             $('#products-container').html('<p class="error">Failed to load products.</p>');
    //         }
    //     });
    // }

    // TODO: renderProducts(products) function
    // function renderProducts(products) {
    //     $('#product-count').text('(' + products.length + ')');
    //     if (products.length === 0) {
    //         $('#products-container').html('<p>No products yet.</p>');
    //         return;
    //     }
    //     var html = '';
    //     $.each(products, function (i, product) {
    //         html += '<div class="product-card" data-id="' + product.id + '">';
    //         html += '  <h3>' + escapeHtml(product.name) + '</h3>';
    //         html += '  <p>Price: $' + parseFloat(product.price).toFixed(2) + '</p>';
    //         html += '  <p>Stock: ' + product.stock + '</p>';
    //         html += '  <button class="btn-delete" data-id="' + product.id + '" data-name="' + escapeHtml(product.name) + '">🗑️ Delete</button>';
    //         html += '</div>';
    //     });
    //     $('#products-container').html(html);
    // }

    // TODO: Handle form submission — add product via AJAX
    // $('#add-product-form').on('submit', function (e) {
    //     e.preventDefault();
    //     var data = {
    //         action: 'add',
    //         name:   $('#product-name').val(),
    //         price:  $('#product-price').val(),
    //         stock:  $('#product-stock').val()
    //     };
    //     $.ajax({
    //         url: 'api.php',
    //         method: 'POST',
    //         data: data,
    //         dataType: 'json',
    //         success: function (response) {
    //             if (response.success) {
    //                 $('#form-message').html('<p class="success">✅ Product added!</p>');
    //                 $('#add-product-form')[0].reset();
    //                 loadProducts(); // Refresh list
    //             } else {
    //                 $('#form-message').html('<p class="error">❌ ' + response.errors.join(', ') + '</p>');
    //             }
    //         }
    //     });
    // });

    // TODO: Handle delete button click (use event delegation)
    // $(document).on('click', '.btn-delete', function () {
    //     var id = $(this).data('id');
    //     var name = $(this).data('name');
    //     if (!confirm('Delete "' + name + '"? This cannot be undone.')) return;
    //     $.ajax({
    //         url: 'api.php',
    //         method: 'POST',
    //         data: { action: 'delete', id: id },
    //         dataType: 'json',
    //         success: function (response) {
    //             if (response.success) {
    //                 loadProducts(); // Refresh list
    //             } else {
    //                 alert('Error: ' + response.error);
    //             }
    //         }
    //     });
    // });

    // Helper: escape HTML to prevent XSS
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

});
</script>

</body>
</html>
```

### Expected Output

**Page loads and products are fetched via AJAX:**

```
🛒 AJAX Product Manager

Add Product
+--------------------------------------------------+
| Product name: [USB Keyboard    ]                  |
| Price:        [29.99           ]                  |
| Stock:        [50              ]                  |
| [Add Product]                                     |
| ✅ Product added!                                 |
+--------------------------------------------------+

Products (5)
+---------------------------+  +---------------------------+
| 📘 PHP Handbook           |  | 🗄️ MySQL Guide            |
| Price: $29.99             |  | Price: $34.50             |
| Stock: 100                |  | Stock: 75                 |
| [🗑️ Delete]               |  | [🗑️ Delete]               |
+---------------------------+  +---------------------------+
| ⚡ Wireless Mouse          |  | 🔌 USB-C Hub              |
| Price: $22.00             |  | Price: $45.99             |
| Stock: 200                |  | Stock: 50                 |
| [🗑️ Delete]               |  | [🗑️ Delete]               |
+---------------------------+  +---------------------------+
```

**Delete confirmation:**

```
┌──────────────────────────────────────┐
│ ⚠️  Delete "MySQL Guide"?            │
│ This cannot be undone.               │
│                                      │
│       [OK]        [Cancel]           │
└──────────────────────────────────────┘
```

### Self-Check

- [ ] Products load via `$.ajax()` GET request to `api.php?action=list`
- [ ] Loading indicator shows while products are being fetched
- [ ] Products are rendered dynamically with jQuery (not server-rendered HTML)
- [ ] Add form submits via `$.ajax()` POST with `e.preventDefault()`
- [ ] After adding, the form clears and the product list refreshes
- [ ] Delete button shows `confirm()` dialog before sending the request
- [ ] After deleting, the product list refreshes
- [ ] Event delegation (`$(document).on(...)`) is used for delete buttons
- [ ] All output rendered in the DOM is escaped to prevent XSS
- [ ] API returns proper JSON with `Content-Type: application/json`

---

## Exercise C: Live Search with Debounce (Challenge/Bonus)

### Task Description

Implement a **real-time search** feature that queries the PHP backend as the user types. To avoid flooding the server with requests, use a **debounce** technique — only send the AJAX request after the user stops typing for 300ms.

### Step-by-Step Instructions

1. Create `search.php` (API endpoint):
   - Accept a `q` query parameter.
   - Search the `products` table where `name LIKE :query` (using prepared statements).
   - Return results as JSON: `{"success": true, "products": [...], "count": N}`.
   - If `q` is empty, return all products.

2. Add a search box to `index.html`:
   - Add an `<input type="text" id="search-input" placeholder="🔍 Search products...">` above the product list.
   - Add a `<div id="search-results-info">` to show "Showing X of Y products".

3. Implement the debounce function in JavaScript:
   ```javascript
   function debounce(func, delay) {
       var timer;
       return function () {
           var context = this;
           var args = arguments;
           clearTimeout(timer);
           timer = setTimeout(function () {
               func.apply(context, args);
           }, delay);
       };
   }
   ```

4. Attach a debounced `keyup` handler to the search input:
   - On each keyup (after 300ms delay), send an AJAX GET to `search.php?q=...`.
   - Render the returned products (reuse `renderProducts()` from Exercise B).
   - Show a "Searching..." indicator while the request is in flight.
   - Show "No products found" if the result set is empty.
   - Highlight the matching text in product names (wrap in `<mark>` tags).

5. Implement server-side highlighting:
   - In `search.php`, return the raw name and let the client highlight.
   - OR: wrap matching text in `<mark>` tags server-side before returning.

### Starter Code

```php
<?php
// search.php — Search API endpoint
require_once 'config.php';

header('Content-Type: application/json');

$query = trim($_GET['q'] ?? '');

if ($query === '') {
    // Return all products
    $products = $pdo->query("SELECT * FROM products ORDER BY name")->fetchAll();
} else {
    // TODO: Use prepared statement with LIKE
    // $stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE :q ORDER BY name");
    // $stmt->execute(['q' => '%' . $query . '%']);
    // $products = $stmt->fetchAll();
}

// TODO: Return JSON with success, products, and count
// echo json_encode([
//     'success'  => true,
//     'products' => $products,
//     'count'    => count($products),
//     'query'    => $query,
// ]);
```

```html
<!-- Add to index.html, above the product list -->

<div class="search-box">
    <input type="text" id="search-input" placeholder="🔍 Search products...">
    <span id="search-indicator"></span>
</div>
<div id="search-results-info"></div>

<script>
$(document).ready(function () {

    // Debounce helper
    function debounce(func, delay) {
        var timer;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    // TODO: Highlight matching text in a string
    // function highlightMatch(text, query) {
    //     if (!query) return escapeHtml(text);
    //     var escaped = escapeHtml(text);
    //     var regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    //     return escaped.replace(regex, '<mark>$1</mark>');
    // }

    // TODO: Escape regex special characters
    // function escapeRegex(string) {
    //     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // }

    // TODO: Live search function
    // function performSearch(query) {
    //     if (query.length === 0) {
    //         loadProducts(); // Show all products
    //         return;
    //     }
    //     $('#search-indicator').text('⏳ Searching...');
    //     $.ajax({
    //         url: 'search.php',
    //         method: 'GET',
    //         data: { q: query },
    //         dataType: 'json',
    //         success: function (response) {
    //             $('#search-indicator').text('');
    //             if (response.success) {
    //                 $('#search-results-info').text('Showing ' + response.count + ' result(s) for "' + response.query + '"');
    //                 renderProducts(response.products, response.query); // Pass query for highlighting
    //             }
    //         },
    //         error: function () {
    //             $('#search-indicator').text('');
    //             $('#products-container').html('<p class="error">Search failed.</p>');
    //         }
    //     });
    // }

    // TODO: Attach debounced search to input
    // var debouncedSearch = debounce(function () {
    //     var query = $('#search-input').val().trim();
    //     performSearch(query);
    // }, 300);
    //
    // $('#search-input').on('keyup', debouncedSearch);

    // TODO: Update renderProducts() to accept an optional query for highlighting
    // function renderProducts(products, query) {
    //     ... same as Exercise B, but use highlightMatch(product.name, query) ...
    // }

});
</script>
```

### Expected Output

Typing "usb" in the search box (after 300ms pause):

```
🔍 Search products... [usb        ] ⏳

Showing 2 result(s) for "usb"

+---------------------------+  +---------------------------+
| 🔌 <mark>USB</mark>-C Hub        |  | ⌨️ <mark>USB</mark> Keyboard      |
| Price: $45.99             |  | Price: $29.99             |
| Stock: 50                 |  | Stock: 50                 |
+---------------------------+  +---------------------------+

(In the browser, <mark> tags render as highlighted/yellow text:)
  "USB-C Hub"  and  "USB Keyboard"  with "USB" highlighted in yellow
```

Searching for "xyz" with no matches:

```
🔍 Search products... [xyz        ]

Showing 0 result(s) for "xyz"

📭 No products found matching "xyz".
```

### Self-Check

- [ ] Search input triggers AJAX request to `search.php?q=...`
- [ ] Debounce delays the request by 300ms after the user stops typing
- [ ] "Searching..." indicator shows while the request is in flight
- [ ] Results display the count: "Showing X result(s) for ..."`
- [ ] Matching text is highlighted with `<mark>` tags
- [ ] Empty search shows all products
- [ ] No results shows a "No products found" message
- [ ] `search.php` uses prepared statements for the LIKE query
- [ ] Rapid typing does not send multiple simultaneous requests (debounce works)

---

## Submission Checklist

- [ ] Exercise A: Accordion with slideToggle, one panel at a time
- [ ] Exercise A: Tab navigation switching panels via data attributes
- [ ] Exercise A: Modal with close on X, overlay click, and Escape key
- [ ] Exercise B: Product list loaded via `$.ajax()` GET on page load
- [ ] Exercise B: Add product via `$.ajax()` POST with form preventDefault
- [ ] Exercise B: Delete with `confirm()` dialog and `$.ajax()` POST
- [ ] Exercise B: Event delegation for dynamically rendered delete buttons
- [ ] Exercise C (Bonus): Live search with debounced keyup handler
- [ ] Exercise C (Bonus): Search results highlighted with `<mark>` tags
- [ ] Exercise C (Bonus): Loading indicator during search requests
- [ ] All PHP API endpoints return JSON with proper Content-Type
- [ ] All database queries use prepared statements
- [ ] Files uploaded to LMS as a ZIP folder

## Grading (10 points)

| Criteria | Points | Check |
|----------|--------|-------|
| **Exercise A** submitted and UI components work | 4 | ☐ |
| **Exercise B** submitted and AJAX CRUD works | 4 | ☐ |
| **Exercise C** submitted *(bonus)* | 2 | ☐ |
| **Total** | **10** | |

**Grading notes:**
- Full marks if jQuery UI components work, AJAX CRUD functions, JSON responses correct
- Deduct 2 pts if file does not run or AJAX doesn't work
- Deduct 1 pt if live search is missing or event delegation not used
