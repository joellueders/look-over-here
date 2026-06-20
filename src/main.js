import * as THREE from "three";
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

const scenario = createScenario();
const state = {
  carryingAntenna: false,
  machineAwake: false,
  exitRevealed: false,
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
const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const world = createWorld(scene);
const player = createPlayer(camera, renderer.domElement);
scene.add(player.controls.object);
const storm = createStorm(scene);
const clock = new THREE.Clock();
const carriedAnchor = new THREE.Group();
carriedAnchor.position.set(0.72, -0.7, -1.2);
carriedAnchor.rotation.set(-0.2, -0.5, 0.7);
camera.add(carriedAnchor);

function pickUpAntenna() {
  state.carryingAntenna = true;
  world.antenna.removeFromParent();
  world.antenna.position.set(0, 0, 0);
  world.antenna.scale.setScalar(0.55);
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
  objective.innerHTML = `<strong>Enter beneath the fossil spine</strong><br />The lost entrance is open.`;
  ui.showMessage("LIGHTNING STRIKE: The dead machine wakes. Stone moves beneath the fossil.", 6);
}

function complete() {
  if (state.complete) return;
  state.complete = true;
  player.controls.unlock();
  completeScreen.classList.add("visible");
}

const interaction = createInteraction(camera, scene, state, ui, {
  pickUpAntenna,
  complete,
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
  ui.showMessage("The moon went dark. Reload to restore the signal.", 30);
});

function updateMachineTrigger() {
  if (!state.carryingAntenna || state.machineAwake) return;
  const distance = camera.position.distanceTo(world.machine.position);
  if (distance < 5.2) revealExit();
}

renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;

  player.update(delta);
  interaction.update();
  updateMachineTrigger();
  storm.update(delta, elapsed, camera.position, state.carryingAntenna);
  animateWorld(scene, elapsed);
  ui.update(delta);

  if (state.exitRevealed) {
    world.exit.userData.glow.material.emissiveIntensity = 1.1 + Math.sin(elapsed * 5) * 0.35;
    if (camera.position.distanceTo(world.exit.position) < 2.8) complete();
  }

  renderer.render(scene, camera);
});

ui.showMessage("SCAN: A fossil spine breaks the fog ahead.", 5);
