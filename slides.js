/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   80 slides, authored from CURRICULUM.md. One slide = one object in order.
   See README.md "How to edit a slide" before changing anything here.

   Field reference:
     title     - required. Shown as the big heading.
     kicker    - small text above the title (e.g. "DAY 1 · PART 1").
     subtitle  - one sentence under the title.
     type      - one of: context, concept, practice, review, recap, pause.
                 Controls the colour chip and the footer progress dot.
     dark      - true to render this slide on the dark background variant.
     layout    - optional: "steps" | "pillars" | "compare" | "recap".
                 Leave out for a plain card grid (the default).
     cards     - array of {title, body} shown as the card grid.
     items     - for layout "steps"/"pillars"/"recap": {label, caption, detail}.
     columns   - for layout "compare": {title, items:[...], foot}.
     steps     - the "Do this now" checklist (plain strings) for exercise slides.
     expected  - one sentence: what a good result looks like.
     check     - the checkpoint question a facilitator/participant confirms.
     timer     - minutes, only when the curriculum states an exact duration.
     prompt    - an exact phrase the facilitator can read aloud or paste.
     notes     - facilitator speaker notes (never shown to participants).
   ========================================================================== */
window.SLIDES = [

/* ---------------------------------------------------------------------- */
/* DAY 1 — Opening: Why are we here?                                      */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Aetherlink × Worldline",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Teaching Day 1 — Working with Claude Code",
  type: "context",
  dark: true,
  cards: [
    { title: "What we're doing", body: "Building useful AI workflows together." },
    { title: "Today", body: "Teaching Day 1 — Working with Claude Code." }
  ],
  notes: "Open on time. Welcome the room, introduce yourself, name the two teaching days and the five support days that follow. Keep this short — the real content starts at slide 2."
},

{ // Slide 2
  title: "The seven-day journey",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Two teaching days, then five supporting days with Ryan.",
  type: "context",
  cards: [
    { title: "Learn the foundations", body: "Understand AI and Claude Code before touching real work." },
    { title: "Practise with Claude Code", body: "Use it safely on a real, low-risk project." },
    { title: "Build reliable workflows", body: "Turn one good result into something repeatable." },
    { title: "Apply them to team challenges", body: "Bring the method to a real team issue in the support days." }
  ],
  notes: "Visually distinguish Teaching Days 1-2 from Supporting Days 1-5, but do not explain all seven days in detail yet — that temptation wastes time here. One sentence per phase is enough; Ryan owns the detail for the support days."
},

{ // Slide 3
  title: "Our destination",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By the end of this programme, your squad can build or improve an AI-supported workflow that the team can understand, verify and reuse.",
  type: "context",
  layout: "pillars",
  items: [
    { label: "Useful" },
    { label: "Safe" },
    { label: "Shared" },
    { label: "Reusable" }
  ],
  notes: "Read the subtitle exactly as written — it's the north star for both teaching days. The four words are the test you'll come back to: is what we built useful, safe, shared and reusable?"
},

{ // Slide 4
  title: "Start with the problem",
  kicker: "DAY 1 · WELCOME",
  subtitle: "What recurring task or frustration costs your team time?",
  type: "context",
  cards: [
    { title: "Prompt", body: "Describe the problem, not the solution." }
  ],
  prompt: "What recurring task or frustration costs your team time? Describe the problem, not the solution.",
  notes: "Very short opening discussion — two or three minutes, a handful of voices, do not let it become a design session. The point is to surface real frustration before any tooling talk starts."
},

{ // Slide 5
  title: "Today's destination",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By 16:00, you can use Claude Code to:",
  type: "context",
  cards: [
    { title: "Explore", body: "explore a project" },
    { title: "Plan", body: "make a plan" },
    { title: "Change", body: "create a small change" },
    { title: "Test", body: "test the result" },
    { title: "Review", body: "review the evidence" }
  ],
  notes: "This previews the five-step method that becomes the red thread from slide 19 onward. Don't teach it yet — just point at the shape so it feels familiar when it returns."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 1: Understanding AI                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 6
  title: "What is AI?",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "AI is the broader field of creating systems that perform tasks associated with human intelligence.",
  type: "concept",
  cards: [
    { title: "Definition", body: "AI is the broader field of creating systems that perform tasks associated with human intelligence." },
    { title: "Small examples", body: "recognise, predict, generate, decide, act." }
  ],
  notes: "Keep this brief and plain-language — the room includes non-engineers. Resist the pull to go deeper into AI history or academic definitions; the goal is a shared floor, not a lecture."
},

{ // Slide 7
  title: "From AI to generative AI",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "Artificial intelligence → Machine learning → Generative AI → Large language models",
  type: "concept",
  layout: "steps",
  items: [
    { label: "Artificial intelligence", caption: "Systems that perform tasks associated with human intelligence." },
    { label: "Machine learning", caption: "Systems that improve from data rather than fixed rules." },
    { label: "Generative AI", caption: "Systems that produce new content: text, code, images." },
    { label: "Large language models", caption: "Generative models specialised in language and text." }
  ],
  detail: "Click through each term for its one-line definition.",
  notes: "Click through the four terms live so the nesting is visible: each term sits inside the one before it. This is scaffolding for slide 8, not a separate lesson."
},

{ // Slide 8
  title: "What is an LLM?",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "A large language model generates a likely continuation based on patterns learned from data and the context it receives.",
  type: "concept",
  cards: [
    { title: "Definition", body: "A large language model generates a likely continuation based on patterns learned from data and the context it receives." },
    { title: "Key line", body: "It generates an answer. It does not guarantee the truth." }
  ],
  notes: "Say the key line slowly and let it land — it's the single most important sentence of Part 1, and everything about verification and human review later depends on the room accepting it now."
},

{ // Slide 9
  title: "Input, model and output",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "Your input + available context → model → generated output",
  type: "concept",
  cards: [
    { title: "The flow", body: "Your input + available context → model → generated output" },
    { title: "Better context", body: "Better context improves the likelihood of a useful result." },
    { title: "Verification", body: "Verification determines whether the result can be trusted." }
  ],
  notes: "Draw the arrow on the whiteboard if you have one: input+context → model → output. This sets up 'context' as a concept that returns constantly on Day 2."
},

{ // Slide 10
  title: "Tokens and context",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "Give Claude what is relevant, current and allowed.",
  type: "concept",
  cards: [
    { title: "Tokens", body: "Tokens are pieces of text processed by the model." },
    { title: "Context window", body: "The context window is the information available during the interaction." },
    { title: "More is not better", body: "More context is not automatically better context." }
  ],
  tagline: "Give Claude what is relevant, current and allowed.",
  notes: "The tagline is the takeaway to repeat: relevant, current, allowed. It will resurface almost word-for-word in Day 2's CLAUDE.md and context slides."
},

{ // Slide 11
  title: "Why AI can be wrong",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "AI output is a proposal until it is verified.",
  type: "concept",
  cards: [
    { title: "Missing context", body: "The model did not have what it needed to answer well." },
    { title: "Ambiguous instructions", body: "The request could reasonably mean more than one thing." },
    { title: "Outdated information", body: "What the model learned no longer matches reality." },
    { title: "Incorrect assumptions", body: "The model filled a gap with a guess instead of asking." },
    { title: "Plausible-looking fabrication", body: "A confident-sounding answer that isn't actually true." }
  ],
  tagline: "AI output is a proposal until it is verified.",
  notes: "Ask the room for a personal example of AI being confidently wrong before you reveal the list — recognition lands harder than the definition alone."
},

