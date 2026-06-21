import * as THREE from "three";

const STAR_COUNT = 10;
const TERRAIN_SIZE = 420;
const TERRAIN_SEGMENTS = 128;
const WORLD_LIMIT = 198;

const WORLD_TYPES = [
  {
    id: "alpine",
    name: "Alpine Basin",
    themeName: "Powder Cloud Alpine",
    scanText: "A broad basin lies below the spawn ridge. Climb the western and eastern shoulders to find the high snow shelf.",
    sky: [0x4c91c6, 0x94cce4, 0xf1dbe3],
    fog: 0xd9e2ea,
    terrain: [0x739c8a, 0xa9c2aa, 0xd9d4c5, 0xc9cde0],
    rock: [0x7182a8, 0x8a76a4, 0xa8afbd],
    accent: [0xf6ecef, 0xd8e8f0, 0xcdbbdc],
    clouds: [0xffffff, 0xe6edf3, 0xe9dfea],
    cloudProfile: "basin",
    aweSpawns: [
      [0, 142, 0, -70, "alpine overlook"],
      [-42, 132, 16, -58, "western ridge"],
      [44, 132, -14, -62, "eastern ridge"],
    ],
    stars: [
      ["easy", -38, 92], ["easy", 43, 78],
      ["side", -112, 30], ["side", 105, 22],
      ["high", -72, -89], ["high", 66, -116],
      ["low", -34, 8], ["low", 38, -20],
      ["landmark", 0, -72], ["hidden", -8, -157],
    ],
  },
  {
    id: "canyon",
    name: "Canyon Maze",
    themeName: "Rose Painted Canyon",
    scanText: "Wide canyon rooms split around painted walls. Follow lower washes or climb shelves to cross the north canyon.",
    sky: [0x568fc5, 0x91c9e2, 0xf1b8b0],
    fog: 0xe3c0ba,
    terrain: [0xc77c68, 0xe0aa8e, 0xd8b5a8, 0xb9859b],
    rock: [0xc86761, 0xa66f7f, 0x86658d],
    accent: [0xf3e34a, 0xf5b7c7, 0xdfc8b7],
    clouds: [0xfff1e7, 0xf4d8df, 0xe6d9e9],
    cloudProfile: "open",
    aweSpawns: [
      [-8, 147, 0, 5, "canyon rim"],
      [-58, 136, -8, -25, "western rim"],
      [57, 136, -12, -28, "eastern rim"],
    ],
    stars: [
      ["easy", -54, 91], ["easy", 52, 83],
      ["side", -106, 25], ["side", 104, 16],
      ["high", -73, -102], ["high", 70, -119],
      ["low", -25, 18], ["low", 31, -35],
      ["landmark", -58, -61], ["hidden", 3, -165],
    ],
  },
  {
    id: "lake",
    name: "Lake Highlands",
    themeName: "Mint Lake Country",
    scanText: "The lake basin is low and open. Shore hills lead to gardens, waterfall shelves, and the hidden north cove.",
    sky: [0x5a9fc9, 0x9bd6df, 0xf4d8cb],
    fog: 0xc9dfdb,
    terrain: [0x76aa8e, 0xa9c8a8, 0xd8c9ad, 0xb6a5bd],
    rock: [0x71978b, 0x7896a2, 0x967d9e],
    accent: [0xa8d9e1, 0xf5b7c7, 0xf3e34a],
    clouds: [0xffffff, 0xe1f0ed, 0xf2e2e8],
    cloudProfile: "coast",
    aweSpawns: [
      [0, 151, 0, 12, "lake cliff"],
      [-58, 137, 0, 18, "western shore overlook"],
      [59, 137, 0, 18, "eastern shore overlook"],
    ],
    stars: [
      ["easy", -55, 93], ["easy", 57, 88],
      ["side", -122, 15], ["side", 119, 12],
      ["high", -85, -91], ["high", 88, -82],
      ["low", -34, 20], ["low", 35, -5],
      ["landmark", 0, -69], ["hidden", 3, -151],
    ],
  },
  {
    id: "forest",
    name: "Forest Canopy",
    themeName: "Fernlight Tree Country",
    scanText: "Giant trunks hide a second route overhead. Follow either root ramp into the connected treehouse canopy.",
    sky: [0x4f8d91, 0x91c5ad, 0xf0d7ae],
    fog: 0xb9cfb1,
    terrain: [0x477b59, 0x79a866, 0xb7c77a, 0x8f775f],
    rock: [0x536c57, 0x6f6758, 0x8d7d66],
    accent: [0xf1cf6b, 0xd88872, 0x9fd8bb],
    clouds: [0xeaf0cf, 0xd9e5c7, 0xf0d8bf],
    cloudProfile: "forest",
    aweSpawns: [
      [0, 146, 0, -82, "canopy clearing"],
      [-42, 133, -18, -76, "western tree line"],
      [43, 133, 18, -76, "eastern tree line"],
    ],
    stars: [
      ["easy", -36, 96], ["easy", 43, 84],
      ["side", -116, 18], ["side", 112, 12],
      ["high", -52, -60, "canopy"],
      ["low", -18, 28],
      ["hidden", 8, -93, "fixed"], ["hidden", 86, -24],
      ["landmark", 5, -89, "canopy"],
      ["reward", 53, -63, "canopy"],
    ],
  },
  {
    id: "cloud",
    name: "Cloud Ridge",
    themeName: "Lavender Cloud Coast",
    scanText: "High ridges divide a low cloud valley. Side shelves descend beneath the arch ridge before the final crown.",
    sky: [0x657fb7, 0xa7bcdd, 0xe7c4da],
    fog: 0xcbbdd5,
    terrain: [0x887b9b, 0xb6a5b3, 0xdcc9bc, 0x9fb1c8],
    rock: [0x796399, 0x9d7192, 0xbc7e85],
    accent: [0xdfc8b7, 0xf5b7c7, 0xa9cdea],
    clouds: [0xf9eef5, 0xdedced, 0xf0dbe1],
    cloudProfile: "ridge",
    aweSpawns: [
      [-82, 143, -4, 20, "cloud ridge"],
      [80, 139, 4, 18, "eastern cloud ridge"],
      [-45, 149, 5, 8, "high cloud shelf"],
    ],
    stars: [
      ["easy", -68, 91], ["easy", -7, 82],
      ["side", -119, 15], ["side", 112, 9],
      ["high", -57, -89], ["high", 62, -127],
      ["low", -20, 61], ["low", 39, 46],
      ["landmark", -61, -49], ["hidden", -44, -158],
    ],
  },
];

