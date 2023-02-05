import { Level } from '../Level'
import { Logging } from '../Logging'

describe('cliSettings', () => {
	it('nothing set', async () => {
		const logger = Logging.newLogger('missing')
		expect(logger.level).toBe(Level.info)
	})

	it('something set', async () => {
		Logging.cliSettings = { somethingSet: 'error' }
		const logger = Logging.newLogger('somethingSet')
		expect(logger.level).toBe(Level.error)
	})

	it('something else set', async () => {
		Logging.cliSettings = { somethingElse: 'error' }
		const logger = Logging.newLogger('missing')
		expect(logger.level).toBe(Level.info)
	})
})

describe('LOG_LEVELS', () => {
	process.env.LOG_LEVELS = JSON.stringify({ logLevels1: 'error', logLevels2: 'warn', logLevels3: 'debug' })

	it('nothing set', async () => {
		const logger = Logging.newLogger('missing')
		expect(logger.level).toBe(Level.info)
	})

	it('something set', async () => {
		const logger = Logging.newLogger('logLevels1')
		expect(logger.level).toBe(Level.error)
	})

	it('something else set', async () => {
		const logger = Logging.newLogger('logLevels3')
		expect(logger.level).toBe(Level.debug)
	})
})

describe('LOG_LEVEL', () => {
	it('nothing set', async () => {
		process.env.LOG_LEVEL = 'debug'
		const logger = Logging.newLogger('missing')
		expect(logger.level).toBe(Level.debug)
		process.env.LOG_LEVEL = 'warn'
	})
})
