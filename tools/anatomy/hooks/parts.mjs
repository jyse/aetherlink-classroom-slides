const fixed = ["cabinet-shell", "backplate", "top-rail", "bottom-rail", "input-chute", "input-token", "approval-key", "decision-lamp", "audit-recorder"];
const relays = ["parse", "shell", "network", "secret", "approval", "human", "gate", "read-filter", "write-filter", "path-router", "docs"].map((id) => `relay-${id}`);
const terminals = Array.from({ length: 12 }, (_, i) => `terminal-${String(i + 1).padStart(2, "0")}`);
const fasteners = Array.from({ length: 8 }, (_, i) => `fastener-${String(i + 1).padStart(2, "0")}`);
const exits = ["allow-gate", "ask-gate", "deny-gate", "allow-bin", "ask-bin", "deny-bin"];
export const HOOK_PARTS = [...fixed, ...relays, ...terminals, ...exits, ...fasteners].map((name, index) => ({ name, purpose: `Physical ${name.replaceAll("-", " ")} in the guard decision chain`, index }));
