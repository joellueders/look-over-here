# Look Over Here — Generator Design

## Purpose

This document defines the first version of Look Over Here’s world-start input.

The generator should not begin as free-text AI generation or full procedural terrain.

It should begin as a **three-wheel world machine** that combines authored ingredients in surprising ways.

## Core Interaction

At the start of a run, players spin three wheels:

```text
WHERE?
WHAT’S WRONG?
WHY ARE WE HERE?
```

Then they choose:

```text
DROP US IN
```

The wheels should feel like a strange machine, not a settings menu.

## Player Fantasy

Players are not designing a level.

They are giving the world three bad ideas and seeing what happens.

Example:

```text
WHERE?
Rose Canyon Highlands

WHAT’S WRONG?
Weather Is Alive

WHY ARE WE HERE?
Find the Signal
```

The game then creates:

- warm canyon geography
- distant mesas and ridge trails
- a weather/storm actor
- a carried object that attracts the storm
- a signal visible from a high place
- a final reveal connected to the storm rule

The player should feel:

> “We chose the ingredients, but we did not author this exact place.”

## Why Wheels Instead of Dropdowns

Dropdowns feel like settings.

Wheels feel like ritual, luck, toys, and co-op debate.

Good table conversation:

> “Lock Rose Canyon. Spin the problem again.”

> “No, keep Bones Are Waking Up.”

> “Okay, drop us in.”

This creates a shared moment before the level starts.

## Wheel 1: WHERE?

This defines the scenic park identity.

It controls:

- biome
- terrain shapes
- color palette
- sky/fog/atmosphere
- distant silhouettes
- landmark kit
- trail style
- scenic vista type

Early options:

- Rose Canyon Highlands
- Cloudberry Peaks
- Giant’s Garden Preserve

Later options:

- Mint River Basin
- Glass Mountain Park
- Ribbon Canyon
- Skytrail Valley
- Dream Coast

## Wheel 2: WHAT’S WRONG?

This defines the systemic rule.

It controls:

- moving world behavior
- puzzle logic
- environmental reaction
- escalation event
- how the route changes

Early options:

- Weather Is Alive
- Gravity Is Forgetful
- Bones Are Waking Up

Future options:

- Shadows Open Doors
- The Wind Carries Objects
- Plants React When Watched
- Reflections Lie
- Water Remembers
- Machines Want Offerings
- Everything Follows Light
- Clouds Become Bridges

## Wheel 3: WHY ARE WE HERE?

This defines the objective and ending shape.

It controls:

- final destination
- main visible target
- completion trigger
- route purpose
- reward/vista

Early options:

- Find the Signal
- Find the Lost Entrance
- Climb the Giant Spine

Future options:

- Touch the Highest Light
- Wake the Signal
- Open the Singing Door
- Follow the Wandering Beacon
- Reach the Summit Shrine
- Find What Fell From the Sky
- Enter the Sleeping Mountain

## Interaction States

Each wheel should eventually support:

### Spin

Randomize the option with fun motion.

### Lock

Keep this wheel while spinning others.

### Nudge

Move one option left/right for mild authorship.

This gives surprise without making players helpless.

## First UI Version

Do not overbuild the first UI.

The first version can be a simple start screen with three chunky wheel panels:

```text
SPIN THE WORLD

WHERE?
[ Rose Canyon Highlands ]

WHAT’S WRONG?
[ Weather Is Alive ]

WHY ARE WE HERE?
[ Find the Signal ]

[SPIN ALL]   [DROP US IN]
```

Optional early buttons:

```text
[LOCK]
[SPIN THIS]
```

Avoid a complex animated casino wheel until the generator proves fun.

## Generator Method

The first generator should be a **slot-based composer**, not a full procedural terrain system.

It combines authored ingredients:

- palette
- sky/atmosphere
- terrain shell
- distant backdrop
- central landmark
- side landmarks
- moving curiosity
- interactable object
- world rule actor
- final target
- text prompts
- simple route gates

This is enough to create the feeling of generation without building unstable procedural terrain too early.

## Important Rule

Every wheel choice must affect at least three visible things.

### WHERE? must affect:

1. terrain shape
2. palette/atmosphere
3. landmark kit

### WHAT’S WRONG? must affect:

1. visible world behavior
2. interaction/puzzle logic
3. escalation or route change

### WHY ARE WE HERE? must affect:

1. visible objective target
2. route/reward structure
3. completion text or final reveal

If a choice does not visibly affect the world, it feels fake.

## Example: Rose Canyon + Weather Is Alive + Find the Signal

The generator picks:

### From Rose Canyon Highlands

- rose canyon walls
- distant mesas
- ridge trails
- natural arch
- fossil spine
- lavender shadows

### From Weather Is Alive

- storm cloud actor
- antenna attracts storm
- lightning activates machine
- wind effects near high trails

### From Find the Signal

- moving signal light above the ridge
- final signal source hidden under/behind fossil spine
- completion when player wakes or reaches the signal

### Resulting Story

> “We climbed through the rose canyon, carried the antenna, and the storm followed us. When lightning hit the cliff machine, the signal woke up under the fossil spine.”

## Example: Cloudberry Peaks + Gravity Is Forgetful + Touch the Highest Light

The generator picks:

### From Cloudberry Peaks

- alpine meadow spawn
- tall mountain ridge
- distant peaks
- turquoise lake far below
- cloud bridge pieces

### From Gravity Is Forgetful

- floating rocks
- drifting platforms
- low-gravity jump pockets
- objects that rise when touched

### From Touch the Highest Light

- summit light visible from spawn
- climb route toward peak
- final touch trigger at highest point

### Resulting Story

> “We followed the trail up the mountain, jumped across floating rocks, and reached the light above the clouds.”

## Example: Giant’s Garden + Plants React When Watched + Open the Singing Door

The generator picks:

### From Giant’s Garden Preserve

- giant roots
- huge flowers
- canopy trails
- mossy tunnels
- oversized leaves

### From Plants React When Watched

- flowers open while stared at
- vines move slowly when observed
- pollen lights guide attention

### From Open the Singing Door

- hollow tree door
- musical plant sequence
- final entrance in a trunk

### Resulting Story

> “The flowers opened when we looked at them, and the root path led to a tree that sang open.”

## Fallback Rules

Early on, not every combination will be fully unique.

Use safe fallbacks:

- if a Problem does not have a custom puzzle for a Place, use a generic visible actor
- if a Goal does not have a custom final reveal, place it at the main vista landmark
- if a combination is unsupported, still make all three choices visible through palette, landmark, actor, and text

Never silently ignore a wheel choice.

## Scope Boundaries

Do not build yet:

- free-text generation
- AI world generation
- full procedural terrain
- infinite worlds
- multiplayer generation sync
- full biome system
- save system
- content editor
- complex seed sharing
- hundreds of wheel options

Build first:

- three wheels
- a few curated options
- authored composition slots
- visible differences
- one strong route
- one strong scenic vista
- one memorable reaction

## Producer Recommendation

The first implemented generator should support a small matrix:

```text
WHERE?
Rose Canyon Highlands
Cloudberry Peaks
Giant’s Garden Preserve

WHAT’S WRONG?
Weather Is Alive
Gravity Is Forgetful
Bones Are Waking Up

WHY ARE WE HERE?
Find the Signal
Find the Lost Entrance
Climb the Giant Spine
```

But only one combination needs to be excellent at first.

The first excellent combination should be:

```text
Rose Canyon Highlands
+ Weather Is Alive
+ Find the Signal
```
