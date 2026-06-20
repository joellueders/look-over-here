import * as THREE from "three";
import {
  createAntenna,
  createDeadMachine,
  createExit,
  createSlimeBasin,
  createTrailSignal,
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
  return new THREE.Mesh(geometry, material(0xb7c69b));
}

function createCanyonWalls(scene) {
  const rockMaterials = [material(0xf27e55), material(0xf5b7c7), material(0x8b63b6)];
  const stratumMaterials = [material(0xdfc8b7), material(0xe63946), material(0xf3e34a)];

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

function createSun(scene) {
  const sun = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7.5, 1),
    new THREE.MeshBasicMaterial({ color: 0xf3e34a, fog: false }),
  );
  sun.position.set(-38, 38, -82);
  scene.add(sun);
}

function createCloudBanks(scene) {
  const cloudMaterials = [
    material(0xdfc8b7),
    material(0xf5b7c7),
    material(0xa9cdea),
  ];
  const banks = [
    [-38, 24, -70, 1.75],
    [35, 29, -80, 2.1],
    [-6, 43, -112, 2.7],
    [48, 20, -48, 1.45],
    [-28, 10, -49, 1.55],
    [25, 13, -64, 1.7],
  ];

  banks.forEach(([x, y, z, scale], bankIndex) => {
    const cloud = new THREE.Group();
    for (let i = 0; i < 8; i += 1) {
      const puff = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.8 + (i % 3) * 1.15, 1),
        cloudMaterials[(bankIndex + i) % cloudMaterials.length],
      );
      puff.position.set((i - 3.5) * 4.8, Math.sin(i * 1.7) * 1.7, Math.cos(i) * 2.6);
      puff.scale.y = 0.58;
      cloud.add(puff);
    }
    cloud.position.set(x, y, z);
    cloud.scale.setScalar(scale);
    cloud.userData.cloudOrigin = cloud.position.clone();
    cloud.userData.cloudPhase = bankIndex * 1.9;
    scene.add(cloud);
  });
}

function createValleyDepth(scene) {
  const valley = new THREE.Mesh(
    new THREE.PlaneGeometry(76, 54, 5, 5),
    material(0x8dd0a5),
  );
  valley.rotation.x = -Math.PI / 2;
  valley.position.set(0, -3.2, -62);
  scene.add(valley);

  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 58, 1, 8),
    material(0xa9cdea, 0x244f70),
  );
  river.rotation.x = -Math.PI / 2;
  river.rotation.z = -0.12;
  river.position.set(5, -3.05, -62);
  scene.add(river);

  [
    [-30, -61, 16, 22, 0x8b63b6],
    [3, -73, 19, 27, 0xa9cdea],
    [35, -65, 15, 20, 0xf5b7c7],
  ].forEach(([x, z, radius, height, color], index) => {
    const ridge = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 6),
      material(color),
    );
    ridge.position.set(x, height * 0.38 - 3, z);
    ridge.rotation.y = 0.35 + index * 0.85;
    ridge.scale.z = 0.62;
    scene.add(ridge);
  });
}

function createDistantLandmarks(scene) {
  const farSilhouette = material(0x8b63b6);
  const middleSilhouette = material(0xf5b7c7);
  const cliffFace = material(0xf27e55);
  const fadedStone = material(0xdfc8b7);

  [
    [-37, -46, 11, 21],
    [30, -52, 14, 27],
    [43, -33, 10, 20],
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
    [-42, -42, 12, 21],
    [0, -58, 16, 27],
    [42, -43, 12, 20],
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
    const arch = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.55, 5, 8, Math.PI), fadedStone);
    arch.position.set(x, 5.2, -39 + Math.abs(x) * 0.12);
    arch.rotation.y = Math.PI / 2;
    scene.add(arch);
  }
}

