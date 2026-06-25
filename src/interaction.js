import * as THREE from "three";

export function createInteraction(camera, scene, state, ui, callbacks) {
  const raycaster = new THREE.Raycaster();
  raycaster.far = 5.5;
  const center = new THREE.Vector2(0, 0);
  let current = null;

  function interactionRoot(object) {
    return object?.userData.interactionRoot || null;
  }

  function findTarget() {
    raycaster.setFromCamera(center, camera);
    const hits = raycaster.intersectObjects(scene.children, true);
    for (const hit of hits) {
      const root = interactionRoot(hit.object);
      if (root?.visible && root.userData.interactable) return root;
    }
    return null;
  }

  function update() {
    current = findTarget();

    if (!current) {
      ui.setPrompt("");
      return;
    }

    const data = current.userData.interactable;
    if (current.userData.isAntenna && !state.carryingAntenna) {
      ui.setPrompt(`[E] Pick up ${data.name}  ·  [F] Scan`);
    } else if (current.userData.isSpineReward && !state.doubleJumpUnlocked) {
      ui.setPrompt(`[E] Touch ${data.name}  ·  [F] Scan`);
    } else if (current.userData.isRocketPack && !state.rocketPackUnlocked) {
      ui.setPrompt(`[E] Take ${data.name}  ·  [F] Scan`);
    } else if (current.userData.isHeartGun && !state.heartGunUnlocked) {
      ui.setPrompt(`[E] Take ${data.name}  ·  [F] Scan`);
    } else if (current.userData.isSecret && !state.secretsFound.has(current.userData.secretId)) {
      ui.setPrompt(`[E] Collect ${data.name}  ·  [F] Scan`);
    } else if (current.userData.isExit && state.exitRevealed) {
      ui.setPrompt("[E] Enter the lost entrance  ·  [F] Scan");
    } else {
      ui.setPrompt(`[F] Scan ${data.name}`);
    }
  }

  function inspect() {
    if (!current) {
      ui.showMessage("SCAN: Dust, fog, and no useful signal.");
      return;
    }
    ui.showMessage(current.userData.interactable.scanText);
  }

  function interact() {
    if (!current) return;
    if (current.userData.isAntenna && !state.carryingAntenna) callbacks.pickUpAntenna();
    if (current.userData.isSpineReward && !state.doubleJumpUnlocked) callbacks.unlockDoubleJump();
    if (current.userData.isRocketPack && !state.rocketPackUnlocked) callbacks.unlockRocketPack(current);
    if (current.userData.isHeartGun && !state.heartGunUnlocked) callbacks.unlockHeartGun(current);
    if (current.userData.isSecret) callbacks.collectSecret(current);
    if (current.userData.isExit && state.exitRevealed) callbacks.complete();
  }

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.code === "KeyF") inspect();
    if (event.code === "KeyE") interact();
  });

  return { update, inspect, interact };
}
