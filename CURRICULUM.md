# Teaching Day 1 — From AI to your first tested change

**Day 1 outcome:** I understand what Claude Code is and can safely use it to explore, plan, make, test and review a small change.

## Opening: Why are we here?

**Slide 1 — Aetherlink × Worldline**
On slide:
- Building useful AI workflows together
- Teaching Day 1 — Working with Claude Code

**Slide 2 — The seven-day journey**
On slide:
- Learn the foundations
- Practise with Claude Code
- Build reliable workflows
- Apply them to team challenges

Visual distinction: Teaching Days 1–2 / Supporting Days 1–5. Do not explain all seven days in detail yet.

**Slide 3 — Our destination**
On slide: By the end of this programme, your squad can build or improve an AI-supported workflow that the team can understand, verify and reuse.
Supporting words: Useful / Safe / Shared / Reusable

**Slide 4 — Start with the problem**
On slide: What recurring task or frustration costs your team time?
Prompt underneath: Describe the problem, not the solution.
Very short opening discussion.

**Slide 5 — Today's destination**
On slide: By 16:00, you can use Claude Code to:
- explore a project
- make a plan
- create a small change
- test the result
- review the evidence

## Part 1: Understanding AI

**Slide 6 — What is AI?**
On slide: AI is the broader field of creating systems that perform tasks associated with human intelligence.
Small examples: recognise, predict, generate, decide, act.

**Slide 7 — From AI to generative AI**
On slide: Artificial intelligence → Machine learning → Generative AI → Large language models
One short definition beneath each term.

**Slide 8 — What is an LLM?**
On slide: A large language model generates a likely continuation based on patterns learned from data and the context it receives.
Key line: It generates an answer. It does not guarantee the truth.

**Slide 9 — Input, model and output**
On slide: Your input + available context → model → generated output
Underneath: Better context improves the likelihood of a useful result. Verification determines whether the result can be trusted.

**Slide 10 — Tokens and context**
On slide:
- Tokens are pieces of text processed by the model.
- The context window is the information available during the interaction.
- More context is not automatically better context.
Key phrase: Give Claude what is relevant, current and allowed.

**Slide 11 — Why AI can be wrong**
On slide: missing context; ambiguous instructions; outdated information; incorrect assumptions; plausible-looking fabrication.
Bottom: AI output is a proposal until it is verified.

**Slide 12 — Model behaviour**
On slide:
- Different models have different capabilities.
- Model choice affects speed, cost and depth.
- Temperature affects variation, not truthfulness.
This should remain brief. It is supporting knowledge, not the main lesson.

## Part 2: Meet Claude

**Slide 13 — Claude is more than one interface**
On slide (table):
| Product | Primary use |
|---|---|
| Claude Chat | Think and converse |
| Claude Desktop | Claude on your computer |
| Claude Code | Work inside technical projects |
| Claude API | Build Claude into software |

Cowork and other interfaces can be mentioned verbally without turning this into an extensive product catalogue.

**Slide 14 — Claude Chat versus Claude Code**
On slide (table):
| Claude Chat | Claude Code |
|---|---|
| Works mainly in a conversation | Works inside a project |
| Responds with content | Can inspect and act |
| Receives what you provide | Can read approved project files |
| Produces an answer | Can use tools and run checks |

Bottom: Claude Code is already agentic.

**Slide 15 — What makes Claude Code agentic?**
On slide: Claude Code can: observe; plan; use tools; make changes; check results; adjust or stop.
Important clarification: Using Claude Code means working with an existing agentic tool. It does not mean you have already built your own standalone agent.

**Slide 16 — Why the terminal?**
On slide: The terminal gives Claude Code access to the tools and commands used by the project.
Examples: navigate; inspect files; start applications; run tests; use Git; review changes.
Key line: You do not need to memorise every command, but you must understand what you approve.

