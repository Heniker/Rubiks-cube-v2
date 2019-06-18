// Here be dragons
import * as THREE from 'three'
import { camera, intersects, mutable, pointer, raycaster, rotationDebounceTimer, scene } from '../../globals'
import { cubesGroup } from '../../runtime'
import { debounce } from '../../utils/debounce'
import { getMaxVecAxle } from '../../utils/getMaxVecAxle'
import { CubeRotationEvent } from '../CubeRotationEvent'



let wantRotation = false
let savedCube: THREE.Mesh = null
const savedPos = new THREE.Vector3()
let savedPosMaxAxle: string = null
let subed = new THREE.Vector3()
let subedMaxAxle: string = null
let plane: THREE.Mesh = null



function dragStart(event) {
	wantRotation = true
	// Raycaster update is required
	raycaster.setFromCamera(pointer, camera)
	raycaster.intersectObjects(cubesGroup.children, false, intersects)
	// #Typecasting>
	savedCube = (intersects[0].object as THREE.Mesh)
	savedPos.copy(intersects[0].point)
	savedPosMaxAxle = getMaxVecAxle(savedPos)

	// use THREE.DoubleSide so no excessive plane rotation
	plane = new THREE.Mesh(new THREE.PlaneGeometry(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
		new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }))

	plane.position.copy(savedPos)

	// rotate plane so that it faces the camera
	switch (savedPosMaxAxle) {
		case 'x':
			plane.rotateY(THREE.Math.degToRad(90))
			break

		case 'y':
			plane.rotateX(THREE.Math.degToRad(90))
			break

		case 'z':
			plane.rotateX(THREE.Math.degToRad(180))
			break
	}


	plane.layers.set(1) // hide plane from camera
	scene.add(plane)
	plane.updateMatrixWorld()
}


function dragEnd(event) {
	wantRotation = false
	scene.remove(plane)
}


const dragOn = debounce((event) => {

	if (!wantRotation) {
		return
	}


	raycaster.setFromCamera(pointer, camera)
	const intersection = raycaster.intersectObject(plane)[0]
	// console.log(intersection)
	// debugger

	if (!intersection) {
		// #Redo>
		throw new Error('No intersection with planes')
	}


	subed = intersection.point.sub(savedPos)
	subedMaxAxle = getMaxVecAxle(subed)


	if (Math.abs(subed[subedMaxAxle]) >= mutable.pointerRotationThreshold) {
		scene.remove(plane)
		wantRotation = false

		window.dispatchEvent(new CubeRotationEvent({
			// #Typecasting>
			cube: (savedCube as THREE.Mesh),
			...getFixedAxleAndFactor() as {factor: 1 | -1, fixedAxle: string},
		}))
	}

}, rotationDebounceTimer)



window.addEventListener('cubedragstart', dragStart)
window.addEventListener('cubedragon', dragOn)
window.addEventListener('cubedragend', dragEnd)



function getFixedAxleAndFactor() {
	// just bear with it. There is no simple way
	// ... Or at least I couldn't find one

	let factor = subed[subedMaxAxle] > 0 ? 1 : -1

	switch (savedPosMaxAxle) {
		case 'x':
			if (subedMaxAxle === 'y') {
				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'z',
				}
			}

			else if (subedMaxAxle === 'z') {
				factor *= -1

				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'y',
				}
			}

			break

		case 'y':
			if (subedMaxAxle === 'x') {
				factor *= -1

				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'z',
				}
			}

			else if (subedMaxAxle === 'z') {
				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'x',
				}
			}

			break

		case 'z':
			// factor *= -1

			if (subedMaxAxle === 'y') {
				factor *= -1

				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'x',
				}
			}

			else if (subedMaxAxle === 'x') {
				return {
					factor: factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1,
					fixedAxle: 'y',
				}
			}

			break
	}
}
