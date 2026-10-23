/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   173 slides, authored from CURRICULUM.md (2026-09-15 revision) plus its
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
/* TEACHING DAY 1 — Welcome                                               */
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
    { title: "Online? Camera on, mic on mute", body: "" },
    { title: "Build solo, ask your team", body: "" }
  ],
  keyPoints: ["Name the agreements, one sentence each","Stress: listen first, then ask","Online: camera on, mute when not talking","Everyone builds on their own laptop","Stuck? Ask your team or the chat","Invite people to hold questions"],
  notes: "Name the agreements, one sentence each. 'Listen first, then ask' matters most today: many questions are answered a few slides later, so invite people to hold them until the explanation is done. For anyone joining online: camera on so we can see each other, microphone on mute when you're not talking. And say how we work: everyone builds on their own laptop, every assignment is done solo. Stuck? Ask your team or put it in the chat: your team is your help desk, not your pair partner."
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
  tagline: "Give your team a name. Your team is where you ask for help.",
  keyPoints: ["Write the names on the robots","Trainers: Ryan and Maarten too","Each team picks a team name","You build solo; the team is your help desk","Teams stay together for the programme"],
  notes: "Split the room into the teams and write the names on each team's robot (on the whiteboard or live in the deck). Ryan and Maarten join a team too, so everyone knows who they work with. Small assignment: each team picks a team name in two minutes. Make clear what the team is for during these two days: everyone builds on their own laptop, and the team is where you ask for help (in the room or in the team chat). The teams stay together for the rest of the programme."
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
/* DAY 1 — Part 1: AI foundations                                         */
/* ---------------------------------------------------------------------- */

