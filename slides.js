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
    { title: "What you share", body: "Practice data only: no Worldline or customer data\nNo passwords, API keys or internal documents\nNothing personal on GitHub: the practice repo is public\nPush only to your own repo on Worldline's GitLab" }
  ],
  tagline: "Not even to try.",
  keyPoints: ["Say each line out loud","Practice data only","No passwords, keys or internal documents","Practice repo is public; push only to your own GitLab repo"],
  notes: "From now on everyone works on their own laptop, so say these out loud, once. Practice data only: no Worldline data and no customer data. No passwords, API keys or internal documents. The practice repo is public, so nothing personal goes on GitHub: no real photos, contact details or confidential text. Push only to your own repo on Worldline's GitLab: that is where your game lives this afternoon. Not even to try anywhere else."
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
    { title: "Back at 13:00", body: "We continue with permissions and your own game." }
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
  notes: "Open with the question: Claude Code works on your real files and your real terminal, so who decides what it may do? You do. Permissions: reading and looking around is low risk, but before it edits a file or runs a command it stops and asks. You answer yes (just this once), yes and don't ask again for this kind of action, or no (and tell it what to do instead). Link back to the terminal slide: you don't need to know every command, but you must understand what you approve. Standing rules (always allow the tests, never touch this folder) live in the settings; /permissions shows them. Modes: the current mode shows at the bottom of Claude Code and Shift+Tab switches between them. Normal asks before each edit or command, which is best while learning. Accept edits lets file edits through without asking, while other actions still ask. Plan mode is read-only: Claude explores and comes back with a plan, and nothing changes until you approve it. Auto mode, if your setup has it, runs without asking each time, but risky actions are still checked and can be blocked. There is also a skip-all-permissions option for automated setups; mention that it exists and that we don't use it. Click to open the gate: this gate is you. Close on the tagline as the rule for both days: every assignment starts in plan mode, and changes only happen after you have read the plan. Optional story: when a hard-to-undo action such as deleting a repository is requested, Claude Code's safety check can block it even after a yes in chat, and the human has to run it themselves; that is permissions working as designed. Before class, open Claude Code on your teaching laptop and press Shift+Tab a few times, so the modes you name match what the room will see (they depend on the version and company settings)."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 4: Aether Game (afternoon)                                */
/* ---------------------------------------------------------------------- */

{ // Slide 58
  title: "Aether Game",
  kicker: "DAY 1 · PART 4 · AETHER GAME",
  subtitle: "This afternoon you build your own game, in your own repo.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'the arcade', tone: 'orange' }] },
  cards: [
    { title: "Your own repo", body: "On Worldline's GitLab, in your personal space." },
    { title: "Snake", body: "Built in layers. No skills yet: just you and Claude Code." },
    { title: "Your avatar", body: "Your own face in the game, made in LibreChat." },
    { title: "Rules and goals", body: "Settings Claude can't ignore, and goals it works towards." }
  ],
  tagline: "Tomorrow your game joins the arcade.",
  keyPoints: ["Own repo on GitLab","Snake in layers, no skills yet","Avatar from LibreChat","Rules and goals","Tomorrow: the arcade"],
  notes: "This afternoon everyone builds their own game. First a repo of your own on Worldline's GitLab. Then Snake, built in layers, without skills: just you and Claude Code. Your own avatar goes into the game. And at the end you set rules Claude can't ignore and give it goals to work towards. Tomorrow every game joins the arcade, so keep it working."
},

{ // Slide 59
  title: "Model Context Protocol",
  kicker: "DAY 1 · PART 4 · MCP & GITLAB",
  subtitle: "One standard plug for approved connections.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'does not remove permissions or human responsibility', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "MCP standardises how AI applications connect to approved information and capabilities." },
    { title: "An MCP server may expose", body: "resources\nreusable prompts\ntools" }
  ],
  tagline: "Connecting a server does not remove permissions or human responsibility.",
  keyPoints: ["Say the tagline explicitly","Link to the working agreement","Connected is not allowed to change"],
  notes: "Say the tagline explicitly and connect it back to the working agreement (slide 42): being connected to something is not the same as being allowed to change it. An MCP tool goes through the same allow, ask and deny rules as a file edit or a command, so a read-only tool can be allowed and anything that writes can be ask or deny. Next: you connect GitLab yourself."
},

{ // Slide 60
  title: "Repository access and MCP",
  kicker: "DAY 1 · PART 4 · MCP & GITLAB",
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
  keyPoints: ["Keep the distinction crisp","So far: built-in file tools only","MCP is for everything outside","Next: connect GitLab"],
  notes: "Keep this distinction crisp: everything the room has done so far used Claude Code's built-in file tools on their own laptop. MCP is for everything outside: Jira, GitLab, Confluence. Next they connect GitLab and make a repo for their game there."
},

{ // Slide 61
  title: "Assignment 1: Your own game repo",
  kicker: "DAY 1 · ASSIGNMENT 1",
  subtitle: "Connect Claude Code to GitLab and make a repo for your game.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "You end up with", body: "GitLab connected to Claude Code\na new repo in your personal space\nthat repo on your laptop" }
  ],
  stepsHeading: "Do this:",
  steps: ["Add the GitLab MCP server. Your trainer gives you the command.", "Start claude, type /mcp and log in to GitLab.", "Ask Claude: “Which GitLab projects can you see?”", "Make a new repo for your game in your personal space: through Claude, or on the GitLab page.", "Clone it to your laptop and start claude inside it."],
  expected: "Claude Code can see GitLab, and your empty game repo is on your laptop.",
  prompt: "Create a new project called aether-game-[your name] in my personal GitLab space: private, with only a README. Show me what you will do before you do it.",
  keyPoints: ["MCP command: from the trainer","/mcp → log in","No GitLab access? Pair with a developer","Can't create through Claude? Use the GitLab page","Everyone ends inside their own empty repo"],
  notes: "Now the MCP from the previous slides becomes real. Everyone adds the GitLab MCP server (the trainer gives the command), starts claude, types /mcp and logs in. A first check: ask Claude which GitLab projects it can see. Then each person makes a new repo for the game in their personal space; if Claude can't create projects through the MCP, they use the GitLab page. Clone it and start claude inside it. Some managers may not have GitLab access yet: pair them with a developer, the same way people help each other connect MCP."
},

