# Classroom session sources

Days 1 and 2 use the existing `slides.js` deck. Their opening slides are 7 and 63.
Day 5 retains the local SRE workshop and its reviewed changes.

The four additional decks were imported as plain data from
https://github.com/RyanLisse/aetherlink-academy-app/tree/b491cc0187b948a9717186fa9d2cb3f79dbc59ca/apps/web/src/deck.

| Session | Source | Slides |
| --- | --- | --- |
| Day 3: agents in n8n | workshop3-slides.ts | 18 |
| Day 4: Claude Agent SDK | workshop4-slides.ts | 28 |
| Day 6: hackathon, thin slice | workshop6-slides.ts | 14 |
| Day 7: hackathon, ship and present | workshop7-slides.ts | 14 |

Authored text, notes, timers and exercises are retained. TypeScript annotations were removed.
Image prefixes were changed to local `assets/` paths. Three W3 JPEGs and nine W4 PNGs
come from the same source revision's `apps/web/public/` directory.
No Academy code or deployment was changed.

`node --test tools/sessions.test.mjs` checks targets, images, presenter bindings,
selector behavior, and session-scoped presenter channels.
