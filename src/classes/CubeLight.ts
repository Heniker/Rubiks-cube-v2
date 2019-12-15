// @ts-ignore
import * as lightness from 'lightness';
import { intersects } from '@globals';
import { Toggle } from './Toggle';

type Geometry = import('three').Geometry;
type Face3 = import('three').Face3;
type Mesh = import('three').Mesh;

class CubeLight extends Toggle {
  maxValue = 26; // max amount of "lightness" that can be applied
  step = 2; // highlight speed. #Warning> [maxValue] should be divisible by [step]
  affectedFaces = new Map<Face3, { light: number; parentCube: Mesh }>();

  constructor() {
    super();
    super.setTask(this.renderTask.bind(this));
  }

  private getSideFaces(intersection: THREE.Intersection): [Face3, Face3] {
    // #assertion>
    const faces = ((intersection.object as THREE.Mesh)
      .geometry as THREE.Geometry).faces;

    // #assertion>
    if (intersection!.uv!.x > intersection!.uv!.y) {
      // #assertion>
      return [
        intersection.face as Face3,
        faces[(intersection.faceIndex as number) - 1],
      ];
    }

    return [
      intersection.face as Face3,
      faces[(intersection.faceIndex as number) + 1],
    ];
  }

  private renderTask() {
    let sideFaces: Face3[] = [];

    // #Performance>
    // Too much cycling through arrays during each render loop
    if (intersects.length !== 0) {
      const intersection = intersects[0];

      sideFaces = this.getSideFaces(intersection);

      if (sideFaces[0].color.getHex() !== 0) {
        // #assertion>
        this.addAffected(sideFaces, intersection.object as THREE.Mesh);
        this.lighten(sideFaces);
      }
    }

    this.darken(
      [...this.affectedFaces.keys()].filter((e) => !sideFaces.includes(e))
    );
  }

  private apply(face: Face3, value: number) {
    // #assertion>
    const geometry = this.affectedFaces.get(face)!.parentCube.geometry;
    // #assertion> Use of BufferGeometry is not allowed
    (geometry as Geometry).colorsNeedUpdate = true;

    // #assertion
    this.affectedFaces.get(face)!.light += value;
    face.color.set(lightness('#' + face.color.getHexString(), value));
  }

  private addAffected(faces: Face3[], cube: Mesh) {
    faces.forEach((face) => {
      if (!this.affectedFaces.has(face)) {
        this.affectedFaces.set(face, {
          light: 0,
          parentCube: cube,
        });
      }
    });
  }

  private removeAffected(faces: Face3[]) {
    faces.forEach((face) => {
      this.affectedFaces.delete(face);
    });
  }

  private darken(faces: Face3[], value: number = this.step) {
    faces.forEach((face) => {
      // #assertion
      if (this.affectedFaces.get(face)!.light <= 0) {
        this.removeAffected([face]);
      } else {
        this.apply(face, -value);
      }
    });
  }

  private lighten(faces: Face3[], value: number = this.step) {
    faces.forEach((face) => {
      // #assertion
      if (this.affectedFaces.get(face)!.light >= this.maxValue) {
        return;
      } else {
        this.apply(face, value);
      }
    });
  }
}

export { CubeLight };
