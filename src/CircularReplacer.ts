export function CircularReplacer(): any {
	const seen = new WeakSet()
	return (__key: any, value: any): any => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return
			}
			seen.add(value)
		}
		return value
	}
}
