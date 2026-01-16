# 🟦 BUỔI 02
# **PROGRAMMING PHP - BIẾN, KIỂU DỮ LIỆU, TOÁN TỬ**

Hôm nay chúng ta sẽ học cách lưu trữ và xử lý dữ liệu trong PHP - nền tảng quan trọng nhất của lập trình!

---

# 📌 THÔNG TIN BUỔI HỌC

```
📅 Thời gian: 3 giờ (Lý thuyết: 1.5 giờ, Thực hành: 1.5 giờ)
📚 Tài liệu: Chapter 2 - PHP & MySQL Web Development
🎯 Mục tiêu:
   - Khai báo và sử dụng biến
   - Hiểu các kiểu dữ liệu
   - Sử dụng toán tử
   - Viết cấu trúc điều khiển

📖 Chuẩn bị: Hoàn thành bài tập Buổi 01
🔗 Learning Outcomes: LO1
```

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi này, bạn sẽ:

- **Khai báo biến** đúng cách trong PHP
- **Phân biệt** các kiểu dữ liệu
- **Sử dụng** các loại toán tử
- **Viết** cấu trúc điều khiển if-else, switch
- **Tạo** vòng lặp for, while, foreach

---

# LÝ THUYẾT

## 1. BIẾN TRONG PHP

### 1.1 Biến Là Gì?

**Biến** = Hộp chứa dữ liệu, có thể thay đổi giá trị trong quá trình chạy chương trình.

### 🎒 Ví dụ đời sống

Biến giống như **hộp đựng đồ có dán nhãn**:
- Nhãn = Tên biến (`$name`)
- Đồ bên trong = Giá trị (`"Nguyễn Văn A"`)
- Bạn có thể thay đồ bên trong bất cứ lúc nào

### 1.2 Quy Tắc Đặt Tên Biến

```php
<?php
// ✅ Đúng
$name = "John";           // Chữ thường
$userName = "john123";    // camelCase (khuyến nghị)
$user_name = "john123";   // snake_case
$_private = "secret";     // Bắt đầu bằng _
$name2 = "Jane";          // Có số (không ở đầu)

// ❌ Sai
$2name = "Error";         // Bắt đầu bằng số
$user-name = "Error";     // Có dấu gạch ngang
$user name = "Error";     // Có khoảng trắng
?>
```

### 📋 Quy tắc:
| Quy tắc | Ví dụ |
|---------|-------|
| Bắt đầu bằng `$` | `$name` |
| Tiếp theo là chữ hoặc `_` | `$_name`, `$name` |
| Có thể chứa số (không ở đầu) | `$name1` |
| Phân biệt HOA/thường | `$Name` ≠ `$name` |

### 1.3 Khai Báo Biến

```php
<?php
// Khai báo và gán giá trị
$name = "Nguyễn Văn A";
$age = 20;
$gpa = 3.5;
$isStudent = true;

// In ra màn hình
echo "Tên: $name<br>";
echo "Tuổi: $age<br>";
echo "GPA: $gpa<br>";
echo "Là sinh viên: " . ($isStudent ? "Có" : "Không");
?>
```

---

## 2. KIỂU DỮ LIỆU

### 2.1 Các Kiểu Dữ Liệu Cơ Bản

| Kiểu | Mô tả | Ví dụ |
|------|-------|-------|
| **String** | Chuỗi ký tự | `"Hello"`, `'World'` |
| **Integer** | Số nguyên | `42`, `-10`, `0` |
| **Float** | Số thực | `3.14`, `-2.5` |
| **Boolean** | Đúng/Sai | `true`, `false` |
| **Array** | Mảng | `[1, 2, 3]` |
| **NULL** | Không có giá trị | `null` |

### 2.2 String (Chuỗi)

