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
const secrets = document.querySelector("#secrets");
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
  rocketPackUnlocked: false,
  heartGunUnlocked: false,
  secretsFound: new Set(),
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
const heartRaycaster = new THREE.Raycaster();
heartRaycaster.far = 72;
const heartShots = [];
let lakeSplashReady = true;

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

function unlockRocketPack(rocketPack) {
  if (state.rocketPackUnlocked) return;
  state.rocketPackUnlocked = true;
  rocketPack.visible = false;
  player.setRocketPackUnlocked(true);
  status.textContent = "Rocket Pack: Found";
  ui.showMessage("ROCKET PACK FOUND: Hold jump in the air to burn upward.", 6);
}

function unlockHeartGun(heartGun) {
  if (state.heartGunUnlocked) return;
  state.heartGunUnlocked = true;
  heartGun.visible = false;
  status.textContent = state.rocketPackUnlocked
    ? "Rocket Pack: Found · Heart Gun: Ready"
    : "Heart Gun: Ready";
  ui.showMessage("HEART GUN READY: Click to shoot hearts and paint things pink.", 6);
}

function collectSecret(secret) {
  const id = secret.userData.secretId;
  if (state.secretsFound.has(id)) return;
  state.secretsFound.add(id);
  secret.visible = false;
  secrets.textContent = `Secrets Found: ${state.secretsFound.size} / 3`;
  ui.showMessage(
    state.secretsFound.size === 3
      ? "ALL SECRETS FOUND: The canyon feels larger than it did before."
      : `SECRET FOUND: ${secret.userData.interactable.name}.`,
    5,
  );
}

const interaction = createInteraction(camera, scene, state, ui, {
  pickUpAntenna,
  unlockDoubleJump,
  unlockRocketPack,
  unlockHeartGun,
  collectSecret,
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

function createHeartShot(origin, direction) {
  const group = new THREE.Group();
  const pink = new THREE.MeshStandardMaterial({
    color: 0xff69c8,
    emissive: 0x8f245f,
    flatShading: true,
    roughness: 0.8,
  });
  const left = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 5), pink);
  left.position.set(-0.1, 0.08, 0);
  group.add(left);
  const right = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 5), pink);
  right.position.set(0.1, 0.08, 0);
  group.add(right);
  const point = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.24, 5), pink);
  point.position.y = -0.08;
  point.rotation.x = Math.PI;
  group.add(point);

  group.position.copy(origin).add(direction.clone().multiplyScalar(1.2));
  group.userData.velocity = direction.clone().multiplyScalar(38);
  group.userData.life = 0.75;
  scene.add(group);
  heartShots.push(group);
}

function shootHeart() {
  if (!state.heartGunUnlocked || !player.controls.isLocked) return;
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  heartRaycaster.set(camera.position, direction);
  const hit = heartRaycaster
    .intersectObjects(scene.children, true)
    .find((intersection) => intersection.object.isMesh && intersection.object.material);

  createHeartShot(camera.position, direction);
  if (!hit) return;

  const materials = Array.isArray(hit.object.material) ? hit.object.material : [hit.object.material];
  materials.forEach((sourceMaterial, index) => {
    const pinkMaterial = sourceMaterial.clone();
    pinkMaterial.color.set(0xff69c8);
    pinkMaterial.emissive?.set(0x8f245f);
    pinkMaterial.emissiveIntensity = 1.25;
    if (Array.isArray(hit.object.material)) {
      hit.object.material[index] = pinkMaterial;
    } else {
      hit.object.material = pinkMaterial;
    }
  });
}

renderer.domElement.addEventListener("pointerdown", shootHeart);

function updateHeartShots(delta) {
  for (let i = heartShots.length - 1; i >= 0; i -= 1) {
    const shot = heartShots[i];
    shot.position.addScaledVector(shot.userData.velocity, delta);
    shot.rotation.z += delta * 9;
    shot.userData.life -= delta;
    if (shot.userData.life > 0) continue;
    shot.removeFromParent();
    heartShots.splice(i, 1);
  }
}

function updateLakeSplash() {
  const lake = world.lakeBounds;
  const normalizedDistance = Math.hypot(
    (camera.position.x - lake.x) / lake.radiusX,
    (camera.position.z - lake.z) / lake.radiusZ,
  );
  const inLake = normalizedDistance < 1 && camera.position.y < lake.surfaceY + 2.4;
  if (inLake && lakeSplashReady) {
    lakeSplashReady = false;
    ui.showMessage("SPLASH: The lake throws hyper goo sparkles all the way up the ladder.", 5);
  }
  if (!inLake && camera.position.y > lake.surfaceY + 5) lakeSplashReady = true;
}

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
  updateLakeSplash();
  updateHeartShots(delta);
  storm.update(delta, elapsed, camera.position, state.carryingAntenna);
  animateWorld(scene, elapsed);
  ui.update(delta);

  if (state.exitRevealed) {
    world.exit.userData.glow.material.emissiveIntensity = 1.1 + Math.sin(elapsed * 5) * 0.35;
  }

  renderer.render(scene, camera);
});

ui.showMessage("SCAN: The high trail descends toward a listening antenna.", 5);
