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

export function createTrailSignal() {
  const group = new THREE.Group();
  group.position.set(-8.2, 7.15, 9.8);

  const glow = flatMaterial(0xf3e34a, 0x9b5f1c);
  const dark = flatMaterial(0x111111);
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
    "Overlook Signal",
    "SCAN: It circles a side overlook and repeats the shape of a jumping boot.",
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
  group.position.set(2.6, 5.72, 9);

  const dark = flatMaterial(0x111111);
  const hot = flatMaterial(0xe63946, 0x7d183f);
  const pale = flatMaterial(0xf5b7c7);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 2.7, 6), dark);
  mast.rotation.z = 0.22;
  group.add(mast);

  const crossbar = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.12, 0.12), dark);
  crossbar.position.set(-0.28, 0.88, 0);
  crossbar.rotation.z = 0.1;
  group.add(crossbar);

  [
    [-1.15, 1.08, 0.06, 0.62],
    [-0.15, 1.42, 0.02, 0.52],
    [0.78, 0.92, -0.02, 0.48],
  ].forEach(([x, y, z, radius], index) => {
    const dish = new THREE.Mesh(new THREE.CircleGeometry(radius, 10), index === 1 ? pale : hot);
    dish.position.set(x, y, z);
    group.add(dish);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.075, 5, 10), dark);
    rim.position.set(x, y, z + 0.025);
    group.add(rim);
  });

  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 0.26, 7), dark);
  foot.position.y = -1.27;
  group.add(foot);

  const spark = new THREE.PointLight(0xe63946, 1.7, 5);
  spark.position.set(-0.15, 1.42, 0.25);
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

  const shell = flatMaterial(0x111111);
  const inactive = flatMaterial(0x8b63b6);
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
  group.position.set(18, 5.15, -28.5);
  group.visible = false;

  const frameMaterial = flatMaterial(0x111111);
  const glowMaterial = flatMaterial(0xf3e34a, 0x9b5f1c);
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
    centerHeight: 2,
    halfHeight: 2.5,
  };
  return markInspectable(
    group,
    "Lost Entrance",
    "SCAN: A warm stair descends into the mountain behind the lavender ridge.",
    "Enter the lost entrance",
  );
}

export function createSecret(id, name, scanText, color) {
  const group = new THREE.Group();
  const glow = flatMaterial(color, color);
  const dark = flatMaterial(0x111111);

  const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.48, 0), glow);
  core.rotation.set(0.35, 0.2, 0.15);
  group.add(core);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.09, 5, 10), dark);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const light = new THREE.PointLight(color, 1.8, 6);
  group.add(light);

  group.userData.isSecret = true;
  group.userData.secretId = id;
  group.userData.floatPhase = id.length;
  return markInspectable(group, name, scanText, `Collect ${name}`);
}

export function createRocketPack() {
  const group = new THREE.Group();
  const shell = flatMaterial(0x111111);
  const flame = flatMaterial(0xf3e34a, 0x9b5f1c);
  const tank = flatMaterial(0x2ed9dd, 0x0a5f72);

  for (const x of [-0.28, 0.28]) {
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.95, 6), tank);
    cylinder.position.set(x, 0, 0);
    group.add(cylinder);

    const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.34, 6), shell);
    nozzle.position.set(x, -0.62, 0);
    nozzle.rotation.x = Math.PI;
    group.add(nozzle);

    const puff = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.42, 5), flame);
    puff.position.set(x, -0.95, 0);
    puff.rotation.x = Math.PI;
    group.add(puff);
  }

  const strap = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.18, 0.12), shell);
  strap.position.y = 0.15;
  group.add(strap);

  const light = new THREE.PointLight(0xf3e34a, 1.6, 6);
  light.position.y = -0.5;
  group.add(light);

  group.userData.isRocketPack = true;
  group.userData.floatPhase = 12.5;
  return markInspectable(
    group,
    "Rocket Pack",
    "SCAN: It coughs syrup-bright fire and wants to climb the impossible parts.",
    "Take rocket pack",
  );
}

export function createHeartGun() {
  const group = new THREE.Group();
  const dark = flatMaterial(0x111111);
  const pink = flatMaterial(0xff69c8, 0x8f245f);
  const pale = flatMaterial(0xf5b7c7, 0x5c2449);

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.42, 0.42), pink);
  group.add(body);

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.9, 7), dark);
  barrel.rotation.z = Math.PI / 2;
  barrel.position.x = 0.78;
  group.add(barrel);

  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.62, 0.28), dark);
  handle.position.set(-0.18, -0.42, 0);
  handle.rotation.z = -0.22;
  group.add(handle);

  for (const x of [-0.16, 0.14]) {
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.2, 7, 5), pale);
    lobe.position.set(x, 0.18, 0.24);
    group.add(lobe);
  }

  const point = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.36, 5), pale);
  point.position.set(0, -0.08, 0.24);
  point.rotation.x = Math.PI;
  group.add(point);

  const light = new THREE.PointLight(0xff69c8, 1.5, 6);
  light.position.set(0.25, 0.1, 0.35);
  group.add(light);

  group.userData.isHeartGun = true;
  group.userData.floatPhase = 18.5;
  return markInspectable(
    group,
    "Heart Gun",
    "SCAN: The barrel hums in valentine static. It paints whatever it loves.",
    "Take heart gun",
  );
}
