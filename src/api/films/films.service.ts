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

@Injectable()
export class FilmsService extends TypeOrmCrudService<Film> {
  constructor(
    @InjectRepository(Film) repo: Repository<Film>,
    private readonly storageService: StorageService,
  ) {
    super(repo);
  }

  public async createOneFilm(dto: CreateFilmDto, file: Express.Multer.File) {
    await this.storageService.uploadPoster(
      'posters',
      file.originalname,
      file.buffer,
    );

    return this.repo.save({
      ...dto,
      poster: 'posters/' + file.originalname,
    });
  }
}
