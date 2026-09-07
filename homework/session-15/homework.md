# Homework 15: jQuery and AJAX

> **Due:** Sunday 23:59 via LMS | **File:** `homework-15.zip` containing `product_app/`

## How to Submit
1. Save all files in the `product_app/` folder
2. Test each file in browser via `http://localhost/INS3064/product_app/`
3. Compress the folder into `homework-15.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Enhance your Product Management System with **AJAX-powered features** using jQuery. The goal is to make the application feel more dynamic and responsive by eliminating unnecessary full-page reloads. You will build JSON API endpoints in PHP and consume them with jQuery AJAX calls on the front end. This assignment demonstrates how modern web applications provide a smooth, single-page-like user experience.

## Requirements

### Functional Requirements

1. **Product List Without Page Reload**
   - Load the product list dynamically via AJAX when the page first loads.
   - Render product rows using jQuery (append HTML to the table body, or use a template).
   - Display product images, category name, price, and action buttons.

2. **Add Product via AJAX**
   - Open a modal or inline form to add a new product.
   - Submit the form via AJAX (POST request with `FormData` to support file upload).
   - On success: add the new product row to the table without reloading, close the modal, show a success notification.
   - On failure: display validation errors in the form without reloading.

3. **Delete Product via AJAX**
   - Each product row has a "Delete" button.
   - On click, show a confirmation dialog (`confirm()` or a Bootstrap modal).
   - On confirmation, send an AJAX DELETE request (or POST with `_method=DELETE`).
   - On success: remove the row from the table with a fade-out animation, show a success notification.
   - On failure: show an error notification.

4. **Live Search with Debounce**
   - Add a search input above the product table.
   - On every keystroke, send an AJAX request to search products by name.
   - **Implement debounce (300ms)** — only send the request 300ms after the user stops typing.
   - Display matching results in the product table.
   - If the search input is empty, load all products.

5. **Category Filter Without Reload**
   - Add a category dropdown filter above the product table.
   - When the user selects a category, send an AJAX request to filter products.
   - Combine with live search (both search term and category filter applied together).

6. **Loading Spinner**
   - Display a loading spinner or indicator during every AJAX request.
   - Hide it when the request completes (both success and error).
   - Use CSS animations or a spinner library.

7. **Error Handling**
   - Handle AJAX errors gracefully: show a user-friendly error notification for network failures, server errors (500), or unexpected responses.
   - Implement a retry mechanism or at minimum a clear "Something went wrong. Please try again." message.

8. **JSON API Endpoints in PHP**
   - Create dedicated API endpoints (or modify existing controllers to respond with JSON when an AJAX request is detected).

   | Endpoint | Method | Response |
   |----------|--------|----------|
   | `/api/products` | GET | JSON array of products (supports `?search=` and `?category_id=`) |
   | `/api/products` | POST | Create product; return JSON `{success: true, product: {...}}` |
   | `/api/products/{id}` | DELETE | Delete product; return JSON `{success: true}` |
   | `/api/categories` | GET | JSON array of categories |

   - All JSON responses must follow a consistent format:

   ```json
   {
       "success": true,
       "data": { ... },
       "message": "Product created successfully"
   }
   ```

   or on error:

   ```json
   {
       "success": false,
       "errors": { "name": "Name is required", "price": "Price must be a number" },
       "message": "Validation failed"
   }
   ```

### Technical Requirements

- Use **jQuery** (include via CDN: `<script src="https://code.jquery.com/jquery-3.7.1.min.js">`).
- Use `$.ajax()` or shorthand methods (`$.get()`, `$.post()`) — not `fetch()` API.
- Set the `X-Requested-With: XMLHttpRequest` header on AJAX requests so the server can detect AJAX.
- PHP endpoints should return `Content-Type: application/json` with `json_encode()`.
- Maintain CSRF protection on all AJAX POST/DELETE requests (send token in request header or body).
- The application must still work (with degraded experience) if JavaScript is disabled — i.e., keep the non-AJAX form submissions as a fallback, or acknowledge this is a progressive enhancement.

### Updated Folder Structure

```
product_app/
├── public/
│   ├── index.php
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js           # NEW — all jQuery/AJAX code
│   └── uploads/
├── app/
│   ├── core/
│   │   ├── Database.php
│   │   ├── Router.php
│   │   ├── Auth.php
│   │   ├── Csrf.php
│   │   └── Security.php
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   ├── CategoryController.php
│   │   ├── ProductController.php
│   │   └── ApiController.php  # NEW — JSON API endpoints
│   ├── models/
│   │   ├── UserModel.php
│   │   ├── CategoryModel.php
│   │   └── ProductModel.php
│   └── views/
│       ├── layout.php         # Updated — include jQuery + app.js
│       ├── auth/
│       ├── user/
│       ├── categories/
│       └── products/
│           ├── index.php      # Updated — empty table body, JS renders rows
│           └── _product_row.php  # NEW — partial for AJAX row rendering
├── config/
│   └── database.php
├── sql/
│   └── schema.sql
└── README.md
```

## Deliverables

| File | Description |
|------|-------------|
| `public/js/app.js` | jQuery code: AJAX CRUD, live search with debounce, category filter, loading spinner, error handling |
| `app/controllers/ApiController.php` | JSON API endpoints for products and categories |
| Updated `app/views/products/index.php` | Product list page with search input, category filter dropdown, empty table body for AJAX, loading spinner HTML |
| Updated `app/views/layout.php` | Includes jQuery CDN and `app.js`; spinner overlay HTML |
| Updated `public/css/style.css` | Spinner animation styles, notification styles, modal styles |
| Updated `app/core/Router.php` | Routes for `/api/products`, `/api/categories` |
| All previous Homework 14 files | Existing functionality preserved with CSRF and security measures |
| `README.md` | Updated setup instructions |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| AJAX CRUD Operations | 30 | Product list loads via AJAX; add product works with modal + AJAX (including file upload); delete product removes row with animation; no full-page reloads for CRUD |
| Live Search | 25 | Search input triggers AJAX after 300ms debounce; results update table dynamically; combined with category filter; empty search restores full list |
| Error Handling | 20 | AJAX failures show user-friendly notifications; network errors handled; validation errors displayed in form; server errors (non-200) caught and reported |
| User Experience | 15 | Loading spinner visible during requests; smooth animations (fade-in/fade-out); success notifications auto-dismiss; modal forms close properly; responsive design maintained |
| JSON API Design | 10 | Consistent JSON response format (`success`, `data`, `message`, `errors`); proper HTTP status codes (200, 201, 400, 404, 500); correct `Content-Type: application/json` header; API routes follow RESTful conventions |

## Tips

- **Start with the API endpoints**: build and test `ApiController` with tools like browser DevTools (Network tab) or curl before writing any jQuery code. Ensure each endpoint returns valid JSON.
- **Debounce implementation** is simple:

  ```javascript
  let searchTimer;
  $('#search-input').on('keyup', function() {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function() {
          loadProducts(); // your AJAX function
      }, 300);
  });
  ```

- **For file upload with AJAX**, use `FormData`:

  ```javascript
  let formData = new FormData($('#product-form')[0]);
  formData.append('csrf_token', csrfToken);
  $.ajax({
      url: '/api/products',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      ...
  });
  ```

- **CSRF token with AJAX**: include the token in a custom header (e.g., `X-CSRF-Token`) on every AJAX request. You can set a default header for all jQuery AJAX calls:

  ```javascript
  $.ajaxSetup({
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
  });
  ```

  Add `<meta name="csrf-token" content="<?= $_SESSION['csrf_token'] ?>">` in your layout `<head>`.

- **Loading spinner**: create a simple overlay div that you `.show()` before the AJAX call and `.hide()` in the AJAX `complete` callback (not just `success` — also handles errors).

- **Keep the non-AJAX forms as fallback**: your `ProductController` should still handle standard form submissions. The `ApiController` handles AJAX requests separately. This way, the app works without JavaScript.

- **Test edge cases**: empty search, search with no results, delete the last product on a page, add a product with invalid data, lose network connection during an AJAX call.
