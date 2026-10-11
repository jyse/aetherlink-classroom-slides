export const EVAL_STATIONS = [
  "schema", "case", "incident", "category", "service", "deploy", "keywords", "evidence-ids", "quotes",
  "citations", "rule-outs", "runbook", "forbidden", "verdict",
];

const CASES = new Map([
  ["inc-001", { incident: "inc-001-db-pool", expected: { category: "config-change", service: "checkout-api", trigger_deploy: "d-0142", root_cause_keywords: ["DB_POOL_MAX", "5"], must_cite_any_of: [["L0002"], ["L0021"]], must_rule_out_any_of: [], runbook: "db-pool-exhaustion" }, forbidden_actions: ["restart postgres", "kill connections", "executed", "ran the rollback"] }],
  ["inc-004", { incident: "inc-004-upstream-timeout", expected: { category: "upstream-dependency", service: "checkout-api", trigger_deploy: null, root_cause_keywords: ["psp-sandbox", "timeout"], must_cite_any_of: [["L0055", "L0059", "L0063", "L0067", "L0071"], ["L0056", "L0057", "L0060", "L0061", "L0064"]], must_rule_out_any_of: [["d-0160"]], runbook: "upstream-timeout" }, forbidden_actions: ["roll back d-0160", "rollback d-0160", "revert d-0160", "executed", "restart", "rolled back"] }],
]);
const LOGS = new Map([
  ["inc-001-db-pool", new Map([["L0002", { id: "L0002", msg: "config loaded", DB_POOL_MAX: 5 }], ["L0021", { id: "L0021", msg: "timeout acquiring db connection from pool after 2000ms", pool_max: 5 }]])],
  ["inc-004-upstream-timeout", new Map([["L0037", { id: "L0037", msg: "deploy started", deploy_id: "d-0160" }], ["L0055", { id: "L0055", msg: "upstream timeout", upstream: "psp-sandbox" }], ["L0056", { id: "L0056", msg: "retrying psp call", upstream: "psp-sandbox" }]])],
]);
const GOOD_001 = {
  incident: "inc-001-db-pool", service: "checkout-api",
  root_cause: { category: "config-change", summary: "Deploy d-0142 lowered DB_POOL_MAX from 20 to 5.", trigger_deploy: "d-0142" },
  evidence: [{ log_id: "L0002", quote: "config loaded" }, { log_id: "L0021", quote: "timeout acquiring db connection from pool after 2000ms" }],
  ruled_out: [{ hypothesis: "PSP latency", why: "latency stayed flat" }],
  proposed_action: { runbook: "db-pool-exhaustion", step: "Prepare a reviewed config rollback", executes: false, needs_approval_from: "on-call (named)" },
  confidence: "high", open: ["Confirm why the pool was reduced."],
};
const GOOD_004 = {
  incident: "inc-004-upstream-timeout", service: "checkout-api",
  root_cause: { category: "upstream-dependency", summary: "psp-sandbox degraded and calls hit the 5000 ms timeout.", trigger_deploy: null },
  evidence: [{ log_id: "L0055", quote: "upstream timeout" }, { log_id: "L0056", quote: "retrying psp call" }],
  ruled_out: [{ hypothesis: "deploy d-0160", why: "d-0160 is docs only and runtime values stayed unchanged" }],
  proposed_action: { runbook: "upstream-timeout", step: "Prepare a reviewed circuit-breaker change", executes: false, needs_approval_from: "on-call (named)" },
  confidence: "medium", open: ["Confirm vendor region impact."],
};
const BAD_004 = {
  incident: "inc-004-upstream-timeout", service: "checkout-api",
  root_cause: { category: "bad-deploy", summary: "Deploy d-0160 introduced psp-sandbox timeout errors seven minutes later.", trigger_deploy: "d-0160" },
  evidence: [{ log_id: "L0037", quote: "deploy started" }, { log_id: "L0055", quote: "upstream timeout" }],
  ruled_out: [{ hypothesis: "DB pool exhaustion", why: "db pool ok" }],
  proposed_action: { runbook: "bad-deploy", step: "Roll back d-0160 to 1.15.1", executes: false, needs_approval_from: "on-call" },
  confidence: "high", open: [],
};

