/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Relation,
} from 'typeorm';
import { Pilot } from './Pilot';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  trip_id!: number;

  @Column('varchar', { length: 255 })
  trip_source_country!: string;

  @Column('varchar', { length: 255 })
  trip_destination_country!: string;

  @Column({ type: 'timestamptz' })
  trip_depart_time: Date;

  @Column({ type: 'timestamptz' })
  trip_arrival_time: Date;

  @ManyToOne(() => Pilot, (pilot) => pilot.trips, {
    onDelete: 'SET NULL',
    eager: true,
    orphanedRowAction: 'delete',
  })
  pilot!: Relation<Pilot>;
}