const paintedMaterial = (color, options = {}) =>
  new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: Boolean(options.transparent),
    opacity: options.opacity ?? 1,
    depthWrite: options.depthWrite ?? true,
    fog: options.fog ?? true,
  });

function solidMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 1,
    metalness: 0,
  });
}

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function range(random, minimum, maximum) {
  return minimum + (maximum - minimum) * random();
}

function pick(random, values) {
  return values[Math.floor(random() * values.length)];
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function gaussian(x, z, centerX, centerZ, radiusX, radiusZ, amplitude) {
  const dx = (x - centerX) / radiusX;
  const dz = (z - centerZ) / radiusZ;
  return Math.exp(-(dx * dx + dz * dz) * 2) * amplitude;
}

function distanceToSegment(x, z, ax, az, bx, bz) {
  const abX = bx - ax;
  const abZ = bz - az;
  const lengthSquared = abX * abX + abZ * abZ;
  const t = clamp01(((x - ax) * abX + (z - az) * abZ) / lengthSquared);
  return Math.hypot(x - (ax + abX * t), z - (az + abZ * t));
}

function ridgeAlongSegment(x, z, ax, az, bx, bz, width, amplitude) {
  const distance = distanceToSegment(x, z, ax, az, bx, bz);
  return Math.exp(-(distance * distance) / (width * width)) * amplitude;
}

function seededNoise(x, z, phases) {
  return Math.sin(x * 0.031 + phases[0]) * 1.3
    + Math.cos(z * 0.027 + phases[1]) * 1.1
    + Math.sin((x + z) * 0.016 + phases[2]) * 1.6
    + Math.cos((x - z) * 0.021 + phases[3]) * 0.8;
}

function naturalBoundary(x, z) {
  const radial = Math.hypot(x / 1.04, z);
  return smoothstep(166, 207, radial) * 24;
}

function alpineHeight(x, z, phases) {
  let height = 9 + seededNoise(x, z, phases) * 0.52;
  height += naturalBoundary(x, z);
  height -= gaussian(x, z, 0, 22, 86, 76, 17);
  height += ridgeAlongSegment(x, z, -136, 55, -45, -120, 31, 24);
  height += ridgeAlongSegment(x, z, 136, 48, 48, -130, 32, 22);
  height += gaussian(x, z, 0, -82, 62, 44, 20);
  height += gaussian(x, z, -72, -105, 45, 38, 19);
  height += gaussian(x, z, 72, -126, 48, 38, 17);
  height -= gaussian(x, z, 0, -157, 48, 35, 11);
  return height;
}

function canyonHeight(x, z, phases) {
  let height = 14 + seededNoise(x, z, phases) * 0.58;
  height += naturalBoundary(x, z) * 0.9;
  height += ridgeAlongSegment(x, z, -112, 130, -84, -145, 25, 20);
  height += ridgeAlongSegment(x, z, 112, 127, 85, -148, 27, 19);
  height += ridgeAlongSegment(x, z, -23, 92, 12, -153, 24, 15);
  height -= ridgeAlongSegment(x, z, -5, 145, -28, -153, 31, 14);
  height -= ridgeAlongSegment(x, z, -84, 76, 71, 52, 30, 9);
  height -= ridgeAlongSegment(x, z, -72, -43, 76, -72, 31, 8);
  height += gaussian(x, z, -76, -104, 45, 37, 15);
  height += gaussian(x, z, 73, -119, 47, 38, 16);
  height -= gaussian(x, z, 0, -165, 45, 35, 11);
  return height;
}

function lakeHeight(x, z, phases) {
  let height = 11 + seededNoise(x, z, phases) * 0.45;
  height += naturalBoundary(x, z) * 0.72;
  height -= gaussian(x, z, 0, 18, 91, 75, 16);
  height += ridgeAlongSegment(x, z, -145, 38, -73, -123, 34, 17);
  height += ridgeAlongSegment(x, z, 145, 38, 78, -122, 34, 18);
  height += gaussian(x, z, 0, -72, 67, 44, 21);
  height += gaussian(x, z, -88, -93, 47, 37, 17);
  height += gaussian(x, z, 91, -84, 47, 37, 18);
  height -= gaussian(x, z, -145, 67, 35, 31, 8);
  height -= gaussian(x, z, 145, 65, 35, 31, 8);
  height -= gaussian(x, z, 0, -151, 44, 34, 10);
  return height;
}

function forestHeight(x, z, phases) {
  let height = 10 + seededNoise(x, z, phases) * 0.38;
  height += naturalBoundary(x, z) * 0.76;
  height -= gaussian(x, z, 0, 12, 108, 96, 8);
  height += ridgeAlongSegment(x, z, -152, 82, -48, -132, 38, 13);
  height += ridgeAlongSegment(x, z, 151, 75, 51, -136, 38, 13);
  height += ridgeAlongSegment(x, z, -86, 40, 85, -28, 22, 7);
  height += gaussian(x, z, -58, -64, 37, 34, 9);
  height += gaussian(x, z, 58, -67, 37, 34, 10);
  height -= gaussian(x, z, 0, -93, 46, 39, 9);
  height -= gaussian(x, z, -118, 15, 33, 31, 7);
  height -= gaussian(x, z, 116, 10, 33, 31, 7);
  return height;
}

function cloudHeight(x, z, phases) {
  let height = 13 + seededNoise(x, z, phases) * 0.5;
  height += naturalBoundary(x, z) * 0.82;
  height += ridgeAlongSegment(x, z, -128, 150, -52, -143, 32, 23);
  height += ridgeAlongSegment(x, z, 56, 122, 76, -159, 33, 21);
  height += ridgeAlongSegment(x, z, -43, 65, 8, -119, 28, 18);
  height -= gaussian(x, z, -4, 71, 68, 54, 18);
  height -= gaussian(x, z, -138, -42, 38, 32, 11);
  height += gaussian(x, z, 0, -112, 57, 40, 22);
  height += gaussian(x, z, 67, -137, 43, 34, 16);
  height += gaussian(x, z, -60, -91, 42, 34, 17);
  return height;
}

const HEIGHT_FUNCTIONS = {
  alpine: alpineHeight,
  canyon: canyonHeight,
  forest: forestHeight,
  lake: lakeHeight,
  cloud: cloudHeight,
};

function createTerrainSampler(worldType, seed) {
  const random = createRandom(`${seed}:${worldType.id}:heightfield`);
  const phases = Array.from({ length: 4 }, () => range(random, 0, Math.PI * 2));
  const heightFunction = HEIGHT_FUNCTIONS[worldType.id];
  return {
    phases,
    heightAt(x, z) {
      return heightFunction(x, z, phases);
    },
  };
}

function localRelief(sampler, x, z, radius = 7) {
  const center = sampler.heightAt(x, z);
  const samples = [
    sampler.heightAt(x + radius, z),
    sampler.heightAt(x - radius, z),
    sampler.heightAt(x, z + radius),
    sampler.heightAt(x, z - radius),
  ];
  return Math.max(...samples.map((height) => Math.abs(height - center)));
}

function vistaClearance(sampler, spawnX, spawnZ, lookX, lookZ) {
  const spawnY = sampler.heightAt(spawnX, spawnZ) + 1.7;
  const lookY = sampler.heightAt(lookX, lookZ) + 8;
  let clearance = 0;
  for (let step = 1; step <= 7; step += 1) {
    const t = step / 8;
    const x = THREE.MathUtils.lerp(spawnX, lookX, t);
    const z = THREE.MathUtils.lerp(spawnZ, lookZ, t);
    const sightlineY = THREE.MathUtils.lerp(spawnY, lookY, t);
    clearance += Math.min(8, sightlineY - sampler.heightAt(x, z));
  }
  return clearance;
}

function chooseAweSpawn(worldType, sampler, random) {
  const candidates = worldType.aweSpawns.map(([x, z, lookX, lookZ, type]) => {
    const height = sampler.heightAt(x, z);
    const nearbyAverage = [
      sampler.heightAt(x + 28, z),
      sampler.heightAt(x - 28, z),
      sampler.heightAt(x, z + 28),
      sampler.heightAt(x, z - 28),
    ].reduce((sum, value) => sum + value, 0) / 4;
    const relief = localRelief(sampler, x, z);
    const clearance = vistaClearance(sampler, x, z, lookX, lookZ);
    const nearestStar = Math.min(...worldType.stars.map(([, starX, starZ]) =>
      Math.hypot(starX - x, starZ - z)));
    const stableSurface = relief <= 4.8;
    const unclutteredStart = nearestStar >= 34;
    const score = (height - nearbyAverage) * 1.5
      + clearance * 0.4
      - relief * 2.4
      + (stableSurface ? 18 : -30)
      + (unclutteredStart ? 12 : -18)
      + range(random, 0, 4);
    return { x, z, lookX, lookZ, type, score, stableSurface };
  });
  const validCandidates = candidates.filter((candidate) => candidate.stableSurface);
  return (validCandidates.length ? validCandidates : candidates)
    .sort((a, b) => b.score - a.score)[0];
}

function terrainColor(worldType, height, normalY) {
  const slope = 1 - normalY;
  const low = new THREE.Color(worldType.terrain[0]);
  const middle = new THREE.Color(worldType.terrain[1]);
  const high = new THREE.Color(worldType.terrain[2]);
  const rock = new THREE.Color(worldType.rock[0]);
  let color;
  if (height < 2) color = low;
  else if (height < 18) color = low.clone().lerp(middle, smoothstep(2, 18, height));
  else color = middle.clone().lerp(high, smoothstep(18, 38, height));
  if (slope > 0.08) color.lerp(rock, smoothstep(0.08, 0.28, slope) * 0.68);
  return color;
}

function createHeightfield(scene, worldType, sampler) {
  const geometry = new THREE.PlaneGeometry(
    TERRAIN_SIZE,
    TERRAIN_SIZE,
    TERRAIN_SEGMENTS,
    TERRAIN_SEGMENTS,
  );
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    positions.setY(index, sampler.heightAt(positions.getX(index), positions.getZ(index)));
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();

  const colors = [];
  const normals = geometry.attributes.normal;
  for (let index = 0; index < positions.count; index += 1) {
    const color = terrainColor(worldType, positions.getY(index), normals.getY(index));
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const terrain = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      metalness: 0,
    }),
  );
  terrain.userData.walkableSurface = true;
  terrain.userData.terrainKind = "heightfield";
  scene.add(terrain);
  return terrain;
}

