# Homework 12: Web Application Development

> **Due:** Sunday 23:59 via LMS | **File:** `homework-12.zip` containing `product_app/`

## How to Submit
1. Save all files in the `product_app/` folder
2. Test each file in browser via `http://localhost/INS3064/product_app/`
3. Compress the folder into `homework-12.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Build a complete **Product Management System** — a full-featured mini web application with categories and products. This assignment brings together everything learned so far: database design with foreign keys, full CRUD operations, file uploads, pagination, search/filter, form validation, and responsive styling. You will build a real application from scratch (or on top of your Homework 11 MVC structure).

## Requirements

### Functional Requirements

1. **Categories Management**
   - Full CRUD: list all categories, add new category, edit category, delete category.
   - Each category has: `id`, `name`, `description`, `created_at`.

2. **Products Management**
   - Full CRUD: list all products, add new product, edit product, delete product.
   - Each product has: `id`, `name`, `description`, `price`, `category_id` (foreign key), `image`, `created_at`, `updated_at`.
   - **Category dropdown** on the product form — select from existing categories.
   - When a category is deleted, handle the foreign key constraint (either prevent deletion if products exist, or set `category_id` to NULL).

3. **Image Upload**
   - Allow uploading a product image (JPEG, PNG, GIF, max 2 MB).
   - Validate file type using both MIME type and file extension.
   - Store uploaded images in a dedicated `uploads/` directory.
   - Display product images in the product list and detail views.
   - When editing a product, optionally replace the existing image.

4. **Pagination**
   - Product list must be paginated (10 products per page).
   - Display page navigation (Previous / page numbers / Next).

5. **Search and Filters**
   - Search products by name (partial match with `LIKE`).
   - Filter products by category (dropdown).
   - Combine search and filter together.
   - Preserve search/filter values in the form after submission.

6. **User Feedback**
   - Display success messages after create/update/delete operations (e.g., "Product created successfully").
   - Display validation error messages when form input is invalid.
   - Use the **POST-Redirect-GET** pattern to prevent form resubmission on refresh.

7. **Responsive Design**
   - Use CSS (or Bootstrap) to make the application look reasonable on both desktop and mobile screens.
   - Product list should adapt layout for smaller viewports.

### Technical Requirements

- Use the **MVC structure** from Homework 11 (or build one if you didn't complete it).
- All database queries must use **prepared statements**.
- All user output must be escaped with `htmlspecialchars()`.
- Use `password_hash` / `password_verify` if you include any user feature (optional for this homework; required in Homework 13).
- Store database configuration in a separate `config/` file.

### Database Schema

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Folder Structure

```
product_app/
├── public/
│   ├── index.php
│   ├── css/
│   │   └── style.css
│   └── uploads/
│       └── .gitkeep
├── app/
│   ├── core/
│   ├── controllers/
│   │   ├── CategoryController.php
│   │   └── ProductController.php
│   ├── models/
│   │   ├── CategoryModel.php
│   │   └── ProductModel.php
│   └── views/
│       ├── layout.php
│       ├── categories/
│       │   ├── index.php
│       │   ├── create.php
│       │   └── edit.php
│       └── products/
│           ├── index.php
│           ├── create.php
│           └── edit.php
├── config/
│   └── database.php
├── sql/
│   └── schema.sql
└── README.md
```

## Deliverables

| File | Description |
|------|-------------|
| `public/index.php` | Front controller with routing for categories and products |
| `app/controllers/CategoryController.php` | CRUD controller for categories |
| `app/controllers/ProductController.php` | CRUD controller for products (including image upload) |
| `app/models/CategoryModel.php` | Database operations for categories |
| `app/models/ProductModel.php` | Database operations for products (with pagination, search, filter) |
| `app/views/categories/*.php` | Category view templates |
| `app/views/products/*.php` | Product view templates (with category dropdown, image display, pagination) |
| `app/views/layout.php` | Shared responsive layout |
| `public/css/style.css` | Application styles (responsive) |
| `config/database.php` | Database configuration |
| `sql/schema.sql` | SQL file to create the database tables (with sample data) |
| `README.md` | Setup instructions |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| CRUD Completeness | 30 | Full Create, Read, Update, Delete for both categories and products; foreign key relationship works; category dropdown populated correctly |
| File Upload | 20 | Image upload with proper validation (type, size); images stored and displayed; edit allows image replacement |
| Search & Filter | 15 | Search by name works; filter by category works; combined search + filter; form values preserved after search |
| Security | 15 | Prepared statements on all queries; `htmlspecialchars()` on all output; file upload validation prevents malicious files |
| Pagination | 10 | Products paginated with correct page count; navigation works; current page highlighted; search/filter preserved across pages |
| UI/UX | 10 | Responsive layout; clear success/error messages; POST-Redirect-GET pattern; clean and usable interface |

## Tips

- **Start with the database schema** — run `schema.sql` and insert a few sample categories before building the application.
- **Build categories first** since they are simpler and products depend on them.
- **Image upload is the trickiest part** — test it independently before integrating it into the product form. Use `$_FILES`, `move_uploaded_file()`, and validate carefully.
- **For pagination**, use `SELECT COUNT(*)` to get total records, then calculate total pages: `ceil($total / $perPage)`. Use `LIMIT` and `OFFSET` in your query.
- **POST-Redirect-GET**: after a successful POST (create/update/delete), use `header('Location: ...')` and `exit()` to redirect. Store the success message in `$_SESSION` and display it on the redirected page.
- **Bootstrap** can save significant time on responsive design — use the CDN version (`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">`).
- **Test edge cases**: delete a category that has products, search with no results, upload a file that is too large, submit a form with missing required fields.
