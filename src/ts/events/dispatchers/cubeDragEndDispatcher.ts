import { DragOnCubeEvent } from '../DragOnCubeEvent'


window.addEventListener('cubedragstart', () => {
	window.addEventListener('pointerup', () => {
		window.dispatchEvent(new DragOnCubeEvent('cubedragend'))
	}, { once: true })
})
