/* ==========================================================================
   Aetherlink x Worldline — Day 3 classroom deck: n8n
   11 slides. One slide = one object in order. See README.md "How to edit
   a slide" before changing anything here.

   Field reference:
     title     - required. Shown as the big heading.
     kicker    - small text above the title (e.g. "DAY 1 · PART 1").
     subtitle  - one sentence under the title.
     type      - one of: context, concept, practice, review, quiz, recap, pause.
                 Controls the colour chip and the footer progress dot.
                 quiz: its own colour and look (use with visual.quiz).
     dark      - true to render this slide on the dark background variant.
     hidden    - true to skip this slide by default on every laptop (H or Chapters shows it again).
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

/* ==========================================================================
   DAY 3 — n8n
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 3 — Welcome                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 3!",
  kicker: "AETHERLINK × WORLDLINE · DAY 3",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a warm welcome back: keep it to a few sentences."
},

{ // Slide 2
  title: "What do you remember from last week?",
  kicker: "DAY 3 · RECAP",
  subtitle: "Without looking back, explain:",
  type: "recap",
  tagline: "Answer from memory first, no peeking.",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What are the steps of our working method?", body: "" },
    { title: "What goes in CLAUDE.md, and what in settings.json?", body: "" },
    { title: "What is a skill, and why make one?", body: "" },
    { title: "What does MCP connect Claude to?", body: "" },
    { title: "Where does the human stay in charge?", body: "" }
  ],
  keyPoints: ["Cold retrieval, no looking back","Open one question per click","Let the room answer first","Last question leads into today"],
  notes: "Cold retrieval: make people answer without looking at last week's slides. Open one question per click and let the room answer before you add anything. The last question is the bridge to today: n8n is about workflows, and a good workflow has clear places where a person decides."
},

{ // Slide 3
  title: "Today and tomorrow",
  kicker: "DAY 3 · OVERVIEW",
  subtitle: "From connected AI in one tool to workflows that connect many tools.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Welcome', 'Recap', 'Team', 'n8n', 'Tour', 'Explore', 'What you learned'] },
  cards: [
    { title: "Today", body: "What n8n is, why we use it, a tour, and your first workflow." },
    { title: "Tomorrow", body: "We build on today's first workflow." }
  ],
  keyPoints: ["High-level only","Point at today's route","Name tomorrow in one sentence"],
  notes: "High-level overview only: point at the route for today and say in one sentence what tomorrow builds on it. Details come on the following slides."
},

{ // Slide 4
  title: "The team of Aetherlink",
  kicker: "DAY 3 · TEAM",
  subtitle: "We are what we do.",
  type: "context",
  visual: { opener: 'team', stagger: 'pop' },
  cards: [
    { title: "Jessy The", body: "" },
    { title: "Constance van der Vlist", body: "" },
    { title: "Maarten Nauw", body: "" },
    { title: "Ryan Lisse", body: "" }
  ],
  keyPoints: ["Who is here today","One sentence each","Keep it short"],
  notes: "Name who from the Aetherlink team is here today and what they do, one sentence each. Remove anyone who isn't in the room."
},

{ // Slide 5
  title: "Introducing myself",
  kicker: "DAY 3 · TEAM",
  subtitle: "Who is teaching you n8n today.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Who I am", body: "" },
    { title: "What I do", body: "" },
    { title: "How I use n8n", body: "" }
  ],
  keyPoints: ["Who you are","What you do","Your own n8n story","Keep it under two minutes"],
  notes: "Introduce yourself: who you are, what you do, and one concrete thing you have built or automated with n8n. A real example of your own makes the next slides land better."
},

{ // Slide 6
  title: "How many of you have ever worked with n8n?",
  kicker: "DAY 3 · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'multiarm', place: 'beside' },
  keyPoints: ["Ask literally, let hands go up","Say roughly how many you see","Follow-up: Zapier, Make, Power Automate?","Adjust tour pace to room"],
  notes: "Ask it literally and let the hands go up; say roughly how many you see. Follow-up question: who has used another automation tool, like Zapier, Make or Power Automate? Those people will recognise the idea quickly. Use the answer to set the pace of the tour."
},

/* ---------------------------------------------------------------------- */
/* DAY 3 — n8n                                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 7
  title: "What is n8n?",
  kicker: "DAY 3 · N8N",
  subtitle: "A tool to build workflows: steps that run on their own, across the tools you already use.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'run on their own', tone: 'orange' }] },
  cards: [
    { title: "A workflow", body: "A chain of steps you draw on a canvas, from left to right." },
    { title: "A trigger", body: "What starts it: a click, a schedule, a form, an email, a webhook." },
    { title: "Nodes", body: "Each step is a node: read data, call an app, use AI, make a decision." },
    { title: "Connections", body: "Hundreds of ready-made integrations, plus HTTP and code when you need more." }
  ],
  tagline: "Something happens → n8n runs the steps → the result lands where you need it.",
  keyPoints: ["Workflow = chain of steps","Trigger starts it","Each step is a node","Many integrations built in","Say it: 'n-eight-n'"],
  notes: "n8n (say 'n-eight-n', short for 'nodemation') is a workflow automation tool. You build a workflow on a canvas: a trigger starts it, and each node after it does one step, like reading a spreadsheet, calling an app, asking an AI model or choosing a path with an IF. Data flows from node to node. It has hundreds of ready-made integrations, and when one is missing you use the HTTP Request node or a Code node. Keep the tagline as the one-line definition."
},

{ // Slide 8
  title: "Why n8n?",
  kicker: "DAY 3 · N8N",
  subtitle: "Why use it at all, and why we use it in this programme.",
  type: "concept",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "Why use it", items: [
      "You see the whole workflow on one canvas",
      "Little or no code, with code when you need it",
      "Can run on your own server, so data can stay in-house",
      "AI is one step in the flow, next to normal tools"
    ] },
    { title: "Why we use it here", items: [
      "It turns last week's method into a workflow that runs",
      "Skills, tools and checks become nodes you can see",
      "You decide where a person approves",
      "Your team can read it, reuse it and change it"
    ] }
  ],
  tagline: "AI does the steps. People decide where the workflow stops for a human.",
  keyPoints: ["Visual: the whole flow on one canvas","Low-code, code when needed","Self-hosting keeps data in-house","Links to last week: a workflow with a human checkpoint"],
  notes: "Left column: general reasons. It's visual, so anyone on the team can follow a workflow; it's low-code but lets you drop into JavaScript or Python when needed; it can be self-hosted, which matters for a company like Worldline where data should stay inside; and AI is just one node among normal integrations. Right column: why here. Last week ended with a workflow that chains skills, tools and a human checkpoint. n8n is where that becomes something that runs on its own and that the team can see, reuse and change."
},

{ // Slide 9
  title: "A tour of n8n",
  kicker: "DAY 3 · TOUR",
  subtitle: "The parts you will use today.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "Workflows", caption: "Your overview: every workflow you have, active or not." },
    { label: "Canvas", caption: "Where you build: add nodes with +, connect them, drag them around." },
    { label: "Trigger node", caption: "Every workflow starts with one. Today: start it by hand." },
    { label: "Node panel", caption: "Open a node: input on the left, settings in the middle, output on the right." },
    { label: "Executions", caption: "Every run, with the data each node saw. This is where you look when something fails." },
    { label: "Credentials and templates", caption: "Log-ins for apps, kept separately; templates are ready-made workflows to start from." }
  ],
  keyPoints: ["Show it live in n8n","Click through one part at a time","Node panel: input, settings, output","Executions = where you debug","Credentials are kept apart from workflows"],
  notes: "Do the tour live in n8n and use this slide as the order. Workflows overview; the canvas; add a Manual trigger; open a node and point at the three parts of the panel (input, settings, output), because reading input and output is the most important skill today; run it and show the Executions list with the data per node; finish on credentials (stored once, separate from the workflow, never pasted into a node) and templates as a place to start."
},

{ // Slide 10
  title: "What can you create in n8n?",
  kicker: "DAY 3 · EXPLORE",
  subtitle: "Explore n8n and build your first small workflow.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Ideas", body: "a form that sends you a summary\na schedule that fetches data and saves it\nan AI step that sorts incoming text\na flow that stops for your approval" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Open n8n and create a new workflow.",
    "Add a Manual trigger, then two or three nodes after it.",
    "Run it. Open each node: what came in, what went out?",
    "Open Executions and find your run.",
    "Look at one template: what does it do, step by step?"
  ],
  expected: "A small workflow that runs, and you can explain what each node does with its data.",
  keyPoints: ["Type the minutes on the timer","Small: trigger + 2–3 nodes","Read input and output per node","Find the run in Executions","Pairs can help each other"],
  notes: "Type the minutes on the timer and press start. Keep it small: a Manual trigger and two or three nodes is enough. Walk around and ask people to explain what data goes in and out of one node; that's the skill that matters. Early finishers: look at a template from the list and explain it step by step, or add an IF node with two paths."
},

/* ---------------------------------------------------------------------- */
/* DAY 3 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 11
  title: "What did you learn?",
  kicker: "DAY 3 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "n8n is…", body: "" },
    { title: "A workflow I could build for my team is…", body: "" },
    { title: "The step where a person must decide is…", body: "" },
    { title: "I still have a question about…", body: "" }
  ],
  keyPoints: ["Three quiet minutes","Let people write first","Collect a few answers aloud","Questions feed tomorrow"],
  notes: "Give three quiet minutes to complete the statements, then collect a few out loud. Write the workflow ideas and open questions on the flipchart: they are the starting point for tomorrow."
}

];
