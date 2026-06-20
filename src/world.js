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

function createCanyonGround() {
  const geometry = new THREE.PlaneGeometry(70, 72, 8, 10);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const noise = Math.sin(x * 0.42) * 0.32 + Math.cos(y * 0.37) * 0.26;
    const canyonShoulder = Math.max(0, Math.abs(x) - 17) * 0.16;
    const landingRise = Math.max(0, y - 20) * 0.08;
    positions.setZ(i, noise + canyonShoulder + landingRise);
  }

  geometry.computeVertexNormals();
  geometry.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geometry, material(0x6a3b68));
}

function createCanyonWalls(scene) {
  const rockMaterials = [material(0x8e526f), material(0xa96277), material(0x714365)];
  const stratumMaterials = [material(0xc7797a), material(0x92516e), material(0xb96a78)];

  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i += 1) {
      const width = 7.5 + (i % 3) * 1.2;
      const height = 7 + (i % 3) * 2.1;
      const depthScale = 0.72 + (i % 2) * 0.16;
      const formation = new THREE.Group();
      const lower = new THREE.Mesh(
        new THREE.CylinderGeometry(width * 0.42, width * 0.58, height, 6),
        rockMaterials[(i + (side > 0 ? 1 : 0)) % rockMaterials.length],
      );
      lower.scale.z = depthScale;
      lower.position.y = height * 0.5;
      formation.add(lower);

      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(width * 0.3, width * 0.45, height * 0.52, 6),
        rockMaterials[(i + 1) % rockMaterials.length],
      );
      cap.scale.z = depthScale * 0.82;
      cap.position.set(side * 0.45, height * 1.04, (i % 2 ? -1 : 1) * 0.45);
      cap.rotation.y = 0.22;
      formation.add(cap);

      for (let band = 0; band < 2; band += 1) {
        const stratum = new THREE.Mesh(
          new THREE.CylinderGeometry(width * (0.48 - band * 0.06), width * 0.5, 0.42, 6),
          stratumMaterials[(i + band) % stratumMaterials.length],
        );
        stratum.scale.z = depthScale * (0.92 - band * 0.08);
        stratum.position.y = 2.2 + band * (height * 0.45);
        stratum.rotation.y = band * 0.17;
        formation.add(stratum);
      }

      formation.position.set(side * (24.5 + (i % 2) * 2.2), -0.4, 21 - i * 8.7);
      formation.rotation.set(0, side * (0.1 + i * 0.035), side * (i % 2 ? 0.035 : -0.025));
      scene.add(formation);
    }
  }
}

function createFloatingRocks(scene) {
  const rockMaterials = [material(0x754879), material(0x4c315d)];

  for (let i = 0; i < 8; i += 1) {
    const rock = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1 + (i % 3) * 0.5, 0),
      rockMaterials[i % rockMaterials.length],
    );
    rock.position.set(-24 + i * 7, 8 + (i % 4) * 2.2, -18 - (i % 2) * 8);
    rock.rotation.set(i, i * 0.4, i * 0.7);
    rock.userData.floatPhase = i * 0.8;
    scene.add(rock);
  }
}

function createMoon(scene) {
  const moon = new THREE.Mesh(
    new THREE.IcosahedronGeometry(5.5, 0),
    new THREE.MeshBasicMaterial({ color: 0xffd37f, fog: false }),
  );
  moon.position.set(-26, 25, -48);
  scene.add(moon);
}

function createDistantLandmarks(scene) {
  const farSilhouette = material(0x59345f);
  const middleSilhouette = material(0x713f72);
  const cliffFace = material(0xa96277);
  const fadedBone = material(0xd7a58f);

  [
    [-37, -46, 11, 21],
    [30, -52, 14, 27],
    [43, -24, 10, 20],
    [-45, -18, 9, 18],
  ].forEach(([x, z, width, height], index) => {
    const mesa = new THREE.Mesh(
      new THREE.CylinderGeometry(width * 0.62, width, height, 5),
      index === 2 ? middleSilhouette : farSilhouette,
    );
    mesa.position.set(x, height * 0.42 - 1, z);
    mesa.rotation.y = index * 0.7;
    scene.add(mesa);

    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.82, 2.2, width * 0.56),
      index === 2 ? middleSilhouette : farSilhouette,
    );
    crown.position.set(x, height * 0.82 - 1, z);
    crown.rotation.y = mesa.rotation.y;
    scene.add(crown);
  });

  [
    [-41, -43, 10, 18],
    [-28, -50, 12, 23],
    [-13, -57, 11, 20],
    [3, -60, 15, 26],
    [20, -56, 11, 19],
    [34, -48, 13, 22],
    [45, -38, 10, 17],
  ].forEach(([x, z, radius, height], index) => {
    const ridge = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 5),
      index % 2 ? farSilhouette : middleSilhouette,
    );
    ridge.position.set(x, height * 0.42 - 2, z);
    ridge.rotation.y = index * 0.73;
    ridge.scale.z = 0.58;
    scene.add(ridge);
  });

  for (const side of [-1, 1]) {
    const cliff = new THREE.Mesh(
      new THREE.CylinderGeometry(6.2, 9.4, 12, 6),
      cliffFace,
    );
    cliff.position.set(side * 35, 4.4, 8);
    cliff.scale.z = 0.52;
    cliff.rotation.set(0, side * 0.18, side * 0.06);
    scene.add(cliff);
  }

  for (const x of [-31, 25]) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.55, 5, 8, Math.PI), fadedBone);
    arch.position.set(x, 5.2, -39 + Math.abs(x) * 0.12);
    arch.rotation.y = Math.PI / 2;
    scene.add(arch);
  }
}