{ // Slide 14
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

{ // Slide 15
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

{ // Slide 16
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

{ // Slide 17
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

{ // Slide 18
  title: "Large language models",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "Sounding right is not the same as being right.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'VERIFY', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'verification', tone: 'mark' }] },
  cards: [
    { title: "What it is", body: "A model trained on huge amounts of text. It writes by predicting the most likely next piece of text, again and again. Say 'my cat' and it has to guess which cat. Say 'my Maine Coon' and it knows." },
    { title: "Key line", body: "A plausible response still requires verification." }
  ],
  keyPoints: ["Trained on huge amounts of text","It predicts the next piece of text","Likely is not the same as true","'My cat' vs 'my Maine Coon'","Training stops at a cutoff date","Same question, different answer","Say the key line slowly"],
  notes: "This closes the circle: the large language model you use today was trained on huge amounts of text and learned the patterns in it. It writes by predicting the most likely next piece of text, one piece at a time. It doesn't look facts up: it produces what sounds likely, and likely is not the same as true. Use the cat: if you say 'my cat', it has to guess — a farm cat, a lynx, a Maine Coon? Say 'my Maine Coon' and it knows. That's why what you give it matters. Two consequences to name: training stops at a cutoff date, so it doesn't know what happened after that; and it picks from likely options, so the same question can give a different answer each time. Tomorrow nobody's Snake looks the same, and that's normal. Then say the key line slowly and let it land: it's the single most important sentence of Part 1, and everything about verification and human review later depends on it. Those 'pieces of text' have a name: tokens, the next slide."
},

{ // Slide 19
  title: "Tokens",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
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
  notes: "Tokens are the currency of the model: everything it reads and writes is counted in tokens. Flipchart: split one sentence into tokens — common words stay whole, rare words get split. The model sees tokens as numbers. Context limits, usage limits and costs are all counted in tokens; on average a token is about 3.5 characters of English text. Using tokens efficiently comes down to two things you'll see next: the right model, and a clear prompt that keeps the context window clean. Expect the room to get very focused here — that's fine, but don't let tokens take over: they are one lever, not the whole story."
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
    { title: "Outdated information", body: "The model only knows what was in its training data, up to a cutoff date." },
    { title: "Fabricated details", body: "A confident-sounding answer that isn't actually true." }
  ],
  tagline: "Treat AI output as a proposal until you verify it.",
  keyPoints: ["Ask for a personal example first","AI being confidently wrong","Then reveal the list","Link back: it predicts what sounds likely"],
  notes: "Ask the room for a personal example of AI being confidently wrong before you reveal the list — recognition lands harder than the definition alone. Then link each one back to how the model works: it predicts what sounds likely from what it was given and what it was trained on. Missing context, an ambiguous request or a cutoff date all lead to a likely-sounding answer that isn't right."
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
    { title: "Context window", body: "A context window limits how much information the model can consider at once. It is measured in tokens." },
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
  notes: "Same models, different ways in, and different costs. On your desktop you have a subscription: a fixed price per month with usage limits. Through the API you pay for what you use, counted in tokens. In your setup Claude Code runs through your company's own secure route, because you work with sensitive systems, and it is used through the API. So every token you just learned about has a price: the right model and a clear prompt save money."
},

{ // Slide 25
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

{ // Slide 26
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
  notes: "Keep it short: a prompt is more than the question you type, it is everything you send along with it. The key line says 'at the start' on purpose: in a fresh session the model knows only what your prompt tells it; later the conversation and memory add to that, which you'll see in Claude Code. Because it starts from your prompt, a good prompt has a fixed set of ingredients."
},

{ // Slide 27
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

{ // Slide 28
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

{ // Slide 29
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

{ // Slide 30
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

{ // Slide 31
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
/* DAY 1 — Part 2: Claude Code — modes, plan, memory, permissions         */
/* ---------------------------------------------------------------------- */

{ // Slide 32
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

{ // Slide 33
  title: "Where Claude Code runs",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "The same Claude Code, in different windows.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'left',
    highlight: [{ in: 'tagline', text: 'in the terminal', tone: 'orange' }] },
  cards: [
    { title: "Terminal", body: "Type claude in a project folder. Everything happens in text, step by step." },
    { title: "VS Code extension", body: "The same Claude Code in a panel next to your files." },
    { title: "Desktop and web", body: "The same Claude Code also runs in the Claude desktop app and in the browser." }
  ],
  tagline: "In these lessons we work in the terminal.",
  keyPoints: ["Terminal, VS Code, desktop, web: same Claude Code","We teach in the terminal","Prefer VS Code? Fine, same tool","Next: the terminal itself"],
  notes: "Claude Code runs in the terminal, as an extension inside VS Code, and in the Claude desktop app and the browser: it is the same Claude Code. In these lessons we work in the terminal, so everyone sees the same screen and every step Claude takes. Someone who prefers VS Code can use the extension: everything we teach works there too. Tip for later: open VS Code next to your terminal, so you see the files Claude touches."
},

{ // Slide 34
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

{ // Slide 35
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
  tagline: "Stuck? Say it now, or put it in the chat. We fix it before the assignments.",
  keyPoints: ["Everyone opens a terminal now", "claude --version, then claude", "Log in if asked, /help, /exit", "Count the thumbs up", "Stuck: note who, fix at the break"],
  notes: "Everyone installed Claude Code before the course; this slide only checks that it works, early, so there is time to fix problems at the break. Ask everyone to open a terminal and do the three steps with you: claude --version should print a version number; claude starts it (log in if it asks); /help shows what's available and /exit leaves again. Ask for a thumbs up (online: in the chat). Note who is stuck and fix their setup at the break, or at lunch at the latest: the first assignment is before lunch and everyone works on their own laptop. Don't troubleshoot for the whole room here."
},

{ // Slide 36
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
  keyPoints: ["Keep it abstract and short","Agents act toward a goal","Next: Claude Code is one"],
  notes: "Keep this abstract and short — it sets up the next slide's concrete claim that Claude Code already is one of these."
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
  keyPoints: ["Say it explicitly","It fits the definition you just saw","Using an agent, not building one","Building one: support day 4"],
  notes: "Important clarification, say it explicitly: Claude Code fits the definition from the previous slide, so it is an agent. But using Claude Code does not mean the room has built a standalone agent. Building your own agent comes in the support days (Day 4, the Claude Agent SDK) — plant it now."
},

{ // Slide 38
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

{ // Slide 39
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

{ // Slide 40
  title: "The loop you'll walk",
  kicker: "DAY 1 · PART 2 · THE SDLC",
  subtitle: "All software goes through the same six phases. Today you walk them alone, with Snake. Tomorrow as a team.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Plan", caption: "What do we want? intent.md" },
    { label: "Design", caption: "How do we build it? A plan in layers" },
    { label: "Build", caption: "Small steps. Commit what works" },
    { label: "Test", caption: "Evidence that it works" },
    { label: "Deploy", caption: "On GitLab, for others" },
    { label: "Maintain", caption: "Hand it over: PROGRESS.md" }
  ],
  tagline: "Every phase leaves a file behind, so the next person, or the next session, can carry on.",
  keyPoints: [
    "The software development life cycle",
    "Six phases, one loop",
    "Each phase leaves a file",
    "Today solo with Snake, tomorrow as a team",
    "Day 5 uses the same loop"
  ],
  notes: "This is the spine of both days. Every assignment from now on is labelled with its phase. Plan: what do we want (intent.md). Design: how do we build it (a plan in layers, tomorrow a spec). Build: small steps, commit what works. Test: evidence, not confidence. Deploy: on GitLab, where others can see it. Maintain: hand it over in PROGRESS.md, and every bug becomes a test. Day 5 (AI-native SDLC) uses exactly this loop and these file names, so the team project on Days 6 and 7 starts from something familiar. Link back to the working method on the previous slide: the working method is what you do inside one step; the SDLC is the whole journey."
},

{ // Slide 41
  title: "Ground rules: what you share",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "From now on you work on your own laptop. These rules apply both days.",
  type: "context",
  visual: { checklist: 0, bot: 'think', place: 'left' },
  cards: [
    { title: "What you share", body: "Practice data only: no Worldline or customer data\nNo passwords, API keys or internal documents\nNo real photos or personal details in your game\nPush only to your own repo on Worldline's GitLab" }
  ],
  tagline: "Not even to try.",
  keyPoints: ["Say each line out loud","Practice data only","No passwords, keys or internal documents","No real photos or personal details","Push only to your own GitLab repo"],
  notes: "From now on everyone works on their own laptop, so say these out loud, once. Practice data only: no Worldline data and no customer data. No passwords, API keys or internal documents. No real photos, contact details or confidential text in what you build: your avatar this afternoon is a generated picture. Push only to your own repo on Worldline's GitLab: that is where your game lives this afternoon. Not even to try anywhere else."
},

{ // Slide 42
  title: "Ground rules: what you approve",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Claude Code asks before it acts. You decide.",
  type: "context",
  visual: { badges: ['🔍', '🔐', '🛡️'], bot: 'point', place: 'aside',
    highlight: [{ in: 'tagline', text: 'say no', tone: 'orange' }] },
  cards: [
    { title: "Read before you approve", body: "" },
    { title: "Never skip permissions", body: "" },
    { title: "Respect IT policy", body: "" }
  ],
  tagline: "Not sure what it does? Then say no, and ask Claude to explain.",
  keyPoints: ["Read before you approve: don't understand it, say no","Never turn all approvals off","IT says no = no workarounds","Next: how approving works"],
  notes: "Three rules about what you approve. Read before you approve: if you don't understand a command, say no and ask Claude what it does. Never skip permissions: don't use the option that turns all approvals off, whoever suggests it. Respect IT policy: if something is blocked, that is the answer. No workarounds, no personal accounts, no borrowed logins or keys. The next slide shows how approving works in Claude Code."
},

{ // Slide 43
  title: "Watch: where you'll be tonight",
  kicker: "DAY 1 · PART 2 · LIVE DEMO",
  subtitle: "The trainer opens a finished game in VS Code. Every file you see is one lesson today.",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: "aether-snake/", body: "intent.md              what you want\nCLAUDE.md              how Claude works here\nindex.html  style.css  snake.js\ntests/                 the test\nassets/                your avatar\nPROGRESS.md            the handover\n.mcp.json              the GitLab connection\n.claude/settings.json  rules + hook" },
    { title: "Watch for", body: "Who wrote each file: you or Claude?\nWhat Claude reads at the start of every session.\nWhich file holds the rules Claude can't ignore.\nThe git history: one commit per step." }
  ],
  tagline: "You start from an empty folder. Tonight yours looks like this.",
  keyPoints: [
    "Finished game in VS Code, terminal next to it",
    "Click through each file: one lesson each",
    "Show the git log: one commit per step",
    "Start claude in it: it already knows the project",
    "Participants start empty"
  ],
  notes: "This replaces a tour of loose tips: show the destination first. Before class, build this repo yourself by doing today's assignments once (about 45 minutes); keep it on your laptop. Open it in VS Code with the terminal next to it. Click through the files top to bottom and say one sentence each: intent.md is what we wanted, CLAUDE.md is what Claude reads every session, the game files are what Claude built, tests/ is the evidence, .claude/settings.json holds the rules Claude can't ignore and the hook, .mcp.json is the GitLab connection, PROGRESS.md is the handover. Then type git log --oneline: one commit per step. Start claude and ask 'What is this project?': it answers from CLAUDE.md. End with: you start from an empty folder, and tonight yours looks like this. Participants never get this repo; they build their own."
},

{ // Slide 44
  title: "Modes: how much Claude may do by itself",
  kicker: "DAY 1 · PART 2 · MODES",
  subtitle: "Shift+Tab switches the mode. You see it at the bottom of the screen.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "plan mode", tone: "orange" }] },
  cards: [
    { title: "Normal", body: "Asks before every file edit and every command. Best while you learn." },
    { title: "Accept edits", body: "Edits files without asking. Commands still ask." },
    { title: "Plan", body: "Reads and plans. Changes nothing until you approve the plan." },
    { title: "Auto", body: "Keeps going without asking. Risky actions are still checked and can be blocked." }
  ],
  tagline: "Start every task in plan mode. Read the plan, then decide how much freedom Claude gets.",
  keyPoints: [
    "Shift+Tab cycles the modes",
    "Normal: asks for everything",
    "Accept edits: files yes, commands ask",
    "Plan: read-only until you approve",
    "Auto: if your setup has it, still checked"
  ],
  notes: "The mode is the first thing the user controls: how much may Claude do before it asks? Show it live: press Shift+Tab a few times and read the label at the bottom. Normal asks before every edit and command. Accept edits lets file edits through, commands still ask. Plan mode is read-only: Claude explores and comes back with a plan, nothing changes until you approve. Auto mode, if your setup has it, keeps going, while risky actions are still checked and can be blocked. There is also an option to skip all permission checks for automated setups: mention that it exists and that we don't use it. Before class, press Shift+Tab on your teaching laptop, so the names you say match what the room sees (they depend on the version and the company settings)."
},

{ // Slide 45
  title: "The / menu",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Type / and Claude Code shows everything it can do.",
  type: "concept",
  visual: { lineReveal: 0, bot: 'head', place: 'beside' },
  cards: [
    { title: "Try these", body: "/help: everything Claude Code can do\n/model: choose Haiku, Sonnet or Opus\n/permissions: what Claude may do without asking\n/statusline: what you see at the bottom\n/memory: open your CLAUDE.md\nYour skills: they show up in this menu too" }
  ],
  keyPoints: ["Type / live","/help, /model","/permissions: link to the gate","/statusline: show a nice one","/memory opens CLAUDE.md","Skills appear here too (Day 2)"],
  notes: "Type / live and scroll through the menu. /help shows everything Claude Code can do. /model lets you choose Haiku, Sonnet or Opus: remember the model-choice slide. /permissions shows what Claude may do without asking: the gate from a few slides ago. /statusline sets what you see at the bottom of the screen; show a good example. /memory opens your CLAUDE.md, which is coming up. And the skills you install or make show up in this menu too: that's tomorrow."
},

{ // Slide 46
  type: "practice",
  layout: "exercise",
  title: "Assignment 1: Start Claude Code in your own folder",
  kicker: "DAY 1 · ASSIGNMENT 1 · SETUP",
  subtitle: "An empty folder is all you need. No GitLab yet.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "You need a place to work, and a feel for the tool before it builds anything." },
    { title: "What you see", body: "“Do you trust this folder?” Answer yes.\nThe mode at the bottom.\nThe / menu with every built-in command." },
    { title: "Extra", body: "claude --help in the terminal: every way to start Claude Code." }
  ],
  steps: [
    "Open a terminal.",
    "mkdir aether-snake && cd aether-snake && git init",
    "Type claude. Trust the folder: yes.",
    "Type / and scroll. Try /help and /model.",
    "Press Shift+Tab until you see plan mode. Then back to normal."
  ],
  expected: "Claude Code runs in your own folder, and you can switch modes.",
  prompt: "mkdir aether-snake\ncd aether-snake\ngit init\nclaude",
  keyPoints: [
    "git init: a repo on your own laptop, offline",
    "Trust the folder: say yes",
    "/ menu, /help, /model",
    "Shift+Tab: find plan mode",
    "Stuck? Say it now"
  ],
  notes: "git init turns the folder into a git repository on your own laptop: no GitLab, no internet needed. GitLab comes later, when there is something to share. The trust question matters: Claude Code only applies a project's own allow rules once the folder is trusted, so whoever says no will think their rules are broken this afternoon. Let everyone scroll the / menu and look at /model (link back to model choice this morning). Shift+Tab until plan mode shows, then back. Walk around: whoever can't start claude gets fixed now."
},

{ // Slide 47
  type: "practice",
  layout: "exercise",
  title: "Assignment 2: Let Claude interview you",
  kicker: "DAY 1 · ASSIGNMENT 2 · PLAN",
  subtitle: "Before Claude builds anything, decide what you want. In plan mode.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "One vague prompt gives you a game you didn't ask for. Agree first what you want." },
    { title: "What you see", body: "Claude asks one question at a time. Then intent.md appears. Nothing else changes." },
    { title: "Look inside", body: "Open intent.md in VS Code. Would a stranger know what “done” means?" }
  ],
  steps: [
    "Shift+Tab to plan mode.",
    "Paste the Example prompt. Answer Claude's questions.",
    "Approve the plan so Claude writes intent.md.",
    "Open intent.md in VS Code and read it."
  ],
  expected: "An intent.md with your outcome, done-when checks, boundaries and open questions.",
  prompt: "Ask me questions, one at a time, about the Snake game I want to build. Then write intent.md with:\n- Outcome: what the game does\n- Done when: three checks anyone can verify\n- Boundaries: what you must not do (for example: no outside links, no personal data)\n- Open questions\nDon't write any code yet.",
  keyPoints: [
    "Plan phase: what do we want?",
    "Claude interviews, you answer",
    "intent.md: outcome, checks, boundaries, OPEN",
    "Nothing else changes in plan mode",
    "Same file as Day 5"
  ],
  notes: "The Plan phase. In plan mode Claude can't change anything except through the plan you approve. Let it interview them: one question at a time is the point, because it makes people decide things they would otherwise leave vague. intent.md is the same file Day 5 starts with, so this is practice for the team project. Extra for the experienced: push back on a check that is a wish ('the game is fun') until it is something anyone can verify ('the snake can't reverse into itself')."
},

{ // Slide 48
  title: "Your AI in Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "What your Claude Code already brings, and what it will get from you.",
  type: "concept",
  visual: { art: 'intake', bot: 'head', place: 'aside', tags: { 3: 'images' } },
  cards: [
    { title: "Memory", body: "CLAUDE.md: who you are, what you do, how it should work with you." },
    { title: "Hands and feet", body: "MCP connections: GitLab this afternoon. Jira and Confluence in the support days." },
    { title: "Defaults", body: "Settings, rules and the model it starts with." },
    { title: "LibreChat", body: "For your basic questions, and for images: this afternoon you make your avatar there." }
  ],
  tagline: "We set this up with you, step by step.",
  keyPoints: ["Opens the tour: the map first","Memory: CLAUDE.md, before lunch","Hands and feet: GitLab this afternoon","Defaults: settings and model","LibreChat: questions and your avatar","We set it up together"],
  notes: "This opens the tour: draw the landscape once, so they see it before they need it. Your Claude Code is your personal assistant. It gets a memory (CLAUDE.md: who you are and how it should work with you, which you write before lunch), hands and feet through MCP connections (GitLab this afternoon; Jira and Confluence come in the support days), and defaults: settings, rules and the model it starts with. LibreChat is for basic questions and for images: this afternoon everyone makes their avatar there. Don't explain each piece in depth: all of them come back today, and we set them up together."
},

{ // Slide 49
  title: "Your context window in Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "The window from this morning, now on your own screen.",
  type: "concept",
  visual: { cmdCards: [0, 1, 2],
    highlight: [{ in: 'tagline', text: 'starts empty', tone: 'orange' }] },
  cards: [
    { title: "See it", body: "/context\nWhat fills your context window right now, in tokens." },
    { title: "Start fresh", body: "/clear\nA new conversation for a new task." },
    { title: "Make room", body: "/compact\nClaude summarises the conversation so far and goes on." }
  ],
  tagline: "A new session starts empty, apart from CLAUDE.md and memory.",
  keyPoints: ["Link back to the context window slide","/context live: show what fills it","/clear: new task, new conversation","/compact: summarise and go on","New session = empty, apart from CLAUDE.md"],
  notes: "This makes the context window from Part 1 concrete. Type /context live: it shows what fills the window right now, counted in tokens, including the system prompt, tools and CLAUDE.md. A long conversation fills it up and, just like on the Lego slide, irrelevant blocks pull attention away. /clear starts a fresh conversation: do that when you switch to a new task. /compact lets Claude summarise the conversation so far, so you can go on with more room. The tagline sets up the next slides: a new session starts empty, apart from what is written down in CLAUDE.md and memory."
},

{ // Slide 50
  title: "Context grows",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "The more you work with it, the more it knows.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Your first prompt", body: "It knows nothing about you yet. Everything comes from the prompt." },
    { title: "In one conversation", body: "Every prompt and answer adds context." },
    { title: "Day after day", body: "Only what is written down, in CLAUDE.md and memory files, carries over to the next session." }
  ],
  tagline: "What does Claude Code know about you today?",
  keyPoints: ["Rising line: experience grows","First prompt: knows nothing","Conversation adds context","A new session starts empty","Only what's written down carries over","Ask: what does it know about you today?"],
  notes: "Working with AI is a rising line. Your very first prompt starts from zero: it knows nothing about you. Within one conversation every prompt and answer adds context. A new session starts empty again: the model itself does not learn from you. Only what is written down, in CLAUDE.md and memory files, is read again next time. End on the question: what does Claude Code know about you today? For most people: nothing yet. That's what you fix in a few minutes, with your own CLAUDE.md."
},

{ // Slide 51
  title: "What does AI need to know first?",
  kicker: "DAY 1 · PART 2 · CLAUDE.MD",
  subtitle: "What would you tell a new colleague before they touch your project?",
  type: "context",
  visual: { reveal: 'click', buttons: true, bot: 'think', place: 'slot' },
  cards: [
    { title: "Who you are", body: "Your role, and what you need from this." },
    { title: "The project", body: "What it is and where things live." },
    { title: "The goal", body: "What “done” looks like." },
    { title: "The limits", body: "What it must not change, and when to stop and ask." },
    { title: "How to work", body: "Investigate first, show the plan, small changes, show evidence, mark OPEN, wait for approval." }
  ],
  keyPoints: ["Ask the room first", "Collect answers on the flipchart", "Then reveal one card at a time", "Last card = our working agreement", "This is what goes in a CLAUDE.md"],
  notes: "Don't show the answers yet. Ask the room: before a new colleague touches your project, what do you tell them first? Collect answers on the flipchart for a minute or two. Then reveal the cards one by one (click or →) and match them to what the room said. The last card is the working agreement for every exercise: investigate before changing, show the plan first, make small changes, run relevant checks, show evidence, mark uncertainty as OPEN and wait for human approval before committing. Frame it as the room's own agreement with Claude Code, not a rule imposed from outside. Then the bridge: Claude Code is that new colleague, every session again. You don't want to tell it all this every time, so you write it down once: that's CLAUDE.md, next."
},

{ // Slide 52
  title: "CLAUDE.md and memory",
  kicker: "DAY 1 · PART 2 · CLAUDE.MD",
  subtitle: "How Claude Code gets to know you, and your project.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "card:2", text: "written down", tone: "orange" }] },
  cards: [
    { title: "~/.claude/CLAUDE.md", body: "About you. Loaded in every project. Stays on your laptop." },
    { title: "CLAUDE.md in the project", body: "About this project. Shared with the team through git." },
    { title: "CLAUDE.local.md", body: "Your own notes for this project. Not in git." },
    { title: "Memory", body: "The model doesn't learn from you. What carries over is what's written down. /memory shows it." }
  ],
  keyPoints: [
    "Root CLAUDE.md = you, everywhere",
    "Project CLAUDE.md = this project, the team",
    "Read at the start of every session",
    "The model itself doesn't learn",
    "Only what's written down carries over"
  ],
  notes: "Three CLAUDE.md files, three scopes: you (~/.claude/CLAUDE.md, every project, stays on your laptop), the project (CLAUDE.md, shared through git), and you in this project (CLAUDE.local.md, not in git). A line like @intent.md pulls another file in at the start. Claude Code can also keep its own memory notes (auto memory) when you tell it to remember something; /memory shows and opens all of them. The model itself never learns from you: only what's written down carries over. Everything here is loaded in every session, which is why it should stay short: tomorrow we'll move detail out of it.",
  tagline: "Loaded at the start of every session, so keep it short."
},

{ // Slide 53
  type: "practice",
  layout: "exercise",
  title: "Assignment 3: A CLAUDE.md for your game",
  kicker: "DAY 1 · ASSIGNMENT 3 · PLAN",
  subtitle: "Tell Claude once how to work in this project.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "After /clear, Claude has forgotten the whole conversation. You don't want to repeat yourself." },
    { title: "What you see", body: "Before: “I don't know this project.” After /clear: it knows your rules." },
    { title: "Extra", body: "A personal ~/.claude/CLAUDE.md with your role and one preference. It stays on your laptop." }
  ],
  steps: [
    "Type /clear, then ask: “What is this project?”",
    "Paste the Example prompt. Read the file before you approve.",
    "/clear again, and ask the same question.",
    "Type /memory: which CLAUDE.md files are loaded?"
  ],
  expected: "After /clear, Claude still knows your project's rules.",
  prompt: "Write a short CLAUDE.md for this project:\n- A Snake game in plain HTML, CSS and JavaScript. No frameworks, no outside links.\n- Tests live in tests/.\n- Always show me a plan before you change files.\n- The player name is a nickname. No real names, emails or other personal data in this repo.\n- Read @intent.md for what we're building.\nKeep it under 15 lines. Show it to me before you save it.",
  keyPoints: [
    "/clear empties the conversation",
    "CLAUDE.md is loaded every session",
    "@intent.md pulls in another file",
    "Keep it short: it costs tokens every session",
    "/memory shows what's loaded"
  ],
  notes: "Let them feel the problem first: /clear, then 'What is this project?', and Claude doesn't know. Then the CLAUDE.md, then /clear and the same question: now it knows. That is the difference between context (the conversation, gone after /clear) and memory (what's written down). @intent.md pulls that file in at the start of every session. Keep it short: everything in CLAUDE.md is loaded in every session and costs tokens every time. The nickname rule matters for tomorrow's arcade: Claude now guards it too. Watch for: someone with a personal CLAUDE.md rule like 'use Tailwind' will see it clash with 'no frameworks'; in the dry run Claude flagged it in layer 1 but quietly added Tailwind in layer 4. Great moment to ask: which rule wins, and why?"
},

{ // Slide 54
  title: "Decide first what Claude may do",
  kicker: "DAY 1 · PART 2 · PERMISSIONS",
  subtitle: "Claude is about to edit your files and run commands. You set the rules before it starts.",
  type: "concept",
  visual: { stepThrough: true, guides: [["🧭", "CLAUDE.md", "asks Claude"], ["🔒", "settings.json", "enforces"]] },
  cards: [
    { title: "Allow", body: "Claude may do it without asking. For example: running the tests." },
    { title: "Ask", body: "Claude must ask you first, every time. For example: git commit, git push." },
    { title: "Deny", body: "Never, even if you ask. For example: git push --force, rm -rf." },
    { title: "Where", body: "~/.claude/settings.json: you, everywhere\n.claude/settings.json: this project, shared\n.claude/settings.local.json: this project, only you\nCompany settings: always win" }
  ],
  tagline: "A rule in CLAUDE.md can be forgotten. A rule in settings.json can't.",
  keyPoints: [
    "CLAUDE.md = a request, settings = enforced",
    "Permissions: always allow / never allow",
    "Hooks: Claude Code runs them, not Claude",
    "Shared file vs local file",
    "Two assignments follow: 5 and 6"
  ],
  notes: "Comes right after the CLAUDE.md assignment: CLAUDE.md asks Claude, settings.json enforces. Three kinds of rules: allow (no question), ask (a question every time), deny (never, even when asked; deny wins when rules overlap). Four levels: your own settings everywhere, the project's settings shared through git, the project's local settings only for you, and company-managed settings that always win (Worldline may have some). /permissions shows what's active. Claude Code always asks before it writes a settings file, and the project's allow rules only apply once you've trusted the folder. Hooks live in the same file; they come this afternoon."
},

{ // Slide 55
  type: "practice",
  layout: "exercise",
  title: "Assignment 4: House rules before you build",
  kicker: "DAY 1 · ASSIGNMENT 4 · PLAN",
  subtitle: "Ask before saving. Never anything you can't undo.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Claude is about to touch your files and run git. Decide now, not after something goes wrong." },
    { title: "What you see", body: "Claude asks before it writes .claude/settings.json. Then “force push” is blocked." },
    { title: "Look inside", body: "Open .claude/settings.json. Which line blocked the force push?" }
  ],
  steps: [
    "Paste the Example prompt. Read the file before you approve.",
    "Restart Claude (/exit, then claude) and type /permissions.",
    "Test it: ask Claude to “force push”.",
    "What happened? Which rule did that?"
  ],
  expected: "Commit and push ask you first. Force push and rm -rf are blocked.",
  prompt: "Write .claude/settings.json for this project:\n- Ask me before every git commit and every git push.\n- Never allow git push --force or rm -rf.\nShow me the file before you save it.",
  keyPoints: [
    "Permissions before building",
    "ask: commit and push",
    "deny: force push, rm -rf",
    "Writing settings.json always asks you",
    "/permissions shows what's active"
  ],
  notes: "A good result looks like: { \"permissions\": { \"ask\": [\"Bash(git commit*)\", \"Bash(git push*)\"], \"deny\": [\"Bash(git push --force*)\", \"Bash(git push -f*)\", \"Bash(rm -rf *)\"] } }. Claude often writes stricter rules than this (more variants of force push); that's fine and worth a word: pattern rules are strong guardrails, not watertight. Claude Code always asks before writing .claude/settings.json, even in accept-edits mode: that's a safety feature, read it. After a restart, /permissions shows the rules. 'Force push' is blocked by Claude Code itself, not by Claude being polite. If a rule doesn't seem to apply, check that the folder was trusted at the start."
},

{ // Slide 56
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

{ // Slide 57
  title: "Lunch",
  kicker: "DAY 1 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: "wave", place: "beside" },
  cards: [
    { title: "Back at 13:00", body: "We continue with your own Snake." }
  ],
  keyPoints: [
    "Lunch: resume at 13:00",
    "Fix anyone still stuck on setup",
    "Check the GitLab MCP command works",
    "Assignments start right after lunch"
  ],
  notes: "Exact resume time: 13:00. Use the break to fix anyone whose Claude Code still doesn't work, and check on your own laptop that the GitLab MCP command you hand out works (Assignment 7 this afternoon)."
},


/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 3: Snake through the SDLC (afternoon)                     */
/* ---------------------------------------------------------------------- */

{ // Slide 58
  title: "Aether Game",
  kicker: "DAY 1 · PART 3 · AETHER GAME",
  subtitle: "This afternoon you build Snake step by step, and every step leaves something behind.",
  type: "context",
  visual: { stagger: "pop", stepThrough: true, bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "Aether Arcade", tone: "orange" }] },
  cards: [
    { title: "Design", body: "A plan in layers." },
    { title: "Build", body: "One layer at a time. Commit and push what works." },
    { title: "Test", body: "A test that finds a bug you didn't see." },
    { title: "Rules and a hook", body: "Rules that grow, and a check that runs by itself." },
    { title: "Your avatar", body: "A nickname and an avatar, for tomorrow's leaderboard." }
  ],
  tagline: "Tomorrow your game joins the Aether Arcade.",
  keyPoints: [
    "Own repo on GitLab",
    "Snake in layers, no skills yet",
    "Avatar from LibreChat",
    "House rules and a test hook",
    "Tomorrow: the arcade"
  ],
  notes: "The afternoon walks the rest of the loop with Snake: design in layers, build one layer at a time with the git rhythm (works, commit, push), a test that finds a real bug, rules that grow and a hook, your avatar, and a handover at the end. Tomorrow every game joins the Aether Arcade, so keep it working and on GitLab."
},

