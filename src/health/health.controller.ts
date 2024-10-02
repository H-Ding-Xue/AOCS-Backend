import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const contacts = this.configService
      .get<Record<string, string>[]>('health.contacts')
      .map((item, idx) => {
        return () =>
          this.http.responseCheck(
            `contacts-${item.name}`,
            item.url,
            (res) => res.status >= 200,
          );
      });

    return this.health.check([
      () =>
        this.http.pingCheck(
          'internet-access',
          this.configService.get('health.ping'),
        ),
      ...contacts,
      () =>
        this.memory.checkHeap(
          'memory_heap',
          this.configService.get('health.memory_heap'),
        ),
      () => this.db.pingCheck('database', { connection: this.dataSource }),
    ]);
  }
}