function createSky(scene, worldType) {
  const [topColor, middleColor, horizonColor] = worldType.sky;
  scene.background = new THREE.Color(middleColor);
  scene.fog = new THREE.Fog(worldType.fog, 180, 455);
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(470, 32, 20),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(topColor) },
        middleColor: { value: new THREE.Color(middleColor) },
        horizonColor: { value: new THREE.Color(horizonColor) },
      },
      vertexShader: `
        varying float vHeight;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vHeight = normalize(worldPosition.xyz).y;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 horizonColor;
        varying float vHeight;
        void main() {
          float upperMix = smoothstep(0.06, 0.72, vHeight);
          float horizonMix = smoothstep(-0.14, 0.2, vHeight);
          vec3 lowerSky = mix(horizonColor, middleColor, horizonMix);
          gl_FragColor = vec4(mix(lowerSky, topColor, upperMix), 1.0);
        }
      `,
    }),
  );
  sky.renderOrder = -100;
  scene.add(sky);
}

function createRidgeSilhouette(scene, z, height, width, color, offsetX = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(-width * 0.5, -18);
  const steps = 15;
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const x = -width * 0.5 + t * width;
    const peak = Math.sin(t * Math.PI) * height
      + Math.sin(t * Math.PI * 4 + index) * height * 0.09;
    shape.lineTo(x, peak);
  }
  shape.lineTo(width * 0.5, -18);
  shape.closePath();
  const ridge = new THREE.Mesh(new THREE.ShapeGeometry(shape), paintedMaterial(color));
  ridge.position.set(offsetX, -10, z);
  scene.add(ridge);
}

