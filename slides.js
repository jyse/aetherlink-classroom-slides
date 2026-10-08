/* ==========================================================================
   Aetherlink x Worldline — Support Day 4 deck: the team project
   16 slides. One slide = one object in order. See README.md "How to edit
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
   SUPPORT DAY 4 — The team project: from idea to a plan you can build
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 4 — Welcome and recap                                                */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 4!",
  kicker: "AETHERLINK × WORLDLINE · DAY 4",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Today is their day, not ours"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a short welcome. Set the tone straight away: today the teams do the work and we facilitate."
},

{ // Slide 2
  title: "Where we are",
  kicker: "DAY 4 · ROUTE",
  subtitle: "Everything so far was practice. Today the team project starts for real.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Teaching day 1', 'Teaching day 2', 'n8n', 'n8n + Claude', 'SDLC', 'Today: team project', 'Day 5: AI app'] },
  cards: [
    { title: "Today", body: "Your team turns an idea into a plan you can build, and starts building." },
    { title: "Day 5", body: "Your team shows a working AI app." }
  ],
  keyPoints: ["Walk the route left to right","Each day added one piece","Today: idea becomes a plan","Day 5: a working app"],
  notes: "Walk the route once: the two teaching days gave them the working method and Claude Code, the n8n days gave them workflows and connecting n8n with Claude, yesterday placed it all in the software development life cycle. Today all of that comes together in one team project. Day 5 is the finish line: a working AI app the team can show."
},

{ // Slide 3
  title: "What do you remember?",
  kicker: "DAY 4 · RECAP",
  subtitle: "Without looking back, explain:",
  type: "recap",
  tagline: "Answer from memory first, no peeking.",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What are the six steps of our working method?", body: "" },
    { title: "What does CLAUDE.md do, and what does settings.json do?", body: "" },
    { title: "When would you use n8n, and when Claude Code?", body: "" },
    { title: "What are the phases of the software development life cycle?", body: "" },
    { title: "Where does a person have to decide?", body: "" }
  ],
  keyPoints: ["Cold retrieval","One question per click","Room answers first","Gaps = what to support today"],
  notes: "Cold retrieval: no slides, no notes. Open one question per click and let the room answer. Note the gaps out loud: whatever the room can't answer is what you will support most today."
},

{ // Slide 4
  title: "The software development life cycle",
  kicker: "DAY 4 · RECAP · SDLC",
  subtitle: "Yesterday in one slide. Today you walk the first part of it as a team.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "Plan", caption: "Which problem, for whom, and why now?" },
    { label: "Design", caption: "What does it do, which data, which tools, which risks?" },
    { label: "Build", caption: "Small slices, with Claude Code and n8n." },
    { label: "Test", caption: "Does it do what we said, also with wrong input?" },
    { label: "Deploy", caption: "Day 5: show it working." },
    { label: "Maintain", caption: "Who owns it after this week?" }
  ],
  tagline: "Today: Plan, Design and the first Build. Day 5: Test and show.",
  keyPoints: ["Short recap, not a new lesson","Today = Plan, Design, first Build","Day 5 = Test and show","Maintain: who owns it later?"],
  notes: "Keep it short: this was yesterday's topic. Click through the phases and say where the team will be today: Plan and Design in the morning, the first Build slice in the afternoon. Day 5 is Test and showing it. Don't skip Maintain: asking who owns the app after this week is a good reality check."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Today is yours                                                   */
/* ---------------------------------------------------------------------- */

{ // Slide 5
  title: "Today is yours",
  kicker: "DAY 4 · HOW TODAY WORKS",
  subtitle: "We facilitate. You decide and build.",
  type: "context",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "The team", items: [
      "chooses the problem and the scope",
      "decides who does what",
      "builds and tests",
      "owns the decisions"
    ] },
    { title: "We, the facilitators", items: [
      "ask questions",
      "keep time and the rhythm",
      "unblock when you are stuck",
      "do not build it for you"
    ] }
  ],
  tagline: "If you ask us what to do, we will ask you a question back.",
  keyPoints: ["Teams decide, we facilitate","We ask, we don't answer for them","We keep time","We unblock, we don't build"],
  notes: "Make the roles explicit. Facilitating means helping the team think and decide, not taking decisions for them. When a team asks 'what should we do?', answer with a question: 'what problem are you solving?', 'how would you know it works?'. Step in when a team is truly stuck or out of time, not to steer them towards your own idea."
},

