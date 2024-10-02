/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';
export class TripDto {
  @IsNumber()
  trip_id!: number;
  @IsString()
  trip_source_country!: string;
  @IsString()
  trip_destination_country!: string;
  @IsString()
  trip_depart_time!: Date;
  @IsString()
  trip_arrival_time!: Date;
}
