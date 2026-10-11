export const TOOLS = [
  { id: "list_alerts", label: "alerts", source: "incident index" },
  { id: "get_logs", label: "logs", source: "bounded JSONL" },
  { id: "get_metrics", label: "metrics", source: "bounded CSV" },
  { id: "get_deploys", label: "deploys", source: "incident JSON" },
  { id: "get_runbook", label: "runbook", source: "named Markdown" },
];

export const LAB_PROPERTIES = ["local", "read-only", "no network"];

export const PARTS = [
  "base plate", ...Array.from({ length: 4 }, (_, i) => `foot ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `base screw ${i + 1}`), "perimeter groove", "front ruler",
  "left archive case", "archive cap", ...Array.from({ length: 5 }, (_, i) => `archive drawer ${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `drawer front ${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `drawer pull ${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `pull mount ${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `drawer rivet ${i + 1}`), "console rail left",
  "console rail right", "rail stop left", "rail stop right", "selector carriage",
  "carriage bushing left", "carriage bushing right", "selector lamp",
  "console pedestal", "console housing", "console screen", "screen bezel", "screen grid",
  ...Array.from({ length: 5 }, (_, i) => `tool key ${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `key collar ${i + 1}`), "guard badge",
  ...Array.from({ length: 3 }, (_, i) => `property lamp ${i + 1}`),
  ...Array.from({ length: 3 }, (_, i) => `lamp bezel ${i + 1}`),
  "stdio socket", "stdio cable", "archive cable", "stdio terminal", "archive terminal",
  "control knob", "knob pointer", "label plate", "two label screws",
];

export function stateAt(position) {
  const index = Math.max(0, Math.min(TOOLS.length - 1, Math.round(position)));
  const tool = TOOLS[index];
  return {
    index,
    position: index,
    tool,
    readout: `${tool.id} · ${tool.source}`,
    labProperties: LAB_PROPERTIES,
  };
}

export function assertModel() {
  if (PARTS.length < 40) throw new Error(`MCP manifest too small: ${PARTS.length}`);
  if (TOOLS.length !== 5) throw new Error("MCP figure must mirror the lab's five tools");
  if (stateAt(-9).index !== 0 || stateAt(99).index !== 4) throw new Error("MCP selector clamp failed");
  if (!stateAt(2).readout.includes("get_metrics")) throw new Error("MCP readout diverged from selector");
}