{ // Slide 12
  title: "Model behaviour",
  kicker: "DAY 1 · PART 1 · UNDERSTANDING AI",
  subtitle: "Supporting knowledge, not the main lesson.",
  type: "concept",
  cards: [
    { title: "Capability", body: "Different models have different capabilities." },
    { title: "Model choice", body: "Model choice affects speed, cost and depth." },
    { title: "Temperature", body: "Temperature affects variation, not truthfulness." }
  ],
  notes: "This slide should remain brief. It is supporting knowledge, not the main lesson — thirty seconds, then move on to Part 2."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 2: Meet Claude                                             */
/* ---------------------------------------------------------------------- */

{ // Slide 13
  title: "Claude is more than one interface",
  kicker: "DAY 1 · PART 2 · MEET CLAUDE",
  subtitle: "Four products, one underlying model.",
  type: "concept",
  cards: [
    { title: "Claude Chat", body: "Think and converse" },
    { title: "Claude Desktop", body: "Claude on your computer" },
    { title: "Claude Code", body: "Work inside technical projects" },
    { title: "Claude API", body: "Build Claude into software" }
  ],
  notes: "Cowork and other interfaces can be mentioned verbally without turning this into an extensive product catalogue. Land on Claude Code — that's where the room lives for the rest of the day."
},

{ // Slide 14
  title: "Claude Chat versus Claude Code",
  kicker: "DAY 1 · PART 2 · MEET CLAUDE",
  subtitle: "Claude Code is already agentic.",
  type: "concept",
  layout: "compare",
  columns: [
    { title: "Claude Chat", items: [
      "Works mainly in a conversation",
      "Responds with content",
      "Receives what you provide",
      "Produces an answer"
    ] },
    { title: "Claude Code", items: [
      "Works inside a project",
      "Can inspect and act",
      "Can read approved project files",
      "Can use tools and run checks"
    ], foot: "Claude Code is already agentic." }
  ],
  notes: "Pair each Claude Chat row with its Claude Code counterpart when you talk through this — same order on both sides is deliberate."
},

{ // Slide 15
  title: "What makes Claude Code agentic?",
  kicker: "DAY 1 · PART 2 · MEET CLAUDE",
  subtitle: "Using an existing agentic tool is not the same as building your own agent.",
  type: "concept",
  cards: [
    { title: "Observe", body: "Claude Code can observe." },
    { title: "Plan", body: "Claude Code can plan." },
    { title: "Use tools", body: "Claude Code can use tools." },
    { title: "Make changes", body: "Claude Code can make changes." },
    { title: "Check results", body: "Claude Code can check results." },
    { title: "Adjust or stop", body: "Claude Code can adjust or stop." }
  ],
  tagline: "Using Claude Code means working with an existing agentic tool, not building your own standalone agent.",
  notes: "Important clarification, say it explicitly: using Claude Code today does not mean the room has built a standalone agent. That distinction becomes central in Day 2 Part 4 — plant it now."
},

{ // Slide 16
  title: "Why the terminal?",
  kicker: "DAY 1 · PART 2 · MEET CLAUDE",
  subtitle: "The terminal gives Claude Code access to the tools and commands used by the project.",
  type: "concept",
  cards: [
    { title: "Examples", body: "navigate\ninspect files\nstart applications\nrun tests\nuse Git\nreview changes" }
  ],
  tagline: "You do not need to memorise every command, but you must understand what you approve.",
  notes: "If anyone in the room is terminal-anxious, name it directly: they don't need to memorise commands, they need to understand what they're approving. That's the whole bar."
},

{ // Slide 17
  title: "Your first Claude Code conversation",
  kicker: "DAY 1 · PART 2 · LIVE DEMO",
  subtitle: "A simple trainer demonstration in a small, neutral example, before introducing the Academy.",
  type: "concept",
  dark: true,
  cards: [
    { title: "Explore", body: "Explore this project." },
    { title: "Explain", body: "Explain what it does and how it is structured." },
    { title: "Do not change anything", body: "Do not change anything." },
    { title: "Show evidence", body: "Show which evidence supports your explanation." }
  ],
  prompt: "Explore this project. Explain what it does and how it is structured. Do not change anything. Show which evidence supports your explanation.",
  notes: "HIGH RISK — no Jessy on-site to rescue a live break. Before the room arrives, run this exact prompt once on the demo machine and keep a screenshot/terminal capture of the output ready. If the live demo fails (no network, no auth, a crash): say so plainly, show the captured screenshot instead, and walk through it exactly as if it were live — the teaching point (explore, explain, evidence, no changes) survives either way."
},

{ // Slide 18
  title: "What just happened?",
  kicker: "DAY 1 · PART 2 · MEET CLAUDE",
  subtitle: "What did Claude do that a normal chatbot could not do here?",
  type: "review",
  cards: [
    { title: "Inspected files", body: "Claude looked at the real project, not just your description of it." },
    { title: "Gathered context", body: "It built up what it needed before answering." },
    { title: "Formed an explanation", body: "It produced a structured account of the project." },
    { title: "Used evidence", body: "Its claims were tied to what it actually found." },
    { title: "Remained read-only", body: "It did all of this without changing anything." }
  ],
  notes: "Let the room answer the question themselves before you reveal the five points — the answer ('it could look at the real files') is the whole bridge into Part 3."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 3: The Human-AI working method                            */
/* ---------------------------------------------------------------------- */

{ // Slide 19
  title: "One method throughout the programme",
  kicker: "HUMAN IN THE LOOP",
  subtitle: "Explore → Plan → Change → Test → Human review",
  type: "concept",
  layout: "steps",
  items: [
    { label: "Explore", caption: "Understand before acting." },
    { label: "Plan", caption: "Agree on the intended change." },
    { label: "Change", caption: "Make the smallest useful change." },
    { label: "Test", caption: "Evidence, not confidence." },
    { label: "Human review", caption: "The human decides." }
  ],
  detail: "This becomes the visual red thread used repeatedly in both teaching days.",
  notes: "Name it once, precisely: this is 'the human-in-the-loop working method' — Explore, Plan, Change, Test, Human review. Every later reference to 'the method' or 'human in the loop' points back to this exact slide, so get the wording right here."
},

{ // Slide 20
  title: "Explore",
  kicker: "HUMAN IN THE LOOP · STEP 1",
  subtitle: "Understand before acting.",
  type: "concept",
  cards: [
    { title: "Check", body: "What is the goal?\nWhat already exists?\nWhich files are relevant?\nWhat remains unknown?\nWhat must not be changed?" }
  ],
  notes: "This is the step people are most tempted to skip. Make the point explicitly: skipping Explore is where most bad AI-assisted changes start."
},

{ // Slide 21
  title: "Plan",
  kicker: "HUMAN IN THE LOOP · STEP 2",
  subtitle: "Agree on the intended change before implementation.",
  type: "concept",
  cards: [
    { title: "A useful plan includes", body: "desired outcome\nfiles affected\napproach\nrisks\nvalidation\nstop conditions" }
  ],
  notes: "Point out 'stop conditions' specifically — it's the least intuitive item and the one participants forget to write down."
},

{ // Slide 22
  title: "Change",
  kicker: "HUMAN IN THE LOOP · STEP 3",
  subtitle: "Make the smallest useful change.",
  type: "concept",
  cards: [
    { title: "Boundaries", body: "stay within scope\navoid unrelated changes\npause when assumptions are required\npreserve existing work" }
  ],
  notes: "'Smallest useful change' is the phrase to repeat during every assignment this afternoon when someone's scope starts creeping."
},

{ // Slide 23
  title: "Test",
  kicker: "HUMAN IN THE LOOP · STEP 4",
  subtitle: "Evidence, not confidence.",
  type: "concept",
  cards: [
    { title: "Possible evidence", body: "automated tests\ncommand output\nmanual check\nscreenshot\ncomparison with acceptance criteria" }
  ],
  notes: "Ask: 'what would count as evidence for the change you're imagining this afternoon?' — get a couple of concrete answers before moving on."
},

{ // Slide 24
  title: "Human review",
  kicker: "HUMAN IN THE LOOP · STEP 5",
  subtitle: "The human decides.",
  type: "review",
  cards: [
    { title: "The human decides", body: "Does the result match the intent?\nIs the evidence sufficient?\nAre the risks acceptable?\nShould we accept, revise or stop?" }
  ],
  tagline: "Human review is part of the workflow, not an optional final step.",
  notes: "Say the tagline explicitly and let it sit: human review is part of the workflow, not an optional final step. This is the sentence Working agreement (slide 25) and every review gate later builds on."
},

{ // Slide 25
  title: "Working agreement",
  kicker: "HUMAN IN THE LOOP",
  subtitle: "During this workshop, Claude must:",
  type: "context",
  cards: [
    { title: "Working agreement", body: "explore before changing\nshow a plan first\nmake small changes\nrun relevant checks\nshow evidence\nmark uncertainty as OPEN\nwait for human approval" }
  ],
  notes: "Frame this as the room's own working agreement with Claude Code, not a rule imposed from outside — ask if anyone wants to add anything before moving on."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 4: Meet the Aetherlink Academy                            */
/* ---------------------------------------------------------------------- */

{ // Slide 26
  title: "Your practice environment",
  kicker: "DAY 1 · PART 4 · MEET THE ACADEMY",
  subtitle: "A shared learning platform that we will improve while learning how to collaborate with Claude Code.",
  type: "context",
  cards: [
    { title: "The Aetherlink Academy", body: "A shared learning platform that we will improve while learning how to collaborate with Claude Code." }
  ],
  notes: "The Academy is only introduced now — participants understand Claude Code and the working method first. Point participants to their own clone of the practice repo at this point."
},

{ // Slide 27
  title: "Why the Academy?",
  kicker: "DAY 1 · PART 4 · MEET THE ACADEMY",
  subtitle: "We are not building disconnected exercises.",
  type: "context",
  cards: [
    { title: "Our participant directory", body: "Who is here, and what they're working on." },
    { title: "Our terminology library", body: "Shared definitions the whole squad can rely on." },
    { title: "Our learning journal", body: "Where today's and tomorrow's notes live." },
    { title: "Our shared knowledge base", body: "What the squad knows, in one place." },
    { title: "Our evidence and handoff environment", body: "Where proof of work lives and moves between people." }
  ],
  notes: "Every assignment this afternoon changes one part of this list — that's the thread that makes four separate exercises feel like one project."
},

{ // Slide 28
  title: "Safe workshop boundaries",
  kicker: "DAY 1 · PART 4 · MEET THE ACADEMY",
  subtitle: "What you may and may not change today.",
  type: "context",
  layout: "compare",
  columns: [
    { title: "Participants may change", items: [
      "profiles",
      "terminology",
      "learning content",
      "prepared interface features"
    ] },
    { title: "Participants may not independently change", items: [
      "authentication",
      "secrets",
      "production configuration",
      "facilitator controls",
      "deployment settings"
    ] }
  ],
  notes: "Read the right-hand column aloud slowly and explicitly before the first assignment starts — this is the boundary that keeps a solo practice repo genuinely safe to break."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Setup: get ready                                                */
/* ---------------------------------------------------------------------- */

{ // Slide 29
  title: "Get your practice repo",
  kicker: "DAY 1 · SETUP",
  subtitle: "Every participant works solo, in their own local copy.",
  type: "context",
  cards: [
    { title: "1 · Clone it", body: "git clone <link in chat>\ncd aetherlink-classroom-practice" },
    { title: "2 · Install", body: "npm install" },
    { title: "3 · Run it", body: "npm start\nOpen http://localhost:3000" },
    { title: "4 · Confirm", body: "You should see Profiles and Glossary pages, already populated with sample data." }
  ],
  prompt: "Clone the repo from the link in chat, then run npm install and npm start. You should see the Academy practice app running at localhost:3000 — put a checkmark in chat once you see it.",
  notes: "This is a facilitator-led step, not a self-paced assignment — walk the room through it together and watch chat for stragglers before moving on. If someone's npm install hangs or fails, pair them with a neighbour to keep pace rather than debugging live for everyone; the repo README has a plain troubleshooting section too."
},

{ // Slide 30
  title: "Set up Claude Code",
  kicker: "DAY 1 · SETUP",
  subtitle: "Confirm Claude Code can see your project before Assignment 1 starts.",
  type: "context",
  cards: [
    { title: "1 · Open it", body: "In the same project folder, run:\nclaude" },
    { title: "2 · Sign in", body: "Follow the sign-in prompt if this is your first time using Claude Code." },
    { title: "3 · Sanity check", body: "Ask it: \"What's in this folder?\"" },
    { title: "What good looks like", body: "Claude describes your actual practice repo — profiles, glossary, CLAUDE.md — not a generic answer." }
  ],
  prompt: "Open a terminal in your project folder, type claude, sign in if asked, then ask it: what's in this folder? You should see it describe your actual project, not a generic answer.",
  notes: "This is the first live proof Claude Code is actually working before the room starts Assignment 1 — don't skip the sanity-check question, it's what catches a broken install or auth early. If someone's stuck on auth, have them continue read-only alongside a neighbour rather than blocking the whole room; this is exactly the kind of live-setup moment the instructor guide's fallback section covers."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 1                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 31
  title: "Assignment 1: Explore the Academy",
  kicker: "DAY 1 · ASSIGNMENT 1 · 25 MIN",
  subtitle: "Explore the repository without changing anything.",
  type: "practice",
  layout: "exercise",
  timer: 25,
  cards: [
    { title: "Deliver", body: "what the Academy does\nproject structure\nrelevant files\navailable commands\nsensitive areas\nOPEN questions" }
  ],
  steps: [
    "Ask Claude to explore your practice repo without changing anything.",
    "Have it explain what the Academy does.",
    "Have it map the project structure and relevant files.",
    "Have it list available commands.",
    "Have it flag sensitive areas.",
    "Have it list OPEN questions it could not answer."
  ],
  expected: "A clear, evidence-based explanation of the Academy with any unknowns marked OPEN rather than guessed.",
  check: "Goal: gather reliable context before acting.",
  prompt: "Explore this repository without changing anything. Tell me what the Academy does, how the project is structured, which files are relevant, what commands are available, which areas are sensitive, and list anything that remains OPEN.",
  notes: "First solo assignment of the day — expect questions about basic terminal use in the first five minutes, that's normal. Start the timer visibly. At 5 minutes remaining, give a verbal warning. If someone finishes early, have them dig into one OPEN question rather than move ahead."
},

{ // Slide 32
  title: "Assignment 1: Review",
  kicker: "DAY 1 · ASSIGNMENT 1 · REVIEW",
  subtitle: "Compare Claude's explanation with the repository.",
  type: "review",
  cards: [
    { title: "Compare", body: "What was correct?\nWhat was an assumption?\nWhat evidence did Claude use?\nWhat remains OPEN?" }
  ],
  check: "Human decision: is there enough understanding to begin changing the project?",
  notes: "Pull two or three real answers from the room rather than talking in the abstract — ask someone to read out one OPEN question their Claude session raised."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 2                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 33
  title: "Assignment 2: Join the Academy",
  kicker: "DAY 1 · ASSIGNMENT 2",
  subtitle: "Add your participant profile.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Include", body: "name\nrole and team\nexperience\nlearning goal\none workflow you want to improve" }
  ],
  steps: [
    "Explore how existing profiles are structured.",
    "Plan the fields for your own profile.",
    "Get human approval on the plan before changing anything.",
    "Make the change.",
    "Test that your profile appears correctly.",
    "Review the result against the definition of done."
  ],
  expected: "Your own profile added to the Academy, following the required method end to end.",
  prompt: "Add my participant profile to the Academy: name, role and team, experience, my learning goal, and one workflow I want to improve. Follow the method — explore first, then propose a plan, wait for my approval, then change, test, and show me the result before we call it done.",
  notes: "Required method: Explore → Plan → Human approval → Change → Test → Review. Watch for participants who skip straight to editing the file — redirect them back to Explore/Plan without being heavy-handed about it, this is the first time they'll feel the method in their own hands."
},

{ // Slide 34
  title: "Definition of done",
  kicker: "DAY 1 · ASSIGNMENT 2 · DEFINITION OF DONE",
  subtitle: "Your profile:",
  type: "review",
  cards: [
    { title: "Definition of done", body: "follows the existing structure\nappears correctly in the Academy\ncontains no inappropriate personal information\npasses the relevant validation\nhas been reviewed by another participant" }
  ],
  notes: "Pair participants up briefly for the peer-review line item — two minutes each way is enough, this is a light touch, not a formal code review."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 3                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 35
  title: "Assignment 3: Teach the Academy one term",
  kicker: "DAY 1 · ASSIGNMENT 3",
  subtitle: "Add one AI term.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Must contain", body: "plain-language definition\nexample\ncommon misconception\nrelevance to this programme" }
  ],
  steps: [
    "Pick one AI term you now understand well enough to teach.",
    "Draft a plain-language definition, an example, a common misconception, and why it matters to this programme.",
    "Verify the explanation before adding it.",
    "Add the entry to the glossary.",
    "Test that it appears correctly."
  ],
  expected: "One glossary entry that someone else could read and understand without you in the room.",
  check: "Verify the explanation before adding it.",
  prompt: "Help me add one AI term to the Academy glossary: a plain-language definition, an example, a common misconception, and why it matters to this programme. Before we add it, check the definition against what we actually covered today — flag anything that looks wrong or invented.",
  notes: "The verification step is the whole point of this assignment — if someone's first draft goes straight in unchecked, stop and ask them to verify it against today's material first."
},

