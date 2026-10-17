/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   109 slides, authored from CURRICULUM.md (2026-09-15 revision) plus its
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

/* ---------------------------------------------------------------------- */
/* TEACHING DAY 1 — AI foundations and working with Claude Code            */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to the course!",
  kicker: "AETHERLINK × WORLDLINE · WELCOME",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences","Who we are comes after the agreements"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a warm welcome — keep it to a few sentences. Who AetherLink is and who the trainers are comes right after the agreements."
},

{ // Slide 2
  title: "How many of you are using AI in your daily workflow?",
  kicker: "WELCOME · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'multiarm', place: 'beside', stepThrough: true },
  cards: [
    { title: "ChatGPT at home?", body: "" },
    { title: "Claude or another AI at work?", body: "" },
    { title: "Already built something with it?", body: "" }
  ],
  keyPoints: ["Ask literally, let hands go up","Then click: three follow-ups pop up","Who has already built something?","Quick read, not a discussion","Adjust the pace of Part 1"],
  notes: "Ask it literally and let the hands go up — say roughly how many you see. Then click through the three follow-ups one by one and ask each out loud: ChatGPT at home, Claude or another AI at work, and who has already built something with it. Using AI every day is not the same as building with it — the last question tells you who is really working with it. This is a quick read of the room, not a discussion: note whether you mostly have beginners or builders and adjust your pace in Part 1."
},

{ // Slide 3
  title: "How many of you already work with Claude Code?",
  kicker: "WELCOME · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'think', place: 'beside' },
  keyPoints: ["Hands up again","Who has used it, who uses it often?","Tells you how much tour the room needs"],
  notes: "Hands up again. Follow up: 'and who uses it regularly?' This tells you how much time the room needs in the tour through Claude Code before lunch. If several people already use it, ask one of them later to share a tip during the tour."
},

{ // Slide 4
  title: "A few agreements",
  kicker: "WELCOME · AGREEMENTS",
  subtitle: "So we get the most out of these two days.",
  type: "context",
  visual: { opener: 'agree', stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Be on time", body: "" },
    { title: "Be open-minded", body: "" },
    { title: "Be curious", body: "" },
    { title: "Listen first, then ask", body: "" },
    { title: "Online? Camera on, mic on mute", body: "" }
  ],
  keyPoints: ["Name the agreements, one sentence each","Stress: listen first, then ask","Online: camera on, mute when not talking","Invite people to hold questions"],
  notes: "Name the agreements, one sentence each. 'Listen first, then ask' matters most today: many questions are answered a few slides later, so invite people to hold them until the explanation is done. For anyone joining online: camera on so we can see each other, microphone on mute when you're not talking."
},

{ // Slide 5
  title: "Working safely with AI",
  kicker: "WELCOME · AGREEMENTS",
  subtitle: "Required for everyone, before we build anything.",
  type: "context",
  visual: { stepThrough: true,
    highlight: [{ in: 'card:1', text: 'Never commit or push', tone: 'orange' }],
    pending: ["Worldline's own AI rules", "To be added: what Worldline allows and restricts internally (tools, data, repositories)."] },
  cards: [
    { title: "Be careful with data", body: "Everything you put into an AI tool leaves your hands. Only share what you are allowed to share." },
    { title: "Never commit or push", body: "Course material or Worldline data never goes into a public repository. Check before every commit and push." },
    { title: "EU AI Act", body: "Organisations that use AI must make sure their people know how to use it responsibly. This course is part of that." }
  ],
  tagline: "When in doubt: don't share it, ask first.",
  keyPoints: ["Required block, never skip","Data you put in AI leaves your hands","Never push course material or Worldline data","EU AI Act: AI literacy is an obligation","Worldline's own rules: see the box"],
  notes: "This block is required, also when time is short. Three things. One: be careful with what you put into an AI tool — once it's in, it has left your hands. Two: never commit or push course material or Worldline data to a public repository; a single push can make it public without you noticing. Check before every commit and push. Three: the EU AI Act requires organisations that use AI to make sure their people have enough AI literacy (Article 4) — this course is part of how Worldline meets that. Then go through Worldline's own internal rules (the box at the bottom) — confirm these with Worldline before the class day."
},

{ // Slide 6
  title: "AetherLink × Worldline",
  kicker: "WELCOME · WHO WE ARE",
  subtitle: "Who AetherLink is, and what we are doing together.",
  type: "context",
  visual: { bot: 'wave', place: 'left', stepThrough: true, logoFly: true,
    highlight: [{ in: 'card:0', text: 'building brains', tone: 'orange' }, { in: 'card:1', text: 'Seven days of AI time', tone: 'purple' }] },
  dark: true,
  cards: [
    { title: "AetherLink", body: "A passion for the newest technology.\nCurious about the future.\nGood at building brains." },
    { title: "Worldline", body: "Seven days of AI time: room to explore, research and learn to work with AI." }
  ],
  keyPoints: ["AetherBOT waves, our logo flies in","Passion for the newest technology","Curious about the future, good at building brains","Worldline: seven days of AI time","Keep it short and personal"],
  notes: "AetherBOT waves first, then our logo flies in. Constance tells who AetherLink is: a passion for the newest technology, curious about the future, and good at building brains. Then Worldline: you get seven days of AI time, room to explore, research and learn to work with AI. Keep it short and personal: the shape of the programme comes back a few slides later."
},

{ // Slide 7
  title: "We are team AetherLink",
  kicker: "WELCOME · TEAM",
  subtitle: "One team, here for your team.",
  type: "context",
  visual: { opener: 'team', stagger: 'pop' },
  cards: [
    { title: "Jessy The", body: "" },
    { title: "Constance van der Vlist", body: "" },
    { title: "Maarten Nauw", body: "" },
    { title: "Ryan Lisse", body: "" }
  ],
  keyPoints: ["We are one team: AetherLink","Each trainer: one or two sentences","Who you are, what you do in this programme","Something personal"],
  notes: "We present ourselves as one team: team AetherLink, not as separate freelancers. Each trainer introduces themselves in one or two sentences: who you are, what you do in this programme, and something personal. Keep it short: the room gets to know you over the next two days."
},

{ // Slide 8
  title: "Introduce yourself",
  kicker: "WELCOME · INTRODUCTIONS",
  subtitle: "One round, about 30 seconds each.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Who are you?", body: "Your name and your team." },
    { title: "What do you do?", body: "Your role, day to day." },
    { title: "What have you built with AI?", body: "Nothing yet is a fine answer too." }
  ],
  keyPoints: ["One round: who, what, built with AI","About 30 seconds each","Start with yourself as example","Flipchart: roles, teams, who builds","Reuse later for features and teams"],
  notes: "Go round the room once: who you are, what you do, and what you have already built with AI, about 30 seconds each. Start with yourself to show the length you mean. Write the roles and teams on the flipchart and note who is a developer and who already builds with AI; you will use this later, when the teams pick what to build."
},

{ // Slide 9
  title: "What do you hope to learn?",
  kicker: "WELCOME · EXPECTATIONS",
  subtitle: "Before we start: your curiosity and your questions.",
  type: "context",
  visual: { stepThrough: true, bot: 'think', place: 'beside', tool: 'thought' },
  cards: [
    { title: "What do you hope to learn?", body: "What would make these days worth it for you and your team?" },
    { title: "Questions you already have", body: "What do you want answered by the end of these two days?" }
  ],
  tagline: "We come back to these at the end of Day 2.",
  keyPoints: ["Give a minute to think","Flipchart: hopes and questions","Say when it comes up, or park it","Keep the sheet on the wall","Revisit in Day 2 final reflection"],
  notes: "Give people a minute to think, then collect answers on the flipchart: one column for what they hope to learn, one for questions. You're looking for curiosity: who is excited about Claude Code, who doesn't see the point yet. Don't answer now; say when in the programme it comes up (for example 'that is end of Day 2'), or park it. Keep the sheet on the wall and come back to it in the final reflection at the end of Day 2."
},

{ // Slide 10
  title: "Your team",
  kicker: "WELCOME · TEAMS",
  subtitle: "Who builds with whom?",
  type: "context",
  visual: { opener: 'teams', stagger: 'pop' },
  cards: [
    { title: "Team 1", body: "" },
    { title: "Team 2", body: "" }
  ],
  tagline: "Give your team a name.",
  keyPoints: ["Write the names on the robots","Trainers: Ryan and Maarten too","Each team picks a team name","Teams stay together for the programme"],
  notes: "Split the room into the teams and write the names on each team's robot (on the whiteboard or live in the deck). Ryan and Maarten join a team too, so everyone knows who they work with. Small assignment: each team picks a team name in two minutes. The teams stay together for the rest of the programme."
},

{ // Slide 11
  title: "The seven-day programme",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Two days to practise and play. Five days to deepen and apply.",
  type: "context",
  visual: { art: 'timeline', bot: 'head', place: 'timeline', tool: 'arm', target: '.tl-arrow',
    highlight: [{ in: 'subtitle', text: 'practise and play', tone: 'purple' }, { in: 'subtitle', text: 'deepen and apply', tone: 'orange' }, { in: 'card:0', text: 'Just have fun, together.', tone: 'mark' }] },
  cards: [
    { title: "Teaching Days 1–2", body: "Practise and play. Just have fun, together." },
    { title: "Support Days 1–5", body: "Deepen and apply: build your own team pipeline or workflow." }
  ],
  keyPoints: ["Important slide: take your time","Days 1–2: practise and play, just have fun together","Days 3–7: deepen and apply","Goal: your own team pipeline or workflow"],
  notes: "This one matters: set the tone. The first two days are for practising and playing: just have fun, together. Nothing has to be perfect yet. The other five days are for deepening and applying: each team builds its own pipeline or workflow. Don't explain all seven days in detail now; one sentence per phase is enough."
},

{ // Slide 12
  title: "Programme outcome",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By the end of the programme, your team has built something with AI that works in your team.",
  type: "context",
  visual: { popOut: 0, bot: 'happyHatch', place: 'popout', stepThrough: true,
    highlight: [{ in: 'subtitle', text: 'your team', tone: 'purple' }, { in: 'tagline', text: 'elevates your team', tone: 'orange' }] },
  cards: [
    { title: "For example", body: "An agent\nSkills\nA pipeline\nAn automation" }
  ],
  tagline: "Anything that elevates your team. You build it together, as a team.",
  keyPoints: ["Give inspiration, not a definition","Agent, skills, pipeline, automation","Anything that elevates your team","It's a team assignment"],
  notes: "Give inspiration, not a definition. Press → and the ideas come out of AetherBOT's head one by one. What a team ends up with can be an agent, a set of skills, a pipeline or an automation: anything that elevates your team and saves time, money or effort. Make it explicit that this is a team assignment: you build it together with your team, not as a personal trick."
},

{ // Slide 13
  title: "Where could your team be helped first?",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Which recurring task costs your team time or creates unnecessary uncertainty?",
  type: "context",
  visual: { bot: 'think', place: 'beside',
    highlight: [{ in: 'title', text: 'helped first', tone: 'orange' }, { in: 'subtitle', text: 'time', tone: 'mark' }, { in: 'subtitle', text: 'uncertainty', tone: 'purple' }] },
  cards: [
    { title: "Describe the problem", body: "Leave the solution open for now." }
  ],
  prompt: "Where could your team be helped first? Which recurring task costs you time or creates unnecessary uncertainty? Describe the current problem. Leave the solution open for now.",
  keyPoints: ["The first pillar: the team's problem","Two or three minutes only","A handful of voices","Not a design session"],
  notes: "This is the first pillar: what could your team be helped with first? Very short discussion — two or three minutes, a handful of voices, do not let it become a design session. The point is to surface real problems before any tooling talk starts."
},

