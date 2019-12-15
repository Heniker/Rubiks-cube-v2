import { Colors } from './classes/Colors';
import { CubeLight } from './classes/CubeLight';
import { CubeRotation } from './classes/CubeRotation';
import { RubiksCube } from './classes/RubiksCube';

const cubesGroup = new RubiksCube(3, 10, 1);
const cubeLight = new CubeLight();
const cubeRotation = new CubeRotation(cubesGroup);
const colors = new Colors(cubesGroup);

export { cubesGroup, cubeLight, cubeRotation, colors };
