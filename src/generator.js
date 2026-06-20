export const SCENARIO = Object.freeze({
  place: "Rose Canyon Highlands",
  problem: "Weather Is Alive",
  goal: "Find the Signal",
  dominantLandmark: "distant mountain",
  secondaryCuriosities: ["blue slime basin", "ring of watching stones"],
  rule: "the storm follows whoever carries the antenna",
  escalation: "lightning wakes the dead machine",
  finalReveal: "lost entrance opens high behind a lavender ridge",
});

export function createScenario() {
  return { ...SCENARIO, secondaryCuriosities: [...SCENARIO.secondaryCuriosities] };
}
