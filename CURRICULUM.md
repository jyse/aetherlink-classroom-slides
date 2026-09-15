# Aetherlink × Worldline Classroom

## Revised slide-by-slide content

This document replaces the current 82-slide curriculum content while retaining the existing HTML presentation engine, visual language, presenter view, prompt panel and assignment styling.

The practical project is the **AetherBot Library**. Participants use Claude Code to build and enrich an AI knowledge library, make a repeated content method reusable as a skill, process multiple terms through a bounded agentic run, create a learning game and connect approved workplace systems through MCP.

The shared working method throughout both days is:

**Explore → Plan → Create → Test → Human review → Handoff**

The agent loop is:

**Observe → Decide → Act → Check → Repeat or stop**

---

# Teaching Day 1

## AI foundations and working with Claude Code

### Slide 1 — Aetherlink × Worldline

**Kicker:** TEACHING DAY 1

**Title:** Working with AI and Claude Code

**Subtitle:** From AI foundations to your first tested change

---

### Slide 2 — The seven-day programme

**Title:** The seven-day programme

**On slide:**

- Two teaching days establish the foundation.
- Five support days apply the method to agent workflows and team work.

**Visual labels:**

- Teaching Days 1–2: understand and practise
- Support Days 1–5: deepen and apply

---

### Slide 3 — Programme outcome

**Title:** Programme outcome

**On slide:**

By the end of the programme, participants can help design, build and review an AI-supported workflow that other people can understand and reuse.

**Four words:**

- Useful
- Safe
- Verifiable
- Reusable

---

### Slide 4 — Starting question

**Title:** Work that could improve

**On slide:**

Which recurring task costs you time or creates unnecessary uncertainty?

Describe the current problem. Leave the solution open for now.

---

### Slide 5 — Day 1 outcome

**Title:** Day 1 outcome

**On slide:**

By 16:00, you can use Claude Code to:

- understand an existing project;
- plan a small change;
- create the change;
- test the result;
- review the evidence.

---

## Part 1 — AI foundations

### Slide 6 — Artificial intelligence

**Title:** Artificial intelligence

**On slide:**

Artificial intelligence is the broad field of building systems that perform tasks associated with human intelligence.

Examples include recognising patterns, making predictions, generating content and selecting actions.

---

### Slide 7 — The AI landscape

**Title:** The AI landscape

**On slide:**

- Artificial intelligence is the broad field.
- Machine learning finds patterns from data.
- Generative AI creates new content.
- Large language models generate and process language.

---

### Slide 8 — Large language models

**Title:** Large language models

**On slide:**

An LLM generates a response from patterns learned during training and the context available in the current interaction.

**Key line:**

A plausible response still requires verification.

---

### Slide 9 — Input, context and output

**Title:** Input, context and output

**On slide:**

**Input**
Your instruction, question or goal

**Context**
Relevant information available to the model

**Output**
The response or proposed action

**Bottom line:**

Useful context improves the response. Evidence determines whether you can trust it.

---

### Slide 10 — Tokens and context windows

**Title:** Tokens and context windows

**On slide:**

- Models process text as tokens.
- A context window limits how much information the model can consider at once.
- Irrelevant context can distract from the task.
- Relevant, current and permitted context works best.

---

### Slide 11 — Model choice

**Title:** Model choice

**On slide:**

Different models offer different balances of capability, speed and cost.

Temperature influences variation in generated responses. It does not make an answer more truthful.

**Facilitator note:** Keep this slide brief. Participants do not configure model APIs during Day 1.

---

### Slide 12 — AI failure modes

**Title:** AI failure modes

**On slide:**

- Missing context
- Ambiguous instructions
- Unsupported assumptions
- Outdated information
- Fabricated details

**Bottom line:**

Treat AI output as a proposal until you verify it.

---

### Slide 13 — A reliable request

**Title:** A reliable request

**On slide:**

A useful request gives Claude:

- the intended outcome;
- relevant context;
- constraints;
- success criteria;
- the required output;
- a validation method.

---

### Slide 14 — Knowledge check

**Title:** Knowledge check

**On slide:**

Which statement is most accurate?

A. An LLM retrieves a guaranteed correct answer.

