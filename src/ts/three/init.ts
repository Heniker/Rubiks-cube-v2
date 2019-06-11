import * as THREE from 'three'
import OrthographicTrackballControls from './OrthographicTrackballControls'

type ThreeType = typeof THREE


interface Three_ extends ThreeType {
	OrthographicTrackballControls: any
}

(THREE as Three_).OrthographicTrackballControls = OrthographicTrackballControls

export default THREE as Three_