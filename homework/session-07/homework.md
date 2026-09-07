# Homework 7: Advanced SQL

> **Due:** Sunday 23:59 via LMS | **File:** `bookstore_queries.sql`

## How to Submit
1. Save your `.sql` file as `bookstore_queries.sql`
2. Test by importing into phpMyAdmin (SQL tab)
3. Compress the file into a `.zip` named `homework07.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Write **10 advanced SQL queries** against the Online Bookstore database you designed in Homework 6. Each query must exercise a different technique—JOINs, aggregations, subqueries, views, and combined operations. This assignment demonstrates your ability to retrieve meaningful, complex information from a relational database.

You must run Homework 6's `bookstore_db.sql` to create the database before writing these queries. All queries must execute without errors against that schema.

## Requirements

### Functional Requirements

Write the following 10 queries. For each query, include:
- A **comment** (`--`) above the query describing what it does in plain English.
- A **comment** showing the **expected output** (as a Markdown-style table or formatted text, right below the query as a block comment `/* ... */`).

#### JOIN Queries (3)

1. **Books with Authors** — List all books with their authors. Show book title, ISBN, and author name. Books with multiple authors should appear multiple times (one row per author).
2. **Order Details** — List all orders with customer name, order date, book title, quantity, and line total (quantity × unit price). Order by order date descending.
3. **Books with Publisher and Categories** — List each book's title, publisher name, and all category names it belongs to. Use a JOIN across at least 3 tables.

#### Aggregate Queries with GROUP BY (2)

4. **Sales by Book** — For each book, show the total quantity sold and total revenue. Order by revenue descending.
5. **Customer Order Summary** — For each customer, show the number of orders placed and the total amount spent. Include customers with zero orders.

#### Subqueries (2)

6. **Books Above Average Price** — List all books whose price is above the average book price. Show title and price.
7. **Best-Selling Author** — Find the author whose books have sold the most total quantity. Show author name and total quantity sold. Use a subquery (not LIMIT) to handle ties.

#### HAVING (1)

8. **Prolific Reviewers** — Find customers who have written more than 2 reviews. Show customer name and number of reviews. Only include reviews with a rating of 3 or higher.

#### VIEW Creation (1)

9. **Create a Book Sales Summary View** — Create a view called `v_book_sales_summary` that shows: book title, ISBN, publisher name, total quantity sold, total revenue, average review rating, and number of reviews. If a book has no sales or no reviews, show 0 or NULL as appropriate.

#### Combined Complex Query (1)

10. **Monthly Revenue Report** — Show monthly revenue for each month of the current year. Columns: month number, month name, number of orders, total items sold, total revenue. Include months with zero revenue. Use at least two techniques from: JOIN, GROUP BY, subquery, UNION, or date functions.

### Technical Requirements

- Write your queries in a single file: `bookstore_queries.sql`.
- Start the file with a header comment: your name, student ID, assignment number, and date.
- Use **MySQL 8.0+** compatible syntax.
- Each query must be numbered (`-- Query 1`, `-- Query 2`, etc.).
- Use **meaningful column aliases** (e.g., `total_revenue` instead of `SUM(price * quantity)`).
- Use **explicit JOIN syntax** (no comma-separated tables in FROM).
- Do not use `SELECT *` — always specify columns.
- Queries 1–8 should be `SELECT` statements; Query 9 creates a `VIEW` followed by a `SELECT` from it; Query 10 should be a standalone `SELECT`.

## Deliverables

| File | Description |
|------|-------------|
| `bookstore_queries.sql` | Single SQL file containing all 10 queries with comments and expected output |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| Correctness | 40 | All 10 queries execute without errors and return correct results against the Homework 6 schema |
| Complexity | 25 | Queries demonstrate multi-table JOINs, nested subqueries, aggregate functions, and non-trivial logic |
| Comments | 20 | Every query has a clear description comment and an expected output comment; file header is complete |
| Variety of Techniques | 15 | Good coverage of JOINs, GROUP BY, HAVING, subqueries, views, aggregate functions, and date/string functions |

## Tips

- **Test incrementally.** Run `bookstore_db.sql` first, then execute each query one at a time.
- **Expected output:** You don't need exact numbers — write a reasonable table showing column names and example rows based on your sample data.
- **NULL handling:** Use `LEFT JOIN` when you want to include rows with no matching data (e.g., customers with no orders). Use `IFNULL()` or `COALESCE()` to replace NULLs with defaults.
- **Subquery types:** Consider `IN`, `EXISTS`, and derived tables (subqueries in `FROM`).
- **VIEW note:** Views are saved queries. Create the view once, then SELECT from it to demonstrate it works.
- Review Session 7 lecture slides on JOINs and subqueries before starting.
