# 🛠️ ENVIRONMENT SETUP GUIDE
# **PHP & MySQL Development Environment**

---

# 📋 SYSTEM REQUIREMENTS

| Component | Minimum Requirements |
|-----------|---------------------|
| **OS** | Windows 10/11, macOS, Linux |
| **RAM** | 4GB (8GB recommended) |
| **Disk** | 5GB free space |
| **Browser** | Chrome, Firefox (latest) |

---

# 1️⃣ INSTALLING XAMPP

## 🎯 What is XAMPP?

XAMPP = **X** (Cross-platform) + **A** (Apache) + **M** (MySQL/MariaDB) + **P** (PHP) + **P** (Perl)

This is an integrated software package that gives you a complete web development environment.

## 📥 Step 1: Download XAMPP

1. Visit: https://www.apachefriends.org/download.html
2. Select PHP 8.0+ version for your operating system
3. Download the installer file

## 📦 Step 2: Installation

### Windows:
```
1. Run file xampp-windows-x64-8.x.x-installer.exe
2. Select components:
   ✅ Apache
   ✅ MySQL
   ✅ PHP
   ✅ phpMyAdmin
3. Choose installation directory: C:\xampp (default)
4. Click Install and wait for completion
```

### macOS:
```
1. Open file xampp-osx-8.x.x-installer.dmg
2. Drag XAMPP to Applications folder
3. Open XAMPP from Applications
```

## ▶️ Step 3: Start XAMPP

1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache**
3. Click **Start** for **MySQL**
4. Test: Open browser and visit `http://localhost`

### ✅ Expected Result:
- XAMPP Dashboard page displays
- Apache and MySQL show "Running" status (green)

### 🔍 Check that the installation is complete, not just present

A half-finished or interrupted install leaves the `C:\xampp` folder behind without
the programs inside it. Confirm both engines are actually there before going on.
In PowerShell:

```powershell
Test-Path C:\xampp\php\php.exe
Test-Path C:\xampp\mysql\bin\mysqld.exe
```

**Expected result:** `True` twice. A `False` means that part did not install —
the Control Panel will show `Start` doing nothing, or MySQL turning green and
immediately red again. Re-run the XAMPP installer and choose **Repair**, or
uninstall and install again; installing a second copy alongside the first is what
usually causes the port conflicts in Section 7.

---

# 2️⃣ TESTING PHP

## ⚠️ PHP only runs through `localhost`

Two rules that cause most "my code does not work" reports in the first weeks, plus
one extension that quietly breaks them:

- The file must live under `C:\xampp\htdocs` (or the macOS equivalent). PHP files
  anywhere else are invisible to Apache.
- Open it as `http://localhost/...`, never by double-clicking the file. A path like
  `file:///C:/xampp/htdocs/info.php` shows the source code, not the result.
- **VS Code's Live Server extension does not run PHP.** It serves files on port
  5500 as plain text, so `<?php ... ?>` either disappears or shows up raw. Use it
  for HTML and CSS only; for PHP, always go through `localhost`.

## 📝 Create test file

1. Open folder: `C:\xampp\htdocs` (Windows) or `/Applications/XAMPP/htdocs` (macOS)
2. Create new file: `info.php`
3. Enter content:

```php
<?php
// File: info.php
// Display PHP information

phpinfo();
?>
```

4. Open browser: `http://localhost/info.php`

### ✅ Expected Result:
- Page displays detailed PHP information
- PHP Version: 8.0+

---

# 3️⃣ TESTING MySQL

## 🔧 Access phpMyAdmin

1. Open browser: `http://localhost/phpmyadmin`
2. Login:
   - Username: `root`
   - Password: (leave empty)

### ✅ Expected Result:
- phpMyAdmin interface displays
- Database list on the left

## 📊 Create test database

1. In phpMyAdmin, click **New**
2. Enter database name: `test_db`
3. Click **Create**

---

# 4️⃣ INSTALLING VS CODE

## 📥 Download & Install

1. Visit: https://code.visualstudio.com/
2. Download for your operating system
3. Install following instructions

## 🔌 Install Required Extensions

Open VS Code → Extensions (Ctrl+Shift+X) → Search and install:

| Extension | Purpose |
|-----------|---------|
| **PHP Intelephense** | Autocomplete, syntax |
| **PHP Debug** | Debug PHP |
| **MySQL** | Connect to MySQL |
| **Live Server** | Auto reload — **HTML and CSS only, it cannot run PHP** |
| **Prettier** | Format code |

---

# 5️⃣ WORKING DIRECTORY STRUCTURE

## 📁 Create project folder

