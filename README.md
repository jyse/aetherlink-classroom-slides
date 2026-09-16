# Aetherlink × Worldline — classroom deck

The 78-slide HTML deck for the two teaching days ("Working with AI and
Claude Code" and "Reusable and connected AI workflows"), built around the
**Aether Library** practice project. Plain static site — HTML, CSS,
vanilla JS. No build step, no framework, no dependencies to install.

Content source of truth: `CURRICULUM.md` in this repo, including its
"Resolved alignment decisions" section, which overrides three points in the
base document and was applied when `slides.js` was authored:

1. **Assignment 9 (Slide 64)** — AI feedback is *required*, not an optional
   extension, and needs no API credentials. The participant's own
   Claude Code session checks the submission via a second skill
   (`term-checker`) against a class-authored `checklist.md`, entirely
   through local files (`data/latest-submission.json` →
   `data/latest-feedback.json`). Slide 65 documents `checklist.md` and the
   term-checker skill; the old "optional extension" / backend-API-route
   framing was dropped.
2. **Slide 27** carries the full three-tier "SDLC → working method → agent
   loop" framing (a `compare` layout with three nested columns), not just
   the two-loop version from the base document.
3. **Part 5 (Slides 67–72)** treats the real Jira/GitLab/Confluence MCP
   connections as the primary, confirmed path — not a stretch goal — while
   still keeping local fixtures as a fallback.

## Run it

```
python3 serve.py 8080
```

Then open `http://localhost:8080/#1`. Stop the server with Ctrl-C. No install,
no build — that's the whole workflow.

`serve.py` also disables browser caching outright, but this deck's own HTML
tags additionally cache-bust every asset with a `?v=` query string
(`styles.css?v=3`, `slides.js?v=3`, `app.js?v=3` / `presenter.js?v=3`) —
bump that number whenever you edit `slides.js`, `app.js`, `styles.css` or
`presenter.js` and want to be certain a stale tab picks up the change.

**Use `serve.py`, not plain `python3 -m http.server`.** Browsers cache
`index.html`/`slides.js` aggressively, so after editing a slide a normal
refresh can silently keep showing the *old* content — `serve.py` is a
tiny wrapper that sends real no-cache HTTP headers so every refresh gets
what's actually on disk. If you ever do use `python3 -m http.server` or
`npx serve` instead, do a hard refresh (or open a private window) after
every edit.

Jump to any slide directly via the URL hash, e.g. `#31` for Assignment 1.

## Navigating the deck

- **Arrow keys** (`←`/`→`) or **Page Up/Down** move between slides; `Home`/`End`
  jump to the first/last slide.
- **Chapters** (toolbar) opens a jump-to-any-slide list — useful for skipping
  around live.
- **Example prompt** shows the current slide's exact, copy-ready prompt
  (the `prompt` field in `slides.js`) with a one-click copy button.
- **Fullscreen** (⛶) toggles fullscreen, useful when mirroring to a projector.
- The footer progress bar has one coloured segment per slide (colour = slide
  type — see "Visual system" below) and doubles as a scrubber: click any
  segment to jump there.

## Presenter view (the main new feature)

Press **`S`** at any time in the main deck, or click **Presenter view** in the
toolbar. This opens `presenter.html` in a **separate browser window/tab** —
put that window on your laptop screen and keep the main deck (`index.html`)
on the projector. The projector never shows presenter notes.

The presenter window shows, for the slide currently on screen:

- the slide's type, kicker and title (compact, text-only — not a full re-render)
- **Facilitator notes** (the `notes` field) — practical, presenter-only guidance
- **Say / paste this** (the `prompt` field) when the slide has one — the exact
  words to read aloud or paste into Claude Code
- a preview of the **next slide's** title, so you're never caught off guard
- a running **elapsed** clock since you opened the presenter window
- a per-slide **assignment countdown** when the current slide carries a
  `timer` (e.g. Assignment 1's 25 minutes), with its own Start/Pause/Reset

**How the sync works:** the main window broadcasts its current slide index
every time it changes (on every `hashchange`), using a same-origin
`BroadcastChannel` named `aetherlink-classroom-slides` — no server, nothing
sent over the network. The presenter window listens on that channel and
updates live. If `BroadcastChannel` isn't available (older Safari/WebView),
both windows fall back to writing/reading `localStorage` and listening for
the browser's `storage` event, so the sync still works, just with a small
tick of latency instead of being instant.

Practical notes:
- Open the presenter window **after** the main deck is loaded in the other
  tab/window (same browser, same origin — `file://` won't work, you must be
  serving over `http://localhost`).
- If your browser blocks the pop-up, allow pop-ups for `localhost:8080` and
  press `S` again.
- Closing and reopening the presenter window is safe — it reads the last
  known slide from `localStorage` immediately on load, then goes live.

## Assignment visibility

Every slide with `layout: "exercise"` (all ten "Assignment N" slides) renders
with a treatment that's unmistakable from across a room:

- a thick amber border around the whole slide (`#stage`), with a soft glow
- a persistent **"ASSIGNMENT IN PROGRESS"** banner at the top of the slide
- a large, high-contrast countdown timer — every one of the ten assignments
  states an exact duration in `CURRICULUM.md` (25–60 minutes), and each
  carries its own `timer` value — the timer turns red and pulses in the
  last minute
- the same amber accent on the "Do this now" checklist panel

## Visual system

Palette copied from the Academy app (`aetherlink-academy-app/src/style.css`)
so this deck looks visually continuous with the product participants use for
the rest of the seven days. On top of that base, an optional **AetherBOT
visual layer** (see below) adds the AetherMind Canva-style purple/orange
accents and the AetherBOT assistant, slide by slide.

- **Font:** Nunito (600–900), self-hosted in `assets/fonts/` via `@font-face`
  with Inter/system fallback — still no external font request, so the deck
  keeps working offline and on restricted networks.
- **Base look:** dark navy by default (`--bg:#06111e`), matching the Academy
  app's own default. A small number of high-impact statement slides
  (`dark: true` in `slides.js` — currently the cover slide and the live-demo
  slide) push to an even deeper "spotlight" background for emphasis; this is
  the same per-slide mechanic the source engine used, just re-tuned so the
  deck's *default* is already dark instead of light.
- **Both** the Academy app's dark and light token sets are defined in
  `styles.css` (`:root` and `:root[data-theme="light"]`) for parity with the
  Academy app's own file, even though this deck only uses the dark set today.

**Slide-type colours** (chip in the eyebrow + footer segment), set explicitly
on the `type` field of every slide rather than guessed from its title:

| type | colour | used for |
| --- | --- | --- |
| `concept` | cyan (`--cyan`, Academy's own accent) | teaching content |
| `practice` | **amber** (`--amber`, new) | every assignment slide |
| `review` | violet (`--violet`, Academy's own accent) | gates, debriefs, checkpoints |
| `recap` | slate blue-grey | closing/summary slides |
| `pause` | steel blue-grey | breaks and lunch (6 slides: two lunches, four short breaks) |
| `context` | deep steel blue-grey | welcome, boundaries, previews |

Amber is a deliberate new addition, not part of the Academy app's base
palette. The brief specifically asked for a strong, distinct "this is an
assignment" colour separate from cyan and violet — reusing either of those
would have made assignment slides blend into ordinary concept/review slides.
Amber reads clearly against the navy background and doesn't collide with any
existing Academy UI colour.

### AetherBOT visual layer (`visual` field in `slides.js`)

Purely additive: it never changes slide wording (verified by diffing every
slide's text fields against the previous version — 0 differences). A slide
without a `visual` field renders exactly as before. Currently used on slides 1–4.

- **Colours** (AetherMind Canva style): purple `#5B3FFF`, orange `#FF7A1A`
  (`--aether-purple`, `--aether-orange`; `--aether-purple-text` is a lighter
  tint for text on dark). The presenter button uses a purple→orange gradient.
- **Highlights:** `highlight: [{ in: 'title'|'subtitle'|'card:N', text, tone:
  'orange'|'purple'|'mark' }]` wraps an existing word in a span. `text` must
  occur verbatim.
- **AetherBOT is an assistant, not decoration.** `bot` picks a pose
  (`wave`, `think`, `point`, or `head` only), `place` where he stands
  (`left`, `beside`, `under`, `timeline`), and `tool` what comes out of the
  hatch in his head to explain the slide: `map` (trail to a card), `arm`
  (extending arm that taps `target`), `toolbox` (tools fly into the pillars),
  `thought` (thought cloud). Tool positions are measured at runtime, so they
  follow the layout and are redrawn on resize.
- **Motion** is transform/opacity only, plays when a slide is shown (again on
  revisit), and is switched off entirely by `prefers-reduced-motion`.
- **Robot images** (`assets/aetherbot/*.webp`, 60–85 KB each) are transparent
  cut-outs. The chest logo is the AetherLink mark and must never be altered.
- **Known gap:** the light token set still isn't wired to a toggle, and slides
  with `dark: true` are unreadable if `data-theme="light"` is forced.

## How to edit a slide

Everything participants see comes from **`slides.js`** — one big list, one
object per slide, in on-screen order. You do not need to touch `app.js`,
`styles.css`, or `index.html` to change what's on a slide.

Open `slides.js` in any text editor. Find the slide by its number (the `//
Slide 31` comment above each block) or by searching for its title. Each
slide looks like this:

```js
{ // Slide 4
  title: "Work that could improve",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Which recurring task costs you time or creates unnecessary uncertainty?",
  type: "context",
  cards: [
    { title: "Describe the problem", body: "Leave the solution open for now." }
  ],
  prompt: "Which recurring task costs you time or creates unnecessary uncertainty? Describe the current problem. Leave the solution open for now.",
  notes: "Very short opening discussion — two or three minutes..."
}
```

**To change on-screen text:** edit the string after `title:` or `subtitle:`,
or the `body:` text inside a card. Keep the quote marks. For example, to
soften slide 4's subtitle:

```js
  subtitle: "Which recurring task costs you time or creates unnecessary uncertainty?",
```

becomes

```js
  subtitle: "What's one thing that wastes your team's time every week?",
```

**After saving — refresh the browser, don't just reload:** browsers
aggressively cache `slides.js`, so a normal refresh can silently keep
showing your *old* content even after you've saved real changes.
`index.html` and `presenter.html` load it as `slides.js?v=3` for exactly
this reason — after editing, bump that number by one everywhere it
appears (`index.html`, `presenter.html` — three tags each: `styles.css`,
`slides.js`, `app.js`/`presenter.js`) and refresh. If a change still
doesn't show up, that's the first thing to check.

**Rules that keep the file working:**
- Every slide is wrapped in `{ ... }` and separated from the next by a comma.
- Every piece of text is wrapped in matching quote marks (`"..."`). If your
  text itself contains a `"`, either use `'...'` instead for that string, or
  put a backslash before the inner quote (`\"`).
- A `\n` inside a card's `body` text starts a new line within that card.
- Don't delete the commas between fields (`title: "...",`) or between cards.
- If you're not sure your edit is valid, run `node --check slides.js` in a
  terminal from this folder — it prints nothing on success, or a line number
  on a mistake.

**Fields you're safe to add or leave blank:**
- `notes` — facilitator-only speaker notes, shown only in the presenter view.
- `prompt` — an exact phrase to read aloud or paste into Claude Code, shown
  in the "Example prompt" panel and the presenter view.
- `timer` — a number of minutes; only set this when the curriculum states an
  exact duration. All ten assignments state one today, from 25 to 60 minutes.

Reload the browser tab after saving — there's no build step, so your change
appears immediately.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell for the audience-facing deck |
| `styles.css` | Academy-matched colours, typography, layout, assignment styling, AetherBOT visual layer |
| `app.js` | Rendering (incl. `renderVisual` for the AetherBOT layer), hash navigation, keyboard nav, timers, the "Do this now" panel, the footer progress bar, and presenter-sync broadcasting |
| `slides.js` | All 78 slides as one JSON-shaped data file — the only file most edits touch |
| `assets/aetherbot/` | AetherBOT cut-outs (wave, think, point, head) used by the visual layer |
| `assets/fonts/` | Self-hosted Nunito (latin + latin-ext, variable 600–900) |
| `presenter.html` / `presenter.js` | The separate presenter window (notes, prompt, next slide, timers), kept live via `BroadcastChannel` |
| `CURRICULUM.md` | The authoritative slide-by-slide source content (do not need to edit this for day-of tweaks — edit `slides.js`) |

## Known deviations from the source engine (and why)

This deck reuses the `aetherlink-training-site` engine's mechanism (hash
nav, keyboard nav, footer progress bar, per-slide dark variant, the seven
layout renderers, the "Do this now" exercise panel) but simplifies several
things that don't apply here:

- **One flat 78-slide array**, not a multi-squad/multi-day picker — this
  deck is always exactly these 78 slides in this order, so the "Choose
  session" picker, `?day=`/`?squad=` query params, and the framework-mode
  fallback slides were removed rather than adapted.
- **No mascot** — removed per the brief; that's specific to the separate
  Aether Library practice repo, not this deck.
- **No glossary panel** — the source engine's glossary was tied to its own
  `glossary.js` fixture, which doesn't exist for this curriculum; Assignment
  3's glossary work happens in the Aether Library practice repo, not this
  deck.
- **Slide type is set explicitly** (a `type` field on every slide) rather
  than guessed from kicker/title text via regex, as the source engine did.
  With 78 hand-authored slides, explicit typing is more reliable than
  pattern-matching against titles that were never designed for it.
- **`compare` supports a third column** (Slide 27's three-tier SDLC →
  working method → agent loop framing) with its own amber border/heading
  colour, a small, clearly-scoped addition to `styles.css` beyond the source
  engine's two-column layout — `app.js`'s `renderCompare` already looped
  over any number of columns, so no JS change was needed.
- **The old "Facilitator notes" dialog was removed** in favour of the new
  presenter window. The source engine's notes dialog opened *on the same
  screen* — if that screen is mirrored to a projector, participants would
  see the notes. The presenter window is a genuinely separate window, so
  it's the only way to see notes without exposing them to the room.

## Manual verification still needed (do this yourself before teaching)

This was checked with an automated browser pass (all 7 layouts, mobile
width, no console errors, presenter sync confirmed live across two tabs),
but you should still, on the actual machine and screen you'll teach from:

This build was checked with a syntax pass (`node --check slides.js`), a slide
count/timer/type consistency check, and a sample click-through (slide 1, the
three-tier slide 27, a `compare`-layout slide, an assignment slide's amber
treatment and timer, a pause slide, and the last slide) with no console
errors. It has **not** been read start to finish for tone/accuracy — do that
yourself before teaching:

1. **Click through all 78 slides in order**, start to finish, both days.
   Confirm nothing looks broken and the content reads correctly end to end —
   this was sampled, not read in full, for tone and factual accuracy.
2. **Read slides 62–66 (the Explain It Back / Assignment 9 area) closely** —
   this is the section most changed from the base `CURRICULUM.md` document
   (AI feedback folded in as required behaviour, no separate optional
   extension) and is the highest-value place to check the wording matches
   how you'll actually run it.
3. **Confirm slide 27 ("Three views of the same work")** reads clearly as
   nested outer→middle→inner, not as three unrelated lists — practise
   narrating the nesting out loud once before teaching it live.
4. **Confirm slide 30's clone command** still points at
   `aetherlink-classroom-practice.git` while the on-screen product name
   reads "Aether Library" elsewhere — this mismatch is intentional (the
   GitHub repo name isn't changing) but is worth double-checking against
   whatever the practice repo actually ships with.
5. **Test the presenter view on your real dual-monitor/projector setup** —
   press `S`, drag the presenter window to your laptop screen, confirm the
   projector only shows the main deck. Click through a few slides and watch
   the presenter window update live.
6. **Run at least one assignment timer for real** (e.g. slide 31,
   Assignment 1) — start it, let it run down, confirm the red pulse in the
   last minute is visible from the back of the room.
7. **Check the "Example prompt" copy button** works in your actual browser
   (clipboard permissions vary by browser/OS), especially on the longer
   multi-paragraph prompts (slides 31, 64, 70).
8. **Read every `notes` field once** — they're written for a solo facilitator
   who hasn't taught this content before; flag anything that doesn't match
   how you actually plan to run a slide.
