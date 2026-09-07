<?php
/**
 * club_detail.php — Single club page with its events.
 *
 * KEY PATTERNS DEMONSTRATED:
 *   - GET parameter validated as integer ((int) $id)
 *   - Prepared statement with a bound parameter (?)
 *   - htmlspecialchars() on all output
 */

$pageTitle = 'Club Details';
require_once __DIR__ . '/includes/header.php';

// ─── Validate the club ID from the URL ────────────────────────
// KEY PATTERN: Always validate and type-cast GET parameters.
// (int) casts to integer; if the parameter is missing or not a
// number, $id becomes 0, which will match no club.
$id = (int) ($_GET['id'] ?? 0);

if ($id <= 0) {
    echo '<div class="alert alert-error">Invalid club ID.</div>';
    require_once __DIR__ . '/includes/footer.php';
    exit;
}

// ─── Fetch the club ───────────────────────────────────────────
// KEY PATTERN: Prepared statement with a placeholder (?).
// The bound parameter prevents SQL injection.
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT c.*, u.name AS creator_name
         FROM clubs c
         LEFT JOIN users u ON c.created_by = u.id
         WHERE c.id = ?'
    );
    $stmt->execute([$id]);
    $club = $stmt->fetch();
} catch (PDOException $e) {
    echo '<div class="alert alert-error">Database error: '
         . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8')
         . '</div>';
    $club = false;
}

if (!$club) {
    echo '<div class="alert alert-error">Club not found.</div>';
    require_once __DIR__ . '/includes/footer.php';
    exit;
}

// ─── Fetch upcoming events for this club ──────────────────────
try {
    $stmt = $pdo->prepare(
        'SELECT * FROM events
         WHERE club_id = ?
         ORDER BY event_date ASC'
    );
    $stmt->execute([$id]);
    $events = $stmt->fetchAll();
} catch (PDOException $e) {
    $events = [];
}
?>

<!-- Club header -->
<h2><?= htmlspecialchars($club['name'], ENT_QUOTES, 'UTF-8') ?></h2>
<span class="badge">
    <?= htmlspecialchars($club['category'], ENT_QUOTES, 'UTF-8') ?>
</span>

<p class="mt-2">
    <?= nl2br(htmlspecialchars($club['description'], ENT_QUOTES, 'UTF-8')) ?>
</p>

<div class="meta mt-1 mb-2">
    <?php if ($club['meeting_day'] && $club['meeting_time']): ?>
        📅 Meets every
        <?= htmlspecialchars($club['meeting_day'], ENT_QUOTES, 'UTF-8') ?>
        at <?= htmlspecialchars($club['meeting_time'], ENT_QUOTES, 'UTF-8') ?>
    <?php endif; ?>
    <?php if ($club['creator_name']): ?>
        &middot; Created by
        <?= htmlspecialchars($club['creator_name'], ENT_QUOTES, 'UTF-8') ?>
    <?php endif; ?>
</div>

<!-- Events -->
<h3 class="mt-2 mb-1">Upcoming Events</h3>

<?php if (empty($events)): ?>
    <p class="text-muted">No upcoming events scheduled.</p>
<?php else: ?>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($events as $event): ?>
                <tr>
                    <td>
                        <!-- date() is safe — the DB guarantees the format -->
                        <?= date('M j, Y', strtotime($event['event_date'])) ?>
                    </td>
                    <td>
                        <strong>
                            <?= htmlspecialchars($event['title'], ENT_QUOTES, 'UTF-8') ?>
                        </strong>
                        <br>
                        <small class="text-muted">
                            <?= htmlspecialchars($event['description'], ENT_QUOTES, 'UTF-8') ?>
                        </small>
                    </td>
                    <td>
                        <?= htmlspecialchars($event['location'] ?? 'TBA', ENT_QUOTES, 'UTF-8') ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>

<p class="mt-2">
    <a href="index.php" class="btn btn-primary">&larr; Back to All Clubs</a>
</p>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