```php
<?php
// Ngoặc đơn - Literal string
$str1 = 'Hello World';
$str1 = 'Hello $name';  // Output: Hello $name (không parse biến)

// Ngoặc kép - Parsed string
$name = "John";
$str2 = "Hello $name";  // Output: Hello John (parse biến)
$str3 = "Hello {$name}!"; // Output: Hello John!

// Nối chuỗi với dấu chấm (.)
$greeting = "Xin chào, " . $name . "!";

// Heredoc - Chuỗi nhiều dòng
$html = <<<HTML
<div>
    <h1>Hello $name</h1>
    <p>Welcome!</p>
</div>
HTML;

// Các hàm string phổ biến
echo strlen("Hello");        // 5 - Độ dài
echo strtoupper("hello");    // HELLO - In hoa
echo strtolower("HELLO");    // hello - In thường
echo substr("Hello", 0, 3);  // Hel - Cắt chuỗi
echo str_replace("o", "0", "Hello"); // Hell0 - Thay thế
?>
```

### 2.3 Integer & Float

```php
<?php
// Integer (Số nguyên)
$int1 = 42;
$int2 = -10;
$int3 = 0;

// Float (Số thực)
$float1 = 3.14;
$float2 = -2.5;
$float3 = 1.5e3;  // 1500 (ký hiệu khoa học)

// Kiểm tra kiểu
var_dump($int1);   // int(42)
var_dump($float1); // float(3.14)

// Ép kiểu
$str = "123";
$num = (int) $str;     // 123
$num = intval($str);   // 123

// Hàm toán học
echo abs(-5);          // 5 - Giá trị tuyệt đối
echo round(3.7);       // 4 - Làm tròn
echo ceil(3.2);        // 4 - Làm tròn lên
echo floor(3.8);       // 3 - Làm tròn xuống
echo max(1, 5, 3);     // 5 - Giá trị lớn nhất
echo min(1, 5, 3);     // 1 - Giá trị nhỏ nhất
echo rand(1, 100);     // Số ngẫu nhiên 1-100
?>
```

### 2.4 Boolean

```php
<?php
$isActive = true;
$isDeleted = false;

// Các giá trị được coi là FALSE:
// - false
// - 0 (integer)
// - 0.0 (float)
// - "" (chuỗi rỗng)
// - "0" (chuỗi "0")
// - [] (mảng rỗng)
// - null

// Kiểm tra
if ($isActive) {
    echo "Tài khoản đang hoạt động";
}
?>
```

### 2.5 Array (Mảng)

```php
<?php
// Mảng indexed (chỉ số)
$fruits = ["Apple", "Banana", "Orange"];
$fruits = array("Apple", "Banana", "Orange"); // Cách cũ

echo $fruits[0];  // Apple
echo $fruits[1];  // Banana

// Mảng associative (key-value)
$student = [
    "name" => "Nguyễn Văn A",
    "age" => 20,
    "gpa" => 3.5
];

echo $student["name"];  // Nguyễn Văn A

// Mảng đa chiều
$students = [
    ["name" => "A", "score" => 85],
    ["name" => "B", "score" => 90],
    ["name" => "C", "score" => 78]
];

echo $students[0]["name"];  // A

// Hàm mảng phổ biến
$arr = [3, 1, 4, 1, 5];
echo count($arr);           // 5 - Đếm phần tử
sort($arr);                 // Sắp xếp tăng dần
rsort($arr);                // Sắp xếp giảm dần
print_r($arr);              // In mảng
array_push($arr, 9);        // Thêm cuối
array_pop($arr);            // Xóa cuối
in_array(4, $arr);          // true - Kiểm tra tồn tại
?>
```

---

## 3. TOÁN TỬ

### 3.1 Toán Tử Số Học

```php
<?php
$a = 10;
$b = 3;

echo $a + $b;   // 13 - Cộng
echo $a - $b;   // 7  - Trừ
echo $a * $b;   // 30 - Nhân
echo $a / $b;   // 3.333... - Chia
echo $a % $b;   // 1  - Chia lấy dư
echo $a ** $b;  // 1000 - Lũy thừa (10^3)
?>
```

### 3.2 Toán Tử Gán