{ // Slide 14
  title: "Today",
  kicker: "DAY 1 · WELCOME",
  subtitle: "AI fundamentals, and getting to know Claude Code.",
  type: "context",
  visual: { bot: 'wave', place: 'clouds' },
  cards: [
    { title: "AI fundamentals", body: "What AI is, how a model reads your input, and how to write a prompt that works." },
    { title: "Get acquainted with Claude Code", body: "A tour, your own profile, and your first game: play around and try things." }
  ],
  keyPoints: ["Two things today","Fundamentals first","Then Claude Code: tour, profile, first game","Just to play around"],
  notes: "Keep it simple: today is about two things. First the AI fundamentals. Then getting to know Claude Code: a tour, your own profile, and your first game — just to play around and try things."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 1: AI foundations                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 15
  title: "Where AI comes from",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Seventy years in six moments.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "1950", caption: "Alan Turing asks the question: \"Can machines think?\" His Turing Test is still the best-known definition of machine intelligence." },
    { label: "1997", caption: "IBM's Deep Blue beats world chess champion Kasparov. Not by thinking, but by brute computing power." },
    { label: "2012", caption: "The deep learning breakthrough: a neural network wins the ImageNet image-recognition contest by a wide margin. Speech, images and translation all start here." },
    { label: "2017", caption: "\"Attention Is All You Need\": Google publishes the transformer, the engine under every modern language model." },
    { label: "2022", caption: "ChatGPT: one million users in five days. AI becomes something everyone can use." },
    { label: "2025–2026", caption: "Agentic AI: AI no longer only answers, it carries out tasks. That is where you are now." }
  ],
  keyPoints: ["Tell it as a story, not definitions","Press → for one year further","1950 · 1997 · 2012 · 2017 · 2022 · now","The next slides zoom in on the steps"],
  notes: "Tell this as a story. Press → to move one year further. 1950: Alan Turing asks 'Can machines think?'. 1997: Deep Blue beats Kasparov at chess, by brute computing power rather than thinking. 2012: deep learning breaks through when a neural network wins the ImageNet contest. 2017: Google's transformer paper, 'Attention Is All You Need', the engine under every modern language model. 2022: ChatGPT reaches a million users in five days. And now, 2025–2026: agentic AI, which no longer only answers but carries out tasks. That is where you are today. The next slides zoom in on the steps."
},

{ // Slide 16
  title: "The AI landscape",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Each one sits inside the one before it, like animal → dog → Rottweiler.",
  type: "concept",
  layout: "steps",
  visual: { art: 'nested', bot: 'point', place: 'nest', stepKeys: true },
  items: [
    { label: "Artificial intelligence", caption: "The whole field: machines doing things we link to human intelligence. The animal." },
    { label: "Machine learning", caption: "AI that learns from examples instead of hand-written rules. The dog." },
    { label: "Deep learning", caption: "Machine learning with many layers. The Rottweiler." },
    { label: "Generative AI", caption: "Deep learning that creates new text, images, audio or code. A male Rottweiler." },
    { label: "Large language models", caption: "Generative AI for language: text in, text out. This one Rottweiler, with his own character." }
  ],
  keyPoints: ["Click through the five rings","Metaphor: animal → dog → Rottweiler","Each ring is more specific","Ends at the model you use today"],
  notes: "Click through the five rings live so the nesting is visible. Use the metaphor: you start with 'an animal', then 'a dog', then 'a Rottweiler', then a male Rottweiler, then this one Rottweiler with his own character. Every ring is more specific than the one around it. Artificial intelligence is the whole field, and the large language model in the middle is the one you work with today."
},

{ // Slide 17
  title: "You have been training AI for years",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Machine learning: learning from examples instead of rules.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'learns from examples', tone: 'orange' }] },
  cards: [
    { title: "Machine learning", body: "Nobody writes a rule for every case. The system learns from examples, and you have been giving it those examples for years." },
    { title: "You taught AI", body: "traffic-light captchas\nNetflix ratings\nthe spam button\nYouTube's next video" }
  ],
  keyPoints: ["Ask: who clicked traffic lights this week?","That trained a machine","Netflix, YouTube, spam: all learned","Contrast: rules vs examples"],
  notes: "Ask the room: who had to click all the traffic lights to log in somewhere this week? Notice that the puzzles keep changing. Every time you do it, you help train a machine to recognise traffic lights, buses and animals. That is machine learning: nobody writes a rule for every picture; the system learns from millions of examples. Netflix recommendations, YouTube's next video and your spam filter work the same way."
},

{ // Slide 18
  title: "From layers to creating something new",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Deep learning and generative AI.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'many layers', tone: 'orange' }, { in: 'card:0', text: 'create', tone: 'purple' }] },
  cards: [
    { title: "Deep learning → generative AI", body: "Deep learning stacks many layers, each one finding a slightly more complex pattern. Once a model knows the patterns well enough, it can create something new from them." },
    { title: "What it creates", body: "emails\nimages\nsummaries\ncode" }
  ],
  keyPoints: ["Deep = many stacked layers","No maths","Patterns well enough → it can create","Plant: new is not the same as correct"],
  notes: "Keep it light: no maths. 'Deep' just means many layers, each picking up a slightly more complex pattern: from lines, to shapes, to faces. Once a model knows the patterns well enough, it can create something new from them: that's generative AI. Plant the caution that the next slide makes explicit: new is not the same as correct."
},

{ // Slide 19
  title: "Large language models",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Sounding right is not the same as being right.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'VERIFY', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'verification', tone: 'mark' }] },
  cards: [
    { title: "What it is", body: "A model that read huge amounts of text, turned the words into numbers, and learned to reason with them. Say 'my cat' and it has to guess which cat. Say 'my Maine Coon' and it knows." },
    { title: "Key line", body: "A plausible response still requires verification." }
  ],
  keyPoints: ["The model read huge amounts of text","Words become numbers","'My cat' vs 'my Maine Coon'","Say the key line slowly"],
  notes: "This closes the circle: the large language model you use today read huge amounts of text, turned the words into ones and zeros, and learned to reason with them. Use the cat: if you say 'my cat', it has to guess — a farm cat, a lynx, a Maine Coon? Say 'my Maine Coon' and it knows. That's why what you give it matters, which is where we go next. Then say the key line slowly and let it land: it's the single most important sentence of Part 1, and everything about verification and human review later depends on it."
},

{ // Slide 20
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

{ // Slide 21
  title: "Input, context and output",
  kicker: "DAY 1 · PART 1 · STEERING AI",
  subtitle: "Now you know what AI is. How do you steer it?",
  type: "concept",
  visual: { art: 'flow', bot: 'head', place: 'slot',
    highlight: [{ in: 'tagline', text: 'you check what comes out', tone: 'orange' }] },
  cards: [
    { title: "Input", body: "Your instruction, question or goal. Specific, clear and short." },
    { title: "Context", body: "Relevant information available to the model." },
    { title: "Output", body: "The response or proposed action." }
  ],
  tagline: "Garbage in, garbage out. Good in, good out — and you check what comes out.",
  keyPoints: ["Garbage in, garbage out","You sit in the middle: human in the loop","Developer, manager, analyst: same flow","Input: specific, clear, short"],
  notes: "Draw the arrow on the whiteboard: input + context → model → output. Garbage in, garbage out — but good in is also good out. And you sit in the middle: you give the input and you check the output. That is human in the loop, from the very first prompt. It works the same for a developer, a manager or a technical analyst. Keep your input specific, clear and short."
},

{ // Slide 22
  title: "Context windows",
  kicker: "DAY 1 · PART 1 · STEERING AI",
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
  keyPoints: ["Context = small Lego blocks","Each block helps build the next","Irrelevant blocks pull attention away","Repeat: relevant, current, permitted"],
  notes: "Think of context as small Lego blocks: each block helps the model get to the next one. Flipchart: draw one box as the window and keep adding blocks as the conversation grows: prompt, answer, a pasted file, more answers, until it is full. Irrelevant blocks take space and pull attention away from what matters. A one-and-a-half page love letter is fine if the model gets it at once; if it starts to wander, cut it into smaller blocks. The tagline is the takeaway to repeat: relevant, current, permitted."
},

{ // Slide 23
  title: "Model choice",
  kicker: "DAY 1 · PART 1 · STEERING AI",
  subtitle: "What comes out also depends on the model. Pick the one that fits the task.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true,
    highlight: [{ in: 'card:3', text: 'not allowed', tone: 'orange' }] },
  cards: [
    { title: "Haiku", body: "Fast and cheap. For simple questions and small tasks." },
    { title: "Sonnet", body: "The all-rounder. For most everyday work." },
    { title: "Opus 5.5", body: "The most capable. For complex work where quality matters most." },
    { title: "Fable 5.1", body: "Exists, but not allowed at Worldline." }
  ],
  tagline: "A simple question doesn't need the biggest model.",
  keyPoints: ["Haiku: fast, cheap, simple","Sonnet: everyday all-rounder","Opus 5.5: complex, highest quality","Fable 5.1: not allowed here","Bigger is not always better"],
  notes: "Different models offer different balances of capability, speed and cost. Haiku is fast and cheap: perfect for a simple question. Sonnet is the all-rounder for most work. Opus 5.5 is the most capable, for complex work. Fable 5.1 exists, but is not allowed at Worldline. A simple question doesn't need the biggest model: that's the bridge to tokens and cost."
},

{ // Slide 24
  title: "How you reach the model",
  kicker: "DAY 1 · PART 1 · STEERING AI",
  subtitle: "Desktop or API: same models, different costs.",
  type: "concept",
  visual: { stepThrough: true,
    highlight: [{ in: 'card:2', text: 'a secure route', tone: 'purple' }] },
  cards: [
    { title: "On your desktop", body: "A subscription: a fixed price per month, with usage limits." },
    { title: "Through the API", body: "You pay for what you use, counted in tokens." },
    { title: "Your setup", body: "Claude Code runs through your company's own setup: a secure route, used through the API." }
  ],
  tagline: "Through the API, every token has a price.",
  keyPoints: ["Same models, different ways in","Desktop: subscription","API: pay per token","Here: a secure route, through the API","So tokens matter"],
  notes: "Same models, different ways in, and different costs. On your desktop you have a subscription: a fixed price per month with usage limits. Through the API you pay for what you use, counted in tokens. In your setup Claude Code runs through your company's own secure route, because you work with sensitive systems, and it is used through the API. So every token has a price — which brings us to tokens."
},

{ // Slide 25
  title: "Tokens",
  kicker: "DAY 1 · PART 1 · STEERING AI",
  subtitle: "The currency of your AI.",
  type: "concept",
  visual: { stepThrough: true, flowText: ["your text", "tokens", "numbers", "the model"],
    highlight: [{ in: 'tagline', text: 'not the same as a word', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "A token is a small piece of text that a model reads and writes: often a whole word, sometimes part of a word or a single character." },
    { title: "Why it matters", body: "Context limits, usage limits and costs are all counted in tokens. The clearer your prompt, the fewer you waste." }
  ],
  tagline: "A token is not the same as a word.",
  keyPoints: ["Tokens = the currency","Flipchart: split one sentence into tokens","Everything is counted in tokens","Efficient = right model + clear prompt","About 3.5 characters per token"],
  notes: "Tokens are the currency of the model: everything it reads and writes is counted in tokens. Flipchart: split one sentence into tokens — common words stay whole, rare words get split. The model sees tokens as numbers. Context limits, usage limits and costs are all counted in tokens; on average a token is about 3.5 characters of English text. Using tokens efficiently comes down to two things you just saw: the right model, and a clear prompt that keeps the context window clean. Expect the room to get very focused here — that's fine, but don't let tokens take over: they are one lever, not the whole story."
},

{ // Slide 26
  title: "Quiz: steering AI",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Which statement is true?",
  type: "quiz",
  visual: { quiz: { answer: 2 }, bot: 'stretchLeft', place: 'pointer', pointAt: 2 },
  cards: [
    { title: "A", body: "A large language model is not part of machine learning." },
    { title: "B", body: "Adding more context always improves the answer." },
    { title: "C", body: "For a simple question, a smaller model like Haiku is often the better choice." },
    { title: "D", body: "Through the API, tokens are free." }
  ],
  check: "Answer: C",
  keyPoints: ["Vote first","Answer: C","A: the rings","B: distraction","D: every token has a price"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is C: pick the model that fits the task. A goes back to the rings: the language model sits inside machine learning. B goes back to the distraction card: irrelevant context takes space and attention. D goes back to the slide before tokens: through the API, every token has a price."
},

{ // Slide 27
  title: "Your AI in Claude Code",
  kicker: "DAY 1 · PART 1 · YOUR AI LANDSCAPE",
  subtitle: "Before you prompt: what your AI already brings, and what it will get.",
  type: "concept",
  visual: { art: 'intake', bot: 'head', place: 'aside', tags: { 3: 'images' } },
  cards: [
    { title: "Memory", body: "CLAUDE.md: who you are, what you do, how it should work with you." },
    { title: "Hands and feet", body: "MCP connections to Jira, GitLab and Confluence." },
    { title: "Defaults", body: "Settings, rules and the model it starts with." },
    { title: "LibreChat", body: "For your basic questions. And we make an image together, in the library, where you find an image generator." }
  ],
  tagline: "We set this up with you, step by step.",
  keyPoints: ["Draw the landscape once","Memory: CLAUDE.md","Hands and feet: MCP to Jira, GitLab, Confluence","Defaults, and LibreChat for basic questions","Make an image together via the library","We set it up together"],
  notes: "Draw the landscape they are heading to, once, so they see it before they need it. Your Claude Code is your personal assistant. It gets a memory (CLAUDE.md: who you are and how it should work with you), hands and feet through MCP connections to Jira, GitLab and Confluence, and defaults: settings, rules and the model it starts with. LibreChat is for basic questions, and together we make an image in the library, where you find an image generator. Don't explain each piece in depth: all of them come back today and tomorrow, and we set them up together."
},

{ // Slide 28
  title: "Context grows",
  kicker: "DAY 1 · PART 1 · YOUR AI LANDSCAPE",
  subtitle: "The more you work with it, the more it knows.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Your first prompt", body: "It knows nothing about you yet. Everything comes from the prompt." },
    { title: "In one conversation", body: "Every prompt and answer adds context." },
    { title: "Day after day", body: "Memory and CLAUDE.md carry what it learned into the next session." }
  ],
  tagline: "What does Claude Code know about you today?",
  keyPoints: ["Rising line: experience grows","First prompt: knows nothing","Conversation adds context","Memory carries it forward","Ask: what does it know about you today?"],
  notes: "Working with AI is a rising line. Your very first prompt starts from zero: it knows nothing about you. Within one conversation every prompt and answer adds context. Across days, memory and CLAUDE.md carry what it learned into the next session. End on the question: what does Claude Code know about you today? For most people: nothing yet. That's where the prompt comes in."
},

