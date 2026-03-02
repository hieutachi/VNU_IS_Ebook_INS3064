# 🟧 SESSION 15
# **JQUERY INTRODUCTION**

In this final session, we will learn **jQuery** – a JavaScript library that makes DOM manipulation, event handling, and AJAX much easier.

---

## 📌 SESSION INFORMATION

```
📅 Time: 3 hours (Theory: 1.5 hours, Practice: 1.5 hours)
📚 Reference: Chapter 15 - PHP & MySQL Web Development
🎯 Session Objectives:
   - Understand jQuery basics
   - Manipulate DOM elements
   - Handle events
   - Make AJAX requests

🔗 Links to Learning Outcomes: LO8
```

---

## 🎯 LEARNING OBJECTIVES

After this session, you will be able to:

- Understand **jQuery basics**
- **Manipulate DOM elements** with jQuery
- **Handle events** (click, submit, etc.)
- Make **AJAX requests** to PHP backend
- Enhance web page interactivity

---

# THEORY

## 1. WHAT IS JQUERY?

**jQuery** = A JavaScript library that simplifies DOM manipulation, event handling, and AJAX.

### 1.1 Installation

```html
<!-- CDN -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Local -->
<script src="js/jquery.min.js"></script>
```

### 1.2 Document Ready

```javascript
// Full syntax
$(document).ready(function() {
    // Code runs after DOM is loaded
});

// Shorthand
$(function() {
    // Code here
});
```

---

## 2. SELECTORS

```javascript
// ID selector
$('#myId');

// Class selector
$('.myClass');

// Element selector
$('div');
$('p');

// Attribute selector
$('input[type="text"]');
$('a[href^="https"]');

// Multiple selectors
$('h1, h2, h3');

// Descendant selector
$('div p');

// Child selector
$('ul > li');

// First, Last
$('li:first');
$('li:last');

// Even, Odd
$('tr:even');
$('tr:odd');
```

---

## 3. DOM MANIPULATION

### 3.1 Get/Set Content

```javascript
// Get text
var text = $('#element').text();

// Set text
$('#element').text('New text');

// Get HTML
var html = $('#element').html();

// Set HTML
$('#element').html('<strong>Bold text</strong>');

// Get value (input)
var value = $('#input').val();

// Set value
$('#input').val('New value');
```

### 3.2 Attributes

```javascript
// Get attribute
var href = $('a').attr('href');

// Set attribute
$('a').attr('href', 'https://google.com');

// Remove attribute
$('a').removeAttr('target');

// Add/Remove/Toggle class
$('#element').addClass('active');
$('#element').removeClass('active');
$('#element').toggleClass('active');

// Check class
if ($('#element').hasClass('active')) {
    // ...
}
```

### 3.3 CSS

```javascript
// Get CSS property
var color = $('#element').css('color');

// Set CSS property
$('#element').css('color', 'red');

// Set multiple CSS properties
$('#element').css({
    'color': 'red',
    'font-size': '20px',
    'background': '#f0f0f0'
});
```

### 3.4 Add/Remove Elements

```javascript
// Append (add to end)
$('#list').append('<li>New item</li>');

// Prepend (add to beginning)
$('#list').prepend('<li>First item</li>');

// After (add after element)
$('#element').after('<p>After text</p>');

// Before (add before element)
$('#element').before('<p>Before text</p>');

// Remove
$('#element').remove();

// Empty (remove content)
$('#element').empty();
```

---

## 4. EVENTS

### 4.1 Common Events

```javascript
// Click
$('#button').click(function() {
    alert('Clicked!');
});

// Double click
$('#element').dblclick(function() {
    // ...
});

// Mouse events
$('#element').mouseenter(function() {
    $(this).css('background', 'yellow');
});

$('#element').mouseleave(function() {
    $(this).css('background', 'white');
});

// Hover (mouseenter + mouseleave)
$('#element').hover(
    function() { $(this).addClass('hover'); },
    function() { $(this).removeClass('hover'); }
);

// Focus/Blur
$('input').focus(function() {
    $(this).css('border-color', 'blue');
});

$('input').blur(function() {
    $(this).css('border-color', 'gray');
});

// Change (select, checkbox, radio)
$('select').change(function() {
    var value = $(this).val();
    console.log('Selected: ' + value);
});

// Submit
$('form').submit(function(e) {
    e.preventDefault();
    // Handle form...
});

// Keyup
$('input').keyup(function() {
    var value = $(this).val();
    console.log('Typing: ' + value);
});
```

### 4.2 Event Delegation

```javascript
// For elements added dynamically
$(document).on('click', '.dynamic-button', function() {
    alert('Dynamic button clicked!');
});
```

---

## 5. EFFECTS

