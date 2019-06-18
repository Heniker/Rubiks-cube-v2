import * as THREE from 'three'
import OrthographicTrackballControls from './OrthographicTrackballControls'

type ThreeType = typeof THREE


interface newTHREE extends ThreeType {
	OrthographicTrackballControls: any
}

const betterThree = THREE as newTHREE
betterThree.OrthographicTrackballControls = OrthographicTrackballControls

export {betterThree as THREE}