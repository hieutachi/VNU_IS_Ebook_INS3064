# 🚀 START HERE
# **How to use this portal**

This is the student portal for INS3064. Everything you need to follow the course
is here: fifteen chapters to read, fifteen decks to review with, and the setup
guide that puts PHP and MySQL on your own laptop. Read this page once, then start
with Session 1.

```
📅 Time: 5 minutes to read, about 30 minutes for the first setup
🎯 Objectives:
   - Find the chapters, the decks, and the guides without hunting for them
   - Get XAMPP running and keep one project folder for the whole course
   - Learn the weekly rhythm: read before class, follow in class, rebuild after
📖 Preparation:
   - A laptop you are allowed to install software on
   - Chrome or Firefox, kept up to date
   - About 5 GB of free disk space
```

---

## 📌 WHAT IS ON THIS SITE

| Section | What it holds | Use it when |
|---|---|---|
| **Sessions** | One hub per week: what to read, what to follow, what to practise | You want to know what this week expects of you |
| **Ebook** | The fifteen full chapters, with every code listing and error table | You are learning a topic, or revising it properly |
| **Slides** | The same material as focused decks, one idea per slide | You are in class, or reviewing quickly before an exam |
| **Guides** | This page, the [installation guide](00_installation_guide.md), the [course overview](00_course_overview.md), and the [cheat sheet](appendix/cheat_sheet.md) | You are setting up, or you have forgotten the syntax |

The four links in the top bar reach all of them from any page.

---

## 🧭 YOUR FIRST THIRTY MINUTES

1. Install XAMPP, then start Apache and MySQL: [installation guide](00_installation_guide.md).
2. Make one course folder inside `htdocs`, with one subfolder per session.
3. Open `http://localhost/ins3064/` in your browser. An empty listing is fine; "Not Found" means the folder name does not match the address.
4. Read [Chapter 1](part_1_php_foundation/session_01_intro_php.md) and type its first example yourself.

Use this layout from the first day. The chapters assume it, so their addresses and
file paths will work without editing.

```
C:\xampp\htdocs\
└── ins3064/               ← one folder for the whole course
    ├── session_01/        ← this week's practice files
    ├── session_02/
    ├── ...
    └── final_project/     ← your capstone project
```

📝 On macOS the same folder is `/Applications/XAMPP/htdocs/ins3064/`.

⚠️ PHP only runs through `localhost`. Open `http://localhost/ins3064/session_01/`,
never the file itself: double-clicking gives you a `file:///` address, which shows
the source code instead of running it.

---

## 🔁 THE WEEKLY RHYTHM

- **Before class** — read the chapter for the week and type its examples. Half an
  hour of reading turns the lecture into revision instead of a first encounter.
- **In class** — follow the deck. The code beside each slide is the code you are
  about to practise.
- **After class** — rebuild the exercises in your own project folder until they
  run without errors. A chapter you have only read is a chapter you have not learned.

### 💡 Read the minimum path when time is short
Every chapter opens with a **Minimum path** box: a handful of links that carry the
core of the chapter. If you are short on time or losing confidence, do those in
order, then come back for the rest. Falling behind quietly is the one thing that
is hard to recover from.

---

## 🖥️ HOW TO USE A CHAPTER AND A DECK

- **On this page** — the outline at the top of every chapter. On a phone it starts
  collapsed; tap it to open, then jump straight to the section you need.
- **Copy** — every code listing has a Copy button. Use it for long listings, but
  type the short ones. Typing is how the syntax stops being a mystery.
- **Read only** — a listing marked *read only* is either broken on purpose or
  would delete data. Read it, understand it, do not run it.
- **Dark / Light** — the button in the top bar switches theme and remembers your choice.
- **Decks** — arrow keys or `j` and `k` move between slides, `o` shows every slide
  at once, `Home` and `End` jump to the first and last.

### ⚠️ What this portal does not do
It does not collect files, show grades, or hold exam papers, answer keys, or
rubrics. Deadlines and submission instructions come from your lecturer and the
university systems, never from this site. Everything you build stays on your own
machine, so keep your own backups.

---

## 🧪 BEFORE YOUR FIRST CLASS

### ✅ You are ready when
- [ ] XAMPP is installed, and Apache and MySQL both start
- [ ] `http://localhost/ins3064/` opens your own course folder
- [ ] phpMyAdmin opens at `http://localhost/phpmyadmin`
- [ ] You have read Chapter 1 and run one PHP file you wrote yourself

### ❌ Mistakes that cost the most time
- Pasting code instead of typing it, then being unable to debug it.
- Opening a `.php` file directly instead of through `localhost`.
- Saving practice files outside `htdocs`, where Apache cannot serve them.
- Renaming the course folder halfway through, which breaks every address you wrote down.
- Skipping a chapter: each part is built on the one before it.

---

📝 Keep this page open in a tab for your first week. After that you will only need
the Sessions hub and the cheat sheet.
