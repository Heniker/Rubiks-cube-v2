import {THREE} from '../three/init'


// cube creation
class RubiksCube extends THREE.Group {

	sideLen: number
	cubeSize: number
	emptySpace: number

	material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
	geometry: THREE.Geometry

	lineLength: number
	startPosition: THREE.Vector3
	step: number



	// #!Warning> It is only safe to work with integers -> no arguments floats
	constructor(sideLen: number, cubeSize: number, emptySpace: number) {
		super()

		this.sideLen = sideLen
		this.cubeSize = cubeSize
		this.emptySpace = emptySpace


		this.geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize)

		// lineLength is basically the length of one side of the whole RubiksCube
		// #!BUG>lineLength> if lineLength is not divisble by 2 -> rotation won't work correctly
		// This bug is connected with CubeRotation module
		this.lineLength = (this.sideLen * this.cubeSize + (this.sideLen - 1) * this.emptySpace)
		this.startPosition = new THREE.Vector3(-this.lineLength / 2, -this.lineLength / 2, -this.lineLength / 2)
		this.step = this.cubeSize + this.emptySpace



		void (() => {

			const cubePosition = this.startPosition.clone()

			for (let z = -this.cubeSize; z <= this.cubeSize; z++) {
				for (let y = -this.cubeSize; y <= this.cubeSize; y++) {
					for (let x = -this.cubeSize; x <= this.cubeSize; x++) {
						this.addCube(new THREE.Vector3(x * this.step, y * this.step, z * this.step))
					}
				}
			}

			// for (; cubePosition.z <= this.lineLength / 2; cubePosition.z += this.step) {
			// 	for (; cubePosition.y <= this.lineLength / 2; cubePosition.y += this.step) {
			// 		for (; cubePosition.x <= this.lineLength / 2; cubePosition.x += this.step) {
			// 			this.addCube(cubePosition)
			// 		}
			// 		cubePosition.x = this.startPosition.x
			// 	}
			// 	cubePosition.y = this.startPosition.y
			// }
		})()
	}



	private addCube(positionVec: THREE.Vector3) {
		const cube = new THREE.Mesh(this.geometry.clone(), this.material)
		cube.position.copy(positionVec)
		super.add(cube)
	}
}



export {RubiksCube}
