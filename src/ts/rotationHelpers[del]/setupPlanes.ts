// Planes represent sides of RubiksCube and intersecting them
// is required for rotation to work correctly

import { scene } from '../globals'
import { cubesGroup } from '../runtime'
import { THREE } from '../three/init'


const planesGroup = new THREE.Group()
const len = Math.abs(cubesGroup.children[0].position.x) + cubesGroup.cubeSize / 2

// use THREE.DoubleSide so no excessive plane rotation
// i.e. no need in rotating plane faces to the intersector
// const plane = new THREE.Mesh(new THREE.PlaneGeometry(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
const plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50),
	new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }))

plane.layers.set(0) // hides plane from camera view


function getPlane(pos: THREE.Vector3) {
	const p = plane.clone()
	p.position.copy(pos)

	return p
}

// Rotating and positioning planes
planesGroup.add(getPlane(new THREE.Vector3(len, 0, 0)).rotateY(THREE.Math.degToRad(90)))
planesGroup.add(getPlane(new THREE.Vector3(-len, 0, 0)).rotateY(THREE.Math.degToRad(90)))
planesGroup.add(getPlane(new THREE.Vector3(0, len, 0)).rotateX(THREE.Math.degToRad(90)))
planesGroup.add(getPlane(new THREE.Vector3(0, -len, 0)).rotateX(THREE.Math.degToRad(90)))
planesGroup.add(getPlane(new THREE.Vector3(0, 0, len)))
planesGroup.add(getPlane(new THREE.Vector3(0, 0, -len)))


scene.add(planesGroup)

export {planesGroup}
