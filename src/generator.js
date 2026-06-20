export const SCENARIO = Object.freeze({
  place: "Forbidden Moon",
  problem: "Weather Is Alive",
  goal: "Find the Lost Entrance",
  dominantLandmark: "giant fossil spine",
  secondaryCuriosities: ["blue slime basin", "ring of watching stones"],
  rule: "the storm follows whoever carries the antenna",
  escalation: "lightning wakes the dead machine",
  finalReveal: "lost entrance opens beneath the fossil spine",
});

export function createScenario() {
  return { ...SCENARIO, secondaryCuriosities: [...SCENARIO.secondaryCuriosities] };
}
