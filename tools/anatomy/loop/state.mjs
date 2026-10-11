export const STAGE_IDS = Object.freeze(["plan", "design", "build", "test", "deploy", "maintain"]);

export function createLoopState(stage = "plan", approved = false) {
  if (!STAGE_IDS.includes(stage)) throw new Error(`Unknown loop stage: ${stage}`);
  return Object.freeze({ stage, approved: Boolean(approved) });
}

export function selectStage(state, stage) {
  return createLoopState(stage, state.approved);
}

export function moveStage(state, offset) {
  const index = STAGE_IDS.indexOf(state.stage);
  const next = (index + offset + STAGE_IDS.length) % STAGE_IDS.length;
  return createLoopState(STAGE_IDS[next], state.approved);
}

export function setApproval(state, approved) {
  return createLoopState(state.stage, approved);
}
