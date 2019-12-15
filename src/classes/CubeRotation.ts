import { scene } from '@globals';
import { THREE } from '../three/init';
import { Toggle } from './Toggle';

class CubeRotation extends Toggle {
  step = 5; // animation 'speed'. 90 should be divisible by it

  private cubeGroup: THREE.Group;
  private animationState = 0; // number of degrees. 0 - 90
  private isAnimating = false;

  private childCubes!: THREE.Mesh[];
  private pivotPoint!: THREE.Mesh;
  private fixedAxle!: 'x' | 'y' | 'z';
  private factor!: 1 | -1;

  constructor(rubiksCube: THREE.Group) {
    super();
    super.setTask(this.animationTask.bind(this));

    this.cubeGroup = rubiksCube;
  }

  rotate(cube: THREE.Mesh, fixedAxle_: 'x' | 'y' | 'z', factor_: 1 | -1) {
    if (!this.isEnabled) {
      return false;
    }

    if (this.isAnimating) {
      console.warn('Animation is still in progress');
      return;
    }

    this.fixedAxle = fixedAxle_;
    this.factor = factor_;

    // #assertion>
    this.childCubes = (this.cubeGroup.children as THREE.Mesh[]).filter(
      (e) => e.position[this.fixedAxle] === cube.position[this.fixedAxle]
    );
    this.pivotPoint = new THREE.Mesh(
      new THREE.Geometry(),
      new THREE.MeshBasicMaterial()
    );

    this.childCubes.forEach((e) => {
      this.pivotPoint.add(e);
    });

    scene.add(this.pivotPoint);

    this.isAnimating = true;
  }

  private animationTask() {
    if (!this.isAnimating) {
      return;
    }

    if (this.animationState >= 90) {
      this.animationState = 0;
      this.isAnimating = false;

      this.childCubes.forEach((e) => {
        e.quaternion.copy(e.getWorldQuaternion(new THREE.Quaternion()));

        // #!BUG>lineLength>
        e.position.copy(e.getWorldPosition(new THREE.Vector3()).round());

        this.cubeGroup.add(e);
      });

      scene.remove(this.pivotPoint);
    } else {
      // #assertion>
      this.pivotPoint[
        ('rotate' + this.fixedAxle.toUpperCase()) as
          | 'rotateX'
          | 'rotateY'
          | 'rotateZ'
      ](this.factor * THREE.Math.degToRad(this.step));

      this.animationState += this.step;
    }
  }
}

export { CubeRotation };
