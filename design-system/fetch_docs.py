#!/usr/bin/env python3
"""Fetch Catalyst component docs and save as markdown alongside each .tsx file."""

import re
import time
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

BASE_URL = "https://catalyst.tailwindui.com/docs"
OUTPUT_DIR = Path(__file__).parent / "catalyst" / "typescript"

COMPONENTS = [
    "alert",
    "auth-layout",
    "avatar",
    "badge",
    "button",
    "checkbox",
    "combobox",
    "description-list",
    "dialog",
    "divider",
    "dropdown",
    "fieldset",
    "heading",
    "input",
    "link",
    "listbox",
    "navbar",
    "pagination",
    "radio",
    "select",
    "sidebar",
    "sidebar-layout",
    "stacked-layout",
    "switch",
    "table",
    "text",
    "textarea",
]


class DocExtractor(HTMLParser):
    """Extract main doc content and convert to markdown."""

    def __init__(self):
        super().__init__()
        self._in_main = False
        self._main_tag = None
        self._stack = []
        self._attrs_stack = []
        self.chunks = []
        self._skip_tags = {"script", "style", "nav", "header", "footer"}
        self._skip_depth = 0
        # pre/code block state
        self._in_pre = False
        self._pre_buf = []
        # table state
        self._in_table = False
        self._row_buf = []
        self._table_header_done = False

    def _in_stack(self, *tags):
        return any(t in self._stack for t in tags)

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        if self._skip_depth > 0:
            self._skip_depth += 1
            return

        if tag in self._skip_tags:
            self._skip_depth = 1
            return

        if not self._in_main:
            classes = attrs_dict.get("class", "")
            role = attrs_dict.get("role", "")
            if tag in ("main", "article") or role == "main" or "prose" in classes or "content" in classes:
                self._in_main = True
                self._main_tag = tag

        if self._in_main:
            self._stack.append(tag)
            self._attrs_stack.append(attrs_dict)

            if tag == "pre":
                self._in_pre = True
                self._pre_buf = []
            elif tag == "table":
                self._in_table = True
                self._table_header_done = False
            elif tag == "tr" and self._in_table:
                self._row_buf = []

    def handle_endtag(self, tag):
        if self._skip_depth > 0:
            self._skip_depth -= 1
            return

        if self._in_main:
            if tag == "pre":
                code = "".join(self._pre_buf).strip()
                self.chunks.append(f"\n\n```tsx\n{code}\n```\n")
                self._in_pre = False
                self._pre_buf = []
            elif tag == "table":
                self._in_table = False
            elif tag == "tr" and self._in_table:
                row = "| " + " | ".join(self._row_buf) + " |"
                self.chunks.append(f"\n{row}")
                if not self._table_header_done:
                    sep = "| " + " | ".join("---" for _ in self._row_buf) + " |"
                    self.chunks.append(f"\n{sep}")
                    self._table_header_done = True
            elif tag == "h2":
                self.chunks.append("\n")

            if self._stack and self._stack[-1] == tag:
                self._stack.pop()
                self._attrs_stack.pop()

            if tag == self._main_tag and not self._stack:
                self._in_main = False

    def handle_data(self, data):
        if self._skip_depth > 0 or not self._in_main:
            return

        if self._in_pre:
            self._pre_buf.append(data)
            return

        text = data.strip()
        if not text:
            return

        tag = self._stack[-1] if self._stack else ""
        attrs = self._attrs_stack[-1] if self._attrs_stack else {}

        if self._in_table and tag in ("th", "td"):
            self._row_buf.append(text)
            return

        if tag == "h1":
            self.chunks.append(f"\n\n# {text}\n")
        elif tag == "h2":
            self.chunks.append(f"\n\n## {text}")
        elif tag == "h3":
            self.chunks.append(f"\n\n### {text}\n")
        elif tag == "h4":
            self.chunks.append(f"\n\n#### {text}\n")
        elif tag == "code":
            self.chunks.append(f"`{text}`")
        elif tag == "strong":
            self.chunks.append(f"**{text}**")
        elif tag == "em":
            self.chunks.append(f"*{text}*")
        elif tag == "a":
            href = attrs.get("href", "")
            self.chunks.append(f"[{text}]({href})" if href else text)
        elif tag == "li":
            self.chunks.append(f"\n- {text}")
        elif tag in ("p", "dd"):
            self.chunks.append(f"\n\n{text}")
        elif tag == "dt":
            self.chunks.append(f"\n**{text}**")
        else:
            self.chunks.append(f" {text}")

    def get_markdown(self):
        md = "".join(self.chunks)
        md = re.sub(r"\n{3,}", "\n\n", md)
        return md.strip()


def fetch_page(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; doc-fetcher/1.0)"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode("utf-8")


def html_to_markdown(html: str) -> str:
    parser = DocExtractor()
    parser.feed(html)
    return parser.get_markdown()


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for component in COMPONENTS:
        url = f"{BASE_URL}/{component}"
        out_path = OUTPUT_DIR / f"{component}.md"
        print(f"Fetching {url} ...", end=" ", flush=True)

        try:
            html = fetch_page(url)
            md = html_to_markdown(html)

            if len(md) < 100:
                print(f"WARNING: suspiciously short content ({len(md)} chars), skipping")
                continue

            out_path.write_text(f"# {component}\n\nSource: {url}\n\n{md}\n", encoding="utf-8")
            print(f"OK ({len(md)} chars) -> {out_path.name}")
        except Exception as e:
            print(f"ERROR: {e}")

        time.sleep(0.5)

    print("\nDone.")


if __name__ == "__main__":
    main()
