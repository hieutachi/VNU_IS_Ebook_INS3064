<?php
/**
 * config.php — Database configuration and application constants.
 *
 * KEY PATTERN: Centralise all configuration in one file.
 * Every other file that needs a database connection includes this file.
 */

// ─── Database credentials ────────────────────────────────────────
// Update these to match your local MySQL/MariaDB setup.
define('DB_HOST', 'localhost');
define('DB_NAME', 'club_hub');
define('DB_USER', 'root');
define('DB_PASS', '');

// ─── Application settings ────────────────────────────────────────
define('APP_NAME', 'Campus Club Hub');

// ─── PDO connection (singleton) ──────────────────────────────────
// KEY PATTERN: PDO with prepared statements — never use raw mysql_*.
// The DSN string specifies the driver (mysql), host, database name,
// and the character set (utf8mb4 for full Unicode support).
function getDB(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            DB_HOST,
            DB_NAME
        );

        $options = [
            // Throw exceptions on SQL errors (default is silent failure)
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            // Return associative arrays by default (not numeric-indexed)
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // Use real prepared statements, not emulated ones
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }

    return $pdo;
}
