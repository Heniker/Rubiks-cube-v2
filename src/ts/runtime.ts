import { Colors } from './Classes/Colors'
import { CubeLight } from './Classes/CubeLight'
import { CubeRotation } from './Classes/CubeRotation'
import { RubiksCube } from './Classes/RubiksCube'



const cubesGroup = new RubiksCube(3, 10, 1)
const cubeLight = new CubeLight()
const cubeRotation = new CubeRotation(cubesGroup)
const colors = new Colors(cubesGroup)



export {
	cubesGroup,
	cubeLight,
	cubeRotation,
	colors,
}
