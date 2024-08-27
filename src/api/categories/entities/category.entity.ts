import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../utils/baseEntity';
import { Film } from '../../films/entities/film.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Film, (film) => film.categories)
  films: Film[];
}
