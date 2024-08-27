import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { Film } from './entities/film.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Category])],
  controllers: [FilmsController],
  providers: [FilmsService, StorageService, CategoriesService],
})
export class FilmsModule {}
