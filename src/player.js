import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const WORLD_LIMIT = 32;

export function createPlayer(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);
  const keys = new Set();
  const velocity = new THREE.Vector3();
  const spawn = new THREE.Vector3(0, 1.7, 15);
  let grounded = true;

  camera.position.copy(spawn);
  camera.lookAt(0, 3.5, -24);

  window.addEventListener("keydown", (event) => {
    keys.add(event.code);
    if (event.code === "Space" && grounded && controls.isLocked) {
      velocity.y = 6.2;
      grounded = false;
    }
  });
  window.addEventListener("keyup", (event) => keys.delete(event.code));
  window.addEventListener("blur", () => keys.clear());

  function update(delta) {
    if (!controls.isLocked) return;

    const speed = 7.2;
    const damping = Math.exp(-10 * delta);
    const forward = Number(keys.has("KeyW")) - Number(keys.has("KeyS"));
    const sideways = Number(keys.has("KeyD")) - Number(keys.has("KeyA"));
    const length = Math.hypot(forward, sideways) || 1;

    velocity.x = THREE.MathUtils.lerp(velocity.x, (sideways / length) * speed, 1 - damping);
    velocity.z = THREE.MathUtils.lerp(velocity.z, (forward / length) * speed, 1 - damping);
    velocity.y -= 16 * delta;

    controls.moveRight(velocity.x * delta);
    controls.moveForward(velocity.z * delta);
    camera.position.y += velocity.y * delta;

    if (camera.position.y <= 1.7) {
      camera.position.y = 1.7;
      velocity.y = 0;
      grounded = true;
    }

    const horizontalDistance = Math.hypot(camera.position.x, camera.position.z);
    if (horizontalDistance > WORLD_LIMIT) {
      const scale = WORLD_LIMIT / horizontalDistance;
      camera.position.x *= scale;
      camera.position.z *= scale;
    }
  }

  return { controls, update, spawn };
}