function createArch(scene, x, y, z, color, scale = 1) {
  const arch = new THREE.Mesh(
    new THREE.TorusGeometry(10 * scale, 2.4 * scale, 10, 32, Math.PI),
    solidMaterial(color),
  );
  arch.position.set(x, y + 5, z);
  arch.rotation.z = Math.PI;
  scene.add(arch);
}

function createPeakLandmark(scene, x, y, z, worldType) {
  const peak = new THREE.Group();
  [
    [-13, 20, 14, worldType.rock[1]],
    [0, 31, 19, worldType.rock[0]],
    [15, 17, 12, worldType.rock[2]],
  ].forEach(([offsetX, height, radius, color]) => {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 7),
      solidMaterial(color),
    );
    mountain.position.set(offsetX, height * 0.5, 0);
    peak.add(mountain);
  });
  const snow = new THREE.Mesh(
    new THREE.ConeGeometry(7.2, 8, 7),
    solidMaterial(worldType.accent[0]),
  );
  snow.position.set(0, 27, 0);
  peak.add(snow);
  peak.position.set(x, y, z);
  scene.add(peak);
}

function createCanyonFins(scene, worldType, sampler, random) {
  const sites = [
    [-92, 55, 13], [-48, 22, 17], [43, 18, 16],
    [94, 48, 14], [-82, -54, 19], [78, -68, 18],
  ];
  sites.forEach(([x, z, height], index) => {
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(range(random, 7, 12), height, range(random, 17, 28)),
      solidMaterial(worldType.rock[index % worldType.rock.length]),
    );
    fin.position.set(x, sampler.heightAt(x, z) + height * 0.46, z);
    fin.rotation.y = range(random, -0.55, 0.55);
    fin.rotation.z = range(random, -0.07, 0.07);
    scene.add(fin);
  });
}

function createLakeIslands(scene, worldType, sampler) {
  [
    [-18, 18, 13, 7],
    [25, 4, 9, 5],
    [13, 43, 7, 4],
  ].forEach(([x, z, radius, height], index) => {
    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.74, radius, height, 11),
      solidMaterial(worldType.terrain[(index + 1) % worldType.terrain.length]),
    );
    island.position.set(x, sampler.heightAt(0, 18) + height * 0.5 + 0.25, z);
    island.scale.z = 0.76;
    scene.add(island);
  });
}

function createPaintedCliff(scene, x, y, z, worldType, random) {
  const geometry = new THREE.PlaneGeometry(54, 38, 18, 10);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    positions.setZ(index, Math.sin(positions.getY(index) * 0.2 + range(random, 0, 1)) * 1.2);
  }
  geometry.computeVertexNormals();
  const cliff = new THREE.Mesh(geometry, solidMaterial(pick(random, worldType.rock)));
  cliff.position.set(x, y + 16, z);
  cliff.rotation.y = -0.38;
  scene.add(cliff);
  for (let index = 0; index < 3; index += 1) {
    const band = new THREE.Mesh(
      new THREE.PlaneGeometry(54.5, 2 + index * 0.35, 12, 1),
      paintedMaterial(worldType.accent[index]),
    );
    band.position.copy(cliff.position);
    band.position.y += -10 + index * 10;
    band.position.z += 0.15;
    band.rotation.copy(cliff.rotation);
    scene.add(band);
  }
}

function createGrove(scene, x, y, z, worldType, random) {
  const group = new THREE.Group();
  for (let index = 0; index < 26; index += 1) {
    const angle = range(random, 0, Math.PI * 2);
    const radius = range(random, 7, 28);
    const localX = Math.cos(angle) * radius;
    const localZ = Math.sin(angle) * radius;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.28, 3.4, 7),
      solidMaterial(0x6d5b58),
    );
    trunk.position.set(localX, 1.7, localZ);
    const crown = new THREE.Mesh(
      new THREE.SphereGeometry(range(random, 1.4, 2.2), 12, 8),
      solidMaterial(index % 4 === 0 ? worldType.accent[1] : worldType.terrain[1]),
    );
    crown.scale.y = range(random, 1.1, 1.5);
    crown.position.set(localX, 4.2, localZ);
    group.add(trunk, crown);
  }
  group.position.set(x, y, z);
  scene.add(group);
}

function createWalkway(scene, start, end, width, color) {
  const direction = end.clone().sub(start);
  const walkway = new THREE.Mesh(
    new THREE.BoxGeometry(direction.length(), 0.7, width),
    solidMaterial(color),
  );
  walkway.position.copy(start).add(end).multiplyScalar(0.5);
  walkway.quaternion.setFromUnitVectors(
    new THREE.Vector3(1, 0, 0),
    direction.clone().normalize(),
  );
  walkway.userData.walkableSurface = true;
  scene.add(walkway);
  return walkway;
}