{ // Slide 59
  type: "practice",
  layout: "exercise",
  title: "Assignment 5: Plan it in layers",
  kicker: "DAY 1 · ASSIGNMENT 5 · DESIGN",
  subtitle: "One big prompt gives you a game you can't steer.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "If Claude builds it all at once, you can't tell what broke, or why." },
    { title: "What you see", body: "A plan with layers: skeleton, controls, food and score, game over. Each with a check." },
    { title: "Look inside", body: "Can you do every layer's check in 10 seconds?" }
  ],
  steps: [
    "Plan mode (Shift+Tab).",
    "Paste the Example prompt.",
    "Read the plan. Too big? Say so, and ask for smaller layers.",
    "Approve only when every layer is small."
  ],
  expected: "A plan of four layers, each with its own check, and nothing built yet.",
  prompt: "Read intent.md. Make a plan to build it in layers: skeleton, controls, food and score, game over. For each layer: which files change, and how I can check in 10 seconds that it works. Don't build yet.",
  keyPoints: [
    "Design phase",
    "Layers you can steer",
    "Each layer has a 10-second check",
    "Reject a plan that's too big",
    "Nothing built yet"
  ],
  notes: "The Design phase. Say it out loud: one prompt can build Snake (the dry run did it in under a minute), but then you can't steer it and you learn nothing about what's in the files. Layers are how real software gets built too. The experienced people's Extra: reject the first plan and steer it ('smaller', 'one file per layer')."
},

{ // Slide 60
  title: "Watch: Snake in layers",
  kicker: "DAY 1 · PART 3 · LIVE DEMO",
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
  keyPoints: [
    "Build it live, layer by layer",
    "Plan mode, read the plan, approve",
    "Play after every layer",
    "Show what goes wrong, and fix it",
    "One prompt works, but you learn nothing"
  ],
  notes: "Build layer 1 live on the projector, with VS Code next to the terminal, from the plan you made in Assignment 5. Plan mode, read the plan, approve, then point at VS Code: these three files appeared, this is what's in them. Play it. Then layer 2, and show that only snake.js changed. Say it out loud: one prompt can build Snake, but then you can't steer it and you learn nothing. Layers are how real software gets built too."
},

{ // Slide 61
  title: "Git in three words",
  kicker: "DAY 1 · PART 3 · GIT",
  subtitle: "Your game lives in a repository. Today you need one rhythm.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, bot: "point", place: "beside", highlight: [{ in: "tagline", text: "it works → commit → push", tone: "orange" }] },
  cards: [
    { title: "Repository", body: "A project folder that remembers every version of every file. git init made yours." },
    { title: "Commit", body: "A save point you can always go back to. Make one for every layer that works." },
    { title: "Push", body: "Sends your commits to GitLab: safe, and visible to others." }
  ],
  tagline: "The rhythm: it works → commit → push. Claude runs git, you decide.",
  keyPoints: [
    "For everyone who doesn't use git daily",
    "Repository: a folder with history",
    "Commit: a save point, every working layer",
    "Push / pull: to and from GitLab",
    "Claude runs git, you decide"
  ],
  notes: "For everyone who doesn't use git every day; developers can nod along. Today is only the rhythm: a layer works, commit, push. Claude runs the git commands and asks first (the rule from Assignment 4). Branches, merge requests and the rest come tomorrow, when there's a reason for them."
},

{ // Slide 62
  type: "practice",
  layout: "exercise",
  title: "Assignment 6: Build layer 1, look inside, commit",
  kicker: "DAY 1 · ASSIGNMENT 6 · BUILD",
  subtitle: "A small step. Understand it. Save it.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "It works. Make a save point before you change anything else." },
    { title: "What you see", body: "index.html, style.css and snake.js appear. Claude asks before it commits." },
    { title: "Look inside", body: "Ask Claude to explain @snake.js. Which part moves the snake?" }
  ],
  steps: [
    "“Build layer 1 from the plan.” Approve the edits.",
    "Open index.html in your browser: does the snake move?",
    "Ask: “Explain @snake.js in plain words.”",
    "Type !git status: which files are new?",
    "“Commit this layer with a clear message.” Approve."
  ],
  expected: "Layer 1 works, you can explain it, and it's committed.",
  prompt: "Build layer 1 from the plan.\n\nThen:\nExplain @snake.js in plain words.\n\nThen:\nCommit this layer with a clear message.",
  keyPoints: [
    "Build phase: one layer",
    "@file points Claude at a file",
    "!command runs it yourself",
    "Commit = save point",
    "Claude asks: your rule from Assignment 4"
  ],
  notes: "Three new controls: @snake.js points Claude straight at a file, so it doesn't have to search (cheaper and faster). !git status runs a command yourself, and the output lands in the conversation. And the commit asks first, because of the rule from Assignment 4. In the dry run Claude sometimes proposed a branch before committing: today say 'commit straight to main'; branches come tomorrow, when there's a reason for them. Look inside is the real lesson of this assignment: if nobody can say which part moves the snake, slow down."
},

{ // Slide 63
  title: "Model Context Protocol",
  kicker: "DAY 1 · PART 3 · MCP & GITLAB",
  subtitle: "One standard plug for approved connections.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'does not remove permissions or human responsibility', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "MCP standardises how AI applications connect to approved information and capabilities." },
    { title: "An MCP server may expose", body: "resources\nreusable prompts\ntools" }
  ],
  tagline: "Connecting a server does not remove permissions or human responsibility.",
  keyPoints: ["Say the tagline explicitly","Link to the working agreement","Connected is not allowed to change"],
  notes: "Say the tagline explicitly and connect it back to the working agreement (What does AI need to know first?): being connected to something is not the same as being allowed to change it. An MCP tool goes through the same allow, ask and deny rules as a file edit or a command, so a read-only tool can be allowed and anything that writes can be ask or deny. Next: you connect GitLab yourself."
},

{ // Slide 64
  title: "git, GitLab and MCP",
  kicker: "DAY 1 · PART 3 · MCP & GITLAB",
  subtitle: "Three different things, often mixed up.",
  type: "concept",
  layout: "compare",
  columns: [
    { title: "git", items: ["Your folder and its history, on your own laptop.", "Works offline. git init made it."] },
    { title: "GitLab", items: ["The online copy of your repo.", "Safe if your laptop breaks. Others can see it."] },
    { title: "GitLab MCP", items: ["Lets Claude itself talk to GitLab:", "create a project, open a merge request, read an issue."], foot: "Your files never need MCP." }
  ],
  keyPoints: [
    "Keep the distinction crisp",
    "So far: built-in file tools only",
    "MCP is for everything outside",
    "Next: connect GitLab"
  ],
  notes: "Keep this crisp, it's the most common confusion. git is local: your folder and its history, no internet needed. GitLab is where the history is stored and shared; git push sends it there. The GitLab MCP is only so that Claude itself can act on GitLab: create the project, later open merge requests. Claude reads your files with its own built-in tools, no MCP needed."
},

{ // Slide 65
  type: "practice",
  layout: "exercise",
  title: "Assignment 7: Put your game on GitLab",
  kicker: "DAY 1 · ASSIGNMENT 7 · DEPLOY",
  subtitle: "Your save points are only on your laptop. Put them somewhere safe.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Laptop gone, game gone. On GitLab it's safe, and tomorrow the arcade needs it." },
    { title: "What you see", body: "/mcp shows GitLab connected. Claude creates the project, then asks before it pushes." },
    { title: "Look inside", body: "Open the project on GitLab. Is your commit there?" }
  ],
  steps: [
    "Add the GitLab MCP server: your trainer gives you the command.",
    "Start claude, type /mcp and log in to GitLab.",
    "Paste the Example prompt. Approve the push.",
    "Open the project on GitLab in your browser."
  ],
  expected: "Your game and its commits are in a private project on GitLab.",
  prompt: "Create a private project called aether-snake-[nickname] in my personal GitLab space. Add it as the remote and push main. Ask me before you push.",
  keyPoints: [
    "Deploy phase: put it where others can see it",
    "MCP: Claude talks to GitLab",
    "/mcp: connect and log in",
    "The push asks: your rule",
    "No GitLab access: stay local"
  ],
  notes: "Now MCP becomes real. git is on your laptop; GitLab is the online copy; the GitLab MCP is what lets Claude itself create the project. The push asks first, because of the house rule. Check before the course that every participant has GitLab access; most managers do, not all. Anyone without it keeps working locally all afternoon: everything else works the same, and they watch the push on the projector. From now on the rhythm is: it works, commit, push."
},

{ // Slide 66
  title: "Undo: checkpoints and commits",
  kicker: "DAY 1 · PART 3 · UNDO",
  subtitle: "Two ways back, with a different reach.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "always", tone: "orange" }] },
  cards: [
    { title: "Esc Esc", body: "Rewinds Claude's last steps in this session: the conversation, the code, or both. Also: /rewind." },
    { title: "Commit", body: "A save point in git. It stays, and after a push it's on GitLab too." },
    { title: "When which?", body: "Claude just made a mess? Esc Esc.\nYesterday's version? git." }
  ],
  tagline: "Checkpoints are for the last few minutes. Commits are for always.",
  keyPoints: [
    "Esc Esc or /rewind: Claude's recent edits",
    "Code, conversation or both",
    "Commit: permanent, shared after push",
    "Checkpoints don't replace git"
  ],
  notes: "Claude Code keeps a checkpoint before each of its edits. Esc twice (or /rewind) shows a list of earlier points; you choose to restore the code, the conversation, or both. It only covers Claude's own file edits in this session, not what a command did elsewhere, and it is not shared. A commit is permanent and, after a push, on GitLab. Rule of thumb on the slide: last few minutes, Esc Esc; anything older, git. Before class, try Esc Esc on your teaching laptop so you know what the menu looks like in this version."
},

{ // Slide 67
  type: "practice",
  layout: "exercise",
  title: "Assignment 8: Layers 2 and 3, and one rescue",
  kicker: "DAY 1 · ASSIGNMENT 8 · BUILD",
  subtitle: "Same rhythm. One thing goes wrong on purpose.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "Things go wrong. Know how to get back before it matters." },
    { title: "What you see", body: "After Esc Esc the score is back, without git." },
    { title: "Extra", body: "Rewind only the conversation and keep the code. What's the difference?" }
  ],
  steps: [
    "Layer 2 (controls) from the plan. Play it. Commit and push.",
    "Layer 3 (food and score). Play it.",
    "Now on purpose: “Remove the score.”",
    "Press Esc twice, pick the point before, restore the code.",
    "Score back? Commit and push."
  ],
  expected: "Layers 2 and 3 work and are on GitLab, and you've undone a change with Esc Esc.",
  prompt: "Build layer 2 from the plan.\n\nThen:\nBuild layer 3 from the plan.\n\nThen, on purpose:\nRemove the score.",
  keyPoints: [
    "The rhythm: works, commit, push",
    "Break it on purpose",
    "Esc Esc: restore the code",
    "Commit the good version"
  ],
  notes: "The rhythm becomes a habit here: layer works, commit, push. Then the deliberate mistake: 'remove the score', then Esc Esc back to the point before. Nobody should need git for this. The experienced people can compare rewinding the conversation only versus the code only."
},

{ // Slide 68
  title: "A test: evidence, not confidence",
  kicker: "DAY 1 · PART 3 · TESTS",
  subtitle: "Claude says it works. A test shows it, every time.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, bot: "head", place: "beside", highlight: [{ in: "tagline", text: "without you noticing", tone: "orange" }] },
  cards: [
    { title: "What it is", body: "A small piece of code that checks one rule your game must keep." },
    { title: "A good test", body: "Protects a rule you don't see by playing for a moment: moving right and pressing left must not kill you." },
    { title: "Pass or fail", body: "npm test. Red: something broke, and the test says what." }
  ],
  tagline: "Test what can break without you noticing, not what you see straight away.",
  keyPoints: [
    "Back to the working method: Test",
    "One test = one thing the game must do",
    "npm test: pass or fail",
    "Claude saying 'done' is not evidence",
    "Rules and hook today, goals tomorrow"
  ],
  notes: "Link back to the working method: Test, 'evidence, not confidence'. Ask the room: what would you test in Snake? Someone will say 'the snake grows when it eats'. Fair, but that's the game itself: you'd see it break straight away. A good test protects a rule that breaks without anyone noticing, like turning back into yourself: it only shows up when you press the wrong keys fast, and it comes back when the speed or controls change. Tomorrow the tests grow with the levels: food never on a wall."
},

{ // Slide 69
  type: "practice",
  layout: "exercise",
  title: "Assignment 9: A test that finds a bug",
  kicker: "DAY 1 · ASSIGNMENT 9 · TEST",
  subtitle: "The classic Snake bug: turning back into yourself.",
  visual: { shotLabel: "Why, what you see, no Node?" },
  cards: [
    { title: "Why now", body: "You can't play every key combination after every change." },
    { title: "What you see", body: "Red: the bug was there, and Claude fixes the game. Green: Claude already guarded it, so break it on purpose and watch the test catch it." },
    { title: "No Node?", body: "Ask for tests/test.html instead, and open it in your browser: green or red." }
  ],
  steps: [
    "Paste the Example prompt.",
    "Run it yourself: !npm test. Red or green?",
    "Red? Ask Claude to fix the game, not the test.",
    "Green? “Remove the reverse check on purpose”: does the test turn red? Then Esc Esc.",
    "Green again? Commit and push."
  ],
  expected: "A test that checks the reversing rule, and it passes.",
  prompt: "Write a test in tests/ for this rule: when the snake moves right and I press left, the game must not end. The same when I press up and then left very fast. Make it run with npm test. Don't change the game yet: first show me whether the test passes.",
  keyPoints: [
    "Test phase",
    "Test a hidden rule, not the obvious",
    "Reversing: the classic Snake bug",
    "Red: a bug found. Green: break it on purpose",
    "Fix the game, not the test"
  ],
  notes: "Why this test and not 'the snake grows'? Growing is the game itself; you'd see it break immediately. Reversing into yourself is the classic Snake bug: it hides until you press the wrong keys fast, and it comes back when you change the speed or the controls. Some games will be red the first time: the test found a bug nobody saw. In the dry run Claude had already guarded this rule in layer 2, so the test was green; then the point is to break it on purpose (remove the reverse check) and see the test turn red, which proves the test works. A test you've never seen fail is not evidence. Let Claude fix the game, never the test. npm test needs Node and a package.json; Claude makes the package.json. No Node on someone's laptop: a tests/test.html page that shows green or red in the browser works too (the hook in Assignment 11 does need Node; they watch that one on the projector)."
},

{ // Slide 70
  type: "practice",
  layout: "exercise",
  title: "Assignment 10: The rules grow",
  kicker: "DAY 1 · ASSIGNMENT 10 · TEST",
  subtitle: "Now there's a test. Protect it.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Asked to “make the tests pass”, Claude could change the test instead of the game. And it keeps asking to run npm test." },
    { title: "What you see", body: "“Run the tests”: no question.\n“Change the test so it passes”: Claude has to ask you, and you say no." },
    { title: "Look inside", body: "/permissions: where do your new rules show up?" }
  ],
  steps: [
    "Paste the Example prompt. Read it before you approve.",
    "Restart Claude and type /permissions.",
    "Test it: “run the tests”.",
    "Test it: “change the test so it passes”. Say no."
  ],
  expected: "npm test runs without asking, and a change to tests/ always needs your yes.",
  prompt: "Add to .claude/settings.json:\n- allow: npm test, without asking\n- ask: any edit in tests/\nKeep the rules that are already there. Show me the file before you save it.",
  keyPoints: [
    "Rules grow with the project",
    "allow: npm test",
    "ask: edits in tests/",
    "Why ask, not deny",
    "Approving safe things over and over trains clicking yes"
  ],
  notes: "allow for npm test: approving a safe command over and over only teaches people to click yes without reading. ask for tests/, not deny: tomorrow they'll add new tests, so the rule is 'a test only changes with my yes'. When Claude asks to change a test so it passes, the human says no: that's the point. Deny stays for things that should never happen (force push, rm -rf). Deny beats ask beats allow when several rules match."
},

