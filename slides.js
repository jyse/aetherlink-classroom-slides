/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   99 slides, authored from CURRICULUM.md (2026-09-15 revision) plus its
   "Resolved alignment decisions" section, which overrides three points in
   the base document: Assignment 11's AI feedback is required and needs no
   API credentials (folded into Slide 64 + new Slide 65); Slide 27 carries
   the three-tier SDLC / working-method / agent-loop framing; Part 5's
   Jira/GitLab/Confluence MCP connections are the real, primary path.
   One slide = one object in order. See README.md "How to edit a slide"
   before changing anything here.

   Field reference:
     title     - required. Shown as the big heading.
     kicker    - small text above the title (e.g. "DAY 1 · PART 1").
     subtitle  - one sentence under the title.
     type      - one of: context, concept, practice, review, quiz, recap, pause.
                 Controls the colour chip and the footer progress dot.
                 quiz: its own colour and look (use with visual.quiz).
     dark      - true to render this slide on the dark background variant.
     layout    - optional: "steps" | "pillars" | "compare" | "recap" |
                 "exercise" (assignment slides — timer + "Do this now" panel).
                 Leave out for a plain card grid (the default).
     cards     - array of {title, body} shown as the card grid.
     items     - for layout "steps"/"pillars"/"recap": {label, caption, detail}.
     columns   - for layout "compare": {title, items:[...], foot}.
     steps     - the "Do this now" checklist (plain strings) for exercise slides.
     expected  - one sentence: what a good result looks like.
     check     - the checkpoint question a facilitator/participant confirms.
     (Assignment timers have no preset: the facilitator types the minutes on the slide.)
     prompt    - an exact phrase the facilitator can read aloud or paste.
                 For slides with a CURRICULUM.md "Prompt panel" code block,
                 this is that block verbatim (template literals preserve the
                 original line breaks) — do not paraphrase these.
     tagline   - a short bold line rendered under the slide's main content.
     notes     - facilitator speaker notes, the full text (never shown to participants).
     keyPoints - 3–5 keyword bullets shown above the notes in the presenter view.
     visual    - optional illustration, never changes wording:
                 bot: 'wave'|'think'|'point'|'head' (AetherBOT pose)
                 place: 'left'|'beside'|'under'|'timeline'
                 tool: 'map'|'arm'|'toolbox'|'thought' (comes out of his head)
                 target: CSS selector the tool points at
                 art: 'timeline' · cardArt: { <cardIndex>: 'route' } · pillarIcons
                 highlight: [{ in: 'title'|'subtitle'|'card:N', text, tone:
                              'orange'|'purple'|'mark' }] — text must exist verbatim
                 stagger: 'pop' — cards pop in one by one
                 hero: N — card N becomes one big centred statement
                 popOut: N + place: 'popout' — card N's lines pop out of the bot as chips
                 art: 'nested' + place: 'nest' — steps shown as rings inside each other (+ magnifier)
                 keyLine: N (+ stamp, place: 'key') — card N becomes the big key line, bot stamps it
                 art: 'flow' + place: 'slot' — cards 1+2 flow through the bot into card 3
                 art: 'window' — context-window box filling with tokens beside the cards
                 cardArt: { N: 'sliders'|'thermo' } — small illustration inside card N
                 reveal: 'click' (+ place: 'slot') — cards start closed; click / → opens the next (buttons: true shows buttons)
                 faces: [...] — with reveal: AetherBOT's face per opened card (assets/aetherbot/faces/:
                        verward · dubbel · eigenwijs · slaperig · betrapt · blij · verrast)
                 checklist: N — card N's lines become a list that ticks itself off
                 highlight 'in' may also be 'tagline'
                 quiz: { answer: N } — → strikes the wrong cards one by one, then marks N (checkpoint hidden)
                 spotlight: N — card N lights up, the others dim
                 pairs: true — compare layout shown as row pairs, one per click / →
                 countdown: minutes — pause slide: live countdown + real "Back at" clock time
                 chipIcons: [...] — icons in front of popOut chips
                 bot: 'stretchLeft'|'stretchRight' + place: 'pointer' + pointAt: N — stretch arm reaches card N
                 chipGrid: 3 — popOut chips in a 3-column grid
                 term: [{c}|{o}|{ask}] — terminal beside the cards that types commands, output, then an approval question
                 art: 'gate' — route Explore → Plan → approval gate → Change; click / → opens the gate
                 art: 'prompt' (+ promptMarks) — the slide's prompt typed in a terminal; B shows plan B (demo-fallback.js)
                 stepKeys: true (+ humanStep: N) — steps layout without buttons, → activates the next step
                 reach: true — (with stepKeys) AetherBOT's arm telescopes to the active step
                 art: 'loop' — (with stepKeys) steps drawn as a circle: 4 nodes + "repeat or stop" in the middle
                 art: 'boxes' (+ link) — compare columns drawn as boxes inside boxes; → zooms in, then links items
                 addLine: 'placeholder' — (with checklist) an empty line the trainer can type into live
                 stack: [tags] — cards pop in top to bottom, one by one, each with a tag
                 cmdCards: [N..] — card bodies shown as typing terminal lines (lines ending in ':' or '.' are notes)
                 browser: N — mini browser with the four app pages in card N (Game live, rest empty)
                 lineReveal: N — card N's lines as a numbered list that pops in
                 stamps: ['PASS', …] (+ bot, place: 'stamps') — clickable decision stamps that pop out of AetherBOT's head (checkpoint box hidden)
                 badge: N — card N's lines as an empty profile badge
                 swap: true — two AetherBOT heads passing work to each other (peer review); with stamps: stamps pop between them
                 template: N (+ templateRows) — empty card template (term/definition or the card's own lines)
                 notebook: N — card N's lines as a ruled notebook page
                 quietTimer: minutes — quiet countdown (no "Back at") beside the cards
                 badges: [icons] (+ place 'aside') — title-only cards unlock one by one like achievements
                 dayRoute: [stops] — the shape of the day as a route under the cards
                 art: 'stairs' (+ stepKeys, today: [i]) — levels as a staircase, today's levels tagged
                 art: 'intake' (+ place 'aside', tags) — every card flows into AetherBOT
                 mdfile: N — card N's lines as sections of a CLAUDE.md file
                 guides: [[icon, name, verb], …] — two badges "X guides ≠ Y enforces" above the tagline
                 repeatStack: N — card N repeated as three cards that fly in and fan out like a hand of cards
                 mdName — file name shown on mdfile (default CLAUDE.md)
                 noSkill: N — card N's body becomes a "No skill yet" badge
                 diff: [{title, rows:[{k, miss, odd, note}]}] — two mini cards side by side, differences circled
                 lifespan: [{kind:'now'|'always'|'recurring', icon, label}] — per card a small "how long it lives" track
                 tree: N — card N's path as a folder tree ending in an empty file
                 fence: N — card N's lines as signs on a fence around a bouncing AetherBOT (bounded autonomy)
                 conveyor: N — card N becomes a belt: terms go into AetherBOT, READY/REVISE/OPEN cards come out
                 loopCaptions: true — (with art 'loop') show the active step's caption under the loop
                 perCard: [stamps] — row of mini cards, each with its own decision stamp (checkpoint hidden)
                 gameFlow: true — cards as one round of the game with a loop-back arrow
                 gameMock: true — mini game screen beside the cards, feedback area empty ("you build this")
                 phrase: '…' — a chat bubble with the exact phrase to say
                 catChips: N — card N's lines as coloured rating labels
                 runner: [{label, tone}] — card 0's lines as test cases that "run" and show their expected result (checkpoint hidden)
                 plugs: N — MCP picture: AetherBOT plugged into an MCP server via card N's lines
                 zones: [left, right, [chips]] — compare layout as 'your laptop' vs 'outside' behind an MCP gate
                 pending: [title, text] — visible placeholder for content that still has to be added
                 sourceTiles: N — card N's lines as source tiles with a read-only lock
                 planB: 'WINDOW_VAR' (+ planBLabel) — B shows a captured example (see demo-fallback.js)
                 menu: N — card N's lines as clickable chips (pick one)
                 pipes: true (+ same: [k]) — compare columns 'A → B → C → D' as two aligned pipelines; same stages glow
                 recapKeys: true — recap items pop in one by one with a trophy (no buttons, no clicking)
                 levelUp: true — recap items tick off with a progress bar filling up
                 supportDays: true — (with art 'timeline') the two teaching days marked done
                 doneSteps: N — (with stepKeys) first N steps done ✓, the next one pulses
                 handover: 'text' — compare: AetherBOT on the AI side, 👤 on the people side, then a big closing line
                 sentences: true — cards as open sentences on a notebook page
                 oneCol: true — the card grid as a single column (e.g. for long command lines)
                 stepThrough: true | 'selector' — cards, pillars, compare columns, pop-out chips and the tagline
                              appear one per click / → (skipped if the slide already has its own reveal)
   stepsHeading (slide field) — heading above the steps; default "Your prompt must ask Claude Code to:"
   ========================================================================== */
window.SLIDES = [

/* ---------------------------------------------------------------------- */
/* TEACHING DAY 1 — AI foundations and working with Claude Code            */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to the course!",
  kicker: "AETHERLINK × WORLDLINE · WELCOME",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences","Programme intro comes later"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a warm welcome — keep it to a few sentences. The programme itself is introduced at slide 7."
},

{ // Slide 2
  title: "How many of you have already used AI?",
  kicker: "WELCOME · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'multiarm', place: 'beside' },
  keyPoints: ["Ask literally, let hands go up","Say roughly how many you see","Ask: who uses it every week?","Quick read, not a discussion","Adjust Part 1 pace to room"],
  notes: "Ask it literally and let the hands go up — say roughly how many you see. Follow-up question out loud: 'and how many of you use it every week?' This is a quick read of the room, not a discussion: note whether you mostly have beginners or regular users and adjust your pace in Part 1."
},

{ // Slide 3
  title: "A few agreements",
  kicker: "WELCOME · AGREEMENTS",
  subtitle: "So we get the most out of these two days.",
  type: "context",
  visual: { opener: 'agree', stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Be on time", body: "" },
    { title: "Be open-minded", body: "" },
    { title: "Be curious", body: "" },
    { title: "Listen first, then ask", body: "" }
  ],
  keyPoints: ["Name the four agreements","One sentence each","Stress: listen first, then ask","Invite people to hold questions"],
  notes: "Name the four agreements, one sentence each. 'Listen first, then ask' matters most today: many questions are answered a few slides later, so invite people to hold them until the explanation is done."
},

{ // Slide 4
  title: "Who we are",
  kicker: "WELCOME · TEAM",
  subtitle: "We are what we do.",
  type: "context",
  visual: { opener: 'team', stagger: 'pop' },
  cards: [
    { title: "Jessy The", body: "" },
    { title: "Constance van der Vlist", body: "" },
    { title: "Maarten Nauw", body: "" },
    { title: "Ryan Lisse", body: "" }
  ],
  keyPoints: ["Each trainer: one or two sentences","Who you are, what you do","Keep it short"],
  notes: "Each trainer introduces themselves in one or two sentences: who you are and what you do in this programme. Keep it short — 'we are what we do': the room gets to know you over the next two days."
},

{ // Slide 5
  title: "Introduce yourself",
  kicker: "WELCOME · INTRODUCTIONS",
  subtitle: "One round, about 30 seconds each.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Your name", body: "" },
    { title: "Your role", body: "What you do day to day." },
    { title: "Your team", body: "Who you work with." }
  ],
  keyPoints: ["One round: name, role, team","About 30 seconds each","Start with yourself as example","Write roles and teams on flipchart","Reuse later for improvements and features"],
  notes: "Go round the room once: name, role and team, about 30 seconds each. Start with yourself to show the length you mean. Write the roles and teams on the flipchart; you will use them later, when you ask which work could improve and when the room picks features to build."
},

{ // Slide 6
  title: "What do you bring?",
  kicker: "WELCOME · EXPECTATIONS",
  subtitle: "Before we start: your questions and your hopes.",
  type: "context",
  visual: { stepThrough: true, bot: 'think', place: 'beside', tool: 'thought' },
  cards: [
    { title: "Questions you already have", body: "What do you want answered by the end of these two days?" },
    { title: "What you hope to learn", body: "What would make these days worth it for you and your team?" }
  ],
  tagline: "We come back to these at the end of Day 2.",
  keyPoints: ["Give a minute to think","Flipchart: questions and hopes columns","Don't answer now: say when, or park","Keep the sheet on the wall","Revisit in Day 2 final reflection"],
  notes: "Give people a minute to think, then collect answers on the flipchart: one column for questions, one for hopes. Don't answer the questions now; say when in the programme they come up, or park them. Keep the sheet on the wall and come back to it in the final reflection at the end of Day 2."
},

