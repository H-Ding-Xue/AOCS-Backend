
# TypeORM

> SQLite is included as a default database solution for this template, please remove it after swapping to your own database solution.

TypeORM is defined in `database.providers.ts`.
```ts
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource(configService.get('database'));
      return dataSource.initialize();
    },
  },
];
```
The configurations are found in [database.config.ts](src\config\database.config.ts)

```ts
const dataSourceOptions = {
  type: 'better-sqlite3',
  database: './myapp.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // disable in production!
  logging: false,
};
```

The default setup creates a `sqlite` database during initialisation. 

> Remember to remove the `better-sqlite3` module after replacing it with your own database solution. 

Migration scripts are included for schema migration.
```json
    "migration:run": "npm run typeorm migration:run -- -d ./src/config/database.config.ts",
    "migration:generate": "npm run typeorm -- -d ./src/config/database.config.ts migration:generate ./src/database/migrations/migration",
    "migration:create": "npm run typeorm -- migration:create ./src/database/migrations/migration",
    "migration:revert": "npm run typeorm -- -d ./src/config/database.config.ts migration:revert"
```

The migration schema will be exported to `src\database\migrations` folder.

Refer to the [Nest](https://docs.nestjs.com/recipes/sql-typeorm) and [TypeORM](https://typeorm.io/) documentation for more details. 

## Common pitfalls

As `swc` is enabled in this template, please take note of the following pitfalls:
- [circular dependencies](https://docs.nestjs.com/recipes/swc#common-pitfalls)