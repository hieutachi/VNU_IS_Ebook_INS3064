<?php
/**
 * register.php — User registration form.
 *
 * KEY PATTERNS DEMONSTRATED:
 *   1. CSRF token in form, verified on POST
 *   2. Server-side validation (name, email, password strength)
 *   3. password_hash() to securely hash the password before storing
 *   4. Prepared statement with bound parameters for INSERT
 *   5. Check for duplicate email before inserting
 *   6. POST → Redirect → GET (PRG) after successful registration
 */

$pageTitle = 'Register';
require_once __DIR__ . '/includes/header.php';

// ─── Redirect if already logged in ────────────────────────────
if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}

$errors = [];

// ─── Handle registration form submission ──────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Step 1: Verify CSRF token
    verifyToken($_POST['csrf_token'] ?? '');

    // Step 2: Collect and trim input
    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['password_confirm'] ?? '';

    // Step 3: Validate
    if ($name === '' || mb_strlen($name) > 100) {
        $errors[] = 'Name is required (max 100 characters).';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'A valid email address is required.';
    }
    if (mb_strlen($password) < 6) {
        $errors[] = 'Password must be at least 6 characters.';
    }
    if ($password !== $confirm) {
        $errors[] = 'Passwords do not match.';
    }

    // Step 4: Check for duplicate email (prepared statement)
    if (empty($errors)) {
        try {
            $pdo  = getDB();
            $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                $errors[] = 'An account with this email already exists.';
            }
        } catch (PDOException $e) {
            $errors[] = 'A database error occurred. Please try again.';
        }
    }

    // Step 5: Insert the new user
    if (empty($errors)) {
        try {
            // KEY PATTERN: password_hash() creates a secure bcrypt hash.
            // The PASSWORD_DEFAULT algorithm may change in future PHP versions,
            // so the hash includes the algorithm identifier and can be
            // re-verified regardless of the current default.
            $hash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare(
                'INSERT INTO users (name, email, password, role)
                 VALUES (?, ?, ?, ?)'
            );
            $stmt->execute([$name, $email, $hash, 'student']);

            // Set a flash message for the login page
            $_SESSION['flash'] = [
                'type'    => 'success',
                'message' => 'Registration successful! Please log in.',
            ];

            // KEY PATTERN: PRG — redirect after successful POST
            header('Location: login.php');
            exit;

        } catch (PDOException $e) {
            $errors[] = 'A database error occurred. Please try again.';
        }
    }
}
?>

<h2>Create an Account</h2>

<?php if (!empty($errors)): ?>
    <div class="alert alert-error">
        <ul>
            <?php foreach ($errors as $err): ?>
                <!-- KEY PATTERN: htmlspecialchars() even on error messages -->
                <li><?= htmlspecialchars($err, ENT_QUOTES, 'UTF-8') ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form method="POST" action="register.php">

    <!-- CSRF token -->
    <input type="hidden" name="csrf_token" value="<?= generateToken() ?>">

    <div class="form-group">
        <label for="name">Full Name</label>
        <input
            type="text"
            id="name"
            name="name"
            required
            maxlength="100"
            value="<?= htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
        >
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            required
            value="<?= htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
        >
    </div>

    <div class="form-group">
        <label for="password">Password (min 6 characters)</label>
        <input type="password" id="password" name="password" required minlength="6">
    </div>

    <div class="form-group">
        <label for="password_confirm">Confirm Password</label>
        <input type="password" id="password_confirm" name="password_confirm" required>
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>

<p class="mt-2">
    Already have an account? <a href="login.php">Login here</a>.
</p>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
