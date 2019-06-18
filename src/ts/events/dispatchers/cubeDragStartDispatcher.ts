import { intersects } from '../../globals'
import {DragOnCubeEvent} from '../DragOnCubeEvent'



window.addEventListener('pointerdown', (event) => {
	if (event.button !== 2) {
		return
	}

	if (intersects.length) {
		window.dispatchEvent(new DragOnCubeEvent('cubedragstart'))
	}
})
