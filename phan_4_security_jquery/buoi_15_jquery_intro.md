# 🟧 BUỔI 15
# **JQUERY INTRODUCTION - GIỚI THIỆU JQUERY**

Buổi cuối cùng! Hôm nay chúng ta sẽ học jQuery để tăng tính tương tác cho ứng dụng web!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ
🎯 Mục tiêu:
   - Hiểu jQuery là gì
   - DOM Manipulation
   - Event Handling
   - AJAX với jQuery

🔗 Learning Outcomes: LO8
```

---

# LÝ THUYẾT

## 1. JQUERY LÀ GÌ?

**jQuery** = Thư viện JavaScript giúp thao tác DOM, xử lý events và AJAX dễ dàng hơn.

### 1.1 Cài Đặt

```html
<!-- CDN -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Local -->
<script src="js/jquery.min.js"></script>
```

### 1.2 Document Ready

```javascript
// Cách 1: Full syntax
$(document).ready(function() {
    // Code ở đây chạy sau khi DOM loaded
});

// Cách 2: Shorthand
$(function() {
    // Code ở đây
});
```

---

## 2. SELECTORS

```javascript
// ID selector
$('#myId')

// Class selector
$('.myClass')

// Element selector
$('div')
$('p')

// Attribute selector
$('input[type="text"]')
$('a[href^="https"]')

// Multiple selectors
$('h1, h2, h3')

// Descendant selector
$('div p')

// Child selector
$('ul > li')

// First, Last
$('li:first')
$('li:last')

// Even, Odd
$('tr:even')
$('tr:odd')
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

// Set multiple CSS
$('#element').css({
    'color': 'red',
    'font-size': '20px',
    'background': '#f0f0f0'
});
```

### 3.4 Add/Remove Elements

```javascript
// Append (thêm vào cuối)
$('#list').append('<li>New item</li>');

// Prepend (thêm vào đầu)
$('#list').prepend('<li>First item</li>');

// After (thêm sau element)
$('#element').after('<p>After text</p>');

// Before (thêm trước element)
$('#element').before('<p>Before text</p>');

// Remove
$('#element').remove();

// Empty (xóa nội dung)
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

// Keyup/Keydown
$('input').keyup(function() {
    var value = $(this).val();
    console.log('Typing: ' + value);
});
```

### 4.2 Event Delegation

```javascript
// Cho elements được thêm động
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

### 6.1 $.ajax()

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

### 6.2 $.get() và $.post()

```javascript
// GET request
$.get('api/users.php', { id: 1 }, function(data) {
    console.log(data);
});

// POST request
$.post('api/users.php', { name: 'John', email: 'john@email.com' }, function(data) {
    console.log(data);
});
```

### 6.3 $.getJSON()

```javascript
$.getJSON('api/products.php', function(data) {
    $.each(data, function(index, product) {
        $('#products').append('<li>' + product.name + '</li>');
    });
});
```

### 6.4 AJAX với Form

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

## 7. VÍ DỤ THỰC TẾ

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
    });
});
</script>
```

### 7.2 CRUD với AJAX

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

# THỰC HÀNH

## BÀI 1: Interactive UI

📝 **Yêu cầu:**
- Accordion menu
- Tab navigation
- Modal popup

## BÀI 2: AJAX CRUD

📝 **Yêu cầu:**
- Load products với AJAX
- Add product không reload
- Delete với confirmation
- Live search

---

# ✅ KIẾN THỨC CẦN ĐẠT

- [ ] Sử dụng jQuery selectors
- [ ] DOM manipulation
- [ ] Event handling
- [ ] AJAX requests

---

# 🎉 TỔNG KẾT KHÓA HỌC

Chúc mừng bạn đã hoàn thành khóa học **INS3064 - Multimedia Design & Web Development**!

## Bạn Đã Học Được:

✅ PHP cơ bản đến nâng cao  
✅ MySQL và SQL  
✅ Kết nối PHP với MySQL  
✅ Xây dựng ứng dụng CRUD  
✅ Hệ thống đăng nhập  
✅ Bảo mật ứng dụng web  
✅ jQuery và AJAX  

## Tiếp Theo:

- Học Framework: Laravel, CodeIgniter
- Học JavaScript nâng cao: React, Vue
- Học về API: RESTful, GraphQL
- DevOps: Docker, CI/CD

**Chúc bạn thành công trong sự nghiệp Web Developer! 🚀**
