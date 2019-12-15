function getMaxVecAxle(vec: THREE.Vector3) {
  const absed = vec.toArray().map((e) => Math.abs(e));
  return (['x', 'y', 'z'] as const)[absed.indexOf(Math.max(...absed))];
}

export { getMaxVecAxle };
