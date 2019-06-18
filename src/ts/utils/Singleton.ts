/**
 * @example
 * class Foo extends Singleton {}
 * let a = new Foo // Ok
 * let b = new Foo // Error! No more than one Singleton insance can be created.
 */
abstract class Singleton {

	private static instances = []

	constructor() {
		if (Singleton.instances.includes(new.target)) {
			throw new Error('Creating more than one Singleton instance')
		}

		else {
			Singleton.instances.push(new.target)
		}
	}
}

export {Singleton}


