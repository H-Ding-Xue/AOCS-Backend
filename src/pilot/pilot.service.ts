/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { PilotDto } from './dto/pilotDto';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Pilot } from 'src/entities/Pilot';
import { PilotDtoUpdate } from './dto/pilotDTOUpdate';

@Injectable()
export class PilotService {
  constructor(private configService: ConfigService) {}
  ds: DataSource;
  onModuleInit() {
    this.ds = new DataSource(this.configService.get('database'));
    this.ds
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }

  create(createPilotDtos: PilotDto[]) {
    try {
      this.ds.transaction(async (transactionalEntityManager) => {
        const pilotRepo = transactionalEntityManager.getRepository(Pilot);
        for (let i = 0; i < createPilotDtos.length; i++) {
          const pilot: Pilot = new Pilot();
          pilot.pilot_first_name = createPilotDtos[i].pilot_first_name;
          pilot.pilot_last_name = createPilotDtos[i].pilot_last_name;
          await pilotRepo.insert(pilot);
        }
      });
      return createPilotDtos.length;
    } catch (err) {
      throw err;
    }
  }

  async findAll(pageNumber: number, rowsPerPage: number) {
    try {
      //let results: Pilot[] = [];
      return this.ds.transaction(async (transactionalEntityManager) => {
        const pilotRepo = transactionalEntityManager.getRepository(Pilot);
        const results = await pilotRepo.find({
          relations: { trips: true },
          take: rowsPerPage,
          skip: (pageNumber - 1) * rowsPerPage,
        });
        return results;
      });
    } catch (err) {
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pilot`;
  }

  update(updatePilotDto: PilotDtoUpdate) {
    try {
      return this.ds.transaction(async (transactionalEntityManager) => {
        const pilotRepo = transactionalEntityManager.getRepository(Pilot);
        const results = await pilotRepo
          .createQueryBuilder()
          .update(Pilot)
          .set({
            pilot_first_name: updatePilotDto.pilot_first_name,
            pilot_last_name: updatePilotDto.pilot_last_name,
          })
          .where('pilot_id = :pilot_id', { pilot_id: updatePilotDto.pilot_id })
          .execute();
        return results;
      });
    } catch (err) {
      return err;
    }
  }

  remove(id: number) {
    try {
      this.ds.transaction(async (transactionalEntityManager) => {
        const pilotRepo = transactionalEntityManager.getRepository(Pilot);
        await pilotRepo.delete(id);
      });
      return { status: HttpStatus.OK, data: id };
    } catch (err) {
      throw err;
    }
  }
}