{ // Slide 7
  title: "Aetherlink × Worldline",
  kicker: "TEACHING DAY 1",
  subtitle: "Working with AI and Claude Code — from AI foundations to your first tested change.",
  type: "context",
  visual: { bot: 'wave', place: 'left', tool: 'map', target: '.cards .card:nth-child(2)', cardArt: { 1: 'route' },
    highlight: [{ in: 'subtitle', text: 'first tested change', tone: 'orange' }, { in: 'card:0', text: 'together', tone: 'purple' }] },
  dark: true,
  cards: [
    { title: "What we're doing", body: "Building useful, safe, verifiable and reusable AI-supported workflows together." },
    { title: "Today", body: "AI foundations, Claude Code, the working method, and your first assignments in the Aether Library." }
  ],
  keyPoints: ["Open on time","Welcome and introduce yourself","Seven days: two teaching, five support","Keep it short"],
  notes: "Open on time. Welcome the room, introduce yourself, and name the shape of the seven days: two teaching days, then five support days. Keep this short — the real content starts at slide 8."
},

{ // Slide 8
  title: "The seven-day programme",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Two teaching days establish the foundation. Five support days apply the method to agent workflows and team work.",
  type: "context",
  visual: { art: 'timeline', bot: 'head', place: 'timeline', tool: 'arm', target: '.tl-arrow',
    highlight: [{ in: 'subtitle', text: 'foundation', tone: 'purple' }, { in: 'subtitle', text: 'apply', tone: 'orange' }] },
  cards: [
    { title: "Teaching Days 1–2", body: "Understand and practise." },
    { title: "Support Days 1–5", body: "Deepen and apply." }
  ],
  keyPoints: ["Separate teaching days from support days","One sentence per phase","Don't detail all seven days","Support days: different facilitator"],
  notes: "Visually distinguish the two teaching days from the five support days, but don't explain all seven days in detail now — that temptation wastes time here. One sentence per phase is enough; the support days belong to a different facilitator."
},

{ // Slide 9
  title: "Programme outcome",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By the end of the programme, you can help design, build and review an AI-supported workflow for your team: one that solves a real team problem and that others can understand and reuse.",
  type: "context",
  visual: { bot: 'head', place: 'under', tool: 'toolbox', pillarIcons: true,
    highlight: [{ in: 'subtitle', text: 'for your team', tone: 'purple' }, { in: 'subtitle', text: 'understand and reuse', tone: 'orange' }] },
  layout: "pillars",
  items: [
    { label: "Useful" },
    { label: "Safe" },
    { label: "Verifiable" },
    { label: "Reusable" },
    { label: "For your team" }
  ],
  keyPoints: ["Read the subtitle as written","North star for both days","Stress team, not a personal trick","Five words = the recurring test"],
  notes: "Read the subtitle as written — it's the north star for both teaching days. Stress the team part: the goal is not a personal trick but a workflow that solves a real problem for your team and that colleagues can pick up. The five words are the test you'll come back to throughout: is what we built useful, safe, verifiable, reusable, and does it work for the team?"
},

{ // Slide 10
  title: "Work that could improve",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Which recurring task costs you time or creates unnecessary uncertainty?",
  type: "context",
  visual: { bot: 'think', place: 'beside', tool: 'thought',
    highlight: [{ in: 'title', text: 'improve', tone: 'orange' }, { in: 'subtitle', text: 'time', tone: 'mark' }, { in: 'subtitle', text: 'uncertainty', tone: 'purple' }] },
  cards: [
    { title: "Describe the problem", body: "Leave the solution open for now." }
  ],
  prompt: "Which recurring task costs you time or creates unnecessary uncertainty? Describe the current problem. Leave the solution open for now.",
  keyPoints: ["Two or three minutes only","A handful of voices","Not a design session","Surface real frustration first"],
  notes: "Very short opening discussion — two or three minutes, a handful of voices, do not let it become a design session. The point is to surface real frustration before any tooling talk starts."
},

{ // Slide 11
  title: "Day 1 outcome",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By 16:00, you can use Claude Code to:",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true },
  cards: [
    { title: "Explore", body: "understand an existing project" },
    { title: "Plan", body: "make a plan for a small change" },
    { title: "Create", body: "create the change" },
    { title: "Test", body: "test the result" },
    { title: "Review", body: "review the evidence" }
  ],
  keyPoints: ["Preview the working method","Don't teach it yet","Just point at the shape","It returns as the red thread"],
  notes: "This previews the working method that gets named explicitly at slide 40 — the red thread for the rest of the day. Don't teach it yet, just point at the shape so it feels familiar when it returns."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 1: AI foundations                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 12
  title: "Artificial intelligence",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Not one technology — a broad field.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'broad field', tone: 'purple' }, { in: 'card:0', text: 'human intelligence', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "Artificial intelligence is the broad field of building systems that perform tasks associated with human intelligence." },
    { title: "Examples", body: "recognising patterns\nmaking predictions\ngenerating content\nselecting actions" }
  ],
  keyPoints: ["Brief and plain language","Room includes non-engineers","No AI history or academic definitions","A shared floor, not a lecture"],
  notes: "Keep this brief and plain-language — the room includes non-engineers. Resist the pull to go deeper into AI history or academic definitions; the goal is a shared floor, not a lecture."
},

{ // Slide 13
  title: "The AI landscape",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Each one sits inside the one before it.",
  type: "concept",
  layout: "steps",
  visual: { art: 'nested', bot: 'point', place: 'nest', stepKeys: true },
  items: [
    { label: "Artificial intelligence", caption: "The broad field: machines doing tasks we link to human intelligence." },
    { label: "Machine learning", caption: "AI that learns patterns from data instead of following hand-written rules." },
    { label: "Deep learning", caption: "Machine learning with many-layered neural networks." },
    { label: "Generative AI", caption: "Deep learning that creates new text, images, audio or code." },
    { label: "Large language models", caption: "Generative AI for language: text in, text out." }
  ],
  keyPoints: ["Click through the five rings live","Flipchart: five nested circles","One everyday example per ring","Don't skip the deep learning layer","Next slides define each ring"],
  notes: "Click through the five rings live so the nesting is visible: each term sits inside the one before it. Flipchart: draw five circles inside each other, biggest to smallest, and write one everyday example next to each: AI, a chess computer or route planner; machine learning, a spam filter; deep learning, face unlock on a phone; generative AI, an image generator; LLM, ChatGPT or Claude. Deep learning is the layer people usually skip, yet it is why today's generative AI works: the models behind it are deep neural networks. The next slides give each ring its own definition."
},

{ // Slide 14
  title: "Machine learning",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Learning from examples instead of following rules.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'learns patterns from example data', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "Machine learning is a way of building AI where the system learns patterns from example data, instead of a person writing every rule." },
    { title: "Examples", body: "spam filters\nproduct recommendations\nfraud detection\nforecasting" }
  ],
  keyPoints: ["Spam filter learns from examples","Fraud detection fits this room","Contrast with rule-following chess computer"],
  notes: "One sentence to land: nobody writes a rule for every spam email; the filter learns from thousands of examples of spam and normal mail. Fraud detection is a good example for this room. Contrast it with the chess computer from the rings: that one can follow rules someone wrote, which is AI but not machine learning."
},

{ // Slide 15
  title: "Deep learning",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Machine learning with many layers.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'many layers', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "Deep learning is machine learning that uses neural networks with many layers, so it can learn complex patterns from large amounts of data such as images, sound and text." },
    { title: "Examples", body: "recognising faces in photos\nspeech to text\ntranslation\nthe models behind generative AI" }
  ],
  keyPoints: ["Keep it light, no maths","Deep = many stacked layers","Generative AI and LLMs are deep learning"],
  notes: "Keep it light: no maths. The word “deep” just means many layers stacked on top of each other, each one picking up a slightly more complex pattern. The last example is the one that matters for today: generative AI and LLMs are deep learning models."
},

{ // Slide 16
  title: "Generative AI",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "AI that creates something new.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'create new content', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "Generative AI uses deep learning models to create new content, such as text, images, audio or code, based on patterns learned from existing examples." },
    { title: "Examples", body: "drafting an email\ncreating an image from a description\nsummarising a document\nsuggesting code" }
  ],
  keyPoints: ["Ask who used one this week","Plant caution: new is not correct","LLMs = text part of generative AI"],
  notes: "Ask who has used one of these examples this week; most hands go up. Then plant the caution that the next slide makes explicit: new content is not the same as correct content. LLMs are the text-and-language part of generative AI."
},

{ // Slide 17
  title: "Large language models",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Sounding right is not the same as being right.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'VERIFY', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'verification', tone: 'mark' }] },
  cards: [
    { title: "Definition", body: "An LLM generates a response from patterns learned during training and the context available in the current interaction." },
    { title: "Key line", body: "A plausible response still requires verification." }
  ],
  keyPoints: ["Say the key line slowly","Let it land","Most important sentence of Part 1","Verification and review depend on it"],
  notes: "Say the key line slowly and let it land — it's the single most important sentence of Part 1, and everything about verification and human review later depends on the room accepting it now."
},

{ // Slide 18
  title: "Input, context and output",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "What goes in shapes what comes out.",
  type: "concept",
  visual: { art: 'flow', bot: 'head', place: 'slot',
    highlight: [{ in: 'tagline', text: 'Evidence', tone: 'orange' }] },
  cards: [
    { title: "Input", body: "Your instruction, question or goal." },
    { title: "Context", body: "Relevant information available to the model." },
    { title: "Output", body: "The response or proposed action." }
  ],
  tagline: "Useful context improves the response. Evidence determines whether you can trust it.",
  keyPoints: ["Draw the arrow on the whiteboard","Input + context → model → output","Plant context for Day 2"],
  notes: "Draw the arrow on the whiteboard if you have one: input+context → model → output. This sets up 'context' as a concept that returns constantly on Day 2."
},

{ // Slide 19
  title: "Tokens",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "How a model reads and writes text.",
  type: "concept",
  visual: { stepThrough: true,
    highlight: [{ in: 'tagline', text: 'not the same as a word', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "A token is a small piece of text that a model reads and writes: often a whole word, sometimes part of a word or a single character." },
    { title: "How it works", body: "your text → tokens → numbers → the model" },
    { title: "Why it matters", body: "Context limits, usage limits and costs are all counted in tokens." }
  ],
  tagline: "A token is not the same as a word.",
  keyPoints: ["Flipchart: split one sentence into tokens","Common words whole, rare words split","Model sees tokens as numbers","Everything is counted in tokens","About 3.5 characters per token"],
  notes: "Flipchart: write one sentence and draw lines where a model might cut it into pieces; common words stay whole, longer or rarer words get split. Then say why it matters: the model never sees your words, only tokens turned into numbers, and everything is counted in tokens: how much fits, how much you can use, what it costs. Rule of thumb from Anthropic's docs: one Claude token is about 3.5 English characters, so a page of text is a few hundred tokens."
},

{ // Slide 20
  title: "Context windows",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "The model can only consider so much at once.",
  type: "concept",
  visual: { art: 'window',
    highlight: [{ in: 'tagline', text: 'Relevant', tone: 'orange' }, { in: 'tagline', text: 'current', tone: 'purple' }, { in: 'tagline', text: 'permitted', tone: 'mark' }] },
  cards: [
    { title: "Context window", body: "A context window limits how much information the model can consider at once." },
    { title: "What fills it", body: "Your prompt, the conversation so far, files and tool results, and the answer itself." },
    { title: "Distraction", body: "Irrelevant context can distract from the task." }
  ],
  tagline: "Relevant, current and permitted context works best.",
  keyPoints: ["Flipchart: one box as the window","Add blocks until it is full","Irrelevant blocks pull attention away","Repeat: relevant, current, permitted","Returns in Day 2 CLAUDE.md"],
  notes: "Flipchart: draw one box as the window and keep adding blocks as the conversation grows: prompt, answer, a pasted file, more answers, until it is full. Irrelevant blocks take space and pull attention away from what matters. The tagline is the takeaway to repeat: relevant, current, permitted. It resurfaces almost word-for-word in Day 2's CLAUDE.md and context slides."
},

{ // Slide 21
  title: "Quiz: tokens and context",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Which statement is true?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "A token is always exactly one word." },
    { title: "B", body: "The conversation so far and the answer both count toward the context window." },
    { title: "C", body: "Adding more context always improves the answer." },
    { title: "D", body: "The context window has no limit." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B", "C links back to “distraction”"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: everything in the request counts, including the model's own answer. A and D are the two slides you just saw. If someone argues for C, point back to the distraction card: irrelevant context takes space and attention."
},

{ // Slide 22
  title: "Model choice",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Pick the model that fits the task.",
  type: "concept",
  visual: { cardArt: { 0: 'sliders' } },
  cards: [
    { title: "Model choice", body: "Different models offer different balances of capability, speed and cost." }
  ],
  keyPoints: ["Keep it brief","No model APIs on Day 1","Thirty seconds, then move on"],
  notes: "Keep this slide brief — participants do not configure model APIs during Day 1. Thirty seconds, then move on."
},

{ // Slide 23
  title: "AI failure modes",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "How does AI get it wrong?",
  type: "concept",
  visual: { reveal: 'click', bot: 'head', place: 'slot', faces: ['verward', 'dubbel', 'eigenwijs', 'slaperig', 'betrapt'] },
  cards: [
    { title: "Missing context", body: "The model did not have what it needed to answer well." },
    { title: "Ambiguous instructions", body: "The request could reasonably mean more than one thing." },
    { title: "Unsupported assumptions", body: "The model filled a gap with a guess instead of asking." },
    { title: "Outdated information", body: "What the model learned no longer matches reality." },
    { title: "Fabricated details", body: "A confident-sounding answer that isn't actually true." }
  ],
  tagline: "Treat AI output as a proposal until you verify it.",
  keyPoints: ["Ask for a personal example first","AI being confidently wrong","Then reveal the list"],
  notes: "Ask the room for a personal example of AI being confidently wrong before you reveal the list — recognition lands harder than the definition alone."
},

{ // Slide 24
  title: "Prompt",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "What you give the model to work with.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'CLEAR', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'unless the prompt tells it', tone: 'mark' }] },
  cards: [
    { title: "Definition", body: "A prompt is everything you send the model: your instruction or question, plus any background, examples or documents you add." },
    { title: "Key line", body: "The model does not know your situation unless the prompt tells it." }
  ],
  keyPoints: ["Keep it short","Prompt = everything you send","Model only knows what you tell it","Bridge to the prompt ingredients"],
  notes: "Keep it short: a prompt is more than the question you type, it is everything you send along with it. The key line is the bridge to the next slide: because the model only knows what you tell it, a good prompt has a fixed set of ingredients."
},

{ // Slide 25
  title: "A reliable prompt",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "A template you can copy into Claude Code or ChatGPT today.",
  type: "concept",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Template", body: "Goal: the result you want\nContext: what the model needs to know\nConstraints: what it must not do or change\nDone when: how you recognise a good result\nOutput: the format you want back\nCheck: how you will verify it" }
  ],
  tagline: "Press “Example prompt” to copy the template.",
  prompt: `Goal: [the result I want]
Context: [who I am, the project or situation, and what you need to know]
Constraints: [what you must not do or change]
Done when: [how I will recognise a good result]
Output: [the format I want back, e.g. a short plan, a table or 5 bullets]
Check: [how I will verify your answer; mark anything you cannot confirm as OPEN]`,
  keyPoints: ["Walk through the six lines once","Open Example prompt, show it copies","Works in any chat tool","Break task: fill in real work"],
  notes: "This is the pattern behind every assignment prompt in the deck. Walk through the six lines once, then open “Example prompt” (top right) and show that it copies. Invite people to paste it into whatever they use today, Claude Code or ChatGPT, and fill it in for one real task from their own work during the next break. It works in any chat tool: the template only makes sure the model gets the goal, the context, the limits and a way to check the answer."
},

