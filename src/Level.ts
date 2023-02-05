/**
 * A degree to which information should be logged.
 */
export enum Level {
	trace = 1,
	debug = 2,
	info = 3,
	warn = 4,
	error = 5,
	fatal = 6,
}

export const LEVEL_TEXT: any[] = []

LEVEL_TEXT[Level.trace] = 'TRACE'
LEVEL_TEXT[Level.debug] = 'DEBUG'
LEVEL_TEXT[Level.error] = 'ERROR'
LEVEL_TEXT[Level.fatal] = 'FATAL'
LEVEL_TEXT[Level.info] = 'INFO'
LEVEL_TEXT[Level.warn] = 'WARN'

export function LevelFromText(text?: string): Level {
	const lower = text?.toLocaleLowerCase()
	switch (lower) {
		case 'trace':
			return Level.trace
		case 'debug':
			return Level.debug
		case 'info':
			return Level.info
		case 'warn':
			return Level.warn
		case 'error':
			return Level.error
		case 'fatal':
			return Level.fatal
		default:
			return Level.info
	}
}
