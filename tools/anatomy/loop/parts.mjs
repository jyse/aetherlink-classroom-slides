export const STAGES = Object.freeze([
  { id: "plan", label: "Plan", position: [0, -72], tool: "scope drum", note: "Frame the outcome" },
  { id: "design", label: "Design", position: [72, -42], tool: "design jig", note: "Shape the approach" },
  { id: "build", label: "Build", position: [88, 28], tool: "assembly head", note: "Make the change" },
  { id: "test", label: "Test", position: [24, 72], tool: "test probe", note: "Check the result" },
  { id: "deploy", label: "Deploy", position: [-58, 58], tool: "release key", note: "Put it to work" },
  { id: "maintain", label: "Maintain", position: [-92, 4], tool: "service dial", note: "Learn and adjust" },
]);

const stationParts = STAGES.flatMap((stage) => [
  { id: `${stage.id}-deck`, stage: stage.id, kind: "deck", purpose: `${stage.label} station base` },
  { id: `${stage.id}-riser`, stage: stage.id, kind: "riser", purpose: `${stage.label} height block` },
  { id: `${stage.id}-tool`, stage: stage.id, kind: "tool", purpose: stage.tool },
  { id: `${stage.id}-dial`, stage: stage.id, kind: "dial", purpose: `${stage.label} status dial` },
  { id: `${stage.id}-lamp`, stage: stage.id, kind: "lamp", purpose: `${stage.label} active lamp` },
  { id: `${stage.id}-terminal`, stage: stage.id, kind: "terminal", purpose: `${stage.label} handoff terminal` },
]);

export const PARTS = Object.freeze([
  { id: "foot-nw", kind: "foot", purpose: "Machine support" },
  { id: "foot-ne", kind: "foot", purpose: "Machine support" },
  { id: "foot-sw", kind: "foot", purpose: "Machine support" },
  { id: "foot-se", kind: "foot", purpose: "Machine support" },
  { id: "base-plate", kind: "base", purpose: "Machine bed" },
  { id: "base-groove", kind: "groove", purpose: "Bed alignment groove" },
  { id: "turntable-lower", kind: "turntable", purpose: "Rotary workflow track" },
  { id: "turntable-upper", kind: "turntable", purpose: "Station carrier" },
  { id: "turntable-hub", kind: "hub", purpose: "Central bearing" },
  { id: "turntable-index", kind: "index", purpose: "Stage index marks" },
  ...stationParts,
  { id: "operator-pedestal", kind: "operator", purpose: "AetherLink operator stand" },
  { id: "operator-console", kind: "operator", purpose: "AetherLink control console" },
  { id: "operator-screen", kind: "operator", purpose: "Operator display" },
  { id: "aetherbot", kind: "operator", purpose: "AetherLink assistant" },
  { id: "return-rail-a", kind: "feedback", purpose: "Maintenance feedback rail" },
  { id: "return-rail-b", kind: "feedback", purpose: "Feedback return corner" },
  { id: "return-rail-c", kind: "feedback", purpose: "Planning feedback rail" },
  { id: "return-post-a", kind: "feedback", purpose: "Feedback rail support" },
  { id: "return-post-b", kind: "feedback", purpose: "Feedback rail support" },
  { id: "return-sensor", kind: "feedback", purpose: "Maintenance feedback pickup" },
  { id: "return-receiver", kind: "feedback", purpose: "Planning feedback receiver" },
  { id: "approval-post-left", kind: "approval", purpose: "Human control support" },
  { id: "approval-post-right", kind: "approval", purpose: "Human control support" },
  { id: "approval-beam", kind: "approval", purpose: "Human control gantry" },
  { id: "approval-housing", kind: "approval", purpose: "Approval control housing" },
  { id: "approval-lever", kind: "approval", purpose: "Human approval lever" },
  { id: "approval-grip", kind: "approval", purpose: "Approval lever grip" },
  { id: "approval-lamp", kind: "approval", purpose: "Approval state lamp" },
  { id: "approval-key", kind: "approval", purpose: "Human control key" },
]);

export const partCount = PARTS.length;

if (partCount < 40) throw new Error(`The loop figure needs at least 40 purposeful parts, found ${partCount}`);