{ // Slide 26
  title: "Knowledge check",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Which statement is most accurate?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "An LLM retrieves a guaranteed correct answer." },
    { title: "B", body: "An LLM generates a response that still needs verification." },
    { title: "C", body: "More context always produces a better answer." },
    { title: "D", body: "A token is always exactly one word." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first: hands or chat","Then reveal the answer","C: more is not automatically better","D: tokens can be word parts"],
  notes: "Let the room vote (show of hands or chat) before revealing the answer. If anyone argues for C, connect it back to the context window slide: more is not automatically better. D checks the tokens slide: a token can be a word, part of a word or a single character."
},

{ // Slide 27
  title: "Short break",
  kicker: "DAY 1 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: Claude chat and Claude Code." }
  ],
  keyPoints: ["Break: say the return time","Show the clock time on screen","Press ▶ Start on the timer","Check your Claude Code auth"],
  notes: "State the actual clock time you'll resume, out loud and (if possible) on screen — 'return in 15 minutes' only works if people know what time that is. Use the break to check your own Claude Code auth is working before the live demo in Part 2."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 2: Claude and Claude Code                                  */
/* ---------------------------------------------------------------------- */

{ // Slide 28
  title: "Claude interfaces",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Four ways to work with Claude.",
  type: "concept",
  visual: { spotlight: 1, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "Claude chat", body: "Conversation, thinking and content." },
    { title: "Claude Code", body: "Agentic work inside technical projects." },
    { title: "Claude API", body: "Claude capabilities inside an application." },
    { title: "Connected tools", body: "Approved access to other information and systems." }
  ],
  keyPoints: ["Land on Claude Code","The room lives there all day","Skip API and connected tools rows","They return on Day 2"],
  notes: "Land on Claude Code — that's where the room lives for the rest of the day. No need to dwell on the API or connected-tools rows yet; they return properly in Day 2 Parts 3–4."
},

{ // Slide 29
  title: "Claude chat and Claude Code",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Claude Code works inside your project, not just in conversation with you.",
  type: "concept",
  layout: "compare",
  visual: { pairs: true, highlight: [{ in: 'subtitle', text: 'inside your project', tone: 'orange' }] },
  columns: [
    { title: "Claude chat", items: [
      "Works mainly through conversation",
      "Uses the context you provide",
      "Produces responses",
      "Helps you think and write"
    ] },
    { title: "Claude Code", items: [
      "Works inside a project",
      "Can inspect approved project files",
      "Can use tools and run commands",
      "Can plan, change and validate work"
    ] }
  ],
  keyPoints: ["Pair each chat row with Claude Code","Same order on both sides","The order is deliberate"],
  notes: "Pair each Claude chat row with its Claude Code counterpart when you talk through this — same order on both sides is deliberate."
},

{ // Slide 30
  title: "AI agents",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Not just answering — acting toward a goal.",
  type: "concept",
  visual: { hero: 0, popOut: 1, stepThrough: true, chipIcons: ['▶', '↻', '■', '✋'],
    highlight: [{ in: 'card:0', text: 'works toward a goal', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "An AI agent works toward a goal by gathering context, choosing actions, using tools and checking results." },
    { title: "It can", body: "continue\nadjust\nstop\nask for human input" }
  ],
  keyPoints: ["Keep it abstract and short","Agents act toward a goal","Sets up: Claude Code is one"],
  notes: "Keep this abstract and short — it sets up the next slide's concrete claim that Claude Code already is one of these."
},

{ // Slide 31
  title: "Claude Code as an agentic tool",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "You are using an agent — not building one (yet).",
  type: "concept",
  visual: { popOut: 0, bot: 'head', place: 'popout', stepThrough: true, chipGrid: 3, chipIcons: ['🔍', '🗺', '✏️', '▶', '👁', '↻'],
    highlight: [{ in: 'tagline', text: 'existing agentic tool', tone: 'orange' }] },
  cards: [
    { title: "Claude Code can", body: "inspect a repository\nform a plan\nread and edit files\nrun commands and tests\ninspect results\nadjust its approach" }
  ],
  tagline: "Using Claude Code means using an existing agentic tool.",
  keyPoints: ["Say it explicitly","Using an agent, not building one","Plant it for Day 2 Part 3"],
  notes: "Important clarification, say it explicitly: using Claude Code today does not mean the room has built a standalone agent. That distinction becomes central in Day 2 Part 3 — plant it now."
},

{ // Slide 32
  title: "The terminal",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Where Claude Code does its work.",
  type: "concept",
  visual: { term: [{ c: 'ls' }, { o: 'README.md  data  public  server.js' }, { c: 'git status' }, { o: 'On branch main · nothing to commit' }, { ask: 'Allow Claude to run npm test? (y/n)' }],
    highlight: [{ in: 'tagline', text: 'understand what you approve', tone: 'orange' }] },
  cards: [
    { title: "What the terminal gives you", body: "The terminal lets you interact with your computer and project through commands." },
    { title: "Same tools developers use", body: "Claude Code uses the same project tools developers already use for files, Git, applications and tests." }
  ],
  tagline: "You do not need to memorise every command. You must understand what you approve.",
  keyPoints: ["Name terminal anxiety directly","No need to memorise commands","Understand what you approve","That is the whole bar"],
  notes: "If anyone in the room is terminal-anxious, name it directly: they don't need to memorise commands, they need to understand what they're approving. That's the whole bar."
},

{ // Slide 33
  title: "Is Claude Code ready on your laptop?",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "A two-minute check, together, before the demo.",
  type: "context",
  visual: { cmdCards: [0, 1, 2],
    highlight: [{ in: 'tagline', text: 'before the assignments', tone: 'orange' }] },
  cards: [
    { title: "1 · Is it installed?", body: "claude --version\nYou should see a version number." },
    { title: "2 · Start it", body: "claude\nLog in if it asks." },
    { title: "3 · Look around, then leave", body: "Inside Claude Code, type:\n/help\n/exit\nThumbs up when this works." }
  ],
  tagline: "Stuck? Pair with a neighbour. We fix it before the assignments.",
  keyPoints: ["Everyone opens a terminal now", "claude --version, then claude", "Log in if asked, /help, /exit", "Count the thumbs up", "Stuck: pair up, fix at the break"],
  notes: "Everyone installed Claude Code before the course; this slide only checks that it works, while the room is still together. Ask everyone to open a terminal and do the three steps with you: claude --version should print a version number; claude starts it (log in if it asks); /help shows what's available and /exit leaves again. Ask for a thumbs up. Anyone stuck pairs with a neighbour for the demo and the next slides, and you fix their setup at the break or at lunch at the latest: the assignments after lunch need Claude Code on every laptop. Don't troubleshoot for the whole room here."
},

{ // Slide 34
  title: "Permissions and Plan Mode",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Look first. Change later.",
  type: "concept",
  visual: { art: 'gate' },
  cards: [
    { title: "Permissions", body: "Permissions control which actions Claude Code may perform without further approval." },
    { title: "Plan Mode", body: "Plan Mode lets Claude investigate and prepare a plan before implementation." }
  ],
  tagline: "Start with exploration. Review the plan before allowing changes.",
  keyPoints: ["Who decides what it may do? You", "It asks before edits and commands", "Yes once, yes always, or no", "Read what you approve", "Plan mode = look, don't touch", "Shift+Tab switches mode", "Rule: plan first, then approve changes"],
  notes: "Open with the question: Claude Code works on your real files and your real terminal, so who decides what it may do? You do. Permissions: reading and looking around is low risk, but before it edits a file or runs a command it stops and asks. You answer yes (just this once), yes and don't ask again for this kind of action, or no (and tell it what to do instead). Link back to the terminal slide: you don't need to know every command, but you must understand what you approve. Standing rules (always allow the tests, never touch this folder) live in the settings; /permissions shows them. Modes: the current mode shows at the bottom of Claude Code and Shift+Tab switches between them. Normal asks before each edit or command, which is best while learning. Accept edits lets file edits through without asking, while other actions still ask. Plan mode is read-only: Claude explores and comes back with a plan, and nothing changes until you approve it. Auto mode, if your setup has it, runs without asking each time, but risky actions are still checked and can be blocked. There is also a skip-all-permissions option for automated setups; mention that it exists and that we don't use it. Click to open the gate: this gate is you. Close on the tagline as the rule for both days: every assignment starts in plan mode, and changes only happen after you have read the plan (Assignment 3 uses exactly this contrast between plan mode and auto mode). Optional story: when a hard-to-undo action such as deleting a repository is requested, Claude Code's safety check can block it even after a yes in chat, and the human has to run it themselves; that is permissions working as designed. Before class, open Claude Code on your teaching laptop and press Shift+Tab a few times, so the modes you name match what the room will see (they depend on the version and company settings)."
},

{ // Slide 35
  title: "Get the Aether Library on your laptop",
  kicker: "DAY 1 · PART 2 · HANDS-ON",
  subtitle: "The practice repo you'll build on today. Everyone clones their own copy.",
  type: "context",
  visual: { cmdCards: [0, 1], oneCol: true,
    highlight: [{ in: 'tagline', text: 'inside the folder', tone: 'orange' }] },
  cards: [
    { title: "1 · Clone it", body: "git clone https://github.com/jyse/aetherlink-classroom-starter.git\ncd aetherlink-classroom-starter" },
    { title: "2 · Start Claude Code in that folder", body: "claude" }
  ],
  tagline: "Thumbs up when Claude Code is running inside the folder.",
  prompt: "git clone https://github.com/jyse/aetherlink-classroom-starter.git\ncd aetherlink-classroom-starter\nclaude",
  keyPoints: ["Everyone clones their own copy", "Copy commands: Example prompt", "claude inside the repo folder", "Count the thumbs up", "Stuck: watch a neighbour, fix at lunch"],
  notes: "Walk the room through it together, not self-paced. Everyone clones the starter repo and starts Claude Code inside that folder; the commands are in the Example prompt panel to copy. The repo is aetherlink-classroom-starter; its on-screen name is Aether Library, which we properly introduce after lunch. No npm install yet: for exploring, the files are enough; running the app comes later. Anyone stuck (git missing, no access) follows along on a neighbour's screen and gets fixed at lunch."
},

{ // Slide 36
  title: "Explore it with Claude Code",
  kicker: "DAY 1 · PART 2 · HANDS-ON DEMO",
  subtitle: "Paste this prompt and watch what Claude Code does, without changing anything.",
  type: "concept",
  dark: true,
  visual: { art: 'prompt', promptMarks: ['without changing anything', 'evidence', 'OPEN'] },
  cards: [
    { title: "Explore", body: "Explore this repository without changing anything." },
    { title: "Explain", body: "Explain what the application does, how it is structured and how I can verify your explanation." },
    { title: "Evidence", body: "Support your claims with evidence from the files." },
    { title: "Uncertainty", body: "Mark anything you cannot confirm as OPEN." }
  ],
  prompt: `Explore this repository without changing anything.

Explain what the application does, how it is structured and how I can verify your explanation. Support your claims with evidence from the files. Mark anything you cannot confirm as OPEN.`,
  keyPoints: ["Everyone pastes the same prompt", "You run it live on screen too", "Point out: reads, tools, evidence, OPEN", "Nothing changes: read-only", "Live run fails: press B for plan B"],
  notes: "Everyone pastes this prompt into their own Claude Code (Example prompt, top right, copies it) and you run it live on the projector at the same time, so people can compare. While it runs, narrate what you see: it reads files, runs commands, builds up context, ties claims to evidence, marks OPEN, and changes nothing. Before class, run this exact prompt once on your own machine. If your live run fails (no network, no auth, a crash), say so plainly and press B for the captured run, then walk through it as if it were live; the teaching point survives either way. Participants go deeper into the same repo in Assignment 1 after lunch."
},

{ // Slide 37
  title: "What Claude Code did",
  kicker: "DAY 1 · PART 2 · REVIEW",
  subtitle: "Which of these actions would a normal chat interface be unable to perform without access to the project?",
  type: "review",
  visual: { reveal: 'click' },
  cards: [
    { title: "Read project files", body: "Not a description of the project — the actual files." },
    { title: "Gathered context", body: "Built up what it needed before answering." },
    { title: "Used tools", body: "Ran commands rather than only producing text." },
    { title: "Connected claims to evidence", body: "Tied its explanation to what it actually found." },
    { title: "Marked uncertainty", body: "Flagged what it couldn't confirm as OPEN." },
    { title: "Remained read-only", body: "Did all of this without changing anything." }
  ],
  keyPoints: ["Ask what their own Claude Code did", "Let the room answer first", "Then reveal the six points", "Key: it could see real files"],
  notes: "Ask the room what their own Claude Code just did, and let them answer the question themselves before you reveal the six points. The answer (it could look at the real files) is the whole bridge into Part 3. Pick one or two people to read out an OPEN item their session raised.",
},

{ // Slide 38
  title: "Quiz: Claude Code",
  kicker: "DAY 1 · QUIZ",
  subtitle: "What makes Claude Code an agentic tool?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "It writes nicer answers than chat." },
    { title: "B", body: "It gathers context, uses tools, acts and checks results toward a goal." },
    { title: "C", body: "It never needs your approval." },
    { title: "D", body: "It runs a different AI than Claude." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B", "Link back to the demo you just saw"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: gathering context, using tools, acting and checking results toward a goal is exactly what the room just watched in the demo. C is the dangerous one: Claude Code asks for approval, and the permissions and Plan Mode slide explains why that matters."
},

{ // Slide 39
  title: "Lunch",
  kicker: "DAY 1 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Back at 13:00", body: "We continue with the working method and the Aether Library." }
  ],
  keyPoints: ["Lunch: resume at 13:00","Check practice repo clones cleanly","Check your own setup works","Assignments start right after lunch"],
  notes: "Exact resume time: 13:00. Use the break to double-check the practice repo clones cleanly on the demo machine and that your own MCP-independent setup still works — the afternoon's assignments start immediately after lunch."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 3: Working method                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 40
  title: "Human and AI working method",
  kicker: "DAY 1 · PART 3 · WORKING METHOD",
  subtitle: "One method, six steps — the red thread for both days.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, humanStep: 4, reach: true },
  items: [
    { label: "Explore", caption: "Understand before acting." },
    { label: "Plan", caption: "Agree the intended change." },
    { label: "Create", caption: "Make the smallest useful change." },
    { label: "Test", caption: "Evidence, not confidence." },
    { label: "Human review", caption: "The human decides." },
    { label: "Handoff", caption: "Someone else can pick this up." }
  ],
  tagline: "The human owns the goal, boundaries and final decision.",
  keyPoints: ["Name it once, precisely","Explore, Plan, Create, Test, Human review, Handoff","Every later reference points back here","Avoid older 'human in the loop' wording"],
  notes: "Name it once, precisely: this is the human and AI working method — Explore, Plan, Create, Test, Human review, Handoff. Every later reference to 'the method' or 'human review' points back to this exact slide, so get the wording right here. It's this doc's own label — do not revert to any older 'human in the loop' wording unless asked."
},

