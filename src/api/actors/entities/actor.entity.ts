import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('actors')
export class Actor {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  actor_name: string;

  @Column({ nullable: true })
  actor_age: number;

  @Column({ nullable: true })
  movie_featured: string;

  @Column({ nullable: true })
  movie_id: number;
}
