<?php
/**
 * index.php — Homepage: lists all clubs from the database.
 *
 * KEY PATTERNS DEMONSTRATED:
 *   - PDO prepared statement (even with no user input, we use query() safely)
 *   - htmlspecialchars() on every piece of output
 *   - Separation of data fetching (top) and rendering (bottom)
 */

$pageTitle = 'All Clubs';
require_once __DIR__ . '/includes/header.php';

// ─── Fetch all clubs ──────────────────────────────────────────
// We use prepared statements consistently, even when there is no
// user input — this keeps the habit and makes it easy to add
// filters later.
try {
    $pdo = getDB();
    $stmt = $pdo->query(
        'SELECT c.*, u.name AS creator_name
         FROM clubs c
         LEFT JOIN users u ON c.created_by = u.id
         ORDER BY c.name ASC'
    );
    $clubs = $stmt->fetchAll();
} catch (PDOException $e) {
    // In production, log the error and show a friendly message.
    // In development, showing the message helps students debug.
    echo '<div class="alert alert-error">Database error: '
         . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8')
         . '</div>';
    $clubs = [];
}
?>

<h2 class="mb-2">All Clubs</h2>

<!-- AJAX search box (calls api/search.php) -->
<input
    type="text"
    id="search-box"
    placeholder="🔍  Search clubs by name or category..."
    autocomplete="off"
>
<div id="search-results"></div>

<div class="card-grid" id="clubs-list">
<?php if (empty($clubs)): ?>
    <p>No clubs found. Check back soon!</p>
<?php else: ?>
    <?php foreach ($clubs as $club): ?>
        <div class="card">
            <h2>
                <!--
                    KEY PATTERN: htmlspecialchars() on ALL user-supplied output.
                    This prevents Cross-Site Scripting (XSS) attacks.
                -->
                <a href="club_detail.php?id=<?= (int) $club['id'] ?>">
                    <?= htmlspecialchars($club['name'], ENT_QUOTES, 'UTF-8') ?>
                </a>
            </h2>
            <span class="badge">
                <?= htmlspecialchars($club['category'], ENT_QUOTES, 'UTF-8') ?>
            </span>
            <p>
                <?= htmlspecialchars($club['description'], ENT_QUOTES, 'UTF-8') ?>
            </p>
            <div class="meta">
                <?php if ($club['meeting_day'] && $club['meeting_time']): ?>
                    Meets <?= htmlspecialchars($club['meeting_day'], ENT_QUOTES, 'UTF-8') ?>
                    at <?= htmlspecialchars($club['meeting_time'], ENT_QUOTES, 'UTF-8') ?>
                <?php endif; ?>
            </div>
        </div>
    <?php endforeach; ?>
<?php endif; ?>
</div>

<!--
    KEY PATTERN: Simple AJAX search.
    The JavaScript below sends the search query to api/search.php
    and renders results without a full page reload.
-->
<script>
document.getElementById('search-box').addEventListener('input', function () {
    const query   = this.value.trim();
    const results = document.getElementById('search-results');
    const grid    = document.getElementById('clubs-list');

    if (query.length < 2) {
        results.innerHTML = '';
        grid.style.display = '';
        return;
    }

    // Hide the static grid while showing search results
    grid.style.display = 'none';

    // fetch() sends an AJAX GET request to the JSON API endpoint
    fetch('api/search.php?q=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                results.innerHTML = '<p class="text-muted">No clubs match your search.</p>';
                return;
            }
            let html = '<div class="card-grid">';
            data.forEach(club => {
                html += `
                <div class="card">
                    <h2><a href="club_detail.php?id=${club.id}">${escapeHtml(club.name)}</a></h2>
                    <span class="badge">${escapeHtml(club.category)}</span>
                    <p>${escapeHtml(club.description)}</p>
                </div>`;
            });
            html += '</div>';
            results.innerHTML = html;
        })
        .catch(() => {
            results.innerHTML = '<p class="alert alert-error">Search failed. Please try again.</p>';
        });
});

// Client-side HTML escaping — defense in depth
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
