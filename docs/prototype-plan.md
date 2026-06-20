# Look Over Here — Prototype Plan

## Prototype Name

# Campfire Prototype: Forbidden Moon

## Purpose

The first prototype should answer one question:

> Can a tiny generated N64-style world create a “look over here” moment?

This prototype is not trying to prove the full game.

It is not trying to prove multiplayer, procedural planets, survival systems, or long-term progression.

It is trying to prove:

> “Did I see something weird, go toward it, interact, and get surprised?”

## Target Experience

The player starts in a small alien crater valley.

Within the first few seconds, they should see at least one strange landmark that makes them curious.

The experience should be short, readable, and surprising.

The player should finish with one small story worth retelling.

Example:

> “I picked up the broken antenna, then the storm started following me. When lightning hit the dead machine, a hidden path opened under the fossil spine.”

## Mode

Start with **single-player first-person exploration**.

Co-op is part of the long-term fantasy, but it should not be required for Prototype 1.

The design should still support future co-op by emphasizing:

- visible landmarks
- pings or callouts later
- shared discoveries
- simple interaction verbs
- moments one player would want to show another player

## Visual Direction

Use the direction from `n64-art-direction.md`.

Prototype target:

- chunky low-poly 3D
- N64-inspired fog
- strong silhouettes
- simple colors
- readable interactables
- small toy-scale world
- one Forbidden Moon biome

The prototype should look intentional, not realistic.

## World Scope

The first world should be tiny.

Recommended shape:

- one crater valley
- one main landmark
- two side curiosities
- one blocked path
- one tool/object
- one escalation event
- one final reveal or exit

Expected play length:

- 5–10 minutes

## Player Verbs

Prototype 1 should include only a few verbs.

Required:

- walk
- look
- jump
- interact
- scan or inspect
- pick up / carry one object

Optional later:

- ping
- crouch
- sprint
- climb
- simple boost pad
- simple tool use

Do not include combat in Prototype 1.

## Procedural Scope

Do not start with full procedural terrain.

Start with a small authored test map and proceduralize selected elements.

Procedural elements for Prototype 1:

- choose 1 dominant landmark from a small list
- choose 2 secondary curiosities from a small list
- choose or place 1 blocked path
- choose or place 1 useful object
- trigger 1 escalation event
- reveal 1 final discovery

The goal is procedural surprise, not infinite terrain.

## First Rule Set

Use this as the first generated scenario:

**Place:** Forbidden Moon  
**Problem:** Weather Is Alive  
**Goal:** Find the Lost Entrance

This gives the prototype a clear theme and a readable systemic rule.

## Content Kit

### Dominant Landmarks

Choose one per run:

- giant fossil spine
- dead robot hand
- floating rock arch
- glowing mushroom tower

### Secondary Curiosities

Choose two per run:

- smoking cave
- tiny scanner station
- strange egg cluster
- cracked moon elevator
- half-buried machine altar
- blue slime basin
- ring of watching stones

### Interactable Object

First object:

- broken antenna

Possible behavior:

- when carried, the storm follows the player
- when placed into a dead machine, it attracts lightning
- lightning activates a bridge, opens a door, or reveals a path

### System Rule

Core rule:

> The storm follows whoever carries the antenna.

This should be understandable through feedback:

- storm cloud moves toward player
- wind/audio increases near player
- antenna sparks
- nearby machines flicker
- lightning strikes after a short warning

### Escalation

When the antenna is brought near the dead machine:

- the storm intensifies
- lightning hits the machine
- the landscape changes

Possible results:

- floating stones form a bridge
- a sealed door opens
- a fossil spine shifts
- a hidden cave mouth lights up
- the lost entrance appears

### Final Discovery

The player finds the lost entrance.

The entrance should feel like it was hiding in plain sight.

Examples:

- under the giant fossil spine
- inside the dead robot hand
- behind the floating rock arch
- below the glowing mushroom tower

The ending can be simple:

- enter the lost entrance
- reach a vista
- activate a beacon
- fade out with a short completion message

## Success Criteria

The prototype succeeds if:

- the player sees something interesting within 10 seconds
- the player understands at least one place they want to go
- the player can navigate by landmarks
- the player notices that the world reacts to their actions
- the storm/antenna rule creates a memorable moment
- the final reveal feels intentional
- the experience takes less than 10 minutes
- the player wants to generate another version

## Failure Signs

The prototype is failing if:

- the world feels empty
- the player does not know where to go
- the procedural elements feel randomly scattered
- the storm feels like noise instead of a rule
- the player misses the escalation
- the final reveal feels arbitrary
- the map is too big
- the art style becomes generic low-poly instead of N64-inspired
- implementation starts drifting into survival, combat, crafting, or open-world systems

## Do Not Build Yet

Do not include:

- multiplayer
- online networking
- procedural terrain
- crafting
- survival meters
- enemies
- combat
- inventory systems
- shops
- quests
- dialogue trees
- character customization
- multiple biomes
- saving/loading
- base building
- complex physics puzzles

These may be considered later if the prototype proves the core experience.

## Implementation Notes for Later

When this becomes a coding task, the first implementation should be small.

Start with:

1. Basic first-person controller
2. One small hand-authored test map
3. N64-style fog and low-poly visual treatment
4. Randomized landmark selection
5. One carryable antenna
6. One storm-following behavior
7. One machine that reacts to the antenna/storm
8. One final reveal

The generator should be data-driven as early as practical, but not over-architected.

Prefer simple rules and visible outcomes.

## Guiding Question

For every prototype feature, ask:

> “Will this create a moment where someone would say, ‘look over here’?”

If yes, it belongs in the prototype.

If no, cut it or save it for later.