{ // Slide 62
  title: "Watch: Snake in layers",
  kicker: "DAY 1 · PART 4 · LIVE DEMO",
  subtitle: "One layer per prompt. Play it, then the next layer.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Skeleton", caption: "A grid and a snake that moves on its own." },
    { label: "Controls", caption: "The arrow keys steer the snake." },
    { label: "Food and score", caption: "Eat, grow, count your points." },
    { label: "Game over", caption: "Hit a wall or yourself: game over, play again." },
    { label: "Your style", caption: "Colours, sounds, your own touch." }
  ],
  tagline: "One prompt can build Snake. Layers let you steer it.",
  keyPoints: ["Build it live, layer by layer","Plan mode, read the plan, approve","Play after every layer","Show what goes wrong, and fix it","One prompt works, but you learn nothing"],
  notes: "Build it live on the projector, layer by layer. Each layer is one short prompt: plan mode, read the plan, approve, play. Skeleton, then controls, then food and score, then game over, then your own style. Show what goes wrong and how you steer it back. Say it out loud: one prompt can build Snake, but then you can't steer it and you learn nothing. Layers are how you work on real software too."
},

{ // Slide 63
  title: "Assignment 2: Build your Snake",
  kicker: "DAY 1 · ASSIGNMENT 2",
  subtitle: "Layer by layer, in your own repo. No skills yet.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Then make it yours", body: "a different character\na sound when you eat\nwalls or a maze" }
  ],
  stepsHeading: "Do this:",
  steps: ["In your game repo: type claude and switch to plan mode.", "Layer 1: ask for the skeleton. Read the plan, approve, play.", "Next layers: controls, food and score, game over. One prompt per layer, play after each.", "Ask for one small test in tests/: the snake grows when it eats (npm test).", "Make it yours: pick one from the box.", "Commit every layer that works."],
  expected: "A Snake you can play, built in layers, with one test that passes.",
  prompt: "Goal: the first layer of a Snake game in this repo: a page with a grid and a snake that moves on its own.\nContext: plain HTML, CSS and JavaScript, no frameworks. Controls, food and score come in later layers.\nConstraints: only this layer. Keep it small.\nDone when: I open the page and the snake moves.\nShow me the plan first.",
  keyPoints: ["One prompt per layer","Plan mode, then play","The test goes in tests/","Make it yours","Commit every working layer"],
  notes: "Now everyone builds their own. The Example prompt is layer 1 in the reliable-prompt form; the next layers they write themselves. One prompt per layer, play after each. The test matters for later: ask for one small test in tests/ that checks the snake grows when it eats, runnable with npm test. The hook and the goals this afternoon use it. Then make it theirs: a different character, a sound, walls or a maze. Commit every layer that works, so they can always go back."
},

{ // Slide 64
  title: "Assignment 3: Make your avatar in LibreChat",
  kicker: "DAY 1 · ASSIGNMENT 3",
  subtitle: "Let LibreChat create a picture of you: from your CLAUDE.md, or something funny.",
  type: "practice",
  layout: "exercise",
  visual: { cardImages: ['assets/avatars/avatar-cartoon.webp', 'assets/avatars/avatar-superhero.webp', 'assets/avatars/avatar-jipjanneke.webp'] },
  cards: [
    { title: "Cartoon", body: "" },
    { title: "Superhero", body: "" },
    { title: "Jip and Janneke", body: "" }
  ],
  steps: [
    "Open LibreChat and pick the image generator from the library.",
    "Paste the “who I am” lines from your CLAUDE.md, or describe something funny.",
    "Ask for a square image: plain background, no text.",
    "Download the one you like best."
  ],
  expected: "A square picture of you, saved on your laptop, ready for your game.",
  prompt: "From my profile:\nCreate a square cartoon avatar of me based on this: [paste the “who I am” lines from your CLAUDE.md]. Make it fun, plain background, no text.\n\nCartoon:\nCreate a square cartoon avatar of me as an action figure: [describe yourself — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, no text.\n\nSuperhero:\nCreate a square comic-book superhero portrait of me: [describe yourself]. Cape, city skyline at night, no text.\n\nJip and Janneke:\nCreate a square avatar of me as a Dutch Jip and Janneke silhouette: black on a plain coloured background. [describe yourself]. No text.",
  keyPoints: ["Fun warm-up, keep the energy high", "Profile text or something funny", "No real photo, nothing confidential", "Example prompts: Example prompt button", "Check everyone downloaded the file"],
  notes: "Keep the energy high: this is meant to be fun. Everyone makes a picture of themselves in LibreChat. LibreChat itself doesn't make images: in the library you pick the image generator. Paste the \"who I am\" lines from this morning's CLAUDE.md, or describe something funny. No real photo and nothing confidential. The Example prompt button has four starting prompts: from your CLAUDE.md, cartoon, superhero and Jip and Janneke (a well-known Dutch children's-book style by Fiep Westendorp, black silhouettes; explain it in one sentence for non-Dutch participants). The three thumbnails are AetherBOT made with these same prompts. Make sure everyone has actually downloaded the file before moving on: the next assignment puts it in the game."
},

{ // Slide 65
  title: "Assignment 4: Put your avatar in your game",
  kicker: "DAY 1 · ASSIGNMENT 4",
  subtitle: "Give the picture to Claude Code and let it show you in the game.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your player", body: "picture\nplayer name" }
  ],
  stepsHeading: "Do this:",
  steps: ["Put the picture in your game repo, in assets/.", "Ask Claude Code to show it with your player name on the start screen.", "Plan first. No picture? Then show your initials.", "Play and check both."],
  expected: "Your game shows your picture and player name. Without a picture it shows your initials.",
  prompt: "I put my picture in assets/[file name]. Show it with my player name [your name] on the start screen of my game. Without a picture, show my initials. Plan first and show me the plan before you change anything.",
  keyPoints: ["LibreChat made it, Claude Code places it","Picture into assets/ first","Plan first, initials as fallback","Tomorrow: name + picture go to the scoreboard"],
  notes: "The hand-off: LibreChat made the picture, Claude Code puts it in the game. First everyone moves the downloaded file into assets/ in their game repo. Then it is the working method in miniature: Claude looks at the game, plans, waits for approval, builds, and they check it. The fallback to initials is the part people forget. Tomorrow the player name and picture go to the arcade scoreboard, so keep them."
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
  keyPoints: ["CLAUDE.md = a request, settings = enforced", "Permissions: always allow / never allow", "Hooks: Claude Code runs them, not Claude", "Shared file vs local file", "Two assignments follow: 5 and 6"],
  notes: "Short concept slide before the last two assignments. Link back to Permissions and Plan Mode from this morning: there you approved every action one by one. Now you write standing rules down once. Permissions: 'allow' means Claude never has to ask for that command again, 'deny' means it can't do it, even if you ask it to; when both match, deny wins. Hooks are new: a hook is a command that Claude Code itself runs at a fixed moment, such as after every file edit. Claude doesn't have to remember it and can't skip it. Both live in the same file, .claude/settings.json in the project, which is shared with the team through Git; settings.local.json is the same thing, only for you. The tagline is the sentence to leave: CLAUDE.md (this morning) guides Claude, settings enforce. Typing /permissions or /hooks inside Claude Code shows what is active."
},