{ // Slide 29
  title: "Prompt",
  kicker: "DAY 1 · PART 1 · PROMPTING",
  subtitle: "What you give the model to work with.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'CLEAR', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'what your prompt tells it', tone: 'mark' }] },
  cards: [
    { title: "Definition", body: "A prompt is everything you send the model: your instruction or question, plus any background, examples or documents you add." },
    { title: "Key line", body: "At the start, the model knows only what your prompt tells it." }
  ],
  keyPoints: ["Prompt = everything you send","At the start: only what you tell it","Later: conversation and memory add to it","Bridge to the prompt ingredients"],
  notes: "Keep it short: a prompt is more than the question you type, it is everything you send along with it. The key line says 'at the start' on purpose: in a fresh session the model knows only what your prompt tells it; later the conversation and memory add to that, as on the previous slide. Because it starts from your prompt, a good prompt has a fixed set of ingredients."
},

{ // Slide 30
  title: "A reliable prompt",
  kicker: "DAY 1 · PART 1 · PROMPTING",
  subtitle: "A template you can copy into Claude Code or ChatGPT today.",
  type: "concept",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Template", body: "Goal: the result you want\nContext: what the model needs to know\nConstraints: what it must not do or change\nDone when: how you recognise a good result\nOutput: the format you want back\nCheck: how you will verify it (you stay in the loop)" }
  ],
  tagline: "Press “Example prompt” to copy the template.",
  prompt: `Goal: [the result I want]
Context: [who I am, the project or situation, and what you need to know]
Constraints: [what you must not do or change]
Done when: [how I will recognise a good result]
Output: [the format I want back, e.g. a short plan, a table or 5 bullets]
Check: [how I will verify your answer; mark anything you cannot confirm as OPEN]`,
  keyPoints: ["Walk through the six lines once","Constraints + Check = human in the loop","Open Example prompt, show it copies","Two examples follow"],
  notes: "This is the pattern behind every assignment prompt in the deck. Walk through the six lines once. Constraints and Check are where you stay in the loop: you say what it may not touch, and you decide how you verify the result. Then open “Example prompt” (top right) and show that it copies. The next two slides show it filled in: one from daily life, one from developer work."
},

{ // Slide 31
  title: "Example: a birthday cake",
  kicker: "DAY 1 · PART 1 · PROMPTING",
  subtitle: "The same six lines, outside work.",
  type: "concept",
  visual: { checklist: 0, bot: 'think', place: 'left' },
  cards: [
    { title: "Prompt", body: "Goal: a recipe for a birthday cake for a 5-year-old\nContext: six people, one of them allergic to hazelnut\nConstraints: no nuts at all, nothing that needs special equipment\nDone when: grandma can bake it on her own\nOutput: ingredients and steps in simple language\nCheck: list every ingredient so I can check it for nuts" }
  ],
  prompt: `Goal: a recipe for a birthday cake for a 5-year-old.
Context: six people, one of them is allergic to hazelnut.
Constraints: no nuts at all, and nothing that needs special equipment.
Done when: grandma can bake it on her own.
Output: a list of ingredients and numbered steps, in simple language.
Check: list every ingredient separately so I can check it for nuts.`,
  keyPoints: ["Everyone gets this one","Constraint: no hazelnut","Done when: grandma can do it","Check: you verify the ingredients"],
  notes: "Everyone gets this one. Read it line by line. The constraint is the allergy; the 'done when' is grandma baking it on her own, so the language has to be simple. The check is you: the model lists every ingredient, and you verify there are no nuts. Without that line, you'd have to trust it."
},

{ // Slide 32
  title: "Example: a bug fix",
  kicker: "DAY 1 · PART 1 · PROMPTING",
  subtitle: "The same six lines, at work.",
  type: "concept",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Prompt", body: "Goal: find the cause of the failing login test\nContext: the error appears since yesterday's merge\nConstraints: read only, change nothing\nDone when: you can point to the line that causes it\nOutput: the cause, the file and line, and a proposed fix\nCheck: show the evidence; mark anything unsure as OPEN" }
  ],
  prompt: `Goal: find the cause of the failing login test.
Context: the error appears since yesterday's merge. Scan the repository.
Constraints: read only. Do not change any file.
Done when: you can point to the line that causes the error.
Output: the cause, the file and line number, and a proposed fix (not applied).
Check: show the evidence for your answer; mark anything you are not sure of as OPEN.`,
  keyPoints: ["Same lines, developer task","Constraint: read only","You decide on the fix","Evidence + OPEN = human in the loop"],
  notes: "Same six lines, now a developer task. The constraint is the important one: read only, change nothing — Claude scans the repo and shows the error, you decide what to do with it. The check asks for evidence and marks what it isn't sure of as OPEN. That's human in the loop in one line."
},

{ // Slide 33
  title: "Knowledge check",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Four quick questions. Answer first, then click to see.",
  type: "review",
  visual: { qa: true },
  cards: [
    { title: "What is a token?", body: "A small piece of text the model reads and writes, often a word, sometimes part of one. The currency of your AI." },
    { title: "Why not always use the biggest model?", body: "It costs more and is slower. A simple question doesn't need it." },
    { title: "What does the model know at the start?", body: "Only what your prompt tells it. Later, the conversation and memory add to that." },
    { title: "Which line keeps you in the loop?", body: "Constraints and Check: what it may not touch, and how you verify the result." }
  ],
  keyPoints: ["Ask each question out loud","Let the room answer first","Then click to reveal","Covers tokens, model, prompt, loop"],
  notes: "Ask each question out loud and let the room answer before you click. The four questions cover what you just did: tokens, model choice, what the model knows at the start, and how you stay in the loop. Use 'Reveal next' or click a card."
},

{ // Slide 34
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
/* DAY 1 — Part 2: Claude Code, agents and a tour                         */
/* ---------------------------------------------------------------------- */

{ // Slide 35
  title: "Claude interfaces",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Four ways to work with Claude, and when to use which.",
  type: "concept",
  visual: { spotlight: 1, bot: 'stretchLeft', place: 'pointer', pointAt: 1,
    pending: ["Screenshots", "To be added: a real screenshot of each interface."] },
  cards: [
    { title: "Claude chat", body: "Ask, think and write. For questions, ideas and texts." },
    { title: "Claude Code", body: "Works inside your code project: reads, plans, changes and tests." },
    { title: "Cowork", body: "Hand over a task on your own documents and files. For knowledge work, not code." },
    { title: "API and SDK", body: "Build Claude into your own application or agent." }
  ],
  keyPoints: ["Four interfaces, one Claude","Chat: questions and texts","Cowork: tasks on your documents","Claude Code: inside your project","API/SDK: build it into your own app","Land on Claude Code"],
  notes: "Same Claude, four ways in. Claude chat is for asking, thinking and writing. Cowork hands over a task on your own documents and files: knowledge work, not code. Claude Code works inside your code project: it reads the files, makes a plan, changes code and runs tests. With the API and the SDK you build Claude into your own application or agent. Then land on Claude Code: that is where the room lives today. The difference with chat: chat only knows what you paste in, Claude Code works inside the project itself."
},

{ // Slide 36
  title: "Where Claude Code runs",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "The same Claude Code, in different windows.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'left',
    highlight: [{ in: 'tagline', text: 'in the terminal', tone: 'orange' }] },
  cards: [
    { title: "Terminal", body: "Type claude in a project folder. Everything happens in text, step by step." },
    { title: "VS Code extension", body: "The same Claude Code in a panel next to your files." },
    { title: "MCP servers", body: "Connect Claude Code to Jira, Confluence and GitLab." }
  ],
  tagline: "In these lessons we work in the terminal.",
  keyPoints: ["Terminal or VS Code: same Claude Code","MCP connects it to Jira, Confluence, GitLab","We teach in the terminal","Prefer VS Code? Fine, same tool"],
  notes: "Claude Code runs in the terminal, or as an extension inside VS Code: it is the same Claude Code. Through MCP servers it connects to Jira, Confluence and GitLab; we set those up later. In these lessons we work in the terminal, so everyone sees the same screen and every step Claude takes. Someone who prefers VS Code can use the extension: everything we teach works there too. Tip for later: open VS Code next to your terminal, so you see the files Claude touches."
},