function createForestCanopy(scene, worldType, sampler, random) {
  const sites = [
    new THREE.Vector3(-58, 0, -64),
    new THREE.Vector3(0, 0, -93),
    new THREE.Vector3(58, 0, -67),
  ];
  const canopyY = Math.max(...sites.map((site) => sampler.heightAt(site.x, site.z))) + 14;
  const walkableSurfaces = [];
  const colliders = [];
  const starHeights = new Map();
  const timber = solidMaterial(0x765643);
  const platformMaterial = solidMaterial(0xb68a58);
  const leafColors = [worldType.terrain[1], worldType.accent[2], 0x568d64];

  sites.forEach((site, index) => {
    const groundY = sampler.heightAt(site.x, site.z);
    const trunkHeight = canopyY - groundY + 10;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 3.2, trunkHeight, 10),
      timber,
    );
    trunk.position.set(site.x, groundY + trunkHeight * 0.5, site.z);
    scene.add(trunk);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(9, 9.8, 0.9, 14),
      platformMaterial,
    );
    platform.position.set(site.x, canopyY, site.z);
    platform.userData.walkableSurface = true;
    scene.add(platform);
    walkableSurfaces.push(platform);

    const crown = new THREE.Group();
    for (let crownIndex = 0; crownIndex < 5; crownIndex += 1) {
      const angle = (crownIndex / 5) * Math.PI * 2 + range(random, -0.25, 0.25);
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(range(random, 5.5, 7.5), 12, 8),
        solidMaterial(leafColors[(index + crownIndex) % leafColors.length]),
      );
      leaves.position.set(
        Math.cos(angle) * range(random, 2, 5),
        range(random, 4, 8),
        Math.sin(angle) * range(random, 2, 5),
      );
      leaves.scale.y = range(random, 0.7, 1.15);
      crown.add(leaves);
    }
    crown.position.set(site.x, canopyY + 1.5, site.z);
    crown.userData.treeSwayPhase = range(random, 0, Math.PI * 2);
    scene.add(crown);

    const hut = new THREE.Mesh(
      new THREE.ConeGeometry(4.8, 3.8, 6),
      solidMaterial(worldType.accent[index % worldType.accent.length]),
    );
    const hutOffsets = [[-5, 4], [-5, -4], [5, -4]];
    hut.position.set(
      site.x + hutOffsets[index][0],
      canopyY + 3.2,
      site.z + hutOffsets[index][1],
    );
    scene.add(hut);

    colliders.push({
      x: site.x,
      z: site.z,
      radius: 3.2,
      top: canopyY + 12,
      unstuck: true,
    });
  });

  walkableSurfaces.push(
    createWalkway(
      scene,
      new THREE.Vector3(sites[0].x + 5, canopyY + 0.1, sites[0].z - 2),
      new THREE.Vector3(sites[1].x - 6, canopyY + 0.1, sites[1].z + 1),
      3.8,
      0xa9774f,
    ),
    createWalkway(
      scene,
      new THREE.Vector3(sites[1].x + 6, canopyY + 0.1, sites[1].z + 1),
      new THREE.Vector3(sites[2].x - 5, canopyY + 0.1, sites[2].z - 2),
      3.8,
      0xa9774f,
    ),
  );

  const westRampStart = new THREE.Vector3(-91, sampler.heightAt(-91, -35) + 0.2, -35);
  const eastRampStart = new THREE.Vector3(91, sampler.heightAt(91, -36) + 0.2, -36);
  walkableSurfaces.push(
    createWalkway(
      scene,
      westRampStart,
      new THREE.Vector3(-64, canopyY - 0.2, -58),
      5.4,
      worldType.accent[0],
    ),
    createWalkway(
      scene,
      eastRampStart,
      new THREE.Vector3(64, canopyY - 0.2, -61),
      5.4,
      worldType.accent[0],
    ),
  );

  starHeights.set(4, canopyY + 3);
  starHeights.set(8, canopyY + 3);
  starHeights.set(9, canopyY + 3);
  return { walkableSurfaces, colliders, starHeights };
}