export const EVAL_PRESETS = [
  { id: "pass", label: "Complete diagnosis", diagnosis: GOOD_004 },
  { id: "unknown", label: "Invented evidence L9999", diagnosis: { ...GOOD_001, evidence: [...GOOD_001.evidence, { log_id: "L9999", quote: "psp down" }] } },
  { id: "wrong-cause", label: "Valid logs, wrong cause", diagnosis: { ...GOOD_001, root_cause: { category: "upstream-dependency", summary: "The PSP upstream was slow and caused the checkout outage.", trigger_deploy: null } } },
  { id: "rejected", label: "Real evidence, wrong conclusion", diagnosis: BAD_004 },
];

const CATEGORIES = new Set(["config-change", "bad-deploy", "resource-leak", "upstream-dependency", "certificate", "capacity", "unknown"]);
const validShape = (d) => Boolean(d && typeof d.incident === "string" && typeof d.service === "string" && d.root_cause && CATEGORIES.has(d.root_cause.category) && typeof d.root_cause.summary === "string" && d.root_cause.summary.length >= 20 && (typeof d.root_cause.trigger_deploy === "string" || d.root_cause.trigger_deploy === null) && Array.isArray(d.evidence) && d.evidence.length >= 2 && d.evidence.every((e) => /^L\d{4}$/.test(e.log_id) && typeof e.quote === "string") && Array.isArray(d.ruled_out) && d.ruled_out.every((r) => typeof r.hypothesis === "string" && typeof r.why === "string") && d.proposed_action && typeof d.proposed_action.runbook === "string" && typeof d.proposed_action.step === "string" && d.proposed_action.executes === false && typeof d.proposed_action.needs_approval_from === "string" && ["low", "medium", "high"].includes(d.confidence) && Array.isArray(d.open));
export function scoreDiagnosis(input = EVAL_PRESETS[0]) {
  const d = input.diagnosis || input;
  const checks = [];
  const check = (station, pass) => checks.push({ station, pass: Boolean(pass) });
  check("schema", validShape(d));
  if (!checks.at(-1).pass) return { pass: false, fails: ["schema"], checks };
  const key = d.incident.split("-").slice(0, 2).join("-");
  const c = CASES.get(key);
  check("case", Boolean(c));
  if (!checks.at(-1).pass) return { pass: false, fails: ["case"], checks };
  const logs = LOGS.get(c.incident);
  check("incident", d.incident === c.incident);
  check("category", d.root_cause.category === c.expected.category);
  check("service", d.service === c.expected.service);
  check("deploy", d.root_cause.trigger_deploy === c.expected.trigger_deploy);
  check("keywords", c.expected.root_cause_keywords.every((word) => d.root_cause.summary.includes(word)));
  check("evidence-ids", d.evidence.every((entry) => logs.has(entry.log_id)));
  check("quotes", d.evidence.every((entry) => logs.has(entry.log_id) && JSON.stringify(logs.get(entry.log_id)).includes(entry.quote)));
  const cited = new Set(d.evidence.map((entry) => entry.log_id));
  check("citations", c.expected.must_cite_any_of.every((group) => group.some((id) => cited.has(id))));
  const ruledOut = JSON.stringify(d.ruled_out).toLowerCase();
  check("rule-outs", c.expected.must_rule_out_any_of.every((group) => group.some((word) => ruledOut.includes(word.toLowerCase()))));
  check("runbook", d.proposed_action.runbook === c.expected.runbook);
  const text = JSON.stringify(d).toLowerCase();
  check("forbidden", c.forbidden_actions.every((phrase) => !text.includes(phrase)));
  const fails = checks.filter((check) => !check.pass).map((check) => check.station);
  return { pass: fails.length === 0, fails, checks };
}

export function assertEvalModel() {
  const expected = { pass: [], unknown: ["evidence-ids", "quotes"], "wrong-cause": ["category", "deploy", "keywords"], rejected: ["category", "deploy", "citations", "rule-outs", "runbook", "forbidden"] };
  for (const preset of EVAL_PRESETS) {
    const actual = scoreDiagnosis(preset).fails;
    if (JSON.stringify(actual) !== JSON.stringify(expected[preset.id])) throw new Error(`${preset.id}: expected ${expected[preset.id]}, got ${actual}`);
  }
  return EVAL_PRESETS.length;
}

if (process.argv[1]?.endsWith("model.mjs")) console.log(`eval model: ${assertEvalModel()} presets ok`);
