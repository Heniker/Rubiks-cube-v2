class CubeRotationEvent extends Event {
	cube: THREE.Mesh = null
	fixedAxle: string = null
	factor: 1 | -1

	constructor(props: {cube: THREE.Mesh, fixedAxle: string, factor: 1 | -1}) {
		super('cuberotation')

		this.cube = props.cube
		this.fixedAxle = props.fixedAxle
		this.factor = props.factor
	}
}

export {CubeRotationEvent}


