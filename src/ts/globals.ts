import { THREE } from './three/init'

type Intersection = import('three').Intersection

// array of functions that will be executed during render loop
const animationTasks: Array<() => void> = []
const raycaster = new THREE.Raycaster()
// mouse or finger position in normalized screen coordinates
const pointer = new THREE.Vector2()
// seems like powerPreference doesn't change much atm
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'),
 antialias: true, powerPreference: 'low-power' })
renderer.setSize(450, 320)
const canvas = document.querySelector('canvas')
const camera = new THREE.PerspectiveCamera(70, 450 / 320, 1, 1000)
const controls = new THREE.OrthographicTrackballControls(camera)
const scene = new THREE.Scene()
const intersects: Intersection[] = []

// this values can be edited, but reload is required for changes
// to take effect:
// tslint:disable-next-line
let rotationDebounceTimer = 50

// this values can be edited at runtime:
const mutable = {
	pointerRotationThreshold: 5,
}


export {
	animationTasks,
	raycaster,
	pointer,
	renderer,
	canvas,
	camera,
	controls,
	scene,
	intersects,
	rotationDebounceTimer,

	mutable,
}