B. An LLM generates a response that still needs verification.

C. More context always produces a better answer.

D. Temperature controls factual accuracy.

**Answer:** B

---

### Slide 15 — Break

**Title:** Short break

**On slide:**

Return in 15 minutes.

---

## Part 2 — Claude and Claude Code

### Slide 16 — Claude interfaces

**Title:** Claude interfaces

**On slide:**

**Claude chat**
Conversation, thinking and content

**Claude Code**
Agentic work inside technical projects

**Claude API**
Claude capabilities inside an application

**Connected tools**
Approved access to other information and systems

---

### Slide 17 — Claude chat and Claude Code

**Title:** Claude chat and Claude Code

**On slide:**

| Claude chat | Claude Code |
|---|---|
| Works mainly through conversation | Works inside a project |
| Uses the context you provide | Can inspect approved project files |
| Produces responses | Can use tools and run commands |
| Helps you think and write | Can plan, change and validate work |

---

### Slide 18 — AI agents

**Title:** AI agents

**On slide:**

An AI agent works toward a goal by gathering context, choosing actions, using tools and checking results.

It can continue, adjust, stop or ask for human input.

---

### Slide 19 — Claude Code as an agent

**Title:** Claude Code as an agentic tool

**On slide:**

Claude Code can:

- inspect a repository;
- form a plan;
- read and edit files;
- run commands and tests;
- inspect results;
- adjust its approach.

Using Claude Code means using an existing agentic tool.

---

### Slide 20 — The terminal

**Title:** The terminal

**On slide:**

The terminal lets you interact with your computer and project through commands.

Claude Code uses the same project tools developers already use for files, Git, applications and tests.

**Key line:**

You do not need to memorise every command. You must understand what you approve.

---

### Slide 21 — Permissions and Plan Mode

**Title:** Permissions and Plan Mode

**On slide:**

Permissions control which actions Claude Code may perform without further approval.

Plan Mode lets Claude investigate and prepare a plan before implementation.

**Working rule:**

Start with exploration. Review the plan before allowing changes.

---

### Slide 22 — First Claude Code demonstration

**Title:** Repository exploration

**On slide:**

Watch Claude Code inspect a small project without changing it.

**Prompt panel:**

```text
Explore this repository without changing anything.

Explain what the application does, how it is structured and how I can verify your explanation. Support your claims with evidence from the files. Mark anything you cannot confirm as OPEN.
```

---

### Slide 23 — Demonstration review

**Title:** What Claude Code did

**On slide:**

- Read project files
- Gathered context
- Used tools
- Connected claims to evidence
- Marked uncertainty
- Remained read-only

**Question:**

Which of these actions would a normal chat interface be unable to perform without access to the project?

---

### Slide 24 — Lunch

**Title:** Lunch

**On slide:**

We continue at 13:00 with the practice repository.

---

## Part 3 — Working method

### Slide 25 — Human and AI working method

**Title:** Human and AI working method

**On slide:**

1. Explore
2. Plan
3. Create
4. Test
5. Human review
6. Handoff

**Bottom line:**

The human owns the goal, boundaries and final decision.

---

### Slide 26 — Agent loop

**Title:** Agent loop

**On slide:**

1. Observe
2. Decide
3. Act
4. Check
5. Repeat or stop

**Bottom line:**

The agent loop happens within a bounded task.

---

### Slide 27 — Two related loops

**Title:** Two related loops

**On slide:**

**Human and AI working method**

Controls the complete assignment from intent to handoff.

**Agent loop**

Describes how the agent works through steps inside the assignment.

**Key distinction:**

The agent may iterate. The human still reviews the result.

---

### Slide 28 — Working agreement

**Title:** Working agreement

**On slide:**

During the exercises:

- investigate before changing;
- show the plan first;
- make small changes;
- run relevant checks;
- show evidence;
- mark uncertainty as `OPEN`;
- wait for human approval before committing.

---

## Part 4 — AetherBot Library

### Slide 29 — Practice project

**Title:** AetherBot Library

**On slide:**

A small AI knowledge library that grows throughout the two teaching days.

It will contain:

- participant profiles;
- an AI glossary;
- enriched concept cards;
- a learning game.

---

