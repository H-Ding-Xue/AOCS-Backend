
# Configuration Management

### Loading Configurations

The configuration assets in this template consist of `.env` files and custom configuration factories found [here](../src/config). Where sensitive secrets will be kept in `.env`(s) and non-sensitive values can be defined in the latter.

There are several predefined custom configuration factories defined in the `src/config` folder.
- app.config.ts: contains general configs.
- database.config.ts: contains database specific configs, used for migrations scripts by TypeORM.
- swagger.config.ts: contains swagger configs.
- otel.config.ts: contains otel configs.

The configs in `.env`(s) has to be registered in one of the configuration factory for your application to consume.

```ts
# example
port: parseInt(process.env.PORT, 10) || 3000,
```

Feel free to define additional configuration factories to suit your case. Don't forget to register your new factory in the `app.module.ts`.

```ts

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, swaggerConfig, ...],
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

```

### Consuming configurations
1. Register `ConfigModule` in your custom module.
  ```ts
  @Module({
    imports: [
      ConfigModule,
      ...
    ],
    ...
  })
  ```
1. Include `ConfigService` in your controller or service.

  ```ts
  ...
    constructor(
      private configService: ConfigService,
    ) {}
  ...
  ```

1. Retrieve configurations

```ts
customMethod() {
  // the key will depend on your factory namespace and variable key.
  this.configService.get('database.url');
}
```
