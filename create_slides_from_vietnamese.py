#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create HTML slides from Vietnamese markdown files for sessions 06-15
"""

import re
import os

# Read template structure from existing slide
def get_template():
    """Get the HTML template structure"""
    return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INS3064: {title}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}

        .slide-container {{
            width: 100%;
            max-width: 1000px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }}

        .slide {{
            display: none;
            padding: 60px 50px;
            min-height: 700px;
            background: white;
            animation: fadeIn 0.5s ease-in;
        }}

        .slide.active {{
            display: block;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; }}
            to {{ opacity: 1; }}
        }}

        .slide h1 {{
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 20px;
            border-bottom: 3px solid #764ba2;
            padding-bottom: 15px;
        }}

        .slide h2 {{
            color: #764ba2;
            font-size: 1.8em;
            margin-top: 25px;
            margin-bottom: 15px;
        }}

        .slide h3 {{
            color: #667eea;
            font-size: 1.3em;
            margin-top: 20px;
            margin-bottom: 10px;
        }}

        .slide p {{
            color: #333;
            font-size: 1.05em;
            line-height: 1.8;
            margin-bottom: 15px;
        }}

        .slide ul, .slide ol {{
            margin-left: 30px;
            margin-bottom: 15px;
        }}

        .slide li {{
            color: #333;
            font-size: 1.05em;
            line-height: 1.8;
            margin-bottom: 10px;
        }}

        .slide strong {{
            color: #764ba2;
            font-weight: 600;
        }}

        .code-block {{
            background: #f5f5f5;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
            font-size: 0.95em;
            color: #333;
            white-space: pre-wrap;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #f9f9f9;
        }}

        table th {{
            background: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }}

        table td {{
            padding: 12px;
            border-bottom: 1px solid #ddd;
            color: #333;
        }}

        table tr:hover {{
            background: #f0f0f0;
        }}

        .navigation {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: #f5f5f5;
            border-top: 1px solid #ddd;
        }}

        button {{
            padding: 12px 30px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            transition: all 0.3s ease;
        }}

        button:hover {{
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }}

        button:disabled {{
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }}

        .slide-counter {{
            color: #667eea;
            font-weight: 600;
            font-size: 1.1em;
        }}

        .highlight {{
            background: #fffacd;
            padding: 2px 6px;
            border-radius: 3px;
            color: #333;
        }}

        .box-info {{
            background: #e8f4f8;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            color: #333;
        }}

        .box-warning {{
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            color: #333;
        }}

        .comparison-table {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }}

        .comparison-item {{
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }}

        .comparison-item h4 {{
            color: #667eea;
            margin-bottom: 10px;
        }}

        .header-section {{
            text-align: center;
            margin-bottom: 30px;
        }}

        .diagram {{
            background: #f9f9f9;
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
            font-family: monospace;
            color: #333;
            line-height: 1.6;
        }}
    </style>
</head>
<body>
    <div class="slide-container">
        {slides}
        
        <!-- Navigation -->
        <div class="navigation">
            <button id="prevBtn" onclick="changeSlide(-1)">← Previous</button>
            <span class="slide-counter"><span id="currentSlide">1</span> / <span id="totalSlides">{total_slides}</span></span>
            <button id="nextBtn" onclick="changeSlide(1)">Next →</button>
        </div>
    </div>

    <script>
        let currentSlide = 1;
        const totalSlides = {total_slides};

        function showSlide(n) {{
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (n > totalSlides) {{
                currentSlide = totalSlides;
            }}
            if (n < 1) {{
                currentSlide = 1;
            }}

            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide - 1].classList.add('active');

            document.getElementById('currentSlide').textContent = currentSlide;
            document.getElementById('totalSlides').textContent = totalSlides;

            prevBtn.disabled = currentSlide === 1;
            nextBtn.disabled = currentSlide === totalSlides;
        }}

        function changeSlide(n) {{
            currentSlide += n;
            showSlide(currentSlide);
        }}

        document.addEventListener('keydown', (e) => {{
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        }});

        showSlide(currentSlide);
    </script>
</body>
</html>'''

def escape_html(text):
    """Escape HTML special characters"""
    if not text:
        return ''
    return (text
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace("'", '&#39;'))

def markdown_to_html_simple(md_text):
    """Convert markdown to HTML (simplified)"""
    if not md_text:
        return ''
    
    html = md_text
    
    # Code blocks
    html = re.sub(r'```(\w+)?\n(.*?)```', lambda m: f'<div class="code-block">{escape_html(m.group(2))}</div>', html, flags=re.DOTALL)
    
    # Inline code
    html = re.sub(r'`([^`\n]+)`', r'<span class="highlight">\1</span>', html)
    
    # Bold
    html = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', html)
    
    # Headers
    html = re.sub(r'^###\s+(.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^##\s+(.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    
    # Lists
    html = re.sub(r'^-\s+(.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'^(\d+)\.\s+(.+)$', r'<li>\2</li>', html, flags=re.MULTILINE)
    
    # Wrap consecutive <li> in <ul>
    html = re.sub(r'(<li>.*?</li>)', r'<ul>\1</ul>', html, flags=re.DOTALL)
    html = html.replace('</ul>\n<ul>', '\n')
    
    # Paragraphs
    lines = html.split('\n')
    result = []
    in_list = False
    for line in lines:
        if line.strip().startswith('<li>') or line.strip().startswith('<ul>') or line.strip().startswith('</ul>'):
            if not in_list:
                in_list = True
            result.append(line)
        elif line.strip() and not line.strip().startswith('<'):
            if in_list:
                in_list = False
            if line.strip() and not line.strip().startswith('<h') and not line.strip().startswith('<div'):
                result.append(f'<p>{line.strip()}</p>')
        else:
            result.append(line)
    
    return '\n'.join(result)

# Session file mapping (Vietnamese files)
SESSION_FILES = {
    6: 'Vietnamese/phan_2_mysql_database/buoi_06_database_design.md',
    7: 'Vietnamese/phan_2_mysql_database/buoi_07_advanced_sql.md',
    8: 'Vietnamese/buoi_08_review_midterm.md',
    9: 'Vietnamese/phan_3_integration_advanced/buoi_09_error_handling.md',
    10: 'Vietnamese/phan_3_integration_advanced/buoi_10_php_mysql.md',
    11: 'Vietnamese/phan_3_integration_advanced/buoi_11_programming_techniques.md',
    12: 'Vietnamese/phan_3_integration_advanced/buoi_12_web_app_development.md',
    13: 'Vietnamese/phan_4_security_jquery/buoi_13_cookies_sessions.md',
    14: 'Vietnamese/phan_4_security_jquery/buoi_14_security_methods.md',
    15: 'Vietnamese/phan_4_security_jquery/buoi_15_jquery_intro.md',
}

# Session titles (English)
SESSION_TITLES = {
    6: 'Database Design',
    7: 'Advanced SQL',
    8: 'Review & Midterm',
    9: 'Error Handling',
    10: 'PHP + MySQL',
    11: 'Programming Techniques',
    12: 'Web App Development',
    13: 'Cookies & Sessions',
    14: 'Security Methods',
    15: 'jQuery Introduction',
}

def create_slide_file(session_num):
    """Create HTML slide file for a session"""
    if session_num not in SESSION_FILES:
        print(f"Session {session_num} not in mapping")
        return False
    
    md_file = SESSION_FILES[session_num]
    if not os.path.exists(md_file):
        print(f"File not found: {md_file}")
        return False
    
    print(f"Creating Slide{session_num:02d}.html from {md_file}...")
    
    # Read markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Extract title
    title_match = re.search(r'^#\s+[🟦🟩🟨🟧]\s+BUỔI\s+\d+\s*\n#\s+\*\*(.+?)\*\*', md_content, re.MULTILINE)
    session_title = SESSION_TITLES.get(session_num, f"Session {session_num:02d}")
    
    # Create slides
    slides = []
    
    # Slide 1: Title
    slides.append(f'''        <!-- Slide 1: Title Slide -->
        <div class="slide active">
            <div class="header-section">
                <h1>🎓 INS3064</h1>
                <h2>Multimedia Design & Web Development</h2>
                <p style="font-size: 1.2em; margin-top: 30px; color: #667eea;"><strong>Session {session_num:02d}: {session_title}</strong></p>
            </div>
            <div style="text-align: center; margin-top: 50px;">
                <p style="font-size: 1.1em; margin: 20px 0;">Course Code: <strong>INS3064</strong></p>
                <p style="font-size: 1.1em; margin: 20px 0;">Instructor: <strong>M.Sc. Hieu Ta Chi</strong></p>
                <p style="font-size: 1.1em; margin: 20px 0;">Host Department: <strong>Applied Sciences Department - IS-VNU</strong></p>
            </div>
        </div>''')
    
    # Extract session info
    info_match = re.search(r'##\s+📌\s+THÔNG TIN BUỔI HỌC\s*\n```\s*\n(.*?)```', md_content, re.DOTALL)
    if info_match:
        info_content = info_match.group(1)
        info_html = ''
        for line in info_content.strip().split('\n'):
            if line.strip():
                if ':' in line:
                    parts = line.split(':', 1)
                    key = parts[0].strip()
                    value = parts[1].strip() if len(parts) > 1 else ''
                    info_html += f'<p><strong>{escape_html(key)}:</strong> {escape_html(value)}</p>\n'
                else:
                    info_html += f'<p>{escape_html(line)}</p>\n'
        
        slides.append(f'''        <!-- Slide 2: Session Information -->
        <div class="slide">
            <h1>📌 Session Information</h1>
            <div class="box-info">
                {info_html}
            </div>
        </div>''')
    
    # Split content by major sections (##)
    sections = re.split(r'\n##\s+', md_content)
    slide_num = len(slides) + 1
    
    for section in sections[1:]:  # Skip first section (title)
        if not section.strip() or section.strip().startswith('📌'):
            continue
        
        lines = section.split('\n')
        section_title = lines[0].strip()
        section_content = '\n'.join(lines[1:])
        
        # Skip empty sections
        if not section_title or len(section_content.strip()) < 20:
            continue
        
        # Convert to HTML
        content_html = markdown_to_html_simple(section_content)
        
        # Create slide
        slides.append(f'''        <!-- Slide {slide_num}: {section_title} -->
        <div class="slide">
            <h1>{escape_html(section_title)}</h1>
            {content_html}
        </div>''')
        slide_num += 1
    
    # Create full HTML
    slides_html = '\n'.join(slides)
    full_html = get_template().format(
        title=f"Session {session_num:02d}: {session_title}",
        slides=slides_html,
        total_slides=len(slides)
    )
    
    # Write file
    output_file = f'Slide/Slide{session_num:02d}.html'
    os.makedirs('Slide', exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"  ✓ Created {output_file} with {len(slides)} slides")
    return True

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    
    print("Creating slides for sessions 06-15 from Vietnamese files...")
    print("=" * 60)
    
    for session_num in range(6, 16):
        create_slide_file(session_num)
    
    print("\n" + "=" * 60)
    print("All slides created successfully!")
