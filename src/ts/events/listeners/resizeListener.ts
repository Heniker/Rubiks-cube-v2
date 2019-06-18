import * as g from '../../globals'



void (() => {
	function onWindowResize() {

		g.camera.aspect = window.innerWidth / window.innerHeight
		g.camera.updateProjectionMatrix()

		g.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	window.addEventListener('resize', onWindowResize, false)
})()
