import * as THREE from 'three'
import { intersects, mutable, rotationDebounceTimer } from '../../globals'
import debounce from '../../utils/debounce'
import getMaxVecAxle from '../../utils/getMaxVecAxle'
import CubeRotationEvent from '../CubeRotationEvent'



let wantDragWatch = false
let startVec = new THREE.Vector3()
let maxAxle: string = null


function dragStart(event) {
	wantDragWatch = true
	startVec = event.intersection.point
}

function dragEnd(event) {
	wantDragWatch = false
}

const dragOn = debounce((event) => {
	if (!intersects.length) {
		return
	}

	const vec = event.intersection.point

	if (!wantDragWatch) {
		return
	}

	const subed = vec.sub(startVec)

	maxAxle = getMaxVecAxle(subed)

	console.log(subed[maxAxle])


	if (Math.abs(subed[maxAxle]) >= mutable.pointerRotationThreshold) {
		wantDragWatch = false

		console.log(42)

		window.dispatchEvent(new CubeRotationEvent({
			// #Typecasting>
			cube: (intersects[0].object as THREE.Mesh),
			factor: 1,
			fixedAxle: maxAxle,
		}))
	}

}, rotationDebounceTimer)



window.addEventListener('cubedragstart', dragStart)
window.addEventListener('cubedragon', dragOn)
window.addEventListener('cubedragend', dragEnd)
