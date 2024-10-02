# Logger

Winston logger was included in this template to support `logging` as part of the `observability` framework,

The logger config is defined in [logger.ts](src\utils\logger.ts) and imported in [`app.module.ts`](src\app.module.ts)

## Usage
1. Inject logger in places to use logger.
    ```ts
    import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
    import { Logger } from 'winston';

    ...

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        ...
    ) {}
    ```
1. Consume to logger
    ```ts
    this.logger.info("Hello world").
    ```
