<?php
/**
 * includes/csrf.php — CSRF token helpers.
 *
 * KEY PATTERN: Every form must include a CSRF token.
 * The token is stored in the user's session and verified on POST.
 *
 * Usage in a form:
 *     <input type="hidden" name="csrf_token" value="<?= generateToken() ?>">
 *
 * Usage at the top of a POST handler:
 *     verifyToken($_POST['csrf_token'] ?? '');
 */

/**
 * Generate (or return the existing) CSRF token for the current session.
 * The token is a random 64-character hex string.
 */
function generateToken(): string
{
    // Only create a new token if one doesn't already exist in this session
    if (empty($_SESSION['csrf_token'])) {
        // random_bytes(32) gives 32 raw bytes → 64 hex characters
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify that the submitted token matches the one stored in the session.
 * On failure, terminates with a 403 Forbidden response.
 *
 * KEY PATTERN: Always die() with an HTTP 403 on mismatch —
 * do not continue processing the form.
 */
function verifyToken(string $token): void
{
    if (
        empty($token) ||
        !hash_equals($_SESSION['csrf_token'] ?? '', $token)
    ) {
        // hash_equals() prevents timing attacks on the comparison
        http_response_code(403);
        die('Invalid CSRF token. Please go back and try again.');
    }

    // Regenerate the token after successful verification
    // so the same token cannot be reused.
    unset($_SESSION['csrf_token']);
}
