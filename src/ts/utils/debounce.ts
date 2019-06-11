function debounce(callback: (...args: any[]) => void, delay: number) {
	let timer = null

	return function(...args) {
		if (timer) { return }

		callback.apply(this, args)

		timer = setTimeout( () => {
			timer = null
		}, delay)
	}
}

export default debounce
