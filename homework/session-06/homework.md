# Homework 6: Database Design

> **Due:** Sunday 23:59 via LMS | **Files:** `bookstore_erd.md`, `bookstore_db.sql`

## How to Submit
1. Save your files as `bookstore_erd.md` and `bookstore_db.sql`
2. Test the SQL by importing into phpMyAdmin (SQL tab)
3. Compress both files into a `.zip` named `homework06.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

Design a complete relational database for an **Online Bookstore** system. You will create an Entity-Relationship Diagram (ERD), normalize your design to Third Normal Form (3NF), write the full SQL schema with constraints, and populate the database with realistic sample data. This assignment builds the foundation for Homework 7 (Advanced SQL queries).

## Requirements

### Functional Requirements

1. **Tables** — Your database must include all of the following tables:
   - `authors` — Author information (name, biography, nationality, etc.)
   - `publishers` — Publisher details (name, address, website, etc.)
   - `categories` — Book categories/genres (name, description, parent category for sub-genres)
   - `books` — Book catalog (title, ISBN, price, stock, publication date, etc.)
   - `book_authors` — Many-to-many relationship between books and authors
   - `book_categories` — Many-to-many relationship between books and categories
   - `customers` — Customer accounts (name, email, password hash, address, etc.)
   - `orders` — Order header (customer, order date, status, total, shipping address)
   - `order_items` — Line items per order (book, quantity, unit price, subtotal)
   - `reviews` — Customer reviews of books (rating 1–5, comment, date)

2. **Relationships** — Implement the following:
   - A book can have **many** authors; an author can write **many** books (M:N).
   - A book can belong to **many** categories; a category contains **many** books (M:N).
   - A book has **one** publisher; a publisher publishes **many** books (1:N).
   - A customer can place **many** orders (1:N).
   - An order contains **many** order items; each item refers to **one** book (M:N via order_items).
   - A customer can write **many** reviews; each review is for **one** book (1:N from customer, 1:N from book).

3. **Normalization** — Ensure your design is in **Third Normal Form (3NF)**:
   - 1NF: All columns contain atomic values; no repeating groups.
   - 2NF: No partial dependencies (every non-key attribute depends on the whole primary key).
   - 3NF: No transitive dependencies (non-key attributes do not depend on other non-key attributes).
   - In your `bookstore_db.sql`, include a comment block explaining how you achieved 3NF.

4. **Entity-Relationship Diagram (ERD)** — Create a **text-based ERD** in `bookstore_erd.md` showing:
   - All entities (tables) with their attributes, marking primary keys (PK) and foreign keys (FK).
   - All relationships with cardinality notation (1:1, 1:N, M:N).
   - Use ASCII art, Markdown tables, or a clear text notation (e.g., Crow's Foot in text).

### Technical Requirements

5. **SQL Schema** (`bookstore_db.sql`):
   - Write `CREATE TABLE` statements for every table.
   - Include the following constraints where appropriate:
     - `PRIMARY KEY` (auto-increment for surrogate keys)
     - `FOREIGN KEY` with appropriate `ON DELETE` / `ON UPDATE` actions
     - `NOT NULL` for required fields
     - `UNIQUE` for ISBN, email, etc.
     - `CHECK` constraints (e.g., rating between 1 and 5, price > 0, stock >= 0)
     - `DEFAULT` values (e.g., order status, timestamps)
     - Appropriate data types (`INT`, `DECIMAL`, `VARCHAR`, `TEXT`, `DATE`, `DATETIME`, `ENUM`)
   - Use `InnoDB` engine and `utf8mb4` charset.

6. **Sample Data** — Insert at least:
   - 8 books, 6 authors, 4 publishers, 5 categories
   - 5 customers, 6 orders with 12+ order items total
   - 10 reviews
   - All foreign key relationships must be correctly linked.

## Deliverables

| File | Description |
|------|-------------|
| `bookstore_erd.md` | Text-based ERD with all entities, attributes, and relationships |
| `bookstore_db.sql` | Complete SQL file: normalization explanation, CREATE TABLE statements with constraints, INSERT statements for sample data |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| Schema Design | 35 | All required tables, correct relationships, appropriate data types, complete coverage of the bookstore domain |
| Normalization | 25 | Proper 3NF design, clear explanation, no redundancy, junction tables for M:N relationships |
| Constraints | 20 | Correct PKs, FKs, NOT NULL, UNIQUE, CHECK, DEFAULT; appropriate ON DELETE/ON UPDATE actions |
| Sample Data | 10 | Sufficient, realistic data that satisfies all constraints and demonstrates relationships |
| ERD Clarity | 10 | Clear, readable diagram showing all entities, attributes, and cardinality |

## Tips

- **Start with the ERD.** Sketch your tables and relationships on paper before writing SQL.
- **Think in nouns and verbs.** Nouns → entities; verbs → relationships.
- **Junction tables** are the key to M:N relationships. Each junction table needs a composite primary key (or its own surrogate key plus a UNIQUE constraint on the pair).
- **ON DELETE choices:** Use `CASCADE` for dependent data (e.g., deleting an order deletes its items), `SET NULL` for optional references, and `RESTRICT` when deletion should be blocked.
- **Test your SQL.** Run `source bookstore_db.sql` in MySQL to verify it executes without errors.
- **3NF checklist:** After designing, verify that no table has a column that depends on only part of the primary key (2NF) or depends on another non-key column (3NF).
- Review Session 6 lecture slides on ER modeling and normalization before starting.
