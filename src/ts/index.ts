/*
#!Improvement>
Add doubleSide to planes
https://threejs.org/docs/#api/en/materials/Material.side
Thnk about better ways of rotating cubes
*/



import * as waterfall from 'p-waterfall'
import applyColors from './applyColors'
import CubeLight from './CubeLight'
import CubeRotation from './CubeRotation'
import * as g from './globals'
import RubiksCube from './RubiksCube'
import THREE from './three/init'

import './events/dispatchers/cubeDragEndDispatcher'
import './events/dispatchers/cubeDragOnDispatcher'
import './events/dispatchers/cubeDragStartDispatcher'
import './events/dispatchers/cubeRotationDispatcher'

import './events/listeners/pointerListener'
import './events/listeners/resizeListener'

import CubeRotationEvent from './events/CubeRotationEvent'


// noprod
// @ts-ignore
window.g = g


class test extends Event {

}

const cubesGroup = new RubiksCube()
const cubeLight = new CubeLight()
const cubeRotation = new CubeRotation(cubesGroup)


g.runtime.cubesGroup = cubesGroup
g.runtime.cubeLight = cubeLight
g.runtime.cubeRotation = cubeRotation	



window.addEventListener('cuberotation', (event: CubeRotationEvent) => {
	console.log('foo')
	console.log(event.cube)
	cubeRotation.rotate(event.cube, event.fixedAxle, event.factor)
})



/* > Setup < */
g.renderer.setPixelRatio(window.devicePixelRatio)
g.renderer.setSize(window.innerWidth, window.innerHeight)

g.controls.noPan = true
g.controls.noRoll = true
g.controls.dynamicDampingFactor = 0.5
// controls.rotateSpeed = 1

g.scene.background = new THREE.Color('rgb(72, 58, 96)')
g.scene.add(cubesGroup)

// #Typecasting>
applyColors(cubesGroup.children as THREE.Mesh[])

cubeLight.enable()
// cubeRotation.enable()


// #FixMe>
// Adjusting camera.
g.camera.position.z = Math.sqrt((Math.min(window.innerWidth, window.innerHeight) / 100) / 2) *
	Math.abs(cubesGroup.children[0].position.z) * 4

/* < Setup > */


/*
void (() => {
	// drag controls

	const savedPos = new THREE.Vector3()
	let savedPosMaxAxle = null
	let savedCube = null


	function onPointerDown(event) {

		// raycaster update is required, otherwise touch won't work correctly
		g.raycaster.setFromCamera(g.pointer, g.camera)
		const intersects = g.raycaster.intersectObjects(cubesGroup.children)


		if (!((event.button === 2 || g.mutable.modifierButtonActive) && intersects.length)) {
			return
		}

		savedPos.copy(intersects[0].point)
		savedCube = intersects[0].object

		{
			const absed = savedPos.toArray().map((e) => Math.abs(e))
			savedPosMaxAxle = ['x', 'y', 'z'][absed.indexOf(Math.max(...absed))]
		}
	}


	function onPointerUp(event) {

		if (!(event.button === 2 || g.mutable.modifierButtonActive)) {
			return
		}


		// let plane = new THREE.Mesh(new THREE.PlaneGeometry(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
		// 	new THREE.MeshBasicMaterial)
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40),
			new THREE.MeshBasicMaterial())

		plane.position.copy(savedPos)

		// rotate plane so that it faces the camera
		switch (savedPosMaxAxle) {
			case 'x':
				plane.rotateY(THREE.Math.degToRad(90 * (savedPos[savedPosMaxAxle] > 0 ? 1 : -1)))
				break

			case 'y':
				plane.rotateX(THREE.Math.degToRad(90 * (savedPos[savedPosMaxAxle] > 0 ? -1 : 1)))
				break

			case 'z':
				plane.rotateX(THREE.Math.degToRad(180 * (savedPos[savedPosMaxAxle] > 0 ? 0 : 1)))
				break
		}


		g.scene.add(plane)
		plane.updateMatrixWorld()
		const intersects = g.raycaster.intersectObject(plane)
		g.scene.remove(plane)


		if (intersects.length === 0) {
			console.warn('No intersection found')
			return
		}


		const subed = intersects[0].point.clone().sub(savedPos)
		let subedMaxAxle = null

		{
			const absed = subed.toArray().map((e) => Math.abs(e))
			subedMaxAxle = ['x', 'y', 'z'][absed.indexOf(Math.max(...absed))]
		}

		let factor = subed[subedMaxAxle] > 0 ? 1 : -1


		switch (savedPosMaxAxle) {
			case 'x':
				if (subedMaxAxle === 'y') {
					cubeRotation.rotate(savedCube, 'z', factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1)
				}

				else if (subedMaxAxle === 'z') {
					factor *= -1
					cubeRotation.rotate(savedCube, 'y', factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1)
				}

				break

			case 'y':
				if (subedMaxAxle === 'x') {
					factor *= -1
					cubeRotation.rotate(savedCube, 'z', factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1)
				}

				else if (subedMaxAxle === 'z') {
					cubeRotation.rotate(savedCube, 'x', factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1)
				}

				break

			case 'z':
				factor *= -1

				if (subedMaxAxle === 'y') {
					cubeRotation.rotate(savedCube, 'x', factor * savedPos[savedPosMaxAxle] > 0 ? 1 : -1)
				}

				else if (subedMaxAxle === 'x') {
					cubeRotation.rotate(savedCube, 'y', factor * savedPos[savedPosMaxAxle] > 0 ? -1 : 1)
				}

				break
		}
	}

	if (g.mobile) {
		g.canvas.addEventListener('touchstart', onPointerDown)
		g.canvas.addEventListener('touchend', onPointerUp)
	}

	else {
		g.canvas.addEventListener('pointerdown', onPointerDown)
		g.canvas.addEventListener('pointerup', onPointerUp)
	}
})()
*/


animate()

function animate() {
	requestAnimationFrame(animate)

	g.renderer.render(g.scene, g.camera)
	g.controls.update()
	g.camera.lookAt(0, 0, 0)

	g.raycaster.setFromCamera(g.pointer, g.camera)
	g.intersects.length = 0
	g.raycaster.intersectObjects(cubesGroup.children, false, g.intersects)


	waterfall(g.animationTasks)
}
