<?php
/**
 * api/search.php — JSON API endpoint for AJAX club search.
 *
 * KEY PATTERNS DEMONSTRATED:
 *   - JSON response with correct Content-Type header
 *   - Prepared statement with LIKE and bound parameters
 *   - Input validation before querying the database
 *   - No CSRF check needed: this is a read-only GET request
 *     (CSRF protects state-changing actions, not queries)
 *
 * Called by the JavaScript in index.php via fetch().
 */

require_once __DIR__ . '/../config.php';

// ─── Set response headers ─────────────────────────────────────
// Tell the browser this response is JSON, not HTML.
header('Content-Type: application/json; charset=utf-8');

// ─── Validate input ───────────────────────────────────────────
$query = trim($_GET['q'] ?? '');

if (mb_strlen($query) < 2) {
    // Return an empty array if the query is too short
    echo json_encode([]);
    exit;
}

// ─── Search the database ──────────────────────────────────────
// KEY PATTERN: Prepared statement with a LIKE parameter.
// The % wildcards are added here in PHP, NOT in the SQL.
// This prevents SQL injection.
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT id, name, description, category
         FROM clubs
         WHERE name LIKE ? OR category LIKE ? OR description LIKE ?
         ORDER BY name ASC
         LIMIT 20'
    );

    // Wrap the user's query in % wildcards for partial matching
    $likeQuery = '%' . $query . '%';

    $stmt->execute([$likeQuery, $likeQuery, $likeQuery]);
    $clubs = $stmt->fetchAll();

} catch (PDOException $e) {
    // On error, return an empty array with a 500 status
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
    exit;
}

// ─── Return JSON ──────────────────────────────────────────────
// json_encode() automatically escapes strings, so the output is
// safe for the client to parse. No htmlspecialchars() needed here
// because the Content-Type is application/json, not text/html.
echo json_encode($clubs);
