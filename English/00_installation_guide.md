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

---

# 2️⃣ TESTING PHP

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
| **Live Server** | Auto reload |
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

## ❌ Error 4: Cannot connect to MySQL

**Cause:** MySQL not started or wrong connection info

**Solution:**
1. Check MySQL is running in XAMPP
2. Check connection info:
   - Host: `localhost`
   - User: `root`
   - Password: (empty)

---

# 8️⃣ INSTALLATION CHECKLIST

Check ✅ when completed:

- [ ] Install XAMPP
- [ ] Apache starts successfully
- [ ] MySQL starts successfully
- [ ] Access `http://localhost` OK
- [ ] Access phpMyAdmin OK
- [ ] Create PHP test file OK
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