{ // Slide 36
  title: "From individual knowledge to team knowledge",
  kicker: "DAY 1 · ASSIGNMENT 3 · REVIEW",
  subtitle: "A useful contribution can be understood and reused by someone who did not create it.",
  type: "review",
  cards: [
    { title: "The test", body: "A useful contribution can be understood and reused by someone who did not create it." }
  ],
  notes: "Short group review of selected glossary entries — pick two or three at random and read them aloud, let the room judge whether a stranger could understand them."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Assignment block 4                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 37
  title: "Assignment 4: Improve the Academy",
  kicker: "DAY 1 · ASSIGNMENT 4",
  subtitle: "Choose one small, tested, reviewable improvement.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Choose one", body: "profile search\nrole or team filter\nterminology search\ncategory filter\nlearning-goal overview\nempty state\ncontribution status" }
  ],
  steps: [
    "Pick exactly one item from the list.",
    "Explore the relevant files first.",
    "Write a short plan and get it approved.",
    "Make the smallest useful change.",
    "Test it.",
    "Prepare your evidence for review."
  ],
  expected: "One small, tested, reviewable improvement — not several, not a redesign.",
  prompt: "I want to improve the Academy by adding [pick one: profile search / a role or team filter / terminology search / a category filter / a learning-goal overview / an empty state / contribution status]. Explore the relevant files first, propose a small plan, and wait for my approval before changing anything.",
  notes: "The single biggest risk on this slide is scope creep — someone will want to do two improvements at once. Hold the line on 'one small, tested, reviewable improvement' the same way you held 'smallest useful change' on slide 22."
},

