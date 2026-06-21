# Look Over Here — Codex Instructions

## Project Identity

Look Over Here is a small co-op procedural exploration game prototype about shared discovery.

The core player fantasy is:

> “Look over here.”

The game should prioritize curiosity, readable weirdness, N64-inspired exploration, landmarks, simple systemic surprises, and small moments worth retelling.

## Current Prototype Boundary

Prototype 1 is a browser-based Three.js first-person exploration prototype.

Current focus:

- expedition gouache scenic adventure
- scenic low-poly landscapes with modern draw distance
- N64 as a readability reference only
- first-person exploration
- readable landmarks
- seeded heightfield terrain generation
- 10 hidden collectible stars
- touch collection and simple completion
- stable collision and player trust

Do not expand into the full game unless explicitly instructed.

## Required Workspace Check

Before editing files, run:

```bash
pwd
git remote -v
git status --short
```

Expected working directory:

```text
/Users/joellueders/coding-projects/look-over-here
```

Expected remote:

```text
https://github.com/joellueders/look-over-here.git
```

If the working directory or remote does not match, stop immediately and report the mismatch.

Do not edit files in any other folder or project.

## Default Development Rules

Always:

- inspect existing code before changing it
- read relevant docs before implementation
- make the smallest safe change
- preserve existing functionality unless explicitly instructed otherwise
- keep the prototype playable
- update relevant docs when behavior, controls, scope, architecture, or known limitations change
- summarize files changed and tests run
- prefer simple readable systems over clever architecture
- prioritize player trust, readable landmarks, and “look over here” moments

## Token and Time Waste Rules

Do not use screenshots, browser automation, visual regression loops, or repeated screenshot inspection unless Joel explicitly asks for visual QA.

For most tasks, use:

```bash
npm run build
```

Use `npm run dev` only to confirm the app serves when needed.

Do not keep running browser checks after the requested bug is confirmed fixed.

Do not continue polishing beyond the requested task.

If the game works and the acceptance criteria are met, stop and summarize.

If archive/update hangs, stop after reporting that implementation and tests are complete.

## Screenshot Rule

Screenshots are allowed only when the task explicitly requires visual evaluation, layout verification, or Joel asks for them.

Examples where screenshots are okay:

- “Check if the scene looks more N64.”
- “Compare before/after visuals.”
- “Debug a visual issue I can’t describe.”
- “Make sure the HUD is readable.”

Examples where screenshots are not needed:

- completion trigger bugs
- collision fixes
- build verification
- docs updates
- small code refactors
- interaction logic
- git cleanup

## Do Not Build Unless Explicitly Requested

Do not add:

- multiplayer
- networking
- procedural terrain
- enemies
- combat
- crafting
- survival systems
- inventory beyond the antenna
- quests
- multiple biomes
- save/load
- complex physics engines
- heavy dependencies
- full art overhauls
- AI-generated content systems

## Visual Direction

Preserve the intended visual direction:

- expedition gouache scenic adventure
- chunky low-poly
- scenic composition first
- readable silhouettes
- limited palette
- weird but understandable
- N64-inspired only as a readability reference
- strong landscape composition over prop clutter

Avoid drifting toward:

- No Man’s Sky realism
- generic low-poly sci-fi
- modern survival-game clutter
- polished smooth sci-fi

## Testing Expectations

Default test:

```bash
npm run build
```

When objective behavior changes, also manually verify or describe how to verify:

- movement works
- generated routes remain connected
- stars collect and update the HUD
- all 10 stars trigger completion
- a new seed creates a new world

Do not perform extended browser/screenshot testing unless explicitly requested.

## Completion Behavior

When the requested work is done:

1. stop editing
2. report files changed
3. report tests run
4. report known limitations
5. recommend the next task

Do not continue improving unrelated areas.

## Prompt Hygiene

Future Codex prompts should begin with:

```markdown
Read `docs/codex-instructions.md` first and follow it.

Do not use screenshots or browser automation unless explicitly requested in this prompt.
```

If a prompt conflicts with this document, ask Joel before proceeding unless the prompt is explicitly overriding the rule.
