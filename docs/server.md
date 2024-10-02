
# HTTP Server

The following guide highlights several included modules related to the HTTP Server component for a Nest app.

## Fastify Options
Fastify Web Server is defined in `main.ts`.
```ts
  const app = await NestFactory.create<NestFastifyApplication>(
    ...
    new FastifyAdapter({ logger: true }),
    ...
  );
```
Refer to the official Fastify [documentation](https://fastify.dev/docs/latest/) for available options.

> NOTE: fastify logger is not part of the `observability` framework configured in this template.

## CORS

CORS is defined in `main.ts`

```ts
  app.enableCors({ origin: '*' });
```

Refer to the CORS [documentation](https://docs.nestjs.com/security/cors) for available options.


## Swagger (OpenApi)

Swagger is defined in `src\utils\swagger.ts` and initialised in `main.ts`.

```ts
  setupSwagger(app, configService);
```

Swagger options are defined in [swagger.config.ts](src\config\swagger.config.ts).

Refer to the Swagger [documentation](https://docs.nestjs.com/openapi/introduction) for available options.

## Terminus (healthcheck)

Terminus is a healthcheck module that setup `liveness/readiness` endpoint for the microservice. 

Terminus is defined in the `src/health` directory.

Options are defined in [app.config.ts](src\config\app.config.ts).

```ts
  ...
  health: {
    ping: 'https://docs.nestjs.com', // external site to check for internet connectivity.
    memory_heap: 150 * 1024 * 1024, // memory level for healthy free memory available.
    contacts: <Record<string, string>[]>[ // list of services to test connectivity between them
      {
        name: 'otel-collector',
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      },
    ],
  },
  ...
```