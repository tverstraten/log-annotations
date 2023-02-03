# Logging

Simple wrappers for console logging that adds annotation based logging with some extended configuration. It can log method entry, exit and failure (exception) automatically including parameter and return value output.

# Configuration

See Logging.ts for how to configre. Essentialy set process.env.LOG_LEVELS for set a logging level for the named logger(s) and/or set process.env.LOG_LEVEL for the default level.

# Usage

`
class MyClass {
logger = Logging.newLogger(MyClass.name)

    @LogAsyncMethod()
    async myFunction(): void {
        // do something
    }

    @LogAsyncMethod([LogAction.entry, LogAction.exception])
    myFunction(): void {
        // do something
    }

}

`
