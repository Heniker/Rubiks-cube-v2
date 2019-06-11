import {intersects} from '../../globals'
import DragOnCubeEvent from '../DragOnCubeEvent'


window.addEventListener('pointerdown', () => {
	if (intersects.length) {
		window.dispatchEvent(new DragOnCubeEvent('cubedragstart', intersects[0]))
	}
})
