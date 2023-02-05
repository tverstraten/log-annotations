import { Level } from './Level'
import { LogAction } from './LogAction'
import { Loggable } from './Loggable'
import { LogHelper } from './LogHelper'

// eslint-disable-next-line max-lines-per-function
export function LogMethod(logType = [LogAction.exit, LogAction.exception], level: Level = Level.debug) {
	// eslint-disable-next-line max-lines-per-function
	return function (__target: any, methodName: string, descriptor: PropertyDescriptor): void {
		const target_method = descriptor.value

		// eslint-disable-next-line max-lines-per-function
		descriptor.value = function (...args: any[]): Promise<any> {
			const loggable = this as Loggable

			if (logType.includes(LogAction.entry)) loggable.logger.log(level, `${methodName}(${LogHelper.argumentsText(args)}) enter`)

			try {
				const result = target_method.apply(this, args)
				if (logType.includes(LogAction.exit))
					loggable.logger.log(level, `${methodName}(${LogHelper.argumentsText(args)}) exit (${LogHelper.argumentsText(result)})`)

				return result
			} catch (problem: any) {
				if (logType.includes(LogAction.exception)) {
					if (loggable.logger.isLevelEnabled(Level.error)) {
						const problem_text = LogHelper.argumentsText(problem, LogHelper.maxErrorTextLength)
						const arg_text = LogHelper.argumentsText(args)
						const exception_text = `${methodName}(${arg_text}) exception:(${problem_text}) stack:${problem.stack}`
						loggable.logger.error(exception_text)
					}
				}
				throw problem
			}
		}
	}
}
