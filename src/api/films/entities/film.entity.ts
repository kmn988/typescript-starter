import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../utils/baseEntity';
import { Category } from '../../categories/entities/category.entity';

@Entity('films')
export class Film extends BaseEntity {
  @Column()
  releasedAt: Date;

  @Column({ default: null })
  featured: string;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column({ type: 'json' })
  poster: string;

  @ManyToMany(() => Category, (category) => category.films)
  categories: Category[];
}
