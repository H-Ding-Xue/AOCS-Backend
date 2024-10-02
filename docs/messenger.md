# Messenger Module

The Messenger Module is a standardised interaction interface for messaging platform like NATS or Kafka. 

NATS and Kafka are supported out-of-the-box, other vendors can be supported by implementing the `messenger.interface.ts` interface.

> Do not confuse NATS/Kafka client included in this Messenger module with the NATS/Kafka microservice platform provided by Nest.

Use this module if you need both HTTP and Messaging platform in a single microservice. Otherwise, use the official Messaging microservice platforms provided by Nest if you are working on a `Nest Microservice`.

The Messenger module and custom vendor extensions are defined in `src\utils\messaging` and options are defined in `src\config\messaging.config.ts`.

## Consuming Messenger Provider 
1. Import Messenger module.
    ```ts
    @Module({
      imports: [MessengerModule],
      ...
    })
    ```
1. Inject Messenger provider in your resources module, and or controller, services.
    ```ts
    constructor(
      @Inject('Messenger')
      private readonly client: Messenger,
    ) {}
    ```
1. Initialise Messaging Client in your resources module.  
    | This step is required for lazy initialisation.
    ```ts
    async onModuleInit() {
      this.logger.info('Initialising Messenger...');
      await this.client.init();
      this.logger.info('Messenger connected');
    }
    ```
1. Consume Messenger client.
    ```ts
    @Get('sub/:subject')
    subscribe(@Param('subject') subject: string) {
      this.client.subscribe(subject || 'default', (payload) => {
        console.log(`[${subject}]: `, payload);
      });
    }

    @Post('pub/:subject')
    publish(@Param('subject') subject: string, @Body() payload: any) {
      this.client.publish(subject, payload);
    }
    ```

## Removing Messenger Module
1. Remove `messaging.config.ts`.
1. Remove files in `src\utils\messaging`.
1. Deregister Messenger config in `app.module.ts`.

## Vendor Specific Details

### NATS

The `NATSMessenger` is a implementation of the `Messenger` interface based on the `nats.js` module. The source is defined in `src\utils\messaging\vendors\nats.ts`.

The configuration in `messaging.config.ts` is a type of `ConnectionOptions` from `nats.js`, thus refer to the official `nats.js` [documentation](https://github.com/nats-io/nats.js) for available options.

Minimally it needs a server url.
```ts
...
    nats: <ConnectionOptions>{
      servers: process.env.NATS_SERVER || 'localhost',
    },
...
```

### Kafka

The `KafkaMessenger` is a implementation of the `Messenger` interface based on the `kafkajs` module. The source is defined in `src\utils\messaging\vendors\kafka.ts`.

The configuration in `messaging.config.ts` is a collection of various option types from `kafkajs`, thus refer to the official `kafkajs` [documentation](https://kafka.js.org/docs/getting-started) for available options.

Minimally it needs broker url and a client Id.
```ts
...
    kafka: {
      client: <KafkaConfig>{
        clientId: process.env.HOSTNAME,
        brokers: [process.env.KAFKA_SERVER || 'localhost:29092'],
      },
      producer: <ProducerConfig>{},
    },
...
```