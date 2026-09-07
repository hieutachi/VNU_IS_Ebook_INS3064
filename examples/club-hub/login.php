<?php
/**
 * login.php — Login form and logout handler.
 *
 * KEY PATTERNS DEMONSTRATED:
 *   1. CSRF token included in form, verified on POST
 *   2. Prepared statement with bound parameter for email lookup
 *   3. password_verify() to check the submitted password
 *   4. POST → Redirect → GET (PRG) after successful login
 *   5. session_regenerate_id() to prevent session fixation
 */

$pageTitle = 'Login';
require_once __DIR__ . '/includes/header.php';

// ─── Handle logout ────────────────────────────────────────────
// Triggered by login.php?action=logout (a GET request is fine
// for logout since it only destroys state, not create it).
if (($_GET['action'] ?? '') === 'logout') {
    logoutUser();
    $_SESSION['flash'] = ['type' => 'success', 'message' => 'You have been logged out.'];
    // KEY PATTERN: PRG — redirect after a state-changing action
    header('Location: index.php');
    exit;
}

// ─── Handle login form submission ─────────────────────────────
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Step 1: Verify CSRF token
    verifyToken($_POST['csrf_token'] ?? '');

    // Step 2: Sanitise and validate input
    $email = trim($_POST['email'] ?? '');
    $pass  = $_POST['password'] ?? '';

    if ($email === '' || $pass === '') {
        $error = 'Please fill in both fields.';
    } else {
        // Step 3: Look up user by email using a prepared statement
        // KEY PATTERN: Never concatenate user input into SQL.
        try {
            $pdo  = getDB();
            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
            $stmt->execute([$email]);
            $user = $stmt->fetch();
        } catch (PDOException $e) {
            $error = 'A database error occurred. Please try again.';
            $user  = false;
        }

        // Step 4: Verify password with password_verify()
        // KEY PATTERN: Never compare passwords directly.
        // password_verify() handles bcrypt comparison safely.
        if ($user && password_verify($pass, $user['password'])) {
            // Success — store user info in the session
            loginUser($user);

            // Redirect to the page the user was trying to access,
            // or to the homepage by default.
            $next = $_GET['next'] ?? 'index.php';

            // Safety: only redirect to local paths (prevent open redirect)
            if (!preg_match('#^/#', $next) && !preg_match('#^\w+\.php#', $next)) {
                $next = 'index.php';
            }

            // KEY PATTERN: PRG — redirect after successful POST
            header("Location: {$next}");
            exit;
        } else {
            // Generic error message — do not reveal whether the email or
            // the password was wrong (prevents user enumeration).
            $error = 'Invalid email or password.';
        }
    }
}
?>

<h2>Login</h2>

<?php if ($error): ?>
    <div class="alert alert-error">
        <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
    </div>
<?php endif; ?>

<form method="POST" action="login.php<?= isset($_GET['next']) ? '?next=' . urlencode($_GET['next']) : '' ?>">

    <!-- KEY PATTERN: CSRF token hidden field -->
    <input type="hidden" name="csrf_token" value="<?= generateToken() ?>">

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
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>

<p class="mt-2">
    Don't have an account? <a href="register.php">Register here</a>.
</p>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
