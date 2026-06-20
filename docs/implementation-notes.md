# Prototype Implementation Notes

## Campfire Prototype: Forbidden Moon

Version: `v0.1.0`  
Build: `FORBIDDEN MOON`

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
interact.

### Implemented

- N64-inspired fog, limited palette, low-poly crater, and deliberately low
  renderer resolution.
- Dominant fossil landmark visible from spawn.
- Blue slime basin and ring of watching stones as secondary curiosities.
- Broken antenna inspection and one-object carrying.
- Storm cloud pursuit while carrying the antenna.
- Dead machine proximity escalation with a visible lightning strike.
- Revealed lost entrance and completion state.
- Three-rule scenario data for Forbidden Moon, Weather Is Alive, and Find the
  Lost Entrance.

### Intentionally Not Implemented

Multiplayer, networking, combat, enemies, crafting, survival systems, procedural
terrain, multiple biomes, save/load, controller support, mobile controls, and a
general inventory.

### Known Limitations

- Ground collision is intentionally simple: the player stays on a flat movement
  plane while crater rocks and terrain provide visual shape.
- The authored scenario data is structured for later variation, but Prototype 1
  does not randomize the terrain or progression chain.
- Audio is not included in this scaffold.

### Recommended Next Task

Playtest the five-minute path with fresh players and record whether they notice
the fossil, find the antenna, and understand that the storm is following them
without verbal instruction.