{ // Slide 67
  title: "Assignment 5: House rules for your game",
  kicker: "DAY 1 · ASSIGNMENT 5",
  subtitle: "Decide what Claude may always do here, and what it may never do.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: "Rules for this project", oneCol: true },
  cards: [
    { title: "Never", body: "git push --force: it overwrites history on GitLab\nrm -rf: no deleting folders\nedit tests/: the test is the referee" },
    { title: "Always", body: "npm test: safe, and you run it all the time" }
  ],
  stepsHeading: "Steps:",
  steps: ["As a pair: decide what Claude may always do, and what it may never do.", "Ask Claude to write your rules into .claude/settings.json. Read the file before you approve.", "Restart Claude and type /permissions. Are your rules there?", "Test them: “run the tests” (no question asked), then “force push my work” (blocked)."],
  expected: "The tests run without asking. Force push, rm -rf and edits to tests/ are blocked, even when you ask for them.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(rm -rf *)\",\n      \"Edit(tests/**)\"\n    ]\n  }\n}",
  keyPoints: ["The pair decides the rules, Claude writes them","Read settings.json before approving","/permissions shows what's active","Test both: allowed and blocked","tests/ is the referee"],
  notes: "Each rule stops a mistake that can really happen. No force push: it overwrites the history in their GitLab repo. No rm -rf: Claude never deletes folders on its own. No edits to tests/: the test is the referee; asked to 'make the tests pass', Claude might otherwise change the test instead of the game. Always allow npm test: approving a safe command over and over only teaches people to click yes without reading. They decide first, then Claude writes the file; the Example prompt shows a good result (don't hand it out before they've decided). The test is the point: 'force push my work' must be refused by Claude Code itself, not by Claude being polite. If /permissions doesn't show the rules, restart Claude in the project folder."
},

{ // Slide 68
  title: "Assignment 6: Let the test check Claude's work",
  kicker: "DAY 1 · ASSIGNMENT 6",
  subtitle: "After every change, the test runs by itself.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: "What happens", oneCol: true },
  cards: [
    { title: "The hook", body: "After every file edit: run npm test." },
    { title: "The test", body: "Ask Claude to make the snake stop growing.\nThe hook catches it.\nClaude can't change the test, so it tells you." }
  ],
  stepsHeading: "Steps:",
  steps: ["Ask Claude to add a hook to .claude/settings.json that runs npm test after every file edit.", "Read the hook before you approve. Type /hooks to check it's there.", "Test it: ask Claude to make the snake stop growing when it eats.", "Watch the hook catch it. What does Claude do now?"],
  expected: "A change that breaks the game gets caught, without you asking for the check.",
  prompt: "\"hooks\": {\n  \"PostToolUse\": [\n    {\n      \"matcher\": \"Edit|Write\",\n      \"hooks\": [\n        { \"type\": \"command\", \"command\": \"npm test >&2 || exit 2\" }\n      ]\n    }\n  ]\n}",
  keyPoints: ["Same settings.json as assignment 5","Hook runs after every edit","Read it before approving","Break it on purpose","Rule + hook: Claude must tell you"],
  notes: "The hook goes into the same .claude/settings.json as the house rules, next to permissions. After every file edit (PostToolUse, matcher Edit|Write), Claude Code runs npm test. The '|| exit 2' part matters: if the test fails, the error goes back to Claude, so Claude sees it. The test makes it visible: asking the snake to stop growing breaks the test on purpose. Claude can't change the test (tests/ is denied), so the right outcome is that Claude tells you the request conflicts with the test. That is rules and hooks working together. If the hook doesn't fire, check /hooks and restart Claude in the project folder."
},

{ // Slide 69
  title: "Example: a complete settings.json",
  kicker: "DAY 1 · PART 4 · SETTINGS",
  subtitle: "Your house rules and your hook, together in one file: .claude/settings.json",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: ".claude/settings.json", body: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(rm -rf *)\",\n      \"Edit(tests/**)\"\n    ]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npm test >&2 || exit 2\"\n          }\n        ]\n      }\n    ]\n  }\n}" },
    { title: "How to read it", body: "allow: Claude may do this without asking\ndeny: never allowed, even if you ask\nPostToolUse: runs after Claude uses a tool\nmatcher Edit|Write: only after file changes\nexit 2: a failed test goes back to Claude" }
  ],
  tagline: "One file, shared with your team. Rules are enforced, not requested.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(rm -rf *)\",\n      \"Edit(tests/**)\"\n    ]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npm test >&2 || exit 2\"\n          }\n        ]\n      }\n    ]\n  }\n}",
  keyPoints: ["Assignments 5 + 6 in one file","allow / deny under permissions","PostToolUse hook, Edit|Write","exit 2 sends the failure to Claude","settings.local.json = only you"],
  notes: "Reference slide: this is what .claude/settings.json looks like once assignments 5 and 6 are done, so participants can compare their own file (the Example prompt button copies it). Walk through it top to bottom: allow lets npm test run without a question; deny blocks force push, rm -rf and edits to tests/, even when asked; the PostToolUse hook runs after every Edit or Write, and exit 2 sends a failing test back to Claude. This file is shared with the team through git; personal rules go in .claude/settings.local.json. After changing it, restart Claude and check with /permissions and /hooks."
},

