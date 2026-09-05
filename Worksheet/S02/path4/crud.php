<?php
// Sample multi-dimensional array of students
$students = [
    ['name' => 'A', 'grade' => 90],
    ['name' => 'B', 'grade' => 85],
    ['name' => 'C', 'grade' => 78],
    ['name' => 'D', 'grade' => 92],
];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student List</title>
    <style>
        table {
            width: 50%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h2>Student List</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Grade</th>
        </tr>
        <?php foreach ($students as $student): ?>
        <tr>
            <td><?php echo htmlspecialchars($student['name']); ?></td>
            <td><?php echo htmlspecialchars($student['grade']); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>