**Slide 17 — Your first Claude Code conversation** (LIVE DEMO)
On slide:
- Explore this project.
- Explain what it does and how it is structured.
- Do not change anything.
- Show which evidence supports your explanation.
This is a simple trainer demonstration in a small neutral example, before introducing the Academy.

**Slide 18 — What just happened?**
On slide: Claude: inspected files; gathered context; formed an explanation; used evidence; remained read-only.
Question: What did Claude do that a normal chatbot could not do here?

## Part 3: The Human-AI working method

**Slide 19 — One method throughout the programme**
On slide: Explore → Plan → Change → Test → Human review
This becomes the visual red thread used repeatedly in both teaching days.
[TERMINOLOGY NOTE: label this diagram/recurring motif "Human in the loop" throughout the deck, per the confirmed red line — see below.]

**Slide 20 — Explore**
On slide: Understand before acting.
Check: What is the goal? What already exists? Which files are relevant? What remains unknown? What must not be changed?

**Slide 21 — Plan**
On slide: Agree on the intended change before implementation.
A useful plan includes: desired outcome; files affected; approach; risks; validation; stop conditions.

**Slide 22 — Change**
On slide: Make the smallest useful change.
Boundaries: stay within scope; avoid unrelated changes; pause when assumptions are required; preserve existing work.

**Slide 23 — Test**
On slide: Evidence, not confidence.
Possible evidence: automated tests; command output; manual check; screenshot; comparison with acceptance criteria.

**Slide 24 — Human review**
On slide: The human decides: Does the result match the intent? Is the evidence sufficient? Are the risks acceptable? Should we accept, revise or stop?
Bottom: Human review is part of the workflow, not an optional final step.

**Slide 25 — Working agreement**
On slide: During this workshop, Claude must: explore before changing; show a plan first; make small changes; run relevant checks; show evidence; mark uncertainty as OPEN; wait for human approval.

## Part 4: Meet the Aetherlink Academy

The Academy is only introduced now. Participants understand Claude Code and the working method first.

**Slide 26 — Your practice environment**
On slide: The Aetherlink Academy — A shared learning platform that we will improve while learning how to collaborate with Claude Code.

**Slide 27 — Why the Academy?**
On slide: We are not building disconnected exercises.
During the course, the Academy becomes: our participant directory; our terminology library; our learning journal; our shared knowledge base; our evidence and handoff environment.

**Slide 28 — Safe workshop boundaries**
On slide:
Participants may change: profiles; terminology; learning content; prepared interface features.
Participants may not independently change: authentication; secrets; production configuration; facilitator controls; deployment settings.

## Assignment block 1

**Slide 29 — Assignment 1: Explore the Academy**
On slide: Explore the repository without changing anything.
Deliver: what the Academy does; project structure; relevant files; available commands; sensitive areas; OPEN questions.
Time: 25 minutes
Goal: Gather reliable context before acting.

**Slide 30 — Assignment 1: Review**
On slide: Compare Claude's explanation with the repository: What was correct? What was an assumption? What evidence did Claude use? What remains OPEN?
Human decision: Is there enough understanding to begin changing the project?

## Assignment block 2

**Slide 31 — Assignment 2: Join the Academy**
On slide: Add your participant profile.
Include: name; role and team; experience; learning goal; one workflow you want to improve.
Required method: Explore → Plan → Human approval → Change → Test → Review

**Slide 32 — Definition of done**
On slide: Your profile: follows the existing structure; appears correctly in the Academy; contains no inappropriate personal information; passes the relevant validation; has been reviewed by another participant.

## Assignment block 3

**Slide 33 — Assignment 3: Teach the Academy one term**
On slide: Add one AI term containing: plain-language definition; example; common misconception; relevance to this programme.
Rule: Verify the explanation before adding it.

**Slide 34 — From individual knowledge to team knowledge**
On slide: A useful contribution can be understood and reused by someone who did not create it.
Short group review of selected glossary entries.

## Assignment block 4