### Slide 30 — Repository setup

**Title:** Practice repository setup

**On slide:**

```bash
git clone https://github.com/jyse/aetherlink-classroom-practice.git
cd aetherlink-classroom-practice
npm install
npm start
```

Open `http://localhost:3000`.

In a second terminal:

```bash
claude
```

**Expected starting state:**

Profiles and Glossary pages containing sample data.

---

### Slide 31 — Assignment 1: Repository explorer

**Title:** Assignment 1: Repository explorer

**Time:** 25 minutes

**On slide:**

Use Claude Code to understand the project without changing it.

Deliver:

- application purpose;
- project structure;
- relevant files;
- start and validation commands;
- protected areas;
- `OPEN` questions.

**Prompt panel:**

```text
Explore this repository without changing anything.

Explain:
- what the application does;
- how it is structured;
- where profiles and glossary terms live;
- how to start it;
- how to validate a change;
- which files require extra care.

Support your explanation with evidence from the repository. Mark anything you cannot verify as OPEN.
```

**Repository before:** Working application with sample data.

**Repository after:** No code changes. The participant has an evidence-based repository map.

---

### Slide 32 — Assignment 1 review

**Title:** Repository exploration review

**On slide:**

- Which claims came from actual files?
- Which claims were assumptions?
- Did Claude change anything?
- Did it find the correct commands?
- What remains `OPEN`?

**Decision:** PASS, REVISE or OPEN

---

### Slide 33 — Assignment 2: Participant profile

**Title:** Assignment 2: Participant profile

**Time:** 30 minutes

**On slide:**

Add a profile containing:

- name;
- role;
- relevant experience;
- learning goal;
- one task you would like AI to improve.

**Prompt panel:**

```text
Inspect the existing profile structure and propose a participant profile for me.

First show:
- the proposed content;
- the files you would change;
- how you will validate the result.

Do not edit anything until I approve the plan. Do not include confidential or unnecessary personal information.
```

**Repository before:** Sample profiles and an existing profile schema.

**Repository after:** The participant's profile appears in the application and passes validation.

---

### Slide 34 — Profile review

**Title:** Profile review

**On slide:**

Check:

- The profile follows the existing structure.
- The content is appropriate to share.
- The profile appears correctly.
- No unrelated files changed.
- The participant reviewed the diff.

---

### Slide 35 — Short break

**Title:** Short break

**On slide:**

Return in 15 minutes.

---

### Slide 36 — Assignment 3: Glossary contribution

**Title:** Assignment 3: Glossary contribution

**Time:** 30 minutes

**On slide:**

Choose one AI term and add:

- a short definition;
- one practical example;
- one common misunderstanding;
- its relevance to this course.

**Prompt panel:**

```text
Help me add the term [TERM] to the glossary.

Write for product managers and developers who are new to agentic AI. Follow the existing glossary structure. Show the draft before editing the repository. Do not add claims that we cannot verify.
```

**Repository before:** A small glossary with sample entries.

**Repository after:** A new basic glossary entry appears in the application.

---

### Slide 37 — Assignment 4: Enriched concept card

**Title:** Assignment 4: Enriched concept card

**Time:** 45 minutes

**On slide:**

Turn one glossary term into a complete concept card containing:

- plain-language explanation;
- practical example;
- common misunderstanding;
- essential points;
- related concepts;
- reliable resources.

**Prompt panel:**

```text
Turn the glossary entry [TERM] into a complete concept card.

First inspect the existing data structure and application design. Propose the card content and the smallest implementation plan. Verify the factual explanation and include reliable resources. Wait for my approval before changing files. Run the relevant checks afterwards.
```

**Repository before:** A basic glossary term.

**Repository after:** One enriched concept card appears in the Library.

---

### Slide 38 — Concept card review

**Title:** Concept card review

**On slide:**

Review the card with another participant:

- Is the definition accurate?
- Does the example make the concept clearer?
- Are the sources appropriate?
- Did Claude invent anything?
- Does the card follow the required structure?

**Decision:** PASS, REVISE or OPEN

---

### Slide 39 — Day 1 learning note

**Title:** Day 1 learning note

**On slide:**

Record:

- what you created;
- how you used Claude Code;
- what you tested;
- what you learned;
- what remains unclear;
- what you want to try tomorrow.

Write the note yourself. Preserve uncertainty as `OPEN`.

---

### Slide 40 — Day 1 recap

**Title:** Day 1 recap

**On slide:**

Today you:

- learned the AI foundations;
- used Claude Code as an agentic tool;
- explored an unfamiliar repository;
- made and validated small changes;
- created the first concept card;
- applied human review.

**Tomorrow:** Turn the repeated method into a reusable skill and use it to build the rest of the Library.

---

# Teaching Day 2

## Reusable methods, agentic work and connected context

### Slide 41 — Day 2

**Kicker:** TEACHING DAY 2

**Title:** Reusable and connected AI workflows

**Subtitle:** From one concept card to a repeatable method

---

### Slide 42 — Retrieval check

**Title:** Retrieval check

**On slide:**

Explain in your own words:

- Why is Claude Code agentic?
- What is context?
- What happens during human review?
- What is the difference between a claim and evidence?
- What are the six steps in our working method?

---

### Slide 43 — Levels of AI use

**Title:** Levels of AI use

**On slide:**

1. Ask a model for a response.
2. Use Claude Code to work inside a project.
3. Customise Claude Code with project instructions and skills.
4. Design a bounded workflow with tools and checks.
5. Build a separately deployed agent application.

**Bottom line:**

Today focuses on levels 3 and 4.

---

### Slide 44 — Sources of context

**Title:** Sources of context

**On slide:**

| Source | Example |
|---|---|
| Current conversation | The task requested now |
| Project instructions | `CLAUDE.md` |
| Task files | Brief, ticket or plan |
| Repository | Code, tests and documentation |
| Connected system | Jira, GitLab or Confluence through approved tools |

---

### Slide 45 — CLAUDE.md

**Title:** CLAUDE.md

**On slide:**

`CLAUDE.md` provides persistent project instructions to Claude Code.

Useful contents:

- project purpose and structure;
- conventions;
- approved commands;
- privacy boundaries;
- validation requirements;
- human approval points.

It guides Claude. Permissions and technical controls enforce access.

---

### Slide 46 — Assignment 5: Project instructions

**Title:** Assignment 5: Project instructions

**Time:** 30 minutes

**On slide:**

Review and improve the repository's `CLAUDE.md`.

**Prompt panel:**

```text
Review this repository and its CLAUDE.md.

Propose the minimum persistent instructions Claude needs to work safely and consistently here. Cover project purpose, relevant structure, conventions, approved commands, privacy, validation and human approval. Do not add temporary assignment notes or personal preferences. Show the proposed changes before editing.
```

**Repository before:** A deliberately minimal `CLAUDE.md`.

**Repository after:** Clear project instructions that remain useful in future sessions.

---

### Slide 47 — Fresh-session test

**Title:** Fresh-session test

**On slide:**

Start a fresh Claude Code session.

Can Claude determine:

- what the project does;
- where content belongs;
- how to validate changes;
- which boundaries apply;
- when human approval is required?

**Decision:** PASS, REVISE or OPEN

---

### Slide 48 — Break

**Title:** Short break

**On slide:**

Return in 15 minutes.

---

## Part 2 — From repeated prompt to skill

### Slide 49 — A repeated method

**Title:** A repeated method

**On slide:**

Yesterday, one concept card required instructions for:

- structure;
- source checking;
- examples;
- missing information;
- validation;
- human approval.

The next card requires the same method.

---

### Slide 50 — Assignment 6: Create a second card

**Title:** Assignment 6: Create a second card

**Time:** 25 minutes

**On slide:**

Create a second concept card with an ordinary prompt.

Do not use a skill yet.

**Prompt panel:**

```text
Turn the glossary entry [TERM] into a complete concept card.

Use the same requirements and validation method as yesterday's approved card. Show the draft and implementation plan before changing anything.
```

**Repository before:** One approved concept card and several basic glossary entries.

**Repository after:** A second concept card created through another one-off prompt.

---

### Slide 51 — Compare the two runs

**Title:** Compare the two runs

**On slide:**

- Which instructions did you repeat?
- Did the cards follow the same structure?
- Did Claude perform the same checks?
- Which parts should become a shared method?
- What must still require human judgement?