{ // Slide 6
  title: "What you can build with",
  kicker: "DAY 4 · YOUR TOOLBOX",
  subtitle: "Everything from the last days is now a tool for your team.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'head', place: 'beside', tool: 'toolbox' },
  cards: [
    { title: "The working method", body: "Explore, plan, create, test, human review, handoff." },
    { title: "Claude Code", body: "Builds and changes the app. CLAUDE.md guides it, settings.json sets the limits." },
    { title: "Skills", body: "A method you repeat, written down once." },
    { title: "MCP", body: "Approved connections to tools and data outside your laptop." },
    { title: "n8n", body: "Workflows that run on their own, with AI as one of the steps." },
    { title: "The SDLC", body: "Plan, design, build, test, deploy, maintain." }
  ],
  tagline: "You don't need everything. Pick what your app needs.",
  keyPoints: ["Everything learned = a tool now","Claude Code builds the app","n8n runs the workflow","Pick what fits, not all of it"],
  notes: "A quick reminder of what they have, one sentence per card. The key message is the tagline: a good team project uses the tools that fit the problem. A simple app built with Claude Code is fine; so is an n8n workflow with a Claude step. Using everything is not the goal."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — The questions every team has to answer                          */
/* ---------------------------------------------------------------------- */

{ // Slide 7
  title: "Before you build: the problem",
  kicker: "DAY 4 · QUESTIONS TO ANSWER",
  subtitle: "Most team projects fail here, not in the code.",
  type: "concept",
  visual: { reveal: 'click', bot: 'think', place: 'slot', noReact: true },
  cards: [
    { title: "Who is it for?", body: "One real user or team. Not \"everyone\"." },
    { title: "What problem does it solve?", body: "In one sentence they would recognise." },
    { title: "Why AI?", body: "What does AI do here that a normal form or script can't?" },
    { title: "How do we know it works?", body: "What would the user see on Day 5?" }
  ],
  tagline: "If you can't answer these four, you're not ready to build yet.",
  keyPoints: ["Who, what, why AI, how we know","One real user","'Why AI?' is a fair question","Done = what the user sees on Day 5"],
  notes: "These are the questions teams skip because building is more fun. Open them one by one. 'Why AI?' is worth pushing on: sometimes the honest answer is that a plain form or an n8n workflow without AI is better, and that's a good outcome too. 'How do we know it works?' becomes the definition of done for Day 5."
},

{ // Slide 8
  title: "Before you build: the team and the plan",
  kicker: "DAY 4 · QUESTIONS TO ANSWER",
  subtitle: "The questions you need answers on as a team.",
  type: "concept",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Answer as a team", body: "Who does what: product owner, builders, tester, presenter?\nWhat is in for Day 5, and what is not?\nWhich data do we use, and are we allowed to?\nClaude Code, n8n, or both?\nWhere does a person approve or decide?\nHow do we work together: one repo, who merges?\nWhat is our first small slice that works?" }
  ],
  tagline: "Write the answers down. They become your CLAUDE.md and your plan.",
  keyPoints: ["Roles: who owns what","Scope: in and out for Day 5","Data: allowed or not","Tools: Claude Code, n8n, both","Human checkpoint","Way of working: repo and merging","First small slice"],
  notes: "The practical questions for building together. Two often cause trouble: scope (teams plan far more than fits in two days; push for a small first slice that works end to end) and working together in one codebase (agree who merges and how, or they will overwrite each other). The answers aren't paperwork: they go straight into CLAUDE.md and the team plan, exactly like the AetherBOT exercise on Day 2."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Security                                                         */
/* ---------------------------------------------------------------------- */

{ // Slide 9
  title: "Security is a requirement",
  kicker: "DAY 4 · SECURITY",
  subtitle: "Not a check at the end, but a question from the start.",
  type: "concept",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "Security at the end", items: [
      "found when it's almost done",
      "means rebuilding",
      "feels like an obstacle",
      "becomes a no"
    ] },
    { title: "Security from the start", items: [
      "shapes the design",
      "costs a question, not a rebuild",
      "becomes part of the plan",
      "becomes a yes, if…"
    ] }
  ],
  tagline: "A security question now is cheaper than a security problem on Day 5.",
  keyPoints: ["Security is part of the design","Early question = cheap","Late finding = rebuild","Aim for 'yes, if…'"],
  notes: "Frame security as part of good software, not as someone else's veto. There is a security specialist in the room today: introduce them here as a resource for every team. Their questions will feel like friction at times; that's legitimate, because a question answered during design costs minutes and the same problem found on Day 5 costs the demo. The goal is a 'yes, if…' for every team: what has to be true for this to be safe enough?"
},