{ // Slide 70
  title: "Goals: tell Claude when it's done",
  kicker: "DAY 1 · PART 4 · GOALS",
  subtitle: "Your “done when”, turned into a command Claude keeps working towards.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: 'tagline', text: 'checkable', tone: 'orange' }] },
  cards: [
    { title: "Set a goal", body: "/goal the snake speeds up every 5 points and npm test passes" },
    { title: "What happens", body: "Claude keeps working, turn after turn. After each turn a small, fast model checks: is the goal met yet?" },
    { title: "Check or stop it", body: "/goal on its own shows the status.\n/goal clear stops it.\nIt clears itself once the goal is met." },
    { title: "Good goal, bad goal", body: "Good: “npm test passes and the snake speeds up every 5 points.”\nBad: “make the game more fun.”" }
  ],
  tagline: "A goal is only as good as its check: write something checkable.",
  keyPoints: ["/goal = a “done when” that keeps running","A small model checks after every turn","/goal shows status, /goal clear stops","Vague goal = endless or wrong work","Still play the result yourself"],
  notes: "Connect this to the reliable prompt from this morning: “Done when” is exactly what a goal is, as a command. Claude keeps going on its own until it's met. After each turn a small, fast model reads the conversation and decides whether the condition holds; when it does, the goal clears itself. /goal with nothing after it shows the status, /goal clear stops it. The lesson is the bad example: “make the game more fun” can never be checked, so Claude either stops too early or keeps going. A good goal names something a test or a person can verify. A met goal is still not your approval: they play the result afterwards."
},

{ // Slide 71
  title: "Assignment 7: Let Claude run to a goal",
  kicker: "DAY 1 · ASSIGNMENT 7",
  subtitle: "Your house rules and your hook stay on. Claude works on its own until the goal is met.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Still active", body: "rules: force push, rm -rf and tests/ are blocked\nhook: npm test runs after every edit\nnew: one goal for one feature" }
  ],
  stepsHeading: "Steps:",
  steps: ["Type: /goal the snake gets faster at 5 and 10 points, and npm test passes", "Don't steer. Watch: when does the hook run? When does the goal clear?", "Type /goal while it runs, and read the status.", "When it's done, play the game yourself.", "Bonus: ask Claude to force push. Your rule still blocks it."],
  expected: "The goal cleared by itself, the test ran after every edit, and the game speeds up when you play it.",
  prompt: "/goal the snake gets faster at 5 and 10 points, and npm test passes",
  keyPoints: ["Given goal, one line","Don't steer: watch it work","The hook fires after edits","/goal shows the status","Goal met ≠ approved: play it"],
  notes: "The first time Claude really works on its own for a while, but inside the fences they built in assignments 5 and 6. Name it out loud: autonomy is safe because the rules and the check are already in place. The goal is given word for word (Example prompt). While it runs, point at the test output after each edit: that's their hook. Typing /goal mid-run shows the status. When the goal clears, they still play it themselves; the goal being met is not their approval. The bonus shows the deny rule holds even while Claude runs on its own."
},

{ // Slide 72
  title: "Assignment 8: Write your own goal",
  kicker: "DAY 1 · ASSIGNMENT 8",
  subtitle: "A feature you choose, from a goal you write yourself.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your goal must say", body: "what the feature does\nwhere you see it in the game\nwhat happens at game over and restart\nwhich check proves it works" }
  ],
  stepsHeading: "Steps:",
  steps: ["Pick a feature: a high score that stays after reload, a pause key, or walls that appear per level.", "Write your own /goal for it. No given prompt this time.", "Read it to your partner: could a test check it? If not, sharpen it.", "Run it. Your hook keeps checking every edit.", "When the goal clears, play it yourself. Compare with your partner: whose goal worked better, and why?"],
  expected: "Your game has a new feature, built from a goal you wrote yourself, and you played it to check.",
  keyPoints: ["Own goal, no given prompt","Partner check: is it checkable?","Hook keeps running","Play it yourself","Compare goals, not just results"],
  notes: "Last step down the ladder for this block: they write the goal themselves. The partner check is the learning moment: “add a high score” is too vague; “the game shows a high score that stays after reload, resets only with a button, and npm test passes” is a goal a model can check. When the goal clears, they still play it. Close by collecting one good and one weak goal from the room and saying why the good one worked."
},

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
  notes: "Give people genuinely quiet time to write it, five minutes is enough. The habit of writing a raw, honest note, not one polished by Claude, is worth protecting. Tomorrow starts with showing your game: this note helps them remember what they want to show and ask."
},

{ // Slide 74
  title: "Day 1 recap",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Today you:",
  type: "recap",
  visual: { badges: ['🧠', '🤖', '🧭', '🔌', '🐍', '🔒', '👤'], bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'a skill', tone: 'orange' }] },
  cards: [
    { title: "Learned the AI foundations", body: "" },
    { title: "Used Claude Code as an agentic tool", body: "" },
    { title: "Took the tour and wrote your CLAUDE.md", body: "" },
    { title: "Connected GitLab", body: "" },
    { title: "Built your Snake, layer by layer", body: "" },
    { title: "Set rules Claude can't ignore", body: "" },
    { title: "Applied human review", body: "" }
  ],
  tagline: "Next: turn your Snake into a skill, and build Pac-Man with it.",
  keyPoints: ["Preview only","Don't explain skills yet","Day 2 covers those","End on the tagline"],
  notes: "Preview only: do not explain skills in depth tonight. End on the tagline, not on details."
},

