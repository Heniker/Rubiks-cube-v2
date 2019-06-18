import { canvas, pointer } from '../../globals'



void (() => {
	// pointer position

	function updatePointerPosition(event) {

		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
	}

	canvas.addEventListener('pointermove', updatePointerPosition)
	canvas.addEventListener('pointerdown', updatePointerPosition)

})()