---

### Slide 52 — Skills

**Title:** Claude Code skills

**On slide:**

A skill packages a reusable method for a recurring task.

A skill can define:

- when it applies;
- required input;
- procedure;
- output format;
- boundaries;
- stop conditions.

A skill does not start Claude Code or run continuously.

---

### Slide 53 — Prompt, CLAUDE.md and skill

**Title:** Prompt, CLAUDE.md and skill

**On slide:**

| Mechanism | Purpose |
|---|---|
| Prompt | The task Claude should perform now |
| `CLAUDE.md` | Project instructions that apply across sessions |
| Skill | A reusable method for one type of task |

---

### Slide 54 — The starter skill

**Title:** Create Concept Card skill

**On slide:**

The repository contains an intentionally incomplete skill:

```text
.claude/skills/create-concept-card/SKILL.md
```

Your task is to inspect, improve and test it.

**Facilitator note:** Preparing an incomplete skill is safer and clearer than asking every participant to invent the structure from nothing.

---

### Slide 55 — Assignment 7: Teach Claude the method

**Title:** Assignment 7: Teach Claude the method

**Time:** 45 minutes

**On slide:**

Improve the Create Concept Card skill so it covers:

- required source information;
- card structure;
- factual verification;
- missing information;
- validation;
- human approval.

**Prompt panel:**

```text
Inspect the existing create-concept-card skill and the two approved concept cards.

Propose improvements that make the method reliable and reusable. The skill must use sources, preserve uncertainty as OPEN, follow the existing card structure, validate its output and stop for human approval. Show the revised skill before editing it.
```

**Repository before:** An incomplete skill and two approved cards.

**Repository after:** A complete `create-concept-card` skill.

---

### Slide 56 — Lunch

**Title:** Lunch

**On slide:**

We continue at 13:00 by applying the skill across the Library.

---

## Part 3 — Bounded agentic work

### Slide 57 — Bounded autonomy

**Title:** Bounded autonomy

**On slide:**

Claude Code can perform several steps after receiving one goal.

Boundaries define:

- what it may read;
- what it may change;
- which checks it must run;
- when it must stop;
- which decisions remain human.

---

### Slide 58 — Assignment 8: Build the card library

**Title:** Assignment 8: Build the card library

**Time:** 45 minutes

**On slide:**

Use one instruction to process every approved glossary term.

**Prompt panel:**

```text
Use the Create Concept Card skill to process every approved glossary term.

For each term:
1. Read the glossary entry.
2. Check whether the available information and sources are sufficient.
3. Create the concept card.
4. Validate the required fields.
5. Record READY, REVISE or OPEN.
6. Continue with the next term.

Do not invent missing information. Do not commit anything. When all terms are processed, run the project checks and show me the complete report for human review.
```

**Repository before:** Several basic glossary terms, two cards and one reusable skill.

**Repository after:** Draft concept cards for all suitable terms plus a status report.

---

### Slide 59 — Agentic behaviour in the assignment

**Title:** Agentic behaviour in the assignment

**On slide:**

**Observe**
Read the next term and source.

**Decide**
Determine whether the information is sufficient.

**Act**
Create or revise the card.

**Check**
Validate the card.

**Repeat or stop**
Continue, mark `OPEN` or request human input.

---

### Slide 60 — Batch review

**Title:** Concept card review

**On slide:**

Review the batch before accepting it:

- Did the skill apply consistently?
- Which cards lack reliable sources?
- Which claims require correction?
- Did Claude report actual test results?
- Which items remain `OPEN`?

**Human decision:** Accept, revise or reject each card.

---

### Slide 61 — Break

**Title:** Short break

**On slide:**

Return in 15 minutes.

---

## Part 4 — Learning game

### Slide 62 — Explain It Back

**Title:** Explain It Back

**On slide:**

The Library now contains enough structured knowledge to support a learning game.

The game shows:

- one AI term;
- an answer field;
- the approved concept card;
- feedback or self-review;
- the next term.

---

### Slide 63 — Game starter state

**Title:** Game starter state

**On slide:**

Already available:

- game page and visual design;
- term card;
- answer field;
- Submit button;
- empty feedback area;
- approved concept-card data.

Participants complete the behaviour.

---

### Slide 64 — Assignment 9: Learning game

**Title:** Assignment 9: Learning game

**Time:** 60 minutes

**On slide:**

Complete the Explain It Back game.

Minimum behaviour:

- show one term;
- accept an explanation;
- reveal the approved concept card;
- support self-review;
- continue to the next term.

**Prompt panel:**

```text
Explore the existing game page and concept-card data.

Propose the smallest implementation that lets a participant read a term, enter an explanation, reveal the approved concept card, reflect on missing elements and continue to the next term. Reuse the existing visual design. Do not add authentication, a database or external AI calls. Show the plan and test cases before implementation.
```

**Repository before:** Static game design with incomplete behaviour.

**Repository after:** A working browser-based learning game with self-review.

---

### Slide 65 — Optional extension: AI feedback

**Title:** Optional extension: AI feedback

**On slide:**

With an approved model endpoint, the Submit button can request AI-generated feedback.

Application flow:

1. Participant submits an explanation.
2. Backend retrieves the approved concept card.
3. Backend sends the answer and reference to the model.
4. Model returns structured feedback.
5. Application displays the feedback.

**Boundary:** A Claude Code subscription does not automatically provide an application API credential.

---

### Slide 66 — Evaluation criteria

**Title:** Concept explanation criteria

**On slide:**

The evaluator checks:

- central meaning;
- important elements;
- practical example;
- incorrect claims;
- missing information;
- recommended resources.

Use descriptive feedback:

- Strong explanation
- Partially complete
- Review this concept
- Unable to evaluate

---

### Slide 67 — Optional extension assignment

**Title:** Optional assignment: AI Concept Coach

**Time:** 60–90 minutes, only with a prepared backend and approved model access

**On slide:**

Connect the existing Submit button to the prepared evaluation API route.

**Prompt panel:**

```text
Complete the prepared evaluation API route.

When the participant submits an explanation:
- retrieve the approved concept card;
- compare the answer with its essential points;
- return what the participant understood;
- identify missing or incorrect elements;
- recommend relevant resources;
- display structured feedback.

Keep credentials server-side. Handle unavailable model responses. Do not treat different wording as automatically incorrect. Propose the implementation and tests before changing files.
```

**Repository before:** Working self-review game, prepared backend route and approved model access.

**Repository after:** The game displays AI-generated feedback.

**Fallback:** Continue with the self-review version from Assignment 9.

---

### Slide 68 — Game review

**Title:** Game review

**On slide:**

Test with:

- a strong explanation;
- an incomplete explanation;
- an incorrect explanation;
- an empty answer;
- an unavailable evaluation service.

Check whether the game provides useful feedback without inventing facts.

---

## Part 5 — MCP and workplace systems

### Slide 69 — Model Context Protocol

**Title:** Model Context Protocol

**On slide:**

MCP standardises how AI applications connect to approved information and capabilities.

An MCP server may expose:

- resources;
- reusable prompts;
- tools.

Connecting a server does not remove permissions or human responsibility.

---

### Slide 70 — Repository access and MCP

**Title:** Repository access and MCP

**On slide:**

**Local repository**

Claude Code uses built-in tools to read files and run project commands.

**External system**

MCP can provide approved access to Jira, GitLab or Confluence.

The repository itself does not require MCP.

---

### Slide 71 — Connection setup

**Title:** Approved connections

**On slide:**

Connect the approved Worldline services:

- Jira
- GitLab
- Confluence

Inside Claude Code, use:

```text
/mcp
```

Confirm which connections and capabilities are available.

**Facilitator note:** Insert the exact Worldline-approved setup instructions after technical preflight. Do not place credentials on this slide.

---

### Slide 72 — Assignment 10: Connected context

**Title:** Assignment 10: Connected context

**Time:** 30 minutes

**On slide:**

Retrieve one authorised item in read-only mode.

Choose:

- one Jira ticket;
- one GitLab issue or merge request;
- one Confluence page.

**Prompt panel:**