{ // Slide 71
  title: "Hooks: a check that runs by itself",
  kicker: "DAY 1 · PART 3 · HOOKS",
  subtitle: "Permissions decide what Claude may do. A hook decides what always happens.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "never", tone: "orange" }] },
  cards: [
    { title: "When", body: "At a fixed moment: before a tool runs (PreToolUse), after it ran (PostToolUse), or when Claude stops (Stop)." },
    { title: "What", body: "A command, for example npm test. It runs outside Claude's head, so it costs almost no tokens." },
    { title: "Exit code 2", body: "A hook that fails with exit code 2 sends its message back to Claude, and Claude has to deal with it." }
  ],
  tagline: "You forget to run the test. A hook never does.",
  keyPoints: [
    "Hooks live in settings.json too",
    "PreToolUse can block, PostToolUse checks after",
    "Runs outside the context: almost free",
    "Exit 2: the message goes back to Claude",
    "/hooks shows them"
  ],
  notes: "A hook is a command Claude Code itself runs at a fixed moment; Claude doesn't have to remember it and can't skip it. PreToolUse runs before a tool and can block it (for example: refuse any command that mentions tests/). PostToolUse runs after, which is where 'run the tests after every edit' goes. Stop runs when Claude thinks it's done. Exit code 2 means: this failed, tell Claude. Hooks run outside the context window, so only their output costs tokens. Day 5 builds a guard hook with allow, ask and deny on every tool call: this is the first step."
},

{ // Slide 72
  type: "practice",
  layout: "exercise",
  title: "Assignment 11: Let a hook guard your game",
  kicker: "DAY 1 · ASSIGNMENT 11 · TEST",
  subtitle: "After every change, the test runs by itself.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "You keep forgetting to run the test after a change." },
    { title: "What you see", body: "Make the snake faster. If that breaks the reversing rule, the hook catches it and Claude has to fix it." },
    { title: "Look inside", body: "/hooks: is your hook there? Which event, which matcher?" }
  ],
  steps: [
    "Paste the Example prompt. Read the hook before you approve.",
    "Restart Claude and type /hooks.",
    "Ask: “Make the snake twice as fast.”",
    "Watch the hook run. Red? What does Claude do now?",
    "Not happy? “Throw that change away”, or Esc Esc."
  ],
  expected: "After every file change the test runs by itself, and a break gets caught.",
  prompt: "Add a hook to .claude/settings.json: after every file edit, run npm test. If the test fails, send the output back to you (exit code 2). Keep the existing rules. Show me the file before you save it.",
  keyPoints: [
    "PostToolUse, matcher Edit|Write",
    "npm test, failures back to Claude",
    "Change something risky",
    "The hook catches what you'd miss",
    "Throw away or rewind"
  ],
  notes: "A good result: \"hooks\": { \"PostToolUse\": [ { \"matcher\": \"Edit|Write\", \"hooks\": [ { \"type\": \"command\", \"command\": \"npm test 1>&2 || exit 2\" } ] } ] }. The dry run confirmed the flow: the hook ran after each edit, the failing test went back to Claude, and because tests/ needs a yes, Claude couldn't quietly change the test; it reported the conflict instead. The broken change stays in the file until someone undoes it: 'throw that change away' (Claude runs git restore) or Esc Esc. If the hook doesn't fire, check /hooks and restart Claude in the project folder."
},

{ // Slide 73
  title: "Example: a complete settings.json",
  kicker: "DAY 1 · PART 3 · SETTINGS",
  subtitle: "Your house rules and your hook together in one file: .claude/settings.json",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: ".claude/settings.json", body: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"ask\": [\n      \"Bash(git commit*)\",\n      \"Bash(git push*)\",\n      \"Edit(tests/**)\",\n      \"Write(tests/**)\"\n    ],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(git push -f*)\",\n      \"Bash(rm -rf *)\"\n    ]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npm test 1>&2 || exit 2\"\n          }\n        ]\n      }\n    ]\n  }\n}" },
    { title: "How to read it", body: "allow: without asking\nask: asks you every time\ndeny: never, even if you ask\nPostToolUse: runs after Claude used a tool\nmatcher Edit|Write: only after file changes\nexit 2: a failed test goes back to Claude" }
  ],
  tagline: "One file, shared with your team. Rules are enforced, not requested.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"ask\": [\n      \"Bash(git commit*)\",\n      \"Bash(git push*)\",\n      \"Edit(tests/**)\",\n      \"Write(tests/**)\"\n    ],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(git push -f*)\",\n      \"Bash(rm -rf *)\"\n    ]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npm test 1>&2 || exit 2\"\n          }\n        ]\n      }\n    ]\n  }\n}",
  keyPoints: [
    "Assignments 5 + 6 in one file",
    "allow / deny under permissions",
    "PostToolUse hook, Edit|Write",
    "exit 2 sends the failure to Claude",
    "settings.local.json = only you"
  ],
  notes: "Reference slide: this is what .claude/settings.json looks like after Assignments 4, 10 and 11, so participants can compare their own (the Example prompt button copies it). Walk through it top to bottom: allow lets npm test run without a question; ask makes commit, push and any change in tests/ need a yes; deny blocks force push and rm -rf even when asked; the PostToolUse hook runs the test after every Edit or Write, and exit 2 sends a failing test back to Claude. Claude's own version is often stricter; that's fine. After changing it, restart Claude and check with /permissions and /hooks."
},

{ // Slide 74
  type: "practice",
  layout: "exercise",
  title: "Assignment 12: Look at your context window",
  kicker: "DAY 1 · ASSIGNMENT 12 · BUILD",
  subtitle: "The session is getting long. What's in Claude's head right now?",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "With every message Claude rereads the whole conversation. A long session gets slower, more expensive and more distracted." },
    { title: "What you see", body: "/context: CLAUDE.md, tools, MCP and the whole conversation, in tokens." },
    { title: "Look inside", body: "What takes the most room? Do you still need it?" }
  ],
  steps: [
    "Type /context. What takes the most room?",
    "Type /compact keep the test rules and the plan",
    "/context again: what changed?",
    "Starting a new task? That's when you use /clear."
  ],
  expected: "You know what fills the window, and when to use /compact or /clear.",
  prompt: "/context\n/compact keep the test rules and the plan\n/context",
  keyPoints: [
    "Every message rereads the conversation",
    "/context: what costs what",
    "/compact: summarise, keep what matters",
    "/clear: new task, empty conversation",
    "CLAUDE.md survives both"
  ],
  notes: "Link back to the context-window slide this morning. Every new message makes Claude read the whole conversation again, so a long session costs more per question, gets slower, and gets distracted by old material. /context shows what fills the window right now: the system prompt and tools, MCP tools, CLAUDE.md, and the conversation. /compact summarises the conversation and keeps going; you can say what to keep. /clear empties it, for a new task. CLAUDE.md and the files on disk survive both."
},

{ // Slide 75
  title: "Assignment 13: Make your avatar in LibreChat",
  kicker: "DAY 1 · ASSIGNMENT 13 · BUILD",
  subtitle: "Your character for tomorrow's leaderboard. No real name, no email, no photo.",
  type: "practice",
  layout: "exercise",
  visual: { cardImages: ["assets/avatars/avatar-cartoon.webp", "assets/avatars/avatar-superhero.webp", "assets/avatars/avatar-jipjanneke.webp"] },
  cards: [
    { title: "Cartoon", body: "" },
    { title: "Superhero", body: "" },
    { title: "Jip and Janneke", body: "" }
  ],
  steps: [
    "Open LibreChat and pick the image generator from the library.",
    "Describe only how your avatar looks: style, colours, accessories.",
    "Ask for a square image: plain background, no text.",
    "Download it, and pick a nickname."
  ],
  expected: "A square avatar and a nickname, with nothing that says who you are.",
  prompt: "Cartoon:\nCreate a square cartoon avatar of a character: [describe the look — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, plain background, no text.\n\nSuperhero:\nCreate a square comic-book superhero portrait of a character: [describe the look]. Cape, city skyline at night, no text.\n\nJip and Janneke:\nCreate a square avatar of a character as a Dutch Jip and Janneke silhouette: black on a plain coloured background. [describe the look]. No text.",
  keyPoints: [
    "Fun, keep the energy high",
    "Describe looks only",
    "No real name, email or photo",
    "Pick a nickname",
    "Check everyone downloaded the file"
  ],
  notes: "Keep the energy high: this is meant to be fun. LibreChat itself doesn't make images: in the library you pick the image generator. Privacy rule for the whole arcade: the avatar only describes how the character looks, and the game only shows a nickname. No real name, email, employee number or photo, because tomorrow every game is on a shared website. Don't paste anything from your personal CLAUDE.md. The Example prompt button has three starting prompts: cartoon, superhero and Jip and Janneke (a well-known Dutch children's-book style by Fiep Westendorp, black silhouettes; explain it in one sentence for non-Dutch participants). The three thumbnails are AetherBOT, made with these prompts. Make sure everyone has downloaded the file before moving on."
},

{ // Slide 76
  title: "Assignment 14: Put your avatar in your game",
  kicker: "DAY 1 · ASSIGNMENT 14 · BUILD",
  subtitle: "Give the picture to Claude Code: it shows your character on the start screen.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your player", body: "avatar\nnickname" }
  ],
  stepsHeading: "Do this:",
  steps: [
    "Put the picture in your game repo, in assets/.",
    "Plan mode. Paste the Example prompt with your file name and nickname.",
    "Play and check: avatar, nickname, and the fallback without a picture.",
    "Commit and push."
  ],
  expected: "Your game shows your avatar and nickname. Without a picture it shows the first letter of your nickname.",
  prompt: "I put my avatar in @assets/[file name]. Show it with my nickname [nickname] on the start screen of my game. Without a picture, show the first letter of my nickname. Plan first and show me the plan before you change anything.",
  keyPoints: [
    "LibreChat made it, Claude Code places it",
    "Picture into assets/ first",
    "Plan first, initials as fallback",
    "Tomorrow: name + picture go to the scoreboard"
  ],
  notes: "The hand-off: LibreChat made the picture, Claude Code puts it in the game. @assets/… points Claude at the image; Claude can read images, so it can also describe it. The fallback is the part people forget. Is the hook from Assignment 11 still running the test after this change? It should be. Tomorrow the avatar and nickname go to the arcade leaderboard."
},

{ // Slide 77
  type: "practice",
  layout: "exercise",
  title: "Assignment 15: Hand it over",
  kicker: "DAY 1 · ASSIGNMENT 15 · MAINTAIN",
  subtitle: "Tomorrow you continue. Maybe someone else does.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "Tomorrow's session starts empty. Only what's written down carries over." },
    { title: "What you see", body: "PROGRESS.md: what's built, how it was tested, what's still open." },
    { title: "Extra", body: "Tomorrow: claude --continue takes you back into today's last conversation." }
  ],
  steps: ["Paste the Example prompt.", "Read PROGRESS.md: could a colleague carry on from this?", "Commit and push."],
  expected: "PROGRESS.md is on GitLab, and someone else could carry on.",
  prompt: "Write PROGRESS.md: what we built today, how we tested it, which rules and hooks are active, and what is still open. No personal data.",
  keyPoints: [
    "Maintain phase",
    "The handover file",
    "Same file as Day 5",
    "Commit and push",
    "Tomorrow: claude --continue"
  ],
  notes: "The Maintain phase closes the loop: the next person, or tomorrow's session, starts from PROGRESS.md. Day 5 uses the same file. Tomorrow starts with git pull and claude --continue."
},

{ // Slide 78
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

{ // Slide 79
  title: "Day 1 recap",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Today you:",
  type: "recap",
  visual: { badges: ["🧭", "🧠", "🔒", "🐍", "✅", "🪝", "🚀"], bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "Aether Arcade", tone: "orange" }] },
  cards: [
    { title: "Planned with intent.md", body: "" },
    { title: "Gave Claude a CLAUDE.md", body: "" },
    { title: "Set house rules first", body: "" },
    { title: "Built Snake in layers: commit, push", body: "" },
    { title: "Wrote a test that finds bugs", body: "" },
    { title: "Let a hook guard it", body: "" },
    { title: "Put it on GitLab and handed it over", body: "" }
  ],
  tagline: "Next: levels that get harder, your own skill, agent and workflow, and the Aether Arcade.",
  keyPoints: ["Preview only", "Don't explain skills yet", "Day 2 covers those", "End on the tagline"],
  notes: "Walk the loop once more: Plan (intent.md, CLAUDE.md, house rules), Design (layers), Build (commit and push), Test (a test and a hook), Deploy (GitLab), Maintain (PROGRESS.md). Preview only: don't explain skills or agents tonight."
},


/* ==========================================================================
   TEACHING DAY 2 — Levels, skills, agents and the Aether Arcade
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 2 — Warm-up and recap                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 80
  title: "Reusable and connected AI workflows",
  kicker: "TEACHING DAY 2",
  subtitle: "From your own Snake to a team arcade.",
  type: "context",
  visual: { bot: "wave", place: "left", dayRoute: ["Show your game", "Recap", "Levels", "Skills", "Agents", "Workflow", "Aether Arcade", "Awards"] },
  cards: [
    { title: "What we're doing", body: "Making Snake harder level by level, turning your method into a skill, an agent and a workflow, and running the Aether Arcade as a team." },
    { title: "Today", body: "Spec and branches, skills, a verifier, one command for a whole level, then three sprints in the arcade." }
  ],
  keyPoints: [
    "Short re-welcome",
    "Point at the day's shape",
    "Morning: goals, skills, Pac-Man, levels",
    "Afternoon: the arcade as a team",
    "Warm-up first: show your game"
  ],
  notes: "Short re-welcome. Point at the day's shape: the morning walks the loop again with levels (spec, branch, merge request), then the method becomes a skill, a verifier agent and a workflow. The afternoon is the Aether Arcade: one website, everyone's game, three sprints and chaos cards. The warm-up comes first: everyone shows their game."
},

{ // Slide 81
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

{ // Slide 82
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
  notes: "Everyone shows their Snake from yesterday, one minute each: play it for a few seconds, show the avatar and their own touch. Online participants share their screen. In a big group, pick a handful of volunteers instead of everyone, and keep an eye on the clock. One thing that went well, one thing that went wrong. Collect the questions that come up on the flipchart: the recap that follows answers them. Optional opener: how many tokens did your game cost? (/cost or the status line)."
},

{ // Slide 83
  title: "Retrieval check",
  kicker: "DAY 2 · RECAP",
  subtitle: "Without looking at yesterday's slides, explain:",
  type: "recap",
  tagline: "Answer from memory first — no peeking.",
  visual: { reveal: "click", bot: "peek", place: "slot", noReact: true },
  cards: [
    { title: "Why start a task in plan mode?", body: "" },
    { title: "What does CLAUDE.md do, and what does settings.json do?", body: "" },
    { title: "What does a hook do that a rule can't?", body: "" },
    { title: "Esc Esc or a commit: when do you use which?", body: "" },
    { title: "What are the six SDLC phases?", body: "" }
  ],
  keyPoints: ["Cold retrieval, no looking back", "Make them actually answer", "Struggling with six steps? Slow down"],
  notes: "Make them answer without looking back at Day 1's deck: cold retrieval, not open-book. CLAUDE.md asks, settings.json enforces. A hook makes something always happen, a permission only decides what's allowed. Esc Esc for the last few minutes, a commit for always. If the six phases are shaky, put the SDLC slide back up for a moment: today's assignments are labelled with them."
},

{ // Slide 84
  title: "Recap: your AI in Claude Code",
  kicker: "DAY 2 · RECAP",
  subtitle: "What you gave your Snake yesterday.",
  type: "recap",
  visual: { art: "intake", bot: "head", place: "aside" },
  cards: [
    { title: "Memory", body: "CLAUDE.md, intent.md and PROGRESS.md." },
    { title: "Rules", body: "settings.json: allow, ask and deny." },
    { title: "Checks", body: "Your test and your hook." },
    { title: "Online", body: "Your repo on GitLab, through MCP." }
  ],
  tagline: "Today we make it bigger: levels, skills, agents and a team.",
  keyPoints: [
    "Answer the flipchart questions here",
    "Memory, MCP, rules, your game",
    "All of it they set up themselves",
    "Today: goals and skills"
  ],
  notes: "Use this to answer the questions from Show your game. Everything here they set up themselves yesterday. Today adds levels with a spec, skills, a subagent, a workflow, and a whole team in the arcade."
},

{ // Slide 85
  title: "Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with goals: let Claude work until it's done." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Pivot: from recap to new work"],
  notes: "State the actual clock time you'll resume. This is the pivot point of the morning — from looking back to new work: goals first, then skills."
},


/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 1: Levels — spec, branch, merge request                   */
/* ---------------------------------------------------------------------- */

