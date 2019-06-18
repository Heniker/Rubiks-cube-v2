import { animationTasks } from '../globals'
import {Singleton} from '../utils/Singleton'



/**
 * Add or remove tasks from render loop
 */
abstract class Toggle extends Singleton {

	protected isEnabled = false

	private task: () => void


	constructor(task?: () => void) {
		super()
		this.task = task
	}


	setTask(func) {
		if (this.task) {
			throw new Error('Task can only be set once')
		}

		this.task = func
	}


	enable() {
		if (!this.task) {
			throw new Error('No task is set')
		}

		if (this.isEnabled) {
			return false
		}

		animationTasks.push(this.task)
		this.isEnabled = true
		return true
	}

	disable() {
		if (!this.task) {
			throw new Error('No task is set')
		}

		if (!this.isEnabled) {
			return false
		}

		animationTasks.splice(animationTasks.indexOf(this.task), 1)
		this.isEnabled = false
		return true
	}
}

export {Toggle}
