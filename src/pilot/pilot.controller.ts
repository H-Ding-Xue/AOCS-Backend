/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotDto } from './dto/pilotDto';
import { PilotDtoUpdate } from './dto/pilotDTOUpdate';

@Controller('api')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Post('/pilot')
  create(@Body() createPilotDtos: PilotDto[]) {
    return this.pilotService.create(createPilotDtos);
  }

  @Get('/pilots/:pageNumber/:rowsPerPage')
  findAll(
    @Param('pageNumber') pageNumber: number,
    @Param('rowsPerPage') rowsPerPage: number,
  ) {
    return this.pilotService.findAll(pageNumber, rowsPerPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pilotService.findOne(+id);
  }

  @Put('/pilot')
  update(@Body() updatePilotDto: PilotDtoUpdate) {
    console.log(updatePilotDto);
    return this.pilotService.update(updatePilotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pilotService.remove(id);
  }
}