/* ==========================================================================
   TEACHING DAY 2 — Reusable methods, agentic work and connected context
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 2 — Warm-up and recap                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 75
  title: "Reusable and connected AI workflows",
  kicker: "TEACHING DAY 2",
  subtitle: "From your own game to a team arcade.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Show your game', 'Recap', 'Skills', 'Pac-Man', 'Levels', 'Arcade', 'Tournament'] },
  cards: [
    { title: "What we're doing", body: "Turning yesterday's method into a skill, and building an arcade as a team." },
    { title: "Today", body: "Skills, Pac-Man with your own skill, levels from files, and the arcade tournament." }
  ],
  keyPoints: ["Short re-welcome", "Point at the day's shape", "Morning: skills, Pac-Man, levels", "Afternoon: the arcade as a team", "Warm-up first: show your game"],
  notes: "Short re-welcome. Point at the day's shape: in the morning yesterday's method becomes a skill, Pac-Man is built with it and levels come from files. In the afternoon the whole team builds the arcade: one agreement, one scoreboard, every game. It ends with a tournament on the big screen. The warm-up comes first: everyone shows their game.",
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
  title: "Show your game",
  kicker: "DAY 2 · WARM-UP",
  subtitle: "Everyone shows what they built yesterday. One minute each.",
  type: "context",
  visual: { stepThrough: true, bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'your questions', tone: 'orange' }] },
  cards: [
    { title: "Show", body: "Play your Snake for a few seconds. Your avatar, your own touch." },
    { title: "Tell", body: "One thing that went well, one thing that went wrong." },
    { title: "Ask", body: "What do you want to know after seeing the others?" }
  ],
  tagline: "We start the recap from your questions.",
  keyPoints: ["One minute per person","Show, tell, ask","Write the questions on the flipchart","They feed the recap"],
  notes: "Everyone shows their Snake from yesterday, one minute each: play it for a few seconds, show the avatar and their own touch. One thing that went well, one thing that went wrong. Collect the questions that come up on the flipchart: the recap that follows answers them. Optional opener: how many tokens did your game cost? (/cost or the status line)."
},

{ // Slide 78
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

{ // Slide 79
  title: "Recap: your AI in Claude Code",
  kicker: "DAY 2 · RECAP",
  subtitle: "What your AI brings, and what you gave it yesterday.",
  type: "recap",
  visual: { art: 'intake', bot: 'head', place: 'aside' },
  cards: [
    { title: "Memory", body: "Your CLAUDE.md: who you are and your rule." },
    { title: "Hands and feet", body: "MCP: your GitLab connection." },
    { title: "Rules", body: "settings.json: what Claude may always and never do, and your test hook." },
    { title: "Goals", body: "/goal: a done-when Claude works towards." }
  ],
  tagline: "Today we add one more: skills.",
  keyPoints: ["Answer the flipchart questions here","Memory, MCP, rules, goals","All of it they set up themselves","Today: skills"],
  notes: "Use this to answer the questions from Show your game. Everything on this slide they set up themselves yesterday: a CLAUDE.md with who they are and one rule, the GitLab connection through MCP, settings.json with house rules and the test hook, and a goal Claude worked towards. Today one more piece joins: skills."
},

{ // Slide 80
  title: "Recap: three views of the same work",
  kicker: "DAY 2 · RECAP",
  subtitle: "Today you move from your own task to the team's lifecycle.",
  type: "recap",
  layout: "compare",
  visual: { art: 'boxes', link: { 0: ['Build', 'Test'], 1: ['Create', 'Test'] } },
  columns: [
    { title: "SDLC — the team", items: ["Plan", "Design", "Build", "Test", "Deploy", "Maintain"], foot: "Contains the working method ↓" },
    { title: "Working method — you", items: ["Explore", "Plan", "Create", "Test", "Human review", "Handoff"], foot: "Contains the agent loop ↓" },
    { title: "Agent loop — Claude", items: ["Observe", "Decide", "Act", "Check", "Repeat or stop"] }
  ],
  tagline: "Yesterday you worked in the middle box. This afternoon the whole team works in the outer one.",
  keyPoints: ["Same diagram as yesterday","SDLC = the team","Working method = you","Agent loop = Claude","This afternoon: the outer box"],
  notes: "The same three boxes as yesterday. The outer box is the team's software lifecycle, the middle box is your own working method, the inner box is Claude's agent loop. Yesterday everyone worked alone, in the middle box. This afternoon, in the arcade, the whole team works in the outer box: agreeing, planning and building in layers together."
},

{ // Slide 81
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
/* DAY 2 — Part 2: From repeated method to skill                          */
/* ---------------------------------------------------------------------- */

{ // Slide 82
  title: "A repeated method",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Yesterday you told Claude the same things for every layer.",
  type: "context",
  visual: { repeatStack: 0, repeatTags: ['layer 1', 'layer 2', 'layer 3 …'], bot: 'sleepy', place: 'aside' },
  cards: [
    { title: "Every layer of your Snake needed", body: "plain HTML, CSS and JavaScript\nplan first\none layer at a time\nplay after each layer\na test that passes\ncommit when it works" }
  ],
  tagline: "Pac-Man needs the same method.",
  keyPoints: ["Ask: what did you repeat every layer?","Collect it, then show the card","Same method, next game","That's what a skill is for"],
  notes: "Ask the room first: what did you tell Claude again and again yesterday, for every layer? Collect it, then show the card: plain HTML, CSS and JavaScript, plan first, one layer at a time, play after each, a test, commit. Pac-Man needs exactly the same method. Typing it again is boring and you forget a line. That's what a skill is for."
},

{ // Slide 83
  title: "A skill is a recipe",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Write down how you make the apple pie once. Bake it whenever you want.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'once', tone: 'orange' }] },
  cards: [
    { title: "Built in", body: "Claude Code already has some. /goal is one of them." },
    { title: "Your own", body: "You write the recipe yourself, in a SKILL.md." },
    { title: "Made by Claude", body: "You ask Claude to turn what you just did into a skill." }
  ],
  keyPoints: ["Recipe: write it once, bake it often","Built in: /goal","Your own SKILL.md","Or let Claude write it from your work"],
  notes: "A skill is a recipe. You write down once how you make the apple pie: ingredients, steps, when it's done. After that you bake it whenever you want, the same way every time. There are three kinds: built in (Claude Code already has some, /goal from yesterday is one), your own (you write the SKILL.md yourself), and made by Claude (you ask Claude to turn what you just did into a skill). That last one is what you'll do with your Snake."
},

