import THREE from './three/init'


// cube creation
// #!Warning> It is only safe to work with integers -> no arguments floats allowed
// That is because floats are disturbing (0.1 + 0.2 != 0.3)
class RubiksCube extends THREE.Group {

	sideLen = 3
	cubeSize = 10
	emptySpace = 1

	material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
	geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize)

	// #!BUG>lineLength> if lineLength is not divisble by 2 -> rotation won't work correctly
	// This bug is connected with module CubeRotation
	private lineLength = (this.sideLen - 1) * (this.cubeSize + this.emptySpace)
	private startPosition = new THREE.Vector3(-this.lineLength / 2, -this.lineLength / 2, -this.lineLength / 2)
	private step = this.cubeSize + this.emptySpace



	constructor(sideLen: number = 3, cubeSize: number = 10, emptySpace: number = 1) {
		super()

		this.sideLen = sideLen
		this.cubeSize = cubeSize
		this.emptySpace = emptySpace


		void (() => {

			const cubePosition = this.startPosition.clone()

			for (; cubePosition.z <= this.lineLength / 2; cubePosition.z += this.step) {
				for (; cubePosition.y <= this.lineLength / 2; cubePosition.y += this.step) {
					for (; cubePosition.x <= this.lineLength / 2; cubePosition.x += this.step) {
						this.addCube(cubePosition)
					}
					cubePosition.x = this.startPosition.x
				}
				cubePosition.y = this.startPosition.y
			}
		})()
	}

	private addCube(positionVec: THREE.Vector3) {
		const cube = new THREE.Mesh(this.geometry.clone(), this.material)
		cube.position.copy(positionVec)
		super.add(cube)
	}
}



export default RubiksCube
