/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class PilotDto {
  @IsString()
  pilot_first_name: string;

  @IsString()
  pilot_last_name!: string;
}
