<?php
/**
 * includes/header.php — Common page header.
 *
 * Included at the top of every page. Handles:
 *   1. Starting the session (once)
 *   2. Including auth helpers so every page can check login status
 *   3. Outputting the HTML <head>, site header, and navigation
 *
 * KEY PATTERN: Each page sets $pageTitle before including this file.
 */

// ─── Start session (safe to call even if already started) ─────
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ─── Include helpers ──────────────────────────────────────────
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/csrf.php';

// ─── Flash messages ───────────────────────────────────────────
// KEY PATTERN: Flash messages survive one redirect, then self-destruct.
// Set $_SESSION['flash'] before a redirect; the header displays and
// clears it on the next page load.
function getFlash(): ?array
{
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash; // ['type' => 'success'|'error'|'info', 'message' => '...']
    }
    return null;
}

// Default page title (pages can override before including header)
$pageTitle = $pageTitle ?? APP_NAME;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- KEY PATTERN: htmlspecialchars() on the page title -->
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?> — <?= APP_NAME ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
    <div class="container">
        <h1><a href="index.php" style="color:#fff;"><?= APP_NAME ?></a></h1>
        <nav>
            <a href="index.php">Home</a>

            <?php if (isLoggedIn()): ?>
                <?php if ($_SESSION['user_role'] === 'admin'): ?>
                    <a href="add_club.php">Add Club</a>
                <?php endif; ?>
                <span class="nav-right">
                    <!-- KEY PATTERN: htmlspecialchars() on user-supplied name -->
                    Hello, <?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?>
                    (<em><?= htmlspecialchars($_SESSION['user_role'], ENT_QUOTES, 'UTF-8') ?></em>)
                    &middot;
                    <a href="login.php?action=logout">Logout</a>
                </span>
            <?php else: ?>
                <span class="nav-right">
                    <a href="login.php">Login</a>
                    &middot;
                    <a href="register.php">Register</a>
                </span>
            <?php endif; ?>
        </nav>
    </div>
</header>

<main class="container">
<?php
// ─── Display flash message (if any) ──────────────────────────
$flash = getFlash();
if ($flash): ?>
    <div class="alert alert-<?= htmlspecialchars($flash['type'], ENT_QUOTES, 'UTF-8') ?>">
        <?= htmlspecialchars($flash['message'], ENT_QUOTES, 'UTF-8') ?>
    </div>
<?php endif; ?>