function createGreatMountain(scene) {
  const mountain = new THREE.Group();
  const shadow = material(0x8b63b6);
  const face = material(0xf27e55);
  const light = material(0xf5b7c7);
  const cap = material(0xdfc8b7);

  const back = new THREE.Mesh(new THREE.ConeGeometry(26, 58, 6), shadow);
  back.position.set(0, 22, 0);
  back.scale.z = 0.72;
  back.rotation.y = 0.32;
  mountain.add(back);

  const sunFace = new THREE.Mesh(new THREE.ConeGeometry(19, 48, 5), face);
  sunFace.position.set(-7, 18, 6);
  sunFace.scale.z = 0.64;
  sunFace.rotation.y = -0.2;
  mountain.add(sunFace);

  const shoulder = new THREE.Mesh(new THREE.ConeGeometry(14, 34, 5), light);
  shoulder.position.set(13, 11, 8);
  shoulder.scale.z = 0.72;
  shoulder.rotation.y = 0.55;
  mountain.add(shoulder);

  const summit = new THREE.Mesh(new THREE.ConeGeometry(7.4, 13, 5), cap);
  summit.position.set(-1.5, 45, -0.5);
  summit.scale.z = 0.68;
  mountain.add(summit);

  mountain.position.set(8, -2, -88);
  scene.add(mountain);
}

function createMountainStart(scene) {
  const mountain = new THREE.Group();
  const shadow = material(0x8b63b6);
  const face = material(0xf27e55);
  const grass = material(0x8dd0a5);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 11, 15, 6), shadow);
  base.position.y = 1.2;
  base.scale.z = 0.75;
  mountain.add(base);

  const facePlate = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 8.8, 10, 6), face);
  facePlate.position.set(2.2, 5.2, -0.4);
  facePlate.scale.z = 0.68;
  facePlate.rotation.z = -0.08;
  mountain.add(facePlate);

  const grassyCap = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 6.2, 0.7, 7), grass);
  grassyCap.position.set(2, 10.15, -0.2);
  grassyCap.scale.z = 0.74;
  mountain.add(grassyCap);

  mountain.position.set(-15, -3, 22);
  scene.add(mountain);
}

function createDriftingSporeCluster(scene) {
  const cluster = new THREE.Group();
  const hot = material(0xe63946, 0x8f245f);
  const cool = material(0x8dd0a5, 0x1d6f75);

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

  cluster.position.set(11, 11.5, -31);
  cluster.userData.curiosityOrigin = cluster.position.clone();
  scene.add(cluster);
}

function createTrail(scene) {
  const trailMaterials = [material(0xf3e34a), material(0xdfc8b7), material(0xf5b7c7)];
  const trailSurfaces = [
    [-12, 7.7, 20, 9.2, 7.2, -0.08, 0.01],
    [-8, 6.45, 16, 7.2, 5.1, 0.16, -0.02],
    [-3.5, 5.2, 12.8, 6.9, 4.7, -0.14, 0.025],
    [1, 4, 9.6, 7.2, 5.1, 0.12, -0.02],
    [4, 2.8, 5.2, 6.6, 4.5, -0.16, 0.02],
    [1, 1.55, 0.5, 6.7, 4.5, 0.14, -0.02],
    [-3, 0.45, -4.2, 6.4, 4.2, -0.12, 0.02],
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

function createSignalOverlook(scene) {
  const shelf = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8, 3.4, 0.72, 7),
    material(0xdfc8b7),
  );
  shelf.position.set(-8.2, 4.95, 9.8);
  shelf.scale.z = 0.78;
  shelf.rotation.y = -0.18;
  shelf.userData.walkableSurface = true;
  scene.add(shelf);

  const marker = new THREE.Mesh(
    new THREE.TorusGeometry(1.25, 0.16, 5, 10),
    material(0xf3e34a, 0x705f18),
  );
  marker.position.set(-8.2, 5.42, 9.8);
  marker.rotation.x = Math.PI / 2;
  scene.add(marker);

  return shelf;
}

