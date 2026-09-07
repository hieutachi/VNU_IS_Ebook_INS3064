<?php
/**
 * add_club.php — Add a new club (admin only).
 *
 * KEY PATTERNS DEMONSTRATED:
 *   1. requireRole('admin') — role-based access control
 *   2. CSRF token in form, verified on POST
 *   3. Server-side validation
 *   4. Prepared statement with bound parameters for INSERT
 *   5. POST → Redirect → GET (PRG) after successful creation
 */

require_once __DIR__ . '/includes/header.php';

// ─── Protect this page — admin role required ──────────────────
// KEY PATTERN: Always enforce access control server-side.
// Do not rely on simply hiding the link in the navigation.
requireRole('admin');

$errors = [];

// ─── Handle form submission ───────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Step 1: Verify CSRF token
    verifyToken($_POST['csrf_token'] ?? '');

    // Step 2: Collect and trim input
    $name        = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $category    = trim($_POST['category'] ?? 'General');
    $meetingDay  = trim($_POST['meeting_day'] ?? '');
    $meetingTime = trim($_POST['meeting_time'] ?? '');

    // Step 3: Validate
    if ($name === '' || mb_strlen($name) > 150) {
        $errors[] = 'Club name is required (max 150 characters).';
    }
    if ($description === '') {
        $errors[] = 'Description is required.';
    }

    // Step 4: Insert
    if (empty($errors)) {
        try {
            $pdo  = getDB();
            $stmt = $pdo->prepare(
                'INSERT INTO clubs (name, description, category, meeting_day, meeting_time, created_by)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $name,
                $description,
                $category,
                $meetingDay ?: null,
                $meetingTime ?: null,
                $_SESSION['user_id'],  // The currently logged-in admin
            ]);

            // Flash message for the homepage
            $_SESSION['flash'] = [
                'type'    => 'success',
                'message' => "Club \"{$name}\" has been created.",
            ];

            // KEY PATTERN: PRG — redirect after successful POST
            header('Location: index.php');
            exit;

        } catch (PDOException $e) {
            $errors[] = 'A database error occurred. Please try again.';
        }
    }
}

$pageTitle = 'Add Club';
?>

<h2>Add a New Club</h2>

<?php if (!empty($errors)): ?>
    <div class="alert alert-error">
        <ul>
            <?php foreach ($errors as $err): ?>
                <li><?= htmlspecialchars($err, ENT_QUOTES, 'UTF-8') ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form method="POST" action="add_club.php">

    <!-- CSRF token -->
    <input type="hidden" name="csrf_token" value="<?= generateToken() ?>">

    <div class="form-group">
        <label for="name">Club Name</label>
        <input
            type="text"
            id="name"
            name="name"
            required
            maxlength="150"
            value="<?= htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
        >
    </div>

    <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" required><?= htmlspecialchars($_POST['description'] ?? '', ENT_QUOTES, 'UTF-8') ?></textarea>
    </div>

    <div class="form-group">
        <label for="category">Category</label>
        <select id="category" name="category">
            <?php
            $categories = ['General', 'Technology', 'Arts', 'Academic', 'Social', 'Sports'];
            foreach ($categories as $cat):
                $selected = (($_POST['category'] ?? 'General') === $cat) ? 'selected' : '';
            ?>
                <option value="<?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8') ?>" <?= $selected ?>>
                    <?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8') ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="form-group">
        <label for="meeting_day">Meeting Day (optional)</label>
        <select id="meeting_day" name="meeting_day">
            <option value="">— None —</option>
            <?php
            $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            foreach ($days as $day):
                $selected = (($_POST['meeting_day'] ?? '') === $day) ? 'selected' : '';
            ?>
                <option value="<?= htmlspecialchars($day, ENT_QUOTES, 'UTF-8') ?>" <?= $selected ?>>
                    <?= htmlspecialchars($day, ENT_QUOTES, 'UTF-8') ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="form-group">
        <label for="meeting_time">Meeting Time (optional)</label>
        <input
            type="time"
            id="meeting_time"
            name="meeting_time"
            value="<?= htmlspecialchars($_POST['meeting_time'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
        >
    </div>

    <button type="submit" class="btn btn-primary">Create Club</button>
</form>

<p class="mt-2">
    <a href="index.php" class="btn btn-primary">&larr; Back to All Clubs</a>
</p>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
