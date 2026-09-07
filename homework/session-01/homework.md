# Homework 1: Introduction to PHP

> **Due:** Sunday 23:59 via LMS | **File:** `portfolio.php`

## How to Submit
1. Save your file as `portfolio.php`
2. Test it in browser via `http://localhost/INS3064/session01/portfolio.php`
3. Compress the file into a `.zip` named `homework01.zip`
4. Upload the `.zip` to LMS before the deadline (Sunday 23:59)

## Overview

In this assignment you will create a **personal portfolio page** using PHP embedded in HTML. This is your first hands-on exercise with PHP — you will practice embedding PHP code inside HTML, using variables, the `echo` construct, and the built-in `date()` function. The result should be a single, self-contained PHP page that introduces who you are to the world.

## Requirements

### Functional Requirements

- Display your **personal information**: full name, student ID, a short bio (2–3 sentences), and a profile photo placeholder.
- Display your **education history** (at least 2 entries — e.g., high school, university).
- Display a list of **technical skills** (at least 4) with a simple self-assessed proficiency level (e.g., Beginner / Intermediate / Advanced).
- Display your **hobbies / interests** (at least 3).
- Include a **"Last updated"** timestamp at the bottom of the page generated dynamically using PHP's `date()` function (format: `d M Y, H:i`).
- Use **PHP variables** to store all personal data and **`echo`** (or `<?= ?>` shorthand) to output them into the HTML.

### Technical Requirements

- Deliver a **single file** named `portfolio.php`.
- The page must be valid HTML5 with a proper `<!DOCTYPE html>` declaration.
- Include **inline or embedded CSS** (inside a `<style>` block) to style the page — at minimum: a readable font, colored headings, card-style sections, and a consistent color scheme.
- Use **PHP string concatenation** or **variable interpolation** in at least two places.
- The page must render correctly when served by a local PHP server (e.g., `php -S localhost:8000`).
- No external CSS frameworks (Bootstrap, Tailwind, etc.) — write your own CSS.

## Deliverables

| File | Description |
|------|-------------|
| `portfolio.php` | Single PHP file containing HTML structure, embedded PHP for dynamic content, and embedded CSS styling. |

## Grading Rubric

| Criteria | Points | Description |
|----------|--------|-------------|
| **Functionality** | 40% | All required sections are present, PHP variables are used for data, `date()` outputs a dynamic timestamp, and the page renders without errors. |
| **Code Quality** | 30% | Clean, well-indented code; meaningful variable names; proper PHP opening/closing tags; comments explaining major sections. |
| **Design & Styling** | 15% | Visually appealing layout with consistent colors, readable typography, and well-spaced card sections. |
| **Creativity** | 15% | Personal touches such as custom color themes, icons (using emoji or Unicode), a creative layout, or additional sections beyond the minimum. |

## Tips

- Start by writing the HTML skeleton first, then add PHP variables one section at a time.
- Use `<?php echo $variable; ?>` or the shorthand `<?= $variable ?>` to output PHP values inside HTML.
- Test frequently: run `php -S localhost:8000` in your project folder and view the page in a browser.
- Keep all data in PHP variables at the top of the file — this makes the code easier to read and modify.
- Example of `date()` usage:
  ```php
  <p>Last updated: <?= date('d M Y, H:i') ?></p>
  ```
- Use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`) for better structure.

## Resources

- [PHP Manual — echo](https://www.php.net/manual/en/function.echo.php)
- [PHP Manual — date()](https://www.php.net/manual/en/function.date.php)
- [W3Schools — PHP Syntax](https://www.w3schools.com/php/php_syntax.asp)
- [MDN — HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
