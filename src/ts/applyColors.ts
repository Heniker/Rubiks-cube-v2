function applyColors(
	cubes: THREE.Mesh[],
	defaultColor = 'black',
	colors = ['#BAB3AB' /* grey */, 'red', 'blue', '#FF8900' /*orange*/, 'green', 'yellow']) {


	const maxValue = Math.abs(cubes[0].position.x)


	void (() => {

		let counter = 0
		let color: string = null


		cubes.forEach((e) => {

			// #Typecasting>
			const geometry = ((e as THREE.Mesh).geometry as THREE.Geometry)

			geometry.colorsNeedUpdate = true
			geometry.faces.forEach((f) => {
				f.color.set(defaultColor)
			})
		})


		for (const i of ['x', 'y', 'z']) {
			for (const f of [1, -1]) {
				color = colors.pop()

				cubes.filter((e) => e.position[i] === f * maxValue).forEach((e) => {

					// #Typecasting>
					const geometry = ((e as THREE.Mesh).geometry as THREE.Geometry)

					geometry.faces[counter].color.set(color)
					geometry.faces[counter + 1].color.set(color)
				})

				counter += 2
			}
		}
	})()
}

export default applyColors
