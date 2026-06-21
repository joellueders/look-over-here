# Prototype Implementation Notes

## Wanderbox Biome Topology Generator

- Version: `v0.17.0`
- Build: `AWE SPAWNS`
- Default objective: explore generated terrain and collect 10 stars

The active generator now creates one continuous higher-resolution terrain mesh
for each world. Separate floating regions, slab platforms, route ribbons, and
connection-pass meshes are no longer the primary world structure.

### Controls

- WASD: move
- Mouse: look
- Shift: run
- Space: jump
- F: scan
- N: generate a new seed and world
- Esc: release the mouse

Walking speed is `7.2`; Shift uses run speed `11.4`. Existing acceleration,
responsive stopping, keyboard/mouse controls, and standard controller movement
remain unchanged.

### Continuous Heightfield

Each generated world uses one `420 × 420` terrain plane subdivided into
`128 × 128` cells:

- 16,641 terrain vertices
- smooth computed normals
- one continuous raycast collision surface
- broad seeded elevation changes
- height- and slope-based vertex colors
- natural raised boundaries near the edge

The five topology types use different deterministic height functions. Those
functions combine broad Gaussian landforms, elongated ridge fields, carved
corridors, basins, seeded low-frequency surface variation, and boundary rises.

Because terrain, collision, spawn placement, and star placement use the same
height sampler, the generated objects align with the visible ground.

### Awe-Spawn Selection

Each biome defines three authored scenic spawn candidates. Generation scores
them against the current seeded terrain using:

- local surface relief for stable footing
- spawn elevation relative to nearby terrain
- sampled clearance along the opening sightline
- distance from the nearest star
- a small seeded tie-breaker

The best stable candidate becomes the player spawn, and the camera faces its
biome-specific primary vista. This keeps the opening away from low ordinary
slopes, nearby objective clusters, and terrain that immediately blocks the
landmark. The HUD names the selected spawn type for seed review.

### Topology and Theme Types

#### Alpine Basin · Powder Cloud Alpine

- deep central basin
- long western and eastern mountain shoulders
- high northern saddle
- summit and snow-shelf rises
- low hidden cirque
- cloud sea below high terrain
- large snow-capped peak and basin mist bands

#### Canyon Maze · Rose Painted Canyon

- three major canyon wall systems
- broad carved washes crossing between larger rooms
- western and eastern shelves
- high northern overlooks
- hidden northern slot
- canyon arch, tall corridor fins, and painted cliff landmarks

#### Lake Highlands · Mint Lake Country

- broad central lake depression
- two long surrounding hill systems
- raised north hill and garden uplands
- low flower and reed coves
- high waterfall shelf
- hidden north shore
- visible islands, water shimmer, and shore mist

#### Forest Canopy · Fernlight Tree Country

- lower forest floor with root-like side ridges and hidden hollows
- three elevated treehouse platforms around giant landmark trunks
- two broad root ramps that provide separate routes into the canopy
- connected branch bridges across the upper layer
- stars behind trunks, under the center platform, and across all three canopy
  platforms

#### Cloud Ridge · Lavender Cloud Coast

- long western and eastern ridge systems
- low valley below spawn
- central climbing ridge
- high crown and horizon shelf
- lower side pocket
- cloud sea, arch ridge, and painted coast cliff
- circling high-altitude birds over the major drops

Each topology has a different broad silhouette, elevation profile, landmark
kit, cloud treatment, palette, and star-hiding layout. Seeded phases vary the
smaller rolling terrain details and all decorative/cloud placement.

### Vertical Exploration

The terrain types span approximately 50–60 world units vertically. Each
contains:

- terrain below spawn elevation
- terrain above spawn elevation
- continuous slopes up and down
- lower basins or valleys
- high ridges and overlooks
- side shelves and hidden pockets
- multiple traversable approaches through the same terrain mass

Forest Canopy adds a second authored walkable layer above its continuous
heightfield. Its ramps and bridges are broad enough that it does not require
precision jumping.

### Painterly Terrain

Terrain color is calculated per vertex using:

- absolute height
- local surface slope
- theme palette

Low areas transition through valley and meadow colors, high areas move toward
lighter ridge colors, and steeper faces blend toward the theme’s rock color.
This produces broad painted color regions without additional material
dependencies.

The generator also adds a limited set of large scenic landmarks:

- three distant mountain silhouette layers
- canyon arches
- alpine hero peak
- painted rock faces
- lake surface
- lake islands
- groves
- waterfall or cloudfall bands
- cloud sea where appropriate

These landmarks are for orientation and atmosphere rather than object clutter.

### Biome Detail Kits