{ // Slide 86
  type: "practice",
  layout: "exercise",
  title: "Assignment 16: Pick up where you left off",
  kicker: "DAY 2 · ASSIGNMENT 16 · PLAN",
  subtitle: "Yesterday's conversation is gone from Claude's head. Your files aren't.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "A new day, a new wish: levels that get harder. Start from what's written down." },
    { title: "What you see", body: "Claude reads PROGRESS.md and knows where you stopped. intent.md gets a new outcome." },
    { title: "Extra", body: "/resume: pick any earlier conversation from a list." }
  ],
  steps: [
    "!git pull: get the latest from GitLab.",
    "claude --continue",
    "Plan mode. Paste the Example prompt.",
    "Read the new intent.md before you approve."
  ],
  expected: "intent.md has a new outcome: levels that get harder.",
  prompt: "Read PROGRESS.md and intent.md. New wish: levels, each one harder than the last. Update intent.md with this outcome and new done-when checks. Don't build yet.",
  keyPoints: [
    "Maintain feeds Plan: the loop goes round",
    "git pull every morning",
    "claude --continue or /resume",
    "PROGRESS.md carries over"
  ],
  notes: "The loop goes round: yesterday's Maintain is today's Plan. git pull is the first thing developers do every morning: get what colleagues pushed. claude --continue goes back into the last conversation; /resume lets you pick one. Either way, PROGRESS.md and intent.md are what really carry over."
},

{ // Slide 87
  title: "What makes a level harder?",
  kicker: "DAY 2 · PART 1 · LEVELS",
  subtitle: "Each level is a small file with knobs.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "playable", tone: "orange" }] },
  cards: [
    { title: "speed", body: "How fast the snake moves." },
    { title: "startLength", body: "How long the snake is at the start." },
    { title: "walls", body: "None, a few, or a maze." },
    { title: "foodToWin", body: "How much food finishes the level." }
  ],
  tagline: "Harder but fair: one or two knobs up, and the level must stay playable.",
  keyPoints: [
    "A level = a file with four knobs",
    "Harder: one or two knobs up",
    "Fair: still playable",
    "That rule becomes a skill later"
  ],
  notes: "Ask the room first: how would you make Snake harder? Collect answers, then show the four knobs. 'Harder but fair' is the rule that will later live in the new-level skill: one or two knobs go up, the snake doesn't start in a wall, food never lands on a wall, and the level stays playable."
},

{ // Slide 88
  title: "intent.md, spec.md and a test",
  kicker: "DAY 2 · PART 1 · DESIGN",
  subtitle: "What you want, exactly what it looks like, and the proof.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "first", tone: "orange" }] },
  cards: [
    { title: "intent.md", body: "What and why: levels that get harder." },
    { title: "spec.md", body: "Exactly what shape: a level file has speed, startLength, walls and foodToWin. With an example." },
    { title: "The test", body: "Checks the spec: food never lands on a wall or the snake. The snake never starts in a wall." }
  ],
  tagline: "Write the test first. Red now, green once it's built.",
  keyPoints: [
    "intent = what and why",
    "spec = exact shape, with an example",
    "Test = proof of the spec",
    "Test first: red, then green",
    "Day 5: spec.md and a schema"
  ],
  notes: "intent.md says what you want and why. spec.md says exactly what something looks like, so anyone (or any Claude session) builds the same thing; for a level file: the four fields, their types, one example. The tests check the spec. Writing the test first means it's red before anything is built, and green proves the build matches the spec. Day 5 does exactly this with spec.md and a schema test: red, then green."
},

{ // Slide 89
  type: "practice",
  layout: "exercise",
  title: "Assignment 17: Spec first, failing test first",
  kicker: "DAY 2 · ASSIGNMENT 17 · DESIGN",
  subtitle: "Describe a level before you build one.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "A level is a file that other code depends on. Describe it before you build it." },
    { title: "What you see", body: "spec.md, and new tests that are red: nothing is built yet. Claude asks before it adds them to tests/." },
    { title: "Look inside", body: "Read spec.md. Could someone else make a level from it?" }
  ],
  steps: [
    "Paste the Example prompt.",
    "Read spec.md before you approve. Say yes to the new tests.",
    "!npm test: the new tests are red. Good.",
    "Commit and push."
  ],
  expected: "spec.md and red tests, committed.",
  prompt: "Write spec.md for a level file in levels/: speed, startLength, walls and foodToWin, with one example. Then write failing tests first: food never lands on a wall or on the snake, and the snake never starts in a wall. Don't build any levels yet.",
  keyPoints: [
    "Design phase",
    "spec.md with an example",
    "Tests first: red",
    "tests/ asks: you say yes",
    "Commit the red tests"
  ],
  notes: "The ask rule on tests/ from yesterday now does its job: Claude asks before adding tests, and this time the human says yes because they asked for them. Red is the expected result here. If someone's hook complains on every edit because the new tests are red, that's correct behaviour; tell them the hook will be happy once level 2 is built."
},

{ // Slide 90
  title: "How developers work with git",
  kicker: "DAY 2 · PART 1 · GIT",
  subtitle: "Main always works. New work happens next to it.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Pull", caption: "Get the latest from GitLab." },
    { label: "Branch", caption: "A copy to work in, for example level-2." },
    { label: "Commit + push", caption: "Small save points, on your branch." },
    { label: "Merge request", caption: "Ask to bring it into main: what, why, how tested." },
    { label: "Review + merge", caption: "Someone else looks. Then it goes into main." }
  ],
  tagline: "At Worldline nobody pushes straight to main.",
  keyPoints: [
    "Main always works",
    "A branch per feature",
    "Merge request = asking to bring it in",
    "Review before merge",
    "Claude runs git, you decide"
  ],
  notes: "For the trainers, in plain words: a developer's day at a company like Worldline starts with git pull. Each ticket gets its own branch, so main keeps working. Small commits with a clear message, pushed often. When it's done: a merge request (GitLab's name for a pull request), where a colleague reviews it and the pipeline runs the tests; then it's merged. Main is protected: no direct pushes, no force push. When two people change the same line, that's a merge conflict and someone decides which version stays. Something broke after a merge? git revert undoes a commit safely. A tag such as v1.0 marks a release. Today they meet branch, merge request, revert, and in the arcade conflicts and tags."
},

{ // Slide 91
  type: "practice",
  layout: "exercise",
  title: "Assignment 18: Level 2 on its own branch",
  kicker: "DAY 2 · ASSIGNMENT 18 · BUILD",
  subtitle: "A new feature, next to main.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Level 2 is a new feature. Main must keep working while you build it." },
    { title: "What you see", body: "A branch level-2 with levels/level-2.json. The red tests turn green." },
    { title: "Look inside", body: "!git branch: which branch are you on? Is main untouched?" }
  ],
  steps: [
    "Paste the Example prompt.",
    "Build until !npm test is green.",
    "Play level 2.",
    "Commit and push the branch."
  ],
  expected: "Level 2 works on its own branch, and the tests are green.",
  prompt: "Create a branch level-2. Make levels/level-2.json from spec.md: walls around the edge, a little faster than level 1. Load the level in the game. Build until npm test is green. Then commit and push the branch.",
  keyPoints: ["A branch per feature", "Build until green", "Play it", "Push the branch, not main"],
  notes: "The red tests from Assignment 17 now turn green: that's the spec being met. Main is untouched until the merge request is merged."
},

{ // Slide 92
  type: "practice",
  layout: "exercise",
  title: "Assignment 19: Your first merge request",
  kicker: "DAY 2 · ASSIGNMENT 19 · DEPLOY",
  subtitle: "Before it goes into main, someone looks at it. Today that's you.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Nothing goes into main without a second pair of eyes." },
    { title: "What you see", body: "A merge request on GitLab, with what, why and how it was tested." },
    { title: "Look inside", body: "Read it as if a colleague wrote it. Would you approve it?" }
  ],
  steps: [
    "Paste the Example prompt.",
    "Open the merge request on GitLab.",
    "Read the changes. Happy? Merge it yourself.",
    "Back in the terminal: !git checkout main && git pull"
  ],
  expected: "Level 2 is in main, through a merge request you reviewed.",
  prompt: "Open a merge request on GitLab for the branch level-2 into main. Description: what changed, why, and how it was tested. Don't merge it: I review and merge it myself.",
  keyPoints: [
    "Deploy phase: the human gate",
    "Claude opens the MR via MCP",
    "You review and merge",
    "Pull main afterwards"
  ],
  notes: "Claude goes up to the gate; the human goes through it. That's the same gate as on Day 5. In the arcade this afternoon, someone else reviews your merge request."
},


/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 2: Skills, architecture, agents, workflow                 */
/* ---------------------------------------------------------------------- */

{ // Slide 93
  title: "A repeated method",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "You just made level 2. Level 3 needs exactly the same steps.",
  type: "context",
  visual: { repeatStack: 0, repeatTags: ["level 2", "level 3", "level 4 …"], bot: "sleepy", place: "aside" },
  cards: [
    { title: "Every level needs", body: "spec.md as the rule\na branch\nharder but fair\nnpm test green\na merge request" }
  ],
  tagline: "Typing it again is boring, and you forget a line.",
  keyPoints: [
    "Ask: what did you repeat every layer?",
    "Collect it, then show the card",
    "Same method, next game",
    "That's what a skill is for"
  ],
  notes: "Ask the room first: what did you tell Claude for level 2 that you'll have to say again for level 3? Collect it, then show the card. Typing it again is boring and you forget a line. That's what a skill is for."
},

{ // Slide 94
  title: "A skill is a recipe",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Write down how you make the apple pie once. Bake it whenever you want.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'once', tone: 'orange' }] },
  cards: [
    { title: "Built in", body: "Claude Code comes with a few. Type / to see them." },
    { title: "Your own", body: "You write the recipe yourself, in a SKILL.md." },
    { title: "Made by Claude", body: "You ask Claude to turn what you just did into a skill." }
  ],
  keyPoints: ["Recipe: write it once, bake it often","Built in: in the / menu","Your own SKILL.md","Or let Claude write it from your work"],
  notes: "A skill is a recipe. You write down once how you make the apple pie: ingredients, steps, when it's done. After that you bake it whenever you want, the same way every time. There are three kinds: built in (Claude Code comes with a few; type / and they're in the menu), your own (you write the SKILL.md yourself), and made by Claude (you ask Claude to turn what you just did into a skill). That last one is what you'll do with your Snake. Before class, type / on your teaching laptop and pick one built-in skill to point at."
},

{ // Slide 95
  title: "Claude Code skills",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Teach Claude a method once — reuse it every time.",
  type: "concept",
  visual: { mdfile: 1, mdName: "SKILL.md", highlight: [{ in: "tagline", text: "does not start Claude Code or run continuously", tone: "orange" }] },
  cards: [
    { title: "Definition", body: "A skill packages a reusable method for a recurring task." },
    { title: "A skill is a folder", body: "SKILL.md: name, description and the recipe\ntemplate.json: read only when needed\nscripts/: run, not read" },
    { title: "How Claude finds it", body: "Only the name and description are always loaded. The full recipe is read when a task matches it, or when you type /name.\nProject: .claude/skills/\nYou, everywhere: ~/.claude/skills/" }
  ],
  tagline: "A skill does not start Claude Code or run continuously.",
  keyPoints: [
    "Repeat the tagline",
    "Skill = packaged method",
    "Only the description is always loaded",
    "Saves tokens: recipe read when needed",
    "Same two places as CLAUDE.md",
    "Not a background process, not its own agent"
  ],
  notes: "The tagline is a real guardrail worth repeating: a skill is a packaged method Claude Code applies when relevant, not a background process or its own agent. A skill is a folder: SKILL.md holds the name, the description and the recipe; other files (a template, reference notes) are only read when the recipe points to them; scripts are run, so their code never enters the context, only their output. Only the name and description of each skill are always in the context window: that's why you can have many skills, and why a good description matters. Skills live in the project (.claude/skills/, shared) or in your home folder (~/.claude/skills/, you, everywhere)."
},

{ // Slide 96
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
  notes: "All three are text Claude reads; they differ in when they apply. A prompt is this task, CLAUDE.md is every session, a skill is loaded when a task matches its description. None of them enforces anything: that stays in settings.json, as you saw yesterday with the house rules and the hook (guide vs enforce). This is the exact distinction Assignment 9 asks participants to build — point back to it once the room starts working."
},

{ // Slide 97
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

{ // Slide 98
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
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: CLAUDE.md is read in every session, so standing rules live there. A is the problem the room felt with every Snake layer: repeating yourself. C is close but different: a skill holds a recurring method that runs when needed, not a rule that always applies."
},

{ // Slide 99
  type: "practice",
  layout: "exercise",
  title: "Assignment 20: Turn levels into a skill",
  kicker: "DAY 2 · ASSIGNMENT 20 · BUILD",
  subtitle: "You did it once by hand. Now write down the recipe.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Spec, test, branch, build: level 3 needs exactly the same steps as level 2." },
    { title: "What you see", body: ".claude/skills/new-level/ with SKILL.md, a template and a script. After /clear, Claude picks the skill by itself." },
    { title: "Look inside", body: "Open SKILL.md. Which line makes Claude choose this skill?" }
  ],
  steps: [
    "Paste the Example prompt.",
    "Open the skill folder in VS Code.",
    "/clear, then: “Make level 3: a maze.”",
    "Did Claude use the skill? Did it run the script?",
    "Commit, push, merge request."
  ],
  expected: "Level 3 was made with your skill, and the script checked it.",
  prompt: "Turn how we made level 2 into a skill in .claude/skills/new-level/:\n- SKILL.md with a clear description of when to use it\n- the recipe: a branch, harder but fair (one or two knobs up), npm test green\n- template.json: an empty level\n- scripts/validate-level.js: checks a level file against spec.md\nShow me the folder before you save it.",
  keyPoints: [
    "A skill is a folder",
    "The description decides when it's used",
    "Template: read only when needed",
    "Script: run, not read",
    "Level 3 with the skill"
  ],
  notes: "The obvious moment: you just did the same steps for level 2, and level 3 needs them again. The skill is a folder. SKILL.md has a name and a description (always visible to Claude) and the recipe (only read when the description matches). The template is only read when the recipe points to it. The script is run, not read: its code never enters the context, only its output, which is the token-efficient way to check something. After /clear, ask for level 3 without mentioning the skill: Claude should find it from the description. If it doesn't, the description isn't clear enough: that's the lesson."
},

{ // Slide 100
  title: "What costs tokens, and what doesn't",
  kicker: "DAY 2 · PART 2 · ARCHITECTURE",
  subtitle: "Where you put something decides when Claude reads it.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "short", tone: "orange" }] },
  cards: [
    { title: "Always loaded", body: "CLAUDE.md, and what it pulls in with @\nthe name and description of every skill\nMCP tools" },
    { title: "Only when needed", body: "a SKILL.md recipe\nfiles inside a skill\nlevels/CLAUDE.md: only when Claude works in levels/" },
    { title: "Almost free", body: "hooks and scripts: they run, only their output counts\na subagent: works in its own context, brings back a summary" }
  ],
  tagline: "Keep CLAUDE.md short. Put the details where they're needed.",
  keyPoints: [
    "Always: CLAUDE.md, skill descriptions, MCP tools",
    "On demand: skill recipe, nested CLAUDE.md",
    "Almost free: hooks, scripts, subagents",
    "Unused MCP servers cost tokens too",
    "Tell Claude where things are, so it doesn't search"
  ],
  notes: "This is the question students ask most: why does where I put things matter? Everything in the first column is in the context window from the very first message, every session. The second column is only read when it's relevant. The third column barely touches the context: a hook or script runs outside it, and a subagent does its reading in its own window and only returns a summary. Practical habits: keep CLAUDE.md short and let it say where things live, switch off MCP servers you don't use, put detail in skills and nested CLAUDE.md files, use /clear between tasks."
},