function createGroundDetails(scene, worldType, sampler, random) {
  const isCanyon = worldType.id === "canyon";
  const isForest = worldType.id === "forest";
  const isLake = worldType.id === "lake";
  const primaryGeometry = isCanyon
    ? new THREE.DodecahedronGeometry(0.55, 0)
    : new THREE.ConeGeometry(isLake ? 0.12 : 0.18, isForest ? 1.35 : 0.95, 4);
  const secondaryGeometry = isForest
    ? new THREE.SphereGeometry(0.35, 7, 5)
    : new THREE.DodecahedronGeometry(isLake ? 0.34 : 0.46, 0);
  const colors = isCanyon
    ? [worldType.rock[1], worldType.accent[0]]
    : isForest
      ? [worldType.terrain[2], worldType.accent[1]]
      : isLake
        ? [worldType.terrain[1], worldType.rock[1]]
        : [worldType.accent[1], worldType.rock[1]];
  const primary = new THREE.InstancedMesh(primaryGeometry, solidMaterial(colors[0]), 96);
  const secondary = new THREE.InstancedMesh(secondaryGeometry, solidMaterial(colors[1]), 48);
  const dummy = new THREE.Object3D();

  function place(mesh, index, nearRoute) {
    const anchor = pick(random, worldType.stars);
    let x = nearRoute ? anchor[1] + range(random, -15, 15) : range(random, -150, 150);
    let z = nearRoute ? anchor[2] + range(random, -15, 15) : range(random, -150, 150);
    if (isLake && Math.hypot(x / 1.25, z - 18) < 57) {
      const angle = range(random, 0, Math.PI * 2);
      x = Math.cos(angle) * range(random, 68, 82);
      z = 18 + Math.sin(angle) * range(random, 54, 70);
    }
    const scale = range(random, 0.65, 1.45);
    dummy.position.set(x, sampler.heightAt(x, z) + (isCanyon ? 0.35 : 0.48), z);
    dummy.rotation.set(
      range(random, -0.12, 0.12),
      range(random, 0, Math.PI * 2),
      range(random, -0.12, 0.12),
    );
    dummy.scale.set(scale, range(random, 0.75, 1.45) * scale, scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  for (let index = 0; index < primary.count; index += 1) place(primary, index, index < 72);
  for (let index = 0; index < secondary.count; index += 1) place(secondary, index, index < 38);
  primary.instanceMatrix.needsUpdate = true;
  secondary.instanceMatrix.needsUpdate = true;
  scene.add(primary, secondary);
}

function createAmbientMotion(scene, worldType, sampler, random) {
  const count = worldType.id === "forest" ? 64 : 42;
  const positions = [];
  for (let index = 0; index < count; index += 1) {
    const x = range(random, -145, 145);
    const z = range(random, -145, 120);
    positions.push(x, sampler.heightAt(x, z) + range(random, 1.2, 9), z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const color = worldType.id === "canyon"
    ? 0xe8c09d
    : worldType.id === "forest"
      ? 0xe5b96f
      : worldType.id === "lake"
        ? 0xd9f2e7
        : 0xf2e8cf;
  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color,
      size: worldType.id === "forest" ? 0.48 : 0.34,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
    }),
  );
  particles.userData.ambientOriginY = 0;
  particles.userData.ambientPhase = range(random, 0, Math.PI * 2);
  particles.userData.ambientSpeed = worldType.id === "canyon" ? 0.12 : 0.2;
  scene.add(particles);
}

function createBirdFlock(scene, x, y, z, color, random) {
  const flock = new THREE.Group();
  for (let index = 0; index < 7; index += 1) {
    const bird = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 2.2, 3),
      paintedMaterial(color),
    );
    const angle = (index / 7) * Math.PI * 2;
    bird.rotation.z = Math.PI / 2;
    bird.position.set(
      Math.cos(angle) * range(random, 4, 11),
      range(random, -2, 4),
      Math.sin(angle) * range(random, 4, 11),
    );
    flock.add(bird);
  }
  flock.position.set(x, y, z);
  flock.userData.birdOrigin = flock.position.clone();
  flock.userData.birdPhase = range(random, 0, Math.PI * 2);
  flock.userData.birdSpeed = range(random, 0.08, 0.14);
  scene.add(flock);
}

function createMistBand(scene, x, y, z, width, color, random) {
  const mist = new THREE.Mesh(
    new THREE.PlaneGeometry(width, 5.5),
    paintedMaterial(color, {
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    }),
  );
  mist.rotation.x = -Math.PI / 2;
  mist.position.set(x, y, z);
  mist.userData.mistOrigin = mist.position.clone();
  mist.userData.mistPhase = range(random, 0, Math.PI * 2);
  scene.add(mist);
}

function createWindStreaks(scene, sampler, random) {
  const streaks = new THREE.Group();
  const material = new THREE.LineBasicMaterial({
    color: 0xf4d4c1,
    transparent: true,
    opacity: 0.42,
  });
  for (let index = 0; index < 14; index += 1) {
    const x = range(random, -112, 112);
    const z = range(random, -112, 92);
    const y = sampler.heightAt(x, z) + range(random, 2, 8);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + range(random, 3, 8), y + 0.4, z - 1.5),
      ]),
      material,
    );
    streaks.add(line);
  }
  streaks.userData.windPhase = range(random, 0, Math.PI * 2);
  scene.add(streaks);
}

function createBiomeLife(scene, worldType, sampler, random) {
  if (worldType.id === "canyon") {
    createWindStreaks(scene, sampler, random);
    createBirdFlock(scene, -58, sampler.heightAt(-58, -61) + 25, -61, 0x5f4654, random);
  } else if (worldType.id === "lake") {
    createMistBand(scene, -24, sampler.heightAt(0, 18) + 1.2, 16, 52, worldType.clouds[1], random);
    createMistBand(scene, 27, sampler.heightAt(0, 18) + 1.5, 38, 44, worldType.clouds[0], random);
    createBirdFlock(scene, 12, sampler.heightAt(0, 18) + 24, 14, 0x526f78, random);
  } else if (worldType.id === "alpine") {
    createMistBand(scene, -32, 0, 22, 68, worldType.clouds[1], random);
    createMistBand(scene, 41, 2, -12, 58, worldType.clouds[0], random);
    createBirdFlock(scene, 0, sampler.heightAt(0, -82) + 35, -82, 0x596a83, random);
  } else if (worldType.id === "cloud") {
    createBirdFlock(scene, -12, sampler.heightAt(-12, -70) + 34, -70, 0x66566f, random);
    createBirdFlock(scene, 72, sampler.heightAt(72, -126) + 27, -126, 0x66566f, random);
  } else {
    createBirdFlock(scene, 0, sampler.heightAt(0, -93) + 33, -93, 0x43584a, random);
  }
}

