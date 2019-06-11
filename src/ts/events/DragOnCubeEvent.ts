class DragOnCubeEvent extends Event {

	intersection: THREE.Intersection

	constructor(type: string, intersection?: THREE.Intersection) {
		super(type)
		this.intersection = intersection
	}
}

export default DragOnCubeEvent
