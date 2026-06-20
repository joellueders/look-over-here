import * as THREE from "three";
import { createGamepadInput } from "./gamepad.js";
import { createScenario } from "./generator.js";
import { createInteraction } from "./interaction.js";
import { createPlayer } from "./player.js";
import { createStorm } from "./storm.js";
import { animateWorld, createWorld } from "./world.js";

const app = document.querySelector("#app");
const objective = document.querySelector("#objective");
const status = document.querySelector("#status");
const message = document.querySelector("#message");
const prompt = document.querySelector("#prompt");
const start = document.querySelector("#start");
const enterButton = document.querySelector("#enter");
const completeScreen = document.querySelector("#complete");
const restartButton = document.querySelector("#restart");
const controllerHelp = document.querySelector("#controller-help");

const scenario = createScenario();
const state = {
  carryingAntenna: false,
  machineAwake: false,
  exitRevealed: false,
  doubleJumpUnlocked: false,
  complete: false,
};

const ui = {
  messageTimer: 0,
  setPrompt(text) {
    prompt.textContent = text;
  },
  showMessage(text, seconds = 4) {
    message.textContent = text;
    message.classList.add("visible");
    this.messageTimer = seconds;
  },
  update(delta) {
    if (this.messageTimer <= 0) return;
    this.messageTimer -= delta;
    if (this.messageTimer <= 0) message.classList.remove("visible");
  },
};

objective.innerHTML = `
  <strong>${scenario.goal}</strong><br />
  ${scenario.place} · ${scenario.problem}
`;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 180);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const world = createWorld(scene);
const player = createPlayer(camera, renderer.domElement, world.walkableSurfaces, world.colliders, () => {
  ui.showMessage("The canyon wind sets you back on the trail.", 4);
});
scene.add(player.controls.object);
const storm = createStorm(scene);
const clock = new THREE.Clock();
const carriedAnchor = new THREE.Group();
carriedAnchor.position.set(0.62, -0.68, -1.65);
carriedAnchor.rotation.set(-0.16, -0.38, 0.58);
camera.add(carriedAnchor);

function pickUpAntenna() {
  state.carryingAntenna = true;
  world.antenna.removeFromParent();
  world.antenna.position.set(0, 0, 0);
  world.antenna.scale.setScalar(0.32);
  carriedAnchor.add(world.antenna);
  status.textContent = "Carrying: Broken Antenna";
  objective.innerHTML = `<strong>Bring the antenna to the dead machine</strong><br />The weather has noticed you.`;
  ui.showMessage("The antenna crackles. The storm changes direction.", 5);
}

function revealExit() {
  state.machineAwake = true;
  state.exitRevealed = true;
  state.carryingAntenna = false;
  carriedAnchor.remove(world.antenna);
  world.antenna.visible = false;
  world.exit.visible = true;

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0x8ff7ff,
    emissive: 0x2b8490,
    flatShading: true,
  });
  world.machine.userData.machineLights.forEach((light) => {
    light.material = glowMaterial;
  });
  storm.strike(world.machine.position);
  status.textContent = "Stormbound machine: Awake";
  objective.innerHTML = `<strong>Climb beyond the weather machine</strong><br />A hidden entrance is glowing above the lavender ridge.`;
  ui.showMessage("LIGHTNING STRIKE: The dead machine wakes. A high mountain door answers.", 6);
}

function complete() {
  if (state.complete) return;
  state.complete = true;
  status.textContent = "Lost entrance: Found";
  objective.innerHTML = `<strong>Rose Canyon Highlands complete</strong><br />The way below is open.`;
  ui.setPrompt("");
  ui.showMessage("ENTRANCE FOUND: A hidden way opens inside the mountain.", 6);
  player.controls.unlock();
  completeScreen.classList.add("visible");
}

function unlockDoubleJump() {
  if (state.doubleJumpUnlocked) return;
  state.doubleJumpUnlocked = true;
  player.setDoubleJumpUnlocked(true);
  status.textContent = state.carryingAntenna
    ? "Carrying: Broken Antenna · Boots: Remembering"
    : "Boots: Remembering";
  world.trailSignal.scale.setScalar(1.35);
  ui.showMessage("Your boots remember a second jump.", 6);
}

const interaction = createInteraction(camera, scene, state, ui, {
  pickUpAntenna,
  unlockDoubleJump,
  complete,
});
const gamepadInput = createGamepadInput((detected) => {
  controllerHelp.classList.toggle("visible", detected);
});

enterButton.addEventListener("click", () => player.controls.lock());
player.controls.addEventListener("lock", () => start.style.display = "none");
player.controls.addEventListener("unlock", () => {
  if (!state.complete) start.style.display = "grid";
});
restartButton.addEventListener("click", () => window.location.reload());

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.domElement.addEventListener("webglcontextlost", (event) => {
  event.preventDefault();
  ui.showMessage("The canyon went dark. Reload to restore the signal.", 30);
});

function updateMachineTrigger() {
  if (!state.carryingAntenna || state.machineAwake) return;
  const distance = camera.position.distanceTo(world.machine.position);
  if (distance < 5.2) revealExit();
}

function updateExitTrigger() {
  if (!state.exitRevealed || state.complete) return;
  const trigger = world.exit.userData.completionTrigger;
  const offsetX = Math.abs(camera.position.x - world.exit.position.x);
  const offsetZ = Math.abs(camera.position.z - world.exit.position.z);
  const triggerY = world.exit.position.y + trigger.centerHeight;
  const offsetY = Math.abs(camera.position.y - triggerY);
  if (
    offsetX <= trigger.halfWidth
    && offsetZ <= trigger.halfDepth
    && offsetY <= trigger.halfHeight
  ) complete();
}

renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;
  const gamepad = gamepadInput.update();

  player.update(delta, gamepad);
  interaction.update();
  if (gamepad.interactPressed) interaction.interact();
  if (gamepad.scanPressed) interaction.inspect();
  updateMachineTrigger();
  updateExitTrigger();
  storm.update(delta, elapsed, camera.position, state.carryingAntenna);
  animateWorld(scene, elapsed);
  ui.update(delta);

  if (state.exitRevealed) {
    world.exit.userData.glow.material.emissiveIntensity = 1.1 + Math.sin(elapsed * 5) * 0.35;
  }

  renderer.render(scene, camera);
});

ui.showMessage("SCAN: The high trail descends toward a listening antenna.", 5);
