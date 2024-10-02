/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  Relation,
} from 'typeorm';
import { Trip } from './Trip';

@Entity()
export class Pilot extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  pilot_id!: number;

  @Column('varchar', { length: 255 })
  pilot_first_name!: string;

  @Column('varchar', { length: 255 })
  pilot_last_name!: string;

  @OneToMany(() => Trip, (trip: Trip) => trip.pilot)
  trips: Relation<Trip>[];
}