```javascript
// Hide/Show
$('#element').hide();
$('#element').show();
$('#element').toggle();

// Fade
$('#element').fadeIn();
$('#element').fadeOut();
$('#element').fadeToggle();
$('#element').fadeTo('slow', 0.5);

// Slide
$('#element').slideDown();
$('#element').slideUp();
$('#element').slideToggle();

// Animate
$('#element').animate({
    'width': '300px',
    'height': '200px',
    'opacity': 0.5
}, 1000);

// Chain animations
$('#element')
    .fadeOut(500)
    .fadeIn(500)
    .slideUp(500)
    .slideDown(500);
```

---

## 6. AJAX

### 6.1 `$.ajax()`

```javascript
$.ajax({
    url: 'api/users.php',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log(data);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});
```

### 6.2 `$.get()` and `$.post()`

```javascript
// GET request
$.get('api/users.php', { id: 1 }, function(data) {
    console.log(data);
});

// POST request
$.post('api/users.php', { name: 'John', email: 'john@example.com' }, function(data) {
    console.log(data);
});
```

### 6.3 `$.getJSON()`

```javascript
$.getJSON('api/products.php', function(data) {
    $.each(data, function(index, product) {
        $('#products').append('<li>' + product.name + '</li>');
    });
});
```

### 6.4 AJAX with Form

```javascript
$('#myForm').submit(function(e) {
    e.preventDefault();
    
    $.ajax({
        url: $(this).attr('action'),
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
            $('#submit-btn').prop('disabled', true).text('Loading...');
        },
        success: function(response) {
            if (response.success) {
                alert('Success!');
                $('#myForm')[0].reset();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function() {
            alert('Request failed');
        },
        complete: function() {
            $('#submit-btn').prop('disabled', false).text('Submit');
        }
    });
});
```

---

## 7. REAL-WORLD EXAMPLES

### 7.1 Live Search

```html
<input type="text" id="search" placeholder="Search products...">
<div id="results"></div>

<script>
$('#search').keyup(function() {
    var query = $(this).val();
    
    if (query.length < 2) {
        $('#results').empty();
        return;
    }
    
    $.get('api/search.php', { q: query }, function(data) {
        var html = '';
        $.each(data, function(i, item) {
            html += '<div class="result-item">' + item.name + '</div>';
        });
        $('#results').html(html);
    }, 'json');
});
</script>
```

### 7.2 AJAX CRUD

```javascript
// Create
$('#createForm').submit(function(e) {
    e.preventDefault();
    $.post('api/products.php', $(this).serialize(), function(response) {
        if (response.success) {
            location.reload();
        }
    }, 'json');
});

// Delete
$(document).on('click', '.delete-btn', function() {
    if (!confirm('Delete this item?')) return;
    
    var id = $(this).data('id');
    $.ajax({
        url: 'api/products.php?id=' + id,
        method: 'DELETE',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                $('#product-' + id).fadeOut(function() {
                    $(this).remove();
                });
            }
        }
    });
});
```

### 7.3 PHP API Endpoint

```php
<?php
// api/products.php
header('Content-Type: application/json');

require_once '../classes/Database.php';
$db = Database::getInstance();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $product = $db->fetch("SELECT * FROM products WHERE id = ?", [$_GET['id']]);
            echo json_encode($product);
        } else {
            $products = $db->fetchAll("SELECT * FROM products");
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        $name = $_POST['name'] ?? '';
        $price = $_POST['price'] ?? 0;
        
        $db->query("INSERT INTO products (name, price) VALUES (?, ?)", [$name, $price]);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? 0;
        $db->query("DELETE FROM products WHERE id = ?", [$id]);
        echo json_encode(['success' => true]);
        break;
}
?>
```

---

# PRACTICE

## EXERCISE 1: Interactive UI

📝 **Requirements:**
- Accordion menu
- Tab navigation
- Modal popup using jQuery

## EXERCISE 2: AJAX CRUD

📝 **Requirements:**
- Load products with AJAX
- Add product without reloading page
- Delete product with confirmation
- Implement live search

---

# ✅ KEY TAKEAWAYS

- [ ] Use jQuery selectors effectively
- [ ] Manipulate DOM elements
- [ ] Handle user events
- [ ] Perform AJAX requests with jQuery

---

**Previous: [Session 14 - Security Methods ←](./session_14_security_methods.md)**

---

## 🎉 COURSE WRAP-UP

Congratulations on completing the course **INS3064 – Multimedia Design & Web Development**!

You have learned:

- ✅ PHP from basic to advanced  
- ✅ MySQL and SQL  
- ✅ Connecting PHP with MySQL  
- ✅ Building CRUD applications  
- ✅ Authentication systems with sessions  
- ✅ Securing web applications  
- ✅ jQuery and AJAX for interactivity  

Next steps:

- Learn a PHP framework (Laravel, CodeIgniter)
- Learn modern JavaScript (React, Vue)
- Explore APIs (RESTful, GraphQL)
- Practice DevOps basics (Docker, CI/CD)

**Good luck on your journey to become a Web Developer! 🚀**
