import * as THREE from "three";

function makeCloud() {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: 0x28243b,
    emissive: 0x17132a,
    flatShading: true,
    roughness: 1,
  });

  for (let i = 0; i < 7; i += 1) {
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5 + (i % 3) * 0.45, 0), material);
    puff.position.set((i - 3) * 1.25, Math.sin(i * 2) * 0.55, Math.cos(i) * 1.2);
    group.add(puff);
  }

  const glow = new THREE.PointLight(0x9bdcff, 0.4, 13);
  glow.position.y = -1;
  group.add(glow);
  group.position.set(-18, 13, 12);
  group.userData.glow = glow;
  return group;
}

export function createStorm(scene) {
  const cloud = makeCloud();
  scene.add(cloud);

  const boltMaterial = new THREE.LineBasicMaterial({ color: 0xe8ffff });
  const bolt = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    boltMaterial,
  );
  bolt.visible = false;
  scene.add(bolt);

  let strikeTime = 0;

  function strike(machinePosition) {
    const points = [];
    const top = cloud.position.clone();
    const bottom = machinePosition.clone().add(new THREE.Vector3(0, 3.5, 0));
    for (let i = 0; i <= 8; i += 1) {
      const t = i / 8;
      points.push(
        top.clone().lerp(bottom, t).add(
          new THREE.Vector3(
            i === 0 || i === 8 ? 0 : (Math.random() - 0.5) * 1.8,
            0,
            i === 0 || i === 8 ? 0 : (Math.random() - 0.5) * 1.8,
          ),
        ),
      );
    }
    bolt.geometry.dispose();
    bolt.geometry = new THREE.BufferGeometry().setFromPoints(points);
    bolt.visible = true;
    cloud.userData.glow.intensity = 8;
    strikeTime = 0.32;
  }

  function update(delta, elapsed, playerPosition, carryingAntenna) {
    const target = carryingAntenna
      ? playerPosition.clone().add(new THREE.Vector3(0, 10, 0))
      : new THREE.Vector3(-18, 13, 12);
    cloud.position.lerp(target, 1 - Math.exp(-delta * (carryingAntenna ? 0.72 : 0.18)));
    cloud.position.y += Math.sin(elapsed * 2) * 0.006;
    cloud.rotation.y += delta * 0.16;

    if (carryingAntenna) {
      cloud.userData.glow.intensity = 1.6 + Math.sin(elapsed * 8) * 0.7;
    }

    if (strikeTime > 0) {
      strikeTime -= delta;
      if (strikeTime <= 0) {
        bolt.visible = false;
        cloud.userData.glow.intensity = carryingAntenna ? 1.6 : 0.4;
      }
    }
  }

  return { cloud, strike, update };
}