function createWaterfall(scene, x, y, z, worldType) {
  for (let index = 0; index < 5; index += 1) {
    const fall = new THREE.Mesh(
      new THREE.PlaneGeometry(6 + index, 30 + index * 3, 5, 10),
      paintedMaterial(worldType.accent[index % worldType.accent.length], {
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
    );
    fall.position.set(x + (index - 2) * 5.5, y - 7, z);
    scene.add(fall);
  }
}

function createLake(scene, sampler) {
  const y = sampler.heightAt(0, 18) + 0.35;
  const lake = new THREE.Mesh(
    new THREE.CircleGeometry(61, 72),
    paintedMaterial(0x82c9d7, { transparent: true, opacity: 0.82, depthWrite: false }),
  );
  lake.rotation.x = -Math.PI / 2;
  lake.scale.set(1.25, 0.82, 1);
  lake.position.set(0, y, 18);
  lake.userData.waterShimmer = true;
  lake.userData.waterBaseOpacity = lake.material.opacity;
  scene.add(lake);
}

function createCloudSea(scene, worldType, y) {
  const cloudSea = new THREE.Mesh(
    new THREE.CircleGeometry(136, 72),
    paintedMaterial(worldType.clouds[0], {
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    }),
  );
  cloudSea.rotation.x = -Math.PI / 2;
  cloudSea.scale.set(1.35, 0.72, 1);
  cloudSea.position.set(0, y, -24);
  scene.add(cloudSea);
}

function createLandmarks(scene, worldType, sampler, random) {
  let biomeFeatures = {
    walkableSurfaces: [],
    colliders: [],
    starHeights: new Map(),
  };
  createRidgeSilhouette(scene, -250, 100, 360, worldType.rock[1]);
  createRidgeSilhouette(scene, -300, 74, 420, worldType.rock[2], -28);
  createRidgeSilhouette(scene, -350, 56, 470, worldType.accent[0], 38);

  if (worldType.id === "alpine") {
    createCloudSea(scene, worldType, -7);
    createPeakLandmark(scene, 0, sampler.heightAt(0, -142), -142, worldType);
    createWaterfall(scene, 65, sampler.heightAt(65, -115), -135, worldType);
  } else if (worldType.id === "canyon") {
    createArch(scene, -58, sampler.heightAt(-58, -61), -61, worldType.accent[2], 1.3);
    createCanyonFins(scene, worldType, sampler, random);
    createPaintedCliff(scene, -125, sampler.heightAt(-125, 5), -4, worldType, random);
    createPaintedCliff(scene, 123, sampler.heightAt(123, -5), -12, worldType, random);
  } else if (worldType.id === "forest") {
    biomeFeatures = createForestCanopy(scene, worldType, sampler, random);
    createGrove(scene, -118, sampler.heightAt(-118, 28), 28, worldType, random);
    createGrove(scene, 119, sampler.heightAt(119, 24), 24, worldType, random);
  } else if (worldType.id === "lake") {
    createLake(scene, sampler);
    createLakeIslands(scene, worldType, sampler);
    createGrove(scene, -105, sampler.heightAt(-105, -25), -25, worldType, random);
    createGrove(scene, 108, sampler.heightAt(108, -20), -20, worldType, random);
    createWaterfall(scene, 91, sampler.heightAt(91, -84), -105, worldType);
  } else {
    createCloudSea(scene, worldType, -1);
    createArch(scene, -61, sampler.heightAt(-61, -49), -49, worldType.accent[0], 1.2);
    createPaintedCliff(scene, 112, sampler.heightAt(112, -48), -58, worldType, random);
  }
  return biomeFeatures;
}

function createCloudTexture(profile) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 112;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff8ed";
  context.beginPath();
  const flatten = profile === "ridge" ? 0.7 : profile === "coast" ? 0.86 : profile === "forest" ? 0.78 : 1;
  context.ellipse(160, 84, 148, 20 * flatten, 0, 0, Math.PI * 2);
  context.ellipse(72, 63, 52, 29 * flatten, -0.15, 0, Math.PI * 2);
  context.ellipse(132, 50, 68, 38 * flatten, 0.08, 0, Math.PI * 2);
  context.ellipse(205, 55, 64, 35 * flatten, -0.05, 0, Math.PI * 2);
  context.ellipse(272, 68, 45, 25 * flatten, 0.1, 0, Math.PI * 2);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCloudLayers(scene, worldType, random) {
  const texture = createCloudTexture(worldType.cloudProfile);
  const layers = [
    { count: 5, distance: 125, y: [40, 70], scale: [88, 128], opacity: 0.74, drift: 2.1 },
    { count: 8, distance: 235, y: [29, 55], scale: [72, 108], opacity: 0.53, drift: 1 },
    { count: 10, distance: 350, y: [36, 64], scale: [50, 78], opacity: 0.35, drift: 0.42 },
  ];
  layers.forEach((layer, layerIndex) => {
    for (let index = 0; index < layer.count; index += 1) {
      const angle = range(random, -Math.PI * 0.84, Math.PI * 0.84) + Math.PI;
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          color: pick(random, worldType.clouds),
          transparent: true,
          opacity: layer.opacity,
          depthWrite: false,
          fog: false,
        }),
      );
      const distance = layer.distance + range(random, -34, 34);
      sprite.position.set(
        Math.sin(angle) * distance,
        range(random, layer.y[0], layer.y[1]),
        Math.cos(angle) * distance,
      );
      const width = range(random, layer.scale[0], layer.scale[1]);
      sprite.scale.set(width, width * range(random, 0.2, 0.31), 1);
      sprite.userData.cloudOrigin = sprite.position.clone();
      sprite.userData.cloudPhase = range(random, 0, Math.PI * 2);
      sprite.userData.cloudDrift = layer.drift;
      sprite.userData.cloudLayer = layerIndex;
      scene.add(sprite);
    }
  });
}