{ // Slide 84
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

{ // Slide 85
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

{ // Slide 86
  title: "Skills in your role",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "In the game it's Snake → Pac-Man. At work it looks like this.",
  type: "concept",
  visual: { stepThrough: true },
  cards: [
    { title: "Frontender", body: "A skill for a new component: your design system, your naming, a test for every state." },
    { title: "Backender", body: "A skill for a new endpoint: the contract first, tests, error handling, the same every time." },
    { title: "Manager", body: "A skill for the weekly status: read the Jira board, the same headings, the risks on top." }
  ],
  tagline: "Anything you explain to Claude twice can become a skill.",
  keyPoints: ["First the game, then your role","Frontend: component skill","Backend: endpoint skill","Manager: weekly status skill","Ask: which one would you build?"],
  notes: "Every concept first in the game, then in your role. A frontender could have a skill for a new component: their design system, their naming, a test for every state. A backender a skill for a new endpoint: the contract first, then tests and error handling, the same way every time. A manager a skill for the weekly status: read the Jira board, the same headings, risks on top. Ask the room: which skill would you build first for your own work?"
},

{ // Slide 87
  title: "Quiz: where does it go?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "Claude must follow a rule in every session of this project. Where do you put it?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "In your prompt, every time." },
    { title: "B", body: "In CLAUDE.md." },
    { title: "C", body: "In a skill." },
    { title: "D", body: "In a comment in your code." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B, CLAUDE.md", "Skill = a recurring method, not a standing rule"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: CLAUDE.md is read in every session, so standing rules live there. A is the problem the room felt in Assignment 8: repeating yourself. C is close but different: a skill holds a recurring method that runs when needed, not a rule that always applies."
},

{ // Slide 88
  title: "Assignment 9: Turn your Snake into a skill",
  kicker: "DAY 2 · ASSIGNMENT 9",
  subtitle: "Let Claude write the recipe from how you built your Snake.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your skill says", body: "when to use it\nthe tech: HTML, CSS, JavaScript\nthe layers, one at a time\na test per layer\nwhen it's done" }
  ],
  stepsHeading: "Do this:",
  steps: ["Open your Snake repo and start claude.", "Ask Claude to look at your Snake and write a skill: build-arcade-game.", "Read the SKILL.md. Missing a step you always did? Add it.", "Check it's there: type / and look for your skill."],
  expected: "A build-arcade-game skill in your repo that describes how you build a game, layer by layer.",
  prompt: "Look at how my Snake game is built in this repo, and at the layers I built it in. Write a skill called build-arcade-game in .claude/skills/build-arcade-game/SKILL.md that describes that method, so I can build my next game the same way: the tech, one layer at a time, a test per layer, and when a layer is done. Show me the skill before you save it.",
  keyPoints: ["Claude writes it, you check it","Add what's missing","Type / to see it","This is the recipe for Pac-Man"],
  notes: "Claude writes the recipe from their own work: it reads the Snake repo and turns the method into a SKILL.md. The important part is the reading: is the step they always did in there? If not, they add it. Then type / and check the skill shows up. This skill builds Pac-Man in the next assignment."
},

{ // Slide 89
  title: "Assignment 10: Build Pac-Man with your skill",
  kicker: "DAY 2 · ASSIGNMENT 10",
  subtitle: "Same method, next game. This time the skill does the explaining.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Compare with yesterday", body: "How many prompts did you need?\nWhat did you not have to explain?\nWhat would you add to the skill?" }
  ],
  stepsHeading: "Do this:",
  steps: ["In your game repo: a new folder for Pac-Man.", "Ask Claude to build Pac-Man with your build-arcade-game skill.", "Read the plan: does it follow your layers?", "Play after every layer. Your hook and rules still run.", "Something you had to explain again? Add it to the skill."],
  expected: "A Pac-Man you can play, built with your own skill, and a skill that got better.",
  prompt: "Use my build-arcade-game skill to build Pac-Man in the folder pacman/. Start with layer 1 and show me the plan first.",
  keyPoints: ["Same method, fewer words","Plan follows the layers?","Hooks and rules still active","Improve the skill as you go"],
  notes: "Same method, next game. The skill does the explaining, so the prompt is one line. Point out that the plan follows their own layers, and that the rules and hook from yesterday still run. The real learning is the last step: whatever they had to explain again goes into the skill. Ask afterwards: how many prompts did you need compared to Snake?"
},

{ // Slide 90
  title: "Assignment 11: Levels from MD files",
  kicker: "DAY 2 · ASSIGNMENT 11",
  subtitle: "Every level is a file with its own rules. Claude builds the level from the file.",
  type: "practice",
  layout: "exercise",
  visual: { mdfile: 0, mdName: 'levels/level-2.md' },
  cards: [
    { title: "A level file", body: "Speed\nObstacles\nGoal\nWhat happens when you win" }
  ],
  stepsHeading: "Do this:",
  steps: ["Write levels/level-2.md yourself: speed, obstacles, goal.", "Ask Claude to build level 2 from that file.", "Play it. Does it follow your rules?", "Write level 3 differently, and build it the same way.", "Bonus: let Claude turn this into a skill: build-level."],
  expected: "Two levels built from your own MD files, and the rules in the file are what you see in the game.",
  prompt: "Build level 2 of my game from levels/level-2.md. Follow the rules in that file exactly, and tell me if a rule is unclear instead of guessing. Show me the plan first.",
  keyPoints: ["The rules live in a file, not in the prompt","Claude asks when a rule is unclear","Play: does it match?","Bonus: build-level skill"],
  notes: "The rules of a level live in a file, not in the prompt: speed, obstacles, goal, what happens when you win. Claude builds the level from the file and must say when a rule is unclear instead of guessing. That's the same idea as a spec or a ticket at work. Bonus: turn 'build a level from a file' into its own skill."
},

{ // Slide 91
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
/* DAY 2 — Part 3: The arcade                                             */
/* ---------------------------------------------------------------------- */

{ // Slide 92
  title: "The arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "One game is one prompt. Five games and one scoreboard is teamwork.",
  type: "concept",
  visual: { stepThrough: true, bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'agree', tone: 'orange' }] },
  cards: [
    { title: "Scoreboard", body: "One place that receives every score and shows the top 10." },
    { title: "Connection", body: "At game over, every game sends: player name, picture, points, game name." },
    { title: "Start screen", body: "One menu: pick your avatar, pick a game, play." }
  ],
  tagline: "That only works if you agree first.",
  keyPoints: ["Why: no single prompt builds this","Three layers: scoreboard, connection, start screen","The format is the agreement","Collected on one laptop, on the big screen"],
  notes: "Why the arcade: Claude can build one game in one prompt. Five games from five people talking to one scoreboard can't be done in one prompt: the team has to agree on a format, write it down and build in layers. That is the software lifecycle and the team work we want them to feel. Three layers: a scoreboard that receives scores and shows a top 10, a connection that every game uses at game over, and a start screen. Every game comes from its own GitLab repo and is collected on one laptop, the arcade, shared on the big screen."
},

{ // Slide 93
  title: "Plan it like a team",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Who builds what, and in which order?",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Agree", caption: "The score format, as a shared skill." },
    { label: "Scoreboard", caption: "Build it and test it with fake scores." },
    { label: "One game", caption: "Connect one game. Test it." },
    { label: "All games", caption: "Then the rest, one by one." },
    { label: "Start screen", caption: "One menu for the whole arcade." }
  ],
  tagline: "Test each layer before the next one.",
  keyPoints: ["Order matters","Fake scores first","One game, then the rest","Same as a release: layer by layer"],
  notes: "The order is the lesson. First agree the format, as a skill everyone uses. Then the scoreboard, tested with fake scores before any game is connected. Then one game, test, and only then the rest. The start screen last. Ask the room where this looks like their own releases."
},

