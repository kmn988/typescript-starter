import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../utils/baseEntity';
import { Category } from '../../categories/entities/category.entity';

@Entity('films')
export class Film extends BaseEntity {
  @Column({ default: new Date(), nullable: true })
  releasedAt: Date;

  @Column({ default: null })
  featured: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'json' })
  poster: string;

  @ManyToMany(() => Category, (category) => category.films)
  @JoinTable()
  categories: Category[];
}
