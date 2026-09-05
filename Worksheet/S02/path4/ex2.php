<?php
$students = [
    ['name' => 'Alice', 'grade' => 90],
    ['name' => 'Bob', 'grade' => 85],
    ['name' => 'Charlie', 'grade' => 92],
    ['name' => 'Diana', 'grade' => 88]
];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student List</title>
</head>
<body>
    <h1>Student List</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Name</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($students as $student): ?>
                <tr>
                    <td><?php echo $student['name']; ?></td>
                    <td><?php echo $student['grade']; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>