{ // Slide 38 — CONTENT EDIT: reframed as a preview, solo only in Days 1-2
  title: "Team roles (preview)",
  kicker: "PREVIEW · SUPPORT DAYS",
  subtitle: "A preview of the roles used once mob programming starts in the support days — not something we practise solo today.",
  type: "context",
  cards: [
    { title: "Driver", body: "Operates Claude Code." },
    { title: "Navigator", body: "Guides the next action." },
    { title: "Reviewer", body: "Checks intent and evidence." },
    { title: "Observer / tester", body: "Records assumptions, tests and lessons." }
  ],
  tagline: "Every participant works their own solo repo in Days 1 and 2.",
  notes: "This is a preview only — the same pattern as slide 40's 'Tomorrow' and slide 77's support-days preview. Do not run a rotation exercise here: everyone in the room is working their own solo practice repo through Assignment 4, full stop. Say plainly: 'you'll actually use these roles once mob programming starts in the support days.'"
},

{ // Slide 39
  title: "Review gate",
  kicker: "DAY 1 · ASSIGNMENT 4 · REVIEW",
  subtitle: "Before accepting the work:",
  type: "review",
  cards: [
    { title: "Before accepting the work", body: "Did we achieve the intended outcome?\nDid we remain within scope?\nWhat did we test?\nWhat evidence do we have?\nWhat remains OPEN?" }
  ],
  check: "Decision: PASS / REVISE / OPEN",
  notes: "Walk through the decision options explicitly — PASS, REVISE, or OPEN — this is the first time the room sees this three-way decision; it repeats at slides 50, 73 and throughout the support days."
},

/* ---------------------------------------------------------------------- */
/* DAY 1 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 40
  title: "Your raw learning note",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Without asking Claude to rewrite it, record:",
  type: "recap",
  cards: [
    { title: "Record", body: "what you worked on\nwhat changed\nwhat you tested\nwhat worked\nwhat remains open\nwhat you learned\nwhat should happen next" }
  ],
  tagline: "This note becomes the Day 2 input.",
  notes: "Save this as notes/day1-learning-note.md in your own practice repo — it's already sitting in the environment you'll need it from tomorrow. Emphasise 'without asking Claude to rewrite it': today the note stays raw and personal, in the participant's own words. Day 2 Assignment 6 is exactly about reviewing this note with Claude — don't let anyone jump ahead and polish it now."
},

{ // Slide 41
  title: "What changed today?",
  kicker: "DAY 1 · CLOSING",
  subtitle: "From an unfamiliar tool to a working method.",
  type: "recap",
  layout: "compare",
  columns: [
    { title: "This morning", items: [
      "Claude Code was an unfamiliar tool."
    ] },
    { title: "This afternoon", items: [
      "You used it to understand, change, test and review a real project."
    ] }
  ],
  notes: "Let this land as a genuine before/after — ask one or two people to name, in their own words, what changed for them today."
},

{ // Slide 42
  title: "Tomorrow",
  kicker: "PREVIEW · DAY 2",
  subtitle: "How do we turn one successful AI interaction into a reliable method the whole team can reuse?",
  type: "context",
  cards: [
    { title: "Context", body: "Preview only." },
    { title: "CLAUDE.md", body: "Preview only." },
    { title: "Skills", body: "Preview only." },
    { title: "MCP", body: "Preview only." },
    { title: "Bounded agent workflows", body: "Preview only." }
  ],
  notes: "Preview only — do not explain any of these five terms in depth tonight, that's Day 2's entire structure. End on the question, not on answers."
},

/* ==========================================================================
   DAY 2 — From one-off prompt to reusable agent workflow
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 2 — Opening and recap                                               */
/* ---------------------------------------------------------------------- */