```php
<?php
$x = 10;

$x += 5;   // $x = $x + 5  → 15
$x -= 3;   // $x = $x - 3  → 12
$x *= 2;   // $x = $x * 2  → 24
$x /= 4;   // $x = $x / 4  → 6
$x %= 4;   // $x = $x % 4  → 2
$x .= "!"; // $x = $x . "!" → "2!"
?>
```

### 3.3 Toán Tử So Sánh

```php
<?php
$a = 5;
$b = "5";

// So sánh giá trị
$a == $b;    // true (5 == "5")
$a != $b;    // false

// So sánh giá trị VÀ kiểu
$a === $b;   // false (int !== string)
$a !== $b;   // true

// So sánh lớn/nhỏ
$a > 3;      // true
$a < 3;      // false
$a >= 5;     // true
$a <= 5;     // true

// Spaceship operator (PHP 7+)
1 <=> 2;     // -1 (1 < 2)
2 <=> 2;     // 0  (2 == 2)
3 <=> 2;     // 1  (3 > 2)
?>
```

### 3.4 Toán Tử Logic

```php
<?php
$a = true;
$b = false;

// AND - Cả hai đều true
$a && $b;    // false
$a and $b;   // false

// OR - Một trong hai true
$a || $b;    // true
$a or $b;    // true

// NOT - Đảo ngược
!$a;         // false
!$b;         // true

// XOR - Chỉ một true
$a xor $b;   // true
?>
```

### 3.5 Toán Tử Tăng/Giảm

```php
<?php
$x = 5;

// Pre-increment/decrement (tăng/giảm trước, dùng sau)
echo ++$x;  // 6 (tăng x lên 6, rồi in 6)
echo --$x;  // 5 (giảm x xuống 5, rồi in 5)

// Post-increment/decrement (dùng trước, tăng/giảm sau)
echo $x++;  // 5 (in 5, rồi tăng x lên 6)
echo $x--;  // 6 (in 6, rồi giảm x xuống 5)
?>
```

---

## 4. CẤU TRÚC ĐIỀU KHIỂN

### 4.1 If-Else

```php
<?php
$score = 75;

// If đơn giản
if ($score >= 50) {
    echo "Đậu";
}

// If-else
if ($score >= 50) {
    echo "Đậu";
} else {
    echo "Rớt";
}

// If-elseif-else
if ($score >= 90) {
    echo "Xuất sắc";
} elseif ($score >= 80) {
    echo "Giỏi";
} elseif ($score >= 70) {
    echo "Khá";
} elseif ($score >= 50) {
    echo "Trung bình";
} else {
    echo "Yếu";
}

// Toán tử 3 ngôi (Ternary)
$result = ($score >= 50) ? "Đậu" : "Rớt";
echo $result;

// Null coalescing (PHP 7+)
$name = $_GET['name'] ?? 'Guest';  // Nếu không có, dùng 'Guest'
?>
```

### 4.2 Switch

```php
<?php
$day = date("l");  // Lấy tên ngày trong tuần

switch ($day) {
    case "Monday":
        echo "Thứ Hai - Bắt đầu tuần mới!";
        break;
    case "Tuesday":
        echo "Thứ Ba";
        break;
    case "Wednesday":
        echo "Thứ Tư - Giữa tuần";
        break;
    case "Thursday":
        echo "Thứ Năm";
        break;
    case "Friday":
        echo "Thứ Sáu - Sắp cuối tuần!";
        break;
    case "Saturday":
    case "Sunday":
        echo "Cuối tuần - Nghỉ ngơi!";
        break;
    default:
        echo "Ngày không hợp lệ";
}
?>
```

### 4.3 Vòng Lặp For

```php
<?php
// For cơ bản
for ($i = 1; $i <= 5; $i++) {
    echo "Lần $i<br>";
}

// For với mảng
$fruits = ["Apple", "Banana", "Orange"];
for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}

// Bảng cửu chương
echo "<table border='1'>";
for ($i = 1; $i <= 10; $i++) {
    echo "<tr>";
    for ($j = 1; $j <= 10; $j++) {
        echo "<td>" . ($i * $j) . "</td>";
    }
    echo "</tr>";
}
echo "</table>";
?>
```