{ // Slide 10
  title: "Questions security will ask",
  kicker: "DAY 4 · SECURITY",
  subtitle: "Have an answer ready, or write it down as OPEN.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Data", body: "Which data goes in? Personal or confidential data? Where does it go, and is that allowed?" },
    { title: "Access and secrets", body: "Who can use it? Where are API keys and credentials kept? Never in the code or the repo." },
    { title: "The AI model", body: "What is sent to the model? Can input trick it (prompt injection)? What if the answer is wrong?" },
    { title: "Actions", body: "What can the app or workflow change on its own? Where does a person approve?" },
    { title: "Traces", body: "Can you see what happened afterwards? Logs, n8n executions, git history." }
  ],
  tagline: "Not sure? Write it down as OPEN and ask. That's a good answer too.",
  keyPoints: ["Data: what, where, allowed?","Secrets never in the repo","Model: input, output, injection","Actions: human approval","Traces: can we check afterwards?"],
  notes: "These five groups cover most of what a security specialist will ask about an AI app. Data and secrets are the classics. AI adds its own: whatever goes to the model leaves your laptop; text from users or documents can contain instructions (prompt injection); and the model can be wrong with confidence. Actions ties back to bounded work and settings.json: limit what can happen without a person. Traces: n8n executions and git history already give a lot. 'OPEN' is the same habit as on the teaching days: an honest open question is better than a guess."
},

{ // Slide 11
  title: "Assignment: The team canvas",
  kicker: "DAY 4 · TEAM ASSIGNMENT 1",
  subtitle: "Answer the questions as a team and put them on one page.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your canvas", body: "problem and user\nwhy AI\ndone on Day 5\nroles\nin and out of scope\ndata and tools\nhuman checkpoint\nsecurity: answers and OPEN questions" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Agree on the problem and the user in one sentence.",
    "Fill in the rest of the canvas together. Write OPEN where you don't know yet.",
    "Ask the security specialist to look at your data, secrets and actions.",
    "Cut the scope until the first slice fits in today.",
    "Save the canvas in your repo as notes/team-canvas.md."
  ],
  expected: "One page your whole team agrees on, with a first slice that fits in today and the security questions answered or marked OPEN.",
  prompt: "Interview our team about the app we want to build. Ask about the user, the problem, why AI, what done looks like on Day 5, roles, scope, data, tools, the human checkpoint and security. Ask one question at a time. Then write notes/team-canvas.md and mark anything we didn't decide as OPEN.",
  keyPoints: ["Type the minutes on the timer","Problem first, then the rest","OPEN is allowed","Security check per team","Cut scope to one slice"],
  notes: "Type the minutes on the timer. Walk from team to team and ask the questions from the previous slides instead of giving answers. Plan the security specialist's time: every team gets a short visit, so no team ends up with all the questions at the end. The Example prompt lets Claude interview the team, which helps a team that is stuck; the decisions stay theirs. Watch for teams that skip the scope cut: the first slice must fit in today."
},

