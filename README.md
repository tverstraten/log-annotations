# Logging

Simple wrappers for console logging that adds annotation based logging with some extended configuration. It can log method entry, exit and failure (exception) automatically including parameter and return value output.

# Configuration

See Logging.ts for how to configre. Essentialy set process.env.LOG_LEVELS for set a logging level for the named logger(s) and/or set process.env.LOG_LEVEL for the default level.

# Usage

The primary steps are:

1. ensure that your class has an appropriately named instance of logger
1. Annotate The methods you want logged keeping in mind the difference between sync and async.

For example

<!-- prettier-ignore -->
`
class MyClass {
    // Log annotations requires an accessible member called "logger"
    private logger = Logging.newLogger(MyClass.name)

    @LogAsyncMethod()
    async myFunction(): void {
        // do something
    }

    @LogMethod([LogAction.entry, LogAction.exception])
    myFunction(): void {
        // do something
    }

}
`
