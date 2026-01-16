#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create remaining English session files based on Vietnamese versions
This script reads Vietnamese files and creates English equivalents
"""

import os
import re

def read_vietnamese_file(path):
    """Read Vietnamese file content"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return None

def translate_session_04():
    """Create Session 04 English version"""
    vn_path = 'Vietnamese/phan_2_mysql_database/buoi_04_intro_mysql.md'
    content = read_vietnamese_file(vn_path)
    
    if not content:
        return
    
    # Basic translations
    content = content.replace('# 🟩 BUỔI 04', '# 🟩 SESSION 04')
    content = content.replace('Buổi 04', 'Session 04')
    content = content.replace('buổi học', 'session')
    content = content.replace('Mục tiêu', 'Objectives')
    content = content.replace('mục tiêu', 'objectives')
    content = content.replace('Lý thuyết', 'Theory')
    content = content.replace('Thực hành', 'Practice')
    content = content.replace('Ví dụ', 'Example')
    content = content.replace('Bài tập', 'Exercise')
    content = content.replace('Hướng dẫn', 'Instructions')
    content = content.replace('Kết quả', 'Result')
    content = content.replace('Giải thích', 'Explanation')
    content = content.replace('Tóm tắt', 'Summary')
    content = content.replace('Chuẩn bị', 'Preparation')
    content = content.replace('Phiếu học tập', 'Worksheet')
    content = content.replace('Tài liệu tham khảo', 'Reference Materials')
    
    # Session-specific translations
    content = content.replace('Database là gì', 'What is Database')
    content = content.replace('MySQL là gì', 'What is MySQL')
    content = content.replace('Cài đặt', 'Installation')
    content = content.replace('Cấu hình', 'Configuration')
    content = content.replace('Tạo Database', 'Create Database')
    content = content.replace('Tạo Table', 'Create Table')
    content = content.replace('Kiểu dữ liệu', 'Data Types')
    content = content.replace('Constraints', 'Constraints')
    
    # Save
    os.makedirs('English/part_2_mysql_database', exist_ok=True)
    with open('English/part_2_mysql_database/session_04_intro_mysql.md', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Created Session 04")

def create_placeholder_sessions():
    """Create placeholder content for remaining sessions"""
    sessions = [
        ('part_2_mysql_database', 'session_05_intro_sql', 'Introduction to SQL'),
        ('part_2_mysql_database', 'session_06_database_design', 'Database Design'),
        ('part_2_mysql_database', 'session_07_advanced_sql', 'Advanced SQL'),
        ('part_3_integration_advanced', 'session_09_error_handling', 'Error Handling'),
        ('part_3_integration_advanced', 'session_10_php_mysql', 'PHP + MySQL'),
        ('part_3_integration_advanced', 'session_11_programming_techniques', 'Programming Techniques'),
        ('part_3_integration_advanced', 'session_12_web_app_development', 'Web Application Development'),
        ('part_4_security_jquery', 'session_13_cookies_sessions', 'Cookies & Sessions'),
        ('part_4_security_jquery', 'session_14_security_methods', 'Security Methods'),
        ('part_4_security_jquery', 'session_15_jquery_intro', 'jQuery Introduction'),
    ]
    
    for folder, filename, title in sessions:
        os.makedirs(f'English/{folder}', exist_ok=True)
        content = f"""# {title}

This session content is being translated from the Vietnamese version.

**Note:** Full content will be added based on the Vietnamese version.

Please refer to the Vietnamese version for complete content:
- Vietnamese: `../Vietnamese/{folder.replace('part_', 'phan_').replace('session_', 'buoi_')}/{filename.replace('session_', 'buoi_')}.md`

---
"""
        with open(f'English/{folder}/{filename}.md', 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Created placeholder: {filename}")

if __name__ == "__main__":
    print("Creating remaining session files...")
    translate_session_04()
    print("Note: Remaining sessions need full translation from Vietnamese files")
    print("This requires reading each Vietnamese file and translating completely")