{ // Slide 101
  title: "The map of your project",
  kicker: "DAY 2 · PART 2 · ARCHITECTURE",
  subtitle: "Every file has its place. By tonight your folder looks like this.",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: "aether-snake/", body: "CLAUDE.md               every session: keep it short\nintent.md  spec.md  PROGRESS.md\nlevels/\n  CLAUDE.md             only when working in levels/\n  level-1.json …\ntests/\n.mcp.json               GitLab connection\n.claude/\n  settings.json         rules + hooks, shared\n  skills/\n    new-level/          SKILL.md, template.json, scripts/\n    ship-level/         SKILL.md: the workflow\n  agents/\n    verifier.md         a subagent" },
    { title: "Yours, not shared", body: "Not in git:\nCLAUDE.local.md\n.claude/settings.local.json\n\nYou, in every project:\n~/.claude/CLAUDE.md\n~/.claude/settings.json\n~/.claude/skills/\n~/.claude/agents/" }
  ],
  tagline: "Project files are shared through git. Your home folder is only yours.",
  keyPoints: [
    "Project .claude/: shared with the team",
    "Local files: only you, not in git",
    "~/.claude/: you, in every project",
    "Nested CLAUDE.md per folder",
    "Skills and agents are folders and files"
  ],
  notes: "Come back to this map whenever someone asks 'where does this go?'. The rule: anything in the project's .claude/ folder and the project CLAUDE.md is shared with the team through git. The .local files are only for you and stay out of git. ~/.claude/ is the same structure for you personally, in every project. Point at the files that don't exist yet (ship-level, verifier.md): they're coming in the next hour."
},

{ // Slide 102
  type: "practice",
  layout: "exercise",
  title: "Assignment 21: A shorter CLAUDE.md",
  kicker: "DAY 2 · ASSIGNMENT 21 · MAINTAIN",
  subtitle: "Your CLAUDE.md keeps growing, and it's loaded in every session.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "/context shows it: your CLAUDE.md costs tokens in every session, even when you're not working on levels." },
    { title: "What you see", body: "Fewer tokens at the start. The level rules still apply in levels/." },
    { title: "Look inside", body: "Which lines did Claude move, and where to?" }
  ],
  steps: [
    "/context: note the size of your memory files.",
    "Paste the Example prompt. Read both files before you approve.",
    "/clear, then /context again.",
    "Ask about a level: does Claude still know the level rules?"
  ],
  expected: "A short root CLAUDE.md, and a levels/CLAUDE.md that only loads when it's needed.",
  prompt: "Move everything about levels from CLAUDE.md into levels/CLAUDE.md. Keep the root CLAUDE.md short: only what every session needs. Show me both files before you save them.",
  keyPoints: [
    "Measure first with /context",
    "Nested CLAUDE.md per folder",
    "Root: only what every session needs",
    "Measure again"
  ],
  notes: "Before and after with /context makes the token saving visible. A CLAUDE.md in a subfolder is read when Claude works with files in that folder, not at the start. If the room's CLAUDE.md is still tiny, the saving is small; the habit is the point. Note: files pulled in with @ in the root CLAUDE.md load at the start, so moving them into a nested CLAUDE.md is what actually defers them."
},

{ // Slide 103
  title: "Subagents: a helper with its own head",
  kicker: "DAY 2 · PART 2 · AGENTS",
  subtitle: "Delegate the work, never the approval.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "approves nothing", tone: "orange" }] },
  cards: [
    { title: "What", body: "A helper that Claude starts for one job, in its own fresh context window." },
    { title: "Why", body: "It does the reading, so your session doesn't have to. You get a short report back." },
    { title: "Where", body: ".claude/agents/verifier.md: a name, a description, which tools it may use, which model." }
  ],
  tagline: "A subagent reports. It approves nothing.",
  keyPoints: [
    "Own context window",
    "Keeps your session clean",
    "Limited tools, its own model",
    "/agents shows and makes them",
    "Same verifier as Day 5"
  ],
  notes: "A subagent is a separate Claude with its own context window, its own instructions, a limited set of tools and optionally a cheaper model. Claude hands it one job; it reads whatever it needs and returns a short report, so your main session stays clean. /agents lists them and can create one. The Day 5 lab has a verifier exactly like this: it reports, it never accepts a plan or approves a change."
},

{ // Slide 104
  type: "practice",
  layout: "exercise",
  title: "Assignment 22: A verifier that checks your work",
  kicker: "DAY 2 · ASSIGNMENT 22 · TEST",
  subtitle: "A second opinion, in its own context.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Three levels are more than you can review properly, and your own session is filling up." },
    { title: "What you see", body: ".claude/agents/verifier.md. A report: what matches spec.md, and what doesn't." },
    { title: "Look inside", body: "/context: did the verifier's reading end up in your context?" }
  ],
  steps: [
    "Paste the Example prompt. Read the file before you approve.",
    "Type /agents: is the verifier there?",
    "“Let the verifier check level 3.”",
    "Read the report. Do you agree?"
  ],
  expected: "A verifier that reports on a level, without changing anything.",
  prompt: "Create a subagent in .claude/agents/verifier.md:\n- Job: check a level and its branch against spec.md, and run npm test.\n- Tools: read files and run npm test only. No edits.\n- Model: Haiku.\n- It reports what matches and what doesn't. It approves nothing.\nShow me the file before you save it.",
  keyPoints: [
    "Test phase: an independent check",
    "Read-only tools",
    "A cheaper model for simple checks",
    "Report, don't approve",
    "Your context stays small"
  ],
  notes: "Haiku is enough for checking against a spec, and cheaper. Read-only tools mean it can't 'fix' things quietly. The Look inside question shows why subagents matter for tokens: the verifier read the level, the spec and the test output, but only its summary landed in your session."
},

{ // Slide 105
  title: "A workflow: skills and agents stacked",
  kicker: "DAY 2 · PART 2 · WORKFLOW",
  subtitle: "The same four steps for every level. One command.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "new-level skill", caption: "Makes the level from spec.md, on a branch." },
    { label: "npm test", caption: "Proves it's valid and playable." },
    { label: "verifier agent", caption: "Checks it in its own context." },
    { label: "merge request", caption: "Ready for your review." }
  ],
  tagline: "/ship-level only runs when you type it: it pushes, so Claude must never start it by itself.",
  keyPoints: [
    "A workflow skill calls other skills and agents",
    "Policy skill: Claude loads it when relevant",
    "Workflow skill: only when you type /name",
    "Side effects (push) = only by hand"
  ],
  notes: "Two kinds of skills, as on Day 5. A policy skill, like new-level, is something Claude may pick up by itself when the task matches. A workflow skill, like ship-level, runs a sequence with side effects (it pushes and opens a merge request), so it should only run when the user types /ship-level. In SKILL.md that's a frontmatter setting that switches off automatic use (disable-model-invocation: true); check the exact field in the current Claude Code docs before class. The workflow stacks what they built this morning: the skill, the test, the verifier, the merge request."
},

{ // Slide 106
  type: "practice",
  layout: "exercise",
  title: "Assignment 23: One command for a whole level",
  kicker: "DAY 2 · ASSIGNMENT 23 · BUILD",
  subtitle: "Your skill, your test and your verifier, in one workflow.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Every level is now the same four steps. Typing them every time is where mistakes creep in." },
    { title: "What you see", body: "/ship-level 4: a new level, tests, a verifier report and a merge request. Claude asks before the push." },
    { title: "Look inside", body: "Open ship-level's SKILL.md. Which skills and agents does it call?" }
  ],
  steps: [
    "Paste the Example prompt. Read SKILL.md before you approve.",
    "Type /ship-level 4",
    "Approve the push when Claude asks.",
    "Review and merge the merge request on GitLab."
  ],
  expected: "Level 4 shipped through your workflow, and you merged it.",
  prompt: "Create a workflow skill in .claude/skills/ship-level/: for level N, use the new-level skill on a new branch, run npm test, let the verifier agent check it, then push and open a merge request. It only runs when I type /ship-level, never by itself. Show me SKILL.md before you save it.",
  keyPoints: ["Stacked: skill, test, agent, MR", "Only by /ship-level", "The push still asks", "You still merge"],
  notes: "Everything stacks here: the skill from Assignment 20, the test, the verifier from Assignment 22, the merge request from Assignment 19, and yesterday's ask rule on push. The human gate stays: Claude asks before pushing, and the human merges."
},

{ // Slide 107
  title: "Goals: tell Claude when it's done",
  kicker: "DAY 2 · PART 2 · GOALS",
  subtitle: "Your “done when”, turned into a command Claude keeps working towards.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: "tagline", text: "checkable", tone: "orange" }] },
  cards: [
    { title: "Set a goal", body: "/goal level 5 is harder than level 4, npm test passes and the verifier finds nothing" },
    { title: "What happens", body: "Claude keeps working, turn after turn. After each turn a small, fast model checks: is the goal met yet?" },
    { title: "Check or stop it", body: "/goal on its own shows the status.\n/goal clear stops it.\nIt clears itself once the goal is met." },
    { title: "Good goal, bad goal", body: "Good: “npm test passes and the verifier finds nothing.”\nBad: “make level 5 fun.”" }
  ],
  tagline: "A goal is only as good as its check: write something checkable.",
  keyPoints: [
    "/goal = a “done when” that keeps running",
    "A small model checks after every turn",
    "/goal shows status, /goal clear stops",
    "Vague goal = endless or wrong work",
    "Still play the result yourself"
  ],
  notes: "Connect this to “Done when” from yesterday: a goal is exactly that, as a command. Claude keeps going on its own until it's met, inside the same rules and hooks. After each turn a small, fast model decides whether the condition holds; when it does, the goal clears itself. The lesson is the bad example: “make level 5 fun” can never be checked. A met goal is still not your approval: they play the level afterwards. Before class, check that /goal exists in the version on the participants' laptops."
},

{ // Slide 108
  type: "practice",
  layout: "exercise",
  title: "Assignment 24: Level 5 without watching",
  kicker: "DAY 2 · ASSIGNMENT 24 · BUILD",
  subtitle: "You know the steps work. Let Claude keep going until the check passes.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "The workflow works. Now let Claude run on its own, inside your rules." },
    { title: "What you see", body: "Claude keeps working by itself until the goal is met, then stops." },
    { title: "Look inside", body: "Play level 5. A met goal is not your approval." }
  ],
  steps: [
    "Paste the Example prompt.",
    "Watch, don't type. /goal shows the status.",
    "Goal met? Play level 5 yourself.",
    "Happy? Merge the merge request."
  ],
  expected: "Level 5 is harder than level 4, the checks pass, and you merged it after playing it.",
  prompt: "/goal level 5 is harder than level 4, npm test passes, the verifier finds nothing, and a merge request is open",
  keyPoints: [
    "A goal = a checkable done-when",
    "Claude runs until it's met",
    "Your rules still apply",
    "Play it before you merge"
  ],
  notes: "The goal names checks, not feelings: npm test, the verifier, an open merge request. Claude keeps going, inside the same rules and hooks; the push still asks. Before class, check that /goal exists in the Claude Code version on the participants' laptops; if it doesn't, the same prompt without /goal plus 'keep going until all of this is true' works almost the same way."
},

{ // Slide 109
  title: "Watch: Claude in the pipeline",
  kicker: "DAY 2 · PART 2 · DEPLOY",
  subtitle: "The same checks, without anyone at the keyboard.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: "tagline", text: "this afternoon", tone: "orange" }] },
  cards: [
    { title: "Headless", body: "claude -p \"run the tests and review this change\" --output-format json" },
    { title: "In GitLab CI", body: "A job on every merge request: the tests, then a Claude review as a comment." },
    { title: "Its rules", body: "--allowedTools decides what it may do. There's no human to ask, so keep it read-only." }
  ],
  tagline: "The arcade gets a pipeline like this this afternoon.",
  keyPoints: [
    "claude -p: one prompt, no conversation",
    "JSON output for scripts",
    "In CI on every merge request",
    "No human to ask: read-only tools"
  ],
  notes: "Demo it live: run the claude -p command in a game folder and show the JSON. -p means print mode: one prompt, one answer, no conversation, ideal for scripts and pipelines. In GitLab CI, a job can run the tests and a Claude review on every merge request. Because nobody is there to approve anything, limit it with --allowedTools to read-only tools. This afternoon the arcade's pipeline runs the contract test on every merge request."
},

{ // Slide 110
  type: "practice",
  layout: "exercise",
  title: "Assignment 25: A bug becomes a test",
  kicker: "DAY 2 · ASSIGNMENT 25 · MAINTAIN",
  subtitle: "Fix it so it never comes back.",
  visual: { shotLabel: "Why, what you see, extra" },
  cards: [
    { title: "Why now", body: "You found a bug while playing. Fixing it isn't enough: it has to stay fixed." },
    { title: "What you see", body: "First a red test that shows the bug. Then the fix. Then green." },
    { title: "Extra", body: "A bad merge? “Revert that commit”: undone safely, and the history stays." }
  ],
  steps: [
    "Pick a bug you found, or: food can appear inside the maze.",
    "Paste the Example prompt with your bug.",
    "Red first? Then let Claude fix the game.",
    "Branch, merge request, merge."
  ],
  expected: "A test that catches the bug, and the fix in main.",
  prompt: "Bug: [describe it, for example: in level 4 food can appear inside a wall]. First write a test that shows this bug and fails. Then fix the game until the test passes. Work on a branch and open a merge request.",
  keyPoints: ["Maintain phase", "Every bug becomes a test", "Red, fix, green", "git revert for a bad merge"],
  notes: "Day 5's rule in small: each incident becomes an eval. A bug that has a test can't quietly come back. git revert makes a new commit that undoes an old one, so nothing is lost and the history stays honest; that's how teams undo a bad merge on a protected main."
},

{ // Slide 111
  title: "Lunch",
  kicker: "DAY 2 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: "wave", place: "beside" },
  cards: [
    { title: "Back at 13:00", body: "We continue with the Aether Arcade." }
  ],
  keyPoints: ["Lunch: resume at 13:00", "Check in on stuck skills", "Quick word over lunch"],
  notes: "Exact resume time: 13:00. Before the arcade: check that the arcade template repo is ready on GitLab, the pipeline runs, and (if available) GitLab Pages publishes it. Prepare the chaos-card branches."
},


/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 3: The Aether Arcade                                      */
/* ---------------------------------------------------------------------- */

{ // Slide 112
  title: "Three views of the same work",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "This afternoon you move from your own task to the team's lifecycle.",
  type: "concept",
  layout: "compare",
  visual: { art: 'boxes', link: { 0: ['Build', 'Test'], 1: ['Create', 'Test'] } },
  columns: [
    { title: "SDLC — the team", items: ["Plan", "Design", "Build", "Test", "Deploy", "Maintain"], foot: "Contains the working method ↓" },
    { title: "Working method — you", items: ["Explore", "Plan", "Create", "Test", "Human review", "Handoff"], foot: "Contains the agent loop ↓" },
    { title: "Agent loop — Claude", items: ["Observe", "Decide", "Act", "Check", "Repeat or stop"] }
  ],
  tagline: "So far you worked in the middle box. This afternoon the whole team works in the outer one.",
  keyPoints: ["Say the nesting left to right","SDLC = the team","Working method = you (yesterday's six steps)","Agent loop = Claude","This afternoon: the outer box"],
  notes: "Opens the afternoon. Say the nesting out loud, left to right: the outer box is the team's software lifecycle, the middle box is your own working method from yesterday, the inner box is Claude's agent loop from yesterday. Build+Test of the lifecycle contains Create+Test of the method, which contains the whole agent loop. Only the outer box is new. So far everyone worked alone, in the middle box. This afternoon, in the arcade, the whole team works in the outer box: agreeing, planning and building in layers together."
},

{ // Slide 113
  title: "The Aether Arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Everyone's game on one website. Built and run like a real team product.",
  type: "context",
  visual: { stagger: "pop", stepThrough: true, bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "each other's games", tone: "orange" }] },
  cards: [
    { title: "One website", body: "Every game, playable by everyone, in the room and online." },
    { title: "One leaderboard", body: "Your record goes in through a merge request. A check catches cheaters." },
    { title: "Sprints and chaos", body: "Three sprints. In between, the product owner causes trouble." },
    { title: "Awards", body: "Arcade Champion: the best total across all games." }
  ],
  tagline: "You can only win by playing each other's games.",
  keyPoints: [
    "One arcade repo, one website",
    "Every game via a merge request",
    "Records via a merge request, anti-cheat in CI",
    "Chaos cards: real team problems",
    "Champion = best across all games"
  ],
  notes: "Why the arcade: Claude can build one game in one prompt, but ten games on one website only work with an agreement everyone keeps, reviews, versions and a pipeline. That's what teams at Worldline do every day when they connect each other's work. The arcade repo comes from AetherLink (the arcade starter as a template) with a .gitlab-ci.yml: every merge runs the contract test and, if green, publishes the arcade on GitLab Pages. Records go in as scores/<nickname>.json through a merge request; an anti-cheat check in the pipeline tests whether the score is possible, a fraud check in miniature. Fallback if GitLab Pages or CI runners aren't available: the host laptop runs the arcade (node serve.js) on the projector, and online participants play through screen sharing. Check Pages and runners with Worldline before the course."
},