{ // Slide 12
  title: "Short break",
  kicker: "DAY 4 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: building your first slice." }
  ],
  keyPoints: ["Say the return time","Press ▶ Start on the timer","Check in with any stuck team"],
  notes: "Say the actual clock time you'll resume. Use the break to check in briefly with a team that looked stuck or was still arguing about scope."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Build                                                            */
/* ---------------------------------------------------------------------- */

{ // Slide 13
  title: "Assignment: Set up and build the first slice",
  kicker: "DAY 4 · TEAM ASSIGNMENT 2",
  subtitle: "From canvas to something that works, end to end, however small.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Set up first", body: "one shared repo\nCLAUDE.md from your canvas\nsettings.json: what Claude may never do\nsecrets outside the repo" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Set up the shared repo and agree who merges.",
    "Write CLAUDE.md from your canvas. Add your settings.json rules.",
    "Build the first slice with the working method: explore, plan, create, test.",
    "Test it by hand, also with wrong input.",
    "Human review: someone who didn't build it checks it."
  ],
  expected: "A first slice that works end to end in a shared repo, with CLAUDE.md, settings.json and no secrets in the code.",
  keyPoints: ["Type the minutes on the timer","Set-up before building","CLAUDE.md from the canvas","Small slice, end to end","Review by someone else"],
  notes: "Type the minutes on the timer. Set-up first: a shared repo, CLAUDE.md written from the canvas, and settings.json rules, just like on the teaching days. Check that no API key ends up in the code or in git. The slice should work end to end, however small: one input, one AI step, one visible result. Human review by someone who didn't build that part, ideally including the security specialist for anything that touches data or secrets."
},

{ // Slide 14
  title: "Check-in",
  kicker: "DAY 4 · CHECK-IN",
  subtitle: "Every team, two minutes. Short answers.",
  type: "review",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What works now?", body: "" },
    { title: "What's next?", body: "" },
    { title: "What's blocking you?", body: "" },
    { title: "Which security question is still OPEN?", body: "" }
  ],
  tagline: "Blocked? Say it now, not at the end of the day.",
  keyPoints: ["Two minutes per team","Works, next, blocked, OPEN","Solve blockers after, not during","Repeat during the day"],
  notes: "Use this as a rhythm: run it once before lunch and once mid-afternoon. Two minutes per team, short answers. Don't solve problems during the round: note the blockers and go to those teams afterwards. The OPEN security question keeps security visible and gives the security specialist a clear list to work through."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 15
  title: "Ready for Day 5?",
  kicker: "DAY 4 · CLOSING",
  subtitle: "Tomorrow your team shows a working AI app.",
  type: "recap",
  visual: { checklist: 0, bot: 'happy', place: 'left' },
  cards: [
    { title: "By the end of today", body: "the canvas is in the repo\nthe first slice works\nCLAUDE.md and settings.json are in place\nsecurity questions are answered or OPEN\nyou know what to build tomorrow morning" }
  ],
  tagline: "Tomorrow: finish, test, and show what you built.",
  keyPoints: ["Five checks per team","Missing one? Plan it first thing tomorrow","Day 5 = finish, test, show"],
  notes: "Go through the list with each team. Anything that isn't ticked becomes the first task for tomorrow morning. Tell them what Day 5 looks like: finish, test, and show a working app."
},

{ // Slide 16
  title: "What did you learn?",
  kicker: "DAY 4 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "Our app helps…", body: "" },
    { title: "Working as a team, I learned…", body: "" },
    { title: "The security question that changed our plan was…", body: "" },
    { title: "Tomorrow we first…", body: "" }
  ],
  keyPoints: ["Three quiet minutes","Then a few answers aloud","Security answers are worth sharing"],
  notes: "Give three quiet minutes, then collect a few answers. Ask at least one team which security question changed their plan: it shows the room that the security questions made the work better, not slower."
}

];