{ // Slide 41
  title: "Agent loop",
  kicker: "DAY 1 · PART 3 · WORKING METHOD",
  subtitle: "A loop, not a line.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, art: 'loop' },
  items: [
    { label: "Observe" },
    { label: "Decide" },
    { label: "Act" },
    { label: "Check" },
    { label: "Repeat or stop" }
  ],
  tagline: "The agent loop happens within a bounded task.",
  keyPoints: ["Five steps, keep Decide","Focus on the loop itself","Link to the method comes next"],
  notes: "Five steps, all of them stay including 'Decide' — this is the confirmed final wording. Keep this slide focused on the loop itself; the relationship between this loop and the working method just taught is the very next slide."
},

{ // Slide 42
  title: "Three views of the same work",
  kicker: "DAY 1 · PART 3 · WORKING METHOD",
  subtitle: "Zoom in: lifecycle → task → loop.",
  type: "concept",
  layout: "compare",
  visual: { art: 'boxes', link: { 0: ['Build', 'Test'], 1: ['Create', 'Test'] } },
  columns: [
    { title: "SDLC — outer", items: [
      "Plan", "Design", "Build", "Test", "Deploy", "Maintain"
    ], foot: "Contains the working method ↓" },
    { title: "Working method — middle", items: [
      "Explore", "Plan", "Create", "Test", "Human review", "Handoff"
    ], foot: "Contains the agent loop ↓" },
    { title: "Agent loop — inner", items: [
      "Observe", "Decide", "Act", "Check", "Repeat or stop"
    ] }
  ],
  tagline: "The agent loop happens within a task. A task sits within the team's software lifecycle.",
  keyPoints: ["Say the nesting left to right","SDLC Build+Test contains method Create+Test","Which contains the whole agent loop","Only the outer SDLC ring is new","Close on the tagline as written"],
  notes: "This is the reconciled three-tier diagram — say the nesting out loud, left to right: Build+Test of the SDLC (outer) contains Create+Test of the working method (middle), which contains the whole agent loop (inner). The middle tier is this course's own working method from slide 40, unchanged; the inner tier is slide 41's agent loop, unchanged. Only the outer SDLC ring is new context — it places one bounded assignment inside the team's whole software lifecycle. Close on the tagline exactly as written; it's the sentence to leave the room with before moving to slide 43."
},

{ // Slide 43
  title: "What does AI need to know first?",
  kicker: "DAY 1 · PART 3 · WORKING METHOD",
  subtitle: "Before the exercises: what would you tell a new colleague before they touch your project?",
  type: "context",
  visual: { reveal: 'click', buttons: true, bot: 'think', place: 'slot' },
  cards: [
    { title: "Who you are", body: "Your role, and what you need from this." },
    { title: "The project", body: "What it is and where things live." },
    { title: "The goal", body: "What “done” looks like." },
    { title: "The limits", body: "What it must not change, and when to stop and ask." },
    { title: "How to work", body: "Investigate first, show the plan, small changes, show evidence, mark OPEN, wait for approval." }
  ],
  keyPoints: ["Ask the room first", "Collect answers on the flipchart", "Then reveal one card at a time", "Last card = our working agreement"],
  notes: "Don't show the answers yet. Ask the room: before a new colleague touches your project, what do you tell them first? Collect answers on the flipchart for a minute or two. Then reveal the cards one by one (click or →) and match them to what the room said. The last card is the working agreement for every exercise: investigate before changing, show the plan first, make small changes, run relevant checks, show evidence, mark uncertainty as OPEN and wait for human approval before committing. Frame it as the room's own agreement with Claude Code, not a rule imposed from outside."
},