{ // Slide 114
  title: "How the afternoon runs",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Three sprints, two chaos cards, one tournament.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Sprint 0", caption: "Agree the contract. Make a team skill." },
    { label: "Sprint 1", caption: "Connect your game through a merge request." },
    { label: "🃏 Chaos card", caption: "The product owner changes the plan." },
    { label: "Sprint 2", caption: "Adapt, without breaking the others." },
    { label: "🃏 Chaos card", caption: "An incident." },
    { label: "Tournament", caption: "Play each other's games." },
    { label: "Awards", caption: "And what we learned." }
  ],
  tagline: "Each sprint is the loop again: plan, build, test, deploy.",
  keyPoints: ["Order matters", "Fake scores first", "One game, then the rest", "Same as a release: layer by layer"],
  notes: "Show the shape of the afternoon before anyone starts. Each sprint is the SDLC loop in small. The chaos cards are announced, but not what's on them."
},

{ // Slide 115
  title: "Roles in the arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Everyone owns a game. Nobody merges their own work.",
  type: "concept",
  visual: { stepThrough: true },
  cards: [
    { title: "Everyone", body: "Your own game: connect it, keep it green." },
    { title: "Reviewer", body: "Review someone else's merge request: your verifier, plus one comment of your own." },
    { title: "Arcade host", body: "One volunteer: owns the arcade repo, the pipeline and the merges." }
  ],
  tagline: "Nobody merges their own merge request.",
  keyPoints: [
    "Split by role",
    "Manager owns agreement + arcade laptop",
    "Backender: format + scoreboard",
    "Frontender: start screen"
  ],
  notes: "Everyone works solo on their own game, and everyone also reviews one other person's merge request: that's the teamwork, and it works online too. One volunteer is the arcade host (fallback: a trainer): they own the arcade repo and merge after a review. In your role at work this is the same: the developer owns the change, a colleague reviews, someone owns main."
},

{ // Slide 116
  type: "practice",
  layout: "exercise",
  title: "Assignment 26: Sprint 0, the agreement",
  kicker: "DAY 2 · ASSIGNMENT 26 · PLAN",
  subtitle: "15 minutes, as a team, in the team chat.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "Ten games, one leaderboard. That only works if every game speaks the same language." },
    { title: "What you see", body: "arcade-spec.md in the arcade repo, and a team skill arcade-connect that everyone uses." },
    { title: "Look inside", body: "Compare your spec with the arcade starter's contract. What did the team forget?" }
  ],
  steps: [
    "Host: create the arcade repo from the AetherLink template.",
    "Team: agree what every game needs: game.json, the score format, nickname, avatar.",
    "Host: let Claude write arcade-spec.md and the skill arcade-connect.",
    "Everyone: get the skill from the arcade repo."
  ],
  expected: "One arcade-spec.md everyone agreed on, and the team skill on every laptop.",
  prompt: "Write arcade-spec.md from what we agreed: every game lives in games/<nickname>/ with index.html and game.json (title, nickname, avatar), and reports its score once at game over as { player, avatar, points, game }. Then make a skill arcade-connect that makes a game meet this spec and runs the contract test.",
  keyPoints: [
    "Plan phase, as a team",
    "Agree before anyone builds",
    "arcade-spec.md = the contract",
    "A team skill everyone shares",
    "Compare with the starter afterwards"
  ],
  notes: "One volunteer is the arcade host (fallback: a trainer). The team agrees in the chat; the host types it into Claude. The skill is shared through the arcade repo: if plugins are allowed in your Worldline setup, the host can package it as a plugin so everyone installs it in one step; otherwise everyone copies .claude/skills/arcade-connect into their own game repo. Check the plugin commands in the current Claude Code docs before class. Afterwards, show the contract in the arcade starter (arcade.js) and ask what the team forgot: usually the nickname length or what happens with a missing avatar."
},

{ // Slide 117
  type: "practice",
  layout: "exercise",
  title: "Assignment 27: Sprint 1, connect your game",
  kicker: "DAY 2 · ASSIGNMENT 27 · BUILD",
  subtitle: "35 minutes. Your game into the arcade, through a merge request.",
  visual: { shotLabel: "Why, what you see, review" },
  cards: [
    { title: "Why now", body: "Your game has to work inside someone else's product now." },
    { title: "What you see", body: "The pipeline runs the contract test on your merge request. Green, reviewed, merged: your game is live on the arcade website." },
    { title: "Review", body: "Review someone else's merge request: run your verifier, and write one comment of your own." }
  ],
  steps: [
    "Use the arcade-connect skill on your game.",
    "Open a merge request to the arcade repo with games/<nickname>/.",
    "Pipeline red? Fix it and push again.",
    "Review the merge request of the person after you on the list.",
    "Merged? Play the arcade website."
  ],
  expected: "Your game is live in the arcade, and you reviewed someone else's.",
  prompt: "Use the arcade-connect skill to make my game meet arcade-spec.md. Then put it in games/[nickname]/ in the arcade repo on a new branch, push, and open a merge request.",
  keyPoints: [
    "Build + Test + Deploy in one sprint",
    "The pipeline is the first reviewer",
    "A human review, from someone else",
    "Nobody merges their own MR",
    "Green the first time = an award"
  ],
  notes: "Main of the arcade repo is protected: only the host merges, and only after one review from someone else. The pipeline runs the contract test on every merge request. Keep a list of nicknames in the chat for the review rotation: you review the person after you. 'First time green' (the merge request passes the pipeline on the first push) counts for an award, which rewards reading the spec carefully."
},

{ // Slide 118
  title: "🃏 Chaos card: the contract changes",
  kicker: "DAY 2 · PART 3 · CHAOS CARD",
  subtitle: "The product owner, five minutes ago: “Every score now also needs the level it was played on.”",
  type: "context",
  dark: true,
  visual: { stagger: "pop", stepThrough: true },
  cards: [
    { title: "What changes", body: "Contract v2: { player, avatar, points, game, level }" },
    { title: "The catch", body: "Games still on v1 must keep working for now." },
    { title: "Your questions", body: "Who tells whom? What breaks? How long do we keep v1?" }
  ],
  tagline: "A changing agreement is normal. Breaking each other isn't.",
  keyPoints: [
    "Breaking change in a contract",
    "Backward compatibility",
    "Deprecation: v1 still accepted, for now",
    "Communication first"
  ],
  notes: "Play the product owner and say it as if it's urgent. Then let the team talk for two minutes before anyone types: who updates the spec, the skill and the arcade; what happens to games still on v1; how long v1 stays accepted. That's versioning and deprecation, and it's mostly communication."
},

{ // Slide 119
  type: "practice",
  layout: "exercise",
  title: "Assignment 28: Sprint 2, contract v2",
  kicker: "DAY 2 · ASSIGNMENT 28 · BUILD",
  subtitle: "25 minutes. Change without breaking the others.",
  visual: { shotLabel: "Why, what you see, look inside" },
  cards: [
    { title: "Why now", body: "The agreement changed. Your game, the skill and the arcade all have to follow." },
    { title: "What you see", body: "arcade-spec.md v2, an updated skill, your game tagged v2.0, and the arcade still accepting v1 scores." },
    { title: "Look inside", body: "Which games are still on v1? Does the leaderboard still work for them?" }
  ],
  steps: [
    "Host: update arcade-spec.md to v2, and keep v1 accepted for now.",
    "Host: update the arcade-connect skill.",
    "Everyone: update your game with the skill, and tag it v2.0.",
    "Merge request, pipeline, review, merge."
  ],
  expected: "Every game sends v2 scores, and nothing broke on the way.",
  prompt: "arcade-spec.md is now v2: a score also has level. Update my game with the arcade-connect skill so it sends v2 scores. Tag it v2.0 and push. Then open a merge request to the arcade repo.",
  keyPoints: ["Update spec, skill, games", "Tag = a version", "v1 still works: deprecated", "Same MR flow"],
  notes: "A tag (v2.0) marks which version of a game speaks which contract. If two people change the arcade's start screen at the same time in this sprint, a merge conflict appears by itself: let Claude explain both versions, and the humans choose."
},

{ // Slide 120
  title: "Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with connecting your game to the arcade." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Two big assignments follow","Reset your own energy"],
  notes: "State the actual clock time you'll resume. The two assignments after the break (14 and 15: connecting every game and the start screen) are where the arcade comes together — use this break to reset your own energy too."
},

{ // Slide 121
  title: "🃏 Chaos card: an incident",
  kicker: "DAY 2 · PART 3 · CHAOS CARD",
  subtitle: "The trainer turns one card. Fix it as a team, then make sure it can't happen again.",
  type: "context",
  dark: true,
  visual: { reveal: "click", buttons: true },
  cards: [
    { title: "Broken deploy", body: "One game takes the whole start screen down. Revert, or hotfix?" },
    { title: "Cheater", body: "999999 points on the leaderboard. The anti-cheat check missed it. Now what?" },
    { title: "Privacy leak", body: "A game shows a real name and an email. How did that get past review?" },
    { title: "Merge conflict", body: "Two people changed the start screen at the same time." }
  ],
  tagline: "Every incident becomes a new test or a new rule.",
  keyPoints: [
    "Revert vs hotfix",
    "Tighten the anti-cheat check",
    "A privacy check in CI or a hook",
    "Resolve a conflict with Claude",
    "Incident → test (Day 5)"
  ],
  notes: "Turn one card, or two if there's time. Broken deploy: the fastest safe move is git revert of the merge, then a hotfix branch for the real fix; add a test so it can't happen again. Cheater: tighten the anti-cheat check (maximum possible score per level and time) and add the cheating score as a test case. Privacy leak: add a check to the pipeline (or a hook) that fails on anything that looks like an email or a full name, and remove the data. Merge conflict: ask Claude to explain both versions, decide as humans, commit the result. Whatever the card: it ends with a new test or rule, exactly Day 5's 'each incident becomes an eval'. Prepare the cards in advance: a deliberately broken game, a cheating score file, and a game with a fake name and email, all in a branch you can merge on cue."
},

{ // Slide 122
  title: "The tournament",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Play each other's games on the arcade website.",
  type: "context",
  dark: true,
  visual: { stepThrough: true, bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "you built together", tone: "orange" }] },
  cards: [
    { title: "Play", body: "Every game you play counts towards Arcade Champion." },
    { title: "Record", body: "Your best score goes in through a merge request." },
    { title: "Watch", body: "The live leaderboard on the big screen." }
  ],
  tagline: "A scoreboard you built together, from one agreement.",
  keyPoints: [
    "Arcade laptop on the big screen",
    "One round each",
    "Watch the top 10 fill",
    "Close: it worked because you agreed first"
  ],
  notes: "The arcade website (or the host laptop) on the big screen. Everyone plays as many games as they can; records go in as scores/<nickname>.json through a merge request, checked by the anti-cheat test. Close with the point: this worked because the team agreed on the format first, reviewed each other and kept main green."
},

{ // Slide 123
  title: "Awards and debrief",
  kicker: "DAY 2 · CLOSING",
  subtitle: "First the awards. Then three honest questions.",
  type: "recap",
  visual: { stagger: "pop", stepThrough: true },
  cards: [
    { title: "🏆 Arcade Champion", body: "The best total across all games." },
    { title: "🐍 Hardest level", body: "Voted by whoever played it." },
    { title: "🎨 Best avatar", body: "Voted by the room." },
    { title: "✅ First time green", body: "Your merge request passed the pipeline on the first push." },
    { title: "🛡️ Best reviewer", body: "Found a real problem in someone else's merge request." },
    { title: "Debrief", body: "What failed, and why?\nWhat goes in the spec next time?\nWhere do you see this at Worldline?" }
  ],
  keyPoints: [
    "Champion across all games",
    "Reward good agreements and reviews, not just playing",
    "Ten minutes of debrief",
    "Link to the team project on Days 6 and 7"
  ],
  notes: "Keep the awards quick and loud, then take the debrief seriously: ten minutes. What failed at integration, and why? What would you put in the agreement next time? Where do you see this in your own work? Close by pointing at Days 5 to 7: the same loop, with real stakes."
},


/* ---------------------------------------------------------------------- */
/* DAY 2 — Closing                                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 124
  title: "What you built",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Together, we created:",
  type: "recap",
  layout: "recap",
  visual: { recapKeys: true, bot: "happy", place: "aside" },
  items: [
    { label: "Your own Snake repo on GitLab, built in layers" },
    { label: "intent.md, spec.md, CLAUDE.md and PROGRESS.md" },
    { label: "House rules, a test and a hook" },
    { label: "Levels from files, each one harder" },
    { label: "A new-level skill, a verifier agent and a /ship-level workflow" },
    { label: "Branches and merge requests, like at work" },
    { label: "The Aether Arcade: one agreement, one website, every game" }
  ],
  keyPoints: ["Items appear on their own", "No clicking needed", "Don't talk over them", "Let the room recognise its work"],
  notes: "The items appear on their own, one by one — no clicking needed. Let them come in without talking over them, and let the room recognise their own two days of work in the list."
},

{ // Slide 125
  title: "What you can now do",
  kicker: "DAY 2 · CLOSING",
  subtitle: "How Claude Code works, and why the boundaries matter.",
  type: "recap",
  layout: "recap",
  visual: { levelUp: true },
  items: [
    { label: "Walk the SDLC loop with Claude Code." },
    { label: "Plan first, and choose the right mode." },
    { label: "Tell what guides Claude (CLAUDE.md, skills) from what enforces (permissions, hooks)." },
    { label: "Put things where they cost the fewest tokens." },
    { label: "Build skills, subagents and a workflow." },
    { label: "Work with branches, merge requests and reviews." },
    { label: "Agree a contract as a team, and change it without breaking each other." },
    { label: "Keep human review and handover." }
  ],
  keyPoints: [
    "Understanding checklist, not artefact list",
    "Name the distinction out loud",
    "How Claude Code works, why boundaries matter"
  ],
  notes: "This is the understanding checklist, not the artefact checklist (that was the previous slide) — the distinction is worth naming out loud. If there's time, ask someone which line they will use first in their own work."
},

{ // Slide 126
  title: "The five support days",
  kicker: "PREVIEW · SUPPORT DAYS",
  subtitle: "The support programme builds on this foundation.",
  type: "context",
  tagline: "Preview only — the support days go deeper.",
  visual: { art: 'timeline', supportDays: true },
  cards: [
    { title: "Day 3 · Agent workflows in n8n", body: "" },
    { title: "Day 4 · Build your own agent: the Claude Agent SDK", body: "" },
    { title: "Day 5 · The AI-native software lifecycle", body: "" },
    { title: "Day 6 · Hackathon: a thin slice for your team", body: "" },
    { title: "Day 7 · Hackathon: ship and present", body: "" }
  ],
  keyPoints: ["Preview only","Different facilitator's territory","Avoid detail questions here"],
  notes: "Preview only, matching the Day 1 recap's pattern — this is a different facilitator's territory starting next time, don't get pulled into detail questions here."
},

{ // Slide 127
  title: "Where could your team be helped first?",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Now that you know what's possible: which recurring task costs your team time or creates unnecessary uncertainty?",
  type: "context",
  visual: { bot: 'think', place: 'beside',
    highlight: [{ in: 'title', text: 'helped first', tone: 'orange' }, { in: 'subtitle', text: 'time', tone: 'mark' }, { in: 'subtitle', text: 'uncertainty', tone: 'purple' }] },
  cards: [
    { title: "Describe the problem", body: "Leave the solution open: that's for the support days." }
  ],
  prompt: "Where could your team be helped first? Which recurring task costs you time or creates unnecessary uncertainty? Describe the current problem. Leave the solution open for now.",
  keyPoints: ["Bridge to the support days","Per team, five minutes","Describe the problem, not the solution","Write it down: it's input for Day 3"],
  notes: "The bridge from the two teaching days to the support days. The programme outcome (Day 1) is that every team builds something with AI that works in their team; this is where they pick the problem. Now that they've seen what Claude Code can do, each team takes five minutes: which recurring task costs time or creates uncertainty? Describe the current problem, leave the solution open: do not let it become a design session. Write the answers down: they're the input for the support days."
},

{ // Slide 128
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

{ // Slide 129
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
    { title: "The first task I would hand to Claude is…", body: "" },
    { title: "The human decision must remain…", body: "" }
  ],
  keyPoints: ["End here","Back to the flipchart from Day 1","A minute of silence if possible","Let people write five sentences","Logistics only afterwards"],
  notes: "First go back to the flipchart from Day 1 (What do you hope to learn?): which hopes were met, which questions are still open? Park the open ones for the support days. Then end here, in silence for a minute if the room will tolerate it, before any closing announcements — let people actually write their five sentences rather than rushing to logistics."
},


/* ---------------------------------------------------------------------- */
/* PARKED — replaced or not used (hidden)                                 */
/* ---------------------------------------------------------------------- */

