import * as THREE from "three";

const flatMaterial = (color, emissive = 0x000000) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive,
    flatShading: true,
    roughness: 0.92,
  });

function markInspectable(object, name, scanText, interactText = scanText) {
  object.userData.interactable = { name, scanText, interactText };
  object.traverse((child) => {
    child.userData.interactionRoot = object;
  });
  return object;
}

export function createFossilSpine() {
  const group = new THREE.Group();
  const bone = flatMaterial(0xd8c997);
  const walkableSurfaces = [];

  for (let i = 0; i < 8; i += 1) {
    const vertebra = new THREE.Mesh(new THREE.DodecahedronGeometry(1.25, 0), bone);
    vertebra.position.set(-13 + i * 3.25, 3.1 + Math.sin(i * 0.7) * 1.1, -25);
    vertebra.rotation.set(i * 0.18, 0.25, i * 0.4);
    vertebra.scale.set(1.5, 0.8, 0.75);
    group.add(vertebra);

    const rib = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.34, 5, 8, Math.PI), bone);
    rib.position.copy(vertebra.position);
    rib.position.y -= 0.2;
    rib.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    group.add(rib);
  }

  for (let i = 0; i < 7; i += 1) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.45, 2.2), bone);
    step.position.set(-11.5 + i * 3.1, 0.85 + i * 0.78, -21.8 - i * 0.5);
    step.rotation.y = (i % 2 ? -1 : 1) * 0.12;
    step.userData.walkableSurface = true;
    walkableSurfaces.push(step);
    group.add(step);
  }

  group.userData.walkableSurfaces = walkableSurfaces;
  return markInspectable(
    group,
    "Giant Fossil Spine",
    "SCAN: No matching skeleton. Smaller bones form a path toward a signal above.",
  );
}

export function createSpineSignal() {
  const group = new THREE.Group();
  group.position.set(7.2, 8.1, -25);

  const glow = flatMaterial(0xffdf73, 0x9b5f1c);
  const dark = flatMaterial(0x28202f);
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), glow);
  core.rotation.z = Math.PI / 4;
  group.add(core);

  for (let i = 0; i < 3; i += 1) {
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.2, 4), dark);
    const angle = (i / 3) * Math.PI * 2;
    fin.position.set(Math.cos(angle) * 0.75, -0.15, Math.sin(angle) * 0.75);
    fin.rotation.z = Math.PI / 2;
    fin.rotation.y = -angle;
    group.add(fin);
  }

  group.userData.isSpineReward = true;
  group.userData.signalOrigin = group.position.clone();
  return markInspectable(
    group,
    "Remembering Signal",
    "SCAN: It circles the highest bone and repeats the shape of a jumping boot.",
    "Touch the remembering signal",
  );
}

export function createSlimeBasin() {
  const group = new THREE.Group();
  group.position.set(-18, 0, -5);

  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(5.2, 4.5, 1.2, 9),
    flatMaterial(0x242334),
  );
  rim.position.y = 0.35;
  group.add(rim);

  const slime = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 4.2, 0.25, 10),
    flatMaterial(0x2ed9dd, 0x0a5f72),
  );
  slime.position.y = 1.02;
  group.add(slime);

  for (let i = 0; i < 5; i += 1) {
    const bubble = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.35 + i * 0.08, 0),
      flatMaterial(0x82fff1, 0x126e78),
    );
    bubble.position.set(Math.cos(i * 2.1) * 2.7, 1.35, Math.sin(i * 2.1) * 2.7);
    group.add(bubble);
  }

  return markInspectable(
    group,
    "Blue Slime Basin",
    "SCAN: The liquid leans toward distant thunder before it arrives.",
  );
}

export function createWatchingStones() {
  const group = new THREE.Group();
  group.position.set(17, 0, -10);
  const stone = flatMaterial(0x3c344f);
  const eye = flatMaterial(0xffdf73, 0x825414);

  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * Math.PI * 2;
    const pillar = new THREE.Mesh(new THREE.ConeGeometry(0.9, 4 + (i % 2), 5), stone);
    pillar.position.set(Math.cos(angle) * 4, 2, Math.sin(angle) * 4);
    pillar.rotation.z = Math.sin(i) * 0.16;
    group.add(pillar);

    const eyeStone = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), eye);
    eyeStone.position.copy(pillar.position);
    eyeStone.position.y += 0.7;
    eyeStone.lookAt(0, 1.2, 0);
    group.add(eyeStone);
  }

  return markInspectable(
    group,
    "Ring of Watching Stones",
    "SCAN: Every yellow face points toward the broken antenna.",
  );
}

export function createAntenna() {
  const group = new THREE.Group();
  group.position.set(7, 0.65, 8);

  const dark = flatMaterial(0x28202f);
  const hot = flatMaterial(0xff5ba7, 0x7d183f);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 2.4, 6), dark);
  mast.rotation.z = 0.55;
  group.add(mast);

  const dish = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.35, 7, 1, true), hot);
  dish.position.set(-0.65, 0.95, 0);
  dish.rotation.z = -1.05;
  group.add(dish);

  const spark = new THREE.PointLight(0xff5ba7, 1.7, 4);
  spark.position.set(-0.7, 1.1, 0);
  group.add(spark);

  group.userData.isAntenna = true;
  return markInspectable(
    group,
    "Broken Antenna",
    "SCAN: The snapped receiver is still listening. Something overhead answers.",
    "Pick up broken antenna",
  );
}

export function createDeadMachine() {
  const group = new THREE.Group();
  group.position.set(5, 0, -17);

  const shell = flatMaterial(0x292735);
  const inactive = flatMaterial(0x534664);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3, 4.6, 6), shell);
  body.position.y = 2.3;
  body.rotation.y = 0.25;
  group.add(body);

  const socket = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.18, 5, 8), inactive);
  socket.position.set(0, 2.8, 2.2);
  group.add(socket);

  const prongGeometry = new THREE.ConeGeometry(0.3, 2.5, 4);
  for (const x of [-1.1, 1.1]) {
    const prong = new THREE.Mesh(prongGeometry, inactive);
    prong.position.set(x, 5.1, 0);
    group.add(prong);
  }

  group.userData.machineLights = [socket];
  group.userData.isMachine = true;
  return markInspectable(
    group,
    "Dead Weather Machine",
    "SCAN: Empty receiver socket. Burn marks point upward.",
    "The machine is cold. Its socket is antenna-shaped.",
  );
}

export function createExit() {
  const group = new THREE.Group();
  group.position.set(0, 0, -29);
  group.visible = false;

  const frameMaterial = flatMaterial(0x19131f);
  const glowMaterial = flatMaterial(0xffdf73, 0x9b5f1c);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 1.2), frameMaterial);
  frame.position.y = 2.5;
  group.add(frame);

  const opening = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.5), glowMaterial);
  opening.position.set(0, 2.25, 0.65);
  group.add(opening);

  group.userData.isExit = true;
  group.userData.glow = opening;
  group.userData.completionTrigger = {
    halfWidth: 2.5,
    halfDepth: 1.8,
  };
  return markInspectable(
    group,
    "Lost Entrance",
    "SCAN: A stair descends where the fossil's shadow used to end.",
    "Enter the lost entrance",
  );
}
