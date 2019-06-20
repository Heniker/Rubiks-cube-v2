function getMaxVecAxle(vec: THREE.Vector3) {
	const absed = vec.toArray().map((e) => Math.abs(e))
	return ['x', 'y', 'z'][absed.indexOf(Math.max(...absed))]
}


export { getMaxVecAxle }
