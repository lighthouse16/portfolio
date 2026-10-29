import os
import sys
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

PORT = 8089
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
OUT_DIR = os.path.abspath("D:/projects/portfolio/out")
OUTPUT_DIR = os.path.abspath("D:/projects/portfolio/screenshots")
CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"
os.makedirs(OUTPUT_DIR, exist_ok=True)

class StaticHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUT_DIR, **kwargs)
    def log_message(self, format, *args):
        pass # suppress server logs for clean test output

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    server = socketserver.TCPServer(("127.0.0.1", PORT), StaticHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    return server

def run_verification():
    print(f"Starting static test server on http://127.0.0.1:{PORT} serving {OUT_DIR}...")
    server = start_server()
    time.sleep(0.5)

    base_url = f"http://127.0.0.1:{PORT}"
    results_summary = []

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        # =========================================================================
        # 1. DIRECT ROUTE LOADS, HTTP 200, AND CANONICAL CHECKS
        # =========================================================================
        print("\n--- 1. Testing Direct Route Loads & Canonicals ---")
        routes_to_test = [
            ("/", "https://haidangtrih.me/", "Hai Dang Trinh"),
            ("/contact/", "https://haidangtrih.me/contact/", "Contact"),
            ("/projects/applynk/", "https://haidangtrih.me/projects/applynk/", "AppLynk"),
            ("/projects/deepflood/", "https://haidangtrih.me/projects/deepflood/", "DeepFlood"),
        ]

        context_desktop = browser.new_context(
            viewport={"width": 1440, "height": 900},
            permissions=["clipboard-read", "clipboard-write"]
        )
        page = context_desktop.new_page()

        for route, expected_canonical, content_snippet in routes_to_test:
            resp = page.goto(f"{base_url}{route}", wait_until="networkidle")
            assert resp is not None, f"No response for {route}"
            assert resp.status == 200, f"Expected 200 for {route}, got {resp.status}"

            # Check canonical link
            canonical_href = page.evaluate("() => document.querySelector('link[rel=\"canonical\"]')?.getAttribute('href')")
            assert canonical_href == expected_canonical, f"Canonical for {route} expected {expected_canonical}, got {canonical_href}"

            # Check text presence
            time.sleep(0.5)
            body_text = page.inner_text("body")
            assert content_snippet.lower() in body_text.lower(), f"Content '{content_snippet}' not found on {route}"
            print(f"  [PASS] Direct load {route}: HTTP {resp.status}, canonical={canonical_href}")

        results_summary.append("Direct route loads (4/4 HTTP 200, canonicals matching trailing-slash routing)")

        # =========================================================================
        # 2. HOMEPAGE NAVIGATION & CONTENT (PROJECT LINKS, APPLYNK, DEEPFLOOD, ABOUT)
        # =========================================================================
        print("\n--- 2. Testing Homepage Content & Navigation ---")
        page.goto(f"{base_url}/", wait_until="networkidle")
        time.sleep(0.5)

        # Check About section wording
        about_bio = page.locator("#about")
        assert about_bio.count() == 1, "About section not found"
        about_text = about_bio.inner_text()
        assert "I build applied AI tools, data pipelines, and web applications, taking projects from an initial idea to a working product." in about_text, "Natural About paragraph 1 missing"
        assert "My interests include machine learning, quantitative engineering, FinTech, and reliable software systems." in about_text, "Natural About paragraph 2 missing"
        assert "Computer Science student at The Hong Kong Polytechnic University, with a minor in Applied Mathematics." in about_text, "Academic About paragraph missing or altered"
        print("  [PASS] About section has natural personal wording and unaltered academic credentials")

        # Check Projects section shows both AppLynk and DeepFlood
        projects_section = page.locator("#projects")
        assert projects_section.count() == 1, "Projects section not found"
        p_text = projects_section.inner_text()
        assert "AppLynk" in p_text, "AppLynk missing from projects"
        assert "DeepFlood" in p_text, "DeepFlood missing from projects"
        assert "340 unique visitors · 976 pageviews" in p_text, "AppLynk homepage metrics line mismatch"
        assert "27 Sep to 28 Oct 2026" in p_text, "AppLynk reporting period mismatch on homepage"

        # Check project card internal links
        applynk_card_link = page.locator("#projects a[aria-label='Open AppLynk']")
        assert applynk_card_link.count() == 1, "AppLynk card link not found"
        applynk_href = applynk_card_link.get_attribute("href")
        assert applynk_href in ["/projects/applynk/", "/projects/applynk"], f"AppLynk href unexpected: {applynk_href}"

        deepflood_card_link = page.locator("#projects a[aria-label='Open DeepFlood']")
        assert deepflood_card_link.count() == 1, "DeepFlood card link not found"
        deepflood_href = deepflood_card_link.get_attribute("href")
        assert deepflood_href in ["/projects/deepflood/", "/projects/deepflood"], f"DeepFlood href unexpected: {deepflood_href}"

        # Capture desktop AppLynk project card
        applynk_card_link.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path=f"{OUTPUT_DIR}/desktop_applynk_project_card.png")
        print("  [PASS] Homepage project cards verified and screenshot captured")
        results_summary.append("Homepage content & project links (AppLynk & DeepFlood present with matching metrics)")

        # =========================================================================
        # 3. SKILLS LANGUAGES: CHINESE A1, ENGLISH IELTS 7.5, VIETNAMESE NATIVE
        # =========================================================================
        print("\n--- 3. Testing Skills Languages ---")
        skills_sec = page.locator("#skills")
        skills_sec.scroll_into_view_if_needed()
        time.sleep(0.5)

        # Click the Languages tab
        lang_tab = page.locator("#skills-tab-languages")
        assert lang_tab.count() == 1, "Languages tab button not found"
        lang_tab.click()
        time.sleep(0.5)

        languages_panel = page.locator("#skills-panel-languages")
        assert languages_panel.count() == 1, "Languages panel not found"
        lang_text = languages_panel.inner_text()
        assert "English" in lang_text and "IELTS 7.5" in lang_text, f"English IELTS 7.5 missing: {lang_text}"
        assert "Vietnamese" in lang_text and "Native" in lang_text, f"Vietnamese Native missing: {lang_text}"
        assert "Chinese" in lang_text and "A1" in lang_text, f"Chinese A1 missing: {lang_text}"
        assert "fluent" not in lang_text.lower(), "Proficiency claim over-extended"
        print("  [PASS] Languages verified: English IELTS 7.5, Vietnamese Native, Chinese A1")

        page.screenshot(path=f"{OUTPUT_DIR}/desktop_skills_languages_chinese_a1.png")
        results_summary.append("Skills Languages (Chinese A1 restored, English IELTS 7.5, Vietnamese Native)")

        # =========================================================================
        # 4. APPLYNK CASE STUDY: METRICS, REVENUE/MAU AVOIDANCE, LIVE CTA, TOC SCROLL
        # =========================================================================
        print("\n--- 4. Testing AppLynk Case Study ---")
        page.goto(f"{base_url}/projects/applynk/", wait_until="networkidle")
        time.sleep(0.5)

        # Header live link
        header_link = page.locator("a:has-text('↗ live website')")
        assert header_link.count() == 1, "Header live link not found"
        assert header_link.get_attribute("href") == "https://applynk.io.vn/en", f"Header link wrong: {header_link.get_attribute('href')}"

        # Status section live link and status string
        status_sec = page.locator("#status")
        assert status_sec.count() == 1, "Status heading not found"
        body_applynk = page.inner_text("body")
        assert "Live web application" in body_applynk, "Status string 'Live web application' missing"
        assert "Live website: https://applynk.io.vn/en" in body_applynk or "https://applynk.io.vn/en" in body_applynk

        # Check Results section and metric agreement
        results_headings = page.locator("#results")
        assert results_headings.count() == 1, f"Expected exactly 1 #results anchor, found {results_headings.count()}"

        results_text = page.evaluate("() => { const r = document.querySelector('#results'); return r ? r.parentElement.innerText : ''; }")
        assert "340" in results_text, "340 unique visitors missing in Results"
        assert "976" in results_text, "976 pageviews missing in Results"
        assert "27 Sep to 28 Oct 2026" in results_text, "Reporting period missing in Results"
        assert "Vercel Web Analytics" in results_text, "Source attribution missing in Results"
        assert "not registered-user or application-conversion figures" in results_text, "Secondary explanatory note missing"
        # Assert no lifetime / MAU / registered users / conversion claims
        assert "registered users" not in results_text.lower()
        assert "mau" not in results_text.lower()
        print("  [PASS] AppLynk Results section verified with exact metric synchronization and historical disclaimer")

        # Scroll to Results and take screenshot showing heading, metrics cards, and explanatory note
        page.evaluate("() => document.getElementById('results')?.scrollIntoView({ block: 'start' })")
        time.sleep(0.5)
        page.screenshot(path=f"{OUTPUT_DIR}/desktop_applynk_results_section.png")
        # Also capture focused metrics cards + explanatory note
        page.locator(".DeepFlood_metricsGrid__iQ8bI, div[class*='metricsGrid']").scroll_into_view_if_needed()
        time.sleep(0.4)
        page.screenshot(path=f"{OUTPUT_DIR}/desktop_applynk_results_metrics.png")

        # TOC Interaction: Assert clicking Results leaves heading fully visible and NOT obscured by fixed header
        print("  Testing Desktop TOC clicking...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)

        # Header height check
        header_height = page.evaluate("() => document.querySelector('header').getBoundingClientRect().height")
        print(f"  Fixed header height: {header_height}px")

        # Click Results in LineSidebar TOC
        toc_clicked = page.evaluate("""() => {
            const items = Array.from(document.querySelectorAll('aside li, aside button, aside span'));
            const resItem = items.find(el => el.innerText.trim() === 'Results');
            if (resItem) { resItem.click(); return true; }
            return false;
        }""")
        assert toc_clicked, "Results item in TOC not found or not clickable"
        time.sleep(0.8)

        heading_rect = page.evaluate("() => document.getElementById('results').getBoundingClientRect()")
        print(f"  #results heading rect after TOC click: top={heading_rect['top']}, bottom={heading_rect['bottom']}")
        assert heading_rect['top'] >= header_height - 2, f"Heading top ({heading_rect['top']}) is obscured by fixed header ({header_height})!"
        assert heading_rect['top'] < 900, "Heading is below the viewport!"
        print("  [PASS] Results heading scrolled into view without header occlusion")

        # Click a later section in TOC: "Decisions"
        decisions_clicked = page.evaluate("""() => {
            const items = Array.from(document.querySelectorAll('aside li, aside button, aside span'));
            const decItem = items.find(el => el.innerText.trim() === 'Decisions');
            if (decItem) { decItem.click(); return true; }
            return false;
        }""")
        assert decisions_clicked, "Decisions item in TOC not found or not clickable"
        time.sleep(0.8)
        dec_rect = page.evaluate("() => document.getElementById('decisions').getBoundingClientRect()")
        print(f"  #decisions heading rect after TOC click: top={dec_rect['top']}, bottom={dec_rect['bottom']}")
        assert dec_rect['top'] >= header_height - 2, f"#decisions top ({dec_rect['top']}) is obscured by fixed header ({header_height})!"
        assert dec_rect['top'] < 900, "#decisions heading is below viewport!"
        print("  [PASS] Decisions heading scrolled into view without header occlusion")

        results_summary.append("AppLynk case study & functional TOC (Results & Decisions clear fixed header)")

        # =========================================================================
        # 5. DEEPFLOOD CASE STUDY INTEGRITY
        # =========================================================================
        print("\n--- 5. Testing DeepFlood Case Study Integrity ---")
        page.goto(f"{base_url}/projects/deepflood/", wait_until="networkidle")
        time.sleep(0.5)

        df_text = page.inner_text("body")
        assert "SEAS 2025" in df_text, "DeepFlood origin missing"
        assert "NSE" in df_text and "RMSE" in df_text, "DeepFlood hydrological metrics missing"
        assert "Limitations" in df_text, "DeepFlood limitations section missing"
        assert "precomputed evaluation outputs" in df_text, "DeepFlood precomputed evaluation note missing"
        assert "https://deepflood.haidangtrih.me/" in df_text, "DeepFlood evaluation dashboard link missing"
        print("  [PASS] DeepFlood scientific content, metrics, limitations, and evaluation link intact")
        results_summary.append("DeepFlood case study integrity (metrics, limitations, and dashboard link intact)")

        # =========================================================================
        # 6. CONTACT PAGE & CLIPBOARD (SUCCESS, COPIED VALUE, FAILURE FEEDBACK, ACCESSIBILITY)
        # =========================================================================
        print("\n--- 6. Testing Contact Page & Clipboard Interaction ---")
        page.goto(f"{base_url}/contact/", wait_until="networkidle")
        time.sleep(0.5)

        # Check button exists - FAIL if missing
        copy_btn = page.locator("button:has-text('haidangtrih@gmail.com')")
        assert copy_btn.count() == 1, f"Expected exactly 1 email copy button, found {copy_btn.count()}"

        # Accessible name before click
        aria_label_before = copy_btn.get_attribute("aria-label")
        assert aria_label_before == "Copy email address to clipboard", f"Unexpected initial aria-label: {aria_label_before}"

        # Capture initial contact page
        page.screenshot(path=f"{OUTPUT_DIR}/desktop_contact_initial.png")

        # Test success path: Click copy button
        copy_btn.click()
        time.sleep(0.5)

        # Assert feedback in DOM
        btn_text_after = copy_btn.inner_text()
        assert "Copied to clipboard!" in btn_text_after, f"Expected success feedback, got: {btn_text_after}"
        assert copy_btn.get_attribute("aria-label") == "Email copied to clipboard"

        # Assert actual clipboard text
        copied_val = page.evaluate("() => navigator.clipboard.readText()")
        assert copied_val == "haidangtrih@gmail.com", f"Expected 'haidangtrih@gmail.com' in clipboard, got: {copied_val}"
        print(f"  [PASS] Clipboard copy succeeded: text='{copied_val}', feedback displayed")

        # Capture contact success state
        page.screenshot(path=f"{OUTPUT_DIR}/desktop_contact_success.png")

        # Assert URL did not navigate to '#'
        assert page.url.endswith("/contact/") or page.url.endswith("/contact"), f"URL unexpectedly navigated: {page.url}"

        # Test failure path in isolated page where clipboard and execCommand both fail
        print("  Testing Clipboard Failure Path...")
        fail_page = context_desktop.new_page()
        # Mock clipboard to throw and execCommand to fail
        fail_page.add_init_script("""
            Object.defineProperty(navigator, 'clipboard', {
                value: {
                    writeText: () => Promise.reject(new Error('Permission denied'))
                }
            });
            document.execCommand = () => false;
        """)
        fail_page.goto(f"{base_url}/contact/", wait_until="networkidle")
        time.sleep(0.5)

        fail_copy_btn = fail_page.locator("button:has-text('haidangtrih@gmail.com')")
        assert fail_copy_btn.count() == 1, "Copy button missing on fail page"
        fail_copy_btn.click()
        time.sleep(0.5)

        fail_btn_text = fail_copy_btn.inner_text()
        assert "Copied to clipboard!" not in fail_btn_text, f"Falsely displayed success on failure: {fail_btn_text}"
        assert "Copy failed" in fail_btn_text, f"Expected failure message, got: {fail_btn_text}"
        fail_aria = fail_copy_btn.get_attribute("aria-label")
        assert "Failed to copy" in fail_aria, f"Accessible error label missing: {fail_aria}"
        print(f"  [PASS] Clipboard failure correctly handled: feedback='{fail_btn_text}', no false success claim")

        # Capture contact failure state
        fail_page.screenshot(path=f"{OUTPUT_DIR}/desktop_contact_failure.png")
        fail_page.close()

        # Test keyboard activation (focus and Enter key)
        print("  Testing Keyboard Activation on Contact...")
        page.goto(f"{base_url}/contact/", wait_until="networkidle")
        time.sleep(0.5)
        copy_btn = page.locator("button:has-text('haidangtrih@gmail.com')")
        copy_btn.focus()
        page.keyboard.press("Enter")
        time.sleep(0.5)
        assert "Copied to clipboard!" in copy_btn.inner_text(), "Keyboard activation failed to trigger copy"
        print("  [PASS] Keyboard activation (focus + Enter) works properly")

        results_summary.append("Contact & Clipboard (copy button, actual value check, failure fallback, keyboard activation)")
        context_desktop.close()

        # =========================================================================
        # 7. RESPONSIVE LAYOUT & HORIZONTAL OVERFLOW (1440x900 & 390x844)
        # =========================================================================
        print("\n--- 7. Testing Responsive Layout & Horizontal Overflow ---")
        viewports = [
            ("desktop", 1440, 900, False),
            ("mobile", 390, 844, True),
        ]

        pages_to_check = ["/", "/contact/", "/projects/applynk/", "/projects/deepflood/"]

        for vp_name, width, height, is_mob in viewports:
            vp_context = browser.new_context(
                viewport={"width": width, "height": height},
                is_mobile=is_mob,
                permissions=["clipboard-read", "clipboard-write"]
            )
            vpage = vp_context.new_page()

            for p_route in pages_to_check:
                vpage.goto(f"{base_url}{p_route}", wait_until="networkidle")
                time.sleep(0.4)

                # Check for document-level horizontal overflow
                overflow = vpage.evaluate("""() => {
                    return document.documentElement.scrollWidth > window.innerWidth;
                }""")
                scroll_w = vpage.evaluate("() => document.documentElement.scrollWidth")
                inner_w = vpage.evaluate("() => window.innerWidth")
                assert not overflow, f"Horizontal overflow detected on {vp_name} for {p_route}: scrollWidth={scroll_w} > innerWidth={inner_w}"
                print(f"  [PASS] No horizontal overflow on {vp_name} ({width}x{height}) for {p_route}")

            # Specific mobile tests
            if is_mob:
                # Capture mobile AppLynk card on home
                vpage.goto(f"{base_url}/", wait_until="networkidle")
                vpage.locator("#projects a[aria-label='Open AppLynk']").scroll_into_view_if_needed()
                time.sleep(0.5)
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_applynk_project_card.png")

                # Mobile menu navigation: require button, open, navigate to Projects, close
                menu_btn = vpage.get_by_role("button", name="Open navigation", exact=True)
                assert menu_btn.count() == 1, f"Expected exactly 1 'Open navigation' button, found {menu_btn.count()}"
                menu_btn.click()
                time.sleep(0.4)

                close_menu_btn = vpage.get_by_role("button", name="Close navigation", exact=True)
                assert close_menu_btn.count() == 1, "Menu did not expose the 'Close navigation' button after opening"
                assert close_menu_btn.get_attribute("aria-expanded") == "true", "Mobile menu did not report aria-expanded=true"

                projects_nav = vpage.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects", exact=True)
                assert projects_nav.count() == 1, f"Expected exactly 1 Projects navigation link, found {projects_nav.count()}"
                assert projects_nav.is_visible(), "Projects navigation link not visible after opening mobile menu"
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_menu_open.png")

                projects_nav.click()
                vpage.wait_for_function("""() => {
                    const section = document.getElementById('projects');
                    if (!section) return false;
                    const rect = section.getBoundingClientRect();
                    return rect.top < window.innerHeight && rect.bottom > 0;
                }""")
                time.sleep(0.4)

                reopened_menu_btn = vpage.get_by_role("button", name="Open navigation", exact=True)
                assert reopened_menu_btn.count() == 1, "Mobile menu did not close after selecting Projects"
                assert reopened_menu_btn.get_attribute("aria-expanded") == "false", "Mobile menu did not report aria-expanded=false after navigation"
                assert vpage.locator("#projects").evaluate("""section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top < window.innerHeight && rect.bottom > 0;
                }"""), "Projects section did not reach the visible viewport after navigation"
                assert vpage.url.rstrip("/") == base_url, f"Projects navigation changed to unexpected URL: {vpage.url}"
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_menu_projects_navigation.png")
                print("  [PASS] Mobile menu opens, navigates to Projects, reaches section, and closes")

                # Mobile AppLynk case study & Results screenshot
                vpage.goto(f"{base_url}/projects/applynk/", wait_until="networkidle")
                vpage.evaluate("() => document.getElementById('results')?.scrollIntoView({ block: 'start' })")
                time.sleep(0.5)
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_applynk_results_section.png")
                vpage.locator("div[class*='metricsGrid']").scroll_into_view_if_needed()
                time.sleep(0.4)
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_applynk_results_metrics.png")

                # Mobile Contact screenshot
                vpage.goto(f"{base_url}/contact/", wait_until="networkidle")
                time.sleep(0.5)
                vpage.screenshot(path=f"{OUTPUT_DIR}/mobile_contact.png")

            vp_context.close()

        results_summary.append("Responsive layout & no document horizontal overflow (1440x900 & 390x844)")

        # =========================================================================
        # 8. MOTION ACCESSIBILITY (prefers-reduced-motion: reduce)
        # =========================================================================
        print("\n--- 8. Testing Reduced Motion Accessibility ---")
        reduced_context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        rpage = reduced_context.new_page()

        for route in ["/", "/contact/", "/projects/applynk/"]:
            rpage.goto(f"{base_url}{route}", wait_until="networkidle")
            time.sleep(0.4)

            # Assert reveal elements are visible (opacity > 0)
            hidden_elements = rpage.evaluate("""() => {
                const els = Array.from(document.querySelectorAll('.reveal'));
                const hidden = els.filter(el => {
                    const style = window.getComputedStyle(el);
                    return style.opacity === '0' || style.visibility === 'hidden';
                });
                return hidden.length;
            }""")
            assert hidden_elements == 0, f"Found {hidden_elements} hidden .reveal elements with reduced motion on {route}"
            print(f"  [PASS] Reduced motion verified on {route}: essential text rendered and visible")

        reduced_context.close()
        results_summary.append("Motion accessibility (prefers-reduced-motion verified across routes)")

        browser.close()

    server.shutdown()
    print("\n=======================================================")
    print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY WITH 0 FAILURES!")
    print("Summary of verified assertions:")
    for s in results_summary:
        print(f"  + {s}")
    print("=======================================================")

if __name__ == "__main__":
    run_verification()
