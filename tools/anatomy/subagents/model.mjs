export const PHASES = [
  { id: "author", label: "author working", x: -62, checked: false, accepted: false },
  { id: "handoff", label: "explicit handoff", x: -18, checked: false, accepted: false },
  { id: "review", label: "fresh-context review", x: 34, checked: true, accepted: false },
  { id: "accept", label: "human accepted", x: 80, checked: true, accepted: true },
];

export const PARTS = [
  "base plate", ...Array.from({ length: 4 }, (_, i) => `foot ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `base screw ${i + 1}`), "perimeter groove", "handoff ruler",
  "author bench", "author bench top", ...Array.from({ length: 4 }, (_, i) => `author leg ${i + 1}`),
  "author lamp", "author lamp stem", "author screen", "author keyboard",
  ...Array.from({ length: 6 }, (_, i) => `author key ${i + 1}`), "author notebook", "author pencil",
  "review bench", "review bench top", ...Array.from({ length: 4 }, (_, i) => `review leg ${i + 1}`),
  "review lamp", "review lamp stem", "review screen", "review keyboard",
  ...Array.from({ length: 6 }, (_, i) => `review key ${i + 1}`), "review checklist", "review stamp",
  "transfer rail left", "transfer rail right", "rail stop left", "rail stop right", "document carriage",
  ...Array.from({ length: 4 }, (_, i) => `carriage wheel ${i + 1}`),
  "document sheet", "document clip", "handoff tag", "acceptance pedestal", "acceptance gate",
  "gate hinge", "human lever", "lever grip", "acceptance lamp", "lamp bezel", "two gate posts",
  "two post caps", "three phase detents", "label plate", "two label screws",
];

export function stateAt(position) {
  const index = Math.max(0, Math.min(PHASES.length - 1, Math.round(position)));
  const phase = PHASES[index];
  return {
    index,
    phase,
    documentX: phase.x,
    gateOpen: phase.accepted,
    readout: `${index + 1}/4 · ${phase.label}`,
  };
}

export function assertModel() {
  if (PARTS.length < 40) throw new Error(`Subagents manifest too small: ${PARTS.length}`);
  if (stateAt(2).phase.accepted) throw new Error("Review must not imply human acceptance");
  if (!stateAt(3).gateOpen) throw new Error("Acceptance must open the gate");
  if (stateAt(-1).index !== 0 || stateAt(7).index !== 3) throw new Error("Phase clamp failed");
}
