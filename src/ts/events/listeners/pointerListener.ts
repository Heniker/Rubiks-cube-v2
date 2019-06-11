import {canvas, mobile, pointer} from '../../globals'


void (() => {
	// pointer position

	function updatePointerPosition(event) {

		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
	}

	function updateTouchPosition(event) {
		const changed = event.changedTouches[0]

		pointer.x = (changed.clientX / window.innerWidth) * 2 - 1
		pointer.y = - (changed.clientY / window.innerHeight) * 2 + 1
	}


	// Pointer event listeners should always go before
	// drag controls, overwise touch won't work correctly
	if (mobile) {
		canvas.addEventListener('touchstart', updateTouchPosition)
		canvas.addEventListener('touchmove', updateTouchPosition)
		canvas.addEventListener('touchend', updateTouchPosition)
	}

	else {
		canvas.addEventListener('pointermove', updatePointerPosition)
		canvas.addEventListener('pointerdown', updatePointerPosition)
	}
})()

export default null