{ // Slide 44
  title: "Quiz: the working method",
  kicker: "DAY 1 · QUIZ",
  subtitle: "In our working method, who makes the final decision?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "Claude Code, once the tests pass." },
    { title: "B", body: "The human." },
    { title: "C", body: "Whoever wrote the plan." },
    { title: "D", body: "Nobody: the agent loop decides." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first: hands up per letter", "→ strikes the wrong answers", "Answer: B, the human decides"],
  notes: "Let the room vote before you reveal (hands up per letter). Press → to strike the wrong answers one by one. The answer is B: the human owns the goal, the boundaries and the final decision. Passing tests are evidence for that decision, not a replacement for it."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 4: Aether Library                                       */
/* ---------------------------------------------------------------------- */

{ // Slide 45
  title: "Aether Library",
  kicker: "DAY 1 · PART 4 · AETHER LIBRARY",
  subtitle: "A small AI knowledge library that grows throughout the two teaching days.",
  type: "context",
  visual: { stack: ['Day 1 · Assignment 2', 'Day 1 · Assignment 3', 'Day 1–2 · Assignments 4, 8, 9, 10', 'Day 2 · Assignment 11 · AI feedback'],
    highlight: [{ in: 'subtitle', text: 'grows', tone: 'orange' }] },
  cards: [
    { title: "Participant profiles", body: "Who is here, and what they're working on." },
    { title: "An AI glossary", body: "Shared definitions the whole group can rely on." },
    { title: "Enriched concept cards", body: "Definitions turned into complete, sourced explanations." },
    { title: "A learning game", body: "Explain It Back — practise recalling and applying the terms." }
  ],
  tagline: "You cloned this repo this morning. Now we build it.",
  keyPoints: ["Introduced only now, after the method", "The repo they explored this morning", "A library that grows over two days", "Next: run the app"],
  notes: "The Aether Library is only properly introduced now: participants understand Claude Code and the working method first. Connect it to this morning: it is the repo they already cloned and explored. The four parts grow over the two days (the tags show which assignment builds what). Next slide: run the app.",
},

{ // Slide 46
  title: "Run the app",
  kicker: "DAY 1 · PART 4 · AETHER LIBRARY",
  subtitle: "Start the Aether Library and open it in your browser.",
  type: "context",
  visual: { cmdCards: [0], browser: 3 },
  cards: [
    { title: "1 · Start it", body: "npm install\nnpm start" },
    { title: "2 · Open it", body: "Open http://localhost:3000." },
    { title: "3 · Keep Claude Code open", body: "Keep claude running in a second terminal, in the same folder." },
    { title: "Expected starting state", body: "Profiles, Glossary and Library only show an example — only the Game works." }
  ],
  prompt: "In the aetherlink-classroom-starter folder, run npm install and npm start. Open http://localhost:3000 — Profiles, Glossary and Library only show an example; only the Game works. Keep Claude Code running in a second terminal in the same folder. Put a checkmark in chat once both are running.",
  keyPoints: ["Same folder as this morning", "npm install, npm start", "Open localhost:3000", "Examples only, Game works", "npm install hangs: pair with neighbour"],
  notes: "Facilitator-led and quick: everyone already has the repo and Claude Code from this morning. In the same folder they run npm install and npm start, open http://localhost:3000, and keep Claude Code running in a second terminal. The Profiles, Glossary and Library pages each show a small example as a reference but no real data yet; only the Game works. If someone's npm install hangs, pair them with a neighbour to keep pace rather than debugging live for everyone."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 1                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 47
  title: "Assignment 1: Go deeper in the repo",
  kicker: "DAY 1 · ASSIGNMENT 1",
  subtitle: "This morning was a first look. Now map the parts you'll change this afternoon.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "where the data lives\nhow to start and validate\nrisky files\nOPEN questions" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Find where profile and glossary data live.",
    "Find the start and validate commands.",
    "Flag files that could break things.",
    "Mark what you can't confirm as OPEN."
  ],
  expected: "A short, evidence-based map of the parts you'll change. No files changed.",
  keyPoints: ["Builds on this morning's first look", "Still read-only: change nothing", "Timer: set minutes, press ▶ Start", "Verbal warning at 5 minutes left", "Early finishers: dig into one OPEN"],
  notes: "Everyone explored the repo this morning; this goes deeper on exactly the parts they will change in Assignments 2 to 4: where profile and glossary data live (and that there is no profiles data yet), the start and validate commands (running npm run validate is fine, it changes nothing), files that could break something if changed carelessly, and anything unverifiable marked OPEN rather than guessed. Still read-only: no file changes. Set the minutes on the timer and press Start so everyone sees it. At 5 minutes remaining, give a verbal warning. If someone finishes early, have them dig into one OPEN question."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 2                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 48
  title: "Assignment 2: Participant profile",
  kicker: "DAY 1 · ASSIGNMENT 2",
  subtitle: "Add your profile, and the page that shows it.",
  type: "practice",
  visual: { badge: 0 },
  layout: "exercise",
  cards: [
    { title: "Include", body: "name\nrole\nteam\nlearning goal" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Look at the existing structure first.",
    "Ask me for details. Invent nothing.",
    "Show the plan, then build it.",
    "Check it appears on the Profiles page."
  ],
  expected: "Your profile shows on a working Profiles page.",
  keyPoints: ["Example card is only a reference","Good run: explore, plan, then change","Claude asks, doesn't invent details","Redirect file-editors to explore and plan","No confidential personal information"],
  notes: "The Profiles page shows one example profile card as a reference; participants build the real page and their own entry. What a good run looks like: Claude inspects the structure first, asks for anything it doesn't know instead of inventing details, proposes both the profile data and the page that displays it, shows the plan before changing anything, and confirms the profile is visible afterwards. Useful profile fields: name, role, team, experience, learning goal and one workflow you'd like AI to improve. Watch for participants who skip straight to editing a file and redirect them to explore and plan, without being heavy-handed: this is the first time they feel the method in their own hands. Remind them explicitly: no confidential or unnecessary personal information."
},

{ // Slide 49
  title: "Short break",
  kicker: "DAY 1 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with the glossary contribution." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Skim a few participants' profiles","Use them as examples in Assignment 3"],
  notes: "State the actual clock time you'll resume. Use the break to skim a couple of participants' profiles if you haven't already — it helps you call on real examples once Assignment 3 starts."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 3                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 50
  title: "Assignment 3: The 20 AI terms that matter",
  kicker: "DAY 1 · ASSIGNMENT 3",
  subtitle: "First in plan mode, then in auto mode. Spot the difference.",
  type: "practice",
  visual: { template: 0, templateRows: ['Term', 'Definition'] },
  layout: "exercise",
  cards: [
    { title: "Add", body: "20 terms, each with a plain-language definition of 1–2 sentences" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Plan mode: ask Claude for the 20 most important AI terms.",
    "Review the list together and agree on it.",
    "Let Claude add the agreed terms to the glossary.",
    "Auto mode: ask the same in a new session and compare."
  ],
  expected: "20 agreed terms on the Glossary page, and a clear view of what changes with and without a plan.",
  keyPoints: ["The point is the contrast","Plan mode: Shift+Tab until Plan","Agree on the 20 terms first","Fresh session in auto mode, same question","Collect two or three differences"],
  notes: "The point of this assignment is the contrast. In plan mode (Shift+Tab until the mode shows Plan) Claude proposes its 20 terms before touching anything, so the room can see its choices and agree on them first; that's the human review step in practice. Only then do they let it add the terms (and build the Glossary page, if it doesn't show entries yet; the example terms on that page are the reference). Then, in a fresh session in auto mode, ask the same question and let it run: which terms did it pick without a plan, and would you have agreed with them? Collect two or three differences from the room. Definitions stay plain language, 1–2 sentences, in English, with no claims that can't be backed up."
},

{ // Slide 51
  title: "Assignment 4: Enriched concept card",
  kicker: "DAY 1 · ASSIGNMENT 4",
  subtitle: "Turn one glossary term into a full concept card.",
  type: "practice",
  visual: { template: 0 },
  layout: "exercise",
  cards: [
    { title: "Include", body: "explanation\nexample\ncommon misunderstanding\nessential points\nrelated concepts\nsources" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Look at the existing data structure first.",
    "Propose the card and a small plan.",
    "Open and read every source.",
    "Approve, then build and check."
  ],
  expected: "One checked concept card on the Library page.",
  keyPoints: ["Longest assignment of Day 1","Example cards are only a reference","Sources must be opened and read","Approval before changing files","Coach on verifying the explanation"],
  notes: "Longest assignment of Day 1 — the room will feel the jump from a basic glossary entry to a fully sourced card. The Library page shows example cards as a reference; participants build the real, data-driven page (if it doesn't exist yet) plus their own card. What a good run looks like: Claude inspects the data structure and app design first, proposes the card content and the smallest plan (including the Library page if needed), opens and reads each source (a search result is not a check), waits for approval before changing files, and runs the relevant checks afterwards. Circulate and coach on verifying the factual explanation specifically; that's the step people skip under time pressure."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 52
  title: "Day 1 learning note",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Five quiet minutes — in your own words.",
  type: "recap",
  visual: { notebook: 0, quietTimer: 5, highlight: [{ in: 'tagline', text: 'OPEN', tone: 'orange' }] },
  cards: [
    { title: "Record", body: "what you created\nhow you used Claude Code\nwhat you tested\nwhat you learned\nwhat remains unclear\nwhat you want to try tomorrow" }
  ],
  tagline: "Write the note yourself. Preserve uncertainty as OPEN.",
  keyPoints: ["Five genuinely quiet minutes","Raw, honest note, not Claude-polished","Protect the writing habit"],
  notes: "Day 2 doesn't ask participants to revisit this note directly (Day 2 works from concept cards, not this note), but the habit of writing a raw, honest note — not one polished by Claude — is worth protecting today. Give people genuinely quiet time to write it, five minutes is enough."
},

{ // Slide 53
  title: "Day 1 recap",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Today you:",
  type: "recap",
  visual: { badges: ['🧠', '🤖', '🔍', '✅', '🃏', '👤'], bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'reusable skill', tone: 'orange' }] },
  cards: [
    { title: "Learned the AI foundations", body: "" },
    { title: "Used Claude Code as an agentic tool", body: "" },
    { title: "Explored an unfamiliar repository", body: "" },
    { title: "Made and validated small changes", body: "" },
    { title: "Created the first concept card", body: "" },
    { title: "Applied human review", body: "" }
  ],
  tagline: "Tomorrow: turn the repeated method into a reusable skill and use it to build the rest of the Library.",
  keyPoints: ["Preview only","Don't explain skills, MCP, bounded work","Day 2 covers those","End on the tagline"],
  notes: "Preview only — do not explain skills, MCP or bounded agentic work in depth tonight, that's Day 2's entire structure. End on the tagline, not on details."
},

/* ==========================================================================
   TEACHING DAY 2 — Reusable methods, agentic work and connected context
   ========================================================================== */

{ // Slide 54
  title: "Reusable and connected AI workflows",
  kicker: "TEACHING DAY 2",
  subtitle: "From one concept card to a repeatable method.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Warm-up', 'Recap', 'Context', 'Skills', 'Bounded work', 'Game', 'MCP', 'Closing'] },
  cards: [
    { title: "What we're doing", body: "Turning yesterday's method into something reusable, bounded and connected." },
    { title: "Today", body: "Skills, bounded agentic work, the learning game, and approved workplace connections." }
  ],
  keyPoints: ["Short re-welcome","Point at the day's shape","Warm-up first: Stekkie, bio, avatar","Then the retrieval check"],
  notes: "Short re-welcome — most of the room was here yesterday, so this can be brief. Point at the day's shape (warm-up → recap → context → skills → bounded work → game → MCP → closing). The warm-up comes first: Stekkie, LibreChat bio, the action-figure avatar and putting it on your profile — then the retrieval check."
},

{ // Slide 55
  title: "Built with AI: Stekkie",
  kicker: "DAY 2 · SHOW & TELL",
  subtitle: "My own AI garden coach — vibe coded, live at app.stekkie.ai.",
  type: "context",
  visual: { opener: 'showcase', image: 'assets/stekkie.webp', imageLink: 'app.stekkie.ai', stagger: 'pop', compact: true },
  cards: [
    { title: "An idea", body: "A garden coach: what to sow, when to harvest, what's wrong with a leaf." },
    { title: "A conversation with AI", body: "Built by describing what I wanted — no traditional development team." },
    { title: "A live app", body: "Real users, real data, real bugs to fix." }
  ],
  tagline: "Vibe coding gets you a working app. Today is about making it reliable.",
  keyPoints: ["Constance demos Stekkie live","3 to 5 minutes, no more","Show one flow end to end","Land it: trust needs today's material","Site fails: tell story with image"],
  notes: "Constance demos Stekkie live (app.stekkie.ai) — 3 to 5 minutes, no more. Show one flow end to end, e.g. plant something and harvest it. Then land the tagline: vibe coding got this app live, but what makes it trustworthy is exactly today's material — context, repeatable methods, bounded work and checks. If the site or wifi fails, stay on this slide and tell the story with the image."
},

{ // Slide 56
  title: "LibreChat: teach it who you are",
  kicker: "DAY 2 · WARM-UP · LIBRECHAT",
  subtitle: "Fill in your bio so every answer starts from you.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "In LibreChat:",
  visual: { badge: 0 },
  cards: [
    { title: "Your bio covers", body: "role and team\nwhat you work on\nhow you like answers\nlanguage" }
  ],
  steps: [
    "Open Settings and find the bio.",
    "Write who you are and how you like answers.",
    "Nothing confidential.",
    "New chat: “What do you know about me?”"
  ],
  expected: "LibreChat describes you correctly — without you telling it again in the chat.",
  tagline: "Your bio is personal context. CLAUDE.md, later today, is the same idea for a project.",
  keyPoints: ["Ten minutes, hands on","Bio: role, team, work, answer style","No customer data or credentials","Check they find Settings → bio","Bio is context about you"],
  notes: "Ten minutes, hands on. The bio covers role and team, what you work on, and how you like answers (short, with examples, which language); no customer data, no credentials. Walk the room and check people actually find the setting (Settings → personalisation / bio). The bridge: the bio is context about you, and the Sources of context and CLAUDE.md slides return to exactly this idea for a project. Worth showing in two minutes if time allows, without turning it into a LibreChat course: (1) the Prompts library, saved prompts with variables, the LibreChat version of a repeated method (→ skills); (2) Agents, your own assistant with instructions and files, level 4–5 on the Levels of AI use slide; (3) choosing a model per conversation; (4) uploading a file to ask about it, only what is relevant, current and permitted.",
},

{ // Slide 57
  title: "Warm-up: your action-figure avatar",
  kicker: "DAY 2 · WARM-UP",
  subtitle: "Create the coolest action-figure picture of yourself in LibreChat.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "In LibreChat:",
  visual: { compact: true, cardImages: ['assets/avatars/avatar-cartoon.webp', 'assets/avatars/avatar-superhero.webp', 'assets/avatars/avatar-jipjanneke.webp'] },
  cards: [
    { title: "Cartoon", body: "Create a square cartoon avatar of me as an action figure: [describe yourself — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, no text." },
    { title: "Superhero", body: "Create a square comic-book superhero portrait of me: [describe yourself]. Cape, city skyline at night, no text." },
    { title: "Jip and Janneke", body: "Create a square avatar of me as a Dutch Jip and Janneke silhouette: black on a plain coloured background. [describe yourself]. No text." }
  ],
  steps: [
    "Describe yourself. No real photo.",
    "Pick a style, or invent one.",
    "Square, plain background, no text.",
    "Download your favourite."
  ],
  expected: "A square avatar you'd happily put on your profile.",
  tagline: "Bonus: make it your LibreChat avatar too.",
  keyPoints: ["Five minutes, keep energy high","Examples are starting points","Explain Jip and Janneke in one sentence","Describe yourself, no real photo","Check everyone downloaded the file"],
  notes: "Five minutes, keep the energy high — this is meant to be fun. The three examples are starting points; encourage people to change them. Jip and Janneke is a well-known Dutch children's-book style (Fiep Westendorp): black silhouettes — explain it in one sentence for non-Dutch participants. Everyone describes themselves instead of uploading a real photo. Make sure everyone has actually downloaded the file before moving on. Bonus (tagline): LibreChat avatar via Settings → Account. The three thumbnails are AetherBOT made with these same prompts (nano-banana-pro, chest logo put back from the original asset) — proof the prompts work."
},

{ // Slide 58
  title: "Your avatar in the Aether Library",
  kicker: "DAY 2 · WARM-UP · CLAUDE CODE",
  subtitle: "Profiles don't have a photo yet — ask Claude Code to add one.",
  type: "practice",
  layout: "exercise",
  visual: { badge: 0 },
  cards: [
    { title: "Your profile", body: "photo\nname\nrole\nlearning goal" }
  ],
  steps: [
    "Explore how profiles are shown.",
    "Plan a photo, with initials as fallback.",
    "Show the plan, then build it.",
    "Test with and without a photo."
  ],
  expected: "Your profile shows your avatar; profiles without a photo still show initials.",
  tagline: "Keep it local — don't commit your picture to a public repository.",
  stepsHeading: "Steps:",
  keyPoints: ["Method in miniature: explore to test","Image into public/avatars/ first","Optional photo, initials when none","Test a profile without a photo","Watch for edits without a plan"],
  notes: "Back to Claude Code, and back to the working method from Day 1 in miniature: explore, plan, approve, change, test. First make sure everyone has moved the downloaded image into their project (public/avatars/). A good plan: an optional photo per profile, stored in public/avatars/, with initials shown when there is none. The fallback to initials is the part people forget; that's the test step: check a profile without a photo too. Watch for participants who let Claude edit without showing a plan first.",
},

{ // Slide 59
  title: "Retrieval check",
  kicker: "DAY 2 · RECAP",
  subtitle: "Without looking at yesterday's slides, explain:",
  type: "recap",
  tagline: "Answer from memory first — no peeking.",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "Why is Claude Code agentic?", body: "" },
    { title: "What is context?", body: "" },
    { title: "What happens during human review?", body: "" },
    { title: "What is the difference between a claim and evidence?", body: "" },
    { title: "What are the six steps in our working method?", body: "" }
  ],
  keyPoints: ["Cold retrieval, no looking back","Make them actually answer","Struggling with six steps? Slow down"],
  notes: "Genuinely make them answer without looking back at Day 1's deck — cold retrieval, not open-book. If the room struggles with the six steps, that's useful signal: slow down Part 1 rather than push ahead."
},

