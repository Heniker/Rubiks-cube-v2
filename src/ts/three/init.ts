// This module only required because THREE library doesnt provide
// OrthographicTrackballControls, so have to attach it manualy


import * as THREE from 'three'
import OrthographicTrackballControls from './OrthographicTrackballControls'

type ThreeType = typeof THREE


interface NewThree extends ThreeType {
	// #Warning> No TS types for OrthographicTrackballControls
	OrthographicTrackballControls: any
}

const betterThree = THREE as NewThree
betterThree.OrthographicTrackballControls = OrthographicTrackballControls

export { betterThree as THREE }
