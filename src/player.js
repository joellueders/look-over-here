import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const WORLD_LIMIT = 32;
const EYE_HEIGHT = 1.7;
const PLAYER_RADIUS = 0.45;
const FALL_RESET_Y = -12;
const STEP_HEIGHT = 0.6;
const GAMEPAD_LOOK_HORIZONTAL = 2.2;
const GAMEPAD_LOOK_VERTICAL = 1.8;
const MAX_LOOK_PITCH = Math.PI / 2 - 0.05;
const MOVE_ACCELERATION = 10;
const MOVE_DECELERATION = 34;

export function createPlayer(camera, domElement, walkableSurfaces, colliders = [], onReset = () => {}) {
  const controls = new PointerLockControls(camera, domElement);
  const keys = new Set();
  const velocity = new THREE.Vector3();
  const spawn = new THREE.Vector3(1, EYE_HEIGHT, 18);
  const groundRaycaster = new THREE.Raycaster();
  const groundRayOrigin = new THREE.Vector3();
  const down = new THREE.Vector3(0, -1, 0);
  let grounded = true;
  let doubleJumpUnlocked = false;
  let airJumpUsed = false;

  camera.position.copy(spawn);
  camera.rotation.order = "YXZ";
  camera.lookAt(-5.5, 4.8, -24);

  function jump() {
    if (!controls.isLocked) return;
    if (grounded) {
      velocity.y = 6.2;
      grounded = false;
      airJumpUsed = false;
    } else if (doubleJumpUnlocked && !airJumpUsed) {
      velocity.y = 6.2;
      airJumpUsed = true;
    }
  }

  window.addEventListener("keydown", (event) => {
    keys.add(event.code);
    if (event.code === "Space" && !event.repeat) jump();
  });
  window.addEventListener("keyup", (event) => keys.delete(event.code));
  window.addEventListener("blur", () => keys.clear());

  function groundHeightAt(x, z, highestAllowed = Infinity) {
    groundRayOrigin.set(x, 20, z);
    groundRaycaster.set(groundRayOrigin, down);
    const hit = groundRaycaster
      .intersectObjects(walkableSurfaces, false)
      .find((intersection) => intersection.point.y <= highestAllowed);
    return hit?.point.y ?? 0;
  }

  function isBlocked(x, z, feetY) {
    return colliders.some((collider) => {
      const distance = Math.hypot(x - collider.x, z - collider.z);
      const blockedByHeight = collider.top === undefined || feetY + STEP_HEIGHT < collider.top;
      return blockedByHeight && distance < collider.radius + PLAYER_RADIUS;
    });
  }

  function pushOutOfSpine() {
    const feetY = camera.position.y - EYE_HEIGHT;
    for (const collider of colliders) {
      if (!collider.unstuck || feetY + STEP_HEIGHT >= collider.top) continue;
      const offsetX = camera.position.x - collider.x;
      const offsetZ = camera.position.z - collider.z;
      const distance = Math.hypot(offsetX, offsetZ);
      const safeRadius = collider.radius + PLAYER_RADIUS + 0.05;
      if (distance >= safeRadius) continue;

      const directionX = distance > 0.001 ? offsetX / distance : 0;
      const directionZ = distance > 0.001 ? offsetZ / distance : 1;
      camera.position.x = collider.x + directionX * safeRadius;
      camera.position.z = collider.z + directionZ * safeRadius;
      velocity.x = 0;
      velocity.z = 0;
    }
  }

  function resetToSpawn() {
    camera.position.copy(spawn);
    camera.position.y = groundHeightAt(spawn.x, spawn.z) + EYE_HEIGHT;
    velocity.set(0, 0, 0);
    grounded = true;
    airJumpUsed = false;
    onReset();
  }

  function setDoubleJumpUnlocked(unlocked) {
    doubleJumpUnlocked = unlocked;
  }

  function update(delta, gamepad = {}) {
    if (!controls.isLocked) return;

    const speed = 7.2;
    const forward = Number(keys.has("KeyW")) - Number(keys.has("KeyS")) - (gamepad.moveY || 0);
    const sideways = Number(keys.has("KeyD")) - Number(keys.has("KeyA")) + (gamepad.moveX || 0);
    const length = Math.hypot(forward, sideways) || 1;
    const hasMovementInput = Math.hypot(forward, sideways) > 0.001;
    const movementResponse = hasMovementInput ? MOVE_ACCELERATION : MOVE_DECELERATION;
    const damping = Math.exp(-movementResponse * delta);

    velocity.x = THREE.MathUtils.lerp(velocity.x, (sideways / Math.max(1, length)) * speed, 1 - damping);
    velocity.z = THREE.MathUtils.lerp(velocity.z, (forward / Math.max(1, length)) * speed, 1 - damping);
    velocity.y -= 16 * delta;

    camera.rotation.y -= (gamepad.lookX || 0) * GAMEPAD_LOOK_HORIZONTAL * delta;
    camera.rotation.x = THREE.MathUtils.clamp(
      camera.rotation.x - (gamepad.lookY || 0) * GAMEPAD_LOOK_VERTICAL * delta,
      -MAX_LOOK_PITCH,
      MAX_LOOK_PITCH,
    );
    if (gamepad.jumpPressed) jump();

    const previousX = camera.position.x;
    const previousZ = camera.position.z;
    controls.moveRight(velocity.x * delta);
    controls.moveForward(velocity.z * delta);

    const movedX = camera.position.x;
    const movedZ = camera.position.z;
    camera.position.x = previousX;
    camera.position.z = previousZ;

    const feetY = camera.position.y - EYE_HEIGHT;
    if (!isBlocked(movedX, previousZ, feetY)) camera.position.x = movedX;
    if (!isBlocked(camera.position.x, movedZ, feetY)) camera.position.z = movedZ;

    camera.position.y += velocity.y * delta;
    pushOutOfSpine();

    if (camera.position.y < FALL_RESET_Y) {
      resetToSpawn();
      return;
    }

    const highestAllowed = camera.position.y - EYE_HEIGHT + STEP_HEIGHT;
    const groundY = groundHeightAt(camera.position.x, camera.position.z, highestAllowed) + EYE_HEIGHT;
    if (camera.position.y <= groundY) {
      camera.position.y = groundY;
      velocity.y = 0;
      grounded = true;
      airJumpUsed = false;
    }

    const horizontalDistance = Math.hypot(camera.position.x, camera.position.z);
    if (horizontalDistance > WORLD_LIMIT) {
      const scale = WORLD_LIMIT / horizontalDistance;
      camera.position.x *= scale;
      camera.position.z *= scale;
    }
  }

  return { controls, update, setDoubleJumpUnlocked, spawn };
}
