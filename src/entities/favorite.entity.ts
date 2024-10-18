import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  asteroidId: string;

  @Column('uuid')
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
