import { CircularReplacer } from './CircularReplacer'

export class LogHelper {
	static maxArgumentLength = 1024

	static maxErrorTextLength = 2056

	static argumentText(argumentToTranslate: any, maxLength = this.maxArgumentLength): string {
		// is the arg a promise? if so resolve its value
		let full_arg_text = argumentToTranslate
			? typeof argumentToTranslate === 'object'
				? JSON.stringify(argumentToTranslate, CircularReplacer())
				: argumentToTranslate
			: 'undefined'
		if (full_arg_text.length > maxLength) full_arg_text = `${full_arg_text.substring(0, maxLength)}...`

		return full_arg_text
	}

	static async argumentTextAsync(arg: any, maxLength = this.maxArgumentLength): Promise<string> {
		return this.argumentText(!!arg && typeof arg.then === 'function' ? await arg : arg, maxLength)
	}

	static argumentsText(args: any[], maxLength = this.maxArgumentLength): string {
		if (!args) return ''
		if (!Array.isArray(args)) return this.argumentText(args, maxLength)

		let arg_text = ''
		args.forEach((arg) => {
			if (arg_text != '') arg_text += ', '

			arg_text += this.argumentText(arg, maxLength)
		})
		if (arg_text.length > maxLength) arg_text = `${arg_text.substring(0, maxLength)}...`

		return arg_text
	}

	static async argumentsTextAsync(args: any[], maxLength = this.maxArgumentLength): Promise<string> {
		if (!args) return ''

		if (!Array.isArray(args)) return this.argumentTextAsync(args, maxLength)

		let arg_text = ''
		for (const arg in args) {
			if (arg_text != '') arg_text += ', '

			arg_text += await this.argumentTextAsync(arg, maxLength)
		}
		if (arg_text.length > maxLength) arg_text = `${arg_text.substring(0, maxLength)}...`

		return arg_text
	}
}
