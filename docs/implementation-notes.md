# Prototype Implementation Notes

## Scenic Prototype: Rose Canyon Highlands

Version: `v0.6.1`
Build: `ROSE VISTA`

The initial playable browser scaffold uses Vite and Three.js. It is an authored,
single-player first-person canyon route built to test one systemic story:

1. See the switchback trail, giant fossil spine, and moving signal from spawn.
2. Inspect the canyon's landmarks and curiosities.
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

- Chunky low-poly geometry, limited palette, atmospheric fog, and deliberately
  low renderer resolution.
- The circular crater shell is now an elongated rose canyon floor with open
  side walls, longer atmospheric sightlines, distant mesas, ridges, cliffs,
  arches, and mountains.
- Canyon sides use stacked tapered six-sided formations, offset caps, and thin
  strata ledges instead of large rectangular slabs. They remain outside the
  intended playable route and do not add new collision surfaces.
- Seven walkable tapered sandstone terraces form a readable switchback from the
  lower spawn valley to the existing fossil bone steps. Small authored tilts
  and irregular polygon edges reduce the flat-plank read while retaining broad
  safe landing areas.
- The fossil spine remains the major climb route. Its bone platforms, authored
  height-aware colliders, and radial stuck-prevention behavior are preserved.
- The high stone perch is a broad tapered rock shelf backed by a layered ridge,
  framing the canyon, distant forms, moving signal, machine shelf, and entrance
  route without changing the optional double-jump access.
- Spawn now faces up the switchback toward the spine and overlook. The drifting
  spore curiosity circles above that destination instead of hovering over the
  middle of the trail.
- The unfogged sky body is smaller and farther to the upper left so the canyon
  silhouette, trail, and fossil remain the primary start-view composition.
- Player height follows the authored canyon mesh instead of a flat movement
  plane, preventing raised terrain from clipping through the camera.
- Simple authored collision circles block the slime basin, weather machine,
  fossil segments, and individual watching stones without adding a physics
  engine.
- Falling below the world resets the player to the lower canyon landing point.
- The revealed lost entrance now uses an authored doorway-sized completion
  volume based on horizontal position, so terrain and camera height cannot
  shrink the trigger. Entering the opening or using its existing interaction
  completes the prototype and shows the completion overlay.
- Lost entrance side posts have lightweight collision blockers while the center
  remains open for the completion path.
- Cotton-candy pink fog and sky, plum ground, layered rose rock, warm peach
  light, and selective cyan/hot-pink accents give Rose Canyon a saturated
  identity while preserving readable silhouettes.
- Dominant fossil landmark visible from spawn.
- A readable run of chunky bone platforms climbs the fossil spine, with
  height-aware collision on the major vertebrae and walkable step surfaces.
- An orbiting remembering signal is visible above the spine and unlocks a
  boolean double jump with the message, "Your boots remember a second jump."
- The double jump can reach an optional high stone perch beside the top of the
  spine without changing or gating the lost entrance completion path.
- Mid- and far-distance mountain ridges, crowned mesas, side cliffs, and
  half-buried fossil arches give the canyon a scenic horizon beyond its
  interactive landmarks.
- A non-interactive cluster of cyan and pink spores drifts in a slow loop near
  the climbing route, creating an additional moving "look over here"
  curiosity without changing progression.
- Blue slime basin and ring of watching stones as secondary curiosities.
- Broken antenna inspection and one-object carrying.
- Storm cloud pursuit while carrying the antenna.
- Dead machine proximity escalation with a visible lightning strike.
- Revealed lost entrance and completion state.
- Three-rule scenario data for Rose Canyon Highlands, Weather Is Alive, and
  Find the Signal.
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
  for this single canyon route; they are not a general physics system.
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
- Trail terraces and the overlook use the prototype's existing raycast ground
  handling rather than exact side-wall collision, so their tapered edges remain
  intentionally simple.
- The Rose Canyon layout and vista composition received code inspection and
  build validation only; no browser, screenshot, or gameplay verification was
  performed.
- Audio is not included in this scaffold.

### Recommended Next Task

Run a focused manual playtest of the switchback-to-spine climb, high overlook,
and unchanged antenna-to-machine-to-entrance path, including attempts to wedge
the player between the fossil colliders and bone platforms.