```
C:\xampp\htdocs\
└── ins3064/                    ← Course folder
    ├── session_01/                ← Session 1 exercises
    │   ├── index.php
    │   └── style.css
    ├── session_02/                ← Session 2 exercises
    ├── ...
    └── final_project/          ← Final project
```

## 🌐 Access project

- URL: `http://localhost/ins3064/session_01/`

---

# 6️⃣ FIRST HELLO WORLD

## 📝 Create file

1. Create folder: `C:\xampp\htdocs\ins3064\session_01\`
2. Create file: `index.php`

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello PHP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px 60px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #666;
        }
        .php-info {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Hello PHP!</h1>
        <p>Welcome to INS3064</p>
        
        <div class="php-info">
            <?php
            // Display PHP information
            echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
            echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
            echo "<p><strong>Time:</strong> " . date("Y-m-d H:i:s") . "</p>";
            ?>
        </div>
    </div>
</body>
</html>
```

3. Open browser: `http://localhost/ins3064/session_01/`

### ✅ Expected Result:
- Webpage displays "Hello PHP!"
- PHP version and time information

---

# 7️⃣ COMMON ERROR TROUBLESHOOTING

## ❌ Error 1: Apache won't start

**Cause:** Port 80 is occupied by another application (Skype, IIS)

**Solution:**
1. Open XAMPP Control Panel
2. Click **Config** → **Apache (httpd.conf)**
3. Find `Listen 80` and change to `Listen 8080`
4. Find `ServerName localhost:80` change to `ServerName localhost:8080`
5. Restart Apache
6. Access: `http://localhost:8080`

---

## ❌ Error 2: MySQL won't start

**Cause:** Port 3306 is occupied or another MySQL service is running

**Solution:**
1. Open Task Manager
2. Find and End process `mysqld.exe`
3. Restart MySQL in XAMPP

---

## ❌ Error 3: Blank page / PHP not displaying

**Cause:** File doesn't have `.php` extension or syntax error

**Solution:**
1. Check file has `.php` extension
2. Check `<?php` and `?>` syntax is correct
3. Enable error display in `php.ini`:
   ```
   display_errors = On
   error_reporting = E_ALL
   ```

---

## ❌ Error 3b: The browser shows the PHP code instead of running it

**Cause:** the page was not served by Apache. Either the file was opened directly
(`file:///...`), or it was opened through VS Code's Live Server on port 5500,
which serves files as-is and does not run PHP.

**Solution:**
1. Look at the address bar. It must start with `http://localhost/`, not `file:///`
   and not `http://127.0.0.1:5500/`.
2. Move the file into `C:\xampp\htdocs\...` and open the `localhost` address.
3. Keep Live Server for HTML and CSS work only.

---

## ❌ Error 4: Cannot connect to MySQL

**Cause:** MySQL not started or wrong connection info

**Solution:**
1. Check MySQL is running in XAMPP
2. Check connection info:
   - Host: `localhost`
   - User: `root`
   - Password: (empty)
3. Confirm PHP can actually talk to MySQL. Create `pdo-check.php` in `htdocs`:
   ```php
   <?php
   var_dump(extension_loaded('pdo_mysql'));
   try {
       new PDO('mysql:host=localhost;dbname=test_db;charset=utf8mb4', 'root', '');
       echo 'PDO connection OK';
   } catch (PDOException $e) {
       echo 'PDO failed: ' . $e->getMessage();
   }
   ```
   **Expected result:** `bool(true)` then `PDO connection OK`. `bool(false)` means
   the driver is switched off — remove the `;` in front of
   `extension=pdo_mysql` in `php.ini` and restart Apache. `Unknown database`
   means MySQL is fine but `test_db` has not been created yet.

---

# 8️⃣ INSTALLATION CHECKLIST

Check ✅ when completed:

- [ ] Install XAMPP
- [ ] `php\php.exe` and `mysql\bin\mysqld.exe` both exist
- [ ] Apache starts successfully
- [ ] MySQL starts successfully
- [ ] Access `http://localhost` OK
- [ ] Access phpMyAdmin OK
- [ ] Create PHP test file OK
- [ ] A `.php` page opened via `localhost` shows output, not source code
- [ ] `pdo_mysql` loaded and a PDO connection succeeds
- [ ] Install VS Code
- [ ] Install PHP Extensions
- [ ] Create project folder
- [ ] Hello World runs successfully

---

# 📞 SUPPORT

If you encounter unresolved issues:

1. Google the specific error
2. Ask on Stack Overflow
3. Contact instructor

---

**Next: [Session 01 - Introduction to PHP →](./part_1_php_foundation/session_01_intro_php.md)**