{ // Slide 43
  title: "Day 2: Making AI work repeatable",
  kicker: "DAY 2 · WELCOME",
  subtitle: "Prompt → Standard → Skill → Connected workflow → Human gate",
  type: "context",
  layout: "steps",
  items: [
    { label: "Prompt" },
    { label: "Standard" },
    { label: "Skill" },
    { label: "Connected workflow" },
    { label: "Human gate" }
  ],
  notes: "This chain is Day 2's own red thread, the same role slide 19's five steps played on Day 1. Point at it now, come back to it at the closing slides."
},

{ // Slide 44
  title: "Day 1 retrieval challenge",
  kicker: "DAY 2 · RECAP",
  subtitle: "Without looking at yesterday's slides, explain:",
  type: "recap",
  cards: [
    { title: "Why is Claude Code agentic?", body: "Answer from memory first." },
    { title: "What is context?", body: "Answer from memory first." },
    { title: "What are the five steps in our working method?", body: "Answer from memory first." },
    { title: "Why is human review necessary?", body: "Answer from memory first." }
  ],
  notes: "Genuinely make them answer without looking back at Day 1's deck — cold retrieval, not open-book. If the room struggles with the five steps, that's useful signal: slow down Part 1 rather than push ahead."
},

{ // Slide 45
  title: "The four levels",
  kicker: "DAY 2 · RECAP",
  subtitle: "These levels can overlap, but they are not identical.",
  type: "concept",
  layout: "pillars",
  items: [
    { label: "Ask Claude" },
    { label: "Use Claude Code" },
    { label: "Customise Claude Code" },
    { label: "Design an agent workflow" }
  ],
  tagline: "These levels can overlap, but they are not identical.",
  notes: "This is the map for the whole day: Part 1 lives at level 2-3 (context, CLAUDE.md), Part 2 at level 3 (skills), Part 3-4 at level 4 (MCP, workflows). Point forward to today's four parts as you introduce each level."
},

{ // Slide 46
  title: "Using versus building",
  kicker: "DAY 2 · RECAP",
  subtitle: "Five situations, five different things you might actually be doing.",
  type: "concept",
  layout: "compare",
  columns: [
    { title: "Situation", items: [
      "Claude answers a question",
      "Claude Code changes a project",
      "CLAUDE.md and skills guide its work",
      "Trigger, tools and process are designed",
      "Workflow runs as its own system"
    ] },
    { title: "What you are doing", items: [
      "Chatting",
      "Using an agentic tool",
      "Customising Claude Code",
      "Building an agent workflow",
      "Building a standalone agent"
    ], foot: "Each row on the left maps to the same row on the right." }
  ],
  notes: "Read row by row, left then right, so the pairing is unmistakable — this table is what participants will use to correctly describe what they built at Assignment 10."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 1: Context and project memory                             */
/* ---------------------------------------------------------------------- */

{ // Slide 47
  title: "Claude needs context",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Context tells Claude what matters now.",
  type: "concept",
  cards: [
    { title: "Useful context includes", body: "objective\nrelevant files and information\nconstraints\nexamples\nsuccess criteria\nvalidation method" }
  ],
  tagline: "Context tells Claude what matters now.",
  notes: "This picks straight back up from Day 1 slide 10's 'relevant, current, allowed' — say that connection explicitly."
},

{ // Slide 48
  title: "Where does context live?",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Five places context can come from.",
  type: "concept",
  cards: [
    { title: "Conversation", body: "Current request" },
    { title: "Project instructions", body: "CLAUDE.md" },
    { title: "Task documents", body: "intent.md, plan or ticket" },
    { title: "Repository", body: "Code, tests and documentation" },
    { title: "External system", body: "Retrieved through a tool or MCP" }
  ],
  notes: "The last row is the one to underline — it's the seed for Part 3's MCP content later today."
},

{ // Slide 49
  title: "What is CLAUDE.md?",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Persistent project instructions for Claude Code.",
  type: "concept",
  cards: [
    { title: "Good contents", body: "project purpose\narchitecture and conventions\napproved commands\nworking boundaries\nvalidation expectations" },
    { title: "Not", body: "every document in the project\ntemporary personal notes\na guarantee that rules are enforced\na new standalone agent" }
  ],
  notes: "The 'Not' column matters as much as the 'Good contents' column — CLAUDE.md is deliberately not a prompt landfill. This is the seed repo's own README pattern; point participants to their seed CLAUDE.md now."
},

{ // Slide 50
  title: "Instructions versus enforcement",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Four different jobs, four different mechanisms.",
  type: "concept",
  layout: "steps",
  items: [
    { label: "CLAUDE.md", caption: "Tells Claude what it should do." },
    { label: "Permissions", caption: "Control what it may do." },
    { label: "Hooks", caption: "Can enforce specific technical rules." },
    { label: "Human review", caption: "Determines whether work is accepted." }
  ],
  notes: "This prepares participants for hooks during Ryan's support days without making hooks a large build assignment now — one pass through the four items is enough, don't build a hook live."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 5                                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 51
  title: "Assignment 5: Teach Claude about this project",
  kicker: "DAY 2 · ASSIGNMENT 5",
  subtitle: "Review and improve CLAUDE.md.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Include", body: "purpose\nrelevant structure\nconventions\napproved commands\nprivacy boundaries\nvalidation\nhuman approval" }
  ],
  steps: [
    "Read the seed CLAUDE.md in your practice repo.",
    "Identify what's missing against the seven items on this slide.",
    "Add only instructions that should remain useful in future sessions.",
    "Save the file.",
    "Move on to the fresh-session test."
  ],
  expected: "A CLAUDE.md that a stranger's Claude Code session could rely on without you explaining anything out loud.",
  check: "Only add instructions that should remain useful in future sessions.",
  prompt: "Read my CLAUDE.md and this project. Suggest improvements covering purpose, relevant structure, conventions, approved commands, privacy boundaries, validation, and when you must stop for my approval. Only propose instructions that would still be useful in a future session — not one-off notes for today.",
  notes: "Watch for participants pasting today's entire to-do list into CLAUDE.md — redirect with the 'Not' list from slide 47: it isn't a prompt landfill or a temporary notes file."
},

