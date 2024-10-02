/* eslint-disable prettier/prettier */
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { TripDto } from './TripDto';
export class PilotDtoUpdate {
  @IsNumber()
  pilot_id: number;

  @IsString()
  pilot_first_name: string;

  @IsString()
  pilot_last_name!: string;

  @IsArray()
  @IsOptional()
  trips!: TripDto[];
}
