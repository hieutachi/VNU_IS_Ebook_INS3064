<?php
/**
 * includes/auth.php — Authentication helper functions.
 *
 * KEY PATTERN: Centralise auth checks in reusable functions.
 * Every protected page calls requireLogin() or requireRole() at the top.
 */

/**
 * Check whether the current visitor is logged in.
 *
 * Returns true if a valid user_id exists in the session, false otherwise.
 */
function isLoggedIn(): bool
{
    return !empty($_SESSION['user_id']);
}

/**
 * Get the currently logged-in user's data (id, name, email, role).
 * Returns null if not logged in.
 */
function currentUser(): ?array
{
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id'    => $_SESSION['user_id'],
        'name'  => $_SESSION['user_name'],
        'email' => $_SESSION['user_email'],
        'role'  => $_SESSION['user_role'],
    ];
}

/**
 * Require the visitor to be logged in.
 * If not, redirect to login.php with a "next" URL so the user
 * is sent back after logging in.
 */
function requireLogin(): void
{
    if (!isLoggedIn()) {
        // Save the page the user was trying to visit
        $next = urlencode($_SERVER['REQUEST_URI']);
        header("Location: login.php?next={$next}");
        exit;
    }
}

/**
 * Require the visitor to have a specific role (e.g. 'admin').
 * Calls requireLogin() first, then checks the role.
 *
 * KEY PATTERN: Role-based access control — always verify server-side,
 * never rely on hiding links in the UI.
 */
function requireRole(string $role): void
{
    requireLogin();

    if (($_SESSION['user_role'] ?? '') !== $role) {
        http_response_code(403);
        die('Access denied. You do not have permission to view this page.');
    }
}

/**
 * Set session variables after a successful login.
 */
function loginUser(array $user): void
{
    // Regenerate session ID to prevent session fixation attacks
    session_regenerate_id(true);

    $_SESSION['user_id']    = $user['id'];
    $_SESSION['user_name']  = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role']  = $user['role'];
}

/**
 * Log the user out by destroying the session.
 */
function logoutUser(): void
{
    $_SESSION = [];

    // Delete the session cookie (PHP 7.0+)
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
}
