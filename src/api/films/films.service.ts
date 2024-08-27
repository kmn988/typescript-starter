import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import {
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './film.dto';
import { NestMinioService } from 'nestjs-minio';
import { StorageService } from '../storage/storage.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { randomUUID } from 'crypto';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class FilmsService extends TypeOrmCrudService<Film> {
  constructor(
    @InjectRepository(Film) repo: Repository<Film>,
    private readonly storageService: StorageService,
    private readonly categoriesService: CategoriesService,
  ) {
    super(repo);
  }

  public async createOneFilm(dto: CreateFilmDto, file: Express.Multer.File) {
    console.log(dto);

    const newFilm = new Film();
    newFilm.id = randomUUID();
    const fileName = `${newFilm.id}.png`;
    await this.storageService.uploadPoster('posters', fileName, file.buffer);
    const categories = await Promise.all(
      dto.categories.map(async (categoryId) => {
        const category = await this.categoriesService.findOne({
          where: {
            id: categoryId,
          },
          select: ['id', 'name'],
        });
        return category;
      }),
    );
    newFilm.categories = categories;
    delete dto.categories;

    Object.assign(newFilm, dto);
    const film = await this.repo.save({
      ...newFilm,
      poster: 'posters/' + fileName,
    });
    return film;
  }

  public async updateOneFilm(
    id,
    dto: CreateFilmDto,
    file: Express.Multer.File,
  ) {
    const film = await this.repo.findOne({ where: { id } });
    const fileName = `${id}.png`;
    if (file) {
      await this.storageService.uploadPoster('posters', fileName, file.buffer);
    }
    const categories = await Promise.all(
      dto.categories.map(async (categoryId) => {
        const category = await this.categoriesService.findOne({
          where: {
            id: categoryId,
          },
          select: ['id', 'name'],
        });
        return category;
      }),
    );
    Object.assign(film, dto);
    const returnfilm = await this.repo.save({
      ...film,
      categories: categories,
      poster: 'posters/' + fileName,
    });
    return returnfilm;
  }

  public async getOneFilm(id) {}
}
