import { Singleton } from '../utils/Singleton';

class Colors extends Singleton {
  cubesArr: THREE.Mesh[];

  constructor(cubes: THREE.Group) {
    super();
    // #assertion>
    this.cubesArr = cubes.children as THREE.Mesh[];
  }

  apply(colors: string[], defaultColor: string) {
    const colors_ = colors.slice();
    const maxValue = Math.abs(this.cubesArr[0].position.x);

    void (() => {
      let counter = 0;
      let color: string;

      this.cubesArr.forEach((it) => {
        // #assertion>
        const geometry = (it as THREE.Mesh).geometry as THREE.Geometry;

        geometry.colorsNeedUpdate = true;
        geometry.faces.forEach((f) => {
          f.color.set(defaultColor);
        });
      });

      for (const i of ['x', 'y', 'z'] as const) {
        for (const f of [1, -1] as const) {
          // #assertion>
          color = colors_.pop() as string;

          this.cubesArr
            .filter((it) => it.position[i] === f * maxValue)
            .forEach((it) => {
              // #assertion>
              const geometry = (it as THREE.Mesh).geometry as THREE.Geometry;

              geometry.faces[counter].color.set(color);
              geometry.faces[counter + 1].color.set(color);
            });

          counter += 2;
        }
      }
    })();
  }
}

export { Colors };