{ // Slide 130
  hidden: true,
  title: "Parked · Permissions and Plan Mode",
  kicker: "DAY 1 · PART 2 · PERMISSIONS",
  subtitle: "Look first. Change later.",
  type: "concept",
  visual: { art: 'gate' },
  cards: [
    { title: "Permissions", body: "Permissions control which actions Claude Code may perform without further approval." },
    { title: "Plan Mode", body: "Plan Mode lets Claude investigate and prepare a plan before implementation." }
  ],
  tagline: "Start with exploration. Review the plan before allowing changes.",
  keyPoints: ["Who decides what it may do? You", "It asks before edits and commands", "Yes once, yes always, or no", "Read what you approve", "Plan mode = look, don't touch", "Shift+Tab switches mode", "Rule: plan first, then approve changes"],
  notes: "This comes before anyone runs Claude Code on a task: from the demo on, they will see approval questions. Open with the question: Claude Code works on your real files and your real terminal, so who decides what it may do? You do. Permissions: reading and looking around is low risk, but before it edits a file or runs a command it stops and asks. You answer yes (just this once), yes and don't ask again for this kind of action, or no (and tell it what to do instead). Link back to the terminal slide: you don't need to know every command, but you must understand what you approve. Standing rules (always allow the tests, never touch this folder) live in the settings; /permissions shows them. Modes: the current mode shows at the bottom of Claude Code and Shift+Tab switches between them. Normal asks before each edit or command, which is best while learning. Accept edits lets file edits through without asking, while other actions still ask. Plan mode is read-only: Claude explores and comes back with a plan, and nothing changes until you approve it. Auto mode, if your setup has it, runs without asking each time, but risky actions are still checked and can be blocked. There is also a skip-all-permissions option for automated setups; mention that it exists and that we don't use it. Click to open the gate: this gate is you. Close on the tagline as the rule for both days: every assignment starts in plan mode, and changes only happen after you have read the plan. Optional story: when a hard-to-undo action such as deleting a repository is requested, Claude Code's safety check can block it even after a yes in chat, and the human has to run it themselves; that is permissions working as designed. Before class, open Claude Code on your teaching laptop and press Shift+Tab a few times, so the modes you name match what the room will see (they depend on the version and company settings)."
},

{ // Slide 131
  hidden: true,
  title: "Parked · Watch: Claude Code explores a project",
  kicker: "DAY 1 · PART 2 · LIVE DEMO",
  subtitle: "The reliable prompt in action, on a project it has never seen. Watch what Claude Code does, without changing anything.",
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
  keyPoints: ["Trainer demo: the room watches", "Point out: reads, tools, evidence, OPEN", "Point out: it asks before it runs", "Nothing changes: read-only", "Live run fails: press B for plan B"],
  notes: "This is a trainer demo: you run it live on the projector, the room watches. Use the practice repo on your own laptop (git clone https://github.com/jyse/aetherlink-classroom-starter.git); participants don't need it. While it runs, narrate what you see: it reads files, asks before it runs a command (that's the permission you just explained), builds up context, ties claims to evidence, marks OPEN, and changes nothing. Before class, run this exact prompt once on your own machine. If your live run fails (no network, no auth, a crash), say so plainly and press B for the captured run, then walk through it as if it were live; the teaching point survives either way. Point out that it's the reliable prompt from Part 1: goal, context, constraints, check. Later today they use the same pattern on their own game."
},

{ // Slide 132
  hidden: true,
  title: "Parked · A tour of Claude Code",
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

{ // Slide 133
  hidden: true,
  title: "Parked · Assignment: Your first CLAUDE.md",
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

{ // Slide 134
  hidden: true,
  title: "Parked · Look around for yourself",
  kicker: "DAY 1 · BEFORE LUNCH",
  subtitle: "10 to 15 minutes. Try things, ask Claude about Claude Code.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Try this:",
  cards: [
    { title: "You end up with", body: "your way around the / menu\none thing that surprised you" }
  ],
  steps: ["Type / and scroll through the menu.", "Try /model and look at the options.", "Type /context: what fills your context window right now?", "Ask Claude: “What can you help me with in Claude Code?”", "Write down one thing that surprised you."],
  expected: "You know your way around Claude Code, and you've seen your own context window.",
  keyPoints: ["10–15 minutes, free","Walk around and help","Collect surprises for after lunch","Then lunch"],
  notes: "Ten to fifteen minutes to look around on their own. Walk around and help. Ask a few people what surprised them and keep those for after lunch. Then lunch."
},

{ // Slide 135
  hidden: true,
  title: "Parked · Assignment 1: Your own game repo",
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
  keyPoints: ["MCP command: from the trainer","/mcp → log in","Check GitLab access before the course","Can't create through Claude? Use the GitLab page","Everyone ends inside their own empty repo"],
  notes: "Now the MCP from the previous slides becomes real. Everyone adds the GitLab MCP server (the trainer gives the command), starts claude, types /mcp and logs in. A first check: ask Claude which GitLab projects it can see. Then each person makes a new repo for the game in their personal space; if Claude can't create projects through the MCP, they use the GitLab page. Clone it and start claude inside it. Check before the course that every participant, managers included, has GitLab access. Anyone without it today starts with an empty local folder (git init) and connects GitLab later; the rest of the afternoon works the same."
},

{ // Slide 136
  hidden: true,
  title: "Parked · Assignment 2: Build your Snake",
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

{ // Slide 137
  hidden: true,
  title: "Parked · Assignment 5: House rules for your game",
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
  steps: ["Decide for yourself: what may Claude always do here, and what may it never do?", "Ask Claude to write your rules into .claude/settings.json. Read the file before you approve.", "Restart Claude and type /permissions. Are your rules there?", "Test them: “run the tests” (no question asked), then “force push my work” (blocked)."],
  expected: "The tests run without asking. Force push, rm -rf and edits to tests/ are blocked, even when you ask for them.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(rm -rf *)\",\n      \"Edit(tests/**)\"\n    ]\n  }\n}",
  keyPoints: ["You decide the rules, Claude writes them","Read settings.json before approving","/permissions shows what's active","Test both: allowed and blocked","tests/ is the referee"],
  notes: "Each rule stops a mistake that can really happen. No force push: it overwrites the history in their GitLab repo. No rm -rf: Claude never deletes folders on its own. No edits to tests/: the test is the referee; asked to 'make the tests pass', Claude might otherwise change the test instead of the game. Always allow npm test: approving a safe command over and over only teaches people to click yes without reading. Each participant decides first, then Claude writes the file; the Example prompt shows a good result (don't hand it out before they've decided). The test is the point: 'force push my work' must be refused by Claude Code itself, not by Claude being polite. If /permissions doesn't show the rules, restart Claude in the project folder."
},

{ // Slide 138
  hidden: true,
  title: "Parked · Assignment 6: Let the test check Claude's work",
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

{ // Slide 139
  hidden: true,
  title: "Parked · Assignment 7: Let Claude run to a goal",
  kicker: "DAY 2 · ASSIGNMENT 7",
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

{ // Slide 140
  hidden: true,
  title: "Parked · Assignment 8: Write your own goal",
  kicker: "DAY 2 · ASSIGNMENT 8",
  subtitle: "A feature you choose, from a goal you write yourself.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your goal must say", body: "what the feature does\nwhere you see it in the game\nwhat happens at game over and restart\nwhich check proves it works" }
  ],
  stepsHeading: "Steps:",
  steps: ["Pick a feature: a high score that stays after reload, a pause key, or walls that appear per level.", "Write your own /goal for it. No given prompt this time.", "Check it against the box: could a test or a person check every part? If not, sharpen it.", "Run it. Your hook keeps checking every edit.", "When the goal clears, play it yourself. Post your goal in the team chat: did it work, and why?"],
  expected: "Your game has a new feature, built from a goal you wrote yourself, and you played it to check.",
  keyPoints: ["Own goal, no given prompt","Self-check: is it checkable?","Hook keeps running","Play it yourself","Goals in the team chat: compare"],
  notes: "Last step down the ladder for this block: they write the goal themselves. The self-check against the box is the learning moment: “add a high score” is too vague; “the game shows a high score that stays after reload, resets only with a button, and npm test passes” is a goal a model can check. When the goal clears, they still play it. Everyone posts their goal in the team chat. Close by picking one good and one weak goal from the chat and saying why the good one worked."
},

{ // Slide 141
  hidden: true,
  title: "Parked · Assignment 9: Turn your Snake into a skill",
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

{ // Slide 142
  hidden: true,
  title: "Parked · Assignment 10: Build Pac-Man with your skill",
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

{ // Slide 143
  hidden: true,
  title: "Parked · Assignment 11: Levels from MD files",
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

{ // Slide 144
  hidden: true,
  title: "Parked · The arcade",
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
  notes: "Why the arcade: Claude can build one game in one prompt. Five games from five people talking to one scoreboard can't: it needs one agreement that everyone keeps, and building in layers. That is the software lifecycle and the team work we want them to feel. The agreement is already made for them: the arcade starter has one fixed contract (arcade.js) and a skill that connects a game to it. Three layers: the scoreboard, the connection every game uses at game over, and the start screen. Everything runs on one laptop, the arcade, shared on the big screen.",
},

{ // Slide 145
  hidden: true,
  title: "Parked · Assignment 12: Set up the arcade",
  kicker: "DAY 2 · ASSIGNMENT 12",
  subtitle: "The agreement is ready: one contract, one skill. Put it on GitLab and read it together.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "In the starter", body: "arcade.js: the contract\nthe arcade-score skill\nserve.js: the arcade server\nan empty scoreboard and start screen\nan example game" }
  ],
  stepsHeading: "Do this:",
  steps: ["Manager: create a repo arcade in your GitLab space, give your team access.", "Manager: copy the arcade starter in (from your trainer), commit and push.", "Everyone: clone it and read the arcade-score skill. What does every game send?", "On the arcade laptop: npm test, then node serve.js. Open localhost:8080.", "Play the example game once. Its score is the first one in the arcade."],
  expected: "The arcade runs on the arcade laptop, the tests pass, and everyone knows what their game must send.",
  prompt: "Read the arcade-score skill in this repo. Explain in five lines what my game must do to join the arcade, and what I must never change.",
  keyPoints: ["The agreement is given: arcade.js + skill","Manager sets up the repo","Everyone reads the skill","npm test, node serve.js","Example game = first score"],
  notes: "The agreement is already made: one contract (arcade.js) and one skill (arcade-score) that every game uses. The manager creates the arcade repo on GitLab, copies the starter in and pushes; the trainer has the starter (https://github.com/jyse/aetherlink-classroom-slides/tree/main/arcade-starter). Everyone clones it and reads the skill: the Example prompt lets Claude summarise it in five lines. On the arcade laptop: npm test (it tests the contract), then node serve.js and open localhost:8080. Play the example game once so there is a first score. No install is needed: serve.js uses Node only."
},

{ // Slide 146
  hidden: true,
  title: "Parked · Assignment 13: Build the scoreboard",
  kicker: "DAY 2 · ASSIGNMENT 13",
  subtitle: "On the arcade laptop: fill in the empty scoreboard.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Done when", body: "it shows the top 10\nwith picture, name, game and points\nit survives a reload" }
  ],
  stepsHeading: "Do this:",
  steps: ["Arcade laptop, arcade repo: start claude.", "Ask Claude to fill in scoreboard.html with Arcade.topScores(10). Plan first.", "Test with the example game: game over twice.", "All visible? npm test passes? Commit and push."],
  expected: "A scoreboard that shows the example scores in the top 10, with picture and name.",
  prompt: "Fill in scoreboard.html: show Arcade.topScores(10) as a top 10, each row with the player's picture, name, game and points. Don't change arcade.js. Plan first.",
  keyPoints: ["On the arcade laptop", "Fill in, don't start from scratch", "Test with the example game", "arcade.js stays untouched"],
  notes: "The scoreboard is half there: scoreboard.html is an empty page with the contract loaded. Claude fills it in with Arcade.topScores(10). Test with the example game before any real game is connected. arcade.js is the contract and stays untouched; if Claude wants to change it, say no. Mostly backender and manager, with the rest preparing their game.",
},

{ // Slide 147
  hidden: true,
  title: "Parked · Assignment 14: Connect your game",
  kicker: "DAY 2 · ASSIGNMENT 14",
  subtitle: "At game over, your game sends its score to the scoreboard.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The order", body: "one game first\ntest it\nthen the next one" }
  ],
  stepsHeading: "Do this:",
  steps: ["Copy your game into the arcade repo: games/<game>-<your name>/, with your picture.", "Ask Claude to connect it with the arcade-score skill. Plan first.", "npm test passes, and your game is in localhost:8080/games.json.", "On the arcade laptop: play one round. Is your score on the board, with your picture?", "Works? Push, and the next player goes. Doesn't? Fix it first."],
  expected: "Every game sends its score, and every score shows on the scoreboard with the right picture.",
  prompt: "Use the arcade-score skill to connect my game in games/[your folder]. Plan first.",
  keyPoints: ["Your game into games/<game>-<name>/", "The skill does the connecting", "Check /games.json", "One game first, then the next"],
  notes: "Every player copies their game into the arcade repo, in games/<game>-<name>/, with their picture. The skill does the connecting: game.json, the contract script, one Arcade.submitScore at game over. One game first: connect, check /games.json, play one round on the arcade laptop, check the scoreboard. Only when that works does the next game join. When something breaks, it is almost always the score: the contract rejects it with a clear message.",
},

{ // Slide 148
  hidden: true,
  title: "Parked · Assignment 15: The start screen",
  kicker: "DAY 2 · ASSIGNMENT 15",
  subtitle: "One menu for the whole arcade.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The start screen shows", body: "every player's avatar\nevery game\nthe top 10" }
  ],
  stepsHeading: "Do this:",
  steps: ["On the arcade laptop: ask Claude to fill in index.html. Plan first.", "Pick your avatar, pick a game, play.", "After game over: back to the start screen, with the new top 10.", "Commit and push."],
  expected: "From one start screen, everyone can pick their avatar and play every game.",
  prompt: "Fill in index.html as the arcade's start screen: every player's avatar and every game from Arcade.games(), and the top 10 from Arcade.topScores(10). Picking a game opens it. Don't change arcade.js. Plan first.",
  keyPoints: ["Frontender-led","Avatar → game → play → back","Top 10 on the start screen","Then: the tournament"],
  notes: "Mostly the frontender, on the arcade laptop. index.html is an empty start screen with three sections: players, games and the top 10. Arcade.games() gives every connected game with its player and picture. Pick your avatar, pick a game, play, and after game over you're back with the new top 10. When this works, the arcade is ready for the tournament.",
},

{ // Slide 149
  hidden: true,
  title: "Parked · Bonus: the game coaches you",
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
  prompt: "Write a skill called arcade-coach. After every round it looks at what happened (score, how you lost, your previous best) and shows one short, fun comment in the game. Fixed comments are fine: no AI connection in the game itself. Only change files in my own game folder. Show me the skill first.",
  keyPoints: ["Optional, for fast teams","Skill + memory + creativity","No AI connection in the game","Fun, never mean"],
  notes: "Optional, for teams that are done early. The game comments on itself after every round: skills, memory and creativity together. The comments are fixed texts chosen by rules: there is no AI connection inside the game itself."
},

{ // Slide 150
  hidden: true,
  title: "Parked · Three views of the same work",
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

{ // Slide 151
  hidden: true,
  title: "Parked · Get the Aether Library on your laptop",
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

{ // Slide 152
  hidden: true,
  title: "Parked · settings.json",
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

{ // Slide 153
  hidden: true,
  title: "Parked · Complete progression",
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

{ // Slide 154
  hidden: true,
  title: "Parked · Assignment 5: Design and build a feature",
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

{ // Slide 155
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

{ // Slide 156
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

{ // Slide 157
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

{ // Slide 158
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

{ // Slide 159
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

{ // Slide 160
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

{ // Slide 161
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

{ // Slide 162
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

{ // Slide 163
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

{ // Slide 164
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

{ // Slide 165
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

{ // Slide 166
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

{ // Slide 167
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

{ // Slide 168
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

{ // Slide 169
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

{ // Slide 170
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

{ // Slide 171
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

{ // Slide 172
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

{ // Slide 173
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