Each world scatters a limited instanced detail kit, weighted toward star routes
and points of interest and kept sparser in the far field:

- Canyon Maze: small painted rocks and dry brush accents
- Forest Canopy: grass tufts, leaf/mushroom dots, giant trunks, and treehouses
- Alpine Basin and Cloud Ridge: small stones and flower/trail markers
- Lake Highlands: reeds and shore stones, kept outside the lake surface

The details remain decorative and use two small instanced batches per world.
They improve close-range motion feedback without adding a physics or
post-processing dependency.

### Star Placement

Exactly ten stars are placed using these roles:

- 2 visible starter stars away from spawn
- 2 side-pocket stars
- high and low vertical-route stars
- stars hidden behind terrain, trunks, or elevated structures
- 1 landmark star
- 1 final exploration-reward star

Star X/Z positions receive small seeded offsets. Their Y positions come from
the same terrain height function as the heightfield, keeping stars above the
terrain and out of decorative geometry. Forest canopy stars instead use the
shared platform height and fixed X/Z positions so they stay reachable on the
upper route.

Stars collect on touch, disappear, update `Stars: X / 10`, and trigger
completion after all ten are found.

### Clouds and Scale

Clouds use three billboard layers:

1. large near clouds
2. mid-distance cloud banks
3. smaller far-horizon clouds

Layer size, distance, opacity, tint, and drift vary by theme and seed. Alpine
Basin and Cloud Ridge also use broad cloud-sea surfaces below elevated terrain.
Large distant mountain layers extend atmospheric depth beyond the playable
heightfield.

### Ambient Motion

- all clouds drift and bob by depth layer
- stars rotate, sparkle, and float
- Forest Canopy crowns sway subtly
- each biome has a lightweight drifting particle field: leaves, dust, mist, or
  pollen
- Lake Highlands water gently shimmers
- Canyon Maze uses visible wind streaks around its wall corridors
- Alpine Basin and Lake Highlands use sparse drifting mist bands
- bird flocks circle primary landmarks in every biome

### Collision and Safety

- The heightfield remains the main walkable mesh.
- Forest Canopy adds broad platform, bridge, and root-ramp walkable meshes.
- Large forest trunks use lightweight circular collision proxies.
- Terrain triangles face upward for downward grounding raycasts.
- Spawn candidates and star positions are sampled from the same height
  function.
- Spawn selection rejects unstable candidates when a stable alternative is
  available and scores opening sightline clearance.
- The raised outer terrain and radial world limit form natural boundaries.
- The existing fall/reset behavior remains available.
- Decorative landmarks and cloud elements do not participate in collision.
- No physics engine was added.

### Old Objective Loop

The antenna, receptacle/weather machine, storm, exit, and double-jump source
files remain available for possible reuse, but they are not instantiated in
generated worlds. Collecting ten stars remains the only completion condition.

### Known Limitations

- The terrain is one finite heightfield rather than an infinite or streamed
  world.
- Topologies use authored mathematical height functions rather than erosion or
  biome simulation.
- Very steep scenic boundary slopes are not intended as traversal routes.
- Decorative landmarks do not have collision.
- Instanced ground details and ambient particles are decorative only.
- Forest huts and crowns are decorative; only trunks have collision.
- Star and spawn alignment are derived from the shared height sampler, but full
  route traversal and opening-vista quality were not manually playtested.
- Controller mappings remain fixed.
- No browser automation, screenshots, or manual gameplay testing were used.
- Audio is not included.

### Manual Verification Guide

1. Start the prototype and confirm the player stands on broad continuous
   terrain.
2. Confirm the HUD shows topology/theme, seed, and `Stars: 0 / 10`.
3. Hold Shift and compare running with normal walking.
4. Test seeds `100000`, `100001`, `100002`, `100003`, and `100007`, then
   generate at least three additional worlds with N.
5. Confirm the seeds produce Forest Canopy, Lake Highlands, Canyon Maze, Alpine
   Basin, and Cloud Ridge respectively.
6. Confirm each opening names an awe-spawn type and faces a landmark, basin,
   lake, canopy route, canyon corridor, or cloud drop without a nearby blocking
   hill.
7. Wander laterally across the terrain rather than following a visible strip.
8. Descend into basins and climb to high ridges and overlooks.
9. In Forest Canopy, use a root ramp, cross both branch bridges, and check
   behind trunks and beneath the center platform.
10. Collect stars from side, high, low, landmark, and hidden locations.
11. Confirm stars disappear and update the HUD.
12. Collect all ten and confirm completion.
13. Press N and confirm a different terrain world loads.
14. Check keyboard/mouse and a standard controller if available.