{ // Slide 37
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

{ // Slide 38
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

{ // Slide 39
  title: "Agent loop",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
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
  tagline: "Claude Code is an agent because it loops, within a task you bound.",
  keyPoints: ["Five steps, keep Decide","Focus on the loop itself","Link to the method comes next"],
  notes: "Five steps, all of them stay including 'Decide' — this is the confirmed final wording. Keep this slide focused on the loop itself; the relationship between this loop and the working method just taught is the very next slide."
},

{ // Slide 40
  title: "Human and AI working method",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
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
  title: "Three views of the same work",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
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
  notes: "This is the reconciled three-tier diagram — say the nesting out loud, left to right: Build+Test of the SDLC (outer) contains Create+Test of the working method (middle), which contains the whole agent loop (inner). The middle tier is this course's own working method from slide 40, unchanged; the inner tier is slide 39's agent loop, unchanged. Only the outer SDLC ring is new context — it places one bounded assignment inside the team's whole software lifecycle. Close on the tagline exactly as written; it's the sentence to leave the room with before moving to slide 42."
},

{ // Slide 42
  title: "What does AI need to know first?",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
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

{ // Slide 43
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

{ // Slide 44
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

{ // Slide 45
  title: "Ground rules: what you share",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "From now on you work on your own laptop. These rules apply both days.",
  type: "context",
  visual: { checklist: 0, bot: 'think', place: 'left' },
  cards: [
    { title: "What you share", body: "Practice data only: no Worldline or customer data\nNo passwords, API keys or internal documents\nNothing personal on GitHub: the practice repo is public\nDon't push" }
  ],
  tagline: "Not even to try.",
  keyPoints: ["Say each line out loud","Practice data only","No passwords, keys or internal documents","The practice repo is public: don't push"],
  notes: "From now on everyone works on their own laptop, so say these out loud, once. Practice data only: no Worldline data and no customer data. No passwords, API keys or internal documents. The practice repo is public, so nothing personal goes on GitHub: no real photos, contact details or confidential text. And don't push. Not even to try."
},

{ // Slide 46
  title: "Ground rules: what you approve",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Claude Code asks before it acts. You decide.",
  type: "context",
  visual: { badges: ['🔍', '🔐', '🛡️'], bot: 'point', place: 'aside',
    highlight: [{ in: 'tagline', text: 'Pair up', tone: 'orange' }] },
  cards: [
    { title: "Read before you approve", body: "" },
    { title: "Never skip permissions", body: "" },
    { title: "Respect IT policy", body: "" }
  ],
  tagline: "Stuck? Pair up with your neighbour and we fix it at the break.",
  keyPoints: ["Read before you approve: don't understand it, say no","Never turn all approvals off","IT says no = no workarounds","Stuck: pair up"],
  notes: "Three rules about what you approve. Read before you approve: if you don't understand a command, say no and ask Claude what it does. Never skip permissions: don't use the option that turns all approvals off, whoever suggests it. Respect IT policy: if something is blocked, that is the answer. No workarounds, no personal accounts, no borrowed logins or keys. Stuck? Pair up with your neighbour and we fix it at the break."
},

{ // Slide 47
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

{ // Slide 48
  title: "Explore it with Claude Code",
  kicker: "DAY 1 · PART 2 · HANDS-ON DEMO",
  subtitle: "The reliable prompt in action: goal, context, constraints. Watch what Claude Code does, without changing anything.",
  type: "concept",
  dark: true,
  visual: { art: 'prompt', promptMarks: ["Don't change anything", "the file it comes from", "OPEN"] },
  cards: [
    { title: "Goal", body: "Explain what this application does and how it is structured." },
    { title: "Context", body: "I just cloned this practice repository and have never seen it." },
    { title: "Constraints", body: "Don't change anything. Don't use or ask for any Worldline information." },
    { title: "Check", body: "For each claim, name the file it comes from. Mark what you cannot confirm as OPEN." }
  ],
  prompt: "Goal: explain what this application does and how it is structured, so I can work on it.\nContext: I just cloned this practice repository and have never seen it.\nConstraints: Don't change anything. Don't use or ask for any Worldline information.\nDone when: I know what the app does, where things live and how to run it.\nOutput: a short overview. For each claim, name the file it comes from.\nCheck: mark anything you cannot confirm as OPEN.",
  keyPoints: ["Everyone pastes the same prompt", "You run it live on screen too", "Point out: reads, tools, evidence, OPEN", "Nothing changes: read-only", "Live run fails: press B for plan B"],
  notes: "Everyone pastes this prompt into their own Claude Code (Example prompt, top right, copies it) and you run it live on the projector at the same time, so people can compare. While it runs, narrate what you see: it reads files, runs commands, builds up context, ties claims to evidence, marks OPEN, and changes nothing. Before class, run this exact prompt once on your own machine. If your live run fails (no network, no auth, a crash), say so plainly and press B for the captured run, then walk through it as if it were live; the teaching point survives either way. After lunch, in Assignment 1, they work with Claude Code on their own for the first time."
},

{ // Slide 49
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

{ // Slide 50
  title: "A tour of Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Open VS Code next to your terminal, so you see every file Claude touches.",
  type: "concept",
  visual: { stepThrough: true, bot: 'wave', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'next to your terminal', tone: 'orange' }] },
  cards: [
    { title: "The input", body: "Type in plain language and press Enter. Esc stops Claude halfway." },
    { title: "When it goes wrong", body: "Read the error. Paste it back to Claude and ask what it means." },
    { title: "The bottom of the screen", body: "Which mode you are in, and your status line. Shift+Tab switches the mode." }
  ],
  keyPoints: ["Live on the projector","VS Code beside the terminal","Input: plain language, Esc stops","Errors: paste back, ask","Bottom line: mode + status line"],
  notes: "Do this live on the projector. Open VS Code next to the terminal so the room sees the files Claude touches. The input: type a normal sentence and press Enter; Esc stops Claude halfway. When something goes wrong: read the error, paste it back to Claude and ask what it means. At the bottom of the screen: which mode you are in and your status line; Shift+Tab switches the mode."
},

{ // Slide 51
  title: "The / menu",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Type / and Claude Code shows everything it can do.",
  type: "concept",
  visual: { lineReveal: 0, bot: 'head', place: 'beside' },
  cards: [
    { title: "Try these", body: "/help: everything Claude Code can do\n/model: choose Haiku, Sonnet or Opus\n/agents: your sub-agents\n/statusline: what you see at the bottom\n/memory: open your CLAUDE.md\nYour skills: they show up in this menu too" }
  ],
  keyPoints: ["Type / live","/help, /model, /agents","/statusline: show a nice one","/memory opens CLAUDE.md","Skills appear here too"],
  notes: "Type / live and scroll through the menu. /help shows everything Claude Code can do. /model lets you choose Haiku, Sonnet or Opus: remember the model-choice slide. /agents shows your sub-agents. /statusline sets what you see at the bottom of the screen; show a good example. /memory opens your CLAUDE.md, which is next. And the skills you install or make show up in this menu too."
},

{ // Slide 52
  title: "settings.json",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Claude Code's settings live in a file you can read.",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: "~/.claude/settings.json", body: "{\n  \"model\": \"sonnet\",\n  \"permissions\": {\n    \"deny\": [\"Bash(git push *)\"]\n  }\n}" },
    { title: "Where it lives", body: "~/.claude/settings.json: you, in every project\n.claude/settings.json: this project, shared with your team\n.claude/settings.local.json: this project, only you" }
  ],
  tagline: "This afternoon you write your own rules in here.",
  keyPoints: ["Open it in VS Code","model: the model it starts with","deny: never allowed","Three places: you, project, project-only-you"],
  notes: "Open the file in VS Code. Settings are plain JSON. In this example: the model Claude Code starts with, and one thing it is never allowed to do: push. There are three places: in your home folder for you in every project, in the project for the whole team, and settings.local.json for this project but only you. Don't go deeper now: this afternoon everyone writes their own rules in here."
},

{ // Slide 53
  title: "CLAUDE.md and memory",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "How Claude Code gets to know you.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true,
    highlight: [{ in: 'card:2', text: 'how you steer it', tone: 'orange' }] },
  cards: [
    { title: "~/.claude/CLAUDE.md", body: "About you. Claude reads it in every project." },
    { title: "CLAUDE.md in a project", body: "About this project. Shared with your team." },
    { title: "Memory grows", body: "Claude learns from how you steer it, and carries it into the next session." },
    { title: "soul.md", body: "A concept to remember: one file that describes your AI's character and values." }
  ],
  keyPoints: ["Root CLAUDE.md = you, everywhere","Project CLAUDE.md = this project, the team","Memory builds up from how you steer it","soul.md: name it, don't build it"],
  notes: "CLAUDE.md is how Claude Code gets to know you. The one in your home folder (~/.claude/CLAUDE.md) is about you and is read in every project. A CLAUDE.md in a project is about that project and is shared with the team. Memory grows: the way you steer Claude is carried into the next session. And name soul.md as a concept: one file that describes your AI's character and values. Just the idea for now; we don't build it today."
},

{ // Slide 54
  title: "Assignment: Your first CLAUDE.md",
  kicker: "DAY 1 · ASSIGNMENT",
  subtitle: "Tell Claude Code who you are. One rule is enough to start.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "You end up with", body: "a CLAUDE.md about you\none rule Claude follows\na new session that knows who you are" }
  ],
  stepsHeading: "Do this:",
  steps: ["Type claude.", "Ask Claude to create your personal CLAUDE.md in ~/.claude/.", "Tell it who you are and what you do at Worldline.", "Add one rule, for example: “When I build frontend, use Tailwind.”", "Open the file in VS Code and read it.", "Start a new session and ask: “What do you know about me?”"],
  expected: "A short CLAUDE.md about you, and a new session that knows who you are.",
  prompt: "Create my personal CLAUDE.md in ~/.claude/.\n\nWho I am: [your name], [your role] at Worldline, in [your team], working on [what you work on].\nRule: [for example: when I build frontend, use Tailwind].\n\nKeep it short. Show me the file before you save it.",
  keyPoints: ["Show it once on the projector","Who you are + one rule","Role only: no customer data or internal documents","Check it in a new session","Timer: press ▶ Start"],
  notes: "Show it once on the projector, then let everyone write their own. Who you are and what you do at Worldline, plus one rule, for example: when I build frontend, use Tailwind. Keep it to your role: no customer data, passwords or internal documents. Claude shows the file before saving; read it, approve it, and open it in VS Code. Then start a new session and ask 'What do you know about me?' to see that it works."
},

{ // Slide 55
  title: "Look around for yourself",
  kicker: "DAY 1 · BEFORE LUNCH",
  subtitle: "10 to 15 minutes. Try things, ask Claude about Claude Code.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Try this:",
  cards: [
    { title: "You end up with", body: "your way around the / menu\none thing that surprised you" }
  ],
  steps: ["Type / and scroll through the menu.", "Try /model and look at the options.", "Ask Claude: “What can you do in this folder?”", "Ask Claude to explain one line of your settings.json.", "Write down one thing that surprised you."],
  expected: "You know your way around Claude Code. Nothing in the repo has changed.",
  keyPoints: ["10–15 minutes, free","Walk around and help","Collect surprises for after lunch","Then lunch"],
  notes: "Ten to fifteen minutes to look around on their own. Walk around and help. Ask a few people what surprised them and keep those for after lunch. Then lunch."
},

{ // Slide 56
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
/* DAY 1 — Part 3: Permissions and Plan Mode (after lunch)                */
/* ---------------------------------------------------------------------- */

{ // Slide 57
  title: "Permissions and Plan Mode",
  kicker: "DAY 1 · PART 3 · PERMISSIONS",
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

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 4: Aether Library                                       */
/* ---------------------------------------------------------------------- */

{ // Slide 58
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

{ // Slide 59
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

{ // Slide 60
  title: "Assignment 1: Ask Claude about the project",
  kicker: "DAY 1 · ASSIGNMENT 1",
  subtitle: "Your first time working with Claude Code on your own. You only ask questions; nothing changes.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "You end up with", body: "where the data lives\nhow to start and check the app\nwhich files are risky to change\na list of OPEN questions" }
  ],
  steps: [
    "In the project folder, type claude.",
    "Press Shift+Tab until you see “plan mode”.",
    "Ask: “Where are the profiles and the glossary stored?”",
    "Ask: “How do I start this app and check it works?”",
    "Ask: “Which files could break the app if I change them?”",
    "Write down what Claude isn't sure about as OPEN."
  ],
  expected: "You can explain where things live and how to run the app. No files changed.",
  prompt: "Don't change anything. Answer these questions about this project, and show which files you found each answer in:\n\n1. Where are the profiles and the glossary stored?\n2. How do I start this app and check it works?\n3. Which files could break the app if I change them?\n\nMark anything you are not sure about as OPEN.",
  keyPoints: ["First time on their own in Claude Code", "Plan mode: Shift+Tab, nothing changes", "Ask the three questions literally", "Answers come with file names", "Collect OPEN items; timer: press ▶ Start"],
  notes: "This is the room's first time working with Claude Code on their own, so keep it concrete: the steps say literally what to type. Show it once on the projector before they start: type claude in the project folder, press Shift+Tab until the bottom of the screen says plan mode (so Claude can look but not change anything), then type the first question as a normal sentence and press Enter. Point out that Claude answers with file names as evidence, and that anything it is unsure about should be written down as OPEN. The three questions are also in the Example prompt panel as one prompt to copy. What a good run covers: where profile and glossary data live (and that there is no profiles data yet), the start and validate commands (npm start, npm run validate), files that could break something if changed carelessly (server.js, the data files, public/app.js) and a short OPEN list. Set the minutes on the timer and press Start. Expect basic terminal questions in the first five minutes; walk the room. At 5 minutes remaining, give a verbal warning. Early finishers: ask Claude one of their OPEN questions."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 2                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 61
  title: "Assignment 2: Participant profile",
  kicker: "DAY 1 · ASSIGNMENT 2",
  subtitle: "Add your profile, and the page that shows it. The first prompt is given; the rest is up to you.",
  type: "practice",
  visual: { shot: 'assets/examples/profile-card.png' },
  layout: "exercise",
  cards: [
    { title: "Include", body: "name\nrole\nteam\nlearning goal" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Plan mode on. Ask: “Look at how this app is built and plan a Profiles page with my profile on it.”",
    "Answer Claude's questions about you. Don't let it invent anything.",
    "Read the plan. Happy? Leave plan mode and tell Claude to go ahead.",
    "Open the Profiles page and check your card."
  ],
  expected: "Your profile shows on a working Profiles page.",
  keyPoints: ["Half literal: first prompt given", "Plan mode on before the first prompt", "No invented or confidential details", "Leaving plan mode = your approval", "Check the card on the Profiles page"],
  notes: "Second step down the ladder: the first prompt is given word for word, the rest they do in their own words. Plan mode first (Shift+Tab), then the given prompt; Claude should ask for their details instead of inventing them. Reading the plan and then leaving plan mode (Shift+Tab again) and saying go ahead is the approval moment of the working method, make that explicit once for the room. The Profiles page shows one example profile card as a reference; they build the real page and their own entry. Useful profile fields: name, role, team, experience, learning goal and one workflow you'd like AI to improve. Remind them: no confidential or unnecessary personal information. Watch for people who skip plan mode and let Claude edit straight away; redirect them without being heavy-handed.",
},

{ // Slide 62
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

{ // Slide 63
  title: "Assignment 3: The 20 AI terms that matter",
  kicker: "DAY 1 · ASSIGNMENT 3",
  subtitle: "First in plan mode, then in auto mode. Spot the difference.",
  type: "practice",
  visual: { shot: 'assets/examples/glossary-list.png' },
  layout: "exercise",
  cards: [
    { title: "Add", body: "20 terms, each with a plain-language definition of 1–2 sentences" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Plan mode: in your own words, ask Claude for the 20 most important AI terms.",
    "Review the list together and agree on it.",
    "Let Claude add the agreed terms to the glossary.",
    "Auto mode: ask the same in a new session and compare."
  ],
  expected: "20 agreed terms on the Glossary page, and a clear view of what changes with and without a plan.",
  keyPoints: ["Own words now: no given prompt", "Plan mode first, agree the 20 terms", "Fresh session in auto mode, same question", "Compare: what did it pick without a plan?", "Collect two or three differences"],
  notes: "The point of this assignment is the contrast. In plan mode (Shift+Tab until the mode shows Plan) Claude proposes its 20 terms before touching anything, so the room can see its choices and agree on them first; that's the human review step in practice. Only then do they let it add the terms (and build the Glossary page, if it doesn't show entries yet; the example terms on that page are the reference). Then, in a fresh session in auto mode, ask the same question and let it run: which terms did it pick without a plan, and would you have agreed with them? Collect two or three differences from the room. Definitions stay plain language, 1–2 sentences, in English, with no claims that can't be backed up."
},

{ // Slide 64
  title: "Assignment 4: Enriched concept card",
  kicker: "DAY 1 · ASSIGNMENT 4",
  subtitle: "Turn one glossary term into a full concept card. You write the prompt.",
  type: "practice",
  visual: { shot: 'assets/examples/library-card.png' },
  layout: "exercise",
  cards: [
    { title: "Include", body: "explanation\nexample\ncommon misunderstanding\nessential points\nrelated concepts\nsources" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Pick one term from your glossary.",
    "Write your own prompt with the template: goal, context, limits, done when.",
    "Plan mode first. Open and check every source it suggests.",
    "Approve, let Claude build it, then check the Library page."
  ],
  expected: "One checked concept card on the Library page.",
  keyPoints: ["They write their own prompt now", "Use the reliable-prompt template", "Plan mode, then approve", "Open and read every source", "Check the card on the Library page"],
  notes: "Last step down the ladder on Day 1: no given prompt, they write their own using the reliable-prompt template from this morning (goal, context, constraints, done when; the Example prompt button on that slide copies it). Ask two or three people to read their prompt aloud before they run it; that is the learning moment. The Library page shows example cards as a reference; they build the real, data-driven page (if it doesn't exist yet) plus their own card with explanation, example, common misunderstanding, essential points, related concepts and sources. What a good run looks like: Claude inspects the data structure first, proposes the card and the smallest plan, opens and reads each source (a search result is not a check), waits for approval and runs the checks afterwards. Circulate and coach on verifying the factual explanation; that's the step people skip under time pressure.",
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 4: build it, then set rules Claude can't ignore */
/* ---------------------------------------------------------------------- */

{ // Slide 65
  title: "Assignment 4a: Build a search bar for the glossary",
  kicker: "DAY 1 · ASSIGNMENT 4a",
  subtitle: "You decide how it looks and how it behaves. Claude builds it. Then you find out where it went.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: 'Rules for the search bar', runner: [{ label: 'Token', tone: 'green' }, { label: 'same result', tone: 'green' }, { label: 'found', tone: 'green' }, { label: 'No terms found', tone: 'orange' }, { label: 'all 20', tone: 'green' }] },
  cards: [
    { title: "Rules", body: "typing “tok” shows Token\nupper or lower case doesn't matter\nwords inside a definition are found too\nno match shows “No terms found”\nan empty search box shows every term again" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Design: in plan mode, ask Claude to propose a search bar for the Glossary page, in the style of the app. Adjust it until you like it.",
    "Rules: give Claude your rules for the search bar. Add one of your own.",
    "Build: read the plan, approve, let Claude build it. Test every rule in the browser yourself.",
    "Where did it go? Ask: “Which files did you change, and where exactly is the search code?” Open one yourself.",
    "CLAUDE.md: ask “Does CLAUDE.md still describe this project correctly?” Read the proposed update before you approve."
  ],
  expected: "The search bar looks like part of the app and passes every rule. You know which files hold the code, and CLAUDE.md is up to date.",
  keyPoints: ["Design first, in plan mode", "Their rules go into the prompt, plus one of their own", "They test every rule in the browser", "Never accept code you can't find", "CLAUDE.md is now out of date: let Claude fix it"],
  notes: "A full small build, from look to code to documentation. Step 1 is about design, not code: in plan mode Claude proposes where the search bar sits and what it looks like, and they can change that before anything is built. Step 2: the five rules on the right are the behaviour; they add them to the prompt as the 'Done when' of the reliable-prompt template, plus one rule of their own (for example: the number of results is shown). Step 3: after the build they test every rule themselves in the browser; Claude saying 'it works' is not the check. Step 4 teaches a habit: never accept code you can't find. Claude should name the files (likely public/app.js, public/index.html, public/style.css) and they open one to see the search code with their own eyes. Step 5 is the aha: the starter's CLAUDE.md still says the Glossary page is an empty placeholder with no data-driven rendering, which is now wrong. Claude reads that file at the start of every session, so an outdated CLAUDE.md misleads the next session. Let Claude propose the update and read it before approving; this sets up Day 2's CLAUDE.md part. If Day 1 runs late, make this assignment optional for early finishers; 4b and 4c matter more for Day 2."
},

{ // Slide 66
  title: "Rules Claude can't ignore",
  kicker: "DAY 1 · PART 4 · SETTINGS",
  subtitle: "CLAUDE.md asks. settings.json enforces.",
  type: "concept",
  visual: { stepThrough: true, guides: [['🧭', 'CLAUDE.md', 'asks Claude'], ['🔒', 'settings.json', 'enforces']] },
  cards: [
    { title: "Permissions", body: "What Claude may always do here, and what it may never do." },
    { title: "Hooks", body: "A check that runs by itself at a fixed moment, for example after every file change." },
    { title: "Where", body: ".claude/settings.json: shared with your team\n.claude/settings.local.json: only for you" }
  ],
  tagline: "A rule in a prompt can be forgotten. A rule in settings can't.",
  keyPoints: ["CLAUDE.md = a request, settings = enforced", "Permissions: always allow / never allow", "Hooks: Claude Code runs them, not Claude", "Shared file vs local file", "Two assignments follow: 4b and 4c"],
  notes: "Short concept slide before the last two assignments. Link back to Permissions and Plan Mode from this morning: there you approved every action one by one. Now you write standing rules down once. Permissions: 'allow' means Claude never has to ask for that command again, 'deny' means it can't do it, even if you ask it to; when both match, deny wins. Hooks are new: a hook is a command that Claude Code itself runs at a fixed moment, such as after every file edit. Claude doesn't have to remember it and can't skip it. Both live in the same file, .claude/settings.json in the project, which is shared with the team through Git; settings.local.json is the same thing, only for you. The tagline is the sentence to leave: CLAUDE.md (Day 2) guides Claude, settings enforce. Typing /permissions or /hooks inside Claude Code shows what is active."
},

{ // Slide 67
  title: "Assignment 4b: House rules for the Aether Library",
  kicker: "DAY 1 · ASSIGNMENT 4b",
  subtitle: "Decide what Claude may always do here, and what it may never do.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: 'Rules for this project', oneCol: true },
  cards: [
    { title: "Never", body: "git push: the repo is public, and your profile is in it\nnpm run reset: it wipes your whole day\nedit data/fixtures/: validate is tested against it" },
    { title: "Always", body: "npm run validate: safe, and you run it all day" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "As a pair: decide what Claude may always do, and what it may never do.",
    "Ask Claude to write your rules into .claude/settings.json. Read the file before you approve.",
    "Restart Claude and type /permissions. Are your rules there?",
    "Test them: “run validate” (no question asked), then “push my work” (blocked)."
  ],
  expected: "Validate runs without asking. Push, reset and edits to the fixtures are blocked, even when you ask for them.",
  prompt: `{
  "permissions": {
    "allow": ["Bash(npm run validate)"],
    "deny": [
      "Bash(git push *)",
      "Bash(npm run reset)",
      "Edit(data/fixtures/**)"
    ]
  }
}`,
  keyPoints: ["The pair decides the rules, Claude writes them", "Read settings.json before approving", "/permissions shows what's active", "Test both: allowed and blocked", "Ground rule 4, now enforced"],
  notes: "Each rule stops a mistake that can really happen in this repo. No push: the starter repo is public on GitHub, and by now it holds their profile; one 'commit and push my work' would publish it. That's ground rule 4, now enforced instead of agreed. No npm run reset: it runs git checkout -- . and silently throws away every uncommitted change, so the profile, the 20 terms and the concept card are gone. No edits to data/fixtures/: one fixture is broken on purpose to show that validate catches mistakes; asked to 'make validate pass', Claude might 'fix' it. Always allow validate: approving a safe command over and over only teaches people to click yes without reading. They decide first, then Claude writes the file; the Example prompt panel shows what a good result looks like (don't hand it out before they've decided). The test is the point: 'push my work' must be refused by Claude Code itself, not by Claude being polite. If /permissions doesn't show the rules, restart Claude in the project folder. Early finishers: add a rule of their own and explain why."
},

{ // Slide 68
  title: "Assignment 4c: Let the app check Claude's work",
  kicker: "DAY 1 · ASSIGNMENT 4c",
  subtitle: "After every change, the check runs by itself.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: 'What happens', oneCol: true },
  cards: [
    { title: "The hook", body: "After every file edit: run npm run validate." },
    { title: "The test", body: "Ask for a term without a definition.\nThe hook catches it.\nClaude fixes it itself." }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Ask Claude to add a hook to .claude/settings.json that runs npm run validate after every file edit.",
    "Read the hook before you approve. Type /hooks to check it's there.",
    "Test it: ask Claude to add a glossary term without a definition.",
    "Watch the hook catch it and Claude fix it. Then check the Glossary page."
  ],
  expected: "A broken entry gets caught and fixed without you asking for the check.",
  prompt: `"hooks": {
  "PostToolUse": [
    {
      "matcher": "Edit|Write",
      "hooks": [
        { "type": "command", "command": "npm run validate >&2 || exit 2" }
      ]
    }
  ]
}`,
  keyPoints: ["Same settings.json as 4b", "Hook runs after every edit", "Read it before approving", "Break it on purpose: missing definition", "Claude fixes it without being asked"],
  notes: "The hook goes into the same .claude/settings.json as the house rules from 4b, next to permissions. What it does: after every file edit or new file (PostToolUse, matcher Edit|Write), Claude Code runs npm run validate. The '|| exit 2' part matters: if validate fails, exit code 2 sends the error back to Claude, so Claude sees it and repairs the entry. Without it, only you would see the error. The Example prompt panel shows a working hook to compare with. The test makes it visible: asking for a term without a definition is a deliberate mistake, and the room should see the validate error appear and Claude fix it on its own. If the hook doesn't fire, check /hooks, and restart Claude in the project folder. Close the Day 1 hands-on here: a prompt asks, CLAUDE.md (tomorrow) guides, settings enforce."
},

{ // Slide 69
  title: "Example: a complete settings.json",
  kicker: "DAY 1 · PART 4 · SETTINGS",
  subtitle: "Your house rules from 4b and your hook from 4c, together in one file: .claude/settings.json",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: ".claude/settings.json", body: `{
  "permissions": {
    "allow": ["Bash(npm run validate)"],
    "deny": [
      "Bash(git push *)",
      "Bash(npm run reset)",
      "Edit(data/fixtures/**)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run validate >&2 || exit 2"
          }
        ]
      }
    ]
  }
}` },
    { title: "How to read it", body: "allow: Claude may do this without asking\ndeny: never allowed, even if you ask\nPostToolUse: runs after Claude uses a tool\nmatcher Edit|Write: only after file changes\nexit 2: a failed check goes back to Claude to fix" }
  ],
  tagline: "One file, shared with your team. Rules are enforced, not requested.",
  prompt: `{
  "permissions": {
    "allow": ["Bash(npm run validate)"],
    "deny": [
      "Bash(git push *)",
      "Bash(npm run reset)",
      "Edit(data/fixtures/**)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run validate >&2 || exit 2"
          }
        ]
      }
    ]
  }
}`,
  keyPoints: ["4b + 4c in one file", "allow / deny under permissions", "PostToolUse hook, Edit|Write", "exit 2 sends the failure to Claude", "settings.local.json = only you"],
  notes: "Reference slide: this is what .claude/settings.json looks like once 4b and 4c are both done, so participants can compare their own file with it (the Example prompt button copies the whole file). Walk through it top to bottom: permissions.allow lets npm run validate run without a question; permissions.deny blocks git push, npm run reset and edits to the fixtures, even when asked; the PostToolUse hook runs after every Edit or Write. The command's >&2 || exit 2 is the trick: when validate fails, exit code 2 sends the error back to Claude, which then fixes it itself (that's what they saw in 4c). This file is shared with the team through git; personal rules go in .claude/settings.local.json. After changing it, restart Claude and check with /permissions and /hooks."
},

{ // Slide 70
  title: "Goals: tell Claude when it's done",
  kicker: "DAY 1 · PART 4 · GOALS",
  subtitle: "Your “done when”, turned into a command Claude keeps working towards.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: 'tagline', text: 'checkable', tone: 'orange' }] },
  cards: [
    { title: "Set a goal", body: "/goal the list sorts A–Z and npm run validate passes" },
    { title: "What happens", body: "Claude keeps working, turn after turn. After each turn a small, fast model checks: is the goal met yet?" },
    { title: "Check or stop it", body: "/goal on its own shows the status.\n/goal clear stops it.\nIt clears itself once the goal is met." },
    { title: "Good goal, bad goal", body: "Good: “npm run validate passes and the button sorts the list.”\nBad: “make the page nicer.”" }
  ],
  tagline: "A goal is only as good as its check: write something checkable.",
  keyPoints: ["/goal = a “done when” that keeps running", "A small model checks after every turn", "/goal shows status, /goal clear stops", "Vague goal = endless or wrong work", "Still test the result yourself"],
  notes: "Connect this to Assignment 4a: they already wrote a “done when” list before prompting. A goal is that list as a command: Claude keeps going on its own until it's met. After each turn a small, fast model reads the conversation and decides whether the condition holds; when it does, the goal clears itself. /goal with nothing after it shows the status, /goal clear stops it. The lesson is the bad example: “make the page nicer” can never be checked, so Claude either stops too early or keeps going. A good goal names something a test or a person can verify. A met goal is still not your approval: they test the result afterwards, as always. Optional block, like 4a–4c: skip it if Day 1 runs late."
},

{ // Slide 71
  title: "Assignment 4d: Let Claude run to a goal",
  kicker: "DAY 1 · ASSIGNMENT 4d",
  subtitle: "Your house rules and your hook stay on. Claude works on its own until the goal is met.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Still active", body: "4b: push, reset and fixtures are blocked\n4c: validate runs after every edit\nnew: one goal for one feature" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Type: /goal the Glossary page has a sort A–Z button and npm run validate passes",
    "Don't steer. Watch: when does the hook run? When does the goal clear?",
    "Type /goal while it runs, and read the status.",
    "When it's done, test the button in the browser yourself.",
    "Bonus: ask Claude to push your work. Your rule from 4b still blocks it."
  ],
  expected: "The goal cleared by itself, validate ran after every edit, and the button works when you test it.",
  prompt: "/goal the Glossary page has a sort A–Z button and npm run validate passes",
  keyPoints: ["Given goal, one line", "Don't steer: watch it work", "Hook from 4c fires after edits", "/goal shows the status", "Goal met ≠ approved: test by hand"],
  notes: "The first time Claude really works on its own for a while, but inside the fences they built in 4b and 4c. That's the point to name out loud: autonomy is safe because the rules and the check are already in place. The goal is given word for word (Example prompt panel). While it runs, point at the validate output after each edit: that's their hook. Typing /goal mid-run shows the status. When the goal clears, they still test the button by hand; the goal being met is not their approval. The bonus shows the deny rule holds even while Claude runs on its own."
},

{ // Slide 72
  title: "Assignment 4e: Write your own goal",
  kicker: "DAY 1 · ASSIGNMENT 4e",
  subtitle: "Your search only knows the glossary. Now search the Library, from a goal you write yourself.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your goal must say", body: "which page gets a search bar\nwhat it searches (title, explanation, sources?)\nwhat happens with no results\nwhich check proves it works" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Write your own /goal for a search bar on the Library page. No given prompt this time.",
    "Read it to your partner: could a test check it? If not, sharpen it.",
    "Run it. Your hook keeps checking every edit.",
    "When the goal clears, test it yourself: a hit and a miss.",
    "Compare with your partner: whose goal gave the better result, and why?"
  ],
  expected: "The Library page has a working search, built from a goal you wrote yourself, and you tested it by hand.",
  keyPoints: ["Own goal, no given prompt", "Partner check: is it checkable?", "Hook keeps running", "Test a hit and a miss", "Compare goals, not just results"],
  notes: "Last step down the ladder for this block: they write the goal themselves. The partner check is the learning moment: “add search to the library” is too vague; “the Library page has a search bar that filters concept cards by title and explanation, shows No cards found when nothing matches, and npm run validate passes” is a goal a model can check. They can reuse their “done when” list from 4a as a starting point. When the goal clears, they still test by hand. Close by collecting one good and one weak goal from the room and saying why the good one worked."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 73
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

{ // Slide 74
  title: "Day 1 recap",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Today you:",
  type: "recap",
  visual: { badges: ['🧠', '🤖', '🔍', '✅', '🃏', '🔒', '👤'], bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'reusable skill', tone: 'orange' }] },
  cards: [
    { title: "Learned the AI foundations", body: "" },
    { title: "Used Claude Code as an agentic tool", body: "" },
    { title: "Explored an unfamiliar repository", body: "" },
    { title: "Made and validated small changes", body: "" },
    { title: "Created the first concept card", body: "" },
    { title: "Set rules Claude can't ignore", body: "" },
    { title: "Applied human review", body: "" }
  ],
  tagline: "Tomorrow: turn the repeated method into a reusable skill and use it to build the rest of the Library.",
  keyPoints: ["Preview only","Don't explain skills, MCP, bounded work","Day 2 covers those","End on the tagline"],
  notes: "Preview only — do not explain skills, MCP or bounded agentic work in depth tonight, that's Day 2's entire structure. End on the tagline, not on details."
},

/* ==========================================================================
   TEACHING DAY 2 — Reusable methods, agentic work and connected context
   ========================================================================== */

{ // Slide 75
  title: "Reusable and connected AI workflows",
  kicker: "TEACHING DAY 2",
  subtitle: "From one concept card to a repeatable method.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Warm-up', 'Recap', 'AetherBOT', 'Skills', 'Bounded work', 'Game', 'MCP', 'Workflow'] },
  cards: [
    { title: "What we're doing", body: "Turning yesterday's method into something reusable, bounded and connected." },
    { title: "Today", body: "AetherBOT, skills, bounded agentic work, the learning game, approved connections and a workflow." }
  ],
  keyPoints: ["Short re-welcome","Point at the day's shape","Each part adds one new idea","Warm-up first: avatar via LibreChat","Then the retrieval check"],
  notes: "Short re-welcome — most of the room was here yesterday, so this can be brief. Point at the day's shape and say that each part adds exactly one new idea on top of the last: AetherBOT puts yesterday's pieces together (CLAUDE.md guides, settings enforce, a goal says when it's done) → skills make a method reusable → bounded work lets a skill run on its own towards a goal → the game adds a skill that checks instead of creates → MCP brings in data from outside → a workflow chains skills, tools and a human checkpoint. The warm-up comes first: make your avatar in LibreChat and let Claude Code put it on your profile — then the retrieval check."
},

{ // Slide 76
  title: "Built with AI: Stekkie",
  hidden: true, // hidden for now (press H on it, or use Chapters, to show it again)
  kicker: "DAY 2 · SHOW & TELL",
  subtitle: "Constance's own AI garden coach — vibe coded, live at app.stekkie.ai.",
  type: "context",
  visual: { opener: 'showcase', image: 'assets/stekkie.webp', imageLink: 'app.stekkie.ai', stagger: 'pop', compact: true, stepThrough: true },
  cards: [
    { title: "Constance's idea", body: "Constance loves gardening, so she built Stekkie: her own AI garden coach." },
    { title: "What Stekkie helps with", body: "Sowing, harvesting, the weather, and spotting what's wrong with a plant from a photo. Plus a map of her garden, her planter beds and a garden logbook." },
    { title: "Built with AI", body: "Made by describing what she wanted, without a traditional development team. Live, with real users and real bugs to fix." }
  ],
  tagline: "Vibe coding gets you a working app. Today is about making it reliable.",
  keyPoints: ["Constance's project: she loves gardening", "Let Constance show it, 3 to 5 minutes", "One flow end to end", "Land it: trust needs today's material", "Site fails: tell the story with the image"],
  notes: "Stekkie is Constance's project: she loves gardening and built Stekkie, her own AI garden coach, by describing what she wanted to AI. If Constance is in the room, let her show it herself (app.stekkie.ai), 3 to 5 minutes, one flow end to end. The app's own start screen says it helps with sowing, harvesting, the weather and plant diagnosis from a photo. What you can see in its menu: a dashboard, Mijn Tuin (draw a map of your garden: grass, soil, tiles, paths, water, decking), Bakken (planter beds), Logboek (a garden logbook), Seizoen (the seasons) and a community page, plus the local weather and a chat helper. If you present it without her, stick to what the screen shows and ask the room what they would build for their own hobby. Then land the tagline: vibe coding got this app live, but what makes it trustworthy is exactly today's material: context, repeatable methods, bounded work and checks. If the site or wifi fails, stay on this slide and tell the story with the image."
},

{ // Slide 77
  title: "Make your avatar in LibreChat",
  kicker: "DAY 2 · WARM-UP · LIBRECHAT",
  subtitle: "Let LibreChat create a picture of you: from your profile, or something funny.",
  type: "practice",
  layout: "exercise",
  visual: { cardImages: ['assets/avatars/avatar-cartoon.webp', 'assets/avatars/avatar-superhero.webp', 'assets/avatars/avatar-jipjanneke.webp'] },
  cards: [
    { title: "Cartoon", body: "" },
    { title: "Superhero", body: "" },
    { title: "Jip and Janneke", body: "" }
  ],
  steps: [
    "Open LibreChat and start a new chat.",
    "Paste your profile text, or describe something funny.",
    "Ask for a square image: plain background, no text.",
    "Download the one you like best."
  ],
  expected: "A square picture of you, saved on your laptop, ready for Claude Code.",
  prompt: "From my profile:\nCreate a square cartoon avatar of me based on this profile: [paste your profile text]. Make it fun, plain background, no text.\n\nCartoon:\nCreate a square cartoon avatar of me as an action figure: [describe yourself — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, no text.\n\nSuperhero:\nCreate a square comic-book superhero portrait of me: [describe yourself]. Cape, city skyline at night, no text.\n\nJip and Janneke:\nCreate a square avatar of me as a Dutch Jip and Janneke silhouette: black on a plain coloured background. [describe yourself]. No text.",
  keyPoints: ["Fun warm-up, keep the energy high", "Profile text or something funny", "No real photo, nothing confidential", "Example prompts: Example prompt button", "Check everyone downloaded the file"],
  notes: "Warm-up, keep the energy high: this is meant to be fun. Everyone makes a picture of themselves in LibreChat: paste the profile text they wrote yesterday (the Profiles page), or describe something funny. No real photo and nothing confidential. The Example prompt button has four starting prompts: from your profile, cartoon, superhero and Jip and Janneke (a well-known Dutch children's-book style by Fiep Westendorp, black silhouettes; explain it in one sentence for non-Dutch participants). The three thumbnails are AetherBOT made with these same prompts, proof that they work. Make sure everyone has actually downloaded the file before moving on: the next slide gives it to Claude Code."
},

{ // Slide 78
  title: "Put your avatar in your profile",
  kicker: "DAY 2 · WARM-UP · CLAUDE CODE",
  subtitle: "Give the picture to Claude Code and let it add it to your profile card.",
  type: "practice",
  layout: "exercise",
  visual: { shot: 'assets/examples/profile-card.png', shotLabel: 'Your picture goes where the initials (JT) are' },
  cards: [
    { title: "Your profile", body: "photo\nname\nrole\nlearning goal" }
  ],
  steps: [
    "Put the picture in your project, in public/avatars/.",
    "Ask Claude Code to show it on your profile card.",
    "Plan first. Profiles without a picture keep their initials.",
    "Check both in the browser. Don't commit your picture."
  ],
  expected: "Your profile card shows your picture; profiles without one still show initials.",
  prompt: "I put my picture in public/avatars/[file name]. Show it on my profile card on the Profiles page. Profiles without a picture should keep showing initials. Plan first and show me the plan before you change anything.",
  keyPoints: ["LibreChat made it, Claude Code places it", "Picture into public/avatars/ first", "Plan first, initials as fallback", "Test a profile without a picture", "Keep it local: don't commit it"],
  notes: "The hand-off: LibreChat made the picture, Claude Code puts it in the app. First make sure everyone has moved the downloaded file into their project, in public/avatars/. Then it is the working method in miniature: Claude explores how profiles are shown, plans an optional picture per profile with initials when there is none, waits for approval, builds it, and they check both cases in the browser. The fallback to initials is the part people forget. The picture stays local: don't commit it to a public repository. Watch for participants who let Claude edit without showing a plan first. The Example prompt button has a starting prompt."
},

{ // Slide 79
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

{ // Slide 80
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
  notes: "This is the map for the whole day. Yesterday was levels 1 and 2, with a first step into 3 (house rules, the validate hook, goals). Part 1 is level 3: AetherBOT, built from CLAUDE.md, permissions, the hook and a goal. Part 2 is level 3 too: skills. Parts 3–5 are level 4: the skill runs on its own towards a goal, a second skill checks the game, and MCP plus a workflow connect it to the outside. Point forward to today's parts as you introduce each level."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 1: Context, CLAUDE.md and AetherBOT                        */
/* ---------------------------------------------------------------------- */

{ // Slide 81
  title: "Assignment 5: Design and build a feature",
  hidden: true, // folded into AetherBOT: the bot is the feature this group designs and builds (press H or use Chapters to show it again)
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
  notes: "Four rounds. (1) Everyone switches to plan mode (Shift+Tab until it shows Plan) and asks Claude for five feature ideas for their Aether Library; Claude explores the project and proposes, but changes nothing. (2) Each person shares their best idea in one sentence. (3) The room picks three to five and you write them on the board. (4) Everyone builds one of the picked features with the working method: plan, approve, build, check in the browser. Good fits if the room needs a nudge: a theme switcher with 3+ palettes that survives a reload, search on the Glossary page, a “term of the day”. The skill practised is describing what you want to SEE, not what code to write; encourage small rounds (change, look, adjust). Watch for changes that touch the data files (only app code should change) and for features that break another page.",
},

{ // Slide 82
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

{ // Slide 83
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
  keyPoints: ["Tagline matters as much as contents","Not a prompt landfill","Not access control either","Point to the seed CLAUDE.md","Next slide: where it sits among the rest"],
  notes: "The tagline matters as much as the contents list — CLAUDE.md is deliberately not a prompt landfill, and it isn't an access-control mechanism either. Yesterday's 4a ended with checking whether CLAUDE.md still described the project; today they write the parts that matter themselves. Point participants to their seed CLAUDE.md now. The next slide puts CLAUDE.md next to everything else they've met, so the question 'where does this rule go?' has an answer."
},

{ // Slide 84
  title: "How the pieces fit",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Some pieces guide Claude, some enforce, some drive and connect. Today you use all of them.",
  type: "concept",
  layout: "compare",
  visual: { highlight: [{ in: 'tagline', text: 'enforce', tone: 'orange' }] },
  columns: [
    { title: "Guide: Claude is asked", items: [
      "Prompt: this one task",
      "CLAUDE.md: every session in this project",
      "Skill: a method, loaded when the task matches"
    ] },
    { title: "Enforce: Claude Code decides", items: [
      "Permissions: allow, ask or deny, on every action",
      "Hook: a script that runs at a fixed moment",
      "Both live in .claude/settings.json"
    ] },
    { title: "Drive and connect", items: [
      "/goal: keep working until this is true",
      "MCP: approved tools and data from outside",
      "Workflow: skills, tools and human checkpoints in order"
    ] }
  ],
  tagline: "Guidance can be forgotten. Settings enforce. A goal says when it's done.",
  keyPoints: ["One map for both days", "Guide = advisory, Claude can still miss it", "Enforce = code, not Claude's judgement", "Yesterday: prompt, permissions, hook, goal", "Today adds: CLAUDE.md, skill, MCP, workflow"],
  notes: "The map for the rest of the day; come back to it at every part. Left column: guidance. A prompt, CLAUDE.md and a skill all end up as text Claude reads, so Claude can still miss or misread them; they differ in when they apply (this task, every session, when a task matches the skill's description). Middle column: enforcement. Permissions and hooks are checked by Claude Code itself, not by Claude's judgement: a denied command is blocked even if Claude wants to run it, and a hook runs whether Claude remembers it or not. That's yesterday's 4b and 4c. Right column: what drives and connects the work. /goal (yesterday's 4d) keeps Claude going until a small model judges the condition met. MCP adds tools and data from outside the repository, and permissions still apply to those tools. A workflow puts skills, tools and human checkpoints in order. For this group, the question to ask out loud: 'AetherBOT must never change the glossary. Which column does that rule belong in?' Answer: both. CLAUDE.md explains why, an ask or deny rule makes sure. Then: AetherBOT is where they use the first two columns and /goal together."
},

{ // Slide 85
  title: "Meet AetherBOT",
  kicker: "DAY 2 · PART 1 · CONTEXT AND CLAUDE.MD",
  subtitle: "Next, you add a chatbot to your Aether Library.",
  type: "context",
  visual: { stepThrough: true, bot: 'wave', place: 'under' },
  cards: [
    { title: "What it is", body: "A chatbot in your Aether Library that answers questions about AI terms." },
    { title: "Where its answers come from", body: "Your glossary and concept cards: only what you have built so far." },
    { title: "How it works", body: "Plain code in the app, no AI model inside. No API keys, nothing leaves your laptop." },
    { title: "How you build it", body: "CLAUDE.md guides Claude.\nsettings.json protects your data.\n/goal says when it's done." }
  ],
  tagline: "You design it first. Then Claude Code builds it.",
  keyPoints: ["AetherBOT doesn't exist yet: they build it", "Answers only from glossary and cards", "Plain code, no AI model, no API keys", "The rules are for Claude Code, not the bot", "Design first (A6), then build (A7)"],
  notes: "Introduce the chatbot before anyone designs or builds it: the Aether Library gets a chatbot called AetherBOT that answers questions about AI terms. Its answers come only from the glossary and concept cards the participant has built so far, so it grows with their Library. Make the third point explicit: it is plain code in the app, no AI model inside, no API keys, nothing leaves the laptop (the same rule as the rest of the app); Claude Code builds it, the bot itself doesn't call an AI. That's also the trap to name: CLAUDE.md, the permissions and the goal are rules for Claude Code while it builds the bot, not settings inside the bot. The bot only behaves well if Claude Code turns those rules into code. The fourth card is the whole of yesterday in one build: the guide and enforce columns from the last slide, plus a goal. Then the plan for the next hour: Assignment 6 designs it (CLAUDE.md plus one permission rule), a fresh session tests that design, Assignment 7 builds it towards a goal, and partners try to break each other's bot."
},

{ // Slide 86
  title: "Assignment 6: Design AetherBOT",
  kicker: "DAY 2 · ASSIGNMENT 6",
  subtitle: "You decide what goes in. Claude writes it. You check it and own it.",
  type: "practice",
  visual: { mdfile: 0 },
  layout: "exercise",
  cards: [
    { title: "In CLAUDE.md", body: "what AetherBOT is for\nwhere its answers come from\nits tone of voice\nyour 3 rules\nhow to test it" },
    { title: "In settings.json", body: "\"ask\": [\"Edit(data/**)\"]\nClaude must ask before it changes your data" }
  ],
  steps: [
    "Your own notes: purpose, data (glossary and cards), tone, 3 rules.",
    "Sort it three ways: CLAUDE.md, settings.json or your prompt?",
    "Plan mode: let Claude write the lasting parts into CLAUDE.md.",
    "Read it: delete anything you didn't decide. Change one line yourself.",
    "Add the ask rule for data/ to .claude/settings.json. Check /permissions."
  ],
  expected: "A short CLAUDE.md with only what you decided, and an ask rule that stops Claude from changing your data without asking.",
  keyPoints: ["They decide, Claude writes, they own it", "Rough notes first: purpose, data, tone, 3 rules", "CLAUDE.md = always true; settings = must hold; prompt = this task", "Delete anything they didn't decide", "Ask rule on data/: check /permissions"],
  notes: "This is where the room applies the Sources of context slide and the How the pieces fit map to something of their own: they decide what goes in, Claude writes it, they check it and own it. Step 1 is the real exercise: rough notes in their own words (in the prompt or on paper) on what AetherBOT is for, its data (the glossary and concept cards, nothing else), its tone of voice (friendly teacher, short and to the point, playful…) and 3 rules. Good rules to steer towards: answer only from the glossary and cards, say OPEN when unsure, name the source card, refuse off-topic questions, never repeat personal profile details. Step 2 sorts three ways: what is always true for this project (purpose, data, tone, rules, how to test a change to the bot) goes into CLAUDE.md; what must hold even if Claude forgets goes into settings.json (Claude must ask before it edits anything in data/); the task itself (build it now, where it appears) stays in the prompt for Assignment 7. Step 3 in plan mode, so they see the change before it's written. Step 4 matters most: Claude tends to add rules nobody decided and to make the file long, and a long CLAUDE.md is weaker. Anything they didn't decide gets deleted, and they edit one line by hand, so they know it's just a text file they own. Step 5 is yesterday's 4b again, one level up: they add an ask rule, Edit(data/**), next to their existing allow and deny rules in .claude/settings.json (an ask rule shows up as an approval prompt every time Claude wants to edit a file in data/; their deny rule on data/fixtures/ still wins, because deny beats ask). /permissions should list it; if not, restart Claude in the project folder. Why ask and not deny: Assignments 9 and 10 write concept cards into data/ on purpose, and the ask rule turns that into a human approval point instead of blocking it. CLAUDE.md says why the bot never changes data; the ask rule makes sure Claude can't do it silently. Show the difference: good, “AetherBOT answers only from data/glossary.json and data/concept-cards.json. If the answer isn't there, it says OPEN.”; too vague, “AetherBOT should be helpful and accurate.” (can't be checked); doesn't belong, “Today: build the chat window and add a quiz command.” (a task, so it goes in the prompt). Tip for later: in a new project, /init writes a first CLAUDE.md from the repo; same rule, read it, delete what isn't true, add what only you know. Nothing is built yet: that's the next assignment.",
},

{ // Slide 87
  title: "Fresh-session test",
  kicker: "DAY 2 · ASSIGNMENT 6 · REVIEW",
  subtitle: "Start a fresh Claude Code session.",
  type: "review",
  tagline: "Type /clear — your files stay. Your neighbour asks the six questions and decides.",
  visual: { lineReveal: 0, stamps: ['PASS', 'REVISE', 'OPEN'], swap: true, highlight: [{ in: 'tagline', text: '/clear', tone: 'orange' }] },
  cards: [
    { title: "Can Claude determine", body: "what AetherBOT is for\nwhich data it may answer from\nwhat it does when it doesn't know\nwhat it must never reveal\nhow to test a change to the bot\nand: does it ask before editing data/?" }
  ],
  check: "Decision: PASS, REVISE or OPEN",
  keyPoints: ["No laptop swap","Everyone types /clear","Neighbour on right asks six questions","Question 6: ask rule, say no","Wrong answer = missing rule"],
  notes: "No laptop swap. Everyone types /clear in their own session — the files stay, the conversation is gone. The neighbour on their right then asks the first five questions and decides PASS, REVISE or OPEN. If Claude can answer from CLAUDE.md alone, the instructions work — the single most convincing proof of the morning. Anything Claude got wrong is a rule missing from the file. Question 6 is a different kind of test: ask Claude to add a test term to data/glossary.json. Claude Code must stop and ask for approval (the ask rule from Assignment 6); they answer no. That's the difference from the map, felt in practice: questions 1–5 test what Claude remembers, the approval prompt is enforced whatever Claude remembers."
},

{ // Slide 88
  title: "Assignment 7: Build AetherBOT",
  kicker: "DAY 2 · ASSIGNMENT 7",
  subtitle: "Let Claude Code build the chatbot from your CLAUDE.md, without repeating the rules in your prompt.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a chatbot in your Library\nanswers from your glossary and cards\nfollows your CLAUDE.md rules\n1–2 commands of your own" },
    { title: "Still on", body: "ask rule: data/ untouched\nhook: validate after edits\nnew: a goal for done" }
  ],
  steps: [
    "Plan mode: plan AetherBOT from CLAUDE.md. Don't paste the rules.",
    "Write a goal you can check, e.g. the one under Example prompt.",
    "Approve the plan, set the /goal, then watch. Don't steer.",
    "Add 1–2 commands of your own, like “quiz me”.",
    "Test it yourself: questions that should break a rule."
  ],
  expected: "A chatbot in your Library that answers from your glossary and cards, follows your rules, says OPEN instead of guessing, and never changed your data.",
  prompt: "/goal AetherBOT is on the Library page, answers a question about a term from data/glossary.json, says OPEN for a term that isn't there, refuses an off-topic question, nothing in data/ changed, and npm run validate passes",
  keyPoints: ["Everything from yesterday in one build", "Don't paste the rules: Claude reads CLAUDE.md", "Plan first, then /goal", "Hook runs, ask rule holds, goal clears", "Goal met ≠ approved: break it yourself"],
  notes: "The payoff of Assignment 6, and all of yesterday in one build: CLAUDE.md guides, the ask rule and the validate hook enforce, and a goal says when it's done. Participants ask Claude Code to plan AetherBOT and do NOT repeat the rules in their prompt; Claude reads them from CLAUDE.md. If someone pastes the rules in anyway, ask them to delete that and try again. A good plan says where the chat appears in the app and how it finds answers (matching the question to glossary terms and concept cards), and keeps it plain code with no AI model or API. Then the goal: the Example prompt is a checkable one, built from their own rules; strong participants write their own (yesterday's 4e). Every part of it can be checked: a page, an answer, an OPEN, a refusal, untouched data, a passing command. While it runs, point at the validate output after each edit (their 4c hook). If Claude tries to write to data/, the ask rule stops it and they answer no: the bot reads data, it never writes it. The goal clearing is not approval: the last step is them trying to break it by hand, and the partner round after this does it again. Commands are things like “quiz me” or “compare X and Y”; call them commands, not skills, because Claude Code skills come after the break. When a rule fails, the question is: is the code wrong, or is the rule unclear in CLAUDE.md? Watch for a command with no test, and for rules that only exist in CLAUDE.md but never made it into the code."
},

{ // Slide 89
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

{ // Slide 90
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

{ // Slide 91
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

{ // Slide 92
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

{ // Slide 93
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
  notes: "This discussion creates the need for a reusable method — collect two or three genuinely different outcomes from the room out loud before moving to slide 97, the contrast is the point."
},

{ // Slide 94
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

{ // Slide 95
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
  keyPoints: ["Three mechanisms, three jobs","The guide column of the map, zoomed in","Assignment 9 builds this distinction","Point back here during work"],
  notes: "This is the guide column of the How the pieces fit map, zoomed in: all three are text Claude reads, they differ in when they apply. A prompt is this task, CLAUDE.md is every session, a skill is loaded when a task matches its description. None of them enforces anything; that stays in settings.json, as AetherBOT showed this morning. This is the exact distinction Assignment 9 asks participants to build — point back to it once the room starts working."
},

{ // Slide 96
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

{ // Slide 97
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

{ // Slide 98
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

{ // Slide 99
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

{ // Slide 100
  title: "Bounded autonomy",
  kicker: "DAY 2 · PART 3 · BOUNDED AGENTIC WORK",
  subtitle: "One goal, many steps — inside a fence.",
  type: "concept",
  visual: { fence: 1 },
  cards: [
    { title: "Definition", body: "Claude Code can perform several steps after receiving one goal." },
    { title: "Boundaries define", body: "what it may read\nwhat it may change\nwhich checks it must run\nwhen it must stop\nwhich decisions remain human" }
  ],
  keyPoints: ["Assignment 10 applies this next","Skill = the method, goal = when it's done","Settings = the fence","One instruction, many terms","Bounded by explicit stop conditions"],
  notes: "This is the concept Assignment 10 puts into practice immediately — a single instruction that processes many terms, still bounded by explicit stop conditions. Name the three pieces they already have: the skill is the method for each term, a /goal says when the whole run is done (yesterday's 4d, used on AetherBOT this morning), and settings.json is the fence: the ask rule on data/ means every card write still needs their approval, the validate hook checks every edit, and the deny rules from 4b still block push and reset. Map the 'Boundaries define' card onto that: what it may read and change (permissions), which checks it must run (the hook), when it must stop (the goal, or OPEN), which decisions remain human (the ask rule)."
},

{ // Slide 101
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
    "Set a /goal: every new term has a card marked READY, REVISE or OPEN.",
    "Let the skill run term by term. Approve each card write.",
    "Invent nothing. Commit nothing."
  ],
  expected: "Draft concept cards for all suitable terms, plus a status report ready for human review.",
  stepsHeading: "Steps:",
  prompt: "/goal every term I added today has a concept card made with the create-concept-card skill, each card is marked READY, REVISE or OPEN, a summary lists the status per term, and npm run validate passes",
  keyPoints: ["Skill + goal + fence","Per term: READY, REVISE or OPEN","Approve each card write (ask rule)","Circulate, check runs stop and report","Watch for guesses instead of OPEN"],
  notes: "Per term the skill reads the glossary entry, checks whether information and sources are sufficient, creates the card, validates the required fields and records READY, REVISE or OPEN. New compared to Assignment 9: they don't prompt term by term, they set one goal (Example prompt) and let Claude work through the list on its own. The fence is the one from this morning: the ask rule on data/ makes every card write an approval prompt, the validate hook runs after every edit, and the deny rules still block push and reset. That's bounded autonomy in one sentence: the skill is the method, the goal is the finish line, the settings are the fence, and the approvals keep the human in charge. Low infra-risk since participants build and run it themselves; your job is circulating and checking each run actually stops to report rather than committing unattended. Watch especially for terms it should have marked OPEN instead of guessing, and for people who approve every write without reading it.",
},

{ // Slide 102
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
  notes: "This is the agent loop from slide 39, now made concrete in the exact assignment the room is running. Point at the last step: 'Repeat or stop' is where the goal comes in. After each turn a small model checks whether the goal is met; if not, Claude takes the next term. Check is the validate hook, and 'request human input' is the ask rule on data/. Use it as a live diagnostic while circulating: ask a stuck participant which of these five steps their session is stuck on."
},

{ // Slide 103
  title: "Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with the Explain It Back learning game." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Two big assignments follow","Reset your own energy"],
  notes: "State the actual clock time you'll resume. The afternoon's remaining assignments (11 to 13: the game, MCP and the workflow) are the most substantial of the whole programme — use this break to reset your own energy too."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 4: Learning game                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 104
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
  notes: "This is the payoff of Parts 2–3 — every card the room built now feeds this game. Say that connection explicitly before moving to the starter state. Then name the one new idea of this part: so far their skill created things (cards); the skill they build here checks things (an explanation against a checklist). Same mechanism, different job: a skill can be the reviewer, not only the maker."
},

{ // Slide 105
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

{ // Slide 106 (shown before 64: explains checklist.md + categories first)
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
  notes: "checklist.md lives at the repo root, separate from the skill file — it's participant- and class-authored, and people may edit or extend it. This is deliberately the same pattern as create-concept-card (Skill #1): the reusable method stays generic, the specific criteria live in their own file. The difference: Skill #1 makes something, Skill #2 judges something. For this group, link it to the map: checklist.md plays the role for the game that npm run validate plays for the code, a check outside Claude's own opinion. Say explicitly that this is required behaviour for Assignment 11, not an optional extra — there is no separate 'AI Concept Coach' assignment; this is it."
},

{ // Slide 107 (now after 65)
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
    "Part C: say the phrase on the right."
  ],
  expected: "The game gives feedback from your own Claude Code session. No API key, no database.",
  stepsHeading: "Steps:",
  keyPoints: ["Full 60 minutes, don't rush","A: checklist.md with four ratings","B: term-checker reads checklist.md","C: say the exact phrase","No rebuild, no API keys, no database"],
  notes: "Longest single assignment of the two days; give it the full 60 minutes and don't rush the wrap-up. Part A: propose what a good “explain this term back” answer contains, based on the approved concept cards, including the four rating categories (Strong explanation, Partially complete, Review this concept, Unable to evaluate); write it to checklist.md once approved. Part B: create .claude/skills/term-checker/SKILL.md; it reads checklist.md (never hardcoded criteria) and the latest submission, compares against the matching concept card and writes structured feedback. Part C: say the exact phrase “Check my latest submission using the term-checker skill.” Do NOT let anyone rebuild the game itself; it already works. Protect this: no API keys, no external model calls, no database; feedback comes entirely from the participant's own Claude Code session reading and writing local files. Watch for people who skip Part C because time is short.",
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 5: MCP and workplace systems                              */
/* ---------------------------------------------------------------------- */

{ // Slide 108
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
  notes: "Say the tagline explicitly and connect it back to the working agreement (slide 42) — being connected to something is not the same as being allowed to change it. On the How the pieces fit map, MCP sits in the right column: it adds tools, but the middle column still applies to them. An MCP tool goes through the same allow, ask and deny rules as a file edit or a command, so a read-only tool can be allowed and anything that writes can be ask or deny."
},

{ // Slide 109
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
  notes: "Keep this distinction crisp: everything the room has done since slide 58 used only built-in file tools. MCP is what's new starting with this part."
},

{ // Slide 110
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

{ // Slide 111
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

{ // Slide 112
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

{ // Slide 113
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
  notes: "Three minutes, no more. The room has built two single-method skills (create-concept-card, term-checker). A workflow combines several of them, plus a tool connection (MCP), in a fixed order with a human checkpoint. Each step still keeps its own boundaries and stop conditions, and the agent loop from the working method happens inside each step. In practice the workflow can live in one top-level skill (for example day-start) that lists the steps in order, or in a short instruction file that names the skills. Say plainly: this is the same pattern as the Aether Library, pointed at real work — source, structured output, validation, human approval. Close the map: a workflow is the right column putting everything together. Skills from the guide column, permissions from the enforce column (read-only on Jira), MCP for the data, and a human checkpoint at the end. Nothing new to learn, only the order. The assignment follows immediately."
},

{ // Slide 114
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

{ // Slide 115
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

{ // Slide 116
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
    { label: "AetherBOT, built from your CLAUDE.md, an ask rule and a goal" },
    { label: "Reusable create-concept-card and term-checker skills" },
    { label: "Bounded multi-card agentic run" },
    { label: "Explain It Back learning game, with real AI feedback" },
    { label: "Approved Jira connection and a day-start workflow" }
  ],
  keyPoints: ["Items appear on their own","No clicking needed","Don't talk over them","Let the room recognise its work"],
  notes: "The items appear on their own, one by one — no clicking needed. Let them come in without talking over them, and let the room recognise their own two days of work in the list."
},

{ // Slide 117
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
    { label: "Tell what guides Claude (prompt, CLAUDE.md, skill) from what enforces (permissions, hooks)." },
    { label: "Set a checkable goal and chain skills into a workflow." },
    { label: "Recognise bounded agentic behaviour." },
    { label: "Explain what MCP provides." },
    { label: "Preserve human review and handoff." }
  ],
  keyPoints: ["Understanding checklist, not artefact list","Name the distinction out loud","How Claude Code works, why boundaries matter"],
  notes: "This is the understanding checklist, not the artefact checklist (that was the previous slide) — the distinction is worth naming out loud. The second and third lines are the How the pieces fit map in two sentences; if there's time, ask someone to place one rule from their own work in the right column."
},

{ // Slide 118
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
  notes: "Preview only, matching the Day 1 recap's pattern — this is a different facilitator's territory starting next time, don't get pulled into detail questions here."
},

{ // Slide 119
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

{ // Slide 120
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

{ // Slide 121
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
