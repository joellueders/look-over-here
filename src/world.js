import * as THREE from "three";
import {
  createAntenna,
  createDeadMachine,
  createExit,
  createFossilSpine,
  createSlimeBasin,
  createSpineSignal,
  createWatchingStones,
} from "./landmarks.js";

const material = (color, emissive = 0x000000) =>
  new THREE.MeshStandardMaterial({ color, emissive, flatShading: true, roughness: 0.95 });

function createCraterGround() {
  const geometry = new THREE.CircleGeometry(42, 14);
  const positions = geometry.attributes.position;

  for (let i = 1; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const distance = Math.hypot(x, y);
    const noise = Math.sin(x * 0.42) * 0.32 + Math.cos(y * 0.37) * 0.26;
    positions.setZ(i, noise + Math.max(0, distance - 29) * 0.24);
  }

  geometry.computeVertexNormals();
  geometry.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geometry, material(0x25202a));
}

function createCraterRim(scene) {
  const rockMaterial = material(0x1d1922);

  for (let i = 0; i < 30; i += 1) {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 36 + Math.sin(i * 4.2) * 2.5;
    const rock = new THREE.Mesh(
      new THREE.ConeGeometry(2.8 + (i % 3), 8 + (i % 5), 5),
      rockMaterial,
    );
    rock.position.set(Math.cos(angle) * radius, 2.5, Math.sin(angle) * radius);
    rock.rotation.set(Math.sin(i) * 0.15, angle, Math.cos(i * 0.7) * 0.13);
    scene.add(rock);
  }
}

function createFloatingRocks(scene) {
  const rockMaterial = material(0x342b3a);

  for (let i = 0; i < 8; i += 1) {
    const rock = new THREE.Mesh(new THREE.OctahedronGeometry(1.1 + (i % 3) * 0.5, 0), rockMaterial);
    rock.position.set(-24 + i * 7, 8 + (i % 4) * 2.2, -18 - (i % 2) * 8);
    rock.rotation.set(i, i * 0.4, i * 0.7);
    rock.userData.floatPhase = i * 0.8;
    scene.add(rock);
  }
}

function createMoon(scene) {
  const moon = new THREE.Mesh(
    new THREE.IcosahedronGeometry(9, 0),
    new THREE.MeshBasicMaterial({ color: 0xd9b26f, fog: false }),
  );
  moon.position.set(-18, 22, -35);
  scene.add(moon);
}

function createDistantLandmarks(scene) {
  const silhouette = material(0x17141c);
  const fadedBone = material(0x746b55);

  [
    [-31, -30, 7, 19],
    [28, -34, 9, 24],
    [37, 4, 6, 17],
  ].forEach(([x, z, width, height], index) => {
    const mesa = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.55, width, height, 5), silhouette);
    mesa.position.set(x, height * 0.42 - 1, z);
    mesa.rotation.y = index * 0.7;
    scene.add(mesa);

    const brokenTower = new THREE.Mesh(new THREE.BoxGeometry(1.8, height * 0.75, 1.8), silhouette);
    brokenTower.position.set(x + width * 0.45, height * 0.7, z - 1);
    brokenTower.rotation.z = (index - 1) * 0.08;
    scene.add(brokenTower);
  });

  for (const x of [-29, -23, 23]) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.55, 5, 8, Math.PI), fadedBone);
    arch.position.set(x, 4.2, -30 + Math.abs(x) * 0.16);
    arch.rotation.y = Math.PI / 2;
    scene.add(arch);
  }
}

function createVistaPerch(scene) {
  const perch = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.65, 3.2), material(0x342b3a));
  perch.position.set(12.3, 7.7, -25.8);
  perch.rotation.y = -0.18;
  perch.userData.walkableSurface = true;
  scene.add(perch);
  return perch;
}

export function createWorld(scene) {
  scene.background = new THREE.Color(0xb99a72);
  scene.fog = new THREE.Fog(0xb99a72, 10, 48);

  scene.add(new THREE.HemisphereLight(0xe8cf98, 0x211c2b, 1.55));
  const moonLight = new THREE.DirectionalLight(0xffdda0, 2.1);
  moonLight.position.set(-12, 28, 10);
  scene.add(moonLight);

  const ground = createCraterGround();
  scene.add(ground);
  createCraterRim(scene);
  createFloatingRocks(scene);
  createMoon(scene);
  createDistantLandmarks(scene);
  const vistaPerch = createVistaPerch(scene);

  const objects = {
    fossil: createFossilSpine(),
    spineSignal: createSpineSignal(),
    slimeBasin: createSlimeBasin(),
    watchingStones: createWatchingStones(),
    antenna: createAntenna(),
    machine: createDeadMachine(),
    exit: createExit(),
  };

  Object.values(objects).forEach((object) => scene.add(object));

  const fossilColliders = Array.from({ length: 8 }, (_, i) => ({
    x: -13 + i * 3.25,
    z: -25,
    radius: 1.35,
    top: 4.4 + Math.sin(i * 0.7) * 1.1,
    unstuck: true,
  }));
  const stepColliders = objects.fossil.userData.walkableSurfaces.map((step) => ({
    x: step.position.x,
    z: step.position.z,
    radius: 1.05,
    top: step.position.y + 0.23,
    unstuck: true,
  }));
  const colliders = [
    { x: -18, z: -5, radius: 5.1 },
    { x: 5, z: -17, radius: 2.9 },
    { x: -3, z: -29, radius: 0.9 },
    { x: 3, z: -29, radius: 0.9 },
    ...fossilColliders,
    ...stepColliders,
    ...Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      return { x: 17 + Math.cos(angle) * 4, z: -10 + Math.sin(angle) * 4, radius: 0.85 };
    }),
  ];
  const walkableSurfaces = [ground, vistaPerch, ...objects.fossil.userData.walkableSurfaces];

  return { ...objects, ground, colliders, walkableSurfaces };
}

export function animateWorld(scene, elapsed) {
  scene.traverse((object) => {
    if (object.userData.floatPhase !== undefined) {
      object.position.y += Math.sin(elapsed * 1.25 + object.userData.floatPhase) * 0.002;
      object.rotation.y += 0.0015;
    }
    if (object.userData.signalOrigin) {
      const origin = object.userData.signalOrigin;
      object.position.set(
        origin.x + Math.cos(elapsed * 1.4) * 1.15,
        origin.y + Math.sin(elapsed * 2.2) * 0.35,
        origin.z + Math.sin(elapsed * 1.4) * 1.15,
      );
      object.rotation.y = elapsed * 1.8;
    }
  });
}