### 4.4 Vòng Lặp While

```php
<?php
// While
$count = 1;
while ($count <= 5) {
    echo "Count: $count<br>";
    $count++;
}

// Do-while (chạy ít nhất 1 lần)
$num = 1;
do {
    echo "Number: $num<br>";
    $num++;
} while ($num <= 5);
?>
```

### 4.5 Vòng Lặp Foreach

```php
<?php
// Foreach với mảng indexed
$colors = ["Red", "Green", "Blue"];
foreach ($colors as $color) {
    echo "$color<br>";
}

// Foreach với mảng associative
$student = [
    "name" => "Nguyễn Văn A",
    "age" => 20,
    "gpa" => 3.5
];

foreach ($student as $key => $value) {
    echo "$key: $value<br>";
}

// Foreach với mảng đa chiều
$students = [
    ["name" => "A", "score" => 85],
    ["name" => "B", "score" => 90]
];

foreach ($students as $index => $s) {
    echo ($index + 1) . ". {$s['name']}: {$s['score']} điểm<br>";
}
?>
```

---

## 5. HÀM (FUNCTIONS)

### 5.1 Hàm Cơ Bản

```php
<?php
// Khai báo hàm
function sayHello() {
    echo "Hello World!";
}

// Gọi hàm
sayHello();

// Hàm có tham số
function greet($name) {
    echo "Hello, $name!";
}
greet("John");

// Hàm có giá trị mặc định
function greetWithDefault($name = "Guest") {
    echo "Hello, $name!";
}
greetWithDefault();      // Hello, Guest!
greetWithDefault("Jane"); // Hello, Jane!

// Hàm trả về giá trị
function add($a, $b) {
    return $a + $b;
}
$sum = add(5, 3);  // 8
?>
```

### 5.2 Hàm Với Type Hints (PHP 7+)

```php
<?php
// Type hints cho tham số và return
function calculateArea(float $width, float $height): float {
    return $width * $height;
}

$area = calculateArea(5.5, 3.2);  // 17.6

// Nullable types
function findUser(?int $id): ?string {
    if ($id === null) {
        return null;
    }
    return "User $id";
}
?>
```

---

# VÍ DỤ MINH HỌA

## Ví Dụ 1: Tính Điểm Trung Bình

```php
<?php
// Tính điểm trung bình và xếp loại

$math = 8.5;
$physics = 7.0;
$chemistry = 9.0;

// Tính trung bình
$average = ($math + $physics + $chemistry) / 3;
$average = round($average, 2);  // Làm tròn 2 chữ số

// Xếp loại
if ($average >= 9) {
    $grade = "Xuất sắc";
} elseif ($average >= 8) {
    $grade = "Giỏi";
} elseif ($average >= 7) {
    $grade = "Khá";
} elseif ($average >= 5) {
    $grade = "Trung bình";
} else {
    $grade = "Yếu";
}

echo "Điểm trung bình: $average<br>";
echo "Xếp loại: $grade";
?>
```

## Ví Dụ 2: Danh Sách Sinh Viên

