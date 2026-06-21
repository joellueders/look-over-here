import * as THREE from "three";
import { createGamepadInput } from "./gamepad.js";
import { createPlayer } from "./player.js";
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

function randomSeed() {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

const searchParams = new URLSearchParams(window.location.search);
const seed = searchParams.get("seed") || randomSeed();
searchParams.set("seed", seed);
window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);

const state = {
  starsCollected: 0,
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

function updateHud() {
  objective.innerHTML = `
    <strong>Find 10 stars hidden throughout this world.</strong><br />
    Stars: ${state.starsCollected} / 10
  `;
  status.textContent = `v0.17.0 · AWE SPAWNS · ${world.themeName} · ${world.spawnType} · Seed: ${seed} · N new world`;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 520);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const world = createWorld(scene, seed);
const player = createPlayer(
  camera,
  renderer.domElement,
  world.walkableSurfaces,
  world.colliders,
  () => ui.showMessage("The painted wind returns you to the opening overlook.", 4),
  {
    spawn: world.spawn,
    lookAt: world.lookAt,
    worldLimit: world.worldLimit,
  },
);
scene.add(player.controls.object);

const gamepadInput = createGamepadInput((detected) => {
  controllerHelp.classList.toggle("visible", detected);
});
const clock = new THREE.Clock();

function startNewWorld() {
  const nextSeed = randomSeed();
  window.location.search = `?seed=${nextSeed}`;
}

function complete() {
  if (state.complete) return;
  state.complete = true;
  objective.innerHTML = `
    <strong>All 10 stars found.</strong><br />
    ${world.themeName} · Seed ${seed} complete.
  `;
  ui.setPrompt("");
  ui.showMessage("WORLD COMPLETE: Every hidden star is shining.", 6);
  player.controls.unlock();
  completeScreen.classList.add("visible");
}

function collectStars() {
  if (state.complete) return;
  for (const star of world.stars) {
    if (!star.visible || camera.position.distanceTo(star.position) > 2.2) continue;
    star.visible = false;
    state.starsCollected += 1;
    updateHud();
    ui.showMessage(`STAR FOUND · ${state.starsCollected} / ${world.starCount}`, 3);
    if (state.starsCollected === world.starCount) complete();
  }
}

enterButton.addEventListener("click", () => player.controls.lock());
player.controls.addEventListener("lock", () => start.style.display = "none");
player.controls.addEventListener("unlock", () => {
  if (!state.complete) start.style.display = "grid";
});
restartButton.addEventListener("click", startNewWorld);

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyN" && !event.repeat) startNewWorld();
  if (event.code === "KeyF" && !event.repeat) {
    ui.showMessage(`SCAN: ${world.scanText}`);
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.domElement.addEventListener("webglcontextlost", (event) => {
  event.preventDefault();
  ui.showMessage("The painted world went dark. Reload to restore it.", 30);
});

renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;
  const gamepad = gamepadInput.update();

  player.update(delta, gamepad);
  if (gamepad.scanPressed) {
    ui.showMessage(`SCAN: ${world.scanText}`);
  }
  collectStars();
  animateWorld(scene, elapsed);
  ui.update(delta);
  renderer.render(scene, camera);
});

updateHud();
ui.showMessage(`${world.themeName}: ten stars wait across distant trails and hidden paths.`, 6);
