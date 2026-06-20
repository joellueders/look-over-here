# Prototype Implementation Notes

## Campfire Prototype: Forbidden Moon

Version: `v0.5.0`
Build: `CANDY HORIZON`

The initial playable browser scaffold uses Vite and Three.js. It is an authored,
single-player first-person crater built to test one systemic story:

1. See the giant fossil spine from spawn.
2. Inspect the moon's landmarks and curiosities.
3. Find and carry the broken antenna.
4. Notice the storm following the antenna.
5. Bring the antenna near the dead weather machine.
6. Trigger a lightning strike and reveal the lost entrance.
7. Enter beneath the fossil spine to complete the prototype.

### Run

```bash
npm install
npm run dev
```

Use WASD and the mouse to move and look, Space to jump, F to scan, and E to
interact. The second airborne jump becomes available after finding the spine
signal.

Standard browser gamepads are also supported: left stick moves, right stick
looks, A/Cross jumps, X/Square interacts, and Y/Triangle scans. B/Circle is
unassigned because the prototype does not currently have a drop or cancel
action.

### Implemented

- N64-inspired fog, limited palette, low-poly crater, and deliberately low
  renderer resolution.
- Player height follows the authored crater mesh instead of a flat movement
  plane, preventing raised terrain from clipping through the camera.
- Simple authored collision circles block the slime basin, weather machine,
  fossil segments, and individual watching stones without adding a physics
  engine.
- Falling below the world resets the player to the crater landing point.
- The revealed lost entrance now uses an authored doorway-sized completion
  volume based on horizontal position, so terrain and camera height cannot
  shrink the trigger. Entering the opening or using its existing interaction
  completes the prototype and shows the completion overlay.
- Lost entrance side posts have lightweight collision blockers while the center
  remains open for the completion path.
- Cotton-candy pink fog and sky, plum ground, layered violet rock, warm peach
  light, and selective cyan/hot-pink accents give the Forbidden Moon a more
  intentional saturated identity while preserving readable silhouettes.
- Dominant fossil landmark visible from spawn.
- A readable run of chunky bone platforms climbs the fossil spine, with
  height-aware collision on the major vertebrae and walkable step surfaces.
- An orbiting remembering signal is visible above the spine and unlocks a
  boolean double jump with the message, "Your boots remember a second jump."
- The double jump can reach an optional high stone perch beside the top of the
  spine without changing or gating the lost entrance completion path.
- Mid- and far-distance mountain ridges, crowned mesas, side cliffs, and
  half-buried fossil arches give the crater an Earth-like horizon beyond its
  interactive landmarks.
- A non-interactive cluster of cyan and pink spores drifts in a slow loop near
  the center of the crater, creating an additional moving "look over here"
  curiosity without changing progression.
- Blue slime basin and ring of watching stones as secondary curiosities.
- Broken antenna inspection and one-object carrying.
- Storm cloud pursuit while carrying the antenna.
- Dead machine proximity escalation with a visible lightning strike.
- Revealed lost entrance and completion state.
- Three-rule scenario data for Forbidden Moon, Weather Is Alive, and Find the
  Lost Entrance.
- First-connected standard Gamepad API support with deadzoned movement/look
  sticks, shared jump/double-jump behavior, and interaction/scan routed through
  the existing keyboard actions.
- A compact controller mapping reminder appears while a standard gamepad is
  detected.
- Horizontal movement now uses stronger deceleration when keyboard and
  controller movement input return to neutral, removing the long controller
  glide while retaining brief acceleration smoothing.
- Fossil and bone-step collision volumes now push the player to their nearest
  safe edge if the player drops into an existing overlap, preventing the
  height-gated spine collision from becoming a stuck state.

### Intentionally Not Implemented

Multiplayer, networking, combat, enemies, crafting, survival systems, procedural
terrain, multiple biomes, save/load, controller remapping, mobile controls, and
a general inventory.

### Known Limitations

- Ground and structure collision remain intentionally lightweight and authored
  for this single crater; they are not a general physics system.
- Structure collision proxies use horizontal circles with simple authored top
  heights; they do not model exact mesh contours.
- Fossil platforming uses authored box surfaces and height-aware circular
  blockers with a simple radial overlap failsafe; edge behavior remains
  intentionally prototype-simple.
- The double jump unlock is session-only and is not saved between reloads.
- Controller support uses the browser's standard mapping and fixed deadzone/look
  sensitivity constants. There is no remapping, sensitivity UI, vibration, or
  controller-only start-screen navigation.
- The authored scenario data is structured for later variation, but Prototype 1
  does not randomize the terrain or progression chain.
- The new horizon forms are simple non-interactive backdrop geometry and do not
  have collision or bespoke terrain blending.
- Palette and backdrop readability have only received code inspection and build
  validation in this pass; no screenshot or browser-based visual QA was
  performed.
- Audio is not included in this scaffold.

### Recommended Next Task

Run a focused visual playtest to confirm the layered horizon reads through the
fog, the drifting spores pull attention without competing with the antenna, and
the five-minute antenna-to-entrance path remains visually clear.
