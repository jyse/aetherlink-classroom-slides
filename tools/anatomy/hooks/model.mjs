export const HOOK_PRESETS = [
  { id: "parse-error", label: "Malformed hook input", input: { parseError: true }, expect: "deny" },
  { id: "network", label: "Bash · curl URL", input: { tool: "Bash", network: true }, expect: "deny" },
  { id: "secret-command", label: "Bash · read .env", input: { tool: "Bash", secret: true }, expect: "deny" },
  { id: "approval-change", label: "Bash · edit approvals", input: { tool: "Bash", approvalTouch: true }, expect: "deny" },
  { id: "merge", label: "Bash · gh pr merge", input: { tool: "Bash", humanOnly: true }, expect: "deny" },
  { id: "gated-unapproved", label: "Bash · git push", input: { tool: "Bash", gated: true }, expect: "deny" },
  { id: "gated-approved", label: "Bash · git push · named approval", input: { tool: "Bash", gated: true, namedApproval: true }, expect: "ask" },
  { id: "safe-command", label: "Bash · npm test", input: { tool: "Bash" }, expect: "implicit" },
  { id: "read-secret", label: "Read · credentials", input: { tool: "Read", secret: true }, expect: "deny" },
  { id: "read-safe", label: "Read · README.md", input: { tool: "Read" }, expect: "implicit" },
  { id: "write-doc", label: "Write · docs/verify/result.md", input: { tool: "Write", path: "docs/verify/result.md" }, expect: "allow" },
  { id: "write-app-fix", label: "Write · app/ on fix/*", input: { tool: "Write", path: "app/index.ts", branch: "fix/demo" }, expect: "ask" },
  { id: "write-app-main", label: "Write · app/ on main", input: { tool: "Write", path: "app/index.ts", branch: "main" }, expect: "deny" },
  { id: "write-sdlc", label: "Write · intent.md", input: { tool: "Write", path: "intent.md" }, expect: "ask" },
  { id: "write-other", label: "Write · arbitrary file", input: { tool: "Write", path: "notes.txt" }, expect: "deny" },
];

const shell = new Set(["Bash", "PowerShell"]);
const reads = new Set(["Read", "Grep", "Glob"]);
const writes = new Set(["Write", "Edit", "MultiEdit", "NotebookEdit"]);

export function evaluateHook(input = {}) {
  const visited = [];
  const stop = (decision, reason) => ({ decision, reason, visited });
  visited.push("parse");
  if (input.parseError) return stop("deny", "Input cannot be parsed; fail closed.");
  if (shell.has(input.tool)) {
    visited.push("shell");
    for (const [flag, station, reason] of [
      ["network", "network", "Network command or URL."],
      ["secret", "secret", "Secret or credential access."],
      ["approvalTouch", "approval", "Approval state is human-owned."],
      ["humanOnly", "human", "Merge or review approval is human-only."],
    ]) {
      visited.push(station);
      if (input[flag]) return stop("deny", reason);
    }
    visited.push("gate");
    if (input.gated) return stop(input.namedApproval ? "ask" : "deny", input.namedApproval ? "Named branch approval found." : "No named branch approval.");
    return stop("implicit", "No explicit hook decision; host policy continues.");
  }
  if (reads.has(input.tool)) {
    visited.push("read-filter");
    if (input.secret) return stop("deny", "Secret path or pattern.");
    return stop("implicit", "Read is not explicitly decided.");
  }
  if (writes.has(input.tool)) {
    visited.push("write-filter");
    if (input.secret || input.outside) return stop("deny", input.secret ? "Secret path." : "Outside repository.");
    const path = input.path || "";
    visited.push("path-router");
    if (/^docs\/(diagnoses|verify|show-me|pr|rpi)\//.test(path)) return stop("allow", "Agent-owned evidence path.");
    if (path.startsWith("app/")) return stop(input.branch?.startsWith("fix/") ? "ask" : "deny", input.branch?.startsWith("fix/") ? "Fix branch edit needs confirmation." : "App edits require a fix branch.");
    if (/^(intent\.md|HANDOFF\.md|CLAUDE\.md|docs\/(spec|design|plan|evidence|gate)\.md|docs\/decisions\/[^/]+\.md|evals\/(cases|fixtures)\/[^/]+\.json|evals\/schema\.ts|test\/[^/]+\.test\.ts)$/.test(path)) return stop("ask", "SDLC artefact needs confirmation.");
    return stop("deny", "Protected write path.");
  }
  return stop("implicit", "Tool is outside the guard switch.");
}

export function assertHookModel() {
  const literal = { "parse-error": "deny", network: "deny", "secret-command": "deny", "approval-change": "deny", merge: "deny", "gated-unapproved": "deny", "gated-approved": "ask", "safe-command": "implicit", "read-secret": "deny", "read-safe": "implicit", "write-doc": "allow", "write-app-fix": "ask", "write-app-main": "deny", "write-sdlc": "ask", "write-other": "deny" };
  for (const preset of HOOK_PRESETS) {
    const actual = evaluateHook(preset.input).decision;
    if (actual !== literal[preset.id]) throw new Error(`${preset.id}: expected ${literal[preset.id]}, got ${actual}`);
  }
  return HOOK_PRESETS.length;
}

if (process.argv[1]?.endsWith("model.mjs")) console.log(`hooks model: ${assertHookModel()} presets ok`);