```php
<?php
$students = [
    ["name" => "Nguyễn Văn A", "score" => 85, "class" => "CNTT1"],
    ["name" => "Trần Thị B", "score" => 92, "class" => "CNTT1"],
    ["name" => "Lê Văn C", "score" => 78, "class" => "CNTT2"],
    ["name" => "Phạm Thị D", "score" => 95, "class" => "CNTT2"],
];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Danh Sách Sinh Viên</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #4CAF50; color: white; }
        tr:nth-child(even) { background: #f2f2f2; }
        .high { color: green; font-weight: bold; }
        .low { color: red; }
    </style>
</head>
<body>
    <h1>📋 Danh Sách Sinh Viên</h1>
    
    <table>
        <tr>
            <th>STT</th>
            <th>Họ Tên</th>
            <th>Lớp</th>
            <th>Điểm</th>
            <th>Xếp Loại</th>
        </tr>
        
        <?php foreach ($students as $index => $student): ?>
        <tr>
            <td><?= $index + 1 ?></td>
            <td><?= $student['name'] ?></td>
            <td><?= $student['class'] ?></td>
            <td class="<?= $student['score'] >= 90 ? 'high' : ($student['score'] < 80 ? 'low' : '') ?>">
                <?= $student['score'] ?>
            </td>
            <td>
                <?php
                if ($student['score'] >= 90) echo "Xuất sắc";
                elseif ($student['score'] >= 80) echo "Giỏi";
                elseif ($student['score'] >= 70) echo "Khá";
                else echo "Trung bình";
                ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <p><strong>Tổng số sinh viên:</strong> <?= count($students) ?></p>
</body>
</html>
```

---

# THỰC HÀNH

## BÀI 1: Máy Tính BMI

🎯 **Mục tiêu:** Tính chỉ số BMI và đưa ra đánh giá

📝 **Yêu cầu:**
- Khai báo biến chiều cao (m) và cân nặng (kg)
- Tính BMI = cân nặng / (chiều cao)²
- Đánh giá: Gầy (<18.5), Bình thường (18.5-24.9), Thừa cân (25-29.9), Béo phì (>=30)

```php
<?php
// TODO: Hoàn thành code
$height = 1.70;  // mét
$weight = 65;    // kg

// Tính BMI

// Đánh giá

// Hiển thị kết quả
?>
```

---

## BÀI 2: In Bảng Cửu Chương

🎯 **Mục tiêu:** Sử dụng vòng lặp lồng nhau

📝 **Yêu cầu:**
- In bảng cửu chương từ 2 đến 9
- Có định dạng HTML table đẹp

---

## BÀI 3: Tìm Số Nguyên Tố (Challenge)

🎯 **Mục tiêu:** Viết hàm kiểm tra số nguyên tố

📝 **Yêu cầu:**
- Viết hàm `isPrime($n)` trả về true/false
- In ra các số nguyên tố từ 1 đến 100

---

# ✅ KIẾN THỨC CẦN ĐẠT

### Lý Thuyết
- [ ] Hiểu cách khai báo biến
- [ ] Phân biệt các kiểu dữ liệu
- [ ] Sử dụng được các toán tử

### Thực Hành
- [ ] Viết được if-else, switch
- [ ] Viết được vòng lặp for, while, foreach
- [ ] Viết được hàm cơ bản

---

# 📋 PHIẾU HỌC TẬP BUỔI 02

**Họ Tên:** ___________________    **MSSV:** ___________

## A. Trắc Nghiệm

1. Biến nào đúng cú pháp?
   - A) `$2name`
   - B) `$_name`
   - C) `$user-name`
   - D) `name`

2. `5 == "5"` trả về?
   - A) true
   - B) false
   - C) Error
   - D) null

3. `5 === "5"` trả về?
   - A) true
   - B) false
   - C) Error
   - D) null

## B. Tự Luận

1. Viết code kiểm tra một số có phải số chẵn không?

2. Viết vòng lặp in số từ 10 đến 1 (đếm ngược)?

## C. Bài Tập Thực Hành

- [ ] Hoàn thành Bài 1: BMI Calculator
- [ ] Hoàn thành Bài 2: Bảng cửu chương
- [ ] Hoàn thành Bài 3: Số nguyên tố (Bonus)

---

# 🔗 CHUẨN BỊ BUỔI 03

**Buổi tiếp theo:** Dynamic Websites - Form Handling

### Sẽ học:
- HTML Form
- GET vs POST
- Xử lý dữ liệu form
- Validation

---

**Chương tiếp theo: [Buổi 03 - Dynamic Websites →](./buoi_03_dynamic_websites.md)**