{ // Slide 60
  title: "Levels of AI use",
  kicker: "DAY 2 · RECAP",
  subtitle: "From asking a model to building an agent.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, art: 'stairs', today: [2, 3] },
  items: [
    { label: "Ask a model", caption: "Ask a model for a response." },
    { label: "Use Claude Code", caption: "Use Claude Code to work inside a project." },
    { label: "Customise Claude Code", caption: "With project instructions and skills." },
    { label: "Design a bounded workflow", caption: "With tools and checks." },
    { label: "Build a deployed agent", caption: "A separately deployed agent application." }
  ],
  tagline: "Today focuses on levels 3 and 4.",
  keyPoints: ["Map for the whole day","Part 1: levels 2 to 3","Part 2: level 3, skills","Parts 3 to 5: level 4","Point forward per level"],
  notes: "This is the map for the whole day: Part 1 lives at level 2–3 (context, CLAUDE.md), Part 2 at level 3 (skills), Part 3–5 at level 4 (bounded agentic work, the game, MCP). Point forward to today's parts as you introduce each level."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 1: Context and CLAUDE.md                                   */
/* ---------------------------------------------------------------------- */

{ // Slide 61
  title: "Assignment 5: Design and build a feature",
  kicker: "DAY 2 · ASSIGNMENT 5",
  subtitle: "Dream up features for the Aether Library, pick them as a room, then build one.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Good ideas are", body: "small enough for one hour\nuseful for the whole room\nvisible in the browser\nsafe: no data files changed" }
  ],
  steps: [
    "Plan mode: ask Claude for 5 feature ideas.",
    "Share your best idea with the room.",
    "As a room, pick a few for the board.",
    "Build one of the picked features."
  ],
  expected: "One picked feature working in your Library, planned before it was built.",
  stepsHeading: "Steps:",
  keyPoints: ["Plan mode: ask for five ideas","Each shares best idea, one sentence","Room picks 3 to 5, on board","Build one: plan, approve, build, check","Watch: data file changes, broken pages"],
  notes: "Four rounds. (1) Everyone switches to plan mode (Shift+Tab until it shows Plan) and asks Claude for five feature ideas for their Aether Library; Claude explores the project and proposes, but changes nothing. (2) Each person shares their best idea in one sentence. (3) The room picks three to five and you write them on the board. (4) Everyone builds one of the picked features with the working method: plan, approve, build, check in the browser. Good fits if the room needs a nudge: a theme switcher with 3+ palettes that survives a reload, a restyled AetherBOT (look, greeting, tone of voice), search on the Glossary page, a “term of the day”. The skill practised is describing what you want to SEE, not what code to write; encourage small rounds (change, look, adjust). Watch for changes that touch the data files (only app code should change) and for features that break another page.",
},

{ // Slide 62
  title: "Sources of context",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Where context can come from.",
  type: "concept",
  visual: { art: 'intake', bot: 'head', place: 'aside', tags: { 4: 'later today' } },
  cards: [
    { title: "Current conversation", body: "The task requested now." },
    { title: "Project instructions", body: "CLAUDE.md" },
    { title: "Task files", body: "Brief, ticket or plan." },
    { title: "Repository", body: "Code, tests and documentation." },
    { title: "Connected system", body: "Jira, GitLab or Confluence through approved tools." }
  ],
  keyPoints: ["Where context can come from","Underline the last row","Seed for Part 5 MCP"],
  notes: "The last row is the one to underline — it's the seed for Part 5's MCP content later today."
},

{ // Slide 63
  title: "CLAUDE.md",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "The briefing Claude reads at the start of every session.",
  type: "concept",
  visual: { mdfile: 1, guides: [['🧭', 'CLAUDE.md', 'guides Claude'], ['🔒', 'Permissions', 'enforce access']] },
  cards: [
    { title: "Purpose", body: "CLAUDE.md provides persistent project instructions to Claude Code." },
    { title: "Useful contents", body: "project purpose and structure\nconventions\napproved commands\nprivacy boundaries\nvalidation requirements\nhuman approval points" }
  ],
  tagline: "It guides Claude. Permissions and technical controls enforce access.",
  keyPoints: ["Tagline matters as much as contents","Not a prompt landfill","Not access control either","Point to the seed CLAUDE.md"],
  notes: "The tagline matters as much as the contents list — CLAUDE.md is deliberately not a prompt landfill, and it isn't an access-control mechanism either. Point participants to their seed CLAUDE.md now."
},

{ // Slide 64
  title: "Assignment 6: Project instructions",
  kicker: "DAY 2 · ASSIGNMENT 6",
  subtitle: "Write AetherBOT's rules where every Claude session can read them.",
  type: "practice",
  visual: { mdfile: 0 },
  layout: "exercise",
  cards: [
    { title: "Put in CLAUDE.md", body: "what AetherBOT is for\nwhere its answers come from\nyour rules (3+), e.g. say OPEN when unsure\nhow to test a change\nwhen to ask for approval" }
  ],
  steps: [
    "Ask Claude to review CLAUDE.md.",
    "Choose 3+ rules for AetherBOT.",
    "Keep only what every session needs.",
    "Show the change before editing."
  ],
  expected: "A CLAUDE.md that tells any new Claude session how AetherBOT must behave, without you explaining anything out loud.",
  stepsHeading: "Steps:",
  keyPoints: ["Rules into CLAUDE.md, bot comes next","Redirect to-do list dumping","Steer: answer from cards, say OPEN","Refuse off-topic, no profile details","Bot is plain code, no model"],
  notes: "CLAUDE.md through the chatbot: the rules go into the file now, and Assignment 7 builds the bot from them. A good CLAUDE.md here says what AetherBOT is, where its data comes from, the rules, how to test a change and when to ask for approval; no temporary assignment notes or personal preferences. Watch for participants pasting today's entire to-do list into CLAUDE.md; redirect with the CLAUDE.md slide's contents list: it isn't a prompt landfill or a temporary notes file. Good rules to steer towards: answer only from glossary/cards, say OPEN when unsure, name the source card, refuse off-topic, never repeat personal profile details. The bot itself is plain code with no model inside; the rules matter because Claude Code reads them whenever it works on the bot.",
},

{ // Slide 65
  title: "Fresh-session test",
  kicker: "DAY 2 · ASSIGNMENT 6 · REVIEW",
  subtitle: "Start a fresh Claude Code session.",
  type: "review",
  tagline: "Type /clear — your files stay. Your neighbour asks the five questions and decides.",
  visual: { lineReveal: 0, stamps: ['PASS', 'REVISE', 'OPEN'], swap: true, highlight: [{ in: 'tagline', text: '/clear', tone: 'orange' }] },
  cards: [
    { title: "Can Claude determine", body: "what AetherBOT is for\nwhich data it may answer from\nwhat it does when it doesn't know\nwhat it must never reveal\nhow to test a change to the bot" }
  ],
  check: "Decision: PASS, REVISE or OPEN",
  keyPoints: ["No laptop swap","Everyone types /clear","Neighbour on right asks five questions","Decide PASS, REVISE or OPEN","Wrong answer = missing rule"],
  notes: "No laptop swap. Everyone types /clear in their own session — the files stay, the conversation is gone. The neighbour on their right then asks the five questions and decides PASS, REVISE or OPEN. If Claude can answer from CLAUDE.md alone, the instructions work — the single most convincing proof of the morning. Anything Claude got wrong is a rule missing from the file."
},

{ // Slide 66
  title: "Assignment 7: Build AetherBOT from your rules",
  kicker: "DAY 2 · ASSIGNMENT 7",
  subtitle: "Make the bot follow your CLAUDE.md rules, without repeating them in your prompt.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a bot that follows your CLAUDE.md rules\n1–2 new commands (quiz me, compare X and Y)\ntests that prove it" }
  ],
  steps: [
    "Ask Claude to follow CLAUDE.md. Don't paste the rules.",
    "Add 1–2 commands of your own.",
    "Plan first, then build.",
    "Test: questions that should break a rule."
  ],
  expected: "AetherBOT follows the rules written in CLAUDE.md, answers your new commands, and says OPEN instead of guessing.",
  stepsHeading: "Steps:",
  keyPoints: ["Don't repeat rules in the prompt","Pasted rules? Delete and retry","Rule fails: code wrong or rule unclear?","Call extras commands, not skills","Watch: untested commands, uncoded rules"],
  notes: "The payoff of Assignment 6: participants should NOT repeat the rules in their prompt; Claude reads them from CLAUDE.md. If someone pastes them in anyway, ask them to delete that and try again. Commands are things like “quiz me” or “compare X and Y”. When a rule fails, the question to ask is: is the code wrong, or is the rule unclear in CLAUDE.md? The chatbot is plain code: Claude Code builds it, the bot itself calls no model; same “agentic tool vs the app you built” distinction as on Day 1. Call the extras “commands”, not skills: Claude Code skills come after the break. Watch for a command with no test, and for rules that only exist in CLAUDE.md but never made it into the code.",
},

{ // Slide 67
  title: "Break your partner's bot",
  kicker: "DAY 2 · ASSIGNMENT 7 · REVIEW",
  subtitle: "Ask your partner's AetherBOT five tricky questions.",
  type: "review",
  cards: [
    { title: "Try", body: "a term it should know\na term that is not in the Library\nan off-topic question\na question about someone's profile\na question worded in a tricky way" }
  ],
  check: "Decision: PASS, REVISE or OPEN — did every rule hold?",
  keyPoints: ["Ten minutes, swap laptops","Write down which rule failed","Fix it with Claude Code","After Assignment 10: point out new cards"],
  notes: "Ten minutes, partners swap laptops for this one (it's their own bot, not a fresh Claude session). Each person writes down which rule failed, then fixes it with Claude Code. Note for later: after Assignment 10 the bot can answer from all the new cards, without changes — point that out then."
},

{ // Slide 68
  title: "Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with turning a repeated method into a skill." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Pivot: CLAUDE.md to skill building"],
  notes: "State the actual clock time you'll resume. This is the pivot point of the morning — from individual CLAUDE.md edits to the shared skill-building work of Part 2."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 2: From repeated prompt to skill                          */
/* ---------------------------------------------------------------------- */

{ // Slide 69
  title: "A repeated method",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "The same six instructions — every single time.",
  type: "context",
  visual: { repeatStack: 0, bot: 'sleepy', place: 'aside' },
  cards: [
    { title: "Yesterday, one concept card required instructions for", body: "structure\nsource checking\nexamples\nmissing information\nvalidation\nhuman approval" }
  ],
  tagline: "The next card requires the same method.",
  keyPoints: ["Bridge from yesterday's concept card","Say the connection out loud","Same six instructions every time"],
  notes: "This bridges directly from yesterday's concept-card assignment into the skill-building work of this whole part — say that connection out loud."
},

{ // Slide 70
  title: "Assignment 8: Create a second card",
  kicker: "DAY 2 · ASSIGNMENT 8",
  subtitle: "Make a second concept card with a normal prompt, the same way as yesterday.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a second concept card\na list of what you had to repeat" }
  ],
  steps: [
    "Pick a second term.",
    "Use yesterday's requirements.",
    "Show the draft first.",
    "Note what you had to repeat."
  ],
  expected: "A second concept card created through another one-off prompt — plus a clear sense of what had to be repeated.",
  stepsHeading: "Steps:",
  keyPoints: ["Keep it an ad-hoc prompt, not skill","Add term to glossary first","Same requirements and validation as yesterday","Check it renders on Library page","No jumping ahead to Assignment 9"],
  notes: "Important: this must stay a normal, ad-hoc prompt, not a skill. Add the term to the glossary first if it isn't there yet, use the same requirements and validation as yesterday's approved card, and check it renders on the Library page. The inconsistency this creates between people's results, and the list of instructions they had to repeat from scratch, is exactly what motivates building a skill next. Don't let anyone jump ahead to Assignment 9 yet.",
},