{ // Slide 52
  title: "The fresh-session test",
  kicker: "DAY 2 · ASSIGNMENT 5 · REVIEW",
  subtitle: "A different participant starts a fresh session.",
  type: "review",
  cards: [
    { title: "Can Claude determine", body: "what the project does?\nwhere contributions belong?\nhow to validate them?\nwhat it must not change?\nwhen it must stop?" }
  ],
  check: "Goal: prove the context works without the original author explaining it.",
  notes: "If your timing allows, actually swap two participants' laptops/repos for this and run a fresh Claude Code session — it's the single most convincing proof of the whole day and worth the extra five minutes."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 2: From prompt to reusable skill                          */
/* ---------------------------------------------------------------------- */

{ // Slide 53
  title: "Start with a real repeated task",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "How do we make those notes useful to the whole squad?",
  type: "context",
  cards: [
    { title: "The pattern", body: "Every training day, we produce notes, evidence, lessons and next steps." }
  ],
  notes: "This bridges directly from yesterday's raw learning note (slide 38) into the skill-building work of this whole part — say that connection out loud."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 6                                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 54
  title: "Assignment 6: Check yesterday's note",
  kicker: "DAY 2 · ASSIGNMENT 6",
  subtitle: "Ask Claude to review your Day 1 learning note.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Ask Claude to", body: "preserve your meaning\nimprove spelling and clarity\ncheck completeness\nidentify missing evidence\nask instead of guessing\nreturn READY, REVIEW or OPEN" } // wording per curriculum: READY, REVISE or OPEN
  ],
  steps: [
    "Open notes/day1-learning-note.md from yesterday.",
    "Ask Claude to review it with a normal, plain prompt (not a skill — not yet).",
    "Check whether it preserved your meaning.",
    "Check whether it invented anything.",
    "Note which checks it actually performed.",
    "Have it return a status: READY, REVISE or OPEN."
  ],
  expected: "A reviewed note plus a clear sense of what a plain prompt did and did not check reliably.",
  check: "Do this with a normal prompt first — no skill yet.",
  prompt: "Review my Day 1 learning note. Preserve my meaning, improve spelling and clarity, check it's complete, and identify any missing evidence. Ask me instead of guessing if something is unclear. Return one status: READY, REVISE or OPEN.",
  notes: "Important: this must be a normal, ad-hoc prompt — not a skill. The gap this creates (inconsistency between people's results) is exactly what motivates building a skill next. Don't let anyone jump ahead to Assignment 8 yet."
},

{ // Slide 55
  title: "Compare the results",
  kicker: "DAY 2 · ASSIGNMENT 6 · REVIEW",
  subtitle: "Did Claude preserve the meaning?",
  type: "review",
  cards: [
    { title: "Compare", body: "Did Claude preserve the meaning?\nDid it invent information?\nWhich checks did it perform?\nWere the results consistent?\nWhat would we need to repeat next time?" }
  ],
  notes: "This discussion creates the need for a shared method — collect two or three genuinely different outcomes from the room out loud before moving to slide 54, the contrast is the point."
},

{ // Slide 56
  title: "From individual prompts to a team standard",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "A team standard describes what 'good' means before AI generates or reviews the work.",
  type: "context",
  cards: [
    { title: "The idea", body: "A team standard describes what 'good' means before AI generates or reviews the work." }
  ],
  tagline: "The class creates one Learning Note Checklist.",
  notes: "Frame Assignment 7 as a group activity right here — one shared checklist, built together, not nine different individual ones."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 7                                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 57
  title: "Assignment 7: Define a useful learning note",
  kicker: "DAY 2 · ASSIGNMENT 7",
  subtitle: "The checklist must cover:",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The checklist must cover", body: "intent\nwork completed\nvalidation\nevidence\nlearning\nopen questions\nnext step\nprivacy\nhuman ownership" }
  ],
  steps: [
    "As a group, go through each of the nine items on this slide.",
    "Agree what 'good' looks like for each one, in plain language.",
    "Write the agreed checklist down somewhere the whole class can see.",
    "Save it as the class's Learning Note Checklist."
  ],
  expected: "One shared Learning Note Checklist, written by the class, covering all nine items.",
  prompt: "As a class, let's define our Learning Note Checklist together. For each of these nine items — intent, work completed, validation, evidence, learning, open questions, next step, privacy, human ownership — agree in one sentence what 'good' looks like.",
  notes: "This is a facilitator-led group activity, not a solo exercise — run it as a discussion and write the agreed checklist somewhere visible (whiteboard, shared doc, or directly into a file in each participant's repo) before moving on."
},

{ // Slide 58
  title: "What is a skill?",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "A reusable method that teaches Claude how to perform a recurring task consistently.",
  type: "concept",
  cards: [
    { title: "Definition", body: "A reusable method that teaches Claude how to perform a recurring task consistently." },
    { title: "A skill defines", body: "when to use it\nrequired input\nsteps\noutput\nboundaries\nstop conditions" }
  ],
  notes: "The six items on the right map directly onto Assignment 8's own structure a few slides from now — say that out loud."
},

{ // Slide 59
  title: "When should we create a skill?",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Do not create one simply because Claude can.",
  type: "concept",
  cards: [
    { title: "Create one when", body: "the task happens repeatedly\nthe method can be described\nconsistency matters\nmore than one person benefits" }
  ],
  tagline: "Do not create one simply because Claude can.",
  notes: "This tagline is a genuine guardrail — some participants will want to skill-ify everything after this. Repeat it before Assignment 8 starts."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 8                                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 60
  title: "Assignment 8: Package the method",
  kicker: "DAY 2 · ASSIGNMENT 8",
  subtitle: "Create: academy-learning-publisher",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "It must", body: "check the note\nidentify missing facts\npreserve OPEN items\nimprove language\nprepare reusable outputs\nstop for human approval" }
  ],
  steps: [
    "Create a skill called academy-learning-publisher in .claude/skills/.",
    "Define when to use it, its required input, its steps and its output.",
    "Make sure it checks the note and identifies missing facts.",
    "Make sure it preserves OPEN items rather than resolving them itself.",
    "Make sure it stops for human approval before finishing.",
    "Test it once on your own Day 1 note."
  ],
  expected: "A working academy-learning-publisher skill that a fresh participant could run on someone else's note.",
  prompt: "Help me build a Claude Code skill called academy-learning-publisher. It should check a learning note, identify missing facts, preserve any OPEN items exactly as written, improve the language without changing meaning, prepare reusable outputs, and always stop for my approval before finishing. Use our class Learning Note Checklist as the standard.",
  notes: "This is the room's first time authoring their own skill — expect it to take longer than the slide's implied pace. It's explicitly listed as low infra-risk to prepare in advance since participants build it themselves; your job here is coaching, not demoing a pre-built answer."
},

{ // Slide 61
  title: "One input, several outputs",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Checking establishes reliability. Transforming adapts the information for an audience.",
  type: "concept",
  cards: [
    { title: "An approved note can become", body: "Academy article\ndaily recap\nemail draft\ntechnical handoff" }
  ],
  tagline: "Checking establishes reliability. Transforming adapts the information for an audience.",
  notes: "This distinction — checking versus transforming — is the exact one Assignment 10's workflow has to respect later today. Flag that connection now."
},

{ // Slide 62
  title: "Skill boundaries",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "The skill must not:",
  type: "concept",
  cards: [
    { title: "The skill must not", body: "invent evidence\nalter the author's meaning\nexpose confidential information\npublish automatically\nsend an email\napprove its own output" }
  ],
  notes: "Every item on this list is a real failure mode someone in the room will hit while building Assignment 8 — use it as a checklist while you circulate and coach."
},

