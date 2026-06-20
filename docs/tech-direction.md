# Look Over Here — Tech Direction

## Purpose

This document defines the technical direction for the early Look Over Here prototype.

The goal is not to choose the final engine forever.

The goal is to choose the fastest safe path to test the core experience:

> Can a small scenic low-poly exploration prototype create a “look over here” moment through vistas, trails, height, and strange world reactions?

## Recommended Prototype Stack

Continue with a **browser-based Three.js prototype** for now.

Why:

- fast to build and iterate
- easy to share with friends
- matches current project direction
- works well for low-poly geometry
- good for scenic prototypes, simple shaders, fog/atmosphere, and first-person controls
- avoids committing to Unity, Godot, Unreal, or multiplayer architecture too early

This can change later if the prototype proves the project needs a different engine.

## Prototype Platform

Target:

- desktop browser first
- keyboard/mouse
- basic game controller support if already implemented
- no mobile support required for early prototype

Controller support should prioritize responsive feel over physical realism.

## Prototype Mode

Prototype should remain:

# Single-player first-person exploration

Co-op is part of the long-term fantasy, but networking should not be implemented yet.

Why:

- multiplayer would dominate the technical work
- networking decisions can create major future rework
- the first question is whether the world is interesting to explore
- co-op can be designed for through landmarks, vistas, routes, and callout moments before it is technically implemented

The design should still support future co-op by making players want to say:

> “Look over here.”

## Visual/Rendering Direction

The tech target has changed.

The project is no longer aiming for strict N64 rendering.

The current target is:

- low-poly scenic landscapes
- modern draw distance
- atmospheric depth
- shader-enhanced skies/fog/water later
- readable silhouettes
- simple materials
- stylized color

Use N64-like simplicity where useful, but do not force short draw distance or heavy fog walls.

## Engine Scope

Use Three.js or a similarly lightweight browser 3D stack.

Prototype should include:

- Vite app structure
- Three.js scene setup
- first-person camera
- keyboard/mouse movement
- gamepad input if already added
- responsive movement tuning
- simple collision
- jump/double-jump if already added
- low-poly scenic terrain
- distant backdrop geometry
- atmospheric haze/fog
- simple lighting
- placeholder landmarks
- interactable objects
- scan/inspect text
- one carried object
- one world-rule actor
- one final reveal/completion path

## Scenic Rendering Priorities

To support the new visual target, prioritize:

### 1. Draw Distance

Players need to see far enough to be pulled by distant landmarks.

Use simple geometry and LOD-like thinking rather than hiding everything.

### 2. Atmospheric Depth

Use haze and color falloff to separate:

- foreground
- midground
- far background

Atmosphere should create scale, not erase the world.

### 3. Backdrop Geometry

Distant mountains, ridges, mesas, forest walls, or crystal ranges can be non-interactive.

They still matter because they create place identity.

### 4. Lightweight Shaders

Shaders are allowed if they serve the scenic target and remain maintainable.

Good future candidates:

- sky gradient
- atmospheric haze
- stylized water
- moving cloud layers
- simple vertex color terrain blending
- soft fog bands
- subtle foliage movement

Avoid heavy dependencies or complex rendering systems too early.

### 5. Readability

The player must still understand:

- where the trail goes
- what can be climbed
- what is interactive
- what is objective-related
- what is background

Do not let visual ambition destroy usability.

## Suggested File Structure

Keep project structure simple.

Possible structure:

```text
index.html
src/
  main.js
  world.js
  generator.js
  player.js
  input.js
  interaction.js
  storm.js
  landmarks.js
  biomes.js
  scenicBackdrop.js
  materials.js
docs/
  README.md
  north-star.md
  scenic-low-poly-art-direction.md
  world-biomes.md
  generator-design.md
  prototype-plan.md
  tech-direction.md
  n64-art-reference.md
```

Do not refactor into this structure unless it meaningfully helps a specific task.

## Data-Driven Direction

World generation should eventually be data-driven.

A scenario could look like:

```js
const scenario = {
  where: 'roseCanyonHighlands',
  problem: 'weatherIsAlive',
  goal: 'findTheSignal'
}
```

The composer can use this to select:

- palette
- sky/atmosphere
- terrain shell
- backdrop
- main landmark
- moving curiosity
- world rule actor
- objective
- final reveal

## Collision Direction

Avoid complex physics for now.

Use simple collision primitives and authored blockers:

- player capsule or approximate radius
- ground height checks
- platform/blocker volumes
- safe push-out for traps
- clear climbable vs non-climbable surfaces

The player should never fall into landmark geometry and get stuck.

## Input Direction

Support input through a shared action layer:

- move
- look
- jump
- interact
- scan
- carry/drop if needed

Keyboard/mouse and controller should call the same action functions.

Controller feel should be tuned for exploration/platforming:

- good deadzone
- no stick drift
- quick deceleration when stick returns to neutral
- responsive jump
- no icy movement unless a world rule explicitly creates it

## First Generator Implementation

Do not start with full procedural terrain.

Start with a slot-based composer:

- authored scene shell
- selectable palette
- selectable backdrop
- selectable landmarks
- selectable moving curiosity
- selectable rule actor
- selectable objective

This is safer, more readable, and more likely to produce a good first impression.

## Testing Expectations

Default:

```bash
npm run build
```

Use local dev server only when needed to verify behavior:

```bash
npm run dev
```

Browser automation and screenshots are not default testing tools.

## What Not To Build Yet

Do not build:

- multiplayer
- networking
- procedural terrain engine
- full biome system
- save system
- inventory system
- combat
- enemies
- crafting
- survival
- quest log
- large renderer rewrite
- heavy shader framework
- expensive asset pipeline
- online backend
- AI generation

## Future Engine Decision

Three.js is good for proving:

- look direction
- movement feel
- vistas
- simple interactions
- small procedural composition
- sharing the prototype

Consider another engine later only if the game clearly needs:

- complex terrain tools
- large world streaming
- serious controller/camera polish
- console target
- robust multiplayer
- advanced art pipeline
- physics-heavy traversal

Do not switch engines just because the art direction got more ambitious.
