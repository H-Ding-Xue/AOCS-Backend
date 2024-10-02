/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PilotController],
  providers: [PilotService],
})
export class PilotModule {}