{ // Slide 63
  title: "Test the skill",
  kicker: "DAY 2 · ASSIGNMENT 8 · REVIEW",
  subtitle: "A fresh participant uses the skill on another note.",
  type: "review",
  cards: [
    { title: "Check", body: "Was it understandable?\nDid it request missing information?\nWas the output consistent?\nDid it follow the boundaries?\nCould the result be reviewed?" }
  ],
  notes: "Same pattern as the fresh-session test on slide 50 — pair participants up and have them run each other's skill for real, not hypothetically."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 3: Tools and MCP                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 64
  title: "An agent needs more than a model",
  kicker: "DAY 2 · PART 3 · TOOLS & MCP",
  subtitle: "What an agent workflow may need.",
  type: "concept",
  cards: [
    { title: "Instructions", body: "What it should do." },
    { title: "Context", body: "What matters now." },
    { title: "Memory", body: "What it should remember." },
    { title: "Tools", body: "What it can operate." },
    { title: "External information", body: "What it can retrieve." },
    { title: "Validation", body: "How it checks itself." },
    { title: "Permission", body: "What it's allowed to do." },
    { title: "Human judgement", body: "What only a person decides." }
  ],
  notes: "Eight items, deliberately dense — don't linger on each one individually, this is a map of the rest of Part 3 and Part 4."
},

{ // Slide 65
  title: "What is a tool?",
  kicker: "DAY 2 · PART 3 · TOOLS & MCP",
  subtitle: "A tool allows an AI system to perform or request a specific operation.",
  type: "concept",
  cards: [
    { title: "Definition", body: "A tool allows an AI system to perform or request a specific operation." },
    { title: "Examples", body: "read a file\nrun a test\nsearch documentation\nretrieve a mission\nsubmit a proposal" }
  ],
  notes: "Point out that Claude Code has already been using tools all day (Explore step, running tests) — this isn't a brand-new concept, just a new name for something they've watched happen since slide 17."
},

{ // Slide 66
  title: "What is MCP?",
  kicker: "DAY 2 · PART 3 · TOOLS & MCP",
  subtitle: "Connection does not equal permission.",
  type: "concept",
  cards: [
    { title: "Definition", body: "MCP is a standard way to connect AI applications to approved tools and information sources." },
    { title: "Use it to", body: "retrieve context\naccess capabilities\nstandardise connections\ncontrol what is available" }
  ],
  tagline: "Connection does not equal permission.",
  notes: "Say the tagline explicitly and connect it back to slide 28's safe workshop boundaries — being connected to something is not the same as being allowed to change it."
},

{ // Slide 67
  title: "MCP in the Academy",
  kicker: "DAY 2 · PART 3 · TOOLS & MCP",
  subtitle: "Human-only actions remain human-only.",
  type: "concept",
  cards: [
    { title: "Claude Code can use approved Academy tools to", body: "retrieve the mission\nread the shared document\nsearch knowledge\nsubmit evidence\nsuggest a document change" }
  ],
  tagline: "Human-only actions remain human-only.",
  notes: "This is the direct setup for Assignment 9 — name the two read tools (get_mission, search_knowledge) participants are about to use, and be explicit that submit/suggest actions are out of scope today."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 9                                                    */
/* ---------------------------------------------------------------------- */

{ // Slide 68
  title: "Assignment 9: Retrieve the mission",
  kicker: "DAY 2 · ASSIGNMENT 9",
  subtitle: "Use the Academy connection to retrieve context. Do not submit or change anything.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Retrieve", body: "current mission\nshared intent\nrelevant knowledge\nconstraints\navailable evidence" }
  ],
  steps: [
    "Confirm the MCP connection is active (ask your facilitator if unsure).",
    "Retrieve the current mission.",
    "Retrieve the shared intent.",
    "Search relevant knowledge.",
    "Retrieve constraints and available evidence.",
    "Explain what you found. Do not submit or change anything."
  ],
  expected: "A plain-language explanation of the mission, intent, knowledge, constraints and evidence you retrieved.",
  check: "First action: explain what you found. Do not submit or change anything.",
  prompt: "Connect to the Academy and retrieve the current mission, the shared intent, relevant knowledge, any constraints, and available evidence. Explain what you found in plain language. Do not submit or change anything — this is explain-only.",
  notes: "HIGHEST INFRA RISK of the whole two days — no Jessy present to rescue a live break. Verify the MCP server end-to-end yourself before class. FALLBACK: if a participant's connection fails, have them read the fixture files (mission.md, the knowledge fixtures) directly from disk and explain those instead — the teaching point (retrieve, explain, do not submit) survives without a live MCP round-trip. Keep a captured example transcript ready to show the room if the whole class needs the fallback at once."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 4: Build a bounded agent workflow                         */
/* ---------------------------------------------------------------------- */

{ // Slide 69
  title: "Anatomy of an agent workflow",
  kicker: "DAY 2 · PART 4 · BOUNDED AGENT WORKFLOW",
  subtitle: "Ten parts of a designed workflow.",
  type: "concept",
  layout: "pillars",
  items: [
    { label: "Trigger" }, { label: "Goal" }, { label: "Input" }, { label: "Context" }, { label: "Decisions" },
    { label: "Tools" }, { label: "Actions" }, { label: "Checks" }, { label: "Output" }, { label: "Human gate" }
  ],
  notes: "This is the checklist Assignment 10 has to satisfy — you can literally hold the room to these ten words while reviewing their workflows later."
},

{ // Slide 70
  title: "The agent loop",
  kicker: "AGENT LOOP",
  subtitle: "Observe → Decide → Act → Check → Repeat or stop",
  type: "concept",
  layout: "steps",
  items: [
    { label: "Observe" },
    { label: "Decide" },
    { label: "Act" },
    { label: "Check" },
    { label: "Repeat or stop" }
  ],
  tagline: "The agent loop happens within a task. A task sits within the team's software lifecycle.",
  notes: "All five steps stay, including 'Decide' — this is the confirmed final wording of the reconciled terminology diagram, do not drop it. Nesting to say explicitly: the agent loop happens inside Change+Test of the human-in-the-loop method (slide 19), which itself sits inside Build+Test of the team's six-phase SDLC (Plan, Design, Build, Test, Deploy, Maintain). Close with the tagline exactly as written."
},

