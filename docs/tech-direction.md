# Look Over Here — Tech Direction

## Purpose

This document defines the technical direction for the first prototype of **Look Over Here**.

The goal is not to choose the final engine forever.

The goal is to choose the fastest safe path to test the core experience:

> Can a small N64-style procedural exploration prototype create a “look over here” moment?

## Recommended Prototype Stack

Start with a **browser-based Three.js prototype**.

Why:

- fast to build and iterate
- easy to share
- matches the existing HTML/JavaScript workflow
- low setup friction
- good fit for low-poly/N64-style visuals
- good enough for first-person movement, fog, landmarks, and simple interaction
- avoids committing to Unity, Godot, Unreal, or multiplayer architecture too early

This can change later if the prototype proves the game needs a different engine.

## Prototype Platform

Target:

- desktop browser first
- keyboard and mouse controls
- no mobile support required for Prototype 1
- no controller support required for Prototype 1

Later targets can be revisited after the core exploration loop works.

## Prototype Mode

Prototype 1 should be:

# Single-player first-person exploration

Co-op is part of the long-term fantasy, but should not be implemented yet.

Why:

- multiplayer would dominate the technical work
- networking decisions can create major future rework
- the first question is whether the world is interesting to explore
- co-op can be designed for through landmarks, callout moments, and readable spaces before it is technically implemented

The design should still support future co-op by making players want to say:

> “Look over here.”

## Engine Scope

Use Three.js or a similarly lightweight browser 3D stack.

Prototype should include:

- one HTML entry point
- one main JavaScript module
- simple scene setup
- first-person camera
- keyboard/mouse movement
- basic collision or simple ground movement
- low-poly terrain
- fog
- simple lighting
- placeholder landmarks
- interactable object
- basic scan/inspect text
- simple procedural scenario data

Avoid heavy framework complexity unless it clearly saves time.

## Visual Technical Direction

Use the direction from `n64-art-direction.md`.

Technical style goals:

- low-poly geometry
- chunky silhouettes
- atmospheric fog
- limited draw distance
- flat or simple vertex-colored materials
- simple lighting
- no realistic textures
- no high-poly assets
- no complex shaders required for Prototype 1

The prototype should look intentional and readable, not realistic.

## Procedural Technical Direction

Do not start with full procedural terrain.

Start with:

- one small authored test map
- randomized landmark selection
- randomized landmark placement from safe predefined slots
- one systemic rule
- one escalation event
- one final reveal

The generator should be simple and data-driven.

Example data structure:

```js
const scenario = {
  place: "Forbidden Moon",
  problem: "Weather Is Alive",
  goal: "Find the Lost Entrance",
  dominantLandmark: "giant fossil spine",
  secondaryCuriosities: ["smoking cave", "blue slime basin"],
  rule: "storm follows antenna",
  escalation: "lightning activates dead machine",
  finalReveal: "lost entrance opens under landmark"
};
```

This keeps procedural surprise focused without building an infinite world generator.

## First Prototype Features

Build only the minimum needed for the Campfire Prototype.

Required:

1. Basic first-person movement
2. Small Forbidden Moon test scene
3. N64-style fog and simple low-poly visuals
4. One dominant landmark visible from spawn
5. Two secondary curiosities
6. One carryable broken antenna
7. One storm cloud or storm marker that follows the antenna
8. One dead machine that reacts to the antenna/storm
9. One escalation event
10. One final reveal or exit
11. Simple on-screen text for scan/inspect feedback

Optional if cheap:

- simple ping marker
- simple sound placeholders
- simple completion screen
- seed display
- regenerate button

## Do Not Build Yet

Do not include:

- online multiplayer
- split-screen multiplayer
- procedural terrain generation
- save/load system
- inventory system
- crafting
- survival meters
- combat
- enemies
- shops
- quests
- character customization
- multiple biomes
- dialogue trees
- account systems
- server infrastructure
- complex physics puzzles
- asset pipelines
- high-fidelity art

These are future decisions, not Prototype 1 requirements.

## File Structure Recommendation

A simple browser prototype structure:

```text
/look-over-here
  index.html
  /src
    main.js
    world.js
    generator.js
    player.js
    interaction.js
    storm.js
    landmarks.js
  /docs
    north-star.md
    n64-art-direction.md
    prototype-plan.md
    tech-direction.md
```

If the prototype starts in one file, that is acceptable.

Split files only when it improves clarity.

## Data-Driven Design

Keep world ingredients in data when practical.

Useful categories:

- places
- problems
- goals
- landmarks
- curiosities
- interactables
- rules
- escalations
- final reveals

This allows rapid iteration without rewriting core logic.

Avoid over-engineering the data model before the first prototype is playable.

## Performance Target

Prototype should run smoothly in a modern desktop browser.

Simple goals:

- stable movement
- readable frame rate
- small scene size
- low object count
- simple materials
- no expensive post-processing
- fog hides distance and reduces detail burden

Performance should support exploration, not visual spectacle.

## Future Co-op Direction

Do not implement co-op yet, but preserve the design path.

Future co-op may need:

- networked player positions
- pings
- shared interactables
- object carrying rules
- synchronized procedural seed
- synchronized world events
- revive or regroup mechanics
- host/client or server decision

These should be considered later as a dedicated architecture step.

Do not casually add multiplayer to the first prototype.

## Documentation Rule

Docs are source of truth.

When the prototype changes the design, update the docs.

Important docs:

- `north-star.md`
- `n64-art-direction.md`
- `prototype-plan.md`
- `tech-direction.md`

If a coding task changes scope, controls, architecture, or prototype goals, update the relevant document.

## Codex Work Boundary

When creating Codex prompts for this project, include:

- inspect existing files first
- make the smallest possible change
- preserve existing functionality unless explicitly instructed otherwise
- follow the docs
- preserve the N64-inspired look and the “look over here” experiential goal
- avoid multiplayer, combat, crafting, survival, and procedural terrain unless explicitly requested
- keep the prototype simple and playable

Do not include model recommendations, reasoning guidance, or cost estimates inside Codex prompts.

## First Implementation Goal

The first implementation task should create a playable browser prototype scaffold.

Target result:

> The player can open the page, move around a foggy low-poly Forbidden Moon test scene, see a strange landmark, inspect objects, pick up the broken antenna, trigger a storm/machine reaction, and reveal a simple exit.

That is enough for Prototype 1.

## Guiding Question

For every technical choice, ask:

> “Does this help us test whether the game creates a ‘look over here’ moment?”

If yes, keep it.

If no, defer it.