function createExitApproach(scene) {
  const shelfMaterials = [material(0xf5b7c7), material(0xdfc8b7), material(0xf3e34a)];
  const surfaces = [
    [8, 0.55, -20, 5.8, 4.1, -0.12],
    [11.2, 1.5, -22.2, 5.6, 3.9, 0.14],
    [14.3, 2.45, -24.6, 5.4, 3.8, -0.12],
    [16.6, 3.4, -27, 5.3, 3.8, 0.1],
    [18, 4.65, -29, 7.2, 5.5, -0.08],
  ].map(([x, y, z, width, depth, rotation], index) => {
    const shelf = new THREE.Mesh(
      new THREE.CylinderGeometry(width * 0.44, width * 0.52, 0.62, 7),
      shelfMaterials[index % shelfMaterials.length],
    );
    shelf.scale.z = depth / width;
    shelf.position.set(x, y, z);
    shelf.rotation.y = rotation;
    shelf.userData.walkableSurface = true;
    scene.add(shelf);
    return shelf;
  });

  const hidingRidge = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 6.2, 11.5, 6),
    material(0x8b63b6),
  );
  hidingRidge.position.set(23, 4.4, -31);
  hidingRidge.scale.z = 0.72;
  hidingRidge.rotation.set(0, 0.2, -0.08);
  scene.add(hidingRidge);

  const coralShoulder = new THREE.Mesh(
    new THREE.CylinderGeometry(3.6, 5.2, 8.2, 6),
    material(0xf27e55),
  );
  coralShoulder.position.set(20.8, 3, -34);
  coralShoulder.scale.z = 0.65;
  coralShoulder.rotation.z = 0.08;
  scene.add(coralShoulder);

  return surfaces;
}

export function createWorld(scene) {
  scene.background = new THREE.Color(0x69b9e8);
  scene.fog = new THREE.Fog(0xa9cdea, 46, 132);

  scene.add(new THREE.HemisphereLight(0xa9cdea, 0x8b63b6, 2));
  const sunLight = new THREE.DirectionalLight(0xfff2b8, 2.25);
  sunLight.position.set(-12, 28, 10);
  scene.add(sunLight);

  const ground = createCanyonGround();
  scene.add(ground);
  createCanyonWalls(scene);
  createMountainStart(scene);
  createSun(scene);
  createCloudBanks(scene);
  createValleyDepth(scene);
  createDistantLandmarks(scene);
  createGreatMountain(scene);
  createDriftingSporeCluster(scene);
  const trailSurfaces = createTrail(scene);
  const signalOverlook = createSignalOverlook(scene);
  const exitApproachSurfaces = createExitApproach(scene);

  const objects = {
    trailSignal: createTrailSignal(),
    slimeBasin: createSlimeBasin(),
    watchingStones: createWatchingStones(),
    antenna: createAntenna(),
    machine: createDeadMachine(),
    exit: createExit(),
  };

  Object.values(objects).forEach((object) => scene.add(object));

  const colliders = [
    { x: -18, z: -5, radius: 5.1 },
    { x: 5, z: -17, radius: 2.9 },
    { x: -15, z: 22, radius: 7.2, top: 7.7, unstuck: true },
    { x: 15, z: -28.5, radius: 0.9, top: 10.2, unstuck: true },
    { x: 21, z: -28.5, radius: 0.9, top: 10.2, unstuck: true },
    { x: 23, z: -31, radius: 3.6, top: 10.2, unstuck: true },
    ...Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      return { x: 17 + Math.cos(angle) * 4, z: -10 + Math.sin(angle) * 4, radius: 0.85 };
    }),
  ];
  const walkableSurfaces = [
    ground,
    ...trailSurfaces,
    signalOverlook,
    ...exitApproachSurfaces,
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
    if (object.userData.cloudOrigin) {
      const origin = object.userData.cloudOrigin;
      object.position.x = origin.x + Math.sin(elapsed * 0.08 + object.userData.cloudPhase) * 3.5;
    }
  });
}
