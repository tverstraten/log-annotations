import { Level } from './Level'
import { LogAction } from './LogAction'
import { Loggable } from './Loggable'
import { LogHelper } from './LogHelper'

// eslint-disable-next-line max-lines-per-function
export function LogAsyncMethod(logType = [LogAction.exit, LogAction.exception], level: Level = Level.debug) {
	// eslint-disable-next-line max-lines-per-function
	return function (__target: any, methodName: string, descriptor: PropertyDescriptor): void {
		const target_method = descriptor.value
		// eslint-disable-next-line max-lines-per-function
		descriptor.value = async function (...args: any[]): Promise<any> {
			const loggable = this as Loggable

			let arg_text
			if (logType.includes(LogAction.entry)) {
				arg_text = await LogHelper.argumentsTextAsync(args)
				loggable.logger.log(level, `${methodName}(${arg_text}) enter`)
			}

			try {
				const result = await target_method.apply(this, args)
				if (logType.includes(LogAction.exit)) {
					const result_text = await LogHelper.argumentsTextAsync(result)
					arg_text = arg_text ? arg_text : await LogHelper.argumentsTextAsync(args)
					loggable.logger.log(level, `${methodName}(${arg_text}) exit (${result_text})`)
				}

				return result
			} catch (problem: any) {
				if (logType.includes(LogAction.exception)) {
					if (loggable.logger.isLevelEnabled(Level.error)) {
						const problem_text = await LogHelper.argumentsTextAsync(problem, LogHelper.maxErrorTextLength)
						arg_text = arg_text ? arg_text : await LogHelper.argumentsTextAsync(args)
						const exception_text = `${methodName}(${arg_text}) exception:(${problem_text}) stack:${problem.stack}`
						loggable.logger.error(exception_text)
					}
				}
				throw problem
			}
		}
	}
}