{ // Slide 71
  title: "Compare the two runs",
  kicker: "DAY 2 · ASSIGNMENT 8 · REVIEW",
  subtitle: "Which parts should become a shared method?",
  type: "review",
  visual: { lineReveal: 0, diff: [
    { title: 'Run 1 · yesterday', rows: [{ k: 'Explanation' }, { k: 'Example' }, { k: 'Misunderstanding' }, { k: 'Key points' }, { k: 'Related' }, { k: 'Sources', note: '3' }] },
    { title: 'Run 2 · today', rows: [{ k: 'Explanation' }, { k: 'Example', odd: true, note: 'longer' }, { k: 'Misunderstanding', miss: true, note: 'missing' }, { k: 'Key points' }, { k: 'Related', miss: true, note: 'missing' }, { k: 'Sources', odd: true, note: '1' }] }] },
  cards: [
    { title: "Compare", body: "Which instructions did you repeat?\nDid the cards follow the same structure?\nDid Claude perform the same checks?\nWhich parts should become a shared method?\nWhat must still require human judgement?" }
  ],
  keyPoints: ["Collect two or three different outcomes","Say them out loud","The contrast is the point","Creates the need for a method"],
  notes: "This discussion creates the need for a reusable method — collect two or three genuinely different outcomes from the room out loud before moving to slide 72, the contrast is the point."
},

{ // Slide 72
  title: "Claude Code skills",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Teach Claude a method once — reuse it every time.",
  type: "concept",
  visual: { mdfile: 1, mdName: 'SKILL.md', highlight: [{ in: 'tagline', text: 'does not start Claude Code or run continuously', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "A skill packages a reusable method for a recurring task." },
    { title: "A skill can define", body: "when it applies\nrequired input\nprocedure\noutput format\nboundaries\nstop conditions" }
  ],
  tagline: "A skill does not start Claude Code or run continuously.",
  keyPoints: ["Repeat the tagline","Skill = packaged method","Not a background process","Not its own agent"],
  notes: "The tagline is a real guardrail worth repeating — a skill is a packaged method Claude Code applies when relevant, not a background process or its own agent."
},

{ // Slide 73
  title: "Prompt, CLAUDE.md and skill",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Three different mechanisms, three different jobs.",
  type: "concept",
  visual: { lifespan: [{ kind: 'now', icon: '💬', label: 'now' }, { kind: 'always', icon: '📄', label: 'every session' }, { kind: 'recurring', icon: '🧰', label: 'whenever that task comes up' }] },
  cards: [
    { title: "Prompt", body: "The task Claude should perform now." },
    { title: "CLAUDE.md", body: "Project instructions that apply across sessions." },
    { title: "Skill", body: "A reusable method for one type of task." }
  ],
  keyPoints: ["Three mechanisms, three jobs","Assignment 9 builds this distinction","Point back here during work"],
  notes: "This table is the exact distinction Assignment 9 asks participants to build — point back to it once the room starts working."
},

{ // Slide 74
  title: "Quiz: where does it go?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "Claude must follow a rule in every session of this project. Where do you put it?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "In your prompt, every time." },
    { title: "B", body: "In CLAUDE.md." },
    { title: "C", body: "In a skill." },
    { title: "D", body: "In the glossary." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B, CLAUDE.md", "Skill = a recurring method, not a standing rule"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: CLAUDE.md is read in every session, so standing rules live there. A is the problem the room felt in Assignment 8: repeating yourself. C is close but different: a skill holds a recurring method that runs when needed, not a rule that always applies."
},

{ // Slide 75
  title: "Create Concept Card skill",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "You build this skill from nothing — this is where it lives.",
  type: "context",
  visual: { tree: 0 },
  cards: [
    { title: "Create, test and improve", body: ".claude/skills/create-concept-card/SKILL.md" }
  ],
  keyPoints: ["Incomplete skill is safer and clearer","Show where the file lives","Before Assignment 9 starts"],
  notes: "Preparing an incomplete skill is safer and clearer than asking every participant to invent the structure from nothing. Point out where the file lives before Assignment 9 starts so nobody spends their first five minutes just finding it."
},

{ // Slide 76
  title: "Assignment 9: Teach Claude the method",
  kicker: "DAY 2 · ASSIGNMENT 9",
  subtitle: "Build the Create Concept Card skill.",
  type: "practice",
  visual: { mdfile: 0, mdName: 'SKILL.md' },
  layout: "exercise",
  cards: [
    { title: "The skill must cover", body: "required source information\ncard structure\nfactual verification\nmissing information\nvalidation\nhuman approval" }
  ],
  steps: [
    "Use your approved cards as the example.",
    "Create .claude/skills/create-concept-card/SKILL.md.",
    "Real sources, OPEN when unsure.",
    "Stop for approval before writing."
  ],
  expected: "A complete create-concept-card skill, tested against the approved cards.",
  stepsHeading: "Steps:",
  keyPoints: ["First self-authored skill, expect longer","Coach, don't demo an answer","Real sources, OPEN instead of inventing","Writes only to concept-cards.json","Check it stops for human approval"],
  notes: "The room's first time authoring their own skill; expect it to take longer than the slide suggests. The skill must: use the approved card(s) as evidence of what good looks like; require real sources before trusting any factual claim; follow the exact existing concept-card structure; keep uncertainty as OPEN instead of inventing content; validate its output; stop for human approval before writing; and only ever write to data/concept-cards.json, never glossary or profiles. Your job is coaching, not demoing a pre-built answer; circulate and check each skill still stops for human approval rather than finishing unattended.",
},

{ // Slide 77
  title: "Lunch",
  kicker: "DAY 2 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Back at 13:00", body: "We continue with bounded agentic work — using the skill across every term at once." }
  ],
  keyPoints: ["Lunch: resume at 13:00","Check in on stuck skills","Quick word over lunch"],
  notes: "Exact resume time: 13:00. This is the natural point to check in with anyone whose skill from Assignment 9 isn't quite working yet — a quick word over lunch is easier than derailing the afternoon's start."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 3: Bounded agentic work                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 78
  title: "Bounded autonomy",
  kicker: "DAY 2 · PART 3 · BOUNDED AGENTIC WORK",
  subtitle: "One goal, many steps — inside a fence.",
  type: "concept",
  visual: { fence: 1 },
  cards: [
    { title: "Definition", body: "Claude Code can perform several steps after receiving one goal." },
    { title: "Boundaries define", body: "what it may read\nwhat it may change\nwhich checks it must run\nwhen it must stop\nwhich decisions remain human" }
  ],
  keyPoints: ["Assignment 10 applies this next","One instruction, many terms","Bounded by explicit stop conditions"],
  notes: "This is the concept Assignment 10 puts into practice immediately — a single instruction that processes many terms, still bounded by explicit stop conditions."
},

{ // Slide 79
  title: "Assignment 10: Build the card library",
  kicker: "DAY 2 · ASSIGNMENT 10",
  subtitle: "One instruction, every approved glossary term.",
  type: "practice",
  visual: { conveyor: 0 },
  layout: "exercise",
  cards: [
    { title: "For each term", body: "read the glossary entry\ncheck sufficiency\ncreate the concept card\nvalidate the required fields\nrecord READY, REVISE or OPEN\ncontinue with the next term" }
  ],
  steps: [
    "Add 4 new terms to the glossary.",
    "Run the skill on each term, one at a time.",
    "Mark each READY, REVISE or OPEN.",
    "Invent nothing. Commit nothing."
  ],
  expected: "Draft concept cards for all suitable terms, plus a status report ready for human review.",
  stepsHeading: "Steps:",
  keyPoints: ["Per term: READY, REVISE or OPEN","Approve each card as it comes","Circulate, check runs stop and report","No unattended commits","Watch for guesses instead of OPEN"],
  notes: "Per term the skill reads the glossary entry, checks whether information and sources are sufficient, creates the card, validates the required fields and records READY, REVISE or OPEN; participants approve each card as it comes, then ask for one summary with a status per term. Low infra-risk since participants build and run it themselves; your job is circulating and checking each run actually stops to report rather than committing unattended. Watch especially for terms it should have marked OPEN instead of guessing.",
},

{ // Slide 80
  title: "Agentic behaviour in the assignment",
  kicker: "DAY 2 · PART 3 · BOUNDED AGENTIC WORK",
  subtitle: "The agent loop inside Assignment 10.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, art: 'loop', loopCaptions: true },
  items: [
    { label: "Observe", caption: "Read the next term and source." },
    { label: "Decide", caption: "Determine whether the information is sufficient." },
    { label: "Act", caption: "Create or revise the card." },
    { label: "Check", caption: "Validate the card." },
    { label: "Repeat or stop", caption: "Continue, mark OPEN or request human input." }
  ],
  keyPoints: ["Agent loop, now made concrete","Use as a live diagnostic","Ask stuck people which step"],
  notes: "This is the agent loop from slide 41, now made concrete in the exact assignment the room is running. Use it as a live diagnostic while circulating: ask a stuck participant which of these five steps their session is stuck on."
},

{ // Slide 81
  title: "Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with the Explain It Back learning game." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Two big assignments follow","Reset your own energy"],
  notes: "State the actual clock time you'll resume. The afternoon's remaining assignments (9 and 10) are the two most substantial of the whole programme — use this break to reset your own energy too."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 4: Learning game                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 82
  title: "Explain It Back",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "The Library now contains enough structured knowledge to support a learning game.",
  type: "concept",
  visual: { gameFlow: true },
  cards: [
    { title: "One AI term", body: "Shown from the approved concept cards." },
    { title: "An answer field", body: "The participant types their own explanation." },
    { title: "The approved concept card", body: "Revealed after the explanation is submitted." },
    { title: "Feedback or self-review", body: "Checked against what a good explanation contains." },
    { title: "The next term", body: "Continue through the deck of approved cards." }
  ],
  keyPoints: ["Payoff of Parts 2 to 3","Every card feeds the game","Say the connection explicitly"],
  notes: "This is the payoff of Parts 2–3 — every card the room built now feeds this game. Say that connection explicitly before moving to the starter state."
},

{ // Slide 83
  title: "Game starter state",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "The game works — only the feedback is missing.",
  type: "concept",
  visual: { checklist: 0, gameMock: true },
  cards: [
    { title: "Already available", body: "game page and visual design\nterm card\nanswer field\nSubmit button\nempty feedback area\napproved concept-card data" }
  ],
  tagline: "Participants complete the behaviour.",
  keyPoints: ["Point out what's missing","Submit does nothing yet","Assignment 11 fills the gap"],
  notes: "Point out explicitly what's missing: the game doesn't yet do anything when Submit is clicked. That gap is exactly what Assignment 11 fills."
},

{ // Slide 84 (shown before 64: explains checklist.md + categories first)
  title: "checklist.md and the term-checker skill",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "What a good explanation must contain — and how Claude Code checks it.",
  type: "concept",
  visual: { mdfile: 0, mdName: 'checklist.md', catChips: 1 },
  cards: [
    { title: "checklist.md checks", body: "central meaning\nimportant elements\npractical example\nincorrect claims\nmissing information\nrecommended resources" },
    { title: "Feedback categories", body: "Strong explanation\nPartially complete\nReview this concept\nUnable to evaluate" },
    { title: "Skill #2: term-checker", body: "Reads checklist.md and the latest submission, compares them, and writes structured feedback. The criteria live in checklist.md, not hardcoded in the skill." }
  ],
  keyPoints: ["checklist.md at repo root, not skill","Class-authored, can be extended","Same pattern as create-concept-card","Required for Assignment 11, not optional"],
  notes: "checklist.md lives at the repo root, separate from the skill file — it's participant- and class-authored, and people may edit or extend it. This is deliberately the same pattern as create-concept-card (Skill #1): the reusable method stays generic, the specific criteria live in their own file. Say explicitly that this is required behaviour for Assignment 11, not an optional extra — there is no separate 'AI Concept Coach' assignment; this is it."
},

{ // Slide 85 (now after 65)
  title: "Assignment 11: Learning game",
  kicker: "DAY 2 · ASSIGNMENT 11",
  subtitle: "The game already works. Build checklist.md and the term-checker skill, then use them.",
  type: "practice",
  visual: { mdfile: 0, mdName: 'checklist.md', phrase: 'Check my latest submission using the term-checker skill.' },
  layout: "exercise",
  cards: [
    { title: "Part A — a good explanation has", body: "central meaning\nessential points\na practical example\nno incorrect claims\nno missing information\nrelevant resources" }
  ],
  steps: [
    "Part A: define a good answer in checklist.md.",
    "Part B: build the term-checker skill.",
    "No API, no external model.",
    "Part C: say the phrase below."
  ],
  expected: "A working game where AI feedback comes entirely from your own authenticated Claude Code session — no API credentials, no external model calls, no database.",
  stepsHeading: "Steps:",
  keyPoints: ["Full 60 minutes, don't rush","A: checklist.md with four ratings","B: term-checker reads checklist.md","C: say the exact phrase","No rebuild, no API keys, no database"],
  notes: "Longest single assignment of the two days; give it the full 60 minutes and don't rush the wrap-up. Part A: propose what a good “explain this term back” answer contains, based on the approved concept cards, including the four rating categories (Strong explanation, Partially complete, Review this concept, Unable to evaluate); write it to checklist.md once approved. Part B: create .claude/skills/term-checker/SKILL.md; it reads checklist.md (never hardcoded criteria) and the latest submission, compares against the matching concept card and writes structured feedback. Part C: say the exact phrase “Check my latest submission using the term-checker skill.” Do NOT let anyone rebuild the game itself; it already works. Protect this: no API keys, no external model calls, no database; feedback comes entirely from the participant's own Claude Code session reading and writing local files. Watch for people who skip Part C because time is short.",
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 5: MCP and workplace systems                              */
/* ---------------------------------------------------------------------- */

{ // Slide 86
  title: "Model Context Protocol",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "One standard plug for approved connections.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'does not remove permissions or human responsibility', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "MCP standardises how AI applications connect to approved information and capabilities." },
    { title: "An MCP server may expose", body: "resources\nreusable prompts\ntools" }
  ],
  tagline: "Connecting a server does not remove permissions or human responsibility.",
  keyPoints: ["Say the tagline explicitly","Link to the working agreement","Connected is not allowed to change"],
  notes: "Say the tagline explicitly and connect it back to the working agreement (slide 43) — being connected to something is not the same as being allowed to change it."
},

