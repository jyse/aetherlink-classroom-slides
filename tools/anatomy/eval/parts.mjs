import { EVAL_STATIONS } from "./model.mjs";
const fixed = ["bench-frame", "bed-plate", "feed-tray", "diagnosis-card", "drive-belt"];
const stations = EVAL_STATIONS.map((id) => `station-${id}`);
const rollers = Array.from({ length: 14 }, (_, i) => `roller-${String(i + 1).padStart(2, "0")}`);
const controls = ["pass-chute", "reject-chute", "pass-bin", "reject-bin", "status-lamp", "control-wheel", "emergency-stop", "power-switch"];
export const EVAL_PARTS = [...fixed, ...stations, ...rollers, ...controls].map((name, index) => ({ name, purpose: `Physical ${name.replaceAll("-", " ")} on the deterministic inspection line`, index }));
