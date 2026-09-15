#!/usr/bin/env python3
"""Serve this deck with real no-cache HTTP headers.

`python3 -m http.server` does not send Cache-Control headers, so browsers
are free to reuse a stale copy of index.html/slides.js/etc. across edits
and reloads — which is exactly the problem when Constance needs to make a
last-minute text change and refresh. This tiny wrapper sends
`Cache-Control: no-store` on every response so a normal refresh always
gets the current file on disk.

Usage: python3 serve.py [port]   (default port 8080)
"""
import http.server
import os
import sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    # Always serve THIS script's own directory, regardless of the caller's
    # working directory (e.g. an IDE task runner or launch.json config that
    # invokes `python3 /path/to/serve.py` from somewhere else entirely).
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    http.server.test(HandlerClass=NoCacheHandler, port=port)
