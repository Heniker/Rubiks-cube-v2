/*
#!Improvement>
Add doubleSide to planes
https://threejs.org/docs/#api/en/materials/Material.side
Think about better ways of rotating cubes
*/

/*
#!BUG>
If pointer stops intersecting planes because of reaching boundaries
Rotation event should be fired
*/

/*
#!BUG>
Controls zoom is not working atm because of Passive event listeners
*/

import * as waterfall from 'p-waterfall';

import * as g from '@globals';
import { colors, cubeLight, cubeRotation, cubesGroup } from './runtime';
import { THREE } from './three/init';

import './events/dispatchers/cubeDragEndDispatcher';
import './events/dispatchers/cubeDragOnDispatcher';
import './events/dispatchers/cubeDragStartDispatcher';
import './events/dispatchers/cubeRotationDispatcher';

import './events/listeners/pointerListener';
import './events/listeners/resizeListener';
import { CubeRotationEvent } from './events/CubeRotationEvent';

/* >Setup< */
g.renderer.setPixelRatio(window.devicePixelRatio);
g.renderer.setSize(window.innerWidth, window.innerHeight);

g.controls.noRoll = true;
g.controls.noPan = true;
g.controls.dynamicDampingFactor = 0.5;
g.controls.noZoom = true; // temp. while I'm trying to figure out how to deal with passive listeners

g.scene.background = new THREE.Color('rgb(72, 58, 96)');
g.scene.add(cubesGroup);

// #FixMe>
// Adjusting camera position according to screen coordinates.
g.camera.position.z =
  Math.sqrt(Math.min(window.innerWidth, window.innerHeight) / 100 / 2) *
  Math.abs(cubesGroup.children[0].position.z) *
  4;

colors.apply(
  [
    '#BAB3AB' /* grey */,
    'red',
    'blue',
    '#FF8900' /*orange*/,
    'green',
    'yellow',
  ],
  'black'
);
cubeLight.enable();
cubeRotation.enable();
/* <Setup> */

window.addEventListener('cuberotation', ((event: CubeRotationEvent) => {
  console.log('Rotation');

  cubeRotation.rotate(event.cube, event.fixedAxle, event.factor);
}) as EventListener);

animate();

function animate() {
  requestAnimationFrame(animate);

  g.renderer.render(g.scene, g.camera);
  g.controls.update();
  g.camera.lookAt(0, 0, 0);

  g.raycaster.setFromCamera(g.pointer, g.camera);
  g.intersects.length = 0;
  g.raycaster.intersectObjects(cubesGroup.children, false, g.intersects);

  waterfall(g.animationTasks);
}
