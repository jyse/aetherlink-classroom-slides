#!/usr/bin/env bash
set -euo pipefail

exec "${ANATOMY_CHROME_PATH:?}" --no-sandbox "$@"