function createStarShape() {
  const shape = new THREE.Shape();
  for (let index = 0; index < 10; index += 1) {
    const radius = index % 2 === 0 ? 1 : 0.42;
    const angle = -Math.PI / 2 + (index / 10) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createStar(position, index, role) {
  const star = new THREE.Group();
  const mesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(createStarShape(), {
      depth: 0.34,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.1,
      bevelThickness: 0.08,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf3e34a,
      emissive: 0xa56a12,
      roughness: 0.72,
    }),
  );
  mesh.geometry.center();
  star.add(mesh);
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(1.18, 1.34, 24),
    paintedMaterial(0xfff4a8, { transparent: true, opacity: 0.72, depthWrite: false }),
  );
  halo.position.z = -0.25;
  star.add(halo);
  star.position.copy(position);
  star.scale.setScalar(role === "hidden" ? 1.05 : 1.28);
  star.userData.starIndex = index;
  star.userData.starRole = role;
  star.userData.starOrigin = position.clone();
  return star;
}

function createStars(scene, worldType, sampler, random, starHeights = new Map()) {
  return worldType.stars.map(([role, baseX, baseZ, placement], index) => {
    const jitter = placement === "canopy" || placement === "fixed" ? 0 : role === "hidden" ? 8 : 5;
    const x = baseX + range(random, -jitter, jitter);
    const z = baseZ + range(random, -jitter, jitter);
    const y = starHeights.get(index) ?? sampler.heightAt(x, z) + range(random, 2.4, 2.8);
    const star = createStar(
      new THREE.Vector3(x, y, z),
      index,
      role,
    );
    scene.add(star);
    return star;
  });
}

export function createWorld(scene, seed) {
  const worldType = WORLD_TYPES[hashSeed(seed) % WORLD_TYPES.length];
  const random = createRandom(`${seed}:${worldType.id}:world`);
  const sampler = createTerrainSampler(worldType, seed);

  createSky(scene, worldType);
  scene.add(new THREE.HemisphereLight(worldType.sky[1], worldType.rock[0], 2.45));
  const sunLight = new THREE.DirectionalLight(0xfff1d2, 2.5);
  sunLight.position.set(-52, 74, 46);
  scene.add(sunLight);

  const terrain = createHeightfield(scene, worldType, sampler);
  const biomeFeatures = createLandmarks(scene, worldType, sampler, random);
  createGroundDetails(scene, worldType, sampler, random);
  createAmbientMotion(scene, worldType, sampler, random);
  createBiomeLife(scene, worldType, sampler, random);
  createCloudLayers(scene, worldType, random);
  const stars = createStars(scene, worldType, sampler, random, biomeFeatures.starHeights);
  const aweSpawn = chooseAweSpawn(worldType, sampler, random);

  return {
    seed,
    themeName: `${worldType.name} · ${worldType.themeName}`,
    scanText: worldType.scanText,
    stars,
    starCount: STAR_COUNT,
    spawnType: aweSpawn.type,
    walkableSurfaces: [terrain, ...biomeFeatures.walkableSurfaces],
    colliders: biomeFeatures.colliders,
    spawn: new THREE.Vector3(
      aweSpawn.x,
      sampler.heightAt(aweSpawn.x, aweSpawn.z) + 1.7,
      aweSpawn.z,
    ),
    lookAt: new THREE.Vector3(
      aweSpawn.lookX,
      sampler.heightAt(aweSpawn.lookX, aweSpawn.lookZ) + 8,
      aweSpawn.lookZ,
    ),
    worldLimit: WORLD_LIMIT,
  };
}

export function animateWorld(scene, elapsed) {
  scene.traverse((object) => {
    if (object.userData.starOrigin) {
      const origin = object.userData.starOrigin;
      object.position.y = origin.y + Math.sin(elapsed * 2.2 + object.userData.starIndex) * 0.32;
      object.rotation.y = elapsed * 1.5 + object.userData.starIndex;
      object.rotation.z = Math.sin(elapsed * 0.8 + object.userData.starIndex) * 0.12;
    }
    if (object.userData.cloudOrigin) {
      const origin = object.userData.cloudOrigin;
      object.position.x = origin.x
        + Math.sin(elapsed * 0.022 + object.userData.cloudPhase) * object.userData.cloudDrift;
      object.position.y = origin.y
        + Math.sin(elapsed * 0.016 + object.userData.cloudPhase)
          * (0.35 + object.userData.cloudLayer * 0.16);
    }
    if (object.userData.treeSwayPhase !== undefined) {
      object.rotation.z = Math.sin(elapsed * 0.42 + object.userData.treeSwayPhase) * 0.018;
      object.rotation.x = Math.cos(elapsed * 0.35 + object.userData.treeSwayPhase) * 0.012;
    }
    if (object.userData.ambientPhase !== undefined) {
      object.position.y = object.userData.ambientOriginY
        + Math.sin(elapsed * object.userData.ambientSpeed + object.userData.ambientPhase) * 1.1;
      object.rotation.y = elapsed * object.userData.ambientSpeed * 0.22;
    }
    if (object.userData.waterShimmer) {
      object.material.opacity = object.userData.waterBaseOpacity + Math.sin(elapsed * 0.55) * 0.055;
      object.rotation.z = Math.sin(elapsed * 0.08) * 0.012;
    }
    if (object.userData.birdOrigin) {
      const origin = object.userData.birdOrigin;
      const angle = elapsed * object.userData.birdSpeed + object.userData.birdPhase;
      object.position.set(
        origin.x + Math.cos(angle) * 9,
        origin.y + Math.sin(angle * 1.7) * 1.8,
        origin.z + Math.sin(angle) * 9,
      );
      object.rotation.y = -angle;
    }
    if (object.userData.mistOrigin) {
      const origin = object.userData.mistOrigin;
      object.position.x = origin.x + Math.sin(elapsed * 0.06 + object.userData.mistPhase) * 8;
      object.material.opacity = 0.2
        + Math.sin(elapsed * 0.12 + object.userData.mistPhase) * 0.06;
    }
    if (object.userData.windPhase !== undefined) {
      object.position.x = Math.sin(elapsed * 0.22 + object.userData.windPhase) * 6;
      object.position.z = Math.cos(elapsed * 0.16 + object.userData.windPhase) * 3;
    }
  });
}