{ // Slide 94
  title: "The arcade in your role",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Everyone has a job. Nobody builds it alone.",
  type: "concept",
  visual: { stepThrough: true },
  cards: [
    { title: "Frontender", body: "The start screen, and how the scores look." },
    { title: "Backender", body: "The score format, and the scoreboard that receives it." },
    { title: "Manager", body: "The agreement, the order, and the arcade laptop." }
  ],
  tagline: "No frontender in your team? Then someone else learns it today.",
  keyPoints: ["Split by role","Manager owns agreement + arcade laptop","Backender: format + scoreboard","Frontender: start screen"],
  notes: "Split the work by role. The manager owns the agreement, the order and the arcade laptop where everything comes together, so the manager is right in the middle and sees what can be done from their own laptop. The backender owns the format and the scoreboard. The frontender owns the start screen and how scores look. Teams without a frontender: someone else learns it today."
},

{ // Slide 95
  title: "Assignment 12: The score agreement",
  kicker: "DAY 2 · ASSIGNMENT 12",
  subtitle: "Agree as a team what every game sends, and write it down as a shared skill.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Every score contains", body: "player name\npicture\npoints\ngame name" }
  ],
  stepsHeading: "Do this:",
  steps: ["The manager makes one team repo on GitLab: arcade. Everyone gets access.", "Agree the format as a team. Five minutes, on paper first.", "One person asks Claude to write it as a skill: arcade-score.", "Everyone reads it. Agreed? Commit and push it to the arcade repo.", "Everyone copies the skill into their own game repo."],
  expected: "One arcade-score skill in the team repo, the same in every game repo.",
  prompt: "Write a skill called arcade-score in .claude/skills/arcade-score/SKILL.md. It describes how a game in our arcade reports a score at game over: player name, picture, points and game name, in exactly this format: [the format your team agreed]. Add one example and a way to check it. Show me the skill before you save it.",
  keyPoints: ["Paper first, then Claude","The format is the contract","One skill, in every repo","The manager hosts the arcade repo"],
  notes: "The format is the contract between all games and the scoreboard. Let the team agree it on paper first; then one person asks Claude to write it as a skill. Everyone reads it before it's committed, because changing it later breaks every game. The skill goes into the team repo and into every game repo. We let them make it themselves, together: that's the point."
},

{ // Slide 96
  title: "Assignment 13: Build the scoreboard",
  kicker: "DAY 2 · ASSIGNMENT 13",
  subtitle: "On the arcade laptop: one place that receives scores and shows the top 10.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Done when", body: "it accepts a score in your format\nit shows the top 10 with picture and name\nit survives a reload" }
  ],
  stepsHeading: "Do this:",
  steps: ["On the arcade laptop, in the arcade repo: start claude.", "Ask Claude to build the scoreboard with the arcade-score skill. Plan first.", "Test it with three fake scores before any game is connected.", "Commit and push."],
  expected: "A scoreboard that shows fake scores in the top 10, with picture and name.",
  prompt: "Use the arcade-score skill to build a scoreboard in this repo: it receives scores in our format and shows the top 10 with picture and player name. Keep the scores after a reload. First show me the plan, then test it with three fake scores.",
  keyPoints: ["On the arcade laptop","Fake scores first","Backender + manager","Commit and push"],
  notes: "The scoreboard is built on the arcade laptop, in the team repo. Mostly backender and manager, with the rest watching or preparing their game. The simplest route: everything runs from that one laptop, so the scores can be kept locally (for example in the browser or a file). Let the team choose; that is part of the lesson. Test with fake scores before any game is connected."
},

{ // Slide 97
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

{ // Slide 98
  title: "Assignment 14: Connect your game",
  kicker: "DAY 2 · ASSIGNMENT 14",
  subtitle: "At game over, your game sends its score to the scoreboard.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The order", body: "one game first\ntest it\nthen the next one" }
  ],
  stepsHeading: "Do this:",
  steps: ["Ask Claude to make your game send its score with the arcade-score skill.", "Push your game to your GitLab repo.", "On the arcade laptop: pull your game in.", "Play one round. Is your score on the board, with your picture?", "Works? Next game. Doesn't? Fix it before the next one joins."],
  expected: "Every game sends its score, and every score shows on the scoreboard with the right picture.",
  prompt: "Use the arcade-score skill to make my game send its score at game over: my player name, my picture, my points and the game name. Plan first.",
  keyPoints: ["One game first, then test","Push to your own GitLab repo","Pull it onto the arcade laptop","Fix before the next one joins"],
  notes: "One game first: connect, push to its GitLab repo, pull it onto the arcade laptop, play one round, check the scoreboard. Only when that works does the next game join. When something breaks, it's almost always the format: back to the skill. That's exactly why the agreement came first."
},

{ // Slide 99
  title: "Assignment 15: The start screen",
  kicker: "DAY 2 · ASSIGNMENT 15",
  subtitle: "One menu for the whole arcade.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The start screen shows", body: "every player's avatar\nevery game\nthe top 10" }
  ],
  stepsHeading: "Do this:",
  steps: ["On the arcade laptop: ask Claude for a start screen. Plan first.", "Pick your avatar, pick a game, play.", "After game over: back to the start screen, with the new top 10.", "Commit and push."],
  expected: "From one start screen, everyone can pick their avatar and play every game.",
  prompt: "Build a start screen for our arcade: show every player's avatar, every game in this repo, and the top 10. Picking an avatar and a game starts that game; after game over you come back here. Plan first.",
  keyPoints: ["Frontender-led","Avatar → game → play → back","Top 10 on the start screen","Then: the tournament"],
  notes: "Mostly the frontender, on the arcade laptop. One menu: pick your avatar, pick a game, play, and after game over you're back with the new top 10. When this works, the arcade is ready for the tournament."
},

