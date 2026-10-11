import assert from "node:assert/strict";
import { STAGE_IDS, createLoopState, selectStage, moveStage, setApproval } from "./state.mjs";

export { STAGE_IDS, createLoopState, selectStage, moveStage, setApproval } from "./state.mjs";

export function runModelAssertions() {
  const initial = createLoopState();
  assert.deepEqual(initial, { stage: "plan", approved: false });
  assert.equal(moveStage(createLoopState("maintain"), 1).stage, "plan");
  assert.equal(moveStage(createLoopState("plan"), -1).stage, "maintain");
  assert.equal(selectStage(initial, "test").stage, "test");
  assert.equal(selectStage(initial, "deploy").stage, "deploy", "Direct selection stays available without approval");
  assert.deepEqual(setApproval(createLoopState("build"), true), { stage: "build", approved: true });
  for (const stage of STAGE_IDS) assert.equal(selectStage(initial, stage).stage, stage);
  return true;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  runModelAssertions();
  console.log("loop model assertions passed");
}