function createDriftingSporeCluster(scene) {
  const cluster = new THREE.Group();
  const hot = material(0xff74c8, 0x8f245f);
  const cool = material(0x72f2e5, 0x1d6f75);

  for (let i = 0; i < 7; i += 1) {
    const spore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.28 + (i % 3) * 0.12, 0),
      i % 2 ? hot : cool,
    );
    spore.position.set(
      Math.cos(i * 2.3) * (0.75 + (i % 2) * 0.35),
      Math.sin(i * 1.7) * 0.65,
      Math.sin(i * 2.3) * (0.75 + (i % 2) * 0.35),
    );
    cluster.add(spore);
  }

  cluster.position.set(10.5, 9.4, -28);
  cluster.userData.curiosityOrigin = cluster.position.clone();
  scene.add(cluster);
}

function createTrail(scene) {
  const trailMaterials = [material(0xc47a75), material(0xb96b70), material(0xd08a7b)];
  const trailSurfaces = [
    [-3.5, 0.18, 10.5, 5.8, 4.4, -0.12, 0.025],
    [-7.4, 0.34, 6.4, 6.5, 4.1, 0.18, -0.02],
    [-10.4, 0.5, 1.7, 6.1, 3.9, -0.16, 0.03],
    [-7.4, 0.66, -3.1, 6.7, 4, 0.16, -0.025],
    [-10.9, 0.82, -8.1, 6.5, 3.8, -0.17, 0.02],
    [-8.4, 0.98, -13, 6.4, 3.7, 0.16, -0.025],
    [-11.1, 1.14, -17.5, 5.9, 3.5, -0.12, 0.02],
  ].map(([x, y, z, width, depth, rotation, tilt], index) => {
    const shelf = new THREE.Mesh(
      new THREE.CylinderGeometry(width * 0.44, width * 0.52, 0.62, 7),
      trailMaterials[index % trailMaterials.length],
    );
    shelf.scale.z = depth / width;
    shelf.position.set(x, y, z);
    shelf.rotation.set(tilt, rotation, tilt * 0.45);
    shelf.userData.walkableSurface = true;
    scene.add(shelf);
    return shelf;
  });

  return trailSurfaces;
}

function createVistaPerch(scene) {
  const perch = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4, 4.15, 1.05, 7),
    material(0xc77a75),
  );
  perch.position.set(12.1, 7.4, -25.6);
  perch.scale.z = 0.78;
  perch.rotation.set(0.025, -0.18, -0.025);
  perch.userData.walkableSurface = true;
  scene.add(perch);

  const ridge = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 5.8, 6.5, 6),
    material(0x8e526f),
  );
  ridge.position.set(17.3, 3, -28.2);
  ridge.scale.z = 0.72;
  ridge.rotation.set(0, 0.2, -0.08);
  scene.add(ridge);

  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(4.5, 4.7, 0.48, 6),
    material(0xd08a7b),
  );
  rim.position.set(16.9, 6.25, -28);
  rim.scale.z = 0.7;
  rim.rotation.y = 0.2;
  scene.add(rim);

  return perch;
}

export function createWorld(scene) {
  scene.background = new THREE.Color(0xd887b5);
  scene.fog = new THREE.Fog(0xd887b5, 18, 78);

  scene.add(new THREE.HemisphereLight(0xffd3df, 0x362046, 1.7));
  const moonLight = new THREE.DirectionalLight(0xffe29a, 2.15);
  moonLight.position.set(-12, 28, 10);
  scene.add(moonLight);

  const ground = createCanyonGround();
  scene.add(ground);
  createCanyonWalls(scene);
  createFloatingRocks(scene);
  createMoon(scene);
  createDistantLandmarks(scene);
  createDriftingSporeCluster(scene);
  const trailSurfaces = createTrail(scene);
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
  const walkableSurfaces = [
    ground,
    ...trailSurfaces,
    vistaPerch,
    ...objects.fossil.userData.walkableSurfaces,
  ];

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
    if (object.userData.curiosityOrigin) {
      const origin = object.userData.curiosityOrigin;
      object.position.set(
        origin.x + Math.sin(elapsed * 0.52) * 3.2,
        origin.y + Math.sin(elapsed * 1.7) * 0.7,
        origin.z + Math.cos(elapsed * 0.52) * 1.8,
      );
      object.rotation.y = elapsed * 0.8;
    }
  });
}