```text
Use the approved connection to retrieve one authorised [Jira ticket / GitLab item / Confluence page].

Use read-only actions. Explain:
- what information was retrieved;
- which source fields support your explanation;
- what remains unclear;
- which actions the connection could perform but you did not approve.

Do not modify the external system.
```

**Repository before:** Local Library plus approved MCP configuration.

**Repository after:** No external changes. The participant has a sourced explanation of one connected item.

---

### Slide 73 — Transfer exercise

**Title:** Transfer to workplace information

**On slide:**

For the item you retrieved, decide:

1. What is the trusted source?
2. What output would help your work?
3. What reusable method could create it?
4. What should Claude verify?
5. Which action requires human approval?

**Possible outputs:**

- ticket brief;
- feature explanation;
- technical guide;
- merge-request summary;
- acceptance-criteria review;
- onboarding article.

---

### Slide 74 — The same pattern

**Title:** The same pattern across systems

**On slide:**

**AetherBot Library**

Glossary source → concept card → validation → human approval

**Workplace system**

Jira, GitLab or Confluence source → useful work output → validation → human approval

**Bottom line:**

The source and output change. The design questions remain the same.

---

## Closing

### Slide 75 — What you built

**Title:** What you built

**On slide:**

- Participant profile
- AI glossary contribution
- Enriched concept cards
- Improved `CLAUDE.md`
- Reusable Create Concept Card skill
- Bounded multi-card agentic run
- Explain It Back learning game
- Approved external connection

---

### Slide 76 — What you can now do

**Title:** What you can now do

**On slide:**

- Use Claude Code inside a repository.
- Provide context and boundaries.
- Review plans, changes and evidence.
- Distinguish prompts, project instructions and skills.
- Recognise bounded agentic behaviour.
- Explain what MCP provides.
- preserve human review and handoff.

---

### Slide 77 — The five support days

**Title:** The five support days

**On slide:**

The support programme builds on this foundation:

1. AI-native SDLC foundations
2. Planning, testing, review and handoff
3. Agent workflow in n8n
4. Agent workflow in Claude Code with deeper controls
5. Application to a small team issue

---

### Slide 78 — Complete progression

**Title:** Complete progression

**On slide:**

1. Understand AI and Claude Code.
2. Make one safe, tested change.
3. Turn a repeated method into a skill.
4. Let Claude perform a bounded sequence of work.
5. Build an interactive AI-supported feature.
6. Connect approved workplace information.
7. Apply the method during the support days.

---

### Slide 79 — Human responsibility

**Title:** Human responsibility

**On slide:**

AI can inspect, propose, create, transform and check.

People remain responsible for:

- the goal;
- permitted context;
- approval boundaries;
- factual and technical review;
- the impact of the final decision.

---

### Slide 80 — Final reflection

**Title:** Final reflection

**On slide:**

Complete these statements:

- I can now…
- I still need help with…
- One workflow I want to investigate is…
- The source of truth would be…
- The human decision must remain…

---

# Repository preparation checklist

The following items must exist before the revised assignments can run:

## Existing and reusable

- Working Node application
- Profiles page
- Glossary page
- `profiles.json`
- `glossary.json`
- Minimal `CLAUDE.md`
- Start command

## Add before teaching

- Concept-card schema and one example card
- Concept Cards navigation item and view
- Intentionally incomplete `.claude/skills/create-concept-card/SKILL.md`
- Game navigation item and styled starter screen
- Term card, answer input, Submit button and feedback area
- Self-review behaviour or clear TODO markers for Assignment 9
- Validation command and tests for profile, glossary and concept-card data
- Test fixtures for complete and incomplete glossary entries
- Local fallback files for the MCP exercise

## Optional AI feedback extension

- Prepared server-side API route
- Approved model endpoint and credentials
- Server-side environment-variable instructions
- Structured evaluation response schema
- Loading and error states
- Usage and privacy boundaries
- Deterministic fallback when model access fails

## Worldline technical preflight

- Confirm Jira MCP route
- Confirm GitLab MCP route
- Confirm Confluence MCP route
- Confirm personal authentication flow
- Confirm read-only exercise permissions
- Prepare exact setup instructions
- Prepare screenshots or local fixtures as fallback

---

# Resolved alignment decisions (2026-09-15)

