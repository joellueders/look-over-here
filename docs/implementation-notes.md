# Prototype Implementation Notes

## Active Baseline

Commit `c699bbd` is the restored good one-level baseline. The procedural
terrain/star-generator experiment is paused on
`archive/procedural-generator-experiment` for later reference because the
authored level created a stronger sense of place and exploration appeal.
Future procedural work should build from the authored level's successful
grammar rather than abstract terrain generation.

## Scenic Prototype: Rose Canyon Highlands

- Version: `v0.8.0`
- Build: `CLOUD VALLEY`

The playable browser scaffold uses Vite and Three.js. It remains an authored,
single-player first-person route built around one systemic story:

1. Begin on a high mountain shelf overlooking Rose Canyon.
2. See a mint valley, layered cloud banks, and a larger mountain beyond the
   playable route.
3. Descend the readable pastel trail and discover the side-overlook signal.
4. Touch the signal to unlock the second airborne jump.
5. Find and carry the broken antenna, then notice the storm following it.
6. Bring the antenna near the dead weather machine.
7. Trigger lightning, climb the final shelves, and enter the hidden mountain
   door.

### Run

```bash
npm install
npm run dev
```

Use WASD and the mouse to move and look, Space to jump, F to scan, and E to
interact. The second airborne jump becomes available after touching the high
trail signal.

Standard browser gamepads remain supported: left stick moves, right stick
looks, A/Cross jumps, X/Square interacts, and Y/Triangle scans.

### Mountain Start and Scenic Scale

- Spawn moved from the canyon floor to a broad elevated mountain shelf.
- The decorative mountain supporting the opening shelf is lowered beneath the
  walkable surface so the camera no longer begins inside its lavender and coral
  volumes. Spawn coordinates, elevation, opening direction, and the first
  walkable shelf remain unchanged.
- The opening camera faces across the route toward a much larger layered
  mountain outside the playable area.
- Seven broad walkable shelves descend from the mountain start toward the
  antenna and canyon floor.
- A non-interactive mint valley floor and powder-blue river ribbon continue
  beyond the compact playable route, making the opening read downward and
  outward rather than as a closed arena.
- Three broad secondary ridge layers use lavender, powder-blue, and blush
  separation around the single larger hero mountain. Nearby duplicate
  silhouettes were reduced so the far mountain retains hierarchy.
- Six enlarged, layered cloud banks frame the great mountain at multiple
  depths. Two sit lower in the valley while four remain higher in the sky,
  creating foreground, midground, and far-background separation without
  crossing the playable trail.
- A larger sun, longer fog range, and an extended camera far plane support the
  broader sky composition.
- The valley, river, distant mountains, and cloud banks are non-interactive
  backdrop geometry.

### Fossil and Route Changes

- The spinal column, ribs, bone stairs, and their collision proxies were
  removed because they crossed the previous trail composition and confused the
  route.
- The existing double-jump reward now circles a small beige-and-yellow side
  overlook beside the middle trail shelves, more than eleven world units from
  spawn. The connected shelf remains reachable with the normal jump and frames
  the signal as a visible optional discovery instead of a spawn pickup.
- Double-jump unlock state, interaction range, messaging, and jump behavior are
  unchanged.
- The route is now communicated through yellow, beige, and blush stone shelves.

### Hidden Exit

- The lost entrance moved from the nearby canyon floor to an elevated shelf at
  the far-right end of the route.
- A lavender ridge and coral shoulder frame and partially tuck away the
  destination.
- Five rising shelves beyond the weather machine provide the discovery route.
- The entrance remains invisible until the machine wakes.
- The completion volume now checks camera height as well as horizontal
  position, preventing completion from underneath the elevated entrance.
- Entrance side-post and nearby ridge collision proxies preserve an open center
  path while reducing clipping and stuck risks.
- The exit position, reveal state, completion trigger, and approach collision
  were not changed in this pass.

### Antenna Readability

- The antenna remains the same interactable and carryable progression object.
- Its silhouette now uses a black mast and crossbar with three front-facing
  circular receiver fins outlined in black.
- Red and blush receiver faces contrast against the mint, beige, and yellow
  trail surfaces from the expected first approach angle.
- While carried, the antenna is scaled from `0.55` to `0.32` and positioned
  farther forward and slightly lower-right, preserving its physical silhouette
  without covering a large portion of the view.
- Pickup, carried-object attachment, storm pursuit, and machine proximity
  behavior are unchanged.

### Pastel Gouache Palette

The world now uses the requested palette with role-based separation:

- Sky and atmosphere: sky blue `#69B9E8`, powder blue `#A9CDEA`
- Ground and living surfaces: mint `#8DD0A5`, sage `#B7C69B`
- Canyon and mountain faces: coral `#F27E55`, red `#E63946`
- Shadow masses: lavender `#8B63B6`
- Trail and cloud highlights: blush `#F5B7C7`, beige `#DFC8B7`, yellow `#F3E34A`
- Machines, outlines, and structural contrast: black `#111111`

The palette is intentionally separated by function rather than applied
uniformly. Route surfaces stay light, terrain masses stay saturated, and
interactables retain dark outlines and strong accent colors.

### Preserved Systems

- Keyboard/mouse movement and pointer-lock look
- Standard gamepad movement, look, jump, interact, and scan
- Jump and unlockable double jump
- Raycast scan and interaction
- Antenna pickup/carry
- Storm pursuit while carrying the antenna
- Weather-machine proximity escalation and lightning strike
- Entrance reveal and completion overlay
- Fall reset and lightweight authored collision

### Intentionally Not Implemented

Multiplayer, networking, procedural terrain, the three-wheel UI, additional
biomes, enemies, combat, crafting, survival systems, quest logs, save/load,
physics-engine integration, and a renderer rewrite.

### Known Limitations

- Collision remains a lightweight combination of raycast walkable surfaces and
  authored horizontal circles; it does not model exact mesh contours.
- Mountain shelves are broad prototype surfaces with simple tapered edges.
- The start mountain, valley floor, river ribbon, distant mountains, clouds,
  and horizon forms do not have collision because they are scenery outside or
  beneath the intended route.
- The double-jump overlook uses the same raycast walkable-surface approach as
  the main trail and has no separate edge rail or physics collider.
- The spawn clearance, held-item framing, cloud composition, hidden-exit route,
  relocated reward, and elevated spawn were checked through code inspection and
  build validation only. No browser automation, screenshots, or manual gameplay
  verification were performed for this pass.
- Controller support still uses fixed mappings, deadzone, and look sensitivity.
- The double-jump unlock remains session-only.
- Audio is not included.

### Recommended Next Task

Run one focused manual playtest of the complete mountain-start route: confirm
the opening reads as an overlook above the cloud valley, the side signal is
discoverable without being mistaken for a spawn reward, the held antenna stays
readable, and the full machine-to-hidden-entrance route remains clear.
