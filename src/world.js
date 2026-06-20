import * as THREE from "three";
import {
  createAntenna,
  createDeadMachine,
  createExit,
  createFossilSpine,
  createSlimeBasin,
  createWatchingStones,
} from "./landmarks.js";

const material = (color, emissive = 0x000000) =>
  new THREE.MeshStandardMaterial({ color, emissive, flatShading: true, roughness: 0.95 });

function createCraterGround() {
  const geometry = new THREE.CircleGeometry(42, 18);
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
  return new THREE.Mesh(geometry, material(0x272332));
}

function createCraterRim(scene) {
  const rockMaterial = material(0x211d2b);

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
  const rockMaterial = material(0x393044);

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
    new THREE.IcosahedronGeometry(9, 1),
    new THREE.MeshBasicMaterial({ color: 0xff93b5, fog: false }),
  );
  moon.position.set(-28, 24, -60);
  scene.add(moon);
}

export function createWorld(scene) {
  scene.background = new THREE.Color(0xd793a8);
  scene.fog = new THREE.Fog(0xd793a8, 18, 72);

  scene.add(new THREE.HemisphereLight(0xffd1bf, 0x27213c, 1.8));
  const moonLight = new THREE.DirectionalLight(0xfff0bd, 2.4);
  moonLight.position.set(-12, 28, 10);
  scene.add(moonLight);

  scene.add(createCraterGround());
  createCraterRim(scene);
  createFloatingRocks(scene);
  createMoon(scene);

  const objects = {
    fossil: createFossilSpine(),
    slimeBasin: createSlimeBasin(),
    watchingStones: createWatchingStones(),
    antenna: createAntenna(),
    machine: createDeadMachine(),
    exit: createExit(),
  };

  Object.values(objects).forEach((object) => scene.add(object));
  return objects;
}

export function animateWorld(scene, elapsed) {
  scene.traverse((object) => {
    if (object.userData.floatPhase !== undefined) {
      object.position.y += Math.sin(elapsed * 1.25 + object.userData.floatPhase) * 0.002;
      object.rotation.y += 0.0015;
    }
  });
}