{ // Slide 87
  title: "Repository access and MCP",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "Files are local. MCP is for everything outside.",
  type: "concept",
  layout: "compare",
  visual: { zones: ['your laptop', 'outside', ['Jira', 'GitLab', 'Confluence']] },
  columns: [
    { title: "Local repository", items: [
      "Claude Code uses built-in tools to read files and run project commands."
    ] },
    { title: "External system", items: [
      "MCP can provide approved access to Jira, GitLab or Confluence."
    ], foot: "The repository itself does not require MCP." }
  ],
  keyPoints: ["Keep the distinction crisp","So far: built-in file tools only","MCP is new from here"],
  notes: "Keep this distinction crisp: everything the room has done since slide 45 used only built-in file tools. MCP is what's new starting with this part."
},

{ // Slide 88
  title: "Quiz: MCP",
  kicker: "DAY 2 · QUIZ",
  subtitle: "What does an MCP connection give Claude?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "A smarter model." },
    { title: "B", body: "A standard way to reach approved tools and data outside your laptop." },
    { title: "C", body: "Permission to change Jira without asking." },
    { title: "D", body: "A replacement for CLAUDE.md." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B", "C is the one to warn about: read-only, approval"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: MCP is the plug, not the brain. C is the misconception to correct firmly: a connection only does what it is allowed to, and in this course it stays read-only, with human approval for anything that would change a system."
},

{ // Slide 89
  title: "Approved connections",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "Connect the approved Worldline services.",
  type: "context",
  visual: { pending: ['Setup steps follow', 'The approved instructions are added after the technical check.'] },
  cards: [
    { title: "Services", body: "Jira\nGitLab\nConfluence" },
    { title: "Inside Claude Code, use", body: "/mcp" }
  ],
  prompt: "/mcp",
  keyPoints: ["Jira, GitLab, Confluence MCP confirmed","Primary path, not stretch goal","Insert approved setup steps","No credentials on the slide","Keep local-fixture fallback ready"],
  notes: "Worldline's MCP access for Jira, GitLab and Confluence is confirmed — this is the real, primary path for Assignment 12, not a stretch goal. Insert the exact Worldline-approved setup instructions here after technical preflight; do not place credentials on this slide. Still keep the local-fixture fallback ready as a safety net in case one participant's connection fails on the day, but plan and pace the room around the real connections working."
},

{ // Slide 90
  title: "Assignment 12: Connected context",
  kicker: "DAY 2 · ASSIGNMENT 12",
  subtitle: "Retrieve one authorised item in read-only mode.",
  type: "practice",
  visual: { sourceTiles: 0, planB: 'DEMO_FALLBACK_A10', planBLabel: 'fixture fallback: fixtures/jira-EX-142.json (fictional)' },
  layout: "exercise",
  cards: [
    { title: "Choose one", body: "one Jira ticket\none GitLab issue or merge request\none Confluence page" }
  ],
  steps: [
    "Fetch one authorised item, read-only.",
    "Explain what it says, with sources.",
    "Mark what's unclear as OPEN.",
    "Change nothing in the system."
  ],
  expected: "No external changes. A sourced, plain-language explanation of one connected item, with unclear points marked OPEN.",
  stepsHeading: "Steps:",
  keyPoints: ["Highest infra risk: verify MCP beforehand","Ask which actions they didn't approve","Fallback: local fixture files","Retrieve, explain, do not modify","Captured example ready (press B)"],
  notes: "Highest infra-risk moment of the two days; verify the MCP connection end-to-end yourself before class. Also ask participants to list which actions the connection could perform that they did not approve. Fallback: if a participant's connection fails, have them use the local fixture files instead and explain those; the teaching point (retrieve, explain, do not modify) survives without a live round-trip. Keep a captured example ready (press B) if several people need the fallback at once.",
},

{ // Slide 91
  title: "From skill to workflow",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "A skill is one reusable method. A workflow chains several — with tools and human checkpoints.",
  type: "concept",
  layout: "steps",
  items: [
    { label: "Trigger", caption: "One sentence starts it: \"start my day\"." },
    { label: "Fetch", caption: "Skill 1 reads your Jira tickets (read-only, via MCP)." },
    { label: "Sort", caption: "Skill 2 groups them: new, blocked, due soon, waiting for you." },
    { label: "Brief", caption: "Skill 3 drafts the morning brief and your top 3 priorities." },
    { label: "You decide", caption: "Human checkpoint: nothing changes without you." }
  ],
  detail: "Click through each step — every step can be its own skill.",
  tagline: "A skill packages one method. A workflow orders skills, tools and checkpoints.",
  keyPoints: ["Three minutes, no more","Workflow chains skills plus MCP","Fixed order, human checkpoint","Same pattern as Aether Library","Assignment follows immediately"],
  notes: "Three minutes, no more. The room has built two single-method skills (create-concept-card, term-checker). A workflow combines several of them, plus a tool connection (MCP), in a fixed order with a human checkpoint. Each step still keeps its own boundaries and stop conditions, and the agent loop from the working method happens inside each step. In practice the workflow can live in one top-level skill (for example day-start) that lists the steps in order, or in a short instruction file that names the skills. Say plainly: this is the same pattern as the Aether Library, pointed at real work — source, structured output, validation, human approval. The assignment follows immediately."
},

{ // Slide 92
  title: "Assignment 13: Day-start workflow",
  kicker: "DAY 2 · ASSIGNMENT 13",
  subtitle: "Connect Jira, list your tickets, and turn it into a workflow that starts your day.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Say it in your own words", body: "the examples in the steps show the idea\nuse your own wording\nnever change a ticket" }
  ],
  steps: [
    "Connect Jira and list your open tickets.",
    "Plan a day-start from 2–3 skills.",
    "Build it, /clear, then “Start my day.”",
    "Swap with a partner and run theirs."
  ],
  expected: "A repeatable day-start workflow: connected, read-only, several skills in a fixed order with a human checkpoint, tested in a fresh session.",
  stepsHeading: "Steps:",
  keyPoints: ["Skills plus MCP become a workflow","Split: fetch, sort, brief","Read-only on Jira","No screen sharing while it runs","Partner copies skill folders, runs it"],
  notes: "The payoff of the day: skills (Assignments 9 and 11) plus MCP (Assignment 12) become a workflow. Example phrases if people get stuck: “List my open tickets. Read-only.” → “Plan a day-start workflow from 2–3 skills: fetch, sort, brief. Show me the plan first.” → “Build those skills and a day-start that runs them in order. Never change a ticket.” then /clear and “Start my day.” A good split is fetch, sort (new, blocked, due soon, waiting for you) and brief (top 3 priorities, anything unclear marked OPEN). Everything stays read-only on Jira. Real tickets can contain sensitive details; tell people not to share their screen while it runs. If a connection fails, debugging it with Claude Code is part of the lesson: paste the exact error and check /mcp. Partner step: a skill is just files, so the partner copies the skill folders into their own project and runs it on their own tickets.",
},

{ // Slide 93
  title: "The same pattern across systems",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "Two systems, one method.",
  type: "concept",
  layout: "compare",
  visual: { pipes: true, same: [2, 3] },
  columns: [
    { title: "Aether Library", items: [
      "Glossary source → concept card → validation → human approval"
    ] },
    { title: "Workplace system", items: [
      "Jira, GitLab or Confluence source → useful work output → validation → human approval"
    ] }
  ],
  tagline: "The source and output change. The design questions remain the same.",
  keyPoints: ["Two days in one sentence","Let it land","Then move to closing"],
  notes: "This is the whole two days compressed into one sentence — let it land before moving into the closing sequence."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 94
  title: "What you built",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Together, we created:",
  type: "recap",
  layout: "recap",
  visual: { recapKeys: true, bot: 'happy', place: 'aside' },
  items: [
    { label: "Participant profile" },
    { label: "AI glossary contribution" },
    { label: "Enriched concept cards" },
    { label: "Improved CLAUDE.md" },
    { label: "Reusable create-concept-card and term-checker skills" },
    { label: "Bounded multi-card agentic run" },
    { label: "Explain It Back learning game, with real AI feedback" },
    { label: "Approved Jira connection and a day-start workflow" }
  ],
  keyPoints: ["Items appear on their own","No clicking needed","Don't talk over them","Let the room recognise its work"],
  notes: "The items appear on their own, one by one — no clicking needed. Let them come in without talking over them, and let the room recognise their own two days of work in the list."
},

{ // Slide 95
  title: "What you can now do",
  kicker: "DAY 2 · CLOSING",
  subtitle: "How Claude Code works, and why the boundaries matter.",
  type: "recap",
  layout: "recap",
  visual: { levelUp: true },
  items: [
    { label: "Use Claude Code inside a repository." },
    { label: "Provide context and boundaries." },
    { label: "Review plans, changes and evidence." },
    { label: "Distinguish prompts, project instructions, skills and workflows." },
    { label: "Recognise bounded agentic behaviour." },
    { label: "Explain what MCP provides." },
    { label: "Preserve human review and handoff." }
  ],
  keyPoints: ["Understanding checklist, not artefact list","Name the distinction out loud","How Claude Code works, why boundaries matter"],
  notes: "This is the understanding checklist, not the artefact checklist (that was slide 94) — the distinction is worth naming out loud."
},

{ // Slide 96
  title: "The five support days",
  kicker: "PREVIEW · SUPPORT DAYS",
  subtitle: "The support programme builds on this foundation.",
  type: "context",
  tagline: "Preview only — the support days go deeper.",
  visual: { art: 'timeline', supportDays: true },
  cards: [
    { title: "1 · AI-native SDLC foundations", body: "" },
    { title: "2 · Planning, testing, review and handoff", body: "" },
    { title: "3 · Agent workflow in n8n", body: "" },
    { title: "4 · Agent workflow in Claude Code with deeper controls", body: "" },
    { title: "5 · Application to a small team issue", body: "" }
  ],
  keyPoints: ["Preview only","Different facilitator's territory","Avoid detail questions here"],
  notes: "Preview only, matching slide 53's pattern — this is a different facilitator's territory starting next time, don't get pulled into detail questions here."
},

{ // Slide 97
  title: "Complete progression",
  kicker: "DAY 2 · CLOSING",
  subtitle: "From your first Claude Code conversation to applying the method during the support days.",
  type: "recap",
  layout: "steps",
  visual: { stepKeys: true, doneSteps: 6 },
  items: [
    { label: "Understand", caption: "Understand AI and Claude Code." },
    { label: "One change", caption: "Make one safe, tested change." },
    { label: "A skill", caption: "Turn a repeated method into a skill." },
    { label: "Bounded work", caption: "Let Claude perform a bounded sequence of work." },
    { label: "Interactive feature", caption: "Build an interactive AI-supported feature." },
    { label: "Connect", caption: "Connect workplace information and chain skills into a workflow." },
    { label: "Apply it", caption: "Apply the method during the support days." }
  ],
  keyPoints: ["First six steps = the two days","Say that explicitly","Last step: the support days"],
  notes: "The first six steps are exactly what the room just did across the two teaching days — say that explicitly before pointing at the last one, which belongs to the support days."
},

{ // Slide 98
  title: "Human responsibility",
  kicker: "DAY 2 · CLOSING",
  subtitle: "AI can inspect, propose, create, transform and check.",
  type: "context",
  layout: "compare",
  visual: { handover: 'People remain responsible.' },
  columns: [
    { title: "AI can", items: [
      "inspect",
      "propose",
      "create",
      "transform",
      "check"
    ] },
    { title: "People remain responsible for", items: [
      "the goal",
      "permitted context",
      "approval boundaries",
      "factual and technical review",
      "the impact of the final decision"
    ] }
  ],
  keyPoints: ["The sentence to leave with","Slow down here","Don't rush near the end"],
  notes: "This is the single sentence to leave the room with above all others — slow down here, don't rush it because it's near the end of a long two days."
},

{ // Slide 99
  title: "Final reflection",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "I can now…", body: "" },
    { title: "I still need help with…", body: "" },
    { title: "One workflow I want to investigate is…", body: "" },
    { title: "The source of truth would be…", body: "" },
    { title: "The human decision must remain…", body: "" }
  ],
  keyPoints: ["End here","A minute of silence if possible","Let people write five sentences","Logistics only afterwards"],
  notes: "End here, in silence for a minute if the room will tolerate it, before any closing announcements — let people actually write their five sentences rather than rushing to logistics."
}

];
