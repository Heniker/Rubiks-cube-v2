import { isMobile } from 'is-mobile'
import THREE from './three/init'


type Intersection = import('three').Intersection


const mobile = isMobile()
// array of functions that will be executed during render loop
const animationTasks: Array<() => void> = []
const raycaster = new THREE.Raycaster()
// mouse or finger position in normalized screen coordinates
const pointer = new THREE.Vector2()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const canvas = window.document.body.appendChild(renderer.domElement)
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
const controls = new THREE.OrthographicTrackballControls(camera)
const scene = new THREE.Scene()
const intersects: Intersection[] = []
const rotationDebounceTimer = 50


const mutable = {
	modifierButtonActive: false,
	pointerRotationThreshold: 10,
}

const runtime = {
	cubeLight: null,
	cubeRotation: null,
	cubesGroup: null,
}


export {
	mobile,
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
	runtime,
}