{ // Slide 100
  title: "Bonus: the game coaches you",
  kicker: "DAY 2 · BONUS",
  subtitle: "A skill that gives a comment after every round.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "For example", body: "“Three times the left wall. Try going right.”\n“New personal record!”\n“You were faster than yesterday.”" }
  ],
  stepsHeading: "Do this:",
  steps: ["Ask Claude to write a skill: arcade-coach.", "The coach looks at the round that just ended and gives one short comment.", "Make it fun, never mean.", "Play a round and read the comment."],
  expected: "After every round your game gives one short, fun comment that fits what you just did.",
  prompt: "Write a skill called arcade-coach. After every round it looks at what happened (score, how you lost, your previous best) and shows one short, fun comment in the game. Fixed comments are fine: no AI connection in the game itself. Show me the skill first.",
  keyPoints: ["Optional, for fast teams","Skill + memory + creativity","No AI connection in the game","Fun, never mean"],
  notes: "Optional, for teams that are done early. The game comments on itself after every round: skills, memory and creativity together. The comments are fixed texts chosen by rules: there is no AI connection inside the game itself."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Closing                                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 101
  title: "The tournament",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Everyone plays in turn, on the big screen.",
  type: "context",
  dark: true,
  visual: { stepThrough: true, bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'you built together', tone: 'orange' }] },
  cards: [
    { title: "Play", body: "One round each, on the arcade laptop." },
    { title: "Watch", body: "The scoreboard fills up." },
    { title: "Win", body: "The winner goes on the big screen." }
  ],
  tagline: "A scoreboard you built together, from one agreement.",
  keyPoints: ["Arcade laptop on the big screen","One round each","Watch the top 10 fill","Close: it worked because you agreed first"],
  notes: "The arcade laptop on the big screen. Everyone plays one round in turn, the scoreboard fills up, and the winner goes on the big screen. Close with the point: this worked because the team agreed on the format first and built in layers. That is the software lifecycle they will use in the support days."
},

{ // Slide 102
  title: "What you built",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Together, we created:",
  type: "recap",
  layout: "recap",
  visual: { recapKeys: true, bot: 'happy', place: 'aside' },
  items: [
    { label: "Your own game repo on GitLab" },
    { label: "Snake, built in layers" },
    { label: "Your avatar in the game" },
    { label: "House rules, a test hook and goals" },
    { label: "A build-arcade-game skill" },
    { label: "Pac-Man, built with your skill" },
    { label: "Levels from MD files" },
    { label: "The arcade: one agreement, one scoreboard, every game" }
  ],
  keyPoints: ["Items appear on their own","No clicking needed","Don't talk over them","Let the room recognise its work"],
  notes: "The items appear on their own, one by one — no clicking needed. Let them come in without talking over them, and let the room recognise their own two days of work in the list."
},

{ // Slide 103
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
    { label: "Set a checkable goal and turn a repeated method into a skill." },
    { label: "Agree a shared format as a team and build in layers." },
    { label: "Explain what MCP provides." },
    { label: "Preserve human review and handoff." }
  ],
  keyPoints: ["Understanding checklist, not artefact list","Name the distinction out loud","How Claude Code works, why boundaries matter"],
  notes: "This is the understanding checklist, not the artefact checklist (that was the previous slide) — the distinction is worth naming out loud. If there's time, ask someone which line they will use first in their own work."
},

{ // Slide 104
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

{ // Slide 105
  title: "Complete progression",
  kicker: "DAY 2 · CLOSING",
  subtitle: "From your first Claude Code conversation to applying the method during the support days.",
  type: "recap",
  layout: "steps",
  visual: { stepKeys: true, doneSteps: 6 },
  items: [
    { label: "Understand", caption: "Understand AI and Claude Code." },
    { label: "Your game", caption: "Build a game in layers, in your own repo." },
    { label: "Rules and goals", caption: "Set rules Claude can't ignore and a goal it works towards." },
    { label: "A skill", caption: "Turn a repeated method into a skill." },
    { label: "Pac-Man", caption: "Build the next game with your own skill." },
    { label: "The arcade", caption: "Agree as a team and build it together, layer by layer." },
    { label: "Apply it", caption: "Apply the method during the support days." }
  ],
  keyPoints: ["First six steps = the two days","Say that explicitly","Last step: the support days"],
  notes: "The first six steps are exactly what the room just did across the two teaching days — say that explicitly before pointing at the last one, which belongs to the support days."
},

{ // Slide 106
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

{ // Slide 107
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
},

/* ---------------------------------------------------------------------- */
/* PARKED — not decided yet (hidden): old Day 2 slides                    */
/* ---------------------------------------------------------------------- */

{ // Slide 108
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

{ // Slide 109
  hidden: true,
  title: "Parked · Sources of context",
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

{ // Slide 110
  hidden: true,
  title: "Parked · Meet AetherBOT",
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

{ // Slide 111
  hidden: true,
  title: "Parked · Assignment 6: Design AetherBOT",
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

{ // Slide 112
  hidden: true,
  title: "Parked · Fresh-session test",
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

{ // Slide 113
  hidden: true,
  title: "Parked · Assignment 7: Build AetherBOT",
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

{ // Slide 114
  hidden: true,
  title: "Parked · Break your partner's bot",
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

{ // Slide 115
  hidden: true,
  title: "Parked · Assignment 8: Create a second card",
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

{ // Slide 116
  hidden: true,
  title: "Parked · Compare the two runs",
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
  notes: "This discussion creates the need for a reusable method — collect two or three genuinely different outcomes from the room out loud before moving to slide 95, the contrast is the point."
},

{ // Slide 117
  hidden: true,
  title: "Parked · Agentic behaviour in the assignment",
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

{ // Slide 118
  hidden: true,
  title: "Parked · Explain It Back",
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

{ // Slide 119
  hidden: true,
  title: "Parked · Game starter state",
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

{ // Slide 120
  hidden: true,
  title: "Parked · checklist.md and the term-checker skill",
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

{ // Slide 121
  hidden: true,
  title: "Parked · Assignment 11: Learning game",
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

{ // Slide 122
  hidden: true,
  title: "Parked · Quiz: MCP",
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

{ // Slide 123
  hidden: true,
  title: "Parked · Approved connections",
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

{ // Slide 124
  hidden: true,
  title: "Parked · Assignment 12: Connected context",
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

{ // Slide 125
  hidden: true,
  title: "Parked · From skill to workflow",
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

{ // Slide 126
  hidden: true,
  title: "Parked · Assignment 13: Day-start workflow",
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

{ // Slide 127
  hidden: true,
  title: "Parked · The same pattern across systems",
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
}

];
