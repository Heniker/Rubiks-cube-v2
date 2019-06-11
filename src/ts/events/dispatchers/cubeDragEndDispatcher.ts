import {intersects} from '../../globals'
import DragOnCubeEvent from '../DragOnCubeEvent'


window.addEventListener('cubedragstart', () => {
	window.addEventListener('pointerup', () => {
		window.dispatchEvent(new DragOnCubeEvent('cubedragend', intersects[0]))
	}, {once : true})
})

