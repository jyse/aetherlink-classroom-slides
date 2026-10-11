const stage = document.querySelector(".loop-stage");
const groups = [...stage.querySelectorAll("[data-stage]")];
const buttons = [...document.querySelectorAll("[data-stage-button]")];
const approvalButton = document.querySelector("[data-approval-button]");
const approvalGroups = [...stage.querySelectorAll("[data-approval]")];
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const stages = __STAGES__;
let state = createLoopState();
let touring = !still.matches;
let visible = false;
let frame = 0;
let last = 0;
let elapsed = 0;
let idleTimer = 0;

function draw() {
  const index = STAGE_IDS.indexOf(state.stage);
  const active = stages[index];
  groups.forEach((group) => group.toggleAttribute("data-selected", group.dataset.stage === active.id));
  buttons.forEach((button, buttonIndex) => {
    button.setAttribute("aria-pressed", String(buttonIndex === index));
    button.tabIndex = buttonIndex === index ? 0 : -1;
  });
  approvalGroups.forEach((group) => group.toggleAttribute("data-approved", state.approved));
  approvalButton.setAttribute("aria-pressed", String(state.approved));
  approvalButton.textContent = state.approved ? "Human approval: granted" : "Human approval: pending";
  readout.textContent = `${active.label} · ${active.note} · approval ${state.approved ? "granted" : "pending"}`;
  stage.setAttribute("aria-label", `AI-native loop. ${active.label} selected. Human approval ${state.approved ? "granted" : "pending"}.`);
}

function run() {
  if (!frame && visible && touring && !still.matches) frame = requestAnimationFrame(tick);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 0;
  last = now;
  elapsed += dt;
  if (elapsed >= 2.2) {
    elapsed = 0;
    state = moveStage(state, 1);
    draw();
  }
  frame = visible && touring && !still.matches ? requestAnimationFrame(tick) : 0;
}

function hold() {
  touring = false;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    touring = !still.matches;
    elapsed = 0;
    run();
  }, 3600);
}

function select(next, focus = false) {
  const index = (next + stages.length) % stages.length;
  state = selectStage(state, stages[index].id);
  hold();
  draw();
  if (focus) buttons[index].focus();
}

buttons.forEach((button, buttonIndex) => button.addEventListener("click", () => select(buttonIndex)));
groups.forEach((group) => {
  group.style.cursor = "pointer";
  group.addEventListener("pointerdown", () => select(stages.findIndex((item) => item.id === group.dataset.stage)));
});
approvalButton.addEventListener("click", () => {
  state = setApproval(state, !state.approved);
  hold();
  draw();
});
stage.addEventListener("keydown", (event) => {
  const index = STAGE_IDS.indexOf(state.stage);
  let next = null;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
  if (/^[1-6]$/.test(event.key)) next = Number(event.key) - 1;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = stages.length - 1;
  if (event.key === "Enter" || event.key === " ") {
    state = setApproval(state, !state.approved);
    hold();
    draw();
    event.preventDefault();
    return;
  }
  if (next === null) return;
  event.preventDefault();
  select(next, true);
});
new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (!visible && frame) cancelAnimationFrame(frame);
  if (!visible) frame = 0;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);
still.addEventListener("change", () => {
  touring = !still.matches;
  if (touring) run();
  else if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
});
draw();
