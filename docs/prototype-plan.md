# Look Over Here — Procedural Scenic Exploration Prototype Plan

> Current prototype direction: generate a large-feeling continuous heightfield
> world and hide 10 collectible stars across high, low, side, landmark, and
> hidden exploration spaces. The antenna, storm, machine, and exit loop below
> is retained as historical design context, not the default objective.
>
> Each new seed should feel like changing channels to a different place. The
> current region set is Alpine Basin, Canyon Maze, Forest Canopy, Lake
> Highlands, and Cloud Ridge.
>
> Every generated world must begin with an awe-spawn moment: a safe overlook,
> rim, clearing, cliff, or ridge aimed toward a landmark and an explorable
> foreground-to-horizon composition. Biomes must change traversal grammar, not
> only palette and props. Wanderbox should feel like generated,
> national-park-inspired places rather than small playgrounds.

## Prototype Name

# Procedural Scenic Exploration Prototype 1

## Purpose

The current prototype should answer a sharper question:

> Can a generated scenic world create real exploration through vistas, trails,
> height, landmarks, and 10 hidden stars?

Success requires continuous explorable terrain rather than connected slabs or
tracks. Seeds should change world identity through distinct heightfield
topologies, terrain themes, landmark kits, height profiles, cloud composition,
detail kits, ambient motion, traversal grammar, and star hiding destinations.
The player should be free to wander across broad ground, descend into basins,
climb to ridges, or discover an authored upper canopy layer instead of
following a narrow sky road. The current objective remains finding 10 stars;
each world should open on a scenic reveal and remain mechanically different
through canyon corridors, basin climbs, shore routes, canopy layers, or broad
cloud ridges rather than a theme dressing pass over one route.

The old Forbidden Moon prototype proved that the basic browser/Three.js exploration loop can work.

The next prototype should prove the real visual/emotional target:

> “We climbed up high, saw something far away, went toward it, and the world did something surprising.”

## Target Experience

The player starts in a warm canyon valley.

Within the first few seconds, they should see:

- a high trail
- distant mesas or mountains
- a major landmark
- a moving curiosity
- a reason to climb

The experience should feel like visiting an impossible national park, not like walking around an empty alien moon crater.

## Current Best Wheel Combo

```text
WHERE?
Rose Canyon Highlands

WHAT’S WRONG?
Weather Is Alive

WHY ARE WE HERE?
Find the Signal
```

This can preserve the existing antenna/storm/machine/entrance loop while changing the setting and objective framing.

## Player Story Target

A successful 5–10 minute playthrough should produce a story like:

> “I saw a signal moving above the fossil spine, followed the canyon trail upward, found the antenna, and the storm started following me. When lightning hit the machine, the canyon revealed the signal entrance under the spine.”

## Mode

Start with:

# Single-player first-person exploration

Co-op is still the long-term fantasy, but Prototype 1 should remain single-player until the exploration loop is strong.

Design spaces for future co-op by emphasizing:

- visible landmarks
- high callout points
- readable routes
- moving curiosities
- shared-discovery style moments

## Controls

Support:

- keyboard/mouse
- basic controller if already implemented
- first-person movement
- jump
- double jump if already implemented
- interact
- scan/inspect
- carry one object

Controller support should feel responsive, not slippery.

## Visual Direction

Use:

- `scenic-low-poly-art-direction.md`
- `world-biomes.md`

The prototype target is no longer strict N64.

Visual target:

- scenic low-poly national park
- modern draw distance
- atmospheric depth
- saturated dreamlike color
- high trails
- distant vistas
- readable silhouettes

N64 lessons may still help with simplicity and readability, but should not force heavy fog walls or tiny spaces.

## World Scope

The first scenic world should remain small but feel larger through composition.

Recommended shape:

- one canyon valley
- one high trail or switchback route
- one major fossil spine / arch landmark
- two side curiosities
- one distant scenic backdrop
- one moving visual curiosity
- one carried object
- one world-rule actor
- one escalation event
- one final reveal or signal

Expected play length:

- 5–10 minutes

## Required Scenic Beats

### 1. Spawn View

The player should immediately see a beautiful outdoor composition:

- canyon walls
- distant mesas
- high trail
- major landmark
- moving curiosity

### 2. Trail Invitation

There should be a visible route that says:

> “Go up there.”

This can be a canyon trail, ridge path, fossil spine, or series of platforms.

### 3. High Vista

At least one high point should reveal more of the world.

From this vista, the player should see:

- the signal or goal
- the route they came from
- a distant landmark
- the scale of the canyon

### 4. World Rule Reaction

The world rule should become clear through play.

For the first version:

- the storm follows the carried antenna
- lightning activates a machine or canyon feature
- the machine reveals the signal/entrance/path

### 5. Final Reveal

The final reveal should connect to the landscape.

Examples:

- signal under the fossil spine
- hidden entrance across the canyon
- light waking on a far arch
- door opening beneath the ridge the player climbed

## Player Verbs

Required:

- walk
- look
- jump
- interact
- scan/inspect
- pick up/carry one object

Good if already implemented:

- double jump
- climbable spine/platform path
- controller play

Not required yet:

- glide
- rocket pack
- ping system
- multiplayer
- inventory
- combat

## Content Kit

### Main Landmark Options

For Rose Canyon Highlands:

- giant fossil spine across a canyon
- rose stone arch
- storm machine on a cliff shelf
- signal light above ridge
- lost entrance under canyon wall
- distant mesa tower

### Side Curiosity Options

- teal shadow pool
- small watching stones
- wind chimes made of bone
- sleeping rock creature
- glowing cactus cluster
- broken trail sign
- tiny machine worshipping a rock

### Moving Curiosity Options

- signal moth
- ribbon-light
- glowing wind fish
- crawling fossil light
- circling storm spark

## Procedural Scope

Do not build full procedural terrain yet.

Use authored layout with variable slots:

- palette slots
- backdrop slots
- landmark slots
- curiosity slots
- objective slot
- world-rule actor slot

This supports the generator direction without taking on unstable terrain generation too early.

## What Not To Build Yet

Do not build:

- multiplayer
- networking
- procedural terrain
- multiple full biomes
- survival systems
- crafting
- combat
- enemies
- inventory
- quests
- save system
- progression meta
- large content database
- AI generation
- full wheel UI before the scenic prototype feels good

## Success Criteria

The prototype succeeds if:

- the first view makes the player want to explore
- the player sees a far-away thing and wants to reach it
- climbing produces a meaningful vista
- the landscape feels like an impossible national park
- the moving curiosity creates attention
- the world rule creates a small story
- the player finishes with a memorable moment
- the level no longer reads as empty moon / No Man’s Sky drift

## Failure Criteria

The prototype fails if:

- the level feels flat
- the player cannot tell where to go
- there is no reason to climb
- distant views are hidden by fog
- the world feels like random low-poly props
- the moving curiosity is too subtle
- the storm/object interaction feels like a chore
- visuals are colorful but not scenic
- the place is weird but not beautiful