This document was drafted separately and reviewed against the existing build.
Three points were explicitly discussed and resolved with Jessy before
building from it — apply these on top of everything above:

## 1. Assignment 9 ("Explain It Back" game): AI feedback is REQUIRED, not optional, and needs no API credentials

Do **not** build Slides 65–67 as written (self-review as the required
behaviour, real AI feedback gated behind "an approved model endpoint" and
server-side credentials). That framing solves a problem we don't have:
Claude Code, running in each participant's own terminal, is already
authenticated — there is no need for the web app to hold a separate model
API key at all.

**Build this instead, as the required Assignment 9 behaviour:**
1. Participant reads the shown term, types their explanation, clicks Submit.
2. The app POSTs the explanation to the local server, which writes it to
   `data/latest-submission.json` (single slot, resets each round — no
   history needed for now).
3. The participant explicitly tells their own Claude Code session to check
   it (exact phrase belongs in the assignment's prompt panel), e.g.
   "Check my latest submission using the term-checker skill."
4. Claude Code reads `data/latest-submission.json` directly (normal file
   read — no MCP needed, this is local-repo access) and `checklist.md`
   (see below), applies **Skill #2** (the checker skill, separate from
   Skill #1 the card-maker skill from Assignment 7), and writes structured
   feedback to `data/latest-feedback.json`.
5. The app has a **manual "Check feedback" button** (not auto-polling —
   keep every step visibly human-triggered) that GETs the feedback file
   and displays it.

Fold this into Slide 64 directly (extend its prompt panel and "minimum
behaviour" list to include steps 2–5 above). Delete the "optional
extension" framing from Slides 65–67 — repurpose Slide 66's evaluation
criteria list as the content of `checklist.md` (participants may
edit/extend it), and drop the API-credential/backend-route content
entirely; it no longer applies.

**`checklist.md`** lives at the repo root, separate from the skill file —
participant/class-authored, listing what a good explanation must contain.
Skill #2 (`.claude/skills/<name>/SKILL.md`, name TBD, e.g. `term-checker`)
should be written generically: "read `checklist.md`, read the latest
submission, compare, write feedback" — not with the criteria hardcoded
into the skill itself. This mirrors the doc's own good pattern of keeping
`create-concept-card` (Skill #1) separate from the concept-card schema.

## 2. Add the three-tier "SDLC → working method → agent loop" framing back in

This doc's Slide 27 ("Two related loops") only shows two tiers. Restore
the outer SDLC tier from the earlier-agreed red-line diagram, nested
around the two loops already here:

- **Outer — SDLC** (the team's whole journey): Plan → Design → Build →
  Test → Deploy → Maintain (six phases — matches
  `aetherlink-training-template`'s governance loop and the live Academy
  app's own facilitator "Fase" strip).
- **Middle — the working method** (this doc's own current label, "Human
  and AI working method," kept as-is — do not revert to "Human in the
  loop" unless Jessy asks): Explore → Plan → Create → Test → Human review
  → Handoff (six steps, per this doc).
- **Inner — Agent loop**: Observe → Decide → Act → Check → Repeat or stop
  (unchanged from this doc and from the existing build).

Expand Slide 27 into a "Three views of the same work" slide carrying all
three tiers nested (Build+Test of the SDLC contains the working method's
Create+Test, which contains the agent loop) — same nesting logic as the
original diagram, closing caption: "The agent loop happens within a task.
A task sits within the team's software lifecycle."

## 3. Part 5 (Jira/GitLab/Confluence via MCP): real connections are confirmed, not a stretch goal

Worldline's MCP access for Jira/GitLab/Confluence is already arranged —
build Slides 69–74 and Assignment 10 against the real connections as the
primary path. Still keep the local-fixtures fallback from the
"Repository preparation checklist" above (good practice regardless of
confirmed access), but it's a safety net, not the main plan.

## Everything else in this document is authoritative as written

Including: the six-step working method wording, the pre-seeded
intentionally-incomplete `create-concept-card` skill (Skill #1), the
break/lunch pacing, all exact prompt panels, and the "Repository
preparation checklist" section (treat "Add before teaching" as the
concrete build list, adjusted per point 1 above to include `checklist.md`
and the term-checker skill alongside the items already listed there).

