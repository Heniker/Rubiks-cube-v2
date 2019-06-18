import { Singleton } from '../utils/Singleton'



class Colors extends Singleton {

	cubesArr: THREE.Mesh[]


	constructor(cubes: THREE.Group) {
		super()
		// #Typecasting>
		this.cubesArr = (cubes.children as THREE.Mesh[])
	}



	apply(colors: string[], defaultColor: string) {

		const colors_ = colors.slice()
		const maxValue = Math.abs(this.cubesArr[0].position.x)


		void (() => {

			let counter = 0
			let color: string = null


			this.cubesArr.forEach((e) => {

				// #Typecasting>
				const geometry = ((e as THREE.Mesh).geometry as THREE.Geometry)

				geometry.colorsNeedUpdate = true
				geometry.faces.forEach((f) => {
					f.color.set(defaultColor)
				})
			})


			for (const i of ['x', 'y', 'z']) {
				for (const f of [1, -1]) {
					color = colors_.pop()

					this.cubesArr.filter((e) => e.position[i] === f * maxValue).forEach((e) => {

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
}

export {Colors}
