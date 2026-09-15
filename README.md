# Aetherlink × Worldline — classroom deck

The 82-slide HTML deck for the two teaching days ("From AI to your first
tested change" and "From one-off prompt to reusable agent workflow"). Plain
static site — HTML, CSS, vanilla JS. No build step, no framework, no
dependencies to install.

Content source of truth: `CURRICULUM.md` in this repo. Slide content lives
in `slides.js` and was transcribed from it slide-by-slide, including the two
required content edits (Slide 36 reframed as a mob-programming preview,
Slide 68 keeping all five agent-loop steps including "Decide").

## Run it

```
python3 serve.py 8080
```

Then open `http://localhost:8080/#1`. Stop the server with Ctrl-C. No install,
no build — that's the whole workflow.

**Use `serve.py`, not plain `python3 -m http.server`.** Browsers cache
`index.html`/`slides.js` aggressively, so after editing a slide a normal
refresh can silently keep showing the *old* content — `serve.py` is a
tiny wrapper that sends real no-cache HTTP headers so every refresh gets
what's actually on disk. If you ever do use `python3 -m http.server` or
`npx serve` instead, do a hard refresh (or open a private window) after
every edit.

Jump to any slide directly via the URL hash, e.g. `#29` for Assignment 1.

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

Every slide with `layout: "exercise"` (all ten "Assignment N" slides plus
sub-slides) renders with a treatment that's unmistakable from across a room:

- a thick amber border around the whole slide (`#stage`), with a soft glow
- a persistent **"ASSIGNMENT IN PROGRESS"** banner at the top of the slide
- a large, high-contrast countdown timer when the slide has a stated
  duration (only Assignment 1 has one in the curriculum: 25 minutes) — the
  timer turns red and pulses in the last minute
- the same amber accent on the "Do this now" checklist panel

## Visual system

Palette copied from the Academy app (`aetherlink-academy-app/src/style.css`)
so this deck looks visually continuous with the product participants use for
the rest of the seven days — no purple/orange AetherBOT branding, no mascot.

- **Font:** Inter, with the same system-font fallback stack the Academy app
  itself uses (no `@font-face`, no external font request — keeps the deck
  working offline).
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
| `pause` | steel blue-grey | breaks (unused by the 82 slides today, kept for completeness) |
| `context` | deep steel blue-grey | welcome, boundaries, previews |

Amber is a deliberate new addition, not part of the Academy app's base
palette. The brief specifically asked for a strong, distinct "this is an
assignment" colour separate from cyan and violet — reusing either of those
would have made assignment slides blend into ordinary concept/review slides.
Amber reads clearly against the navy background and doesn't collide with any
existing Academy UI colour.

## How to edit a slide

Everything participants see comes from **`slides.js`** — one big list, one
object per slide, in on-screen order. You do not need to touch `app.js`,
`styles.css`, or `index.html` to change what's on a slide.

Open `slides.js` in any text editor. Find the slide by its number (the `//
Slide 29` comment above each block) or by searching for its title. Each
slide looks like this:

```js
{ // Slide 4
  title: "Start with the problem",
  kicker: "DAY 1 · WELCOME",
  subtitle: "What recurring task or frustration costs your team time?",
  type: "context",
  cards: [
    { title: "Prompt", body: "Describe the problem, not the solution." }
  ],
  prompt: "What recurring task or frustration costs your team time? Describe the problem, not the solution.",
  notes: "Very short opening discussion — two or three minutes..."
}
```

**To change on-screen text:** edit the string after `title:` or `subtitle:`,
or the `body:` text inside a card. Keep the quote marks. For example, to
soften slide 4's subtitle:

```js
  subtitle: "What recurring task or frustration costs your team time?",
```

becomes

```js
  subtitle: "What's one thing that wastes your team's time every week?",
```

**After saving — refresh the browser, don't just reload:** browsers
aggressively cache `slides.js`, so a normal refresh can silently keep
showing your *old* content even after you've saved real changes.
`index.html` and `presenter.html` load it as `slides.js?v=2` for exactly
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
  exact duration (only Assignment 1 has one today).

Reload the browser tab after saving — there's no build step, so your change
appears immediately.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell for the audience-facing deck |
| `styles.css` | Academy-matched colours, typography, layout, assignment styling |
| `app.js` | Rendering, hash navigation, keyboard nav, timers, the "Do this now" panel, the footer progress bar, and presenter-sync broadcasting |
| `slides.js` | All 82 slides as one JSON-shaped data file — the only file most edits touch |
| `presenter.html` / `presenter.js` | The separate presenter window (notes, prompt, next slide, timers), kept live via `BroadcastChannel` |
| `CURRICULUM.md` | The authoritative slide-by-slide source content (do not need to edit this for day-of tweaks — edit `slides.js`) |

## Known deviations from the source engine (and why)

This deck reuses the `aetherlink-training-site` engine's mechanism (hash
nav, keyboard nav, footer progress bar, per-slide dark variant, the seven
layout renderers, the "Do this now" exercise panel) but simplifies several
things that don't apply here:

- **One flat 82-slide array**, not a multi-squad/multi-day picker — this
  deck is always exactly these 82 slides in this order, so the "Choose
  session" picker, `?day=`/`?squad=` query params, and the framework-mode
  fallback slides were removed rather than adapted.
- **No mascot** — removed per the brief.
- **No glossary panel** — the source engine's glossary was tied to its own
  `glossary.js` fixture, which doesn't exist for this curriculum; Assignment
  3's glossary work happens in the Academy practice repo, not this deck.
- **Slide type is set explicitly** (a `type` field on every slide) rather
  than guessed from kicker/title text via regex, as the source engine did.
  With 82 hand-authored slides, explicit typing is more reliable than
  pattern-matching against titles that were never designed for it.
- **The old "Facilitator notes" dialog was removed** in favour of the new
  presenter window. The source engine's notes dialog opened *on the same
  screen* — if that screen is mirrored to a projector, participants would
  see the notes. The presenter window is a genuinely separate window, so
  it's the only way to see notes without exposing them to the room.

## Manual verification still needed (do this yourself before teaching)

This was checked with an automated browser pass (all 7 layouts, mobile
width, no console errors, presenter sync confirmed live across two tabs),
but you should still, on the actual machine and screen you'll teach from:

1. **Click through all 82 slides in order**, start to finish, both days.
   Confirm nothing looks broken and the content reads correctly end to end —
   an automated pass sampled slides, it did not read all 82 for tone/accuracy.
2. **Confirm the two content edits read correctly in context**: slide 36
   (mob-programming preview, no "roles rotate" language) and slide 68 (all
   five agent-loop steps present, including "Decide").
3. **Test the presenter view on your real dual-monitor/projector setup** —
   press `S`, drag the presenter window to your laptop screen, confirm the
   projector only shows the main deck. Click through a few slides and watch
   the presenter window update live.
4. **Run the Assignment 1 timer for real** (slide 29) — start it, let it run
   down, confirm the red pulse in the last minute is visible from the back
   of the room.
5. **Check the "Example prompt" copy button** works in your actual browser
   (clipboard permissions vary by browser/OS).
6. **Read every `notes` field once** — they're written for a solo facilitator
   who hasn't taught this content before; flag anything that doesn't match
   how you actually plan to run a slide.