{ // Slide 71
  title: "Our agent's responsibility",
  kicker: "DAY 2 · PART 4 · BOUNDED AGENT WORKFLOW",
  subtitle: "Turn a raw learning note into reliable, reviewable communication.",
  type: "concept",
  layout: "compare",
  columns: [
    { title: "It may", items: [
      "retrieve",
      "check",
      "ask",
      "correct",
      "transform",
      "propose"
    ] },
    { title: "It may not", items: [
      "invent",
      "approve",
      "publish",
      "send",
      "deploy"
    ] }
  ],
  notes: "This is the exact scope the workflow in Assignment 10 must respect — the boundary column is the one to test against in Assignment 10's own test scenarios (slide 72)."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Assignment 10                                                   */
/* ---------------------------------------------------------------------- */

{ // Slide 72
  title: "Assignment 10: Connect the pieces",
  kicker: "DAY 2 · ASSIGNMENT 10",
  subtitle: "Build the Learning Publisher workflow.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The workflow must", body: "receive a learning note\nretrieve mission and intent\nuse the Learning Publisher skill\ncheck completeness and privacy\nprepare an article, recap and email\nshow evidence\nstop for human review" }
  ],
  steps: [
    "Wire the workflow to receive a learning note as input.",
    "Have it retrieve mission and intent via MCP.",
    "Have it call the academy-learning-publisher skill.",
    "Have it check completeness and privacy.",
    "Have it prepare an article, a daily recap, and an email draft.",
    "Have it show its evidence.",
    "Have it stop and wait for your review before finishing."
  ],
  expected: "A working bounded workflow that turns a learning note into three draft outputs and stops for a human decision.",
  prompt: "Build a workflow that takes a learning note, retrieves our mission and intent through MCP, runs the academy-learning-publisher skill on it, checks completeness and privacy, prepares an Academy article, a daily recap and an email draft, shows its evidence, and then stops — it must not publish, send or deploy anything without my review.",
  notes: "This is the capstone assignment of the two teaching days — give it the most time of any single assignment. It's explicitly listed as low infra-risk to prepare (participant-authored), so your job is circulating and checking each workflow actually stops for human review rather than running end to end unattended."
},

{ // Slide 73
  title: "Required output",
  kicker: "DAY 2 · ASSIGNMENT 10",
  subtitle: "What the workflow must produce.",
  type: "concept",
  cards: [
    { title: "Status", body: "READY, REVISE or OPEN" },
    { title: "Facts used", body: "What the workflow relied on." },
    { title: "Missing information", body: "What it could not confirm." },
    { title: "Validation performed", body: "What it actually checked." },
    { title: "Academy article", body: "One of three prepared outputs." },
    { title: "Daily recap", body: "One of three prepared outputs." },
    { title: "Email draft", body: "One of three prepared outputs." },
    { title: "Human decision required", body: "The workflow stops here." }
  ],
  notes: "Use this as a literal checklist while reviewing each participant's workflow output — eight items, all eight should be visible in what they show you."
},

{ // Slide 74
  title: "Agent test scenarios",
  kicker: "DAY 2 · ASSIGNMENT 10 · REVIEW",
  subtitle: "Verify behaviour, including when the agent should stop.",
  type: "review",
  cards: [
    { title: "Test with", body: "a complete note\na note missing evidence\na note containing sensitive information\na note with an unsupported claim" }
  ],
  check: "Goal: verify behaviour, including when the agent should stop.",
  notes: "The sensitive-information and unsupported-claim scenarios are the ones most likely to be skipped under time pressure — if time is short, protect these two over the 'complete note' happy path, which is the least informative test."
},

{ // Slide 75
  title: "Human review gate",
  kicker: "DAY 2 · ASSIGNMENT 10 · REVIEW",
  subtitle: "The reviewer decides.",
  type: "review",
  cards: [
    { title: "The reviewer decides", body: "Is the meaning preserved?\nAre claims supported?\nIs anything confidential?\nAre OPEN items visible?\nIs the output useful?\nCan it be accepted?" }
  ],
  check: "Decision: PASS / REVISE / OPEN",
  notes: "Same three-way decision as slides 37 and 50 — by now the room should produce it without prompting; if they don't, that's a sign to slow down before the closing slides."
},

{ // Slide 76
  title: "Handoff challenge",
  kicker: "DAY 2 · ASSIGNMENT 10 · REVIEW",
  subtitle: "Can a new participant reproduce the result without speaking to the creator?",
  type: "review",
  cards: [
    { title: "The handoff contains", body: "input\ninstructions\nsettings\ntools\nchecks\noutputs\nevidence\nopen questions" }
  ],
  notes: "If time allows, actually attempt one real handoff between two participants — it's the most convincing proof that Assignment 10 produced something reusable, not just something that worked once for its author."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Closing the two teaching days                                  */
/* ---------------------------------------------------------------------- */

{ // Slide 77
  title: "What you have built",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Together, we created:",
  type: "recap",
  layout: "recap",
  items: [
    { label: "Participant profiles" },
    { label: "An AI terminology library" },
    { label: "Academy improvements" },
    { label: "Project instructions" },
    { label: "A shared review standard" },
    { label: "A reusable skill" },
    { label: "An MCP connection" },
    { label: "A bounded agent workflow" }
  ],
  notes: "Use the reveal button live — click through each item slowly and let the room recognise their own two days of work in the list."
},

{ // Slide 78
  title: "What you now understand",
  kicker: "DAY 2 · CLOSING",
  subtitle: "How Claude Code works, and why the boundaries matter.",
  type: "recap",
  layout: "recap",
  items: [
    { label: "How Claude Code works" },
    { label: "Why context matters" },
    { label: "How to collaborate safely" },
    { label: "When to use a skill" },
    { label: "What MCP provides" },
    { label: "What makes a workflow agentic" },
    { label: "Why evidence and human review remain necessary" }
  ],
  notes: "This is the understanding checklist, not the artefact checklist (that was slide 75) — the distinction is worth naming out loud."
},

{ // Slide 79
  title: "What happens during the support days?",
  kicker: "PREVIEW · SUPPORT DAYS",
  subtitle: "Five days with Ryan, building on everything so far.",
  type: "context",
  cards: [
    { title: "Place the method inside the AI-native SDLC", body: "Preview only." },
    { title: "Strengthen the feedback and handoff loop", body: "Preview only." },
    { title: "Build an agent in n8n", body: "Preview only." },
    { title: "Rebuild and control it in Claude Code", body: "Preview only." },
    { title: "Apply everything to a team issue", body: "Preview only." }
  ],
  notes: "Preview only, matching slides 36 and 40's pattern — this is Ryan's territory starting tomorrow, don't get pulled into detail questions about n8n specifics here."
},

{ // Slide 80
  title: "The complete progression",
  kicker: "DAY 2 · CLOSING",
  subtitle: "From your first Claude Code conversation to improving a real team workflow.",
  type: "recap",
  layout: "steps",
  items: [
    { label: "Use Claude Code" },
    { label: "Make one good change" },
    { label: "Make the method reusable" },
    { label: "Build a bounded workflow" },
    { label: "Build and compare agents" },
    { label: "Improve a real team workflow" }
  ],
  notes: "The first four steps are exactly what the room just did across the two teaching days — say that explicitly before pointing at the last two, which belong to the support days."
},

{ // Slide 81
  title: "The responsibility remains human",
  kicker: "DAY 2 · CLOSING",
  subtitle: "AI can explore, propose, create, check and transform.",
  type: "context",
  layout: "compare",
  columns: [
    { title: "AI can", items: [
      "explore",
      "propose",
      "create",
      "check",
      "transform"
    ] },
    { title: "Humans remain responsible for", items: [
      "intent",
      "judgement",
      "approval",
      "impact"
    ] }
  ],
  notes: "This is the single sentence to leave the room with above all others — slow down here, don't rush it because it's near the end of a long two days."
},

{ // Slide 82
  title: "Final reflection",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  cards: [
    { title: "I can now…", body: "Complete this statement for yourself." },
    { title: "I still need help with…", body: "Complete this statement for yourself." },
    { title: "The first team workflow I want to improve is…", body: "Complete this statement for yourself." },
    { title: "The boundary we must preserve is…", body: "Complete this statement for yourself." }
  ],
  notes: "End here, in silence for a minute if the room will tolerate it, before any closing announcements — let people actually write their four sentences rather than rushing to logistics."
}

];