**Slide 35 — Assignment 4: Improve the Academy**
On slide: Choose one: profile search; role or team filter; terminology search; category filter; learning-goal overview; empty state; contribution status.
Deliver: One small, tested, reviewable improvement.

**Slide 36 — Team roles** [CONTENT EDIT REQUIRED — see terminology notes below: reframe as a PREVIEW of roles used once mob programming starts in the support days, NOT something practiced live now. Every participant works solo in Days 1-2; no pairing/mob programming yet.]
On slide (as originally drafted, to be reframed as preview-only):
- Driver: operates Claude Code
- Navigator: guides the next action
- Reviewer: checks intent and evidence
- Observer/tester: records assumptions, tests and lessons
(Original text said "Roles rotate during the exercise" — remove/reframe this since Day 1-2 is solo only.)

**Slide 37 — Review gate**
On slide: Before accepting the work: Did we achieve the intended outcome? Did we remain within scope? What did we test? What evidence do we have? What remains OPEN?
Decision: PASS / REVISE / OPEN

## Day 1 closing

**Slide 38 — Your raw learning note**
On slide: Without asking Claude to rewrite it, record: what you worked on; what changed; what you tested; what worked; what remains open; what you learned; what should happen next.
This note becomes the Day 2 input.
[IMPLEMENTATION NOTE: this note is saved as notes/day1-learning-note.md in the participant's own practice repo.]

**Slide 39 — What changed today?**
On slide: This morning: Claude Code was an unfamiliar tool. This afternoon: You used it to understand, change, test and review a real project.

**Slide 40 — Tomorrow**
On slide: How do we turn one successful AI interaction into a reliable method the whole team can reuse?
Preview only: context; CLAUDE.md; skills; MCP; bounded agent workflows.

---

# Teaching Day 2 — From one-off prompt to reusable agent workflow

**Day 2 outcome:** I can make Claude Code's work more consistent, reusable, connected and controllable.

## Opening and recap

**Slide 41 — Day 2: Making AI work repeatable**
On slide: Prompt → Standard → Skill → Connected workflow → Human gate

**Slide 42 — Day 1 retrieval challenge**
On slide: Without looking at yesterday's slides, explain:
- Why is Claude Code agentic?
- What is context?
- What are the five steps in our working method?
- Why is human review necessary?

**Slide 43 — The four levels**
On slide: Ask Claude / Use Claude Code / Customise Claude Code / Design an agent workflow
Bottom: These levels can overlap, but they are not identical.

**Slide 44 — Using versus building**
On slide (table):
| Situation | What you are doing |
|---|---|
| Claude answers a question | Chatting |
| Claude Code changes a project | Using an agentic tool |
| CLAUDE.md and skills guide its work | Customising Claude Code |
| Trigger, tools and process are designed | Building an agent workflow |
| Workflow runs as its own system | Building a standalone agent |

## Part 1: Context and project memory

**Slide 45 — Claude needs context**
On slide: Useful context includes: objective; relevant files and information; constraints; examples; success criteria; validation method.
Bottom: Context tells Claude what matters now.

**Slide 46 — Where does context live?**
On slide (table):
| Context | Example |
|---|---|
| Conversation | Current request |
| Project instructions | CLAUDE.md |
| Task documents | intent.md, plan or ticket |
| Repository | Code, tests and documentation |
| External system | Retrieved through a tool or MCP |

**Slide 47 — What is CLAUDE.md?**
On slide: Persistent project instructions for Claude Code.
Good contents: project purpose; architecture and conventions; approved commands; working boundaries; validation expectations.
Not: every document in the project; temporary personal notes; a guarantee that rules are enforced; a new standalone agent.

**Slide 48 — Instructions versus enforcement**
On slide: CLAUDE.md tells Claude what it should do. Permissions control what it may do. Hooks can enforce specific technical rules. Human review determines whether work is accepted.
This prepares participants for hooks during Ryan's support days without making hooks a large build assignment now.

## Assignment 5: Improve project context

**Slide 49 — Assignment 5: Teach Claude about this project**
On slide: Review and improve CLAUDE.md.
Include: purpose; relevant structure; conventions; approved commands; privacy boundaries; validation; human approval.
Rule: Only add instructions that should remain useful in future sessions.

**Slide 50 — The fresh-session test**
On slide: A different participant starts a fresh session.
Can Claude determine: what the project does? where contributions belong? how to validate them? what it must not change? when it must stop?
Goal: Prove the context works without the original author explaining it.

## Part 2: From prompt to reusable skill

**Slide 51 — Start with a real repeated task**
On slide: Every training day, we produce notes, evidence, lessons and next steps.
Question: How do we make those notes useful to the whole squad?

## Assignment 6: Review the raw note

**Slide 52 — Assignment 6: Check yesterday's note**
On slide: Ask Claude to: preserve your meaning; improve spelling and clarity; check completeness; identify missing evidence; ask instead of guessing; return READY, REVISE or OPEN.
Important: Do this with a normal prompt first.

**Slide 53 — Compare the results**
On slide: Did Claude preserve the meaning? Did it invent information? Which checks did it perform? Were the results consistent? What would we need to repeat next time?
This discussion creates the need for a shared method.

**Slide 54 — From individual prompts to a team standard**
On slide: A team standard describes what "good" means before AI generates or reviews the work.
The class creates one Learning Note Checklist.

## Assignment 7: Create the checklist

**Slide 55 — Assignment 7: Define a useful learning note**
On slide: The checklist must cover: intent; work completed; validation; evidence; learning; open questions; next step; privacy; human ownership.

**Slide 56 — What is a skill?**
On slide: A skill is a reusable method that teaches Claude how to perform a recurring task consistently.
A skill defines: when to use it; required input; steps; output; boundaries; stop conditions.

**Slide 57 — When should we create a skill?**
On slide: Create one when: the task happens repeatedly; the method can be described; consistency matters; more than one person benefits.
Do not create one simply because Claude can.

## Assignment 8: Build the Learning Publisher skill

**Slide 58 — Assignment 8: Package the method**
On slide: Create: academy-learning-publisher
It must: check the note; identify missing facts; preserve OPEN items; improve language; prepare reusable outputs; stop for human approval.

**Slide 59 — One input, several outputs**
On slide: An approved note can become: Academy article; daily recap; email draft; technical handoff.
Important distinction: Checking establishes reliability. Transforming adapts the information for an audience.

**Slide 60 — Skill boundaries**
On slide: The skill must not: invent evidence; alter the author's meaning; expose confidential information; publish automatically; send an email; approve its own output.

**Slide 61 — Test the skill**
On slide: A fresh participant uses the skill on another note.
Check: Was it understandable? Did it request missing information? Was the output consistent? Did it follow the boundaries? Could the result be reviewed?

## Part 3: Tools and MCP

**Slide 62 — An agent needs more than a model**
On slide: An agent workflow may need: instructions; context; memory; tools; external information; validation; permission; human judgement.

**Slide 63 — What is a tool?**
On slide: A tool allows an AI system to perform or request a specific operation.
Examples: read a file; run a test; search documentation; retrieve a mission; submit a proposal.

**Slide 64 — What is MCP?**
On slide: MCP is a standard way to connect AI applications to approved tools and information sources.
Use it to: retrieve context; access capabilities; standardise connections; control what is available.
Bottom: Connection does not equal permission.

**Slide 65 — MCP in the Academy**
On slide: Claude Code can use approved Academy tools to: retrieve the mission; read the shared document; search knowledge; submit evidence; suggest a document change.
Human-only actions remain human-only.

## Assignment 9: Connect to the Academy

**Slide 66 — Assignment 9: Retrieve the mission**
On slide: Use the Academy connection to retrieve: current mission; shared intent; relevant knowledge; constraints; available evidence.
First action: Explain what you found. Do not submit or change anything.

## Part 4: Build a bounded agent workflow

**Slide 67 — Anatomy of an agent workflow**
On slide: Trigger, Goal, Input, Context, Decisions, Tools, Actions, Checks, Output, Human gate

**Slide 68 — The agent loop**
On slide: Observe → Decide → Act → Check → Repeat or stop
Clarification: The agent loop happens inside the task. The task follows the Human-AI working method. The task exists inside the larger SDLC.
[TERMINOLOGY NOTE: keep all 5 steps including "Decide" — this is the confirmed final wording, matches the reconciled red-line diagram.]

**Slide 69 — Our agent's responsibility**
On slide: Turn a raw learning note into reliable, reviewable communication.
It may: retrieve; check; ask; correct; transform; propose.
It may not: invent; approve; publish; send; deploy.

## Assignment 10: Build the Learning Publisher workflow

**Slide 70 — Assignment 10: Connect the pieces**
On slide: The workflow must: receive a learning note; retrieve mission and intent; use the Learning Publisher skill; check completeness and privacy; prepare an article, recap and email; show evidence; stop for human review.

**Slide 71 — Required output**
On slide: Status: READY, REVISE or OPEN / Facts used / Missing information / Validation performed / Academy article / Daily recap / Email draft / Human decision required

**Slide 72 — Agent test scenarios**
On slide: Test the workflow with: a complete note; a note missing evidence; a note containing sensitive information; a note with an unsupported claim.
Goal: Verify behaviour, including when the agent should stop.

**Slide 73 — Human review gate**
On slide: The reviewer decides: Is the meaning preserved? Are claims supported? Is anything confidential? Are OPEN items visible? Is the output useful? Can it be accepted?
Decision: PASS / REVISE / OPEN

**Slide 74 — Handoff challenge**
On slide: Can a new participant reproduce the result without speaking to the creator?
The handoff contains: input; instructions; settings; tools; checks; outputs; evidence; open questions.

## Closing the two teaching days

**Slide 75 — What you have built**
On slide: Together, we created: participant profiles; an AI terminology library; Academy improvements; project instructions; a shared review standard; a reusable skill; an MCP connection; a bounded agent workflow.

**Slide 76 — What you now understand**
On slide: how Claude Code works; why context matters; how to collaborate safely; when to use a skill; what MCP provides; what makes a workflow agentic; why evidence and human review remain necessary.

**Slide 77 — What happens during the support days?**
On slide:
- Place the method inside the AI-native SDLC
- Strengthen the feedback and handoff loop
- Build an agent in n8n
- Rebuild and control it in Claude Code
- Apply everything to a team issue

**Slide 78 — The complete progression**
On slide: Use Claude Code → Make one good change → Make the method reusable → Build a bounded workflow → Build and compare agents → Improve a real team workflow

**Slide 79 — The responsibility remains human**
On slide: AI can explore, propose, create, check and transform.
Humans remain responsible for intent, judgement, approval and impact.

**Slide 80 — Final reflection**
On slide: Complete these statements:
- I can now…
- I still need help with…
- The first team workflow I want to improve is…
- The boundary we must preserve is…

---

## Terminology red line (apply throughout — see plan file for full rationale)

1. **SDLC** (outermost): Plan → Design → Build → Test → Deploy → Maintain (6 phases — matches the live Academy app's own "Fase" control strip and `aetherlink-training-template`'s governance loop; do NOT use Need/Review/Release wording anywhere).
2. **Human in the loop** (middle): Explore → Plan → Change → Test → Human review. Rename any "Human-AI working method" diagram label to "Human in the loop"; fine to say "the human-in-the-loop working method" in prose on first mention.
3. **Agent loop** (innermost): Observe → Decide → Act → Check → Repeat or stop (5 steps, keep "Decide").

Nesting caption: "The agent loop happens within a task. A task sits within the team's software lifecycle."
