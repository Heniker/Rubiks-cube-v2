import {THREE} from '../three/init'


// cube creation
class RubiksCube extends THREE.Group {

	sideLen: number
	cubeSize: number
	emptySpace: number

	material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
	geometry: THREE.Geometry


	// #!Warning> It is only safe to work with integers -> no arguments floats
	constructor(sideLen: number, cubeSize: number, emptySpace: number) {
		super()

		this.sideLen = sideLen
		this.cubeSize = cubeSize
		this.emptySpace = emptySpace


		this.geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize)


		// #!BUG>lineLength> if lineLength is not divisble by 2 -> rotation won't work correctly
		// This bug is connected with CubeRotation module
		const lineLength = ((sideLen - 1) * (cubeSize + emptySpace))
		const startPosition = new THREE.Vector3(-lineLength / 2, -lineLength / 2, -lineLength / 2)
		const step = cubeSize + emptySpace



		void (() => {

			const cubePosition = startPosition.clone()

			for (; cubePosition.z <= lineLength / 2; cubePosition.z += step) {
				for (; cubePosition.y <= lineLength / 2; cubePosition.y += step) {
					for (; cubePosition.x <= lineLength / 2; cubePosition.x += step) {
						this.addCube(cubePosition)
					}
					cubePosition.x = startPosition.x
				}
				cubePosition.y = startPosition.y
			}
		})()
	}



	private addCube(positionVec: THREE.Vector3) {
		const cube = new THREE.Mesh(this.geometry.clone(), this.material)
		cube.position.copy(positionVec)
		super.add(cube)
	}
}



export {RubiksCube}
